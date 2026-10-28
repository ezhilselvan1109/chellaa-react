import * as React from "react";

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
   * Available options to select from.
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
   * Placeholder string shown when no items are selected.
   * @default "Select options..."
   */
  placeholder?: string;

  /**
   * Placeholder string inside search filter input.
   * @default "Search options..."
   */
  searchPlaceholder?: string;

  /**
   * Whether search input filter is enabled.
   * @default true
   */
  isSearchable?: boolean;

  /**
   * Whether to show a clear button when selections exist.
   * @default true
   */
  isClearable?: boolean;

  /**
   * Controlled open state of dropdown popover.
   */
  isOpen?: boolean;

  /**
   * Initial uncontrolled open state.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when dropdown open state changes.
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
   * Loading state showing indicator in popover.
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
   * Accessible name for the control.
   */
  "aria-label"?: string;
}
