(()=>{
  const root=document.documentElement;
  const header=document.querySelector('[data-header]');
  const menu=document.querySelector('[data-menu]');
  const mobile=document.querySelector('[data-mobile]');
  const theme=document.querySelector('[data-theme-toggle]');
  const themeMeta=document.querySelector('meta[name="theme-color"]');
  const safeGet=(key,fallback)=>{try{return localStorage.getItem(key)||fallback}catch{return fallback}};
  const safeSet=(key,value)=>{try{localStorage.setItem(key,value)}catch{}};
  function setTheme(value){const dark=value==='dark';root.dataset.theme=dark?'dark':'light';if(theme){theme.textContent=dark?'☾':'☀';theme.setAttribute('aria-pressed',String(dark));}if(themeMeta)themeMeta.content=dark?'#071a2b':'#f8fbff';}
  const preferred=matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light';setTheme(safeGet('lifemate-theme',preferred));
  theme?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';safeSet('lifemate-theme',next);setTheme(next);});
  function closeMenu(){if(!mobile||!menu)return;mobile.hidden=true;menu.setAttribute('aria-expanded','false');}
  menu?.addEventListener('click',()=>{if(!mobile)return;const open=menu.getAttribute('aria-expanded')==='true';mobile.hidden=open;menu.setAttribute('aria-expanded',String(!open));});
  mobile?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
  document.addEventListener('click',event=>{if(!mobile||mobile.hidden||!menu)return;if(!mobile.contains(event.target)&&!menu.contains(event.target))closeMenu();});
  addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>12),{passive:true});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();