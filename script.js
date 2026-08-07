(()=>{
  const root=document.documentElement,header=document.querySelector('[data-header]'),menu=document.querySelector('[data-menu]'),mobile=document.querySelector('[data-mobile]'),lang=document.querySelector('[data-lang]'),theme=document.querySelector('[data-theme-toggle]'),toast=document.querySelector('[data-toast]'),launch=document.querySelector('.launch-card'),themeMeta=document.querySelector('meta[name="theme-color"]');
  const read=(k,f)=>{try{return localStorage.getItem(k)||f}catch{return f}},write=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
  const savedTheme=read('lifemate-theme','light'),savedLang=read('lifemate-lang','fa');
  root.dataset.theme=savedTheme==='dark'?'dark':'light';
  function syncTheme(){const dark=root.dataset.theme==='dark';if(theme)theme.textContent=dark?'☾':'☀';if(launch)launch.style.background=dark?'linear-gradient(135deg,#11283f,var(--blue-soft))':'';if(themeMeta)themeMeta.content=dark?'#071a2b':'#f8fbff'}
  function setLang(value){const fa=value==='fa';root.lang=fa?'fa':'en';root.dir=fa?'rtl':'ltr';if(lang)lang.textContent=fa?'FA':'EN';document.querySelectorAll('[data-fa][data-en]').forEach(el=>el.textContent=fa?el.dataset.fa:el.dataset.en);write('lifemate-lang',fa?'fa':'en')}
  setLang(savedLang);syncTheme();
  lang?.addEventListener('click',()=>setLang(root.lang==='fa'?'en':'fa'));
  theme?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';write('lifemate-theme',root.dataset.theme);syncTheme()});
  function closeMenu(){if(mobile)mobile.hidden=true;menu?.setAttribute('aria-expanded','false')}
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));if(mobile)mobile.hidden=open});
  mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>18),{passive:true});
  document.querySelectorAll('[data-coming]').forEach(btn=>btn.addEventListener('click',()=>{if(!toast)return;toast.hidden=false;clearTimeout(window.__lmToast);window.__lmToast=setTimeout(()=>toast.hidden=true,2300)}));
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();