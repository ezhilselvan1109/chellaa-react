# ADR-009: Versioning Strategy & SemVer Governance

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, Core Maintainers  

---

## 1. Context and Problem Statement

Component libraries power thousands of consumer applications. Ambiguous versioning or accidental breaking changes released in minor or patch versions can disrupt consumer applications and break automated dependency update tools (e.g., Dependabot, Renovate).

We must formalize the exact semantic versioning rules governing Chellaa React.

---

## 2. Decision

1. **Strict Semantic Versioning 2.0.0 (`MAJOR.MINOR.PATCH`):**
   - **MAJOR:** Any backwards-incompatible API change, prop removal, component renaming/deletion, or increase in minimum required React version.
   - **MINOR:** Any backwards-compatible addition: new component, new optional prop, new theme token, or enhanced composition hook.
   - **PATCH:** Any backwards-compatible bug fix, accessibility correction, internal refactoring, or performance optimization.
2. **Changesets as the Versioning Driver:**
   - Every pull request introducing publishable changes must commit a `.changeset/*.md` declaration specifying the exact SemVer bump level.
3. **Deprecation Policy Before Breaking Changes:**
   - Props or components scheduled for removal must first be marked as `@deprecated` with a console warning and migration guide for at least **one MINOR release cycle** before being removed in the subsequent **MAJOR** release.
4. **Snapshot & Prerelease Channels:**
   - Supports `pnpm changeset version --snapshot` for temporary PR verification builds.
   - Supports official prerelease channels (`alpha`, `beta`, `next`) for major framework shifts.

---

## 3. Consequences

### Positive
- **Consumer Trust:** Consumers can safely configure automated patch/minor dependency updates without fear of breaking production.
- **Clear Migration Paths:** Deprecation warnings give teams ample time to adapt before breaking updates.

### Negative
- **Requires Developer Discipline:** Contributors must understand the SemVer impact of their changes and commit accurate changesets.

---

## 4. Alternatives Considered

1. **Calendar Versioning (CalVer):** Rejected because calendar versioning fails to communicate breaking API changes to automated package managers.
2. **Single Monorepo Lockstep Versioning:** Accepted for the core `@chellaa/react` package while allowing auxiliary packages (like `@chellaa/icons` in the future) to version independently if needed.
