/* ===================================================
   Free AI Text Tools - UI Components
   =================================================== */
(function(){
'use strict';
window.Comp = window.Comp || {};

// ---- Header ----
Comp.renderHeader = function(activePage){
    const links = [
        {href:'/',label:'Home',id:'home'},
        {href:'/tools/',label:'Tools',id:'tools'},
        {href:'/blog/',label:'Blog',id:'blog'},
        {href:'/about.html',label:'About',id:'about'},
        {href:'/advertise.html',label:'Advertise',id:'advertise'}
    ];
    let navHTML = links.map(l =>
        '<a href="'+l.href+'" class="'+(l.id===activePage?'active':'')+'">'+l.label+'</a>'
    ).join('');

    return '<header class="site-header" id="siteHeader">'+
    '<div class="header-inner">'+
        '<a href="/" class="logo"><div class="logo-icon">T</div><div>Free AI <strong>Text Tools</strong></div></a>'+
        '<nav class="nav" id="mainNav" aria-label="Main navigation">'+navHTML+'<a href="/tools/" class="nav-cta">All 37 Tools</a></nav>'+
        '<button class="mobile-menu" id="mobileMenu" aria-label="Toggle menu">☰</button>'+
        '<button class="theme-btn" id="themeToggle" aria-label="Toggle dark mode">🌙</button>'+
    '</div>'+
'</header>';
};

// ---- Footer ----
Comp.renderFooter = function(){
    return '<footer class="site-footer">'+
    '<div class="container">'+
        '<div class="footer-grid">'+
            '<div class="footer-col">'+
                '<h4>Free AI Text Tools</h4>'+
                '<p>37 free AI-powered text and SEO utility tools. Fast, accurate, and works entirely in your browser.</p>'+
            '</div>'+
            '<div class="footer-col">'+
                '<h4>Text Tools</h4>'+
                '<a href="/tools/duplicate-remover.html">Duplicate Remover</a>'+
                '<a href="/tools/word-counter.html">Word Counter</a>'+
                '<a href="/tools/case-converter.html">Case Converter</a>'+
                '<a href="/tools/json-formatter.html">JSON Formatter</a>'+
                '<a href="/tools/">View All →</a>'+
            '</div>'+
            '<div class="footer-col">'+
                '<h4>SEO Tools</h4>'+
                '<a href="/tools/meta-gen.html">Meta Tag Generator</a>'+
                '<a href="/tools/og-generator.html">OG Generator</a>'+
                '<a href="/tools/robots-txt.html">Robots.txt Generator</a>'+
                '<a href="/tools/sitemap-gen.html">Sitemap Generator</a>'+
            '</div>'+
            '<div class="footer-col">'+
                '<h4>Company</h4>'+
                '<a href="/about.html">About Us</a>'+
                '<a href="/blog/">Blog</a>'+
                '<a href="/contact.html">Contact</a>'+
                '<a href="/advertise.html">Advertise</a>'+
                '<a href="/privacy-policy.html">Privacy Policy</a>'+
                '<a href="/terms.html">Terms & Conditions</a>'+
                '<a href="/cookie-policy.html">Cookie Policy</a>'+
            '</div>'+
        '</div>'+
        '<div class="footer-bottom">'+
            '<p>&copy; '+new Date().getFullYear()+' Free AI Text Tools. All rights reserved.</p>'+
        '</div>'+
    '</div>'+
'</footer>';
};

// ---- Ad Components ----
Comp.topBannerAd = function(){
    return '<div class="ad-container top-banner" data-slot="top-banner">'+
        '<span class="ad-label">Advertisement</span>'+
        '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="horizontal" data-full-width-responsive="true"></ins>'+
    '</div>';
};

Comp.inContentAd = function(){
    return '<div class="ad-container" data-slot="in-content">'+
        '<span class="ad-label">Advertisement</span>'+
        '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>'+
    '</div>';
};

Comp.sidebarAd = function(){
    return '<div class="ad-container sidebar-ad" data-slot="sidebar">'+
        '<span class="ad-label">Advertisement</span>'+
        '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>'+
    '</div>';
};

Comp.stickyBottomAd = function(){
    return '<div class="ad-container sticky-bottom" data-slot="sticky-bottom">'+
        '<span class="ad-label">Advertisement</span>'+
        '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>'+
    '</div>';
};

// ---- Cookie Banner ----
Comp.renderCookieBanner = function(){
    return '<div class="cookie-banner" id="cookieBanner">'+
        '<p>We use cookies to improve your experience and serve personalized ads. <a href="/cookie-policy.html">Learn more</a></p>'+
        '<div class="btn-group">'+
            '<button class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>'+
            '<button class="btn btn-sm" id="cookieReject">Reject</button>'+
        '</div>'+
    '</div>';
};

// ---- Affiliate Box ----
Comp.affiliateBox = function(tool){
    return '<div class="affiliate-box">'+
        '<span class="affiliate-badge">'+(tool.badge||'Recommended')+'</span>'+
        '<h4>'+tool.name+'</h4>'+
        '<p>'+tool.desc+'</p>'+
        '<a href="'+tool.url+'" class="btn btn-primary btn-sm" rel="nofollow sponsored">Try Free →</a>'+
    '</div>';
};

// ---- Related Posts ----
Comp.relatedPosts = function(currentSlug){
    if(typeof App === 'undefined') return '';
    const posts = App.blogPosts.filter(function(p){ return p.slug !== currentSlug; }).slice(0,3);
    if(!posts.length) return '';
    return '<div class="section-header"><h2>Related Articles</h2></div>'+
    '<div class="blog-grid">'+posts.map(function(p){
        return '<a href="/blog/'+p.slug+'.html" class="blog-card">'+
            '<div class="blog-card-img">'+(p.image ? '<img src="'+p.image+'" alt="'+p.title+'" loading="lazy">' : '<div style="height:180px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700;color:var(--accent)">'+p.category.charAt(0)+'</div>')+'</div>'+
            '<div class="blog-card-body">'+
                '<div class="blog-card-meta"><span class="blog-tag">'+p.category+'</span><span>'+p.readTime+' read</span></div>'+
                '<h3>'+p.title+'</h3>'+
                '<p>'+p.excerpt+'</p>'+
            '</div>'+
        '</a>';
    }).join('')+'</div>';
};

// ---- Sidebar Widgets ----
Comp.toolSidebar = function(currentToolId){
    var categories = {
        'Text Tools': ['duplicate-remover','line-sorter','alpha-sorter','text-reverser','remove-spaces','case-converter'],
        'Counters': ['word-counter','char-counter','sentence-counter','paragraph-counter'],
        'Encoders': ['url-encoder','url-decoder','html-encoder','html-decoder','b64-encoder','b64-decoder'],
        'Code Tools': ['json-formatter','json-validator','xml-formatter','xml-validator','markdown-editor','markdown-preview'],
        'SEO Tools': ['robots-txt','sitemap-gen','meta-gen','og-generator','slug-generator','meta-desc-gen','canonical-gen','keyword-density','keyword-extract']
    };
    var html = '';
    Object.keys(categories).forEach(function(cat){
        var tools = categories[cat];
        html += '<div class="sidebar-widget"><h3>'+cat+'</h3><ul>';
        tools.forEach(function(id){
            var t = App.getToolById(id);
            if(t) html += '<li><a href="/tools/'+id+'.html" class="'+(id===currentToolId?'active':'')+'">'+t.name+'</a></li>';
        });
        html += '</ul></div>';
    });
    html += Comp.sidebarAd();
    return html;
};

// ---- Blog Sidebar ----
Comp.blogSidebar = function(){
    var html = '<div class="sidebar-widget"><h3>Categories</h3><ul>';
    ['SEO Tools','SEO Tips','Development','Blogging','Social Media','Content Marketing'].forEach(function(c){
        html += '<li><a href="/blog/?category='+encodeURIComponent(c)+'">'+c+'</a></li>';
    });
    html += '</ul></div>';
    html += '<div class="sidebar-widget"><h3>Popular Posts</h3><ul>';
    App.blogPosts.slice(0,4).forEach(function(p){
        html += '<li><a href="/blog/'+p.slug+'.html">'+p.title+'</a></li>';
    });
    html += '</ul></div>';
    html += Comp.sidebarAd();
    return html;
};

// ---- Social Share Buttons ----
Comp.shareButtons = function(url, title){
    var u = encodeURIComponent(url);
    var t = encodeURIComponent(title);
    return '<div class="share-btns">'+
        '<a href="https://twitter.com/intent/tweet?url='+u+'&text='+t+'" target="_blank" rel="noopener" class="share-btn twitter">Twitter</a>'+
        '<a href="https://www.facebook.com/sharer/sharer.php?u='+u+'" target="_blank" rel="noopener" class="share-btn facebook">Facebook</a>'+
        '<a href="https://www.linkedin.com/shareArticle?mini=true&url='+u+'&title='+t+'" target="_blank" rel="noopener" class="share-btn linkedin">LinkedIn</a>'+
        '<a href="https://www.reddit.com/submit?url='+u+'&title='+t+'" target="_blank" rel="noopener" class="share-btn reddit">Reddit</a>'+
    '</div>';
};

// ---- FAQ Component ----
Comp.faqSection = function(faqs){
    return '<div class="faq-section">'+faqs.map(function(f){
        return '<details class="faq-item">'+
            '<summary class="faq-question">'+f.q+' <span>▼</span></summary>'+
            '<div class="faq-answer"><p>'+f.a+'</p></div>'+
        '</details>';
    }).join('')+'</div>';
};

// ---- Inject page template ----
Comp.injectPage = function(config){
    var appJS = document.getElementById('appScript');
    var appSrc = appJS ? appJS.src : '/js/app.js';
    document.documentElement.innerHTML = '<!DOCTYPE html>'+
'<html lang="en">'+
'<head>'+
    '<meta charset="UTF-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
    '<title>'+(config.title || 'Free AI Text Tools')+'</title>'+
    '<meta name="description" content="'+(config.description || '')+'">'+
    '<meta name="keywords" content="'+(config.keywords || '')+'">'+
    '<meta name="robots" content="index, follow">'+
    '<link rel="canonical" href="'+(config.canonical || '')+'">'+
    '<meta property="og:title" content="'+(config.title || '')+'">'+
    '<meta property="og:description" content="'+(config.description || '')+'">'+
    '<meta property="og:type" content="'+(config.ogType || 'website')+'">'+
    '<meta property="og:url" content="'+(config.canonical || '')+'">'+
    '<meta property="og:site_name" content="Free AI Text Tools">'+
    '<meta name="twitter:card" content="summary_large_image">'+
    '<meta name="twitter:title" content="'+(config.title || '')+'">'+
    '<meta name="twitter:description" content="'+(config.description || '')+'">'+
    (config.schema ? '<script type="application/ld+json">'+config.schema+'</script>' : '')+
    '<link rel="preconnect" href="https://fonts.googleapis.com">'+
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'+
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">'+
    '<link rel="stylesheet" href="/css/style.css">'+
'</head>'+
'<body>'+
    (config.body || '')+
    '<div id="appToast" class="toast" role="alert"></div>'+
    Comp.renderCookieBanner()+
    '<script id="appScript" src="/js/app.js"><\/script>'+
    '<script src="/js/components.js"><\/script>'+
    (config.scripts || '')+
'</body>'+
'</html>';
};

})();
