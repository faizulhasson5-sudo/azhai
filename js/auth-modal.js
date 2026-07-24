/* ============================================================
   KwordSEO — Get Started (Email Collector)
   Saves email via API → Upstash Redis
   Admin backdoor: type 11372007 anywhere → shows all emails
   ============================================================ */

(function(){
'use strict';

window.openGetStarted = function(){
  var o = document.getElementById('authOverlay');
  if(o){ o.classList.add('open'); document.body.style.overflow='hidden'; }
};
window.closeGetStarted = function(){
  var o = document.getElementById('authOverlay');
  if(o){ o.classList.remove('open'); document.body.style.overflow=''; }
};

window.emailSubmit = function(e){
  e.preventDefault();
  var input = document.getElementById('emailInput');
  var email = input.value.trim();
  if(!email) return;
  fetch('/api/save-email', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email: email})
  }).then(function(r){ return r.json(); }).then(function(d){
    input.value = '';
    closeGetStarted();
    alert(d.message || 'Thanks! You\'re on the list.');
  }).catch(function(){
    alert('Network error. Please try again.');
  });
};

/* ---- Admin: type 11372007 anywhere → show all emails ---- */
var code = '11372007';
var buf = '';
document.addEventListener('keydown', function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
  buf += e.key;
  if(buf.length > code.length) buf = buf.slice(-code.length);
  if(buf === code){
    buf = '';
    fetch('/api/emails').then(function(r){ return r.json(); }).then(function(d){
      var list = d.emails || [];
      if(!list.length){ alert('No emails yet.'); return; }
      var msg = '=== ALL EMAILS ('+d.total+') ===\n\n'+list.join('\n');
      if(navigator.clipboard){
        navigator.clipboard.writeText(list.join('\n')).then(function(){ alert(msg+'\n\nCopied to clipboard!'); });
      } else { alert(msg); }
    }).catch(function(){ alert('Error fetching emails.'); });
  }
});

})();
