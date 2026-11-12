(function(){
'use strict';
const D=window.PORTFOLIO,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,FINE=matchMedia('(pointer:fine)').matches;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nf=n=>n==null?'—':n>=1e4?(n/1e3).toFixed(n>=1e5?0:1).replace(/\.0$/,'')+'K':n.toLocaleString('en-US');
const dur=s=>{s=Math.round(s||0);const m=Math.floor(s/60),x=s%60;return m>=60?`${Math.floor(m/60)}:${String(m%60).padStart(2,'0')}:${String(x).padStart(2,'0')}`:`${m}:${String(x).padStart(2,'0')}`};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fd=iso=>{const [y,m,d]=iso.split('-');return d?`${MON[+m-1]} ${+d}, ${y}`:`${MON[+m-1]} ${y}`};
const fm=iso=>{const [y,m]=iso.split('-');return `${MON[+m-1]} ${y}`};
const xurl=id=>`https://x.com/NomberFax/status/${id}`;
const ICON={
 x:'<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.3 8.4L23 22h-6.6l-5.1-6.7L5.4 22H2.3l7.8-9L1.8 2h6.7l4.6 6.1L18.9 2zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20z"/></svg>',
 yt:'<svg viewBox="0 0 24 24"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.5.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.7 9 .7 10.9v1.8c0 1.9.3 3.7.3 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.6 1 1.8.2 7.5.2 7.5.2s4.6 0 7.8-.3c.5-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.7v-1.8C23.3 9 23 7.2 23 7.2zM9.7 14.6V8.3l6 3.2-6 3.1z"/></svg>',
 be:'<svg viewBox="0 0 24 24"><path d="M8.2 11.3c.9-.4 1.4-1.2 1.4-2.2C9.6 7 8 6 5.9 6H0v12h6.1c2.2 0 4.1-1 4.1-3.4 0-1.5-.7-2.8-2-3.3zM2.7 8.1h2.6c1 0 1.8.3 1.8 1.4 0 1-.7 1.3-1.6 1.3H2.7V8.1zm2.8 7.8H2.7v-3.2h2.9c1.2 0 1.900.5 1.9 1.6 0 1.2-.9 1.6-2 1.6zM21.2 7.1h-6V5.6h6v1.5zM24 13.3c0-2.6-1.5-4.7-4.2-4.7-2.6 0-4.4 2-4.4 4.6 0 2.7 1.700 4.6 4.4 4.6 2.1 0 3.4-.9 4.1-2.9h-2.1c-.2.7-1.2 1.1-1.9 1.1-1.3 0-2.1-.7-2.1-2.1H24v-.6zm-6.2-1c.1-1.1.8-1.8 2-1.8 1.1 0 1.7.7 1.8 1.8h-3.8z"/></svg>',
 tg:'<svg viewBox="0 0 24 24"><path d="M21.9 4.3 18.6 20c-.2 1.1-.9 1.4-1.800.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L6 13.5l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.5 3c.9-.3 1.7.2 1.4 1.3z"/></svg>',
 md:'<svg viewBox="0 0 24 24"><path d="M13.5 12a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0zm7.4 0c0 3.5-1.5 6.4-3.4 6.4s-3.4-2.9-3.4-6.4 1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4zM24 12c0 3.2-.5 5.7-1.2 5.7s-1.2-2.6-1.2-5.7.5-5.7 1.2-5.7S24 8.8 24 12z"/></svg>',
 mail:'<svg viewBox="0 0 24 24"><path d="M2 5h20v14H2V5zm2 2v.5l8 5 8-5V7H4zm16 2.8-8 5-8-5V17h16V9.8z"/></svg>',
 cmc:'<svg viewBox="0 0 24 24"><path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5c3 0 5.8-1.3 7.8-3.5l-1.6-1.4a8.4 8.4 0 0 1-6.2 2.8A8.4 8.4 0 1 1 20.4 12v.3l-2.8-3.6c-.4-.5-1.1-.5-1.6 0L13 12.6 10 8.7c-.4-.5-1.2-.5-1.6 0L5 13.2l1.6 1.3 2.6-3.4 3 3.9c.4.5 1.2.5 1.6 0l3-3.9 3.3 4.2c.5.6 1.5.4 1.6-.4.2-.9.3-1.9.3-2.9C22.5 6.2 17.8 1.5 12 1.5z"/></svg>',
 link:'<svg viewBox="0 0 24 24"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a1 1 0 1 1 1.4 1.4L12 13.4a1 1 0 0 1-1.4 0zM8.5 19.5a4 4 0 0 1-2.8-6.8l2.1-2.1 1.4 1.4-2.1 2.1a2 2 0 0 0 2.8 2.8l2.1-2.1 1.4 1.4-2.1 2.1a4 4 0 0 1-2.8 1.2zm8.7-6-1.4-1.4 2.1-2.1a2 2 0 0 0-2.8-2.8L13 9.3l-1.4-1.4 2.1-2.1a4 4 0 0 1 5.7 5.7l-2.2 2z"/></svg>'
};
// contact order: Telegram → X → Email → others
const LINKS=[
 ['tg','Telegram','https://t.me/Nomboerto','@Nomboerto','tg'],
 ['x','X / Twitter','https://x.com/NomberFax','@NomberFax'],
 ['mail','Email','mailto:NomberContact@proton.me','NomberContact@proton.me'],
 ['be','Behance','https://www.behance.net/nomberfax','design'],
 ['yt','YouTube','https://www.youtube.com/@NomberCrypto','archive'],
 ['cmc','CoinMarketCap','https://coinmarketcap.com/community/profile/NomberFax/','verified creator','cmc'],
 ['tg','Telegram blog','https://t.me/nomberfax','RU'],
];
// older profiles: kept as small links, no longer active channels
const OLD=[['Medium','https://medium.com/@NomberFax'],['Teletype','https://teletype.in/@nomberfax'],['Binance Square','https://www.binance.com/en/square/profile/nomberfax'],['Farcaster','https://farcaster.xyz/nomberfax'],['DSCVR','https://dscvr.one/u/NomberFax'],['link3','https://link3.to/nomberfax']];
const soc=([i,n,u,s,c],big)=>i==='mail'?`<button class="soc mail-copy" data-copy="${esc(s)}" title="Click to copy">${ICON[i]}${n}${big&&s?`<small>${esc(s)}</small>`:''}</button>`:`<a class="soc ${c||''}" href="${u}" ${u.startsWith('mailto')?'':'target="_blank" rel="noopener"'}>${ICON[i]}${n}${big&&s?`<small>${esc(s)}</small>`:''}</a>`;
const fill=(sel,html)=>{const e=$(sel);if(e)e.innerHTML=html;return e};
fill('#mainLinks',LINKS.slice(0,3).map(l=>soc(l,1)).join(''));
fill('#allLinks',LINKS.slice(3).map(l=>soc(l,1)).join('')+`<p class="old-links"><span>Older profiles:</span> ${OLD.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join(' · ')}</p>`);

/* click-to-copy email */
function toast(msg){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}
 t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1800)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(!b)return;const v=b.dataset.copy;
 const done=()=>toast('Copied: '+v),fb=()=>{const i=document.createElement('textarea');i.value=v;i.style.position='fixed';i.style.opacity='0';document.body.appendChild(i);i.select();try{document.execCommand('copy')}catch(_){}i.remove();done()};
 navigator.clipboard?navigator.clipboard.writeText(v).then(done,fb):fb()});
/* nav */
const burger=$('.burger');if(burger)burger.onclick=()=>document.body.classList.toggle('menu-open');
$$('.nav nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));

/* ---------- effects ---------- */
function countUp(el){
 const end=+el.dataset.count,suf=el.dataset.suffix||'',fmt=el.dataset.fmt;
 const dec=+(el.dataset.dec||0),K=n=>n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(n>=1e5?0:1).replace(/\.0$/,'')+'K':String(Math.round(n));
 const out=v=>el.textContent=(fmt==='k'?K(v):dec?v.toFixed(dec):Math.round(v).toLocaleString('en-US'))+suf;
 if(RM){out(end);return}
 const t0=performance.now(),T=1400;
 const step=t=>{const k=Math.min(1,(t-t0)/T);out(end*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)};
 requestAnimationFrame(step);
}
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;
 if(t.dataset.count!=null)countUp(t);else t.classList.add('in');io.unobserve(t)}),{rootMargin:'0px 0px -8% 0px',threshold:.08}):null;
/* ---------- videos ---------- */
const V=D.videos;
const tags=v=>v.tp.slice(0,3).map(t=>`<span>${esc(t)}</span>`).join('');
function vCard(v){
 return `<article class="v-card tilt rv">
  <div class="player" data-mp4="${esc(v.mp4||'')}" data-yt="${v.yt||''}" data-x="${v.x}" data-poster="${v.img}" role="button" tabindex="0" aria-label="Play: ${esc(v.t)}">
   <img loading="lazy" src="${v.img}" alt="${esc(v.t)}"><button class="play" aria-label="Play" tabindex="-1"></button>
   <span class="src">${v.x?ICON.x+' video':'▶ YouTube'}</span><span class="dur">${dur(v.dur)}</span></div>
  <div class="v-body"><div class="v-title" title="${esc(v.t)}">${esc(v.t)}</div>
   <div class="v-tags">${tags(v)}</div>
   <div class="v-stats"><span>${fd(v.d)}</span>${v.x?`<span>👁 <b>${nf(v.xv)}</b> on X</span><span>♥ <b>${nf(v.xl)}</b></span>`:'<span>YouTube only</span>'}</div>
   <div class="v-links">${v.x?`<a class="xl" href="${xurl(v.x)}" target="_blank" rel="noopener">Watch on X ↗</a>`:''}${v.yt?`<a class="yl" href="https://www.youtube.com/watch?v=${v.yt}" target="_blank" rel="noopener">${v.x?'YouTube':'Watch on YouTube ↗'}</a>`:''}</div>
  </div></article>`;
}
function stopAll(except){
 $$('.player.on').forEach(p=>{if(p===except)return;p.querySelectorAll('video,iframe').forEach(m=>m.remove());p.classList.remove('on')});
}
function ytFrame(p){
 const f=document.createElement('iframe');
 f.src=`https://www.youtube-nocookie.com/embed/${p.dataset.yt}?autoplay=1&rel=0`;
 f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';f.allowFullscreen=true;f.title='YouTube video';
 p.appendChild(f);
}
function play(p){
 if(p.classList.contains('on'))return;
 stopAll(p);p.classList.add('on');
 const mp4=p.dataset.mp4;
 if(mp4){
  const v=document.createElement('video');
  v.controls=true;v.autoplay=true;v.playsInline=true;v.preload='auto';v.poster=p.dataset.poster;
  v.onerror=()=>{v.remove();if(p.dataset.yt)ytFrame(p);else{p.classList.remove('on');window.open(p.dataset.xu||xurl(p.dataset.x),'_blank','noopener')}};
  const s=document.createElement('source');s.src=mp4;s.type='video/mp4';s.onerror=v.onerror;v.appendChild(s);
  p.appendChild(v);v.play().catch(()=>{});
 }else if(p.dataset.yt)ytFrame(p);
 else window.open(xurl(p.dataset.x),'_blank','noopener');
}
document.addEventListener('click',e=>{const p=e.target.closest('.player');if(p&&!e.target.closest('video,iframe'))play(p)});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList?.contains('player'))play(e.target)});
document.addEventListener('play',e=>{if(e.target.tagName==='VIDEO')$$('video').forEach(o=>{if(o!==e.target)o.pause()})},true);

// stats (X numbers count only videos posted on X)
const XV=V.filter(v=>v.x);
const totalXV=XV.reduce((a,v)=>a+(v.xv||0),0),totalXL=XV.reduce((a,v)=>a+(v.xl||0),0);
$$('[data-stat]').forEach(e=>{const k=e.dataset.stat;const val={videos:V.length,videosfloor:Math.floor(XV.length/5)*5,xviews:totalXV,xlikes:totalXL,injvideos:XV.filter(v=>v.tp.includes('Injective')).length,lounge:D.lounge.length,
 loungeimp:D.lounge.reduce((a,l)=>a+l.imp,0),loungevv:D.lounge.reduce((a,l)=>a+l.vv,0),projects:D.current.length+(D.featured||[]).length+D.previous.length+D.stopped.length+(D.dissolved||[]).length,behance:D.behance.length,videoslist:V.filter(v=>!v.tp.includes('InjectiveFit21')&&!v.tp.includes('RU')).length,art:(D.art||[]).length}[k];if(val!=null)e.dataset.count=val});

// home: the 4 newest videos (InjectiveFit21 and RU clips live only on the videos page)
if($('#homeVideos')){
 const pick=V.slice().sort((a,b)=>b.d.localeCompare(a.d)).filter(v=>!v.tp.includes('InjectiveFit21')&&!v.tp.includes('RU')).slice(0,4);
 $('#homeVideos').innerHTML=pick.map(vCard).join('');
}
// videos page
if($('#vGrid')){
 const slug=s=>String(s).toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
 const HIDDEN=new Set(['InjectiveFit21','RU']),VV=V.filter(v=>!v.tp.some(t=>HIDDEN.has(t)));
 const years=[...new Set(VV.map(v=>v.d.slice(0,4)))];
 const tc={};VV.forEach(v=>v.tp.forEach(t=>tc[t]=(tc[t]||0)+1));HIDDEN.forEach(t=>{const n=V.filter(v=>v.tp.includes(t)).length;if(n)tc[t]=n});
 const topics=Object.entries(tc).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
 const bySlug={};topics.forEach(t=>{bySlug[slug(t)]=t;bySlug[t.toLowerCase()]=t});
 const resolveTopic=v=>{if(!v||/^all$/i.test(v))return 'all';return bySlug[slug(v)]||bySlug[String(v).toLowerCase()]||'all'};
 const resolveYear=v=>!v||/^all$/i.test(v)?'all':(years.includes(v)?v:'all');
 const readUrl=()=>{
  let topic='all',year='all',view='list';
  const p=location.pathname.replace(/\/+$/,'').toLowerCase();
  const m=p.match(/\/videos(?:\.html)?(?:\/([^/]+))?$/);
  const Q=new URLSearchParams(location.search);
  if((m&&m[1]==='wall')||(Q.get('view')||'').toLowerCase()==='wall') view='wall';
  else if(m&&m[1]&&m[1]!=='index.html') topic=resolveTopic(decodeURIComponent(m[1]));
  if(Q.get('topic')) topic=resolveTopic(Q.get('topic'));
  if(Q.get('year')) year=resolveYear(Q.get('year'));
  const h=decodeURIComponent((location.hash||'').slice(1));
  if(h&&!h.startsWith('vm-')) h.split('/').filter(Boolean).forEach(part=>{if(/^\d{4}$/.test(part)) year=resolveYear(part); else if(part.toLowerCase()==='wall') view='wall'; else topic=resolveTopic(part)});
  return {topic,year,view};
 };
 const writeUrl=()=>{
  if(st.view==='wall'){if(location.pathname.replace(/\/?$/,'/')!=='/videos/wall/') history.replaceState(history.state,'','/videos/wall/');document.title='Video wall | NomberFax';return}
  const path=st.topic==='all'?'/videos/':'/videos/'+slug(st.topic)+'/';
  const sp=new URLSearchParams(location.search);
  sp.delete('topic');
  if(st.year!=='all') sp.set('year',st.year); else sp.delete('year');
  const qs=sp.toString();
  const hash=(location.hash||'').startsWith('#vm-')?location.hash:'';
  const next=path+(qs?'?'+qs:'')+hash;
  if((location.pathname.replace(/\/?$/,'/')+(location.search||'')+(location.hash||''))!==(path+(qs?'?'+qs:'')+hash) && location.pathname+location.search+location.hash!==next)
    history.replaceState(null,'',next);
  document.title=st.topic==='all'?'Videos | NomberFax — Web3 Content Creator & Designer':st.topic+' videos | NomberFax';
 };
 const prettyUrl=()=>location.origin+(st.topic==='all'?'/videos/':'/videos/'+slug(st.topic)+'/')+(st.year!=='all'?'?year='+st.year:'');
 const st={q:'',year:'all',topic:'all',sort:'new',shown:24,view:'list',...readUrl()};
 const chip=(k,val,label,n)=>`<button class="chip" data-k="${k}" data-v="${esc(val)}" aria-pressed="${st[k]===val}">${esc(label)}${n!=null?`<em>${n}</em>`:''}</button>`;
 $('#vYears').innerHTML='<span class="lbl">Year</span>'+chip('year','all','All',VV.length)+years.map(y=>chip('year',y,y,VV.filter(v=>v.d.startsWith(y)).length)).join('');
 $('#vTopics').innerHTML='<span class="lbl">Topic</span>'+chip('topic','all','All',VV.length)+topics.map(t=>chip('topic',t,t,tc[t])).join('');
 const render=()=>{
  const q=st.q.trim().toLowerCase();
  let L=(HIDDEN.has(st.topic)?V:VV).filter(v=>(st.year==='all'||v.d.startsWith(st.year))&&(st.topic==='all'||v.tp.includes(st.topic))&&(!q||(v.t+' '+(v.desc||'')+' '+v.tp.join(' ')).toLowerCase().includes(q)));
  const S={new:(a,b)=>b.d.localeCompare(a.d),old:(a,b)=>a.d.localeCompare(b.d),views:(a,b)=>(b.xv||0)-(a.xv||0),likes:(a,b)=>(b.xl||0)-(a.xl||0)};
  L=L.slice().sort(S[st.sort]);
  $('#vCount').textContent=`${L.length} video${L.length===1?'':'s'}`+(L.length?` · ${nf(L.reduce((a,v)=>a+(v.xv||0),0))} X views`:'');
  $$('.chip[data-k]').forEach(c=>c.setAttribute('aria-pressed',st[c.dataset.k]===c.dataset.v));
  $('#vGrid').innerHTML=L.slice(0,st.shown).map(vCard).join('')||'<div class="empty">Nothing found — try another filter.</div>';
  $('#vMore').style.display=L.length>st.shown?'':'none';
  months(L);enhance();
 };
 document.addEventListener('click',e=>{const c=e.target.closest('.chip[data-k]');if(!c)return;st[c.dataset.k]=c.dataset.v;st.shown=24;render();writeUrl()});
 let t;$('#vSearch').addEventListener('input',e=>{clearTimeout(t);t=setTimeout(()=>{st.q=e.target.value;st.shown=24;render()},150)});
 $('#vSort').onchange=e=>{st.sort=e.target.value;render()};
 $('#vMore').onclick=()=>{st.shown+=24;render()};
 /* ---- month-by-month view under the results (same filters) ---- */
 function months(L){const by={};L.forEach(v=>(by[v.d.slice(0,7)]=by[v.d.slice(0,7)]||[]).push(v));
  const ks=Object.keys(by).sort().reverse();
  const here=(location.pathname.replace(/\/?$/,'/')||'/');
  $('#vmJump').innerHTML=[...new Set(ks.map(k=>k.slice(0,4)))].map(y=>`<a class="chip vm-chip" href="${here}#vm-${ks.find(k=>k.startsWith(y))}">${y}<em>${ks.filter(k=>k.startsWith(y)).reduce((n,k)=>n+by[k].length,0)}</em></a>`).join('');
  $('#vmList').innerHTML=ks.map(k=>`<section class="vm-month" id="vm-${k}"><h3>${fm(k)}<small>${by[k].length} video${by[k].length>1?'s':''}</small></h3><div class="vm-grid">${by[k].sort((a,b)=>a.d.localeCompare(b.d)).map(v=>`<article class="vm-card">
   <div class="player" data-mp4="${esc(v.mp4||'')}" data-yt="${v.yt||''}" data-x="${v.x||''}" data-poster="${v.img}" role="button" tabindex="0" aria-label="Play: ${esc(v.t)}"><img loading="lazy" src="${v.img}" alt=""><button class="play" aria-label="Play" tabindex="-1"></button><span class="dur">${dur(v.dur)}</span></div>
   <div class="vm-b"><b title="${esc(v.t)}">${esc(v.t)}</b><span>${fd(v.d)}${v.x?` · 👁 ${nf(v.xv)}`:''}</span></div></article>`).join('')}</div></section>`).join('')||'<div class="empty">Nothing found — try another filter.</div>'}
 const copy=$('#vCopy');
 if(copy) copy.onclick=()=>{
  const url=prettyUrl(),done=()=>{copy.textContent='Copied';clearTimeout(copy._t);copy._t=setTimeout(()=>{copy.textContent='🔗 Copy link'},1600)};
  const fb=()=>{const i=document.createElement('textarea');i.value=url;i.style.position='fixed';i.style.opacity='0';document.body.appendChild(i);i.select();try{document.execCommand('copy')}catch(_){}i.remove();done()};
  navigator.clipboard?navigator.clipboard.writeText(url).then(done,fb):fb();
 };
 /* ---- wall view: every video, densest grid ---- */
 const WALL=V.slice().sort((a,b)=>b.d.localeCompare(a.d));
 const kplus=n=>n>=1000?Math.floor(n/1000).toLocaleString('en-US')+'K+':nf(n);
 const first=V.slice().sort((a,b)=>a.d.localeCompare(b.d))[0];
 const wallHead=`${V.length} videos · ${kplus(totalXV)} views on X · since ${first?fm(first.d.slice(0,7)):'Feb 2024'}`;
 let wallBuilt=false,wallOpen=false;
 function ensureWall(){
  if(wallBuilt)return;
  const root=document.createElement('div');root.id='vWall';root.className='v-wall';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','All videos as a wall');
  root.innerHTML=`<div class="v-wall-bar"><h2>All videos<span>${esc(wallHead)}</span></h2><div class="v-wall-actions"><button class="btn sm" type="button" id="vWallCopy">🔗 Copy link</button><button class="btn sm primary" type="button" id="vWallClose">← List view</button></div></div><div class="v-wall-grid" id="vWallGrid"></div><div class="v-wall-tip" id="vWallTip" hidden></div>`;
  document.body.appendChild(root);
  const modal=document.createElement('div');modal.id='vWallModal';modal.className='v-wall-modal';modal.hidden=true;modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');
  modal.innerHTML='<button class="v-wall-modal-x" type="button" aria-label="Close">×</button><div class="v-wall-modal-box"><div class="player" id="vWallPlayer"></div><div class="v-wall-modal-meta"><div><b id="vWallMTitle"></b><span id="vWallMDate"></span></div><div id="vWallMLinks"></div></div></div>';
  document.body.appendChild(modal);
  $('#vWallGrid').innerHTML=WALL.map(v=>`<button type="button" class="v-tile" data-mp4="${esc(v.mp4||'')}" data-yt="${v.yt||''}" data-x="${v.x||''}" data-poster="${esc(v.img)}" data-tip="${esc(v.t)}" data-date="${esc(fd(v.d))}" aria-label="${esc(v.t)}"><img loading="lazy" src="${esc(v.img)}" alt=""></button>`).join('');
  const tip=$('#vWallTip');
  const placeTip=(el)=>{
    const r=el.getBoundingClientRect(),t=el.dataset.tip,d=el.dataset.date;
    tip.innerHTML=`${esc(t)}<small>${esc(d)}</small>`;tip.hidden=false;tip.classList.add('on');
    const tw=tip.offsetWidth,th=tip.offsetHeight;
    let x=r.left+r.width/2,y=r.top-8;
    if(x-tw/2<8)x=8+tw/2; if(x+tw/2>innerWidth-8)x=innerWidth-8-tw/2;
    if(y-th<8){y=r.bottom+8;tip.style.transform='translate(-50%,0)'} else tip.style.transform='translate(-50%,-100%)';
    tip.style.left=x+'px';tip.style.top=y+'px';
  };
  const hideTip=()=>{tip.classList.remove('on');tip.hidden=true};
  $('#vWallGrid').addEventListener('pointerover',e=>{const t=e.target.closest('.v-tile');if(t)placeTip(t)});
  $('#vWallGrid').addEventListener('pointerout',e=>{if(!e.relatedTarget||!e.relatedTarget.closest?.('.v-tile'))hideTip()});
  $('#vWallGrid').addEventListener('focusin',e=>{const t=e.target.closest('.v-tile');if(t)placeTip(t)});
  $('#vWallGrid').addEventListener('focusout',hideTip);
  $('#vWallGrid').addEventListener('click',e=>{const t=e.target.closest('.v-tile');if(t)openWallModal(t)});
  $('#vWallClose').onclick=()=>closeWall();
  $('#vWallCopy').onclick=()=>{
    const url=location.origin+'/videos/wall/',btn=$('#vWallCopy');
    const done=()=>{btn.textContent='Copied';clearTimeout(btn._t);btn._t=setTimeout(()=>{btn.textContent='🔗 Copy link'},1600)};
    const fb=()=>{const i=document.createElement('textarea');i.value=url;i.style.position='fixed';i.style.opacity='0';document.body.appendChild(i);i.select();try{document.execCommand('copy')}catch(_){}i.remove();done()};
    navigator.clipboard?navigator.clipboard.writeText(url).then(done,fb):fb();
  };
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.v-wall-modal-x'))closeWallModal()});
  wallBuilt=true;
 }
 function sizeWall(){
  const grid=$('#vWallGrid');if(!grid||!wallOpen)return;
  const n=WALL.length,w=grid.clientWidth,h=grid.clientHeight,mob=innerWidth<701;
  const cMin=mob?5:12,cMax=mob?6:16,gap=mob?3:4;
  let best=cMax;
  for(let c=cMin;c<=cMax;c++){
   const rows=Math.ceil(n/c),tw=(w-gap*(c-1))/c,th=tw*9/16,total=rows*th+gap*(rows-1);
   if(total<=h+0.5){best=c;break}
  }
  const rows=Math.ceil(n/best),tw=(w-gap*(best-1))/best,th=tw*9/16,total=rows*th+gap*(rows-1);
  grid.style.gridTemplateColumns=`repeat(${best},minmax(0,1fr))`;
  grid.style.gap=gap+'px';
  grid.style.alignContent=total<=h+0.5?'center':'start';
  grid.dataset.cols=best;
 }
 function openWall(push){
  ensureWall();
  $('#vWall').hidden=false;document.body.classList.add('v-wall-on');
  wallOpen=true;st.view='wall';document.title='Video wall | NomberFax';
  sizeWall();requestAnimationFrame(sizeWall);
  if(push && location.pathname.replace(/\/?$/,'/')!=='/videos/wall/') history.pushState({wall:1},'','/videos/wall/');
  else if(location.pathname.replace(/\/?$/,'/')!=='/videos/wall/') history.replaceState({wall:1},'','/videos/wall/');
 }
 function closeWallModal(){
  const m=$('#vWallModal');if(!m||m.hidden)return;
  stopAll();m.hidden=true;const pl=$('#vWallPlayer');if(pl){pl.querySelectorAll('video,iframe').forEach(x=>x.remove());pl.classList.remove('on');pl.innerHTML=''}
 }
 function closeWall(fromPop){
  closeWallModal();
  const w=$('#vWall');if(w)w.hidden=true;
  document.body.classList.remove('v-wall-on');wallOpen=false;st.view='list';
  if(!fromPop && history.state&&history.state.wall){history.back();return}
  writeUrl(); // also used on popstate to restore title
 }
 function openWallModal(tile){
  ensureWall();closeWallModal();
  const modal=$('#vWallModal'),pl=$('#vWallPlayer');
  pl.dataset.mp4=tile.dataset.mp4||'';pl.dataset.yt=tile.dataset.yt||'';pl.dataset.x=tile.dataset.x||'';pl.dataset.poster=tile.dataset.poster||'';
  pl.innerHTML=`<img src="${esc(tile.dataset.poster||'')}" alt=""><button class="play" aria-label="Play" tabindex="-1"></button>`;
  $('#vWallMTitle').textContent=tile.dataset.tip||'';
  $('#vWallMDate').textContent=tile.dataset.date||'';
  const links=[];
  if(tile.dataset.x) links.push(`<a class="xl" href="${xurl(tile.dataset.x)}" target="_blank" rel="noopener">Watch on X ↗</a>`);
  if(tile.dataset.yt) links.push(`<a class="yl" href="https://www.youtube.com/watch?v=${tile.dataset.yt}" target="_blank" rel="noopener">YouTube ↗</a>`);
  $('#vWallMLinks').innerHTML=links.join(' ');
  modal.hidden=false;
  play(pl);
 }
 const vWallBtn=$('#vWallBtn');
 if(vWallBtn) vWallBtn.onclick=()=>wallOpen?closeWall():openWall(true);
 addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if($('#vWallModal')&&!$('#vWallModal').hidden){e.preventDefault();closeWallModal();return}
  if(wallOpen){e.preventDefault();closeWall()}
 });
 addEventListener('resize',()=>{if(wallOpen)sizeWall()});

 const deep=st.topic!=='all'||st.year!=='all';
 render();
 if(st.view==='wall') openWall(false); else writeUrl();
 if(deep&&st.view!=='wall') setTimeout(()=>{const el=$('#vFilters')||$('#vTopics');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},80);
 addEventListener('popstate',()=>{
  const u=readUrl();
  Object.assign(st,{topic:u.topic,year:u.year,view:u.view});st.shown=24;render();
  if(u.view==='wall') openWall(false); else { if(wallOpen) closeWall(true); else writeUrl(); }
 });
 addEventListener('hashchange',()=>{const h=(location.hash||'').slice(1);if(h.startsWith('vm-'))return;const u=readUrl();if(u.topic===st.topic&&u.year===st.year&&u.view===st.view)return;Object.assign(st,u);st.shown=24;render();if(u.view==='wall')openWall(false);else if(wallOpen)closeWall(true)});
}


/* ---------- INJ Lounge ---------- */
if($('#loungeGrid')){
 $('#loungeGrid').innerHTML=D.lounge.slice().sort((a,b)=>b.imp-a.imp).map((l,i)=>`<article class="v-card tilt rv ${i<2?'big':''}">
  <div class="player" data-mp4="${esc(l.mp4||'')}" data-x="${l.id}" data-poster="assets/lounge/${l.id}.jpg" role="button" tabindex="0" aria-label="Play: ${esc(l.t)}">
   <img loading="lazy" src="assets/lounge/${l.id}.jpg" alt="${esc(l.t)}"><button class="play" aria-label="Play" tabindex="-1"></button>
   <span class="src">${ICON.x} @InjectiveLounge</span><span class="dur">${dur(l.dur)}</span></div>
  <div class="v-body"><div class="v-title">${esc(l.t)}</div>
   <div class="v-stats"><span>${fd(l.date)}</span><span>👁 <b>${nf(l.imp)}</b> impressions</span><span>▶ <b>${nf(l.vv)}</b> video views</span><span>♥ <b>${nf(l.likes)}</b></span>${l.rt?`<span>⟲ <b>${nf(l.rt)}</b></span>`:''}${l.rep?`<span>💬 <b>${nf(l.rep)}</b></span>`:''}</div>
   <div class="v-links"><a class="xl" href="https://x.com/InjectiveLounge/status/${l.id}" target="_blank" rel="noopener">Open on X ↗</a></div>
  </div></article>`).join('');
}

/* ---------- Behance ---------- */
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const B=D.behance.slice().sort((a,b)=>(b.year+String(MONTHS.indexOf(b.month)).padStart(2,'0')).localeCompare(a.year+String(MONTHS.indexOf(a.month)).padStart(2,'0')));
const bCard=b=>`<a class="b-card tilt rv" href="${b.url}" target="_blank" rel="noopener"><div class="img"><img loading="lazy" src="${b.cover_local}" alt="${esc(b.t)}"></div><div class="t">${esc(b.month)} ${b.year}<small>Monthly works · Behance ↗</small></div></a>`;
if($('#homeDesign'))$('#homeDesign').innerHTML=B.slice(0,8).map(bCard).join('');
if($('#designYears')){
 const by={};B.forEach(b=>{(by[b.year]=by[b.year]||{});(by[b.year][b.month]=by[b.year][b.month]||[]).push(b)});
 $('#designYears').innerHTML=Object.keys(by).sort().reverse().map(y=>{const ms=Object.keys(by[y]).sort((a,b)=>MONTHS.indexOf(b)-MONTHS.indexOf(a));
  return `<section class="year-block rv"><h3><span class="grad">${y}</span><small>${ms.length} month${ms.length>1?'s':''}</small></h3><div class="year-months">${ms.map(m=>`<div class="month-col"><div class="m">${m} <small>${by[y][m].length} project${by[y][m].length>1?'s':''}</small></div>${by[y][m].map(b=>`<a class="b-card tilt" href="${b.url}" target="_blank" rel="noopener"><div class="img"><img loading="lazy" src="${b.cover_local}" alt="${esc(b.t)}"></div><div class="t">${esc(b.t)}<small>${b.published?`Published ${fd(b.published)} · `:''}Open on Behance ↗</small></div></a>`).join('')}</div>`).join('')}</div></section>`}).join('');
}

/* ---------- highlights ---------- */
const HL=[
 ['1891523132617326968','Thread','The most stable way to earn in crypto','Why one sector beats airdrops, trading, testnets and NFTs.',3756,93],
 ['1930276730473681240','Thread','How Kaito works and how to farm Yaps','A breakdown of @KaitoAI mechanics with tips on Yaps.',3132,111],
 ['1886070376817389805','Thread','13 merch ideas for Injective','A creative thread on what $INJ merch could look like.',2388,71],
 ['1859270465522462820','Cartoon','“How Benny Boone Saved the Bull”','Original animated short about the ecosystem mascots.',2989,125],
 ['1870542728762941596','Video','Huma Finance: the time value of money','Explainer video about @humafinance.',2880,55],
 ['1873005088806994022','Video','$INJ year in review 2024','Festive video recap of the year.',2443,111],
];
fill('#hlGrid',HL.map(([id,k,t,p,imp,lk])=>`<a class="card hl tilt rv" href="${xurl(id)}" target="_blank" rel="noopener">
 <div class="hl-img"><img loading="lazy" src="assets/x/${id}.jpg" alt="">${/Video|Cartoon/.test(k)?'<span class="vbadge">▶ video</span>':''}</div>
 <div class="hl-b"><span class="k">${k}</span><b>${esc(t)}</b><p>${esc(p)}</p><div class="hl-m"><span>👁 ${imp.toLocaleString('en-US')}</span><span>♥ ${lk}</span><span>X ↗</span></div></div></a>`).join(''));

/* ---------- experience ---------- */
const logo=(h,n)=>!h?`<span class="logo-img">${esc(n[0])}</span>`:`<img class="logo-img" loading="lazy" src="assets/logos/${h}.jpg" alt="${esc(n)}" onerror="this.outerHTML='<span class=&quot;logo-img&quot;>${esc(n[0])}</span>'">`;
const span=p=>(new Date(p.end||'2026-10-29')-new Date(p.start));
// manual override: higher priority first (Viction pinned first by user request), then by duration
const byDur=(x,y)=>(y.priority||0)-(x.priority||0)||span(y)-span(x)||x.start.localeCompare(y.start);
const GROUPS=[
 ['Featured',[...D.current.map(p=>({...p,status:'now'})),...(D.featured||[]).map(p=>({...p,status:'done'}))]],
 ['Program completed',D.previous.map(p=>({...p,status:'done'})).sort(byDur)],
 ['Inactive',D.stopped.map(p=>({...p,status:'paused'})).sort(byDur)],
 ['Dissolved projects',(D.dissolved||[]).map(p=>({...p,status:'gone'})).sort(byDur)]];
const nm=n=>{const m=/^(.*?)\s*(\([^)]*\))$/.exec(n);return m?[m[1],m[2]]:[n,''];};
const nameHtml=n=>{const [a,b]=nm(n);return `${esc(a)}${b?`<span class="t-sub">${esc(b)}</span>`:''}`;};
const range=p=>p.hideEnd?`From ${fm(p.start)}`:p.end&&p.end!==p.start?`${fm(p.start)} — ${fm(p.end)}`:`${p.status==='now'||!p.end?'Since ':''}${fm(p.start)}`;
const ST={now:'Active',done:'Program completed',paused:'Inactive',gone:'Project dissolved'};
const tItem=p=>`<div class="t-item">${logo(p.handle,p.name)}
 <div class="t-main"><b>${nameHtml(p.name)}</b><small>${esc(p.role)}${p.handle&&!p.nolink?` · <a href="https://x.com/${p.handle}" target="_blank" rel="noopener">@${p.handle}</a>`:''}</small></div>
 <div class="t-date">${range(p)}<span class="t-status">${ST[p.status]}</span></div></div>`;
fill('#timeline',GROUPS.filter(g=>g[1].length).map(([h,ps],i)=>`${i?`<h4 class="t-group">${h} <em>${ps.length}</em></h4>`:''}${ps.map(tItem).join('')}`).join(''));
fill('#contrib',D.contrib.map(c=>{const ic=(D.contribIcons||{})[c];return `<span class="pill pill-ic">${ic?`<img class="c-ic" loading="lazy" src="${ic.icon}" alt="" title="@${esc(ic.handle)}">`:`<span class="c-ic">${esc(c[0])}</span>`}${esc(c)}</span>`;}).join(''));
const tg=$('#projToggle');
if(tg)tg.onclick=()=>{const o=$('#allProj').classList.toggle('open');tg.setAttribute('aria-expanded',o);tg.firstChild.textContent=o?'Hide projects ':'Show all projects ';};
// marquee
if($('#marquee')){
 const ps=[...GROUPS[0][1],...GROUPS[1][1],...GROUPS[2][1],...GROUPS[3][1]];
 const one=ps.map(p=>`<span>${logo(p.handle,p.name).replace('logo-img','ini')}${esc(nm(p.name)[0])}</span>`).join('');
 $('#marquee').innerHTML=one+one.replace(/<span>/g,'<span aria-hidden="true">');
}

/* ---------- Art & 3D ---------- */
const ART=(D.art||[]).slice().sort((a,b)=>b.d.localeCompare(a.d));
const ACAT={'3d':'3D',digital:'Digital art',hand:'Hand-drawn',animation:'Animation'};
const AGRP={all:'All','3d':'3D',art:'Art',animation:'Animation'},inG=(a,g)=>g==='all'||(g==='art'?a.cat==='digital'||a.cat==='hand':a.cat===g);
function aCard(a){
 const m=a.mp4?`<div class="player" data-mp4="${esc(a.mp4)}" data-x="${a.id}" data-poster="${a.img}" role="button" tabindex="0" aria-label="Play: ${esc(a.t)}"><img loading="lazy" src="${a.img}" alt="${esc(a.t)}"><button class="play" aria-label="Play" tabindex="-1"></button><span class="src">${ICON.x} video</span>${a.dur?`<span class="dur">${dur(a.dur)}</span>`:''}</div>`
  :`<button class="a-img" data-lb="${a.id}" aria-label="Open full size: ${esc(a.t)}"><img loading="lazy" src="${a.img}" alt="${esc(a.t)}"><span class="a-zoom">⤢</span></button>`;
 return `<article class="a-card tilt rv c-${a.cat}">${m}<div class="a-body"><span class="a-cat">${ACAT[a.cat]}</span><div class="a-title" title="${esc(a.t)}">${esc(a.t)}</div>
  <div class="v-stats"><span>${fd(a.d)}</span>${a.imp?`<span>👁 <b>${nf(a.imp)}</b></span>`:''}${a.likes?`<span>♥ <b>${nf(a.likes)}</b></span>`:''}</div>
  <div class="v-links"><a class="xl" href="${xurl(a.id)}" target="_blank" rel="noopener">Open on X ↗</a></div></div></article>`;
}
let LBL=[],lbi=0;
function lbOpen(id,list){
 let lb=$('#lightbox');
 if(!lb){lb=document.createElement('div');lb.id='lightbox';lb.className='lightbox';lb.hidden=true;lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
  lb.innerHTML='<button class="lb-x" aria-label="Close">×</button><button class="lb-nav lb-prev" aria-label="Previous">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-nav lb-next" aria-label="Next">›</button>';document.body.appendChild(lb)}
 if(!lb.dataset.wired){lb.dataset.wired=1;
  lb.addEventListener('click',e=>{if(e.target.closest('.lb-x')||e.target===lb)lbClose();else if(e.target.closest('.lb-prev'))lbGo(-1);else if(e.target.closest('.lb-next'))lbGo(1)});
  document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lbClose();if(e.key==='ArrowRight')lbGo(1);if(e.key==='ArrowLeft')lbGo(-1)})}
 LBL=list;lbi=Math.max(0,LBL.findIndex(a=>a.id===id));lb.hidden=false;document.body.classList.add('lb-on');lbGo(0);lb.querySelector('.lb-x').focus();
}
function lbGo(k){const lb=$('#lightbox');lbi=(lbi+k+LBL.length)%LBL.length;const a=LBL[lbi],img=lb.querySelector('img');
 img.onerror=()=>{img.onerror=null;img.src=a.img};img.src=a.full||a.img;img.alt=a.t;
 lb.querySelector('figcaption').innerHTML=`<b>${esc(a.t)}</b><span>${a.sub||ACAT[a.cat]} · ${fd(a.d)}</span><a href="${a.u||xurl(a.id)}" target="_blank" rel="noopener">Open on X ↗</a>`;
 lb.querySelectorAll('.lb-nav').forEach(b=>b.hidden=LBL.length<2)}
function lbClose(){const lb=$('#lightbox');lb.hidden=true;lb.querySelector('img').src='';document.body.classList.remove('lb-on')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-lb]');if(!b)return;const g=b.closest('.a-grid');
 const ids=g?[...g.querySelectorAll('[data-lb]')].map(x=>x.dataset.lb):[b.dataset.lb];lbOpen(b.dataset.lb,ids.map(id=>ART.find(a=>a.id===id)).filter(Boolean))});
if($('#homeArt')&&ART.length){
 const want=['1859270465522462820','1955663120174600199','1980611740845871294'];
 const pick=[...want.map(id=>ART.find(a=>a.id===id)).filter(Boolean),...ART.filter(a=>!a.mp4).sort((a,b)=>(b.likes||0)-(a.likes||0))].filter((a,i,s)=>s.indexOf(a)===i).slice(0,8);
 $('#homeArt').innerHTML=pick.map(aCard).join('');
}
if($('#artGrid')){
 const P=new URLSearchParams(location.search);let g=AGRP[P.get('cat')]?P.get('cat'):'all';
 const draw=()=>{$('#aCats').innerHTML='<span class="lbl">Category</span>'+Object.entries(AGRP).map(([k,l])=>`<button class="chip a-chip" data-g="${k}" aria-pressed="${k===g}">${l}<em>${ART.filter(a=>inG(a,k)).length}</em></button>`).join('');
  const L=ART.filter(a=>inG(a,g));
  $('#artGrid').innerHTML=(g==='art'?['digital','hand'].map(c=>`<div class="t-group">${ACAT[c]} <em>${L.filter(a=>a.cat===c).length}</em></div>`+L.filter(a=>a.cat===c).map(aCard).join('')).join(''):L.map(aCard).join(''));enhance()};
 $('#aCats').addEventListener('click',e=>{const c=e.target.closest('.a-chip');if(!c)return;g=c.dataset.g;stopAll();draw();
  const u=new URL(location.href);g==='all'?u.searchParams.delete('cat'):u.searchParams.set('cat',g);history.replaceState(null,'',u)});
 draw();
}

/* ---------- Kind words (thanks.html) ---------- */
if($('#kindWords')&&D.kind){
 const rich=t=>esc(t).replace(/(^|[\s(])([@$][A-Za-z0-9_]+)/g,'$1<b class="k-tag">$2</b>');
 const pu=(h,id)=>`https://x.com/${h}/status/${id}`;
 const rx=r=>`<div class="k-rx"><button class="k-rx-btn" aria-expanded="false" aria-controls="rx-${r.id}">✨ My reaction</button>
   <div class="k-pop" id="rx-${r.id}" role="tooltip"><div class="k-pop-in">
    <img src="${r.img}" alt="Image from my reaction post" loading="lazy">
    <div class="k-pop-b"><span class="k-pop-l">${esc(r.label)}</span><p>${rich(r.t)}</p>
    <div class="k-pop-f"><span>@NomberFax · ${fd(r.d)}</span><a href="${xurl(r.id)}" target="_blank" rel="noopener">Open on X ↗</a></div></div></div></div></div>`;
 const kp=(a,p)=>`<article class="k-post rv">
   <header class="k-ph"><img src="${a.av}" alt="" loading="lazy"><span><b>${esc(a.n)}</b><em>@${a.h}</em></span>${ICON.x}</header>
   <div class="k-tw"><p class="k-text">${rich(p.t)}</p><button class="k-more" hidden>Show more</button></div>
   <button class="k-img" data-kb="${p.id}" aria-label="Open image full size"><img src="${p.img}" alt="Image from @${a.h}'s post" loading="lazy"></button>
   <div class="k-meta"><span>${fd(p.d)}</span>${p.m?`<span>👁 <b>${nf(p.m.imp)}</b></span><span>♥ <b>${nf(p.m.likes)}</b></span><span>⟲ <b>${nf(p.m.rp)}</b></span><span>💬 <b>${nf(p.m.rep)}</b></span>`:''}</div>
   <div class="k-foot"><a class="xl" href="${pu(a.h,p.id)}" target="_blank" rel="noopener">Open on X ↗</a>${p.reaction?rx(p.reaction):''}</div></article>`;
 $('#kindWords').innerHTML=D.kind.map(a=>`<div class="k-author">
  <div class="k-who rv"><a href="https://x.com/${a.h}" target="_blank" rel="noopener" class="k-av"><img src="${a.av}" alt="${esc(a.n)} avatar"></a>
   <div><h3>${esc(a.n)}</h3><a class="k-handle" href="https://x.com/${a.h}" target="_blank" rel="noopener">@${a.h}</a><p>${esc(a.thanks)}</p></div></div>
  <div class="k-posts">${a.posts.map(p=>kp(a,p)).join('')}</div></div>`).join('');
 const chkMore=()=>$$('.k-text').forEach(t=>{const b=t.nextElementSibling;if(!t.parentNode.classList.contains('open'))b.hidden=t.scrollHeight<=t.clientHeight+2});
 chkMore();addEventListener('resize',chkMore);addEventListener('load',chkMore);
 const KL=[];D.kind.forEach(a=>a.posts.forEach(p=>{KL.push({id:p.id,t:`@${a.h}`,img:p.img,full:p.img,d:p.d,u:pu(a.h,p.id),sub:esc(a.n)});
  if(p.reaction)KL.push({id:p.reaction.id,t:'My reaction',img:p.reaction.img,full:p.reaction.img,d:p.reaction.d,u:xurl(p.reaction.id),sub:'@NomberFax'})}));
 document.addEventListener('click',e=>{
  const b=e.target.closest('[data-kb]');if(b){lbOpen(b.dataset.kb,KL);return}
  const m=e.target.closest('.k-more');if(m){const o=m.parentNode.classList.toggle('open');m.textContent=o?'Show less':'Show more';return}
  const r=e.target.closest('.k-rx-btn');
  $$('.k-rx.open').forEach(x=>{if(!r||x!==r.parentNode){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')}});
  if(r){const o=r.parentNode.classList.toggle('open');r.setAttribute('aria-expanded',o)}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.k-rx.open').forEach(x=>x.classList.remove('open'))});
}

/* ---------- Knight's path map ---------- */
if($('#quest')&&D.map){
 const M=D.map.slice().sort((a,b)=>a.date.localeCompare(b.date)),VX={};V.forEach(v=>{if(v.x)VX[v.x]=v});
 const CAT={milestone:['Milestone','#ffcc4d'],irl:['IRL','#2bff88'],video:['Video','#00e5ff'],lounge:['INJ Lounge','#a58bff'],unusual:['Unusual','#ff3ea5'],thread:['Thread','#ff9a3c']},TAG={nft:['NFT','#c084fc']};
 const has=(n,f)=>f==='all'||(f==='star'?!!n.star:n.cat===f||(n.tags||[]).includes(f)),FC={...CAT,...TAG};
 const track=$('#qTrack'),svg=$('#qSvg'),map=$('#qMap'),panel=$('#qPanel'),kn=$('#qKnight');kn.textContent='';
 let cur=M.findIndex(n=>n.title.startsWith('Knighted')),filt='all';if(cur<0)cur=0;
 $('#qCount').textContent=M.length;
 const fl=[['all','All',M.length],...Object.entries(FC).map(([k,[l]])=>[k,l,M.filter(n=>has(n,k)).length]),['star','★ Highlights',M.filter(n=>n.star).length]];
 $('#qFilters').innerHTML=fl.map(([k,l,n])=>`<button class="chip q-chip" data-f="${k}" aria-pressed="${k==='all'}" ${FC[k]?`style="--c:${FC[k][1]}"`:''}>${FC[k]?'<i></i>':''}${l}<em data-n="${n}">${n}</em></button>`).join('');
 const NY=M.map((n,i)=>(n.tags||[]).includes('newyear')?i:-1).filter(i=>i>=0),idx=x=>M.findIndex(n=>n.x===x||(n.xu||'').includes(x));
 const YJ=[['2024',0,'Day 1 of the journey'],['2025',idx('1874150476759130321'),'New Year 2025'],['2026',idx('2006063322806751529'),'New Year 2026']].filter(y=>y[1]>=0);
 $('#qJump').innerHTML=`<span class="q-jl">Jump to</span>${YJ.map(([y,i,t])=>`<button class="chip q-yr" data-j="${i}" title="${t}">${y}</button>`).join('')}<button class="chip q-ny" data-ny title="Step through the New Year stops">🎄 New Year<em>${NY.length}</em></button>`;
 const btns=M.map((n,i)=>{const b=document.createElement('button');b.className=`q-node c-${n.cat}${n.star?' star':''}`;b.style.setProperty('--c',CAT[n.cat][1]);
  b.setAttribute('aria-label',`${fd(n.date)}: ${n.title}`);b.dataset.i=i;
  b.innerHTML=`<span class="q-dot"></span><span class="q-lab"><em>${n.dl||fm(n.date)}</em>${n.star?esc(n.title.length>34?n.title.slice(0,32)+'…':n.title):''}</span>`;track.appendChild(b);return b});
 let P=[];
 function layout(){
  const mob=innerWidth<700,gap=mob?92:112,H=mob?380:440,mid=H/2,A=mob?92:112;
  P=M.map((n,i)=>[60+i*gap,mid+Math.sin(i*.78+.6)*A*(.75+.25*Math.cos(i*.31))]);
  track.style.width=(P[P.length-1][0]+90)+'px';track.style.height=H+'px';
  btns.forEach((b,i)=>{b.style.left=P[i][0]+'px';b.style.top=P[i][1]+'px';b.classList.toggle('lab-up',P[i][1]<mid)});
  let d=`M${P[0][0]},${P[0][1]}`;
  for(let i=0;i<P.length-1;i++){const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2;
   d+=` C${p1[0]+(p2[0]-p0[0])/6},${p1[1]+(p2[1]-p0[1])/6} ${p2[0]-(p3[0]-p1[0])/6},${p2[1]-(p3[1]-p1[1])/6} ${p2[0]},${p2[1]}`}
  let yrs='';M.forEach((n,i)=>{if(!i||n.date.slice(0,4)!==M[i-1].date.slice(0,4)){const x=P[i][0]-gap/2+(i?0:20);yrs+=`<line x1="${x}" y1="14" x2="${x}" y2="${H-10}" class="q-yl"/><text x="${x+8}" y="30" class="q-yt">${n.date.slice(0,4)}</text>`}});
  svg.setAttribute('viewBox',`0 0 ${track.style.width.replace('px','')} ${H}`);svg.setAttribute('width',track.style.width);svg.setAttribute('height',H);
  svg.innerHTML=`<defs><linearGradient id="qg" x1="0" x2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset=".5" stop-color="#7c5cff"/><stop offset="1" stop-color="#ff3ea5"/></linearGradient><filter id="qb"><feGaussianBlur stdDeviation="6"/></filter></defs>${yrs}<path d="${d}" class="q-glow" filter="url(#qb)"/><path d="${d}" class="q-line"/><path d="${d}" class="q-dash"/>`;
  place(false);
 }
 function place(scroll){const p=P[cur];kn.style.transform=`translate(${p[0]}px,${p[1]}px)`;kn.classList.toggle('below',btns[cur].classList.contains('lab-up'));
  btns.forEach((b,i)=>{b.classList.toggle('on',i===cur);b.classList.toggle('done',i<cur)});
  if(scroll){const L=p[0]-map.clientWidth/2;map.scrollTo({left:Math.max(0,L),behavior:RM?'auto':'smooth'})}}
 function media(n){
  const v=n.vid&&VX[n.vid];
  if(v)return `<div class="player" data-mp4="${esc(v.mp4||'')}" data-yt="${v.yt||''}" data-x="${v.x}" data-poster="${v.img}" role="button" tabindex="0" aria-label="Play: ${esc(n.title)}"><img src="${v.img}" alt=""><button class="play" tabindex="-1" aria-label="Play"></button><span class="dur">${dur(v.dur)}</span></div>`;
  if(n.mp4)return `<div class="player" data-mp4="${esc(n.mp4)}" data-x="${n.x||''}" data-xu="${esc(n.xu||'')}" data-poster="${n.poster||n.img}" role="button" tabindex="0" aria-label="Play: ${esc(n.title)}"><img src="${n.poster||n.img}" alt=""><button class="play" tabindex="-1" aria-label="Play"></button></div>`;
  if(n.img)return `<div class="qp-img${/logos\//.test(n.img)?' logo':''}"><img src="${n.img}" alt=""></div>`;return '';
 }
 function show(i,scroll=true){
  cur=(i+M.length)%M.length;const n=M[cur],[cl,cc]=CAT[n.cat];stopAll();
  const xu=n.xu||(n.x?xurl(n.x):'');
  panel.innerHTML=`<div class="qp-in" style="--c:${cc}">
   <div class="qp-top"><span class="qp-cat"><i></i>${cl}</span><span class="qp-date">${n.dl||fd(n.date)}</span>${n.star?'<span class="qp-star">★ Highlight</span>':''}</div>
   <h4>${esc(n.title)}</h4>${media(n)}<p>${esc(n.desc)}</p>
   ${n.imp?`<div class="qp-m"><span>👁 <b>${n.imp.toLocaleString('en-US')}</b> impressions</span>${n.likes?`<span>♥ <b>${n.likes}</b></span>`:''}${n.extra?`<span>▶ ${esc(n.extra)}</span>`:''}</div>`:''}
   <div class="qp-links">${xu?`<a class="btn sm primary" href="${xu}" target="_blank" rel="noopener">${ICON.x} Open on X ↗</a>`:''}${n.x2?`<a class="btn sm qp-sub" href="${xurl(n.x2)}" target="_blank" rel="noopener">${esc(n.label2||'Day 1')} ↗</a>`:''}${n.link?`<a class="btn sm" href="${n.link}" ${n.link.startsWith('http')?'target="_blank" rel="noopener"':''}>${esc(n.label||'Open')} ↗</a>`:''}</div>
   <div class="qp-nav"><button class="btn sm" data-q="-1" aria-label="Previous stop">←</button><span>${cur+1} / ${M.length}</span><button class="btn sm" data-q="1" aria-label="Next stop">→</button></div></div>`;
  panel.querySelector('.qp-in').animate?.([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:RM?0:320,easing:'ease-out'});
  place(scroll);cnt();
 }
 function cnt(){$$('.q-chip em').forEach(e=>e.textContent=e.dataset.n);
  const c=$(`.q-chip[data-f="${filt}"] em`);if(filt!=='all'&&c){const L=M.map((n,i)=>has(n,filt)?i:-1).filter(i=>i>=0),k=L.indexOf(cur);if(k>=0)c.textContent=`${k+1}/${L.length}`}
  const ny=$('.q-ny em'),k=NY.indexOf(cur);if(ny)ny.textContent=k>=0?`${k+1}/${NY.length}`:NY.length;
  $$('.q-yr').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.j===cur))}
 function setF(f){filt=f;$$('.q-chip').forEach(x=>x.setAttribute('aria-pressed',x.dataset.f===f));btns.forEach((b,i)=>b.classList.toggle('dim',!has(M[i],f)))}
 $('#qJump').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;setF('all');
  if(b.dataset.ny!==undefined){const k=NY.indexOf(cur);show(NY[(k+1)%NY.length])}else show(+b.dataset.j)});
 track.addEventListener('click',e=>{const b=e.target.closest('.q-node');if(b){if(map.dataset.dragged)return;show(+b.dataset.i)}});
 panel.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(b)show(cur+ +b.dataset.q)});
 track.addEventListener('keydown',e=>{const b=e.target.closest('.q-node');if(!b)return;let k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
  if(e.key==='Home'||e.key==='End'){e.preventDefault();const j=e.key==='Home'?0:M.length-1;show(j);btns[j].focus();return}
  if(!k)return;e.preventDefault();let j=+b.dataset.i;do{j=(j+k+M.length)%M.length}while(btns[j].classList.contains('dim')&&j!==+b.dataset.i);show(j);btns[j].focus({preventScroll:true})});
 $('#qFilters').addEventListener('click',e=>{const c=e.target.closest('.q-chip');if(!c)return;const f=c.dataset.f,again=f===filt&&f!=='all';setF(f);
  const L=M.map((n,i)=>has(n,f)?i:-1).filter(i=>i>=0);
  if(again){const j=L.find(i=>i>cur);show(j===undefined?L[0]:j)}
  else if(!has(M[cur],f)&&L.length)show(L[0]);else cnt()});
 // drag to scroll
 let sx=0,sl=0,down=false;
 map.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;sx=e.clientX;sl=map.scrollLeft;delete map.dataset.dragged});
 addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>5){map.dataset.dragged=1;map.classList.add('grab')}map.scrollLeft=sl-dx});
 addEventListener('pointerup',()=>{down=false;map.classList.remove('grab');setTimeout(()=>delete map.dataset.dragged,0)});
 map.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&map.scrollWidth>map.clientWidth){const before=map.scrollLeft;map.scrollLeft+=e.deltaY;if(map.scrollLeft!==before)e.preventDefault()}},{passive:false});
 layout();show(cur,false);requestAnimationFrame(()=>place(true));
 let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(layout,150)});
}

/* ---------- hero: animated fog + parallax ---------- */
// v7: fog layers are moved by a time-based rAF driver (~30fps, translate3d + slow opacity pulse).
// It never depends on CSS animations (the reduced-motion rule used to freeze them) and it can't get stuck:
// it skips frames only while the hero is really off-screen and re-checks itself every second.
const fig=$('#heroFig'),hw=$('#heroWrap');
if(hw){
 const SP=[.0045,-.0065,.0095],PER=[13,17,11];   // share of layer width per second; pulse periods (s)
 const K=RM?.45:1;                                  // reduced motion: same fog, gentler drift
 const FL=[...hw.querySelectorAll('.smoke')].map((el,k)=>({el,i:el.querySelector('i'),sp:SP[k]??.005,per:PER[k]??14,ph:k*2.1,base:parseFloat(getComputedStyle(el).opacity)||.5,w:0}));
 const measure=()=>FL.forEach(l=>l.w=l.el.offsetWidth);measure();
 let on=true,last=0,chk=0;
 const vis=()=>{const r=hw.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight};
 ['scroll','focus','load','pageshow'].forEach(ev=>addEventListener(ev,()=>{on=vis()},{passive:true}));
 addEventListener('resize',()=>{measure();on=vis()});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)on=vis()});
 if('IntersectionObserver' in window)new IntersectionObserver(e=>{if(e[0].isIntersecting)on=true}).observe(hw);
 const tick=t=>{requestAnimationFrame(tick);
  if(t-chk>1000){chk=t;on=vis();if(!FL[0]?.w)measure()}
  if(!on||t-last<32)return;last=t;const s=t/1000;
  for(const l of FL){if(!l.i||!l.w)continue;const x=((s*l.sp*K*l.w)%l.w+l.w)%l.w;
   l.i.style.transform=`translate3d(${(-x).toFixed(1)}px,0,0)`;
   l.el.style.opacity=(l.base*(.8+.2*Math.sin(s*2*Math.PI/l.per+l.ph))).toFixed(3)}};
 requestAnimationFrame(tick);
 window.__fog=()=>({on,layers:FL.map(l=>l.i&&l.i.style.transform)});
}
if(fig&&!RM){
 const layers=[...fig.querySelectorAll('[data-depth]')];let tx=0,ty=0,cx=0,cy=0,raf=0;
 const loop=()=>{cx+=(tx-cx)*.07;cy+=(ty-cy)*.07;layers.forEach(l=>{const d=+l.dataset.depth||0;l.style.translate=`${cx*d}px ${cy*d*.5}px`});
  raf=Math.abs(tx-cx)+Math.abs(ty-cy)>.002?requestAnimationFrame(loop):0};
 if(FINE)hw.addEventListener('pointermove',e=>{tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1;if(!raf)raf=requestAnimationFrame(loop)},{passive:true});
}

function enhance(){
 $$('.rv:not(.seen)').forEach(e=>{e.classList.add('seen');if(io&&!RM)io.observe(e);else e.classList.add('in')});
 $$('[data-count]:not(.seen)').forEach(e=>{e.classList.add('seen');if(io)io.observe(e);else countUp(e)});
 if(RM||!FINE)return;
 $$('.tilt:not(.tl)').forEach(c=>{c.classList.add('tl');
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
   c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');
   if(!c.querySelector('.player.on'))c.style.transform=`perspective(900px) rotateX(${(.5-y)*5}deg) rotateY(${(x-.5)*6}deg) translateY(-3px)`});
  c.addEventListener('pointerleave',()=>{c.style.transform=''})});
}
enhance();

// cursor glow
if(!RM&&FINE){
 const g=document.createElement('div');g.className='cursor-glow';document.body.appendChild(g);
 let x=-999,y=-999,cx=x,cy=y,raf;
 addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(loop)},{passive:true});
 function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;g.style.transform=`translate3d(${cx}px,${cy}px,0)`;raf=Math.abs(x-cx)+Math.abs(y-cy)>.5?requestAnimationFrame(loop):0}
}
// hero particles
const cv=$('#particles');
if(cv&&!RM){
 const ctx=cv.getContext('2d');let W,H,pts,vis=true,dpr=Math.min(devicePixelRatio||1,2);
 const N=innerWidth<700?28:60;
 const size=()=>{W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
 size();addEventListener('resize',size);
 pts=Array.from({length:N},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.6+.4}));
 new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)requestAnimationFrame(draw)}).observe(cv);
 function draw(){
  if(!vis||document.hidden)return;
  ctx.clearRect(0,0,W,H);
  for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
   ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fillStyle='rgba(180,200,255,.55)';ctx.fill()}
  for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
   if(d<120){ctx.strokeStyle=`rgba(124,92,255,${.18*(1-d/120)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
  requestAnimationFrame(draw);
 }
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&vis)requestAnimationFrame(draw)});
}
// page fade transitions (fallback when cross-document View Transitions are unsupported)
if(!RM&&!('onpagereveal' in window)){
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey)return;
  const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname||!/\.html$|\/$/.test(u.pathname))return;
  e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,200)});
 addEventListener('pageshow',()=>document.body.classList.remove('leaving'));
}
const y=$('#year');if(y)y.textContent=new Date().getFullYear();
})();
