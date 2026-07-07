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
    'b64-encoder','b64-decoder','hash-generator',
    'hreflang-gen','schema-gen','faq-schema-gen','article-schema-gen','breadcrumb-schema-gen',
    'pdf-to-word','word-to-pdf'
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
"hash-generator":{title:"Hash Generator - Generate Text Hashes",desc:"Generate djb2 and FNV-1a hashes from text. Free online hash generator.",keywords:"hash generator, djb2, fnv1a, text hash"},
"hreflang-gen":{title:"Hreflang Tag Generator - Multilingual SEO Tags",desc:"Generate hreflang link tags for multilingual websites. Free online hreflang generator for SEO.",keywords:"hreflang generator, hreflang tag, multilingual seo, international seo"},
"schema-gen":{title:"Schema Markup Generator - JSON-LD Structured Data",desc:"Generate JSON-LD structured data for Articles, FAQs, Breadcrumbs, Products, and Local Businesses. Free online schema generator.",keywords:"schema generator, json-ld, structured data, schema markup, rich results"},
"faq-schema-gen":{title:"FAQ Schema Generator - FAQ Structured Data",desc:"Generate FAQ structured data for Google rich results. Free online FAQ schema generator.",keywords:"faq schema, faq structured data, faq rich results, faq json-ld"},
"article-schema-gen":{title:"Article Schema Generator - Article Structured Data",desc:"Generate Article structured data for blog posts and news. Free online article schema generator.",keywords:"article schema, article structured data, blog schema, news schema"},
"breadcrumb-schema-gen":{title:"Breadcrumb Schema Generator - Breadcrumb Structured Data",desc:"Generate BreadcrumbList structured data for site navigation. Free online breadcrumb schema generator.",keywords:"breadcrumb schema, breadcrumb structured data, navigation schema, breadcrumb json-ld"},
"pdf-to-word":{title:"PDF to Word Converter - Convert PDF to DOCX Online",desc:"Convert PDF files to editable Word documents instantly. Free online PDF to Word converter. No sign-up, no data upload.",keywords:"pdf to word, pdf to docx, convert pdf, pdf converter, pdf to document"},
"word-to-pdf":{title:"Word to PDF Converter - Convert DOCX to PDF Online",desc:"Convert Word documents to PDF files instantly. Free online Word to PDF converter. No sign-up, no data upload.",keywords:"word to pdf, docx to pdf, convert word, word converter, docx to pdf"}
};

const templatePath = path.join(__dirname, 'tools', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const baseUrl = 'https://azhai-six.vercel.app';
const outDir = path.join(__dirname, 'public', 'tools');
fs.mkdirSync(outDir, { recursive: true });

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

const toolContent = {
'word-counter':{about:'Count words, characters, sentences, paragraphs, and lines in any text. Paste your text and get instant results.',howTo:'Paste or type your text in the input area. Click Process to see word count, character count, sentence count, and more. Use the Clean button to trim extra whitespace before counting.',faq:[{q:'How accurate is the word counter?',a:'Our word counter uses precise whitespace-delimited tokenization. It counts real words, not spaces or characters.'},{q:'Does it count words in different languages?',a:'Yes. The counter works with any language that uses spaces between words, including English, Spanish, French, German, and more.'}]},
'char-counter':{about:'Count characters with and without spaces, words, sentences, and lines. Perfect for meeting character limits on social media and forms.',howTo:'Paste your text and click Process. See character count with spaces, without spaces, word count, and line count.'},
'sentence-counter':{about:'Count sentences in any text by detecting period, question mark, and exclamation boundaries.',howTo:'Paste your text and click Process. The tool detects sentence boundaries using punctuation marks.'},
'paragraph-counter':{about:'Count paragraphs by detecting empty line breaks in your text.',howTo:'Paste your text and click Process. Paragraphs are separated by blank lines.'},
'word-frequency':{about:'Analyze word occurrence frequency and distribution. Find the most common words in your text.',howTo:'Paste your text and click Process. See a frequency table sorted by word count.'},
'case-converter':{about:'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and toggleCase.',howTo:'Paste your text, select the desired case, and click Process. Results are instant.'},
'remove-spaces':{about:'Remove leading, trailing, and extra whitespace from text. Clean up messy copy-pasted content.',howTo:'Paste your text and choose what to remove: leading spaces, trailing spaces, extra spaces, or all spaces.'},
'find-replace':{about:'Find and replace text with regex support and case-insensitive options.',howTo:'Enter the text to find, the replacement text, and click Replace. Enable regex or case-insensitive options as needed.'},
'line-sorter':{about:'Sort lines of text alphabetically in ascending or descending order.',howTo:'Paste your text, choose ascending or descending, and click Sort.'},
'alpha-sorter':{about:'Sort text lines in strict alphabetical order. Perfect for organizing lists.',howTo:'Paste your list, choose A-Z or Z-A, and click Sort.'},
'text-reverser':{about:'Reverse text by characters, words, or lines with one click.',howTo:'Paste your text, choose reversal mode (characters, words, or lines), and click Reverse.'},
'duplicate-remover':{about:'Remove duplicate lines from text with case-insensitive option.',howTo:'Paste your text, choose case-sensitive or case-insensitive, and click Remove Duplicates.'},
'lorem-generator':{about:'Generate Lorem Ipsum placeholder text with custom paragraph count.',howTo:'Select the number of paragraphs and click Generate. Copy the output.'},
'slug-generator':{about:'Convert titles to URL-friendly slugs instantly. Perfect for SEO-friendly URLs.',howTo:'Enter your title and click Generate. The slug is ready to copy.'},
'keyword-density':{about:'Calculate keyword frequency and density percentage for SEO analysis.',howTo:'Paste your content and click Analyze. See keyword counts, density %, and a visual chart.'},
'keyword-extract':{about:'Extract the most frequent keywords from text for SEO analysis.',howTo:'Paste your content and click Extract. See keywords ranked by frequency.'},
'meta-gen':{about:'Generate complete HTML meta tags including title, description, OG tags, and Twitter cards.',howTo:'Enter your page title, description, and URL. Click Generate to get copy-paste ready meta tags.'},
'meta-desc-gen':{about:'Generate SEO-optimized meta descriptions from your content.',howTo:'Paste your page content and click Generate. Get a 155-character meta description.'},
'og-generator':{about:'Generate Open Graph meta tags for social media sharing on Facebook, LinkedIn, and Twitter.',howTo:'Enter your page details and click Generate. Copy the OG tags to your HTML head.'},
'canonical-gen':{about:'Generate canonical link tags for SEO to prevent duplicate content issues.',howTo:'Enter your page URL and click Generate. Add the canonical tag to your HTML head.'},
'robots-txt':{about:'Generate robots.txt with crawl directives, disallow rules, and sitemap reference.',howTo:'Configure your crawl rules and click Generate. Download or copy the robots.txt file.'},
'sitemap-gen':{about:'Generate XML sitemaps for search engine indexing.',howTo:'Add your URLs and click Generate. Download the XML sitemap.'},
'json-formatter':{about:'Beautify and validate JSON with customizable indentation.',howTo:'Paste your JSON and click Format. Choose indent size and style.'},
'json-validator':{about:'Validate JSON syntax and structure instantly.',howTo:'Paste your JSON and click Validate. See errors highlighted.'},
'xml-formatter':{about:'Pretty-print and indent XML documents.',howTo:'Paste your XML and click Format. Choose indent size.'},
'xml-validator':{about:'Validate XML structure and syntax.',howTo:'Paste your XML and click Validate. See errors with line numbers.'},
'markdown-editor':{about:'Write Markdown with live HTML preview side by side.',howTo:'Write Markdown on the left, see live preview on the right.'},
'markdown-preview':{about:'Convert Markdown to HTML output instantly.',howTo:'Paste Markdown and get HTML output instantly.'},
'html-previewer':{about:'Preview HTML code with live rendering in browser.',howTo:'Write or paste HTML on the left, see rendered output on the right.'},
'regex-tester':{about:'Test regular expressions with match highlighting.',howTo:'Enter your regex pattern and test string. See matches highlighted in real time.'},
'url-encoder':{about:'Encode special characters for URLs instantly.',howTo:'Paste your URL and click Encode. Copy the encoded result.'},
'url-decoder':{about:'Decode percent-encoded URL strings back to readable text.',howTo:'Paste your encoded URL and click Decode.'},
'html-encoder':{about:'Escape HTML special characters to entities.',howTo:'Paste your HTML and click Encode. Copy the escaped output.'},
'html-decoder':{about:'Decode HTML entities back to readable text.',howTo:'Paste your HTML entities and click Decode.'},
'b64-encoder':{about:'Encode text to Base64 format instantly.',howTo:'Paste your text and click Encode. Copy the Base64 string.'},
'b64-decoder':{about:'Decode Base64 strings back to original text.',howTo:'Paste your Base64 string and click Decode.'},
'hash-generator':{about:'Generate djb2 and FNV-1a hashes from text.',howTo:'Paste your text and click Generate. See both hash values.'},
'hreflang-gen':{about:'Generate hreflang link tags for multilingual websites.',howTo:'Enter your page URL and language codes. Click Generate to get hreflang tags.'},
'schema-gen':{about:'Generate JSON-LD structured data for Articles, FAQs, Breadcrumbs, Products, and Local Businesses.',howTo:'Select schema type, fill in the fields, and click Generate. Copy the JSON-LD to your HTML.'},
'faq-schema-gen':{about:'Generate FAQ structured data for Google rich results.',howTo:'Add your Q&A pairs and click Generate. Copy the FAQPage JSON-LD.'},
'article-schema-gen':{about:'Generate Article structured data for blog posts and news.',howTo:'Enter article details and click Generate. Copy the Article JSON-LD.'},
'breadcrumb-schema-gen':{about:'Generate BreadcrumbList structured data for site navigation.',howTo:'Add your breadcrumb levels and click Generate. Copy the BreadcrumbList JSON-LD.'},
'pdf-to-word':{about:'Convert PDF files to editable Word documents. Extract text from PDF and create a downloadable DOCX file.',howTo:'Click Upload and select your PDF file. The tool extracts all text from the PDF. Click Download to save as a Word document. Your files never leave your browser.'},
'word-to-pdf':{about:'Convert Word documents to PDF files. Read DOCX content and generate a printable PDF output.',howTo:'Click Upload and select your Word document. The tool converts it to HTML. Click Print as PDF to save as a PDF file. Your files never leave your browser.'}
};

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

    if (toolId === 'pdf-to-word') {
        html = html.replace('</head>',
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js" defer></script>\n'+
            '<script src="https://cdn.jsdelivr.net/npm/docx@8.2.3/build/index.umd.js" defer></script>\n'+
            '<script src="https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js" defer></script>\n</head>');
    }

    if (toolId === 'word-to-pdf') {
        html = html.replace('</head>',
            '<script src="https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js" defer></script>\n</head>');
    }

    var tc = toolContent[toolId];
    if (tc) {
        var contentHtml = '<section class="tool-content-section" style="margin-top:40px;padding:32px 0;border-top:1px solid var(--border)">';
        contentHtml += '<div style="max-width:720px">';
        contentHtml += '<h2 style="font-size:1.25rem;font-weight:700;margin-bottom:12px;color:var(--text)">What is ' + esc(seo.title.split(' - ')[0]) + '?</h2>';
        contentHtml += '<p style="color:var(--text-2);line-height:1.7;margin-bottom:20px">' + esc(tc.about) + '</p>';
        contentHtml += '<h2 style="font-size:1.25rem;font-weight:700;margin-bottom:12px;color:var(--text)">How to Use ' + esc(seo.title.split(' - ')[0]) + '</h2>';
        contentHtml += '<p style="color:var(--text-2);line-height:1.7;margin-bottom:20px">' + esc(tc.howTo) + '</p>';
        if (tc.faq && tc.faq.length) {
            contentHtml += '<h2 style="font-size:1.25rem;font-weight:700;margin-bottom:12px;color:var(--text)">Frequently Asked Questions</h2>';
            tc.faq.forEach(function(f) {
                contentHtml += '<div style="margin-bottom:16px">';
                contentHtml += '<h3 style="font-size:1rem;font-weight:600;margin-bottom:4px;color:var(--text)">' + esc(f.q) + '</h3>';
                contentHtml += '<p style="color:var(--text-2);line-height:1.6;margin:0">' + esc(f.a) + '</p>';
                contentHtml += '</div>';
            });
        }
        contentHtml += '</div></section>';
        html = html.replace('</main>', contentHtml + '\n</main>');
    }

    const filePath = path.join(outDir, toolId + '.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Created: public/tools/' + toolId + '.html');
});

console.log('\nBuild complete! ' + tools.length + ' tool pages generated.');

} catch(err) { console.error('Build failed:', err.message); process.exit(1); }
