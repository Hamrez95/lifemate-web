(()=>{
  const root=document.documentElement;
  const header=document.querySelector('[data-header]');
  const menu=document.querySelector('[data-menu]');
  const mobile=document.querySelector('[data-mobile]');
  const lang=document.querySelector('[data-lang]');
  const theme=document.querySelector('[data-theme-toggle]');
  const toast=document.querySelector('[data-toast]');
  const savedTheme=localStorage.getItem('lifemate-theme');
  const savedLang=localStorage.getItem('lifemate-lang')||'fa';
  if(savedTheme==='dark'||savedTheme==='light')root.dataset.theme=savedTheme;
  function setLang(value){
    const fa=value==='fa';root.lang=value;root.dir=fa?'rtl':'ltr';lang.textContent=fa?'FA':'EN';
    document.querySelectorAll('[data-fa][data-en]').forEach(el=>{el.textContent=fa?el.dataset.fa:el.dataset.en});
    localStorage.setItem('lifemate-lang',value);
  }
  setLang(savedLang);
  lang?.addEventListener('click',()=>setLang(root.lang==='fa'?'en':'fa'));
  theme?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;theme.textContent=next==='dark'?'☾':'☀';localStorage.setItem('lifemate-theme',next)});
  if(theme)theme.textContent=root.dataset.theme==='dark'?'☾':'☀';
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));mobile.hidden=open});
  mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu?.setAttribute('aria-expanded','false')}));
  addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>18),{passive:true});
  document.querySelectorAll('[data-coming]').forEach(btn=>btn.addEventListener('click',()=>{if(!toast)return;toast.hidden=false;clearTimeout(window.__lmToast);window.__lmToast=setTimeout(()=>toast.hidden=true,2300)}));
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();