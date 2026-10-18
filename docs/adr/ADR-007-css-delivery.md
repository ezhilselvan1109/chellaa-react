# ADR-007: Zero-Configuration Styling & Automatic CSS Delivery

**Status:** Accepted (Public API Finalized; Internal Delivery Mechanism Under Investigation & Benchmark)  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, CSS Architecture Specialist, Tooling Lead  
**Consulted:** React, TypeScript, CSS Architecture & Tooling Specialists  
**Informed:** All Engineering Contributors  
**Historical Consolidation Note:** Canonically consolidates and supersedes legacy unnormalized record `007-zero-configuration-styling.md` with full preservation of candidate trade-off evaluations and architectural consequences.

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

### The Core Architectural Principle

> **Chellaa React owns the delivery of its component styling. Consumers should receive a working styled component through the normal package import without requiring a separate global stylesheet import.**

We must decide the public API contract for CSS delivery and establish the empirical benchmark protocol to determine the optimal internal delivery mechanism.

---

## 2. Decision

### 2.1 The Public API Contract (Finalized & Immutable)

1. **Chellaa React guarantees that importing any component from `@chellaa/react` delivers a fully styled, functioning component out of the box.**
2. Consumers **are not required** to manually import `@chellaa/react/styles.css` for normal component consumption.
3. The consumer is completely shielded from:
   - Where the library's CSS files are physically stored.
   - How component CSS is bundled or linked.
   - Which specific stylesheet must be imported.
   - How style injection and CSS variable resolution occur.
4. A standalone compiled stylesheet `dist/styles.css` is exported under `"./styles.css"` strictly as an optional fallback escape hatch for non-bundler setups or static CDN pipelines.

### 2.2 The Internal Delivery Mechanism (Benchmarking Protocol)

The internal bundling mechanism is subject to empirical validation across 6 distinct consumer environments in `apps/test-consumer`:

1. **Vite SPA (React 18 & 19):** Validate HMR, production build CSS chunks, and tree-shaking.
2. **Next.js App Router (RSC & Client Components):** Validate CSS extraction without bundler warnings or duplicate styles.
3. **Remix SSR:** Validate server stylesheet link collection and hydration.
4. **Vitest ESM:** Validate Node-based ESM testing without CSS syntax errors.
5. **Jest / CommonJS:** Validate Node-based CJS testing without `SyntaxError: Unexpected token '.'`.
6. **Pure Node.js Runtime:** Validate SSR execution without crashing.

### 2.3 Evaluation of Candidate Delivery Approaches

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CSS Delivery Implementation Candidates                          │
├─────────────────────┬──────────────┬───────────────────────────────────────────────────┤
│ Candidate Mechanism │ Viability    │ Technical Evaluation & Trade-offs                 │
├─────────────────────┼──────────────┼───────────────────────────────────────────────────┤
│ 1. Component-Level  │ High         │ • Pure static CSS; zero runtime JS overhead.      │
│    Static Side-     │ (Leading     │ • Supported by Next.js, Vite, Webpack, Remix.     │
│    Effect Imports   │ Candidate)   │ • Tree-shaking is preserved with "sideEffects".   │
│                     │              │ • Challenge: Node.js CJS direct execution requires│
│                     │              │   bundler or conditional export isolation.        │
├─────────────────────┼──────────────┼───────────────────────────────────────────────────┤
│ 2. Client Runtime   │ Rejected     │ • Incompatible with React 18/19 Server Components.│
│    DOM Style        │ (Fatal       │ • Causes FOUC during streaming SSR.               │
│    Injection        │ Flaws)       │ • Increases JS bundle; violates strict CSPs.      │
├─────────────────────┼──────────────┼───────────────────────────────────────────────────┤
│ 3. Mandatory        │ Rejected     │ • Violates the Zero-Config requirement.           │
│    Bundler Plugin   │ (Consumer    │ • Forces consumers to install bespoke Vite/Next.js│
│                     │ Friction)    │   plugins just to use a button.                   │
├─────────────────────┼──────────────┼───────────────────────────────────────────────────┤
│ 4. Dual Automated   │ High         │ • Component-level side-effect imports by default. │
│    Delivery with    │ (Safe        │ • Standalone dist/styles.css provided as an       │
│    Static Fallback  │ Architecture)│   optional escape hatch for legacy/custom setups. │
└─────────────────────┴──────────────┴───────────────────────────────────────────────────┘
```

#### Detailed Candidate Rationales

- **Candidate 1: Component-Level Static Side-Effect Imports (Leading Candidate):**  
  In the compiled ESM distribution, component modules include relative static CSS imports (`import './Button.css'; import '../../styles/tokens.css';`). Package `package.json` declares `"sideEffects": ["*.css", "**/*.css"]`. Modern bundlers (Vite, Webpack 5, Next.js App Router, Remix, Rollup) automatically aggregate and inject CSS chunks into the document head, while unused components are completely tree-shaken away.
- **Candidate 2: Client Runtime DOM Style Tag Injection (Rejected):**  
  Incompatible with React Server Components (RSC), induces Flash of Unstyled Content (FOUC), bloats JavaScript runtime bundles with CSS string literals, and violates strict enterprise Content Security Policies (CSP).
- **Candidate 3: Mandatory Bundler Plugin (Rejected):**  
  Forces consumers to configure custom plugins in Vite, Next.js, or Webpack, breaking the fundamental zero-configuration guarantee.
- **Candidate 4: Dual Automated Delivery with Standalone Fallback (Recommended Strategy):**  
  Primary zero-config delivery via component-level static side-effect imports in ESM, with standalone `dist/styles.css` exported under `"./styles.css"` for non-bundler and static CDN pipelines.

---

## 3. Consequences and Implications

### Positive Consequences

- **Flawless Developer Experience:** Zero boilerplate setup. Components are styled instantly.
- **Granular CSS Tree-Shaking:** Consumers only bundle CSS for components they actually import.
- **Zero Runtime JavaScript:** Maintains pure static CSS performance with semantic CSS variables.
- **Elimination of Unstyled Visual Bugs:** Components cannot accidentally render without styles.

### Negative Consequences & Mitigations

- **Node.js CJS Runtime Compatibility:** In pure Node.js environments (e.g. Jest tests without style mocks or non-bundler SSR servers), importing raw CSS files throws `SyntaxError: Unexpected token '.'`.  
  *Mitigation under investigation:* Use conditional package exports (`"node"` vs. `"browser"` / `"import"`) or separate Node-compatible CJS entries that stub or bypass raw CSS imports.
- **CSS Duplication Avoidance:** Shared tokens (`tokens.css`) imported by multiple components must be deduplicated by consumer bundlers.  
  *Mitigation under investigation:* Bundle shared tokens at the entry layer or verify bundler deduplication in `apps/test-consumer`.
- **CSS Ordering & Specificity:** Multiple component CSS imports might evaluate in varying orders based on user imports.  
  *Mitigation:* All library styles are wrapped in CSS `@layer cl-components` and `@layer cl-tokens`, ensuring that CSS rules cascade with deterministic specificity regardless of import order.

---

## 4. Benchmark Validation Gates Before Final Freeze

This ADR will transition to **Fully Finalized** once the empirical benchmark tests inside `apps/test-consumer` pass with:

1. Zero CSS syntax errors in Node CJS.
2. Zero duplicate CSS rules in Next.js App Router.
3. Zero hydration mismatches or FOUC during SSR.
4. Verified CSS elimination when components are unimported.
