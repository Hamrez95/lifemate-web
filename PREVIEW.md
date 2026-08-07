# Preview branch

This branch is the persistent staging/preview environment for LifeMate website changes.

Workflow:
1. Implement and review changes on `preview`.
2. Cloudflare Pages automatically deploys `preview` to its branch preview URL.
3. After approval, open a PR from `preview` to `main`.
4. Merge only approved changes to production.
