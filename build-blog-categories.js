const fs = require('fs');
const path = require('path');

const BASE = 'https://azhai-six.vercel.app';
const outDir = path.join(__dirname, 'public', 'blog');
fs.mkdirSync(outDir, { recursive: true });

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

const posts = [
  {slug:'google-ai-overview-spam-policy-2026',title:"Google's AI Overview Spam Policy: What Gets You Penalized in 2026",desc:"Google now treats AI Overview manipulation as spam. Learn what's banned, what still works, and how to stay compliant.",category:'Policy Update',date:'2026-07-02',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'optimize-google-ai-overviews',title:'How to Optimize for Google AI Overviews: The Complete GEO Guide',desc:'Google AI Mode has 1B+ users. Learn how GEO can get your content cited in AI Overviews and future-proof your SEO.',category:'SEO Strategy',date:'2026-07-03',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'google-june-2026-spam-update',title:'Google June 2026 Spam Update: Complete Recovery & Strategy Guide',desc:"Google's June 2026 Spam Update is live. Learn what changed, who was affected, and how to recover your rankings.",category:'SEO Analysis',date:'2026-07-04',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'eeat-2026-google-trust-guide',title:'E-E-A-T in 2026: How Google Now Decides Who to Trust',desc:'E-E-A-T has evolved from a page-level checklist into an entity verification system. Learn how Google AI Overviews evaluate trust and how to build real authority.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/banner.svg'},
  {slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',desc:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours.',category:'SEO Tools',date:'2026-06-20',readTime:'8 min',image:'/blog/images/banner.svg'},
  {slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',desc:'Learn the art of crafting compelling meta descriptions that improve CTR and boost search rankings.',category:'SEO Tips',date:'2026-06-18',readTime:'6 min',image:'/blog/images/banner.svg'},
  {slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',desc:'Master JSON formatting, validation, and optimization with practical examples and free tools.',category:'Development',date:'2026-06-15',readTime:'7 min',image:'/blog/images/banner.svg'},
  {slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',desc:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',date:'2026-06-12',readTime:'5 min',image:'/blog/images/banner.svg'},
  {slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',desc:'Learn how canonical tags prevent duplicate content issues and consolidate ranking signals.',category:'SEO Tips',date:'2026-06-10',readTime:'6 min',image:'/blog/images/banner.svg'},
  {slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',desc:'Master Open Graph meta tags to ensure your content looks amazing when shared on social media.',category:'Social Media',date:'2026-06-08',readTime:'5 min',image:'/blog/images/banner.svg'},
  {slug:'ai-content-detection-2026',title:'AI Content Detection 2026: How Google Catches AI Writing',desc:'Google now detects AI-generated content with 94% accuracy. Learn how detection works and how to create compliant content.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/banner.svg'},
  {slug:'query-fanout-seo-2026',title:'Query Fan-Out SEO 2026: How Google Breaks Down Searches',desc:'Query fan-out has grown +2,550% YoY. Learn how Google decomposes complex queries and how to optimize.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/banner.svg'},
  {slug:'how-to-get-cited-google-ai-overviews',title:'How to Get Cited in Google AI Overviews: The 2026 Playbook',desc:'Google AI Overviews now appear on most queries. Learn the 9-factor citeability checklist and schema strategies.',category:'SEO Strategy',date:'2026-07-06',readTime:'14 min',image:'/blog/images/banner.svg'},
  {slug:'find-trending-keywords-before-competitors',title:'How to Find Trending Keywords Before Competitors in 2026',desc:'By the time keyword tools show volume, competitors already target it. Learn 6 proven methods to spot rising demand.',category:'Keyword Research',date:'2026-07-06',readTime:'11 min',image:'/blog/images/banner.svg'},
  {slug:'query-fanout-vs-keywords',title:'Query Fan-Out vs Keywords: Why Traditional Keyword Research Is Dead',desc:'95% of fan-out sub-queries show zero volume in keyword tools. Learn why traditional keyword research is broken.',category:'SEO Strategy',date:'2026-07-06',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'long-tail-keyword-strategy-2026',title:'Long-Tail Keyword Strategy 2026: Find and Rank for Keywords That Convert',desc:'Long-tail keywords drive 70% of all searches with lower competition and higher conversion rates.',category:'Keyword Research',date:'2026-07-06',readTime:'10 min',image:'/blog/images/banner.svg'},
  {slug:'what-is-keyword-density',title:'What Is Keyword Density? The Complete Guide for SEO in 2026',desc:'Keyword density measures how often a keyword appears in your content. Learn the ideal density and how to calculate it.',category:'SEO Fundamentals',date:'2026-07-06',readTime:'8 min',image:'/blog/images/banner.svg'},
  {slug:'free-seo-tools-small-business',title:'25 Free SEO Tools Every Small Business Needs in 2026',desc:'Discover the best free SEO tools for small businesses. Keyword research, site audit, rank tracking, and more.',category:'SEO Tools',date:'2026-07-06',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'how-to-check-keyword-density',title:'How to Check Keyword Density: Step-by-Step Guide with Free Tools',desc:'Learn how to check keyword density in your content using free tools. Step-by-step guide with examples.',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',image:'/blog/images/banner.svg'},
  {slug:'seo-content-writing-guide',title:'SEO Content Writing: How to Write Content That Ranks in 2026',desc:'Learn how to write SEO-optimized content that ranks on Google. From keyword research to on-page optimization.',category:'Content Strategy',date:'2026-07-06',readTime:'14 min',image:'/blog/images/banner.svg'},
  {slug:'how-to-write-meta-descriptions',title:'How to Write Meta Descriptions That Get Clicks in 2026',desc:'Meta descriptions impact CTR more than rankings. Learn how to write compelling meta descriptions.',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',image:'/blog/images/banner.svg'},
  {slug:'how-to-create-robots-txt-file',title:'How to Create a Robots.txt File: Complete Step-by-Step Guide',desc:'Learn how to create a robots.txt file that tells search engines which pages to crawl. Free generator included.',category:'Technical SEO',date:'2026-07-08',readTime:'9 min',image:'/blog/images/banner.svg'},
  {slug:'xml-sitemap-guide-seo',title:'XML Sitemap Guide: How to Create and Submit Your Sitemap for SEO',desc:'An XML sitemap helps search engines discover and index your pages faster. Learn how to create and submit yours.',category:'Technical SEO',date:'2026-07-08',readTime:'10 min',image:'/blog/images/banner.svg'},
{slug:'how-to-optimize-images-for-seo',title:'How to Optimize Images for SEO: Complete 2026 Guide',desc:'Image optimization is a critical ranking factor. Learn how to compress, resize, and format images for faster load times and better Google rankings.',category:'Technical SEO',date:'2026-07-10',readTime:'10 min',image:'/blog/images/banner.svg'},
{slug:'internal-linking-strategy-seo',title:'Internal Linking Strategy: How to Build a Link Architecture That Ranks',desc:'Internal links distribute page authority and help Google understand your site structure. Learn how to build a strategic internal linking architecture.',category:'SEO Strategy',date:'2026-07-10',readTime:'11 min',image:'/blog/images/banner.svg'},
{slug:'schema-markup-types-for-seo',title:'Schema Markup Types Every Website Needs in 2026',desc:'Structured data helps Google understand your content and display rich results. Learn which schema types drive the biggest SEO impact.',category:'Technical SEO',date:'2026-07-10',readTime:'9 min',image:'/blog/images/banner.svg'},
{slug:'google-search-console-guide-beginners',title:'Google Search Console for Beginners: Complete Setup Guide',desc:'Google Search Console is the most important free SEO tool. Learn how to set it up, verify your site, and use every feature to improve your rankings.',category:'SEO Tutorial',date:'2026-07-10',readTime:'12 min',image:'/blog/images/banner.svg'},
{slug:'how-to-improve-core-web-vitals',title:'How to Improve Core Web Vitals: Practical Fixes for 2026',desc:'Core Web Vitals are confirmed Google ranking factors. Learn practical, step-by-step fixes to improve LCP, INP, and CLS on any website.',category:'Technical SEO',date:'2026-07-10',readTime:'10 min',image:'/blog/images/banner.svg'},
{slug:'local-seo-checklist-2026',title:'Local SEO Checklist 2026: 20 Steps to Dominate Local Search',desc:'Local SEO drives foot traffic and phone calls. Follow this 20-step checklist to optimize your Google Business Profile and rank in local search.',category:'Local SEO',date:'2026-07-10',readTime:'11 min',image:'/blog/images/banner.svg'},
{slug:'how-to-build-backlinks-2026',title:'How to Build Backlinks in 2026: 10 Proven Strategies',desc:'Backlinks remain a top Google ranking factor. Learn 10 proven link building strategies that work in 2026 without risking penalties.',category:'Off-Page SEO',date:'2026-07-10',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'seo-vs-sem-whats-the-difference',title:'SEO vs SEM: What is the Difference and Which Should You Use?',desc:'SEO and SEM both drive traffic but work differently. Learn the key differences, costs, timelines, and when to use each strategy.',category:'SEO Fundamentals',date:'2026-07-10',readTime:'8 min',image:'/blog/images/banner.svg'},
  {slug:'seo-rank-tracking-guide',title:'The Complete Guide to SEO Rank Tracking in 2026',desc:'Track your search rankings effectively with the right tools and strategies. Learn what to track, how often to check, and how to act on rank data.',category:'SEO Tools',date:'2026-07-12',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'seo-analytics-dashboard',title:'SEO Analytics Dashboard: How to Track and Report SEO Performance',desc:'Build an SEO analytics dashboard that proves ROI. Learn to track the right metrics in GA4 and GSC and create reports stakeholders actually read.',category:'SEO Tutorial',date:'2026-07-12',readTime:'11 min',image:'/blog/images/banner.svg'},
  {slug:'ecommerce-seo-checklist',title:'E-commerce SEO Checklist: Product Pages, Schema & Category Optimization',desc:'E-commerce sites face unique SEO challenges. Follow this checklist to optimize product pages, category pages, structured data, and site architecture.',category:'Technical SEO',date:'2026-07-12',readTime:'13 min',image:'/blog/images/banner.svg'},
  {slug:'competitor-seo-analysis',title:'How to Do a Competitor SEO Analysis (Step-by-Step Guide)',desc:'Reverse-engineer what makes your competitors rank. Learn how to analyze their keywords, backlinks, content, and technical SEO to find gaps you can exploit.',category:'SEO Strategy',date:'2026-07-12',readTime:'12 min',image:'/blog/images/banner.svg'},
  {slug:'youtube-seo-guide',title:'YouTube SEO Guide: How to Rank Videos on Google and YouTube in 2026',desc:'Video search is exploding. Learn how to optimize your YouTube videos with the right keywords, metadata, transcripts, and schema to rank on both YouTube and Google.',category:'SEO Strategy',date:'2026-07-12',readTime:'11 min',image:'/blog/images/banner.svg'}
];

const categories = [
  {
    id: 'seo-strategy',
    name: 'SEO Strategy',
    title: 'SEO Strategy Blog - AI Overviews, Algorithm Updates & Ranking Tactics',
    desc: 'Stay ahead of Google algorithm changes. Learn how to optimize for AI Overviews, recover from spam updates, and build long-term SEO strategy.',
    filter: ['SEO Strategy', 'SEO Analysis', 'Policy Update']
  },
  {
    id: 'keyword-research',
    name: 'Keyword Research',
    title: 'Keyword Research Blog - Find Trending Keywords & Long-Tail Strategies',
    desc: 'Master keyword research with guides on finding trending keywords, long-tail strategies, and keyword density optimization.',
    filter: ['Keyword Research', 'SEO Fundamentals']
  },
  {
    id: 'seo-tutorials',
    name: 'SEO Tutorials',
    title: 'SEO Tutorials Blog - Step-by-Step Guides for Beginners & Pros',
    desc: 'Step-by-step SEO tutorials covering meta descriptions, canonical tags, robots.txt, sitemaps, and more.',
    filter: ['SEO Tutorial', 'SEO Tips']
  },
  {
    id: 'technical-seo',
    name: 'Technical SEO',
    title: 'Technical SEO Blog - Robots.txt, Sitemaps, Schema & Crawl Optimization',
    desc: 'Master technical SEO with guides on robots.txt, XML sitemaps, canonical tags, structured data, and crawl optimization.',
    filter: ['Technical SEO']
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy',
    title: 'Content Strategy Blog - SEO Writing, AI Content & Content Marketing',
    desc: 'Learn how to create content that ranks. SEO writing guides, AI content detection, and content marketing strategies.',
    filter: ['Content Strategy', 'SEO Tools']
  },
  {
    id: 'tools-tutorials',
    name: 'Tools & Tutorials',
    title: 'Tools & Tutorials Blog - Free Text Tools, JSON, Markdown & Developer Guides',
    desc: 'Tutorials for free online text tools, JSON formatting, Markdown writing, and developer productivity.',
    filter: ['Development', 'Blogging']
  },
  {
    id: 'social-media',
    name: 'Social Media',
    title: 'Social Media SEO Blog - Open Graph Tags & Social Sharing Optimization',
    desc: 'Optimize your content for social media sharing. Open Graph tags, Twitter cards, and social media SEO guides.',
    filter: ['Social Media']
  },
  {
    id: 'local-seo',
    name: 'Local SEO',
    title: 'Local SEO Blog - Google Business Profile, Citations & Local Rankings',
    desc: 'Dominate local search with guides on Google Business Profile optimization, local citations, review management, and location-specific SEO strategies.',
    filter: ['Local SEO']
  },
  {
    id: 'off-page-seo',
    name: 'Off-Page SEO',
    title: 'Off-Page SEO Blog - Link Building, Backlinks & Domain Authority',
    desc: 'Build authority with guides on link building strategies, backlink analysis, guest posting, digital PR, and domain authority growth.',
    filter: ['Off-Page SEO']
  }
];

function generateBlogCategoryPage(cat) {
  const url = BASE + '/blog/' + cat.id + '.html';
  const catPosts = posts.filter(p => cat.filter.includes(p.category));

  const postCards = catPosts.map(p =>
    '<a href="/blog/' + p.slug + '.html" style="display:block;padding:20px;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' +
    '<div style="display:flex;gap:16px;align-items:flex-start">' +
    (p.image ? '<img src="' + esc(p.image) + '" alt="" style="width:120px;height:80px;object-fit:cover;border-radius:6px;flex-shrink:0">' : '') +
    '<div style="flex:1;min-width:0">' +
    '<div style="font-size:.75rem;color:var(--accent);margin-bottom:4px">' + esc(p.category) + ' &middot; ' + esc(p.date) + ' &middot; ' + esc(p.readTime) + '</div>' +
    '<div style="font-weight:600;font-size:1rem;margin-bottom:6px;line-height:1.4;color:var(--text)">' + esc(p.title) + '</div>' +
    '<div style="font-size:.85rem;color:var(--text-2);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(p.desc) + '</div>' +
    '</div></div></a>'
  ).join('\n');

  const otherCats = categories.filter(c => c.id !== cat.id);
  const catLinks = otherCats.map(c =>
    '<a href="/blog/' + c.id + '.html" style="display:inline-block;padding:8px 16px;background:var(--bg-2);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.85rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + c.icon + ' ' + esc(c.name) + '</a>'
  ).join(' ');

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is " + cat.name + "?", "acceptedAnswer": { "@type": "Answer", "text": cat.desc } },
      { "@type": "Question", "name": "How many articles are in the " + cat.name + " category?", "acceptedAnswer": { "@type": "Answer", "text": "We have " + catPosts.length + " articles in this category, with more being added regularly. Each article provides in-depth, actionable guidance." } },
      { "@type": "Question", "name": "Are these " + cat.name + " articles up to date for 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All articles are written or updated in 2026 to reflect the latest Google algorithm changes, AI search features, and industry best practices." } }
    ]
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": BASE + "/blog/"},
      {"@type": "ListItem", "position": 3, "name": cat.name, "item": url}
    ]
  });

  const blogSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": cat.title,
    "description": cat.desc,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": catPosts.length,
      "itemListElement": catPosts.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": BASE + "/blog/" + p.slug + ".html",
        "name": p.title
      }))
    }
  });

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(cat.title)}</title>
<meta name="description" content="${esc(cat.desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">\n  <link rel="manifest" href="/manifest.json">\n  <meta name="theme-color" content="#2563eb">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="en-US" href="${url}">
<link rel="alternate" hreflang="en-GB" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:title" content="${esc(cat.title)}">
<meta property="og:description" content="${esc(cat.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="KwordSEO">
<meta property="og:image" content="${BASE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(cat.title)}">
<meta name="twitter:description" content="${esc(cat.desc)}">
<meta name="twitter:image" content="${BASE}/og-image.png">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate" type="application/rss+xml" title="KwordSEO Blog" href="/blog/feed.xml">
<link rel="stylesheet" href="/css/style.css">
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KDTPKT4T');</script>
<!-- End Google Tag Manager -->
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<script type="application/ld+json">${breadcrumbSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
<script type="application/ld+json">${blogSchema}</script>
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDTPKT4T"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>

<nav class="nav" aria-label="Main navigation">
<a href="/" class="nav-link">Home</a>
<a href="/tools/" class="nav-link">Tools</a>
<a href="/courses/" class="nav-link">Courses</a>
<a href="/books/" class="nav-link">Books</a>
<a href="/blog/" class="nav-link">Blog</a>
</nav>
<a href="/blog/" class="nav-link active">Blog</a>
</nav>
<div class="header-actions">
<button type="button" class="theme-toggle" id="themeToggle" onclick="App.toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode"><span class="track"></span><span class="thumb"><svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span></button>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()"><div class="hamburger"><span></span><span></span><span></span></div></button>
</div>
</div>
<div class="nav-backdrop" id="navBackdrop" onclick="App.closeMenu()"></div>
</header>

<main id="main-content">
<div class="container" style="max-width:900px;margin:0 auto;padding:32px 20px">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <a href="/blog/" style="color:var(--text-3);text-decoration:none">Blog</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">${esc(cat.name)}</span></div>

<h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;line-height:1.2">${esc(cat.title.split(' - ')[0])}</h1>
<p style="font-size:1.05rem;color:var(--text-2);line-height:1.7;margin-bottom:12px;max-width:720px">${esc(cat.desc)}</p>
<p style="font-size:.85rem;color:var(--text-3);margin-bottom:40px">${catPosts.length} articles &middot; Updated regularly</p>

<div style="display:flex;flex-direction:column;gap:16px;margin-bottom:48px">
${postCards}
</div>

<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;color:var(--text)">Explore Other Categories</h2>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:48px">
${catLinks}
</div>

<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px">Frequently Asked Questions</h2>
<div style="margin-bottom:48px">
<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">What is ${esc(cat.name)}? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">${esc(cat.desc)}</div></details>
<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">How many articles are in this category? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">We have ${catPosts.length} articles in this category, with more being added regularly. Each article provides in-depth, actionable guidance you can apply immediately.</div></details>
<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">Are these articles up to date for 2026? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">Yes. All articles are written or updated in 2026 to reflect the latest Google algorithm changes, AI search features, and industry best practices.</div></details>
</div>

<section style="padding:32px 0;border-top:1px solid var(--border)">
<h2 style="font-size:1.2rem;font-weight:700;margin-bottom:12px">About ${esc(cat.name)} Content</h2>
<p style="color:var(--text-2);line-height:1.7">Our ${esc(cat.name).toLowerCase()} articles are written by SEO professionals and updated regularly to reflect the latest changes in search algorithms, AI features, and industry best practices. Each article includes actionable steps you can implement immediately.</p>
</section>
</div>
</main>
<footer class=\"site-footer\">
    <div class=\"container\">
      <div class=\"footer-top\">
        <div class=\"footer-top-text\">
          <span class=\"footer-top-label\">Newsletter</span>
          <p class=\"footer-top-title\">Get new tools & SEO tips</p>
          <p class=\"footer-top-sub\">No spam. Unsubscribe anytime.</p>
        </div>
        <form class=\"footer-top-form\" id=\"newsletterForm\" action=\"/api/subscribe\" method=\"POST\">
          <input type=\"email\" name=\"email\" placeholder=\"your@email.com\" required aria-label=\"Email address\">
          <button type=\"submit\">Subscribe</button>
        </form>
      </div>
      <hr class=\"footer-divider\">
      <div class=\"footer-grid\">
        <div class=\"footer-brand\">
          <a href=\"/\" class=\"site-logo\" style=\"color:inherit\"><svg class=\"logo-icon\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"32\" height=\"32\" rx=\"7\" fill=\"#2563eb\"/><path d=\"M9 8v16\" stroke=\"#fff\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M12 16l10-8\" stroke=\"#fff\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M12 16l10 8\" stroke=\"#fff\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg><span class=\"logo-text\">Kword<span class=\"logo-seo\">SEO</span></span></a>
          <p class=\"footer-brand-desc\">46+ free online tools for writers, developers, and SEO professionals. All processing happens in your browser — your data never leaves your device.</p>
          <div class=\"footer-social\">
            <a href=\"https://twitter.com/kwordseo\" target=\"_blank\" rel=\"noopener\" aria-label=\"Twitter\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z\"/></svg></a>
            <a href=\"https://github.com/kwordseo\" target=\"_blank\" rel=\"noopener\" aria-label=\"GitHub\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"/></svg></a>
            <a href=\"https://linkedin.com/company/kwordseo\" target=\"_blank\" rel=\"noopener\" aria-label=\"LinkedIn\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"/><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"/><circle cx=\"4\" cy=\"4\" r=\"2\"/></svg></a>
          </div>
        </div>
        <div class=\"footer-col\">
          <p class=\"footer-col-title\">Tools</p>
          <a href=\"/tools/word-counter.html\">Word Counter</a>
          <a href=\"/tools/case-converter.html\">Case Converter</a>
          <a href=\"/tools/json-formatter.html\">JSON Formatter</a>
          <a href=\"/tools/robots-txt.html\">Robots.txt</a>
          <a href=\"/tools/\">Browse All 45+ Tools</a>
        </div>
        <div class=\"footer-col\">
          <p class=\"footer-col-title\">SEO</p>
          <a href=\"/tools/meta-gen.html\">Meta Tags</a>
          <a href=\"/tools/keyword-density.html\">Keyword Density</a>
          <a href=\"/tools/slug-generator.html\">Slug Generator</a>
          <a href=\"/tools/sitemap-gen.html\">Sitemap Generator</a>
          <a href=\"/tools/schema-gen.html\">Schema Markup</a>
        </div>
        <div class=\"footer-col\">
          <p class=\"footer-col-title\">Company</p>
          <a href=\"/about.html\">About Us</a>
          <a href=\"/blog/\">Blog</a>
          <a href=\"/contact.html\">Contact</a>
          <a href=\"/advertise.html\">Advertise</a>
          <a href=\"/authors/sarah-mitchell.html\">Our Team</a>
        </div>
        <div class=\"footer-col\">
          <p class=\"footer-col-title\">Legal</p>
          <a href=\"/privacy-policy.html\">Privacy Policy</a>
          <a href=\"/terms.html\">Terms of Service</a>
          <a href=\"/cookie-policy.html\">Cookie Policy</a>
          <a href=\"/editorial-policy.html\">Editorial Policy</a>
        </div>
      </div>
      <hr class=\"footer-divider\">
      <div class=\"footer-bottom\">
        <p>&copy; 2026 KwordSEO. All rights reserved.</p>
        <div class=\"footer-bottom-links\">
          <a href=\"/privacy-policy.html\">Privacy</a>
          <a href=\"/terms.html\">Terms</a>
          <a href=\"/cookie-policy.html\">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
<div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent">
<p> We use cookies for analytics &amp; preferences. <a href="/cookie-policy.html">Learn more</a></p>
<div class="btn-group">
<button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
<button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button>
</div>
</div>
<div class="toast" id="appToast"></div>
<script src="/js/app.js"></script>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js');}</script>
</body>
</html>`;
}

// Generate all blog category pages
categories.forEach(cat => {
  const html = generateBlogCategoryPage(cat);
  fs.writeFileSync(path.join(outDir, cat.id + '.html'), html, 'utf8');
  console.log('Created: public/blog/' + cat.id + '.html (' + posts.filter(p => cat.filter.includes(p.category)).length + ' posts)');
});

console.log('\nBlog category build complete! ' + categories.length + ' category pages generated.');
