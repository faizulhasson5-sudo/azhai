const fs = require('fs');
const path = require('path');

try {

const src = __dirname;
const dst = path.join(__dirname, 'public');

function copyDir(s, d) {
  fs.mkdirSync(d, { recursive: true });
  for (const f of fs.readdirSync(s)) {
    const sp = path.join(s, f);
    const dp = path.join(d, f);
    if (fs.statSync(sp).isDirectory()) {
      copyDir(sp, dp);
    } else {
      fs.copyFileSync(sp, dp);
    }
  }
}

// Copy static assets
if (fs.existsSync(path.join(src, 'css'))) copyDir(path.join(src, 'css'), path.join(dst, 'css'));
if (fs.existsSync(path.join(src, 'js'))) copyDir(path.join(src, 'js'), path.join(dst, 'js'));
if (fs.existsSync(path.join(src, 'fonts'))) copyDir(path.join(src, 'fonts'), path.join(dst, 'fonts'));
if (fs.existsSync(path.join(src, 'blog', 'images'))) copyDir(path.join(src, 'blog', 'images'), path.join(dst, 'blog', 'images'));

// Copy static HTML files
const htmlFiles = [
  'index.html', 'about.html', 'contact.html', 'advertise.html',
  'privacy-policy.html', 'terms.html', 'cookie-policy.html', '404.html',
  'seo-statistics-2026.html', 'best-free-seo-tools.html', 'seo-checklist-2026.html', 'google-algorithm-history.html', 'seo-roi-calculator.html', 'editorial-policy.html',
  'resume-builder.html', 'ads-quality-checker.html'
];
for (const f of htmlFiles) {
  const sp = path.join(src, f);
  if (fs.existsSync(sp)) fs.copyFileSync(sp, path.join(dst, f));
}

// Copy other static files
const otherFiles = ['robots.txt', 'og-image.png', 'manifest.json', 'sw.js', 'favicon.svg'];
for (const f of otherFiles) {
  const sp = path.join(src, f);
  if (fs.existsSync(sp)) fs.copyFileSync(sp, path.join(dst, f));
}

// Copy blog feed and standalone blog posts (NOT index.html - build-blog.js generates it)
fs.mkdirSync(path.join(dst, 'blog'), { recursive: true });
const blogFeed = path.join(src, 'blog', 'feed.xml');
if (fs.existsSync(blogFeed)) fs.copyFileSync(blogFeed, path.join(dst, 'blog', 'feed.xml'));
const standaloneBlogs = fs.readdirSync(path.join(src, 'blog'))
  .filter(f => f.endsWith('.html') && f !== 'template.html' && f !== 'index.html');
for (const b of standaloneBlogs) {
  const bp = path.join(src, 'blog', b);
  if (fs.existsSync(bp)) {
    const firstLine = fs.readFileSync(bp, 'utf8').substring(0, 50);
    if (!firstLine.includes('<!DOCTYPE html>')) continue;
    fs.copyFileSync(bp, path.join(dst, 'blog', b));
  }
}

// Copy pillar pages
fs.mkdirSync(path.join(dst, 'pillar'), { recursive: true });
const pillarDir = path.join(src, 'pillar');
if (fs.existsSync(pillarDir)) {
  const pillarFiles = fs.readdirSync(pillarDir).filter(f => f.endsWith('.html'));
  for (const p of pillarFiles) {
    const pp = path.join(pillarDir, p);
    if (fs.existsSync(pp)) fs.copyFileSync(pp, path.join(dst, 'pillar', p));
  }
}

// Copy tools listing page
fs.mkdirSync(path.join(dst, 'tools'), { recursive: true });
const toolsIndex = path.join(src, 'tools', 'index.html');
if (fs.existsSync(toolsIndex)) fs.copyFileSync(toolsIndex, path.join(dst, 'tools', 'index.html'));
const smartLab = path.join(src, 'tools', 'smart-text-lab.html');
if (fs.existsSync(smartLab)) fs.copyFileSync(smartLab, path.join(dst, 'tools', 'smart-text-lab.html'));

// Copy author pages
fs.mkdirSync(path.join(dst, 'authors'), { recursive: true });
const authorDir = path.join(src, 'authors');
if (fs.existsSync(authorDir)) {
  const authorFiles = fs.readdirSync(authorDir).filter(f => f.endsWith('.html'));
  for (const a of authorFiles) {
    const ap = path.join(authorDir, a);
    if (fs.existsSync(ap)) fs.copyFileSync(ap, path.join(dst, 'authors', a));
  }
}

// Copy skills directory
fs.mkdirSync(path.join(dst, 'skills'), { recursive: true });
const skillsDir = path.join(src, 'skills');
if (fs.existsSync(skillsDir)) {
  const skillFiles = fs.readdirSync(skillsDir).filter(f => f.endsWith('.html'));
  for (const s of skillFiles) {
    const sp2 = path.join(skillsDir, s);
    if (fs.existsSync(sp2)) fs.copyFileSync(sp2, path.join(dst, 'skills', s));
  }
}

// Copy editorial policy
const editorialPolicy = path.join(src, 'editorial-policy.html');
if (fs.existsSync(editorialPolicy)) fs.copyFileSync(editorialPolicy, path.join(dst, 'editorial-policy.html'));

console.log('Static files copied to public/');

} catch(err) {
  console.error('Copy error:', err.message);
  process.exit(1);
}
