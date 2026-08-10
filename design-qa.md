# LifeMate responsive bug-fix — design QA

Date: 2026-08-10

## Visual sources

- User-provided mobile captures: `01-1000043380.jpg` through
  `04-1000043374.jpg`.
- User-provided replacement media: `05-1000043197.png` through
  `08-1000043196.png`.
- Pre-fix live capture of the Persian preview at 1363 × 936.

## Browser evidence

- `tmp/qa/desktop-fa-after.jpg` — Persian desktop, 1363 × 936.
- `tmp/qa/mobile-products-after.jpg` — browser-rendered same-origin QA frames,
  each 390 × 844, exercising the real mobile media queries.
- Focused 390 × 844 browser views were also checked for the Persian hero
  principles and the English layout.

## Comparison results

| Severity | Check | Result |
| --- | --- | --- |
| P1 | Persian hero content is physically right-aligned | Passed |
| P1 | Hero artwork stays inside the 390 px layout | Passed |
| P1 | `مثل یک همراه واقعی` is complete and not clipped | Passed |
| P1 | Ecosystem logo remains horizontal on mobile | Passed |
| P1 | Logo holes and outer background are transparent | Passed |
| P1 | WellMate, women's health and CareMate product shots use the supplied high-resolution sources | Passed |
| P1 | Product images render with `object-fit: contain` and no destructive crop | Passed |
| P1 | English mobile layout remains LTR | Passed |
| P2 | No horizontal document overflow at the desktop review viewport | Passed |
| P2 | Referenced media loads from valid repository files | Passed |

## Verification

- `npm run build`
- `npx html-validate@10.10.0 index.html en.html`
- `npx csstree-validator@4.0.1 styles.css`
- `node --check script.js`
- Browser review on the deployed preview in Persian desktop, Persian 390 px,
  and English 390 px states.

No open P0, P1 or P2 visual defects remain in the requested scope.

final result: passed
