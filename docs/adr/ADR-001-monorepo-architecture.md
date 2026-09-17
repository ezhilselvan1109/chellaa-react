# ADR-001: Monorepo Architecture

## Status
Accepted

## Context
Chella UI is a multi-project repository comprising a core component library (`@chella-ui/react`), an independent documentation application (`apps/docs`), a design system workbench (`apps/playground`), and a consumer test suite (`apps/test-consumer`).
We need a unified dependency management and development workflow that enforces strict package boundaries without unnecessary third-party tool complexity.

## Decision
We adopt **native npm Workspaces** (supported natively by Node.js 20 / npm 11.2+) with the following workspace configuration:
- `packages/*`
- `apps/*`

## Alternatives Considered
1. **pnpm workspaces**: High performance and strict isolation, but requires global installation of pnpm which may not be present on consumer/contributor environments without Corepack configuration.
2. **Lerna / Nx**: Feature-rich monorepo orchestrators, but introduce significant configuration overhead, proprietary CLI wrappers, and unnecessary dependency bloat for a focused UI library.
3. **Turborepo**: Fast pipeline caching, but adds external build tool overhead. Can be added as a transparent acceleration layer later if build times demand it.

## Consequences
- Zero prerequisite tool installations for contributors beyond standard Node.js and npm.
- Direct symlink resolution within the monorepo enables instant local package iteration.
- Monorepo package boundaries are strictly enforced through package manifests and CI linting checks.
