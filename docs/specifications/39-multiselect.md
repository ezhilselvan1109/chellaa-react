# SPEC-039: MultiSelect Specification

## 1. Overview
The `MultiSelect` component is a searchable, accessible multiple-selection dropdown control built for selecting multiple items from a list of options. It provides selected-item chips/tags with dismiss buttons, keyboard navigation, popover positioning without initial-position flash, search filtering, clear-all action, disabled option states, loading/empty states, and full `FormField` integration.

---

## 2. Public API & Type Definitions

```typescript
export interface MultiSelectOption<TValue = string> {
  value: TValue;
  label: string;
  disabled?: boolean;
  description?: string;
}

export type MultiSelectSize = "sm" | "md" | "lg";
export type MultiSelectVariant = "outline" | "filled";

export interface MultiSelectProps<TValue = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * List of available selectable options.
   */
  options: MultiSelectOption<TValue>[];

  /**
   * Controlled array of selected option values.
   */
  value?: TValue[];

  /**
   * Initial uncontrolled array of selected option values.
   * @default []
   */
  defaultValue?: TValue[];

  /**
   * Callback fired when selection changes.
   */
  onValueChange?: (values: TValue[]) => void;

  /**
   * Placeholder text shown when no options are selected.
   * @default "Select options..."
   */
  placeholder?: string;

  /**
   * Search input placeholder.
   * @default "Search options..."
   */
  searchPlaceholder?: string;

  /**
   * Whether the options dropdown is searchable.
   * @default true
   */
  isSearchable?: boolean;

  /**
   * Whether to show a clear-all button when options are selected.
   * @default true
   */
  isClearable?: boolean;

  /**
   * Controlled open state of the options popover.
   */
  isOpen?: boolean;

  /**
   * Initial uncontrolled open state.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Whether the component is disabled.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the component is in an invalid error state.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Loading state showing spinner in popover.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Custom message when no matching options are found.
   * @default "No options found."
   */
  emptyMessage?: string;

  /**
   * Spatial density scale.
   * @default "md"
   */
  size?: MultiSelectSize;

  /**
   * Visual aesthetic variant.
   * @default "outline"
   */
  variant?: MultiSelectVariant;

  /**
   * Maximum number of visible chips before collapsing into "+N more".
   * If omitted, all selected chips are rendered.
   */
  maxTagCount?: number;

  /**
   * Accessible label for the control.
   */
  "aria-label"?: string;
}
```

---

## 3. Keyboard Interactions & Accessibility
- **Trigger**: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`, `aria-describedby`, `aria-invalid`.
- **Popover**: `role="listbox"`, `aria-multiselectable="true"`.
- **Options**: `role="option"`, `aria-selected="true"|"false"`, `aria-disabled="true"|"false"`.
- **Tags**: Rendered as accessible chips with `<button aria-label="Remove {label}">` to remove individual selections.
- **Keys**:
  - `Enter` / `Space` / `ArrowDown`: Opens popup when focused on trigger.
  - `ArrowDown` / `ArrowUp`: Navigates through listbox options via roving active descendant.
  - `Enter` / `Space` on option: Toggles selection of highlighted option without closing popover.
  - `Escape`: Closes popover and returns focus to trigger control.
  - `Backspace` in search input (when empty): Removes the last selected tag.

---

## 4. Styling & Tokens
- Layer: `@layer cl-components`
- Classes:
  - `.cl-multiselect`
  - `.cl-multiselect__control`
  - `.cl-multiselect__tags`
  - `.cl-multiselect__tag`
  - `.cl-multiselect__tag-remove`
  - `.cl-multiselect__input`
  - `.cl-multiselect__clear`
  - `.cl-multiselect__arrow`
  - `.cl-multiselect__popover`
  - `.cl-multiselect__search`
  - `.cl-multiselect__list`
  - `.cl-multiselect__option`
  - `.cl-multiselect__empty`
  - `.cl-multiselect__loading`
