# Button Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Button
Package Export:     import { Button } from "@chellaa/react";
Category:           Actions
Status:             Approved & Implementation Ready
Phase:              3 — Component Specifications
Related Components: IconButton, ButtonGroup
```

---

## 2. Purpose

The `Button` component is the fundamental interactive primitive for triggering immediate user actions, submitting forms, opening dialogs, and initiating asynchronous processes.

### When to Use

- Triggering immediate actions ("Save", "Delete", "Add to Cart").
- Submitting or resetting HTML forms (`type="submit"`, `type="reset"`).
- Opening modals, dialogs, drawers, and menus.
- Navigating to another page when composed with an anchor or router link using `asChild`.

### When NOT to Use

- **Do NOT use for plain hyperlinked navigation** without `asChild`. Renders must be semantic links.
- **Do NOT use as a passive text pill or status indicator.** Use `Badge` instead.
- **Do NOT nest inside another interactive control** (e.g. inside an anchor tag or clickable card).

---

## 3. Scope

### In Scope

- 5 visual variants: `solid`, `outline`, `ghost`, `subtle`, `link`.
- 5 standardized sizes: `xs`, `sm`, `md`, `lg`, `xl` (matching `Input` heights).
- 6 semantic color schemes: `primary`, `secondary`, `success`, `warning`, `danger`, `info`.
- Asynchronous loading state (`isLoading`, `loadingText`, `loadingPosition`).
- Complete disabled state handling (`isDisabled`, native `disabled`).
- Leading and trailing icon slots (`startIcon`, `endIcon`).
- Full-width layout stretching (`isFullWidth`).
- Polymorphic slot delegation via `asChild`.
- Safe default button type (`type="button"`).
- Keyboard activation physics (Enter and Space).
- Forwarded DOM ref to `HTMLButtonElement`.

---

## 4. Non-Goals

- Material-style ripple effects (tactile micro-scale `scale(0.98)` preferred).
- Split button dropdown menus (handled by dedicated `MenuButton` / `Dropdown` in a later phase).
- Multi-button selection toggle logic (handled by `ButtonGroup` / `ToggleGroup`).
- Arbitrary `sx` or inline style property systems.

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Button Feature Summary                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Visual Treatments  │ solid (default), outline, ghost, subtle, link     │
├────────────────────┼───────────────────────────────────────────────────┤
│ Sizing Scale       │ xs (28px), sm (32px), md (40px), lg (48px),       │
│                    │ xl (56px) [Optical 1:1 match with Form Inputs]    │
├────────────────────┼───────────────────────────────────────────────────┤
│ Semantic Palettes  │ primary, secondary, success, warning, danger, info│
├────────────────────┼───────────────────────────────────────────────────┤
│ Micro-Interactions │ Tactile scale(0.98) on active; high-contrast focus│
├────────────────────┼───────────────────────────────────────────────────┤
│ Async States       │ isLoading with animated SVG spinner & aria-busy   │
├────────────────────┼───────────────────────────────────────────────────┤
│ Composition        │ asChild slot delegation (Next.js / Router Link)   │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Button (HTML <button> or delegated asChild element)
│   .cl-button
│   .cl-button--{variant}
│   .cl-button--{size}
│   .cl-button--{colorScheme}
│   [.cl-button--loading]
│   [.cl-button--disabled]
│   [.cl-button--full-width]
│
├── [Slot: Start Icon / Spinner] (.cl-button__icon--start)
├── [Slot: Children / Label]     (.cl-button__label)
└── [Slot: End Icon]             (.cl-button__icon--end)
```

---

## 7. Public API

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  isLoading?: boolean;
  loadingText?: string;
  loadingPosition?: "start" | "end" | "center";
  isDisabled?: boolean;
  isFullWidth?: boolean;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  asChild?: boolean;
  children?: React.ReactNode;
}
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Button Props Dictionary                               │
├─────────────────┬───────────────────────────┬──────────┬───────────┬────────────────────┤
│ Prop Name       │ Type                      │ Req/Opt  │ Default   │ A11y Impact        │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ variant         │ ButtonVariant             │ Optional │ "solid"   │ Visual treatment   │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ size            │ ButtonSize                │ Optional │ "md"      │ Spatial dimension  │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ colorScheme     │ ButtonColorScheme         │ Optional │ "primary" │ Color contrast     │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ isLoading       │ boolean                   │ Optional │ false     │ aria-busy="true";  │
│                 │                           │          │           │ clicks suppressed. │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ loadingText     │ string                    │ Optional │ undefined │ Screen reader text │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ loadingPosition │ "start" | "end" | "center"│ Optional │ "start"   │ Spinner placement  │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ isDisabled      │ boolean                   │ Optional │ false     │ disabled attribute │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ isFullWidth     │ boolean                   │ Optional │ false     │ 100% width         │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ startIcon       │ React.ReactElement        │ Optional │ undefined │ aria-hidden="true" │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ endIcon         │ React.ReactElement        │ Optional │ undefined │ aria-hidden="true" │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ asChild         │ boolean                   │ Optional │ false     │ Slot delegation    │
├─────────────────┼───────────────────────────┼──────────┼───────────┼────────────────────┤
│ type            │ "button"|"submit"|"reset" │ Optional │ "button"  │ Safe default type  │
└─────────────────┴───────────────────────────┴──────────┴───────────┴────────────────────┘
```

---

## 8. TypeScript Types

```typescript
export type ButtonVariant = "solid" | "outline" | "ghost" | "subtle" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonColorScheme =
  "primary" | "secondary" | "success" | "warning" | "danger" | "info";
export type ButtonLoadingPosition = "start" | "end" | "center";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual aesthetic treatment of the button.
   * @default "solid"
   */
  variant?: ButtonVariant;

  /**
   * Sizing scale mapped to the spatial baseline grid.
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Semantic color intent.
   * @default "primary"
   */
  colorScheme?: ButtonColorScheme;

  /**
   * If true, displays an animated spinner and suppresses user interaction.
   * Automatically sets `aria-busy="true"`.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Optional accessible text displayed alongside the spinner when `isLoading` is true.
   */
  loadingText?: string;

  /**
   * Position of the loading spinner relative to the label.
   * @default "start"
   */
  loadingPosition?: ButtonLoadingPosition;

  /**
   * If true, the button is disabled and completely non-interactive.
   * Attaches the native `disabled` attribute.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * If true, the button expands to fill 100% of its parent container.
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Leading icon rendered before the button label.
   * Automatically assigned `aria-hidden="true"`.
   */
  startIcon?: React.ReactElement;

  /**
   * Trailing icon rendered after the button label.
   * Automatically assigned `aria-hidden="true"`.
   */
  endIcon?: React.ReactElement;

  /**
   * If true, delegates rendering to the immediate child element.
   * @default false
   */
  asChild?: boolean;
}
```

---

## 9. Variants

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Button Variant Matrix                           │
├─────────────┬───────────────────────────┬──────────────────────────────┤
│ Variant     │ Visual Intent             │ Intended Application         │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ solid       │ Filled saturated surface; │ Primary screen action        │
│ (Default)   │ highest visual priority.  │ (e.g. "Save", "Submit").     │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ outline     │ 1px border with clear bg; │ Secondary actions alongside  │
│             │ medium emphasis.          │ a solid button ("Cancel").   │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ ghost       │ Transparent bg until      │ Low-emphasis actions, tool-  │
│             │ hovered; minimal weight.  │ bars, table row actions.     │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ subtle      │ Soft tinted background;   │ Tertiary callouts, soft      │
│             │ tone-on-tone treatment.   │ secondary actions.           │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ link        │ Underlined text appearance│ Inline actions that trigger  │
│             │ without button container. │ non-navigational behavior.   │
└─────────────┴───────────────────────────┴──────────────────────────────┘
```

---

## 10. Sizes

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                Button Spatial Scale Matrix                              │
├──────┬────────┬──────────────┬──────────────────┬──────────────┬────────────┬───────────┤
│ Size │ Height │ Horiz Pad    │ Typographic Size │ Line Height  │ Gap        │ Icon Size │
├──────┼────────┼──────────────┼──────────────────┼──────────────┼────────────┼───────────┤
│ xs   │ 28px   │ 8px (space-2)│ 12px (font-xs)   │ 16px         │ 4px (sp-1) │ 14px      │
│ sm   │ 32px   │ 12px(space-3)│ 14px (font-sm)   │ 20px         │ 6px        │ 16px      │
│ md   │ 40px   │ 16px(space-4)│ 14px (font-sm)   │ 20px         │ 8px (sp-2) │ 18px      │
│ lg   │ 48px   │ 20px(space-5)│ 16px (font-base) │ 24px         │ 10px       │ 20px      │
│ xl   │ 56px   │ 24px(space-6)│ 18px (font-lg)   │ 28px         │ 12px (sp-3)│ 24px      │
└──────┴────────┴──────────────┴──────────────────┴──────────────┴────────────┴───────────┘
```

---

## 11. States

- **Default (Resting):** Base surface and border tokens; zero translation.
- **Hover (`:hover`):** Shift to hover token (`--cl-color-pri-hover`); `cursor: pointer`.
- **Focus (`:focus-visible`):** High-contrast focus ring (`outline: 2px solid var(--cl-color-focus-ring); outline-offset: 2px;`).
- **Active (`:active`):** Shift to active token (`--cl-color-pri-active`); tactile micro-scale `transform: scale(0.98);`.
- **Disabled (`isDisabled`):** Opacity `0.6`; `cursor: not-allowed;`; pointer events suppressed; native `disabled` attached.
- **Loading (`isLoading`):** `aria-busy="true"`; pointer events suppressed; animated spinner rendered; label intact or replaced by `loadingText`.

---

## 12. Behavior

### State Transition Matrix

| Current State | User Action         | Next State | Effect                                  |
| ------------- | ------------------- | ---------- | --------------------------------------- |
| Resting       | Hover over button   | Hovered    | Apply hover color token; pointer cursor |
| Hovered       | Pointer down        | Active     | Apply active color token; scale(0.98)   |
| Active        | Pointer release     | Hovered    | Fire `onClick` event                    |
| Resting       | Tab focus           | Focused    | Render visible 2px focus ring           |
| Focused       | Enter / Space press | Active     | Fire `onClick` event                    |
| Any           | `isDisabled=true`   | Disabled   | Suppress clicks; attach native disabled |
| Any           | `isLoading=true`    | Loading    | Display spinner; set `aria-busy="true"` |

---

## 13. Controlled / Uncontrolled

```text
Controlled / Uncontrolled State:
N/A — Button is a stateless action primitive. It does not manage internal value state.
```

---

## 14. Events

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Button Event Specifications                     │
├─────────────┬────────────────────────────────┬─────────────────────────┤
│ Event Name  │ Event Signature                │ Behavioral Guarantee    │
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onClick     │ (event: React.MouseEvent)      │ Fires on click or Enter/│
│             │ => void                        │ Space. Suppressed when  │
│             │                                │ disabled or loading.    │
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onKeyDown   │ (event: React.KeyboardEvent)   │ Native keyboard event;  │
│             │ => void                        │ Space/Enter triggers.   │
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onFocus     │ (event: React.FocusEvent)      │ Fires upon focus entry. │
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onBlur      │ (event: React.FocusEvent)      │ Fires upon focus exit.  │
└─────────────┴────────────────────────────────┴─────────────────────────┘
```

---

## 15. Composition

### `asChild` Slot Delegation

`Button` supports `asChild` for zero-DOM router link delegation:

```tsx
<Button asChild variant="primary" size="md">
  <Link href="/analytics">View Analytics</Link>
</Button>
```

- Merges `.cl-button` classes onto child element.
- Composes synthetic event handlers (`onClick`, `onKeyDown`).
- Merges forwarded DOM ref via `mergeRefs`.

---

## 16. Ref Contract

- **Ref Forwarded:** Yes.
- **Ref Target:** `HTMLButtonElement` (or child DOM element when `asChild=true`).
- **Compatibility:** Implemented with forward-compatible ref wrapper supporting React 18 (`React.forwardRef`) and React 19 prop refs.

---

## 17. Accessibility

### 17.1 Semantic HTML

Renders native `<button type="button">` by default.

### 17.2 Accessible Names

- Derived automatically from children text content.
- **Icon-Only Rule:** If children contain no visible text, developer must supply `aria-label`:
  ```tsx
  <Button aria-label="Close dialog" startIcon={<CloseIcon />} />
  ```

### 17.3 ARIA Attributes

- `aria-busy="true"` when `isLoading=true`.
- `aria-hidden="true"` automatically attached to icons (`startIcon`, `endIcon`).

---

## 18. Keyboard Interaction

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Button Keyboard Keymap                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Key / Combination  │ Expected APG Action                               │
├────────────────────┼───────────────────────────────────────────────────┤
│ Tab                │ Advances focus onto the button.                   │
├────────────────────┼───────────────────────────────────────────────────┤
│ Shift + Tab        │ Moves focus to previous element.                  │
├────────────────────┼───────────────────────────────────────────────────┤
│ Enter              │ Activates button, firing onClick.                 │
├────────────────────┼───────────────────────────────────────────────────┤
│ Space              │ Activates button on keydown/keyup.                │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 19. Styling Contract

```css
@layer cl-components {
  .cl-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    user-select: none;
    font-family: var(--cl-font-sans);
    font-weight: 500;
    border-radius: var(--cl-rad-md);
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition:
      background-color var(--cl-duration-fast) var(--cl-ease-default),
      border-color var(--cl-duration-fast) var(--cl-ease-default),
      transform var(--cl-duration-fast) var(--cl-ease-default);
  }

  .cl-button:focus-visible {
    outline: 2px solid var(--cl-color-focus-ring);
    outline-offset: 2px;
  }

  .cl-button--full-width {
    width: 100%;
  }

  .cl-button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  .cl-button--loading {
    cursor: wait;
    pointer-events: none;
  }

  /* Solid Variant */
  .cl-button--solid.cl-button--primary {
    background-color: var(--cl-color-pri-base);
    color: var(--cl-color-pri-fg);
  }
  .cl-button--solid.cl-button--primary:hover:not(.cl-button--disabled) {
    background-color: var(--cl-color-pri-hover);
  }
  .cl-button--solid.cl-button--primary:active:not(.cl-button--disabled) {
    background-color: var(--cl-color-pri-active);
    transform: scale(0.98);
  }
}
```

---

## 20. Theme Contract

- Fully responsive to Light and Dark modes via semantic tokens (`--cl-color-pri-base`, `--cl-color-pri-fg`).
- Zero component re-renders on theme toggling (`data-theme="dark"`).

---

## 21. Responsive Behavior

- `inline-flex` by default.
- Expands to fluid 100% width when `isFullWidth={true}` is declared.

---

## 22. Motion

Under `@media (prefers-reduced-motion: reduce)`:

```css
@media (prefers-reduced-motion: reduce) {
  .cl-button,
  .cl-button__spinner {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 23. Testing

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Button Test Matrix                              │
├───────────────────────────────────┬────────────────────────────────────┤
│ Category                          │ Applicability & Verification       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Rendering / Prop Pass-through  │ Applicable: verifies className,    │
│                                   │ inline style, ref forwarding.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ Applicable: verifies onClick,      │
│                                   │ startIcon, endIcon rendering.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Accessibility / axe-core       │ Applicable: zero violations under  │
│                                   │ vitest-axe across all variants.    │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ Applicable: Space & Enter activate;│
│                                   │ Tab moves focus onto button.       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled / Uncontrolled      │ N/A — Stateless action primitive.  │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading State Guards│ Applicable: clicks suppressed when │
│                                   │ isDisabled or isLoading are true.  │
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR & RSC Compatibility        │ Applicable: pure Server Component  │
│                                   │ compatibility; no window access.   │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 24. Storybook

Mandatory stories in `Button.stories.tsx`:

1. `Default`: Interactive playground with Storybook controls.
2. `AllVariants`: Side-by-side comparison of `solid`, `outline`, `ghost`, `subtle`, `link`.
3. `AllSizes`: Matrix across `xs`, `sm`, `md`, `lg`, `xl`.
4. `ColorSchemes`: All 6 semantic color schemes.
5. `WithIcons`: `startIcon`, `endIcon`, and icon-only configurations.
6. `LoadingState`: Demonstrating `isLoading` with `loadingText` and `loadingPosition`.
7. `FullWidth`: Demonstrating `isFullWidth`.
8. `AsChildLink`: Next.js / React Router link composition.
9. `ThemePermutation`: Verified under Light and Dark modes.

---

## 25. Documentation Requirements

- Interactive sandbox with live JSX code editor.
- Copyable zero-config import: `import { Button } from "@chellaa/react"`.
- Complete Props API table with TSDoc descriptions.
- Accessibility guide covering icon-only buttons and accessible names.

---

## 26. Edge Cases

1. **Double Click Prevention:** Loading state immediately disables click handlers to avoid duplicate form submissions.
2. **Icon Optical Centering:** Symmetrical margins ensure start and end icons align with capital letter x-heights.
3. **Truncation:** Long button labels inside flex parents must not break layout; label container handles text overflow.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Button Reference Comparison Matrix                   │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ variant           │ type               │ variant (solid, outline, etc) │
│ size              │ size               │ size (xs through xl)          │
│ color             │ danger             │ colorScheme (6 semantic ramps)│
│ startIcon/endIcon │ icon               │ startIcon / endIcon           │
│ fullWidth         │ block              │ isFullWidth                   │
│ loading           │ loading            │ isLoading + loadingText       │
│ disableRipple     │ -                  │ Rejected (Tactile scale(0.98))│
│ sx                │ style              │ Scoped tokens (--cl-*)        │
│ component (polym) │ href               │ asChild (Radix-style slot)    │
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Split Button with Dropdown:** Deferred to dedicated `MenuButton` / `Dropdown` component in Phase 6.
- **Button Toggle Group:** Deferred to `ButtonGroup` / `ToggleGroup` in Phase 6.

---

## 29. Acceptance Criteria

- [ ] Renders native `<button type="button">` by default.
- [ ] Supports 5 variants (`solid`, `outline`, `ghost`, `subtle`, `link`).
- [ ] Supports 5 sizes (`xs` through `xl`) matching input heights.
- [ ] Supports 6 color schemes with WCAG AA contrast.
- [ ] `isLoading` sets `aria-busy="true"` and displays spinner.
- [ ] `isDisabled` attaches native `disabled` and suppresses clicks.
- [ ] `isFullWidth` stretches button to 100% width.
- [ ] `asChild` cleanly delegates to child link or button.
- [ ] Keyboard navigation operable via Enter and Space.
- [ ] Zero axe-core accessibility violations.
- [ ] Ref forwards correctly to root DOM node.
- [ ] Styled strictly in `@layer cl-components` using `--cl-*` variables.

---

## 30. Definition of Done

The Button specification is approved, hardened against reference libraries, verified for cross-document consistency, and ready for Phase 4 implementation.
