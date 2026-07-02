const fs = require('fs');
const path = require('path');

try {

const tools = [
    'word-counter','char-counter','sentence-counter','paragraph-counter','word-frequency',
    'case-converter','remove-spaces','find-replace','line-sorter','alpha-sorter',
    'text-reverser','duplicate-remover','lorem-generator','slug-generator',
    'keyword-density','keyword-extract','meta-gen','meta-desc-gen','og-generator',
    'canonical-gen','robots-txt','sitemap-gen',
    'json-formatter','json-validator','xml-formatter','xml-validator',
    'markdown-editor','markdown-preview','html-previewer','regex-tester',
    'url-encoder','url-decoder','html-encoder','html-decoder',
    'b64-encoder','b64-decoder','hash-generator'
];

const toolSEO = {
"word-counter":{title:"Word Counter - Free Online Word Count Tool",desc:"Count words, characters, lines, sentences and paragraphs instantly with our free online word counter. Fast, accurate, no sign-up.",keywords:"word counter, word count, word count tool, free word counter"},
"char-counter":{title:"Character Counter - Free Online Character Count Tool",desc:"Count characters with and without spaces, words, and lines. Free online character counter for any text.",keywords:"character counter, char count, character count tool"},
"sentence-counter":{title:"Sentence Counter - Count Sentences in Text",desc:"Count sentences in any text by detecting punctuation boundaries. Free online sentence counter tool.",keywords:"sentence counter, count sentences, sentence count"},
"paragraph-counter":{title:"Paragraph Counter - Count Paragraphs in Text",desc:"Count paragraphs by detecting empty line breaks. Free online paragraph counter tool.",keywords:"paragraph counter, count paragraphs, paragraph count"},
"word-frequency":{title:"Word Frequency Counter - Count Word Occurrences",desc:"Analyze word occurrence frequency and distribution in your text. Free online word frequency counter.",keywords:"word frequency, word count, word occurrences, text analysis"},
"case-converter":{title:"Case Converter - Convert Text Case Online",desc:"Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and toggleCase instantly.",keywords:"case converter, text case, uppercase lowercase, title case"},
"remove-spaces":{title:"Remove Spaces - Remove Extra Whitespace",desc:"Remove leading, trailing, and extra whitespace from text. Free online space remover tool.",keywords:"remove spaces, extra spaces, whitespace remover"},
"find-replace":{title:"Find and Replace - Text Search and Replace",desc:"Find and replace text with regex support and case-insensitive options. Free online find replace tool.",keywords:"find and replace, search and replace, text replace"},
"line-sorter":{title:"Line Sorter - Sort Lines of Text",desc:"Sort lines of text alphabetically in ascending or descending order. Free online line sorter.",keywords:"line sorter, sort lines, text sort"},
"alpha-sorter":{title:"Alphabetical Sorter - Sort Text A-Z",desc:"Sort text lines in strict alphabetical order. Free online alphabetical sorter.",keywords:"alphabetical sorter, sort alphabetically, a-z sort"},
"text-reverser":{title:"Text Reverser - Reverse Text Online",desc:"Reverse text by characters, words, or lines with one click. Free online text reverser.",keywords:"text reverser, reverse text, backwards text"},
"duplicate-remover":{title:"Duplicate Line Remover - Remove Duplicate Lines",desc:"Remove duplicate lines from text with case-insensitive option. Free online duplicate remover.",keywords:"duplicate remover, remove duplicates, deduplicate text"},
"lorem-generator":{title:"Lorem Ipsum Generator - Generate Dummy Text",desc:"Generate Lorem Ipsum placeholder text with custom paragraph count. Free online lorem generator.",keywords:"lorem generator, lorem ipsum, dummy text, placeholder text"},
"slug-generator":{title:"URL Slug Generator - Create SEO-Friendly Slugs",desc:"Convert titles to URL-friendly slugs instantly. Free online slug generator.",keywords:"slug generator, url slug, seo slug, permalink generator"},
"keyword-density":{title:"Keyword Density Checker - Analyze Keyword Usage",desc:"Calculate keyword frequency and density percentage for SEO. Free online keyword density analyzer.",keywords:"keyword density, keyword density checker, seo keyword density"},
"keyword-extract":{title:"Keyword Extractor - Extract Keywords from Text",desc:"Extract the most frequent keywords from text for SEO analysis. Free online keyword extractor.",keywords:"keyword extractor, extract keywords, keyword analysis"},
"meta-gen":{title:"Meta Tag Generator - Generate SEO Meta Tags",desc:"Generate complete HTML meta tags including OG and Twitter cards. Free online meta tag generator.",keywords:"meta tag generator, meta tags, seo meta, html meta tags"},
"meta-desc-gen":{title:"Meta Description Generator - Create Meta Descriptions",desc:"Generate SEO-optimized meta descriptions from your content. Free online meta description generator.",keywords:"meta description generator, seo description, meta tag generator"},
"og-generator":{title:"Open Graph Tag Generator - Create OG Meta Tags",desc:"Generate Open Graph meta tags for social media sharing. Free online OG tag generator.",keywords:"open graph, og tags, social media tags, facebook meta tags"},
"canonical-gen":{title:"Canonical URL Generator - Generate Canonical Tags",desc:"Generate canonical link tags for SEO. Free online canonical tag generator.",keywords:"canonical url, canonical tag, seo canonical"},
"robots-txt":{title:"Robots.txt Generator - Create Robots.txt File",desc:"Generate robots.txt with crawl directives, disallow rules, and sitemap reference. Free online generator.",keywords:"robots.txt, robots.txt generator, crawl rules, sitemap"},
"sitemap-gen":{title:"Sitemap Generator - Create XML Sitemap",desc:"Generate XML sitemaps for search engine indexing. Free online sitemap generator.",keywords:"sitemap generator, xml sitemap, seo sitemap"},
"json-formatter":{title:"JSON Formatter - Format and Validate JSON",desc:"Beautify and validate JSON with customizable indentation. Free online JSON formatter.",keywords:"json formatter, format json, json beautifier, json validator"},
"json-validator":{title:"JSON Validator - Validate JSON Syntax",desc:"Validate JSON syntax and structure instantly. Free online JSON validator.",keywords:"json validator, validate json, json syntax check"},
"xml-formatter":{title:"XML Formatter - Format and Pretty-Print XML",desc:"Pretty-print and indent XML documents. Free online XML formatter.",keywords:"xml formatter, format xml, xml beautifier, xml pretty print"},
"xml-validator":{title:"XML Validator - Validate XML Structure",desc:"Validate XML structure and syntax. Free online XML validator.",keywords:"xml validator, validate xml, xml syntax check"},
"markdown-editor":{title:"Markdown Editor - Write Markdown with Live Preview",desc:"Write Markdown with live HTML preview side by side. Free online Markdown editor.",keywords:"markdown editor, markdown preview, live markdown, markdown online"},
"markdown-preview":{title:"Markdown Preview - Convert Markdown to HTML",desc:"Convert Markdown to HTML output instantly. Free online Markdown preview tool.",keywords:"markdown preview, markdown to html, markdown converter"},
"html-previewer":{title:"HTML Previewer - Live HTML Code Preview",desc:"Preview HTML code with live rendering in browser. Free online HTML previewer.",keywords:"html previewer, html preview, live html viewer"},
"regex-tester":{title:"Regex Tester - Test Regular Expressions",desc:"Test regular expressions with match highlighting. Free online regex tester.",keywords:"regex tester, regular expression tester, regex test"},
"url-encoder":{title:"URL Encoder - Encode URLs Online",desc:"Encode special characters for URLs instantly. Free online URL encoder.",keywords:"url encoder, percent encoding, encode url"},
"url-decoder":{title:"URL Decoder - Decode URL Strings",desc:"Decode percent-encoded URL strings back to readable text. Free online URL decoder.",keywords:"url decoder, decode url, percent decode"},
"html-encoder":{title:"HTML Encoder - Escape HTML Entities",desc:"Escape HTML special characters to entities. Free online HTML encoder.",keywords:"html encoder, html entities, encode html"},
"html-decoder":{title:"HTML Decoder - Decode HTML Entities",desc:"Decode HTML entities back to readable text. Free online HTML decoder.",keywords:"html decoder, decode html, unescape html"},
"b64-encoder":{title:"Base64 Encoder - Encode Text to Base64",desc:"Encode text to Base64 format instantly. Free online Base64 encoder.",keywords:"base64 encode, base64 encoder, encode base64"},
"b64-decoder":{title:"Base64 Decoder - Decode Base64 to Text",desc:"Decode Base64 strings back to original text. Free online Base64 decoder.",keywords:"base64 decode, base64 decoder, decode base64"},
"hash-generator":{title:"Hash Generator - Generate Text Hashes",desc:"Generate djb2 and FNV-1a hashes from text. Free online hash generator.",keywords:"hash generator, djb2, fnv1a, text hash"}
};

const templatePath = path.join(__dirname, 'tools', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const baseUrl = 'https://azhai-six.vercel.app';

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

tools.forEach(toolId => {
    const seo = toolSEO[toolId] || {title:'Tool',desc:'',keywords:''};
    const toolUrl = baseUrl + '/tools/' + toolId + '.html';
    let html = template;

    html = html.replace('<title id="page-title">Tool - Free AI Text Tools</title>',
        '<title id="page-title">'+esc(seo.title)+'</title>');
    html = html.replace('<meta id="meta-desc" name="description" content="">',
        '<meta id="meta-desc" name="description" content="'+esc(seo.desc)+'">');
    html = html.replace('<meta id="meta-keywords" name="keywords" content="">',
        '<meta id="meta-keywords" name="keywords" content="'+esc(seo.keywords)+'">');
    html = html.replace('<link rel="canonical" id="canonical-link" href="">',
        '<link rel="canonical" id="canonical-link" href="'+toolUrl+'">');
    html = html.replace('<meta property="og:title" id="og-title" content="">',
        '<meta property="og:title" id="og-title" content="'+esc(seo.title)+'">');
    html = html.replace('<meta property="og:description" id="og-desc" content="">',
        '<meta property="og:description" id="og-desc" content="'+esc(seo.desc)+'">');
    html = html.replace('<meta property="og:url" id="og-url" content="">',
        '<meta property="og:url" id="og-url" content="'+toolUrl+'">');
    html = html.replace('<meta name="twitter:title" id="tw-title" content="">',
        '<meta name="twitter:title" id="tw-title" content="'+esc(seo.title)+'">');
    html = html.replace('<meta name="twitter:description" id="tw-desc" content="">',
        '<meta name="twitter:description" id="tw-desc" content="'+esc(seo.desc)+'">');

    if (toolId === 'markdown-editor' || toolId === 'markdown-preview') {
        html = html.replace('</head>', '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>\n</head>');
    }

    const filePath = path.join(__dirname, 'tools', toolId + '.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Created: tools/' + toolId + '.html');
});

console.log('\nBuild complete! ' + tools.length + ' tool pages generated.');

} catch(err) { console.error('Build failed:', err.message); process.exit(1); }
