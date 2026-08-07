# ADR 0001 — Deploy Next.js on Cloudflare Workers through OpenNext

**Status:** Accepted for preview branch

## Context

The previous repository was a static HTML/CSS/JavaScript site configured for Cloudflare Pages. The new website requires localized routes, SSR metadata, Server Components, theme/client interactions and a future server-side form adapter.

Current Cloudflare documentation (reviewed 2026-08-07) directs full-stack Next.js applications to **Cloudflare Workers** with `@opennextjs/cloudflare`. Cloudflare Pages remains appropriate for static Next.js output, but is not the recommended target for full-stack SSR Next.js.

References:
- https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- https://developers.cloudflare.com/pages/framework-guides/nextjs/
- https://nextjs.org/docs/app/guides/internationalization

## Decision

Use:
- Next.js 16.2.x / React 19.2.x
- Cloudflare Workers
- `@opennextjs/cloudflare`
- Wrangler 4.x
- `nodejs_compat`
- isolated Worker name `lifemate-web-preview` for preview only

No custom production routes are present in `wrangler.jsonc`, so the preview configuration cannot bind `mylifemate.ir` by itself.

## Consequences

- Server Components and route metadata remain available.
- Local/CI preview can execute in `workerd` through OpenNext.
- Existing Cloudflare Pages production configuration must not be repointed until the preview is explicitly approved.
- Preview deployment requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.
