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
  {slug:'xml-sitemap-guide-seo',title:'XML Sitemap Guide: How to Create and Submit Your Sitemap for SEO',desc:'An XML sitemap helps search engines discover and index your pages faster. Learn how to create and submit yours.',category:'Technical SEO',date:'2026-07-08'}
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
