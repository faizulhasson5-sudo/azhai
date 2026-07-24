!function(){"use strict";

function getSentences(text){return text.match(/[^.!?\n]+[.!?]+[\s]*/g)||[text];}
function getWords(text){return text.trim().split(/\s+/).filter(function(w){return w.length>0;});}
function avg(arr){return arr.length?arr.reduce(function(a,b){return a+b;},0)/arr.length:0;}
function stdDev(arr){if(arr.length<2)return 0;var m=avg(arr);return Math.sqrt(arr.map(function(v){return(v-m)*(v-m);}).reduce(function(a,b){return a+b;},0)/arr.length);}

/* ========== AI CONTENT DETECTOR ========== */
function analyzeAI(text){
  if(!text||!text.trim())return{score:0,details:[],words:0,sentences:0,msg:"Paste some text to analyze."};
  var words=getWords(text);
  var wc=words.length;
  if(wc<20)return{score:0,details:[],words:wc,sentences:0,msg:"Text too short. Provide at least 20 words."};
  var sentences=getSentences(text);
  var sc=sentences.length;
  var totalScore=0;
  var details=[];

  /* Signal 1: AI Phrase Detection (0-30 pts) */
  var aiPhrases=[
    ["delve",3],["delving",3],["delved",3],
    ["it is important to note",4],["it's important to note",4],
    ["it is worth noting",4],["it's worth noting",4],
    ["in today's digital landscape",4],["in today's fast-paced",4],
    ["in this article",2],["in this guide",2],["in this post",2],
    ["in the realm of",3],["in the world of",2],
    ["leveraging",3],["leveraged",3],["leverage",2],
    ["facilitates",2],["facilitate",2],["facilitating",2],
    ["robust",1],["comprehensive",1],["streamline",1],
    ["empower",1],["empowers",1],["empowering",1],
    ["enhance",1],["enhanced",1],["enhancing",1],
    ["innovative",1],["cutting-edge",2],["groundbreaking",2],
    ["seamlessly",2],["seamless",1],
    ["furthermore",2],["moreover",2],["additionally",2],
    ["consequently",2],["nevertheless",2],["accordingly",2],
    ["in conclusion",2],["to summarize",2],["in summary",2],
    ["in this article, we will",4],["in this guide, we will",4],
    ["whether you're looking to",3],["game-changer",3],
    ["aforementioned",3],["a testament to",3],
    ["shedding light on",2],["dive deep",2],
    ["unlocking",1],["navigating",1],["harnessing",2],
    ["multifaceted",2],["plethora",2],["tapestry",2],
    ["nuanced",1],["underscores",2],["pivotal",1],
    ["boasts",1],["poised",1],["fostering",1],
    ["as an ai",4],["as an AI",4],["i'm an ai",4],
    ["in order to",1],["for the purpose of",2],
    ["with regard to",2],["has the ability to",1],
    ["stands as a testament",3],["undeniably",2],["indisputably",2],
    ["at its core",2],["at the heart of",2],
    ["it is clear that",2],["it's clear that",2],
    ["plays a pivotal role",3],["serves as a foundation",3],
    ["when it comes to",2],["in terms of",1],
    ["a multitude of",2],["a plethora of",3],
    ["the intricacies of",2],["the nuances of",2],
    ["the significance of",2],["the importance of",1],
    ["it can be argued",3],["it could be argued",3],
    ["due to the fact that",3],["given the fact that",3],
    ["considering the fact that",3],["taking into account",2],
    ["a large number of",2],["a significant number of",2],
    ["the vast majority of",2],["the overwhelming majority of",2],
    ["to conclude",2],["in closing",2],
    ["all things considered",2],["taking everything into account",2],
    ["on the whole",2],["by and large",2],
    ["in essence",2],["fundamentally",1],
    ["therefore",1],["thus",1],["hence",1],["consequently",2],
    ["accordingly",2],["as a result",1],["for this reason",1],
    ["nonetheless",2],["notwithstanding",3],
    ["on the other hand",1],["conversely",2],["in contrast",1],
    ["first and foremost",3],["last but not least",3],
    ["the bottom line is",2],["the key takeaway is",2],
    ["it goes without saying",3],["needless to say",2],
    ["it is no secret that",3],["it is well known that",2],
    ["a deep dive into",2],["a comprehensive look at",2],
    ["an in-depth analysis of",2],["a thorough examination of",2],
    ["shed light on",2],["explore the intricacies of",2],
    ["navigate the complexities of",2],
    ["unlock the potential of",2],["harness the power of",2],
    ["leverage the power of",3],["tap into the potential of",2],
    ["at the end of the day",2],["when all is said and done",2],
    ["in the grand scheme of things",3],["from a holistic perspective",3],
    ["the fact of the matter is",3],["it cannot be overstated",3],
    ["it is imperative that",3],["it is essential that",2],
    ["it is crucial that",2],["it is vital that",2],
    ["it is worth mentioning",3],["it is worth highlighting",3],
    ["it is worth pointing out",2]
  ];
  var phraseCount=0, phraseWeight=0, matchedPhrases=[];
  for(var i=0;i<aiPhrases.length;i++){
    var phrase=aiPhrases[i][0],weight=aiPhrases[i][1];
    var escaped=phrase.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    var regex=new RegExp("\\b"+escaped+"\\b","gi");
    var m=text.match(regex);
    if(m){phraseCount+=m.length;phraseWeight+=weight*m.length;matchedPhrases.push({phrase:phrase,count:m.length,weight:weight});}
  }
  var phraseDensity=phraseWeight/Math.max(wc/100,1);
  var phraseScore=Math.min(30,Math.round(phraseDensity*1.5));
  details.push({name:"AI Phrases",score:phraseScore,max:30,detail:phraseCount+" phrases, density: "+phraseDensity.toFixed(1)});

  /* Signal 2: Sentence Length Uniformity (0-20 pts) */
  var senLens=sentences.map(function(s){return getWords(s).length;});
  var senStd=stdDev(senLens);
  var senAvg=avg(senLens);
  var cv=senAvg>0?senStd/senAvg:0;
  var uniformScore=0;
  if(cv<0.15)uniformScore=20;
  else if(cv<0.25)uniformScore=16;
  else if(cv<0.35)uniformScore=12;
  else if(cv<0.45)uniformScore=7;
  else if(cv<0.55)uniformScore=3;
  else uniformScore=0;
  details.push({name:"Sentence Uniformity",score:uniformScore,max:20,detail:"Variation: "+(cv*100).toFixed(0)+"% — AI text is unnaturally uniform"});

  /* Signal 3: Vocabulary Diversity (0-15 pts) */
  var wordMap={};
  for(var i=0;i<words.length;i++){
    var w=words[i].toLowerCase().replace(/[^a-z']/g,"");
    if(w.length>3)wordMap[w]=(wordMap[w]||0)+1;
  }
  var uniqueCount=Object.keys(wordMap).length;
  var ttr=uniqueCount/Math.max(wc,1);
  var overused=0;
  for(var k in wordMap)if(wordMap[k]>2)overused+=wordMap[k]-2;
  var vocabScore=0;
  if(ttr<0.40)vocabScore=15;
  else if(ttr<0.50)vocabScore=12;
  else if(ttr<0.60)vocabScore=8;
  else if(ttr<0.70)vocabScore=4;
  else vocabScore=1;
  details.push({name:"Vocabulary Diversity",score:vocabScore,max:15,detail:"Unique word ratio: "+(ttr*100).toFixed(0)+"%, "+overused+" overused words"});

  /* Signal 4: Passive Voice (0-10 pts) */
  var passiveMatches=text.match(/\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi)||[];
  var passiveRatio=passiveMatches.length/Math.max(sc,1);
  var passiveScore=0;
  if(passiveRatio>0.8)passiveScore=10;
  else if(passiveRatio>0.5)passiveScore=7;
  else if(passiveRatio>0.3)passiveScore=4;
  else if(passiveRatio>0.15)passiveScore=2;
  details.push({name:"Passive Voice",score:passiveScore,max:10,detail:passiveMatches.length+" passive phrases ("+passiveRatio.toFixed(1)+" per sentence)"});

  /* Signal 5: Paragraph Uniformity (0-10 pts) */
  var paras=text.split(/\n\s*\n/);
  if(paras.length<3)paras=text.split(/\n/);
  var paraLens=paras.map(function(p){return getWords(p).length;}).filter(function(l){return l>5;});
  var paraScore=0;
  if(paraLens.length>=3){
    var paraStd=stdDev(paraLens);
    var paraAvg=avg(paraLens);
    var paraCV=paraAvg>0?paraStd/paraAvg:0;
    if(paraCV<0.15)paraScore=10;
    else if(paraCV<0.25)paraScore=7;
    else if(paraCV<0.35)paraScore=4;
    else paraScore=1;
  }
  details.push({name:"Paragraph Uniformity",score:paraScore,max:10,detail:paraLens.length+" paragraphs, variation: "+(paraLens.length>=3?(stdDev(paraLens)/avg(paraLens)*100).toFixed(0):"N/A")+"%"});

  /* Signal 6: Sentence Beginnings (0-10 pts) */
  var beginnings={};
  for(var i=0;i<sentences.length;i++){
    var first=getWords(sentences[i])[0];
    if(first){var f=first.toLowerCase().replace(/[^a-z]/g,"");beginnings[f]=(beginnings[f]||0)+1;}
  }
  var maxRepeat=0;
  for(var b in beginnings)if(beginnings[b]>maxRepeat)maxRepeat=beginnings[b];
  var beginScore=0;
  if(sc>=3){
    if(maxRepeat>sc*0.3)beginScore=10;
    else if(maxRepeat>sc*0.2)beginScore=7;
    else if(maxRepeat>2)beginScore=4;
    else beginScore=1;
  }
  details.push({name:"Repetitive Openings",score:beginScore,max:10,detail:"Most common start word repeats "+maxRepeat+"/"+sc+" sentences"});

  /* Signal 7: AI structural patterns (0-5 pts) */
  var structuralPatterns=[
    /\bnot only\s+.+\s+but also\b/g,
    /\bwhether\s+.+\s+or\b/g,
    /\bfrom\s+.+\s+to\b/g,
    /\bby\s+(implementing|using|following|incorporating)\b/gi,
    /\b(ensures?|guarantees?|enables?)\s+(that\s+)?(your|you|users?|businesses?|websites?)\b/gi,
    /\b(this|these|here)\s+(is|are)\s+(why|how|what)\b/gi,
    /\b(by|through)\s+(doing|following|implementing|using)\b/gi
  ];
  var structCount=0;
  for(var i=0;i<structuralPatterns.length;i++){
    var m=text.match(structuralPatterns[i]);
    if(m)structCount+=m.length;
  }
  var structScore=Math.min(5,structCount*2);
  details.push({name:"Structural Patterns",score:structScore,max:5,detail:structCount+" AI-typical sentence structures"});

  totalScore=Math.min(100,phraseScore+uniformScore+vocabScore+passiveScore+paraScore+beginScore+structScore);
  var msg="",verdict="";
  if(totalScore<15){msg="Likely human-written";verdict="Natural variation in structure and vocabulary. Low AI indicators.";}
  else if(totalScore<30){msg="Possibly human-written";verdict="Some AI-like patterns detected, but could also be edited or formulaic human writing.";}
  else if(totalScore<50){msg="Mixed signals — possible AI";verdict="Several indicators suggest AI assistance or heavy editing.";}
  else if(totalScore<70){msg="Likely AI-generated";verdict="Multiple signals point to AI generation.";}
  else{msg="Very likely AI-generated";verdict="Strong patterns consistent with AI-generated text.";}

  return{score:totalScore,details:details,words:wc,sentences:sc,msg:msg,verdict:verdict,matchedPhrases:matchedPhrases};
}

function renderDetector(result){
  var h='<div class="ai-result">';
  h+='<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;flex-wrap:wrap">';
  var color=result.score<15?"#28a745":result.score<30?"#ffc107":result.score<50?"#fd7e14":result.score<70?"#dc3545":"#a71d2a";
  h+='<div style="min-width:80px;text-align:center;padding:14px 20px;border-radius:12px;background:'+color+'15;border:2px solid '+color+'">';
  h+='<div style="font-size:2rem;font-weight:800;color:'+color+'">'+result.score+'</div>';
  h+='<div style="font-size:.7rem;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em">/ 100</div></div>';
  h+='<div><div style="font-weight:700;font-size:1.05rem">'+result.msg+'</div>';
  h+='<div style="color:var(--text-3);font-size:.85rem;margin-top:2px">'+result.verdict+'</div></div></div>';
  h+='<div style="display:flex;gap:16px;margin-bottom:14px;color:var(--text-3);font-size:.85rem;flex-wrap:wrap">';
  h+='<span><strong>'+result.words+'</strong> words</span>';
  h+='<span><strong>'+result.sentences+'</strong> sentences</span>';
  h+='</div>';
  h+='<table style="width:100%;border-collapse:collapse;font-size:.85rem;margin-bottom:12px">';
  h+='<thead><tr style="border-bottom:2px solid var(--border)"><th style="text-align:left;padding:6px 8px">Signal</th><th style="text-align:right;padding:6px 8px">Score</th><th style="padding:6px 8px;width:30%">Bar</th><th style="text-align:left;padding:6px 8px">Details</th></tr></thead><tbody>';
  for(var i=0;i<result.details.length;i++){
    var d=result.details[i];
    var pct=Math.round(d.score/d.max*100);
    var barColor=pct>60?"#dc3545":pct>30?"#ffc107":"#28a745";
    h+='<tr style="border-bottom:1px solid var(--border)">';
    h+='<td style="padding:7px 8px;font-weight:600">'+d.name+'</td>';
    h+='<td style="padding:7px 8px;text-align:right;white-space:nowrap"><strong>'+d.score+'</strong><span style="color:var(--text-3)">/'+d.max+'</span></td>';
    h+='<td style="padding:7px 8px"><div style="width:100%;height:8px;border-radius:4px;background:var(--border)"><div style="width:'+pct+'%;height:100%;border-radius:4px;background:'+barColor+'"></div></div></td>';
    h+='<td style="padding:7px 8px;color:var(--text-3);font-size:.8rem">'+d.detail+'</td></tr>';
  }
  h+='</tbody></table>';
  if(result.matchedPhrases.length){
    h+='<div style="margin-top:8px;padding:10px 12px;border-radius:8px;background:var(--surface);border:1px solid var(--border)">';
    h+='<div style="font-weight:600;font-size:.85rem;margin-bottom:6px">AI Phrases Detected ('+result.matchedPhrases.reduce(function(a,b){return a+b.count;},0)+' total)</div>';
    h+='<div style="display:flex;flex-wrap:wrap;gap:4px">';
    for(var i=0;i<Math.min(result.matchedPhrases.length,15);i++){
      var p=result.matchedPhrases[i];
      h+='<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:.78rem;background:#dc354515;color:#dc3545;border:1px solid #dc354530">"'+p.phrase+'" <strong>×'+p.count+'</strong></span>';
    }
    h+='</div></div>';
  }
  h+='<p style="margin-top:14px;font-size:.75rem;color:var(--text-3);line-height:1.5">Uses 7 independent signals: phrase detection, sentence uniformity, vocabulary diversity, passive voice, paragraph uniformity, repetitive openings, and structural patterns. No detection method is 100% accurate.</p>';
  h+='</div>';
  return h;
}

/* ========== AI HUMANIZER ========== */
function humanizeAI(text){
  if(!text||!text.trim())return{text:"",changes:0};

  var sentences=getSentences(text);
  var result=[];

  for(var si=0;si<sentences.length;si++){
    var s=sentences[si];
    var origS=s;

    /* A. Replace stiff phrases */
    s=s.replace(/\bin order to\b/g,"to");
    s=s.replace(/\bfor the purpose of\b/g,"for");
    s=s.replace(/\bwith regard to\b/g,"about");
    s=s.replace(/\bwith respect to\b/g,"about");
    s=s.replace(/\bdue to the fact that\b/g,"because");
    s=s.replace(/\bgiven the fact that\b/g,"since");
    s=s.replace(/\bconsidering the fact that\b/g,"since");
    s=s.replace(/\bfor the reason that\b/g,"because");
    s=s.replace(/\bin the event that\b/g,"if");
    s=s.replace(/\bprior to\b/g,"before");
    s=s.replace(/\bsubsequent to\b/g,"after");
    s=s.replace(/\bon a regular basis\b/g,"regularly");
    s=s.replace(/\bin the near future\b/g,"soon");
    s=s.replace(/\bhas the ability to\b/g,"can");
    s=s.replace(/\bis able to\b/g,"can");
    s=s.replace(/\ba large number of\b/g,"many");
    s=s.replace(/\ba significant number of\b/g,"many");
    s=s.replace(/\ba considerable amount of\b/g,"lots of");
    s=s.replace(/\ba great deal of\b/g,"lots of");
    s=s.replace(/\bthe vast majority of\b/g,"most");
    s=s.replace(/\bthe overwhelming majority of\b/g,"most");
    s=s.replace(/\bthe majority of\b/g,"most");
    s=s.replace(/\ba plethora of\b/g,"lots of");
    s=s.replace(/\ba multitude of\b/g,"many");
    s=s.replace(/\ba myriad of\b/g,"many");

    /* B. Add contractions */
    s=s.replace(/\bit is\b/g,"it's");
    s=s.replace(/\bthat is\b/g,"that's");
    s=s.replace(/\bthere is\b/g,"there's");
    s=s.replace(/\bwe are\b/g,"we're");
    s=s.replace(/\bthey are\b/g,"they're");
    s=s.replace(/\byou are\b/g,"you're");
    s=s.replace(/\bI am\b/g,"I'm");
    s=s.replace(/\bdo not\b/g,"don't");
    s=s.replace(/\bdoes not\b/g,"doesn't");
    s=s.replace(/\bdid not\b/g,"didn't");
    s=s.replace(/\bwill not\b/g,"won't");
    s=s.replace(/\bwould not\b/g,"wouldn't");
    s=s.replace(/\bcannot\b/g,"can't");
    s=s.replace(/\bshould not\b/g,"shouldn't");
    s=s.replace(/\bcould not\b/g,"couldn't");
    s=s.replace(/\bhas not\b/g,"hasn't");
    s=s.replace(/\bhave not\b/g,"haven't");
    s=s.replace(/\bhad not\b/g,"hadn't");
    s=s.replace(/\bwas not\b/g,"wasn't");
    s=s.replace(/\bwere not\b/g,"weren't");
    s=s.replace(/\bis not\b/g,"isn't");
    s=s.replace(/\bare not\b/g,"aren't");
    s=s.replace(/\bwho is\b/g,"who's");
    s=s.replace(/\bwhat is\b/g,"what's");

    /* C. Replace AI-ish words */
    s=s.replace(/\bdelve\b/gi,"dig into");
    s=s.replace(/\bdelving\b/gi,"digging into");
    s=s.replace(/\bdelved\b/gi,"dug into");
    s=s.replace(/\bleveraging\b/gi,"using");
    s=s.replace(/\bleveraged\b/gi,"used");
    s=s.replace(/\bleverage\b/gi,"use");
    s=s.replace(/\bfacilitates\b/gi,"helps with");
    s=s.replace(/\bfacilitate\b/gi,"help with");
    s=s.replace(/\bfacilitating\b/gi,"helping with");
    s=s.replace(/\brobust\b/gi,"solid");
    s=s.replace(/\bcomprehensive\b/gi,"thorough");
    s=s.replace(/\bstreamline\b/gi,"simplify");
    s=s.replace(/\bempower\b/gi,"help");
    s=s.replace(/\bempowers\b/gi,"helps");
    s=s.replace(/\bempowering\b/gi,"helping");
    s=s.replace(/\benhance\b/gi,"improve");
    s=s.replace(/\benhanced\b/gi,"improved");
    s=s.replace(/\benhancing\b/gi,"improving");
    s=s.replace(/\binnovative\b/gi,"creative");
    s=s.replace(/\bcutting-edge\b/gi,"latest");
    s=s.replace(/\bgroundbreaking\b/gi,"new");
    s=s.replace(/\bseamlessly\b/gi,"smoothly");
    s=s.replace(/\bseamless\b/gi,"smooth");
    s=s.replace(/\bcrucial\b/gi,"important");
    s=s.replace(/\bparamount\b/gi,"key");
    s=s.replace(/\bpivotal\b/gi,"key");
    s=s.replace(/\bmultifaceted\b/gi,"complex");
    s=s.replace(/\bplethora\b/gi,"lot");
    s=s.replace(/\bnuanced\b/gi,"detailed");
    s=s.replace(/\bunderscores\b/gi,"shows");
    s=s.replace(/\bboasts\b/gi,"has");
    s=s.replace(/\bpoised\b/gi,"set up");
    s=s.replace(/\bfostering\b/gi,"building");
    s=s.replace(/\bundeniably\b/gi,"clearly");
    s=s.replace(/\bunquestionably\b/gi,"definitely");
    s=s.replace(/\bcertainly\b/gi,"definitely");
    s=s.replace(/\bundoubtedly\b/gi,"definitely");
    s=s.replace(/\bcomprehensively\b/gi,"fully");
    s=s.replace(/\bthoroughly\b/gi,"fully");
    s=s.replace(/\bmeticulously\b/gi,"carefully");
    s=s.replace(/\beffectively\b/gi,"well");
    s=s.replace(/\bconsistently\b/gi,"always");
    s=s.replace(/\bcontinuously\b/gi,"constantly");
    s=s.replace(/\bultimately\b/gi,"in the end");
    s=s.replace(/\btherefore\b/gi,"so");
    s=s.replace(/\bthus\b/gi,"so");
    s=s.replace(/\bhence\b/gi,"so");
    s=s.replace(/\bconsequently\b/gi,"so");
    s=s.replace(/\baccordingly\b/gi,"so");
    s=s.replace(/\bnevertheless\b/gi,"but");
    s=s.replace(/\bnonetheless\b/gi,"but");
    s=s.replace(/\bfurthermore\b/gi,"also");
    s=s.replace(/\bmoreover\b/gi,"also");
    s=s.replace(/\badditionally\b/gi,"also");
    s=s.replace(/\bmeanwhile\b/gi,"while");
    s=s.replace(/\bsubsequently\b/gi,"then");
    s=s.replace(/\bessentially\b/gi,"basically");
    s=s.replace(/\bfundamentally\b/gi,"basically");
    s=s.replace(/\bmyth busting\b/gi,"debunking");
    s=s.replace(/\bgame-changer\b/gi,"big deal");
    s=s.replace(/\bthe realm of\b/gi,"the world of");
    s=s.replace(/\bthe sphere of\b/gi,"the world of");
    s=s.replace(/\bthe domain of\b/gi,"the area of");
    s=s.replace(/\bthe landscape of\b/gi,"the world of");
    s=s.replace(/\bshedding light on\b/gi,"explaining");
    s=s.replace(/\bdive deep\b/gi,"dig in");
    s=s.replace(/\bdive into\b/gi,"look at");
    s=s.replace(/\bunlocking\b/gi,"finding");
    s=s.replace(/\bnavigating\b/gi,"working through");
    s=s.replace(/\bharnessing\b/gi,"using");
    s=s.replace(/\bplays a pivotal role\b/gi,"matters");
    s=s.replace(/\bserves as a foundation\b/gi,"is the base for");
    s=s.replace(/\bstands as a testament\b/gi,"shows");
    s=s.replace(/\ba testament to\b/gi,"proof of");
    s=s.replace(/\bit is worth noting\b/gi,"note that");
    s=s.replace(/\bit should be noted\b/gi,"note that");
    s=s.replace(/\bit goes without saying\b/gi,"obviously");
    s=s.replace(/\bneedless to say\b/gi,"obviously");
    s=s.replace(/\bit is no secret that\b/gi,"everyone knows");
    s=s.replace(/\bit is well known that\b/gi,"everyone knows");
    s=s.replace(/\bit is clear that\b/gi,"clearly");
    s=s.replace(/\bit can be argued\b/gi,"you could say");
    s=s.replace(/\bone could argue\b/gi,"you could say");
    s=s.replace(/\bthis is because\b/gi,"because");
    s=s.replace(/\bthe reason being\b/gi,"because");
    s=s.replace(/\bin the context of\b/gi,"in");
    s=s.replace(/\bat its core\b/gi,"basically");
    s=s.replace(/\bat the heart of\b/gi,"at the center of");
    s=s.replace(/\bone of the most\b/gi,"one of the");
    s=s.replace(/\bwhen it comes to\b/gi,"for");
    s=s.replace(/\bin terms of\b/gi,"for");
    s=s.replace(/\bthe intricacies of\b/gi,"the details of");
    s=s.replace(/\bthe nuances of\b/gi,"the details of");
    s=s.replace(/\bthe significance of\b/gi,"why");
    s=s.replace(/\bthe importance of\b/gi,"why");
    s=s.replace(/\bthe role of\b/gi,"how");
    s=s.replace(/\bthe impact of\b/gi,"the effect of");
    s=s.replace(/\ba deep dive into\b/gi,"a look at");
    s=s.replace(/\ba comprehensive look at\b/gi,"a look at");
    s=s.replace(/\ban in-depth analysis of\b/gi,"a close look at");
    s=s.replace(/\bexplore the intricacies of\b/gi,"look into the details of");
    s=s.replace(/\bnavigate the complexities of\b/gi,"work through the details of");
    s=s.replace(/\bunlock the potential of\b/gi,"tap into the power of");
    s=s.replace(/\bharness the power of\b/gi,"use the power of");
    s=s.replace(/\bleverage the power of\b/gi,"use the power of");
    s=s.replace(/\bin the grand scheme of things\b/gi,"overall");
    s=s.replace(/\bfrom a holistic perspective\b/gi,"overall");
    s=s.replace(/\bfrom a broader perspective\b/gi,"generally");
    s=s.replace(/\bat the end of the day\b/gi,"ultimately");
    s=s.replace(/\bthe bottom line is\b/gi,"the key point is");
    s=s.replace(/\bthe key takeaway is\b/gi,"the key point is");
    s=s.replace(/\bthe fact of the matter is\b/gi,"actually");
    s=s.replace(/\bit cannot be overstated\b/gi,"really matters");
    s=s.replace(/\bit is imperative that\b/gi,"you need to");
    s=s.replace(/\bit is essential that\b/gi,"you need to");
    s=s.replace(/\bit is crucial that\b/gi,"you need to");
    s=s.replace(/\bit is vital that\b/gi,"you need to");
    s=s.replace(/\bit is necessary that\b/gi,"you need to");
    s=s.replace(/\bit is important that\b/gi,"you should");
    s=s.replace(/\bit is worth mentioning\b/gi,"worth noting");
    s=s.replace(/\bit is worth highlighting\b/gi,"worth noting");
    s=s.replace(/\bit is worth pointing out\b/gi,"worth noting");
    s=s.replace(/\bwhether you're looking to\b/gi,"if you want to");
    s=s.replace(/\bfirst and foremost\b/gi,"first");
    s=s.replace(/\blast but not least\b/gi,"finally");
    s=s.replace(/\bin conclusion\b/gi,"to sum up");
    s=s.replace(/\bto conclude\b/gi,"to sum up");
    s=s.replace(/\bin closing\b/gi,"to sum up");
    s=s.replace(/\bto summarize\b/gi,"in short");
    s=s.replace(/\bin summary\b/gi,"in short");
    s=s.replace(/\ball things considered\b/gi,"overall");
    s=s.replace(/\bon the whole\b/gi,"overall");
    s=s.replace(/\bby and large\b/gi,"mostly");
    s=s.replace(/\bin essence\b/gi,"basically");
    s=s.replace(/\bfor this reason\b/gi,"so");
    s=s.replace(/\bgiven that\b/gi,"since");
    s=s.replace(/\bas a result\b/gi,"so");
    s=s.replace(/\bthis is not to say\b/gi,"that doesn't mean");
    s=s.replace(/\bit is important to note\b/gi,"");
    s=s.replace(/\bit is worth noting\b/gi,"");
    s=s.replace(/\bas mentioned earlier\b/gi,"");
    s=s.replace(/\bas we discussed\b/gi,"");
    s=s.replace(/\bas previously mentioned\b/gi,"");
    s=s.replace(/\bin other words\b/gi,"");
    s=s.replace(/\bthat being said\b/gi,"");
    s=s.replace(/\bhaving said that\b/gi,"but");

    /* D. Simplify wordy structures */
    s=s.replace(/\bthe fact that\b/gi,"that");
    s=s.replace(/\bbecause of the fact that\b/gi,"because");
    s=s.replace(/\bat this point in time\b/gi,"now");
    s=s.replace(/\bin today's digital landscape\b/gi,"now");
    s=s.replace(/\bin today's fast-paced\b/gi,"in today's");
    s=s.replace(/\bin today's world\b/gi,"now");
    s=s.replace(/\bin the modern era\b/gi,"now");
    s=s.replace(/\bin the current landscape\b/gi,"now");
    s=s.replace(/\bin an era of\b/gi,"in a time of");
    s=s.replace(/\bin a world where\b/gi,"when");
    s=s.replace(/\bthis day and age\b/gi,"now");
    s=s.replace(/\bfor all intents and purposes\b/gi,"essentially");
    s=s.replace(/\bin a nutshell\b/gi,"basically");

    /* E. Trim orphaned filler */
    s=s.replace(/^\s*,\s*/,"");
    s=s.replace(/\s{2,}/g," ").trim();

    /* F. If sentence starts with a transition word after a comma, remove the transition */
    s=s.replace(/,\s*(Furthermore|Moreover|Additionally|Consequently|Nevertheless|However|Nonetheless|Therefore|Thus|Hence|Accordingly|Meanwhile|Subsequently)\b/gi, function(match, word) {
      var lower=word.toLowerCase();
      var replacers={"furthermore":"also","moreover":"also","additionally":"also","consequently":"so","nevertheless":"but","however":"but","nonetheless":"but","therefore":"so","thus":"so","hence":"so","accordingly":"so","meanwhile":"while","subsequently":"then"};
      return ", "+(replacers[lower]||"");
    });

    if(s!==origS)result.push(s);
    else result.push(s);
  }

  var humanized=result.join(" ");

  /* G. Occasionally break one very long sentence into two */
  humanized=humanized.replace(/([^.]{60,100}),\s+(and|but|or|yet|so)\s+(?=[a-z])/g, "$1. $2 ");

  /* H. Clean up final */
  humanized=humanized.replace(/\s+/g," ").replace(/\s+([.,!?;:])/g,"$1").trim();

  /* Count changes */
  var origWords=getWords(text).length;
  var newWords=getWords(humanized).length;
  var origSentences=getSentences(text);
  var newSentences=getSentences(humanized);
  var changes=0;
  for(var i=0;i<Math.max(origSentences.length,newSentences.length);i++){
    if((origSentences[i]||"").trim()!==(newSentences[i]||"").trim())changes++;
  }

  return{text:humanized,changes:changes,sentChanged:changes,sentTotal:origSentences.length};
}

/* ========== REGISTER ========== */
ToolRegistry.register("ai-content-detector",function(input){
  showOutput(renderDetector(analyzeAI(input)));
});

ToolRegistry.register("ai-humanizer",function(input){
  var res=humanizeAI(input);
  var origWords=getWords(input).length;
  var newWords=getWords(res.text).length;
  var h='<div class="ai-result">';
  h+='<div style="padding:10px 14px;border-radius:8px;background:var(--surface);border:1px solid var(--border);margin-bottom:14px">';
  h+='<div style="display:flex;gap:16px;font-size:.85rem;color:var(--text-3);flex-wrap:wrap">';
  h+='<span>Original: <strong>'+origWords+'</strong> words, <strong>'+res.sentTotal+'</strong> sentences</span>';
  h+='<span>Humanized: <strong>'+newWords+'</strong> words, <strong>'+res.sentChanged+'</strong> sentences changed</span>';
  h+='</div></div>';
  h+='<div style="white-space:pre-wrap;line-height:1.7;font-size:.95rem;padding:14px;border-radius:8px;background:var(--surface);border:1px solid var(--border)">'+res.text.replace(/</g,"&lt;").replace(/>/g,"&gt;")+'</div>';
  h+='<p style="margin-top:12px;font-size:.78rem;color:var(--text-3);line-height:1.5">Humanizer rewrites AI patterns, adds contractions, simplifies formal language, removes filler, and varies sentence openings. Review the output and adjust to match your voice.</p>';
  h+='</div>';
  showOutput(h);
});

}();
