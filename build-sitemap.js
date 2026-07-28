const fs = require('fs');
const path = require('path');

const baseUrl = 'https://azhai-six.vercel.app';
const today = new Date().toISOString().slice(0, 10);

// Auto-discover all HTML pages from public/
function walk(dir, results) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, results);
    else if (f.endsWith('.html') && f !== 'template.html') results.push(p);
  });
}

const pubDir = path.join(__dirname, 'public');
const pages = [];
walk(pubDir, pages);

// Priority map: higher priority for money pages
function getPriority(rel) {
  if (rel === 'index.html') return '1.0';
  if (rel.startsWith('tools/') && !rel.includes('directory') && !rel.includes('index')) return '0.8';
  if (rel.startsWith('skills/') && !rel.includes('index')) return '0.8';
  if (rel.startsWith('blog/') && !rel.includes('index') && !rel.includes('strategy') && !rel.includes('keyword-research') && !rel.includes('tutorials')) return '0.8';
  if (rel.startsWith('pillar/')) return '0.9';
  if (rel.startsWith('glossary/') && !rel.includes('index') && !rel.includes('category/')) return '0.8';
  if (rel.startsWith('courses/')) return '0.9';
  if (rel.startsWith('books/')) return '0.9';
  if (rel.startsWith('authors/')) return '0.7';
  if (rel === 'tools/index.html' || rel === 'tools/directory.html') return '0.9';
  if (rel.includes('seo-') || rel.includes('best-') || rel.includes('google-')) return '0.9';
  if (rel === 'about.html') return '0.7';
  if (rel.includes('policy') || rel.includes('terms')) return '0.5';
  return '0.7';
}

function getChangeFreq(rel) {
  if (rel === 'index.html') return 'daily';
  if (rel.startsWith('tools/') || rel.startsWith('skills/') || rel.startsWith('blog/')) return 'weekly';
  if (rel.startsWith('courses/') || rel.startsWith('books/')) return 'weekly';
  if (rel.startsWith('pillar/') || rel.startsWith('glossary/')) return 'monthly';
  return 'monthly';
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

let count = 0;
pages.forEach(p => {
  const rel = path.relative(pubDir, p).replace(/\\/g, '/');
  if (rel === '404.html') return;
  const loc = baseUrl + '/' + rel;
  xml += `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${getChangeFreq(rel)}</changefreq><priority>${getPriority(rel)}</priority></url>\n`;
  count++;
});

xml += '</urlset>';

const outPath = path.join(pubDir, 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Sitemap generated: ' + outPath);
console.log('Total URLs: ' + count);
