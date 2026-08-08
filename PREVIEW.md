# LifeMate preview workflow

Production is served only from `main` and must not be changed without explicit approval.

Development flow:
1. Start from the real `preview` branch.
2. Implement isolated work on a feature/refactor branch.
3. QA the feature branch.
4. Fast-forward/update `preview` for stakeholder review.
5. Cloudflare Workers Git integration builds non-production branches automatically.
6. Only after explicit approval: open/merge a PR into `main`.

Current V3 work branch: `refactor/lifemate-brand-ux-v2`.
Current V3 preview sync: brand storytelling, women’s health, trust/legal redesign and responsive QA.

Important: preview/refactor intentionally carries `noindex,nofollow` in HTML, `_headers` and `robots.txt`. Remove the preview noindex controls as a deliberate production-release step before merging to `main`.
