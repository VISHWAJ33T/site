---
tags: ['Next.js', 'Node.js', 'Tooling', 'Debugging', 'Productivity']
draft: false
title: "How to Fix 'Broken' npm Packages Instantly with patch-package"
summary: 'Stop waiting for maintainers to merge your PR. Learn how to use patch-package to modify node_modules safely and persistently, using a Next.js timeout fix as a practical example.'
date: 2025-11-30
images: []
slug: how-to-fix-broken-npm-packages-instantly-with-patch-package
publish: true
---

## The "Not My Code" Problem

As developers, we rely heavily on open-source libraries, so it is painful when a bug or limitation in a dependency blocks progress and the upstream fix is stuck in an unmerged pull request.

Forking the entire library or copy-pasting its source into a project is hard to maintain, especially across multiple apps and environments. A more practical approach is to patch the installed package in place and keep those changes under version control.

This is exactly what **`patch-package`** does: it lets you edit files inside `node_modules` and then save those edits as patch files that are automatically re-applied after every `npm install`.

## Step 1: Install patch-package

For an npm-based Next.js or Node.js project, only `patch-package` is required. (Note: `postinstall-postinstall` is mainly useful for Yarn v1 edge cases and can be skipped if you do not need it).

Install it as a dev dependency:

```bash
npm install patch-package --save-dev
```

Next, add a `postinstall` script to your `package.json`. This ensures patches are applied whenever dependencies are installed:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postinstall": "patch-package"
  }
}
```

This setup ensures that any patch files in the `patches` directory are applied automatically after each `npm install` run locally or in CI/CD.

## Step 2: Make the Temporary Change

Next, intentionally modify the code in `node_modules` for the package you want to fix, just as you would when debugging a bug in a dependency.

**Real-World Use Case: The Next.js 5-Minute Timeout**
I recently encountered a limitation where long-running AI generation requests were failing after exactly 5 minutes. As detailed in [GitHub Discussion \#71651](https://github.com/vercel/next.js/discussions/71651), Node.js v18+ introduced a default 5-minute `requestTimeout` that Next.js does not strictly override or expose a config for.

To fix this, I had to manually patch the server start script. I opened `node_modules/next/dist/server/lib/start-server.js`, found where the server initializes, and added a specific timeout override:

```javascript
// node_modules/next/dist/server/lib/start-server.js

// ... inside the startServer function
if (keepAliveTimeout) {
  server.keepAliveTimeout = keepAliveTimeout
}

// MY FIX: Forcing a 1-hour timeout for long AI tasks
server.requestTimeout = 3600000
// ...
```

Once I confirmed that my local `next start` command could now handle requests longer than 5 minutes, I was ready to finalize the patch.

## Step 3: Generate the Patch File

With your changes still present in `node_modules`, run `patch-package` for the affected dependency name.

```bash
npx patch-package next
```

This generates a `patches` directory in your project root containing a patch file (e.g., `next+14.2.15.patch`) that stores the diff between the original package and your modified version. The same approach works for any dependency name, not just Next.js.

## Step 4: Keep It Working Everywhere

From this point on:

1.  **Locally:** When you or your team run `npm install`, the `postinstall` script re-applies the patches to fresh `node_modules` automatically.
2.  **Production:** When you deploy to platforms like Vercel, DigitalOcean, or container-based environments, the same script runs after `npm install` in the build process, ensuring your fixes exist in production without needing a fork.

There is no need for an additional helper like `postinstall-postinstall` when using npm; the standard `postinstall` hook is enough to apply `patch-package`’s diffs reliably in most setups.

## When (And How) To Use It

`patch-package` is best treated as a practical, **temporary bridge** rather than a permanent fork.

**Use it when:**

- A bug or missing feature in a dependency is blocking you and the upstream fix is pending or unmaintained.
- The change is small and well-scoped, such as a one-line fix, an extra null-check, or a simple config tweak.

**Maintain it responsibly:**

- **Monitor upstream:** Check the library’s release notes or GitHub issues so you can remove the patch once an official fix ships.
- **Document it:** Add comments or docs in your codebase (for example, in a README or near the affected feature) linking to the relevant issue or discussion to remind future you _why_ the patch exists.

Used this way, `patch-package` lets you unblock work immediately while still respecting upstream ownership and avoiding brittle, copy-pasted forks of entire libraries.
