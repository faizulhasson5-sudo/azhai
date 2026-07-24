/* KwordSEO — SEO Tools Module */
(function(){
'use strict';

var m=location.pathname.match(/\/tools\/(.+)\.html/);
if(!m)return;
var tid=m[1];

ToolRegistry.register('keyword-density',function(input){
  var wk=input.toLowerCase().match(/\b[a-z']+\b/g)||[];
  var f={};Object.keys(wk).forEach(function(k){var w=wk[k];f[w]=(f[w]||0)+1;});
  var stopWords={'the':1,'a':1,'an':1,'and':1,'or':1,'but':1,'in':1,'on':1,'at':1,'to':1,'for':1,'of':1,'with':1,'by':1,'is':1,'was':1,'are':1,'were':1,'been':1,'be':1,'have':1,'has':1,'had':1,'do':1,'does':1,'did':1,'will':1,'would':1,'could':1,'should':1,'may':1,'might':1,'shall':1,'can':1,'this':1,'that':1,'these':1,'those':1,'it':1,'its':1,'from':1,'as':1,'if':1,'than':1,'not':1,'no':1,'so':1,'up':1,'out':1,'about':1,'into':1,'over':1,'after':1,'all':1,'also':1,'how':1,'many':1,'some':1,'then':1,'more':1,'very':1,'just':1,'now':1};
  var totalW=countWords(input);
  var kw=document.getElementById('opt-kw')?document.getElementById('opt-kw').value.trim().toLowerCase():'';
  var freq={};Object.keys(f).forEach(function(w){if(!stopWords[w]&&f[w]>1)freq[w]=f[w];});
  var sorted=Object.keys(freq).sort(function(a,b){return freq[b]-freq[a];});
  if(kw){sorted=sorted.filter(function(w){return w.indexOf(kw)!==-1;});}
  sorted=sorted.slice(0,20);
  var tb='<table class="result-table"><thead><tr><th>Keyword</th><th>Count</th><th>Density</th></tr></thead><tbody>';
  sorted.forEach(function(w){tb+='<tr><td>'+esc(w)+'</td><td>'+freq[w]+'</td><td>'+(freq[w]/totalW*100).toFixed(2)+'%</td></tr>';});
  tb+='</tbody></table><p style="font-size:.8rem;color:var(--text-2)">Total words: '+totalW+'</p>';
  showOutput(tb);
});

ToolRegistry.register('keyword-extract',function(input){
  var wk=input.toLowerCase().match(/\b[a-z']+\b/g)||[];
  var f={};Object.keys(wk).forEach(function(k){var w=wk[k];f[w]=(f[w]||0)+1;});
  var stopWords={'the':1,'a':1,'an':1,'and':1,'or':1,'but':1,'in':1,'on':1,'at':1,'to':1,'for':1,'of':1,'with':1,'by':1,'is':1,'was':1,'are':1,'were':1,'been':1,'be':1,'have':1,'has':1,'had':1,'do':1,'does':1,'did':1,'will':1,'would':1,'could':1,'should':1,'may':1,'might':1,'shall':1,'can':1,'this':1,'that':1,'these':1,'those':1,'it':1,'its':1,'from':1,'as':1,'if':1,'than':1,'not':1,'no':1,'so':1,'up':1,'out':1,'about':1,'into':1,'over':1,'after':1,'all':1,'also':1,'how':1,'many':1,'some':1,'then':1,'more':1,'very':1,'just':1,'now':1};
  var totalW=countWords(input);
  var kw=document.getElementById('opt-kw')?document.getElementById('opt-kw').value.trim().toLowerCase():'';
  var freq={};Object.keys(f).forEach(function(w){if(!stopWords[w]&&f[w]>1)freq[w]=f[w];});
  var sorted=Object.keys(freq).sort(function(a,b){return freq[b]-freq[a];});
  if(kw){sorted=sorted.filter(function(w){return w.indexOf(kw)!==-1;});}
  sorted=sorted.slice(0,20);
  var tb='<table class="result-table"><thead><tr><th>Keyword</th><th>Count</th><th>Density</th></tr></thead><tbody>';
  sorted.forEach(function(w){tb+='<tr><td>'+esc(w)+'</td><td>'+freq[w]+'</td><td>'+(freq[w]/totalW*100).toFixed(2)+'%</td></tr>';});
  tb+='</tbody></table><p style="font-size:.8rem;color:var(--text-2)">Total words: '+totalW+'</p>';
  showOutput(tb);
});

ToolRegistry.register('meta-gen',function(input){
  var ti=document.getElementById('opt-mt').value;
  var de=document.getElementById('opt-md').value;
  var ke=document.getElementById('opt-mk').value;
  var au=document.getElementById('opt-ma').value;
  var meta='<span class="hl-tag">&lt;title&gt;</span>'+esc(ti)+'<span class="hl-tag">&lt;/title&gt;</span>\n';
  meta+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">name</span>=<span class="hl-str">"description"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(de)+'"</span><span class="hl-tag">&gt;</span>\n';
  if(ke)meta+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">name</span>=<span class="hl-str">"keywords"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(ke)+'"</span><span class="hl-tag">&gt;</span>\n';
  if(au)meta+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">name</span>=<span class="hl-str">"author"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(au)+'"</span><span class="hl-tag">&gt;</span>\n';
  meta+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">property</span>=<span class="hl-str">"og:title"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(ti)+'"</span><span class="hl-tag">&gt;</span>\n';
  meta+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">property</span>=<span class="hl-str">"og:description"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(de)+'"</span><span class="hl-tag">&gt;</span>\n';
  meta+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">name</span>=<span class="hl-str">"twitter:card"</span> <span class="hl-attr">content</span>=<span class="hl-str">"summary_large_image"</span><span class="hl-tag">&gt;</span>';
  showOutput('<div class="code-block"><pre>'+meta+'</pre></div>');
});

ToolRegistry.register('meta-desc-gen',function(input){
  var kw=document.getElementById('opt-dk')?document.getElementById('opt-dk').value.trim():'';
  var sentences=input.replace(/\s+/g,' ').split(/[.!?]+/).filter(function(s){return s.trim().length>10;});
  var desc='';
  if(kw){
    var kwLower=kw.toLowerCase();
    var kwSentence=sentences.find(function(s){return s.toLowerCase().indexOf(kwLower)!==-1;});
    if(kwSentence)desc=kwSentence.trim();
  }
  if(!desc&&sentences.length>0)desc=sentences[0].trim();
  if(desc.length>155)desc=desc.substring(0,152).replace(/\s+\S*$/,'')+'...';
  if(kw&&desc.toLowerCase().indexOf(kw.toLowerCase())===-1)desc=kw+' - '+desc;
  if(desc.length>160)desc=desc.substring(0,157).replace(/\s+\S*$/,'')+'...';
  showOutput('<div class="output-content"><p><strong>Meta Description:</strong></p><p>'+esc(desc)+'</p><p style="font-size:.8rem;color:var(--text-2)">Length: '+desc.length+' characters (recommended: 150-160)</p>'+(kw?'<p style="font-size:.8rem;color:var(--text-2)">Target keyword: '+esc(kw)+'</p>':'')+'</div>');
});

ToolRegistry.register('og-generator',function(input){
  var ot=document.getElementById('opt-ot').value;
  var od=document.getElementById('opt-od').value;
  var oi=document.getElementById('opt-oi').value;
  var og='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">property</span>=<span class="hl-str">"og:title"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(ot)+'"</span><span class="hl-tag">&gt;</span>\n';
  og+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">property</span>=<span class="hl-str">"og:description"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(od)+'"</span><span class="hl-tag">&gt;</span>\n';
  og+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">property</span>=<span class="hl-str">"og:type"</span> <span class="hl-attr">content</span>=<span class="hl-str">"website"</span><span class="hl-tag">&gt;</span>\n';
  if(oi)og+='<span class="hl-tag">&lt;meta</span> <span class="hl-attr">property</span>=<span class="hl-str">"og:image"</span> <span class="hl-attr">content</span>=<span class="hl-str">"'+esc(oi)+'"</span><span class="hl-tag">&gt;</span>';
  showOutput('<div class="code-block"><pre>'+og+'</pre></div>');
});

ToolRegistry.register('canonical-gen',function(input){
  var cu=document.getElementById('opt-cu').value;
  var out=document.getElementById('tool-output');
  if(!cu){out.innerHTML='<p style="color:var(--text-2)">Enter a page URL.</p>';return;}
  showOutput('<div class="code-block"><pre><span class="hl-tag">&lt;link</span> <span class="hl-attr">rel</span>=<span class="hl-str">"canonical"</span> <span class="hl-attr">href</span>=<span class="hl-str">"'+esc(cu)+'"</span><span class="hl-tag">&gt;</span></pre></div>');
});

ToolRegistry.register('robots-txt',function(input){
  var ua=document.getElementById('opt-ru').value||'*';
  var cd=document.getElementById('opt-rc').value;
  var rd=document.getElementById('opt-rd').value;
  var rs=document.getElementById('opt-rs').value;
  var rt='User-agent: '+ua+'\n';
  if(cd)rt+='Crawl-delay: '+cd+'\n';
  rt+='\n';
  if(rd){rd.split('\n').forEach(function(l){if(l.trim())rt+='Disallow: '+l.trim()+'\n';});}
  rt+='\nSitemap: '+(rs||'https://example.com/sitemap.xml');
  showOutput('<div class="code-block"><pre>'+esc(rt)+'</pre></div>');
});

ToolRegistry.register('sitemap-gen',function(input){
  var su=input;
  var urls=su.split('\n').filter(function(u){return u.trim();});
  var xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  urls.forEach(function(u){xml+='  <url>\n    <loc>'+esc(u.trim())+'</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n';});
  xml+='</urlset>';
  showOutput('<div class="code-block"><pre>'+xml+'</pre></div>');
});

ToolRegistry.register('hreflang-gen',function(input){
  var hlDef=document.getElementById('opt-hl').value.trim()||'en';
  var hlLines=document.getElementById('opt-hlu').value.split('\n').filter(function(l){return l.trim();});
  var hl='<span class="hl-tag">&lt;link</span> <span class="hl-attr">rel</span>=<span class="hl-str">"alternate"</span> <span class="hl-attr">hreflang</span>=<span class="hl-str">"'+esc(hlDef)+'"</span> <span class="hl-attr">href</span>=<span class="hl-str">"'+esc(input.trim())+'"</span><span class="hl-tag">&gt;</span>';
  hlLines.forEach(function(l){var p=l.split('|');if(p.length===2)hl+='\n<span class="hl-tag">&lt;link</span> <span class="hl-attr">rel</span>=<span class="hl-str">"alternate"</span> <span class="hl-attr">hreflang</span>=<span class="hl-str">"'+esc(p[0].trim())+'"</span> <span class="hl-attr">href</span>=<span class="hl-str">"'+esc(p[1].trim())+'"</span><span class="hl-tag">&gt;</span>';});
  hl+='\n<span class="hl-tag">&lt;link</span> <span class="hl-attr">rel</span>=<span class="hl-str">"alternate"</span> <span class="hl-attr">hreflang</span>=<span class="hl-str">"x-default"</span> <span class="hl-attr">href</span>=<span class="hl-str">"'+esc(input.trim())+'"</span><span class="hl-tag">&gt;</span>';
  showOutput('<div class="code-block"><pre>'+hl+'</pre></div>');
});

ToolRegistry.register('schema-gen',function(input){
  var st=document.getElementById('opt-st').value;
  var sdBase={'@context':'https://schema.org','@type':st==='localbusiness'?'LocalBusiness':st==='product'?'Product':st.charAt(0).toUpperCase()+st.slice(1)};
  if(st==='article'){sdBase.headline=input.trim();sdBase.datePublished=new Date().toISOString().slice(0,10);}
  else if(st==='product'){sdBase.name=input.trim();sdBase.offers={'@type':'Offer','price':'0','priceCurrency':'USD'};}
  else if(st==='localbusiness'){sdBase.name=input.trim();sdBase.url=input.trim();}
  showOutput('<div class="code-block"><pre>'+esc(JSON.stringify(sdBase,null,2))+'</pre></div><p style="font-size:.8rem;color:var(--text-2);margin-top:8px">Copy this JSON-LD and paste it in a <code>&lt;script type="application/ld+json"&gt;</code> tag in your page head.</p>');
});

ToolRegistry.register('faq-schema-gen',function(input){
  var faqInput=document.getElementById('opt-faq').value.trim();
  var out=document.getElementById('tool-output');
  if(!faqInput){out.innerHTML='<p style="color:var(--text-2)">Enter Q&A pairs.</p>';return;}
  var faqPairs=faqInput.split(/\n\s*\n/);
  var faqEntities=[];
  faqPairs.forEach(function(pair){var pairLines=pair.split('\n').filter(function(l){return l.trim();});if(pairLines.length>=2){faqEntities.push({'@type':'Question','name':pairLines[0].trim(),acceptedAnswer:{'@type':'Answer',text:pairLines.slice(1).join(' ').trim()}});}});
  var faqSchema={'@context':'https://schema.org','@type':'FAQPage','mainEntity':faqEntities};
  showOutput('<div class="code-block"><pre>'+esc(JSON.stringify(faqSchema,null,2))+'</pre></div><p style="font-size:.8rem;color:var(--text-2);margin-top:8px">'+faqEntities.length+' FAQ pairs generated. Paste in a <code>&lt;script type="application/ld+json"&gt;</code> tag.</p>');
});

ToolRegistry.register('article-schema-gen',function(input){
  var ah=document.getElementById('opt-ah').value.trim()||input.trim();
  var aa=document.getElementById('opt-aa').value.trim()||'Author';
  var ad=document.getElementById('opt-ad').value||new Date().toISOString().slice(0,10);
  var ai=document.getElementById('opt-ai').value.trim();
  var artSchema={'@context':'https://schema.org','@type':'Article','headline':ah,'author':{'@type':'Person','name':aa},'datePublished':ad,'dateModified':ad};
  if(ai)artSchema.image=ai;
  showOutput('<div class="code-block"><pre>'+esc(JSON.stringify(artSchema,null,2))+'</pre></div><p style="font-size:.8rem;color:var(--text-2);margin-top:8px">Paste this in a <code>&lt;script type="application/ld+json"&gt;</code> tag in your article page.</p>');
});

ToolRegistry.register('breadcrumb-schema-gen',function(input){
  var bcInput=document.getElementById('opt-bc').value.trim();
  var out=document.getElementById('tool-output');
  if(!bcInput){out.innerHTML='<p style="color:var(--text-2)">Enter breadcrumb items.</p>';return;}
  var bcItems=bcInput.split('\n').filter(function(l){return l.trim();});
  var bcList=[];
  bcItems.forEach(function(item,i){var p=item.split('|');if(p.length===2)bcList.push({'@type':'ListItem','position':i+1,'name':p[0].trim(),'item':p[1].trim()});});
  var bcSchema={'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':bcList};
  showOutput('<div class="code-block"><pre>'+esc(JSON.stringify(bcSchema,null,2))+'</pre></div><p style="font-size:.8rem;color:var(--text-2);margin-top:8px">'+bcList.length+' breadcrumb items. Paste in a <code>&lt;script type="application/ld+json"&gt;</code> tag.</p>');
});

/* SEO tool options */
if(tid==='keyword-density'||tid==='keyword-extract'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Focus keyword:</label><input type="text" id="opt-kw" placeholder="optional specific keyword" style="width:200px"></div>';
}
if(tid==='meta-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Title:</label><input type="text" id="opt-mt" placeholder="Page title"></div><div class="tool-option"><label>Description:</label><input type="text" id="opt-md" placeholder="Page description"></div><div class="tool-option"><label>Keywords:</label><input type="text" id="opt-mk" placeholder="keyword1, keyword2"></div><div class="tool-option"><label>Author:</label><input type="text" id="opt-ma" placeholder="Author name"></div>';
}
if(tid==='meta-desc-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Target keyword:</label><input type="text" id="opt-dk" placeholder="primary keyword"></div>';
}
if(tid==='og-generator'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Title:</label><input type="text" id="opt-ot" placeholder="OG title"></div><div class="tool-option"><label>Description:</label><input type="text" id="opt-od" placeholder="OG description"></div><div class="tool-option"><label>Image URL:</label><input type="url" id="opt-oi" placeholder="https://example.com/image.jpg"></div>';
}
if(tid==='canonical-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Page URL:</label><input type="url" id="opt-cu" placeholder="https://example.com/page" style="width:100%"></div>';
}
if(tid==='robots-txt'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>User-agent:</label><input type="text" id="opt-ru" value="*" style="width:80px"></div><div class="tool-option"><label>Crawl-delay (sec):</label><input type="number" id="opt-rc" placeholder="10" style="width:80px"></div><div class="tool-option"><label>Disallow paths:</label><textarea id="opt-rd" placeholder="/admin/&#10;/private/" style="width:100%;min-height:60px;font-family:var(--mono);font-size:.8rem"></textarea></div><div class="tool-option"><label>Sitemap URL:</label><input type="url" id="opt-rs" placeholder="https://example.com/sitemap.xml" style="width:100%"></div>';
}
if(tid==='sitemap-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Page URLs (one per line):</label><textarea id="opt-su" placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact" style="width:100%;min-height:100px;font-family:var(--mono);font-size:.8rem"></textarea></div>';
}
if(tid==='hreflang-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Default language:</label><input type="text" id="opt-hl" value="en" style="width:60px"></div><div class="tool-option"><label>Alternate URLs (one per line, format: lang|url):</label><textarea id="opt-hlu" placeholder="es|https://example.com/es/&#10;fr|https://example.com/fr/&#10;de|https://example.com/de/" style="width:100%;min-height:80px;font-family:var(--mono);font-size:.8rem"></textarea></div>';
}
if(tid==='schema-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Schema type:</label><select id="opt-st"><option value="article">Article</option><option value="faq">FAQ</option><option value="breadcrumb">Breadcrumb</option><option value="product">Product</option><option value="localbusiness">Local Business</option></select></div>';
}
if(tid==='faq-schema-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><span style="font-size:.8rem;color:var(--text-2)">Enter Q&A pairs below. Separate with blank lines.</span></div><div class="tool-option"><label>Pairs (Q and A on separate lines):</label><textarea id="opt-faq" placeholder="What is your return policy?&#10;We offer a 30-day money-back guarantee.&#10;&#10;How do I contact support?&#10;Email us at support@example.com" style="width:100%;min-height:120px;font-family:var(--mono);font-size:.8rem"></textarea></div>';
}
if(tid==='article-schema-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Headline:</label><input type="text" id="opt-ah" placeholder="Article headline"></div><div class="tool-option"><label>Author:</label><input type="text" id="opt-aa" placeholder="Author name"></div><div class="tool-option"><label>Date Published:</label><input type="date" id="opt-ad"></div><div class="tool-option"><label>Image URL:</label><input type="url" id="opt-ai" placeholder="https://example.com/image.jpg" style="width:100%"></div>';
}
if(tid==='breadcrumb-schema-gen'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Breadcrumb items (one per line, format: label|url):</label><textarea id="opt-bc" placeholder="Home|https://example.com/&#10;Blog|https://example.com/blog/&#10;Current Page|https://example.com/blog/post" style="width:100%;min-height:80px;font-family:var(--mono);font-size:.8rem"></textarea></div>';
}

})();
