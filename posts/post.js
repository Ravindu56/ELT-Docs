function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function img(src,cls){return src?'<img class="'+cls+'" src="'+esc(src)+'" alt="" onerror="this.remove()">':''}
function renderPost(C){
  var p=document.getElementById('post');
  var stats=(C.stats||[]).map(function(s){return '<div class="stat"><b>'+esc(s[1])+'</b><i>'+esc(s[0])+'</i></div>'}).join('');
  p.innerHTML=
    '<div class="brand"><img class="logo" src="../images/tournamentLogo.png" alt="" onerror="this.remove()"><div class="year">2K26</div><div class="sub">ORGANIZED BY E22</div></div>'+
    '<div class="badge">'+esc(C.title)+'</div>'+
    '<div class="hero'+(C.mode==='team'?' team':'')+'"><span class="ph">'+esc(C.placeholder)+'</span>'+img(C.photo,'photo')+img(C.trophy,'trophy')+'</div>'+
    '<div class="name">'+esc(C.name)+'</div>'+
    (C.team?'<div class="teamchip">'+img(C.teamLogo,'tl')+'<span>'+esc(C.team)+'</span></div>':'')+
    (stats?'<div class="stats">'+stats+'</div>':'')+
    '<div class="note">'+esc(C.note)+'</div>'+
    '<div class="foot">E-LEGENDS TROPHY 2K26</div>';
  fit();
}
function fit(){
  var s=document.getElementById('stage');
  var z=Math.min(1,(window.innerWidth-32)/1096);
  s.style.zoom=z;
}
window.addEventListener('resize',fit);
document.addEventListener('DOMContentLoaded',function(){
  var b=document.getElementById('dl');
  if(!b)return;
  b.onclick=function(){
    var s=document.getElementById('stage'),old=s.style.zoom;
    s.style.zoom=1;
    html2canvas(document.getElementById('post'),{scale:1,useCORS:true,backgroundColor:null}).then(function(c){
      var a=document.createElement('a');
      a.download=(document.title.split('|')[0].trim().replace(/\s+/g,'-').toLowerCase())+'.png';
      a.href=c.toDataURL('image/png');a.click();
      s.style.zoom=old;
    });
  };
});
