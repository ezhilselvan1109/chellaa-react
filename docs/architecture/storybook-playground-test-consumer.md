# Chellaa React — Tripartite Validation Separation: Storybook, Playground & Test Consumer

## Document 07: Clear Isolation of Interactive & Distribution Environments

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Target Package:** `@chellaa/react`  
**Governing Standard:** Component Validation Architecture & Phase 2 Engineering Standards

---

## 1. Executive Summary & Non-Negotiable Separation Rule

A critical pitfall in modern component library engineering is conflating developer inspection, application testing, and packaging verification into a blurry, redundant continuum.

To guarantee engineering velocity and flawless consumer distribution, **Chellaa React** enforces a strict tripartite boundary:

```text
       Storybook (apps/storybook)
                   │
                   ▼
  Isolated Component Visual & Interaction
                   │
                   ├─────────────────────────────────────────┐
                   │                                         │
                   ▼                                         ▼
      Playground (apps/playground)               Test Consumer (apps/test-consumer)
                   │                                         │
                   ▼                                         ▼
   Real Application Composition & UX            Distribution & Packaging Artifact Firewall
```

**Non-Negotiable Rule:** Never treat these environments as interchangeable. Each answers a fundamentally different engineering question.

---

## 2. Tripartite Responsibility Matrix

| Dimension                   | Storybook (`apps/storybook`)                                                                 | Playground (`apps/playground`)                                                                                     | Test Consumer (`apps/test-consumer`)                                                                                          |
| :-------------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Primary Question**        | _"Does the component look, render, and behave properly in isolation across all its states?"_ | _"How does the component integrate into a real user-facing application with complex state, routing, and layouts?"_ | _"Will the published npm package artifact install and execute cleanly in diverse consumer runtimes without runtime crashes?"_ |
| **Target Audience**         | Design system engineers, UI reviewers, UX designers                                          | Feature engineers, internal consumers experimenting with patterns                                                  | Release engineers, CI automated packaging verification pipelines                                                              |
| **Input Source**            | Workspace source code (`packages/react/src`)                                                 | Workspace linked package (`@chellaa/react`)                                                                        | Packaged distribution artifacts (`dist/` & `npm pack` tarball)                                                                |
| **Execution Mode**          | Visual component canvas with interactive knobs & controls                                    | Interactive full-page web application                                                                              | Headless Node.js scripts & automated packaging test runner                                                                    |
| **Execution Trigger**       | Local dev (`pnpm dev`) & CI static build (`pnpm build`)                                      | Local dev (`pnpm dev`) & CI application build (`pnpm build`)                                                       | CI release gate & pre-publish verification (`pnpm test`)                                                                      |
| **Duplication Prohibition** | Do NOT run exhaustive unit tests or simulate full app page flows                             | Do NOT assert npm exports or duplicate unit-level prop matrices                                                    | Do NOT duplicate Storybook UI knobs or manual visual inspection                                                               |

---

## 3. Storybook (`apps/storybook`)

### 3.1 Mandate & Architectural Scope

- Operates on individual component stories (`*.stories.tsx`) using Component Story Format 3 (CSF 3).
- Provides an isolated browser environment where components render free from parent app stylesheets, conflicting reset styles, or routing side-effects.
- Allows interactive exploration of props through Storybook controls (`args`).
- Visualizes edge-case states: disabled states, loading spinners, long truncation, and right-to-left layout.
- Provides theme switching between `@chellaa/tokens` light and dark modes.

### 3.2 What Belongs in Storybook

- Individual stories for each canonical variant: `Default`, `Primary`, `Secondary`, `Sizes`, `Disabled`, `Loading`, `WithIcons`, `AsChild`, `ThemeOverrides`.
- Interaction stories (`play` functions) strictly for demonstrating UI state transitions (e.g. clicking a toggle button or opening a menu).
- Responsive viewport toggles.

### 3.3 What MUST NOT Exist in Storybook

- **Zero Exhaustive Unit Testing:** Automated a11y tests, keyboard keymap assertions, and double-click event guards belong in `*.test.tsx` (Vitest), not repeated in Storybook.
- **Zero Package Resolution Testing:** Storybook consumes source via Vite aliases. It cannot validate whether `exports` in `package.json` resolve correctly.
- **Zero Complex Application Architecture:** Do not build multi-step checkouts or full application shells in Storybook.

---

## 4. Playground (`apps/playground`)

### 4.1 Mandate & Architectural Scope

- A standalone Vite + React SPA that mimics a realistic end-user web application consuming `@chellaa/react`.
- Serves as the primary sandbox where developers compose multiple components together in realistic scenarios: forms, data tables, modals, toolbars, and responsive page headers.
- Employs application-level state management (forms, async network requests, toasts).

### 4.2 What Belongs in the Playground

- Real-world layouts: navigation sidebars, app headers, settings panels, dashboard cards.
- Live composition: `ButtonGroup` inside a table toolbar, form submission buttons handling actual async promises, buttons with icons in responsive containers.
- Theme switching applied at the application root (`data-theme="light"` / `data-theme="dark"`).
- Interactive parameter playground allowing real-time variant toggling in a live application context.

### 4.3 What MUST NOT Exist in the Playground

- **Zero Unit / Automated Assertions:** Do not write test assertion libraries or test runners inside the playground.
- **Zero Component Source Duplication:** Components must be imported exclusively from `@chellaa/react`. Never copy component source files into `apps/playground/src`.
- **Zero Distribution Validation:** The playground runs on hot-module reloading (HMR) and workspace symlinks; it does not test compiled tarball integrity.

---

## 5. Test Consumer (`apps/test-consumer`)

### 5.1 Mandate & Architectural Scope

- The distribution firewall. It validates **ONLY** the compiled artifacts output by the build process (`dist/`) and the archive generated by `npm pack`.
- Executes headless across different JavaScript runtimes and module resolution environments.
- Ensures zero regressions for external consumers across diverse toolchains.

### 5.2 The 5 Mandatory Test Consumer Gates

1. **Node ESM Resolution (`benchmark-node-esm.mjs`):**
   - Validates that `import { Button } from "@chellaa/react"` resolves cleanly in Node under `"type": "module"`.
   - Confirms subpath exports like `@chellaa/react/theme` and `@chellaa/react/tokens`.
2. **Node CommonJS Require (`benchmark-node-cjs.cjs`):**
   - Validates that `const { Button } = require("@chellaa/react")` executes without throwing `SyntaxError: Unexpected token '.'` caused by raw CSS imports.
   - Enforces dual module compatibility.
3. **Server-Side Rendering (SSR) (`benchmark-ssr.mjs`):**
   - Validates `renderToString(<Button>SSR Test</Button>)` in a pure headless Node environment.
   - Proves zero illegal references to `window`, `document`, or `navigator` during server compilation.
4. **CSS Stylesheet Delivery Integrity (`benchmark-css.mjs`):**
   - Verifies the compiled CSS bundle (`dist/index.css`) contains all required CSS layers (`@layer cl-tokens`, `@layer cl-theme`, `@layer cl-components`).
   - Ensures CSS tokens and component classes are bundled and accessible.
5. **NPM Package Archive Integrity (`benchmark-pack.mjs`):**
   - Runs `npm pack --json --dry-run` to inspect the tarball payload.
   - Guarantees that only distribution files (`dist/`, `README.md`, `package.json`, `LICENSE`) are packaged.
   - Proves zero test files (`*.test.tsx`), stories (`*.stories.tsx`), or internal dev files leak into the published npm registry tarball.

### 5.3 What MUST NOT Exist in Test Consumer

- **Zero Visual Inspection:** No browsers or visual rendering tools are launched in test-consumer.
- **Zero Source Code Imports:** Never import from `../../packages/react/src`. Any import bypassing `dist/` violates the distribution firewall.

---

## 6. Execution & Verification Commands

```bash
# 1. Component Visual Inspection & Storybook Validation
pnpm --filter @chellaa/storybook dev      # Launch isolated storybook dev server
pnpm --filter @chellaa/storybook build    # Verify static production build

# 2. Real Application Experimentation
pnpm --filter @chellaa/playground dev     # Launch real app sandbox
pnpm --filter @chellaa/playground build   # Verify application compilation

# 3. Distribution & Packaging Firewall Validation
pnpm --filter @chellaa/react build        # Compile production bundle
pnpm --filter @chellaa/test-consumer test # Execute all 5 packaging gates
```

---

## 7. Architectural Decision on Storybook Location

### Evaluation: Option A (Docs Integration) vs Option B (Standalone Application)

- **Option A (Storybook inside `apps/docs`):** Bundling Storybook directly into the documentation portal couples consumer-facing documentation with internal engineering development tools. This bloats doc builds, slows down documentation content iteration, and blurs audience boundaries.
- **Option B (Dedicated `apps/storybook`):** Maintains strict separation of concerns. `apps/docs` remains a clean, customer-focused education site with tailored code guides and tutorials, while `apps/storybook` remains a dedicated, lightning-fast component workbench for UI engineers.

**Decision:** Option B is selected and enforced.

---

## 8. Summary & Certification

The boundaries between Storybook, Playground, and Test Consumer are unambiguous, strictly separated, and fully verified for Component 01 (`Button` + `ButtonGroup`).
