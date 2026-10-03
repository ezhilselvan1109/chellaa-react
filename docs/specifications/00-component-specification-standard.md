# Chellaa React — Component Specifications
## Document 00: Component Specification Master Standard

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Architecture:** Phase 1 Foundation & Phase 2 Engineering Standards  

---

## 1. Executive Summary & Purpose

The purpose of Phase 3 is to answer:
> **"Exactly what are we building?"**  
> *before Phase 4 and implementation answer:*  
> **"How are we building it?"**

This document establishes the mandatory structural standard and engineering contract that every Chellaa React component specification must satisfy. A component specification is an authoritative technical blueprint; another engineer must be able to implement the component in code, tests, CSS, and Storybook without having to make unapproved architectural decisions.

---

## 2. Mandatory Specification Structure

Every component specification document in `docs/specifications/` must contain the following 30 sections in strict sequential order:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Component Specification Structure                    │
├──────┬──────────────────────────────────┬──────┬───────────────────────┤
│ Sec  │ Title                            │ Sec  │ Title                 │
├──────┼──────────────────────────────────┼──────┼───────────────────────┤
│ 1    │ Identity                         │ 16   │ Ref Contract          │
│ 2    │ Purpose                          │ 17   │ Accessibility         │
│ 3    │ Scope                            │ 18   │ Keyboard Interaction  │
│ 4    │ Non-Goals                        │ 19   │ Styling Contract      │
│ 5    │ Feature Summary                  │ 20   │ Theme Contract        │
│ 6    │ Anatomy                          │ 21   │ Responsive Behavior   │
│ 7    │ Public API                       │ 22   │ Motion                │
│ 8    │ TypeScript Types                 │ 23   │ Testing               │
│ 9    │ Variants                         │ 24   │ Storybook             │
│ 10   │ Sizes                            │ 25   │ Documentation Reqs    │
│ 11   │ States                           │ 26   │ Edge Cases            │
│ 12   │ Behavior                         │ 27   │ Reference Comparison  │
│ 13   │ Controlled / Uncontrolled        │ 28   │ Deferred Features     │
│ 14   │ Events                           │ 29   │ Acceptance Criteria   │
│ 15   │ Composition                      │ 30   │ Definition of Done    │
└──────┴──────────────────────────────────┴──────┴───────────────────────┘
```

---

## 3. Section-by-Section Specification Guidelines

### 3.1 Component Identity
Must define:
- **Component Name:** PascalCase identifier (e.g., `Button`, `Dialog`).
- **Package Export:** Exact export statement from `@chellaa/react`.
- **Category:** Functional family (Actions, Forms, Overlays, Layout, Feedback, Data Display).
- **Status:** Lifecycle status (`Draft`, `Review`, `Approved`).
- **Phase:** `3 — Component Specifications`.
- **Related Components:** Sibling or compound components (e.g., `ButtonGroup`, `IconButton`, `Dialog.Trigger`).

### 3.2 Purpose & Usage Bounds
- **Problem Statement:** What user or developer problem does this component solve?
- **When to Use:** Legitimate use cases adhering to UX best practices.
- **When NOT to Use:** Common misuse patterns and alternative recommendations (e.g., "Do not use Button for navigation; use Link or Button with `asChild`").

### 3.3 Scope (In Scope vs. Out of Scope)
- **In Scope:** Explicit list of capabilities, states, variants, and composition patterns supported in v1.
- **Out of Scope:** Explicit list of features deliberately rejected or deferred to prevent API bloat (e.g., split buttons, multi-tier nested menus).

### 3.4 Component Anatomy & DOM Model
- ASCII tree diagram illustrating structural composition.
- Distinction between single primitives and compound components.
- Identification of root element, inner slots, optional glyphs/icons, and semantic HTML tags.

### 3.5 Public API & Props Dictionary
Tabular specification of every public prop:
- `Prop Name`: Standardized naming (`variant`, `size`, `colorScheme`, `isDisabled`, `isLoading`).
- `TypeScript Type`: Exact type or string union.
- `Required / Optional`: Mandatory or optional with `?`.
- `Default Value`: Explicit default value.
- `Description`: Clear, user-facing explanation of purpose.
- `A11y Impact`: Direct ARIA attributes or assistive technology repercussions.

### 3.6 TypeScript Definitions & Types
- Complete TypeScript interfaces and types ready for `Component.types.ts`.
- Strict typing: **`any` is strictly prohibited**.
- String unions for variants and sizes; no runtime TypeScript `enum`s.
- Forward-compatible ref typing supporting React 18 and React 19.

### 3.7 Variants & Visual Intent
- Explicit visual treatment for each variant (e.g., `solid`, `outline`, `ghost`, `subtle`, `link`).
- Semantic role and default variant.
- Prohibited or invalid variant combinations.

### 3.8 Sizes & Spatial Scale
- Sizing scale mapped to the 4px/8px spatial baseline grid (`xs`, `sm`, `md`, `lg`, `xl`).
- Exact height, horizontal padding, typographic token, gap, and icon dimension tokens for each size.

### 3.9 Interactive States
Explicit definitions of all applicable states:
- Default, Hover (`:hover`), Focus (`:focus-visible`), Active (`:active`), Disabled (`:disabled` / `aria-disabled`), Loading (`isLoading`), Invalid (`aria-invalid`), ReadOnly (`isReadOnly`), Selected/Checked/Expanded.
- Visual token mapping, cursor behavior, and interaction suppression rules for each state.

### 3.10 Controlled / Uncontrolled State Behavior
- For stateful components: document `value` vs. `defaultValue`, `onValueChange`, and internal state synchronization via `useControllableState`.
- For stateless components: explicitly declare `N/A` with technical rationale (e.g., "Stateless presentational primitive").

### 3.11 Behavioral Specification
- Implementation-independent description of state machines and user interaction physics.
- Tabular state transitions mapping (Current State + User Action -> Next State).
- Form submission, click bubbling, and cancellation mechanics.

### 3.12 Event Contract
- Public event handlers (`onClick`, `onValueChange`, `onOpenChange`, `onKeyDown`).
- Exact event object types and payload signatures.
- Propagation rules, `defaultPrevented` respect, and firing order guarantees.

### 3.13 Composition & `asChild` Slot Delegation
- Explicit declaration of whether `asChild` is supported.
- Slot mechanics: merging of `className`, `style`, DOM `ref`, and synthetic event handlers with the immediate child element.
- Validation rules: child must be a single valid React element.

### 3.14 Ref Contract
- Target DOM node for forwarded ref (e.g., `HTMLButtonElement`, `HTMLInputElement`).
- Ref forwarding strategy: React 18 `React.forwardRef` and React 19 native ref compatibility without warnings.

### 3.15 Accessibility Specification (WCAG 2.2 AA & WAI-ARIA APG)
- **Semantic Element:** Native HTML tag (`<button>`, `<input>`, `<dialog>`, `<table>`).
- **Accessible Name:** Deterministic accessible name calculation (text content, `aria-label`, `aria-labelledby`).
- **ARIA Attributes:** Minimal and correct ARIA states (`aria-expanded`, `aria-busy`, `aria-disabled`, `aria-invalid`).
- **Focus Management:** Tab sequence order, roving tabindex, focus trapping, and focus restoration upon dismissal.
- **Screen Reader Announcements:** Live regions (`aria-live="polite"`), announcements for async states.

### 3.16 Keyboard Interaction Keymap
- Tabular APG keymap documenting every supported key:
  `Tab`, `Shift + Tab`, `Enter`, `Space`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `Escape`.
- Explicit action triggered by each key stroke.

### 3.17 Styling Contract (Scoped Static CSS & `--cl-*` Tokens)
- Scoped CSS class namespace (`.cl-<component>`, `.cl-<component>--<variant>`).
- Direct mapping to semantic CSS custom properties (`--cl-color-*`, `--cl-space-*`, `--cl-rad-*`, `--cl-shadow-*`).
- Layer isolation: must be authored within `@layer cl-components`.
- Absolute prohibition of Tailwind, runtime CSS-in-JS, and runtime `<style>` injection.

### 3.18 Theme Behavior
- Deterministic behavior across Light Mode (`[data-theme="light"]`), Dark Mode (`[data-theme="dark"]`), and System preference.
- Support for nested `<ThemeProvider>` and sub-tree theme scoping without component re-renders.

### 3.19 Responsive Behavior
- Behavior across viewport widths, flex layouts, or fluid grids.
- Explicit `N/A` if component relies solely on intrinsic inline-flex/block behavior.

### 3.20 Accessibility-Specific Motion Rules
- Behavior under `@media (prefers-reduced-motion: reduce)`.
- Transitions reset to `0.01ms !important` exclusively for vestibular safety.

### 3.21 Testing Contract
- Applicable test categories from the 7-tier matrix:
  1. Rendering & Prop Pass-through
  2. User Interaction Suite
  3. Automated Accessibility Audit (zero axe violations)
  4. Keyboard Navigation Physics
  5. Controlled vs. Uncontrolled State
  6. Disabled / Loading State Guards
  7. SSR & RSC Compatibility
- Non-applicable categories must be explicitly marked `N/A` with architectural rationale.

### 3.22 Storybook Contract
- Mandatory visual permutation stories:
  Default/Playground, All Variants Matrix, All Sizes Matrix, Interactive States, Theme Permutations (Light vs. Dark), `asChild` Composition, and Edge Cases.

### 3.23 Documentation Contract
- Public documentation layout:
  Overview, Import, Interactive Sandbox, Props API Table, Accessibility Guide, and Keyboard Navigation Table.

### 3.24 Edge Cases & Hazards
- Detailed handling of long text overflow, rapid multi-clicks, disabled-while-loading, form reset integration, and unmounting during asynchronous callbacks.

### 3.25 Acceptance Criteria
- Testable, boolean checklist verifying all architectural, functional, accessibility, and visual requirements.

### 3.26 Definition of Done
- Complete verification gates that must pass before the specification is marked `Approved` and ready for Phase 4 implementation.

---

## 4. Specification Status Lifecycle

Component specifications must progress through the following formal status lifecycle:

```
Draft  ───►  Review  ───►  Approved  ───►  Implementation Ready
```

1. **Draft:** Initial authoring in progress. May contain open questions or benchmark dependencies.
2. **Review:** Complete draft undergoing architectural peer review against Phase 1 & 2 standards.
3. **Approved:** Fully signed off; zero unresolved internal contradictions.
4. **Implementation Ready:** Bound to frozen standards, ready for component code authoring.

---

## 5. Prohibited Specification Anti-Patterns

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Specification Anti-Patterns (Prohibited)             │
├───────────────────────────────────┬────────────────────────────────────┤
│ Prohibited Anti-Pattern           │ Technical Violation                │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Dynamic polymorphic `as` prop  │ Violates `asChild` mandate; breaks │
│                                   │ TypeScript inference.              │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Hardcoded color hexes / pixels │ Violates design token architecture │
│    for reusable design values     │ and dark mode theme switching.     │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Missing Accessible Name specs  │ Violates WCAG 2.2 AA SC 4.1.2.     │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Assuming manual CSS imports    │ Violates Zero-Config Styling       │
│                                   │ requirement (ADR-007).             │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Global "use client" banner     │ Breaks RSC compatibility in Next.js│
│                                   │ App Router.                        │
└───────────────────────────────────┴────────────────────────────────────┘
```
