# ADR-005: React 18 & React 19 Dual Compatibility Architecture

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, React Specialist

---

## 1. Context and Problem Statement

The React ecosystem is transitioning from React 18 to React 19. Many enterprise codebases remain on React 18.2+, while new greenfield applications are adopting React 19.

A modern component library must provide seamless support for both major versions without peer dependency warnings, runtime crashes, or deprecation log spam.

Key differences between React 18 and React 19 include:

1. **Ref Passing:** React 19 supports `ref` directly as a regular prop on functional components and deprecates `React.forwardRef`.
2. **Context Provider:** React 19 supports `<Context>` directly instead of `<Context.Provider>`.
3. **TypeScript Types:** React 19 refactors `@types/react` (e.g. removal of `React.FC`, narrowing of `React.ReactNode` return types).

---

## 2. Decision

1. **Declared Peer Dependencies:**
   ```json
   "peerDependencies": {
     "react": ">=18.2.0",
     "react-dom": ">=18.2.0"
   }
   ```
2. **Backward-Compatible Ref Forwarding:**
   - Author components using `React.forwardRef` to guarantee full compatibility with React 18.2+.
   - Implement ref typing such that React 19 consumers can pass `ref` either via `forwardRef` or standard prop without type errors.
3. **Dual-Compatible Context Providers:**
   - Continue rendering `<ThemeContext.Provider>` which remains supported in both React 18 and React 19.
4. **Deterministic Hook Primitives:**
   - Standardize on React 18's native `useId()` for SSR-safe DOM IDs across both React 18 and 19.
5. **No React 19-Only Features in Core Primitives:**
   - Avoid hard runtime dependencies on React 19 specific APIs (`useActionState`, `useOptimistic`) in core foundational UI components, ensuring flawless execution in React 18.

---

## 3. Consequences

### Positive

- **Broad Adoption:** Consumers can upgrade their projects to React 19 without waiting for `@chellaa/react` to drop React 18 support.
- **Zero Peer Warnings:** `npm install` and `pnpm add` complete cleanly in both React 18 and 19 projects.

### Negative

- **Requires Dual CI Matrix:** CI must test unit tests and test consumers against both React 18 and React 19.

---

## 4. Alternatives Considered

1. **React 19 Only:** Rejected because the enterprise ecosystem is heavily invested in React 18.2+.
2. **Separate Package Releases (`@chellaa/react-18` vs `@chellaa/react-19`):** Rejected due to massive maintenance overhead and fragmented community packages.
