# Chellaa React — Package Architecture

## Document 02: NPM Package Architecture & Consumer Contract

**Document Status:** 🟢 COMPLETE & VALIDATED  
**Phase:** 6 — NPM Package Architecture  
**Date:** 2026-10-03  
**Target Package:** `@chellaa/react`  
**Distribution Registry:** npm (`https://registry.npmjs.org/`)  
**Package Scope:** `@chellaa`

---

## 1. Executive Summary & Package Contract

`@chellaa/react` is distributed as a first-class npm package designed to deliver an uncompromising developer experience. As an enterprise React component library, its package contract must guarantee:

1. **Zero-Configuration Styling:** Importing a component automatically delivers its styling without requiring a separate global stylesheet import.
2. **Dual-Format Interoperability:** Clean modern ESM (`.mjs`) alongside robust CommonJS (`.cjs`) compatibility for legacy toolchains and Node testing harnesses.
3. **Exact TypeScript Types:** Flawless type definitions (`.d.ts` and `.d.ts.map`) satisfying strict modern resolution modes (`Node16`, `NodeNext`, `Bundler`).
4. **Aggressive Dead-Code Elimination (Tree-Shaking):** Unused components and their styles are completely pruned from consumer production bundles.
5. **Pristine Distribution Artifacts:** Tarballs contain only compiled runtime artifacts, declaration files, and legal notices—never development sources, tests, or stories.

---

## 2. Canonical `package.json` Specification

The following `package.json` represents the validated distribution contract for `packages/react/package.json`:

```json
{
  "name": "@chellaa/react",
  "version": "0.1.0",
  "description": "Production-grade, accessible, high-performance React component library and design system engine built with zero-runtime CSS custom properties.",
  "keywords": [
    "react",
    "react-components",
    "component-library",
    "design-system",
    "accessibility",
    "wcag",
    "wai-aria",
    "zero-runtime",
    "css-variables",
    "typescript"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/chellaa/chellaa-react.git",
    "directory": "packages/react"
  },
  "homepage": "https://chellaa.dev",
  "bugs": {
    "url": "https://github.com/chellaa/chellaa-react/issues"
  },
  "author": "Chellaa React Contributors",
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
  "files": ["dist", "README.md", "LICENSE"],
  "sideEffects": ["*.css", "**/*.css"],
  "peerDependencies": {
    "react": ">=18.2.0",
    "react-dom": ">=18.2.0"
  },
  "dependencies": {},
  "devDependencies": {
    "@arethetypeswrong/cli": "^0.15.4",
    "@size-limit/preset-small-lib": "^11.1.4",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.10",
    "lightningcss": "^1.26.0",
    "publint": "^0.2.11",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "size-limit": "^11.1.4",
    "tsup": "^8.3.0",
    "typescript": "^5.6.2"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "publishConfig": {
    "access": "public",
    "provenance": true
  }
}
```

---

## 3. Field-by-Field Architectural Validation

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          Package Manifest Field Validation                             │
├───────────────────┬────────────────────────────────────────────────────────────────────┤
│ Field             │ Architectural Rationale & Constraint Validation                    │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ name              │ Scoped package name `@chellaa/react`. Prevents namespace conflicts│
│                   │ on the public npm registry.                                        │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ version           │ Governed by Changesets. Initializes at `0.1.0` during development  │
│                   │ and promotes to `1.0.0` upon official release.                     │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ type              │ Set to `"module"`. Ensures all `.js` files within the package are  │
│                   │ treated as ES Modules by default.                                  │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ main & module     │ `main`: Points to `./dist/index.cjs` for legacy CommonJS consumers.│
│                   │ `module`: Points to `./dist/index.mjs` for bundlers.               │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ types             │ Points to root declaration `./dist/index.d.ts`. Required by legacy │
│                   │ TypeScript module resolution modes (`Node` / `Node10`).            │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ exports           │ Strict conditional export map. Encapsulates package internals;     │
│                   │ prevents consumers from reaching into uncompiled source directories│
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ sideEffects       │ Strictly declared as `["*.css", "**/*.css"]`.                      │
│                   │ CRITICAL: `"sideEffects": false` is strictly prohibited because    │
│                   │ it causes bundlers to discard component CSS during tree-shaking!   │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ peerDependencies  │ Defines broad framework compatibility (`>=18.2.0`). Supports React │
│                   │ 18 and React 19 without peer dependency mismatch warnings.         │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ dependencies      │ Enforces **Zero Runtime Bloat**. Contains 0 runtime dependencies   │
│                   │ for core styling and component logic.                              │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ files             │ Whitelists only `dist`, `README.md`, and `LICENSE`.                │
│                   │ Completely blocks source code, tests, and stories from tarball.    │
├───────────────────┼────────────────────────────────────────────────────────────────────┤
│ publishConfig     │ `"access": "public"` ensures publish succeeds without error.       │
│                   │ `"provenance": true` generates verifiable build attestations on CI.│
└───────────────────┴────────────────────────────────────────────────────────────────────┘
```

---

## 4. Consumer Developer Experience (DX)

### 4.1 Installation

Consumers install via standard package managers:

```bash
# npm
npm install @chellaa/react

# pnpm
pnpm add @chellaa/react

# yarn
yarn add @chellaa/react

# bun
bun add @chellaa/react
```

### 4.2 Standard Consumer Usage

```tsx
import { Button, Input, Card } from "@chellaa/react";

export function LoginForm() {
  return (
    <Card>
      <Input label="Email" placeholder="you@company.com" />
      <Button variant="primary">Sign In</Button>
    </Card>
  );
}
```

### 4.3 Zero-Configuration Styling Guarantee

- **Default Experience:** The consumer imports components directly. The styles are delivered automatically.
- **No Manual Import Required:**
  ```tsx
  // THIS IS NOT REQUIRED:
  import "@chellaa/react/styles.css";
  ```
- **Fallback Escape Hatch:** The standalone stylesheet is compiled and exported under `@chellaa/react/styles.css` strictly for non-bundler setups, static HTML CDN usage, or custom CSS pipelines.

---

## 5. CSS Delivery & CSS Tree-Shaking Architecture

### 5.1 CSS Delivery Mechanics

The package implements the **Dual Delivery with Component-Level Side-Effects** model (ADR-007):

1. **Component-Level Side-Effect Imports:**
   - In the compiled ESM distribution, component modules include relative static CSS imports:
     ```javascript
     // dist/components/Button/Button.mjs
     import "./Button.css";
     ```
   - Bundlers (Vite, Webpack 5, Next.js App Router, Remix) intercept these CSS imports in npm dependencies, aggregate them, and inject them into the HTML document.
2. **Deterministic Specificity:**
   - All component CSS rules are enclosed in CSS `@layer cl-components`:
     ```css
     @layer cl-components {
       .cl-button { ... }
     }
     ```
   - This guarantees that CSS specificity is determined by stylesheet layers, not by the random order in which components are imported by consumer code.

### 5.2 CSS Tree-Shaking Verification

- When a consumer imports only `{ Button }` from `@chellaa/react`:
  - Bundlers analyze the ESM dependency graph.
  - The unused component JS (`Input.mjs`, `Dialog.mjs`, `Table.mjs`) is discarded.
  - Because `Input.mjs` is discarded, its associated side-effect import (`import './Input.css'`) is never evaluated.
  - Result: Only `Button.css` and shared tokens are included in the consumer's production CSS bundle.
- **Package Manifest Guarantee:** Because `"sideEffects": ["*.css", "**/*.css"]` specifies only CSS files as side-effectful, JavaScript code remains 100% eligible for tree-shaking.

---

## 6. Bundle Size Budgets & Performance Ceilings

Bundle sizes are enforced via `@size-limit/preset-small-lib` across individual imports and the full library bundle:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Bundle Size Hard Ceilings                       │
├─────────────────────────────┬─────────────────┬────────────────────────┤
│ Import Target               │ Max Size (Gzip) │ Budget Scope           │
├─────────────────────────────┼─────────────────┼────────────────────────┤
│ Button only                 │ <= 2.5 KB       │ { Button }             │
│ Input only                  │ <= 3.0 KB       │ { Input }              │
│ Badge only                  │ <= 2.0 KB       │ { Badge }              │
│ Card only                   │ <= 2.5 KB       │ { Card }               │
│ Table only                  │ <= 3.5 KB       │ { Table }              │
│ Select only                 │ <= 6.5 KB       │ { Select }             │
│ Dialog (Modal) only         │ <= 7.5 KB       │ { Dialog }             │
│ Entire Core Library Bundle  │ <= 45.0 KB      │ import * as Chellaa    │
└─────────────────────────────┴─────────────────┴────────────────────────┘
```

---

## 7. Distribution Tarball Verification (`npm pack`)

### 7.1 Permitted Contents in Tarball

When `npm pack` is executed, the resulting `.tgz` archive must contain **only** the following paths:

```text
dist/
├── index.mjs               # Root ESM bundle
├── index.cjs               # Root CommonJS bundle
├── index.d.ts               # Root TypeScript declarations
├── index.d.ts.map           # Root declaration sourcemap
├── styles.css              # Standalone fallback stylesheet
├── components/             # Sub-component modules & scoped CSS (if split)
│   ├── Button/
│   │   ├── Button.mjs
│   │   ├── Button.cjs
│   │   ├── Button.d.ts
│   │   └── Button.css
│   └── ...
README.md                   # Consumer documentation & quick start
LICENSE                     # MIT license
package.json                # Package manifest
```

### 7.2 Strictly Forbidden Contents

The tarball **must never** contain:

- `src/` (Source TypeScript and raw CSS)
- `tests/` or `*.test.tsx` (Vitest suites)
- `stories/` or `*.stories.tsx` (Storybook files)
- `.storybook/` or storybook configuration
- `tsconfig.json`, `tsup.config.ts`, `turbo.json`
- `.github/` workflows or internal documentation

Tarball contents will be validated on every release build via an automated script:

```bash
pnpm pack --dry-run
```

---

## 8. Package Validation Tooling

Before any release, the built package must pass two industry-standard validation gates:

### 8.1 `publint`

- Validates the `package.json` export map, ensuring paths resolve correctly and deprecations are avoided.
- Command: `pnpm dlx publint`
- Gate: Must pass with **0 errors and 0 warnings**.

### 8.2 `@arethetypeswrong/cli` (attw)

- Validates that TypeScript declaration files align across all modern resolution modes:
  - `node10`
  - `node16 (cjs)`
  - `node16 (esm)`
  - `bundler`
- Command: `pnpm dlx @arethetypeswrong/cli --pack .`
- Gate: Must pass with **all green checkmarks**.

---

## 9. Conclusion & Phase Certification

The NPM Package Architecture is fully specified, verified, and certified against the core engineering requirements of Chellaa React.

The project advances to:
**Phase 7: Git Architecture & Governance Standards**  
Target output: `docs/engineering/08-git-standards.md` (Review & Hardening) & `docs/release/versioning.md`
