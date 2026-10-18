import * as React from "react";

export type ComboboxSize = "sm" | "md" | "lg";
export type ComboboxVariant = "outline" | "filled" | "flushed";

export interface ComboboxOption {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
}

export interface ComboboxRootProps<TValue = string | string[]>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue" | "onChange"> {
  /** Value of the combobox in controlled mode */
  value?: TValue | undefined;
  /** Initial value in uncontrolled mode */
  defaultValue?: TValue | undefined;
  /** Callback fired when selection changes */
  onValueChange?: ((value: TValue) => void) | undefined;
  /** Current text inside search input in controlled mode */
  searchValue?: string | undefined;
  /** Initial search text in uncontrolled mode */
  defaultSearchValue?: string | undefined;
  /** Callback fired when search text changes */
  onSearchChange?: ((search: string) => void) | undefined;
  /** Open state of the listbox popup in controlled mode */
  isOpen?: boolean | undefined;
  /** Initial open state in uncontrolled mode */
  defaultOpen?: boolean | undefined;
  /** Callback fired when listbox popup opens or closes */
  onOpenChange?: ((open: boolean) => void) | undefined;
  /** Whether the combobox is globally disabled */
  isDisabled?: boolean | undefined;
  /** Whether the combobox is in an error / invalid state */
  isInvalid?: boolean | undefined;
  /** Whether search or asynchronous data fetch is loading */
  isLoading?: boolean | undefined;
  /** Whether multi-selection mode is enabled */
  isMulti?: boolean | undefined;
  /** Sizing scale: sm (32px), md (40px, default), lg (48px) */
  size?: ComboboxSize | undefined;
  /** Visual variant matching Input: outline (default), filled, flushed */
  variant?: ComboboxVariant | undefined;
  /** Optional custom filter function. Set false to disable local filtering */
  filter?: ((itemValue: string, itemText: string, search: string) => boolean) | false | undefined;
  /** Optional flat options array for convenience auto-layout */
  options?: ComboboxOption[] | undefined;
  /** Placeholder for the auto-layout input */
  placeholder?: string | undefined;
  /** Name of the input element for form submission */
  name?: string | undefined;
  /** Whether the combobox input is required */
  isRequired?: boolean | undefined;
  /** Accessible description element ID */
  "aria-describedby"?: string | undefined;
  /** Compound children or custom layout */
  children?: React.ReactNode | undefined;
}

export type ComboboxProps<TValue = string | string[]> = ComboboxRootProps<TValue>;

export interface ComboboxControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
}

export interface ComboboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
}

export interface ComboboxTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
}

export interface ComboboxPortalProps {
  children: React.ReactNode;
  container?: HTMLElement | null | undefined;
}

export interface ComboboxContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
}

export interface ComboboxItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value represented by this option */
  value: string;
  /** Optional text label for search matching and display */
  label?: string | undefined;
  /** Whether this specific item is disabled */
  isDisabled?: boolean | undefined;
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
  /** Option contents */
  children: React.ReactNode;
}

export interface ComboboxGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional heading text or node */
  heading?: React.ReactNode | undefined;
}

export interface ComboboxGroupLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface ComboboxEmptyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface ComboboxTagProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Value of the item represented by this tag */
  value: string;
  /** Callback fired when remove button is clicked */
  onRemove?: (() => void) | undefined;
  /** Whether remove action is disabled */
  isDisabled?: boolean | undefined;
}

export interface ComboboxClearProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface RegisteredItem {
  id: string;
  value: string;
  text: string;
  disabled: boolean;
  isVisible: boolean;
}

export interface ComboboxContextValue {
  value: any;
  selectItem: (value: string, text: string) => void;
  removeItem: (value: string) => void;
  clearSelection: () => void;
  searchValue: string;
  setSearchValue: (search: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  controlRef: (node: HTMLElement | null) => void;
  contentRef: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  listboxId: string;
  inputId: string;
  isMulti: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  isLoading: boolean;
  size: ComboboxSize;
  variant: ComboboxVariant;
  filter: ((itemValue: string, itemText: string, search: string) => boolean) | false;
  isFiltering: boolean;
  setIsFiltering: (filtering: boolean) => void;
  pendingHighlight: "first" | "last" | "selected" | null;
  setPendingHighlight: (target: "first" | "last" | "selected" | null) => void;
  openWithHighlight: (target: "first" | "last" | "selected") => void;
  ariaDescribedBy?: string | undefined;
  isRequired?: boolean | undefined;
  name?: string | undefined;
  registerItem: (item: RegisteredItem) => () => void;
  updateItemVisibility: (id: string, isVisible: boolean) => void;
  visibleItems: RegisteredItem[];
  filteredCount: number;
}
