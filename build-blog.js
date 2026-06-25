// Build script: generates individual blog post HTML files from template.html
// Run: node build-blog.js

const fs = require('fs');
const path = require('path');

const posts = [
    'ultimate-guide-seo-text-tools',
    'how-to-write-perfect-meta-descriptions',
    'json-formatting-best-practices',
    'markdown-for-bloggers',
    'understanding-canonical-tags-seo',
    'open-graph-tags-social-media'
];

const templatePath = path.join(__dirname, 'blog', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');

posts.forEach(slug => {
    const filePath = path.join(__dirname, 'blog', slug + '.html');
    fs.writeFileSync(filePath, template, 'utf8');
    console.log('Created: blog/' + slug + '.html');
});

console.log('\nBuild complete! ' + posts.length + ' blog posts generated.');
