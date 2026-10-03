# Chellaa React — Engineering Workflows
## Workflow 04: Automated Release & NPM Publishing

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Target Package:** `@chellaa/react`  

---

## 1. Automated Release Cycle

```text
PR Merged with Changeset
         ↓
GitHub Actions detects changeset and runs `pnpm changeset version`
         ↓
Automated PR "chore(release): version packages" created
         ↓
Core Maintainer reviews and merges "Version Packages" PR
         ↓
GitHub Actions runs `pnpm changeset publish`
         ↓
Package published to npm registry with provenance
         ↓
Git tag created (@chellaa/react@<version>)
         ↓
GitHub Release published with collated changelog
```

---

## 2. Emergency Hotfix Procedure

If a critical regression is discovered in a published release:
1. Create a `fix/hotfix-<issue>` branch from `main`.
2. Implement the fix and write a regression test.
3. Run `pnpm changeset` and select `patch`.
4. Open PR with title `fix: resolve <issue> critical regression`.
5. Require emergency review and merge.
6. The automated pipeline creates the Version PR immediately.
7. Merge Version PR to trigger instant npm patch release.
