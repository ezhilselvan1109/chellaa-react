# Select Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)  

---

## 1. Identity

```text
Component Name:     Select
Package Export:     import { Select } from "@chellaa/react";
Category:           Forms
Status:             Approved & Implementation Ready
Phase:              3 — Component Specifications
Related Components: Combobox, Menu, FormControl
```

---

## 2. Purpose

The `Select` component allows users to pick a single value from a collapsible list of options. It solves the styling and layout limitations of the native HTML `<select>` element by offering rich custom option designs, floating overlay placement, and full WAI-ARIA APG Listbox compliance.

### When to Use
- Selecting a single value from a list of 5 to 50 options (countries, roles, themes, statuses).
- Form inputs requiring custom option layouts with icons, subtitles, or badges.
- When an accessible, custom-styled dropdown picker is required.

### When NOT to Use
- **Do NOT use for fewer than 4 options.** Use `RadioGroup` or `SegmentedControl` for higher visibility and single-click speed.
- **Do NOT use for large, searchable datasets (> 50 items).** Use `Combobox` / `Autocomplete` to allow filtering and typing.
- **Do NOT use for multi-selection.** Use `MultiSelect` or `CheckboxGroup`.

---

## 3. Scope

### In Scope
- Compound component architecture (`Select.Root`, `Select.Trigger`, `Select.Value`, `Select.Portal`, `Select.Content`, `Select.Item`, `Select.ItemText`, `Select.ItemIndicator`, `Select.Group`, `Select.Label`, `Select.Separator`).
- 3 visual variants: `outline` (default), `filled`, `flushed`.
- 5 standardized sizes: `xs`, `sm`, `md`, `lg`, `xl` (matching `Input` and `Button` heights).
- Generic type support: `Select<TValue extends string = string>`.
- Strict WAI-ARIA APG Listbox compliance (keyboard navigation, `aria-expanded`, `aria-selected`, roving focus).
- Floating portal rendering with automated collision boundary detection.
- Controlled (`value`, `onValueChange`) and uncontrolled (`defaultValue`) state.
- Form states (`isDisabled`, `isInvalid`, `isRequired`, `name`).

---

## 4. Non-Goals

- Multi-select with chip tags (deferred to `MultiSelect` in Phase 6).
- Search input filtering within dropdown (reserved for `Combobox`).
- Virtual scrolling for thousands of options (handled by specialized data grids).

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Select Feature Summary                         │
├────────────────────┬───────────────────────────────────────────────────┤
│ Architecture       │ Compound WAI-ARIA APG Listbox pattern             │
├────────────────────┼───────────────────────────────────────────────────┤
│ Type Safety        │ Generic Select<TValue extends string = string>    │
├────────────────────┼───────────────────────────────────────────────────┤
│ Sizing Scale       │ xs, sm, md (default), lg, xl [Optical 1:1 match]  │
├────────────────────┼───────────────────────────────────────────────────┤
│ Keyboard Physics   │ ArrowUp/Down, Home, End, Enter, Space, Escape,    │
│                    │ printable character type-ahead search             │
├────────────────────┼───────────────────────────────────────────────────┤
│ Overlay Placement  │ Rendered in React DOM Portal with collision flip  │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Select (Root Context Provider)
└── Select.Trigger (HTML <button role="combobox">)
    ├── Select.Value (Text span)
    └── [Slot: Chevron Icon]
└── Select.Portal (React DOM Portal rendered into document.body)
    └── Select.Content (HTML <div role="listbox">)
        ├── Select.Group (Optional category grouping)
        │   ├── Select.Label (Category header)
        │   └── Select.Item (HTML <div role="option">)
        │       ├── Select.ItemText (Option label)
        │       └── Select.ItemIndicator (Checkmark icon)
        └── Select.Separator (Visual divider)
```

---

## 7. Public API

### `Select.Root` Props
```typescript
export interface SelectRootProps<TValue extends string = string> {
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: SelectSize;
  variant?: SelectVariant;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  name?: string;
  children: React.ReactNode;
}
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Select.Root Props                                     │
├───────────────┬───────────────────────────┬──────────┬───────────┬──────────────────────┤
│ Prop Name     │ Type                      │ Req/Opt  │ Default   │ A11y Impact          │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ value         │ TValue                    │ Optional │ undefined │ Controlled value     │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ defaultValue  │ TValue                    │ Optional │ undefined │ Uncontrolled default │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ onValueChange │ (value: TValue) => void   │ Optional │ undefined │ Value change callback│
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ isOpen        │ boolean                   │ Optional │ undefined │ Controlled open state│
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ defaultOpen   │ boolean                   │ Optional │ false     │ Uncontrolled open    │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ onOpenChange  │ (open: boolean) => void   │ Optional │ undefined │ Open toggle callback │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ size          │ SelectSize                │ Optional │ "md"      │ Spatial dimensions   │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ variant       │ SelectVariant             │ Optional │ "outline" │ Visual styling       │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ isDisabled    │ boolean                   │ Optional │ false     │ Disables select      │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ isInvalid     │ boolean                   │ Optional │ false     │ Sets aria-invalid    │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ isRequired    │ boolean                   │ Optional │ false     │ Sets aria-required   │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ name          │ string                    │ Optional │ undefined │ Hidden form input    │
└───────────────┴───────────────────────────┴──────────┴───────────┴──────────────────────┘
```

---

## 8. TypeScript Types

```typescript
export type SelectVariant = "outline" | "filled" | "flushed";
export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SelectRootProps<TValue extends string = string> {
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: SelectSize;
  variant?: SelectVariant;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  name?: string;
  children: React.ReactNode;
}

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface SelectValueProps {
  placeholder?: string;
}

export interface SelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned";
  sideOffset?: number;
}

export interface SelectItemProps<TValue extends string = string>
  extends React.HTMLAttributes<HTMLDivElement> {
  value: TValue;
  isDisabled?: boolean;
}
```

---

## 9. Variants

- **outline (Default):** Complete 1px border around trigger button; matches standard text inputs.
- **filled:** Subdued surface background, elevating on focus.
- **flushed:** Bottom border only; minimal design.

---

## 10. Sizes

Trigger button heights match standard interactive elements (`Button`, `Input`):
- `xs`: 28px height, 12px font size.
- `sm`: 32px height, 14px font size.
- `md` (Default): 40px height, 14px font size.
- `lg`: 48px height, 16px font size.
- `xl`: 56px height, 18px font size.

---

## 11. States

- **Trigger Resting:** Base surface and border tokens.
- **Trigger Hover:** Border elevates to `--cl-color-border-str`.
- **Trigger Focus:** 2px focus ring (`outline: 2px solid var(--cl-color-focus-ring)`).
- **Trigger Open:** Chevron rotates 180 degrees.
- **Item Highlighted:** Background `--cl-color-bg-muted`.
- **Item Selected:** Marked with checkmark (`Select.ItemIndicator`) and bold label.
- **Disabled State (`isDisabled`):** Opacity 0.6, cursor not-allowed, clicks suppressed.

---

## 12. Behavior

### State Transition Matrix
| Current State | User Action | Next State | Effect |
|---|---|---|---|
| Closed | Click Trigger | Open | Mount Portal, focus active item |
| Closed | Press Down / Enter / Space on Trigger | Open | Open menu, highlight first item |
| Open | Press Escape | Closed | Close menu, return focus to Trigger |
| Open | Click outside dropdown | Closed | Close menu, trigger onOpenChange(false) |
| Open | Click Select.Item | Closed | Select value, fire onValueChange, close |
| Open | Press ArrowDown | Open | Highlight next non-disabled item |
| Open | Press ArrowUp | Open | Highlight previous item |
| Open | Type character (e.g. "B") | Open | Jump highlight to item starting with "B" |

---

## 13. Controlled / Uncontrolled

### Controlled
```tsx
const [val, setVal] = useState("apple");
<Select.Root value={val} onValueChange={setVal}>
  <Select.Trigger><Select.Value /></Select.Trigger>
  <Select.Portal>
    <Select.Content>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
    </Select.Content>
  </Select.Portal>
</Select.Root>
```

### Uncontrolled
```tsx
<Select.Root defaultValue="apple">
  ...
</Select.Root>
```

---

## 14. Events

- `onValueChange: (value: TValue) => void`: Fires immediately when a valid option item is selected.
- `onOpenChange: (open: boolean) => void`: Fires when dropdown expands or collapses.

---

## 15. Composition

- `Select.Trigger` supports `asChild` for delegating to custom trigger buttons.
- Compound export structure:
  ```tsx
  export const Select = Object.assign(SelectRoot, {
    Trigger: SelectTrigger,
    Value: SelectValue,
    Portal: SelectPortal,
    Content: SelectContent,
    Item: SelectItem,
    ItemText: SelectItemText,
    ItemIndicator: SelectItemIndicator,
    Group: SelectGroup,
    Label: SelectLabel,
    Separator: SelectSeparator,
  });
  ```

---

## 16. Ref Contract

- `Select.Trigger` forwards ref to `HTMLButtonElement`.
- `Select.Content` forwards ref to `HTMLDivElement`.

---

## 17. Accessibility

### 17.1 WAI-ARIA APG Roles
- Trigger: `<button role="combobox" aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listboxId}>`.
- Content: `<div role="listbox" id={listboxId} aria-labelledby={triggerId}>`.
- Item: `<div role="option" aria-selected={isSelected} aria-disabled={disabled}>`.

### 17.2 Focus Management
- Opening the listbox places virtual focus on the selected option or first available item.
- Dismissing the listbox (via Escape or item selection) **must restore keyboard focus to the Trigger button**.

---

## 18. Keyboard Interaction

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Select Keyboard Keymap                         │
├────────────────────┬───────────────────────────────────────────────────┤
│ Key / Combination  │ Expected APG Action                               │
├────────────────────┼───────────────────────────────────────────────────┤
│ Space / Enter      │ On Trigger: Opens menu. On Item: Selects item.    │
├────────────────────┼───────────────────────────────────────────────────┤
│ ArrowDown          │ Moves highlight to next item. Opens if closed.    │
├────────────────────┼───────────────────────────────────────────────────┤
│ ArrowUp            │ Moves highlight to previous item.                 │
├────────────────────┼───────────────────────────────────────────────────┤
│ Home / End         │ Jumps highlight to first / last item.             │
├────────────────────┼───────────────────────────────────────────────────┤
│ Escape             │ Closes menu and immediately restores focus.       │
├────────────────────┼───────────────────────────────────────────────────┤
│ Printable Chars    │ Type-ahead search: jumps to matching item.        │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 19. Styling Contract

```css
@layer cl-components {
  .cl-select__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: var(--cl-font-sans);
    background-color: var(--cl-color-bg-canvas);
    border: 1px solid var(--cl-color-border-def);
    border-radius: var(--cl-rad-md);
    cursor: pointer;
  }

  .cl-select__content {
    background-color: var(--cl-color-bg-elev);
    border: 1px solid var(--cl-color-border-sub);
    border-radius: var(--cl-rad-lg);
    box-shadow: var(--cl-shadow-lg);
    z-index: var(--cl-z-popover);
    padding: var(--cl-space-1);
    min-width: 8rem;
  }

  .cl-select__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--cl-space-2) var(--cl-space-3);
    border-radius: var(--cl-rad-sm);
    cursor: pointer;
  }

  .cl-select__item--highlighted {
    background-color: var(--cl-color-bg-muted);
    outline: none;
  }

  .cl-select__item--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
}
```

---

## 20. Theme Contract

- Automatically reacts to Light and Dark modes via elevated surface tokens (`--cl-color-bg-elev`, `--cl-shadow-lg`).

---

## 21. Responsive Behavior

- Menu automatically flips upwards if opening downwards would overflow the bottom viewport boundary.

---

## 22. Motion

Under `@media (prefers-reduced-motion: reduce)`:
```css
@media (prefers-reduced-motion: reduce) {
  .cl-select__content {
    transition-duration: 0.01ms !important;
  }
}
```

---

## 23. Testing

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Select Test Matrix                             │
├───────────────────────────────────┬────────────────────────────────────┤
│ Category                          │ Applicability & Verification       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Rendering / Prop Pass-through  │ Applicable: verifies compound DOM. │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ Applicable: opening, clicking item │
│                                   │ updates value.                     │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Accessibility / axe-core       │ Applicable: zero violations with   │
│                                   │ APG combobox/listbox roles.        │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ Applicable: Arrow keys, Home, End, │
│                                   │ Enter, Escape, type-ahead.         │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled / Uncontrolled      │ Applicable: value/onValueChange vs.│
│                                   │ defaultValue.                      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading State Guards│ Applicable: disabled select blocks │
│                                   │ trigger clicks; disabled items skip│
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR & RSC Compatibility        │ Applicable: SSR renders trigger;   │
│                                   │ portal mounts safely on client.    │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 24. Storybook

1. `Default`: Interactive select with fruit options.
2. `Controlled`: Demonstrates controlled `value` and state badge.
3. `WithGroups`: Demonstrates `Select.Group` and `Select.Label`.
4. `DisabledItems`: Select containing individual disabled options.
5. `FormValidation`: Invalid error state with red border.
6. `DarkTheme`: Verified under Dark Mode surface elevation.

---

## 25. Documentation Requirements

- Live example of compound component pattern.
- API documentation for all compound sub-components.
- WAI-ARIA APG compliance notes and keyboard keymap table.

---

## 26. Edge Cases

1. **Focus Restoration Failure:** Focus returns to Trigger when closing via backdrop click or Escape.
2. **Hidden Form Field:** Hidden `<input type="hidden" name={name} value={value} />` supports traditional HTML form submission.
3. **Viewport Collision:** Menu flips upwards when positioned near the bottom of the viewport.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Select Reference Comparison Matrix                   │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ Select / MenuItem │ Select (options[]) │ Compound APG Select           │
│ value / onChange  │ value / onChange   │ value / onValueChange         │
│ native select     │ -                  │ Custom APG Listbox exclusively│
│ renderValue       │ labelRender        │ Select.Value slot             │
│ multiple          │ mode="multiple"    │ Deferred to MultiSelect       │
│ AutoComplete      │ showSearch         │ Reserved for Combobox         │
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Multi-Select Tags:** Deferred to `MultiSelect` in Phase 6.
- **Searchable Autocomplete:** Handled by `Combobox` in Phase 6.

---

## 29. Acceptance Criteria

- [ ] Compound component export: `Select.Trigger`, `Select.Value`, `Select.Content`, `Select.Item`.
- [ ] Strictly typed generic `Select<TValue extends string = string>`.
- [ ] Strict WAI-ARIA APG Listbox compliance with `role="combobox"` and `role="listbox"`.
- [ ] Keyboard navigation fully functional: Arrow keys, Enter, Space, Escape, Home, End, Type-ahead.
- [ ] Focus restored to trigger button upon close.
- [ ] Zero axe-core accessibility violations.
- [ ] Both controlled (`value`) and uncontrolled (`defaultValue`) work reliably.
- [ ] Styled in `@layer cl-components` using `--cl-*` variables.

---

## 30. Definition of Done

The Select specification is approved, hardened against reference libraries, verified for cross-document consistency, and ready for Phase 4 implementation.
