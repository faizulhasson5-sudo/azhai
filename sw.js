/* ============================================================
   Free AI Text Tools — Service Worker v2
   Cache-First for static assets, Network-First for pages
   Fixed: individual cache.put, skipWaiting/claim inside waitUntil
   ============================================================ */

var CACHE_NAME = 'att-v2';
var STATIC_ASSETS = [
  '/',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
        STATIC_ASSETS.map(function(url) {
          return fetch(url).then(function(response) {
            if (response.ok) return cache.put(url, response);
          }).catch(function() {
            /* skip individual failures */
          });
        })
      );
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME; })
             .map(function(name) { return caches.delete(name); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests (fonts, analytics, etc.)
  if (url.origin !== location.origin) return;

  // Network-first for HTML pages (fresh content)
  if (event.request.headers.get('accept') && event.request.headers.get('accept').indexOf('text/html') !== -1) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        var clone = response.clone();
        return caches.open(CACHE_NAME).then(function(cache) {
          return cache.put(event.request, clone);
        }).then(function() {
          return response;
        });
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || new Response('<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection and try again.</p></body></html>', {headers: {'Content-Type': 'text/html'}});
        });
      })
    );
    return;
  }

  // Cache-first for static assets (CSS, JS, images)
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (response.ok) {
          var clone = response.clone();
          return caches.open(CACHE_NAME).then(function(cache) {
            return cache.put(event.request, clone);
          }).then(function() {
            return response;
          });
        }
        return response;
      });
    })
  );
});
