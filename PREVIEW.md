# LifeMate preview workflow

Production is served only from `main` and must not be changed without explicit approval.

Development flow:

1. Start from the real `preview` branch.
2. Implement isolated work on a feature/refactor branch.
3. QA the feature branch.
4. Fast-forward/update `preview` for stakeholder review.
5. Cloudflare Workers Git integration builds non-production branches automatically.
6. Only after explicit approval: open/merge a PR into `main`.

Current work branch: `redesign/cinematic-lifemate-v1`.
Current design direction: a cinematic, character-led consumer-health experience built around oversized LifeMate typography, the official loop logo, warm cream/coral surfaces, mint WellMate and sky-blue CareMate. The selected visual target and delivery contract are recorded in `DESIGN-PLAN.md`.

Important: preview/refactor intentionally carries `noindex,nofollow` in HTML, `_headers` and `robots.txt`. Remove the preview noindex controls as a deliberate production-release step before merging to `main`.
