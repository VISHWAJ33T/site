#!/usr/bin/env node
/**
 * Cloudflare Pages static export build – no cross-env needed.
 * Sets env and runs next build, then postbuild (RSS).
 */
import { spawnSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

process.env.EXPORT = 'export'
process.env.INIT_CWD = root

const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next')
const build = spawnSync(process.execPath, [nextBin, 'build'], {
  stdio: 'inherit',
  cwd: root,
  env: { ...process.env, EXPORT: 'export', INIT_CWD: root },
})
if (build.status !== 0) process.exit(build.status ?? 1)

process.env.NODE_OPTIONS = '--experimental-json-modules'
const postbuild = spawnSync(process.execPath, [path.join(root, 'scripts', 'postbuild.mjs')], {
  stdio: 'inherit',
  cwd: root,
  env: { ...process.env, NODE_OPTIONS: '--experimental-json-modules' },
})
process.exit(postbuild.status ?? 0)
