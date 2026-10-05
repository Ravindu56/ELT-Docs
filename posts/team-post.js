function renderTeamPost(C){
  var p=document.getElementById('post');
  p.className='team';
  p.innerHTML=
    '<div class="brand"><img class="logo" src="../images/tournamentLogo.png" alt="" onerror="this.remove()"><div class="year">2K26</div><div class="sub">ORGANIZED BY E22</div></div>'+
    '<div class="badge">'+esc(C.title)+'</div>'+
    '<div class="tphoto"><span class="ph">TEAM PHOTO</span>'+img(C.teamPhoto,'pic')+
      '<div class="tlogo">'+img(C.logo,'lg')+'</div>'+img(C.trophy,'ttrophy')+'</div>'+
    '<div class="name">'+esc(C.name)+'</div>'+
    '<div class="note">'+esc(C.note)+'</div>'+
    '<div class="foot">E-LEGENDS TROPHY 2K26</div>';
  fit();
}
