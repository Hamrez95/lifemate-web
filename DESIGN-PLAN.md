# LifeMate cinematic redesign plan

## Outcome

Rebuild the bilingual LifeMate marketing site around the selected cinematic concept:

- an oversized `LifeMate` word spanning the first viewport;
- a warm cream, coral, mint and sky-blue palette;
- two friendly rounded mascots: green for WellMate and blue for CareMate;
- one real product screen as the hero's functional anchor;
- a coral connection ribbon that becomes the visual thread through the page;
- true Persian RTL and English LTR layouts;
- production-safe accessibility, performance and reduced-motion behavior.

LifeMate remains the parent health-and-care ecosystem. WellMate and CareMate are the only current public products. Women's health remains a WellMate capability. No future-product names or fake download links are exposed.

## Page architecture

### 1. Header

- Official LifeMate loop logo and wordmark.
- Sticky, translucent warm surface with clear focus states.
- Links to ecosystem, WellMate, women's health, CareMate, trust/privacy and founder.
- Primary early-access CTA.
- FA/EN language switch with correct direction and mirrored spacing.
- Compact accessible mobile menu.

### 2. Cinematic hero

- Oversized coral `LifeMate` typography behind all foreground content.
- Short LifeMate-first value proposition and two CTAs.
- Green WellMate mascot, blue CareMate mascot, product screen and coral ribbon as separate visual layers.
- Gentle entrance choreography, cursor parallax on capable devices and scroll-led movement.
- Three trust principles: choice-led, human and privacy from the start.
- Mobile composition becomes vertical without cropping faces, copy or CTAs.

### 3. Ecosystem split

- The coral ribbon leads into two product lanes.
- WellMate lane: everyday personal health, reminders, logs and health calendar.
- CareMate lane: consent-based family support and timely awareness.
- LifeMate stays visually above both products as the parent brand.

### 4. WellMate story

- Large mint editorial section with real WellMate product imagery.
- Daily plan, medication, supplements, reminders and quick logging.
- Benefits are presented as a short narrative, not a feature wall.

### 5. Women's health inside WellMate

- Blush/lavender section clearly labelled as part of WellMate.
- Cycle logging, calendar review and personal notes.
- No diagnosis or medical-guarantee language.

### 6. CareMate story

- Calm blue editorial section with CareMate imagery and mascot.
- “Care without control” positioning.
- Consent, minimum necessary access and support at the right time.

### 7. How connection works

- Three readable steps: manage health, choose a trusted person, define access boundaries.
- The connecting ribbon continues through the steps to reinforce causality.

### 8. Trust and privacy

- High-contrast warm-plum panel.
- Consent, transparency, minimum access and revocable control.
- Link to the existing privacy page.

### 9. Founder story

- Hamidreza Pakpour and the real family-care origin of LifeMate.
- Human copy, email and LinkedIn links.

### 10. Early access and footer

- WellMate and CareMate marked as coming soon.
- No active store download links or fabricated QR codes.
- Early-access email CTA, legal links and bilingual navigation.

## Visual system

- Background: `#fff4e6` / warm cream.
- Primary coral: `#f58f7c`.
- Soft blush: `#fad2c8`.
- WellMate mint: `#71c7a1`.
- CareMate blue: `#78aeeb`.
- Warm ink: `#241f22`.
- Large editorial type, restrained shadows, soft 3D materials and generous spacing.
- Official LifeMate loop logo is preserved unchanged.
- Character proportions, eyes, face, materials and lighting stay consistent across generated assets.

## Motion system

- Hero layers enter in a short stagger without delaying content.
- Oversized word moves more slowly than the foreground for depth.
- Mascots float subtly; the phone tilts within a small safe range.
- The connection ribbon drifts horizontally and guides the scroll sequence.
- Sections reveal with short distance/opacity transitions.
- Hover effects are limited to actionable elements.
- `prefers-reduced-motion` disables parallax, float and scroll choreography while preserving all content.

## Technical implementation

- Preserve the static HTML/CSS/vanilla JavaScript architecture.
- Keep Persian and English as real semantic pages with logical CSS properties.
- Use generated raster assets only for mascots/decorative artwork; text and controls remain DOM content.
- Reuse real LifeMate product images and official logo from the repository.
- Add no analytics, trackers or backend dependency.
- Use native requestAnimationFrame/IntersectionObserver motion to avoid a heavy runtime library.
- Prevent layout shift with explicit intrinsic dimensions and stable aspect ratios.

## Verification matrix

- Viewports: 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920.
- Languages: Persian RTL and English LTR.
- Keyboard navigation, skip link, focus visibility, menu behavior and CTA targets.
- `prefers-reduced-motion` fallback.
- No horizontal scrolling, clipped mascots or obscured content.
- HTML validation, broken-link checks and browser-console review.
- Visual comparison at 390 and 1440 against the selected mockup.
- Preview keeps `noindex,nofollow`; `main` and production remain untouched.

## Delivery workflow

1. Branch from the latest `preview`.
2. Produce and validate the cinematic asset set.
3. Implement Persian and English pages plus shared styles/motion.
4. Run automated and visual QA; fix P0/P1/P2 findings.
5. Commit and push the feature branch.
6. Fast-forward or safely merge the verified feature branch into `preview`.
7. Verify the fixed Cloudflare preview URL.
8. Wait for explicit approval before any production/main action.
