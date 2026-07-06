const {google} = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '..', 'google-service-account.json'),
  scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing({version: 'v3', auth});

const urls = [
  'https://azhai-six.vercel.app/blog/find-trending-keywords-before-competitors.html',
  'https://azhai-six.vercel.app/blog/query-fanout-vs-keywords.html',
  'https://azhai-six.vercel.app/blog/long-tail-keyword-strategy-2026.html'
];

async function requestIndexing(url) {
  try {
    await indexing.urlNotifications.publish({ requestBody: { url, type: 'URL_UPDATED' } });
    return true;
  } catch (e) { return false; }
}

(async () => {
  for (const url of urls) {
    const ok = await requestIndexing(url);
    const short = url.split('/').pop();
    console.log(ok ? '✓ ' + short : '✗ ' + short);
    await new Promise(r => setTimeout(r, 1000));
  }
})();
