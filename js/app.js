/* ===================================================
   Free AI Text Tools - Core Application JavaScript
   =================================================== */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XDHMXW7PR2');

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
    {id:'duplicate-remover',name:'Duplicate Line Remover',color:'#ef4444',icon:'<svg viewBox="0 0 40 40"><rect x="6" y="6" width="20" height="26" rx="2" fill="#fff" stroke="#000" stroke-width="2.5"/><rect x="14" y="12" width="20" height="26" rx="2" fill="#fef2f2" stroke="#000" stroke-width="2.5"/><path d="M19 21h10M19 25h7M19 29h10" stroke="#000" stroke-width="1.8"/><path d="M10 18l3 3-3 3" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 18l3 3-3 3" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',cat:'text',desc:'Remove repeated lines from text'},
    {id:'word-counter',name:'Word Counter',color:'#f97316',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fff7ed" stroke="#000" stroke-width="2.5"/><path d="M10 12h20M10 18h16M10 24h18M10 30h12" stroke="#000" stroke-width="1.8"/><circle cx="30" cy="30" r="7" fill="#f97316" stroke="#000" stroke-width="2"/><text x="30" y="33" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" font-family="monospace">W</text></svg>',cat:'counters',desc:'Count total words accurately'},
    {id:'char-counter',name:'Character Counter',color:'#eab308',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fefce8" stroke="#000" stroke-width="2.5"/><text x="20" y="26" text-anchor="middle" font-size="18" font-weight="900" fill="#000" font-family="monospace">#</text><rect x="8" y="8" width="6" height="6" fill="#eab308" stroke="#000" stroke-width="1.5"/><rect x="26" y="8" width="6" height="6" fill="#eab308" stroke="#000" stroke-width="1.5"/><rect x="8" y="28" width="6" height="6" fill="#eab308" stroke="#000" stroke-width="1.5"/><rect x="26" y="28" width="6" height="6" fill="#eab308" stroke="#000" stroke-width="1.5"/></svg>',cat:'counters',desc:'Count characters with/without spaces'},
    {id:'sentence-counter',name:'Sentence Counter',color:'#84cc16',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f7fee7" stroke="#000" stroke-width="2.5"/><text x="13" y="24" font-size="14" font-weight="900" fill="#000" font-family="monospace">.</text><text x="20" y="24" font-size="14" font-weight="900" fill="#000" font-family="monospace">!</text><text x="27" y="24" font-size="14" font-weight="900" fill="#000" font-family="monospace">?</text><circle cx="13" cy="13" r="3" fill="#84cc16" stroke="#000" stroke-width="1.5"/><circle cx="20" cy="13" r="3" fill="#84cc16" stroke="#000" stroke-width="1.5"/><circle cx="27" cy="13" r="3" fill="#84cc16" stroke="#000" stroke-width="1.5"/></svg>',cat:'counters',desc:'Count sentences by punctuation'},
    {id:'paragraph-counter',name:'Paragraph Counter',color:'#22c55e',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0fdf4" stroke="#000" stroke-width="2.5"/><rect x="9" y="9" width="22" height="5" rx="1" fill="#22c55e" stroke="#000" stroke-width="1.5"/><rect x="9" y="17" width="18" height="5" rx="1" fill="#22c55e" stroke="#000" stroke-width="1.5"/><rect x="9" y="25" width="20" height="5" rx="1" fill="#22c55e" stroke="#000" stroke-width="1.5"/></svg>',cat:'counters',desc:'Count paragraphs by empty lines'},
    {id:'case-converter',name:'Case Converter',color:'#14b8a6',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0fdfa" stroke="#000" stroke-width="2.5"/><text x="10" y="22" font-size="13" font-weight="900" fill="#000" font-family="monospace">Aa</text><text x="24" y="22" font-size="13" font-weight="900" fill="#14b8a6" font-family="monospace">AA</text><path d="M12 28l4-2M24 28l-4-2" stroke="#000" stroke-width="1.5" fill="none"/><circle cx="14" cy="31" r="2" fill="#14b8a6" stroke="#000" stroke-width="1.2"/><circle cx="26" cy="31" r="2" fill="#14b8a6" stroke="#000" stroke-width="1.2"/></svg>',cat:'converters',desc:'UPPER, lower, Title, Sentence case'},
    {id:'remove-spaces',name:'Remove Extra Spaces',color:'#06b6d4',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#ecfeff" stroke="#000" stroke-width="2.5"/><text x="8" y="22" font-size="8" font-weight="700" fill="#000" font-family="monospace">a  b</text><text x="8" y="32" font-size="8" font-weight="700" fill="#06b6d4" font-family="monospace">a b</text><path d="M26 14l4-4M30 14l-4-4" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M26 14l4 4" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>',cat:'cleaners',desc:'Clean double spaces and line breaks'},
    {id:'line-sorter',name:'Line Sorter',color:'#3b82f6',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#eff6ff" stroke="#000" stroke-width="2.5"/><path d="M10 13h20M10 19h16M10 25h18" stroke="#000" stroke-width="1.8"/><path d="M30 11v8M27 16l3 3 3-3" stroke="#3b82f6" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',cat:'text',desc:'Sort lines ascending/descending'},
    {id:'alpha-sorter',name:'Alphabetical Sorter',color:'#6366f1',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#eef2ff" stroke="#000" stroke-width="2.5"/><text x="10" y="18" font-size="10" font-weight="900" fill="#000" font-family="monospace">A</text><text x="26" y="18" font-size="10" font-weight="900" fill="#6366f1" font-family="monospace">Z</text><path d="M16 14h6" stroke="#6366f1" stroke-width="2" fill="none" marker-end="url(#arrow)"/><text x="10" y="30" font-size="7" font-weight="700" fill="#6366f1" font-family="monospace">a b c</text><path d="M28 24v8M25 29l3 3 3-3" stroke="#6366f1" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',cat:'text',desc:'Sort lines alphabetically'},
    {id:'text-reverser',name:'Text Reverser',color:'#8b5cf6',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f5f3ff" stroke="#000" stroke-width="2.5"/><text x="8" y="20" font-size="9" font-weight="900" fill="#000" font-family="monospace">ABC</text><text x="8" y="32" font-size="9" font-weight="900" fill="#8b5cf6" font-family="monospace">CBA</text><path d="M28 14l4-4M32 14l-4-4" stroke="#8b5cf6" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 28l4 4M32 28l-4 4" stroke="#8b5cf6" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>',cat:'text',desc:'Reverse chars, words, or lines'},
    {id:'url-encoder',name:'URL Encoder',color:'#a855f7',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#faf5ff" stroke="#000" stroke-width="2.5"/><text x="8" y="18" font-size="7" font-weight="700" fill="#000" font-family="monospace">hello world</text><path d="M14 24l-3 3 3 3" stroke="#a855f7" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M26 24l3 3-3 3" stroke="#a855f7" stroke-width="2.5" fill="none" stroke-linecap="round"/><text x="8" y="34" font-size="6" font-weight="700" fill="#a855f7" font-family="monospace">hello%20world</text></svg>',cat:'encoders',desc:'Encode special URL characters'},
    {id:'url-decoder',name:'URL Decoder',color:'#d946ef',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf4ff" stroke="#000" stroke-width="2.5"/><text x="8" y="18" font-size="6" font-weight="700" fill="#d946ef" font-family="monospace">hello%20world</text><path d="M14 24l3 3-3 3" stroke="#d946ef" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M26 24l-3 3 3 3" stroke="#d946ef" stroke-width="2.5" fill="none" stroke-linecap="round"/><text x="8" y="34" font-size="7" font-weight="700" fill="#000" font-family="monospace">hello world</text></svg>',cat:'encoders',desc:'Decode URL-encoded strings'},
    {id:'html-encoder',name:'HTML Encoder',color:'#ec4899',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf2f8" stroke="#000" stroke-width="2.5"/><text x="10" y="18" font-size="9" font-weight="900" fill="#000" font-family="monospace">&lt; &gt;</text><path d="M14 26l-4 4 4 4" stroke="#ec4899" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 26l4 4-4 4" stroke="#ec4899" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="16" y="34" font-size="6" font-weight="700" fill="#ec4899" font-family="monospace">&amp;lt;</text></svg>',cat:'encoders',desc:'Escape HTML entities'},
    {id:'html-decoder',name:'HTML Decoder',color:'#f472b6',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf2f8" stroke="#000" stroke-width="2.5"/><text x="10" y="18" font-size="6" font-weight="700" fill="#f472b6" font-family="monospace">&amp;lt;div&amp;gt;</text><path d="M14 26l4 4-4 4" stroke="#f472b6" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 26l-4 4 4 4" stroke="#f472b6" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="10" y="34" font-size="8" font-weight="900" fill="#000" font-family="monospace">&lt;div&gt;</text></svg>',cat:'encoders',desc:'Decode HTML entities'},
    {id:'b64-encoder',name:'Base64 Encoder',color:'#f43f5e',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fff1f2" stroke="#000" stroke-width="2.5"/><text x="20" y="16" text-anchor="middle" font-size="10" font-weight="900" fill="#000" font-family="monospace">B64</text><text x="8" y="30" font-size="6" font-weight="700" fill="#000" font-family="monospace">Hello</text><path d="M18 26l4 2-4 2" stroke="#f43f5e" stroke-width="2" fill="none" stroke-linecap="round"/><text x="24" y="30" font-size="5" font-weight="700" fill="#f43f5e" font-family="monospace">SGVsbG8=</text></svg>',cat:'encoders',desc:'Encode text to Base64'},
    {id:'b64-decoder',name:'Base64 Decoder',color:'#e11d48',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fff1f2" stroke="#000" stroke-width="2.5"/><text x="20" y="16" text-anchor="middle" font-size="10" font-weight="900" fill="#000" font-family="monospace">B64</text><text x="6" y="30" font-size="5" font-weight="700" fill="#e11d48" font-family="monospace">SGVsbG8=</text><path d="M22 26l4 2-4 2" stroke="#e11d48" stroke-width="2" fill="none" stroke-linecap="round"/><text x="26" y="30" font-size="6" font-weight="700" fill="#000" font-family="monospace">Hello</text></svg>',cat:'encoders',desc:'Decode Base64 strings'},
    {id:'json-formatter',name:'JSON Formatter',color:'#0ea5e9',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0f9ff" stroke="#000" stroke-width="2.5"/><text x="10" y="20" font-size="16" font-weight="900" fill="#000" font-family="monospace">{</text><text x="24" y="20" font-size="16" font-weight="900" fill="#000" font-family="monospace">}</text><path d="M16 12v4M16 24v4" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="2 2"/><text x="18" y="20" font-size="7" font-weight="700" fill="#0ea5e9" font-family="monospace">:</text></svg>',cat:'code',desc:'Beautify and format JSON'},
    {id:'json-validator',name:'JSON Validator',color:'#0284c7',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0f9ff" stroke="#000" stroke-width="2.5"/><text x="10" y="20" font-size="16" font-weight="900" fill="#000" font-family="monospace">{</text><text x="24" y="20" font-size="16" font-weight="900" fill="#000" font-family="monospace">}</text><path d="M17 28l3 3 6-6" stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',cat:'code',desc:'Validate JSON syntax'},
    {id:'xml-formatter',name:'XML Formatter',color:'#0d9488',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0fdfa" stroke="#000" stroke-width="2.5"/><text x="10" y="18" font-size="10" font-weight="900" fill="#000" font-family="monospace">&lt;/&gt;</text><path d="M12 26h16M14 30h12M16 34h8" stroke="#0d9488" stroke-width="1.8"/><circle cx="12" cy="26" r="1.5" fill="#0d9488"/><circle cx="14" cy="30" r="1.5" fill="#0d9488"/><circle cx="16" cy="34" r="1.5" fill="#0d9488"/></svg>',cat:'code',desc:'Pretty-print XML documents'},
    {id:'xml-validator',name:'XML Validator',color:'#0f766e',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0fdfa" stroke="#000" stroke-width="2.5"/><text x="10" y="18" font-size="10" font-weight="900" fill="#000" font-family="monospace">&lt;/&gt;</text><path d="M17 28l3 3 6-6" stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',cat:'code',desc:'Validate XML structure'},
    {id:'markdown-editor',name:'Markdown Editor',color:'#7c3aed',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f5f3ff" stroke="#000" stroke-width="2.5"/><text x="10" y="22" font-size="14" font-weight="900" fill="#000" font-family="monospace">#</text><rect x="18" y="12" width="16" height="3" rx="1" fill="#7c3aed" stroke="#000" stroke-width="1.2"/><rect x="18" y="18" width="12" height="2" rx="1" fill="#000" stroke="#000" stroke-width=".8" opacity=".3"/><rect x="18" y="23" width="14" height="2" rx="1" fill="#000" stroke="#000" stroke-width=".8" opacity=".3"/><rect x="18" y="28" width="10" height="2" rx="1" fill="#000" stroke="#000" stroke-width=".8" opacity=".3"/></svg>',cat:'code',desc:'Write Markdown with live preview'},
    {id:'markdown-preview',name:'Markdown Previewer',color:'#6d28d9',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f5f3ff" stroke="#000" stroke-width="2.5"/><rect x="8" y="8" width="24" height="24" rx="2" fill="#fff" stroke="#000" stroke-width="1.5"/><text x="11" y="17" font-size="6" font-weight="900" fill="#000" font-family="monospace"># H1</text><rect x="11" y="20" width="18" height="2" fill="#6d28d9" opacity=".4"/><rect x="11" y="24" width="14" height="2" fill="#6d28d9" opacity=".3"/><rect x="11" y="28" width="16" height="2" fill="#6d28d9" opacity=".2"/></svg>',cat:'code',desc:'Preview Markdown as HTML'},
    {id:'robots-txt',name:'Robots.txt Generator',color:'#ea580c',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fff7ed" stroke="#000" stroke-width="2.5"/><circle cx="20" cy="15" r="7" fill="#fff" stroke="#000" stroke-width="2"/><circle cx="17" cy="13" r="2" fill="#ea580c" stroke="#000" stroke-width="1"/><circle cx="23" cy="13" r="2" fill="#ea580c" stroke="#000" stroke-width="1"/><path d="M15 18h10" stroke="#000" stroke-width="1.5"/><rect x="16" y="24" width="8" height="10" rx="2" fill="#fff" stroke="#000" stroke-width="1.5"/><path d="M18 27h4M18 30h4" stroke="#000" stroke-width="1"/></svg>',cat:'seo',desc:'Generate crawler directives'},
    {id:'sitemap-gen',name:'Sitemap Generator',color:'#dc2626',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fef2f2" stroke="#000" stroke-width="2.5"/><rect x="8" y="8" width="10" height="7" rx="1" fill="#dc2626" stroke="#000" stroke-width="1.5"/><rect x="22" y="8" width="10" height="7" rx="1" fill="#fff" stroke="#000" stroke-width="1.5"/><rect x="8" y="22" width="10" height="7" rx="1" fill="#fff" stroke="#000" stroke-width="1.5"/><path d="M13 15v4M13 19h9v3H22" stroke="#000" stroke-width="1.5" fill="none"/><path d="M13 19v3H8" stroke="#000" stroke-width="1.5" fill="none"/></svg>',cat:'seo',desc:'Create XML sitemaps'},
    {id:'meta-gen',name:'Meta Tag Generator',color:'#db2777',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf2f8" stroke="#000" stroke-width="2.5"/><path d="M12 10l16 0v16l-16 0z" fill="#fdf2f8" stroke="#000" stroke-width="2"/><circle cx="16" cy="16" r="3" fill="#db2777" stroke="#000" stroke-width="1.5"/><text x="12" y="28" font-size="5" font-weight="700" fill="#000" font-family="monospace">&lt;meta&gt;</text></svg>',cat:'seo',desc:'Generate HTML meta tags'},
    {id:'keyword-density',name:'Keyword Density',color:'#be185d',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf2f8" stroke="#000" stroke-width="2.5"/><rect x="8" y="24" width="5" height="10" fill="#be185d" stroke="#000" stroke-width="1.2"/><rect x="15" y="18" width="5" height="16" fill="#be185d" stroke="#000" stroke-width="1.2"/><rect x="22" y="12" width="5" height="22" fill="#be185d" stroke="#000" stroke-width="1.2"/><rect x="29" y="20" width="5" height="14" fill="#be185d" stroke="#000" stroke-width="1.2"/><path d="M8 10l4-2 4 1 5-3 4 2 5-1" stroke="#000" stroke-width="1.5" fill="none"/></svg>',cat:'seo',desc:'Check keyword frequency'},
    {id:'keyword-extract',name:'Keyword Extractor',color:'#9d174d',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf2f8" stroke="#000" stroke-width="2.5"/><circle cx="17" cy="17" r="9" fill="#fff" stroke="#000" stroke-width="2.5"/><path d="M24 24l6 6" stroke="#000" stroke-width="3" stroke-linecap="round"/><text x="14" y="20" font-size="6" font-weight="900" fill="#9d174d" font-family="monospace">SEO</text></svg>',cat:'seo',desc:'Extract top keywords from text'},
    {id:'og-generator',name:'OG Generator',color:'#c026d3',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf4ff" stroke="#000" stroke-width="2.5"/><rect x="8" y="10" width="16" height="10" rx="2" fill="#c026d3" stroke="#000" stroke-width="1.5"/><rect x="8" y="22" width="16" height="3" rx="1" fill="#000" opacity=".2"/><rect x="8" y="27" width="12" height="2" rx="1" fill="#000" opacity=".1"/><path d="M28 14l6-2v14l-6-2" stroke="#000" stroke-width="1.5" fill="none"/><circle cx="31" cy="11" r="2" fill="#c026d3" stroke="#000" stroke-width="1"/></svg>',cat:'seo',desc:'Open Graph meta tags'},
    {id:'slug-generator',name:'Slug Generator',color:'#a21caf',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#fdf4ff" stroke="#000" stroke-width="2.5"/><text x="6" y="16" font-size="5.5" font-weight="700" fill="#000" font-family="monospace">Hello World!</text><path d="M12 22l-3 3 3 3" stroke="#a21caf" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 22l3 3-3 3" stroke="#a21caf" stroke-width="2.5" fill="none" stroke-linecap="round"/><text x="6" y="34" font-size="6" font-weight="900" fill="#a21caf" font-family="monospace">hello-world</text></svg>',cat:'seo',desc:'URL-friendly slug from title'},
    {id:'meta-desc-gen',name:'Meta Desc Generator',color:'#7e22ce',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#faf5ff" stroke="#000" stroke-width="2.5"/><rect x="8" y="8" width="24" height="24" rx="2" fill="#fff" stroke="#000" stroke-width="1.5"/><rect x="11" y="12" width="18" height="2" fill="#000" opacity=".2"/><rect x="11" y="16" width="14" height="2" fill="#000" opacity=".2"/><rect x="11" y="20" width="16" height="2" fill="#000" opacity=".2"/><text x="11" y="30" font-size="5" font-weight="900" fill="#7e22ce" font-family="monospace">160 chars</text></svg>',cat:'seo',desc:'SEO meta description under 160 chars'},
    {id:'canonical-gen',name:'Canonical Tag Gen',color:'#6b21a8',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#faf5ff" stroke="#000" stroke-width="2.5"/><path d="M12 20a6 6 0 0 1 6-6h4" stroke="#6b21a8" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 20a6 6 0 0 1-6 6h-4" stroke="#6b21a8" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="12" cy="20" r="2" fill="#6b21a8" stroke="#000" stroke-width="1.2"/><circle cx="28" cy="20" r="2" fill="#6b21a8" stroke="#000" stroke-width="1.2"/><text x="14" y="34" font-size="5" font-weight="700" fill="#000" font-family="monospace">rel="canonical"</text></svg>',cat:'seo',desc:'Generate canonical link tags'},
    {id:'find-replace',name:'Find and Replace',color:'#2563eb',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#eff6ff" stroke="#000" stroke-width="2.5"/><circle cx="16" cy="16" r="8" fill="#fff" stroke="#000" stroke-width="2"/><path d="M22 22l6 6" stroke="#000" stroke-width="2.5" stroke-linecap="round"/><rect x="12" y="28" width="16" height="6" rx="1" fill="#2563eb" stroke="#000" stroke-width="1.2"/><text x="20" y="33" text-anchor="middle" font-size="5" font-weight="900" fill="#fff" font-family="monospace">RPL</text></svg>',cat:'text',desc:'Search and replace text instantly'},
    {id:'regex-tester',name:'Regex Tester',color:'#1d4ed8',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#eff6ff" stroke="#000" stroke-width="2.5"/><text x="8" y="18" font-size="8" font-weight="900" fill="#000" font-family="monospace">.*</text><text x="8" y="30" font-size="7" font-weight="700" fill="#1d4ed8" font-family="monospace">match!</text><circle cx="28" cy="14" r="6" fill="#fff" stroke="#000" stroke-width="2"/><path d="M32 18l4 4" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/></svg>',cat:'code',desc:'Test regular expressions live'},
    {id:'html-previewer',name:'HTML Previewer',color:'#1e40af',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#eff6ff" stroke="#000" stroke-width="2.5"/><rect x="8" y="10" width="24" height="18" rx="2" fill="#fff" stroke="#000" stroke-width="1.5"/><rect x="8" y="10" width="24" height="4" rx="2" fill="#1e40af" stroke="#000" stroke-width="1"/><circle cx="11" cy="12" r="1" fill="#ef4444"/><circle cx="14" cy="12" r="1" fill="#eab308"/><circle cx="17" cy="12" r="1" fill="#22c55e"/><text x="11" y="22" font-size="5" font-weight="700" fill="#000" font-family="monospace">&lt;h1&gt;</text><rect x="11" y="24" width="14" height="2" fill="#1e40af" opacity=".3"/></svg>',cat:'code',desc:'Preview HTML code in real-time'},
    {id:'hash-generator',name:'Hash Generator',color:'#1e3a8a',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#eff6ff" stroke="#000" stroke-width="2.5"/><text x="20" y="18" text-anchor="middle" font-size="14" font-weight="900" fill="#000" font-family="monospace">#</text><text x="8" y="32" font-size="5" font-weight="700" fill="#1e3a8a" font-family="monospace">a3f2b8c1...</text><rect x="8" y="22" width="24" height="4" rx="1" fill="#1e3a8a" opacity=".2" stroke="#000" stroke-width="1"/></svg>',cat:'code',desc:'Generate simple text hashes'},
    {id:'lorem-generator',name:'Lorem Generator',color:'#0369a1',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0f9ff" stroke="#000" stroke-width="2.5"/><text x="8" y="14" font-size="6" font-weight="900" fill="#000" font-family="monospace">Lorem</text><rect x="8" y="18" width="24" height="2" fill="#000" opacity=".15"/><rect x="8" y="22" width="20" height="2" fill="#000" opacity=".15"/><rect x="8" y="26" width="22" height="2" fill="#000" opacity=".15"/><rect x="8" y="30" width="16" height="2" fill="#000" opacity=".15"/><rect x="28" y="8" width="6" height="8" rx="1" fill="#0369a1" stroke="#000" stroke-width="1.2"/><text x="31" y="14" text-anchor="middle" font-size="6" font-weight="900" fill="#fff" font-family="monospace">+</text></svg>',cat:'text',desc:'Generate Lorem Ipsum placeholder text'},
    {id:'word-frequency',name:'Word Frequency',color:'#0c4a6e',icon:'<svg viewBox="0 0 40 40"><rect x="4" y="4" width="32" height="32" rx="3" fill="#f0f9ff" stroke="#000" stroke-width="2.5"/><rect x="8" y="22" width="5" height="12" fill="#0c4a6e" stroke="#000" stroke-width="1.2"/><rect x="15" y="16" width="5" height="18" fill="#0c4a6e" stroke="#000" stroke-width="1.2"/><rect x="22" y="10" width="5" height="24" fill="#0c4a6e" stroke="#000" stroke-width="1.2"/><rect x="29" y="18" width="5" height="16" fill="#0c4a6e" stroke="#000" stroke-width="1.2"/><text x="8" y="14" font-size="5" font-weight="900" fill="#000" font-family="monospace">the: 42</text></svg>',cat:'counters',desc:'Count word occurrences in text'}
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
        image:'/blog/images/ultimate-guide-seo-text-tools.jpg',
        banner:'/blog/images/ultimate-guide-seo-text-tools-banner.jpg',

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
        image:'/blog/images/meta-descriptions.jpg',
        banner:'/blog/images/meta-descriptions-banner.jpg',

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
        image:'/blog/images/json-formatting.jpg',
        banner:'/blog/images/json-formatting-banner.jpg',

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
        image:'/blog/images/markdown-bloggers.jpg',
        banner:'/blog/images/markdown-bloggers-banner.jpg',

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
        image:'/blog/images/canonical-tags.jpg',
        banner:'/blog/images/canonical-tags-banner.jpg',

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
        image:'/blog/images/open-graph-tags.jpg',
        banner:'/blog/images/open-graph-tags-banner.jpg',

        content:'<h2>Why Open Graph Tags Matter</h2><p>Open Graph tags control how your content appears when shared on social media. Without them, platforms guess how to display your link \u2014 often badly.</p><h2>Essential OG Tags</h2><p>og:title, og:description, og:image, og:url, and og:type are the must-haves. Our OG Generator creates complete tags including Twitter Card support.</p><h2>Image Specifications</h2><p>Use 1200x630px for the best results across all platforms. Keep file size under 1MB. Use JPG or PNG format.</p>'
    }
];

// ---- Init (minimal - let pages handle their own UI) ----
document.addEventListener('DOMContentLoaded', function(){
    App.initCookieConsent();
});

})();
