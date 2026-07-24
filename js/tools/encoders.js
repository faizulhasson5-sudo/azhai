/* KwordSEO — Encoder/Decoder Tools Module */
(function(){
'use strict';

var m=location.pathname.match(/\/tools\/(.+)\.html/);
if(!m)return;
var tid=m[1];

ToolRegistry.register('url-encoder',function(input){
  showOutput('<div class="code-block"><pre>'+esc(encodeURIComponent(input))+'</pre></div>');
});

ToolRegistry.register('url-decoder',function(input){
  try{showOutput('<div class="output-content"><pre>'+esc(decodeURIComponent(input))+'</pre></div>');}
  catch(e){showOutput('<p style="color:var(--accent)">Error: '+esc(e.message)+'</p>');}
});

ToolRegistry.register('html-encoder',function(input){
  showOutput('<div class="code-block"><pre>'+esc(esc(input))+'</pre></div>');
});

ToolRegistry.register('html-decoder',function(input){
  var tmp=document.createElement('div');tmp.innerHTML=input;
  showOutput('<div class="output-content"><pre>'+esc(tmp.textContent)+'</pre></div>');
});

ToolRegistry.register('b64-encoder',function(input){
  try{showOutput('<div class="code-block"><pre>'+esc(btoa(unescape(encodeURIComponent(input))))+'</pre></div>');}
  catch(e){showOutput('<p style="color:var(--accent)">Error: '+esc(e.message)+'</p>');}
});

ToolRegistry.register('b64-decoder',function(input){
  try{showOutput('<div class="output-content"><pre>'+esc(decodeURIComponent(escape(atob(input))))+'</pre></div>');}
  catch(e){showOutput('<p style="color:var(--accent)">Invalid Base64: '+esc(e.message)+'</p>');}
});

})();
