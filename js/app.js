/* ===================================================
   Free AI Text Tools - Core Application JavaScript
   =================================================== */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XDHMXW7PR2');

(function(){
'use strict';

window.App = window.App || {};

// ---- Theme ----
var savedTheme = localStorage.getItem('attTheme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

App.toggleTheme = function(){
    var c = document.documentElement.getAttribute('data-theme');
    var n = c === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('attTheme', n);
    var btn = document.querySelector('.theme-btn');
    if(btn) btn.textContent = n === 'dark' ? '\u2600' : '\u263E';
};

// ---- Toast ----
App.toast = function(msg, dur){
    dur = dur || 2000;
    var t = document.getElementById('appToast');
    if(!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); }, dur);
};

// ---- Cookie Consent ----
App.initCookieConsent = function(){
    if(localStorage.getItem('attCookies') === 'accepted') return;
    var banner = document.getElementById('cookieBanner') || document.getElementById('cookie-consent');
    if(!banner) return;
    banner.classList.add('show');
    var acceptBtn = document.getElementById('cookieAccept');
    var rejectBtn = document.getElementById('cookieReject');
    if(acceptBtn) acceptBtn.addEventListener('click', function(){
        localStorage.setItem('attCookies','accepted');
        banner.classList.remove('show');
    });
    if(rejectBtn) rejectBtn.addEventListener('click', function(){
        localStorage.setItem('attCookies','rejected');
        banner.classList.remove('show');
    });
};

// ---- Tool System ----
App.tools = [
    {id:'duplicate-remover',name:'Duplicate Line Remover',cat:'text',desc:'Remove repeated lines from text'},
    {id:'word-counter',name:'Word Counter',cat:'counters',desc:'Count total words accurately'},
    {id:'char-counter',name:'Character Counter',cat:'counters',desc:'Count characters with/without spaces'},
    {id:'sentence-counter',name:'Sentence Counter',cat:'counters',desc:'Count sentences by punctuation'},
    {id:'paragraph-counter',name:'Paragraph Counter',cat:'counters',desc:'Count paragraphs by empty lines'},
    {id:'case-converter',name:'Case Converter',cat:'converters',desc:'UPPER, lower, Title, Sentence case'},
    {id:'remove-spaces',name:'Remove Extra Spaces',cat:'cleaners',desc:'Clean double spaces and line breaks'},
    {id:'line-sorter',name:'Line Sorter',cat:'text',desc:'Sort lines ascending/descending'},
    {id:'alpha-sorter',name:'Alphabetical Sorter',cat:'text',desc:'Sort lines alphabetically'},
    {id:'text-reverser',name:'Text Reverser',cat:'text',desc:'Reverse chars, words, or lines'},
    {id:'url-encoder',name:'URL Encoder',cat:'encoders',desc:'Encode special URL characters'},
    {id:'url-decoder',name:'URL Decoder',cat:'encoders',desc:'Decode URL-encoded strings'},
    {id:'html-encoder',name:'HTML Encoder',cat:'encoders',desc:'Escape HTML entities'},
    {id:'html-decoder',name:'HTML Decoder',cat:'encoders',desc:'Decode HTML entities'},
    {id:'b64-encoder',name:'Base64 Encoder',cat:'encoders',desc:'Encode text to Base64'},
    {id:'b64-decoder',name:'Base64 Decoder',cat:'encoders',desc:'Decode Base64 strings'},
    {id:'json-formatter',name:'JSON Formatter',cat:'code',desc:'Beautify and format JSON'},
    {id:'json-validator',name:'JSON Validator',cat:'code',desc:'Validate JSON syntax'},
    {id:'xml-formatter',name:'XML Formatter',cat:'code',desc:'Pretty-print XML documents'},
    {id:'xml-validator',name:'XML Validator',cat:'code',desc:'Validate XML structure'},
    {id:'markdown-editor',name:'Markdown Editor',cat:'code',desc:'Write Markdown with live preview'},
    {id:'markdown-preview',name:'Markdown Previewer',cat:'code',desc:'Preview Markdown as HTML'},
    {id:'robots-txt',name:'Robots.txt Generator',cat:'seo',desc:'Generate crawler directives'},
    {id:'sitemap-gen',name:'Sitemap Generator',cat:'seo',desc:'Create XML sitemaps'},
    {id:'meta-gen',name:'Meta Tag Generator',cat:'seo',desc:'Generate HTML meta tags'},
    {id:'keyword-density',name:'Keyword Density',cat:'seo',desc:'Check keyword frequency'},
    {id:'keyword-extract',name:'Keyword Extractor',cat:'seo',desc:'Extract top keywords from text'},
    {id:'og-generator',name:'OG Generator',cat:'seo',desc:'Open Graph meta tags'},
    {id:'slug-generator',name:'Slug Generator',cat:'seo',desc:'URL-friendly slug from title'},
    {id:'meta-desc-gen',name:'Meta Desc Generator',cat:'seo',desc:'SEO meta description under 160 chars'},
    {id:'canonical-gen',name:'Canonical Tag Gen',cat:'seo',desc:'Generate canonical link tags'},
    {id:'find-replace',name:'Find and Replace',cat:'text',desc:'Search and replace text instantly'},
    {id:'regex-tester',name:'Regex Tester',cat:'code',desc:'Test regular expressions live'},
    {id:'html-previewer',name:'HTML Previewer',cat:'code',desc:'Preview HTML code in real-time'},
    {id:'hash-generator',name:'Hash Generator',cat:'code',desc:'Generate simple text hashes'},
    {id:'lorem-generator',name:'Lorem Generator',cat:'text',desc:'Generate Lorem Ipsum placeholder text'},
    {id:'word-frequency',name:'Word Frequency',cat:'counters',desc:'Count word occurrences in text'}
];

App.getToolById = function(id){ return App.tools.find(function(t){ return t.id === id; }); };

// ---- Blog Data ----
App.blogPosts = [
    {
        slug:'ultimate-guide-seo-text-tools',
        title:'The Ultimate Guide to Free SEO Text Tools in 2026',
        excerpt:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours of manual work.',
        category:'SEO Tools',
        date:'2026-06-20',
        readTime:'8 min',
        tags:['SEO','tools','content'],
        image:'/blog/images/ultimate-guide-seo-text-tools.jpg',
        banner:'/blog/images/ultimate-guide-seo-text-tools-banner.jpg',
        content:'<h2>Why SEO Text Tools Matter</h2><p>In today\'s competitive digital landscape, having the right SEO tools can make or break your content strategy. Free online text tools provide instant analysis, optimization, and formatting capabilities that previously required expensive software.</p><h2>Top Tools Every Blogger Needs</h2><p>Word counters help you hit target lengths. Keyword density checkers prevent over-optimization. Meta tag generators ensure proper on-page SEO. These tools work together to create content that both readers and search engines love.</p><h2>How to Use Text Tools for Better Rankings</h2><p>Start with keyword research using our Keyword Extractor. Write your draft, then use the Keyword Density Checker to optimize. Generate meta tags with our Meta Tag Generator. Check your character counts for social media previews. Each step improves your content\'s visibility.</p><h2>Conclusion</h2><p>Free AI text tools democratize SEO. Whether you\'re a beginner blogger or experienced marketer, these tools streamline your workflow and help you create optimized content faster.</p>'
    },
    {
        slug:'how-to-write-perfect-meta-descriptions',
        title:'How to Write Perfect Meta Descriptions That Get Clicks',
        excerpt:'Learn the art of crafting compelling meta descriptions that improve CTR and boost your search rankings.',
        category:'SEO Tips',
        date:'2026-06-18',
        readTime:'6 min',
        tags:['meta tags','SEO','CTR'],
        image:'/blog/images/meta-descriptions.jpg',
        banner:'/blog/images/meta-descriptions-banner.jpg',
        content:'<h2>What Makes a Great Meta Description?</h2><p>A meta description is your elevator pitch in search results. It should be under 160 characters, include your target keyword, and compellingly describe what the page offers.</p><h2>Best Practices for Meta Descriptions</h2><p>Always include a call-to-action. Use active voice. Match search intent. Include numbers when possible. Our Meta Description Generator can help you craft optimized descriptions in seconds.</p><h2>Common Mistakes to Avoid</h2><p>Duplicate descriptions across pages, keyword stuffing, missing descriptions entirely, and writing descriptions that don\'t match page content are the most common errors.</p>'
    },
    {
        slug:'json-formatting-best-practices',
        title:'JSON Formatting Best Practices for Developers',
        excerpt:'Master JSON formatting, validation, and optimization with practical examples and free online tools.',
        category:'Development',
        date:'2026-06-15',
        readTime:'7 min',
        tags:['JSON','development','API'],
        image:'/blog/images/json-formatting.jpg',
        banner:'/blog/images/json-formatting-banner.jpg',
        content:'<h2>Why Proper JSON Formatting Matters</h2><p>Well-formatted JSON is easier to read, debug, and maintain. It reduces errors in API integrations and makes collaboration smoother.</p><h2>JSON Formatting Rules</h2><p>Use consistent indentation (2 spaces). Order keys logically. Validate before deploying. Our JSON Formatter and Validator tools make this effortless.</p><h2>Common JSON Errors</h2><p>Trailing commas, missing quotes around keys, and incorrect nesting are the most frequent issues. Always validate your JSON before sending it to an API.</p>'
    },
    {
        slug:'markdown-for-bloggers',
        title:'Markdown for Bloggers: A Complete Beginner Guide',
        excerpt:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',
        category:'Blogging',
        date:'2026-06-12',
        readTime:'5 min',
        tags:['Markdown','blogging','writing'],
        image:'/blog/images/markdown-bloggers.jpg',
        banner:'/blog/images/markdown-bloggers-banner.jpg',
        content:'<h2>What is Markdown?</h2><p>Markdown is a lightweight markup language that lets you write formatted text using plain text syntax. It\'s used everywhere from GitHub to blog platforms.</p><h2>Essential Markdown Syntax</h2><p># for headings, ** for bold, * for italic, - for lists, and > for blockquotes. That\'s really all you need to start writing great content.</p><h2>Try Our Markdown Editor</h2><p>Our free Markdown Editor with live preview lets you write and see results instantly. Perfect for documentation, README files, and blog posts.</p>'
    },
    {
        slug:'understanding-canonical-tags-seo',
        title:'Understanding Canonical Tags: The Complete SEO Guide',
        excerpt:'Learn how canonical tags prevent duplicate content issues and consolidate your SEO ranking signals.',
        category:'SEO Tips',
        date:'2026-06-10',
        readTime:'6 min',
        tags:['canonical','SEO','duplicate content'],
        image:'/blog/images/canonical-tags.jpg',
        banner:'/blog/images/canonical-tags-banner.jpg',
        content:'<h2>What Are Canonical Tags?</h2><p>A canonical tag tells search engines which version of a URL is the "master" version. It\'s essential for preventing duplicate content penalties.</p><h2>When to Use Canonical Tags</h2><p>Use them when similar content exists at multiple URLs, when URL parameters create duplicate pages, or when syndicating content across domains.</p><h2>Generate Canonical Tags</h2><p>Our Canonical Tag Generator creates proper link tags instantly. Just enter your preferred URL and copy the output into your HTML head.</p>'
    },
    {
        slug:'open-graph-tags-social-media',
        title:'Open Graph Tags: Get Perfect Social Media Previews',
        excerpt:'Master Open Graph meta tags to ensure your content looks amazing when shared on Facebook, LinkedIn, and Twitter.',
        category:'Social Media',
        date:'2026-06-08',
        readTime:'5 min',
        tags:['Open Graph','social media','meta tags'],
        image:'/blog/images/open-graph-tags.jpg',
        banner:'/blog/images/open-graph-tags-banner.jpg',
        content:'<h2>Why Open Graph Tags Matter</h2><p>Open Graph tags control how your content appears when shared on social media. Without them, platforms guess how to display your link - often badly.</p><h2>Essential OG Tags</h2><p>og:title, og:description, og:image, og:url, and og:type are the must-haves. Our OG Generator creates complete tags including Twitter Card support.</p><h2>Image Specifications</h2><p>Use 1200x630px for the best results across all platforms. Keep file size under 1MB. Use JPG or PNG format.</p>'
    }
];

// ---- Init (minimal - let pages handle their own UI) ----
document.addEventListener('DOMContentLoaded', function(){
    App.initCookieConsent();
});

})();