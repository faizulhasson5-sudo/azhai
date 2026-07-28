const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '..', 'google-service-account.json'),
  scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing({version: 'v3', auth});

const BASE = 'https://azhai-six.vercel.app';

// Auto-discover all HTML pages from public/
function walk(dir, results) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, results);
    else if (f.endsWith('.html') && f !== 'template.html') results.push(p);
  });
}

const pubDir = path.join(__dirname, '..', 'public');
const pages = [];
walk(pubDir, pages);

const urls = pages.map(p => {
  const rel = path.relative(pubDir, p).replace(/\\/g, '/');
  return BASE + '/' + rel;
}).filter(u => !u.includes('404.html'));

async function requestIndexing(url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' }
    });
    return { url, success: true };
  } catch (e) {
    return { url, success: false, error: e.message.substring(0, 80) };
  }
}

async function main() {
  console.log('Submitting ' + urls.length + ' URLs for indexing...\n');
  let ok = 0, fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const r = await requestIndexing(urls[i]);
    const short = urls[i].replace(BASE, '');
    if (r.success) { ok++; console.log((i+1) + '. [OK] ' + short); }
    else { fail++; console.log((i+1) + '. [FAIL] ' + short + ' - ' + r.error); }
    // Rate limit: Google allows ~200 requests/day
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, 1500));
  }
  console.log('\nDone! ' + ok + ' succeeded, ' + fail + ' failed. Total: ' + urls.length);
}

main().catch(e => console.error('Fatal:', e.message));
