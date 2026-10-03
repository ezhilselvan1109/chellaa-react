# Chellaa React — Engineering Standards
## Document 08: Git Workflow, Commits & Changeset Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**Workflow Engine:** GitHub Flow + Changesets  

---

## 1. Executive Summary & Purpose

A pristine Git history and automated semantic versioning pipeline protect open-source libraries from regression leaks and chaotic releases.

This document establishes the official standards for Git branching, Conventional Commits, Pull Request (PR) lifecycle, peer review mandates, merge strategies, and **Changesets** version governance.

---

## 2. Branch Naming Conventions

All feature and bug-fix branches must branch from `main` and adhere to a strict prefixed convention:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Branch Naming Taxonomy                          │
├───────────────────┬────────────────────────────────────────────────────┤
│ Pattern           │ <type>/<short-description>                         │
├───────────────────┼────────────────────────────────────────────────────┤
│ Examples          │ feat/button-primitive                             │
│                   │ fix/dialog-focus-trap                              │
│                   │ docs/typescript-standards                         │
│                   │ refactor/theme-token-compiler                      │
│                   │ perf/button-render-optimization                    │
│                   │ test/checkbox-controlled-suite                     │
│                   │ chore/turborepo-cache-tuning                       │
└───────────────────┴────────────────────────────────────────────────────┘
```

### 2.1 Branch Type Dictionary
- `feat/`: Introduces a new component, prop, or user-facing feature.
- `fix/`: Resolves a bug, accessibility violation, or unintended behavior.
- `docs/`: Adds or updates architectural documents, API guides, or stories.
- `refactor/`: Code reorganization without changing external behavior or API.
- `perf/`: Targeted performance or bundle size optimization.
- `test/`: Adds missing test suites or testing harnesses.
- `chore/`: Build configuration, tool updates, or repository maintenance.

---

## 3. Commit Message Standards (Conventional Commits)

Commit messages must follow the **Conventional Commits 1.0.0** specification. These messages are parsed automatically by tooling to generate changelogs.

### 3.1 Format Specification
```text
<type>(<scope>): <imperative description>

[optional body explaining 'why' and architectural rationale]

[optional footer(s) for BREAKING CHANGES or issue links]
```

### 3.2 Canonical Chellaa React Examples
```text
feat(button): add asChild slot composition support

Enables consumers to delegate button rendering to child router links
while preserving styling, keyboard handlers, and ref forwarding.

Closes #42
```

```text
fix(dialog): restore focus to trigger element upon Escape key dismissal

Prevents focus loss to document.body when dismissing modal dialogs,
satisfying WCAG 2.2 Success Criterion 2.4.3.
```

---

## 4. Pull Request (PR) Standards & Review Mandate

### 4.1 PR Sizing Policy
- **Small & Focused:** Pull requests must target fewer than **400 lines of diff** wherever possible.
- Mega-PRs containing multiple unrelated components or large rewrites will be closed and requested to be split.

### 4.2 Pull Request Template Checklist
Every PR description must include:
1. **Summary of Changes:** What was implemented and why.
2. **Linked Issue:** E.g., `Resolves #108`.
3. **Accessibility Verification:** Confirms automated `axe-core` tests pass and keyboard navigation was tested.
4. **Visual Evidence:** Screenshots or Storybook video captures (especially for dark/light themes).
5. **Changeset Inclusion:** Confirmation that a changeset was added (if applicable).

### 4.3 Review & Merge Policy
- **Minimum Approvals:** Every PR requires at least **one approved review** from a core maintainer.
- **Merge Strategy:** **Squash and Merge** is enforced on `main`. This maintains a linear, clean commit history on the default branch.
- **Conflict Resolution:** Developers must rebase their branch onto `origin/main` (`git fetch origin && git rebase origin/main`). Merge commits (`Merge branch 'main' into ...`) are prohibited.

---

## 5. Changeset Standards & Versioning Policy

Chellaa React uses **Changesets** (`@changesets/cli`) to manage semantic versioning, automated changelogs, and npm distribution.

### 5.1 When is a Changeset Required?
A changeset is **mandatory** for any PR that modifies publishable code in `packages/react`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Changeset Decision Matrix                       │
├─────────────────────────┬──────────────┬───────────────────────────────┤
│ Change Nature           │ Changeset?   │ SemVer Bump Level             │
├─────────────────────────┼──────────────┼───────────────────────────────┤
│ Breaking API change     │ YES (Mandatory) MAJOR (e.g. 1.x -> 2.0)      │
├─────────────────────────┼──────────────┼───────────────────────────────┤
│ New component or prop   │ YES (Mandatory) MINOR (e.g. 1.0 -> 1.1)      │
├─────────────────────────┼──────────────┼───────────────────────────────┤
│ Bug / A11y fix          │ YES (Mandatory) PATCH (e.g. 1.0.0 -> 1.0.1)  │
├─────────────────────────┼──────────────┼───────────────────────────────┤
│ Internal refactoring    │ YES (Mandatory) PATCH                         │
├─────────────────────────┼──────────────┼───────────────────────────────┤
│ Docs / Engineering stds │ NO (Skip)    │ None (No published code change)│
├─────────────────────────┼──────────────┼───────────────────────────────┤
│ Internal CI / Tooling   │ NO (Skip)    │ None                          │
└─────────────────────────┴──────────────┴───────────────────────────────┘
```

### 5.2 Creating a Changeset
Run the interactive CLI from the repository root:
```bash
pnpm changeset
```
Follow the prompts to select packages (`@chellaa/react`), choose the SemVer bump (`patch`, `minor`, `major`), and write a user-facing markdown summary of the change.
