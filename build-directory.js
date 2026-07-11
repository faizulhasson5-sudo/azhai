const fs = require('fs');
const path = require('path');

const BASE = 'https://azhai-six.vercel.app';
const today = new Date().toISOString().slice(0, 10);
const outDir = path.join(__dirname, 'public', 'tools');
fs.mkdirSync(outDir, { recursive: true });

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

const categories = [
  {
    id: 'text-analysis',
    name: 'Text Analysis Tools',
    title: 'Best Free Text Analysis Tools Online in 2026',
    desc: 'Count words, characters, sentences, paragraphs, and analyze text frequency with these free online tools. No sign-up required.',
    icon: '📊',
    tools: [
      {id:'word-counter',name:'Word Counter',desc:'Count words, characters, lines, sentences and paragraphs in any text.',use:'Blog posts, essays, social media'},
      {id:'char-counter',name:'Character Counter',desc:'Count characters with and without spaces. Check byte size.',use:'Twitter, SMS, form limits'},
      {id:'sentence-counter',name:'Sentence Counter',desc:'Count sentences by detecting punctuation boundaries.',use:'Readability analysis'},
      {id:'paragraph-counter',name:'Paragraph Counter',desc:'Count paragraphs by detecting empty line breaks.',use:'Content structure analysis'},
      {id:'word-frequency',name:'Word Frequency Counter',desc:'Analyze word occurrence frequency and distribution.',use:'Content analysis, SEO'},
      {id:'keyword-density',name:'Keyword Density Checker',desc:'Calculate keyword frequency and density percentage.',use:'SEO optimization'},
      {id:'keyword-extract',name:'Keyword Extractor',desc:'Extract the most frequent keywords from text.',use:'SEO research, content planning'}
    ],
    faqs: [
      {q:'What is a text analysis tool?',a:'A text analysis tool processes text to extract useful information like word count, character count, sentence structure, keyword frequency, and readability metrics. These tools help writers, students, and SEO professionals analyze their content.'},
      {q:'Why is word count important for SEO?',a:'Search engines consider content length when determining topical depth. Generally, longer content (1,500+ words) ranks better because it covers topics more thoroughly. However, quality matters more than quantity — a well-written 800-word post can outrank a thin 2,000-word post.'},
      {q:'What is keyword density and what should it be?',a:'Keyword density is the percentage of times a keyword appears in your content relative to the total word count. The ideal keyword density is 1-2%. Stuffing keywords above 3% can trigger spam penalties from Google.'},
      {q:'How do I extract keywords from text?',a:'Use our Keyword Extractor tool — paste your text and it will identify the most frequently used terms. Focus on nouns and noun phrases that represent your main topics. Use these keywords naturally throughout your content.'}
    ]
  },
  {
    id: 'seo-tools',
    name: 'SEO Tools',
    title: 'Best Free SEO Tools for Small Businesses in 2026',
    desc: 'Generate meta tags, check keyword density, create robots.txt files, build sitemaps, and optimize your website for search engines — all free.',
    icon: '🔍',
    tools: [
      {id:'meta-gen',name:'Meta Tag Generator',desc:'Generate complete HTML meta tags including OG and Twitter cards.',use:'On-page SEO'},
      {id:'meta-desc-gen',name:'Meta Description Generator',desc:'Generate SEO-optimized meta descriptions from content.',use:'SERP optimization'},
      {id:'og-generator',name:'Open Graph Generator',desc:'Generate Open Graph meta tags for social media sharing.',use:'Social media SEO'},
      {id:'canonical-gen',name:'Canonical URL Generator',desc:'Generate canonical link tags to prevent duplicate content.',use:'Technical SEO'},
      {id:'robots-txt',name:'Robots.txt Generator',desc:'Generate robots.txt with crawl directives and sitemap reference.',use:'Crawl optimization'},
      {id:'sitemap-gen',name:'Sitemap Generator',desc:'Generate XML sitemaps for search engine indexing.',use:'Indexation'},
      {id:'hreflang-gen',name:'Hreflang Tag Generator',desc:'Generate hreflang tags for multilingual websites.',use:'International SEO'},
      {id:'slug-generator',name:'URL Slug Generator',desc:'Convert titles to URL-friendly slugs for SEO.',use:'URL optimization'}
    ],
    faqs: [
      {q:'What are the most important SEO tools?',a:'The most essential SEO tools are: Meta Tag Generator (for title and description tags), Keyword Density Checker (for on-page optimization), Robots.txt Generator (for crawl control), and Sitemap Generator (for indexation). Our free tools cover all of these.'},
      {q:'How do I create a robots.txt file?',a:'Use our Robots.txt Generator tool. Enter your user-agent (usually *), set any paths to disallow, add your sitemap URL, and click Generate. Copy the output to your website root directory.'},
      {q:'What is a canonical tag and why does it matter?',a:'A canonical tag tells search engines which version of a page is the "master" version. It prevents duplicate content issues when the same content is accessible via multiple URLs. Use our Canonical URL Generator to create them.'},
      {q:'How often should I update my sitemap?',a:'Update your sitemap whenever you add, remove, or significantly update pages. For most websites, this means updating the sitemap monthly. Our Sitemap Generator can regenerate your sitemap in seconds.'}
    ]
  },
  {
    id: 'text-formatting',
    name: 'Text Formatting Tools',
    title: 'Best Free Text Formatting & Editing Tools Online',
    desc: 'Convert text case, remove extra spaces, find and replace text, sort lines, and format text instantly with these free tools.',
    icon: '✏️',
    tools: [
      {id:'case-converter',name:'Case Converter',desc:'Convert text between UPPERCASE, lowercase, Title Case, Sentence case.',use:'Content formatting'},
      {id:'remove-spaces',name:'Remove Spaces',desc:'Remove leading, trailing, and extra whitespace from text.',use:'Text cleanup'},
      {id:'find-replace',name:'Find and Replace',desc:'Find and replace text with regex support and case-insensitive options.',use:'Bulk text editing'},
      {id:'line-sorter',name:'Line Sorter',desc:'Sort lines of text alphabetically in ascending or descending order.',use:'Data organization'},
      {id:'alpha-sorter',name:'Alphabetical Sorter',desc:'Sort text lines in strict alphabetical A-Z order.',use:'List organization'},
      {id:'text-reverser',name:'Text Reverser',desc:'Reverse text by characters, words, or lines.',use:'Fun, testing'},
      {id:'duplicate-remover',name:'Duplicate Line Remover',desc:'Remove duplicate lines from text with case-insensitive option.',use:'Data cleanup'},
      {id:'lorem-generator',name:'Lorem Ipsum Generator',desc:'Generate Lorem Ipsum placeholder text with custom paragraph count.',use:'Design, prototyping'}
    ],
    faqs: [
      {q:'What is a case converter?',a:'A case converter transforms text between different capitalization styles: UPPERCASE, lowercase, Title Case (each word capitalized), Sentence case (first letter capitalized), and toggleCase. Our free tool does this instantly.'},
      {q:'How do I remove duplicate lines from text?',a:'Paste your text into our Duplicate Line Remover tool and click Process. It will identify and remove all duplicate lines, keeping only unique entries. Enable case-insensitive comparison for more flexible matching.'},
      {q:'Can I sort lines of text alphabetically?',a:'Yes! Our Line Sorter and Alphabetical Sorter tools sort text lines in A-Z or Z-A order. The Line Sorter offers ascending/descending options, while the Alphabetical Sorter uses strict A-Z ordering.'},
      {q:'What is Lorem Ipsum text?',a:'Lorem Ipsum is placeholder text used in the design and publishing industry. It originated from Cicero\'s writings in 45 BC but has been scrambled and modified over centuries. Use our Lorem Ipsum Generator to create custom amounts of this text.'}
    ]
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    title: 'Best Free Developer & Code Tools Online',
    desc: 'Format JSON, validate XML, test regex, preview HTML, edit Markdown, and more with these free online developer tools.',
    icon: '💻',
    tools: [
      {id:'json-formatter',name:'JSON Formatter',desc:'Beautify and validate JSON with customizable indentation.',use:'Data formatting'},
      {id:'json-validator',name:'JSON Validator',desc:'Validate JSON syntax and structure instantly.',use:'Error detection'},
      {id:'xml-formatter',name:'XML Formatter',desc:'Pretty-print and indent XML documents.',use:'XML formatting'},
      {id:'xml-validator',name:'XML Validator',desc:'Validate XML structure and syntax.',use:'Error detection'},
      {id:'markdown-editor',name:'Markdown Editor',desc:'Write Markdown with live HTML preview side by side.',use:'Documentation, blogging'},
      {id:'markdown-preview',name:'Markdown Preview',desc:'Convert Markdown to HTML output instantly.',use:'Content conversion'},
      {id:'html-previewer',name:'HTML Previewer',desc:'Preview HTML code with live rendering in browser.',use:'Web development'},
      {id:'regex-tester',name:'Regex Tester',desc:'Test regular expressions with match highlighting.',use:'Pattern matching'}
    ],
    faqs: [
      {q:'What is a JSON formatter?',a:'A JSON formatter takes raw JSON data and formats it with proper indentation, making it readable and easy to debug. Our tool supports 2-space, 4-space, and tab indentation options.'},
      {q:'How do I validate JSON?',a:'Paste your JSON into our JSON Validator tool. It will immediately check for syntax errors, missing commas, incorrect brackets, and other common issues. If valid, it confirms the structure is correct.'},
      {q:'What is Markdown?',a:'Markdown is a lightweight markup language created by John Gruber. It uses simple syntax (like # for headers, ** for bold, and - for lists) to create formatted text that converts to HTML. It\'s used for documentation, README files, and blogging.'},
      {q:'How do I test regular expressions?',a:'Use our Regex Tester tool. Enter your regex pattern and test string. The tool highlights matches in real time and shows capture groups. This is invaluable for debugging complex patterns.'}
    ]
  },
  {
    id: 'encoding-tools',
    name: 'Encoding & Decoding Tools',
    title: 'Best Free Encoding & Decoding Tools Online',
    desc: 'Encode and decode URLs, HTML entities, and Base64 strings with these free online tools. Quick, accurate, no sign-up.',
    icon: '🔐',
    tools: [
      {id:'url-encoder',name:'URL Encoder',desc:'Encode special characters for URLs instantly.',use:'URL preparation'},
      {id:'url-decoder',name:'URL Decoder',desc:'Decode percent-encoded URL strings back to readable text.',use:'URL reading'},
      {id:'html-encoder',name:'HTML Encoder',desc:'Escape HTML special characters to entities.',use:'XSS prevention'},
      {id:'html-decoder',name:'HTML Decoder',desc:'Decode HTML entities back to readable text.',use:'Content extraction'},
      {id:'b64-encoder',name:'Base64 Encoder',desc:'Encode text to Base64 format instantly.',use:'Data encoding'},
      {id:'b64-decoder',name:'Base64 Decoder',desc:'Decode Base64 strings back to original text.',use:'Data decoding'},
      {id:'hash-generator',name:'Hash Generator',desc:'Generate djb2 and FNV-1a hashes from text.',use:'Data integrity, checksums'}
    ],
    faqs: [
      {q:'What is URL encoding?',a:'URL encoding (percent encoding) converts special characters in URLs to a format that can be transmitted over the Internet. For example, a space becomes %20, and @ becomes %40. Our URL Encoder handles this automatically.'},
      {q:'What is Base64 encoding?',a:'Base64 encodes binary data into ASCII text format. It\'s commonly used for transmitting data over text-based protocols like email and HTTP. Our Base64 Encoder converts your text to Base64, and the Decoder reverses it.'},
      {q:'Why is HTML encoding important?',a:'HTML encoding prevents Cross-Site Scripting (XSS) attacks by converting special characters like < and > into their HTML entity equivalents (&lt; and &gt;). This ensures user input is displayed as text, not executed as code.'},
      {q:'What is a hash generator?',a:'A hash generator creates a fixed-size numerical fingerprint from any input text. Even a tiny change in the input produces a completely different hash. Our tool generates both djb2 and FNV-1a hashes for comparison.'}
    ]
  },
  {
    id: 'schema-generators',
    name: 'Schema & Structured Data Tools',
    title: 'Best Free Schema Markup & Structured Data Generators',
    desc: 'Generate JSON-LD structured data for Articles, FAQs, Breadcrumbs, and more. Get rich results in Google search.',
    icon: '📋',
    tools: [
      {id:'schema-gen',name:'Schema Markup Generator',desc:'Generate JSON-LD structured data for multiple types.',use:'Rich results'},
      {id:'faq-schema-gen',name:'FAQ Schema Generator',desc:'Generate FAQ structured data for Google rich results.',use:'FAQ rich results'},
      {id:'article-schema-gen',name:'Article Schema Generator',desc:'Generate Article structured data for blog posts.',use:'Article rich results'},
      {id:'breadcrumb-schema-gen',name:'Breadcrumb Schema Generator',desc:'Generate BreadcrumbList structured data.',use:'Navigation rich results'}
    ],
    faqs: [
      {q:'What is schema markup?',a:'Schema markup (also called structured data) is code you add to your website that helps search engines understand your content. It can trigger rich results like FAQ dropdowns, breadcrumbs, and article metadata in Google search.'},
      {q:'How do I add FAQ schema to my website?',a:'Use our FAQ Schema Generator. Add your question-answer pairs, click Generate, and copy the JSON-LD code. Paste it into the <head> or <body> of your HTML page. Google will then display your FAQs as expandable dropdowns in search results.'},
      {q:'What are rich results?',a:'Rich results are enhanced search listings that show extra information beyond the standard title, URL, and description. Examples include FAQ dropdowns, star ratings, recipe details, and breadcrumb navigation. They increase click-through rates by 20-30%.'},
      {q:'Does schema markup improve SEO rankings?',a:'Schema markup doesn\'t directly improve rankings, but it helps search engines better understand your content and can trigger rich results. Rich results have higher click-through rates, which indirectly improves rankings through increased engagement signals.'}
    ]
  }
];

function generateCategoryPage(cat) {
  const url = BASE + '/tools/' + cat.id + '.html';
  const toolLinks = cat.tools.map(t =>
    '<a href="/tools/' + t.id + '.html" class="category-tool-link" style="display:flex;flex-direction:column;padding:20px;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' +
    '<div style="font-weight:600;font-size:1rem;margin-bottom:6px;color:var(--text)">' + esc(t.name) + '</div>' +
    '<div style="font-size:.85rem;color:var(--text-2);margin-bottom:8px;line-height:1.5">' + esc(t.desc) + '</div>' +
    '<div style="font-size:.75rem;color:var(--accent);margin-top:auto">Use case: ' + esc(t.use) + ' &rarr;</div></a>'
  ).join('\n');

  const faqItems = cat.faqs.map(f =>
    '<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">' + esc(f.q) + ' <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">' + esc(f.a) + '</div></details>'
  ).join('\n');

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cat.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {"@type": "Answer", "text": f.a}
    }))
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/"},
      {"@type": "ListItem", "position": 2, "name": "Tools", "item": BASE + "/tools/"},
      {"@type": "ListItem", "position": 3, "name": cat.name, "item": url}
    ]
  });

  const otherCats = categories.filter(c => c.id !== cat.id);
  const relatedLinks = otherCats.map(c =>
    '<a href="/tools/' + c.id + '.html" style="display:inline-block;padding:8px 16px;background:var(--bg-2);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.85rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + c.icon + ' ' + esc(c.name) + '</a>'
  ).join(' ');

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
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><span class="logo-mark">⚡</span> KwordSEO</a>
<nav class="nav" aria-label="Main navigation">
<a href="/" class="nav-link">Home</a>
<a href="/tools/" class="nav-link active">Tools</a>
<a href="/tools/smart-text-lab.html" class="nav-link">Smart Lab</a>
<a href="/blog/" class="nav-link">Blog</a>
<button type="button" class="theme-btn" onclick="App.toggleTheme()" aria-label="Toggle theme">🌙</button>
</nav>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()">☰</button>
</div>
</header>
<main id="main-content">
<div class="container" style="max-width:900px;margin:0 auto;padding:32px 20px">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <a href="/tools/" style="color:var(--text-3);text-decoration:none">Tools</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">${esc(cat.name)}</span></div>
<h1 style="font-size:2.2rem;font-weight:800;margin-bottom:12px;line-height:1.2">${cat.icon} ${esc(cat.title)}</h1>
<p style="font-size:1.1rem;color:var(--text-2);line-height:1.7;margin-bottom:40px;max-width:720px">${esc(cat.desc)}</p>

<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px;color:var(--text)">${esc(cat.name)} (${cat.tools.length} Tools)</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:48px">
${toolLinks}
</div>

<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px;color:var(--text)">Frequently Asked Questions</h2>
<div style="margin-bottom:48px">
${faqItems}
</div>

<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px;color:var(--text)">Explore Other Tool Categories</h2>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:48px">
${relatedLinks}
</div>

<section style="padding:32px 0;border-top:1px solid var(--border)">
<h2 style="font-size:1.2rem;font-weight:700;margin-bottom:12px">About ${esc(cat.name)}</h2>
<p style="color:var(--text-2);line-height:1.7;margin-bottom:16px">Our collection of ${esc(cat.name).toLowerCase()} includes ${cat.tools.length} free online tools designed for writers, developers, and SEO professionals. All tools run entirely in your browser — no data is uploaded to any server. Your text stays private and secure.</p>
<p style="color:var(--text-2);line-height:1.7">Each tool is designed for speed and accuracy. Simply paste your text, click a button, and get instant results. No sign-up required. No ads. No tracking. Just fast, free tools that work.</p>
</section>
</div>
</main>
<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div class="footer-col">
<a href="/" class="site-logo" style="color:inherit;margin-bottom:8px"><span class="logo-mark">⚡</span> KwordSEO</a>
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

function generateDirectoryPage() {
  const url = BASE + '/tools/directory.html';

  const catSections = categories.map(cat => {
    const toolRows = cat.tools.map(t =>
      '<tr><td><a href="/tools/' + t.id + '.html" style="color:var(--accent);text-decoration:none;font-weight:500">' + esc(t.name) + '</a></td><td style="color:var(--text-2);font-size:.85rem">' + esc(t.desc) + '</td><td style="color:var(--text-3);font-size:.8rem;white-space:nowrap">' + esc(t.use) + '</td></tr>'
    ).join('\n');
    return `
    <div style="margin-bottom:48px">
      <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <a href="/tools/${cat.id}.html" style="color:var(--text);text-decoration:none;border-bottom:2px solid transparent;transition:border-color .2s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='transparent'">${cat.icon} ${esc(cat.name)}</a>
        <span style="font-size:.75rem;font-weight:400;color:var(--text-3);background:var(--bg-2);padding:2px 8px;border-radius:4px">${cat.tools.length} tools</span>
      </h2>
      <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:.9rem">
        <thead><tr style="border-bottom:2px solid var(--border);text-align:left">
          <th style="padding:10px 12px;font-weight:600;color:var(--text)">Tool</th>
          <th style="padding:10px 12px;font-weight:600;color:var(--text)">Description</th>
          <th style="padding:10px 12px;font-weight:600;color:var(--text)">Best For</th>
        </tr></thead>
        <tbody>${toolRows}</tbody>
      </table>
      </div>
      <div style="margin-top:12px"><a href="/tools/${cat.id}.html" style="color:var(--accent);font-size:.85rem;text-decoration:none">View all ${cat.tools.length} ${esc(cat.name).toLowerCase()} &rarr;</a></div>
    </div>`;
  }).join('\n');

  const allToolLinks = categories.flatMap(cat =>
    cat.tools.map(t => '<a href="/tools/' + t.id + '.html" style="display:inline-block;padding:6px 12px;background:var(--bg-2);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.8rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + esc(t.name) + '</a>')
  ).join(' ');

  const catLinks = categories.map(c =>
    '<a href="/tools/' + c.id + '.html" style="display:inline-block;padding:10px 18px;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);font-size:.9rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + c.icon + ' ' + esc(c.name) + '</a>'
  ).join(' ');

  const totalTools = categories.reduce((sum, c) => sum + c.tools.length, 0);

  const siteNavSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Tools Directory",
    "url": url,
    "hasPart": categories.map(c => ({
      "@type": "SiteNavigationElement",
      "name": c.name,
      "url": BASE + "/tools/" + c.id + ".html"
    }))
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/"},
      {"@type": "ListItem", "position": 2, "name": "Tools", "item": BASE + "/tools/"},
      {"@type": "ListItem", "position": 3, "name": "Directory", "item": url}
    ]
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How many free tools does this site offer?", "acceptedAnswer": { "@type": "Answer", "text": "We offer " + totalTools + "+ free online text tools organized across 6 categories: Text Analysis, SEO Tools, Text Formatting, Developer Tools, Encoding & Decoding, and Schema Generators. All tools are completely free with no sign-up required." } },
      { "@type": "Question", "name": "Are these tools really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, all tools are 100% free with no usage limits. There are no premium tiers, no paywalls, and no hidden fees. We believe essential text tools should be accessible to everyone." } },
      { "@type": "Question", "name": "Is my data safe when using these tools?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. All processing happens entirely in your browser using JavaScript. No text or files are ever uploaded to our servers. Your data stays on your device and is never stored or transmitted." } },
      { "@type": "Question", "name": "Can I use these tools for commercial purposes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can use any of our free tools for personal or commercial purposes. There are no restrictions on how you use the output generated by our tools." } }
    ]
  });

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Complete Free Text Tools Directory - ${totalTools}+ Online Tools | KwordSEO</title>
<meta name="description" content="Browse our complete directory of ${totalTools}+ free online text tools. Text analysis, SEO, formatting, developer tools, encoding, and schema generators. No sign-up.">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="en-US" href="${url}">
<link rel="alternate" hreflang="en-GB" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:title" content="Complete Free Text Tools Directory - ${totalTools}+ Online Tools">
<meta property="og:description" content="Browse ${totalTools}+ free online text tools. Text analysis, SEO, formatting, developer tools, encoding, and schema generators.">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="KwordSEO">
<meta property="og:image" content="${BASE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Complete Free Text Tools Directory - ${totalTools}+ Online Tools">
<meta name="twitter:description" content="Browse ${totalTools}+ free online text tools across 6 categories.">
<meta name="twitter:image" content="${BASE}/og-image.png">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
<link rel="alternate" type="application/rss+xml" title="KwordSEO Blog" href="/blog/feed.xml">
<link rel="stylesheet" href="/css/style.css">
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<script type="application/ld+json">${siteNavSchema}</script>
<script type="application/ld+json">${breadcrumbSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><span class="logo-mark">⚡</span> KwordSEO</a>
<nav class="nav" aria-label="Main navigation">
<a href="/" class="nav-link">Home</a>
<a href="/tools/" class="nav-link active">Tools</a>
<a href="/tools/smart-text-lab.html" class="nav-link">Smart Lab</a>
<a href="/blog/" class="nav-link">Blog</a>
<button type="button" class="theme-btn" onclick="App.toggleTheme()" aria-label="Toggle theme">🌙</button>
</nav>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()">☰</button>
</div>
</header>
<main id="main-content">
<div class="container" style="max-width:900px;margin:0 auto;padding:32px 20px">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <a href="/tools/" style="color:var(--text-3);text-decoration:none">Tools</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">Directory</span></div>

<h1 style="font-size:2.4rem;font-weight:800;margin-bottom:12px;line-height:1.15">Complete Free Text Tools Directory</h1>
<p style="font-size:1.15rem;color:var(--text-2);line-height:1.7;margin-bottom:16px;max-width:720px">Browse our collection of <strong style="color:var(--text)">${totalTools}+ free online text tools</strong> organized across ${categories.length} categories. No sign-up required. 100% client-side processing — your data never leaves your browser.</p>

<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:40px">
${catLinks}
</div>

${catSections}

<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px">All ${totalTools} Tools at a Glance</h2>
<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:48px">
${allToolLinks}
</div>

<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px">Frequently Asked Questions</h2>
<div style="margin-bottom:48px">
<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">How many free tools does this site offer? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">We offer ${totalTools}+ free online text tools organized across ${categories.length} categories: Text Analysis, SEO Tools, Text Formatting, Developer Tools, Encoding & Decoding, and Schema Generators. All tools are completely free with no sign-up required.</div></details>
<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">Are these tools really free? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">Yes, all tools are 100% free with no usage limits. There are no premium tiers, no paywalls, and no hidden fees. We believe essential text tools should be accessible to everyone.</div></details>
<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">Is my data safe when using these tools? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">Absolutely. All processing happens entirely in your browser using JavaScript. No text or files are ever uploaded to our servers. Your data stays on your device and is never stored or transmitted.</div></details>
<details class="faq-item" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:12px 0;color:var(--text)">Can I use these tools for commercial purposes? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">Yes. You can use any of our free tools for personal or commercial purposes. There are no restrictions on how you use the output generated by our tools.</div></details>
</div>

<section style="padding:32px 0;border-top:1px solid var(--border)">
<h2 style="font-size:1.2rem;font-weight:700;margin-bottom:12px">About This Collection</h2>
<p style="color:var(--text-2);line-height:1.7;margin-bottom:12px">This directory lists every free tool available on our platform. Each tool is designed for speed, accuracy, and privacy. All processing happens in your browser — no data is ever sent to our servers.</p>
<p style="color:var(--text-2);line-height:1.7">Whether you need to count words for a blog post, generate meta tags for SEO, format JSON for development, or encode data for security, our free tools have you covered. Bookmark this page for quick access to all ${totalTools}+ tools.</p>
</section>
</div>
</main>
<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div class="footer-col">
<a href="/" class="site-logo" style="color:inherit;margin-bottom:8px"><span class="logo-mark">⚡</span> KwordSEO</a>
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

// Generate directory page
const dirHtml = generateDirectoryPage();
fs.writeFileSync(path.join(outDir, 'directory.html'), dirHtml, 'utf8');
console.log('Created: public/tools/directory.html');

// Generate category pages
categories.forEach(cat => {
  const html = generateCategoryPage(cat);
  fs.writeFileSync(path.join(outDir, cat.id + '.html'), html, 'utf8');
  console.log('Created: public/tools/' + cat.id + '.html');
});

console.log('\nDirectory build complete! 1 directory + ' + categories.length + ' category pages generated.');
