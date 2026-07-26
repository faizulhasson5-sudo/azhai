/* ============================================================
   KwordSEO — Join the Community (Email + Username Collector)
   Saves via API → Upstash Redis
   Admin backdoor: type 11372007 anywhere → shows all users
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
  resetForm();
};

function resetForm(){
  var wrap = document.getElementById('authFormWrap');
  var success = document.getElementById('authSuccess');
  var email = document.getElementById('emailInput');
  var username = document.getElementById('usernameInput');
  if(wrap) wrap.style.display = '';
  if(success) success.style.display = 'none';
  if(email) email.value = '';
  if(username) username.value = '';
}

window.emailSubmit = function(e){
  e.preventDefault();
  var emailEl = document.getElementById('emailInput');
  var usernameEl = document.getElementById('usernameInput');
  var btn = document.getElementById('authSubmitBtn');
  var email = emailEl.value.trim();
  var username = usernameEl ? usernameEl.value.trim() : '';
  if(!email) return;

  btn.disabled = true;
  btn.textContent = 'Joining...';

  fetch('/api/save-email', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email: email, username: username})
  }).then(function(r){ return r.json(); }).then(function(d){
    btn.disabled = false;
    btn.textContent = 'Join';
    var wrap = document.getElementById('authFormWrap');
    var success = document.getElementById('authSuccess');
    if(wrap) wrap.style.display = 'none';
    if(success) success.style.display = '';
  }).catch(function(){
    btn.disabled = false;
    btn.textContent = 'Join';
    alert('Network error. Please try again.');
  });
};

/* ---- Admin: type 11372007 anywhere → show all users ---- */
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
      if(!list.length){ alert('No users yet.'); return; }
      var lines = list.map(function(u){
        return u.username ? u.username + ' <' + u.email + '>' : u.email;
      });
      var msg = '=== ALL USERS ('+d.total+') ===\n\n'+lines.join('\n');
      if(navigator.clipboard){
        navigator.clipboard.writeText(lines.join('\n')).then(function(){ alert(msg+'\n\nCopied to clipboard!'); });
      } else { alert(msg); }
    }).catch(function(){ alert('Error fetching users.'); });
  }
});

})();
