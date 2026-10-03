# Chellaa React — Release Checklist
## Document: Production Release Verification Checklist

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Phase:** 33 — Release Checklist  
**Date:** 2026-10-03  
**Target Package:** `@chellaa/react`  

---

## 1. Executive Summary

Every release of `@chellaa/react` must pass through this comprehensive release checklist. No release may be tagged or published to the public npm registry with unverified checkboxes.

---

## 2. The Five-Pillar Release Checklist

### Pillar 1: Code Quality & Test Verification
- [ ] **Typecheck Passes:** `pnpm run typecheck` completes across all workspaces with zero TypeScript errors.
- [ ] **Lint & Format Passes:** `pnpm run lint` and `pnpm run format:check` pass with zero warnings or errors.
- [ ] **Unit Tests Pass:** `pnpm run test` executes all component unit tests with 100% pass rate.
- [ ] **Accessibility Tests Pass:** Automated `axe-core` tests execute via `vitest-axe` with zero violations across all component states.
- [ ] **Production Build Passes:** `pnpm run build` succeeds deterministically across `tsup` and `LightningCSS`.

### Pillar 2: Package Integrity & Distribution Contract
- [ ] **Dual Bundles Generated:** `dist/index.mjs` (ESM) and `dist/index.cjs` (CJS) exist and are non-empty.
- [ ] **TypeScript Declarations Generated:** `dist/index.d.ts` and `dist/index.d.ts.map` exist and match public API.
- [ ] **Standalone Stylesheet Generated:** `dist/styles.css` is emitted and minified with `@layer cl-components`.
- [ ] **Package Manifest Validated:** `publint` runs against `packages/react/package.json` with zero errors and zero warnings.
- [ ] **Type Resolution Validated:** `@arethetypeswrong/cli` passes across `node10`, `node16 (cjs)`, `node16 (esm)`, and `bundler`.
- [ ] **SideEffects Declaration Enforced:** `package.json` contains `"sideEffects": ["*.css", "**/*.css"]`.
- [ ] **Tarball Sanitization Verified:** `npm pack --dry-run` confirms zero source files (`src/`), tests (`*.test.tsx`), stories (`*.stories.tsx`), or configs are present in the package tarball.
- [ ] **Bundle Size Within Budgets:** `size-limit` validates that all component gzip budgets and the core bundle ceiling (<= 45 KB) are respected.

### Pillar 3: Real Consumer Validation (`apps/test-consumer`)
- [ ] **Clean Tarball Installation:** Test consumer installs the actual packed `.tgz` artifact.
- [ ] **Zero-Config Styling Verified:** Importing `{ Button } from "@chellaa/react"` renders fully styled in Next.js App Router and Vite without manual CSS import.
- [ ] **RSC & SSR Compatibility Verified:** Next.js production build (`next build`) completes without Server Component boundary errors or hydration mismatches.
- [ ] **CommonJS Interop Verified:** Node.js script executes `require('@chellaa/react')` without crashing or throwing CSS syntax errors.

### Pillar 4: Documentation & Changelog
- [ ] **Component Specifications & API Docs Updated:** Any new props, components, or deprecated behaviors are fully documented.
- [ ] **Changelog Generated:** `packages/react/CHANGELOG.md` contains accurate, user-facing descriptions collated by Changesets.
- [ ] **Migration Guide Provided:** If the release contains a `MAJOR` bump, explicit step-by-step upgrade instructions are provided.

### Pillar 5: Git & npm Distribution
- [ ] **Changeset Present & Merged:** All published changes originated from committed changesets.
- [ ] **Version PR Merged:** The automated Changesets Version PR was reviewed and merged to `main`.
- [ ] **Automated CI Release Triggered:** GitHub Actions release workflow triggered via `pnpm changeset publish`.
- [ ] **npm Provenance Verified:** The published package on npm exhibits verifiable build provenance attestations.
- [ ] **Git Tag Created:** Tag formatted as `@chellaa/react@<version>` created on `main`.
- [ ] **GitHub Release Published:** GitHub Release created with auto-populated release notes.
- [ ] **Post-Release Sanity Check:** `npm view @chellaa/react version` returns the newly released version, and a fresh scratch project successfully installs and runs it.
