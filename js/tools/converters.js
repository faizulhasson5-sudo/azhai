/* KwordSEO — Converter Tools Module (PDF/Word with lazy CDN loading) */
(function(){
'use strict';

var m=location.pathname.match(/\/tools\/(.+)\.html/);
if(!m)return;
var tid=m[1];

function createDocxFromText(text,baseName){
  var out=document.getElementById('tool-output');
  try{
    var paragraphs=text.split(/\n\n+/).filter(function(p){return p.trim();});
    var D=window.docx;
    if(!D){out.innerHTML='<p style="color:var(--danger)">DOCX library not loaded. Please refresh and try again.</p>';return;}
    var docChildren=paragraphs.map(function(p){
      return new D.Paragraph({children:[new D.TextRun({text:p.trim(),font:'Calibri',size:24})]});
    });
    var doc=new D.Document({sections:[{properties:{},children:docChildren}]});
    D.Packer.toBlob(doc).then(function(blob){
      saveAs(blob,baseName+'.docx');
      out.innerHTML='<p style="color:var(--success)">&#10003; DOCX file downloaded!</p><p style="font-size:.8rem;color:var(--text-2)">'+paragraphs.length+' paragraphs extracted from PDF</p>';
    }).catch(function(err){
      out.innerHTML='<p style="color:var(--danger)">Error creating DOCX: '+esc(err.message)+'</p>';
    });
  }catch(err){
    out.innerHTML='<p style="color:var(--danger)">Error creating DOCX: '+esc(err.message)+'</p>';
  }
}

function loadScript(url){
  return new Promise(function(resolve,reject){
    if(document.querySelector('script[src="'+url+'"]')){resolve();return;}
    var s=document.createElement('script');s.src=url;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
  });
}

ToolRegistry.register('pdf-to-word',function(input){
  var pdfFile=window._currentFile;
  var out=document.getElementById('tool-output');
  if(!pdfFile){out.innerHTML='<p style="color:var(--text-2)">Please upload a PDF file using the Upload button.</p>';return;}
  out.innerHTML='<p style="color:var(--accent)">Loading PDF library...</p>';
  Promise.all([
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js'),
    loadScript('https://cdn.jsdelivr.net/npm/docx@8.2.3/build/index.umd.js'),
    loadScript('https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js')
  ]).then(function(){
    var PDFJS=window.pdfjsLib;
    if(!PDFJS){out.innerHTML='<p style="color:var(--danger)">PDF library failed to load.</p>';return;}
    out.innerHTML='<p style="color:var(--accent)">Reading PDF...</p>';
    var reader=new FileReader();
    reader.onload=function(e){
      var typedarray=new Uint8Array(e.target.result);
      PDFJS.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
      PDFJS.getDocument(typedarray).promise.then(function(pdf){
        var totalPages=pdf.numPages;
        var textParts=[];
        var loadPage=function(num){
          if(num>totalPages){
            var fullText=textParts.join('\n\n');
            window._pdfExtractedText=fullText;
            window._pdfFileName=pdfFile.name.replace(/\.pdf$/i,'');
            out.innerHTML='<div class="output-content"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><strong>Extracted Text ('+totalPages+' pages)</strong><button onclick="downloadPdfAsDocx()" style="background:var(--accent);color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:.85rem">Download as DOCX</button></div><pre style="white-space:pre-wrap;font-size:.9rem;line-height:1.6;color:var(--text);background:var(--bg-2);padding:16px;border-radius:8px;max-height:500px;overflow-y:auto">'+esc(fullText)+'</pre></div>';
            return;
          }
          pdf.getPage(num).then(function(page){
            page.getTextContent().then(function(content){
              var pageText=content.items.map(function(item){return item.str;}).join(' ');
              textParts.push(pageText);
              loadPage(num+1);
            });
          });
        };
        loadPage(1);
      }).catch(function(err){out.innerHTML='<p style="color:var(--danger)">Error reading PDF: '+esc(err.message)+'</p>';});
    };
    reader.readAsArrayBuffer(pdfFile);
  }).catch(function(){out.innerHTML='<p style="color:var(--danger)">Failed to load converter libraries. Check your internet connection.</p>';});
  window.downloadPdfAsDocx=function(){var t=window._pdfExtractedText;var n=window._pdfFileName;if(!t)return;createDocxFromText(t,n);};
});

ToolRegistry.register('word-to-pdf',function(input){
  var docxFile=window._currentFile;
  var out=document.getElementById('tool-output');
  if(!docxFile){out.innerHTML='<p style="color:var(--text-2)">Please upload a Word document using the Upload button.</p>';return;}
  out.innerHTML='<p style="color:var(--accent)">Loading library and converting...</p>';
  var scriptEl=document.createElement('script');
  scriptEl.src='https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js';
  scriptEl.onload=function(){
    try{
      if(!window.mammoth){out.innerHTML='<p style="color:var(--danger)">Library failed.</p>';return;}
      var reader=new FileReader();
      reader.onload=function(ev){
        window.mammoth.convertToHtml({arrayBuffer:ev.target.result}).then(function(result){
          var html=result.value;
          out.innerHTML='';
          var bar=document.createElement('div');
          bar.style.cssText='margin-bottom:12px;display:flex;align-items:center;gap:12px';
          var btn=document.createElement('button');
          btn.textContent='Print as PDF';
          btn.style.cssText='background:var(--accent);color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:.9rem';
          btn.onclick=function(){var f=document.createElement('iframe');f.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:9999';f.srcdoc='<!DOCTYPE html><html><head><style>body{font-family:system-ui,sans-serif;max-width:800px;margin:0 auto;padding:40px;line-height:1.6;color:#1a1a1a}h1,h2,h3{margin-top:1.5em}p{margin:0.8em 0}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:8px;text-align:left}@media print{body{padding:20px}}</style></head><body>'+html+'</body></html>';document.body.appendChild(f);f.contentWindow.onload=function(){f.contentWindow.print();setTimeout(function(){document.body.removeChild(f);},1000);};};
          var info=document.createElement('span');
          info.style.cssText='font-size:.8rem;color:var(--text-3)';
          info.textContent='Use browser print dialog → Save as PDF';
          bar.appendChild(btn);
          bar.appendChild(info);
          out.appendChild(bar);
          var content=document.createElement('div');
          content.style.cssText='font-family:system-ui,sans-serif;max-width:800px;line-height:1.6;color:var(--text);background:var(--surface);padding:20px;border:1px solid var(--border);border-radius:8px;max-height:600px;overflow-y:auto';
          content.innerHTML=html;
          out.appendChild(content);
        }).catch(function(err){out.innerHTML='<p style="color:var(--danger)">Convert error: '+err.message+'</p>';});
      };
      reader.readAsArrayBuffer(docxFile);
    }catch(err){out.innerHTML='<p style="color:var(--danger)">Error: '+err.message+'</p>';}
  };
  scriptEl.onerror=function(){out.innerHTML='<p style="color:var(--danger)">Failed to load library.</p>';};
  document.head.appendChild(scriptEl);
});

/* Converter interface setup */
if(tid==='pdf-to-word'||tid==='word-to-pdf'){
  var convBox=document.getElementById('converterInterface');
  var textarea=document.getElementById('tool-input');
  var actBar=document.querySelector('.tool-card-actions');
  convBox.style.display='block';
  textarea.style.display='none';
  if(actBar)actBar.style.display='none';
  document.getElementById('converterHint').textContent=tid==='pdf-to-word'?'.pdf files only':'.docx files only';
  var zone=document.getElementById('converterUploadZone');
  zone.addEventListener('dragover',function(e){e.preventDefault();zone.classList.add('converter-upload-zone-hover');});
  zone.addEventListener('dragleave',function(){zone.classList.remove('converter-upload-zone-hover');});
  zone.addEventListener('drop',function(e){e.preventDefault();zone.classList.remove('converter-upload-zone-hover');var f=e.dataTransfer.files[0];if(f)handleConverterFile(f);});
  window.handleConverterUpload=function(el){var f=el.files[0];if(f)handleConverterFile(f);el.value='';};
  window.handleConverterFile=function(file){
    var ext=file.name.split('.').pop().toLowerCase();
    var ok=tid==='pdf-to-word'?ext==='pdf':ext==='docx';
    if(!ok){document.getElementById('converterFileInfo').style.display='block';document.getElementById('converterFileInfo').innerHTML='<p style="color:var(--danger)">Invalid file type. Please upload a '+(tid==='pdf-to-word'?'PDF':'DOCX')+' file.</p>';return;}
    window._currentFile=file;
    var sz=file.size<1024*1024?(file.size/1024).toFixed(1)+' KB':(file.size/(1024*1024)).toFixed(1)+' MB';
    document.getElementById('converterFileInfo').style.display='block';
    document.getElementById('converterFileInfo').innerHTML='<div class="converter-file-details"><span class="converter-file-name">'+esc(file.name)+'</span><span class="converter-file-size">'+sz+'</span></div>';
    document.getElementById('converterProcessBtn').disabled=false;
    zone.style.display='none';
  };
  window.clearConverter=function(){
    window._currentFile=null;
    document.getElementById('converterFileInfo').style.display='none';
    document.getElementById('converterFileInfo').innerHTML='';
    document.getElementById('converterProcessBtn').disabled=true;
    document.getElementById('tool-output').innerHTML='';
    document.getElementById('converterUploadZone').style.display='';
  };
}

})();
