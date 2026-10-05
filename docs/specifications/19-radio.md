# Radio & RadioGroup Component Specification (Single-Choice Accessible Radio Primitives)

**Document Status:** Approved & Baseline  
**Phase:** Phase 2 — Core Form Controls  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Radio, RadioGroup, RadioContext, useRadioGroup
Package Export:     import { Radio, RadioGroup, useRadioGroup, type RadioProps, type RadioGroupProps, type RadioSize, type RadioColorScheme } from "@chellaa/react";
Category:           Forms & Inputs
Status:             Approved & Implementation Baseline
Phase:              Phase 2 — Core Form Controls
Related Components: Checkbox, CheckboxGroup, Switch, FormField
```

---

## 2. Purpose

The `Radio` and `RadioGroup` components provide an **enterprise-grade, accessible single-choice selection control** conforming to the W3C WAI-ARIA 1.2 Radio Group Design Pattern.

Radio buttons are used when a user must choose exactly **one** option from a mutually exclusive list of two or more possibilities. When a radio button in a group is selected, any previously selected radio button in that same group is automatically deselected.

`RadioGroup` coordinates individual `Radio` elements, manages controlled and uncontrolled single-value states (powered by `useControllableState`), generates or cascades a shared `name` attribute, and enables native browser arrow key roving navigation (`ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight`).

### When to Use

- **Mutually Exclusive Choice**: Selecting exactly one option from a visible list (typically 2 to 7 items).
- **Payment & Shipping Methods**: Choosing billing options, shipping speeds, or subscription tiers.
- **Preference Settings**: Selecting theme preferences (e.g. Light, Dark, System) or notification cadences.

### When NOT to Use

- **Multiple Selections Permitted**: If users can select zero, one, or multiple items, use `<CheckboxGroup>` (Spec 18).
- **Long Lists of Choices (> 7 items)**: If there are many options (e.g., countries, states, currencies), use `<Select>` (Spec 21) or `<Autocomplete>` to preserve screen real estate.
- **Instant Binary State Toggle**: For immediate on/off toggles that take effect without form submission, use `<Switch>` (Spec 20).

---

## 3. Scope

### In Scope

1. **Mutually Exclusive Single Selection**:
   - `value`: `string | number`
   - Group state management via `value` (controlled) and `defaultValue` (uncontrolled).
2. **Accessible Native Input Layer**:
   - Hidden native `<input type="radio">` nested inside an accessible `<label>` wrapper ensuring 100% native HTML form serialization, keyboard arrow roving navigation, and screen reader announcements.
3. **RadioGroup Orchestration**:
   - Renders container with `role="radiogroup"`.
   - Group-level cascade of `name`, `size`, `colorScheme`, `disabled`, `readOnly`, `error`, `orientation` (`"vertical"` | `"horizontal"`), and `spacing`.
   - Automatic unique `name` generation via `useId()` if none provided.
4. **FormField Integration**:
   - Consumes `useFormField()` to inherit `id`, `name`, `disabled`, `readOnly`, `required`, `error`, and `aria-describedby`.
5. **Theme Tokens & Styling**:
   - Sizes: `sm` (16px outer / 6px inner dot), `md` (20px outer / 8px inner dot), `lg` (24px outer / 10px inner dot).
   - Color Schemes: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `default`.
   - Circular outer ring, smooth inner dot scale animation (`transform: scale(1)` vs `scale(0)`).
   - Focus halo (`:focus-visible`), active press feedback.
6. **Slot & Zero-DOM Composition**:
   - Supports `asChild` composition via `Slot`.

### Out of Scope

- Segmented button groups (handled by `Segmented` component).
- Multi-column data grid selection (handled by `Table` component).

---

## 4. Non-Goals

- `Radio` does **not** manage server-side validation; it emits standard synthetic change events.
- `Radio` does **not** allow deselecting the active radio without choosing another radio in the same group (standard WAI-ARIA and native HTML radio behavior).

---

## 5. Feature Summary

| Feature | Description | Implementation Detail |
| :--- | :--- | :--- |
| **Mutually Exclusive** | Single-selection constraint within group | Managed via `RadioGroup` context and shared native `name` |
| **Native Accessibility** | Hidden native `<input type="radio">` | Native keyboard arrow key roving navigation and screen reader support |
| **Group Coordination** | Centralized value and change emitter | `<RadioGroup value={val} onChange={setVal}>` with `useControllableState` |
| **Dual Orientation** | Flow layout flexibility | `orientation="vertical"` (default) or `"horizontal"` with flex wrapping |
| **Fluid Scaling** | 3 standard sizes | `sm` (16px), `md` (20px), `lg` (24px) |
| **Theme Accents** | Palette-driven colors | `primary`, `secondary`, `success`, `error`, `warning`, `info`, `default` |
| **FormField Cascade** | Automatic validation and description binding | Auto-consumes `useFormField()` |
| **Smooth Animation** | Inner dot scale transition | CSS `transform: scale(0)` to `scale(1)` in 150ms cubic-bezier |

---

## 6. Anatomy

### Radio Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ <label class="ChellaaRadio-Root">                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <input type="radio" class="ChellaaRadio-HiddenInput" />          │  │ (Visually hidden, focusable)
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <span class="ChellaaRadio-Control">                              │  │ (Visual outer circle)
│  │   <span class="ChellaaRadio-Dot" />                              │  │ (Inner animated dot)
│  │ </span>                                                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <span class="ChellaaRadio-Label"> Standard Shipping (3-5 days)   │  │ (Optional label text)
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### RadioGroup Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ <div role="radiogroup" class="ChellaaRadioGroup-Root">                 │
│   <Radio value="standard">Standard Shipping</Radio>                    │
│   <Radio value="express">Express Shipping</Radio>                      │
│   <Radio value="overnight">Overnight Delivery</Radio>                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Public API

### `<Radio>` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `undefined` | Controlled checked state (typically driven by group) |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial checked state |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | `undefined` | Callback fired on change |
| `value` | `string \| number` | `undefined` | Distinct value of this radio option |
| `name` | `string` | `undefined` | Native input name attribute (inherited from RadioGroup) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Outer circle and typography dimensions |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'primary'` | Palette color accent |
| `disabled` | `boolean` | `false` | Disables interaction and dims opacity |
| `readOnly` | `boolean` | `false` | Prevents selection toggling while remaining focusable |
| `required` | `boolean` | `false` | Marks native input as required |
| `error` | `boolean` | `false` | Displays error border outline |
| `inputRef` | `React.Ref<HTMLInputElement>` | `undefined` | Ref directed to the underlying `<input>` element |
| `inputProps` | `React.InputHTMLAttributes<HTMLInputElement>` | `undefined` | Custom attributes passed to hidden `<input>` |
| `asChild` | `boolean` | `false` | Delegates rendering to immediate child element |
| `sx` | `SxProps` | `undefined` | System style overrides |

### `<RadioGroup>` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | `undefined` | Controlled value of the selected radio |
| `defaultValue` | `string \| number` | `undefined` | Uncontrolled initial selected value |
| `onChange` | `(value: string \| number) => void` | `undefined` | Callback fired when selected radio changes |
| `name` | `string` | `undefined` | Shared native name attribute for grouped radios |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Cascaded size for child radios |
| `colorScheme` | `'primary' \| 'secondary' \| ...` | `'primary'` | Cascaded color scheme |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout flow direction |
| `spacing` | `number \| string` | `2` | Spacing gap between radios |
| `disabled` | `boolean` | `false` | Cascaded disabled state |
| `readOnly` | `boolean` | `false` | Cascaded read-only state |
| `error` | `boolean` | `false` | Cascaded error state |
| `asChild` | `boolean` | `false` | Delegates rendering to immediate child |
| `sx` | `SxProps` | `undefined` | System style overrides |

---

## 8. TypeScript Types

```typescript
export type RadioSize = "sm" | "md" | "lg";

export type RadioColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

export interface RadioOwnerState {
  size: RadioSize;
  colorScheme: RadioColorScheme;
  checked: boolean;
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  hasLabel: boolean;
}

export interface RadioProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value?: string | number | undefined;
  name?: string | undefined;
  size?: RadioSize | undefined;
  colorScheme?: RadioColorScheme | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  error?: boolean | undefined;
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | undefined;
  asChild?: boolean | undefined;
  component?: React.ElementType | undefined;
  as?: React.ElementType | undefined;
  sx?: SxProps;
  children?: React.ReactNode | undefined;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string | number | undefined;
  defaultValue?: string | number | undefined;
  onChange?: ((value: string | number) => void) | undefined;
  name?: string | undefined;
  size?: RadioSize | undefined;
  colorScheme?: RadioColorScheme | undefined;
  orientation?: "vertical" | "horizontal" | undefined;
  spacing?: number | string | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  error?: boolean | undefined;
  asChild?: boolean | undefined;
  component?: React.ElementType | undefined;
  as?: React.ElementType | undefined;
  sx?: SxProps;
  children?: React.ReactNode | undefined;
}

export interface RadioContextValue {
  value?: string | number | undefined;
  name?: string | undefined;
  size?: RadioSize | undefined;
  colorScheme?: RadioColorScheme | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  error?: boolean | undefined;
  onChange: (value: string | number) => void;
}
```

---

## 9. Variants & Visual States

Checkboxes and Radios follow clean, modern elevation states:
1. **Unchecked State**:
   - Circular outer ring: 2px solid `theme.palette.text.secondary`.
   - Inner dot: `transform: scale(0)`.
   - Hover: Border shifts to `theme.palette[colorScheme].main`, subtle circular halo background (`alpha(colorScheme, 0.08)`).
2. **Checked State**:
   - Circular outer ring: 2px solid `theme.palette[colorScheme].main`.
   - Background: transparent.
   - Inner dot: `theme.palette[colorScheme].main`, `transform: scale(1)`.
3. **Error State**:
   - Circular outer ring: `theme.palette.error.main`.
   - Inner dot (if checked): `theme.palette.error.main`.
4. **Disabled State**:
   - Opacity: 0.5.
   - Cursor: `not-allowed`.
   - Border: `theme.palette.action.disabled`.
   - Inner dot: `theme.palette.action.disabled`.

---

## 10. Sizes & Metrics

| Metric | `sm` | `md` (Default) | `lg` |
| :--- | :--- | :--- | :--- |
| **Outer Circle Diameter** | 16px | 20px | 24px |
| **Inner Dot Diameter** | 6px | 8px | 10px |
| **Border Thickness** | 2px | 2px | 2px |
| **Label Font Size** | 0.875rem (14px) | 1rem (16px) | 1.125rem (18px) |
| **Gap (Control to Label)** | 8px | 10px | 12px |
| **Focus / Hover Halo** | 6px | 8px | 10px |

---

## 11. States & Pseudo-Classes

- `:hover`: Displays circular halo around outer ring (`border-radius: 50%`).
- `:focus-visible`: Displays dual-ring focus outline (`outline: 2px solid theme.palette.primary.main`, `outline-offset: 2px`).
- `:active`: Smooth scale feedback (`transform: scale(0.92)`).
- `:disabled`: Neutralized pointer events, grayed background, disabled cursor.

---

## 12. Behavior

- Clicking anywhere on the label row selects the radio button.
- If `readOnly={true}`, clicking does not alter the state and no `onChange` callback is triggered.
- If already selected, clicking the same radio remains selected (mutually exclusive single-choice contract).
- In a `RadioGroup`, keyboard arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) move focus and automatically select the adjacent radio button (roving tabindex).

---

## 13. Controlled / Uncontrolled

- **Uncontrolled Radio**: Uses `defaultChecked` (defaults to `false`). State stored in native DOM `<input>`.
- **Controlled Radio**: Uses `checked` prop and `onChange` callback.
- **Uncontrolled RadioGroup**: Uses `defaultValue?: string | number`. State managed internally via `useControllableState`.
- **Controlled RadioGroup**: Uses `value?: string | number` and `onChange?: (value: string | number) => void`.

---

## 14. Events

- `onChange(event)`: Emits standard React synthetic change event from the underlying `<input type="radio">`.
- RadioGroup `onChange(value)`: Emits the selected value directly (`string | number`).

---

## 15. Composition

- `<RadioGroup>` wraps multiple `<Radio>` items and delivers context.
- `<FormField>` wraps `<RadioGroup>` providing form label, helper text, and error messages.

---

## 16. Ref Contract

- `ref` on `<Radio>` forwards to the root `<label>` element.
- `inputRef` on `<Radio>` forwards directly to the hidden native `<HTMLInputElement>`.
- `ref` on `<RadioGroup>` forwards to the root `<div>` element (`HTMLDivElement`).

---

## 17. Accessibility (WAI-ARIA)

- Checkbox/Radio uses native `<input type="radio">` with a shared `name` attribute which inherently implements the W3C WAI-ARIA Radio Group pattern.
- Screen readers natively announce the position and count (e.g. "Express shipping, radio button, selected, 2 of 3").
- `RadioGroup` container renders with `role="radiogroup"`.
- When `error={true}`, `aria-invalid="true"` is applied to the input.

---

## 18. Keyboard Interaction

| Key | Action |
| :--- | :--- |
| `Tab` | Moves focus into the radio group to the selected radio button (or first radio if none selected) |
| `Shift + Tab` | Moves focus out of the radio group |
| `ArrowDown` / `ArrowRight` | Moves focus and selection to the next radio in the group (cycles to first) |
| `ArrowUp` / `ArrowLeft` | Moves focus and selection to the previous radio in the group (cycles to last) |
| `Space` | Selects the focused radio button if not already selected |

---

## 19. Styling Contract

- Implemented via Emotion `styled()`.
- Classes:
  - `.ChellaaRadio-Root`: Container `<label>`
  - `.ChellaaRadio-HiddenInput`: Visually hidden input
  - `.ChellaaRadio-Control`: Visual circular outer ring
  - `.ChellaaRadio-Dot`: Inner animated circular dot
  - `.ChellaaRadio-Label`: Text label
  - `.ChellaaRadioGroup-Root`: Group container

---

## 20. Theme Contract

Customizable via `theme.components.ChellaaRadio.styleOverrides.root` and `theme.components.ChellaaRadioGroup.styleOverrides.root`.

---

## 21. Responsive Behavior

- In `RadioGroup`, `orientation="horizontal"` wraps automatically with `flex-wrap: wrap`.
- Label typography scales according to the `size` prop.

---

## 22. Motion & Animations

- Inner dot scales: `transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms`.
- Ring color transition: `150ms ease-in-out`.
- Scale on active press: `transform: scale(0.92)` with `100ms ease-out`.

---

## 23. Testing

- 100% test coverage with Vitest + React Testing Library.
- `vitest-axe` WCAG accessibility tests for unchecked, checked, disabled, and group configurations.
- Tests for controlled, uncontrolled, keyboard arrow navigation, and `useControllableState` sync.

---

## 24. Storybook

Stories included in `packages/react/src/components/Radio/Radio.stories.tsx`:
- `Default`: Basic standalone radio
- `RadioGroupDemo`: Controlled selection group with vertical & horizontal orientation
- `Sizes`: `sm`, `md`, `lg`
- `ColorSchemes`: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `default`
- `States`: Unchecked, Checked, Disabled Unchecked, Disabled Checked, Error
- `WithFormField`: Inside `<FormField>` with validation error message

---

## 25. Documentation Reqs

Document props table, interactive group demos, single-choice selection code examples, and accessibility guidelines.

---

## 26. Edge Cases

1. **RadioGroup without initial value**:
   - None of the radios are checked initially; user can select any radio, after which one remains selected.
2. **Empty Radio without children**:
   - Renders circular control without extra margins. Must possess `aria-label` or `aria-labelledby` for accessibility.
3. **Form Reset**:
   - Resets to `defaultValue` or initial uncontrolled state.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Radio | Chakra Radio | Ant Design Radio |
| :--- | :--- | :--- | :--- | :--- |
| **Roving Tabindex** | Native Arrow Key Roving | Native Arrow Key Roving | Custom hook roving | Native grouping |
| **Group Component** | `<RadioGroup>` | `<RadioGroup>` | `<RadioGroup>` | `<Radio.Group>` |
| **Styling** | Zero-runtime CSS variables + Emotion | Emotion / Pigment | Emotion | Less / CSS-in-JS |
| **Slot Delegation** | Radix `asChild` | No | No | No |

---

## 28. Deferred Features

- Radio card button variant (e.g. rich selection cards with icons and descriptions) deferred to Phase 3.

---

## 29. Acceptance Criteria

- [x] Radio supports checked and unchecked states with smooth inner dot animation.
- [x] RadioGroup manages single-choice state and propagates name/size/colorScheme.
- [x] FormField context auto-cascades to Radio.
- [x] Zero axe violations across all states.
- [x] 100% test pass rate with Vitest.

---

## 30. Definition of Done

- Specification document approved.
- All primitives implemented in `packages/react/src/components/Radio/`.
- Full unit tests and Storybook stories written.
- Exported in root `packages/react/src/index.ts`.
- Built and committed to repository.
