# ADR-004: Build System & Monorepo Toolchain

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, Tooling & DevOps Lead  

---

## 1. Context and Problem Statement

Building a production-grade TypeScript React component library requires:
- Sub-second build times for high-velocity local developer experience.
- Clean dual ESM (`.mjs`) and CommonJS (`.cjs`) outputs.
- High-fidelity TypeScript declarations (`.d.ts`) and sourcemaps.
- Modern CSS processing (preserving `@layer` and minifying with precision).
- Monorepo task orchestration and computational caching.

---

## 2. Decision

1. **Monorepo Management & Task Orchestration:**
   - Manage monorepo dependencies via **pnpm workspaces** for strict, non-flat dependency isolation.
   - Orchestrate monorepo tasks (`build`, `test`, `lint`, `typecheck`) via **Turborepo** (`turbo.json`) with local and remote caching.
2. **JavaScript/TypeScript Bundler:**
   - Adopt **`tsup`** (powered by esbuild) for compiling `packages/react`.
   - Output both ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`).
   - Generate full TypeScript declaration files (`dist/index.d.ts` and `dist/index.d.ts.map`).
   - Enable tree-shaking, code splitting, and source maps.
3. **CSS Compilation & Minification:**
   - Adopt **`LightningCSS`** for compiling and minifying static stylesheets.
   - Preserves modern CSS `@layer cl-components` syntax.
   - Provides ultra-fast Rust-based minification and vendor prefixing.
4. **Bundle Size Enforcement:**
   - Integrate **`size-limit`** to gate pull requests against strict component and package gzip budgets.

---

## 3. Consequences

### Positive
- **Blazing Compilation Speed:** `tsup` and `LightningCSS` compile the entire library in milliseconds.
- **Reliable TypeScript Ecosystem:** Emitted `.d.ts` files pass strict type checking across all resolution strategies (`Node10`, `Node16`, `Bundler`).
- **Reproducible Monorepo Pipeline:** Turborepo ensures incremental builds are instant when inputs have not changed.

### Negative
- **Dual Formats Maintenance:** Requires testing both ESM and CJS consumer targets to avoid subtle dual-package hazard bugs.

---

## 4. Alternatives Considered

1. **Rollup directly:** Rejected because `tsup` provides pre-configured esbuild speed with zero-config TypeScript declaration generation.
2. **Webpack:** Rejected due to excessive configuration complexity and slower build times.
3. **PostCSS:** Rejected in favor of LightningCSS due to LightningCSS's superior performance and native `@layer` optimization.
