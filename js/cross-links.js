!function(){
  var path=location.pathname;
  var links=[];

  // Tool pages: link to related blog posts + courses
  if(path.indexOf('/tools/')!==-1){
    var id=path.match(/\/tools\/(.+)\.html/);
    if(id){
      var toolId=id[1];
      var blogMap={
        'word-counter':['what-is-keyword-density','how-to-check-keyword-density'],
        'keyword-density':['what-is-keyword-density','how-to-check-keyword-density','long-tail-keyword-strategy-2026'],
        'keyword-extract':['long-tail-keyword-strategy-2026','find-trending-keywords-before-competitors'],
        'meta-gen':['how-to-write-perfect-meta-descriptions','how-to-write-meta-descriptions'],
        'meta-desc-gen':['how-to-write-perfect-meta-descriptions','how-to-write-meta-descriptions'],
        'slug-generator':['seo-content-writing-guide','xml-sitemap-guide-seo'],
        'robots-txt':['how-to-create-robots-txt-file','technical-seo-checklist'],
        'sitemap-gen':['xml-sitemap-guide-seo','technical-seo-checklist'],
        'json-formatter':['json-formatting-best-practices'],
        'markdown-editor':['markdown-for-bloggers'],
        'markdown-preview':['markdown-for-bloggers'],
        'og-generator':['open-graph-tags-social-media'],
        'canonical-gen':['understanding-canonical-tags-seo'],
        'schema-gen':['schema-markup-types-for-seo'],
        'faq-schema-gen':['schema-markup-types-for-seo'],
        'article-schema-gen':['schema-markup-types-for-seo'],
        'breadcrumb-schema-gen':['schema-markup-types-for-seo'],
        'regex-tester':['json-formatting-best-practices'],
        'word-to-pdf':['seo-content-writing-guide'],
        'pdf-to-word':['seo-content-writing-guide'],
        'ai-content-detector':['ai-content-detection-2026','prompt-engineering-for-seo'],
        'ai-humanizer':['ai-content-detection-2026'],
        'ai-prompt-gen':['prompt-engineering-for-seo','google-ai-mode-seo-guide-2026'],
        'case-converter':['seo-content-writing-guide'],
        'readability-score':['seo-content-writing-guide','eeat-2026-google-trust-guide'],
        'hreflang-gen':['technical-seo-checklist']
      };
      if(blogMap[toolId]){
        links=links.concat(blogMap[toolId].map(function(b){return{url:'/blog/'+b+'.html',title:b.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase()})};}));
      }
      links.push({url:'/courses/',title:'Free SEO Courses'});
      links.push({url:'/blog/ultimate-guide-seo-text-tools.html',title:'Complete Guide to SEO Text Tools'});
    }
  }

  // Blog posts: link to related tools + courses
  if(path.indexOf('/blog/')!==-1 && path.indexOf('/blog/index')===-1){
    var blogId=path.match(/\/blog\/(.+)\.html/);
    if(blogId){
      var bId=blogId[1];
      var toolMap={
        'what-is-keyword-density':['keyword-density','keyword-extract'],
        'how-to-check-keyword-density':['keyword-density'],
        'long-tail-keyword-strategy-2026':['keyword-extract','keyword-density'],
        'find-trending-keywords-before-competitors':['keyword-extract'],
        'how-to-write-perfect-meta-descriptions':['meta-gen','meta-desc-gen'],
        'how-to-write-meta-descriptions':['meta-gen','meta-desc-gen'],
        'json-formatting-best-practices':['json-formatter','json-validator'],
        'markdown-for-bloggers':['markdown-editor','markdown-preview'],
        'open-graph-tags-social-media':['og-generator'],
        'understanding-canonical-tags-seo':['canonical-gen'],
        'how-to-create-robots-txt-file':['robots-txt'],
        'xml-sitemap-guide-seo':['sitemap-gen'],
        'schema-markup-types-for-seo':['schema-gen','faq-schema-gen','article-schema-gen'],
        'seo-content-writing-guide':['word-counter','case-converter','readability-score'],
        'ai-content-detection-2026':['ai-content-detector','ai-humanizer'],
        'prompt-engineering-for-seo':['ai-prompt-gen'],
        'google-ai-mode-seo-guide-2026':['ai-prompt-gen'],
        'how-to-optimize-images-for-seo':['word-to-pdf'],
        'seo-vs-sem-whats-the-difference':['keyword-density','meta-gen'],
        'how-to-improve-core-web-vitals':['word-counter'],
        'ecommerce-seo-checklist':['slug-generator','meta-gen'],
        'local-seo-checklist-2026':['robots-txt','sitemap-gen'],
        'how-to-build-backlinks-2026':['ai-content-detector'],
        'youtube-seo-guide':['meta-gen','slug-generator'],
        'zero-click-search-optimization':['meta-gen','schema-gen'],
        'chatgpt-search-vs-google-seo':['ai-prompt-gen','ai-content-detector'],
        'structured-data-for-ai-search':['schema-gen','json-formatter'],
        'google-ai-overview-spam-policy-2026':['ai-content-detector'],
        'seo-analytics-dashboard':['keyword-density','word-counter'],
        'seo-rank-tracking-guide':['keyword-extract'],
        'competitor-seo-analysis':['keyword-extract','keyword-density'],
        'google-search-console-guide-beginners':['robots-txt','sitemap-gen'],
        'seo-mistakes-killing-traffic-2026':['word-counter','meta-gen'],
        'how-to-rank-number-one-on-google':['keyword-density','meta-gen'],
        'seo-vs-aeo-answer-engine-optimization':['ai-prompt-gen','schema-gen'],
        'optimize-for-chatgpt-search-perplexity':['ai-prompt-gen','ai-content-detector'],
        'ai-search-optimization-traffic-guide':['ai-prompt-gen','ai-content-detector']
      };
      if(toolMap[bId]){
        links=links.concat(toolMap[bId].map(function(t){return{url:'/tools/'+t+'.html',title:t.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase()})};}));
      }
      links.push({url:'/courses/',title:'Free SEO Courses'});
    }
  }

  // Glossary: link to related tools + other glossary terms
  if(path.indexOf('/glossary/')!==-1 && path.indexOf('/glossary/index')===-1 && path.indexOf('/glossary/category')===-1){
    var gId=path.match(/\/glossary\/(.+)\.html/);
    if(gId){
      var glossaryMap={
        'keyword-research':['keyword-extract','keyword-density','long-tail-keyword'],
        'keyword-density':['keyword-density','what-is-keyword-density'],
        'meta-description':['meta-desc-gen','meta-gen'],
        'title-tag':['meta-gen','seo-content-writing-guide'],
        'robots-txt':['robots-txt','how-to-create-robots-txt-file'],
        'sitemap':['sitemap-gen','xml-sitemap-guide-seo'],
        'structured-data':['schema-gen','schema-markup','json-ld'],
        'schema-markup':['schema-gen','faq-schema-gen','article-schema-gen'],
        'canonical-url':['canonical-gen','understanding-canonical-tags-seo'],
        'open-graph':['og-generator','open-graph-tags-social-media'],
        'backlink':['how-to-build-backlinks-2026'],
        'internal-linking':['internal-linking-strategy-seo'],
        'image-optimization':['how-to-optimize-images-for-seo'],
        'page-speed':['how-to-improve-core-web-vitals'],
        'core-web-vitals':['how-to-improve-core-web-vitals'],
        'eeat':['eeat-2026-google-trust-guide'],
        'ai-overview':['google-ai-overview-spam-policy-2026','optimize-google-ai-overviews'],
        'generative-engine-optimization':['google-ai-mode-seo-guide-2026','seo-vs-aeo-answer-engine-optimization']
      };
      var term=gId[1];
      if(glossaryMap[term]){
        links=glossaryMap[term].map(function(u){
          var isTool=u.indexOf('/')===-1 && ['keyword-density','keyword-extract','meta-desc-gen','meta-gen','robots-txt','sitemap-gen','schema-gen','faq-schema-gen','article-schema-gen','canonical-gen','og-generator'].indexOf(u)!==-1;
          return{url:isTool?'/tools/'+u+'.html':'/blog/'+u+'.html',title:u.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase()})};
        });
      }
    }
  }

  if(!links.length)return;

  var section=document.createElement('div');
  section.style.cssText='margin-top:32px;padding-top:24px;border-top:1px solid var(--border,#262626)';
  var h=document.createElement('h3');
  h.style.cssText='font-size:.95rem;font-weight:700;margin-bottom:12px;color:var(--text,#fafafa)';
  h.textContent=path.indexOf('/tools/')!==-1?'Related Articles & Courses':'Related Tools & Courses';
  section.appendChild(h);
  var grid=document.createElement('div');
  grid.style.cssText='display:flex;flex-wrap:wrap;gap:8px';
  var seen={};
  links.slice(0,6).forEach(function(l){
    if(seen[l.url])return;
    seen[l.url]=1;
    var a=document.createElement('a');
    a.href=l.url;
    a.textContent=l.title;
    a.style.cssText='display:inline-block;padding:6px 14px;background:var(--surface,#171717);border:1px solid var(--border,#262626);border-radius:8px;font-size:.82rem;font-weight:500;color:var(--text,#fafafa);text-decoration:none;transition:border-color .2s';
    a.onmouseover=function(){a.style.borderColor='var(--accent,#2563eb)'};
    a.onmouseout=function(){a.style.borderColor='var(--border,#262626)'};
    grid.appendChild(a);
  });
  section.appendChild(grid);

  // Add after main content or sidebar
  var main=document.querySelector('.tool-output-wrap')||document.querySelector('.tool-header')||document.querySelector('main');
  if(main)main.appendChild(section);
}();
