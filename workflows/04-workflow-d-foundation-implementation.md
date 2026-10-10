# Workflow D: Foundation Implementation

**Stage:** 4 of 8  
**Status:** ⚪ PENDING APPROVAL TO START  
**Governing ADR:** ADR-011  

---

## 1. Objectives & Scope
- Implement foundational token updates (`tokens.css`, `theme.css`) for complete Tier 1, Tier 2, and Tier 3 mappings.
- Implement CSS cascade layer standards (`@layer cl-reset, cl-tokens, cl-theme, cl-components, cl-utilities;`).
- Validate the dynamic `styled()` and `sx` token bridge.
- Fix non-blocking tooling issues identified in Workflow A:
  - **Tooling Issue 1 (Docs Typecheck)**: Fix `apps/docs/tsconfig.json` (add `"vite/client"`) and clean up unused imports in `MaterialPrimitivesDocPage.tsx`. Owner: *Documentation Engineer*.
  - **Tooling Issue 2 (Linter Task)**: Configure ESLint scripts in `package.json` files so `pnpm run lint` executes properly across the workspace. Owner: *Build & Distribution Engineer*.

## 2. Inputs & Prerequisites
- Approved Workflow C deliverables (Workflows, Skills, Role Governance).

## 3. Completion Criteria & Validation Gates
- `pnpm --filter @chellaa/react build` succeeds with 0 errors.
- `pnpm --filter @chellaa/docs typecheck` passes with 0 errors.
- `pnpm run lint` executes an actual linter and passes.
- All foundation unit tests pass.
