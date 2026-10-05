# Input / TextField Component Specification (Single-Line Text Fields & Form Composites)

**Document Status:** Approved & Baseline  
**Phase:** Phase 2 — Core Form Controls  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Input, TextField, InputAdornment, InputBase
Package Export:     import { Input, TextField, InputAdornment, InputBase, type InputProps, type TextFieldProps, type InputAdornmentProps, type InputVariant, type InputSize } from "@chellaa/react";
Category:           Forms & Inputs
Status:             Approved & Implementation Baseline
Phase:              Phase 2 — Core Form Controls
Related Components: FormField, FormLabel, FormHelperText, Textarea, Button, Kbd
```

---

## 2. Purpose

The `Input` and `TextField` components provide the **primary single-line textual data entry engine** for `@chellaa/react`. Designed to capture user input (names, emails, search queries, passwords, numbers, currency amounts), the system supports both atomic composition via `<Input>` / `<InputBase>` and high-level enterprise form integration via `<TextField>`.

By pairing tactile Material Design 3 surface styling (outlined, filled, and standard variants) with robust focus rings, accessible label and error associations, interactive adornments (search icons, clear buttons, password reveal triggers, `Kbd` hotkeys), and rigorous validation states, `Input` ensures consistent and accessible form UX across all screen sizes.

### When to Use

- **Single-Line Text Fields**: Names, phone numbers, emails, passwords, website URLs.
- **Search Boxes & Filter Inputs**: Toolbar search inputs paired with leading search icons and trailing `Kbd` shortcut badges.
- **Composite Form Fields (`TextField`)**: Complete form fields with label, helper text, required asterisks, and automated error messages.
- **Numeric & Currency Entries**: Number inputs accompanied by prefix currency glyphs (`$`) or unit suffixes (`kg`, `ms`).

### When NOT to Use

- **Do NOT use for multi-line text.** Use `Textarea` (Spec 16) for paragraphs, bios, and descriptions.
- **Do NOT use for choosing among predefined options.** Use `Select`, `Autocomplete`, or `RadioGroup`.
- **Do NOT use for boolean flags.** Use `Checkbox` (Spec 18) or `Switch` (Spec 20).

---

## 3. Scope

### In Scope

1. **Dual Primitive & Composite Model**:
   - `InputBase`: Headless, unstyled input reset primitive.
   - `Input`: Tactile input container with borders, background, sizes, and adornments.
   - `TextField`: High-level composite managing `<FormLabel>`, `<Input>`, and `<FormHelperText>`.
2. **Visual Variants**:
   - `"outlined"` (default): Material Design 3 continuous border with tactile focus ring.
   - `"filled"`: Tinted background surface with bottom indicator hairline.
   - `"standard"`: Borderless flushed input with underline indicator.
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
   - States: `default`, `hover`, `focus` (`:focus-within` ring), `disabled`, `readOnly`, `error`.
   - Error styling: Red border, error icon, and automated error text link via `aria-describedby`.
6. **Form & State Management**:
   - Full support for both controlled (`value`, `onChange`) and uncontrolled (`defaultValue`) modes.
   - Native HTML input attributes forwarded directly to the underlying `<input>` element.
7. **Polymorphic Zero-DOM Composition**:
   - `asChild` composition via `Slot`, `component`, and `as`.
8. **Emotion Theme Overrides**:
   - Hookable at `theme.components.ChellaaInput` and `theme.components.ChellaaTextField`.

### Out of Scope

- Multi-line textarea auto-growth (reserved for `Textarea`).
- Async search dropdown menus (reserved for `Autocomplete`).
- Complex telephone/credit card regex masking (handled by external input mask hooks).

---

## 4. Non-Goals

- `Input` does **NOT** swallow native keyboard events (`onKeyDown`, `onKeyUp`, `onInput`).
- `Input` does **NOT** manipulate browser password managers or autofill databases; it fully supports standard `autocomplete` attributes.

---

## 5. Feature Summary

| Feature | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| **Variants** | `"outlined"` \| `"filled"` \| `"standard"` \| `"unstyled"` | `"outlined"` | Dictates border treatment and container background |
| **Sizes** | `"sm"` (32px) \| `"md"` (40px) \| `"lg"` (48px) | `"md"` | Standardized heights matching Button scale |
| **Adornments** | `startAdornment`, `endAdornment` | `undefined` | Flexible slot for icons, units, chips, and hotkeys |
| **Clearable** | `boolean` | `false` | Displays interactive clear icon button when input has value |
| **Validation** | `error?: boolean`, `errorMessage?: ReactNode` | `false` | Sets error ring, invalid icon, and ARIA attributes |
| **Width** | `fullWidth?: boolean` | `false` | Stretches container to 100% parent width |
| **Composite** | `<TextField>` | — | Combines label, input, helper text, and error messaging |

---

## 6. Anatomy

### TextField Composite Anatomy

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

## 7. Mathematics & Proportions

### 7.1. Size Dimensions Matrix

| Size Token | Container Height | Font Size | Horizontal Padding | Icon / Adornment Size |
| :--- | :--- | :--- | :--- | :--- |
| `"sm"` | `32px` | `0.8125rem` (13px) | `10px` | `16px` |
| `"md"` *(default)* | `40px` | `0.875rem` (14px) | `12px` | `20px` |
| `"lg"` | `48px` | `1rem` (16px) | `16px` | `24px` |

### 7.2. Border & Focus Ring Tokens

- **Default Border**: `1px solid ${theme.palette.divider}`.
- **Hover Border**: `1px solid ${theme.palette.text.primary}`.
- **Focus Ring**: `2px solid ${theme.palette.primary.main}` with outer glow `0 0 0 2px ${theme.palette.primary.main}20`.
- **Error Border**: `2px solid ${theme.palette.error.main}` with error glow `0 0 0 2px ${theme.palette.error.main}20`.
- **Disabled State**: `opacity: 0.38; pointer-events: none; background: ${theme.palette.action.disabledBackground}`.

---

## 8. Component States & Behavior

### 8.1. Variant Behavior

1. **`outlined` (Default)**:
   - Encased in a continuous border.
   - On focus, border transitions smoothly from `1px` to `2px` with primary color highlight.
2. **`filled`**:
   - Tinted background (`theme.palette.action.hover`).
   - Bottom hairline (`1px solid ${theme.palette.divider}`) that expands to `2px solid ${theme.palette.primary.main}` on focus.
3. **`standard`**:
   - Transparent background with bottom hairline only.
   - Compact aesthetic for dense table rows or inline editing.
4. **`unstyled`**:
   - No background, no borders, no padding. Used for embedded search inputs within complex toolbars.

### 8.2. Interactive Clear Button (`clearable`)

When `clearable={true}` is enabled:
- If the input is empty, no button is shown.
- Once text is entered, an interactive `×` (or clear icon button) appears in the `endAdornment` slot.
- Clicking the clear button clears the input value, fires `onChange`, and maintains focus on the input element.

---

## 9. Accessibility & WAI-ARIA Standards

- **Label Association**:
  - The `TextField` component automatically generates a unique `id` (via `useId()`) linking the `<FormLabel htmlFor={id}>` directly to the `<input id={id}>`.
- **Description & Error Association**:
  - Helper text is linked via `aria-describedby="{id}-helper"`.
  - When in error state, error text is linked via `aria-describedby="{id}-error"` or `aria-errormessage="{id}-error"`.
- **Validation Semantics**:
  - `error={true}` automatically injects `aria-invalid="true"`.
  - `required={true}` automatically injects `aria-required="true"`.
  - `disabled={true}` applies `disabled` and `aria-disabled="true"`.
- **WCAG Contrast Compliance**:
  - Placeholder text color maintains a minimum of $4.5:1$ contrast ratio in light and dark themes.

---

## 10. API Specification & TypeScript Contracts

```ts
import type { ChangeEvent, ElementType, InputHTMLAttributes, ReactNode } from "react";
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
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  sx?: SxProps;
  startAdornment?: ReactNode | undefined;
  endAdornment?: ReactNode | undefined;
  clearable?: boolean | undefined;
  onClear?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface TextFieldProps extends Omit<InputProps, "prefix"> {
  /**
   * The label text displayed above or floating within the input.
   */
  label?: ReactNode | undefined;

  /**
   * Explanatory helper text displayed below the input.
   */
  helperText?: ReactNode | undefined;

  /**
   * Error message displayed below the input when error is true.
   */
  errorMessage?: ReactNode | undefined;

  /**
   * If true, displays a required asterisk next to the label.
   */
  required?: boolean | undefined;
}

export interface InputAdornmentProps {
  position: "start" | "end";
  children?: ReactNode | undefined;
  sx?: SxProps;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Input` is implemented using Emotion `styled()` with a multi-slot architecture:
- `StyledInputWrapper`: Outer container managing borders, focus ring, and adornment layout.
- `StyledInputElement`: Native `<input>` with reset styling, font mapping, and autofill normalization.
- `StyledAdornment`: Flex container for leading and trailing adornments.

```ts
const StyledInputWrapper = styled("div", {
  name: "ChellaaInput",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "size" &&
    prop !== "fullWidth" &&
    prop !== "error" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "hasStartAdornment" &&
    prop !== "hasEndAdornment" &&
    prop !== "focused" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: InputOwnerState }>(({ theme, ownerState }) => {
  const size = ownerState.size ?? "md";
  const variant = ownerState.variant ?? "outlined";
  const isError = ownerState.error;
  const isDisabled = ownerState.disabled;

  const heightMap = { sm: 32, md: 40, lg: 48 };
  const paddingMap = { sm: "0 10px", md: "0 12px", lg: "0 16px" };
  const fontMap = { sm: "0.8125rem", md: "0.875rem", lg: "1rem" };

  const styles: Record<string, any> = {
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    width: ownerState.fullWidth ? "100%" : "auto",
    minHeight: heightMap[size],
    padding: paddingMap[size],
    fontSize: fontMap[size],
    fontFamily: theme.typography.fontFamily,
    borderRadius: theme.shape?.borderRadius ?? 4,
    boxSizing: "border-box",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  if (variant === "outlined") {
    styles.border = `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`;
    styles.backgroundColor = theme.palette.background.paper;

    styles["&:hover:not(:disabled)"] = {
      borderColor: isError ? theme.palette.error.main : theme.palette.text.primary,
    };

    styles["&:focus-within"] = {
      borderColor: isError ? theme.palette.error.main : theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${isError ? theme.palette.error.main : theme.palette.primary.main}25`,
    };
  }

  if (variant === "filled") {
    styles.backgroundColor = theme.palette.action.hover;
    styles.border = "none";
    styles.borderBottom = `2px solid ${isError ? theme.palette.error.main : theme.palette.divider}`;
    styles.borderTopLeftRadius = theme.shape?.borderRadius ?? 4;
    styles.borderTopRightRadius = theme.shape?.borderRadius ?? 4;
    styles.borderBottomLeftRadius = 0;
    styles.borderBottomRightRadius = 0;

    styles["&:focus-within"] = {
      borderBottomColor: isError ? theme.palette.error.main : theme.palette.primary.main,
      backgroundColor: theme.palette.action.selected,
    };
  }

  if (isDisabled) {
    styles.opacity = 0.38;
    styles.pointerEvents = "none";
    styles.backgroundColor = theme.palette.action.disabledBackground;
  }

  return styles;
});
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Search Bar with Adornment and Kbd Shortcut

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

### 12.2. Password Input with Reveal Toggle

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

### 12.3. Enterprise Form Field with Validation

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

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **Browser Autofill (`:-webkit-autofill`)** | Background color doesn't break into harsh yellow. | Custom `-webkit-box-shadow` inset override in Emotion styling. |
| **Number Spin Buttons** | Clean appearance without awkward arrows if unstyled. | Standard CSS hiding rules for `appearance: textfield` when appropriate. |
| **Controlled to Uncontrolled Transition** | Console warning prevented. | Strict fallback to `value ?? ""` to ensure `value` is never `undefined`. |
| **Clicking Adornment Focuses Input** | Clicking anywhere on input wrapper transfers focus to `<input>`. | Native wrapper click handler delegates focus to `inputRef`. |
| **Isolated Unit Testing** | Tested without `<ThemeProvider>`. | `styled` factory automatically provides `defaultTheme`. |

---

## 14. Testing Verification Matrix

Every implementation of `Input` and `TextField` must satisfy this 100% test contract:

1. **Rendering & DOM Attributes**:
   - Renders native `<input>` inside wrapper.
   - Forwards standard attributes (`placeholder`, `type`, `name`, `disabled`, `readOnly`).
2. **Variants & Sizes**:
   - `variant="outlined"` applies 1px border.
   - `variant="filled"` applies tinted background and bottom border.
   - `size="sm"`, `"md"`, `"lg"` apply correct minimum heights and font sizes.
3. **Controlled & Uncontrolled Functionality**:
   - Fires `onChange` handler on keystroke.
   - Updates value cleanly in controlled mode.
4. **Adornments & Clear Button**:
   - Renders `startAdornment` and `endAdornment`.
   - `clearable={true}` shows clear button only when input has content.
   - Clicking clear button resets value to empty string and calls `onClear` / `onChange`.
5. **TextField Composite**:
   - Associates `<FormLabel>` with input `id`.
   - Displays `helperText` linked via `aria-describedby`.
   - When `error={true}`, displays `errorMessage` and sets `aria-invalid="true"`.
6. **Accessibility (`vitest-axe`)**:
   - Zero automated accessibility violations for standard, adorned, and validation-state inputs.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/Input/
├── Input.tsx          # Tactile Input and InputBase component with Emotion styled factory
├── TextField.tsx      # Composite TextField with Label, HelperText, and ErrorMessage
├── InputAdornment.tsx # Leading and trailing adornment container
├── Input.test.tsx     # Vitest unit test suite (100% pass + vitest-axe)
├── Input.stories.tsx  # Storybook stories (variants, sizes, adornments, clearable, validation)
└── index.ts          # Public exports (Input, TextField, InputAdornment, types)
```
