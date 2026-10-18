# Input / TextField Component Specification (Single-Line Text Fields & Form Composites)

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Specification ID:** SPEC-002 / SPEC-015  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](./00-component-feature-matrix.md) & [01-api-conventions.md](./01-api-conventions.md)  
**Historical Consolidation Note:** Rev 2.0.0 canonically supersedes and consolidates legacy draft SPEC-015 (`docs/specifications/15-input.md`) into this canonical specification, unifying atomic `Input` / `InputBase`, composite `TextField`, and `InputAdornment` under a unified specification.

---

## 1. Identity

```text
Component Name:     Input, TextField, InputAdornment, InputBase
Package Export:     import { Input, TextField, InputAdornment, InputBase, type InputProps, type TextFieldProps, type InputAdornmentProps, type InputVariant, type InputSize } from "@chellaa/react";
Category:           Forms & Inputs
Status:             Approved & Implementation Baseline
Phase:              3 — Component Specifications
Related Components: FormControl, FormLabel, FormHelperText, FormErrorMessage, Textarea, Button, Kbd
```

---

## 2. Purpose

The `Input` and `TextField` components provide the **primary single-line textual data entry engine** for `@chellaa/react`. Designed to capture user input (names, emails, search queries, passwords, numbers, currency amounts), the system supports both atomic composition via `<Input>` / `<InputBase>` and high-level enterprise form integration via `<TextField>`.

By pairing tactile Material Design 3 surface styling (outlined, filled, standard, and unstyled variants) with robust focus rings, accessible label and error associations, interactive adornments (search icons, clear buttons, password reveal triggers, `Kbd` hotkeys), and rigorous validation states, `Input` ensures consistent and accessible form UX across all screen sizes.

### When to Use

- Single-line textual input fields (names, email addresses, passwords, search queries).
- Numeric & currency entries (`type="number"`, with prefix or suffix glyphs).
- Composed within `FormControl` or used directly as high-level composite `TextField` for automatic label, helper text, and validation messaging.
- Toolbar search inputs paired with leading search icons and trailing `Kbd` shortcut badges.

### When NOT to Use

- **Do NOT use for multi-line text input.** Use `Textarea` for comments, bios, and descriptions.
- **Do NOT use for picking from predefined lists.** Use `Select`, `Combobox`, or `RadioGroup`.
- **Do NOT use for toggling boolean flags.** Use `Checkbox` or `Switch`.

---

## 3. Scope

### In Scope

1. **Dual Primitive & Composite Model**:
   - `Input`: Tactile input container with borders, background, sizes, and adornments.
   - `TextField`: High-level composite managing `<FormLabel>`, `<Input>`, and helper/error text.
   - `InputAdornment`: Prefix/suffix element wrapper for icons, units, chips, and hotkeys.
2. **Visual Variants**:
   - `"outlined"` / `"outline"` (default): Material Design 3 continuous border with tactile focus ring.
   - `"filled"`: Tinted background surface with bottom indicator hairline.
   - `"standard"` / `"flushed"`: Borderless flushed input with underline indicator.
   - `"unstyled"`: Naked input element without borders or padding for bespoke embedded inputs.
3. **Proportional Size Scale**:
   - `"sm"`: 32px height (matches Button `sm`).
   - `"md"`: 40px height (standard default, matches Button `md`).
   - `"lg"`: 48px height (prominent touch target, matches Button `lg`).
4. **Adornments & Add-ons**:
   - `startAdornment`: Leading icons, currency prefixes, protocol labels.
   - `endAdornment`: Trailing icons, password visibility toggles, clear buttons, `Kbd` shortcut badges.
   - `clearable`: Built-in one-click clear button when input has text.
5. **Interactive & Validation States**:
   - States: default, hover, focus (`:focus-within` / `:focus-visible` ring), `disabled` / `isDisabled`, `readOnly` / `isReadOnly`, `error` / `isInvalid`.
   - Error styling: High-contrast danger border, focus glow, and automated error text link via `aria-describedby`.
6. **Form & State Management**:
   - Full support for both controlled (`value`, `onChange`) and uncontrolled (`defaultValue`) modes.
   - Native HTML input attributes forwarded directly to the underlying `<input>` element.
7. **Polymorphic Composition**:
   - `asChild` composition via `Slot`, `component`, and `as`.
8. **Emotion & Theme Token Integration**:
   - Styled using zero-runtime CSS tokens (`@layer cl-components`) and theme token overrides via `sx`.

### Non-Goals

- Multi-line text expansion (strictly reserved for `Textarea`).
- Async search dropdown menus (reserved for `Autocomplete` / `Combobox`).
- Masked inputs (credit cards, telephone formatting; handled by specialized input mask engines).
- Native keyboard event swallowing: `Input` does NOT swallow `onKeyDown`, `onKeyUp`, or `onInput`.
- Browser password manager or autofill interference: `Input` fully supports standard `autocomplete` attributes.

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Input & TextField Feature Summary                    │
├────────────────────┬───────────────────────────────────────────────────┤
│ Visual Treatments  │ outlined (default), filled, standard, unstyled    │
├────────────────────┼───────────────────────────────────────────────────┤
│ Sizing Scale       │ sm (32px), md (40px), lg (48px)                   │
│                    │ [Optical 1:1 match with Buttons]                  │
├────────────────────┼───────────────────────────────────────────────────┤
│ Form States        │ error/isInvalid, disabled/isDisabled, readOnly,   │
│                    │ required/isRequired                               │
├────────────────────┼───────────────────────────────────────────────────┤
│ State Management   │ Full controlled (value) & uncontrolled (defValue) │
├────────────────────┼───────────────────────────────────────────────────┤
│ Adornments         │ startAdornment, endAdornment, InputAdornment       │
├────────────────────┼───────────────────────────────────────────────────┤
│ Clearable          │ Interactive clear button when input has value     │
├────────────────────┼───────────────────────────────────────────────────┤
│ Composite          │ <TextField> combines Label, Input, and HelperText │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

### 6.1 Atomic Input Anatomy

```text
Input Container (div.cl-input or custom component)
├── [startAdornment]     (.cl-input__adornment--start)
├── native <input>       (.cl-input__field)
│   .cl-input--{variant}
│   .cl-input--{size}
│   [.cl-input--error / .cl-input--invalid]
│   [.cl-input--disabled]
│   [.cl-input--readonly]
└── [endAdornment]       (.cl-input__adornment--end)
    └── [Clear Button]   (.cl-input__clear-btn)
```

### 6.2 Composite TextField Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ TextField Root (display: flex; flex-direction: column; width: 100%)    │
│                                                                        │
│  FormLabel (font-size: 0.875rem; font-weight: 500; color: text.primary)│
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Email Address *                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  Input Container (border: 1px solid divider; border-radius: 4px)       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ ┌───────────────┐ ┌───────────────────────────┐ ┌──────────────┐ │  │
│  │ │ startAdornment│ │ Native <input>            │ │ endAdornment │ │  │
│  │ │ (e.g. MailIcon│ │ (flex: 1; border: none)   │ │ (e.g. Clear /│ │  │
│  │ │               │ │                           │ │  Kbd ⌘K)     │ │  │
│  │ └───────────────┘ └───────────────────────────┘ └──────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  FormHelperText / ErrorMessage (font-size: 0.75rem; margin-top: 4px)   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ We will never share your email with third parties.               │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Public API & TypeScript Contracts

```typescript
import type { ElementType, InputHTMLAttributes, ReactNode, Ref } from "react";
import type { SxProps } from "../../system/types";

export type InputVariant = "outlined" | "filled" | "standard" | "unstyled";
export type InputSize = "sm" | "md" | "lg";

export interface InputOwnerState {
  variant?: InputVariant | undefined;
  size?: InputSize | undefined;
  fullWidth?: boolean | undefined;
  error?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  hasStartAdornment?: boolean | undefined;
  hasEndAdornment?: boolean | undefined;
  focused?: boolean | undefined;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    InputOwnerState {
  /** If true, delegate rendering to immediate child element using Slot */
  asChild?: boolean | undefined;
  /** The underlying HTML element or component for root wrapper */
  component?: ElementType | undefined;
  /** Alias for component */
  as?: ElementType | undefined;
  /** The system-aware sx prop for dynamic runtime overrides */
  sx?: SxProps;
  /** Additional props forwarded to native input element */
  inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined;
  /** Content rendered at the start of the input track */
  startAdornment?: ReactNode | undefined;
  /** Content rendered at the end of the input track */
  endAdornment?: ReactNode | undefined;
  /** If true, displays an interactive clear button when text is present */
  clearable?: boolean | undefined;
  /** Callback fired when the clear button is clicked */
  onClear?: () => void;
  /** Ref forwarded directly to the native <input> element */
  inputRef?: Ref<HTMLInputElement>;
  /** Compatibility alias for error */
  isInvalid?: boolean;
  /** Compatibility alias for disabled */
  isDisabled?: boolean;
  /** Compatibility alias for readOnly */
  isReadOnly?: boolean;
  /** Compatibility alias for required */
  isRequired?: boolean;
}

export interface TextFieldProps extends Omit<InputProps, "prefix"> {
  /** The label text displayed above the input. */
  label?: ReactNode | undefined;
  /** Explanatory helper text displayed below the input. */
  helperText?: ReactNode | undefined;
  /** Error message displayed below the input when error is true. */
  errorMessage?: ReactNode | undefined;
  /** If true, displays a required asterisk next to the label. */
  required?: boolean | undefined;
}

export interface InputAdornmentProps {
  position: "start" | "end";
  children?: ReactNode | undefined;
  sx?: SxProps;
}
```

---

## 8. Mathematics & Proportions

### 8.1 Size Dimensions Matrix

| Size Token | Container Height | Font Size | Horizontal Padding | Icon / Adornment Size |
| :--- | :--- | :--- | :--- | :--- |
| `"sm"` | `32px` | `0.8125rem` (13px) | `10px` | `16px` |
| `"md"` *(default)* | `40px` | `0.875rem` (14px) | `12px` | `20px` |
| `"lg"` | `48px` | `1rem` (16px) | `16px` | `24px` |

### 8.2 Border & Focus Ring Tokens

- **Default Border:** `1px solid var(--cl-color-border-def)`
- **Hover Border:** `1px solid var(--cl-color-border-str)`
- **Focus Ring:** `2px solid var(--cl-color-pri-base)` with glow `0 0 0 2px rgba(59, 130, 246, 0.25)`
- **Error Border:** `2px solid var(--cl-color-dan-base)` with glow `0 0 0 2px rgba(225, 29, 72, 0.25)`
- **Disabled State:** Opacity `0.38`, pointer-events `none`, background `var(--cl-color-bg-muted)`

---

## 9. Variants

| Variant | Visual Treatment | Intended Application |
| :--- | :--- | :--- |
| **`outlined`** (Default) | Continuous 1px border around surface background. Focus transitions smoothly to 2px primary border. | Default standard form style; high visual distinction. |
| **`filled`** | Tinted subdued background with bottom hairline indicator. | High-density enterprise forms; reduces visual border clutter. |
| **`standard`** | Transparent background with bottom hairline indicator only. | Clean minimal designs, inline table row edits. |
| **`unstyled`** | Resets all borders and paddings completely. | Raw base for bespoke search widgets and embedded toolbars. |

---

## 10. States & Behavior

### 10.1 Interactive Clear Button (`clearable`)

When `clearable={true}` is enabled:
- If the input is empty, no clear button is rendered.
- Once text is typed, an interactive `×` icon button appears in the `endAdornment` slot.
- Clicking the clear button clears the input value, invokes `onClear` / `onChange`, and maintains focus on the input element.

### 10.2 State Transition Matrix

| Current State | User Action | Next State | Effect |
| :--- | :--- | :--- | :--- |
| Resting | Pointer enters input | Hovered | Border color shifts to border-str |
| Hovered / Resting | Pointer click or Tab | Focused | Focus ring visible; caret active |
| Focused | Keystroke typed | Focused | Value updated; `onChange` fires; clear button visible if clearable |
| Focused | Tab exit or blur | Resting | Hide focus ring; `onBlur` fires |
| Any | `error=true` / `isInvalid=true` | Invalid | Render danger border & `aria-invalid="true"` |
| Any | `disabled=true` / `isDisabled=true` | Disabled | Suppress clicks and keyboard inputs; dim opacity |

---

## 11. Controlled / Uncontrolled Support

### Controlled

```tsx
const [value, setValue] = useState("");
<Input value={value} onChange={(e) => setValue(e.target.value)} clearable onClear={() => setValue("")} />
```

### Uncontrolled

```tsx
<Input defaultValue="Initial text" ref={inputRef} />
```

---

## 12. Accessibility & WAI-ARIA Standards

- **Accessible Labeling:**
  - Every input must be connected to an accessible label via `id` and `htmlFor`.
  - The `TextField` composite automatically generates a unique ID (via React `useId()`) linking `<FormLabel htmlFor={id}>` directly to `<input id={id}>`.
  - When rendered without visible label text, an explicit `aria-label` or `aria-labelledby` is mandatory.
- **Description & Error Association:**
  - Helper text is linked via `aria-describedby="{id}-helper"`.
  - When in error state, error message is linked via `aria-describedby="{id}-error"`.
- **Validation Semantics:**
  - `error={true}` / `isInvalid={true}` injects `aria-invalid="true"`.
  - `required={true}` / `isRequired={true}` injects `aria-required="true"`.
  - `disabled={true}` applies native `disabled` and `aria-disabled="true"`.
- **Contrast Compliance:**
  - Placeholder and text maintain a minimum of $4.5:1$ contrast ratio under both Light and Dark themes.

---

## 13. Composition & Polymorphism Patterns

### 13.1 Search Bar with Adornment and Kbd Shortcut

```tsx
<Input
  placeholder="Search components..."
  startAdornment={<SearchIcon />}
  endAdornment={
    <Flex align="center" gap={0.5}>
      <Kbd size="sm" modifier="command" />
      <Kbd size="sm">K</Kbd>
    </Flex>
  }
  fullWidth
/>
```

### 13.2 Password Input with Reveal Toggle

```tsx
function PasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <TextField
      label="Password"
      type={showPassword ? "text" : "password"}
      endAdornment={
        <IconButton
          size="sm"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </IconButton>
      }
      required
    />
  );
}
```

### 13.3 Enterprise Form Field with Validation

```tsx
<TextField
  label="Email Address"
  type="email"
  placeholder="alex@company.com"
  error={isEmailInvalid}
  errorMessage="Please enter a valid work email address."
  helperText="Used strictly for account recovery and notifications."
  required
  fullWidth
/>
```

---

## 14. Styling & Theme Contract

```css
@layer cl-components {
  .cl-input {
    width: 100%;
    min-width: 0;
    outline: none;
    font-family: var(--cl-font-family-sans, var(--cl-font-sans));
    font-size: var(--cl-font-size-sm, var(--cl-font-sm));
    color: var(--cl-color-text-primary, var(--cl-color-fg-primary));
    background-color: var(--cl-color-bg-canvas);
    border: 1px solid var(--cl-color-border-def);
    border-radius: var(--cl-radius-md, var(--cl-rad-md));
    transition:
      border-color var(--cl-motion-fast, var(--cl-duration-fast)) var(--cl-easing-standard, var(--cl-ease-default)),
      box-shadow var(--cl-motion-fast, var(--cl-duration-fast)) var(--cl-easing-standard, var(--cl-ease-default));
  }

  .cl-input:hover:not(.cl-input--disabled):not([readonly]) {
    border-color: var(--cl-color-border-str);
  }

  .cl-input:focus-within {
    border-color: var(--cl-color-primary, var(--cl-color-pri-base));
    outline: 2px solid var(--cl-color-focus, var(--cl-color-focus-ring));
    outline-offset: 1px;
  }

  .cl-input--error,
  .cl-input--invalid {
    border-color: var(--cl-color-error-base, var(--cl-color-dan-base));
  }

  .cl-input--disabled {
    opacity: 0.38;
    background-color: var(--cl-color-bg-muted);
    cursor: not-allowed;
    pointer-events: none;
  }

  .cl-input--readonly {
    background-color: var(--cl-color-bg-muted);
    cursor: default;
  }
}
```

---

## 15. Testing Verification Matrix

Every implementation of `Input` and `TextField` must satisfy this 100% test contract:

1. **Rendering & Prop Pass-through:**
   - Renders native `<input>` element with specified attributes (`type`, `placeholder`, `name`, `disabled`, `readOnly`).
   - Forwards refs directly to `HTMLInputElement`.
2. **Variants & Sizes:**
   - `outlined`, `filled`, `standard`, `unstyled` apply corresponding visual classes and CSS tokens.
   - `sm` (32px), `md` (40px), `lg` (48px) adhere to Button matching scale.
3. **Controlled & Uncontrolled Functionality:**
   - Typing triggers `onChange` with accurate updated value.
   - Controlled `value` prop updates cleanly without uncontrolled-to-controlled warnings.
4. **Adornments & Clear Button:**
   - Renders `startAdornment` and `endAdornment`.
   - `clearable={true}` shows clear button only when input has content.
   - Clicking clear button resets value to empty string and invokes `onClear` / `onChange`.
5. **TextField Composite Integration:**
   - Associates `<FormLabel>` with input `id`.
   - Displays `helperText` linked via `aria-describedby`.
   - When `error={true}`, displays `errorMessage` and attaches `aria-invalid="true"`.
6. **Accessibility (axe-core):**
   - Zero automated accessibility violations for standard, adorned, and validation states.

---

## 16. Storybook Requirements

1. `Default`: Interactive text input with controls for variant and size.
2. `AllVariants`: Side-by-side display of `outlined`, `filled`, `standard`, and `unstyled`.
3. `AllSizes`: Spatial matrix across `sm`, `md`, `lg`.
4. `ValidationStates`: Default vs. Error vs. Disabled vs. ReadOnly.
5. `WithAdornments`: Input composed with leading search icon and trailing hotkey chip.
6. `Clearable`: Demonstrating interactive clear button behavior.
7. `TextFieldComposite`: Complete form field with label, helper text, and validation.
8. `DarkTheme`: Contrast verification under dark mode.

---

## 17. Acceptance Criteria

- [x] Renders native `<input>` element with specified `type`.
- [x] Supports 4 variants (`outlined`, `filled`, `standard`, `unstyled`).
- [x] 3 sizes (`sm`, `md`, `lg`) matching `Button` heights.
- [x] Supports `startAdornment` and `endAdornment`.
- [x] Supports `clearable` with interactive clear button.
- [x] Composite `<TextField>` integrates label, helperText, and errorMessage.
- [x] Controlled (`value`) and uncontrolled (`defaultValue`) work reliably.
- [x] `error` / `isInvalid` sets `aria-invalid="true"` and applies danger styling.
- [x] `disabled` / `isDisabled` attaches `disabled` and suppresses interaction.
- [x] Ref forwards cleanly to `HTMLInputElement`.
- [x] Zero axe-core accessibility violations when labeled.
- [x] Styled in `@layer cl-components` using `--cl-*` variables.

---

## 18. Definition of Done

The Input and TextField specifications are approved, hardened against reference libraries, verified against actual implementation in `packages/react/src/components/Input/`, and established as the single canonical source of truth for single-line text inputs in Chellaa React.
