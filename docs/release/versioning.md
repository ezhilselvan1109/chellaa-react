# Chellaa React — Release Governance
## Document: Semantic Versioning & Changesets Specification

**Document Status:** 🟢 COMPLETE & VALIDATED  
**Phase:** 8 & 9 — Versioning & Changesets  
**Date:** 2026-10-03  
**Target Package:** `@chellaa/react`  
**Standard:** Semantic Versioning 2.0.0 (SemVer)  
**Tooling:** `@changesets/cli`  

---

## 1. Executive Summary & Semantic Versioning Rules

Chellaa React strictly adheres to **Semantic Versioning 2.0.0** (`MAJOR.MINOR.PATCH`). Every public release must communicate the exact compatibility impact to consumers:

```text
MAJOR.MINOR.PATCH
  │     │     │
  │     │     └── Bug fixes, internal refactoring, non-breaking performance or a11y fixes.
  │     └──────── New components, new optional props, backwards-compatible feature additions.
  └────────────── Breaking API changes, prop removals, component deprecation removals.
```

### 1.1 Canonical Version Bump Decision Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                     Semantic Version Bump Taxonomy                     │
├────────────────────────────┬────────────┬──────────────────────────────┤
│ Scenario                   │ Bump Type  │ Example                      │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ New Component Added        │ MINOR      │ Button added -> 0.1.0 -> 0.2.0│
├────────────────────────────┼────────────┼──────────────────────────────┤
│ New Optional Prop Added    │ MINOR      │ Input size="lg" added        │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ New Slot Composition Hook  │ MINOR      │ asChild added to Card        │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ Bug Fix (No API change)    │ PATCH      │ Dialog focus trap leak fixed │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ Accessibility Correction   │ PATCH      │ ARIA attribute typo resolved │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ Internal Performance Opt   │ PATCH      │ LightningCSS minification fix│
├────────────────────────────┼────────────┼──────────────────────────────┤
│ TypeScript Typing Fix      │ PATCH      │ Ref typing narrowed          │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ Breaking API Signature     │ MAJOR      │ Prop renamed or removed      │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ Component Removal          │ MAJOR      │ Deprecated component dropped │
├────────────────────────────┼────────────┼──────────────────────────────┤
│ Min React Baseline Raised  │ MAJOR      │ Raising React from 18 to 20  │
└────────────────────────────┴────────────┴──────────────────────────────┘
```

---

## 2. Changesets Architecture (`@changesets/cli`)

Changesets provides an auditable, decentralized mechanism for tracking changes across pull requests. Instead of maintainers guessing what changed at release time, developers commit a small markdown file describing the intent and scope of their change alongside their code.

### 2.1 Changesets Commands
- `pnpm changeset`: Interactively prompts the developer for the bump type (`patch`, `minor`, `major`) and summary description. Generates a unique markdown file in `.changeset/<random-name>.md`.
- `pnpm changeset status`: Analyzes active changesets against `main`, displaying pending version bumps.
- `pnpm changeset version`: Consumes all committed changesets, updates `package.json` version numbers, updates `CHANGELOG.md`, and removes the consumed changeset files.
- `pnpm changeset publish`: Builds and publishes all updated packages to the npm registry, creating corresponding Git tags.

---

## 3. When is a Changeset Mandatory vs. Unnecessary?

### 3.1 Mandatory Scenarios
A changeset is **strictly required** for any pull request that touches:
- `packages/react/src/**` (Component code, styles, hooks, utilities, theme engine).
- `packages/react/package.json` (Export maps, dependencies, peer dependencies).
- Public TypeScript declarations.

If a PR touches publishable code without a changeset, the CI workflow (`pr-check.yml`) will fail.

### 3.2 Unnecessary Scenarios
A changeset **must not** be created for:
- Changes strictly within `docs/**` (Architecture, specifications, guides).
- Changes to internal development apps (`apps/playground/**`, `apps/docs/**`, `apps/test-consumer/**`).
- Internal CI/CD scripts (`.github/**`).
- Root repository configurations (`turbo.json`, `pnpm-workspace.yaml`, `.gitignore`).

---

## 4. Changelog Generation & Tagging Mechanics

### 4.1 Automated Changelog Generation
When `pnpm changeset version` executes:
1. Each changeset's markdown summary is collated under the new version header in `packages/react/CHANGELOG.md`.
2. Associated commit SHAs and authors are linked.
3. Breaking changes are highlighted in a dedicated `### Major Changes` section.

### 4.2 Git Tagging
Git tags follow the scoped package taxonomy:
```text
@chellaa/react@<version>
```
Example:
```text
@chellaa/react@1.0.0
@chellaa/react@1.1.0
```

---

## 5. Prerelease Lifecycle (Alpha, Beta, RC)

For major versions or experimental features, Changesets supports prerelease mode:

```bash
# Enter prerelease mode with 'next' or 'beta' tag
pnpm changeset pre enter next

# Subsequent version bumps generate prerelease tags
pnpm changeset version
# -> @chellaa/react@1.0.0-next.0

# Publish with npm dist-tag
pnpm changeset publish --tag next

# Exit prerelease mode when ready for stable release
pnpm changeset pre exit
```

---

## 6. Prohibited Manual Releases

Manual releases executed directly from a local developer machine via `npm publish` are **strictly prohibited**. 

All releases must:
1. Originate from an automated Version PR generated by Changesets.
2. Be merged to `main` by an authorized maintainer.
3. Be built, validated, and published via GitHub Actions using npm OIDC provenance.
