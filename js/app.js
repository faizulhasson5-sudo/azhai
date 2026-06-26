/* ===================================================
   Free AI Text Tools - Core Application JavaScript
   =================================================== */
(function(){
'use strict';

window.App = window.App || {};

// ---- Theme ----
var savedTheme = localStorage.getItem('attTheme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

App.toggleTheme = function(){
    var c = document.documentElement.getAttribute('data-theme');
    var n = c === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('attTheme', n);
    var btn = document.querySelector('.theme-btn');
    if(btn) btn.textContent = n === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
};

// ---- Toast ----
App.toast = function(msg, dur){
    dur = dur || 2000;
    var t = document.getElementById('appToast');
    if(!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); }, dur);
};

// ---- Cookie Consent ----
App.initCookieConsent = function(){
    if(localStorage.getItem('attCookies') === 'accepted') return;
    var banner = document.getElementById('cookieBanner') || document.getElementById('cookie-consent');
    if(!banner) return;
    banner.classList.add('show');
    var acceptBtn = document.getElementById('cookieAccept');
    var rejectBtn = document.getElementById('cookieReject');
    if(acceptBtn) acceptBtn.addEventListener('click', function(){
        localStorage.setItem('attCookies','accepted');
        banner.classList.remove('show');
    });
    if(rejectBtn) rejectBtn.addEventListener('click', function(){
        localStorage.setItem('attCookies','rejected');
        banner.classList.remove('show');
    });
};

// ---- Tool System ----
App.tools = [
    {id:'duplicate-remover',name:'Duplicate Line Remover',icon:'\uD83E\uDDF9',cat:'text',desc:'Remove repeated lines from text'},
    {id:'word-counter',name:'Word Counter',icon:'\uD83D\uDCDD',cat:'counters',desc:'Count total words accurately'},
    {id:'char-counter',name:'Character Counter',icon:'\uD83D\uDD22',cat:'counters',desc:'Count characters with/without spaces'},
    {id:'sentence-counter',name:'Sentence Counter',icon:'\uD83D\uDCC4',cat:'counters',desc:'Count sentences by punctuation'},
    {id:'paragraph-counter',name:'Paragraph Counter',icon:'\uD83D\uDCD1',cat:'counters',desc:'Count paragraphs by empty lines'},
    {id:'case-converter',name:'Case Converter',icon:'\uD83D\uDD20',cat:'converters',desc:'UPPER, lower, Title, Sentence case'},
    {id:'remove-spaces',name:'Remove Extra Spaces',icon:'\u2728',cat:'cleaners',desc:'Clean double spaces and line breaks'},
    {id:'line-sorter',name:'Line Sorter',icon:'\uD83D\uDCCA',cat:'text',desc:'Sort lines ascending/descending'},
    {id:'alpha-sorter',name:'Alphabetical Sorter',icon:'\uD83D\uDD20',cat:'text',desc:'Sort lines alphabetically'},
    {id:'text-reverser',name:'Text Reverser',icon:'\uD83D\uDD04',cat:'text',desc:'Reverse chars, words, or lines'},
    {id:'url-encoder',name:'URL Encoder',icon:'\uD83D\uDD17',cat:'encoders',desc:'Encode special URL characters'},
    {id:'url-decoder',name:'URL Decoder',icon:'\uD83D\uDD13',cat:'encoders',desc:'Decode URL-encoded strings'},
    {id:'html-encoder',name:'HTML Encoder',icon:'\uD83C\uDFF7',cat:'encoders',desc:'Escape HTML entities'},
    {id:'html-decoder',name:'HTML Decoder',icon:'\uD83D\uDCCB',cat:'encoders',desc:'Decode HTML entities'},
    {id:'b64-encoder',name:'Base64 Encoder',icon:'\uD83D\uDD10',cat:'encoders',desc:'Encode text to Base64'},
    {id:'b64-decoder',name:'Base64 Decoder',icon:'\uD83D\uDD11',cat:'encoders',desc:'Decode Base64 strings'},
    {id:'json-formatter',name:'JSON Formatter',icon:'{ }',cat:'code',desc:'Beautify and format JSON'},
    {id:'json-validator',name:'JSON Validator',icon:'\u2705',cat:'code',desc:'Validate JSON syntax'},
    {id:'xml-formatter',name:'XML Formatter',icon:'</>',cat:'code',desc:'Pretty-print XML documents'},
    {id:'xml-validator',name:'XML Validator',icon:'\u2714',cat:'code',desc:'Validate XML structure'},
    {id:'markdown-editor',name:'Markdown Editor',icon:'\u270D',cat:'code',desc:'Write Markdown with live preview'},
    {id:'markdown-preview',name:'Markdown Previewer',icon:'\uD83D\uDC41',cat:'code',desc:'Preview Markdown as HTML'},
    {id:'robots-txt',name:'Robots.txt Generator',icon:'\uD83E\uDD16',cat:'seo',desc:'Generate crawler directives'},
    {id:'sitemap-gen',name:'Sitemap Generator',icon:'\uD83D\uDDFA',cat:'seo',desc:'Create XML sitemaps'},
    {id:'meta-gen',name:'Meta Tag Generator',icon:'\uD83C\uDFF7',cat:'seo',desc:'Generate HTML meta tags'},
    {id:'keyword-density',name:'Keyword Density',icon:'\uD83D\uDCC8',cat:'seo',desc:'Check keyword frequency'},
    {id:'keyword-extract',name:'Keyword Extractor',icon:'\uD83D\uDD0D',cat:'seo',desc:'Extract top keywords from text'},
    {id:'og-generator',name:'OG Generator',icon:'\uD83D\uDCF1',cat:'seo',desc:'Open Graph meta tags'},
    {id:'slug-generator',name:'Slug Generator',icon:'\uD83D\uDD17',cat:'seo',desc:'URL-friendly slug from title'},
    {id:'meta-desc-gen',name:'Meta Desc Generator',icon:'160',cat:'seo',desc:'SEO meta description under 160 chars'},
    {id:'canonical-gen',name:'Canonical Tag Gen',icon:'Link',cat:'seo',desc:'Generate canonical link tags'},
    {id:'find-replace',name:'Find and Replace',icon:'\uD83D\uDD0D',cat:'text',desc:'Search and replace text instantly'},
    {id:'regex-tester',name:'Regex Tester',icon:'.*',cat:'code',desc:'Test regular expressions live'},
    {id:'html-previewer',name:'HTML Previewer',icon:'\uD83C\uDF10',cat:'code',desc:'Preview HTML code in real-time'},
    {id:'hash-generator',name:'Hash Generator',icon:'#',cat:'code',desc:'Generate simple text hashes'},
    {id:'lorem-generator',name:'Lorem Generator',icon:'\uD83D\uDCDD',cat:'text',desc:'Generate Lorem Ipsum placeholder text'},
    {id:'word-frequency',name:'Word Frequency',icon:'\uD83D\uDCCA',cat:'counters',desc:'Count word occurrences in text'}
];

App.getToolById = function(id){ return App.tools.find(function(t){ return t.id === id; }); };

// ---- Tool Processing ----
App.processTool = function(toolId, text, options){
    switch(toolId){
        case 'duplicate-remover': return App._removeDuplicates(text, options);
        case 'word-counter': return App._countWords(text);
        case 'char-counter': return App._countChars(text);
        case 'sentence-counter': return App._countSentences(text);
        case 'paragraph-counter': return App._countParagraphs(text);
        case 'remove-spaces': return App._removeSpaces(text);
        case 'line-sorter': return App._sortLines(text, options);
        case 'alpha-sorter': return App._sortAlpha(text, options);
        case 'text-reverser': return App._reverseText(text, options);
        case 'url-encoder': return App._safe(encodeURIComponent, text);
        case 'url-decoder': return App._safe(decodeURIComponent, text);
        case 'html-encoder': return App._encodeHTML(text);
        case 'html-decoder': return App._decodeHTML(text);
        case 'b64-encoder': return App._b64Encode(text);
        case 'b64-decoder': return App._b64Decode(text);
        case 'json-formatter': return App._formatJSON(text);
        case 'json-validator': return App._validateJSON(text);
        case 'xml-formatter': return App._formatXML(text);
        case 'xml-validator': return App._validateXML(text);
        case 'markdown-preview': return App._simpleMarkdown(text);
        case 'keyword-density': return App._keywordDensity(text, options && options.keyword);
        case 'keyword-extract': return App._extractKeywords(text);
        case 'slug-generator': return App._generateSlug(text);
        case 'meta-desc-gen': return App._generateMetaDesc(text, options && options.keyword);
        case 'canonical-gen': return App._generateCanonical(text);
        case 'hash-generator': return App._generateHash(text);
        case 'lorem-generator': return App._generateLorem(text);
        case 'word-frequency': return App._wordFrequency(text);
        default: return text;
    }
};

App._removeDuplicates = function(text, opts){
    if(!text.trim()) return '';
    var lines = text.split('\n'), seen = {}, result = [];
    lines.forEach(function(l){
        var k = l.toLowerCase().trim();
        if(k === '' || !seen[k]){ seen[k]=true; result.push(l); }
    });
    return result.join('\n');
};
App._countWords = function(t){ if(!t.trim()) return 'Total Words: 0'; return 'Total Words: '+t.trim().split(/\s+/).length; };
App._countChars = function(t){ return 'Characters (with spaces): '+t.length+'\nCharacters (without spaces): '+t.replace(/\s/g,'').length; };
App._countSentences = function(t){ if(!t.trim()) return 'Total Sentences: 0'; var m=t.match(/[.!?]+/g); var c=m?m.length:0; if(!c&&t.trim().length)c=1; return 'Total Sentences: '+c; };
App._countParagraphs = function(t){ if(!t.trim()) return 'Total Paragraphs: 0'; var p=t.split(/\n\s*\n/).filter(function(x){return x.trim().length>0;}).length; if(!p&&t.trim().length)p=1; return 'Total Paragraphs: '+p; };
App._removeSpaces = function(t){ return t.replace(/[^\S\n]+/g,' ').replace(/\n\s*\n/g,'\n\n').replace(/^\s+|\s+$/g,''); };
App._sortLines = function(t, opts){ if(!t.trim()) return ''; var l=t.split('\n'); l.sort(); if(opts && opts.reverse) l.reverse(); return l.join('\n'); };
App._sortAlpha = function(t, opts){ if(!t.trim()) return ''; var l=t.split('\n'); l.sort(function(a,b){return a.toLowerCase()<b.toLowerCase()?-1:a.toLowerCase()>b.toLowerCase()?1:0;}); if(opts && opts.reverse) l.reverse(); return l.join('\n'); };
App._reverseText = function(t, opts){ if(!t) return ''; var m=(opts && opts.mode)||'chars'; if(m==='words')return t.split(/\s+/).reverse().join(' '); if(m==='lines')return t.split('\n').reverse().join('\n'); return t.split('').reverse().join(''); };
App._safe = function(fn, t){ if(!t) return ''; try{return fn(t);}catch(e){return 'Error: Invalid input';} };
App._encodeHTML = function(t){ if(!t)return''; var m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}; return t.replace(/[&<>"']/g,function(c){return m[c];}); };
App._decodeHTML = function(t){ if(!t)return''; var el=document.createElement('div'); el.innerHTML=t; return el.textContent; };
App._b64Encode = function(t){ if(!t)return''; try{return btoa(unescape(encodeURIComponent(t)));}catch(e){return 'Error: Invalid input';} };
App._b64Decode = function(t){ if(!t)return''; try{return decodeURIComponent(escape(atob(t.trim())));}catch(e){return 'Error: Invalid Base64 string';} };
App._formatJSON = function(t){ if(!t.trim())return''; try{return JSON.stringify(JSON.parse(t),null,2);}catch(e){return 'Error: '+e.message;} };
App._validateJSON = function(t){ if(!t.trim())return'No input.'; try{JSON.parse(t);return 'Valid JSON\n\nThe input is properly formatted JSON.';}catch(e){return 'Invalid JSON\n\nError: '+e.message;} };
App._formatXML = function(t){ if(!t.trim())return''; try{var lines=t.replace(/(>)\s*(<)/g,'$1\n$2').split('\n'); var f='',ind=0; lines.forEach(function(l){l=l.trim();if(!l)return;if(l.match(/^<\//))ind--;f+='  '.repeat(Math.max(0,ind))+l+'\n';if(l.match(/^<[^\/?]/)&&!l.match(/\/>$/))ind++;});return f.trim();}catch(e){return 'Error: '+e.message;} };
App._validateXML = function(t){ if(!t.trim())return'No input.'; try{var p=new DOMParser();var d=p.parseFromString(t,'text/xml');if(d.querySelector('parsererror'))return 'Invalid XML\n\n'+d.querySelector('parsererror').textContent.substring(0,300);return 'Valid XML';}catch(e){return 'Error: '+e.message;} };
App._simpleMarkdown = function(t){ if(!t)return''; var h=t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`(.+?)`/g,'<code>$1</code>').replace(/^\- (.+)$/gm,'<li>$1</li>').replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>').replace(/^---$/gm,'<hr>').replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank">$1</a>').replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>'); return '<p>'+h+'</p>'; };
App._keywordDensity = function(text, kw){
    if(!text.trim()) return '';
    var words=text.toLowerCase().match(/\b\w+\b/g)||[];
    var total=words.length;
    var freq={}; words.forEach(function(w){freq[w]=(freq[w]||0)+1;});
    var html='<table class="results-table"><tr><th>Keyword</th><th>Count</th><th>Density</th></tr>';
    if(kw && kw.trim()){
        var regex=new RegExp(kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
        var matches=text.match(regex);
        var count=matches?matches.length:0;
        var density=total?((count/total)*100).toFixed(2):'0.00';
        html+='<tr><td><strong>'+kw+'</strong></td><td>'+count+'</td><td>'+density+'%</td></tr>';
    }
    Object.keys(freq).sort(function(a,b){return freq[b]-freq[a];}).slice(0,20).forEach(function(k){
        if(k.length>2){
            var d=total?((freq[k]/total)*100).toFixed(2):'0.00';
            html+='<tr><td>'+k+'</td><td>'+freq[k]+'</td><td>'+d+'%</td></tr>';
        }
    });
    html+='</table>';
    return html;
};
App._extractKeywords = function(text){
    if(!text.trim()) return '';
    var stop=['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','am','are','was','were','be','been','being','have','has','had','do','does','did','will','would','shall','should','may','might','can','could','this','that','these','those','it','its','he','she','they','we','you','i','me','my','your','his','her','our','their','what','which','who','whom','where','when','why','how','not','no','nor','so','too','very','just','also','than','then','now','here','there','all','any','each','every','some','few','more','most','other','into','over','after','before','between','through','during','about','against','without','within'];
    var words=text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g)||[];
    var freq={}; words.forEach(function(w){if(w.length>2 && stop.indexOf(w)===-1)freq[w]=(freq[w]||0)+1;});
    var sorted=Object.keys(freq).sort(function(a,b){return freq[b]-freq[a];}).slice(0,30);
    var html='<table class="results-table"><tr><th>Keyword</th><th>Count</th><th>Density</th></tr>';
    sorted.forEach(function(k){
        var d=words.length?((freq[k]/words.length)*100).toFixed(2):'0.00';
        html+='<tr><td>'+k+'</td><td>'+freq[k]+'</td><td>'+d+'%</td></tr>';
    });
    html+='</table>';
    return html;
};
App._generateSlug = function(t){
    if(!t.trim()) return '';
    return t.toLowerCase().trim().replace(/[^\w\s-]/g,'').replace(/[\s_]+/g,'-').replace(/-+/g,'-').replace(/^-+|-+$/g,'');
};
App._generateMetaDesc = function(text, kw){
    if(!text.trim()) return '';
    var sentences=text.match(/[^.!?]+[.!?]+/g);
    var desc=sentences&&sentences.length?sentences[0].trim():text.substring(0,155);
    if(desc.length>160) desc=desc.substring(0,157)+'...';
    if(kw && kw.trim() && desc.length<150){
        if(desc.toLowerCase().indexOf(kw.toLowerCase())===-1) desc=desc.replace(/\.$/,'')+' '+kw.trim()+'.';
    }
    if(desc.length>160) desc=desc.substring(0,157)+'...';
    return '<meta name="description" content="'+desc.replace(/"/g,'&quot;')+'">';
};
App._generateCanonical = function(url){
    if(!url.trim()) return '';
    var u=url.trim();
    if(!u.match(/^https?:\/\//i)) u='https://'+u;
    return '<link rel="canonical" href="'+u+'">';
};
App._generateHash = function(text){
    if(!text.trim()) return '';
    var hash=0;
    for(var i=0;i<text.length;i++){var ch=text.charCodeAt(i);hash=((hash<<5)-hash)+ch;hash=hash&hash;}
    return 'Simple Hash: '+Math.abs(hash).toString(16)+'\n\nNote: For cryptographic hashes (MD5, SHA-256), use a dedicated library.';
};
App._generateLorem = function(text){
    var count=parseInt(text)||3;
    count=Math.max(1,Math.min(20,count));
    var lorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    var result=[];
    for(var i=0;i<count;i++) result.push(lorem);
    return result.join('\n\n');
};
App._wordFrequency = function(text){
    if(!text.trim()) return '';
    var words=text.toLowerCase().match(/\b[\w'-]+\b/g)||[];
    var freq={}; words.forEach(function(w){freq[w]=(freq[w]||0)+1;});
    var sorted=Object.keys(freq).sort(function(a,b){return freq[b]-freq[a];}).slice(0,50);
    var html='<table class="results-table"><tr><th>Word</th><th>Count</th></tr>';
    sorted.forEach(function(w){html+='<tr><td>'+w+'</td><td>'+freq[w]+'</td></tr>';});
    html+='</table>';
    return html;
};

App.escHTML = function(s){ return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };

// ---- Blog Data ----
App.blogPosts = [
    {
        slug:'ultimate-guide-seo-text-tools',
        title:'The Ultimate Guide to Free SEO Text Tools in 2026',
        excerpt:'Discover how free online SEO tools can boost your content strategy, improve rankings, and save hours of manual work.',
        category:'SEO Tools',
        date:'2026-06-20',
        readTime:'8 min',
        tags:['SEO','tools','content'],
        content:'<h2>Why SEO Text Tools Matter</h2><p>In today\'s competitive digital landscape, having the right SEO tools can make or break your content strategy. Free online text tools provide instant analysis, optimization, and formatting capabilities that previously required expensive software.</p><h2>Top Tools Every Blogger Needs</h2><p>Word counters help you hit target lengths. Keyword density checkers prevent over-optimization. Meta tag generators ensure proper on-page SEO. These tools work together to create content that both readers and search engines love.</p><h2>How to Use Text Tools for Better Rankings</h2><p>Start with keyword research using our Keyword Extractor. Write your draft, then use the Keyword Density Checker to optimize. Generate meta tags with our Meta Tag Generator. Check your character counts for social media previews. Each step improves your content\'s visibility.</p><h2>Conclusion</h2><p>Free AI text tools democratize SEO. Whether you\'re a beginner blogger or experienced marketer, these tools streamline your workflow and help you create optimized content faster.</p>'
    },
    {
        slug:'how-to-write-perfect-meta-descriptions',
        title:'How to Write Perfect Meta Descriptions That Get Clicks',
        excerpt:'Learn the art of crafting compelling meta descriptions that improve CTR and boost your search rankings.',
        category:'SEO Tips',
        date:'2026-06-18',
        readTime:'6 min',
        tags:['meta tags','SEO','CTR'],
        content:'<h2>What Makes a Great Meta Description?</h2><p>A meta description is your elevator pitch in search results. It should be under 160 characters, include your target keyword, and compellingly describe what the page offers.</p><h2>Best Practices for Meta Descriptions</h2><p>Always include a call-to-action. Use active voice. Match search intent. Include numbers when possible. Our Meta Description Generator can help you craft optimized descriptions in seconds.</p><h2>Common Mistakes to Avoid</h2><p>Duplicate descriptions across pages, keyword stuffing, missing descriptions entirely, and writing descriptions that don\'t match page content are the most common errors.</p>'
    },
    {
        slug:'json-formatting-best-practices',
        title:'JSON Formatting Best Practices for Developers',
        excerpt:'Master JSON formatting, validation, and optimization with practical examples and free online tools.',
        category:'Development',
        date:'2026-06-15',
        readTime:'7 min',
        tags:['JSON','development','API'],
        content:'<h2>Why Proper JSON Formatting Matters</h2><p>Well-formatted JSON is easier to read, debug, and maintain. It reduces errors in API integrations and makes collaboration smoother.</p><h2>JSON Formatting Rules</h2><p>Use consistent indentation (2 spaces). Order keys logically. Validate before deploying. Our JSON Formatter and Validator tools make this effortless.</p><h2>Common JSON Errors</h2><p>Trailing commas, missing quotes around keys, and incorrect nesting are the most frequent issues. Always validate your JSON before sending it to an API.</p>'
    },
    {
        slug:'markdown-for-bloggers',
        title:'Markdown for Bloggers: A Complete Beginner Guide',
        excerpt:'Learn how to write beautiful blog posts using Markdown syntax with our live preview editor.',
        category:'Blogging',
        date:'2026-06-12',
        readTime:'5 min',
        tags:['Markdown','blogging','writing'],
        content:'<h2>What is Markdown?</h2><p>Markdown is a lightweight markup language that lets you write formatted text using plain text syntax. It\'s used everywhere from GitHub to blog platforms.</p><h2>Essential Markdown Syntax</h2><p># for headings, ** for bold, * for italic, - for lists, and > for blockquotes. That\'s really all you need to start writing great content.</p><h2>Try Our Markdown Editor</h2><p>Our free Markdown Editor with live preview lets you write and see results instantly. Perfect for documentation, README files, and blog posts.</p>'
    },
    {
        slug:'understanding-canonical-tags-seo',
        title:'Understanding Canonical Tags: The Complete SEO Guide',
        excerpt:'Learn how canonical tags prevent duplicate content issues and consolidate your SEO ranking signals.',
        category:'SEO Tips',
        date:'2026-06-10',
        readTime:'6 min',
        tags:['canonical','SEO','duplicate content'],
        content:'<h2>What Are Canonical Tags?</h2><p>A canonical tag tells search engines which version of a URL is the "master" version. It\'s essential for preventing duplicate content penalties.</p><h2>When to Use Canonical Tags</h2><p>Use them when similar content exists at multiple URLs, when URL parameters create duplicate pages, or when syndicating content across domains.</p><h2>Generate Canonical Tags</h2><p>Our Canonical Tag Generator creates proper link tags instantly. Just enter your preferred URL and copy the output into your HTML head.</p>'
    },
    {
        slug:'open-graph-tags-social-media',
        title:'Open Graph Tags: Get Perfect Social Media Previews',
        excerpt:'Master Open Graph meta tags to ensure your content looks amazing when shared on Facebook, LinkedIn, and Twitter.',
        category:'Social Media',
        date:'2026-06-08',
        readTime:'5 min',
        tags:['Open Graph','social media','meta tags'],
        content:'<h2>Why Open Graph Tags Matter</h2><p>Open Graph tags control how your content appears when shared on social media. Without them, platforms guess how to display your link \u2014 often badly.</p><h2>Essential OG Tags</h2><p>og:title, og:description, og:image, og:url, and og:type are the must-haves. Our OG Generator creates complete tags including Twitter Card support.</p><h2>Image Specifications</h2><p>Use 1200x630px for the best results across all platforms. Keep file size under 1MB. Use JPG or PNG format.</p>'
    }
];

// ---- Init (minimal - let pages handle their own UI) ----
document.addEventListener('DOMContentLoaded', function(){
    App.initCookieConsent();
});

})();
