# Chellaa React — Engineering Standards

## Document 09: Build, Packaging & Release Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**Build Tooling:** tsup, LightningCSS, Turborepo, pnpm

---

## 1. Executive Summary & Purpose

The packaging and build architecture of `@chellaa/react` is the bridge between internal TypeScript/CSS source code and thousands of external consumer applications. A misconfigured export, missing type declaration, or accidental side-effect drop will break consumer production builds.

This document establishes the build pipeline configuration, dual ESM/CJS packaging standards, LightningCSS compilation, `package.json` export manifests, bundle budgets, and the automated Changesets release pipeline.

---

## 2. Monorepo Orchestration & Turborepo Pipeline

Monorepo builds are orchestrated via **Turborepo** (`turbo.json`), caching build outputs locally and across CI runners:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "outputs": []
    }
  }
}
```

---

## 3. Package Build Pipeline (`tsup` & `LightningCSS`)

The core package `@chellaa/react` builds via `tsup.config.ts` using a neutral base configuration:

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  target: "es2022",
  external: ["react", "react-dom"],
});
```

### 3.1 RSC-Compatible Architecture Principle

Global `"use client"` banners (such as `options.banner = { js: '"use client";' }`) are **strictly prohibited**. A global client banner forces the entire library into a client bundle, preventing consumers from rendering Chellaa React components inside React Server Components and breaking SSR streaming in Next.js App Router.

**Guiding Principles:**

1. **RSC-Compatible by Default:** Chellaa React must remain RSC-compatible by default. Presentational or static layout components (e.g. `Box`, `Stack`) must remain capable of executing as Server Components.
2. **Intentional Client Boundaries:** Only components or modules that actually require client-side React behavior (hooks like `useState`, `useEffect`, or event listeners) should be marked as client components (`"use client"`).
3. **Benchmark Validation:** The exact mechanism for preserving component-level client boundaries in the compiled bundle must be validated during the real Next.js App Router test-consumer benchmark.

### 3.2 CSS Processing with LightningCSS

Static stylesheets (`src/styles/*.css` and `src/components/**/*.styles.css`) are compiled using LightningCSS:

- Preserves modern CSS `@layer cl-components`.
- Autoprefixes for target browsers (Chrome, Edge, Firefox, Safari 15.4+).
- Minifies structural whitespace and comments.
- Generates `dist/styles.css` as a standalone optional fallback export.

---

## 4. Package Manifest & Export Map Standards

The `packages/react/package.json` enforces strict modern conditional exports:

```json
{
  "name": "@chellaa/react",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./styles.css": "./dist/styles.css",
    "./package.json": "./package.json"
  },
  "sideEffects": ["*.css", "**/*.css"],
  "peerDependencies": {
    "react": ">=18.2.0",
    "react-dom": ">=18.2.0"
  },
  "files": ["dist", "README.md", "LICENSE"]
}
```

### 4.1 The Critical `sideEffects` Rule

- **Mandate:** `package.json` must explicitly declare `"sideEffects": ["*.css", "**/*.css"]`.
- **Strict Prohibition:** Setting `"sideEffects": false` is strictly prohibited anywhere in the repository.
- **Rationale:** CSS imports are runtime-relevant package side effects. Marking the package side-effect-free (`"sideEffects": false`) causes consumer bundlers (Webpack, Vite, Rollup) to tree-shake and discard required CSS imports during dead-code elimination, producing unstyled components in production!
- Declaring `["*.css", "**/*.css"]` guarantees that JavaScript is aggressively tree-shaken while all necessary CSS stylesheet imports are preserved intact.

---

## 5. Bundle Size Budgets & Verification (`size-limit`)

To protect the library from accidental code bloat, every build runs an automated check against `@size-limit/preset-small-lib`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Bundle Size Hard Ceilings                       │
├─────────────────────────────┬─────────────────┬────────────────────────┤
│ Import Target               │ Max Size (Gzip) │ Scope                  │
├─────────────────────────────┼─────────────────┼────────────────────────┤
│ Button import only          │ <= 2.5 KB       │ { Button }             │
├─────────────────────────────┼─────────────────┼────────────────────────┤
│ Dialog + Modal import       │ <= 7.5 KB       │ { Dialog }             │
├─────────────────────────────┼─────────────────┼────────────────────────┤
│ Entire Core Library Bundle  │ <= 45.0 KB      │ import * as Chellaa    │
└─────────────────────────────┴─────────────────┴────────────────────────┘
```

If a pull request causes a component to exceed its size budget, CI fails automatically.

---

## 6. Consumer Validation Firewall (`apps/test-consumer`)

Passing unit tests in a simulated jsdom environment does **not** prove compatibility with modern bundlers or React Server Components. Before publishing any release, the CI pipeline executes automated end-to-end consumer tests against real consumer environments:

```text
Next.js App Router
        ↓
Server Component (app/page.tsx)
        ↓
Chellaa React Component
        ↓
Production Build (`next build`)
```

### 6.1 Mandatory Real-World Verification Matrix

1. **Zero Server/Client Boundary Errors:** Server components rendering Chellaa React components must compile and execute without unexpected boundary errors.
2. **Zero Hydration Mismatches:** Server-rendered markup must match client DOM without hydration warnings.
3. **Zero Browser-Global Access during SSR:** No access to `window`, `document`, or `navigator` during server evaluation.
4. **Zero CSS Delivery Failures:** Components must render fully styled under zero-configuration imports (`import { Button } from "@chellaa/react"` without manual CSS imports).
5. **No Unnecessary Client Boundary Propagation:** Presentational components must not force parent Server Components into client rendering. Interactive components must declare their client boundary intentionally.
6. **Multi-Consumer Benchmark Coverage:** The test-consumer matrix must validate against:
   - Next.js App Router (RSC + SSR + Production build)
   - Vite React SPA (ESM + LightningCSS)
   - Remix SSR (Server compilation + hydration)
   - Vitest ESM (Node-based test runner)
   - Jest / Node CJS (CommonJS require compatibility)

---

## 7. Automated Release Pipeline

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Changesets Release Flow                         │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Developer Merges PR with Changeset (e.g. .changeset/cool-fox.md)    │
│        ↓                                                               │
│ 2. GitHub Actions detects changesets and runs:                         │
│    pnpm changeset version                                              │
│        ↓                                                               │
│ 3. Automated "Version Packages" PR is opened/updated with changelogs   │
│        ↓                                                               │
│ 4. Maintainer merges "Version Packages" PR to main                    │
│        ↓                                                               │
│ 5. CI runs: pnpm changeset publish                                     │
│    • Publishes package to npm registry with provenance                 │
│    • Tags Git commit (e.g., @chellaa/react@1.2.0)                      │
│    • Generates GitHub Release notes                                    │
└────────────────────────────────────────────────────────────────────────┘
```
