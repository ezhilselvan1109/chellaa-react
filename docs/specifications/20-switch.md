# Switch Component Specification (Accessible Binary Toggle Switch Primitives)

**Document Status:** Approved & Baseline  
**Phase:** Phase 2 — Core Form Controls  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Switch
Package Export:     import { Switch, type SwitchProps, type SwitchSize, type SwitchColorScheme, type SwitchLabelPlacement } from "@chellaa/react";
Category:           Forms & Inputs
Status:             Approved & Implementation Baseline
Phase:              Phase 2 — Core Form Controls (Final Component)
Related Components: Checkbox, Radio, FormField, Button
```

---

## 2. Purpose

The `Switch` component provides an **accessible, interactive binary toggle control** conforming to the W3C WAI-ARIA 1.2 Switch Pattern and Material Design 3 state layer guidelines.

A switch represents a physical toggle switch that permits users to turn a single setting or feature **on** or **off**. Unlike checkboxes—which represent choices that typically require an explicit form submission (such as clicking "Save" or "Submit")—a switch represents an **immediate activation or deactivation of a state, feature, or preference** (such as toggling Dark Mode, enabling Notifications, or activating Airplane Mode).

### When to Use

- **Instantaneous Preferences**: Settings that take effect immediately upon toggle without requiring a "Save" or "Apply" button.
- **Feature Flags & Integrations**: Turning on third-party integrations (e.g. GitHub sync, Slack notifications).
- **Dark Mode / Theme Switching**: Toggling between light and dark visual themes.
- **Privacy & Permissions**: Enabling location services, microphone access, or analytics tracking.

### When NOT to Use

- **Form Options Pending Submission**: When the selection is part of a larger form submitted together with text fields, use `<Checkbox>` (Spec 18).
- **Mutually Exclusive Multiple Choices**: If choosing between more than two options or mutually exclusive choices, use `<RadioGroup>` (Spec 19) or `<Segmented>`.
- **Action Triggers**: If clicking performs a transient action (e.g. Download, Refresh, Delete), use `<Button>`.

---

## 3. Scope

### In Scope

1. **Accessible Native Switch Semantics**:
   - Visually hidden native `<input type="checkbox" role="switch">` ensuring 100% native HTML form serialization, keyboard activation (`Space` and `Enter`), screen reader announcements, and touch ergonomics.
   - `aria-checked={checked}`.
2. **Smooth Pill & Thumb Animation**:
   - Capsule track (`border-radius: 9999px`) with dynamic background color transition.
   - Circular sliding thumb (`border-radius: 50%`) with fluid CSS transform slide.
   - Optional thumb icons (`checkedIcon`, `uncheckedIcon`) for visual clarity (e.g. Moon / Sun).
3. **Multi-Size Support**:
   - `sm`: 32px × 18px track, 14px thumb
   - `md`: 44px × 24px track, 18px thumb (Default)
   - `lg`: 56px × 30px track, 24px thumb
4. **Color Scheme System**:
   - Palette accents: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `default`.
5. **Flexible Label Positioning**:
   - `labelPlacement`: `'end'` (default), `'start'`, `'top'`, `'bottom'`.
6. **FormField Integration**:
   - Consumes `useFormField()` to inherit `id`, `name`, `disabled`, `readOnly`, `required`, `error`, and `aria-describedby`.
7. **Loading & Interactive States**:
   - `loading?: boolean` (renders micro-spinner inside thumb and prevents interaction).
   - Hover halo, focus-visible dual-ring, active press scale.
8. **Slot Composition**:
   - Polymorphic delegation via `asChild`.

### Out of Scope

- Segmented pill switches (handled by `Segmented` component).
- Multi-state toggles (3+ states).

---

## 4. Non-Goals

- `Switch` does **not** replace `<Checkbox>` in standard transactional forms where changes are uncommitted until submit.
- `Switch` does **not** introduce third-party icon packages; custom icons are passed via `checkedIcon` and `uncheckedIcon` slots.

---

## 5. Feature Summary

| Feature | Description | Implementation Detail |
| :--- | :--- | :--- |
| **WAI-ARIA Switch** | Explicit toggle switch semantics | `<input type="checkbox" role="switch" aria-checked={...}>` |
| **Fluid Slide** | High-performance hardware-accelerated slide | CSS `transform: translateX(...)` with cubic-bezier easing |
| **Thumb Icons** | Contextual visual cues inside thumb | `checkedIcon` and `uncheckedIcon` render slots |
| **Loading State** | Async operation feedback | `loading={true}` disables toggle and shows miniature spinner |
| **4 Label Positions** | Flexible UI flow | `labelPlacement`: `end`, `start`, `top`, `bottom` |
| **3 Proportional Sizes**| Consistent scaling | `sm` (18px high), `md` (24px high), `lg` (30px high) |
| **7 Color Schemes** | Palette-driven accents | `primary`, `secondary`, `success`, `error`, `warning`, `info`, `default` |
| **FormField Cascade** | Zero-config error and disable cascade | Auto-consumes `useFormField()` |

---

## 6. Anatomy

### Switch Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ <label class="ChellaaSwitch-Root">                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <input type="checkbox" role="switch" class="HiddenInput" />      │  │ (Visually hidden, focusable)
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <span class="ChellaaSwitch-Track">                               │  │ (Capsule track)
│  │   <span class="ChellaaSwitch-Thumb">                             │  │ (Sliding circular knob)
│  │     <span class="ChellaaSwitch-Icon"> [Icon] </span>             │  │ (Optional icon)
│  │   </span>                                                        │  │
│  │ </span>                                                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <span class="ChellaaSwitch-Label"> Enable Cloud Sync             │  │ (Optional text label)
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Public API

### `<Switch>` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default checked state |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | `undefined` | Callback fired on change |
| `value` | `string` | `undefined` | Value of the switch input for HTML form submission |
| `name` | `string` | `undefined` | Native input name attribute |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track, thumb, and label dimensions |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'primary'` | Palette color accent when checked |
| `disabled` | `boolean` | `false` | Disables interaction and dims opacity |
| `readOnly` | `boolean` | `false` | Prevents toggling while retaining focusability |
| `required` | `boolean` | `false` | Marks native input as required |
| `error` | `boolean` | `false` | Applies error palette outline |
| `loading` | `boolean` | `false` | Disables switch and renders micro-spinner |
| `checkedIcon` | `React.ReactNode` | `undefined` | Icon rendered inside thumb when checked |
| `uncheckedIcon` | `React.ReactNode` | `undefined` | Icon rendered inside thumb when unchecked |
| `labelPlacement` | `'end' \| 'start' \| 'top' \| 'bottom'` | `'end'` | Position of the label relative to the switch track |
| `inputRef` | `React.Ref<HTMLInputElement>` | `undefined` | Ref directed to the underlying `<input>` element |
| `inputProps` | `React.InputHTMLAttributes<HTMLInputElement>` | `undefined` | Custom attributes passed to hidden `<input>` |
| `asChild` | `boolean` | `false` | Delegates rendering to immediate child element |
| `sx` | `SxProps` | `undefined` | System style overrides |
| `children` | `React.ReactNode` | `undefined` | Switch label content |

---

## 8. TypeScript Types

```typescript
export type SwitchSize = "sm" | "md" | "lg";

export type SwitchColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

export type SwitchLabelPlacement = "end" | "start" | "top" | "bottom";

export interface SwitchOwnerState {
  size: SwitchSize;
  colorScheme: SwitchColorScheme;
  checked: boolean;
  disabled: boolean;
  readOnly: boolean;
  loading: boolean;
  error: boolean;
  labelPlacement: SwitchLabelPlacement;
  hasLabel: boolean;
}

export interface SwitchProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value?: string | undefined;
  name?: string | undefined;
  size?: SwitchSize | undefined;
  colorScheme?: SwitchColorScheme | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  error?: boolean | undefined;
  loading?: boolean | undefined;
  checkedIcon?: React.ReactNode | undefined;
  uncheckedIcon?: React.ReactNode | undefined;
  labelPlacement?: SwitchLabelPlacement | undefined;
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | undefined;
  asChild?: boolean | undefined;
  component?: React.ElementType | undefined;
  as?: React.ElementType | undefined;
  sx?: SxProps;
  children?: React.ReactNode | undefined;
}
```

---

## 9. Variants & Visual States

1. **Unchecked State**:
   - Track: `background: theme.palette.action.disabledBackground` (or dark grey `rgba(0,0,0,0.16)`).
   - Thumb: `background: #ffffff`, positioned at leftmost track offset (`translateX(0)`).
   - Hover: Track border/background tints subtly; thumb acquires circular halo.
2. **Checked State**:
   - Track: `background: theme.palette[colorScheme].main`.
   - Thumb: `background: #ffffff`, slides to rightmost track offset (`translateX(slideDistance)`).
   - Hover: Thumb acquires circular accent halo (`alpha(colorScheme, 0.12)`).
3. **Error State**:
   - Track: `background: theme.palette.error.main` (or border outlined in error).
   - Focus outline: `theme.palette.error.main`.
4. **Disabled State**:
   - Opacity: 0.5.
   - Cursor: `not-allowed`.
   - Track: `background: theme.palette.action.disabledBackground`.
   - Thumb: `background: theme.palette.action.disabled`.
5. **Loading State**:
   - Thumb displays miniature animated spinning SVG arc; interaction disabled.

---

## 10. Sizes & Metrics

| Metric | `sm` | `md` (Default) | `lg` |
| :--- | :--- | :--- | :--- |
| **Track Width** | 32px | 44px | 56px |
| **Track Height** | 18px | 24px | 30px |
| **Thumb Diameter** | 14px | 18px | 24px |
| **Slide Distance** | 14px | 20px | 26px |
| **Thumb Padding/Offset**| 2px | 3px | 3px |
| **Icon Size** | 10px | 12px | 14px |
| **Label Font Size** | 0.875rem (14px) | 1rem (16px) | 1.125rem (18px) |
| **Gap (Track to Label)**| 8px | 10px | 12px |

---

## 11. States & Pseudo-Classes

- `:hover`: Subtle circular halo around thumb (`box-shadow: 0 0 0 8px ${accent}1A`).
- `:focus-visible`: Dual-ring focus outline around track (`outline: 2px solid ${accent}`, `outline-offset: 2px`).
- `:active`: Slight elongation of thumb width (`width: thumbSize + 2px`) for tactile spring feel.
- `:disabled`: Neutralized pointer events, grayed background, disabled cursor.

---

## 12. Behavior

- Clicking anywhere on the label row toggles the switch.
- If `readOnly={true}` or `loading={true}`, clicking does not alter the state.
- Pressing `Space` or `Enter` toggles the switch when focused.

---

## 13. Controlled / Uncontrolled

- **Uncontrolled Switch**: Uses `defaultChecked` (defaults to `false`). State stored in native DOM `<input>`.
- **Controlled Switch**: Uses `checked` prop and `onChange` callback.

---

## 14. Events

- `onChange(event)`: Emits standard React synthetic change event from the underlying `<input type="checkbox" role="switch">`.

---

## 15. Composition

- `<Switch>` can be used standalone with or without children.
- `<FormField>` wraps `<Switch>` providing form label, helper text, and error messages.

---

## 16. Ref Contract

- `ref` on `<Switch>` forwards to the root `<label>` element.
- `inputRef` on `<Switch>` forwards directly to the hidden native `<HTMLInputElement>`.

---

## 17. Accessibility (WAI-ARIA)

- Implements W3C WAI-ARIA 1.2 Switch Pattern:
  - `<input type="checkbox" role="switch" aria-checked={checked}>`
  - Screen readers explicitly announce "Switch, on" or "Switch, off".
- Label association:
  - Text inside `<Switch>Label</Switch>` acts as the accessible name via the parent `<label>`.
  - When used without text children, developers must pass `aria-label` or `aria-labelledby` via `inputProps`.
- When `error={true}`, `aria-invalid="true"` is applied to the input.

---

## 18. Keyboard Interaction

| Key | Action |
| :--- | :--- |
| `Tab` | Moves focus to the switch |
| `Shift + Tab` | Moves focus to the previous focusable element |
| `Space` | Toggles the switch between on and off |
| `Enter` | Toggles the switch between on and off |

---

## 19. Styling Contract

- Implemented via Emotion `styled()`.
- Classes:
  - `.ChellaaSwitch-Root`: Container `<label>`
  - `.ChellaaSwitch-HiddenInput`: Visually hidden input
  - `.ChellaaSwitch-Track`: Capsule track
  - `.ChellaaSwitch-Thumb`: Sliding circular knob
  - `.ChellaaSwitch-Icon`: Optional inner icon
  - `.ChellaaSwitch-Label`: Text label

---

## 20. Theme Contract

Customizable via `theme.components.ChellaaSwitch.styleOverrides.root` and `theme.components.ChellaaSwitch.styleOverrides.track`.

---

## 21. Responsive Behavior

- Track dimensions remain fixed per size token to ensure predictable slide geometry.
- Label text scales proportionally with the `size` prop.

---

## 22. Motion & Animations

- Thumb translation: `transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms`.
- Track background color: `transition: background-color 200ms ease-in-out, border-color 200ms`.

---

## 23. Testing

- 100% test coverage with Vitest + React Testing Library.
- `vitest-axe` WCAG accessibility tests for unchecked, checked, disabled, and loading states.
- Tests for controlled, uncontrolled, keyboard `Space` and `Enter` activation, and `FormField` cascade.

---

## 24. Storybook

Stories included in `packages/react/src/components/Switch/Switch.stories.tsx`:
- `Default`: Basic standalone switch
- `Sizes`: `sm`, `md`, `lg`
- `ColorSchemes`: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `default`
- `WithIcons`: Dark mode / Light mode toggle with Sun/Moon icons
- `LabelPlacements`: `end`, `start`, `top`, `bottom`
- `States`: Unchecked, Checked, Disabled, Loading, Error
- `WithFormField`: Inside `<FormField>` with validation error message

---

## 25. Documentation Reqs

Document props table, instant settings toggle patterns, thumb icon examples, and accessibility guidelines.

---

## 26. Edge Cases

1. **Empty Switch without children**:
   - Renders track without label margins. Accessible via `aria-label`.
2. **Loading state**:
   - `loading={true}` prevents interaction even if not explicitly `disabled`.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Switch | Chakra Switch | Ant Design Switch |
| :--- | :--- | :--- | :--- | :--- |
| **Semantics** | `role="switch"` | `role="switch"` | `role="switch"` | `role="switch"` |
| **Thumb Icons** | `checkedIcon`, `uncheckedIcon` | `icon`, `checkedIcon` | None | `checkedChildren` |
| **Styling** | Zero-runtime CSS variables + Emotion | Emotion / Pigment | Emotion | Less / CSS-in-JS |
| **Slot Delegation** | Radix `asChild` | No | No | No |

---

## 28. Deferred Features

- Multi-color gradient tracks (deferred to future themes).

---

## 29. Acceptance Criteria

- [x] Switch supports checked and unchecked states with smooth sliding knob animation.
- [x] Support for `role="switch"`, `aria-checked`, and keyboard `Space` / `Enter`.
- [x] Support for thumb icons, loading spinner, and 4 label placements.
- [x] FormField context auto-cascades to Switch.
- [x] Zero axe violations across all states.
- [x] 100% test pass rate with Vitest.

---

## 30. Definition of Done

- Specification document approved.
- All primitives implemented in `packages/react/src/components/Switch/`.
- Full unit tests and Storybook stories written.
- Exported in root `packages/react/src/index.ts`.
- Built and committed to repository.
