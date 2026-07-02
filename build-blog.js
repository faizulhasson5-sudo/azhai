const fs = require('fs');
const path = require('path');

try {

const posts = [
{slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',desc:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours.',category:'SEO Tools',date:'2026-06-20',readTime:'8 min',image:'/blog/images/ultimate-guide-seo-text-tools.jpg'},
{slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',desc:'Learn the art of crafting compelling meta descriptions that improve CTR and boost search rankings.',category:'SEO Tips',date:'2026-06-18',readTime:'6 min',image:'/blog/images/meta-descriptions.jpg'},
{slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',desc:'Master JSON formatting, validation, and optimization with practical examples and free tools.',category:'Development',date:'2026-06-15',readTime:'7 min',image:'/blog/images/json-formatting.jpg'},
{slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',desc:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',date:'2026-06-12',readTime:'5 min',image:'/blog/images/markdown-bloggers.jpg'},
{slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',desc:'Learn how canonical tags prevent duplicate content issues and consolidate ranking signals.',category:'SEO Tips',date:'2026-06-10',readTime:'6 min',image:'/blog/images/canonical-tags.jpg'},
{slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',desc:'Master Open Graph meta tags to ensure your content looks amazing when shared on social media.',category:'Social Media',date:'2026-06-08',readTime:'5 min',image:'/blog/images/open-graph-tags.jpg'}
];

const blogContents = {
'ultimate-guide-seo-text-tools':'<h2>Why SEO Text Tools Matter</h2><p>In today\'s competitive digital landscape, having the right SEO tools can make or break your content strategy. Free online text tools provide instant analysis, optimization, and formatting capabilities that previously required expensive software.</p><h2>Top Tools Every Blogger Needs</h2><p>Word counters help you hit target lengths. Keyword density checkers prevent over-optimization. Meta tag generators ensure proper on-page SEO.</p><h2>How to Use Text Tools for Better Rankings</h2><p>Start with keyword research using our Keyword Extractor. Write your draft, then use the Keyword Density Checker to optimize. Generate meta tags with our Meta Tag Generator.</p><h2>Conclusion</h2><p>Free AI text tools democratize SEO. Whether you\'re a beginner blogger or experienced marketer, these tools streamline your workflow.</p>',
'how-to-write-perfect-meta-descriptions':'<h2>What Makes a Great Meta Description?</h2><p>A meta description is your elevator pitch in search results. It should be under 160 characters, include your target keyword, and compellingly describe what the page offers.</p><h2>Best Practices</h2><p>Always include a call-to-action. Use active voice. Match search intent. Include numbers when possible.</p><h2>Common Mistakes to Avoid</h2><p>Duplicate descriptions across pages, keyword stuffing, and missing descriptions entirely are the most common errors.</p>',
'json-formatting-best-practices':'<h2>Why Proper JSON Formatting Matters</h2><p>Well-formatted JSON is easier to read, debug, and maintain. It reduces errors in API integrations.</p><h2>JSON Formatting Rules</h2><p>Use consistent indentation. Order keys logically. Validate before deploying.</p><h2>Common JSON Errors</h2><p>Trailing commas, missing quotes around keys, and incorrect nesting are the most frequent issues.</p>',
'markdown-for-bloggers':'<h2>What is Markdown?</h2><p>Markdown is a lightweight markup language that lets you write formatted text using plain text syntax.</p><h2>Essential Markdown Syntax</h2><p># for headings, ** for bold, * for italic, - for lists, and > for blockquotes.</p><h2>Try Our Markdown Editor</h2><p>Our free Markdown Editor with live preview lets you write and see results instantly.</p>',
'understanding-canonical-tags-seo':'<h2>What Are Canonical Tags?</h2><p>A canonical tag tells search engines which version of a URL is the master version.</p><h2>When to Use Canonical Tags</h2><p>Use them when similar content exists at multiple URLs or when URL parameters create duplicate pages.</p><h2>Generate Canonical Tags</h2><p>Our Canonical Tag Generator creates proper link tags instantly.</p>',
'open-graph-tags-social-media':'<h2>Why Open Graph Tags Matter</h2><p>Open Graph tags control how your content appears when shared on social media.</p><h2>Essential OG Tags</h2><p>og:title, og:description, og:image, og:url, and og:type are the must-haves.</p><h2>Image Specifications</h2><p>Use 1200x630px for the best results across all platforms.</p>'
};

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

const templatePath = path.join(__dirname, 'blog', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const baseUrl = 'https://azhai-six.vercel.app';
const outDir = path.join(__dirname, 'public', 'blog');
fs.mkdirSync(outDir, { recursive: true });

posts.forEach(post => {
    const postUrl = baseUrl + '/blog/' + post.slug + '.html';
    let html = template;

    html = html.replace('<title id="page-title">Blog - Free AI Text Tools</title>',
        '<title id="page-title">'+esc(post.title)+'</title>');
    html = html.replace('<meta id="meta-desc" name="description" content="">',
        '<meta id="meta-desc" name="description" content="'+esc(post.desc)+'">');
    html = html.replace('<link rel="canonical" id="canonical-link" href="">',
        '<link rel="canonical" id="canonical-link" href="'+postUrl+'">');
    html = html.replace('<meta property="og:title" id="og-title" content="">',
        '<meta property="og:title" id="og-title" content="'+esc(post.title)+'">');
    html = html.replace('<meta property="og:description" id="og-desc" content="">',
        '<meta property="og:description" id="og-desc" content="'+esc(post.desc)+'">');
    html = html.replace('<meta property="og:url" id="og-url" content="">',
        '<meta property="og:url" id="og-url" content="'+postUrl+'">');
    html = html.replace('<meta name="twitter:title" id="tw-title" content="">',
        '<meta name="twitter:title" id="tw-title" content="'+esc(post.title)+'">');
    html = html.replace('<meta name="twitter:description" id="tw-desc" content="">',
        '<meta name="twitter:description" id="tw-desc" content="'+esc(post.desc)+'">');
    html = html.replace(/<meta property="og:image" content="[^"]*">/,'<meta property="og:image" content="https://azhai-six.vercel.app'+post.image+'">');
    html = html.replace(/<meta name="twitter:image" content="[^"]*">/,'<meta name="twitter:image" content="https://azhai-six.vercel.app'+post.image+'">');
    html = html.replace('</head>','<meta property="article:published_time" content="'+post.date+'">\n<meta property="article:section" content="'+post.category+'">\n</head>');

    html = html.replace(/id="blogTitle">[^<]*/,'id="blogTitle">'+esc(post.title));
    html = html.replace(/id="blogDate">[^<]*/,'id="blogDate">'+esc(post.date));
    html = html.replace(/id="blogCategory">[^<]*/,'id="blogCategory">'+esc(post.category));
    html = html.replace(/id="blogImage"[^>]*>/,'id="blogImage" src="'+esc(post.image)+'" alt="'+esc(post.title)+'" class="blog-hero-img">');
    html = html.replace('id="blogContent">','id="blogContent">'+(blogContents[post.slug]||''));

    const filePath = path.join(outDir, post.slug + '.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Created: public/blog/' + post.slug + '.html');
});

console.log('\nBlog build complete! ' + posts.length + ' posts generated.');

} catch(err) { console.error('Blog build failed:', err.message); process.exit(1); }
