const https = require('https');
const urls = [
  '/tools/word-counter.html',
  '/tools/char-counter.html',
  '/tools/ai-content-detector.html',
  '/tools/ai-humanizer.html',
  '/tools/ai-prompt-gen.html',
  '/blog/keyword-research.html',
  '/pillar/keyword-research-masterclass.html',
  '/seo-statistics-2026.html'
];
let done = 0;
urls.forEach(u => {
  https.get('https://azhai-six.vercel.app' + u, r => {
    let d = '';
    r.on('data', c => d += c);
    r.on('end', () => {
      const titleMatch = d.match(/<title[^>]*>([^<]+)<\/title>/);
      const canonicalMatch = d.match(/href="([^"]*)"[^>]*rel="canonical"/) || d.match(/rel="canonical"[^>]*href="([^"]*)"/);
      const descMatch = d.match(/name="description"\s+content="([^"]*)"/);
      const bodyText = d.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      console.log(u);
      console.log('  Title:', titleMatch ? titleMatch[1].substring(0, 80) : 'MISSING');
      console.log('  Canonical:', canonicalMatch ? canonicalMatch[1] : 'MISSING');
      console.log('  Description:', descMatch ? descMatch[1].substring(0, 80) : 'MISSING');
      console.log('  Body text length:', bodyText.length, 'chars');
      done++;
      if (done === urls.length) process.exit();
    });
  });
});
