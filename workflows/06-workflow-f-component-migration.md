# Workflow F: Incremental Component Migration

**Stage:** 6 of 8  
**Status:** ⚪ PENDING  
**Governing ADR:** ADR-011  

---

## 1. Objectives & Scope
- Migrate remaining components in dependency-aware batches according to the matrix in Specification 07:
  - **Batch 2 (Forms)**: `Textarea`, `FormField`, `Checkbox`, `Radio`, `Switch`.
  - **Batch 3 (Surfaces & Data Display)**: `Paper`, `Card`, `Typography`, `Kbd`.
  - **Batch 4 (Layout & Primitives)**: `Box`, `Stack`, `Flex`, `Grid`, `Container`, `Divider`.
- Author collocated `.styles.css` wrapped in `@layer cl-components` and import into `src/styles/index.css`.
- Maintain 100% backward compatibility for all props, slots, and ref forwarding.

## 2. Validation Gates & Acceptance Criteria
- Every migrated component satisfies the 7-layer test standard.
- 0 accessibility violations (`axe`).
- Pixel-perfect visual rendering in Storybook light and dark modes.
