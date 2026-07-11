const fs = require('fs');
const path = require('path');

const BASE = 'https://azhai-six.vercel.app';
const outDir = path.join(__dirname, 'public', 'blog');
fs.mkdirSync(outDir, { recursive: true });

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

const posts = [
  {slug:'google-ai-overview-spam-policy-2026',title:"Google's AI Overview Spam Policy: What Gets You Penalized in 2026",desc:"Google now treats AI Overview manipulation as spam. Learn what's banned, what still works, and how to stay compliant.",category:'Policy Update',date:'2026-07-02',readTime:'12 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'optimize-google-ai-overviews',title:'How to Optimize for Google AI Overviews: The Complete GEO Guide',desc:'Google AI Mode has 1B+ users. Learn how GEO can get your content cited in AI Overviews and future-proof your SEO.',category:'SEO Strategy',date:'2026-07-03',readTime:'12 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'google-june-2026-spam-update',title:'Google June 2026 Spam Update: Complete Recovery & Strategy Guide',desc:"Google's June 2026 Spam Update is live. Learn what changed, who was affected, and how to recover your rankings.",category:'SEO Analysis',date:'2026-07-04',readTime:'12 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',desc:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours.',category:'SEO Tools',date:'2026-06-20',readTime:'8 min',image:'/blog/images/cat-tools-tutorials.svg'},
  {slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',desc:'Learn the art of crafting compelling meta descriptions that improve CTR and boost search rankings.',category:'SEO Tips',date:'2026-06-18',readTime:'6 min',image:'/blog/images/cat-seo-tutorials.svg'},
  {slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',desc:'Master JSON formatting, validation, and optimization with practical examples and free tools.',category:'Development',date:'2026-06-15',readTime:'7 min',image:'/blog/images/cat-tools-tutorials.svg'},
  {slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',desc:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',date:'2026-06-12',readTime:'5 min',image:'/blog/images/cat-content-strategy.svg'},
  {slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',desc:'Learn how canonical tags prevent duplicate content issues and consolidate ranking signals.',category:'SEO Tips',date:'2026-06-10',readTime:'6 min',image:'/blog/images/cat-seo-tutorials.svg'},
  {slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',desc:'Master Open Graph meta tags to ensure your content looks amazing when shared on social media.',category:'Social Media',date:'2026-06-08',readTime:'5 min',image:'/blog/images/cat-social-media.svg'},
  {slug:'ai-content-detection-2026',title:'AI Content Detection 2026: How Google Catches AI Writing',desc:'Google now detects AI-generated content with 94% accuracy. Learn how detection works and how to create compliant content.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'query-fanout-seo-2026',title:'Query Fan-Out SEO 2026: How Google Breaks Down Searches',desc:'Query fan-out has grown +2,550% YoY. Learn how Google decomposes complex queries and how to optimize.',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'how-to-get-cited-google-ai-overviews',title:'How to Get Cited in Google AI Overviews: The 2026 Playbook',desc:'Google AI Overviews now appear on most queries. Learn the 9-factor citeability checklist and schema strategies.',category:'SEO Strategy',date:'2026-07-06',readTime:'14 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'find-trending-keywords-before-competitors',title:'How to Find Trending Keywords Before Competitors in 2026',desc:'By the time keyword tools show volume, competitors already target it. Learn 6 proven methods to spot rising demand.',category:'Keyword Research',date:'2026-07-06',readTime:'11 min',image:'/blog/images/cat-keyword-research.svg'},
  {slug:'query-fanout-vs-keywords',title:'Query Fan-Out vs Keywords: Why Traditional Keyword Research Is Dead',desc:'95% of fan-out sub-queries show zero volume in keyword tools. Learn why traditional keyword research is broken.',category:'SEO Strategy',date:'2026-07-06',readTime:'12 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'long-tail-keyword-strategy-2026',title:'Long-Tail Keyword Strategy 2026: Find and Rank for Keywords That Convert',desc:'Long-tail keywords drive 70% of all searches with lower competition and higher conversion rates.',category:'Keyword Research',date:'2026-07-06',readTime:'10 min',image:'/blog/images/cat-keyword-research.svg'},
  {slug:'what-is-keyword-density',title:'What Is Keyword Density? The Complete Guide for SEO in 2026',desc:'Keyword density measures how often a keyword appears in your content. Learn the ideal density and how to calculate it.',category:'SEO Fundamentals',date:'2026-07-06',readTime:'8 min',image:'/blog/images/cat-seo-strategy.svg'},
  {slug:'free-seo-tools-small-business',title:'25 Free SEO Tools Every Small Business Needs in 2026',desc:'Discover the best free SEO tools for small businesses. Keyword research, site audit, rank tracking, and more.',category:'SEO Tools',date:'2026-07-06',readTime:'12 min',image:'/blog/images/cat-tools-tutorials.svg'},
  {slug:'how-to-check-keyword-density',title:'How to Check Keyword Density: Step-by-Step Guide with Free Tools',desc:'Learn how to check keyword density in your content using free tools. Step-by-step guide with examples.',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',image:'/blog/images/cat-seo-tutorials.svg'},
  {slug:'seo-content-writing-guide',title:'SEO Content Writing: How to Write Content That Ranks in 2026',desc:'Learn how to write SEO-optimized content that ranks on Google. From keyword research to on-page optimization.',category:'Content Strategy',date:'2026-07-06',readTime:'14 min',image:'/blog/images/cat-content-strategy.svg'},
  {slug:'how-to-write-meta-descriptions',title:'How to Write Meta Descriptions That Get Clicks in 2026',desc:'Meta descriptions impact CTR more than rankings. Learn how to write compelling meta descriptions.',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',image:'/blog/images/cat-seo-tutorials.svg'},
  {slug:'how-to-create-robots-txt-file',title:'How to Create a Robots.txt File: Complete Step-by-Step Guide',desc:'Learn how to create a robots.txt file that tells search engines which pages to crawl. Free generator included.',category:'Technical SEO',date:'2026-07-08',readTime:'9 min',image:'/blog/images/cat-technical-seo.svg'},
  {slug:'xml-sitemap-guide-seo',title:'XML Sitemap Guide: How to Create and Submit Your Sitemap for SEO',desc:'An XML sitemap helps search engines discover and index your pages faster. Learn how to create and submit yours.',category:'Technical SEO',date:'2026-07-08',readTime:'10 min',image:'/blog/images/cat-technical-seo.svg'}
];

const categories = [
  {
    id: 'seo-strategy',
    name: 'SEO Strategy',
    title: 'SEO Strategy Blog - AI Overviews, Algorithm Updates & Ranking Tactics',
    desc: 'Stay ahead of Google algorithm changes. Learn how to optimize for AI Overviews, recover from spam updates, and build long-term SEO strategy.',
    icon: '🎯',
    filter: ['SEO Strategy', 'SEO Analysis', 'Policy Update']
  },
  {
    id: 'keyword-research',
    name: 'Keyword Research',
    title: 'Keyword Research Blog - Find Trending Keywords & Long-Tail Strategies',
    desc: 'Master keyword research with guides on finding trending keywords, long-tail strategies, and keyword density optimization.',
    icon: '🔑',
    filter: ['Keyword Research', 'SEO Fundamentals']
  },
  {
    id: 'seo-tutorials',
    name: 'SEO Tutorials',
    title: 'SEO Tutorials Blog - Step-by-Step Guides for Beginners & Pros',
    desc: 'Step-by-step SEO tutorials covering meta descriptions, canonical tags, robots.txt, sitemaps, and more.',
    icon: '📚',
    filter: ['SEO Tutorial', 'SEO Tips']
  },
  {
    id: 'technical-seo',
    name: 'Technical SEO',
    title: 'Technical SEO Blog - Robots.txt, Sitemaps, Schema & Crawl Optimization',
    desc: 'Master technical SEO with guides on robots.txt, XML sitemaps, canonical tags, structured data, and crawl optimization.',
    icon: '⚙️',
    filter: ['Technical SEO']
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy',
    title: 'Content Strategy Blog - SEO Writing, AI Content & Content Marketing',
    desc: 'Learn how to create content that ranks. SEO writing guides, AI content detection, and content marketing strategies.',
    icon: '✍️',
    filter: ['Content Strategy', 'SEO Tools']
  },
  {
    id: 'tools-tutorials',
    name: 'Tools & Tutorials',
    title: 'Tools & Tutorials Blog - Free Text Tools, JSON, Markdown & Developer Guides',
    desc: 'Tutorials for free online text tools, JSON formatting, Markdown writing, and developer productivity.',
    icon: '🛠️',
    filter: ['Development', 'Blogging']
  },
  {
    id: 'social-media',
    name: 'Social Media',
    title: 'Social Media SEO Blog - Open Graph Tags & Social Sharing Optimization',
    desc: 'Optimize your content for social media sharing. Open Graph tags, Twitter cards, and social media SEO guides.',
    icon: '📱',
    filter: ['Social Media']
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
<link rel="canonical" href="${url}">
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
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
<link rel="alternate" type="application/rss+xml" title="KwordSEO Blog" href="/blog/feed.xml">
<link rel="stylesheet" href="/css/style.css">
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<script type="application/ld+json">${breadcrumbSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
<script type="application/ld+json">${blogSchema}</script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>
<nav class="nav" aria-label="Main navigation">
<a href="/" class="nav-link">Home</a>
<a href="/tools/" class="nav-link">Tools</a>
<a href="/tools/smart-text-lab.html" class="nav-link">Smart Lab</a>
<a href="/blog/" class="nav-link active">Blog</a>
<button type="button" class="theme-btn" onclick="App.toggleTheme()" aria-label="Toggle theme">🌙</button>
</nav>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()">☰</button>
</div>
</header>
<main id="main-content">
<div class="container" style="max-width:900px;margin:0 auto;padding:32px 20px">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <a href="/blog/" style="color:var(--text-3);text-decoration:none">Blog</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">${esc(cat.name)}</span></div>

<h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;line-height:1.2">${cat.icon} ${esc(cat.title.split(' - ')[0])}</h1>
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
<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div class="footer-col">
<a href="/" class="site-logo" style="color:inherit;margin-bottom:8px"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>
<p style="font-size:13px;color:var(--text-3)">45+ free online text tools. No sign-up needed. Your data stays in your browser.</p>
</div>
<div class="footer-col"><p class="footer-heading">Tools</p><a href="/tools/word-counter.html">Word Counter</a><a href="/tools/case-converter.html">Case Converter</a><a href="/tools/json-formatter.html">JSON Formatter</a><a href="/tools/robots-txt.html">Robots.txt</a></div>
<div class="footer-col"><p class="footer-heading">SEO</p><a href="/tools/meta-gen.html">Meta Tags</a><a href="/tools/keyword-density.html">Keyword Density</a><a href="/tools/slug-generator.html">Slug Generator</a><a href="/tools/sitemap-gen.html">Sitemap</a></div>
<div class="footer-col"><p class="footer-heading">Company</p><a href="/about.html">About</a><a href="/blog/">Blog</a><a href="/contact.html">Contact</a><a href="/advertise.html">Advertise</a></div>
<div class="footer-col"><p class="footer-heading">Legal</p><a href="/privacy-policy.html">Privacy Policy</a><a href="/terms.html">Terms of Service</a><a href="/cookie-policy.html">Cookie Policy</a></div>
</div>
<div class="footer-bottom"><p>&copy; 2026 KwordSEO. All rights reserved.</p></div>
</div>
</footer>
<div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent">
<p>🍪 We use cookies for analytics &amp; preferences. <a href="/cookie-policy.html">Learn more</a></p>
<div class="btn-group">
<button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
<button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button>
</div>
</div>
<div class="toast" id="appToast"></div>
<script src="/js/app.js"></script>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(reg){reg.unregister();});});}</script>
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
