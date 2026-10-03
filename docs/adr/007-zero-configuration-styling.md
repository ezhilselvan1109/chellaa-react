# ADR-007: Zero-Configuration Styling and Automatic CSS Delivery

**Status:** Accepted (Public API Finalized; Internal Delivery Mechanism Under Investigation)  
**Date:** 2026-10-03  
**Deciders:** Core Architecture Team  
**Consulted:** React, TypeScript, CSS Architecture & Tooling Specialists  
**Informed:** All Engineering Contributors

---

## 1. Context and Problem Statement

In the initial Phase 1 foundation architecture, Chellaa React specified that consumers would manually import a pre-compiled global stylesheet in their application root layout:

```tsx
// Previous requirement (Now Deprecated):
import "@chellaa/react/styles.css";
import { Button } from "@chellaa/react";
```

While standard in several contemporary libraries (e.g., Mantine, Radix Themes), this requirement introduces significant adoption friction and failure modes:

1. **Developer Friction:** Developers must remember to add a separate CSS import during onboarding. Forgetting this step results in unstyled, broken DOM nodes without clear compile-time warnings.
2. **Setup Overhead in Multi-Repo / Micro-Frontend Environments:** In distributed enterprise architectures, teams must ensure every sub-application, test harness, and preview environment imports the CSS file.
3. **Contradiction of Core DX Principle:** Chellaa React's vision is built on **Zero-Friction Adoption**. Requiring a manual global stylesheet import contradicts the ideal consumer experience:

```tsx
import { Button } from "@chellaa/react";
```

### The Core Architectural Principle

> **Chellaa React owns the delivery of its component styling. Consumers should receive a working styled component through the normal package import without requiring a separate global stylesheet import.**

---

## 2. Decision

### 2.1 Public API Decision (Finalized)

1. Chellaa React **guarantees** that importing any component from `@chellaa/react` delivers a fully styled, functioning component out of the box:
   ```tsx
   import { Button, Card, Input } from "@chellaa/react";

   export function App() {
     return <Button variant="primary">Save</Button>;
   }
   ```
2. Consumers **are not required** to manually import `@chellaa/react/styles.css` for normal component consumption.
3. The consumer is completely shielded from:
   - Where the library's CSS files are physically stored.
   - How component CSS is bundled or linked.
   - Which specific stylesheet must be imported.
   - How style injection and CSS variable resolution occur.

### 2.2 Separation of Public API Contract from Internal Implementation

The architectural decision is bifurcated into:

1. **The Public API Contract (Finalized):** Zero manual CSS import required by consumers.
2. **The Internal Delivery Implementation (Open Investigation for Phase 2):** Determining the exact build-time and packaging configuration that automates style delivery reliably across modern bundlers and SSR frameworks.

---

## 3. Evaluation of Candidate Delivery Mechanisms

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

### Detailed Evaluation

#### Candidate 1: Component-Level Static Side-Effect Imports (Leading Candidate)

- **Mechanism:** In the compiled ESM distribution, component modules include relative static CSS imports:
  ```javascript
  // packages/react/dist/components/Button/Button.mjs
  import "./Button.css";
  import "../../styles/tokens.css";
  ```
- **Manifest:** Package `package.json` specifies `"sideEffects": ["*.css", "**/*.css"]`.
- **Ecosystem Behavior:**
  - Modern bundlers (Vite, Webpack 5, Next.js App Router, Remix, Rollup, Parcel) intercept CSS imports in npm dependencies, automatically bundle them, and inject them into the HTML document's `<head>`.
  - Unimported components have their CSS eliminated completely during tree-shaking.
  - CSS `@layer cl-components` guarantees deterministic cascade ordering regardless of import order.

#### Candidate 2: Client Runtime DOM Style Tag Injection (Rejected)

- **Why Rejected:** Incompatible with React 18/19 Server Components, induces Flash of Unstyled Content (FOUC), increases JavaScript bundle size with CSS strings, and causes Content Security Policy (CSP) violations.

#### Candidate 3: Mandatory Bundler Plugin (Rejected)

- **Why Rejected:** Violates the Zero-Configuration requirement by forcing consumers to install and configure proprietary plugins in Vite, Next.js, or Webpack.

#### Candidate 4: Dual Automated Delivery with Standalone Fallback (Recommended Strategy)

- **Mechanism:**
  - **Primary Delivery:** Component-level static side-effect imports ensure zero-config usage in modern bundlers.
  - **Optional Fallback:** `dist/styles.css` is still compiled and exported under `"./styles.css"` in `package.json` for non-bundler setups, static HTML sites, or legacy micro-frontend pipelines.

---

## 4. Consequences and Implications

### Positive Consequences

- **Flawless Developer Experience:** Consumers install `@chellaa/react` and immediately start using components. Zero setup boilerplate.
- **Elimination of Unstyled Visual Bugs:** Components cannot accidentally render without styles.
- **Granular CSS Tree-Shaking:** Consumers only bundle the CSS for components they actually import.
- **Zero Runtime JavaScript Styling Overhead:** Retains pure static CSS performance with semantic CSS variables.

### Negative Consequences & Challenges to Resolve in Phase 2

- **CJS / Node.js Runtime Compatibility:** In pure Node.js environments (e.g. Jest tests without style mocks or non-bundler SSR servers), importing raw CSS files throws a `SyntaxError: Unexpected token '.'`.  
  _Mitigation under investigation:_ Use conditional package exports (`"node"` vs. `"browser"` / `"import"`) or separate Node-compatible CJS entries that stub or bypass raw CSS imports.
- **CSS Duplication Avoidance:** Shared tokens (`tokens.css`) imported by multiple components must be deduplicated by consumer bundlers.  
  _Mitigation under investigation:_ Bundle shared tokens at the entry layer or verify bundler deduplication in `apps/test-consumer`.
- **CSS Ordering & Specificity:** Multiple component CSS imports might evaluate in varying orders based on user imports.  
  _Mitigation under investigation:_ All library styles are wrapped in CSS `@layer cl-components`, ensuring that CSS rules cascade with uniform specificity regardless of import order.

---

## 5. Next Steps for Phase 2 Benchmarking

During **Phase 2 (Engineering Standards & Build Tooling)**, the core architecture team will construct a validation matrix inside `apps/test-consumer` testing:

1. **Next.js App Router (RSC & Client Components):** Verify automatic style delivery without `"use client"` CSS import warnings.
2. **Vite SPA (React 18 & 19):** Verify HMR and production bundle CSS chunk generation.
3. **Remix (SSR):** Verify server stylesheet link compilation.
4. **Node.js / Vitest / Jest (CommonJS & ESM):** Verify that importing components in server test suites executes without CSS syntax errors.

Once benchmarks confirm the optimal internal bundling configuration, this ADR will be updated to mark the internal implementation as **Finalized**.
