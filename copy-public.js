const fs = require('fs');
const path = require('path');

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
copyDir(path.join(src, 'css'), path.join(dst, 'css'));
copyDir(path.join(src, 'js'), path.join(dst, 'js'));
copyDir(path.join(src, 'blog', 'images'), path.join(dst, 'blog', 'images'));

// Copy static HTML files
const htmlFiles = [
  'index.html', 'about.html', 'contact.html', 'advertise.html',
  'privacy-policy.html', 'terms.html', 'cookie-policy.html', '404.html'
];
for (const f of htmlFiles) {
  fs.copyFileSync(path.join(src, f), path.join(dst, f));
}

// Copy tools/index.html
fs.mkdirSync(path.join(dst, 'tools'), { recursive: true });
fs.copyFileSync(path.join(src, 'tools', 'index.html'), path.join(dst, 'tools', 'index.html'));

// Copy other static files
const otherFiles = ['sitemap.xml', 'robots.txt', 'og-image.png'];
for (const f of otherFiles) {
  const sp = path.join(src, f);
  if (fs.existsSync(sp)) fs.copyFileSync(sp, path.join(dst, f));
}

// Copy blog feed
fs.mkdirSync(path.join(dst, 'blog'), { recursive: true });
fs.copyFileSync(path.join(src, 'blog', 'feed.xml'), path.join(dst, 'blog', 'feed.xml'));
fs.copyFileSync(path.join(src, 'blog', 'index.html'), path.join(dst, 'blog', 'index.html'));

console.log('Static files copied to public/');
