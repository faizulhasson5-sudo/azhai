const {google} = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '..', 'google-service-account.json'),
  scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing({version: 'v3', auth});

const urls = [
  'https://azhai-six.vercel.app/tools/remove-spaces.html',
  'https://azhai-six.vercel.app/tools/find-replace.html',
  'https://azhai-six.vercel.app/tools/line-sorter.html',
  'https://azhai-six.vercel.app/tools/alpha-sorter.html',
  'https://azhai-six.vercel.app/tools/lorem-generator.html',
  'https://azhai-six.vercel.app/tools/word-frequency.html',
  'https://azhai-six.vercel.app/tools/sentence-counter.html',
  'https://azhai-six.vercel.app/tools/paragraph-counter.html',
  'https://azhai-six.vercel.app/tools/meta-desc-gen.html',
  'https://azhai-six.vercel.app/tools/og-generator.html',
  'https://azhai-six.vercel.app/tools/json-validator.html',
  'https://azhai-six.vercel.app/tools/xml-formatter.html',
  'https://azhai-six.vercel.app/tools/xml-validator.html',
  'https://azhai-six.vercel.app/tools/markdown-preview.html',
  'https://azhai-six.vercel.app/tools/html-previewer.html',
  'https://azhai-six.vercel.app/tools/regex-tester.html',
  'https://azhai-six.vercel.app/tools/url-decoder.html',
  'https://azhai-six.vercel.app/tools/html-encoder.html',
  'https://azhai-six.vercel.app/tools/b64-encoder.html',
  'https://azhai-six.vercel.app/tools/b64-decoder.html',
  'https://azhai-six.vercel.app/tools/hash-generator.html',
  'https://azhai-six.vercel.app/tools/hreflang-gen.html',
  'https://azhai-six.vercel.app/tools/article-schema-gen.html',
  'https://azhai-six.vercel.app/tools/breadcrumb-schema-gen.html',
  'https://azhai-six.vercel.app/tools/smart-text-lab.html',
  'https://azhai-six.vercel.app/about.html',
  'https://azhai-six.vercel.app/contact.html',
  'https://azhai-six.vercel.app/advertise.html',
  'https://azhai-six.vercel.app/blog/',
  'https://azhai-six.vercel.app/blog/ultimate-guide-seo-text-tools.html',
  'https://azhai-six.vercel.app/blog/how-to-write-perfect-meta-descriptions.html',
  'https://azhai-six.vercel.app/blog/json-formatting-best-practices.html',
  'https://azhai-six.vercel.app/blog/markdown-for-bloggers.html',
  'https://azhai-six.vercel.app/blog/understanding-canonical-tags-seo.html',
  'https://azhai-six.vercel.app/blog/open-graph-tags-social-media.html',
  'https://azhai-six.vercel.app/blog/google-ai-overview-spam-policy-2026.html',
  'https://azhai-six.vercel.app/blog/optimize-google-ai-overviews.html',
  'https://azhai-six.vercel.app/blog/google-june-2026-spam-update.html',
  'https://azhai-six.vercel.app/blog/ai-content-detection-2026.html',
  'https://azhai-six.vercel.app/blog/query-fanout-seo-2026.html',
  'https://azhai-six.vercel.app/blog/how-to-get-cited-google-ai-overviews.html',
  'https://azhai-six.vercel.app/blog/eeat-2026-google-trust-guide.html',
  'https://azhai-six.vercel.app/privacy-policy.html',
  'https://azhai-six.vercel.app/terms.html',
  'https://azhai-six.vercel.app/cookie-policy.html'
];

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
  console.log('Requesting indexing for', urls.length, 'URLs...\n');
  let ok = 0, fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const r = await requestIndexing(urls[i]);
    const short = urls[i].replace('https://azhai-six.vercel.app', '');
    if (r.success) { ok++; console.log((i+1) + '. [OK] ' + short); }
    else { fail++; console.log((i+1) + '. [FAIL] ' + short + ' - ' + r.error); }
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, 1000));
  }
  console.log('\nDone! ' + ok + ' succeeded, ' + fail + ' failed.');
}

main().catch(e => console.error('Fatal:', e.message));
