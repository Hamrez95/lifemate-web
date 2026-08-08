# LifeMate website V3 QA

Scope: homepage, privacy and terms pages in Persian and English.

Automated Chromium layout checks were run at widths 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920.

Final checks:
- zero horizontal-overflow failures across 54 page/viewport combinations
- body text remains 16px
- reviewed secondary text remains at least 13px
- visible links and buttons meet the 44px touch-target check
- Persian is RTL and English is LTR
- default theme is Light
- mobile menu, Escape close, theme toggle state and reduced-motion behavior were checked
- the single ecosystem orbit remains legible on narrow layouts

Contrast token checks after adjustment:
- light primary text/background: about 14.7:1
- light muted text/background: about 4.57:1
- light green accent/background: about 5.05:1
- light blue accent/background: about 6.3:1
- dark primary text/background: about 14.78:1
- dark muted text/background: about 9.93:1

Persona review covered Persian mobile, WellMate, women’s-health calendar, CareMate caregiver, privacy-conscious, UI/UX, accessibility, content, responsive engineering and SEO/performance perspectives. Valid issues found in the loop were fixed before this note was committed.

Preview keeps noindex controls intentionally. Production release must remove preview-only indexing controls deliberately.

Not executed in this runtime: real iOS Safari, Firefox device/browser smoke tests, or a real Lighthouse run against Cloudflare. No Lighthouse score is claimed.
