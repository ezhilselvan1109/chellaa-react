# ADR-001: Package Architecture & Root Boundary Design

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, Core Engineering Team  

---

## 1. Context and Problem Statement

A component library distributed as an enterprise npm package must provide optimal ergonomics, uncompromising TypeScript type safety, and robust tree-shaking while shielding internal implementation modules from consumer tampering.

We must decide the package naming, monorepo structure, entry-point architecture, and public API boundaries for `@chellaa/react`.

---

## 2. Decision

1. **Package Scope & Identity:** Publish under the scoped package name `@chellaa/react`.
2. **Unified Root Entry Point:** All public components (`Button`, `Input`, `Dialog`, etc.), theme utilities (`ThemeProvider`, `useTheme`, `createTheme`), and types are exported directly from the package root:
   ```tsx
   import { Button, Dialog, ThemeProvider } from "@chellaa/react";
   ```
3. **Encapsulation via Conditional Export Map:**
   ```json
   "exports": {
     ".": {
       "types": "./dist/index.d.ts",
       "import": "./dist/index.mjs",
       "require": "./dist/index.cjs"
     },
     "./styles.css": "./dist/styles.css",
     "./package.json": "./package.json"
   }
   ```
   Direct path imports into internal directories (e.g. `@chellaa/react/src/...` or `@chellaa/react/dist/...`) are blocked.
4. **Collocated Component Internal Architecture:** Within `packages/react/src/components/<Component>`, files are collocated: `.tsx`, `.types.ts`, `.styles.css`, `.test.tsx`, `.stories.tsx`, and `index.ts`.
5. **Slot Composition Pattern:** Polymorphic rendering is strictly provided via the `asChild` prop pattern (delegating to a child slot), completely prohibiting the dynamic polymorphic `as` prop.

---

## 3. Consequences

### Positive
- **Pristine Public Boundary:** Private implementation helpers and uncompiled code cannot be imported by consumers, preventing breaking changes during internal refactoring.
- **Flawless Tree-Shaking:** Pure ES module exports enable modern bundlers (Webpack, Vite, Rollup) to eliminate unreferenced components.
- **Maintainability:** Collocated component directories allow contributors to inspect, test, and maintain components in one isolated location.

### Negative
- **Root Index Bundling:** Requires careful build orchestration via `tsup` to prevent accidental bundling of all components into a monolithic non-tree-shakeable chunk.

---

## 4. Alternatives Considered

1. **Unscoped Package (`chellaa-react`):** Rejected due to namespace squatting risks and lack of organizational branding.
2. **Dynamic Polymorphism (`as="a"`):** Rejected because dynamic `as` props destroy TypeScript inference, create severe prop-type collisions, and introduce runtime overhead.
3. **Subpath Component Exports (`@chellaa/react/button`):** Rejected for the foundation release to keep consumer DX simple and unified, though subpath exports may be evaluated for future horizon features.
