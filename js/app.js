/* ============================================================
   Free AI Text Tools — Core Application v2
   All bugs fixed · localStorage guards · Proper icons
   ============================================================ */
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','G-XDHMXW7PR2');

(function(){
'use strict';
window.App=window.App||{};

/* ---- Helpers ---- */
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}

/* ---- Theme ---- */
var saved=lsGet('attTheme');
if(!saved){
  saved=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
}
document.documentElement.setAttribute('data-theme',saved);

App.toggleTheme=function(){
  var c=document.documentElement.getAttribute('data-theme');
  var n=c==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',n);
  lsSet('attTheme',n);
  var b=document.querySelector('.theme-btn');
  if(b){
    b.textContent=n==='dark'?'\u2600':'\u263E';
    b.setAttribute('aria-label',n==='dark'?'Switch to light mode':'Switch to dark mode');
  }
};

/* ---- Toast ---- */
App.toast=function(msg,dur){
  dur=dur||2000;
  var t=document.getElementById('appToast');
  if(!t)return;
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},dur);
};

/* ---- Cookie Consent ---- */
App.initCookieConsent=function(){
  if(lsGet('attCookies'))return;
  var b=document.getElementById('cookieBanner');
  if(!b)return;
  b.classList.add('show');
  var a=document.getElementById('cookieAccept');
  var r=document.getElementById('cookieReject');
  if(a)a.addEventListener('click',function(){lsSet('attCookies','accepted');b.classList.remove('show');});
  if(r)r.addEventListener('click',function(){lsSet('attCookies','rejected');b.classList.remove('show');});
};

/* ---- Tools Data ---- */
App.tools=[
{id:'word-counter',name:'Word Counter',cat:'counters',desc:'Count words, characters, and lines'},
{id:'char-counter',name:'Character Counter',cat:'counters',desc:'Count characters with/without spaces'},
{id:'sentence-counter',name:'Sentence Counter',cat:'counters',desc:'Count sentences by punctuation'},
{id:'paragraph-counter',name:'Paragraph Counter',cat:'counters',desc:'Count paragraphs by empty lines'},
{id:'word-frequency',name:'Word Frequency',cat:'counters',desc:'Count word occurrences in text'},
{id:'case-converter',name:'Case Converter',cat:'converters',desc:'UPPER, lower, Title, Sentence case'},
{id:'remove-spaces',name:'Remove Extra Spaces',cat:'cleaners',desc:'Clean double spaces and breaks'},
{id:'find-replace',name:'Find and Replace',cat:'text',desc:'Search and replace text instantly'},
{id:'line-sorter',name:'Line Sorter',cat:'text',desc:'Sort lines ascending/descending'},
{id:'alpha-sorter',name:'Alphabetical Sorter',cat:'text',desc:'Sort lines alphabetically'},
{id:'text-reverser',name:'Text Reverser',cat:'text',desc:'Reverse chars, words, or lines'},
{id:'duplicate-remover',name:'Duplicate Remover',cat:'text',desc:'Remove duplicate lines from text'},
{id:'lorem-generator',name:'Lorem Generator',cat:'text',desc:'Generate Lorem Ipsum placeholder text'},
{id:'slug-generator',name:'Slug Generator',cat:'seo',desc:'URL-friendly slug from any title'},
{id:'keyword-density',name:'Keyword Density',cat:'seo',desc:'Check keyword frequency and density'},
{id:'keyword-extract',name:'Keyword Extractor',cat:'seo',desc:'Extract top keywords from text'},
{id:'meta-gen',name:'Meta Tag Generator',cat:'seo',desc:'Generate complete HTML meta tags'},
{id:'meta-desc-gen',name:'Meta Description Gen',cat:'seo',desc:'Generate SEO meta descriptions'},
{id:'og-generator',name:'OG Tag Generator',cat:'seo',desc:'Open Graph tags for social media'},
{id:'canonical-gen',name:'Canonical Tag Generator',cat:'seo',desc:'Generate canonical link tags'},
{id:'robots-txt',name:'Robots.txt Generator',cat:'seo',desc:'Generate crawler directives'},
{id:'sitemap-gen',name:'Sitemap Generator',cat:'seo',desc:'Create XML sitemaps'},
{id:'json-formatter',name:'JSON Formatter',cat:'code',desc:'Beautify and validate JSON'},
{id:'json-validator',name:'JSON Validator',cat:'code',desc:'Validate JSON syntax'},
{id:'xml-formatter',name:'XML Formatter',cat:'code',desc:'Pretty-print XML documents'},
{id:'xml-validator',name:'XML Validator',cat:'code',desc:'Validate XML structure'},
{id:'markdown-editor',name:'Markdown Editor',cat:'code',desc:'Write Markdown with live preview'},
{id:'markdown-preview',name:'Markdown Previewer',cat:'code',desc:'Preview Markdown as HTML'},
{id:'html-previewer',name:'HTML Previewer',cat:'code',desc:'Preview HTML code in real-time'},
{id:'regex-tester',name:'Regex Tester',cat:'code',desc:'Test regular expressions live'},
{id:'url-encoder',name:'URL Encoder',cat:'code',desc:'Encode special URL characters'},
{id:'url-decoder',name:'URL Decoder',cat:'code',desc:'Decode URL-encoded strings'},
{id:'html-encoder',name:'HTML Encoder',cat:'code',desc:'Escape HTML entities'},
{id:'html-decoder',name:'HTML Decoder',cat:'code',desc:'Decode HTML entities'},
{id:'b64-encoder',name:'Base64 Encoder',cat:'code',desc:'Encode text to Base64'},
{id:'b64-decoder',name:'Base64 Decoder',cat:'code',desc:'Decode Base64 strings'},
{id:'hash-generator',name:'Hash Generator',cat:'code',desc:'Generate simple text hashes'}
];

App.getToolById=function(id){return App.tools.find(function(t){return t.id===id;});};
App.getAllTools=function(){return App.tools;};

App.toggleMenu=function(){
  var n=document.querySelector('.nav');
  var btn=document.querySelector('.menu-toggle');
  if(n)n.classList.toggle('open');
  if(btn){
    var open=n&&n.classList.contains('open');
    btn.textContent=open?'\u2715':'\u2630';
    btn.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
  }
};

/* ---- Blog Data ---- */
App.blogPosts=[
{slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',excerpt:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours of manual work.',category:'SEO Tools',date:'2026-06-20',readTime:'8 min',image:'/blog/images/ultimate-guide-seo-text-tools.jpg',content:'<h2>Why SEO Text Tools Matter</h2><p>In today\'s competitive digital landscape, having the right SEO tools can make or break your content strategy. Free online text tools provide instant analysis, optimization, and formatting capabilities that previously required expensive software.</p><h2>Top Tools Every Blogger Needs</h2><p>Word counters help you hit target lengths. Keyword density checkers prevent over-optimization. Meta tag generators ensure proper on-page SEO.</p><h2>How to Use Text Tools for Better Rankings</h2><p>Start with keyword research using our Keyword Extractor. Write your draft, then use the Keyword Density Checker to optimize. Generate meta tags with our Meta Tag Generator.</p><h2>Conclusion</h2><p>Free AI text tools democratize SEO. Whether you\'re a beginner blogger or experienced marketer, these tools streamline your workflow.</p>'},
{slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',excerpt:'Learn the art of crafting compelling meta descriptions that improve CTR and boost your search rankings.',category:'SEO Tips',date:'2026-06-18',readTime:'6 min',image:'/blog/images/meta-descriptions.jpg',content:'<h2>What Makes a Great Meta Description?</h2><p>A meta description is your elevator pitch in search results. It should be under 160 characters, include your target keyword, and compellingly describe what the page offers.</p><h2>Best Practices</h2><p>Always include a call-to-action. Use active voice. Match search intent. Include numbers when possible.</p><h2>Common Mistakes to Avoid</h2><p>Duplicate descriptions across pages, keyword stuffing, and missing descriptions entirely are the most common errors.</p>'},
{slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',excerpt:'Master JSON formatting, validation, and optimization with practical examples and free online tools.',category:'Development',date:'2026-06-15',readTime:'7 min',image:'/blog/images/json-formatting.jpg',content:'<h2>Why Proper JSON Formatting Matters</h2><p>Well-formatted JSON is easier to read, debug, and maintain. It reduces errors in API integrations.</p><h2>JSON Formatting Rules</h2><p>Use consistent indentation. Order keys logically. Validate before deploying.</p><h2>Common JSON Errors</h2><p>Trailing commas, missing quotes around keys, and incorrect nesting are the most frequent issues.</p>'},
{slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',excerpt:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',date:'2026-06-12',readTime:'5 min',image:'/blog/images/markdown-bloggers.jpg',content:'<h2>What is Markdown?</h2><p>Markdown is a lightweight markup language that lets you write formatted text using plain text syntax.</p><h2>Essential Markdown Syntax</h2><p># for headings, ** for bold, * for italic, - for lists, and > for blockquotes.</p><h2>Try Our Markdown Editor</h2><p>Our free Markdown Editor with live preview lets you write and see results instantly.</p>'},
{slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',excerpt:'Learn how canonical tags prevent duplicate content issues and consolidate your SEO ranking signals.',category:'SEO Tips',date:'2026-06-10',readTime:'6 min',image:'/blog/images/canonical-tags.jpg',content:'<h2>What Are Canonical Tags?</h2><p>A canonical tag tells search engines which version of a URL is the master version.</p><h2>When to Use Canonical Tags</h2><p>Use them when similar content exists at multiple URLs or when URL parameters create duplicate pages.</p><h2>Generate Canonical Tags</h2><p>Our Canonical Tag Generator creates proper link tags instantly.</p>'},
{slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',excerpt:'Master Open Graph meta tags to ensure your content looks amazing when shared on social media.',category:'Social Media',date:'2026-06-08',readTime:'5 min',image:'/blog/images/open-graph-tags.jpg',content:'<h2>Why Open Graph Tags Matter</h2><p>Open Graph tags control how your content appears when shared on social media.</p><h2>Essential OG Tags</h2><p>og:title, og:description, og:image, og:url, and og:type are the must-haves.</p><h2>Image Specifications</h2><p>Use 1200x630px for the best results across all platforms.</p>'}
];

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded',function(){
  App.initCookieConsent();

  /* Header scroll shadow */
  var header=document.querySelector('.site-header');
  if(header){
    var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>10);};
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }

  /* Theme button init */
  var btn=document.querySelector('.theme-btn');
  if(btn){
    btn.textContent=saved==='dark'?'\u2600':'\u263E';
    btn.setAttribute('aria-label',saved==='dark'?'Switch to light mode':'Switch to dark mode');
  }
});

})();
