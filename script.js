(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const hero = document.querySelector("[data-hero]");
  const heroStage = document.querySelector("[data-hero-stage]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const favicon =
    document.querySelector('link[rel~="icon"]') ?? document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = "/favicon.svg?v=20260810-2";
  if (!favicon.parentNode) document.head.appendChild(favicon);

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const footerBottom = document.querySelector(".footer-bottom");
  const footerCopyright = footerBottom?.querySelector("span");
  if (
    footerBottom &&
    footerCopyright &&
    !footerBottom.querySelector('a[href^="https://trustseal.enamad.ir/"]')
  ) {
    footerCopyright.insertAdjacentHTML(
      "afterend",
      "<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=773641&Code=bkskxTp6uPJ0JUjipzaKGflSOTpC6zo7'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=773641&Code=bkskxTp6uPJ0JUjipzaKGflSOTpC6zo7' alt='' style='cursor:pointer' code='bkskxTp6uPJ0JUjipzaKGflSOTpC6zo7'></a>",
    );
  }

  const updateHeader = () =>
    header?.classList.toggle("is-scrolled", window.scrollY > 10);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
      "aria-label",
      root.lang === "fa" ? "باز کردن منو" : "Open menu",
    );
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuButton.focus();
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute(
      "aria-label",
      root.lang === "fa"
        ? isOpen
          ? "باز کردن منو"
          : "بستن منو"
        : isOpen
          ? "Open menu"
          : "Close menu",
    );
    if (mobileMenu) mobileMenu.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
    if (!isOpen) mobileMenu?.querySelector("a")?.focus();
  });

  mobileMenu
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu({ restoreFocus: true });
  });

  const revealNodes = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    revealNodes.forEach((node) => observer.observe(node));
  }

  if (!hero || reducedMotion.matches) return;

  let ticking = false;
  const renderScrollScene = () => {
    const bounds = hero.getBoundingClientRect();
    const progress = Math.min(
      1,
      Math.max(0, -bounds.top / Math.max(bounds.height, 1)),
    );
    const shift = Math.round(progress * 145);
    hero.style.setProperty(
      "--hero-word-shift",
      `${Math.round(shift * 0.17)}px`,
    );
    hero.style.setProperty(
      "--hero-ribbon-shift",
      `${Math.round(shift * -0.08)}px`,
    );
    hero.style.setProperty(
      "--hero-mascot-shift",
      `${Math.round(shift * -0.04)}px`,
    );
    hero.style.setProperty(
      "--hero-phone-shift",
      `${Math.round(shift * -0.02)}px`,
    );
    ticking = false;
  };
  const requestScene = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(renderScrollScene);
  };
  renderScrollScene();
  window.addEventListener("scroll", requestScene, { passive: true });

  if (window.matchMedia("(pointer:fine)").matches && heroStage) {
    heroStage.addEventListener("pointermove", (event) => {
      const bounds = heroStage.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 9;
      hero.style.setProperty("--hero-mouse-x", `${x.toFixed(2)}px`);
      hero.style.setProperty("--hero-mouse-y", `${y.toFixed(2)}px`);
      hero.style.setProperty("--hero-phone-x", `${(x * 0.65).toFixed(2)}px`);
      hero.style.setProperty("--hero-phone-y", `${(y * 0.65).toFixed(2)}px`);
    });
    heroStage.addEventListener("pointerleave", () => {
      hero.style.setProperty("--hero-mouse-x", "0px");
      hero.style.setProperty("--hero-mouse-y", "0px");
      hero.style.setProperty("--hero-phone-x", "0px");
      hero.style.setProperty("--hero-phone-y", "0px");
    });
  }
})();
