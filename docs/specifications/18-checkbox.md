# Checkbox & CheckboxGroup Component Specification (Tri-State Accessible Checkbox Primitives)

**Document Status:** Approved & Baseline  
**Phase:** Phase 2 — Core Form Controls  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Checkbox, CheckboxGroup, CheckboxContext, useCheckboxGroup
Package Export:     import { Checkbox, CheckboxGroup, useCheckboxGroup, type CheckboxProps, type CheckboxGroupProps, type CheckboxSize, type CheckboxColorScheme } from "@chellaa/react";
Category:           Forms & Inputs
Status:             Approved & Implementation Baseline
Phase:              Phase 2 — Core Form Controls
Related Components: FormField, Radio, RadioGroup, Switch, Button
```

---

## 2. Purpose

The `Checkbox` and `CheckboxGroup` primitives provide an **enterprise-grade, tri-state interactive selection control** adhering to W3C WAI-ARIA 1.2 Checkbox Design Patterns and Google Material Design 3 state layer specifications.

Checkboxes allow users to select one or multiple options from a set, or toggle an individual binary decision (e.g. Terms of Service agreements, data permissions). The `Checkbox` primitive supports three visual and semantic states:
1. **Unchecked (`false`)**: State is inactive.
2. **Checked (`true`)**: State is selected.
3. **Indeterminate (`"mixed"` / `indeterminate={true}`)**: Partially selected parent in a hierarchical group or undecided state.

`CheckboxGroup` coordinates multiple checkboxes, manages multi-value array states in both controlled and uncontrolled modes (powered by `useControllableState`), enforces consistent name/size/colorScheme cascade, and exposes a high-density vertical or horizontal flow layout.

### When to Use

- **Multi-Option Selection**: Allowing users to choose any number of options (zero, one, or several) from a predefined list.
- **Standalone Binary Agreement**: Individual toggle for confirmation flags, opt-ins, or "Remember Me".
- **Nested / Hierarchical Selections**: "Select All" master controls where some child options are selected (`indeterminate`), all are selected (`checked`), or none are selected (`unchecked`).
- **Data Table Row Selection**: Selecting single, multiple, or all rows in data tables and batch action toolbars.

### When NOT to Use

- **Mutually Exclusive Choice**: If the user may select *only one* option from a list, use `<RadioGroup>` (Spec 19).
- **Immediate State Toggle**: For instantaneous device activations (e.g. toggling Wi-Fi, Dark Mode, Airplane Mode) that take effect immediately without pressing "Save" or "Submit", use `<Switch>` (Spec 20).
- **Action Trigger**: If clicking executes an operation (e.g. Download, Delete, Open), use `<Button>`.

---

## 3. Scope

### In Scope

1. **Tri-State Capability**:
   - `checked?: boolean`
   - `defaultChecked?: boolean`
   - `indeterminate?: boolean` (sets DOM `HTMLInputElement.indeterminate = true` and `aria-checked="mixed"`).
2. **Accessible Native Input Layer**:
   - Hidden native `<input type="checkbox">` rendered inside label wrapper to guarantee full browser form submission, keyboard events, screen reader focus, and touch hitboxes.
3. **CheckboxGroup Orchestration**:
   - Manages an array of values (`string[]`).
   - Group-level cascade of `name`, `size`, `colorScheme`, `disabled`, `readOnly`, `error`, and `orientation` (`"vertical"` | `"horizontal"`).
   - Bi-directional sync: individual `<Checkbox value="x">` toggles membership in `string[]`.
4. **FormField Integration**:
   - Consumes `useFormField()` for automatic cascade of `id`, `name`, `disabled`, `readOnly`, `required`, `error`, and `aria-describedby`.
5. **Theme Tokens & Styling**:
   - Sizes: `sm` (16px box), `md` (20px box), `lg` (24px box).
   - Color Schemes: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `default`.
   - Subtle hover halo, focus-visible outline, tactile press scale.
6. **Slot & Zero-DOM Composition**:
   - Supports `asChild` composition via `Slot`.

### Out of Scope

- Segmented buttons (handled by `Segmented` component).
- Multi-column tree grids (handled by `Tree` component).

---

## 4. Non-Goals

- Checkbox does **not** manage server-side validation; it emits standard synthetic change events.
- Checkbox does **not** reinvent native form serialization; using standard `<input type="checkbox">` guarantees form data works out-of-the-box with `FormData` and native HTML `<form>`.

---

## 5. Feature Summary

| Feature | Description | Implementation Detail |
| :--- | :--- | :--- |
| **Tri-State Toggle** | Supports checked, unchecked, and mixed | Controlled/uncontrolled boolean + `indeterminate` prop |
| **Native Accessibility** | Hidden native input with full WAI-ARIA fidelity | `aria-checked="mixed"`, `tabIndex`, native form submission |
| **Group Coordination** | Manages array of selected string values | `<CheckboxGroup value={val} onChange={setVal}>` |
| **Dual Alignment** | Flexible layout for groups | `orientation="vertical"` (default) or `"horizontal"` |
| **Fluid Scaling** | 3 standard sizes | `sm` (16px), `md` (20px), `lg` (24px) |
| **Theme Aware** | Palette-driven accents | `primary`, `secondary`, `success`, `error`, `warning`, `info` |
| **FormField Cascade** | Zero-config error and disable cascade | Auto-consumes `useFormField()` |
| **Zero-DOM Slot** | Radix-style custom wrapper delegation | `asChild` integration via `Slot` |

---

## 6. Anatomy

### Checkbox Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ <label class="ChellaaCheckbox-Root">                                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <input type="checkbox" class="ChellaaCheckbox-HiddenInput" />    │  │ (Visually hidden, focusable)
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <span class="ChellaaCheckbox-Control">                           │  │ (Visual custom box)
│  │   <svg class="ChellaaCheckbox-Icon"> [Checkmark | Dash] </svg>   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ <span class="ChellaaCheckbox-Label"> Remember my credentials     │  │ (Optional label text)
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### CheckboxGroup Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│ <div role="group" class="ChellaaCheckboxGroup-Root">                   │
│   <Checkbox value="react">React</Checkbox>                             │
│   <Checkbox value="vue">Vue</Checkbox>                                 │
│   <Checkbox value="angular">Angular</Checkbox>                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Public API

### `<Checkbox>` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default checked state |
| `indeterminate` | `boolean` | `false` | Renders dash icon and sets `aria-checked="mixed"` |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | `undefined` | Callback fired on change |
| `value` | `string` | `undefined` | Value used when nested in a `CheckboxGroup` |
| `name` | `string` | `undefined` | Form input name attribute |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Box and typography dimensions |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'primary'` | Palette color accent |
| `disabled` | `boolean` | `false` | Disables interaction and dims opacity |
| `readOnly` | `boolean` | `false` | Prevents value toggling while retaining focusability |
| `required` | `boolean` | `false` | Marks native input as required |
| `error` | `boolean` | `false` | Sets error border and invalid ARIA state |
| `inputRef` | `React.Ref<HTMLInputElement>` | `undefined` | Ref directed to the underlying `<input>` element |
| `inputProps` | `React.InputHTMLAttributes<HTMLInputElement>` | `undefined` | Custom attributes passed to hidden `<input>` |
| `asChild` | `boolean` | `false` | Delegates rendering to immediate child element |
| `sx` | `SxProps` | `undefined` | System style overrides |

### `<CheckboxGroup>` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string[]` | `undefined` | Controlled array of selected checkbox values |
| `defaultValue` | `string[]` | `[]` | Uncontrolled initial array of selected values |
| `onChange` | `(value: string[]) => void` | `undefined` | Callback fired when selection changes |
| `name` | `string` | `undefined` | Shared name attribute for all grouped checkboxes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Cascaded size for child checkboxes |
| `colorScheme` | `'primary' \| 'secondary' \| ...` | `'primary'` | Cascaded color scheme |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout flow direction |
| `spacing` | `number \| string` | `2` | Spacing gap between checkboxes |
| `disabled` | `boolean` | `false` | Cascaded disabled state |
| `readOnly` | `boolean` | `false` | Cascaded read-only state |
| `error` | `boolean` | `false` | Cascaded error state |
| `asChild` | `boolean` | `false` | Delegates rendering to immediate child |
| `sx` | `SxProps` | `undefined` | System style overrides |

---

## 8. TypeScript Types

```typescript
export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

export interface CheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  indeterminate?: boolean | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value?: string | undefined;
  name?: string | undefined;
  size?: CheckboxSize | undefined;
  colorScheme?: CheckboxColorScheme | undefined;
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

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string[] | undefined;
  defaultValue?: string[] | undefined;
  onChange?: ((value: string[]) => void) | undefined;
  name?: string | undefined;
  size?: CheckboxSize | undefined;
  colorScheme?: CheckboxColorScheme | undefined;
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

export interface CheckboxContextValue {
  value: string[];
  name?: string | undefined;
  size?: CheckboxSize | undefined;
  colorScheme?: CheckboxColorScheme | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  error?: boolean | undefined;
  toggleValue: (itemValue: string) => void;
}
```

---

## 9. Variants & Visual States

Unlike buttons with outlined/filled modes, Checkboxes follow a unified modern surface variant:
1. **Unchecked State**:
   - Transparent background.
   - Border: 2px solid `theme.palette.divider` or `text.secondary`.
   - Hover: Border shifts to `theme.palette[colorScheme].main`, subtle circular halo background (`alpha(colorScheme, 0.08)`).
2. **Checked State**:
   - Filled background: `theme.palette[colorScheme].main`.
   - Border: 2px solid `theme.palette[colorScheme].main`.
   - Icon: White SVG checkmark with crisp geometric vectors.
3. **Indeterminate State**:
   - Filled background: `theme.palette[colorScheme].main`.
   - Border: 2px solid `theme.palette[colorScheme].main`.
   - Icon: White SVG minus / horizontal dash.
4. **Error State**:
   - Border: `theme.palette.error.main`.
   - If checked in error state: background is `theme.palette.error.main`.
5. **Disabled State**:
   - Opacity: 0.5.
   - Cursor: `not-allowed`.
   - Border: `theme.palette.action.disabled`.
   - If checked: background is `theme.palette.action.disabledBackground`.

---

## 10. Sizes & Metrics

| Metric | `sm` | `md` (Default) | `lg` |
| :--- | :--- | :--- | :--- |
| **Control Box Size** | 16px × 16px | 20px × 20px | 24px × 24px |
| **Icon Size** | 12px × 12px | 14px × 14px | 18px × 18px |
| **Border Radius** | 4px (`sm`) | 4px (`sm`) | 6px (`md`) |
| **Label Font Size** | 0.875rem (14px) | 1rem (16px) | 1.125rem (18px) |
| **Gap (Box to Label)** | 8px | 10px | 12px |
| **Halo Padding** | 6px | 8px | 10px |

---

## 11. States & Pseudo-Classes

- `:hover`: Displays circular halo around control box (`border-radius: 50%`).
- `:focus-visible`: Displays dual-ring focus outline (`outline: 2px solid theme.palette.primary.main`, `outline-offset: 2px`).
- `:active`: Smooth scale feedback (`transform: scale(0.92)`).
- `:disabled`: Neutralized pointer events, grayed background, disabled cursor.

---

## 12. Behavior

- Clicking anywhere on the label row toggles the checkbox state.
- If `readOnly={true}`, clicking does not alter the state and no `onChange` callback is triggered.
- When `indeterminate={true}`, clicking toggles the checkbox to `checked={true}` (or fires `onChange`).
- Native keyboard interaction: pressing `Space` when the checkbox is focused toggles its state.

---

## 13. Controlled / Uncontrolled

- **Uncontrolled Checkbox**: Uses `defaultChecked` (defaults to `false`). State is stored in native DOM `<input>`.
- **Controlled Checkbox**: Uses `checked` prop and `onChange` callback.
- **Uncontrolled CheckboxGroup**: Uses `defaultValue?: string[]` (defaults to `[]`). State is managed internally via `useControllableState`.
- **Controlled CheckboxGroup**: Uses `value?: string[]` and `onChange?: (value: string[]) => void`.

---

## 14. Events

- `onChange(event)`: Emits standard React synthetic change event for native input integration.
- CheckboxGroup `onChange(newValues)`: Emits the updated string array of selected values.

---

## 15. Composition

- `<Checkbox>` can be used standalone.
- `<CheckboxGroup>` wraps multiple `<Checkbox>` items and passes context.
- `<FormField>` wraps `<Checkbox>` or `<CheckboxGroup>` providing label, helper text, and error messages.

---

## 16. Ref Contract

- `ref` on `<Checkbox>` forwards to the root `<label>` element.
- `inputRef` on `<Checkbox>` forwards directly to the hidden native `<HTMLInputElement>`.
- `ref` on `<CheckboxGroup>` forwards to the root `<div>` element (`HTMLDivElement`).

---

## 17. Accessibility (WAI-ARIA)

- Checkbox uses native `<input type="checkbox">` which inherently satisfies WAI-ARIA 1.2.
- Screen readers natively announce state (`checked`, `not checked`, or `mixed`).
- When `indeterminate={true}`, `aria-checked="mixed"` is applied to the input, and the DOM property `input.indeterminate = true` is set via `useLayoutEffect`/`useEffect`.
- When `error={true}`, `aria-invalid="true"` is applied to the input.
- `CheckboxGroup` renders with `role="group"`.

---

## 18. Keyboard Interaction

| Key | Action |
| :--- | :--- |
| `Tab` | Moves focus to the next focusable element / checkbox |
| `Shift + Tab` | Moves focus to the previous focusable element |
| `Space` | Toggles the checked state of the focused checkbox |

---

## 19. Styling Contract

- Implemented via Emotion `styled()`.
- Classes:
  - `.ChellaaCheckbox-Root`: Container `<label>`
  - `.ChellaaCheckbox-HiddenInput`: Visually hidden input
  - `.ChellaaCheckbox-Control`: Visual checkbox box
  - `.ChellaaCheckbox-Icon`: SVG icon
  - `.ChellaaCheckbox-Label`: Text label
  - `.ChellaaCheckboxGroup-Root`: Group container

---

## 20. Theme Contract

Customizable via `theme.components.ChellaaCheckbox.styleOverrides.root` and `theme.components.ChellaaCheckboxGroup.styleOverrides.root`.

---

## 21. Responsive Behavior

- Checkboxes adjust label font size according to the `size` prop.
- In `CheckboxGroup`, `orientation="horizontal"` wraps automatically with `flex-wrap: wrap`.

---

## 22. Motion & Animations

- Visual checkmark uses CSS `transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms`.
- Background color transition: `150ms ease-in-out`.
- Scale on active press: `transform: scale(0.92)` with `100ms ease-out`.

---

## 23. Testing

- 100% test coverage with Vitest + React Testing Library.
- `vitest-axe` WCAG accessibility tests for unchecked, checked, indeterminate, disabled, and group configurations.
- Tests for controlled, uncontrolled, keyboard `Space` press, and `useControllableState` sync.

---

## 24. Storybook

Stories included in `packages/react/src/components/Checkbox/Checkbox.stories.tsx`:
- `Default`: Basic standalone checkbox
- `Indeterminate`: Parent "Select All" with child options
- `Sizes`: `sm`, `md`, `lg`
- `ColorSchemes`: `primary`, `secondary`, `success`, `error`, `warning`, `info`
- `CheckboxGroupDemo`: Controlled selection group with vertical & horizontal orientation
- `WithFormField`: Inside `<FormField>` with validation error message

---

## 25. Documentation Reqs

Document props table, interactive group demos, tri-state nested selection code examples, and accessibility guidelines.

---

## 26. Edge Cases

1. **Both checked and indeterminate set to true**:
   - `indeterminate` takes visual precedence (renders minus icon and `aria-checked="mixed"`). Clicking toggles to checked.
2. **Empty Checkbox without children**:
   - Renders box without empty label margin. Must possess `aria-label` or `aria-labelledby` for accessibility.
3. **Form Reset**:
   - Resets to `defaultChecked` or `defaultValue`.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Checkbox | Chakra Checkbox | Ant Design Checkbox |
| :--- | :--- | :--- | :--- | :--- |
| **Tri-State** | Full (`indeterminate`) | Full (`indeterminate`) | Full (`isIndeterminate`) | Full (`indeterminate`) |
| **Group Component** | `<CheckboxGroup>` | `<FormGroup>` | `<CheckboxGroup>` | `<Checkbox.Group>` |
| **Styling** | Zero-runtime CSS variables + Emotion | Emotion / Pigment | Emotion | Less / CSS-in-JS |
| **Slot Delegation** | Radix `asChild` | No | No | No |

---

## 28. Deferred Features

- Custom SVG checkmark replacement slot (deferred to Phase 3).

---

## 29. Acceptance Criteria

- [x] Checkbox supports checked, unchecked, and indeterminate states.
- [x] CheckboxGroup manages value array for nested checkboxes.
- [x] FormField context auto-cascades to Checkbox.
- [x] Zero axe violations across all states.
- [x] 100% test pass rate with Vitest.

---

## 30. Definition of Done

- Specification document approved.
- All primitives implemented in `packages/react/src/components/Checkbox/`.
- Full unit tests and Storybook stories written.
- Exported in root `packages/react/src/index.ts`.
- Built and committed to repository.
