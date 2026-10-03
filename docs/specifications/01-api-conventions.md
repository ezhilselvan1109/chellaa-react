# Chellaa React — Component Specifications
## Document 01: Universal API Conventions & Cross-Component Vocabulary

**Document Status:** Approved  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** Phase 1 Foundation & Phase 2 Engineering Standards  

---

## 1. Executive Summary & Purpose

A component library cannot feel cohesive if different components invent idiosyncratic prop names, inconsistent boolean prefixes, or divergent event patterns. In Chellaa React, **learning one component provides immediate mastery over all others**.

This document codifies the mandatory universal vocabulary, prop conventions, compound component structures, CSS namespaces, and ref policies enforced across all `@chellaa/react` components.

---

## 2. Universal Prop Dictionary

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               Universal Prop Dictionary                                │
├───────────────┬───────────────────────────────┬────────────────────────────────────────┤
│ Prop Name     │ Expected Type                 │ Standard Meaning & Behavior            │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ variant       │ String Union                  │ Visual treatment (e.g. solid, outline, │
│               │                               │ ghost, subtle, flushed, unstyled).     │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ size          │ "xs" | "sm" | "md" |          │ Sizing scale mapped to the 4px/8px     │
│               │ "lg" | "xl"                   │ spatial grid and optical heights.      │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ colorScheme   │ "primary" | "secondary" |     │ Semantic color intent mapped to theme  │
│               │ "success" | "warning" |       │ token ramps.                           │
│               │ "danger" | "info" | "neutral" │                                        │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ isDisabled    │ boolean                       │ Suppresses user interaction; attaches  │
│               │                               │ disabled attribute / aria-disabled.    │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ isLoading     │ boolean                       │ Displays spinner; sets aria-busy="true"│
│               │                               │ and suppresses click events.           │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ isInvalid     │ boolean                       │ Flags validation error; applies danger │
│               │                               │ border and aria-invalid="true".        │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ isReadOnly    │ boolean                       │ Prevents value changes while remaining │
│               │                               │ keyboard focusable.                    │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ isRequired    │ boolean                       │ Marks input field as required; sets    │
│               │                               │ required and aria-required="true".     │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ isFullWidth   │ boolean                       │ Expands component to 100% parent width.│
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ isOpen        │ boolean                       │ Controlled visibility state for        │
│               │                               │ overlays, dialogs, and disclosures.    │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ defaultOpen   │ boolean                       │ Uncontrolled initial visibility state. │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ asChild       │ boolean                       │ Enables Radix-style slot delegation    │
│               │                               │ to the immediate child element.        │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ onValueChange │ (value: T) => void            │ Semantic value update callback.        │
├───────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ onOpenChange  │ (open: boolean) => void       │ Overlay open/close state change trigger│
└───────────────┴───────────────────────────────┴────────────────────────────────────────┘
```

---

## 3. Strict Boolean Flag Prefix Mandate

All custom boolean properties must feature the `is` or `has` prefix.

```text
✅ APPROVED CHELLAA PROPS:
- isDisabled
- isLoading
- isInvalid
- isReadOnly
- isRequired
- isFullWidth
- isOpen
- hasDot

❌ PROHIBITED ALTERNATIVES:
- disabled   (except when forwarding raw native HTML props directly)
- loading
- invalid
- readOnly
- required
- fullWidth
- open
- dot
```

### Native HTML Attribute Passthrough Rule
When a Chellaa React component extends native HTML attributes (e.g. `React.ButtonHTMLAttributes<HTMLButtonElement>`), native attributes such as `disabled` are supported as pass-throughs for backwards compatibility with third-party libraries, but the official Chellaa API is strictly `isDisabled`.

---

## 4. Controlled vs. Uncontrolled Architecture

Stateful components must adhere to the standard React two-prop contract:

```
┌────────────────────────────────────────────────────────────────────────┐
│                     Controlled vs. Uncontrolled Pairs                  │
├──────────────────────┬────────────────────────┬────────────────────────┤
│ State Domain         │ Controlled Prop        │ Uncontrolled Prop      │
├──────────────────────┼────────────────────────┼────────────────────────┤
│ Value State          │ value + onValueChange  │ defaultValue           │
├──────────────────────┼────────────────────────┼────────────────────────┤
│ Open / Overlay State │ isOpen + onOpenChange  │ defaultOpen            │
├──────────────────────┼────────────────────────┼────────────────────────┤
│ Selection State      │ selected + onSelect    │ defaultSelected        │
└──────────────────────┴────────────────────────┴────────────────────────┘
```

- **Rule 1:** When `value` or `isOpen` is provided, the component operates in **Controlled Mode**. State updates only occur when the consumer updates the prop.
- **Rule 2:** When only `defaultValue` or `defaultOpen` is provided, the component operates in **Uncontrolled Mode** using `useControllableState`.
- **Rule 3:** A component must warn in development if switching from uncontrolled to controlled mode (or vice versa).

---

## 5. Composition & Polymorphism: `asChild` vs. `as`

### 5.1 Absolute Prohibition of `as="..."`
The dynamic polymorphic `as` prop (e.g. `<Button as={Link} />`) is **strictly prohibited**. It creates TypeScript performance degradation, type explosions, and runtime prop collisions.

### 5.2 The `asChild` Composition Pattern
Polymorphic composition is achieved exclusively via `asChild`:
```tsx
<Button asChild variant="primary">
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### 5.3 The `asChild` Semantic Safety Boundary
`asChild` must **NOT** be blindly attached to every component. It is permitted only where composition is semantically safe:
- **PERMITTED ON:**
  - `Button`: Delegates rendering to `<a>` or router `<Link>`.
  - `Card`: Delegates root to `<article>`, `<section>`, or `<nav>`.
  - `Dialog.Trigger` & `Dialog.Close`: Delegates to existing buttons without extra wrapping nodes.
  - `Select.Trigger`: Delegates to custom trigger buttons.
- **PROHIBITED ON:**
  - `Input`: An `<input>` is a void element. Children cannot be passed or delegated without invalid HTML.
  - `Table`, `Thead`, `Tbody`, `Tfoot`, `Tr`, `Th`, `Td`: Browser HTML table parsers strictly mandate valid table hierarchies. Delegating table tags to arbitrary `<div>` elements breaks table accessibility and DOM structure.

---

## 6. Compound Component Architecture

For complex, multi-element components (`Dialog`, `Select`, `Card`, `Table`), use the compound pattern with direct object attachment:

```typescript
// Dialog compound export structure:
export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});
```

### Context Guarding Rule
Every sub-component must verify that it is rendered inside its parent root context. If rendered outside, it must throw an explicit error:
```typescript
if (!context) {
  throw new Error("[Chellaa]: <Dialog.Content> must be rendered within a <Dialog> root.");
}
```

---

## 7. Ref Forwarding & Element Typing

- Every component that renders a DOM element **must forward its ref**.
- Refs must use exact DOM types:
  ```typescript
  // ✅ EXACT:
  React.forwardRef<HTMLButtonElement, ButtonProps>(...)
  React.forwardRef<HTMLInputElement, InputProps>(...)
  React.RefObject<HTMLElement | null>

  // ❌ STRICTLY PROHIBITED:
  React.RefObject<any>
  ```
- Must maintain forward-compatibility with React 18 (`React.forwardRef`) and React 19 native ref passing.

---

## 8. CSS Class Naming & Scoped BEM Hierarchy

All component CSS classes must follow the `.cl-*` namespace. Unscoped utility classes are strictly prohibited.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CSS Class Architecture                        │
├─────────────────────┬───────────────────┬──────────────────────────────┤
│ Entity              │ Format            │ Canonical Example            │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Component Block     │ .cl-<component>   │ .cl-button, .cl-dialog       │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Component Element   │ .cl-<comp>__<elem>│ .cl-dialog__content          │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Component Variant   │ .cl-<comp>--<var> │ .cl-button--solid            │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Component Size      │ .cl-<comp>--<size>│ .cl-button--md, .cl-input--sm│
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Component State     │ .cl-<comp>--<state│ .cl-button--loading          │
│                     │                   │ .cl-input--invalid           │
│                     │                   │ .cl-badge--pill              │
└─────────────────────┴───────────────────┴──────────────────────────────┘
```

**Prohibition:** Never emit raw classes such as `.is-invalid`, `.is-disabled`, or `.is-pill` without the `.cl-` component prefix.

---

## 9. Design Tokens vs. Intrinsic CSS Mechanics

```
┌────────────────────────────────────────────────────────────────────────┐
│                     Token Rule vs. Mechanism Exception                 │
├───────────────────────────────────┬────────────────────────────────────┤
│ Design-System Values (Tokens ONLY)│ CSS Intrinsic Mechanics (Permitted)│
├───────────────────────────────────┼────────────────────────────────────┤
│ • Colors (var(--cl-color-*))      │ • Outlines (outline: 2px solid...) │
│ • Spacing (var(--cl-space-*))     │ • Hairline borders (border: 1px..) │
│ • Radii (var(--cl-rad-*))         │ • Resets (top: 0, margin: 0)       │
│ • Elevation (var(--cl-shadow-*))  │ • Micro-scale (transform: scale()) │
│ • Typography (var(--cl-font-*))   │ • Timing resets (0.01ms !important)│
└───────────────────────────────────┴────────────────────────────────────┘
```
