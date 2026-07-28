const {google} = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '..', 'google-service-account.json'),
  scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing({version: 'v3', auth});
const BASE = 'https://azhai-six.vercel.app';

// Non-indexed pages from GSC (43 total: 40 discovered, 2 crawled-not-indexed, 1 duplicate)
// Prioritize these FIRST, then remaining pages
const nonIndexed = [
  // 40 Discovered - currently not indexed
  '/tools/readability-score.html',
  '/tools/pdf-to-word.html',
  '/tools/word-to-pdf.html',
  '/books/reader.html',
  '/editorial-policy.html',
  '/skills/ai-literacy.html',
  '/skills/communication-guide.html',
  '/skills/financial-basics.html',
  '/tools/smart-text-lab.html',
  '/tools/text-analysis.html',
  '/tools/seo-tools.html',
  '/tools/text-formatting.html',
  '/tools/developer-tools.html',
  '/tools/encoding-tools.html',
  '/tools/schema-generators.html',
  '/tools/hreflang-gen.html',
  '/tools/schema-gen.html',
  '/tools/faq-schema-gen.html',
  '/tools/article-schema-gen.html',
  '/tools/breadcrumb-schema-gen.html',
  '/glossary/category/analytics.html',
  '/glossary/category/tools-technology.html',
  '/authors/david-park.html',
  '/authors/emma-rodriguez.html',
  '/authors/james-chen.html',
  '/authors/sarah-mitchell.html',
  '/blog/seo-strategy.html',
  '/blog/keyword-research.html',
  '/blog/seo-tutorials.html',
  '/blog/technical-seo.html',
  '/blog/content-strategy.html',
  '/blog/tools-tutorials.html',
  '/blog/social-media.html',
  '/blog/local-seo.html',
  '/blog/off-page-seo.html',
  '/tools/word-counter.html',
  '/tools/char-counter.html',
  '/tools/sentence-counter.html',
  '/tools/paragraph-counter.html',
  '/tools/word-frequency.html',
  // 2 Crawled - currently not indexed
  '/tools/remove-spaces.html',
  '/tools/text-reverser.html',
  // 1 Duplicate canonical
  '/blog/how-to-rank-number-one-on-google.html',
];

// Remaining pages (already indexed but resubmit for freshness)
const remaining = [
  '/', '/about.html', '/contact.html', '/advertise.html',
  '/privacy-policy.html', '/terms.html', '/cookie-policy.html',
  '/seo-statistics-2026.html', '/best-free-seo-tools.html', '/seo-checklist-2026.html',
  '/google-algorithm-history.html', '/seo-roi-calculator.html', '/resume-builder.html',
  '/ads-quality-checker.html',
  '/tools/', '/tools/directory.html',
  '/courses/', '/books/', '/blog/', '/glossary/', '/skills/',
  '/pillar/seo-complete-guide.html', '/pillar/keyword-research-masterclass.html',
  '/pillar/technical-seo-checklist.html', '/pillar/seo-content-writing-guide.html',
];

// Build final list: non-indexed first, then remaining
const allUrls = [
  ...nonIndexed.map(u => BASE + u),
  ...remaining.map(u => BASE + u)
];

// Deduplicate
const seen = new Set();
const urls = allUrls.filter(u => { if (seen.has(u)) return false; seen.add(u); return true; });

async function requestIndexing(url) {
  try {
    await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' }
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log('Submitting ' + urls.length + ' URLs (' + nonIndexed.length + ' non-indexed first)...\n');
  let ok = 0, fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const success = await requestIndexing(urls[i]);
    const short = urls[i].replace(BASE, '');
    const tag = i < nonIndexed.length ? '[PRIORITY]' : '[REFRESH]';
    if (success) { ok++; console.log((i+1) + '. [OK] ' + tag + ' ' + short); }
    else { fail++; console.log((i+1) + '. [FAIL] ' + tag + ' ' + short); }
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, 1500));
  }
  console.log('\nDone! ' + ok + ' succeeded, ' + fail + ' failed. Total: ' + urls.length);
}

main().catch(e => console.error('Fatal:', e.message));
