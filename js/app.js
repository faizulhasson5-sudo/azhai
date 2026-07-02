/* ============================================================
   Free AI Text Tools — Core Application v4
   Icons · Favorites · Auto-suggest · Feedback · PWA · Offline
   ============================================================ */

(function(){
'use strict';
window.App=window.App||{};

/* ---- Helpers ---- */
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}

/* ---- Theme ---- */
var saved=lsGet('attTheme');
if(!saved){
  saved=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
}
document.documentElement.setAttribute('data-theme',saved);

App.toggleTheme=function(){
  var c=document.documentElement.getAttribute('data-theme');
  var n=c==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',n);
  lsSet('attTheme',n);
  var b=document.querySelector('.theme-btn');
  if(b){
    b.textContent=n==='dark'?'\u2600':'\u263E';
    b.setAttribute('aria-label',n==='dark'?'Switch to light mode':'Switch to dark mode');
  }
};

/* ---- Toast ---- */
var _toastTimer;
App.toast=function(msg,dur){
  dur=dur||2000;
  var t=document.getElementById('appToast');
  if(!t)return;
  clearTimeout(_toastTimer);
  t.textContent=msg;
  t.classList.add('show');
  _toastTimer=setTimeout(function(){t.classList.remove('show');},dur);
};

/* ---- Analytics (only after consent) ---- */
App.initAnalytics=function(){
  if(lsGet('attCookies')!=='accepted')return;
  if(window._gaInitialized)return;
  window._gaInitialized=true;
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-XDHMXW7PR2';
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag('js',new Date());
  gtag('config','G-XDHMXW7PR2');
};

/* ---- Cookie Consent ---- */
App.initCookieConsent=function(){
  var b=document.getElementById('cookieBanner');
  if(!b)return;
  if(lsGet('attCookies')){
    App.initAnalytics();
    return;
  }
  b.classList.add('show');
  var a=document.getElementById('cookieAccept');
  var r=document.getElementById('cookieReject');
  if(a)a.addEventListener('click',function(){
    lsSet('attCookies','accepted');
    b.classList.remove('show');
    App.initAnalytics();
  });
  if(r)r.addEventListener('click',function(){
    lsSet('attCookies','rejected');
    b.classList.remove('show');
  });
};

/* ---- Category Icons (SVG) ---- */
App.icons={
  counters:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
  text:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"/><path d="M12 18h.01"/></svg>',
  converters:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  cleaners:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 18 8-8"/><path d="m6 6 8 8"/><circle cx="12" cy="12" r="10"/></svg>',
  seo:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m11 8-2 6h4l-2 6"/></svg>',
  code:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
};
App.catLabels={counters:'Counters',text:'Text',converters:'Converters',cleaners:'Cleaners',seo:'SEO',code:'Code'};

App.getIcon=function(cat){return App.icons[cat]||App.icons.text;};

/* ---- Favorites ---- */
App.getFavorites=function(){
  try{return JSON.parse(lsGet('attFavs')||'[]');}catch(e){return [];}
};
App.toggleFav=function(id){
  if(!id)return false;
  var favs=App.getFavorites();
  var idx=favs.indexOf(id);
  if(idx===-1){favs.push(id);App.toast('Added to favorites');}
  else{favs.splice(idx,1);App.toast('Removed from favorites');}
  lsSet('attFavs',JSON.stringify(favs));
  return idx===-1;
};
App.isFav=function(id){return App.getFavorites().indexOf(id)!==-1;};

/* ---- Tools Data ---- */
App.tools=[
{id:'word-counter',name:'Word Counter',cat:'counters',desc:'Count words, characters, and lines'},
{id:'char-counter',name:'Character Counter',cat:'counters',desc:'Count characters with/without spaces'},
{id:'sentence-counter',name:'Sentence Counter',cat:'counters',desc:'Count sentences by punctuation'},
{id:'paragraph-counter',name:'Paragraph Counter',cat:'counters',desc:'Count paragraphs by empty lines'},
{id:'word-frequency',name:'Word Frequency',cat:'counters',desc:'Count word occurrences in text'},
{id:'case-converter',name:'Case Converter',cat:'converters',desc:'UPPER, lower, Title, Sentence case'},
{id:'remove-spaces',name:'Remove Extra Spaces',cat:'cleaners',desc:'Clean double spaces and breaks'},
{id:'find-replace',name:'Find and Replace',cat:'text',desc:'Search and replace text instantly'},
{id:'line-sorter',name:'Line Sorter',cat:'text',desc:'Sort lines ascending/descending'},
{id:'alpha-sorter',name:'Alphabetical Sorter',cat:'text',desc:'Sort lines alphabetically'},
{id:'text-reverser',name:'Text Reverser',cat:'text',desc:'Reverse chars, words, or lines'},
{id:'duplicate-remover',name:'Duplicate Remover',cat:'text',desc:'Remove duplicate lines from text'},
{id:'lorem-generator',name:'Lorem Generator',cat:'text',desc:'Generate Lorem Ipsum placeholder text'},
{id:'slug-generator',name:'Slug Generator',cat:'seo',desc:'URL-friendly slug from any title'},
{id:'keyword-density',name:'Keyword Density',cat:'seo',desc:'Check keyword frequency and density'},
{id:'keyword-extract',name:'Keyword Extractor',cat:'seo',desc:'Extract top keywords from text'},
{id:'meta-gen',name:'Meta Tag Generator',cat:'seo',desc:'Generate complete HTML meta tags'},
{id:'meta-desc-gen',name:'Meta Description Gen',cat:'seo',desc:'Generate SEO meta descriptions'},
{id:'og-generator',name:'OG Tag Generator',cat:'seo',desc:'Open Graph tags for social media'},
{id:'canonical-gen',name:'Canonical Tag Generator',cat:'seo',desc:'Generate canonical link tags'},
{id:'robots-txt',name:'Robots.txt Generator',cat:'seo',desc:'Generate crawler directives'},
{id:'sitemap-gen',name:'Sitemap Generator',cat:'seo',desc:'Create XML sitemaps'},
{id:'json-formatter',name:'JSON Formatter',cat:'code',desc:'Beautify and validate JSON'},
{id:'json-validator',name:'JSON Validator',cat:'code',desc:'Validate JSON syntax'},
{id:'xml-formatter',name:'XML Formatter',cat:'code',desc:'Pretty-print XML documents'},
{id:'xml-validator',name:'XML Validator',cat:'code',desc:'Validate XML structure'},
{id:'markdown-editor',name:'Markdown Editor',cat:'code',desc:'Write Markdown with live preview'},
{id:'markdown-preview',name:'Markdown Previewer',cat:'code',desc:'Preview Markdown as HTML'},
{id:'html-previewer',name:'HTML Previewer',cat:'code',desc:'Preview HTML code in real-time'},
{id:'regex-tester',name:'Regex Tester',cat:'code',desc:'Test regular expressions live'},
{id:'url-encoder',name:'URL Encoder',cat:'code',desc:'Encode special URL characters'},
{id:'url-decoder',name:'URL Decoder',cat:'code',desc:'Decode URL-encoded strings'},
{id:'html-encoder',name:'HTML Encoder',cat:'code',desc:'Escape HTML entities'},
{id:'html-decoder',name:'HTML Decoder',cat:'code',desc:'Decode HTML entities'},
{id:'b64-encoder',name:'Base64 Encoder',cat:'code',desc:'Encode text to Base64'},
{id:'b64-decoder',name:'Base64 Decoder',cat:'code',desc:'Decode Base64 strings'},
{id:'hash-generator',name:'Hash Generator',cat:'code',desc:'Generate simple text hashes'}
];

App.getToolById=function(id){return App.tools.find(function(t){return t.id===id;});};
App.getAllTools=function(){return App.tools;};

App.toggleMenu=function(){
  var n=document.querySelector('.nav');
  var btn=document.querySelector('.menu-toggle');
  if(n)n.classList.toggle('open');
  if(btn){
    var open=n&&n.classList.contains('open');
    btn.textContent=open?'\u2715':'\u2630';
    btn.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
  }
};

/* ---- Blog Data ---- */
App.blogPosts=[
{slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',excerpt:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours of manual work.',category:'SEO Tools',date:'2026-06-20',readTime:'8 min',image:'/blog/images/ultimate-guide-seo-text-tools.jpg'},
{slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',excerpt:'Learn the art of crafting compelling meta descriptions that improve CTR and boost your search rankings.',category:'SEO Tips',date:'2026-06-18',readTime:'6 min',image:'/blog/images/meta-descriptions.jpg'},
{slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',excerpt:'Master JSON formatting, validation, and optimization with practical examples and free online tools.',category:'Development',date:'2026-06-15',readTime:'7 min',image:'/blog/images/json-formatting.jpg'},
{slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',excerpt:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',date:'2026-06-12',readTime:'5 min',image:'/blog/images/markdown-bloggers.jpg'},
{slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',excerpt:'Learn how canonical tags prevent duplicate content issues and consolidate your SEO ranking signals.',category:'SEO Tips',date:'2026-06-10',readTime:'6 min',image:'/blog/images/canonical-tags.jpg'},
{slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',excerpt:'Master Open Graph meta tags to ensure your content looks amazing when shared on social media.',category:'Social Media',date:'2026-06-08',readTime:'5 min',image:'/blog/images/open-graph-tags.jpg'}
];

/* ---- Offline Detection ---- */
App.initOffline=function(){
  var banner=document.getElementById('offlineBanner');
  if(!banner)return;
  function update(){banner.classList.toggle('show',!navigator.onLine);}
  window.addEventListener('online',update);
  window.addEventListener('offline',update);
  update();
};

/* ---- Feedback System ---- */
App.initFeedback=function(){
  var fab=document.getElementById('feedbackFab');
  var overlay=document.getElementById('feedbackOverlay');
  if(!fab||!overlay)return;

  var type='bug';
  var typeBtns=overlay.querySelectorAll('.feedback-type-btn');
  typeBtns.forEach(function(btn){
    btn.addEventListener('click',function(){
      typeBtns.forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      type=btn.getAttribute('data-type');
    });
  });

  function openModal(){overlay.classList.add('open');var firstInput=overlay.querySelector('textarea');if(firstInput)firstInput.focus();}
  function closeModal(){overlay.classList.remove('open');}

  fab.addEventListener('click',openModal);
  overlay.addEventListener('click',function(e){if(e.target===overlay)closeModal();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&overlay.classList.contains('open'))closeModal();});

  var submitBtn=document.getElementById('feedbackSubmit');
  if(submitBtn){
    submitBtn.addEventListener('click',function(){
      var msg=document.getElementById('feedbackMessage');
      var email=document.getElementById('feedbackEmail');
      var text=msg?msg.value.trim():'';
      if(!text){App.toast('Please enter a message');return;}
      var entry={type:type,message:text,email:email?email.value.trim():'',page:location.pathname,time:new Date().toISOString()};
      var queue=App.getFeedbackQueue();
      queue.push(entry);
      lsSet('attFeedback',JSON.stringify(queue));
      closeModal();
      if(msg)msg.value='';
      if(email)email.value='';
      App.toast('Thank you! Feedback submitted.');
    });
  }

  var closeBtn=document.getElementById('feedbackClose');
  if(closeBtn)closeBtn.addEventListener('click',closeModal);
};
App.getFeedbackQueue=function(){
  try{return JSON.parse(lsGet('attFeedback')||'[]');}catch(e){return [];}
};

/* ---- PWA Service Worker ---- */
App.initSW=function(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(function(){});
  }
};

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded',function(){
  App.initCookieConsent();
  App.initOffline();
  App.initFeedback();
  App.initSW();

  /* Header scroll shadow */
  var header=document.querySelector('.site-header');
  if(header){
    var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>10);};
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }

  /* Theme button init */
  var btn=document.querySelector('.theme-btn');
  if(btn){
    var currentTheme=document.documentElement.getAttribute('data-theme');
    btn.textContent=currentTheme==='dark'?'\u2600':'\u263E';
    btn.setAttribute('aria-label',currentTheme==='dark'?'Switch to light mode':'Switch to dark mode');
  }
});

})();
