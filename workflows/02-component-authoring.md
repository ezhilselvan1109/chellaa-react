# Chellaa React — Engineering Workflows
## Workflow 02: Component Authoring & Lifecycle Standards

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Target Package:** `@chellaa/react`  

---

## 1. Overview

Every component in `@chellaa/react` must strictly adhere to the **Collocated 6-File Architecture**:

```text
packages/react/src/components/<ComponentName>/
├── <ComponentName>.tsx          # React implementation & ref forwarding
├── <ComponentName>.types.ts     # TypeScript interfaces and prop types
├── <ComponentName>.styles.css   # Scoped CSS wrapped in @layer cl-components
├── <ComponentName>.test.tsx     # Vitest & axe-core accessibility tests
├── <ComponentName>.stories.tsx  # Storybook component documentation stories
└── index.ts                     # Component-level barrel export
```

---

## 2. Step-by-Step Implementation Workflow

### Step 1: Read the Governing Specification
Never write component code without first reading its approved 30-section specification in `docs/specifications/` and the Universal API Conventions (`01-api-conventions.md`).

### Step 2: Author Prop Types (`.types.ts`)
- Use strict interfaces extending standard React HTML attributes.
- Use `is*` prefix for booleans (`isDisabled`, `isInvalid`, `isLoading`).
- Use `startIcon` and `endIcon` for directional icons.
- Support `asChild?: boolean` where slot delegation is permitted.
- Never use `any`.

### Step 3: Author Scoped CSS (`.styles.css`)
- Wrap all rules in `@layer cl-components { ... }`.
- Use the `.cl-<component>[__<element>][--<modifier>]` namespace.
- Drive all colors, borders, spacing, and typography via `--cl-*` CSS variables.
- Include `@media (prefers-reduced-motion: reduce)` overrides.

### Step 4: Author Component Implementation (`.tsx`)
- Support `React.forwardRef`.
- If interactive (uses hooks or DOM listeners), place `"use client";` at the very top.
- If presentational (static markup), omit `"use client"` so it renders as a React Server Component.
- Merge classes using the internal `classNames` helper.
- Forward clean ref to DOM node or `Slot`.

### Step 5: Author Comprehensive Tests (`.test.tsx`)
Cover all 7 required test categories:
1. Rendering & DOM structure
2. Prop variants & sizes
3. User interactions & event handlers
4. Accessibility compliance via `axe()`
5. Keyboard navigation & focus visible rings
6. Controlled vs. uncontrolled behavior
7. Disabled / loading state behavior

### Step 6: Export from Component & Root Entry Points
- Export public symbols in `src/components/<ComponentName>/index.ts`.
- Re-export in `packages/react/src/index.ts`.
