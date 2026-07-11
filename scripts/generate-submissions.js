const fs = require('fs');
const path = require('path');

const baseUrl = 'https://azhai-six.vercel.app';

const submissions = {
  productHunt: {
    name: 'KwordSEO',
    tagline: '43 free browser-based tools for text, SEO & dev utilities',
    description: `KwordSEO is a comprehensive suite of 43 browser-based tools for text processing, SEO optimization, and developer utilities.\n\n**Key Features:**\n- All tools run in your browser — zero data leaves your device\n- No sign-up, no tracking, completely free\n- Dark mode + mobile-first responsive design\n- 43 tools across 6 categories: Text Analysis, Text Transform, SEO, Developer, Encoding, and Smart Lab\n\n**Popular Tools:**\n- Word Counter — Count words, characters, sentences, paragraphs\n- Keyword Density Checker — Analyze keyword usage for SEO\n- Meta Tag Generator — Create complete HTML meta tags\n- JSON Formatter — Beautify and validate JSON\n- Markdown Editor — Write Markdown with live preview\n- Smart Text Lab — All-in-one text workspace\n\nBuilt with vanilla HTML/CSS/JS. No frameworks. No dependencies. No data collection.`,
    topics: ['Productivity', 'Developer Tools', 'SEO Tools'],
    website: baseUrl,
    icon: baseUrl + '/og-image.png'
  },
  
  alternativeTo: {
    name: 'KwordSEO',
    tagline: 'Free browser-based alternative to SmallSEOTools and TextMechanic',
    description: 'A free suite of 43 browser-based tools for text processing, SEO optimization, and developer utilities. All tools run client-side with zero data collection. Includes word counters, keyword density checkers, meta tag generators, JSON formatters, and markdown editors.',
    alternatives: ['SmallSEOTools', 'TextMechanic', 'ConvertCase', 'SEOBook'],
    website: baseUrl,
    tags: ['free', 'seo', 'text-tools', 'developer', 'privacy']
  },

  theresanaiforthat: {
    name: 'KwordSEO',
    tagline: '43 free browser-based tools for text processing, SEO & dev utilities',
    description: 'Comprehensive suite of 43 browser-based tools for text analysis, SEO optimization, and developer utilities. All processing happens in your browser — no data leaves your device. Includes word counters, keyword density checkers, meta tag generators, JSON/XML formatters, and markdown editors.',
    url: baseUrl,
    category: 'Productivity',
    pricing: 'Free',
    features: ['Browser-based', 'No sign-up', 'Dark mode', 'Mobile-friendly', '43 tools']
  },

  futurepedia: {
    name: 'KwordSEO',
    description: 'A free suite of 43 browser-based tools for text processing, SEO optimization, and developer utilities. All tools run in your browser with zero data collection. Includes word counters, keyword density checkers, meta tag generators, JSON formatters, and markdown editors.',
    url: baseUrl,
    category: 'Productivity',
    pricingModel: 'Free'
  },

  saashub: {
    name: 'KwordSEO',
    description: '43 free browser-based tools for text processing, SEO, and developer utilities. No sign-up. No tracking. All processing happens in your browser.',
    url: baseUrl,
    category: 'Developer Tools'
  }
};

// Generate Product Hunt launch copy
const productHuntLaunch = `# Product Hunt Launch Copy

## Tagline
43 free browser-based tools for text, SEO & dev utilities

## Description
KwordSEO is a comprehensive suite of 43 browser-based tools for text processing, SEO optimization, and developer utilities.

**Why I built this:**
I was tired of SEO tools that require sign-ups, collect your data, and limit free usage. So I built a complete suite where everything runs in your browser — no server, no data collection, no BS.

**What's included (43 tools):**

📊 **Text Analysis (6):** Word counter, character counter, sentence counter, paragraph counter, word frequency, text statistics

🔄 **Text Transform (12):** Case converter, remove spaces, find & replace, line sorter, alpha sorter, text reverser, duplicate remover, lorem generator, slug generator, and more

🔍 **SEO (14):** Keyword density, keyword extractor, meta tag generator, meta description generator, OG tag generator, canonical tag generator, robots.txt, sitemap generator, hreflang, schema generators (FAQ, Article, Breadcrumb)

💻 **Developer (7):** JSON formatter/validator, XML formatter/validator, HTML previewer, regex tester, markdown editor/preview

🔐 **Encoding (7):** URL encoder/decoder, HTML encoder/decoder, Base64 encoder/decoder, hash generator

⚡ **Smart Lab:** All-in-one text workspace with live stats, quick actions, and history

**Key differentiator:** Every tool runs 100% in your browser. No data ever leaves your device. Zero tracking. Zero sign-ups. Completely free.

**Built with:** Vanilla HTML, CSS, and JavaScript. No frameworks. No dependencies.

Try it: ${baseUrl}`;

fs.writeFileSync(path.join(__dirname, '..', 'seo-system', 'product-hunt-launch.md'), productHuntLaunch);

// Generate Reddit post
const redditPost = `# Reddit Post (r/SideProject or r/webdev)

**Title:** I built 43 free browser-based SEO/text tools — all processing happens in your browser

**Body:**

Hey everyone,

I've been building free browser-based tools for the past few months and wanted to share.

**What it is:** 43 tools for text processing, SEO, and developer utilities — all running entirely in your browser.

**Why it's different:**
- Zero data collection (everything runs client-side)
- No sign-up required
- No usage limits
- Dark mode + mobile responsive
- Completely free

**Tools include:**
- Word/character/sentence counters
- Keyword density checker
- Meta tag generators
- JSON/XML formatters
- Markdown editor with live preview
- Base64/URL/HTML encoders
- And 33 more...

**Tech stack:** Vanilla HTML/CSS/JS, no frameworks, no dependencies.

Would love feedback from this community. What tools would you like to see added?

Live: ${baseUrl}`;

fs.writeFileSync(path.join(__dirname, '..', 'seo-system', 'reddit-post.md'), redditPost);

// Generate LinkedIn post
const linkedinPost = `# LinkedIn Post

I just launched KwordSEO — a suite of 43 browser-based tools for text processing, SEO, and developer utilities.

What makes it different:

✓ All tools run in your browser (no server, no data collection)
✓ Zero sign-up required
✓ Completely free
✓ Dark mode + mobile-first design
✓ 43 tools across 6 categories

Whether you're a content creator needing word counts and keyword density checks, or a developer needing JSON/XML formatters — it's all there.

The tech stack? Pure HTML, CSS, and JavaScript. No frameworks. No dependencies. No tracking scripts.

In an era of data collection and paywalls, I wanted to build something that respects user privacy while being genuinely useful.

Try it: ${baseUrl}

#SEO #FreeTools #WebDev #ContentCreation #PrivacyFirst #IndieHacker`;

fs.writeFileSync(path.join(__dirname, '..', 'seo-system', 'linkedin-post.md'), linkedinPost);

// Generate HARO queries to monitor
const haroQueries = `# HARO/Connectively Queries to Monitor

## Keywords to Set Up Alerts For:

### Tier 1 (High Priority)
- "SEO tools" + "expert"
- "text tools" + "free"
- "browser-based tools"
- "content optimization"
- "keyword research"
- "meta tags"
- "technical SEO"

### Tier 2 (Medium Priority)
- "AI content detection"
- "AI writing tools"
- "Google algorithm update"
- "search engine optimization"
- "content marketing tools"
- "developer tools"
- "JSON formatting"
- "markdown editor"

### Tier 3 (Opportunistic)
- "free software"
- "privacy-focused tools"
- "browser extensions"
- "web development tools"
- "content creation"

## Response Strategy:

1. **Response time:** Within 2 hours of query (journalists have tight deadlines)
2. **Keep it short:** 3-4 paragraphs max
3. **Include credentials:** "Creator of 43 free browser-based SEO tools"
4. **Offer specific value:** Don't just say "I can help" — offer specific data/insights
5. **Follow up:** If no response in 48 hours, send one polite follow-up

## Sample Response Template:

Hi [Name],

For your article about [TOPIC], here's my expert take:

[2-3 paragraphs with specific, actionable insights]

I'm the creator of KwordSEO (azhai-six.vercel.app), a suite of 43 browser-based tools used by thousands of content creators. The data from our keyword density checker shows that [RELEVANT_DATA_POINT].

Happy to provide additional quotes or data. What's your deadline?

Best,
[Your Name]`;

fs.writeFileSync(path.join(__dirname, '..', 'seo-system', 'haro-strategy.md'), haroQueries);

console.log('Submission files created:');
console.log('  - product-hunt-launch.md');
console.log('  - reddit-post.md');
console.log('  - linkedin-post.md');
console.log('  - haro-strategy.md');
