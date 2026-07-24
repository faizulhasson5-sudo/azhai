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
    'pdf-to-word','word-to-pdf',
    'ai-content-detector','ai-humanizer','ai-prompt-gen',
    'readability-score'
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
"word-to-pdf":{title:"Word to PDF Converter - Convert DOCX to PDF Online",desc:"Convert Word documents to PDF files instantly. Free online Word to PDF converter. No sign-up, no data upload.",keywords:"word to pdf, docx to pdf, convert word, word converter, docx to pdf"},
"ai-content-detector":{title:"AI Content Detector - Check if Text is AI Generated",desc:"Detect AI-generated content with our free AI content checker. Analyze text for ChatGPT, GPT-4, Claude, and Gemini patterns. 100% private, runs in your browser.",keywords:"ai content detector, ai checker, detect ai text, ai generated content, chatgpt detector, gpt detector, ai text analyzer"},
"ai-humanizer":{title:"AI Humanizer - Make AI Text Sound Human",desc:"Rewrite AI-generated text to sound natural and human. Free AI humanizer adds contractions, personal voice, and casual tone. 100% private, runs in browser.",keywords:"ai humanizer, humanize ai text, make ai sound human, rewrite ai text, chatgpt humanizer, ai text rewriter, bypass ai detector"},
"ai-prompt-gen":{title:"AI Prompt Generator - Create Perfect ChatGPT & Claude Prompts",desc:"Generate optimized AI prompts for ChatGPT, Claude, and Gemini. Choose from 60+ templates across blogging, marketing, code, and more. Free online prompt engineering tool.",keywords:"ai prompt generator, chatgpt prompts, prompt engineering, ai prompts, chatgpt prompt generator, claude prompts, best ai prompts, prompt template"},
"readability-score":{title:"Readability Score Checker - Free Online Flesch-Kincaid & Gunning Fog Test",desc:"Check your content readability score instantly. Get Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog, SMOG, Coleman-Liau, and ARI scores. Free online readability test for SEO.",keywords:"readability score, readability test, flesch kincaid, gunning fog, smog index, reading level, content readability, readability checker, flesch reading ease"}
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
'keyword-density':{about:'Calculate keyword frequency and density percentage for SEO analysis. Our keyword density checker counts every word, calculates percentages, and shows you exactly how often each keyword appears in your content.',howTo:'Paste your content and click Analyze. See keyword counts, density %, and a visual chart. The tool processes everything in your browser — your content never leaves your device.',faq:[{q:'What is keyword density?',a:'Keyword density is the percentage of times a keyword appears in your content compared to the total word count. For example, if "SEO" appears 10 times in a 1,000-word article, the density is 1%. Learn more in our complete guide to keyword density.'},{q:'What is the ideal keyword density for SEO?',a:'There is no single ideal keyword density. Modern SEO focuses on natural, comprehensive coverage of topics rather than hitting a specific keyword density. Google recommends writing for users, not search engines.'},{q:'Is keyword density still important for SEO in 2026?',a:'Keyword density as a metric is less important than topical coverage. However, checking density helps ensure you are not keyword-stuffing (which Google penalizes) and that your content naturally covers your target topic.'},{q:'How do I use this keyword density tool?',a:'Paste your content into the text area and click Analyze. The tool shows every word, its count, and its density percentage. Use this to audit your content before publishing.'}]},
'keyword-extract':{about:'Extract the most frequent keywords from text for SEO analysis. Identify the top keywords and phrases in any content to understand what search engines will associate with your page.',howTo:'Paste your content and click Extract. See keywords ranked by frequency.'},
'meta-gen':{about:'Generate complete HTML meta tags including title, description, OG tags, and Twitter cards. Get all the SEO and social meta tags you need for any page in one click.',howTo:'Enter your page title, description, and URL. Click Generate to get copy-paste ready meta tags.',faq:[{q:'What are meta tags?',a:'Meta tags are HTML elements in the <head> of your page that provide information to search engines and social platforms. The most important are the title tag, meta description, and Open Graph tags.'},{q:'Why are meta tags important for SEO?',a:'Meta tags help search engines understand your page content. The title tag is a direct ranking factor, and the meta description influences click-through rates from search results.'},{q:'What are Open Graph tags?',a:'Open Graph tags control how your page appears when shared on social media platforms like Facebook, LinkedIn, and Twitter. They define the title, description, and image shown in social previews.'}]},
'meta-desc-gen':{about:'Generate SEO-optimized meta descriptions from your content. Create compelling 155-character descriptions that improve click-through rates from Google search results.',howTo:'Paste your page content and click Generate. Get a 155-character meta description.'},
'og-generator':{about:'Generate Open Graph meta tags for social media sharing on Facebook, LinkedIn, and Twitter. Control exactly how your pages appear when shared on social platforms.',howTo:'Enter your page details and click Generate. Copy the OG tags to your HTML head.'},
'canonical-gen':{about:'Generate canonical link tags for SEO to prevent duplicate content issues. Tell search engines which version of a page is the authoritative one.',howTo:'Enter your page URL and click Generate. Add the canonical tag to your HTML head.',faq:[{q:'What is a canonical tag?',a:'A canonical tag (rel="canonical") tells search engines which URL is the preferred version of a page when duplicate or similar content exists at multiple URLs. It consolidates ranking signals to the correct URL.'},{q:'When do I need a canonical tag?',a:'Use canonical tags when: you have duplicate pages, URL parameters create duplicate content, a page is accessible at multiple URLs, or you syndicate content to other websites.'}]},
'robots-txt':{about:'Generate robots.txt with crawl directives, disallow rules, and sitemap reference. Control how search engine crawlers access your website.',howTo:'Configure your crawl rules and click Generate. Download or copy the robots.txt file.',faq:[{q:'What is robots.txt?',a:'Robots.txt is a file at the root of your website that tells search engine crawlers which pages they can and cannot crawl. It does not block users from accessing pages — it is a voluntary guideline for crawlers.'},{q:'Should I block all pages with robots.txt?',a:'No. Blocking too many pages with robots.txt prevents Google from crawling important content, which hurts SEO. Only block pages that should not be indexed, like admin panels or duplicate content.'}]},
'sitemap-gen':{about:'Generate XML sitemaps for search engine indexing. Help Google discover and crawl all your pages faster.',howTo:'Add your URLs and click Generate. Download the XML sitemap.',faq:[{q:'What is an XML sitemap?',a:'An XML sitemap is a file that lists all the important pages on your website. It helps search engines discover and crawl your pages, especially new or deep pages that might not be found through links alone.'},{q:'How do I submit my sitemap to Google?',a:'Submit your sitemap through Google Search Console. Go to Sitemaps, enter your sitemap URL (e.g., https://yoursite.com/sitemap.xml), and click Submit.'}]},
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
'schema-gen':{about:'Generate JSON-LD structured data for Articles, FAQs, Breadcrumbs, Products, and Local Businesses. Add rich results to your pages for better Google visibility.',howTo:'Select schema type, fill in the fields, and click Generate. Copy the JSON-LD to your HTML.',faq:[{q:'What is JSON-LD structured data?',a:'JSON-LD is a format for adding structured data to your pages. It helps search engines understand your content and can trigger rich results like FAQ dropdowns, recipe cards, and review stars in Google search.'},{q:'Which schema type should I use?',a:'Use Article schema for blog posts, FAQPage schema for FAQ content, Product schema for e-commerce items, and BreadcrumbList schema for site navigation. Choose the type that best describes your page content.'}]},
'faq-schema-gen':{about:'Generate FAQ structured data for Google rich results. Get FAQ dropdowns in Google search by adding FAQPage JSON-LD to your pages.',howTo:'Add your Q&A pairs and click Generate. Copy the FAQPage JSON-LD.'},
'article-schema-gen':{about:'Generate Article structured data for blog posts and news articles. Help Google understand author, date, and publisher information.',howTo:'Enter article details and click Generate. Copy the Article JSON-LD.'},
'breadcrumb-schema-gen':{about:'Generate BreadcrumbList structured data for site navigation. Show breadcrumb trails in Google search results.',howTo:'Add your breadcrumb levels and click Generate. Copy the BreadcrumbList JSON-LD.'},
'pdf-to-word':{about:'Convert PDF files to editable Word documents. Extract text from PDF and create a downloadable DOCX file.',howTo:'Click Upload and select your PDF file. The tool extracts all text from the PDF. Click Download to save as a Word document. Your files never leave your browser.'},
'word-to-pdf':{about:'Convert Word documents to PDF files. Read DOCX content and generate a printable PDF output.',howTo:'Click Upload and select your Word document. The tool converts it to HTML. Click Print as PDF to save as a PDF file. Your files never leave your browser.'},
'ai-content-detector':{about:'Detect whether text was written by a human or generated by AI. Our AI content detector analyzes linguistic patterns including burstiness, vocabulary diversity, transition phrases, and sentence structure to determine the probability of AI generation. Works with ChatGPT, GPT-4, Claude, Gemini, and other AI models.',howTo:'Paste or type your text (minimum 100 words for accurate results) and click Analyze. The tool examines multiple linguistic markers and gives you a human vs AI probability score with a detailed breakdown.',faq:[{q:'How accurate is the AI content detector?',a:'Our detector uses linguistic pattern analysis including burstiness, vocabulary diversity, transition phrase density, and sentence structure uniformity. It provides a probability score, not a definitive verdict. For best results, use texts of 200+ words. No detector is 100% accurate — treat results as one signal among many.'},{q:'What AI models can this detector identify?',a:'The detector analyzes universal linguistic patterns common to all major language models including ChatGPT (GPT-3.5/GPT-4), Claude, Gemini, and Llama. AI models share similar training patterns that produce detectable text characteristics.'},{q:'Why does AI-generated text have different patterns?',a:'AI models are trained to produce statistically likely text, resulting in uniform sentence lengths, overuse of transition words, lack of personal voice, and predictable vocabulary choices. Human writing has more variation (burstiness), personal pronouns, and emotional range.'},{q:'How can I make AI-generated content harder to detect?',a:'Rather than trying to disguise AI content, use AI as a drafting tool and then add your own voice, personal experiences, specific examples, and unique insights. Google rewards original, helpful content regardless of how it was created.'}]},
'ai-humanizer':{about:'Rewrite AI-generated text to sound more human and natural. Our AI humanizer adds contractions, personal voice, varied sentence structure, and casual tone to make ChatGPT, Claude, and Gemini output sound naturally written. 100% private, runs in your browser.',howTo:'Paste your AI-generated text and click Humanize. The tool converts contractions, replaces formal transitions with casual ones, adds personal voice, and varies sentence structure. Copy the humanized text from the output.',faq:[{q:'How does the AI humanizer work?',a:'The humanizer applies multiple transformations: converts formal contractions (it is → it\'s), replaces corporate jargon with simple words (leverage → use), swaps formal transitions (Furthermore → Also), and simplifies complex phrases to sound more conversational.'},{q:'Will the humanized text still make sense?',a:'Yes. The humanizer preserves the original meaning while changing the tone. It focuses on surface-level changes like contractions and word choice rather than restructuring sentences.'},{q:'Can this bypass AI content detectors?',a:'The humanizer is designed to make text sound more natural and conversational. While it reduces some AI markers, no tool can guarantee bypassing all detectors. We recommend using it as a starting point and then adding your own personal experiences and insights.'},{q:'What types of AI text work best?',a:'The humanizer works best on formal, corporate-style AI output that uses heavy jargon, transitions, and formal language. It is most effective on longer texts (200+ words) where there are more opportunities for transformation.'}]},
'ai-prompt-gen':{about:'Generate optimized AI prompts for ChatGPT, Claude, Gemini, and other AI models. Choose from 60+ templates across blogging, marketing, coding, email, social media, education, and business. Customize tone, length, and focus for your exact needs. 100% free, no sign-up required.',howTo:'Select a category (blogging, marketing, code, etc.), then pick a specific template. Adjust tone, length, and any custom context. Click Generate to create your optimized prompt. Copy it to use with ChatGPT, Claude, or any AI tool.',faq:[{q:'What makes a good AI prompt?',a:'Good AI prompts are specific, provide context, define the output format, and include constraints. They tell the AI exactly what you want, who it is for, and how the output should be structured. This tool builds all of those elements into every prompt.'},{q:'Which AI model should I use with these prompts?',a:'These prompts work with ChatGPT (GPT-4, GPT-4o), Claude (Claude 3, Claude 3.5), Gemini, Llama, and any other major AI model. The prompt templates are designed to be effective across all platforms.'},{q:'Can I customize the generated prompts?',a:'Yes. Every generated prompt can be edited after creation. You can also add custom context, specific brand voice, target audience details, or any other requirements before generating.'},{q:'How do I use the generated prompts?',a:'Copy the generated prompt and paste it into ChatGPT, Claude, Gemini, or any AI chatbot. The prompt is formatted and ready to use immediately. You can modify it further based on the AI response.'}]},
'readability-score':{about:'Check your content readability score using 6 industry-standard formulas: Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog, SMOG, Coleman-Liau, and Automated Readability Index. Essential for SEO and content optimization.',howTo:'Paste your text and click Analyze. See readability scores, grade levels, and word/syllable stats. Google recommends a Flesch Reading Ease score of 60+ for web content.',faq:[{q:'What is a good readability score?',a:'A Flesch Reading Ease score of 60-70 is considered standard for web content. Google recommends writing at a level that most people can understand, which typically means Grade 8 or below.'},{q:'Why is readability important for SEO?',a:'Google uses readability as part of its content quality assessment. Content that is easy to read tends to rank better because it provides a better user experience and satisfies search intent.'},{q:'How do I improve my readability score?',a:'Use shorter sentences, simpler words, active voice, and break content into short paragraphs. Avoid jargon and complex sentence structures. Aim for a conversational tone.'}]}
};

const toolModuleMap = {
    'word-counter':'counters','char-counter':'counters','sentence-counter':'counters','paragraph-counter':'counters','word-frequency':'counters',
    'case-converter':'text','remove-spaces':'text','find-replace':'text','line-sorter':'text','alpha-sorter':'text',
    'text-reverser':'text','duplicate-remover':'text','lorem-generator':'text','slug-generator':'text',
    'keyword-density':'seo','keyword-extract':'seo','meta-gen':'seo','meta-desc-gen':'seo','og-generator':'seo',
    'canonical-gen':'seo','robots-txt':'seo','sitemap-gen':'seo','hreflang-gen':'seo','schema-gen':'seo',
    'faq-schema-gen':'seo','article-schema-gen':'seo','breadcrumb-schema-gen':'seo',
    'json-formatter':'code','json-validator':'code','xml-formatter':'code','xml-validator':'code',
    'markdown-editor':'code','markdown-preview':'code','html-previewer':'code','regex-tester':'code','hash-generator':'code',
    'url-encoder':'encoders','url-decoder':'encoders','html-encoder':'encoders','html-decoder':'encoders',
    'b64-encoder':'encoders','b64-decoder':'encoders',
    'pdf-to-word':'converters','word-to-pdf':'converters',
    'ai-content-detector':'ai','ai-humanizer':'ai','ai-prompt-gen':'ai-prompt-gen',
    'readability-score':'readability-score'
};

tools.forEach(toolId => {
    const seo = toolSEO[toolId] || {title:'Tool',desc:'',keywords:''};
    const toolUrl = baseUrl + '/tools/' + toolId + '.html';
    let html = template;

    // Inject per-tool module script
    const moduleName = toolModuleMap[toolId] || 'text';
    html = html.replace('<!--TOOL_MODULE_PLACEHOLDER-->',
        '<script src="/js/tools/' + moduleName + '.js"><\/script>');

    html = html.replace('<title id="page-title">Tool - KwordSEO</title>',
        '<title id="page-title">'+esc(seo.title)+'</title>');

    // Add trending badge to AI tools
    if (['ai-content-detector','ai-humanizer','ai-prompt-gen','readability-score'].includes(toolId)) {
        html = html.replace('<h1 id="toolTitle" style="margin:0">Tool</h1>',
            '<h1 id="toolTitle" style="margin:0">Tool</h1><span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:4px 10px;border-radius:4px;background:var(--accent);color:#fff;vertical-align:middle">Trending</span>');
    }
    html = html.replace('<meta id="meta-desc" name="description" content="">',
        '<meta id="meta-desc" name="description" content="'+esc(seo.desc)+'">');
    html = html.replace('<meta id="meta-keywords" name="keywords" content="">',
        '<meta id="meta-keywords" name="keywords" content="'+esc(seo.keywords)+'">');
    html = html.replace('<link rel="canonical" id="canonical-link" href="">',
        '<link rel="canonical" id="canonical-link" href="'+toolUrl+'">');
    html = html.replace('<link rel="alternate" hreflang="en" href="">',
        '<link rel="alternate" hreflang="en" href="'+toolUrl+'">');
    html = html.replace('<link rel="alternate" hreflang="en-US" href="">',
        '<link rel="alternate" hreflang="en-US" href="'+toolUrl+'">');
    html = html.replace('<link rel="alternate" hreflang="en-GB" href="">',
        '<link rel="alternate" hreflang="en-GB" href="'+toolUrl+'">');
    html = html.replace('<link rel="alternate" hreflang="x-default" href="">',
        '<link rel="alternate" hreflang="x-default" href="'+toolUrl+'">');
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

    // BreadcrumbList schema
    var breadcrumbSchema = JSON.stringify({
        "@context":"https://schema.org",
        "@type":"BreadcrumbList",
        "itemListElement":[
            {"@type":"ListItem","position":1,"name":"Home","item":baseUrl+"/"},
            {"@type":"ListItem","position":2,"name":"Tools","item":baseUrl+"/tools/"},
            {"@type":"ListItem","position":3,"name":seo.title.split(' - ')[0],"item":toolUrl}
        ]
    });
    html = html.replace('</head>', '<script type="application/ld+json">'+breadcrumbSchema+'</script>\n</head>');

    // SoftwareApplication schema
    var appCategory = 'UtilityApplication';
    if (toolModuleMap[toolId] === 'seo') appCategory = 'SEOTool';
    else if (toolModuleMap[toolId] === 'converters') appCategory = 'Converters';
    var webAppSchema = JSON.stringify({
        "@context":"https://schema.org",
        "@type":"SoftwareApplication",
        "name":seo.title.split(' - ')[0],
        "description":seo.desc,
        "url":toolUrl,
        "applicationCategory":appCategory,
        "operatingSystem":"Web",
        "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
        "provider":{"@type":"Organization","name":"KwordSEO","url":baseUrl}
    });
    html = html.replace('</head>', '<script type="application/ld+json">'+webAppSchema+'</script>\n</head>');

    if (toolId === 'markdown-editor' || toolId === 'markdown-preview') {
        html = html.replace('</head>', '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>\n</head>');
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
        // Related tools section
        var relatedMap = {
            'word-counter':['char-counter','word-frequency','sentence-counter'],
            'char-counter':['word-counter','word-frequency','sentence-counter'],
            'sentence-counter':['word-counter','char-counter','paragraph-counter'],
            'paragraph-counter':['word-counter','sentence-counter','word-frequency'],
            'word-frequency':['word-counter','char-counter','keyword-density'],
            'case-converter':['remove-spaces','slug-generator','find-replace'],
            'remove-spaces':['case-converter','find-replace','slug-generator'],
            'find-replace':['case-converter','remove-spaces','line-sorter'],
            'line-sorter':['alpha-sorter','find-replace','duplicate-remover'],
            'alpha-sorter':['line-sorter','sort','find-replace'],
            'text-reverser':['slug-generator','hash-generator','case-converter'],
            'duplicate-remover':['line-sorter','find-replace','word-frequency'],
            'lorem-generator':['slug-generator','word-counter','text-reverser'],
            'slug-generator':['meta-gen','canonical-gen','url-encoder'],
            'keyword-density':['keyword-extract','meta-desc-gen','meta-gen'],
            'keyword-extract':['keyword-density','meta-desc-gen','word-frequency'],
            'meta-gen':['meta-desc-gen','og-generator','canonical-gen'],
            'meta-desc-gen':['meta-gen','og-generator','keyword-extract'],
            'og-generator':['meta-gen','meta-desc-gen','canonical-gen'],
            'canonical-gen':['robots-txt','sitemap-gen','hreflang-gen'],
            'robots-txt':['sitemap-gen','canonical-gen','hreflang-gen'],
            'sitemap-gen':['robots-txt','canonical-gen','hreflang-gen'],
            'json-formatter':['json-validator','xml-formatter','xml-validator'],
            'json-validator':['json-formatter','xml-validator','regex-tester'],
            'xml-formatter':['xml-validator','json-formatter','json-validator'],
            'xml-validator':['xml-formatter','json-validator','json-formatter'],
            'markdown-editor':['markdown-preview','html-previewer','json-formatter'],
            'markdown-preview':['markdown-editor','html-previewer','json-formatter'],
            'html-previewer':['markdown-editor','html-encoder','json-formatter'],
            'regex-tester':['json-validator','hash-generator','find-replace'],
            'url-encoder':['url-decoder','html-encoder','slug-generator'],
            'url-decoder':['url-encoder','html-decoder','b64-decoder'],
            'html-encoder':['html-decoder','url-encoder','b64-encoder'],
            'html-decoder':['html-encoder','url-decoder','b64-decoder'],
            'b64-encoder':['b64-decoder','url-encoder','html-encoder'],
            'b64-decoder':['b64-encoder','url-decoder','html-decoder'],
            'hash-generator':['regex-tester','b64-encoder','text-reverser'],
            'hreflang-gen':['canonical-gen','robots-txt','sitemap-gen'],
            'schema-gen':['faq-schema-gen','article-schema-gen','breadcrumb-schema-gen'],
            'faq-schema-gen':['schema-gen','article-schema-gen','meta-gen'],
            'article-schema-gen':['schema-gen','faq-schema-gen','meta-gen'],
            'breadcrumb-schema-gen':['schema-gen','canonical-gen','hreflang-gen'],
            'pdf-to-word':['word-to-pdf','html-previewer','markdown-editor'],
            'word-to-pdf':['pdf-to-word','html-previewer','markdown-editor'],
            'ai-content-detector':['word-frequency','keyword-density'],
            'ai-humanizer':['ai-content-detector','word-frequency','case-converter'],
            'ai-prompt-gen':['ai-humanizer','ai-content-detector','keyword-extract']
        };
        var related = relatedMap[toolId] || [];
        if (related.length) {
            contentHtml += '<h2 style="font-size:1.25rem;font-weight:700;margin-bottom:12px;color:var(--text);margin-top:32px">Related Tools</h2>';
            contentHtml += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
            related.forEach(function(r) {
                var rSeo = toolSEO[r];
                var rTitle = rSeo ? rSeo.title.split(' - ')[0] : r;
                contentHtml += '<a href="/tools/' + r + '.html" style="display:inline-block;padding:8px 16px;background:var(--surface);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:0.85rem;font-weight:500;text-decoration:none;transition:border-color .15s">' + esc(rTitle) + '</a>';
            });
            contentHtml += '</div>';
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
