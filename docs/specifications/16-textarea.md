# Textarea Component Specification (Multi-Line Form Text Entry Primitive)

**Document Status:** Approved & Baseline  
**Phase:** Phase 2 — Core Form Controls  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Textarea
Package Export:     import { Textarea, type TextareaProps, type TextareaOwnerState, type TextareaVariant, type TextareaSize, type TextareaResize } from "@chellaa/react";
Category:           Forms & Inputs
Status:             Approved & Implementation Baseline
Phase:              Phase 2 — Core Form Controls
Related Components: Input, TextField, FormField, FormLabel, FormHelperText, Typography
```

---

## 2. Purpose

The `Textarea` component provides the **multi-line text entry primitive** for `@chellaa/react`. Built for capturing extended user prose—such as comments, issue descriptions, bios, feedback notes, and address details—`Textarea` unifies multi-line typography with the Material Design 3 surface, border, and focus ring tokens established by `Input`.

In addition to standard multi-line capabilities, `Textarea` features dynamic auto-expansion (`autoResize`) bounded by `minRows` and `maxRows`, live character counters (`showCount`), configurable manual resize handles (`resize`), and integration with form validation states (`error`, `disabled`, `readOnly`).

### When to Use

- **Multi-Line Prose Entry**: Long-form feedback forms, support ticket descriptions, blog comments, or user bios.
- **Auto-Expanding Input Boxes**: Chat or messaging inputs where the field height expands smoothly as the user types without triggering browser scrollbars.
- **Length-Constrained Text**: Text inputs bounded by strict character caps (`maxLength`), requiring a live visual counter (`showCount`).

### When NOT to Use

- **Do NOT use `Textarea` for single-line inputs.** Use `Input` or `TextField` (Spec 15) for names, emails, passwords, and search queries.
- **Do NOT use `Textarea` for rich formatted text (WYSIWYG / Markdown).** Use a dedicated Rich Text Editor organism.
- **Do NOT use `Textarea` for code editing with syntax highlighting.** Use a CodeEditor organism with line numbering and syntax tokens.

---

## 3. Scope

### In Scope

1. **Semantic HTML5 Element**: Renders a native `<textarea>` by default, ensuring built-in screen reader semantics and keyboard tab order.
2. **Visual Variants**: Matches `Input` design tokens:
   - `"outlined"` (default): Continuous 1px border with 2px primary focus ring.
   - `"filled"`: Tinted surface background with bottom indicator hairline.
   - `"standard"`: Borderless flushed surface with underline indicator.
   - `"unstyled"`: Naked `<textarea>` without borders or padding.
3. **Proportional Size Scale**:
   - `"sm"`: Compact (13px font size, 8px padding).
   - `"md"`: Standard (14px font size, 12px padding).
   - `"lg"`: Prominent (16px font size, 16px padding).
4. **Auto-Resize Mechanics (`autoResize`)**:
   - Dynamically recalculates `scrollHeight` on input, adjusting height smoothly without causing jumpy layout thrashing.
   - Bounded by `minRows` (default: 3) and optional `maxRows`.
5. **Character Counter (`showCount`)**:
   - Displays live count (e.g. `45 / 500` or `45` without `maxLength`) positioned in the bottom-right corner.
   - Turns to `palette.error.main` when `maxLength` is reached or exceeded.
6. **Resize Control**:
   - `resize?: "none" | "vertical" | "horizontal" | "both"`. Automatically forced to `"none"` when `autoResize={true}` is active.
7. **Form Validation & States**:
   - Interactive states: `default`, `hover`, `focus` (`:focus-within`), `disabled`, `readOnly`, `error`.
   - Error state sets 2px red border and injects `aria-invalid="true"`.
8. **Polymorphic Zero-DOM Composition**:
   - `asChild` composition via `Slot`, `component`, and `as`.
9. **Emotion Theme Overrides**:
   - Hookable at `theme.components.ChellaaTextarea.styleOverrides.root`.

### Out of Scope

- Spellcheck dictionary replacements (relies on native browser `spellcheck`).
- Markdown preview splits (delegated to MarkdownEditor organism).

---

## 4. Non-Goals

- `Textarea` does **NOT** strip line breaks or mutate input strings during typing.
- `Textarea` does **NOT** block keyboard typing when `maxLength` is exceeded if developers want soft validation warnings; standard HTML `maxLength` can be passed if strict blocking is desired.

---

## 5. Feature Summary

| Feature | Values | Default | Description |
| :--- | :--- | :--- | :--- |
| **Variants** | `"outlined"` \| `"filled"` \| `"standard"` \| `"unstyled"` | `"outlined"` | Dictates border treatment and container background |
| **Sizes** | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Governs font size and internal padding scale |
| **Auto-Resize** | `boolean` | `false` | Automatically grows height to fit content without scrollbars |
| **Rows** | `minRows?: number`, `maxRows?: number` | `minRows: 3` | Constrains vertical expansion in autoResize mode |
| **Resize** | `"none"` \| `"vertical"` \| `"horizontal"` \| `"both"` | `"vertical"` | Dictates manual drag handle availability |
| **Character Count** | `showCount?: boolean`, `maxLength?: number` | `false` | Renders live count in bottom-right corner |
| **Width** | `fullWidth?: boolean` | `false` | Stretches textarea to 100% of parent width |
| **Validation** | `error?: boolean` | `false` | Injects 2px error ring and `aria-invalid="true"` |

---

## 6. Anatomy

### Textarea Anatomy (With Character Counter)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Textarea Container (width: 100%; border: 1px solid divider)            │
│                                                                        │
│  Native <textarea>                                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Please provide detailed feedback about your experience...        │  │
│  │                                                                  │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│                                                     Character Counter  │
│                                                      ┌──────────────┐  │
│                                                      │   48 / 250   │  │
│                                                      └──────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Mathematics & Proportions

### 7.1. Size Dimensions Matrix

| Size Token | Font Size | Line Height | Horizontal Padding | Vertical Padding |
| :--- | :--- | :--- | :--- | :--- |
| `"sm"` | `0.8125rem` (13px) | `1.4` (18.2px) | `10px` | `8px` |
| `"md"` *(default)* | `0.875rem` (14px) | `1.5` (21px) | `12px` | `10px` |
| `"lg"` | `1rem` (16px) | `1.5` (24px) | `16px` | `12px` |

### 7.2. Auto-Resize Height Calculation

When `autoResize={true}` is enabled:
$$\text{singleRowHeight} = \text{fontSize} \times \text{lineHeight}$$
$$\text{minHeight} = \text{minRows} \times \text{singleRowHeight} + \text{paddingVertical}$$
$$\text{targetHeight} = \max(\text{minHeight}, \text{scrollHeight})$$
$$\text{clampedHeight} = \min(\text{targetHeight}, \text{maxRows} \times \text{singleRowHeight} + \text{paddingVertical})$$

---

## 8. Component States & Behavior

### 8.1. Auto-Resize Dynamics

1. On component mount and each subsequent input change (`input` / `change` event):
   - The component temporarily resets height to `auto` to compute accurate `scrollHeight`.
   - Sets the calculated height directly onto the textarea DOM style (`element.style.height = ...`).
   - If content exceeds `maxRows`, `overflow-y` automatically toggles from `"hidden"` to `"auto"` to allow standard scrolling.
2. Prevents vertical layout shift and flicker via synchronous DOM measurement during layout effects (`useLayoutEffect`).

### 8.2. Character Counter (`showCount`)

- When `showCount={true}` is enabled, the component displays an anchored counter element below the textarea.
- If `maxLength` is specified: displays `${count} / ${maxLength}`.
- If `count >= maxLength`: the counter text transitions to `theme.palette.error.main` with font weight `600`.

---

## 9. Accessibility & WAI-ARIA Standards

- **Semantic HTML5 Element**: Renders `<textarea>` natively, guaranteeing accessibility tree presence and tab-order integration.
- **Form Association**: Links directly with `<label htmlFor={id}>` via `id`.
- **Validation Semantics**:
  - `error={true}` injects `aria-invalid="true"`.
  - `required={true}` injects `aria-required="true"`.
  - `disabled={true}` applies native `disabled` and `aria-disabled="true"`.
  - When character count is visible, it can be linked via `aria-describedby="{id}-count"`.
- **WCAG Contrast Compliance**:
  - Placeholder text and character count maintain $\ge 4.5:1$ contrast ratio in both light and dark themes.

---

## 10. API Specification & TypeScript Contracts

```ts
import type { ElementType, ReactNode, TextareaHTMLAttributes } from "react";
import type { SxProps } from "../../system/types";

export type TextareaVariant = "outlined" | "filled" | "standard" | "unstyled";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaOwnerState {
  variant?: TextareaVariant | undefined;
  size?: TextareaSize | undefined;
  fullWidth?: boolean | undefined;
  error?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  autoResize?: boolean | undefined;
  resize?: TextareaResize | undefined;
  hasCount?: boolean | undefined;
}

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "color">,
    TextareaOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot.
   */
  asChild?: boolean | undefined;

  /**
   * The underlying HTML element or component for root wrapper.
   */
  component?: ElementType | undefined;

  /**
   * Alias for component.
   */
  as?: ElementType | undefined;

  /**
   * The system-aware sx prop.
   */
  sx?: SxProps;

  /**
   * Minimum visible text lines when autoResize is enabled.
   * @default 3
   */
  minRows?: number | undefined;

  /**
   * Maximum visible text lines before scrollbars appear when autoResize is enabled.
   */
  maxRows?: number | undefined;

  /**
   * If true, displays live character counter below the input.
   * @default false
   */
  showCount?: boolean | undefined;

  /**
   * Ref forwarded directly to native <textarea> element.
   */
  textareaRef?: React.Ref<HTMLTextAreaElement>;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Textarea` is built using Emotion `styled()`:
- `StyledTextareaContainer`: Wrapper managing borders, focus rings, and counter layout.
- `StyledNativeTextarea`: Clean reset `<textarea>` element with custom scrollbar styling.
- `StyledCharacterCount`: Right-aligned counter text.

```ts
const StyledTextareaContainer = styled("div", {
  name: "ChellaaTextarea",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "size" &&
    prop !== "fullWidth" &&
    prop !== "error" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "autoResize" &&
    prop !== "resize" &&
    prop !== "hasCount" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: TextareaOwnerState }>(({ theme, ownerState }) => {
  const size = ownerState.size ?? "md";
  const variant = ownerState.variant ?? "outlined";
  const isError = ownerState.error;
  const isDisabled = ownerState.disabled;

  const styles: Record<string, any> = {
    display: "inline-flex",
    flexDirection: "column",
    position: "relative",
    width: ownerState.fullWidth ? "100%" : "auto",
    fontFamily: theme.typography.fontFamily,
    boxSizing: "border-box",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  if (variant === "outlined") {
    styles.border = `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`;
    styles.borderRadius = theme.shape?.borderRadius ?? 4;
    styles.backgroundColor = theme.palette.background.paper;

    styles["&:hover:not(:has(:disabled))"] = {
      borderColor: isError ? theme.palette.error.main : theme.palette.text.primary,
    };

    styles["&:focus-within"] = {
      borderColor: isError ? theme.palette.error.main : theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${isError ? theme.palette.error.main : theme.palette.primary.main}25`,
    };
  }

  if (variant === "filled") {
    styles.backgroundColor = theme.palette.action.hover;
    styles.borderTopLeftRadius = theme.shape?.borderRadius ?? 4;
    styles.borderTopRightRadius = theme.shape?.borderRadius ?? 4;
    styles.borderBottom = `2px solid ${isError ? theme.palette.error.main : theme.palette.divider}`;

    styles["&:focus-within"] = {
      backgroundColor: theme.palette.action.selected,
      borderBottomColor: isError ? theme.palette.error.main : theme.palette.primary.main,
    };
  }

  if (isDisabled) {
    styles.opacity = 0.38;
    styles.cursor = "not-allowed";
    styles.backgroundColor = theme.palette.action.disabledBackground;
  }

  return styles;
});
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Auto-Expanding Support Feedback Box

```tsx
<Textarea
  placeholder="Describe the issue you encountered..."
  autoResize
  minRows={3}
  maxRows={8}
  fullWidth
/>
```

### 12.2. Length-Constrained Profile Bio

```tsx
<Textarea
  placeholder="Write a short bio about yourself..."
  maxLength={160}
  showCount
  minRows={4}
  fullWidth
/>
```

### 12.3. Zero-DOM `asChild` Delegation

```tsx
<Textarea asChild fullWidth>
  <textarea aria-label="Custom description" />
</Textarea>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **Fast Copy-Paste of Long Text** | Instantly resizes to match text height without lag. | Synchronous recalculation in `onChange` and `onInput`. |
| **`autoResize` Combined with Manual `resize`** | Manual resize disabled to avoid layout conflicting loops. | Force `resize: "none"` when `autoResize={true}`. |
| **Font Family Changes Dynamically** | Line heights recalculate cleanly. | Computes height from dynamic `scrollHeight` rather than static line approximations. |
| **Isolated Unit Testing** | Tested without `<ThemeProvider>`. | `styled` factory automatically provides `defaultTheme`. |

---

## 14. Testing Verification Matrix

Every implementation of `Textarea` must satisfy this 100% test contract:

1. **Rendering & DOM Attributes**:
   - Renders native `<textarea>` with appropriate styling.
   - Forwards standard attributes (`placeholder`, `name`, `disabled`, `readOnly`).
2. **Variants & Sizes**:
   - `variant="outlined"`, `"filled"`, `"standard"`, `"unstyled"`.
   - `size="sm"`, `"md"`, `"lg"` apply correct padding and font sizes.
3. **Controlled & Uncontrolled Value Handling**:
   - Handles `value` + `onChange`.
   - Handles `defaultValue`.
4. **Auto-Resize Mechanics**:
   - Recalculates height on input changes.
   - Enforces `minRows` default.
5. **Character Counter**:
   - `showCount={true}` displays live count.
   - Formats `${count} / ${maxLength}` when `maxLength` is set.
6. **Validation States**:
   - `error={true}` sets 2px error ring and `aria-invalid="true"`.
7. **Accessibility (`vitest-axe`)**:
   - Zero automated accessibility violations for standard and counter textareas.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/Textarea/
├── Textarea.tsx          # Multi-line Textarea with autoResize & showCount
├── Textarea.test.tsx     # Vitest unit test suite (100% pass + vitest-axe)
├── Textarea.stories.tsx  # Storybook stories (variants, sizes, autoResize, showCount)
└── index.ts              # Public exports (Textarea, types)
```
