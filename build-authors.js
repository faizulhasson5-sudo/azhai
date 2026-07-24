const fs = require('fs');
const path = require('path');

const BASE = 'https://azhai-six.vercel.app';
const outDir = path.join(__dirname, 'public', 'authors');
fs.mkdirSync(outDir, { recursive: true });

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

const authors = [
  {
    slug: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'SEO Strategist & Content Lead',
    bio: 'Sarah has spent over a decade helping brands rank higher in search results. She previously led SEO strategy at a top-50 digital agency and has audited 500+ websites. Her work on content optimization strategies has been featured in Search Engine Journal, Moz, and Ahrefs blog.',
    credentials: ['Google Analytics Certified', 'HubSpot SEO Certified', 'Former Agency Lead'],
    expertise: ['SEO Strategy', 'Content Optimization', 'Search Intent Analysis'],
    color: '#2563eb'
  },
  {
    slug: 'james-chen',
    name: 'James Chen',
    role: 'Technical SEO Engineer',
    bio: 'James specializes in the technical side of SEO — crawlability, indexation, site speed, and structured data. He has worked with enterprise clients managing sites with millions of pages and previously contributed to Google\'s web developer documentation.',
    credentials: ['Google Developer Expert', 'AWS Certified', 'Schema.org Contributor'],
    expertise: ['Technical SEO', 'Schema Markup', 'Core Web Vitals'],
    color: '#7c3aed'
  },
  {
    slug: 'emma-rodriguez',
    name: 'Emma Rodriguez',
    role: 'Content Marketing Specialist',
    bio: 'Emma has helped hundreds of businesses create content that ranks and converts. She specializes in keyword research, content strategy, and editorial planning. Her guides on SEO content writing have been read by over 2 million professionals.',
    credentials: ['Content Marketing Institute Certified', 'SEMrush Certified', 'Published Author'],
    expertise: ['Content Strategy', 'Keyword Research', 'Editorial Planning'],
    color: '#0891b2'
  },
  {
    slug: 'david-park',
    name: 'David Park',
    role: 'Lead Developer & Tool Creator',
    bio: 'David is a full-stack developer with 12 years of experience building web applications. He has contributed to major open-source projects and previously built developer tools at a Y Combinator startup. He architected all 45+ tools on KwordSEO.',
    credentials: ['Open Source Contributor', 'Former YC Engineer', '12+ Years Development'],
    expertise: ['JavaScript', 'Web Performance', 'Tool Architecture'],
    color: '#16a34a'
  }
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}

function generateAuthorPage(author) {
  const initials = getInitials(author.name);
  const pageTitle = `${author.name} - ${author.role} | KwordSEO`;
  const metaDesc = `${author.bio.substring(0, 155)}...`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(metaDesc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${BASE}/authors/${author.slug}.html">\n  <link rel="manifest" href="/manifest.json">\n  <meta name="theme-color" content="#2563eb">
<link rel="alternate" hreflang="en" href="${BASE}/authors/${author.slug}.html">
<link rel="alternate" hreflang="en-US" href="${BASE}/authors/${author.slug}.html">
<link rel="alternate" hreflang="en-GB" href="${BASE}/authors/${author.slug}.html">
<link rel="alternate" hreflang="x-default" href="${BASE}/authors/${author.slug}.html">
<meta property="og:title" content="${esc(author.name)} - ${esc(author.role)}">
<meta property="og:description" content="${esc(metaDesc)}">
<meta property="og:url" href="${BASE}/authors/${author.slug}.html">
<meta property="og:site_name" content="KwordSEO">
<meta property="og:type" content="profile">
<meta property="og:image" content="${BASE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(author.name)} - ${esc(author.role)}">
<meta name="twitter:description" content="${esc(metaDesc)}">
<meta name="twitter:image" content="${BASE}/og-image.png">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/css/style.css">
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KDTPKT4T');</script>
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"${esc(author.name)}","jobTitle":"${esc(author.role)}","worksFor":{"@type":"Organization","name":"KwordSEO","url":"${BASE}"},"knowsAbout":${JSON.stringify(author.expertise)},"url":"${BASE}/authors/${author.slug}.html"}</script>
</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDTPKT4T" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
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
</nav>
<div class="header-actions">
<button type="button" class="theme-toggle" id="themeToggle" onclick="App.toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode"><span class="track"></span><span class="thumb"><svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span></button>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()"><div class="hamburger"><span></span><span></span><span></span></div></button>
</div>
</div>
<div class="nav-backdrop" id="navBackdrop" onclick="App.closeMenu()"></div>
</header>

<main id="main-content">
<div class="container">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <a href="/about.html" style="color:var(--text-3);text-decoration:none">About</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">${esc(author.name)}</span></div>

<div class="author-page-header">
<div class="author-page-avatar" style="width:120px;height:120px;border-radius:50%;background:${author.color};display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2.5rem;font-weight:800;color:#fff">${initials}</div>
<h1 class="author-page-name" style="font-size:2rem;font-weight:800;margin-bottom:8px">${esc(author.name)}</h1>
<p class="author-page-role" style="font-size:1.1rem;color:${author.color};margin-bottom:24px">${esc(author.role)}</p>

<div class="author-credentials" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:32px">
${author.credentials.map(c => `<span style="padding:6px 14px;background:var(--accent-light);border-radius:20px;font-size:.85rem;color:var(--accent)">${esc(c)}</span>`).join('\n')}
</div>
</div>

<div style="max-width:720px;margin:0 auto">
<div style="padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:32px">
<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px;color:var(--accent)">About ${esc(author.name.split(' ')[0])}</h2>
<p style="font-size:1rem;color:var(--text);line-height:1.8">${esc(author.bio)}</p>
</div>

<div style="padding:24px 28px;background:var(--bg-2);border:1px solid var(--border);border-radius:12px;margin-bottom:32px">
<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px">Areas of Expertise</h2>
<div style="display:flex;flex-wrap:wrap;gap:8px">
${author.expertise.map(e => `<span style="padding:6px 14px;background:var(--surface);border:1px solid var(--border);border-radius:6px;font-size:.85rem;color:var(--text)">${esc(e)}</span>`).join('\n')}
</div>
</div>

<div style="padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:32px">
<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px">Credentials</h2>
<ul style="list-style:none;padding:0;margin:0">
${author.credentials.map(c => `<li style="padding:8px 0;border-bottom:1px solid var(--border);color:var(--text-2);font-size:.9rem">✓ ${esc(c)}</li>`).join('\n')}
</ul>
</div>

${(() => {
  const posts = authorPosts[author.slug] || [];
  if (!posts.length) return '';
  let html = '<div style="padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:32px">';
  html += '<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">Articles by ' + esc(author.name.split(' ')[0]) + ' (' + posts.length + ')</h2>';
  html += '<div style="display:grid;gap:16px">';
  posts.forEach(p => {
    html += '<a href="/blog/' + p.slug + '.html" style="display:block;padding:16px;background:var(--bg);border:1px solid var(--border);border-radius:8px;text-decoration:none;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">';
    html += '<div style="display:flex;gap:8px;align-items:center;margin-bottom:6px"><span style="font-size:.75rem;padding:3px 8px;background:var(--accent-light);color:var(--accent);border-radius:4px;font-weight:600">' + esc(p.category) + '</span><span style="font-size:.75rem;color:var(--text-3)">' + esc(p.date) + '</span><span style="font-size:.75rem;color:var(--text-3)">· ' + esc(p.readTime) + '</span></div>';
    html += '<h3 style="font-size:.95rem;font-weight:600;color:var(--text);margin-bottom:4px;line-height:1.4">' + esc(p.title) + '</h3>';
    html += '<p style="font-size:.85rem;color:var(--text-3);margin:0;line-height:1.5">' + esc(p.desc) + '</p>';
    html += '</a>';
  });
  html += '</div></div>';
  return html;
})()}

<div style="text-align:center;padding:32px 0;border-top:1px solid var(--border)">
<p style="color:var(--text-3);font-size:.85rem;margin-bottom:16px">Want to learn more about our team?</p>
<a href="/about.html" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;transition:opacity .2s" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Meet the Full Team</a>
</div>
</div>
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
<div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent"><p> We use cookies for analytics & preferences. <a href="/cookie-policy.html">Learn more</a></p><div class="btn-group"><button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button><button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button></div></div>
<div class="toast" id="appToast"></div>
<script src="/js/app.js"></script>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js');}</script>
</body>
</html>`;
}

const authorPosts = {
  'sarah-mitchell': [
    {slug:'internal-linking-strategy-seo',title:'Internal Linking Strategy: How to Build a Link Architecture That Ranks',category:'SEO Strategy',date:'2026-07-10',readTime:'11 min',desc:'Internal links distribute page authority and help Google understand your site structure.'},
    {slug:'google-search-console-guide-beginners',title:'Google Search Console for Beginners: Complete Setup Guide',category:'SEO Tutorial',date:'2026-07-10',readTime:'12 min',desc:'Google Search Console is the most important free SEO tool.'},
    {slug:'how-to-build-backlinks-2026',title:'How to Build Backlinks in 2026: 10 Proven Strategies',category:'Off-Page SEO',date:'2026-07-10',readTime:'12 min',desc:'Backlinks remain a top Google ranking factor.'},
    {slug:'google-ai-overview-spam-policy-2026',title:"Google's AI Overview Spam Policy: What Gets You Penalized in 2026",category:'Policy Update',date:'2026-07-02',readTime:'12 min',desc:'Google now treats AI Overview manipulation as spam.'},
    {slug:'optimize-google-ai-overviews',title:'How to Optimize for Google AI Overviews: The Complete GEO Guide',category:'SEO Strategy',date:'2026-07-03',readTime:'12 min',desc:'Google AI Mode has 1B+ users.'},
    {slug:'google-june-2026-spam-update',title:'Google June 2026 Spam Update: Complete Recovery & Strategy Guide',category:'SEO Analysis',date:'2026-07-04',readTime:'12 min',desc:"Google's June 2026 Spam Update is live."},
    {slug:'eeat-2026-google-trust-guide',title:'E-E-A-T in 2026: How Google Now Decides Who to Trust',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',desc:'E-E-A-T has evolved from a page-level checklist into an entity verification system.'},
    {slug:'ai-content-detection-2026',title:'AI Content Detection 2026: How Google Catches AI Writing',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',desc:'Google now detects AI-generated content with 94% accuracy.'},
    {slug:'query-fanout-seo-2026',title:'Query Fan-Out SEO 2026: How Google Breaks Down Searches',category:'SEO Strategy',date:'2026-07-05',readTime:'10 min',desc:'Query fan-out has grown +2,550% YoY.'},
    {slug:'how-to-get-cited-google-ai-overviews',title:'How to Get Cited in Google AI Overviews: The 2026 Playbook',category:'SEO Strategy',date:'2026-07-06',readTime:'14 min',desc:'Google AI Overviews now appear on most queries.'},
    {slug:'query-fanout-vs-keywords',title:'Query Fan-Out vs Keywords: Why Traditional Keyword Research Is Dead',category:'SEO Strategy',date:'2026-07-06',readTime:'12 min',desc:'95% of fan-out sub-queries show zero volume in keyword tools.'},
    {slug:'seo-rank-tracking-guide',title:'The Complete Guide to SEO Rank Tracking in 2026',category:'SEO Tools',date:'2026-07-12',readTime:'12 min',desc:'Track your search rankings effectively with the right tools.'},
    {slug:'competitor-seo-analysis',title:'How to Do a Competitor SEO Analysis (Step-by-Step Guide)',category:'SEO Strategy',date:'2026-07-12',readTime:'12 min',desc:'Reverse-engineer what makes your competitors rank.'},
    {slug:'google-ai-mode-seo-guide-2026',title:'Google AI Mode SEO: How to Optimize for the New Default Search in 2026',category:'SEO Strategy',date:'2026-07-15',readTime:'14 min',desc:'Google AI Mode now has 1B+ users and is the default search experience.'},
    {slug:'zero-click-search-optimization',title:'Zero-Click Search Optimization: How to Win When Users Do not Click',category:'SEO Strategy',date:'2026-07-15',readTime:'11 min',desc:'Zero-click searches now dominate Google results.'}
  ],
  'james-chen': [
    {slug:'how-to-optimize-images-for-seo',title:'How to Optimize Images for SEO: Complete 2026 Guide',category:'Technical SEO',date:'2026-07-10',readTime:'10 min',desc:'Image optimization is a critical ranking factor.'},
    {slug:'schema-markup-types-for-seo',title:'Schema Markup Types Every Website Needs in 2026',category:'Technical SEO',date:'2026-07-10',readTime:'9 min',desc:'Structured data helps Google understand your content.'},
    {slug:'how-to-improve-core-web-vitals',title:'How to Improve Core Web Vitals: Practical Fixes for 2026',category:'Technical SEO',date:'2026-07-10',readTime:'10 min',desc:'Core Web Vitals are confirmed Google ranking factors.'},
    {slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',category:'SEO Tips',date:'2026-06-18',readTime:'6 min',desc:'Learn the art of crafting compelling meta descriptions.'},
    {slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',category:'SEO Tips',date:'2026-06-10',readTime:'6 min',desc:'Learn how canonical tags prevent duplicate content issues.'},
    {slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',category:'Social Media',date:'2026-06-08',readTime:'5 min',desc:'Master Open Graph meta tags for social sharing.'},
    {slug:'how-to-write-meta-descriptions',title:'Meta Description Templates: 15 Copy-Paste Examples for Every Page Type',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',desc:'Get 15 proven templates for product pages, blog posts, and more.'},
    {slug:'how-to-create-robots-txt-file',title:'How to Create a Robots.txt File: Complete Step-by-Step Guide',category:'Technical SEO',date:'2026-07-08',readTime:'9 min',desc:'Learn how to create a robots.txt file.'},
    {slug:'xml-sitemap-guide-seo',title:'XML Sitemap Guide: How to Create and Submit Your Sitemap for SEO',category:'Technical SEO',date:'2026-07-08',readTime:'10 min',desc:'An XML sitemap helps search engines discover and index your pages faster.'},
    {slug:'seo-analytics-dashboard',title:'SEO Analytics Dashboard: How to Track and Report SEO Performance',category:'SEO Tutorial',date:'2026-07-12',readTime:'11 min',desc:'Build an SEO analytics dashboard that proves ROI.'},
    {slug:'ecommerce-seo-checklist',title:'E-commerce SEO Checklist: Product Pages, Schema & Category Optimization',category:'Technical SEO',date:'2026-07-12',readTime:'13 min',desc:'E-commerce sites face unique SEO challenges.'},
    {slug:'chatgpt-search-vs-google-seo',title:'ChatGPT Search vs Google: What SEO Professionals Need to Know in 2026',category:'SEO Analysis',date:'2026-07-16',readTime:'12 min',desc:'ChatGPT Search, Perplexity, and AI assistants are changing how people find information.'},
    {slug:'structured-data-for-ai-search',title:'Structured Data for AI Search: How Schema Markup Gets You Cited by AI',category:'Technical SEO',date:'2026-07-16',readTime:'10 min',desc:'Structured data is the bridge between your content and AI search engines.'}
  ],
  'emma-rodriguez': [
    {slug:'local-seo-checklist-2026',title:'Local SEO Checklist 2026: 20 Steps to Dominate Local Search',category:'Local SEO',date:'2026-07-10',readTime:'11 min',desc:'Local SEO drives foot traffic and phone calls.'},
    {slug:'seo-vs-sem-whats-the-difference',title:'SEO vs SEM: What is the Difference and Which Should You Use?',category:'SEO Fundamentals',date:'2026-07-10',readTime:'8 min',desc:'SEO and SEM both drive traffic but work differently.'},
    {slug:'find-trending-keywords-before-competitors',title:'How to Find Trending Keywords Before Competitors in 2026',category:'Keyword Research',date:'2026-07-06',readTime:'11 min',desc:'By the time keyword tools show volume, competitors already target it.'},
    {slug:'long-tail-keyword-strategy-2026',title:'Long-Tail Keyword Strategy 2026: How to Find and Rank for Keywords That Convert',category:'Keyword Research',date:'2026-07-06',readTime:'10 min',desc:'Long-tail keywords drive 70% of all searches.'},
    {slug:'what-is-keyword-density',title:'What Is Keyword Density? The Complete Guide for SEO in 2026',category:'SEO Fundamentals',date:'2026-07-06',readTime:'8 min',desc:'Keyword density measures how often a keyword appears in your content.'},
    {slug:'free-seo-tools-small-business',title:'25 Free SEO Tools Every Small Business Needs in 2026',category:'SEO Tools',date:'2026-07-06',readTime:'12 min',desc:'Discover the best free SEO tools for small businesses.'},
    {slug:'how-to-check-keyword-density',title:'How to Check Keyword Density: Step-by-Step Guide with Free Tools',category:'SEO Tutorial',date:'2026-07-06',readTime:'7 min',desc:'Learn how to check keyword density in your content.'},
    {slug:'seo-content-writing-guide',title:'SEO Content Writing: How to Write Content That Ranks in 2026',category:'Content Strategy',date:'2026-07-06',readTime:'14 min',desc:'Learn how to write SEO-optimized content.'},
    {slug:'youtube-seo-guide',title:'YouTube SEO Guide: How to Rank Videos on Google and YouTube in 2026',category:'SEO Strategy',date:'2026-07-12',readTime:'11 min',desc:'Video search is exploding.'},
    {slug:'prompt-engineering-for-seo',title:'Prompt Engineering for SEO: How to Use AI Prompts to Create Content That Ranks',category:'Content Strategy',date:'2026-07-17',readTime:'13 min',desc:'AI prompts can 10x your SEO content workflow.'}
  ],
  'david-park': [
    {slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',category:'SEO Tools',date:'2026-06-20',readTime:'8 min',desc:'Discover how free online SEO tools can boost your content strategy.'},
    {slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',category:'Development',date:'2026-06-15',readTime:'7 min',desc:'Master JSON formatting, validation, and optimization.'},
    {slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',category:'Blogging',date:'2026-06-12',readTime:'5 min',desc:'Learn how to write beautiful blog posts using Markdown.'}
  ]
};

let created = 0;
authors.forEach(author => {
  const html = generateAuthorPage(author);
  const filePath = path.join(outDir, `${author.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Created: authors/${author.slug}.html`);
  created++;
});

console.log(`\nAuthor build complete! ${created} author pages generated.`);
