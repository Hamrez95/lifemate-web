# LifeMate visual source-of-truth analysis

The six supplied reference images are the visual source of truth for this preview. They map to: light desktop home, dark desktop home, mobile home, ecosystem/connection, WellMate, and CareMate.

## Extracted design language

- **Grid / max width:** desktop compositions use a centered ~1200–1240px content rail with generous gutters and large white space. Hero sections are typically two-column, around 45/55 or 40/60.
- **Spacing rhythm:** 8px micro rhythm, 16–24px component spacing, 48–80px section rhythm. The reference feels airy rather than dense.
- **Card radius:** mostly 24–32px, with smaller 14–18px inner UI cards and pill controls.
- **Shadows / borders:** light 1px cool-gray borders plus very soft blue/green shadows; no hard Material-style elevation.
- **Color tokens:** LifeMate uses navy text, white/light-blue backgrounds, mint/green for WellMate, pastel blue/lavender for CareMate, and small pink/coral emotional accents.
- **Typography:** bold compact Persian display hierarchy, softer medium body text, small label/pill typography. Vazir is self-hosted for Persian.
- **Illustration style:** rounded, soft 3D mascot language with glossy plastic material, diffuse lighting and minimal clutter.
- **Mascot scale:** large enough to become a product cue but secondary to the phone UI. Product pages use the relevant mascot more prominently.
- **Phone mockups:** physical black phone frame, generous corner radius, light in-app surfaces and compact card stacks. All in-phone text in this implementation is DOM/React, not screenshot text.
- **Connection diagrams:** symmetric WellMate ↔ LifeMate ↔ CareMate flow, dotted/pulsed connection lines, center LifeMate mark, permission and summary semantics.
- **Mobile adaptation:** one-column editorial flow, hero phones remain the visual focus, cards stack, header collapses to a compact menu.
- **Dark mode:** deep navy / blue-charcoal background; surfaces stay intentionally designed rather than inverted. Mint, cyan, lavender and pink highlights are preserved with reduced luminance.

## Intentional deviations

1. No fake store links or QR codes are rendered because WellMate and CareMate are not publicly launched.
2. Phone screenshots were not embedded; representative phone surfaces are recreated in React/CSS to keep names, labels and calendar content accessible and localizable.
3. Mascot preview assets are isolated from the user-provided reference art and contain no generated text. They are temporary public preview assets until official master character files are provided.
4. The site uses typed server-side dictionaries rather than a client-heavy i18n runtime. This keeps translations outside components while reducing Worker/client bundle size.
