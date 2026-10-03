# ADR-007: Zero-Configuration Styling & Automatic CSS Delivery

**Status:** Accepted (Public API Finalized; Internal Delivery Mechanism Under Investigation & Benchmark)  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, CSS Architecture Specialist, Tooling Lead

---

## 1. Context and Problem Statement

Traditionally, many component libraries require consumers to manually import a global stylesheet in their application entry point:

```tsx
// Traditional requirement (Deprecated in Chellaa React):
import "@chellaa/react/styles.css";
import { Button } from "@chellaa/react";
```

This requirement causes severe friction:

1. **Developer Friction:** Developers forget the CSS import, leading to broken, unstyled DOM nodes without compilation errors.
2. **Micro-Frontend / Multi-Repo Burden:** Every micro-app or test harness must ensure the CSS file is imported.
3. **Contradiction of Core DX Principle:** Chellaa React's vision is built on frictionless adoption:
   ```tsx
   import { Button } from "@chellaa/react";
   ```

We must decide the public API contract for CSS delivery and establish the empirical benchmark protocol to determine the optimal internal delivery mechanism.

---

## 2. Decision

### 2.1 The Public API Contract (Finalized & Immutable)

1. **Chellaa React guarantees that importing any component from `@chellaa/react` delivers a fully styled, functioning component out of the box.**
2. Consumers **are not required** to manually import `@chellaa/react/styles.css` for normal component consumption.
3. A standalone compiled stylesheet `dist/styles.css` is exported under `"./styles.css"` strictly as an optional fallback escape hatch for non-bundler setups or static CDN pipelines.

### 2.2 The Internal Delivery Mechanism (Benchmarking Protocol)

The internal bundling mechanism is subject to empirical validation across 6 distinct consumer environments in `apps/test-consumer`:

1. **Vite SPA (React 18 & 19):** Validate HMR, production build CSS chunks, and tree-shaking.
2. **Next.js App Router (RSC & Client Components):** Validate CSS extraction without bundler warnings or duplicate styles.
3. **Remix SSR:** Validate server stylesheet link collection and hydration.
4. **Vitest ESM:** Validate Node-based ESM testing without CSS syntax errors.
5. **Jest / CommonJS:** Validate Node-based CJS testing without `SyntaxError: Unexpected token '.'`.
6. **Pure Node.js Runtime:** Validate SSR execution without crashing.

### 2.3 Evaluation of Candidate Delivery Approaches

- **Approach A: Component-Level Static Side-Effect Imports (Leading Candidate):**  
  ESM modules contain relative CSS imports (`import './Button.css'`). Bundlers aggregate CSS automatically; package declares `"sideEffects": ["*.css", "**/*.css"]`.
- **Approach B: Generated Aggregate Stylesheet with Root Entry Import:**  
  The root entry imports the aggregated stylesheet.
- **Approach C: Dual Delivery / Fallback:**  
  Side-effect imports in ESM, standalone `dist/styles.css` fallback export for manual setups.

---

## 3. Consequences

### Positive

- **Flawless Developer Experience:** Zero boilerplate setup. Components are styled instantly.
- **Granular CSS Tree-Shaking:** Consumers only bundle CSS for components they actually import.
- **Zero Runtime JavaScript:** Maintains pure static CSS performance.

### Negative

- **Node.js CJS Hazard:** Raw CSS imports in pure Node CJS environments fail without bundler transform or conditional export isolation. Must be mitigated via export maps or stubbing.

---

## 4. Benchmark Validation Gates Before Final Freeze

This ADR will transition to **Fully Finalized** once the empirical benchmark tests inside `apps/test-consumer` pass with:

1. Zero CSS syntax errors in Node CJS.
2. Zero duplicate CSS rules in Next.js App Router.
3. Zero hydration mismatches or FOUC during SSR.
4. Verified CSS elimination when components are unimported.
