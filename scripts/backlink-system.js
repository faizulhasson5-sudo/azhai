const fs = require('fs');
const path = require('path');

const baseUrl = 'https://azhai-six.vercel.app';

const productInfo = {
  name: 'Free AI Text Tools',
  tagline: '43 free browser-based tools for text processing, SEO, and developer utilities',
  description: `Free AI Text Tools is a comprehensive suite of 43 browser-based tools for text processing, SEO optimization, and developer utilities. All tools run entirely in your browser — no data leaves your device. Includes word counters, keyword density checkers, meta tag generators, JSON/XML formatters, markdown editors, and 5 dedicated SEO schema generators. Built with a clean 2026 design, dark mode, and mobile-first responsive layout.`,
  shortDescription: '43 free browser-based tools for text processing, SEO, and developer utilities. No sign-up, no data collection.',
  website: baseUrl,
  category: 'AI Tools, SEO Tools, Developer Tools',
  pricing: 'Free',
  logo: baseUrl + '/og-image.png',
  screenshot: baseUrl + '/og-image.png'
};

const directories = [
  // Tier 1: High DR (80+) - DO THESE FIRST
  {
    tier: 1,
    name: 'Product Hunt',
    url: 'https://www.producthunt.com/posts/new',
    dr: 91,
    linkType: 'nofollow',
    cost: 'Free',
    notes: 'Schedule launch for Tuesday-Thursday. Prepare supporters for upvotes.',
    status: 'pending'
  },
  {
    tier: 1,
    name: 'AlternativeTo',
    url: 'https://alternativeto.net/contribute/new-product/',
    dr: 82,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'Tag as alternative to: TextMechanic, ConvertCase, SmallSEOTools',
    status: 'pending'
  },
  {
    tier: 1,
    name: 'Hacker News (Show HN)',
    url: 'https://news.ycombinator.com/submit',
    dr: 91,
    linkType: 'nofollow',
    cost: 'Free',
    notes: 'Post as "Show HN: Free AI Text Tools — 43 browser-based text/SEO tools"',
    status: 'pending'
  },

  // Tier 2: AI Tool Directories
  {
    tier: 2,
    name: "There's An AI For That",
    url: 'https://theresanaiforthat.com/submit/',
    dr: 72,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'Major AI tool directory. Cited by ChatGPT/Claude.',
    status: 'pending'
  },
  {
    tier: 2,
    name: 'Futurepedia',
    url: 'https://www.futurepedia.io/submit-tool',
    dr: 66,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'AI tools directory with strong traffic.',
    status: 'pending'
  },
  {
    tier: 2,
    name: 'TopAI.tools',
    url: 'https://topai.tools/submit',
    dr: 58,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'AI tools listing with dofollow backlink.',
    status: 'pending'
  },
  {
    tier: 2,
    name: 'ToolPilot.ai',
    url: 'https://toolpilot.ai/submit',
    dr: 48,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'AI tools directory.',
    status: 'pending'
  },
  {
    tier: 2,
    name: 'AI Tool Directory',
    url: 'https://aitoolsdirectory.com/submit',
    dr: 45,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'Simple submission, quick approval.',
    status: 'pending'
  },

  // Tier 3: SaaS/Startup Directories
  {
    tier: 3,
    name: 'SaaSHub',
    url: 'https://www.saashub.com/submit',
    dr: 71,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'Alternative/comparison marketplace. Dofollow backlink.',
    status: 'pending'
  },
  {
    tier: 3,
    name: 'BetaList',
    url: 'https://betalist.com/submit',
    dr: 68,
    linkType: 'dofollow',
    cost: 'Free (waitlist)',
    notes: 'Pre-launch directory. May have waitlist.',
    status: 'pending'
  },
  {
    tier: 3,
    name: 'Indie Hackers',
    url: 'https://www.indiehackers.com/post/new',
    dr: 72,
    linkType: 'nofollow',
    cost: 'Free',
    notes: 'Post as product launch. Engage with community.',
    status: 'pending'
  },
  {
    tier: 3,
    name: 'StartupBase',
    url: 'https://startupbase.io/submit',
    dr: 46,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'Simple startup directory.',
    status: 'pending'
  },
  {
    tier: 3,
    name: 'Launching Next',
    url: 'https://www.launchingnext.com/submit',
    dr: 52,
    linkType: 'dofollow',
    cost: '$49',
    notes: 'Paid listing but high quality.',
    status: 'pending'
  },

  // Tier 4: Niche Tool Directories
  {
    tier: 4,
    name: 'SmallSEOTools Alternative',
    url: 'https://alternativeto.net/software/smallseotools/',
    dr: 82,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'List as alternative to SmallSEOTools.',
    status: 'pending'
  },
  {
    tier: 4,
    name: 'TextMechanic Alternative',
    url: 'https://alternativeto.net/software/textmechanic/',
    dr: 82,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'List as alternative to TextMechanic.',
    status: 'pending'
  },
  {
    tier: 4,
    name: 'ConvertCase Alternative',
    url: 'https://alternativeto.net/software/convertcase/',
    dr: 82,
    linkType: 'dofollow',
    cost: 'Free',
    notes: 'List as alternative to ConvertCase.',
    status: 'pending'
  }
];

const outreachTemplates = {
  haro: {
    subject: 'SEO Tools Expert — Free Browser-Based Suite',
    body: `Hi [Name],

I'm the creator of Free AI Text Tools (azhai-six.vercel.app), a suite of 43 browser-based tools for text processing and SEO.

For your article about [TOPIC], I can provide:

• Expert insights on [SPECIFIC_ANGLE]
• Data from our tool usage (word counters, keyword density checkers, meta generators used by thousands)
• A unique perspective on browser-based vs server-side tool architecture

All tools run client-side with zero data collection — a privacy-first approach that's increasingly relevant in 2026.

Happy to provide a quick quote or detailed response. What's your deadline?

Best,
[Your Name]
Creator, Free AI Text Tools`
  },
  guestPost: {
    subject: 'Guest Post: [TITLE] for [SITE]',
    body: `Hi [Editor Name],

I run Free AI Text Tools (azhai-six.vercel.app), a suite of 43 browser-based text and SEO tools used by content creators and developers.

I'd like to contribute a guest post to [PUBLICATION]:

**Proposed Title:** [COMPELLING_TITLE]

**Outline:**
1. [Section 1]
2. [Section 2]
3. [Section 3]
4. [Section 4]

**Why this works for your audience:**
[2-3 sentences about why their readers would care]

**My credentials:**
- Creator of 43 free browser-based SEO tools
- Published articles on AI content detection, query fan-out, and E-E-A-T
- Deep expertise in technical SEO and content optimization

Word count: [1000-1500] words, original content, includes custom diagrams.

Interested?

Best,
[Your Name]`
  },
  directorySubmission: {
    name: productInfo.name,
    tagline: productInfo.tagline,
    description: productInfo.description,
    website: productInfo.website,
    category: productInfo.category,
    pricing: productInfo.pricing
  }
};

const socialSnippets = {
  twitter: [
    "Just built 43 free browser-based SEO tools — word counters, keyword density checkers, meta generators, JSON formatters, and more.\n\nAll run in your browser. No sign-up. No data collection.\n\nTry it: azhai-six.vercel.app",
    "New blog: Query Fan-Out is changing Google Search in 2026 (+2,550% YoY growth)\n\nLearn how Google breaks down searches and how to optimize your content for it.\n\nRead: azhai-six.vercel.app/blog/query-fanout-seo-2026.html",
    "Google now detects AI content with 94% accuracy.\n\nHere's how their detection works and how to create compliant content that ranks:\n\nazhai-six.vercel.app/blog/ai-content-detection-2026.html",
    "Free alternative to SmallSEOTools, TextMechanic, and ConvertCase — all running in your browser with zero data collection.\n\n43 tools. Zero cost. Zero tracking.\n\nazhai-six.vercel.app"
  ],
  linkedin: [
    "I just launched Free AI Text Tools — a suite of 43 browser-based tools for text processing, SEO, and developer utilities.\n\nWhat makes it different:\n✓ All tools run in your browser (no server, no data collection)\n✓ Zero sign-up required\n✓ Completely free\n✓ Dark mode + mobile-first design\n\nWhether you're a content creator needing word counts and keyword density checks, or a developer needing JSON/XML formatters — it's all there.\n\nTry it: azhai-six.vercel.app\n\n#SEO #FreeTools #WebDev #ContentCreation"
  ],
  reddit: [
    "I built a free alternative to SmallSEOTools with 43 browser-based tools. All processing happens in your browser — no data leaves your device. Would love feedback from this community.",
    "Created a free keyword density checker and meta tag generator that runs entirely in your browser. No sign-up, no tracking. Looking for beta testers."
  ]
};

// Save all data
const outDir = path.join(__dirname, '..', 'seo-system');
fs.mkdirSync(outDir, {recursive: true});

fs.writeFileSync(path.join(outDir, 'backlink-tracker.json'), JSON.stringify({
  product: productInfo,
  directories,
  outreachTemplates,
  socialSnippets,
  lastUpdated: new Date().toISOString()
}, null, 2));

// Generate submission checklist
let checklist = '# Backlink Submission Checklist\n\n';
checklist += `## Product: ${productInfo.name}\n`;
checklist += `## Website: ${productInfo.website}\n\n`;

[1,2,3,4].forEach(tier => {
  const tierDirs = directories.filter(d => d.tier === tier);
  if (tierDirs.length === 0) return;
  checklist += `## Tier ${tier}\n\n`;
  tierDirs.forEach(d => {
    checklist += `- [ ] **${d.name}** (DR ${d.dr}, ${d.linkType}) — ${d.url}\n`;
    checklist += `  - Notes: ${d.notes}\n`;
    checklist += `  - Status: ${d.status}\n\n`;
  });
});

fs.writeFileSync(path.join(outDir, 'submission-checklist.md'), checklist);

// Generate social sharing file
let social = '# Social Sharing Snippets\n\n';
social += '## Twitter/X\n\n';
socialSnippets.twitter.forEach((s,i) => {
  social += `### Option ${i+1}\n${s}\n\n`;
});
social += '## LinkedIn\n\n';
socialSnippets.linkedin.forEach(s => {
  social += `${s}\n\n`;
});
social += '## Reddit\n\n';
socialSnippets.reddit.forEach((s,i) => {
  social += `### Option ${i+1}\n${s}\n\n`;
});

fs.writeFileSync(path.join(outDir, 'social-snippets.md'), social);

// Generate outreach templates
let outreach = '# Outreach Templates\n\n';
outreach += '## HARO Response\n\n';
outreach += outreachTemplates.haro.body + '\n\n';
outreach += '---\n\n';
outreach += '## Guest Post Pitch\n\n';
outreach += outreachTemplates.guestPost.body + '\n\n';

fs.writeFileSync(path.join(outDir, 'outreach-templates.md'), outreach);

console.log('Backlink system created in: seo-system/');
console.log('Files:');
console.log('  - backlink-tracker.json (all data + status tracking)');
console.log('  - submission-checklist.md (printable checklist)');
console.log('  - social-snippets.md (ready-to-post content)');
console.log('  - outreach-templates.md (HARO + guest post templates)');
console.log('\nDirectories to submit: ' + directories.length);
console.log('Tier 1 (High DR): ' + directories.filter(d=>d.tier===1).length);
console.log('Tier 2 (AI Tools): ' + directories.filter(d=>d.tier===2).length);
console.log('Tier 3 (SaaS): ' + directories.filter(d=>d.tier===3).length);
console.log('Tier 4 (Niche): ' + directories.filter(d=>d.tier===4).length);
