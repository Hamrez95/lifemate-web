# Preview branch

This branch is the persistent staging/preview environment for LifeMate website changes.

Workflow:
1. Implement and review changes on `preview`.
2. Cloudflare builds this non-production branch as a preview version.
3. Verify the site using the generated preview URL.
4. After approval, open a PR from `preview` to `main`.
5. Merge only approved changes to production.

Preview pipeline refreshed after enabling `wrangler versions upload` for non-production builds.
