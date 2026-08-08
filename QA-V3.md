# LifeMate website V3 QA

Scope: homepage, privacy and terms pages in Persian and English.

## Responsive review

The implementation was reviewed against the required breakpoint matrix: 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920.

Code-level checks completed:
- explicit breakpoint handling exists for narrow phone, phone, tablet and desktop ranges
- body text remains 16px; reviewed secondary labels are kept at 13px or larger
- interactive controls use 44px minimum dimensions in the shared navigation/footer rules
- Persian pages use RTL and English pages use LTR
- default theme is Light
- mobile menu supports Escape close and exposes `aria-expanded`
- theme toggle exposes `aria-pressed`
- reduced-motion handling is present
- the ecosystem concept uses one orbit only; screenshots are kept in product-story sections

A real rendered cross-viewport Chromium pass was not completed from this runtime because the execution container cannot resolve GitHub/Cloudflare hosts to load the committed site. This remains a preview smoke-test item and is not represented as completed automation.

## Contrast review

Token-level contrast calculations after the final adjustments:
- light primary text/background: about 14.7:1
- light muted text/background: about 4.57:1
- light green accent/background: about 5.05:1
- light blue accent/background: about 6.3:1
- dark primary text/background: about 14.78:1
- dark muted text/background: about 9.93:1

Target: WCAG 2.2 AA for the reviewed text/token combinations.

## Persona review

The V3 implementation was challenged from these perspectives and the resulting valid issues were addressed in code:
1. Persian mobile user — stronger mobile spacing, touch targets and readable hierarchy.
2. WellMate user — benefit-led health-routine storytelling instead of a feature dump.
3. Woman using the menstrual calendar — dedicated WellMate women’s-health section with non-diagnostic copy.
4. CareMate caregiver — stronger “care without control” framing and minimum-access language.
5. Privacy-conscious user — visual summary plus website-data, consent, access, clarity and contact cards.
6. UI/UX designer — duplicate screenshot orbit removed; warmer light-first visual rhythm introduced.
7. Accessibility reviewer — skip link, focus-visible, semantic landmarks, ARIA states and reduced-motion retained.
8. Content/UX writer — claims kept within visible/current product behavior and medical overclaiming avoided.
9. Frontend/responsive engineer — narrow-width orbit and card layouts receive dedicated breakpoints.
10. SEO/performance reviewer — preview noindex retained; no trackers, framework runtime, fake metrics or structured medical claims added.

## Preview / browser limitations

Preview indexing remains intentionally blocked by HTML robots metadata, `_headers` and `robots.txt`.

Not executed in this runtime:
- real iOS Safari / physical iPhone testing
- Firefox device/browser smoke testing
- real Lighthouse against the Cloudflare URL
- full rendered viewport automation against the newly deployed preview

No Lighthouse score is claimed.
