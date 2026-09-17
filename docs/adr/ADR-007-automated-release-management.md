# ADR-007: Automated Release Management & Versioning

## Status
Accepted

## Context
Releasing an npm package manually is error-prone, risks breaking semantic versioning, and often leads to missing or incomplete changelogs. A monorepo requires an automated, audited release workflow.

## Decision
We adopt **Changesets** (`@changesets/cli`) for release and changelog automation:
1. Every code change affecting public packages includes a `.changeset/*.md` declaration specifying semver impact (`patch`, `minor`, `major`) and human-readable release notes.
2. Changesets automatically calculates package version bumps and generates `CHANGELOG.md`.
3. In CI, a release workflow publishes packages to npm with provenance (`--provenance`) and creates associated Git tags and GitHub releases.

## Consequences
- 100% adherence to Semantic Versioning (SemVer 2.0).
- Transparent, developer-friendly changelogs for consumers.
- Tamper-proof npm releases with supply chain provenance.
