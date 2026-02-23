#!/usr/bin/env node
/**
 * Cloudflare Pages static export build – no cross-env needed.
 * Sets env and runs next build, then postbuild (RSS).
 */
import { spawnSync } from 'child_process'
import { writeFileSync, readFileSync, existsSync } from 'fs'
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
if (postbuild.status !== 0) process.exit(postbuild.status ?? 1)

// Cloudflare Pages: serve /api/portfolio as inline JSON (display in browser, not download)
const outDir = path.join(root, 'out')
if (existsSync(outDir)) {
  const headersPath = path.join(outDir, '_headers')
  const existing = existsSync(headersPath) ? readFileSync(headersPath, 'utf8') : ''
  const portfolioHeaders = [
    '',
    '# API JSON: display in browser',
    '/api/portfolio',
    '  Content-Type: application/json; charset=utf-8',
    '  Content-Disposition: inline',
  ].join('\n')
  writeFileSync(headersPath, (existing + portfolioHeaders).trimStart(), 'utf8')
}

process.exit(0)
