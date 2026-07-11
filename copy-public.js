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
  'privacy-policy.html', 'terms.html', 'cookie-policy.html', '404.html'
];
for (const f of htmlFiles) {
  const sp = path.join(src, f);
  if (fs.existsSync(sp)) fs.copyFileSync(sp, path.join(dst, f));
}

// Copy other static files
const otherFiles = ['sitemap.xml', 'robots.txt', 'og-image.png', 'manifest.json', 'sw.js'];
for (const f of otherFiles) {
  const sp = path.join(src, f);
  if (fs.existsSync(sp)) fs.copyFileSync(sp, path.join(dst, f));
}

// Copy blog feed and standalone blog posts
fs.mkdirSync(path.join(dst, 'blog'), { recursive: true });
const blogFeed = path.join(src, 'blog', 'feed.xml');
if (fs.existsSync(blogFeed)) fs.copyFileSync(blogFeed, path.join(dst, 'blog', 'feed.xml'));
const blogIndex = path.join(src, 'blog', 'index.html');
if (fs.existsSync(blogIndex)) fs.copyFileSync(blogIndex, path.join(dst, 'blog', 'index.html'));
const standaloneBlogs = fs.readdirSync(path.join(src, 'blog'))
  .filter(f => f.endsWith('.html') && f !== 'template.html' && f !== 'index.html');
for (const b of standaloneBlogs) {
  const bp = path.join(src, 'blog', b);
  if (fs.existsSync(bp)) fs.copyFileSync(bp, path.join(dst, 'blog', b));
}

// Copy tools listing page
fs.mkdirSync(path.join(dst, 'tools'), { recursive: true });
const toolsIndex = path.join(src, 'tools', 'index.html');
if (fs.existsSync(toolsIndex)) fs.copyFileSync(toolsIndex, path.join(dst, 'tools', 'index.html'));
const smartLab = path.join(src, 'tools', 'smart-text-lab.html');
if (fs.existsSync(smartLab)) fs.copyFileSync(smartLab, path.join(dst, 'tools', 'smart-text-lab.html'));

console.log('Static files copied to public/');

} catch(err) {
  console.error('Copy error:', err.message);
  process.exit(1);
}
