# LifeMate cinematic v1 QA

## Scope

- Persian RTL homepage (`index.html`)
- English LTR homepage (`en.html`)
- Shared visual system (`styles.css`)
- Shared interaction and motion (`script.js`)
- Generated cinematic image set in `assets/media/cinematic/`

## Pre-deployment checks

- `html-validate`: passes for Persian and English homepages.
- `csstree-validator`: passes for the shared stylesheet.
- `node --check`: passes for the shared script.
- `vite build`: passes.
- Internal asset scan: no missing local files in either homepage.
- `git diff --check`: passes.
- Generated WebP assets are 22–32 KB each; transparent PNG masters are retained for future art direction.
- The animated hero has a `prefers-reduced-motion` fallback.
- Navigation, mobile menu, skip link, focus states and language links remain semantic.
- Preview keeps `noindex,nofollow`; production/main is outside this release.

## Visual verification contract

After the feature branch is merged into `preview`, verify the fixed Cloudflare URL at desktop and mobile widths for:

- giant LifeMate word remaining readable behind the composition;
- both mascot faces and the product phone remaining visible;
- Persian RTL and English LTR copy alignment;
- no horizontal overflow or clipped calls to action;
- ecosystem fork, WellMate, women's health, CareMate, privacy, founder and early-access sections;
- menu, language switch, anchors and reduced-motion behavior;
- console and failed-resource errors.

## Release boundary

Only `redesign/cinematic-lifemate-v1` and `preview` may be updated. `main` must remain unchanged until explicit approval.
