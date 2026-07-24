/* KwordSEO — Code Tools Module */
(function(){
'use strict';

var m=location.pathname.match(/\/tools\/(.+)\.html/);
if(!m)return;
var tid=m[1];

ToolRegistry.register('json-formatter',function(input){
  var ind=document.getElementById('opt-ji').value;
  var indent=ind==='tab'?'  ':parseInt(ind)||2;
  try{var parsed=JSON.parse(input);showOutput('<div class="code-block"><pre>'+esc(JSON.stringify(parsed,null,indent))+'</pre></div>');}
  catch(e){showOutput('<p style="color:var(--accent)">JSON Error: '+esc(e.message)+'</p>');}
});

ToolRegistry.register('json-validator',function(input){
  try{JSON.parse(input);showOutput('<p style="color:var(--success)">&#10003; Valid JSON</p><p style="font-size:.8rem;color:var(--text-2)">The JSON is syntactically correct.</p>');}
  catch(e){showOutput('<p style="color:var(--danger)">&#10007; Invalid JSON</p><p style="font-size:.8rem;color:var(--text-2)">'+esc(e.message)+'</p>');}
});

ToolRegistry.register('xml-formatter',function(input){
  try{
    var xf=input.replace(/>\s*</g,'>\n<').split('\n');
    var xd=0;var xf2=[];
    xf.forEach(function(l){l=l.trim();if(!l)return;if(l.match(/^<\/.+>$/))xd--;
    xf2.push('  '.repeat(Math.max(xd,0))+l);
    if(l.match(/^<[^\/][^>]*[^\/]>$/)&&!l.match(/^<(meta|link|br|hr|img|input|area|base|col|embed|source|track|wbr)[^>]*>$/))xd++;});
    showOutput('<div class="code-block"><pre>'+esc(xf2.join('\n'))+'</pre></div>');
  }catch(e){showOutput('<p style="color:var(--accent)">XML Error: '+esc(e.message)+'</p>');}
});

ToolRegistry.register('xml-validator',function(input){
  var xv=input.trim();
  if(!xv.startsWith('<')){showOutput('<p style="color:var(--danger)">&#10007; Not valid XML</p>');}
  else{var xtags=(xv.match(/<\/?[^>]+>/g)||[]);var xstack=[];
  xtags.forEach(function(t){if(t.match(/^<[^\/]/)&&!t.match(/\/\s*>$/)){var tn=t.match(/<(\w+)/);if(tn)xstack.push(tn[1]);}
  else if(t.match(/^<\//)){var tn2=t.match(/<\/(\w+)/);if(tn2&&xstack.length&&xstack[xstack.length-1]===tn2[1])xstack.pop();}});
  showOutput(xstack.length===0?'<p style="color:var(--success)">&#10003; Valid XML</p>':'<p style="color:var(--danger)">&#10007; Invalid XML - unclosed tags</p>');}
});

ToolRegistry.register('markdown-editor',function(input){
  var mdLib=window.marked;
  if(mdLib&&mdLib.parse){showOutput('<div class="output-content" style="padding:1rem">'+mdLib.parse(input)+'</div>');}
  else{showOutput('<div class="output-content"><pre>'+esc(input)+'</pre></div>');}
});

ToolRegistry.register('markdown-preview',function(input){
  var mdLib=window.marked;
  if(mdLib&&mdLib.parse){showOutput('<div class="output-content" style="padding:1rem">'+mdLib.parse(input)+'</div>');}
  else{showOutput('<div class="output-content"><pre>'+esc(input)+'</pre></div>');}
});

ToolRegistry.register('html-previewer',function(input){
  showOutput('<div class="output-content" style="padding:0"><iframe srcdoc="'+esc(input)+'" sandbox="allow-scripts" style="width:100%;min-height:400px;border:1px solid var(--border);border-radius:var(--radius)"></iframe></div>');
});

ToolRegistry.register('regex-tester',function(input){
  var rp=document.getElementById('opt-rp2').value;
  var rf=document.getElementById('opt-rf').value;
  var out=document.getElementById('tool-output');
  if(!rp){out.innerHTML='<p style="color:var(--text-2)">Enter a regex pattern.</p>';return;}
  try{
    var rre=new RegExp(rp,rf);
    var matches=[];
    var rm;
    while((rm=rre.exec(input))!==null){matches.push({match:rm[0],index:rm.index,length:rm[0].length});if(!rf.includes('g'))break;}
    var highlighted=esc(input);
    var searchFrom=0;
    var markOpen='<mark style="background:rgba(108,60,224,0.15);color:var(--accent);padding:2px 4px;border-radius:4px">';
    var markClose='</mark>';
    matches.forEach(function(m2){var escM=esc(m2.match);var idx=highlighted.indexOf(escM,searchFrom);if(idx!==-1){highlighted=highlighted.substring(0,idx)+markOpen+escM+markClose+highlighted.substring(idx+escM.length);searchFrom=idx+markOpen.length+escM.length+markClose.length;}});
    showOutput('<div class="output-content"><div style="padding:1rem;border:1px solid var(--border);border-radius:var(--radius);margin-bottom:.5rem">'+highlighted+'</div><p style="font-size:.8rem;color:var(--text-2)">'+matches.length+' match(es) found</p></div>');
  }catch(e){showOutput('<p style="color:var(--accent)">Regex Error: '+esc(e.message)+'</p>');}
});

ToolRegistry.register('hash-generator',function(input){
  var ha=document.getElementById('opt-ha').value;
  function djb2(s){var h=5381;for(var i=0;i<s.length;i++){h=((h<<5)+h)+s.charCodeAt(i);h=h&h;}return(h>>>0).toString(16);}
  function fnv(s){var h=2166136261;for(var i=0;i<s.length;i++){h=h^s.charCodeAt(i);h=(h*16777619)>>>0;}return h.toString(16);}
  var result='<div class="output-content">';
  if(ha==='djb2'||ha==='both')result+='<p><strong>djb2:</strong> '+djb2(input)+'</p>';
  if(ha==='fnv'||ha==='both')result+='<p><strong>FNV-1a:</strong> '+fnv(input)+'</p>';
  result+='</div>';
  showOutput(result);
});

/* Code tool options */
if(tid==='json-formatter'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Indent:</label><select id="opt-ji"><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tab</option></select></div>';
}
if(tid==='hash-generator'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Algorithm:</label><select id="opt-ha"><option value="djb2">djb2</option><option value="fnv">FNV-1a</option><option value="both" selected>Both</option></select></div>';
}
if(tid==='regex-tester'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Pattern:</label><input type="text" id="opt-rp2" placeholder="[a-z]+" style="width:250px;font-family:var(--mono)" maxlength="200"></div><div class="tool-option"><label>Flags:</label><input type="text" id="opt-rf" value="gi" style="width:60px" maxlength="10"></div>';
}
if(tid==='markdown-editor'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><span style="font-size:.8rem;color:var(--text-2)">Write Markdown on the left, see live HTML preview on the right.</span></div>';
}

})();
