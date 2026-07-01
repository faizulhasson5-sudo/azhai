// Build script: generates individual blog post HTML files from template.html
// Injects static meta tags at build time for SEO
// Run: node build-blog.js

const fs = require('fs');
const path = require('path');

const posts = [
    {slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',desc:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours of manual work.',category:'SEO Tools',image:'/blog/images/ultimate-guide-seo-text-tools.jpg'},
    {slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',desc:'Learn the art of crafting compelling meta descriptions that improve CTR and boost your search rankings.',category:'SEO Tips',image:'/blog/images/meta-descriptions.jpg'},
    {slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',desc:'Master JSON formatting, validation, and optimization with practical examples and free online tools.',category:'Development',image:'/blog/images/json-formatting.jpg'},
    {slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',desc:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',image:'/blog/images/markdown-bloggers.jpg'},
    {slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',desc:'Learn how canonical tags prevent duplicate content issues and consolidate your SEO ranking signals.',category:'SEO Tips',image:'/blog/images/canonical-tags.jpg'},
    {slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',desc:'Master Open Graph meta tags to ensure your content looks amazing when shared on Facebook, LinkedIn, and Twitter.',category:'Social Media',image:'/blog/images/open-graph-tags.jpg'}
];

const templatePath = path.join(__dirname, 'blog', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const baseUrl = 'https://azhai-six.vercel.app';

posts.forEach(post => {
    const postUrl = baseUrl + '/blog/' + post.slug + '.html';

    let html = template;

    // Inject static <title>
    html = html.replace(
        '<title id="page-title">Blog Post - Free AI Text Tools</title>',
        '<title id="page-title">' + escapeAttr(post.title) + ' - Free AI Text Tools</title>'
    );

    // Inject static meta description
    html = html.replace(
        /<meta id="meta-description" name="description" content="">/,
        '<meta id="meta-description" name="description" content="' + escapeAttr(post.desc) + '">'
    );

    // Inject static canonical URL
    html = html.replace(
        '<link rel="canonical" id="canonical-link" href="">',
        '<link rel="canonical" id="canonical-link" href="' + postUrl + '">'
    );

    // Inject static OG tags
    html = html.replace(
        '<meta property="og:title" id="og-title" content="">',
        '<meta property="og:title" id="og-title" content="' + escapeAttr(post.title) + '">'
    );
    html = html.replace(
        '<meta property="og:description" id="og-desc" content="">',
        '<meta property="og:description" id="og-desc" content="' + escapeAttr(post.desc) + '">'
    );
    html = html.replace(
        '<meta property="og:url" id="og-url" content="">',
        '<meta property="og:url" id="og-url" content="' + postUrl + '">'
    );
    if (post.image) {
        html = html.replace(
            '<meta property="og:image" id="og-image" content="">',
            '<meta property="og:image" id="og-image" content="' + baseUrl + post.image + '">'
        );
    }

    // Inject static Twitter tags
    html = html.replace(
        '<meta name="twitter:title" id="tw-title" content="">',
        '<meta name="twitter:title" id="tw-title" content="' + escapeAttr(post.title) + '">'
    );
    html = html.replace(
        '<meta name="twitter:description" id="tw-desc" content="">',
        '<meta name="twitter:description" id="tw-desc" content="' + escapeAttr(post.desc) + '">'
    );
    if (post.image) {
        html = html.replace(
            '<meta name="twitter:image" id="tw-image" content="">',
            '<meta name="twitter:image" id="tw-image" content="' + baseUrl + post.image + '">'
        );
    }

    const filePath = path.join(__dirname, 'blog', post.slug + '.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Created: blog/' + post.slug + '.html');
});

console.log('\nBuild complete! ' + posts.length + ' blog posts generated with static meta tags.');

function escapeAttr(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}