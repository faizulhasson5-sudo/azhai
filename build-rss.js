const fs = require('fs');
const path = require('path');

const posts = [
  {slug:'google-ai-overview-spam-policy-2026',title:"Google's AI Overview Spam Policy: What Gets You Penalized in 2026",desc:"Google now treats AI Overview manipulation as spam. Learn what's banned, what still works, and how to stay compliant.",category:'Policy Update',date:'2026-07-02'},
  {slug:'optimize-google-ai-overviews',title:'How to Optimize for Google AI Overviews: The Complete GEO Guide',desc:'Google AI Mode has 1B+ users. Learn how GEO can get your content cited in AI Overviews and future-proof your SEO.',category:'SEO Strategy',date:'2026-07-03'},
  {slug:'google-june-2026-spam-update',title:'Google June 2026 Spam Update: Complete Recovery & Strategy Guide',desc:"Google's June 2026 Spam Update is live. Learn what changed, who was affected, and how to recover your rankings.",category:'SEO Analysis',date:'2026-07-04'},
  {slug:'ultimate-guide-seo-text-tools',title:'The Ultimate Guide to Free SEO Text Tools in 2026',desc:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours.',category:'SEO Tools',date:'2026-06-20'},
  {slug:'how-to-write-perfect-meta-descriptions',title:'How to Write Perfect Meta Descriptions That Get Clicks',desc:'Learn the art of crafting compelling meta descriptions that improve CTR and boost search rankings.',category:'SEO Tips',date:'2026-06-18'},
  {slug:'json-formatting-best-practices',title:'JSON Formatting Best Practices for Developers',desc:'Master JSON formatting, validation, and optimization with practical examples and free tools.',category:'Development',date:'2026-06-15'},
  {slug:'markdown-for-bloggers',title:'Markdown for Bloggers: A Complete Beginner Guide',desc:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',category:'Blogging',date:'2026-06-12'},
  {slug:'understanding-canonical-tags-seo',title:'Understanding Canonical Tags: The Complete SEO Guide',desc:'Learn how canonical tags prevent duplicate content issues and consolidate ranking signals.',category:'SEO Tips',date:'2026-06-10'},
  {slug:'open-graph-tags-social-media',title:'Open Graph Tags: Get Perfect Social Media Previews',desc:'Master Open Graph meta tags to ensure your content looks amazing when shared on social media.',category:'Social Media',date:'2026-06-08'},
  {slug:'ai-content-detection-2026',title:'AI Content Detection 2026: How Google Catches AI Writing',desc:'Google now detects AI-generated content with 94% accuracy. Learn how detection works and how to create compliant content.',category:'SEO Strategy',date:'2026-07-05'},
  {slug:'query-fanout-seo-2026',title:'Query Fan-Out SEO 2026: How Google Breaks Down Searches',desc:'Query fan-out has grown +2,550% YoY. Learn how Google decomposes complex queries and how to optimize.',category:'SEO Strategy',date:'2026-07-05'},
  {slug:'how-to-get-cited-google-ai-overviews',title:'How to Get Cited in Google AI Overviews: The 2026 Playbook',desc:'Google AI Overviews now appear on most queries. Learn the 9-factor citeability checklist and schema strategies.',category:'SEO Strategy',date:'2026-07-06'},
  {slug:'find-trending-keywords-before-competitors',title:'How to Find Trending Keywords Before Competitors in 2026',desc:'By the time keyword tools show volume, competitors already target it. Learn 6 proven methods to spot rising demand.',category:'Keyword Research',date:'2026-07-06'},
  {slug:'query-fanout-vs-keywords',title:'Query Fan-Out vs Keywords: Why Traditional Keyword Research Is Dead',desc:'95% of fan-out sub-queries show zero volume in keyword tools. Learn why traditional keyword research is broken.',category:'SEO Strategy',date:'2026-07-06'},
  {slug:'long-tail-keyword-strategy-2026',title:'Long-Tail Keyword Strategy 2026: Find and Rank for Keywords That Convert',desc:'Long-tail keywords drive 70% of all searches with lower competition and higher conversion rates.',category:'Keyword Research',date:'2026-07-06'},
  {slug:'what-is-keyword-density',title:'What Is Keyword Density? The Complete Guide for SEO in 2026',desc:'Keyword density measures how often a keyword appears in your content. Learn the ideal density and how to calculate it.',category:'SEO Fundamentals',date:'2026-07-06'},
  {slug:'free-seo-tools-small-business',title:'25 Free SEO Tools Every Small Business Needs in 2026',desc:'Discover the best free SEO tools for small businesses. Keyword research, site audit, rank tracking, and more.',category:'SEO Tools',date:'2026-07-06'},
  {slug:'how-to-check-keyword-density',title:'How to Check Keyword Density: Step-by-Step Guide with Free Tools',desc:'Learn how to check keyword density in your content using free tools. Step-by-step guide with examples.',category:'SEO Tutorial',date:'2026-07-06'},
  {slug:'seo-content-writing-guide',title:'SEO Content Writing: How to Write Content That Ranks in 2026',desc:'Learn how to write SEO-optimized content that ranks on Google. From keyword research to on-page optimization.',category:'Content Strategy',date:'2026-07-06'},
  {slug:'how-to-write-meta-descriptions',title:'How to Write Meta Descriptions That Get Clicks in 2026',desc:'Meta descriptions impact CTR more than rankings. Learn how to write compelling meta descriptions.',category:'SEO Tutorial',date:'2026-07-06'},
  {slug:'how-to-create-robots-txt-file',title:'How to Create a Robots.txt File: Complete Step-by-Step Guide',desc:'Learn how to create a robots.txt file that tells search engines which pages to crawl. Free generator included.',category:'Technical SEO',date:'2026-07-08'},
  {slug:'xml-sitemap-guide-seo',title:'XML Sitemap Guide: How to Create and Submit Your Sitemap for SEO',desc:'An XML sitemap helps search engines discover and index your pages faster. Learn how to create and submit yours.',category:'Technical SEO',date:'2026-07-08'},
{slug:'eeat-2026-google-trust-guide',title:'E-E-A-T in 2026: How Google Now Decides Who to Trust',desc:'E-E-A-T has evolved from a page-level checklist into an entity verification system. Learn how Google AI Overviews evaluate trust and how to build real authority.',category:'SEO Strategy',date:'2026-07-05'},
{slug:'how-to-optimize-images-for-seo',title:'How to Optimize Images for SEO: Complete 2026 Guide',desc:'Image optimization is a critical ranking factor. Learn how to compress, resize, and format images for faster load times and better Google rankings.',category:'Technical SEO',date:'2026-07-10'},
{slug:'internal-linking-strategy-seo',title:'Internal Linking Strategy: How to Build a Link Architecture That Ranks',desc:'Internal links distribute page authority and help Google understand your site structure. Learn how to build a strategic internal linking architecture.',category:'SEO Strategy',date:'2026-07-10'},
{slug:'schema-markup-types-for-seo',title:'Schema Markup Types Every Website Needs in 2026',desc:'Structured data helps Google understand your content and display rich results. Learn which schema types drive the biggest SEO impact.',category:'Technical SEO',date:'2026-07-10'},
{slug:'google-search-console-guide-beginners',title:'Google Search Console for Beginners: Complete Setup Guide',desc:'Google Search Console is the most important free SEO tool. Learn how to set it up, verify your site, and use every feature to improve your rankings.',category:'SEO Tutorial',date:'2026-07-10'},
{slug:'how-to-improve-core-web-vitals',title:'How to Improve Core Web Vitals: Practical Fixes for 2026',desc:'Core Web Vitals are confirmed Google ranking factors. Learn practical, step-by-step fixes to improve LCP, INP, and CLS on any website.',category:'Technical SEO',date:'2026-07-10'},
{slug:'local-seo-checklist-2026',title:'Local SEO Checklist 2026: 20 Steps to Dominate Local Search',desc:'Local SEO drives foot traffic and phone calls. Follow this 20-step checklist to optimize your Google Business Profile and rank in local search.',category:'Local SEO',date:'2026-07-10'},
{slug:'how-to-build-backlinks-2026',title:'How to Build Backlinks in 2026: 10 Proven Strategies',desc:'Backlinks remain a top Google ranking factor. Learn 10 proven link building strategies that work in 2026 without risking penalties.',category:'Off-Page SEO',date:'2026-07-10'},
  {slug:'seo-vs-sem-whats-the-difference',title:'SEO vs SEM: What is the Difference and Which Should You Use?',desc:'SEO and SEM both drive traffic but work differently. Learn the key differences, costs, timelines, and when to use each strategy.',category:'SEO Fundamentals',date:'2026-07-10'},
  {slug:'seo-rank-tracking-guide',title:'The Complete Guide to SEO Rank Tracking in 2026',desc:'Track your search rankings effectively with the right tools and strategies. Learn what to track, how often to check, and how to act on rank data.',category:'SEO Tools',date:'2026-07-12'},
  {slug:'seo-analytics-dashboard',title:'SEO Analytics Dashboard: How to Track and Report SEO Performance',desc:'Build an SEO analytics dashboard that proves ROI. Learn to track the right metrics in GA4 and GSC and create reports stakeholders actually read.',category:'SEO Tutorial',date:'2026-07-12'},
  {slug:'ecommerce-seo-checklist',title:'E-commerce SEO Checklist: Product Pages, Schema & Category Optimization',desc:'E-commerce sites face unique SEO challenges. Follow this checklist to optimize product pages, category pages, structured data, and site architecture.',category:'Technical SEO',date:'2026-07-12'},
  {slug:'competitor-seo-analysis',title:'How to Do a Competitor SEO Analysis (Step-by-Step Guide)',desc:'Reverse-engineer what makes your competitors rank. Learn how to analyze their keywords, backlinks, content, and technical SEO to find gaps you can exploit.',category:'SEO Strategy',date:'2026-07-12'},
  {slug:'youtube-seo-guide',title:'YouTube SEO Guide: How to Rank Videos on Google and YouTube in 2026',desc:'Video search is exploding. Learn how to optimize your YouTube videos with the right keywords, metadata, transcripts, and schema to rank on both YouTube and Google.',category:'SEO Strategy',date:'2026-07-12'}
];

const BASE = 'https://azhai-six.vercel.app';

function toRFC822(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return d.toUTCString();
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
xml += '<channel>\n';
xml += '<title>KwordSEO Blog</title>\n';
xml += '<link>' + BASE + '/blog/</link>\n';
xml += '<description>Guides, tutorials, and tips for SEO, content writing, and keyword optimization.</description>\n';
xml += '<language>en</language>\n';
xml += '<lastBuildDate>' + toRFC822(new Date().toISOString().slice(0, 10)) + '</lastBuildDate>\n';
xml += '<atom:link href="' + BASE + '/blog/feed.xml" rel="self" type="application/rss+xml"/>\n';

posts.forEach(function(p) {
  xml += '<item>\n';
  xml += '  <title>' + p.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</title>\n';
  xml += '  <link>' + BASE + '/blog/' + p.slug + '.html</link>\n';
  xml += '  <guid isPermaLink="true">' + BASE + '/blog/' + p.slug + '.html</guid>\n';
  xml += '  <pubDate>' + toRFC822(p.date) + '</pubDate>\n';
  xml += '  <category>' + p.category + '</category>\n';
  xml += '  <description>' + p.desc.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</description>\n';
  xml += '</item>\n';
});

xml += '</channel>\n';
xml += '</rss>';

const outPath = path.join(__dirname, 'public', 'blog', 'feed.xml');
fs.mkdirSync(path.dirname(outPath), {recursive: true});
fs.writeFileSync(outPath, xml, 'utf8');
console.log('RSS feed generated: ' + outPath);
console.log('Total items: ' + posts.length);
