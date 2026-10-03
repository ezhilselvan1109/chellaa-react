# Chellaa React — Engineering Workflows

## Workflow 01: Developer Onboarding & Environment Setup

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Target Package:** `@chellaa/react`

---

## 1. Prerequisites

- **Node.js:** `v20.x` or higher (LTS recommended).
- **Corepack / pnpm:** `pnpm v9.12.0` or higher.
- **Git:** `2.40+`.

---

## 2. Monorepo Setup

Clone the repository and install workspace dependencies:

```bash
git clone https://github.com/chellaa/chellaa-react.git
cd chellaa-react

# Install monorepo dependencies
pnpm install
```

---

## 3. Daily Development Commands

```bash
# Start Turborepo build pipeline in watch mode
pnpm run dev

# Run full test suite (Vitest + axe-core)
pnpm run test

# Run strict TypeScript typecheck across monorepo
pnpm run typecheck

# Check code formatting (Prettier)
pnpm run format:check

# Auto-format all code
pnpm run format

# Run ESLint across packages
pnpm run lint
```

---

## 4. Branching & PR Guidelines

- Always branch from `main`: `git checkout -b feat/my-component-name`.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- For changes to publishable code, run `pnpm changeset` and commit the generated markdown file.
