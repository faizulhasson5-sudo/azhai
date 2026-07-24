/* KwordSEO — Text Tools Module */
(function(){
'use strict';

var m=location.pathname.match(/\/tools\/(.+)\.html/);
if(!m)return;
var tid=m[1];

function cv(mode){
  var t=document.getElementById('tool-input').value;
  if(!t)return;
  var r='';
  switch(mode){
  case'upper':r=t.toUpperCase();break;
  case'lower':r=t.toLowerCase();break;
  case'title':r=t.replace(/\w\S*/g,function(w){return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();});break;
  case'sentence':r=t.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g,function(c){return c.toUpperCase();});break;
  case'toggle':r=t.split('').map(function(c){return c===c.toUpperCase()?c.toLowerCase():c.toUpperCase();}).join('');break;
  }
  showOutput('<div class="output-content"><pre>'+esc(r)+'</pre></div>');
}
window.convertCase=cv;

if(tid==='case-converter'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Mode:</label><select id="opt-case" onchange="convertCase(this.value)"><option value="upper">UPPERCASE</option><option value="lower">lowercase</option><option value="title">Title Case</option><option value="sentence">Sentence case</option><option value="toggle">tOGGLE cASE</option></select></div>';
}

ToolRegistry.register('case-converter',function(input){
  cv(document.getElementById('opt-case').value);
});

ToolRegistry.register('remove-spaces',function(input){
  showOutput('<div class="output-content"><pre>'+esc(input.replace(/[ \t]+/g,' ').replace(/^\s+|\s+$/gm,'').replace(/\n\s*\n/g,'\n\n'))+'</pre></div>');
});

ToolRegistry.register('find-replace',function(input){
  var findT=document.getElementById('opt-f').value;
  var repT=document.getElementById('opt-rp').value;
  var ci=document.getElementById('opt-ci').checked;
  var rx=document.getElementById('opt-rx').checked;
  var out=document.getElementById('tool-output');
  if(!findT){out.innerHTML='<p style="color:var(--text-2)">Enter text to find.</p>';return;}
  var result;
  if(rx){var fl=ci?'gi':'g';var re=new RegExp(findT,fl);result='<div class="output-content"><pre>'+esc(input.replace(re,repT))+'</pre></div>';}
  else{var flags=ci?'gi':'g';result='<div class="output-content"><pre>'+esc(input.replace(new RegExp(findT.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),flags),repT))+'</pre></div>';}
  showOutput(result);
});

ToolRegistry.register('line-sorter',function(input){
  var asc=document.getElementById('opt-sort').value==='asc';
  var sl=lines(input).filter(function(l){return l.trim();});
  sl.sort();
  if(!asc)sl.reverse();
  showOutput('<div class="output-content"><pre>'+esc(sl.join('\n'))+'</pre></div>');
});

ToolRegistry.register('alpha-sorter',function(input){
  var asc=document.getElementById('opt-sort').value==='asc';
  var sl=lines(input).filter(function(l){return l.trim();});
  sl.sort(function(a,b){return a.localeCompare(b,'en',{sensitivity:'base'});});
  if(!asc)sl.reverse();
  showOutput('<div class="output-content"><pre>'+esc(sl.join('\n'))+'</pre></div>');
});

ToolRegistry.register('text-reverser',function(input){
  var mode=document.getElementById('opt-reverse').value;
  var result;
  if(mode==='chars')result='<div class="output-content"><pre>'+esc(input.split('').reverse().join(''))+'</pre></div>';
  else if(mode==='words')result='<div class="output-content"><pre>'+esc(input.split(/\s+/).reverse().join(' '))+'</pre></div>';
  else result='<div class="output-content"><pre>'+esc(lines(input).reverse().join('\n'))+'</pre></div>';
  showOutput(result);
});

ToolRegistry.register('duplicate-remover',function(input){
  var ci=document.getElementById('opt-ci').checked;
  var seen={};var deduped=[];
  lines(input).forEach(function(l){var k=ci?l.toLowerCase().trim():l.trim();if(k&&!seen[k]){seen[k]=1;deduped.push(l);}});
  showOutput('<div class="output-content"><pre>'+esc(deduped.join('\n'))+'</pre></div>');
});

ToolRegistry.register('lorem-generator',function(input){
  var pc=parseInt(document.getElementById('opt-lc').value)||3;
  var lp=['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.','Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna, in commodo elit erat nec turpis.','Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Faucibus in ornare quam viverra orci sagittis eu volutpat. Condimentum ultrices velit aliquam.','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.','Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'];
  var r=[];
  for(var i=0;i<pc;i++)r.push(lp[i%lp.length]);
  showOutput(r.join('\n\n'));
});

ToolRegistry.register('slug-generator',function(input){
  showOutput('<div class="output-content"><pre>'+esc(input.toLowerCase().trim().replace(/[^\w\s-]/g,'').replace(/[\s_]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,''))+'</pre></div>');
});

/* Options for text tools */
if(tid==='line-sorter'||tid==='alpha-sorter'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Order:</label><select id="opt-sort"><option value="asc">Ascending</option><option value="desc">Descending</option></select></div>';
}
if(tid==='text-reverser'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Mode:</label><select id="opt-reverse"><option value="chars">Characters</option><option value="words">Words</option><option value="lines">Lines</option></select></div>';
}
if(tid==='duplicate-remover'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label><input type="checkbox" id="opt-ci" checked> Case-insensitive comparison</label></div>';
}
if(tid==='lorem-generator'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Paragraphs:</label><input type="number" id="opt-lc" value="3" min="1" max="20" style="width:60px"></div>';
}
if(tid==='find-replace'){
  document.getElementById('toolOptions').innerHTML='<div class="tool-option"><label>Find:</label><input type="text" id="opt-f" placeholder="search text" style="width:180px"></div><div class="tool-option"><label>Replace:</label><input type="text" id="opt-rp" placeholder="replacement" style="width:180px"></div><div class="tool-option"><label><input type="checkbox" id="opt-ci"> Case-insensitive</label> <label><input type="checkbox" id="opt-rx"> Regex</label></div>';
}

})();
