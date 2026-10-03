# Chellaa React — Engineering Standards

## Document 06: Component Design & Lifecycle Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`

---

## 1. Executive Summary & Purpose

Every component in Chellaa React is crafted to the same standard of visual excellence, architectural discipline, and accessibility rigor.

This document establishes the official component anatomy, collocated file structure, prop conventions, compound component guidelines, Storybook expectations, and the 11-step **Component Development Lifecycle**.

_(Note: In accordance with Phase 2 constraints, this document defines the standards; actual component implementation occurs in Phase 6)._

---

## 2. Standard Component Anatomy & Collocation

Every component in `@chellaa/react` resides in an isolated directory under `src/components/<ComponentName>/`:

```
src/components/Button/
├── Button.tsx             # Component implementation & ref forwarding
├── Button.types.ts        # Public TypeScript interfaces, variants, and TSDoc definitions
├── Button.styles.css      # Scoped component styles in @layer cl-components
├── Button.test.tsx        # Unit, interaction, and a11y test suite (satisfies applicable categories)
├── Button.stories.tsx     # Storybook visual permutations and docs stories
└── index.ts               # Clean public barrel export
```

### 2.1 File Responsibilities

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Collocated File Taxonomy                        │
├──────────────────────┬─────────────────────────────────────────────────┤
│ File                 │ Dedicated Purpose                               │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Component.tsx        │ React logic, ref attachment, event composition, │
│                      │ class calculation, DOM element emission.        │
│                      │ (Intentional "use client" if interactive).      │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Component.types.ts   │ Public interfaces, string unions, callbacks,    │
│                      │ and mandatory public TSDoc comments.            │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Component.styles.css │ Scoped static CSS referencing --cl-* tokens,    │
│                      │ wrapped inside @layer cl-components.            │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Component.test.tsx   │ Behavioral tests verifying all applicable test  │
│                      │ categories (with explicit N/A rationale).       │
├──────────────────────┼─────────────────────────────────────────────────┤
│ Component.stories.tsx│ Visual permutation matrices (variants, sizes,   │
│                      │ themes, interactive states) for Storybook.      │
├──────────────────────┼─────────────────────────────────────────────────┤
│ index.ts             │ Strict public export boundary for the component.│
└──────────────────────┴─────────────────────────────────────────────────┘
```

---

## 3. Standard Prop Naming & API Conventions

To ensure that learning one Chellaa React component provides immediate mastery over all others, prop naming is strictly standardized:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Standard Prop Dictionary                        │
├───────────────────┬──────────────────────┬─────────────────────────────┤
│ Prop Name         │ Expected Type        │ Canonical Meaning           │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ variant           │ String Union         │ Visual aesthetic treatment  │
│                   │                      │ (solid, outline, ghost).    │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ size              │ "xs"|"sm"|"md"|      │ Sizing scale mapped to the  │
│                   │ "lg"|"xl"            │ 4px/8px spatial grid.       │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ colorScheme       │ "primary"|"secondary"│ Semantic color intent.      │
│                   │ |"success"|"warning" │                             │
│                   │ |"danger"|"info"     │                             │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ isDisabled        │ boolean              │ Suppresses user interaction │
│                   │                      │ and sets disabled attrs.    │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ isLoading         │ boolean              │ Displays spinner and sets   │
│                   │                      │ aria-busy="true".           │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ isInvalid         │ boolean              │ Flags error state and sets  │
│                   │                      │ aria-invalid="true".        │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ isReadOnly        │ boolean              │ Prevents editing while      │
│                   │                      │ remaining focusable.        │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ isRequired        │ boolean              │ Marks field required and    │
│                   │                      │ sets aria-required="true".  │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ asChild           │ boolean              │ Composition slot toggle.    │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ onValueChange     │ (value: T) => void   │ Standard value callback.    │
└───────────────────┴──────────────────────┴─────────────────────────────┘
```

---

## 4. Compound Component Architecture

For complex, multi-part components (`Dialog`, `Menu`, `Select`, `Tabs`, `Accordion`), developers must utilize the **Compound Component Pattern** with namespaced sub-components:

```tsx
// Definition in packages/react/src/components/Dialog/index.ts:
export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
});
```

### 4.1 Compound Component Guidelines

1. **Shared Context:** State (such as `open`, `activeTab`, `selectedIndex`) is passed down silently through a scoped React Context.
2. **Context Guarding:** Sub-components must throw a descriptive error if rendered outside their parent root:
   `"Chellaa: <Dialog.Content> must be rendered within a <Dialog> root."`
3. **Flexible Layout:** Compound components give consumers total control over layout, transitions, portals, and wrapping DOM containers without requiring hundreds of props on the root element.

---

## 5. Storybook Standards

Every component must include a comprehensive Storybook file (`Component.stories.tsx`) showcasing all permutations:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "subtle", "link"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "info"],
    },
    isDisabled: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;
```

### 5.1 Mandatory Stories per Component

1. **Default / Playground:** Fully interactive story connected to Storybook Controls.
2. **All Variants Matrix:** Renders all visual variants side-by-side.
3. **All Sizes Matrix:** Renders all sizes (`xs` through `xl`) side-by-side to verify optical alignment.
4. **Interactive States:** Showcases `:hover`, `:active`, `:focus-visible`, `isDisabled`, and `isLoading`.
5. **Theme Permutation Story:** Renders the component simultaneously in Light Mode and Dark Mode.
6. **Composition Story (`asChild`):** Demonstrates composition with third-party router links or custom tags.

---

## 6. The 11-Step Component Development Lifecycle

Every future Chellaa React component must systematically progress through eleven formal gates:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Component Development Lifecycle                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Requirement          Clarify user stories, use cases, and persona.  │
│        ↓                                                               │
│ 2. Specification        Define ARIA pattern, keyboard keys, and states.│
│        ↓                                                               │
│ 3. API Design           Formalize Component.types.ts with public TSDoc │
│        ↓                for all public props and symbols.              │
│ 4. Implementation       Author Component.tsx with ref and asChild.     │
│        ↓                (Declare "use client" only if interactive).    │
│ 5. Styling              Author Component.styles.css with --cl-* tokens.│
│        ↓                                                               │
│ 6. Accessibility        Ensure WCAG 2.2 AA and WAI-ARIA APG compliance.│
│        ↓                                                               │
│ 7. Test Suite           Author Component.test.tsx covering all appli-  │
│        ↓                cable categories (document N/A with rationale).│
│ 8. Storybook Stories    Author full permutation Component.stories.tsx. │
│        ↓                                                               │
│ 9. Documentation        Create markdown docs page with live code sand- │
│        ↓                boxes and accessibility instructions.          │
│ 10. Peer Code Review    Mandatory review against Definition of Done.   │
│        ↓                                                               │
│ 11. Merge & Release     Automated CI release via Changesets.           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. What Developers Must Do vs. Never Do

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Component Rule Summary                          │
├───────────────────────────────────┬────────────────────────────────────┤
│ MUST DO                           │ NEVER DO                           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Collocate all 6 standard files  │ • Never split component files into │
│   in one directory.               │   distant package directories.     │
│ • Use standard prop names         │ • Never create inconsistent props  │
│   (variant, size, colorScheme).   │   (e.g. 'type' instead of 'variant'│
│ • Use asChild for polymorphism.   │ • Never use polymorphic 'as' prop. │
│ • Forward ref to interactive root.│ • Never swallow or drop forwarded  │
│ • Guard compound sub-components   │   refs or event handlers.          │
│   with descriptive error messages.│ • Never merge without passing all  │
│ • Provide Storybook matrices.     │   applicable test categories (with │
│ • Mark interactive components with│   documented N/A rationale).       │
│   intentional "use client".       │ • Never apply global "use client"  │
│ • Provide rich TSDoc on public    │   across non-interactive components│
│   API symbols.                    │ • Never write boilerplate comments │
│                                   │   on trivial internal helpers.     │
└───────────────────────────────────┴────────────────────────────────────┘
```
