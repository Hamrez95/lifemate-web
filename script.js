(() => {
  const html = document.documentElement;
  const header = document.querySelector('[data-header]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const langButton = document.querySelector('[data-lang]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileMenu = document.querySelector('[data-mobile]');
  const dialog = document.querySelector('[data-download-dialog]');
  const openButtons = document.querySelectorAll('[data-download-open]');
  const closeButton = document.querySelector('[data-download-close]');

  const translations = {
    en: {
      navHome:'Home',navEco:'Ecosystem',navStory:'Our story',navContact:'Contact',downloadApp:'Download apps',eyebrow:'Healthier life, together',hero1:'Your health',hero2:'and your loved ones,',hero3:'within reach.',heroText:'LifeMate is the intelligent bridge between your everyday health and the people you trust — less worry, clearer reminders, and timely care.',howWorks:'How it works',familyNote:'Designed for the whole family',wellHeader:'Health companion',careHeader:'Care',month:'August 2026',nextReminder:'Next reminder',vitamin:'Vitamin B',appointment:'Appointment',cardiology:'Cardiologist',yourLovedOne:'Your loved one',personName:'Hamidreza',todayStatus:"Today's status",allGood:'Everything looks good',morningDose:'Morning medication',done:'Completed',mood:'Mood today',calm:'Calm',distanceTitle:'Sometimes distance is more than kilometers.',distanceText:'We may be close and still wonder whether medicine was taken or how someone feels. LifeMate reduces that gap with respect, not surveillance.',smallWorry:'Small worries',smallWorry2:'that stay in our minds',simpleQuestion:'One simple question',simpleQuestion2:'Why keep wondering?',betterExperience:'A better experience',betterExperience2:'Support, not control',result:'Result',threeSteps:'Three simple steps to more peace of mind',step1:'Track your own health',step1Text:'Keep medicines, symptoms, and periodic health notes organized and easy to reach.',step2:'Add people you trust',step2Text:'Invite only the people you trust, with a clear and limited level of access.',step3:'Care for your loved ones',step3Text:'See what matters at the right time and follow up only when needed.',wellTitle:'Health companion',wellSubtitle:'Your everyday health space',wellF1:'Smart medicine and supplement reminders',wellF2:'Track symptoms, blood pressure and weight',wellF3:'Simple, readable reports',wellF4:'Health calendar and routines',seeWell:'More about WellMate',careTitle:'Care',careSubtitle:'Support your loved ones, respectfully',careF1:'See a simple daily summary',careF2:'Medication status and reminders',careF3:'Important alerts at the right time',careF4:'Family health overview',seeCare:'More about CareMate',ecoKicker:'One connection, two experiences',ecoTitle:'Connection, with permission and respect',ecoText:'LifeMate itself is not a downloadable app. It is the connection layer between WellMate and CareMate, sharing only what the user permits and only when it is useful.',personalSpace:'Your personal health space',secureLayer:'Secure intelligent connection layer',familySpace:'For the people you care about',control:'Transparent and controllable',controlText:'Always know what is being shared.',privacy:'Privacy by design',privacyText:'Access is permission-based and scoped.',decision:'You decide',decisionText:'Who can see what, and for how long.',privacyKicker:'Privacy is designed in from the start',trustTitle:'Trust is the foundation.',trustText:'LifeMate is not built to control people. It is built to reduce worry and improve communication. Access stays in the user’s hands.',chooseCare:'Choose the caregiver',chooseCareText:'Only people you explicitly choose.',chooseData:'Choose the data',chooseDataText:'Only what is needed, not everything.',revoke:'Revoke anytime',revokeText:'Access can always be changed or stopped.',sampleConsent:'Sample sharing permission',consentHint:'Illustrative example',withWhom:'Shared with',whatShare:'Shared data',medSummary:'Medication and daily summary',duration:'Duration',days30:'30 days',active:'Active',storyKicker:'It started with one simple question…',storyTitle:'The LifeMate story',storyText:'We wanted health and family care to feel less stressful, less repetitive and more human — simple, respectful and trustworthy.',ourStory:'Our story',partnerKicker:'A bigger conversation, in a private space',partnerTitle:'Partnerships, investment and media',partnerText:'For product partnerships, investment, press or strategic conversations, we have a direct private channel.',privateMeeting:'Request a private meeting',soonKicker:'The next step is close',downloadTitle:'WellMate and CareMate are coming soon.',downloadText:'Downloads are disabled for now. Official store links will be activated here when the public builds are ready.',comingSoon:'Coming soon',earlyAccess:'Request early access',footerText:'A connected health ecosystem for a healthier, more informed and more connected life.',products:'Products',company:'Company',rules:'Legal',privacyPolicy:'Privacy policy',terms:'Terms of use',newsletter:'LifeMate updates',emailUs:'Email us to join ↗',chooseProduct:'Choose a product',notLifeMate:'LifeMate itself is not downloaded; WellMate and CareMate are the two apps in the ecosystem.'
    }
  };

  const faText = new Map();
  document.querySelectorAll('[data-i18n]').forEach((el) => faText.set(el, el.textContent.trim()));

  const setTheme = (theme) => {
    html.dataset.theme = theme;
    localStorage.setItem('lifemate-theme', theme);
  };
  const storedTheme = localStorage.getItem('lifemate-theme');
  if (storedTheme === 'dark' || storedTheme === 'light') setTheme(storedTheme);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  themeButton?.addEventListener('click', () => setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark'));

  let lang = 'fa';
  langButton?.addEventListener('click', () => {
    lang = lang === 'fa' ? 'en' : 'fa';
    html.lang = lang;
    html.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.dir = html.dir;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = lang === 'en' ? (translations.en[key] || faText.get(el)) : faText.get(el);
    });
    langButton.textContent = lang === 'fa' ? 'FA' : 'EN';
  });

  const closeMenu = () => {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    if (mobileMenu) mobileMenu.hidden = isOpen;
  });
  mobileMenu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  openButtons.forEach((btn) => btn.addEventListener('click', () => dialog?.showModal()));
  closeButton?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());
})();
