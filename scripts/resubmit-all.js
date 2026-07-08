const {google} = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '..', 'google-service-account.json'),
  scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing({version: 'v3', auth});

const BASE = 'https://azhai-six.vercel.app';

const urls = [
  // Homepage + static
  `${BASE}/`,
  `${BASE}/about.html`,
  `${BASE}/contact.html`,
  `${BASE}/advertise.html`,
  `${BASE}/privacy-policy.html`,
  `${BASE}/terms.html`,
  `${BASE}/cookie-policy.html`,
  // Tool pages
  `${BASE}/tools/`,
  `${BASE}/tools/smart-text-lab.html`,
  `${BASE}/tools/word-counter.html`,
  `${BASE}/tools/char-counter.html`,
  `${BASE}/tools/sentence-counter.html`,
  `${BASE}/tools/paragraph-counter.html`,
  `${BASE}/tools/word-frequency.html`,
  `${BASE}/tools/case-converter.html`,
  `${BASE}/tools/remove-spaces.html`,
  `${BASE}/tools/find-replace.html`,
  `${BASE}/tools/line-sorter.html`,
  `${BASE}/tools/alpha-sorter.html`,
  `${BASE}/tools/text-reverser.html`,
  `${BASE}/tools/duplicate-remover.html`,
  `${BASE}/tools/lorem-generator.html`,
  `${BASE}/tools/slug-generator.html`,
  `${BASE}/tools/keyword-density.html`,
  `${BASE}/tools/keyword-extract.html`,
  `${BASE}/tools/meta-gen.html`,
  `${BASE}/tools/meta-desc-gen.html`,
  `${BASE}/tools/og-generator.html`,
  `${BASE}/tools/canonical-gen.html`,
  `${BASE}/tools/robots-txt.html`,
  `${BASE}/tools/sitemap-gen.html`,
  `${BASE}/tools/json-formatter.html`,
  `${BASE}/tools/json-validator.html`,
  `${BASE}/tools/xml-formatter.html`,
  `${BASE}/tools/xml-validator.html`,
  `${BASE}/tools/markdown-editor.html`,
  `${BASE}/tools/markdown-preview.html`,
  `${BASE}/tools/html-previewer.html`,
  `${BASE}/tools/regex-tester.html`,
  `${BASE}/tools/url-encoder.html`,
  `${BASE}/tools/url-decoder.html`,
  `${BASE}/tools/html-encoder.html`,
  `${BASE}/tools/html-decoder.html`,
  `${BASE}/tools/b64-encoder.html`,
  `${BASE}/tools/b64-decoder.html`,
  `${BASE}/tools/hash-generator.html`,
  `${BASE}/tools/hreflang-gen.html`,
  `${BASE}/tools/schema-gen.html`,
  `${BASE}/tools/faq-schema-gen.html`,
  `${BASE}/tools/article-schema-gen.html`,
  `${BASE}/tools/breadcrumb-schema-gen.html`,
  `${BASE}/tools/pdf-to-word.html`,
  `${BASE}/tools/word-to-pdf.html`,
  // Blog
  `${BASE}/blog/`,
  `${BASE}/blog/ultimate-guide-seo-text-tools.html`,
  `${BASE}/blog/how-to-write-perfect-meta-descriptions.html`,
  `${BASE}/blog/json-formatting-best-practices.html`,
  `${BASE}/blog/markdown-for-bloggers.html`,
  `${BASE}/blog/understanding-canonical-tags-seo.html`,
  `${BASE}/blog/open-graph-tags-social-media.html`,
  `${BASE}/blog/google-ai-overview-spam-policy-2026.html`,
  `${BASE}/blog/optimize-google-ai-overviews.html`,
  `${BASE}/blog/google-june-2026-spam-update.html`,
  `${BASE}/blog/ai-content-detection-2026.html`,
  `${BASE}/blog/query-fanout-seo-2026.html`,
  `${BASE}/blog/how-to-get-cited-google-ai-overviews.html`,
  `${BASE}/blog/find-trending-keywords-before-competitors.html`,
  `${BASE}/blog/query-fanout-vs-keywords.html`,
  `${BASE}/blog/long-tail-keyword-strategy-2026.html`,
  `${BASE}/blog/what-is-keyword-density.html`,
  `${BASE}/blog/free-seo-tools-small-business.html`,
  `${BASE}/blog/how-to-check-keyword-density.html`,
  `${BASE}/blog/seo-content-writing-guide.html`,
  `${BASE}/blog/how-to-write-meta-descriptions.html`,
  `${BASE}/blog/how-to-create-robots-txt-file.html`,
  `${BASE}/blog/xml-sitemap-guide-seo.html`,
  `${BASE}/blog/eeat-2026-google-trust-guide.html`
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
  console.log('Resubmitting', urls.length, 'URLs for indexing...\n');
  let ok = 0, fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const r = await requestIndexing(urls[i]);
    const short = urls[i].replace(BASE, '');
    if (r.success) { ok++; console.log((i+1) + '. [OK] ' + short); }
    else { fail++; console.log((i+1) + '. [FAIL] ' + short + ' - ' + r.error); }
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, 1200));
  }
  console.log('\nDone! ' + ok + ' succeeded, ' + fail + ' failed.');
}

main().catch(e => console.error('Fatal:', e.message));
