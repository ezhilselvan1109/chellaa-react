# Input Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)  

---

## 1. Identity

```text
Component Name:     Input
Package Export:     import { Input } from "@chellaa/react";
Category:           Forms
Status:             Approved & Implementation Ready
Phase:              3 — Component Specifications
Related Components: FormControl, FormLabel, FormErrorMessage, InputGroup, Textarea
```

---

## 2. Purpose

The `Input` component is the foundational single-line text entry primitive. It enables users to type, edit, and submit text data (names, emails, search queries, passwords, numbers) within forms and toolbars.

### When to Use
- Single-line textual input fields (names, email addresses, passwords, search queries).
- Numeric input fields (`type="number"`).
- Composed within `FormControl` for automatic label, helper text, and validation messaging.

### When NOT to Use
- **Do NOT use for multi-line text input.** Use `Textarea` for comments, bios, and descriptions.
- **Do NOT use for picking from predefined lists.** Use `Select`, `Combobox`, or `RadioGroup`.
- **Do NOT use for toggling boolean flags.** Use `Checkbox` or `Switch`.

---

## 3. Scope

### In Scope
- Native single-line input types (`text`, `email`, `password`, `number`, `search`, `tel`, `url`).
- 4 visual variants: `outline` (default), `filled`, `flushed`, `unstyled`.
- 5 standardized sizes: `xs`, `sm`, `md`, `lg`, `xl` (matching `Button` heights).
- Form validation & states: `isDisabled`, `isReadOnly`, `isInvalid`, `isRequired`.
- Integrated visual focus ring via `:focus-visible`.
- Controlled (`value`, `onChange`) and uncontrolled (`defaultValue`) support.
- Forwarded DOM ref to `HTMLInputElement`.
- Full integration with ARIA attributes (`aria-invalid`, `aria-describedby`, `aria-required`).

---

## 4. Non-Goals

- Multi-line text expansion (strictly reserved for `Textarea`).
- Higher-level composite field wrapping (handled by `FormControl` / `TextField`).
- Masked inputs (credit cards, telephone formatting; handled by specialized input mask engines).
- Polymorphic `asChild` delegation (native `<input>` is a void element; child delegation is invalid HTML).

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Input Feature Summary                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Visual Treatments  │ outline (default), filled, flushed, unstyled      │
├────────────────────┼───────────────────────────────────────────────────┤
│ Sizing Scale       │ xs (28px), sm (32px), md (40px), lg (48px),       │
│                    │ xl (56px) [Optical 1:1 match with Buttons]        │
├────────────────────┼───────────────────────────────────────────────────┤
│ Form States        │ isDisabled, isReadOnly, isInvalid, isRequired     │
├────────────────────┼───────────────────────────────────────────────────┤
│ State Management   │ Full controlled (value) & uncontrolled (defValue) │
├────────────────────┼───────────────────────────────────────────────────┤
│ Adornments         │ Composed with InputGroup for left/right elements  │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Input (HTML <input className="cl-input">)
│   .cl-input
│   .cl-input--{variant}
│   .cl-input--{size}
│   [.cl-input--invalid]
│   [.cl-input--disabled]
│   [.cl-input--readonly]
```

When composed with `InputGroup` for adornments:
```text
InputGroup (.cl-input-group)
├── [InputLeftElement]  (.cl-input-group__element--start)
├── Input               (.cl-input)
└── [InputRightElement] (.cl-input-group__element--end)
```

---

## 7. Public API

```typescript
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Input Props Dictionary                               │
├──────────────────┬─────────────────────────┬──────────┬───────────┬─────────────────────┤
│ Prop Name        │ Type                    │ Req/Opt  │ Default   │ A11y Impact         │
├──────────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────┤
│ variant          │ InputVariant            │ Optional │ "outline" │ Visual treatment    │
├──────────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────┤
│ size             │ InputSize               │ Optional │ "md"      │ Spatial dimensions  │
├──────────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────┤
│ isDisabled       │ boolean                 │ Optional │ false     │ disabled attribute; │
│                  │                         │          │           │ aria-disabled="true"│
├──────────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────┤
│ isInvalid        │ boolean                 │ Optional │ false     │ aria-invalid="true" │
├──────────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────┤
│ isReadOnly       │ boolean                 │ Optional │ false     │ readOnly attribute  │
├──────────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────┤
│ isRequired       │ boolean                 │ Optional │ false     │ required attribute; │
│                  │                         │          │           │ aria-required="true"│
├──────────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────┤
│ type             │ string                  │ Optional │ "text"    │ Semantic input type │
└──────────────────┴─────────────────────────┴──────────┴───────────┴─────────────────────┘
```

---

## 8. TypeScript Types

```typescript
export type InputVariant = "outline" | "filled" | "flushed" | "unstyled";
export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Visual aesthetic treatment of the input field.
   * @default "outline"
   */
  variant?: InputVariant;

  /**
   * Sizing scale mapped to the spatial baseline grid.
   * @default "md"
   */
  size?: InputSize;

  /**
   * If true, disables user interaction and dims the input.
   * Attaches native `disabled` and sets `aria-disabled="true"`.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * If true, flags validation error with high-contrast danger styling.
   * Automatically sets `aria-invalid="true"`.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * If true, prevents modifying the input content while keeping it focusable.
   * Attaches native `readOnly`.
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * If true, marks the field as mandatory in forms.
   * Sets `required` and `aria-required="true"`.
   * @default false
   */
  isRequired?: boolean;
}
```

---

## 9. Variants

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Input Variant Matrix                           │
├─────────────┬───────────────────────────┬──────────────────────────────┤
│ Variant     │ Visual Intent             │ Intended Application         │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ outline     │ Complete 1px border around│ Default standard form style; │
│ (Default)   │ surface background.       │ high visual distinction.     │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ filled      │ Subdued slate background; │ High-density enterprise forms│
│             │ transitions on focus.     │ reducing visual line clutter.│
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ flushed     │ Bottom border only;       │ Clean minimal designs, inline│
│             │ transparent sides/top.    │ edits, landing page forms.   │
├─────────────┼───────────────────────────┼──────────────────────────────┤
│ unstyled    │ Resets all borders and    │ Raw base for custom search   │
│             │ paddings completely.      │ widgets and specialized UIs. │
└─────────────┴───────────────────────────┴──────────────────────────────┘
```

---

## 10. Sizes

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 Input Spatial Scale Matrix                              │
├──────┬────────┬──────────────┬──────────────────┬──────────────┬────────────────────────┤
│ Size │ Height │ Horiz Pad    │ Typographic Size │ Line Height  │ Border Radius          │
├──────┼────────┼──────────────┼──────────────────┼──────────────┼────────────────────────┤
│ xs   │ 28px   │ 8px (space-2)│ 12px (font-xs)   │ 16px         │ var(--cl-rad-sm)       │
│ sm   │ 32px   │ 12px(space-3)│ 14px (font-sm)   │ 20px         │ var(--cl-rad-md)       │
│ md   │ 40px   │ 16px(space-4)│ 14px (font-sm)   │ 20px         │ var(--cl-rad-md)       │
│ lg   │ 48px   │ 20px(space-5)│ 16px (font-base) │ 24px         │ var(--cl-rad-lg)       │
│ xl   │ 56px   │ 24px(space-6)│ 18px (font-lg)   │ 28px         │ var(--cl-rad-lg)       │
└──────┴────────┴──────────────┴──────────────────┴──────────────┴────────────────────────┘
```

---

## 11. States

- **Default (Resting):** Border `--cl-color-border-def`; background `--cl-color-bg-canvas`.
- **Hover (`:hover`):** Border darkens to `--cl-color-border-str`.
- **Focus (`:focus-visible`):** Border `--cl-color-pri-base`; outline `2px solid var(--cl-color-focus-ring)`.
- **Invalid (`isInvalid`):** Border `--cl-color-dan-base`; focus ring rose glow; `aria-invalid="true"`.
- **Disabled (`isDisabled`):** Opacity `0.6`; background `--cl-color-bg-muted`; cursor `not-allowed`.
- **ReadOnly (`isReadOnly`):** Background `--cl-color-bg-muted`; cursor `default`; text selection allowed.

---

## 12. Behavior

### State Transition Matrix
| Current State | User Action | Next State | Effect |
|---|---|---|---|
| Resting | Pointer enters input | Hovered | Border color shifts to border-str |
| Hovered / Resting | Pointer click or Tab | Focused | Focus ring visible; caret active |
| Focused | Keystroke typed | Focused | Value updated; `onChange` fires |
| Focused | Tab exit or blur | Resting | Hide focus ring; `onBlur` fires |
| Any | `isInvalid=true` | Invalid | Render danger border & aria-invalid |
| Any | `isDisabled=true` | Disabled | Suppress clicks and keyboard inputs |

---

## 13. Controlled / Uncontrolled

### Controlled
```tsx
const [value, setValue] = useState("");
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Uncontrolled
```tsx
<Input defaultValue="Initial text" ref={inputRef} />
```

---

## 14. Events

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Input Event Specifications                     │
├─────────────┬────────────────────────────────┬─────────────────────────┤
│ Event Name  │ Event Signature                │ Behavioral Guarantee    │
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onChange    │ (e: React.ChangeEvent<...>)    │ Synthetic input change  │
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onFocus     │ (e: React.FocusEvent<...>)     │ Fires on DOM focus entry│
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onBlur      │ (e: React.FocusEvent<...>)     │ Fires on DOM focus exit │
├─────────────┼────────────────────────────────┼─────────────────────────┤
│ onKeyDown   │ (e: React.KeyboardEvent<...>)  │ Fires on key down       │
└─────────────┴────────────────────────────────┴─────────────────────────┘
```

---

## 15. Composition

- `Input` is a native leaf element; it does **not** support `asChild`.
- Composed with `InputGroup` for prefix/suffix elements:
  ```tsx
  <InputGroup size="md">
    <InputLeftElement><SearchIcon /></InputLeftElement>
    <Input placeholder="Search records..." />
    <InputRightElement><ClearButton /></InputRightElement>
  </InputGroup>
  ```

---

## 16. Ref Contract

- **Ref Forwarded:** Yes.
- **Ref Target:** `HTMLInputElement`.
- **Primary Use Cases:** Calling `ref.current.focus()`, `select()`, and form library integration (`react-hook-form`).

---

## 17. Accessibility

### 17.1 Semantic Element
Renders native `<input>` element with specified `type`.

### 17.2 Accessible Labeling
- Every input **must** be connected to an accessible label via `id` and `htmlFor`:
  ```tsx
  <label htmlFor="user-email">Email Address</label>
  <Input id="user-email" type="email" />
  ```
- If rendered without visible label text, an explicit `aria-label` or `aria-labelledby` is mandatory.

### 17.3 ARIA Validation Links
- `aria-invalid="true"` when `isInvalid={true}`.
- `aria-required="true"` when `isRequired={true}`.
- `aria-describedby` links to helper text or error messages.

---

## 18. Keyboard Interaction

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Input Keyboard Keymap                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Key / Combination  │ Expected APG Action                               │
├────────────────────┼───────────────────────────────────────────────────┤
│ Tab                │ Advances focus into or out of the input.          │
├────────────────────┼───────────────────────────────────────────────────┤
│ Enter              │ Submits parent form if inside a <form>.           │
├────────────────────┼───────────────────────────────────────────────────┤
│ Escape             │ Clears text in search inputs (browser default).   │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 19. Styling Contract

```css
@layer cl-components {
  .cl-input {
    width: 100%;
    min-width: 0;
    outline: none;
    font-family: var(--cl-font-sans);
    font-size: var(--cl-font-sm);
    color: var(--cl-color-fg-primary);
    background-color: var(--cl-color-bg-canvas);
    border: 1px solid var(--cl-color-border-def);
    border-radius: var(--cl-rad-md);
    transition: border-color var(--cl-duration-fast) var(--cl-ease-default),
                box-shadow var(--cl-duration-fast) var(--cl-ease-default);
  }

  .cl-input:hover:not(.cl-input--disabled):not([readonly]) {
    border-color: var(--cl-color-border-str);
  }

  .cl-input:focus-visible {
    border-color: var(--cl-color-pri-base);
    outline: 2px solid var(--cl-color-focus-ring);
    outline-offset: 1px;
  }

  /* Invalid State */
  .cl-input--invalid {
    border-color: var(--cl-color-dan-base);
  }
  .cl-input--invalid:focus-visible {
    outline-color: rgba(225, 29, 72, 0.4);
  }

  /* Disabled State */
  .cl-input--disabled {
    opacity: 0.6;
    background-color: var(--cl-color-bg-muted);
    cursor: not-allowed;
  }

  /* ReadOnly State */
  .cl-input--readonly {
    background-color: var(--cl-color-bg-muted);
    cursor: default;
  }
}
```

---

## 20. Theme Contract

- Automatically reacts to Light and Dark modes via semantic tokens (`--cl-color-bg-canvas`, `--cl-color-border-def`, `--cl-color-fg-primary`).

---

## 21. Responsive Behavior

- Defaults to `width: 100%`, adapting smoothly to parent column and grid layouts.

---

## 22. Motion

Under `@media (prefers-reduced-motion: reduce)`:
```css
@media (prefers-reduced-motion: reduce) {
  .cl-input {
    transition-duration: 0.01ms !important;
  }
}
```

---

## 23. Testing

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Input Test Matrix                              │
├───────────────────────────────────┬────────────────────────────────────┤
│ Category                          │ Applicability & Verification       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Rendering / Prop Pass-through  │ Applicable: verifies placeholder,  │
│                                   │ type, className, style, ref.       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ Applicable: typing triggers        │
│                                   │ onChange with accurate value.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Accessibility / axe-core       │ Applicable: zero violations when   │
│                                   │ properly labeled.                  │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ Applicable: Tab focus entry/exit.  │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled / Uncontrolled      │ Applicable: value prop syncing and │
│                                   │ defaultValue uncontrolled updates. │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading State Guards│ Applicable: typing suppressed when │
│                                   │ isDisabled is true.                │
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR & RSC Compatibility        │ Applicable: renders cleanly as pure│
│                                   │ Server Component (RSC).            │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 24. Storybook

1. `Default`: Interactive text input.
2. `AllVariants`: Side-by-side display of `outline`, `filled`, `flushed`, `unstyled`.
3. `AllSizes`: Matrix across all 5 sizes.
4. `ValidationStates`: Default vs. `isInvalid` vs. `isDisabled` vs. `isReadOnly`.
5. `WithAdornments`: Input composed with `InputGroup` icons.
6. `PasswordToggle`: Input with show/hide password toggle.
7. `DarkTheme`: Verified under Dark Mode contrast.

---

## 25. Documentation Requirements

- Interactive form validation sandbox.
- Copyable import: `import { Input } from "@chellaa/react"`.
- Complete Props API table.
- Form accessibility best practices (`FormControl`, `FormLabel`, `FormErrorMessage`).

---

## 26. Edge Cases

1. **Autofill Overrides:** WebKit autofill styling normalized via CSS tokens.
2. **Number Input Arrows:** Native browser increment arrows styled cleanly.
3. **Caret Position:** Switching `type="password"` to `type="text"` preserves caret position.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Input Reference Comparison Matrix                    │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ TextField (macro) │ Input (macro)      │ Input (primitive native input)│
│ InputBase (micro) │ -                  │ FormControl (macro wrapper)   │
│ variant           │ -                  │ variant (outline, filled, ...)│
│ size              │ size               │ size (xs through xl)          │
│ error             │ status="error"     │ isInvalid                     │
│ disabled          │ disabled           │ isDisabled                    │
│ startAdornment    │ prefix             │ Composed via InputGroup       │
│ asChild           │ -                  │ Rejected (Void element)       │
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Integrated Label/Helper Composition:** Handled by `FormControl` / `TextField` component in Phase 6.
- **Input Masking:** Deferred to specialized integration utility in a future release.

---

## 29. Acceptance Criteria

- [ ] Renders native `<input>` element with specified `type`.
- [ ] Supports 4 variants (`outline`, `filled`, `flushed`, `unstyled`).
- [ ] 5 sizes matching `Button` heights.
- [ ] Controlled (`value`) and uncontrolled (`defaultValue`) work reliably.
- [ ] `isInvalid` sets `aria-invalid="true"` and applies danger styling.
- [ ] `isDisabled` attaches `disabled` attribute and suppresses typing.
- [ ] Ref forwards cleanly to `HTMLInputElement`.
- [ ] Zero axe-core accessibility violations when labeled.
- [ ] Styled in `@layer cl-components` using `--cl-*` variables.

---

## 30. Definition of Done

The Input specification is approved, hardened against reference libraries, verified for cross-document consistency, and ready for Phase 4 implementation.
