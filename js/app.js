/* ============================================================
   KwordSEO — Core Application v3
   All bugs fixed · localStorage guards · Proper icons
   GA behind consent · Fixed focus · Fixed dark contrast
   ============================================================ */

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
var _toastTimer;
App.toast=function(msg,dur){
  dur=dur||2000;
  var t=document.getElementById('appToast');
  if(!t)return;
  clearTimeout(_toastTimer);
  t.textContent=msg;
  t.classList.add('show');
  _toastTimer=setTimeout(function(){t.classList.remove('show');},dur);
};

/* ---- Analytics (only after consent) ---- */
App.initAnalytics=function(){
  if(lsGet('attCookies')!=='accepted')return;
  if(window._gaInitialized)return;
  window._gaInitialized=true;
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied'});
  gtag('js',new Date());
  gtag('config','G-XDHMXW7PR2');
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-XDHMXW7PR2';
  document.head.appendChild(s);
};

/* ---- GTM Events (via GA4 gtag) ---- */
App.trackEvent=function(eventName,params){
  if(typeof gtag==='function'){
    gtag('event',eventName,params||{});
  }else{
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(Object.assign({event:eventName},params||{}));
  }
};

App.trackToolUsage=function(toolName){
  App.trackEvent('tool_usage',{tool_name:toolName});
};

App.trackBlogRead=function(slug,category){
  App.trackEvent('blog_read',{blog_slug:slug,blog_category:category});
};

App.trackScrollDepth=function(percent,slug){
  App.trackEvent('scroll_depth',{percent:percent,blog_slug:slug});
};

App.trackCookieConsent=function(choice){
  App.trackEvent('cookie_consent',{consent_choice:choice});
};

App.trackToolHistoryRestore=function(toolName){
  App.trackEvent('tool_history_restore',{tool_name:toolName});
};

/* ---- Scroll Depth Tracking (blog posts) ---- */
App.initScrollTracking=function(){
  var slug=document.querySelector('meta[property="og:url"]')?.content?.match(/\/blog\/(.+)\.html/)?.[1];
  if(!slug)return;
  var tracked={};
  function checkScroll(){
    var h=document.documentElement;
    var pct=Math.round((h.scrollTop/(h.scrollHeight-h.clientHeight))*100);
    [25,50,75,100].forEach(function(t){
      if(pct>=t&&!tracked[t]){
        tracked[t]=true;
        App.trackScrollDepth(t,slug);
      }
    });
  }
  window.addEventListener('scroll',checkScroll,{passive:true});
};

/* ---- Cookie Consent ---- */
App.initCookieConsent=function(){
  var b=document.getElementById('cookieBanner');
  if(!b)return;
  if(lsGet('attCookies')){
    App.initAnalytics();
    return;
  }
  b.classList.add('show');
  var a=document.getElementById('cookieAccept');
  var r=document.getElementById('cookieReject');
  if(a)a.addEventListener('click',function(){
    lsSet('attCookies','accepted');
    b.classList.remove('show');
    App.initAnalytics();
    App.trackCookieConsent('accepted');
  });
  if(r)r.addEventListener('click',function(){
    lsSet('attCookies','rejected');
    b.classList.remove('show');
    App.trackCookieConsent('rejected');
  });
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
{id:'hash-generator',name:'Hash Generator',cat:'code',desc:'Generate simple text hashes'},
{id:'hreflang-gen',name:'Hreflang Generator',cat:'seo',desc:'Generate hreflang tags for multilingual sites'},
{id:'schema-gen',name:'Schema Generator',cat:'seo',desc:'Generate structured data JSON-LD markup'},
{id:'faq-schema-gen',name:'FAQ Schema Generator',cat:'seo',desc:'Generate FAQ structured data for rich results'},
{id:'article-schema-gen',name:'Article Schema Generator',cat:'seo',desc:'Generate article structured data markup'},
{id:'breadcrumb-schema-gen',name:'Breadcrumb Schema Generator',cat:'seo',desc:'Generate breadcrumb structured data'},
{id:'pdf-to-word',name:'PDF to Word Converter',cat:'converters',desc:'Convert PDF files to editable Word documents'},
{id:'word-to-pdf',name:'Word to PDF Converter',cat:'converters',desc:'Convert Word documents to PDF files'},
{id:'smart-text-lab',name:'Smart Text Lab',cat:'text',desc:'All-in-one workspace with live stats and quick actions'}
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
{slug:'google-ai-overview-spam-policy-2026',title:'Google\'s AI Overview Spam Policy: What Gets You Penalized in 2026',excerpt:'Google now treats AI Overview manipulation as spam. Learn what\'s banned, what still works, and how to stay compliant.',category:'Policy Update',date:'2026-07-02',readTime:'12 min',image:'/blog/images/google-ai-overview-spam-policy.svg'},
{slug:'optimize-google-ai-overviews',title:'How to Optimize for Google AI Overviews: The Complete GEO Guide',excerpt:'Google AI Mode has 1B+ users. Learn how Generative Engine Optimization (GEO) can get your content cited in AI Overviews.',category:'SEO Strategy',date:'2026-07-03',readTime:'12 min',image:'/blog/images/optimize-ai-overviews.svg'},
{slug:'google-june-2026-spam-update',title:'Google June 2026 Spam Update: Complete Recovery & Strategy Guide',excerpt:'Google\'s June 2026 Spam Update is live. Learn what changed, who was affected, and exactly how to recover your rankings.',category:'SEO Analysis',date:'2026-07-04',readTime:'12 min',image:'/blog/images/google-spam-update-2026.jpg'},
{slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',excerpt:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours of manual work.',category:'SEO Tools',date:'2026-06-20',readTime:'8 min',image:'/blog/images/ultimate-guide-seo-text-tools.jpg'},
{slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',excerpt:'Learn the art of crafting compelling meta descriptions that improve CTR and boost your search rankings.',category:'SEO Tips',date:'2026-06-18',readTime:'6 min',image:'/blog/images/meta-descriptions.jpg'},
{slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',excerpt:'Master JSON formatting, validation, and optimization with practical examples and free online tools.',category:'Development',date:'2026-06-15',readTime:'7 min',image:'/blog/images/json-formatting.jpg'},
{slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',excerpt:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',date:'2026-06-12',readTime:'5 min',image:'/blog/images/markdown-bloggers.jpg'},
{slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',excerpt:'Learn how canonical tags prevent duplicate content issues and consolidate your SEO ranking signals.',category:'SEO Tips',date:'2026-06-10',readTime:'6 min',image:'/blog/images/canonical-tags.jpg'},
{slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',excerpt:'Master Open Graph meta tags to ensure your content looks amazing when shared on social media.',category:'Social Media',date:'2026-06-08',readTime:'5 min',image:'/blog/images/open-graph-tags.jpg'},
{slug:'eeat-2026-google-trust-guide',title:'E-E-A-T in 2026: How Google Now Decides Who to Trust',excerpt:'E-E-A-T has evolved from a page-level checklist into an entity verification system. Learn how Google AI Overviews evaluate trust and how to build real authority.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/eeat-2026-banner.svg'},
{slug:'ai-content-detection-2026',title:'AI Content Detection 2026: How Google Catches AI Writing',excerpt:'Google now detects AI-generated content with 94% accuracy. Learn how detection works, what signals Google uses, and how to create compliant content that ranks.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/ai-content-detection-banner.svg'},
{slug:'query-fanout-seo-2026',title:'Query Fan-Out SEO 2026: How Google Breaks Down Searches',excerpt:'Query fan-out has grown +2,550% YoY. Learn how Google decomposes complex queries into sub-queries and how to optimize your content for this new search paradigm.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/query-fanout-banner.svg'},
{slug:'how-to-get-cited-google-ai-overviews',title:'How to Get Cited in Google AI Overviews: The 2026 Playbook',excerpt:'Google AI Overviews now appear on most queries. Learn the 9-factor citeability checklist, content templates, and schema strategies to get your content cited.',category:'SEO Strategy',date:'2026-07-06',readTime:'14 min',image:'/blog/images/ai-overview-citations-banner.svg'},
{slug:'find-trending-keywords-before-competitors',title:'How to Find Trending Keywords Before Competitors in 2026',excerpt:'By the time keyword tools show volume, competitors already target it. Learn 6 proven methods to spot rising search demand before anyone else.',category:'Keyword Research',date:'2026-07-06',readTime:'11 min',image:'/blog/images/trending-keywords-banner.svg'},
{slug:'query-fanout-vs-keywords',title:'Query Fan-Out vs Keywords: Why Traditional Keyword Research Is Dead',excerpt:'95% of fan-out sub-queries show zero volume in keyword tools. Learn why traditional keyword research is broken and how to optimize for the new search paradigm.',category:'SEO Strategy',date:'2026-07-06',readTime:'12 min',image:'/blog/images/query-fanout-vs-keywords-banner.svg'},
{slug:'long-tail-keyword-strategy-2026',title:'Long-Tail Keyword Strategy 2026: How to Find and Rank for Keywords That Convert',excerpt:'Long-tail keywords drive 70% of all searches with lower competition and higher conversion rates. Learn how to find, target, and rank for them.',category:'Keyword Research',date:'2026-07-06',readTime:'10 min',image:'/blog/images/long-tail-keywords-banner.svg'},
{slug:'what-is-keyword-density',title:'What Is Keyword Density? The Complete Guide for SEO in 2026',excerpt:'Keyword density measures how often a keyword appears in your content. Learn the ideal density, how to calculate it, and why it still matters for SEO.',category:'SEO Fundamentals',date:'2026-07-06',readTime:'8 min',image:'/blog/images/keyword-density-guide-banner.svg'},
{slug:'free-seo-tools-small-business',title:'25 Free SEO Tools Every Small Business Needs in 2026',excerpt:'Discover the best free SEO tools for small businesses. Keyword research, site audit, rank tracking, and more — all without paying a dime.',category:'SEO Tools',date:'2026-07-06',readTime:'12 min',image:'/blog/images/free-seo-tools-banner.svg'},
{slug:'how-to-check-keyword-density',title:'How to Check Keyword Density: Step-by-Step Guide with Free Tools',excerpt:'Learn how to check keyword density in your content using free tools. Step-by-step guide with examples and best practices.',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',image:'/blog/images/check-keyword-density-banner.svg'},
{slug:'seo-content-writing-guide',title:'SEO Content Writing: How to Write Content That Ranks in 2026',excerpt:'Learn how to write SEO-optimized content that ranks on Google. From keyword research to on-page optimization, this guide covers it all.',category:'Content Strategy',date:'2026-07-06',readTime:'14 min',image:'/blog/images/seo-content-writing-banner.svg'},
{slug:'how-to-write-meta-descriptions',title:'How to Write Meta Descriptions That Get Clicks in 2026',excerpt:'Meta descriptions impact CTR more than rankings. Learn how to write compelling meta descriptions that attract clicks and improve your search visibility.',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',image:'/blog/images/write-meta-descriptions-banner.svg'},
{slug:'how-to-create-robots-txt-file',title:'How to Create a Robots.txt File: Complete Step-by-Step Guide',excerpt:'Learn how to create a robots.txt file that tells search engines which pages to crawl and which to skip. Free generator tool included.',category:'Technical SEO',date:'2026-07-08',readTime:'9 min',image:'/blog/images/robots-txt-guide-banner.svg'},
{slug:'xml-sitemap-guide-seo',title:'XML Sitemap Guide: How to Create and Submit Your Sitemap for SEO',excerpt:'An XML sitemap helps search engines discover and index your pages faster. Learn how to create, optimize, and submit your sitemap to Google.',category:'Technical SEO',date:'2026-07-08',readTime:'10 min',image:'/blog/images/xml-sitemap-guide-banner.svg'}
];

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded',function(){
  App.initCookieConsent();
  App.initScrollTracking();

  /* Header scroll shadow */
  var header=document.querySelector('.site-header');
  if(header){
    var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>10);};
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }

  /* Theme button init - read from DOM to avoid stale variable */
  var btn=document.querySelector('.theme-btn');
  if(btn){
    var currentTheme=document.documentElement.getAttribute('data-theme');
    btn.textContent=currentTheme==='dark'?'\u2600':'\u263E';
    btn.setAttribute('aria-label',currentTheme==='dark'?'Switch to light mode':'Switch to dark mode');
  }
});

})();
