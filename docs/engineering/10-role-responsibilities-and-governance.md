# Chellaa React — Engineering Roles, Responsibilities & Governance

**Document Version:** 1.0.0  
**Status:** Approved Governance Standard  
**Target Package:** `@chellaa/react`  
**Governing ADR:** ADR-011  

---

## 1. Operating Model & Role Separation
To guarantee architectural consistency, high visual quality, accessibility compliance, and regression-free releases, development is organized into **7 distinct role responsibilities**:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                          Architecture Owner                             │
│       (Architectural integrity, ADR compliance, public API stability)    │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Design System   │       │  React Component │       │     Build &      │
│     Engineer     │       │     Engineer     │       │   Distribution   │
│ (Tokens, themes) │       │(Collocated code) │       │(LightningCSS/tsup│
└────────┬─────────┘       └────────┬─────────┘       └────────┬─────────┘
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌──────────────────┐                                 ┌──────────────────┐
│ Quality Engineer │                                 │  Documentation   │
│ (Vitest, a11y,   │                                 │     Engineer     │
│   benchmarks)    │                                 │(Docs, Storybook) │
└────────┬─────────┘                                 └────────┬─────────┘
         │                                                     │
         └──────────────────────────┬──────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         Independent Reviewer                            │
│        (Objective gating, empirical verification, regression firewall)  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Role Responsibility Profiles

### 2.1 Architecture Owner
- **Ownership**: Architectural consistency, ADR integrity, public API contract stability.
- **Authority**: Final approval gate on public API signatures, styling engine boundaries, and workflow transitions.
- **Key Artifacts**: `docs/adr/`, `docs/architecture/`.

### 2.2 Design System Engineer
- **Ownership**: 3-tier design tokens (`--cl-*`), palette harmonic contrast, light/dark theme semantic mapping, elevation shadow matrix, and motion accessibility.
- **Key Artifacts**: `packages/react/src/styles/tokens.css`, `theme.css`.

### 2.3 React Component Engineer
- **Ownership**: Component implementation following the 6-file collocated architecture, ref forwarding, `asChild` slot delegation, and CSS class composition.
- **Key Artifacts**: `packages/react/src/components/<Component>/`.

### 2.4 Build & Distribution Engineer
- **Ownership**: LightningCSS compilation, tsup bundling, package export maps (`package.json`), dual Node/Browser runtime generation, and workspace tooling.
- **Assigned Workflow D Task**: Configure the missing ESLint scripts in `package.json` so `pnpm run lint` executes an active linter across all packages.
- **Key Artifacts**: `packages/react/tsup.config.ts`, `scripts/build-css.mjs`, `package.json`, `turbo.json`.

### 2.5 Quality Engineer
- **Ownership**: Automated test suites (Vitest), axe-core accessibility checks (0 violations), consumer firewall benchmarks (`apps/test-consumer`), and regression testing.
- **Key Artifacts**: `packages/react/src/**/*.test.tsx`, `apps/test-consumer/`.

### 2.6 Documentation Engineer
- **Ownership**: Documentation portal (`apps/docs`), interactive component playgrounds, Storybook stories (`.stories.tsx`), and verified consumer code snippets.
- **Assigned Workflow D Task**: Fix `apps/docs/tsconfig.json` (`"vite/client"` types) and resolve unused variables in `MaterialPrimitivesDocPage.tsx` to restore clean monorepo typechecking.
- **Key Artifacts**: `apps/docs/`, `apps/storybook/`.

### 2.7 Independent Reviewer
- **Ownership**: Unbiased verification against requirements, empirical execution of test commands, anti-pattern detection, and gating authorization.
- **Review Rule**: Never approves based on self-assertions; must independently execute and inspect command outputs before signing off on any phase.

---

## 3. Explicit Ownership of Workflow A Non-Blocking Tooling Gaps

| Issue ID | Identified Tooling Gap | Assigned Role | Target Workflow | Acceptance Criteria |
| :--- | :--- | :--- | :---: | :--- |
| **GAP-01** | `apps/docs` typecheck failures (7 TS errors) | **Documentation Engineer** | **Workflow D** | `pnpm --filter @chellaa/docs typecheck` exits with code 0. |
| **GAP-02** | `pnpm run lint` executed 0 tasks in Turborepo | **Build & Distribution Engineer** | **Workflow D** | `pnpm run lint` runs ESLint across all workspaces and exits with code 0. |
