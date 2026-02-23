# Deploying to Cloudflare Pages

This project is set up for **static export** on Cloudflare Pages.

## Build configuration

In your Cloudflare Pages project → **Settings** → **Builds & deployments** → **Build configuration**:

| Setting                    | Value                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework preset**       | None (or "Next.js (Static HTML Export)" if available)                                                                                       |
| **Build command**          | **Must** run install first: `bun install && bun run build:cloudflare` (Cloudflare often does not run install automatically, so include it.) |
| **Build output directory** | `out`                                                                                                                                       |
| **Root directory**         | (leave empty if repo root)                                                                                                                  |

## Environment variables (optional)

- **EXPORT** = `export` — already set by `build:cloudflare`; only needed if you use `bun run build` and set this in the dashboard.
- **NODE_VERSION** = `22` — recommended so Node matches local.

## Lockfile (recommended)

The repo uses **bun** (`packageManager` in package.json). To avoid lockfile migration and cache issues on Cloudflare:

1. Commit `bun.lock` (already in the repo).
2. Stop tracking `package-lock.json` so installs use `bun.lock` only:
   ```bash
   git rm --cached package-lock.json
   git commit -m "chore: use bun.lock only for Cloudflare"
   ```

Then Cloudflare’s `bun install --frozen-lockfile` will use `bun.lock` and not migrate from `package-lock.json`.

## Note on API routes

Static export does **not** run API routes. Remaining APIs (e.g. `/api/og`, `/api/portfolio`) are built for compatibility but do not run on static hosts. For server-side APIs, use [Cloudflare Workers with Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/).
