# Chellaa React — Foundation Architecture

## Document 06: Library Architecture, Repository Strategy & Open Decisions

**Document Status:** Approved & Baseline  
**Phase:** 1 — Foundation  
**Version:** 1.0.0  
**Target Package:** `@chellaa/react`

---

## 1. Introduction

This document defines the complete technical, repository, build, and package distribution architecture of **Chellaa React**. It covers monorepo orchestration, the internal module structure of `@chellaa/react`, component file design patterns, the public API boundary, documentation and playground apps, consumer validation, Architecture Decision Records (ADRs), cross-document validation, open decisions, and the 18 core architectural foundation answers.

---

## 2. Monorepo Repository Architecture

Chellaa React is structured as a high-performance monorepo managed via **pnpm workspaces** and orchestrated with **Turborepo**:

```
chellaa-react/
│
├── .github/                     # CI/CD workflows, automated release pipelines
│   └── workflows/
│
├── apps/                        # Application targets
│   ├── docs/                    # Official documentation portal (Next.js / Fumadocs)
│   ├── playground/              # Rapid component & theme sandbox (Vite + React)
│   └── test-consumer/           # External consumer simulation app (Next.js App Router)
│
├── packages/                    # Publishable & internal packages
│   └── react/                   # Core Chellaa React library (@chellaa/react)
│
├── docs/                        # Architecture & foundation documentation
│   └── foundation/              # Phase 1 architectural documents (01 to 06)
│
├── package.json                 # Monorepo root manifest
├── pnpm-workspace.yaml          # pnpm workspace definition
├── turbo.json                   # Turborepo task graph & caching pipeline
├── tsconfig.base.json           # Shared strict TypeScript configuration
└── .gitignore
```

### 2.1 Monorepo Tooling Rationale

1. **pnpm Workspaces:** Provides strict dependency resolution via content-addressable storage, preventing phantom dependencies and symlink issues common in npm/yarn.
2. **Turborepo:** Offers high-speed incremental builds with local and remote computational caching. Tasks (`build`, `test`, `lint`, `typecheck`) execute concurrently with topological dependency tracking.
3. **Changesets:** Automates semantic versioning (SemVer), changelog generation, and automated npm releases across packages.

---

## 3. Core React Package Architecture (`packages/react`)

The primary library package lives in `packages/react`. It maintains strict separation of concerns across internal layers:

```
packages/react/
├── src/
│   ├── components/              # UI Components (Button, Input, Card, Dialog, etc.)
│   ├── theme/                   # Theme engine, tokens, ThemeProvider, useTheme
│   ├── hooks/                   # Reusable utility hooks (useId, useControllableState)
│   ├── utils/                   # DOM utilities, class-name helpers, assertions
│   ├── types/                   # Shared TypeScript definitions & polymorphic helpers
│   ├── styles/                  # Global CSS resets, token variables, theme layers
│   │   ├── tokens.css           # Raw CSS custom property scales
│   │   ├── theme.css            # Semantic token mapping for light/dark modes
│   │   ├── reset.css            # Scoped CSS box-sizing & font resets
│   │   └── index.css            # Root master stylesheet bundle
│   └── index.ts                 # Master public API entry point
│
├── dist/                        # Compiled production artifacts (ESM, CJS, Types, CSS)
├── package.json                 # Package manifest with modern export maps
├── tsconfig.json                # Library TypeScript compiler configuration
├── tsup.config.ts               # High-performance tsup bundler configuration
└── README.md
```

---

## 4. Component File Architecture Standard

Every component in Chellaa React follows an isolated, predictable, collocated folder structure:

```
Component/
├── Component.tsx                # React component implementation & ref forwarding
├── Component.types.ts           # Component prop interfaces, variants & event types
├── Component.styles.css         # Scoped component CSS referencing CSS variables
├── Component.test.tsx           # Unit, accessibility (axe-core), and keyboard tests
├── Component.stories.tsx        # Storybook visual permutations & documentation stories
└── index.ts                     # Component-level barrel export
```

### 4.1 Evaluation of Collocated Architecture

- **Scalability (10/10):** A developer or AI agent can inspect, maintain, or refactor a component within a single directory without navigating across distant folders.
- **Maintainability (10/10):** All assets (types, styles, unit tests, stories) live together. Deleting or refactoring a component is a clean, single-folder operation.
- **Testing Ergonomics (10/10):** Tests sit alongside the component, ensuring high code coverage and instantaneous test execution during TDD.
- **Clear Public Boundaries (10/10):** The collocated `index.ts` strictly exports only public symbols, hiding internal implementation helpers from the rest of the monorepo.

---

## 5. Public API Architecture

Chellaa React enforces strict public/private module boundaries.

### 5.1 Named Exports at Root Entry Point

Consumers consume components, hooks, and types directly from the root package:

```tsx
import {
  Button,
  type ButtonProps,
  ThemeProvider,
  useTheme,
  createTheme,
} from "@chellaa/react";
```

### 5.2 Package Export Map (`package.json`)

The `package.json` defines clean modern conditional exports:

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
  }
}
```

- **Style Delivery Contract:** The primary package export (`"."`) delivers both the component code and its associated styling automatically upon import. The `"./styles.css"` export is maintained solely as an optional standalone stylesheet for non-bundler setups or static CSS extraction, but is **never required** for normal consumer usage.
- **Encapsulation:** Consumers cannot import internal files like `@chellaa/react/src/utils/dom.js`. This preserves our ability to refactor internals without breaking consumer code.
- **Tree-Shaking:** `"sideEffects": ["*.css", "**/*.css"]` informs bundlers that all JavaScript code is pure and eligible for aggressive dead-code elimination while preserving required component CSS imports.

---

## 6. Dependency Strategy

Chellaa React enforces a **Zero-Bloat Runtime Policy**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Dependency Classification                       │
├────────────────────┬───────────────────────────────────────────────────┤
│ Type               │ Packages & Strategy                               │
├────────────────────┼───────────────────────────────────────────────────┤
│ Peer Dependencies  │ react: ">=18.2.0", react-dom: ">=18.2.0"          │
│ Runtime Dep Policy │ Target ZERO unnecessary dependencies.             │
│                    │ No Emotion, no styled-components, no Lodash,      │
│                    │ no moment.js, no clsx (native class helpers).     │
│ Headless Utilities │ Isolated, vetted micro-primitives only where      │
│                    │ mathematical precision is essential               │
│                    │ (e.g., @floating-ui/react for popover math).      │
│ Dev Dependencies   │ tsup, TypeScript, Vitest, Testing Library,        │
│                    │ axe-core, LightningCSS, PostCSS, ESLint, Prettier.│
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 7. Build & Distribution Architecture

The build pipeline compiles TypeScript and CSS into production-ready artifacts using **tsup** (powered by esbuild):

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Production Build Pipeline                       │
├────────────────────────────────────────────────────────────────────────┤
│ 1. TypeScript Compilation (tsup)                                       │
│    • Output ESM: dist/index.mjs (Target: es2022)                       │
│    • Output CJS: dist/index.cjs (Target: es2020)                       │
│    • Emit Type Declarations: dist/index.d.ts + dist/index.d.ts.map     │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 2. CSS Compilation & Minification (LightningCSS)                       │
│    • Concatenate token variables, theme layers, component stylesheets │
│    • Apply standard autoprefixing and clean structural minification    │
│    • Output: dist/styles.css                                           │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 3. Quality Verification (CI Gates)                                     │
│    • Type linting via @arethetypeswrong/cli (attw)                     │
│    • Bundle size verification via size-limit                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Documentation Application Architecture (`apps/docs`)

The documentation application is a separate Next.js web application residing in `apps/docs`. It imports `@chellaa/react` via local pnpm workspace linking (`"@chellaa/react": "workspace:*"`).

### 8.1 Information Architecture

- **Home:** Hero presentation, value proposition, live interactive showcases.
- **Getting Started:** Installation guides (Next.js, Vite, Remix), CSS setup, quick start.
- **Foundations:** Design philosophy, Design tokens, Color ramps, Typography scale, Spacing grid, Elevation, Motion.
- **Components:** Interactive documentation for every component with live prop sandboxes, code previews, API tables, and keyboard accessibility guides.
- **Customization:** ThemeProvider setup, `createTheme()` guide, CSS variable overrides, multi-brand theming.
- **Accessibility:** WCAG compliance matrix, keyboard navigation patterns, screen reader testing notes.
- **Changelog:** Automated release history and migration guides.

---

## 9. Playground Application Architecture (`apps/playground`)

The playground application in `apps/playground` is an ultra-fast **Vite + React** sandbox designed for rapid internal engineering:

- **Instant HMR:** Hot Module Replacement updates component changes in milliseconds.
- **Token Stress-Testing:** Interactive sliders and inputs allowing engineers to tweak CSS variables live to verify layout resilience.
- **A11y Inspector:** Integrated automated accessibility audits in the browser console.
- **Responsive Staging:** Multi-viewport iframe containers to test mobile, tablet, and desktop breakpoints simultaneously.

---

## 10. Consumer Validation Application (`apps/test-consumer`)

The `apps/test-consumer` application simulates a real-world external consumer project. It acts as an automated regression firewall before any release:

- **Packaging Realism:** Can consume the packaged library via `npm pack` tarball to test exact production bundle behavior.
- **Framework Diversity:** Tests Next.js App Router (Server Components + Client Components) and pure Vite SPAs.
- **Verification Gates:**
  1. Verifies that `import { Button } from "@chellaa/react"` resolves cleanly without type errors.
  2. Verifies that importing `{ Button }` from `@chellaa/react` automatically renders fully styled components without requiring manual import of `"@chellaa/react/styles.css"`.
  3. Verifies zero FOUC during SSR page loads.
  4. Verifies zero hydration mismatch warnings in the browser console.
  5. Verifies that dead-code components are not included in the consumer's production build.

---

## 11. Architecture Decision Records (ADRs)

```
┌────────────────────────────────────────────────────────────────────────┐
│                     Architecture Decision Records                      │
├─────────┬───────────────────────────────┬────────────┬─────────────────┤
│ ADR ID  │ Architecture Decision         │ Status     │ Target Area     │
├─────────┼───────────────────────────────┼────────────┼─────────────────┤
│ ADR-001 │ Scoped Static CSS + CSS Vars  │ Finalized  │ Styling         │
│ ADR-002 │ CSS Variable Runtime Theming  │ Finalized  │ Theme Engine    │
│ ADR-003 │ pnpm Workspaces + Turborepo   │ Finalized  │ Monorepo Ops    │
│ ADR-004 │ React 18.2+ / React 19 Target │ Finalized  │ Framework       │
│ ADR-005 │ Collocated Component Folders  │ Finalized  │ Component Arch  │
│ ADR-006 │ tsup Dual ESM/CJS Pipeline    │ Finalized  │ Build & Release │
│ ADR-007 │ Zero-Config Styling Delivery  │ Finalized* │ CSS Delivery    │
└─────────┴───────────────────────────────┴────────────┴─────────────────┘
*Note: Public API is finalized (zero manual CSS import); internal delivery mechanism is under Phase 2 investigation.
```

### ADR-001: Component Styling Architecture

- **Decision:** Use Scoped Static CSS with Semantic CSS Custom Properties and standard namespacing (`.cl-` prefix) wrapped in CSS `@layer cl-components`.
- **Why It Matters:** Eliminates 100% of runtime JavaScript styling overhead, guarantees full React 18/19 Server Components compatibility, and provides zero-config consumer adoption.
- **Status:** Finalized.

### ADR-002: Theme Architecture & Runtime Switching

- **Decision:** Drive themes via `data-theme="light|dark|custom"` on the DOM root, backed by an SSR `<ThemeScript />` inline injection for zero-flash FOUC prevention.
- **Why It Matters:** Enables O(1) theme switching without React virtual DOM re-renders.
- **Status:** Finalized.

### ADR-003: Monorepo Architecture & Tooling

- **Decision:** Adopt pnpm workspaces with Turborepo task caching and Changesets release management.
- **Why It Matters:** Ensures deterministic dependency resolution, rapid CI build caching, and automated semantic versioning.
- **Status:** Finalized.

### ADR-004: React Baseline Targets

- **Decision:** Support React >=18.2.0 and React 19.x.
- **Why It Matters:** Leverages React 18's native `useId` and concurrent features while preparing forward-compatible ref-handling for React 19.
- **Status:** Finalized.

### ADR-005: Component File Organization & Public API Strategy

- **Decision:** Collocate component code, types, styles, unit tests, and stories inside a dedicated folder with an internal `index.ts`, exposed exclusively via the root package entry point.
- **Why It Matters:** Maximizes maintainability and protects private implementation details from consumer leakage.
- **Status:** Finalized.

### ADR-006: Build & Distribution Pipeline

- **Decision:** Use `tsup` for ESM/CJS compilation and LightningCSS for static stylesheet bundling, with `"sideEffects": ["*.css", "**/*.css"]`.
- **Why It Matters:** Ensures optimal tree-shaking, sub-millisecond compile times, and complete TypeScript declaration maps.
- **Status:** Finalized.

### ADR-007: Zero-Configuration Styling Delivery

- **Decision:** Chellaa React owns the delivery of component styling. Consumers receive styled components directly via `import { Button } from "@chellaa/react"` without manually importing a global stylesheet.
- **Why It Matters:** Eliminates consumer setup friction, prevents unstyled component bugs, and aligns with the Zero-Friction vision.
- **Status:** Finalized (Public API); Internal Delivery Mechanism Under Investigation.

---

## 12. Cross-Document Validation Matrix

This matrix confirms architectural consistency across all six foundation documents:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Cross-Document Consistency Review                    │
├────────────────────┬───────────────────────────────────────────────────┤
│ Verification Path  │ Consistency Proof                                 │
├────────────────────┼───────────────────────────────────────────────────┤
│ Vision             │ Zero-runtime performance and accessibility stated │
│   ↓ Requirements   │ in 01-vision are codified as strict measurable    │
│                    │ requirements in 02-requirements (WCAG 2.2 AA).    │
├────────────────────┼───────────────────────────────────────────────────┤
│ Requirements       │ Semantic colors, 4px grid, and touch targets in   │
│   ↓ Design System  │ 03-design-system directly satisfy WCAG contrast   │
│                    │ and target size constraints from 02-requirements. │
├────────────────────┼───────────────────────────────────────────────────┤
│ Design System      │ Token hierarchy in 03-design-system maps 1:1 into │
│   ↓ Styling Arch   │ CSS custom properties in 04-styling-architecture  │
│                    │ without runtime JavaScript interpolation.         │
├────────────────────┼───────────────────────────────────────────────────┤
│ Styling Arch       │ CSS variable model in 04-styling-architecture is  │
│   ↓ Theme Arch     │ the exact engine used by ThemeProvider in         │
│                    │ 05-theme-architecture for O(1) theme switching.   │
├────────────────────┼───────────────────────────────────────────────────┤
│ Theme Arch         │ Zero-config consumer standard and pure package    │
│   ↓ Library Arch   │ exports in 06-library-architecture enforce the    │
│                    │ single CSS file and ThemeScript patterns from 05. │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 13. Open Decisions for Future Investigation

The following technical decisions are intentionally documented as open investigations to be resolved in subsequent engineering phases:

### Open Decision 1: Headless Overlay Math Engine

- **Context:** Complex floating components (`Tooltip`, `Popover`, `Menu`, `Select`) require viewport collision detection, flip logic, and arrow positioning math.
- **Options:**
  1. Author proprietary lightweight collision hooks.
  2. Adopt `@floating-ui/react` as an internal runtime dependency.
- **Trade-offs:** Proprietary hooks reduce external dependencies to zero, but `@floating-ui/react` solves edge-case viewport math (virtual scrolling, nested scrolling, iframes) with years of battle-testing.
- **Recommended Next Step:** Benchmark `@floating-ui/react` bundle overhead (< 5KB) in Phase 4 against custom lightweight alternatives.

### Open Decision 2: Internal CSS Delivery Mechanism & Granularity Model

- **Context:** While the public API contract is finalized (consumers never manually import stylesheets), Chellaa React must determine the optimal internal delivery mechanism (e.g., component-level static side-effect imports vs. unified entry-point bundling) that guarantees compatibility across Next.js (App Router RSC), Vite SPA, Remix, and Node.js CJS without CSS duplication or ordering anomalies.
- **Options:**
  1. Component-level static side-effect imports (`import "./Button.css"` in ESM modules) with `"sideEffects": ["*.css", "**/*.css"]`.
  2. Entry-point automated CSS bundling with conditional package exports.
  3. Dual automated delivery with a standalone `dist/styles.css` fallback export.
- **Trade-offs:** Component-level side-effect imports optimize tree-shaking and CSS bundle sizes, but require careful handling in non-bundler Node.js CommonJS environments.
- **Recommended Next Step:** Benchmark candidate delivery mechanisms in Phase 2 across Next.js App Router, Vite SPA, Remix, and Jest before authoring components. Tracked in ADR-007.

### Open Decision 3: Icon Ecosystem Packaging

- **Context:** Components often require internal default icons (e.g., checkmark in Checkbox, chevron in Select, spinner in Button).
- **Options:**
  1. Embed minimal inline SVGs directly inside primitive components.
  2. Create an internal `@chellaa/icons` package and link it via workspace.
- **Trade-offs:** Inline SVGs eliminate external package dependencies; an icon package allows consumers to reuse the icons for their own application UI.
- **Recommended Next Step:** Use minimal inline SVGs for Phase 4 core components, and evaluate `@chellaa/icons` as an independent Horizon 3 package.

---

## 14. Authoritative Answers to the 18 Foundation Questions

### 1. What is Chellaa React?

Chellaa React is a production-grade, accessible, high-performance React component library and design system engine built with zero-runtime CSS custom properties, strict TypeScript, and uncompromising WCAG 2.2 AA / WAI-ARIA standards.

### 2. Who is it for?

It is engineered for React and TypeScript developers, frontend product teams, and design-system platform engineers building enterprise web apps, SaaS dashboards, and multi-brand platforms.

### 3. What problems does it solve?

It eliminates the heavy JavaScript runtime overhead of legacy CSS-in-JS libraries, eliminates the unstyled boilerplate burden of raw headless primitives, prevents the governance decay of copy-paste snippet libraries, and provides zero-re-render dark mode with zero FOUC during SSR.

### 4. What are its goals and non-goals?

- **Goals:** Out-of-the-box WCAG 2.2 AA accessibility, zero-runtime styling overhead, sub-millisecond dark/light theming, flawless React 18/19 SSR/RSC compatibility, strict TypeScript inference, and zero-config consumer DX.
- **Non-Goals:** It is not an all-in-one application template, not a heavy charting suite, not a multi-framework tool, and will not support obsolete browsers (IE11).

### 5. What are the core product and technical requirements?

- React >= 18.2.0 and React 19.x support.
- Strict TypeScript 5+ with exported interfaces and clean generics.
- Modern evergreen browser baseline (Chrome, Firefox, Safari 15.4+, Edge).
- WCAG 2.2 Level AA compliance with full keyboard navigation and focus management.
- Zero runtime JavaScript styling overhead with deterministic SSR hydration.
- Zero-config consumer experience (`import { Button } from "@chellaa/react"`).

### 6. What is the design-token architecture?

A three-tier hierarchy:

1. **Primitive Tokens:** Raw values (`--cl-palette-blue-600`, `--cl-space-4`).
2. **Semantic Tokens:** Context-aware values (`--cl-color-primary-base`, `--cl-color-bg-canvas`).
3. **Component Tokens:** Scoped component properties (`--cl-button-primary-bg`).

### 7. How will React component styling work?

Via **Scoped Static CSS with Semantic CSS Custom Properties**. Styles are authored in scoped component stylesheets (`.cl-` namespace) and protected from specificity battles via CSS `@layer cl-components`. Crucially, component styling is delivered automatically upon component import without requiring consumers to manually import a global stylesheet.

### 8. How will themes work?

Themes represent structured token configurations mapped directly to CSS variables. Changing themes updates the CSS variables on the root container, allowing the browser's native C++ rendering engine to update visuals instantaneously.

### 9. How will light/dark/system modes work?

A DOM attribute (`data-theme="light"` or `data-theme="dark"`) on `<html>` dynamically swaps semantic CSS variable mappings. System preference is detected and reactively synchronized via `window.matchMedia('(prefers-color-scheme: dark)')`.

### 10. How will consumers customize the library?

1. Globally via CSS custom property overrides in stylesheets or `<ThemeProvider theme={customTheme}>`.
2. Locally via container attributes (`data-theme="dark"`) or inline `style={{ '--cl-color-primary-base': '...' }}`.
3. Structurally via predictable class hooks (`.cl-button`) and the `asChild` composition slot.

### 11. How will the npm package be structured?

Published as `@chellaa/react` where the primary export (`"."`) delivers both component code and styling automatically. A standalone `dist/styles.css` is maintained as an optional export for static asset extraction or non-bundler setups, but is never required for normal usage. Package includes ESM (`dist/index.mjs`), CJS (`dist/index.cjs`), TypeScript declarations (`dist/index.d.ts`), and `"sideEffects": ["*.css", "**/*.css"]`.

### 12. How will React components be organized internally?

Each component is collocated in an isolated directory:
`Component/{Component.tsx, Component.types.ts, Component.styles.css, Component.test.tsx, Component.stories.tsx, index.ts}`.

### 13. How will the library support SSR?

Zero direct browser API access during render passes, deterministic DOM IDs via React 18 `useId()`, and an inline `<ThemeScript />` in `<head>` that synchronizes the initial theme before first paint to eliminate FOUC and hydration mismatches.

### 14. How will tree shaking work?

The package is authored as pure ES modules with `"sideEffects": ["*.css", "**/*.css"]`. Bundlers eliminate unused component exports completely, bundling only the imported components and their styles.

### 15. How will the documentation application relate to the React package?

Resides in `apps/docs` within the monorepo, consuming `@chellaa/react` via local workspace dependencies (`workspace:*`). It provides live component previews, interactive token playgrounds, API tables, and accessibility guides.

### 16. How will the playground relate to the React package?

Resides in `apps/playground` as a lightweight Vite + React app linked to the local workspace package, offering instant Hot Module Replacement for rapid prototyping, token stress-testing, and responsive viewport testing.

### 17. How will a real external consumer validate the package?

Via `apps/test-consumer`, an automated test application simulating an external consumer. It builds against `npm pack` tarballs in Next.js App Router and Vite to validate real-world installation, bundling, tree-shaking, typing, zero-configuration automatic styling delivery, and zero-FOUC SSR rendering.

### 18. What architectural decisions still need to be resolved?

Three targeted investigations documented in Section 13:

1. Benchmarking `@floating-ui/react` vs. proprietary lightweight overlay math hooks.
2. Internal CSS delivery mechanism benchmarking across Next.js App Router, Vite, Remix, and Node CJS (ADR-007).
3. Inline SVGs vs. an independent `@chellaa/icons` package.

---

## 15. Conclusion & Next Phase Gate

Phase 1 (Foundation) is officially complete. All architectural foundations, token structures, styling engines, theme lifecycles, and package topologies are comprehensively specified without a single premature component implementation.

The project is now prepared to advance to:
**Phase 2 — Engineering Standards**
_(TypeScript configs, ESLint/Prettier rules, Testing harnesses with Vitest/axe-core, and CI/CD quality gates)._
