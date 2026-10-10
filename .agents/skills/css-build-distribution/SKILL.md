---
name: css-build-distribution
description: Procedures for compiling stylesheets with LightningCSS, managing tsup bundling, packaging zero-config Node/Browser artifacts, and validating package tarballs.
---

# CSS Build & Package Distribution Skill

## 1. Purpose
Governs the build scripts, minification with LightningCSS, packaging export maps, and automated zero-configuration CSS delivery mechanics.

## 2. Zero-Configuration Build Procedure
1. **LightningCSS Compilation** (`scripts/build-css.mjs`):
   - Bundles `src/styles/index.css` into `dist/styles.css`.
   - Emits TypeScript declaration files `dist/styles.css.d.ts` and `dist/styles.css.d.cts`.
2. **Dual-Runtime Generation**:
   - `dist/index.mjs`: Injects `import "./styles.css";` at the top for browser bundlers.
   - `dist/index.node.mjs`: Strips all CSS imports for clean Node.js SSR runtime.
3. **Packaging Export Map** (`package.json`):
   - Maps `.` export with conditional keys for `"browser"`, `"node"`, `"import"`, `"require"`, `"types"`.

## 3. Validation Commands & Firewall Benchmarks
- `pnpm --filter @chellaa/react build`
- `pnpm --filter @chellaa/test-consumer test` (executes 5-gate benchmark suite: Node ESM, Node CJS, SSR, CSS integrity, NPM pack integrity).
