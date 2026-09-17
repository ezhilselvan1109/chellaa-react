# ADR-005: Package Build System & Distribution Architecture

## Status
Accepted

## Context
The core component library (`@chella-ui/react`) must produce a production-grade npm distribution that supports modern ECMAScript modules (ESM), legacy CommonJS (CJS) environments, strict TypeScript types (`.d.ts`), and bundled CSS.

## Decision
We select **tsup** (powered by esbuild) as our package build engine:
- Output formats: ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`).
- Full declaration generation: `dist/index.d.ts` with declaration source maps.
- CSS extraction: Bundles all CSS Modules and token definitions into a single, minified `dist/styles.css`.
- Tree-shaking support: Pure annotations (`#__PURE__`) and proper `sideEffects` declarations in `package.json`.

## Consequences
- Fast sub-second build times.
- Zero external runtime bundler dependencies for package consumers.
- Reliable type resolution in modern TypeScript (`moduleResolution: "bundler"` or `"node16"`).
