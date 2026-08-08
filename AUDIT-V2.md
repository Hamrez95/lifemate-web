# LifeMate Brand / UX V2 Audit

Branch baseline: `preview` @ `d2672564bc9f60e123e80024f4db820d2750db72`
Refactor branch: `refactor/lifemate-brand-ux-v2`

## Deployment truth

- `main` is the production branch and remains at `05e5e20d270c0b71ba34fb3f83f133d0ae2bacc1`.
- `preview` is the active static preview baseline and remains a plain HTML/CSS/JS site.
- `preview-site-v1` is a separate legacy Next/OpenNext experiment at `b24c9074...`; it is not the source of the fixed preview workflow.
- `main` and `preview` do not contain GitHub Actions workflows. Deployment is handled by the Cloudflare Workers Git integration.
- `wrangler.jsonc` confirms a static Worker: `assets.directory: "."`, `workers_dev: true`, `preview_urls: true`.
- The refactor intentionally keeps the static architecture and does not introduce Next.js or a second deployment path.

## Asset inventory (preview baseline)

| Asset | Dimensions | Size | Format | Transparency | Aspect | Current baseline usage | V2 decision |
|---|---:|---:|---|---|---:|---|---|
| `assets/media/logo.webp` | 220×127 | 5.5 KB | WebP | Yes | 1.73 | Header, core, favicon | Keep; never upscale beyond natural width |
| `assets/media/well.webp` | 240×427 | 5.3 KB | WebP | No | 0.56 | Hero + WellMate section | Keep; max display width 240px; contain |
| `assets/media/care.webp` | 340×340 | 5.3 KB | WebP | No | 1.00 | Hero + CareMate section | Keep; max display width 340px; contain |
| `assets/media/wellmas.webp` | 170×223 | 6.8 KB | WebP | Yes | 0.76 | Ecosystem + WellMate | Keep; natural-size constrained |
| `assets/media/caremas.webp` | 153×225 | 6.1 KB | WebP | Yes | 0.68 | Ecosystem + CareMate | Keep; natural-size constrained |
| `assets/images/wellmate.webp` | 81×128 | 5.5 KB | WebP | Yes | 0.63 | Legacy/unused in current homepage | Do not use: lower-resolution duplicate |
| `assets/images/caremate.svg` | 900×1200 viewBox | 4.4 KB | SVG | Yes | 0.75 | Legacy/unused in current homepage | Do not use in V2 to avoid mixing mascot variants |

Important: the repository currently contains low-resolution derivatives of the uploaded artwork, not the original high-resolution banners. V2 therefore avoids enlarging them beyond their natural dimensions.

## Audit findings

### Brand hierarchy
The baseline hero and ecosystem copy still over-emphasize “two apps + a connection”. This makes LifeMate read as a connector rather than the parent ecosystem.

### Information architecture
The baseline contains the right subjects but the hierarchy is product-led. V2 should sequence: LifeMate → ecosystem → current products → flow → privacy/trust → founder → launch.

### UX / CTA hierarchy
The baseline hero sends users directly to WellMate/CareMate. V2 should first explain the ecosystem, then let users explore products. Pre-launch CTAs must be actionable rather than dead download buttons.

### UI hierarchy / typography
Typography is improved over earlier drafts but remains inconsistent. V2 uses explicit responsive type tokens, body 16px, readable secondary text >=13px, buttons >=14px, and `clamp()` headings.

### Persian readability / RTL
Persian is the primary experience. The baseline client-side language switch changes text inside the same RTL DOM. V2 uses separate Persian and English documents so the English layout is genuinely LTR and metadata is language-specific.

### Responsive behavior
The baseline relies on several positioned visual compositions. V2 removes fragile fixed-height compositions at mobile breakpoints and converts them to grid/flow layouts.

### Images
Baseline images are very small files and should not be stretched. V2 adds explicit intrinsic dimensions, `height:auto`, `object-fit:contain`, eager loading only for hero artwork, and lazy loading below the fold.

### Whitespace / spacing rhythm
V2 standardizes section spacing with `clamp()` and reduces decorative clutter.

### Accessibility
Baseline has skip navigation and button semantics, but V2 strengthens visible focus, 44×44 controls, semantic sectioning, heading order, reduced-motion handling, mobile menu state, and language-specific `lang/dir`.

### SEO
Baseline has basic canonical/title/description. V2 adds OpenGraph/Twitter metadata and true FA/EN alternates. Preview is explicitly `noindex` and must be switched back to indexable before production merge.

### Privacy / health trust
V2 removes absolute-security language and medical implications. Consent, clarity, controllability and minimum necessary access are expressed as product principles rather than guarantees.

### Performance
Static architecture is already favorable. V2 keeps no framework/runtime dependency, one small local font, local images only, explicit image dimensions, tiny JS, and no external scripts.

### Dark mode
Retained as a small optional control. Colors are tokenized so light/dark share the same hierarchy.

## V2 design decisions

1. LifeMate-first hero and ecosystem map.
2. No named future products; only faint unlabeled CSS nodes.
3. WellMate and CareMate each receive one focused benefit-led section.
4. Three-step “How it works”.
5. Privacy as a value proposition plus legal detail pages.
6. Founder section with verified email only; no guessed LinkedIn URL.
7. Coming Soon store states plus a real `mailto:` early-access CTA.
8. Separate `en.html`, `privacy-en.html`, and `terms-en.html` for real LTR and metadata.
9. Static Cloudflare Workers architecture preserved.
