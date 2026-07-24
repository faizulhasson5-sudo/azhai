/* KwordSEO — Readability Score Checker */
(function(){
'use strict';

var m=location.pathname.match(/\/tools\/(.+)\.html/);
if(!m)return;
var tid=m[1];

function countSyllables(word){
  word=word.toLowerCase().replace(/[^a-z]/g,'');
  if(!word)return 0;
  if(word.length<=3)return 1;
  word=word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'');
  word=word.replace(/^y/,'');
  var m2=word.match(/[aeiouy]{1,2}/g);
  return m2?m2.length:1;
}

function countComplexWords(words){
  var c=0;
  for(var i=0;i<words.length;i++){
    if(countSyllables(words[i])>=3)c++;
  }
  return c;
}

function getSentences(text){
  var s=text.match(/[^.!?]+[.!?]+[\s]*/g);
  return s?s.length:1;
}

function getWords(text){
  return text.trim().split(/\s+/).filter(function(w){return w.length>0;});
}

function getTotalSyllables(words){
  var t=0;
  for(var i=0;i<words.length;i++)t+=countSyllables(words[i]);
  return t;
}

function fleschReadingEase(words,sentences,syllables){
  if(sentences===0||words===0)return 0;
  return 206.835-1.015*(words/sentences)-84.6*(syllables/words);
}

function fleschKincaidGrade(words,sentences,syllables){
  if(sentences===0||words===0)return 0;
  return 0.39*(words/sentences)+11.8*(syllables/words)-15.59;
}

function gunningFog(words,sentences,complexWords){
  if(sentences===0||words===0)return 0;
  return 0.4*(words/sentences+100*complexWords/words);
}

function smogIndex(complexWords,sentences){
  if(sentences===0)return 0;
  return 1.0430*Math.sqrt(complexWords*30/sentences)+3.1291;
}

function colemanLiau(words,sentences,chars){
  if(sentences===0||words===0)return 0;
  return 0.0588*(chars/words*100)-0.296*(sentences/words*100)-15.8;
}

function automatedReadability(words,sentences,chars){
  if(sentences===0||words===0)return 0;
  return 4.71*(chars/words)+0.5*(words/sentences)-21.43;
}

function getGradeLabel(score){
  if(score<=5)return{label:'Easy',color:'#16a34a',desc:'Easy to read. Suitable for 10-11 year olds.'};
  if(score<=8)return{label:'Standard',color:'#2563eb',desc:'Standard readability. Suitable for 13-15 year olds.'};
  if(score<=10)return{label:'Fairly Difficult',color:'#d97706',desc:'Fairly difficult to read. Suitable for high school students.'};
  if(score<=12)return{label:'Difficult',color:'#ea580c',desc:'Difficult to read. Suitable for college students.'};
  if(score<=14)return{label:'Very Difficult',color:'#dc2626',desc:'Very difficult. Suitable for college graduates.'};
  return{label:'Extremely Difficult',color:'#991b1b',desc:'Extremely difficult. Academic or professional level.'};
}

function getFleschLabel(score){
  if(score>=90)return{label:'Very Easy',color:'#16a34a'};
  if(score>=80)return{label:'Easy',color:'#16a34a'};
  if(score>=70)return{label:'Fairly Easy',color:'#65a30d'};
  if(score>=60)return{label:'Standard',color:'#2563eb'};
  if(score>=50)return{label:'Fairly Difficult',color:'#d97706'};
  if(score>=30)return{label:'Difficult',color:'#ea580c'};
  return{label:'Very Confusing',color:'#dc2626'};
}

ToolRegistry.register('readability-score',function(input){
  var words=getWords(input);
  var wc=words.length;
  if(wc<3){showOutput('<p style="color:var(--text-3)">Please enter at least 3 words to analyze readability.</p>');return;}

  var sc=getSentences(input);
  var syllables=getTotalSyllables(words);
  var complexWords=countComplexWords(words);
  var chars=input.replace(/\s/g,'').length;

  var fre=fleschReadingEase(wc,sc,syllables);
  var fkg=fleschKincaidGrade(wc,sc,syllables);
  var fog=gunningFog(wc,sc,complexWords);
  var smog=smogIndex(complexWords,sc);
  var cl=colemanLiau(wc,sc,chars);
  var ari=automatedReadability(wc,sc,chars);

  var avgGrade=(fkg+fog+smog+cl+ari)/5;
  var gradeInfo=getGradeLabel(avgGrade);
  var fleschInfo=getFleschLabel(fre);

  var html='<div style="text-align:center;margin-bottom:24px">';
  html+='<div style="display:inline-block;padding:20px 40px;border-radius:12px;background:'+gradeInfo.color+'15;border:2px solid '+gradeInfo.color+'30">';
  html+='<div style="font-size:2.5rem;font-weight:800;color:'+gradeInfo.color+'">'+avgGrade.toFixed(1)+'</div>';
  html+='<div style="font-size:1rem;font-weight:600;color:'+gradeInfo.color+'">'+gradeInfo.label+'</div>';
  html+='<div style="font-size:.8rem;color:var(--text-3);margin-top:4px">'+gradeInfo.desc+'</div>';
  html+='</div></div>';

  html+='<table class="result-table"><thead><tr><th>Metric</th><th>Score</th><th>Rating</th></tr></thead><tbody>';
  html+='<tr><td>Flesch Reading Ease</td><td>'+fre.toFixed(1)+'</td><td style="color:'+fleschInfo.color+';font-weight:600">'+fleschInfo.label+'</td></tr>';
  html+='<tr><td>Flesch-Kincaid Grade</td><td>'+fkg.toFixed(1)+'</td><td>Grade Level</td></tr>';
  html+='<tr><td>Gunning Fog Index</td><td>'+fog.toFixed(1)+'</td><td>Grade Level</td></tr>';
  html+='<tr><td>SMOG Index</td><td>'+smog.toFixed(1)+'</td><td>Grade Level</td></tr>';
  html+='<tr><td>Coleman-Liau Index</td><td>'+cl.toFixed(1)+'</td><td>Grade Level</td></tr>';
  html+='<tr><td>Automated Readability</td><td>'+ari.toFixed(1)+'</td><td>Grade Level</td></tr>';
  html+='</tbody></table>';

  html+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-top:20px">';
  html+='<div style="text-align:center;padding:12px;background:var(--surface);border-radius:8px;border:1px solid var(--border)"><div style="font-size:1.3rem;font-weight:700;color:var(--text)">'+wc+'</div><div style="font-size:.75rem;color:var(--text-3)">Words</div></div>';
  html+='<div style="text-align:center;padding:12px;background:var(--surface);border-radius:8px;border:1px solid var(--border)"><div style="font-size:1.3rem;font-weight:700;color:var(--text)">'+sc+'</div><div style="font-size:.75rem;color:var(--text-3)">Sentences</div></div>';
  html+='<div style="text-align:center;padding:12px;background:var(--surface);border-radius:8px;border:1px solid var(--border)"><div style="font-size:1.3rem;font-weight:700;color:var(--text)">'+syllables+'</div><div style="font-size:.75rem;color:var(--text-3)">Syllables</div></div>';
  html+='<div style="text-align:center;padding:12px;background:var(--surface);border-radius:8px;border:1px solid var(--border)"><div style="font-size:1.3rem;font-weight:700;color:var(--text)">'+complexWords+'</div><div style="font-size:.75rem;color:var(--text-3)">Complex Words</div></div>';
  html+='<div style="text-align:center;padding:12px;background:var(--surface);border-radius:8px;border:1px solid var(--border)"><div style="font-size:1.3rem;font-weight:700;color:var(--text)">'+(syllables/wc).toFixed(1)+'</div><div style="font-size:.75rem;color:var(--text-3)">Avg Syllables/Word</div></div>';
  html+='</div>';

  var tip='';
  if(fre>=60)tip='<p style="margin-top:16px;padding:12px;background:#16a34a10;border:1px solid #16a34a30;border-radius:8px;font-size:.85rem;color:var(--text-2)"><strong>Good readability!</strong> Your content is easy to read for most web audiences. Google recommends targeting a Flesch Reading Ease score of 60+ for general web content.</p>';
  else tip='<p style="margin-top:16px;padding:12px;background:#d9770610;border:1px solid #d9770630;border-radius:8px;font-size:.85rem;color:var(--text-2)"><strong>Consider simplifying.</strong> Try shorter sentences, simpler words, and fewer complex terms. Target a Flesch Reading Ease score of 60+ for better web readability.</p>';
  html+=tip;

  showOutput(html,'Readability Analysis');
});

})();
