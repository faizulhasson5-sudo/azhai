const fs = require('fs');
const path = require('path');

const BASE = 'https://azhai-six.vercel.app';
const outDir = path.join(__dirname, 'public', 'glossary');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, 'category'), { recursive: true });

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

const categories = [
  {id:'seo-fundamentals',name:'SEO Fundamentals',icon:'🎯',desc:'Core SEO concepts every marketer must know'},
  {id:'technical-seo',name:'Technical SEO',icon:'⚙️',desc:'Server-side and crawlability concepts'},
  {id:'on-page-seo',name:'On-Page SEO',icon:'📝',desc:'Content and HTML optimization techniques'},
  {id:'off-page-seo',name:'Off-Page SEO',icon:'🔗',desc:'External ranking factors and link building'},
  {id:'keywords',name:'Keywords',icon:'🔑',desc:'Keyword research and targeting strategies'},
  {id:'content-ai',name:'Content & AI',icon:'🤖',desc:'Content quality, AI search, and E-E-A-T'},
  {id:'analytics',name:'Analytics & Metrics',icon:'📊',desc:'Measuring and tracking SEO performance'},
  {id:'tools-technology',name:'Tools & Technology',icon:'🛠️',desc:'SEO tools, schemas, and web technologies'}
];

const terms = [
  // SEO Fundamentals
  {slug:'what-is-seo',term:'SEO (Search Engine Optimization)',cat:'seo-fundamentals',
   def:'SEO is the practice of optimizing websites to rank higher in search engine results pages (SERPs). It involves improving technical infrastructure, content quality, and backlink profiles to increase organic (non-paid) traffic from search engines like Google, Bing, and DuckDuckGo.',
   example:'A blog post targeting "best free text tools" that appears on page 1 of Google results is ranking well due to effective SEO — proper keyword usage, fast loading speed, quality backlinks, and comprehensive content.',
   related:['serp','organic-traffic','keyword-research','on-page-seo','technical-seo'],
   tools:['meta-gen','keyword-density','robots-txt','sitemap-gen']},
  {slug:'serp',term:'SERP (Search Engine Results Page)',cat:'seo-fundamentals',
   def:'A SERP is the page displayed by a search engine in response to a user query. Modern SERPs include organic results, paid ads, featured snippets, AI Overviews, knowledge panels, image carousels, and "People Also Ask" sections.',
   example:'When you search "what is keyword density" on Google, the results page showing organic links, AI Overview summary, People Also Ask box, and related searches is the SERP.',
   related:['seo','featured-snippet','ai-overview','meta-description','rank-position'],
   tools:['meta-gen','meta-desc-gen']},
  {slug:'organic-traffic',term:'Organic Traffic',cat:'seo-fundamentals',
   def:'Organic traffic refers to visitors who arrive at your website through unpaid search engine results, as opposed to paid advertisements. It is the most valuable traffic source for most websites because it is free, sustainable, and tends to convert well.',
   example:'If someone searches "free word counter" and clicks your listing in the organic results (not the ads), that visit counts as organic traffic.',
   related:['seo','serp','ctr','bounce-rate','rank-position'],
   tools:['keyword-density','meta-gen']},
  {slug:'crawlability',term:'Crawlability',cat:'seo-fundamentals',
   def:'Crawlability refers to how easily search engine bots (like Googlebot) can access and navigate your website. Good crawlability means search engines can discover all your important pages, read your content, and add pages to their index.',
   example:'A website with a clean URL structure, proper internal linking, and a sitemap.xml file has good crawlability. A site with broken links, orphan pages, and no sitemap has poor crawlability.',
   related:['sitemap','robots-txt','internal-linking','indexing','crawl-budget'],
   tools:['sitemap-gen','robots-txt']},
  {slug:'indexing',term:'Indexing',cat:'seo-fundamentals',
   def:'Indexing is the process by which search engines store and organize web content in their database. When Google indexes a page, it means the page has been crawled, processed, and is eligible to appear in search results.',
   example:'After publishing a new blog post, Google may take days or weeks to crawl and index it. Using the Google Search Console URL Inspection tool can request faster indexing.',
   related:['crawlability','sitemap','robots-txt','crawl-budget','serp'],
   tools:['sitemap-gen','robots-txt']},
  {slug:'rank-position',term:'Rank Position',cat:'seo-fundamentals',
   def:'Rank position refers to where your page appears in search engine results for a specific query. Position 1 is the top organic result. Studies show position 1 gets approximately 27-32% of all clicks, while page 2 results get less than 1%.',
   example:'If your "word counter" tool ranks at position 3 for "free word counter tool", that is your rank position for that keyword.',
   related:['serp','ctr','organic-traffic','seo','serp-features'],
   tools:['meta-gen','keyword-density']},
  {slug:'search-intent',term:'Search Intent',cat:'seo-fundamentals',
   def:'Search intent is the goal behind a user\'s search query. Google categorizes intent into four types: Informational (learning), Navigational (finding a specific site), Commercial (comparing options), and Transactional (taking action).',
   example:'Someone searching "how to check keyword density" has informational intent. Someone searching "word counter tool" has commercial/transactional intent. Matching your content to the correct intent is critical for ranking.',
   related:['seo','serp','keyword-research','content-strategy','user-experience'],
   tools:['keyword-density','keyword-extract']},
  {slug:'bounce-rate',term:'Bounce Rate',cat:'analytics',
   def:'Bounce rate is the percentage of visitors who leave your website after viewing only one page. A high bounce rate (above 70%) can indicate poor content quality, slow loading, or mismatched search intent. However, some pages (like blog posts) naturally have higher bounce rates.',
   example:'If 100 people visit your word counter page and 65 leave without clicking anything else, your bounce rate is 65%. Reducing it requires better internal linking, compelling content, and clear calls-to-action.',
   related:['organic-traffic','user-experience','ctr','dwell-time','page-speed'],
   tools:['word-counter','keyword-density']},
  {slug:'dwell-time',term:'Dwell Time',cat:'analytics',
   def:'Dwell time is the amount of time a visitor spends on your page before returning to the search results. Unlike time-on-page, dwell time specifically measures visits from search engines. Longer dwell time signals to Google that your content is valuable.',
   example:'If someone searches "best meta description examples", clicks your result, reads your article for 4 minutes, then goes back to Google, the dwell time is 4 minutes.',
   related:['bounce-rate','user-experience','content-quality','rank-position','serp'],
   tools:['word-counter','meta-desc-gen']},

  // Technical SEO
  {slug:'robots-txt',term:'Robots.txt',cat:'technical-seo',
   def:'Robots.txt is a text file placed in your website\'s root directory that tells search engine crawlers which pages to crawl and which to skip. It uses the Robots Exclusion Protocol to manage crawler access.',
   example:'A robots.txt file containing "User-agent: *\nDisallow: /admin/" tells all crawlers not to access pages under /admin/. Our free generator creates proper robots.txt files with crawl directives.',
   related:['crawlability','sitemap','crawl-budget','indexing','noindex'],
   tools:['robots-txt']},
  {slug:'sitemap',term:'XML Sitemap',cat:'technical-seo',
   def:'An XML sitemap is a file that lists all important pages on your website, helping search engines discover and crawl content efficiently. It includes URLs, last modification dates, change frequency, and priority signals.',
   example:'Your sitemap.xml should list every tool page, blog post, and static page. Google Search Console uses your sitemap to identify new content and schedule crawling. Our generator creates complete XML sitemaps.',
   related:['robots-txt','crawlability','indexing','google-search-console','crawl-budget'],
   tools:['sitemap-gen','robots-txt']},
  {slug:'canonical-url',term:'Canonical URL',cat:'technical-seo',
   def:'A canonical URL is the preferred version of a webpage when duplicate or similar content exists at multiple URLs. The canonical tag (<link rel="canonical">) tells search engines which URL to index and rank.',
   example:'If your page is accessible at both /tools/word-counter and /tools/word-counter.html, you should set a canonical URL to prevent duplicate content issues. Our generator creates proper canonical tags.',
   related:['duplicate-content','hreflang','meta-tags','technical-seo','indexing'],
   tools:['canonical-gen','hreflang-gen']},
  {slug:'hreflang',term:'Hreflang',cat:'technical-seo',
   def:'Hreflang is an HTML attribute that tells search engines which language and regional version of a page to show to users. It prevents duplicate content issues for multilingual or multi-regional websites.',
   example:'If you have /blog/ (English) and /es/blog/ (Spanish), hreflang tags tell Google to show the English version to US users and Spanish version to Spanish-speaking users.',
   related:['canonical-url','international-seo','meta-tags','technical-seo','localization'],
   tools:['hreflang-gen','canonical-gen']},
  {slug:'page-speed',term:'Page Speed',cat:'technical-seo',
   def:'Page speed measures how quickly your webpage loads and becomes interactive. Google uses page speed as a ranking factor through Core Web Vitals. Faster pages rank better, have lower bounce rates, and convert more visitors.',
   example:'A page that loads in 2 seconds has better page speed than one that takes 8 seconds. Tools like Google PageSpeed Insights measure your speed and suggest improvements.',
   related:['core-web-vitals','mobile-first','user-experience','bounce-rate','cdn'],
   tools:['html-previewer']},
  {slug:'mobile-first-indexing',term:'Mobile-First Indexing',cat:'technical-seo',
   def:'Mobile-first indexing means Google predominantly uses the mobile version of your content for indexing and ranking. Since 2023, Google crawls and indexes the mobile version of every page by default.',
   example:'If your desktop site has content that doesn\'t appear on mobile, Google won\'t index that content. Ensure your site is fully responsive and content is identical across devices.',
   related:['page-speed','core-web-vitals','responsive-design','technical-seo','user-experience'],
   tools:['html-previewer']},
  {slug:'core-web-vitals',term:'Core Web Vitals',cat:'technical-seo',
   def:'Core Web Vitals are three specific metrics Google uses to measure user experience: Largest Contentful Paint (LCP) for loading speed, Interaction to Next Paint (INP) for interactivity, and Cumulative Layout Shift (CLS) for visual stability.',
   example:'LCP under 2.5s, INP under 200ms, and CLS under 0.1 are considered "good" scores. Pages meeting all three thresholds may receive a ranking boost from Google.',
   related:['page-speed','user-experience','mobile-first-indexing','technical-seo','bounce-rate'],
   tools:['html-previewer']},
  {slug:'structured-data',term:'Structured Data',cat:'tools-technology',
   def:'Structured data is a standardized format for providing information about a page and classifying its content. It uses Schema.org vocabulary in JSON-LD format to help search engines understand your content and generate rich results.',
   example:'Adding FAQPage structured data to your page can trigger FAQ rich results in Google, showing expandable Q&A dropdowns directly in search results.',
   related:['schema-markup','rich-results','json-ld','featured-snippet','faq-schema'],
   tools:['schema-gen','faq-schema-gen','article-schema-gen','breadcrumb-schema-gen']},
  {slug:'schema-markup',term:'Schema Markup',cat:'tools-technology',
   def:'Schema markup is code you add to your website using Schema.org vocabulary. It helps search engines understand your content context and can trigger enhanced search features like star ratings, event dates, and FAQ dropdowns.',
   example:'Adding Article schema to a blog post helps Google understand it\'s an article with an author, date published, and publisher — potentially triggering article-specific rich results.',
   related:['structured-data','json-ld','rich-results','faq-schema','breadcrumb-schema'],
   tools:['schema-gen','faq-schema-gen','article-schema-gen','breadcrumb-schema-gen']},
  {slug:'rich-results',term:'Rich Results',cat:'seo-fundamentals',
   def:'Rich results are enhanced search listings that display additional information beyond the standard title, URL, and description. They include featured snippets, FAQ dropdowns, star ratings, how-to steps, and product information.',
   example:'A search result showing expandable FAQ questions below the main link is a rich result. Our FAQ Schema Generator helps you create the structured data needed to trigger these.',
   related:['structured-data','schema-markup','featured-snippet','faq-schema','serp-features'],
   tools:['faq-schema-gen','schema-gen']},
  {slug:'featured-snippet',term:'Featured Snippet',cat:'seo-fundamentals',
   def:'A featured snippet is a highlighted answer box at the top of Google\'s search results, extracted from a webpage. It typically appears above position 1 and can capture 8-15% of clicks even when the page isn\'t the top organic result.',
   example:'When you search "what is keyword density" and Google shows a paragraph answer at the top with a link to the source page, that\'s a featured snippet.',
   related:['serp','serp-features','rich-results','rank-position','search-intent'],
   tools:['meta-desc-gen','keyword-density']},

  // On-Page SEO
  {slug:'meta-description',term:'Meta Description',cat:'on-page-seo',
   def:'A meta description is an HTML attribute that provides a brief summary of a webpage. It appears below the title in search results. While not a direct ranking factor, a compelling meta description increases click-through rate (CTR), which indirectly impacts rankings.',
   example:'A good meta description for a word counter tool: "Free online word counter — count words, characters, and sentences instantly. No sign-up required." It\'s concise, includes the keyword, and has a clear value proposition.',
   related:['title-tag','serp','ctr','on-page-seo','meta-tags'],
   tools:['meta-desc-gen','meta-gen','og-generator']},
  {slug:'title-tag',term:'Title Tag',cat:'on-page-seo',
   def:'The title tag is the clickable headline that appears in search results and browser tabs. It\'s one of the most important on-page SEO factors. Titles should be 50-60 characters, include the primary keyword, and be compelling enough to earn clicks.',
   example:'<title>Free Word Counter - Count Words Instantly | Free AI Text Tools</title> — includes the keyword "word counter", is under 60 characters, and has a clear value proposition.',
   related:['meta-description','on-page-seo','ctr','serp','meta-tags'],
   tools:['meta-gen','meta-desc-gen']},
  {slug:'header-tags',term:'Header Tags (H1-H6)',cat:'on-page-seo',
   def:'Header tags are HTML elements (H1 through H6) that define headings and subheadings in your content. H1 is the main heading (one per page), H2 for main sections, H3 for subsections. They help search engines understand content structure and hierarchy.',
   example:'A blog post might use: H1 for the title, H2 for major sections like "What is SEO", H3 for subsections like "On-Page SEO" and "Off-Page SEO".',
   related:['on-page-seo','content-structure','accessibility','heading-hierarchy','seo'],
   tools:['markdown-editor','html-previewer']},
  {slug:'keyword-density',term:'Keyword Density',cat:'keywords',
   def:'Keyword density is the percentage of times a target keyword appears in content relative to the total word count. The ideal density is 1-2%. Over 3% is considered keyword stuffing and can trigger Google penalties.',
   example:'In a 1,000-word article, using your target keyword 10-15 times gives you a 1-1.5% density — ideal for SEO. Our Keyword Density Checker calculates this instantly.',
   related:['keyword-stuffing','keyword-research','on-page-seo','content-optimization','lsi-keywords'],
   tools:['keyword-density','word-counter','keyword-extract']},
  {slug:'internal-linking',term:'Internal Linking',cat:'on-page-seo',
   def:'Internal linking is the practice of linking to other pages on your own website. It helps search engines discover content, distributes PageRank (link equity) across your site, and improves user navigation. Every page should link to 3-5 other relevant pages.',
   example:'A blog post about "meta descriptions" should link to your Meta Description Generator tool, your "How to Write Meta Descriptions" blog post, and your Meta Tag Generator tool.',
   related:['link-equity','crawlability','site-architecture','on-page-seo','anchor-text'],
   tools:['meta-gen','meta-desc-gen']},
  {slug:'anchor-text',term:'Anchor Text',cat:'on-page-seo',
   def:'Anchor text is the visible, clickable text in a hyperlink. It helps search engines understand what the linked page is about. Good anchor text is descriptive, relevant, and varies naturally. Avoid generic text like "click here".',
   example:'Instead of "click here to use our tool", use "try our free word counter" — the anchor text "free word counter" tells Google the linked page is about a word counter tool.',
   related:['internal-linking','backlink','link-equity','on-page-seo','external-linking'],
   tools:['word-counter','slug-generator']},
  {slug:'image-optimization',term:'Image Optimization',cat:'on-page-seo',
   def:'Image optimization involves compressing images, using descriptive file names, adding alt text, and implementing lazy loading. Properly optimized images improve page speed, accessibility, and can rank in Google Image Search.',
   example:'Instead of "IMG_2024.jpg", name your image "free-word-counter-screenshot.webp" and add alt text: "Screenshot of the free word counter tool showing word and character counts".',
   related:['alt-text','page-speed','core-web-vitals','accessibility','image-search'],
   tools:['slug-generator','html-previewer']},
  {slug:'alt-text',term:'Alt Text',cat:'on-page-seo',
   def:'Alt text (alternative text) is a description added to image tags for accessibility and SEO. It helps screen readers describe images to visually impaired users and helps search engines understand image content.',
   example:'<img src="word-counter.png" alt="Free word counter tool showing 500 words, 3,200 characters, and 25 sentences"> — descriptive, includes relevant terms, and helps both users and search engines.',
   related:['image-optimization','accessibility','seo','on-page-seo','image-search'],
   tools:['html-encoder','html-previewer']},
  {slug:'content-optimization',term:'Content Optimization',cat:'on-page-seo',
   def:'Content optimization is the process of making your content more visible and relevant to search engines while maintaining readability for humans. It includes keyword placement, heading structure, internal links, and content depth.',
   example:'Optimizing a "keyword density" article: place the keyword in the first 100 words, use it in H2 headings, link to your Keyword Density Checker tool, and ensure the content covers the topic comprehensively.',
   related:['keyword-density','on-page-seo','search-intent','content-strategy','user-experience'],
   tools:['keyword-density','keyword-extract','word-counter']},

  // Off-Page SEO
  {slug:'backlink',term:'Backlink',cat:'off-page-seo',
   def:'A backlink is a link from another website to yours. Backlinks are one of Google\'s top ranking factors because they act as "votes of confidence" from other sites. Quality matters more than quantity — one link from a high-authority site is worth more than 100 low-quality links.',
   example:'If a popular marketing blog writes "we recommend this free word counter tool" and links to your site, that\'s a high-quality backlink that boosts your domain authority.',
   related:['domain-authority','link-building','anchor-text','do-follow','referring-domain'],
   tools:['meta-gen','schema-gen']},
  {slug:'domain-authority',term:'Domain Authority',cat:'off-page-seo',
   def:'Domain Authority (DA) is a score (0-100) developed by Moz that predicts how likely a website is to rank in search results. It\'s based on factors like backlink quantity, backlink quality, and linking root domains. Higher DA sites tend to rank better.',
   example:'A site with DA 60 will generally rank easier than a site with DA 20. Building high-quality backlinks from authoritative sites increases your DA over time.',
   related:['backlink','link-building','page-authority','off-page-seo','trust-flow'],
   tools:['meta-gen','schema-gen']},
  {slug:'link-building',term:'Link Building',cat:'off-page-seo',
   def:'Link building is the practice of acquiring backlinks from other websites. Common strategies include guest posting, creating linkable assets (tools, research, infographics), broken link building, and digital PR.',
   example:'Creating a free SEO glossary (like this one) is a link building strategy — other websites link to it as a reference resource, naturally earning backlinks without manual outreach.',
   related:['backlink','domain-authority','guest-posting','digital-pr','linkable-asset'],
   tools:['meta-gen','schema-gen','robots-txt']},
  {slug:'do-follow',term:'DoFollow vs NoFollow Links',cat:'off-page-seo',
   def:'DoFollow links pass "link equity" (PageRank) to the linked page, helping it rank better. NoFollow links (rel="nofollow") tell search engines not to pass equity. Both types exist naturally — a healthy backlink profile includes both.',
   example:'A natural backlink profile includes ~70% doFollow and ~30% noFollow links. Too many doFollow links from low-quality sites can trigger Google penalties.',
   related:['backlink','link-equity','page-authority','off-page-seo','anchor-text'],
   tools:['meta-gen','hreflang-gen']},
  {slug:'guest-posting',term:'Guest Posting',cat:'off-page-seo',
   def:'Guest posting involves writing articles for other websites in your niche in exchange for a backlink. When done on relevant, high-quality sites, it builds authority and drives referral traffic. Avoid low-quality guest post farms.',
   example:'Writing an SEO tips article for a marketing blog with a link back to your word counter tool is legitimate guest posting that builds both authority and traffic.',
   related:['link-building','backlink','content-strategy','digital-pr','anchor-text'],
   tools:['meta-gen','keyword-extract']},
  {slug:'digital-pr',term:'Digital PR',cat:'off-page-seo',
   def:'Digital PR is a strategy that combines public relations with SEO to earn high-authority backlinks through newsworthy content, data studies, and media outreach. It\'s one of the most effective link building strategies.',
   example:'Publishing original research like "2026 Text Tool Usage Statistics" and pitching it to journalists can earn links from major publications like HubSpot, Search Engine Journal, and Forbes.',
   related:['link-building','backlink','content-strategy','linkable-asset','brand-mentions'],
   tools:['meta-gen','schema-gen']},

  // Keywords
  {slug:'keyword-research',term:'Keyword Research',cat:'keywords',
   def:'Keyword research is the process of finding and analyzing search terms that people enter into search engines. It helps you understand what your audience is searching for, how competitive keywords are, and which terms to target.',
   example:'Researching "free word counter" reveals 12,000 monthly searches with medium competition — a good target keyword. Researching "word" alone shows 1M+ searches but extreme competition — not worth targeting.',
   related:['long-tail-keyword','keyword-density','search-volume','keyword-difficulty','search-intent'],
   tools:['keyword-extract','keyword-density','slug-generator']},
  {slug:'long-tail-keyword',term:'Long-Tail Keyword',cat:'keywords',
   def:'Long-tail keywords are longer, more specific search phrases (3-7 words) with lower search volume but higher conversion rates. They\'re easier to rank for and attract more qualified traffic.',
   example:'"Free online word counter tool no sign-up" is a long-tail keyword with maybe 100 monthly searches but very high intent. Compare to "word counter" with 100,000 searches but lower intent.',
   related:['keyword-research','search-intent','keyword-density','semantic-keywords','content-strategy'],
   tools:['keyword-extract','keyword-density','slug-generator']},
  {slug:'search-volume',term:'Search Volume',cat:'keywords',
   def:'Search volume is the average number of times a keyword is searched per month. Higher volume means more potential traffic but usually more competition. Tools like Google Keyword Planner show search volume data.',
   example:'"SEO tools" has 40,000 monthly searches (high volume, high competition). "Free SEO tools for small business" has 1,200 searches (lower volume, lower competition).',
   related:['keyword-research','keyword-difficulty','long-tail-keyword','cpc','trend'],
   tools:['keyword-extract','keyword-density']},
  {slug:'keyword-difficulty',term:'Keyword Difficulty',cat:'keywords',
   def:'Keyword difficulty (KD) measures how hard it is to rank for a specific keyword on page 1. It considers factors like the authority of current ranking pages, backlink profiles, and content quality. Lower KD = easier to rank.',
   example:'A keyword with KD 20 means you need relatively few backlinks and moderate content to rank. KD 80+ means you\'ll need significant authority and comprehensive content to compete.',
   related:['keyword-research','search-volume','domain-authority','backlink','content-strategy'],
   tools:['keyword-extract','keyword-density']},
  {slug:'lsi-keywords',term:'LSI Keywords',cat:'keywords',
   def:'LSI (Latent Semantic Indexing) keywords are terms semantically related to your primary keyword. Google uses them to understand content context and relevance. Including LSI keywords naturally helps your content rank for related queries.',
   example:'For "word counter", LSI keywords include: character count, word count tool, text analyzer, text statistics, reading time, character limit. Use these naturally throughout your content.',
   related:['keyword-density','semantic-keywords','content-optimization','on-page-seo','search-intent'],
   tools:['keyword-extract','keyword-density','word-frequency']},
  {slug:'semantic-keywords',term:'Semantic Keywords',cat:'keywords',
   def:'Semantic keywords are words and phrases that are conceptually related to your main keyword. Google\'s natural language processing uses semantic understanding to match queries with relevant content, even when exact keywords aren\'t present.',
   example:'For "meta description generator", semantic keywords include: SEO description, search snippet, SERP description, meta tag, page summary. Using these helps Google understand your content\'s topical depth.',
   related:['lsi-keywords','keyword-research','content-optimization','search-intent','on-page-seo'],
   tools:['keyword-extract','meta-desc-gen']},

  // Content & AI
  {slug:'eeat',term:'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)',cat:'content-ai',
   def:'E-E-A-T is Google\'s framework for evaluating content quality. Experience means first-hand knowledge. Expertise means subject matter skill. Authoritativeness means recognized reputation. Trustworthiness means accuracy and transparency. It\'s critical for YMYL (Your Money or Your Life) topics.',
   example:'A blog post about SEO written by a verified SEO professional with years of experience, citing authoritative sources, and providing accurate information demonstrates strong E-E-A-T.',
   contentStrategy:['google-ai-overview-spam-policy-2026','optimize-google-ai-overviews'],
   related:['ai-overview','content-quality','trust-signals','author-bio','citations'],
   tools:['article-schema-gen','schema-gen']},
  {slug:'ai-overview',term:'Google AI Overview',cat:'content-ai',
   def:'AI Overviews are Google\'s AI-generated summaries that appear at the top of search results. They synthesize information from multiple sources, cite references, and provide direct answers. Getting cited in AI Overviews is becoming a primary SEO goal.',
   example:'When you search "how to optimize for AI overviews" and Google shows a comprehensive AI-generated answer with cited sources at the top, that\'s an AI Overview.',
   contentStrategy:['optimize-google-ai-overviews','how-to-get-cited-google-ai-overviews','query-fanout-seo-2026'],
   related:['eeat','content-quality','featured-snippet','generative-engine-optimization','citation'],
   tools:['meta-gen','schema-gen']},
  {slug:'content-quality',term:'Content Quality',cat:'content-ai',
   def:'Content quality refers to how well your content satisfies user intent through accuracy, depth, originality, and readability. Google\'s Helpful Content system rewards content written for humans first, not search engines.',
   example:'A comprehensive 2,000-word guide with original examples, expert quotes, and actionable steps has high content quality. A thin 300-word article with no original insight has low quality.',
   related:['eeat','helpful-content','search-intent','user-experience','content-optimization'],
   tools:['word-counter','keyword-density']},
  {slug:'helpful-content',term:'Helpful Content System',cat:'content-ai',
   def:'Google\'s Helpful Content system is an algorithm that rewards content written primarily for humans and demotes content created mainly for search engine manipulation. It uses a site-wide signal — unhelpful content affects all pages on your site.',
   example:'Writing a genuinely useful word counter tutorial with examples and tips is helpful content. Writing 100 thin articles stuffed with keywords to manipulate rankings is unhelpful content.',
   related:['eeat','content-quality','search-intent','google-algorithm','content-strategy'],
   tools:['word-counter','keyword-density']},
  {slug:'generative-engine-optimization',term:'Generative Engine Optimization (GEO)',cat:'content-ai',
   def:'GEO is the practice of optimizing content to be cited in AI-generated search results (Google AI Overviews, ChatGPT search, Perplexity). It focuses on being the source AI systems reference, not just ranking in traditional results.',
   example:'Structuring content with clear definitions, statistics, and expert quotes makes it more likely to be cited in AI Overviews. Our Schema Generator helps create the structured data AI systems prefer.',
   contentStrategy:['optimize-google-ai-overviews','how-to-get-cited-google-ai-overviews','query-fanout-vs-keywords'],
   related:['ai-overview','eeat','structured-data','content-quality','citation'],
   tools:['schema-gen','article-schema-gen','faq-schema-gen']},
  {slug:'content-strategy-term',term:'Content Strategy',cat:'content-ai',
   def:'Content strategy is the planning, creation, and management of content to achieve specific business goals. It includes keyword research, topic planning, content calendars, distribution, and performance measurement.',
   example:'A content strategy for a text tools site: publish 3 blog posts/week targeting long-tail keywords, create tool comparison pages monthly, and update existing content quarterly.',
   related:['keyword-research','editorial-calendar','content-optimization','distribution','measurement'],
   tools:['keyword-extract','keyword-density']},
  {slug:'citation',term:'Citation (AI)',cat:'content-ai',
   def:'An AI citation is when an AI system (like Google AI Overview) references your content as a source in its generated answer. Citations drive branded traffic and establish authority. Getting cited requires being the definitive source on a topic.',
   example:'If Google AI Overview cites your "Word Counter" tool page when answering "best free word count tools", that citation drives high-intent traffic directly to your site.',
   contentStrategy:['how-to-get-cited-google-ai-overviews','optimize-google-ai-overviews'],
   related:['ai-overview','eeat','generative-engine-optimization','brand-mentions','authority'],
   tools:['meta-gen','schema-gen']},

  // Analytics
  {slug:'ctr',term:'CTR (Click-Through Rate)',cat:'analytics',
   def:'CTR is the percentage of people who click on your link after seeing it in search results. CTR = (clicks / impressions) × 100. A good organic CTR is 3-5%. Higher CTR signals to Google that your result is relevant.',
   example:'If your page shows up 1,000 times in search results and 45 people click, your CTR is 4.5% — above average. Improving your title tag and meta description can boost CTR.',
   related:['serp','rank-position','meta-description','title-tag','impressions'],
   tools:['meta-desc-gen','meta-gen']},
  {slug:'impressions',term:'Impressions',cat:'analytics',
   def:'Impressions count how many times your page appears in search results. A page can have thousands of impressions even with zero clicks. High impressions with low CTR suggests your title/description needs improvement.',
   example:'Your "word counter" page might get 5,000 impressions monthly but only 150 clicks (3% CTR). Improving the title could increase clicks to 300 (6% CTR) without changing rankings.',
   related:['ctr','serp','rank-position','google-search-console','organic-traffic'],
   tools:['meta-desc-gen','meta-gen']},
  {slug:'conversion-rate',term:'Conversion Rate',cat:'analytics',
   def:'Conversion rate is the percentage of visitors who complete a desired action (signup, purchase, tool use). It measures how effectively your page turns visitors into users or customers.',
   example:'If 1,000 people visit your word counter and 350 use the tool, your conversion rate is 35%. A high conversion rate indicates your page matches user intent and provides clear value.',
   related:['bounce-rate','user-experience','call-to-action','landing-page-optimization','analytics'],
   tools:['word-counter','char-counter']},
  {slug:'user-experience',term:'User Experience (UX)',cat:'analytics',
   def:'User experience encompasses how visitors interact with your website. Good UX includes fast loading, easy navigation, clear calls-to-action, readable content, and mobile responsiveness. Google uses UX signals as ranking factors.',
   example:'A tool page with clear instructions, instant results, and no popups has good UX. A page with slow loading, confusing navigation, and intrusive ads has poor UX.',
   related:['core-web-vitals','page-speed','bounce-rate','mobile-first-indexing','dwell-time'],
   tools:['html-previewer','markdown-editor']},

  // Tools & Technology
  {slug:'json-ld',term:'JSON-LD',cat:'tools-technology',
   def:'JSON-LD (JavaScript Object Notation for Linked Data) is Google\'s preferred format for structured data. It\'s a script tag placed in the <head> or <body> that describes your content using Schema.org vocabulary.',
   example:'<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[...]}</script> — this JSON-LD code tells Google your page has FAQ content.',
   related:['structured-data','schema-markup','rich-results','seo','technical-seo'],
   tools:['schema-gen','faq-schema-gen','article-schema-gen','breadcrumb-schema-gen']},
  {slug:'open-graph',term:'Open Graph Tags',cat:'tools-technology',
   def:'Open Graph tags are meta tags that control how your content appears when shared on social media (Facebook, LinkedIn, Twitter). They define the title, description, image, and URL that social platforms display.',
   example:'<meta property="og:title" content="Free Word Counter"> and <meta property="og:image" content="https://example.com/og-image.png"> control how your page appears when shared on Facebook.',
   related:['social-media','meta-tags','twitter-card','content-sharing','brand-consistency'],
   tools:['og-generator','meta-gen']},
  {slug:'twitter-card',term:'Twitter Card',cat:'tools-technology',
   def:'Twitter Cards are meta tags that control how your content appears when shared on Twitter/X. They support summary, summary_large_image, player, and app card types for rich social previews.',
   example:'<meta name="twitter:card" content="summary_large_image"> tells Twitter to display a large image preview when your page is shared.',
   related:['open-graph','social-media','meta-tags','content-sharing','brand-consistency'],
   tools:['og-generator','meta-gen']},
  {slug:'http-status-codes',term:'HTTP Status Codes',cat:'technical-seo',
   def:'HTTP status codes indicate the result of a server\'s response to a browser request. 200 = success, 301 = permanent redirect, 302 = temporary redirect, 404 = not found, 500 = server error. Broken pages (404s) waste crawl budget.',
   example:'A 301 redirect from /old-page to /new-page preserves link equity. A 404 error means the page doesn\'t exist — search engines won\'t index it.',
   related:['redirects','crawl-budget','technical-seo','broken-links','page-speed'],
   tools:['url-encoder','url-decoder']},
  {slug:'301-redirect',term:'301 Redirect',cat:'technical-seo',
   def:'A 301 redirect permanently moves one URL to another, transferring approximately 90-99% of link equity. It\'s used when you move content, change URLs, or merge pages.',
   example:'If you rename /blog/seo-tips to /blog/seo-tutorial, a 301 redirect ensures anyone visiting the old URL (or following old links) arrives at the new page without losing SEO value.',
   related:['canonical-url','link-equity','technical-seo','http-status-codes','migration'],
   tools:['url-encoder','url-decoder']},
  {slug:'cdn',term:'CDN (Content Delivery Network)',cat:'technical-seo',
   def:'A CDN is a network of servers distributed globally that delivers cached content to users based on their geographic location. It reduces page load times, handles traffic spikes, and improves security.',
   example:'When a user in London requests your page, a CDN serves it from a London server instead of your US server — reducing load time from 3 seconds to 0.5 seconds.',
   related:['page-speed','core-web-vitals','user-experience','technical-seo','global-audience'],
   tools:['html-previewer']},
  {slug:'orphan-page',term:'Orphan Page',cat:'technical-seo',
   def:'An orphan page is a page on your website that has no internal links pointing to it. Search engines can only discover orphan pages through sitemaps, making them nearly invisible. Every page should have at least 2-3 internal links.',
   example:'A tool page that\'s not linked from the homepage, tools listing, or any blog post is an orphan page. It won\'t rank because search engines can\'t find it through crawling.',
   related:['internal-linking','crawlability','sitemap','site-architecture','link-equity'],
   tools:['sitemap-gen','robots-txt']},
  {slug:'link-equity',term:'Link Equity (PageRank)',cat:'off-page-seo',
   def:'Link equity (formerly PageRank) is the value passed from one page to another through hyperlinks. Pages with more inbound links pass more equity. Internal linking distributes your existing equity across your site.',
   example:'Your homepage has the most link equity. Linking from homepage to a tool page passes some of that equity, helping the tool page rank better.',
   related:['internal-linking','backlink','domain-authority','anchor-text','off-page-seo'],
   tools:['meta-gen','schema-gen']},
  {slug:'site-architecture',term:'Site Architecture',cat:'technical-seo',
   def:'Site architecture is how your website\'s pages are organized and interlinked. Good architecture uses a flat structure (most pages within 3 clicks of homepage), clear categories, and logical internal linking.',
   example:'Homepage → Tools Directory → Category Page → Tool Page (3 clicks). This flat architecture ensures every page is easily discoverable by both users and search engines.',
   related:['internal-linking','crawlability','orphan-page','sitemap','user-experience'],
   tools:['sitemap-gen','robots-txt']},

  // Local SEO (bonus)
  {slug:'local-seo',term:'Local SEO',cat:'seo-fundamentals',
   def:'Local SEO optimizes your online presence to attract customers from local searches. It involves Google Business Profile optimization, local citations, reviews, and location-specific content.',
   example:'When someone searches "SEO tools near me" or "word counter [city name]", local SEO determines which businesses appear in the local pack and map results.',
   related:['google-business-profile','local-citations','reviews','map-pack','geo-targeting'],
   tools:['meta-gen','schema-gen']},
  {slug:'google-business-profile',term:'Google Business Profile',cat:'seo-fundamentals',
   def:'Google Business Profile (formerly Google My Business) is a free tool that lets businesses manage their online presence across Google, including Search and Maps. It\'s essential for local SEO.',
   example:'A local SEO agency claiming their GBP, adding photos, responding to reviews, and posting updates will rank better in local searches than one without a profile.',
   related:['local-seo','reviews','map-pack','local-citations','seo'],
   tools:['meta-gen','schema-gen']},

  // Content strategy bonus
  {slug:'editorial-calendar',term:'Editorial Calendar',cat:'content-ai',
   def:'An editorial calendar is a planning tool that maps out what content to publish, when, and on which channels. It ensures consistent publishing, aligns content with business goals, and prevents content gaps.',
   example:'Month 1: Publish 4 blog posts (2 SEO tutorials, 1 tool comparison, 1 industry analysis). Month 2: Update 5 existing posts, publish 4 new posts. This systematic approach builds topical authority.',
   related:['content-strategy','content-optimization','keyword-research','publishing-schedule','topic-clusters'],
   tools:['keyword-extract','word-counter']},
  {slug:'topic-clusters',term:'Topic Clusters',cat:'content-ai',
   def:'Topic clusters are groups of interlinked content centered around a core topic. A pillar page covers the broad topic, and cluster pages cover specific subtopics, all linking to each other. This builds topical authority.',
   example:'Pillar: "Complete SEO Guide" → Clusters: "Keyword Research", "On-Page SEO", "Link Building", "Technical SEO". Each cluster page links to the pillar and to related clusters.',
   related:['content-strategy','internal-linking','topical-authority','pillar-page','content-hub'],
   tools:['meta-gen','schema-gen']},
  {slug:'pillar-page',term:'Pillar Page',cat:'content-ai',
   def:'A pillar page is a comprehensive, long-form page covering a broad topic in depth. It serves as the hub for topic clusters, linking to detailed cluster pages and receiving links back from them.',
   example:'A "Complete Guide to Free Text Tools" pillar page linking to individual tool guides, category comparisons, and how-to tutorials — all interlinked.',
   related:['topic-clusters','content-hub','internal-linking','topical-authority','content-strategy'],
   tools:['word-counter','meta-gen']},
  {slug:'topical-authority',term:'Topical Authority',cat:'content-ai',
   def:'Topical authority is Google\'s assessment of how comprehensive and expert your coverage of a topic is. Sites with strong topical authority rank better because Google trusts them as authoritative sources.',
   example:'A site with 50 articles about SEO tools, keyword research, and technical SEO has stronger topical authority on "SEO" than a site with just 3 articles.',
   related:['topic-clusters','eeat','content-strategy','pillar-page','link-building'],
   tools:['keyword-extract','meta-gen']},
  {slug:'content-hub',term:'Content Hub',cat:'content-ai',
   def:'A content hub is a centralized resource section on your website that groups related content together. It improves navigation, internal linking, and helps search engines understand your site\'s topical structure.',
   example:'Your /blog/ directory organized into categories (SEO Strategy, Keyword Research, Technical SEO) is a content hub. The glossary is another content hub. Each hub groups related content for users and search engines.',
   related:['topic-clusters','pillar-page','internal-linking','site-architecture','topical-authority'],
   tools:['meta-gen','sitemap-gen']}
];

function generateTermPage(term) {
  const url = BASE + '/glossary/' + term.slug + '.html';
  const catInfo = categories.find(c => c.id === term.cat);

  const relatedLinks = (term.related || []).map(slug => {
    const t = terms.find(x => x.slug === slug);
    return t ? '<a href="/glossary/' + t.slug + '.html" style="display:inline-block;padding:6px 12px;background:var(--bg-2);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.85rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + esc(t.term.split('(')[0].trim()) + '</a>' : '';
  }).filter(Boolean).join(' ');

  const toolLinks = (term.tools || []).map(tid => {
    const names = {'word-counter':'Word Counter','char-counter':'Character Counter','keyword-density':'Keyword Density Checker','keyword-extract':'Keyword Extractor','meta-gen':'Meta Tag Generator','meta-desc-gen':'Meta Description Generator','og-generator':'OG Tag Generator','canonical-gen':'Canonical URL Generator','robots-txt':'Robots.txt Generator','sitemap-gen':'Sitemap Generator','hreflang-gen':'Hreflang Generator','schema-gen':'Schema Markup Generator','faq-schema-gen':'FAQ Schema Generator','article-schema-gen':'Article Schema Generator','breadcrumb-schema-gen':'Breadcrumb Schema Generator','slug-generator':'URL Slug Generator','markdown-editor':'Markdown Editor','html-previewer':'HTML Previewer','url-encoder':'URL Encoder','url-decoder':'URL Decoder','html-encoder':'HTML Encoder'};
    return '<a href="/tools/' + tid + '.html" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:var(--accent);color:#fff;border-radius:6px;text-decoration:none;font-size:.85rem;font-weight:500;transition:opacity .2s" onmouseover="this.style.opacity=\'0.85\'" onmouseout="this.style.opacity=\'1\'">⚡ ' + esc(names[tid] || tid) + '</a>';
  }).join(' ');

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type":"Question","name":"What is " + term.term.split('(')[0].trim() + "?","acceptedAnswer":{"@type":"Answer","text":term.def}},
      {"@type":"Question","name":"Why is " + term.term.split('(')[0].trim() + " important for SEO?","acceptedAnswer":{"@type":"Answer","text":"Understanding " + term.term.split('(')[0].trim() + " helps you optimize your website better, rank higher in search results, and drive more organic traffic. It's a fundamental concept in digital marketing."}},
      {"@type":"Question","name":"How do I use " + term.term.split('(')[0].trim() + "?","acceptedAnswer":{"@type":"Answer","text":term.example}}
    ]
  });

  const breadcrumbSchema = JSON.stringify({
    "@context":"https://schema.org","@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":BASE+"/"},
      {"@type":"ListItem","position":2,"name":"Glossary","item":BASE+"/glossary/"},
      {"@type":"ListItem","position":3,"name":term.term.split('(')[0].trim(),"item":url}
    ]
  });

  const defSchema = JSON.stringify({
    "@context":"https://schema.org","@type":"DefinedTerm",
    "name":term.term.split('(')[0].trim(),
    "description":term.def,
    "inDefinedTermSet":{"@type":"DefinedTermSet","name":"SEO Glossary","url":BASE+"/glossary/"}
  });

  const otherTerms = terms.filter(t => t.slug !== term.slug && t.cat === term.cat).slice(0,5);
  const sameLinks = otherTerms.map(t =>
    '<a href="/glossary/' + t.slug + '.html" style="display:block;padding:10px 14px;background:var(--bg-2);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.85rem;transition:border-color .2s;margin-bottom:8px" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + esc(t.term.split('(')[0].trim()) + ' →</a>'
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>What is ${esc(term.term.split('(')[0].trim())}? ${esc(catInfo.name)} Definition | SEO Glossary</title>
<meta name="description" content="${esc(term.def.substring(0,155))}...">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="en-US" href="${url}">
<link rel="alternate" hreflang="en-GB" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:title" content="What is ${esc(term.term.split('(')[0].trim())}? | SEO Glossary">
<meta property="og:description" content="${esc(term.def.substring(0,155))}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Free AI Text Tools">
<meta property="og:image" content="${BASE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="What is ${esc(term.term.split('(')[0].trim())}?">
<meta name="twitter:description" content="${esc(term.def.substring(0,155))}">
<meta name="twitter:image" content="${BASE}/og-image.png">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>">
<link rel="stylesheet" href="/css/style.css">
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<script type="application/ld+json">${breadcrumbSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
<script type="application/ld+json">${defSchema}</script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><span class="logo-mark">⚡</span> Free AI Text Tools</a>
<nav class="nav" aria-label="Main navigation">
<a href="/" class="nav-link">Home</a>
<a href="/tools/" class="nav-link">Tools</a>
<a href="/glossary/" class="nav-link active">Glossary</a>
<a href="/blog/" class="nav-link">Blog</a>
<button type="button" class="theme-btn" onclick="App.toggleTheme()" aria-label="Toggle theme">🌙</button>
</nav>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()">☰</button>
</div>
</header>
<main id="main-content">
<div class="container" style="max-width:800px;margin:0 auto;padding:32px 20px">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <a href="/glossary/" style="color:var(--text-3);text-decoration:none">Glossary</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">${esc(term.term.split('(')[0].trim())}</span></div>

<div style="display:inline-block;padding:6px 14px;background:var(--bg-2);border:1px solid var(--border);border-radius:20px;font-size:.8rem;color:var(--text-2);margin-bottom:16px">${catInfo.icon} ${esc(catInfo.name)}</div>

<h1 style="font-size:2rem;font-weight:800;margin-bottom:8px;line-height:1.2">What is ${esc(term.term)}?</h1>
<p style="font-size:.85rem;color:var(--text-3);margin-bottom:32px">SEO Glossary &middot; ${esc(catInfo.name)}</p>

<div style="padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:32px">
<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px;color:var(--accent)">Definition</h2>
<p style="font-size:1rem;color:var(--text);line-height:1.8">${esc(term.def)}</p>
</div>

<div style="padding:24px 28px;background:var(--bg-2);border:1px solid var(--border);border-radius:12px;margin-bottom:32px">
<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px">Example</h2>
<p style="color:var(--text-2);line-height:1.8">${esc(term.example)}</p>
</div>

${toolLinks ? '<div style="margin-bottom:32px"><h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px">Try Our Free Tools</h2><div style="display:flex;flex-wrap:wrap;gap:10px">' + toolLinks + '</div></div>' : ''}

${relatedLinks ? '<div style="margin-bottom:32px"><h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px">Related Terms</h2><div style="display:flex;flex-wrap:wrap;gap:8px">' + relatedLinks + '</div></div>' : ''}

<div style="margin-bottom:32px">
<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">Frequently Asked Questions</h2>
<details class="faq-item" style="margin-bottom:12px;border:1px solid var(--border);border-radius:8px;padding:0 16px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:14px 0;color:var(--text)">What is ${esc(term.term.split('(')[0].trim())}? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">${esc(term.def)}</div></details>
<details class="faq-item" style="margin-bottom:12px;border:1px solid var(--border);border-radius:8px;padding:0 16px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:14px 0;color:var(--text)">Why is it important for SEO? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">Understanding ${esc(term.term.split('(')[0].trim())} helps you optimize your website better, rank higher in search results, and drive more organic traffic. It's a fundamental concept every SEO professional and content creator should know.</div></details>
<details class="faq-item" style="margin-bottom:12px;border:1px solid var(--border);border-radius:8px;padding:0 16px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:14px 0;color:var(--text)">How do I apply this in practice? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">${esc(term.example)}</div></details>
</div>

${sameLinks ? '<div style="margin-bottom:48px"><h2 style="font-size:1.1rem;font-weight:700;margin-bottom:12px">More ' + esc(catInfo.name) + '</h2>' + sameLinks + '</div>' : ''}

<div style="text-align:center;padding:32px 0;border-top:1px solid var(--border)">
<p style="color:var(--text-3);font-size:.85rem;margin-bottom:16px">Explore our complete SEO glossary</p>
<a href="/glossary/" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;transition:opacity .2s" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">📖 Browse All Terms</a>
</div>
</div>
</main>
<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div class="footer-col"><a href="/" class="site-logo" style="color:inherit;margin-bottom:8px"><span class="logo-mark">⚡</span> Free AI Text Tools</a><p style="font-size:13px;color:var(--text-3)">45+ free online text tools. No sign-up needed.</p></div>
<div class="footer-col"><h4>Tools</h4><a href="/tools/word-counter.html">Word Counter</a><a href="/tools/case-converter.html">Case Converter</a><a href="/tools/json-formatter.html">JSON Formatter</a><a href="/tools/robots-txt.html">Robots.txt</a></div>
<div class="footer-col"><h4>Resources</h4><a href="/glossary/">SEO Glossary</a><a href="/tools/directory.html">Tools Directory</a><a href="/blog/">Blog</a></div>
<div class="footer-col"><h4>Legal</h4><a href="/privacy-policy.html">Privacy Policy</a><a href="/terms.html">Terms</a></div>
</div>
<div class="footer-bottom"><p>&copy; 2026 Free AI Text Tools. All rights reserved.</p></div>
</div>
</footer>
<div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent"><p>🍪 We use cookies for analytics &amp; preferences. <a href="/cookie-policy.html">Learn more</a></p><div class="btn-group"><button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button><button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button></div></div>
<div class="toast" id="appToast"></div>
<script src="/js/app.js"></script>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(reg){reg.unregister();});});}</script>
</body>
</html>`;
}

function generateCategoryPage(cat) {
  const url = BASE + '/glossary/category/' + cat.id + '.html';
  const catTerms = terms.filter(t => t.cat === cat.id);

  const termLinks = catTerms.map(t =>
    '<a href="/glossary/' + t.slug + '.html" style="display:flex;flex-direction:column;padding:16px 20px;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' +
    '<div style="font-weight:600;font-size:.95rem;margin-bottom:4px;color:var(--text)">' + esc(t.term.split('(')[0].trim()) + '</div>' +
    '<div style="font-size:.8rem;color:var(--text-2);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(t.def.substring(0, 120)) + '...</div></a>'
  ).join('\n');

  const otherCats = categories.filter(c => c.id !== cat.id);
  const catLinks = otherCats.map(c =>
    '<a href="/glossary/category/' + c.id + '.html" style="display:inline-block;padding:8px 16px;background:var(--bg-2);border:1px solid var(--border);border-radius:6px;text-decoration:none;color:var(--text);font-size:.85rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + c.icon + ' ' + esc(c.name) + '</a>'
  ).join(' ');

  const faqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":"What is " + cat.name + "?","acceptedAnswer":{"@type":"Answer","text":cat.desc + " This category contains " + catTerms.length + " definitions."}},
    {"@type":"Question","name":"How many " + cat.name + " terms are defined?","acceptedAnswer":{"@type":"Answer","text":"We have " + catTerms.length + " terms in this category, each with detailed definitions, examples, and practical applications."}}
  ]});

  const breadcrumbSchema = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Home","item":BASE+"/"},
    {"@type":"ListItem","position":2,"name":"Glossary","item":BASE+"/glossary/"},
    {"@type":"ListItem","position":3,"name":cat.name,"item":url}
  ]});

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(cat.name)} Definitions - SEO Glossary | Free AI Text Tools</title>
<meta name="description" content="${esc(cat.desc)}. Browse ${catTerms.length} ${esc(cat.name).toLowerCase()} definitions with examples and practical applications.">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="en-US" href="${url}">
<link rel="alternate" hreflang="en-GB" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:title" content="${esc(cat.name)} Definitions - SEO Glossary">
<meta property="og:description" content="${esc(cat.desc)}. Browse ${catTerms.length} definitions.">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Free AI Text Tools">
<meta property="og:image" content="${BASE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(cat.name)} Definitions">
<meta name="twitter:description" content="${esc(cat.desc)}">
<meta name="twitter:image" content="${BASE}/og-image.png">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>">
<link rel="stylesheet" href="/css/style.css">
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<script type="application/ld+json">${breadcrumbSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><span class="logo-mark">⚡</span> Free AI Text Tools</a>
<nav class="nav" aria-label="Main navigation">
<a href="/" class="nav-link">Home</a>
<a href="/tools/" class="nav-link">Tools</a>
<a href="/glossary/" class="nav-link active">Glossary</a>
<a href="/blog/" class="nav-link">Blog</a>
<button type="button" class="theme-btn" onclick="App.toggleTheme()" aria-label="Toggle theme">🌙</button>
</nav>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()">☰</button>
</div>
</header>
<main id="main-content">
<div class="container" style="max-width:900px;margin:0 auto;padding:32px 20px">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <a href="/glossary/" style="color:var(--text-3);text-decoration:none">Glossary</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">${esc(cat.name)}</span></div>

<h1 style="font-size:2rem;font-weight:800;margin-bottom:12px;line-height:1.2">${cat.icon} ${esc(cat.name)}</h1>
<p style="font-size:1.05rem;color:var(--text-2);line-height:1.7;margin-bottom:12px;max-width:720px">${esc(cat.desc)}</p>
<p style="font-size:.85rem;color:var(--text-3);margin-bottom:40px">${catTerms.length} terms defined</p>

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-bottom:48px">
${termLinks}
</div>

<h2 style="font-size:1.1rem;font-weight:700;margin-bottom:16px">Explore Other Categories</h2>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:48px">
${catLinks}
</div>

<div style="text-align:center;padding:32px 0;border-top:1px solid var(--border)">
<a href="/glossary/" style="display:inline-block;padding:12px 28px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;transition:opacity .2s" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">📖 Browse All Terms</a>
</div>
</div>
</main>
<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div class="footer-col"><a href="/" class="site-logo" style="color:inherit;margin-bottom:8px"><span class="logo-mark">⚡</span> Free AI Text Tools</a><p style="font-size:13px;color:var(--text-3)">45+ free online text tools.</p></div>
<div class="footer-col"><h4>Tools</h4><a href="/tools/word-counter.html">Word Counter</a><a href="/tools/case-converter.html">Case Converter</a><a href="/tools/json-formatter.html">JSON Formatter</a></div>
<div class="footer-col"><h4>Resources</h4><a href="/glossary/">SEO Glossary</a><a href="/tools/directory.html">Tools Directory</a><a href="/blog/">Blog</a></div>
<div class="footer-col"><h4>Legal</h4><a href="/privacy-policy.html">Privacy</a><a href="/terms.html">Terms</a></div>
</div>
<div class="footer-bottom"><p>&copy; 2026 Free AI Text Tools.</p></div>
</div>
</footer>
<div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent"><p>🍪 Cookies for analytics.</p><div class="btn-group"><button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button><button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button></div></div>
<div class="toast" id="appToast"></div>
<script src="/js/app.js"></script>
</body>
</html>`;
}

function generateHubPage() {
  const url = BASE + '/glossary/';

  const catSections = categories.map(cat => {
    const catTerms = terms.filter(t => t.cat === cat.id);
    const termHtml = catTerms.map(t =>
      '<a href="/glossary/' + t.slug + '.html" style="display:block;padding:10px 14px;border-bottom:1px solid var(--border);text-decoration:none;color:var(--text);transition:background .2s" onmouseover="this.style.background=\'var(--bg-2)\'" onmouseout="this.style.background=\'transparent\'">' +
      '<span style="font-weight:600;font-size:.9rem">' + esc(t.term.split('(')[0].trim()) + '</span> ' +
      '<span style="color:var(--text-3);font-size:.8rem">&rarr;</span></a>'
    ).join('\n');
    return `
    <div style="margin-bottom:40px">
      <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <a href="/glossary/category/${cat.id}.html" style="color:var(--text);text-decoration:none;border-bottom:2px solid transparent;transition:border-color .2s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='transparent'">${cat.icon} ${esc(cat.name)}</a>
        <span style="font-size:.75rem;font-weight:400;color:var(--text-3);background:var(--bg-2);padding:2px 8px;border-radius:4px">${catTerms.length} terms</span>
      </h2>
      <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden">${termHtml}</div>
    </div>`;
  }).join('\n');

  const allTermLinks = terms.map(t =>
    '<a href="/glossary/' + t.slug + '.html" style="display:inline-block;padding:5px 10px;background:var(--bg-2);border:1px solid var(--border);border-radius:5px;text-decoration:none;color:var(--text);font-size:.78rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + esc(t.term.split('(')[0].trim()) + '</a>'
  ).join(' ');

  const siteNavSchema = JSON.stringify({"@context":"https://schema.org","@type":"DefinedTermSet","name":"SEO Glossary","description":"Comprehensive glossary of SEO, digital marketing, and web technology terms.","url":url});

  const faqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":"What is this SEO Glossary?","acceptedAnswer":{"@type":"Answer","text":"A comprehensive glossary of " + terms.length + " SEO, digital marketing, and web technology terms. Each term includes a definition, real-world example, and links to free tools you can use."}},
    {"@type":"Question","name":"How many terms are defined?","acceptedAnswer":{"@type":"Answer","text":"We currently define " + terms.length + " terms across " + categories.length + " categories. New terms are added regularly."}},
    {"@type":"Question","name":"Are these definitions accurate for 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. All definitions reflect the latest 2026 SEO landscape including AI Overviews, GEO, Core Web Vitals, and current Google algorithm updates."}}
  ]});

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SEO Glossary - ${terms.length}+ Terms Explained | Free AI Text Tools</title>
<meta name="description" content="Comprehensive SEO glossary with ${terms.length}+ terms explained. What is SEO, SERP, backlink, keyword density? Definitions, examples, and free tools.">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="en-US" href="${url}">
<link rel="alternate" hreflang="en-GB" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:title" content="SEO Glossary - ${terms.length}+ Terms Explained">
<meta property="og:description" content="Comprehensive SEO glossary with ${terms.length}+ terms. Definitions, examples, and free tools.">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Free AI Text Tools">
<meta property="og:image" content="${BASE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="SEO Glossary - ${terms.length}+ Terms">
<meta name="twitter:description" content="Comprehensive SEO glossary. Every term explained with examples.">
<meta name="twitter:image" content="${BASE}/og-image.png">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>">
<link rel="stylesheet" href="/css/style.css">
<script>(function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<script type="application/ld+json">${siteNavSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="site-header">
<div class="header-inner">
<a href="/" class="site-logo"><span class="logo-mark">⚡</span> Free AI Text Tools</a>
<nav class="nav" aria-label="Main navigation">
<a href="/" class="nav-link">Home</a>
<a href="/tools/" class="nav-link">Tools</a>
<a href="/glossary/" class="nav-link active">Glossary</a>
<a href="/blog/" class="nav-link">Blog</a>
<button type="button" class="theme-btn" onclick="App.toggleTheme()" aria-label="Toggle theme">🌙</button>
</nav>
<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()">☰</button>
</div>
</header>
<main id="main-content">
<div class="container" style="max-width:900px;margin:0 auto;padding:32px 20px">
<div class="breadcrumb" style="margin-bottom:24px;font-size:.85rem"><a href="/" style="color:var(--text-3);text-decoration:none">Home</a> <span style="color:var(--text-3)">/</span> <span style="color:var(--text)">Glossary</span></div>

<h1 style="font-size:2.4rem;font-weight:800;margin-bottom:12px;line-height:1.15">📖 SEO Glossary</h1>
<p style="font-size:1.15rem;color:var(--text-2);line-height:1.7;margin-bottom:12px;max-width:720px">Comprehensive glossary of <strong style="color:var(--text)">${terms.length}+ SEO, digital marketing, and web technology terms</strong> explained with definitions, real-world examples, and free tools.</p>
<p style="font-size:.85rem;color:var(--text-3);margin-bottom:32px">${categories.length} categories &middot; Updated for 2026</p>

<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:48px">
${categories.map(c => '<a href="/glossary/category/' + c.id + '.html" style="display:inline-flex;align-items:center;gap:6px;padding:10px 18px;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);font-size:.9rem;transition:border-color .2s" onmouseover="this.style.borderColor=\'var(--accent)\'" onmouseout="this.style.borderColor=\'var(--border)\'">' + c.icon + ' ' + esc(c.name) + ' <span style="font-size:.75rem;color:var(--text-3)">(' + terms.filter(t => t.cat === c.id).length + ')</span></a>').join(' ')}
</div>

${catSections}

<h2 style="font-size:1.2rem;font-weight:700;margin-bottom:16px">All ${terms.length} Terms</h2>
<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:48px">
${allTermLinks}
</div>

<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px">Frequently Asked Questions</h2>
<div style="margin-bottom:48px">
<details class="faq-item" style="margin-bottom:12px;border:1px solid var(--border);border-radius:8px;padding:0 16px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:14px 0;color:var(--text)">What is this SEO Glossary? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">A comprehensive glossary of ${terms.length}+ SEO, digital marketing, and web technology terms. Each term includes a clear definition, real-world example, and links to free tools you can use to apply the concept.</div></details>
<details class="faq-item" style="margin-bottom:12px;border:1px solid var(--border);border-radius:8px;padding:0 16px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:14px 0;color:var(--text)">Are these definitions accurate for 2026? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">Yes. All definitions reflect the latest 2026 SEO landscape including Google AI Overviews, Generative Engine Optimization, Core Web Vitals, and current algorithm updates.</div></details>
<details class="faq-item" style="margin-bottom:12px;border:1px solid var(--border);border-radius:8px;padding:0 16px"><summary style="cursor:pointer;font-weight:600;font-size:.95rem;padding:14px 0;color:var(--text)">Can I suggest a new term to add? <span style="color:var(--text-3)">&#9660;</span></summary><div style="padding:8px 0 16px;color:var(--text-2);line-height:1.7;font-size:.9rem">Absolutely! We add new terms regularly. Contact us with your suggested term and we'll include it in our next update.</div></details>
</div>

<section style="padding:32px 0;border-top:1px solid var(--border)">
<h2 style="font-size:1.2rem;font-weight:700;margin-bottom:12px">About This Glossary</h2>
<p style="color:var(--text-2);line-height:1.7;margin-bottom:12px">This glossary is designed to be the most comprehensive SEO reference on the web. Every term is explained in plain language with practical examples you can apply immediately.</p>
<p style="color:var(--text-2);line-height:1.7">Each definition links to relevant free tools on our site, so you can not only learn the concept but also apply it using our word counters, meta tag generators, keyword density checkers, and more.</p>
</section>
</div>
</main>
<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div class="footer-col"><a href="/" class="site-logo" style="color:inherit;margin-bottom:8px"><span class="logo-mark">⚡</span> Free AI Text Tools</a><p style="font-size:13px;color:var(--text-3)">45+ free online text tools.</p></div>
<div class="footer-col"><h4>Tools</h4><a href="/tools/word-counter.html">Word Counter</a><a href="/tools/case-converter.html">Case Converter</a><a href="/tools/json-formatter.html">JSON Formatter</a></div>
<div class="footer-col"><h4>Resources</h4><a href="/glossary/">SEO Glossary</a><a href="/tools/directory.html">Tools Directory</a><a href="/blog/">Blog</a></div>
<div class="footer-col"><h4>Legal</h4><a href="/privacy-policy.html">Privacy</a><a href="/terms.html">Terms</a></div>
</div>
<div class="footer-bottom"><p>&copy; 2026 Free AI Text Tools.</p></div>
</div>
</footer>
<div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent"><p>🍪 Cookies for analytics.</p><div class="btn-group"><button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button><button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button></div></div>
<div class="toast" id="appToast"></div>
<script src="/js/app.js"></script>
</body>
</html>`;
}

// Generate hub page
fs.writeFileSync(path.join(outDir, 'index.html'), generateHubPage(), 'utf8');
console.log('Created: public/glossary/index.html');

// Generate category pages
categories.forEach(cat => {
  fs.writeFileSync(path.join(outDir, 'category', cat.id + '.html'), generateCategoryPage(cat), 'utf8');
  console.log('Created: public/glossary/category/' + cat.id + '.html');
});

// Generate term pages
terms.forEach(term => {
  fs.writeFileSync(path.join(outDir, term.slug + '.html'), generateTermPage(term), 'utf8');
  console.log('Created: public/glossary/' + term.slug + '.html');
});

console.log('\nGlossary build complete!');
console.log('  Hub: 1 page');
console.log('  Categories: ' + categories.length + ' pages');
console.log('  Terms: ' + terms.length + ' pages');
console.log('  Total: ' + (1 + categories.length + terms.length) + ' pages');
