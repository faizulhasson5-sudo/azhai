/* KwordSEO — Counter Tools Module */
(function(){
'use strict';

var m=location.pathname.match(/\/tools\/(.+)\.html/);
if(!m)return;
var tid=m[1];

ToolRegistry.register('word-counter',function(input){
  var wc=countWords(input),cc=countChars(input),cns=countCharsNoSpace(input),sc=countSentences(input),pc=countParagraphs(input),lc=lines(input).length;
  showOutput('<div class="stats-grid"><div class="stat-card"><div class="stat-number">'+wc+'</div><div class="stat-label">Words</div></div><div class="stat-card"><div class="stat-number">'+cc+'</div><div class="stat-label">Characters</div></div><div class="stat-card"><div class="stat-number">'+cns+'</div><div class="stat-label">No Spaces</div></div><div class="stat-card"><div class="stat-number">'+sc+'</div><div class="stat-label">Sentences</div></div><div class="stat-card"><div class="stat-number">'+pc+'</div><div class="stat-label">Paragraphs</div></div><div class="stat-card"><div class="stat-number">'+lc+'</div><div class="stat-label">Lines</div></div></div>');
});

ToolRegistry.register('char-counter',function(input){
  showOutput('<div class="stats-grid"><div class="stat-card"><div class="stat-number">'+countChars(input)+'</div><div class="stat-label">Total</div></div><div class="stat-card"><div class="stat-number">'+countCharsNoSpace(input)+'</div><div class="stat-label">No Spaces</div></div><div class="stat-card"><div class="stat-number">'+(input.match(/\s/g)||[]).length+'</div><div class="stat-label">Spaces</div></div><div class="stat-card"><div class="stat-number">'+fmtSz(new Blob([input]).size)+'</div><div class="stat-label">Size</div></div></div>');
});

ToolRegistry.register('sentence-counter',function(input){
  var sc=countSentences(input);
  var wc=countWords(input);
  showOutput('<div class="stats-grid"><div class="stat-card"><div class="stat-number">'+sc+'</div><div class="stat-label">Sentences</div></div><div class="stat-card"><div class="stat-number">'+wc+'</div><div class="stat-label">Words</div></div><div class="stat-card"><div class="stat-number">'+(wc/Math.max(sc,1)).toFixed(1)+'</div><div class="stat-label">Avg Words/Sentence</div></div></div>');
});

ToolRegistry.register('paragraph-counter',function(input){
  var pc=countParagraphs(input);
  var wc=countWords(input);
  showOutput('<div class="stats-grid"><div class="stat-card"><div class="stat-number">'+pc+'</div><div class="stat-label">Paragraphs</div></div><div class="stat-card"><div class="stat-number">'+wc+'</div><div class="stat-label">Words</div></div><div class="stat-card"><div class="stat-number">'+(wc/Math.max(pc,1)).toFixed(1)+'</div><div class="stat-label">Avg Words/Paragraph</div></div></div>');
});

ToolRegistry.register('word-frequency',function(input){
  var ws=input.toLowerCase().match(/\b[a-z']+\b/g)||[];
  var freq={};Object.keys(ws).forEach(function(k){var w=ws[k];freq[w]=(freq[w]||0)+1;});
  var sorted=Object.keys(freq).sort(function(a,b){return freq[b]-freq[a];}).slice(0,30);
  var total=countWords(input);
  var tbl='<table class="result-table"><thead><tr><th>Word</th><th>Count</th><th>Frequency</th></tr></thead><tbody>';
  sorted.forEach(function(w){tbl+='<tr><td>'+esc(w)+'</td><td>'+freq[w]+'</td><td>'+(freq[w]/total*100).toFixed(1)+'%</td></tr>';});
  tbl+='</tbody></table>';
  showOutput(tbl);
});

})();
