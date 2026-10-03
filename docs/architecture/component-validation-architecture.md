# Chellaa React — Component Validation Architecture

## Document 06: Multi-Tier Component Validation & Environment Taxonomy

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Phase:** 16 — Component Validation Architecture  
**Target Package:** `@chellaa/react`  
**Governing Standard:** Phase 2 Engineering Standards & ADR-007

---

## 1. Executive Summary & Purpose

A production-grade component library cannot treat every environment as a generic "testing environment". When environments blur their boundaries, teams suffer from redundant test suites, brittle CI pipelines, and untested distribution artifacts.

In **Chellaa React**, each environment has a distinct, non-overlapping mandate:

```text
.test.tsx
    ↓
Automated Behavioral & Accessibility Verification (Vitest + axe)

.stories.tsx
    ↓
Isolated State & Visual Showcase Definitions (CSF 3)

apps/storybook
    ↓
Isolated Component Visual & Interaction Validation (Storybook 8)

apps/playground
    ↓
Real Application Experimentation & Composition (Vite SPA)

apps/test-consumer
    ↓
NPM Package & Distribution Artifact Firewall (Node ESM/CJS/SSR/Tarball)

apps/docs
    ↓
Consumer Education, API Guides & Live Interactive Samples
```

---

## 2. Environment Responsibility Matrix

```
┌──────────────────────┬──────────────────────────────────────┬────────────────────────────────────┬──────────────────────────────────────┐
│ Environment          │ Primary Purpose                      │ Primary Question                   │ Execution Command                    │
├──────────────────────┼──────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────────┤
│ 1. *.test.tsx        │ Automated behavior, a11y, keymap     │ "Does the component behave         │ pnpm test                            │
│                      │ unit testing (Vitest, axe-core)      │ correctly under all conditions?"   │                                      │
├──────────────────────┼──────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────────┤
│ 2. *.stories.tsx     │ Standard CSF 3 state permutations    │ "What states and usage examples    │ Evaluated by Storybook & Docs        │
│                      │ and visual catalog definitions       │ should developers inspect?"        │                                      │
├──────────────────────┼──────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────────┤
│ 3. apps/storybook    │ Isolated component inspection,       │ "Does the component look & feel    │ pnpm --filter @chellaa/storybook dev │
│                      │ args control, theme swapping         │ right in total isolation?"         │ pnpm --filter @chellaa/storybook bld │
├──────────────────────┼──────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────────┤
│ 4. apps/playground   │ Real-world application composition,  │ "How does the component behave in  │ pnpm --filter @chellaa/playground dev│
│                      │ layouts, forms, and workflows        │ a real consumer application?"      │ pnpm --filter @chellaa/playground bld│
├──────────────────────┼──────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────────┤
│ 5. apps/test-consumer│ Distribution artifact & packaging    │ "Will the built npm package work   │ pnpm --filter @chellaa/test-consumer │
│                      │ firewall (ESM, CJS, SSR, tarball)    │ seamlessly for all consumers?"     │ test                                 │
├──────────────────────┼──────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────────┤
│ 6. apps/docs         │ Consumer education, API reference,   │ "How does a developer learn,       │ pnpm --filter @chellaa/docs dev      │
│                      │ install guides, and migration notes  │ install, and adopt Chellaa?"       │ pnpm --filter @chellaa/docs build    │
└──────────────────────┴──────────────────────────────────────┴────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 3. Detailed Environment Mandates

### 3.1 Unit & Accessibility Testing (`*.test.tsx`)

- **Location:** Collocated with component (`packages/react/src/components/<Component>/<Component>.test.tsx`).
- **Tools:** `vitest`, `@testing-library/react`, `@testing-library/user-event`, `vitest-axe`.
- **Mandate:**
  - Automated verification of 12 dimensions: DOM rendering, prop variants, spatial sizes, semantic color ramps, disabled guards, loading states, directional icons, `asChild` slot delegation, keyboard keymap (Tab, Shift+Tab, Enter, Space), ref forwarding, event handlers, and `axe-core` accessibility.
  - Zero manual inspection required; runs headless in CI.
- **Anti-Pattern:** Never duplicate visual aesthetic assertions here; test behavior, semantics, and attributes.

### 3.2 Component Stories (`*.stories.tsx`)

- **Location:** Collocated with component (`packages/react/src/components/<Component>/<Component>.stories.tsx`).
- **Format:** Component Story Format 3 (CSF 3) with full `argTypes` controls.
- **Mandate:**
  - Defines visual permutations: `Default`, `AllVariants`, `AllSizes`, `ColorSchemes`, `Disabled`, `Loading`, `WithIcons`, `FullWidth`, `AsChild`, `LightTheme`, and `DarkTheme`.
  - Serves as the declarative data source for Storybook.
- **Anti-Pattern:** Do not treat stories as a substitute for automated Vitest test suites.

### 3.3 Storybook Application (`apps/storybook`)

- **Decision:** Separate application (`Option B`) chosen over docs integration to maintain strict separation between component-level engineering tools and consumer-facing learning portals.
- **Stack:** Storybook 8 with `@storybook/react-vite`.
- **Mandate:**
  - Provides interactive canvas, Storybook controls panel, background theme switcher, and responsive viewports.
  - Compiles to static distribution via `storybook build`.
- **Anti-Pattern:** Never test npm package resolution or published bundle behavior inside Storybook.

### 3.4 Application Playground (`apps/playground`)

- **Stack:** Vite + React SPA consuming `@chellaa/react` via workspace link.
- **Mandate:**
  - Simulates a real customer application using Chellaa React.
  - Tests multi-component composition: forms with async submission, toolbars with `ButtonGroup`, dialog trigger flows, and full layout contexts.
- **Anti-Pattern:** Do not place unit tests or assertions in the playground; it is an exploratory workbench.

### 3.5 Test Consumer Firewall (`apps/test-consumer`)

- **Stack:** Node.js multi-module test harness consuming compiled `dist/` and `npm pack` tarball artifacts.
- **Mandate:**
  1. **Node ESM Resolution:** Verifies pure ES module import without syntax errors.
  2. **Node CommonJS Require:** Verifies `require("@chellaa/react")` without raw CSS syntax crash (`SyntaxError: Unexpected token '.'`).
  3. **Server-Side Rendering (SSR):** Verifies `renderToString` with zero `window`/`document` access and proper hydration markup.
  4. **CSS Stylesheet Integrity:** Verifies `@layer cl-tokens`, `@layer cl-theme`, `@layer cl-reset`, `@layer cl-components`, and semantic variables.
  5. **NPM Package Archive Integrity:** Inspects `npm pack` JSON manifest to ensure mandatory files exist and zero tests/stories/scratch files leak.
- **Anti-Pattern:** Never import directly from `packages/react/src`; must test compiled artifacts only.

### 3.6 Documentation Portal (`apps/docs`)

- **Stack:** Vite + React SPA providing the official consumer documentation site.
- **Mandate:**
  - Guides developers on installation, zero-configuration CSS delivery, copyable code snippets, props API tables, and WCAG accessibility notes.
  - Uses live `@chellaa/react` components for real-time visual samples.
- **Anti-Pattern:** Do not maintain separate story states here; consume clean reference code.

---

## 4. Anti-Duplication Principles

To prevent engineering fatigue and duplicated maintenance:

1. **Behavioral Testing belongs exclusively in `*.test.tsx`:** If a test asserts that clicking a disabled button does not fire `onClick`, it belongs in Vitest, NOT repeated across Storybook, Playground, and Test Consumer.
2. **Visual Inspection belongs in Storybook:** If an engineer wants to visually examine hover micro-interactions, focus rings, or color schemes side-by-side, they use Storybook.
3. **Application Workflows belong in Playground:** If verifying how a Button interacts with form validation and real React state, use the Playground.
4. **Distribution Safety belongs in Test Consumer:** If verifying whether the npm package works in CJS, ESM, and SSR environments, use the Test Consumer.

---

## 5. CI / CD Quality Gates

```text
               Pull Request / Commit
                        │
                        ▼
            pnpm --filter @chellaa/react typecheck
                        │
                        ▼
            pnpm format:check
                        │
                        ▼
            pnpm test (Unit & a11y: 95 tests)
                        │
                        ▼
            pnpm --filter @chellaa/react build
                        │
                        ▼
            pnpm --filter @chellaa/test-consumer test (5 gates)
                        │
                        ▼
            pnpm --filter @chellaa/react size
                        │
                        ▼
            pnpm --filter @chellaa/playground build
                        │
                        ▼
            pnpm --filter @chellaa/storybook build
                        │
                        ▼
            pnpm --filter @chellaa/docs build
                        │
                        ▼
                 All Gates Passed 🟢
```

---

## 6. Certification

The Component Validation Architecture is approved, documented, and fully operational across all 5 workspace applications for Component 01 (`Button` + `ButtonGroup`).
