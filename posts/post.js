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
function toData(url){
  return fetch(url).then(function(r){if(!r.ok)throw new Error('load');return r.blob()}).then(function(b){
    return new Promise(function(res,rej){var f=new FileReader();f.onload=function(){res(f.result)};f.onerror=rej;f.readAsDataURL(b)});
  });
}
function loadSrc(im,src){
  return new Promise(function(res){im.onload=im.onerror=function(){res()};im.src=src});
}
function prepare(p,st){
  var tasks=[];
  [].forEach.call(p.querySelectorAll('img'),function(im){
    var orig=im.getAttribute('src');
    st.undo.push(function(){im.style.visibility='';im.setAttribute('src',orig)});
    tasks.push(toData(im.currentSrc||im.src).then(function(d){return loadSrc(im,d)}).catch(function(){st.partial=true;im.style.visibility='hidden'}));
  });
  [].forEach.call(p.querySelectorAll('canvas'),function(cv){
    try{cv.toDataURL()}catch(e){st.partial=true;cv.style.visibility='hidden';st.undo.push(function(){cv.style.visibility=''})}
  });
  var grad='radial-gradient(circle at 50% 35%,var(--bg2),var(--bg1) 72%)';
  var m=/url\(["']?([^"')]+)["']?\)/.exec(getComputedStyle(p).backgroundImage||'');
  st.undo.push(function(){p.style.backgroundImage=''});
  if(m&&m[1].indexOf('data:')!==0){
    tasks.push(toData(m[1]).then(function(d){p.style.backgroundImage='url("'+d+'"),'+grad}).catch(function(){st.partial=true;p.style.backgroundImage=grad}));
  }
  return Promise.all(tasks);
}
document.addEventListener('DOMContentLoaded',function(){
  var b=document.getElementById('dl');
  if(!b)return;
  b.onclick=function(){
    var s=document.getElementById('stage'),p=document.getElementById('post'),old=s.style.zoom,st={undo:[],partial:false};
    b.disabled=true;s.style.zoom=1;
    prepare(p,st).then(function(){
      return html2canvas(p,{scale:1,useCORS:true,allowTaint:false,backgroundColor:null,imageTimeout:15000});
    }).then(function(c){
      var a=document.createElement('a');
      a.download=(document.title.split('|')[0].trim().replace(/\s+/g,'-').toLowerCase())+'.png';
      a.href=c.toDataURL('image/png');a.click();
      if(st.partial)alert('Some images could not be included. Open this page from the GitHub Pages link (or a local server) to export the full post.');
    }).catch(function(e){
      alert('Could not export the PNG: '+(e&&e.message?e.message:e)+'. Open this page from the GitHub Pages link and try again.');
    }).then(function(){
      st.undo.forEach(function(f){f()});s.style.zoom=old;b.disabled=false;
    });
  };
});
