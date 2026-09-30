const playlist=[{name:"Bawat Daan",file:"songs/BawatDaan.mp3"},{name:"We & Us",file:"songs/WeAndUs.mp3"}];
const galleries={shots:["photos/shots/photo1.jpg","photos/shots/photo2.jpg","photos/shots/photo3.jpg"],smile:["photos/smile/photo1.jpg","photos/smile/photo2.jpg","photos/smile/photo3.jpg"],october:["photos/october/photo1.jpg","photos/october/photo2.jpg","photos/october/photo3.jpg"]};
const octoberSong=playlist[1];
const pageGallery=document.body.dataset.gallery;
const audio=document.getElementById("audio");
const playButtons=[document.getElementById("playButton"),document.getElementById("miniPlay")].filter(Boolean);
const nameEls=[document.getElementById("songName"),document.getElementById("miniName")].filter(Boolean);
const status=document.getElementById("miniStatus");
const STORAGE="eiyhanaMusic";
let saved={};try{saved=JSON.parse(localStorage.getItem(STORAGE)||"{}")}catch(e){}
function currentSong(){if(pageGallery==="october")return octoberSong; return playlist.find(s=>s.file===saved.file)||playlist[0];}
function setSong(song,autoplay=false){if(!audio||!song)return; audio.src=song.file; audio.load(); nameEls.forEach(e=>e.textContent=song.name); saved.file=song.file; localStorage.setItem(STORAGE,JSON.stringify(saved)); if(autoplay) audio.play().catch(()=>{});}
if(audio){const song=currentSong();setSong(song,false); if(saved.file===song.file&&saved.time)audio.currentTime=saved.time; audio.addEventListener("timeupdate",()=>{saved.time=audio.currentTime;localStorage.setItem(STORAGE,JSON.stringify(saved));}); audio.addEventListener("play",()=>{playButtons.forEach(b=>b.textContent="❚❚");if(status)status.textContent="playing ♡"}); audio.addEventListener("pause",()=>{playButtons.forEach(b=>b.textContent="▶");if(status)status.textContent="paused"}); audio.addEventListener("ended",()=>{playButtons.forEach(b=>b.textContent="▶");if(status)status.textContent="finished"}); playButtons.forEach(b=>b.addEventListener("click",()=>audio.paused?audio.play().catch(()=>{}):audio.pause()));}
const list=document.getElementById("songList");
if(list){playlist.forEach((song,i)=>{const row=document.createElement("button");row.className="song-row";row.innerHTML=`<span>♫</span><b>${song.name}</b><small>play this song</small>`;row.addEventListener("click",()=>{setSong(song,true)});list.appendChild(row);});}
const grid=document.getElementById("gallery");
if(grid&&pageGallery){(galleries[pageGallery]||[]).forEach((src,i)=>{const card=document.createElement("button");card.className="photo-card";card.innerHTML=`<img src="${src}" alt="${pageGallery} photo ${i+1}"><span>♡</span>`;card.addEventListener("click",()=>openViewer(src));grid.appendChild(card);});}
function openViewer(src){const v=document.getElementById("viewer"),img=document.getElementById("viewerImg");if(!v||!img)return;img.src=src;v.classList.add("active");document.body.classList.add("locked");}
function closeViewer(){const v=document.getElementById("viewer");if(v)v.classList.remove("active");document.body.classList.remove("locked");}
document.getElementById("closeViewer")?.addEventListener("click",closeViewer);document.getElementById("viewer")?.addEventListener("click",e=>{if(e.target.id==="viewer")closeViewer()});
const reveal=document.getElementById("revealButton");reveal?.addEventListener("click",()=>{document.getElementById("reveal")?.classList.add("magic-out");setTimeout(()=>{const r=document.getElementById("reader");r?.classList.add("show");r?.scrollIntoView({behavior:"smooth"});},1100);});
