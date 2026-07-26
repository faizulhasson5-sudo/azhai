const fs = require('fs');
const path = require('path');

const BASE = 'https://azhai-six.vercel.app';
const outDir = path.join(__dirname, 'public', 'skills');
fs.mkdirSync(outDir, { recursive: true });

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

const nav = `<nav class="nav" id="mainNav" aria-label="Main navigation">
<a class="nav-link" href="/">Home</a>
<a class="nav-link" href="/tools/">Tools</a>
<a class="nav-link active" href="/skills/">α tools</a>
<a class="nav-link" href="/courses/">Courses</a>
<a class="nav-link" href="/books/">Books</a>
<a class="nav-link" href="/blog/">Blog</a>
</nav>`;

const headerActions = `<div class="header-actions">
<button type="button" class="theme-toggle" id="themeToggle" onclick="App.toggleTheme()" aria-label="Toggle dark mode" title="Toggle dark mode"><span class="track"></span><span class="thumb"><svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span></button>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()"><div class="hamburger"><span></span><span></span><span></span></div></button>
</div>`;

function pageHead(title, desc, url) {
  return `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0a0a0a">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="en-US" href="${url}">
<link rel="alternate" hreflang="en-GB" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="KwordSEO">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate" type="application/rss+xml" title="KwordSEO Blog" href="/blog/feed.xml">
<meta property="og:type" content="website">
<meta property="og:image" content="https://azhai-six.vercel.app/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="https://azhai-six.vercel.app/og-image.png">
<link rel="stylesheet" href="/css/style.css">
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KDTPKT4T');</script>
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
</head>`;
}

const footer = `<footer class="site-footer">
<div class="container">
<div class="footer-top">
<div class="footer-top-text">
<span class="footer-top-label">Newsletter</span>
<p class="footer-top-title">Get new tools &amp; skill-building tips</p>
<p class="footer-top-sub">No spam. Unsubscribe anytime.</p>
</div>
<form class="footer-top-form" id="newsletterForm" action="/api/subscribe" method="POST">
<input type="email" name="email" placeholder="your@email.com" required aria-label="Email address">
<button type="submit">Subscribe</button>
</form>
</div>
<hr class="footer-divider">
<div class="footer-grid">
<div class="footer-brand">
<a href="/" class="site-logo" style="color:inherit"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>
<p class="footer-brand-desc">50+ free online tools and skill-building resources for everyone. All processing happens in your browser.</p>
</div>
<div class="footer-col">
<p class="footer-col-title">Tools</p>
<a href="/tools/word-counter.html">Word Counter</a>
<a href="/tools/case-converter.html">Case Converter</a>
<a href="/tools/json-formatter.html">JSON Formatter</a>
<a href="/tools/">Browse all tools</a>
</div>
<div class="footer-col">
<p class="footer-col-title">α tools</p>
<a href="/skills/ai-prompt-builder.html">AI Prompt Builder</a>
<a href="/skills/decision-matrix.html">Decision Matrix</a>
<a href="/skills/tone-analyzer.html">Tone Analyzer</a>
<a href="/skills/">Browse all α tools</a>
</div>
<div class="footer-col">
<p class="footer-col-title">Company</p>
<a href="/about.html">About Us</a>
<a href="/blog/">Blog</a>
<a href="/contact.html">Contact</a>
</div>
<div class="footer-col">
<p class="footer-col-title">Legal</p>
<a href="/privacy-policy.html">Privacy Policy</a>
<a href="/terms.html">Terms of Service</a>
<a href="/cookie-policy.html">Cookie Policy</a>
</div>
</div>
<hr class="footer-divider">
<div class="footer-bottom">
<p>&copy; 2026 KwordSEO. All rights reserved.</p>
</div>
</div>
</footer>
<div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent">
<p>We use cookies for analytics &amp; preferences. <a href="/cookie-policy.html">Learn more about cookies</a></p>
<div class="btn-group">
<button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
<button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button>
</div>
</div>
<div class="toast" id="appToast"></div>
<!-- Mobile Bottom Pill Nav -->
<nav class="bottom-pill-nav" aria-label="Mobile navigation">
<a href="/" class="pill-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>Home</span></a>
<a href="/tools/" class="pill-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg><span>Tools</span></a>
<a href="/skills/" class="pill-link active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg><span>α tools</span></a>
<a href="/courses/" class="pill-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg><span>Courses</span></a>
<a href="/books/" class="pill-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg><span>Books</span></a>
</nav>
<script src="/js/app.js"></script>
<script src="/js/blog-data.js"></script>
<script src="/js/tool-core.js"></script>`;

const skills = [
  {id:'ai-prompt-builder',title:'AI Prompt Builder',desc:'Learn prompt engineering by building optimized prompts. See what works, why it works, and copy ready-to-use prompts for ChatGPT, Claude, and Gemini.',skill:'Prompt Engineering',cat:'tools'},
  {id:'decision-matrix',title:'Decision Matrix',desc:'Make complex decisions with structured critical thinking. Weight your criteria, rate your options, and discover which choice wins with clear reasoning.',skill:'Critical Thinking',cat:'tools'},
  {id:'tone-analyzer',title:'Writing Tone Analyzer',desc:'Understand how your writing sounds to others. Analyze tone, clarity, and emotional impact. Get specific suggestions to improve every message.',skill:'Communication',cat:'tools'},
  {id:'habit-builder',title:'Habit Builder',desc:'Build lasting habits using proven behavioral science. Habit stacking, the 2-minute rule, and environment design — all backed by research.',skill:'Behavior Change',cat:'tools'},
  {id:'smart-goal-planner',title:'SMART Goal Planner',desc:'Turn vague goals into concrete action plans. Walk through the SMART framework step by step and create a plan you can actually follow.',skill:'Goal Setting',cat:'tools'},
  {id:'financial-planner',title:'Financial Planner',desc:'Learn personal finance by doing. Budget with the 50/30/20 rule, calculate compound interest, and compare debt payoff strategies.',skill:'Financial Literacy',cat:'tools'},
  {id:'study-toolkit',title:'Study Skills Toolkit',desc:'Study smarter, not harder. Get personalized study plans using spaced repetition, active recall, and Pomodoro technique — all backed by neuroscience.',skill:'Learning Science',cat:'tools'},
  {id:'ai-literacy',title:'AI Literacy Guide',desc:'Understand what AI can and cannot do. Learn to evaluate AI output, spot common pitfalls, and use AI tools responsibly in your work.',skill:'AI Literacy',cat:'guides'},
  {id:'communication-guide',title:'Communication Guide',desc:'Master the frameworks for difficult conversations, active listening, conflict resolution, and professional email writing.',skill:'Communication',cat:'guides'},
  {id:'financial-basics',title:'Financial Basics Guide',desc:'A complete beginner guide to budgeting, saving, investing, and debt management. Everything you need to take control of your money.',skill:'Financial Literacy',cat:'guides'}
];

// Generate skills index page
const indexHtml = `<!DOCTYPE html>
<html lang="en" data-theme="light">
${pageHead('α tools - Build Real Abilities | KwordSEO','Interactive tools that teach you skills, not just do tasks for you. Learn prompt engineering, critical thinking, communication, and more.',BASE+'/skills/')}
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDTPKT4T" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>
${nav}
${headerActions}
</div>
<div class="nav-backdrop" id="navBackdrop" onclick="App.closeMenu()"></div>
</header>
<main id="main-content">
<div class="container">
<div class="tool-header">
<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <span>α tools</span></div>
<h1 style="margin:0;font-size:1.8rem;font-weight:800;letter-spacing:-0.02em">Build Real α tools</h1>
<p style="color:var(--text-2);margin-top:8px;font-size:0.95rem">Interactive tools that teach you abilities you'll use forever. Not just tasks — understanding.</p>
</div>
<div style="display:flex;gap:8px;margin:24px 0;flex-wrap:wrap">
<button type="button" class="btn btn-primary btn-sm skill-filter active" data-filter="all">All</button>
<button type="button" class="btn btn-secondary btn-sm skill-filter" data-filter="tools">Skill Tools</button>
<button type="button" class="btn btn-secondary btn-sm skill-filter" data-filter="guides">Guides</button>
</div>
<div class="tool-grid skills-grid">
${skills.map(s => `
<a href="/skills/${s.id}.html" class="tool-card" data-cat="${s.cat}">
<div class="skill-badge" style="display:inline-block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;padding:3px 8px;border-radius:4px;background:var(--accent-light);color:var(--accent);margin-bottom:8px">${esc(s.skill)}</div>
<h3>${esc(s.title)}</h3>
<p>${esc(s.desc)}</p>
<span class="card-arrow" aria-hidden="true">&rarr;</span>
</a>`).join('\n')}
</div>
</div>
</main>
${footer}
<script>
document.querySelectorAll('.skill-filter').forEach(function(btn){
  btn.addEventListener('click',function(){
    document.querySelectorAll('.skill-filter').forEach(function(b){b.classList.remove('active');b.classList.replace('btn-primary','btn-secondary');});
    this.classList.add('active');this.classList.replace('btn-secondary','btn-primary');
    var f=this.getAttribute('data-filter');
    document.querySelectorAll('.tool-grid .tool-card').forEach(function(c){
      c.style.display=(f==='all'||c.getAttribute('data-cat')===f)?'':'none';
    });
  });
});
</script>
</body></html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml, 'utf8');
console.log('Created: public/skills/index.html');

// Generate reference pages
const references = [
  {
    id: 'ai-literacy',
    title: 'AI Literacy Guide - What Everyone Should Know About AI',
    desc: 'A practical guide to understanding AI: what it can do, what it cannot, how to evaluate AI output, and how to use AI tools responsibly.',
    sections: [
      {h:'What Is AI?',content:'Artificial Intelligence (AI) refers to computer systems that can perform tasks that typically require human intelligence. This includes understanding language, recognizing patterns, making decisions, and generating content. The AI tools you interact with daily — ChatGPT, Claude, Gemini, Copilot — are all based on Large Language Models (LLMs).'},
      {h:'What AI Can Do',content:'AI excels at: generating text, code, and creative content; summarizing long documents; translating between languages; analyzing data and finding patterns; answering questions on wide-ranging topics; brainstorming ideas and alternatives; automating repetitive writing tasks.'},
      {h:'What AI Cannot Do',content:'AI struggles with: understanding context deeply (it predicts likely words, not meaning); factual accuracy (it can "hallucinate" false information); reasoning about novel situations; understanding current events (training data has a cutoff); emotional intelligence and nuance; domain expertise without specific training.'},
      {h:'How to Evaluate AI Output',content:'Always verify AI-generated facts with authoritative sources. Check citations — AI often fabricates references. Look for logical consistency. Test claims against your own knowledge. Use multiple AI models to cross-check important outputs. Ask AI to show its reasoning, not just conclusions.'},
      {h:'Common AI Pitfalls',content:'Hallucination: AI confidently states false information. Bias: AI reflects biases in training data. Over-reliance: Using AI without understanding the output. Privacy: Do not input sensitive personal or business data into AI tools. Plagiarism: AI may reproduce copyrighted text from training data.'},
      {h:'AI by Profession',content:'Writers: Use AI for drafts and brainstorming, not final copy. Developers: Use AI for code suggestions, always review. Marketers: Use AI for content ideas, verify claims. Students: Use AI for learning support, not academic dishonesty. Business: Use AI for analysis, make final decisions yourself.'},
      {h:'The Bottom Line',content:'AI is a powerful tool, not a replacement for human judgment. The people who benefit most from AI are those who understand its strengths and limitations. Use AI to augment your thinking, not replace it. Always keep a human in the loop for important decisions.'}
    ]
  },
  {
    id: 'communication-guide',
    title: 'Communication Guide - Frameworks for Every Conversation',
    desc: 'Master the essential communication frameworks: active listening, difficult conversations, conflict resolution, email writing, and professional communication.',
    sections: [
      {h:'Active Listening Framework',content:'Step 1: Pay full attention (put away devices). Step 2: Show you are listening (nod, maintain eye contact). Step 3: Paraphrase what you heard ("So what you are saying is..."). Step 4: Ask clarifying questions. Step 5: Respond thoughtfully, not reactively. The goal is to understand, not to reply.'},
      {h:'Difficult Conversations: The SBI Model',content:'Situation: "During yesterday\'s meeting..." Behavior: "...you interrupted me three times while I was presenting..." Impact: "...which made it hard for me to finish my point and I felt frustrated." This framework removes blame and focuses on observable facts.'},
      {h:'Conflict Resolution: The DESC Method',content:'Describe the situation objectively. Express how it affects you. Specify what you would like to happen. Consequences: explain the positive outcome of change. Example: "When deadlines are missed (D), the team has to rush (E). Can we set earlier internal deadlines? (S) This would reduce stress for everyone (C)."' },
      {h:'Email Writing Formula',content:'Subject line: specific and actionable. Opening: purpose of email in one sentence. Body: context + request + deadline. Closing: next steps + appreciation. Keep it under 5 sentences if possible. Use bullet points for multiple items.'},
      {h:'Saying No Professionally',content:'Acknowledge the request: "I appreciate you thinking of me." Explain your constraint: "My current workload won\'t allow me to give this the attention it deserves." Offer an alternative: "Could we revisit this next month?" or "Have you tried [alternative]?" Be direct but kind.'},
      {h:'Public Speaking Basics',content:'Open with a hook (question, story, surprising fact). Structure: tell them what you will tell them, tell them, then tell them what you told them. Make eye contact with different sections of the audience. Pause for emphasis. End with a clear call to action.'},
      {h:'The Key Principle',content:'Good communication is not about sounding impressive. It is about being understood. Every framework above serves one goal: making sure your message lands the way you intend. Practice one framework at a time until it becomes natural.'}
    ]
  },
  {
    id: 'financial-basics',
    title: 'Financial Basics Guide - Take Control of Your Money',
    desc: 'A complete beginner guide to budgeting, saving, investing, and debt management. Practical frameworks you can start using today.',
    sections: [
      {h:'The 50/30/20 Budget Rule',content:'Allocate 50% of after-tax income to needs (rent, food, utilities, insurance). Allocate 30% to wants (dining out, entertainment, hobbies). Allocate 20% to savings and debt repayment. This is the simplest budgeting framework that actually works. Adjust ratios based on your situation.'},
      {h:'Emergency Fund',content:'Goal: 3-6 months of essential expenses in a high-yield savings account. Start with a $1,000 mini emergency fund, then build to 3 months, then 6 months. This fund prevents one unexpected expense from derailing your entire financial plan.'},
      {h:'Understanding Compound Interest',content:'Compound interest is interest earned on interest. If you invest $500/month at 7% annual return, in 30 years you will have approximately $566,000 (you contributed $180,000, compound interest added $386,000). Start early — time is the most powerful factor in building wealth.'},
      {h:'Debt Payoff: Snowball vs Avalanche',content:'Snowball: pay off smallest balance first, then roll that payment to the next smallest. Builds momentum through quick wins. Avalanche: pay off highest interest rate first. Saves the most money mathematically. Choose the method you will actually stick with. Both work.'},
      {h:'Investing Basics',content:'Start with index funds (low cost, diversified, historically 7-10% annual returns). Contribute to retirement accounts (401k, IRA) before taxable accounts. Never invest money you need within 5 years. Diversify across stocks, bonds, and international. Ignore market timing — invest consistently.'},
      {h:'Credit Score Fundamentals',content:'Payment history (35%): pay every bill on time. Credit utilization (30%): keep balances below 30% of limits. Length of history (15%): keep old accounts open. Credit mix (10%): have different types of credit. New inquiries (10%): don\'t apply for credit unnecessarily. Check your free credit report annually.'},
      {h:'The Golden Rule',content:'Spend less than you earn. Invest the difference. Repeat for decades. Every financial concept above serves this one principle. You don\'t need to be perfect — you need to be consistent. Start where you are, use what you have, do what you can.'}
    ]
  }
];

references.forEach(function(ref) {
  const url = BASE + '/skills/' + ref.id + '.html';
  const refHtml = `<!DOCTYPE html>
<html lang="en" data-theme="light">
${pageHead(ref.title, ref.desc, url)}
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDTPKT4T" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>
${nav}
${headerActions}
</div>
<div class="nav-backdrop" id="navBackdrop" onclick="App.closeMenu()"></div>
</header>
<main id="main-content">
<div class="container" style="max-width:780px;margin:0 auto">
<div class="tool-header">
<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/skills/">α tools</a> <span>/</span> <span>${esc(ref.title.split(' - ')[0])}</span></div>
<h1 style="margin:0;font-size:1.8rem;font-weight:800;letter-spacing:-0.02em">${esc(ref.title.split(' - ')[0])}</h1>
<p style="color:var(--text-2);margin-top:8px;font-size:0.95rem">${esc(ref.desc)}</p>
</div>
<article style="margin-top:32px">
${ref.sections.map(function(s,i){
  return '<section style="margin-bottom:32px">' +
    '<h2 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;color:var(--text);padding-bottom:8px;border-bottom:1px solid var(--border)">' + (i+1) + '. ' + esc(s.h) + '</h2>' +
    '<p style="color:var(--text-2);line-height:1.75;font-size:0.95rem">' + esc(s.content) + '</p>' +
    '</section>';
}).join('\n')}
</article>
<div style="margin-top:40px;padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius)">
<h3 style="font-size:1rem;font-weight:700;margin-bottom:12px">Continue Learning</h3>
<div style="display:flex;flex-wrap:wrap;gap:8px">
<a href="/skills/ai-prompt-builder.html" style="display:inline-block;padding:8px 16px;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:0.85rem;font-weight:500;text-decoration:none;transition:border-color .15s">AI Prompt Builder</a>
<a href="/skills/decision-matrix.html" style="display:inline-block;padding:8px 16px;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:0.85rem;font-weight:500;text-decoration:none;transition:border-color .15s">Decision Matrix</a>
<a href="/skills/tone-analyzer.html" style="display:inline-block;padding:8px 16px;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:0.85rem;font-weight:500;text-decoration:none;transition:border-color .15s">Tone Analyzer</a>
<a href="/skills/" style="display:inline-block;padding:8px 16px;background:var(--accent);border:1px solid var(--accent);border-radius:6px;color:#fff;font-size:0.85rem;font-weight:500;text-decoration:none;transition:opacity .15s">View All α tools</a>
</div>
</div>
</div>
</main>
${footer}
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${esc(ref.title.split(' - ')[0])}","description":"${esc(ref.desc)}","url":"${url}","publisher":{"@type":"Organization","name":"KwordSEO","url":"${BASE}"}}</script>
</body></html>`;

  fs.writeFileSync(path.join(outDir, ref.id + '.html'), refHtml, 'utf8');
  console.log('Created: public/skills/' + ref.id + '.html');
});

console.log('\nα tools build complete! Index + ' + references.length + ' reference pages generated.');
