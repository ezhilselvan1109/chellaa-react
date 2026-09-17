# ADR-006: Documentation Application Architecture

## Status
Accepted

## Context
A component library is only as good as its documentation. In many projects, documentation is an afterthought—a folder of Markdown files or an overloaded Storybook instance. Chella UI requires a dedicated, professional documentation website capable of scaling from 5 to over 100 components without architectural refactoring.

## Decision
We architect `apps/docs` as an **independent, production-grade web application**:
1. Built with **Vite + React + TypeScript + React Router**.
2. Consumes `@chella-ui/react` strictly through its package boundary (simulating a real user application).
3. Structured information architecture:
   - Getting Started (Overview, Installation, Quick Start, Theming, SSR)
   - Foundations (Tokens, Colors, Typography, Spacing, Accessibility)
   - Components (General, Layout, Navigation, Data Entry, Data Display, Feedback)
   - Patterns & Guides
4. Uniform component documentation template:
   - Interactive live preview with dynamic props controller
   - Syntax-highlighted code viewer with 1-click copy
   - Variant & size showcase matrix
   - Auto-extracted Props API table
   - Accessibility guidelines & keyboard shortcuts table
   - CSS custom property customization hooks table
5. Fast client-side search index.
6. URL structure designed for future multi-version documentation support (`/docs/v1/...`).

## Consequences
- The documentation is a standalone product demonstrating Chella UI in action.
- Clear separation of concerns between internal component development (Storybook) and public developer experience (Documentation App).
- Scalable platform where adding a new component requires only adding a typed documentation schema without rewriting navigation or layout.
