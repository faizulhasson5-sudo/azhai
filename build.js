// Build script: generates individual tool HTML files from template.html
// Injects static meta tags at build time for SEO (crawlers see correct content without JS)
// Run: node build.js

const fs = require('fs');
const path = require('path');

const tools = [
    'duplicate-remover','word-counter','char-counter','sentence-counter','paragraph-counter',
    'case-converter','remove-spaces','line-sorter','alpha-sorter','text-reverser',
    'url-encoder','url-decoder','html-encoder','html-decoder','b64-encoder','b64-decoder',
    'json-formatter','json-validator','xml-formatter','xml-validator','markdown-editor','markdown-preview',
    'robots-txt','sitemap-gen','meta-gen','og-generator','slug-generator','meta-desc-gen',
    'canonical-gen','keyword-density','keyword-extract',
    'find-replace','regex-tester','html-previewer',
    'hash-generator','lorem-generator','word-frequency'
];

const toolSEO = {
"word-counter":{title:"Word Counter - Free Online Word Count Tool",desc:"Count words, characters, lines, sentences and paragraphs instantly with our free online word counter tool. Fast, accurate, and easy to use.",keywords:"word counter, word count, word count tool, free word counter, online word count"},
"char-counter":{title:"Character Counter - Free Online Character Count Tool",desc:"Count characters, words, and lines in your text with this free character counter tool. Supports character count with and without spaces.",keywords:"character counter, char count, character count tool, character count online"},
"case-converter":{title:"Case Converter - Convert Text Case Online",desc:"Convert text between UPPERCASE, lowercase, Title Case, and Sentence case instantly. Free online case converter tool.",keywords:"case converter, text case, uppercase lowercase, title case, sentence case"},
"duplicate-remover":{title:"Duplicate Line Remover - Remove Duplicate Lines",desc:"Remove duplicate lines from text instantly. Supports case-insensitive duplicate removal. Free online duplicate remover tool.",keywords:"duplicate remover, remove duplicates, remove duplicate lines, deduplicate text"},
"line-sorter":{title:"Line Sorter - Sort Lines of Text Online",desc:"Sort lines of text alphabetically, reverse sort, or sort by length. Free online line sorting tool for any text.",keywords:"line sorter, sort lines, sort text lines, alphabetical sort"},
"alpha-sorter":{title:"Alphabetical Sorter - Sort Text Alphabetically",desc:"Sort text lines in alphabetical order with options for case-insensitive and reverse sorting. Free online alphabetical sorter.",keywords:"alphabetical sorter, sort alphabetically, alphabetical sort tool, a-z sort"},
"text-reverser":{title:"Text Reverser - Reverse Text Online",desc:"Reverse text by characters, words, or lines with one click. Free online text reverser tool that works instantly in your browser.",keywords:"text reverser, reverse text, backwards text, reverse words, reverse lines"},
"sentence-counter":{title:"Sentence Counter - Count Sentences in Text",desc:"Count the number of sentences in any text. Free online sentence counter with accurate detection of sentence boundaries.",keywords:"sentence counter, count sentences, sentence count tool, how many sentences"},
"paragraph-counter":{title:"Paragraph Counter - Count Paragraphs in Text",desc:"Count paragraphs in your text instantly. Free online paragraph counter tool that handles empty lines and spacing.",keywords:"paragraph counter, count paragraphs, paragraph count, how many paragraphs"},
"find-replace":{title:"Find and Replace - Text Search and Replace Tool",desc:"Find and replace text in your content instantly. Supports case-sensitive search and regex. Free online find and replace tool.",keywords:"find and replace, search and replace, text replace, find replace tool"},
"regex-tester":{title:"Regex Tester - Test Regular Expressions Online",desc:"Test and debug regular expressions with real-time matching. Free online regex tester with pattern highlighting and capture groups.",keywords:"regex tester, regular expression tester, regex test, regex online, pattern matching"},
"markdown-preview":{title:"Markdown Preview - Live Markdown Editor",desc:"Write and preview Markdown in real-time with live HTML rendering. Free online Markdown editor and preview tool.",keywords:"markdown preview, markdown editor, markdown viewer, live markdown, markdown online"},
"html-previewer":{title:"HTML Previewer - Live HTML Code Preview",desc:"Preview HTML code in real-time with live rendering. Free online HTML previewer for testing and debugging markup.",keywords:"html previewer, html preview, live html viewer, html code preview, render html"},
"json-formatter":{title:"JSON Formatter - Format and Validate JSON Online",desc:"Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax validation and indentation.",keywords:"json formatter, format json, json beautifier, json validator, json pretty print"},
"xml-formatter":{title:"XML Formatter - Format and Validate XML Online",desc:"Format and beautify XML data with proper indentation. Free online XML formatter and validator tool.",keywords:"xml formatter, format xml, xml beautifier, xml validator, xml pretty print"},
"url-encoder":{title:"URL Encoder - Encode and Decode URLs Online",desc:"Encode and decode URLs and URL parameters instantly. Free online URL encoder and decoder tool.",keywords:"url encoder, url decode, percent encoding, url encode decode, encode url"},
"url-decoder":{title:"URL Decoder - Decode URL Encoded Strings",desc:"Decode URL encoded strings back to readable text. Free online URL decoder tool for percent-encoded data.",keywords:"url decoder, decode url, percent decode, url decode online"},
"html-encoder":{title:"HTML Encoder - Encode and Decode HTML Entities",desc:"Encode and decode HTML entities and special characters. Free online HTML encoder and decoder tool.",keywords:"html encoder, html decode, html entities, encode html, html special characters"},
"html-decoder":{title:"HTML Decoder - Decode HTML Entities to Text",desc:"Decode HTML entities back to readable text. Free online HTML decoder for &amp; entities, &lt; tags, and more.",keywords:"html decoder, decode html, html entities decoder, unescape html"},
"b64-encoder":{title:"Base64 Encoder - Encode Text to Base64 Online",desc:"Encode text to Base64 format instantly. Free online Base64 encoder for strings, URLs, and data.",keywords:"base64 encode, base64 encoder, encode base64, base64 convert"},
"b64-decoder":{title:"Base64 Decoder - Decode Base64 to Text Online",desc:"Decode Base64 encoded strings back to original text. Free online Base64 decoder tool.",keywords:"base64 decode, base64 decoder, decode base64, base64 to text"},
"hash-generator":{title:"Hash Generator - Generate MD5 SHA1 SHA256 Hashes",desc:"Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. Free online hash generator tool.",keywords:"hash generator, md5 hash, sha1 hash, sha256 hash, hash calculator"},
"lorem-generator":{title:"Lorem Ipsum Generator - Generate Dummy Text",desc:"Generate Lorem Ipsum placeholder text with custom paragraphs and words. Free online Lorem Ipsum generator.",keywords:"lorem generator, lorem ipsum, dummy text, placeholder text, filler text"},
"word-frequency":{title:"Word Frequency Counter - Count Word Occurrences",desc:"Analyze word frequency and count occurrences in your text. Free online word frequency counter and text analyzer.",keywords:"word frequency, word count, word occurrences, text analysis, frequency counter"},
"keyword-density":{title:"Keyword Density Checker - Analyze Keyword Usage",desc:"Check keyword density in your text with percentage breakdown. Free online keyword density analyzer for SEO.",keywords:"keyword density, keyword density checker, keyword analysis, seo keyword density"},
"keyword-extract":{title:"Keyword Extractor - Extract Keywords from Text",desc:"Extract top keywords and phrases from any text for SEO analysis. Free online keyword extraction tool.",keywords:"keyword extractor, extract keywords, keyword analysis, text keywords"},
"slug-generator":{title:"URL Slug Generator - Create SEO-Friendly Slugs",desc:"Generate clean, SEO-friendly URL slugs from any text. Free online slug generator with automatic formatting.",keywords:"slug generator, url slug, seo slug, permalink generator, clean url"},
"meta-desc-gen":{title:"Meta Description Generator - Create Meta Descriptions",desc:"Generate optimized meta descriptions for SEO from your content. Free online meta description generator tool.",keywords:"meta description generator, meta description, seo description, meta tag generator"},
"canonical-gen":{title:"Canonical URL Generator - Generate Canonical Tags",desc:"Generate canonical URL tags for SEO optimization. Free online canonical tag generator for duplicate content prevention.",keywords:"canonical url, canonical tag, canonical generator, seo canonical, duplicate content"},
"og-generator":{title:"Open Graph Tag Generator - Create OG Meta Tags",desc:"Generate Open Graph meta tags for social media sharing. Free online OG tag generator for Facebook, Twitter, and more.",keywords:"open graph, og tags, og meta, social media tags, facebook meta tags"},
"meta-gen":{title:"Meta Tag Generator - Generate SEO Meta Tags",desc:"Generate complete HTML meta tags for SEO optimization. Free online meta tag generator with title, description, keywords, and Open Graph.",keywords:"meta tag generator, meta tags, seo meta, html meta tags, meta tag creator"},
"robots-txt":{title:"Robots.txt Generator - Create Robots.txt File",desc:"Generate robots.txt file for your website with proper crawl directives. Free online robots.txt generator tool.",keywords:"robots.txt, robots.txt generator, crawl rules, sitemap, robots file"},
"sitemap-gen":{title:"Sitemap Generator - Create XML Sitemap",desc:"Generate XML sitemaps for your website to improve search engine indexing. Free online sitemap generator tool.",keywords:"sitemap generator, xml sitemap, sitemap creator, search engine sitemap, seo sitemap"}
};

const templatePath = path.join(__dirname, 'tools', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const baseUrl = 'https://azhai-six.vercel.app';

tools.forEach(toolId => {
    const seo = toolSEO[toolId] || {title:'Tool',desc:'',keywords:''};
    const toolUrl = baseUrl + '/tools/' + toolId + '.html';
    const toolName = seo.title.split(' - ')[0];

    let html = template;

    // Inject static <title>
    html = html.replace(
        '<title id="page-title">Tool - Free AI Text Tools</title>',
        '<title id="page-title">' + escapeAttr(seo.title) + '</title>'
    );

    // Inject static meta description
    html = html.replace(
        '<meta id="meta-desc" content="">',
        '<meta id="meta-desc" content="' + escapeAttr(seo.desc) + '">'
    );

    // Inject static meta keywords
    html = html.replace(
        '<meta id="meta-keywords" content="">',
        '<meta id="meta-keywords" content="' + escapeAttr(seo.keywords) + '">'
    );

    // Inject static canonical URL
    html = html.replace(
        '<link rel="canonical" id="canonical-link" href="">',
        '<link rel="canonical" id="canonical-link" href="' + toolUrl + '">'
    );

    // Inject static OG tags
    html = html.replace(
        '<meta property="og:title" id="og-title" content="">',
        '<meta property="og:title" id="og-title" content="' + escapeAttr(seo.title) + '">'
    );
    html = html.replace(
        '<meta property="og:description" id="og-desc" content="">',
        '<meta property="og:description" id="og-desc" content="' + escapeAttr(seo.desc) + '">'
    );
    html = html.replace(
        '<meta property="og:url" id="og-url" content="">',
        '<meta property="og:url" id="og-url" content="' + toolUrl + '">'
    );

    // Inject static Twitter tags
    html = html.replace(
        '<meta name="twitter:card" content="summary">',
        '<meta name="twitter:card" content="summary_large_image">'
    );

    
    // Fix 4.4: Conditionally load marked.js (only for markdown tools)
    if (toolId === 'markdown-editor' || toolId === 'markdown-preview') {
        html = html.replace('</head>', '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>\n</head>');
    }
    const filePath = path.join(__dirname, 'tools', toolId + '.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Created: tools/' + toolId + '.html');
});

console.log('\nBuild complete! ' + tools.length + ' tool pages generated with static meta tags.');

function escapeAttr(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}