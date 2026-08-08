# LifeMate Brand / UX V2 QA

## Automated responsive checks

Test harness: headless Chromium using the production HTML/CSS/JS in-memory, with dimension-matched local stand-ins for repository binary images. This validates layout, interaction and CSS behavior without changing committed assets.

Viewports tested for both Persian RTL and English LTR:
`320`, `360`, `390`, `430`, `768`, `1024`, `1280`, `1440`, `1920`.

Result:
- Horizontal overflow: 0 failures
- Out-of-bounds links/buttons/images/headings/paragraphs: 0 failures
- Readable UI text below 13px in tested selectors: 0 failures
- Persian body size: 16px
- English body size: 16px
- H1 scales from 31px at 320 to 68px at desktop
- Mobile menu opens and reports `aria-expanded=true`
- Escape closes the mobile menu and resets `aria-expanded=false`
- Theme toggle switches light → dark and updates `aria-pressed`
- `prefers-reduced-motion` override is present

## Semantic / SEO checks

- One H1 per page
- Explicit `lang` and `dir` on all pages
- Persian is RTL; English is true LTR
- All committed homepage images include intrinsic width + height
- No external script, stylesheet, font or image dependencies
- FA/EN canonical + hreflang pairs included
- OpenGraph and Twitter summary metadata included on home pages
- Preview pages include `noindex,nofollow`
- `_headers` adds `X-Robots-Tag: noindex, nofollow` for the preview/refactor deployment

## Accessibility review

Target: WCAG 2.2 AA.

Implemented/reviewed:
- Skip link
- Semantic header/nav/main/section/footer structure
- Visible `:focus-visible`
- Header controls at least 44×44
- Mobile nav links at least 44px high
- Body 16px; secondary readable text >=13px in tested selectors
- Image alt text; decorative brand images use empty alt where appropriate
- Explicit button labels and state (`aria-expanded`, `aria-pressed`)
- Escape-to-close mobile navigation
- Reduced-motion support
- LTR/RTL logical properties
- Contrast tokens were adjusted after review:
  - light primary text / background ≈ 15.0:1
  - light muted text / background ≈ 4.52:1
  - light green accent / white ≈ 5.46:1
  - light blue accent / white ≈ 6.0:1
  - dark primary text / background ≈ 16.5:1
  - dark muted text / background ≈ 9.9:1
  - dark accent colors use lighter theme-specific tokens

## Persona review

1. **Persian family user** — LifeMate now reads as the parent brand before products. Product purpose is understandable without feature overload.
2. **WellMate user** — Health organization benefit is clear; screenshot is not cropped or stretched.
3. **CareMate trusted person** — “care without control” and consent boundaries are explicit; no surveillance framing remains.
4. **Mobile-first user** — Desktop orbit composition collapses into normal document flow rather than shrinking; tested down to 320px.
5. **Accessibility reviewer** — Initial accent contrast was below AA in some states; accent tokens and CTA gradient were corrected.
6. **Privacy/health reviewer** — Absolute safety claims and medical promises are absent; privacy language is principle-based, not a technical guarantee.

## Browser coverage

Executed: Chromium engine (desktop + mobile viewports).

Not executable in this tool runtime:
- Real iOS Safari / WebKit device
- Firefox binary

The implementation intentionally uses standards-based Grid/Flexbox, logical properties, `clamp()`, `min()`, `max()`, `aspect-ratio` and no browser-specific runtime framework. Physical Safari/Firefox smoke testing remains a release gate before production.

## Performance review

A numeric Lighthouse score is **not claimed** because Lighthouse CLI is not installed in the execution runtime and the automated browser cannot navigate to external preview URLs from this environment.

Static performance facts:
- No framework/runtime bundle
- JS ≈ 2 KB source
- CSS ≈ 19 KB source
- Local variable font ≈ 15 KB
- Current core image assets are each ≈ 5–7 KB
- No third-party scripts, trackers, stock images or remote fonts
- Hero product images are eager/fetch-priority; below-fold product/mascot images lazy-load
- All homepage images specify intrinsic dimensions
- No reveal animation / scroll animation
- Layout tests found no horizontal overflow

A real Lighthouse run against the Cloudflare preview should be done as the final browser-based pre-production check.
