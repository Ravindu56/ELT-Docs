function fallbackTrophy(src,host){
  var t=document.createElement('img');
  t.className='ttrophy';t.src=src;t.alt='';
  t.style.filter='drop-shadow(0 0 22px rgba(251,191,36,.95)) drop-shadow(0 0 48px rgba(251,191,36,.6))';
  t.onerror=function(){t.remove()};
  host.appendChild(t);
}
function glowTrophy(src,host){
  var im=new Image();
  im.onload=function(){
    var h=300,w=Math.round(im.width*h/im.height),pad=90;
    var c=document.createElement('canvas');
    c.width=w+pad*2;c.height=h+pad*2;c.className='tcanvas';
    var x=c.getContext('2d');
    x.shadowColor='rgba(251,191,36,.95)';
    x.shadowBlur=70;
    x.drawImage(im,pad,pad,w,h);
    x.drawImage(im,pad,pad,w,h);
    x.shadowBlur=28;
    x.drawImage(im,pad,pad,w,h);
    x.shadowBlur=0;
    x.drawImage(im,pad,pad,w,h);
    try{c.toDataURL();host.appendChild(c);}catch(e){fallbackTrophy(src,host);}
  };
  im.onerror=function(){};
  im.src=src;
}
function renderTeamPost(C){
  var p=document.getElementById('post');
  p.className='team';
  p.innerHTML=
    '<div class="brand"><img class="logo" src="../images/tournamentLogo.png" alt="" onerror="this.remove()"><div class="year">2K26</div><div class="sub">ORGANIZED BY E22</div></div>'+
    '<div class="badge">'+esc(C.title)+'</div>'+
    '<div class="tphoto"><span class="ph">TEAM PHOTO</span>'+img(C.teamPhoto,'pic')+
      '<div class="tlogo">'+img(C.logo,'lg')+'</div></div>'+
    '<div class="name">'+esc(C.name)+'</div>'+
    '<div class="note">'+esc(C.note)+'</div>'+
    '<div class="foot">E-LEGENDS TROPHY 2K26</div>';
  if(C.trophy)glowTrophy(C.trophy,p.querySelector('.tphoto'));
  fit();
}
