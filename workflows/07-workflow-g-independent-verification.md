# Workflow G: Independent Verification & Regression Firewall

**Stage:** 7 of 8  
**Status:** ⚪ PENDING  
**Governing ADR:** ADR-011  

---

## 1. Objectives & Scope
- Execute the full monorepo automated verification suite independently.
- Verify token consistency, theme switching, light/dark contrast, component variants, accessibility, package exports, and TypeScript declarations.
- Run the consumer firewall benchmark (`apps/test-consumer`) covering Node ESM, Node CJS, SSR hydration, CSS integrity, and NPM package archive integrity.

## 2. Validation Gates & Acceptance Criteria
- Full test suite passes: `pnpm run test`.
- Monorepo typecheck passes: `pnpm run typecheck`.
- Monorepo lint passes: `pnpm run lint`.
- Storybook, Docs, and Playground production builds succeed.
- 5/5 test-consumer benchmark gates pass.
