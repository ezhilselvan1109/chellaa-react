import * as React from "react";
import type { SxProps } from "../../system/types";

export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

export interface CheckboxOwnerState {
  size: CheckboxSize;
  colorScheme: CheckboxColorScheme;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  hasLabel: boolean;
}

export interface CheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  /**
   * If true, the checkbox is checked (controlled).
   */
  checked?: boolean | undefined;
  /**
   * The default checked state when uncontrolled.
   * @default false
   */
  defaultChecked?: boolean | undefined;
  /**
   * If true, displays a dash icon and sets aria-checked="mixed".
   * Takes visual precedence over checked state.
   * @default false
   */
  indeterminate?: boolean | undefined;
  /**
   * Callback fired when the checked state changes.
   */
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  /**
   * The value of the checkbox when used inside a CheckboxGroup.
   */
  value?: string | undefined;
  /**
   * The name attribute of the hidden input element.
   */
  name?: string | undefined;
  /**
   * Size of the checkbox control box and label.
   * @default 'md'
   */
  size?: CheckboxSize | undefined;
  /**
   * Color palette theme scheme.
   * @default 'primary'
   */
  colorScheme?: CheckboxColorScheme | undefined;
  /**
   * If true, disables interaction and dims visual elements.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If true, prevents toggling while remaining focusable.
   * @default false
   */
  readOnly?: boolean | undefined;
  /**
   * If true, the input will be marked as required.
   * @default false
   */
  required?: boolean | undefined;
  /**
   * If true, displays an error state outline.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * Ref forwarded directly to the hidden native HTMLInputElement.
   */
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  /**
   * Additional HTML attributes forwarded to the hidden native HTMLInputElement.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | undefined;
  /**
   * If true, delegates rendering to immediate child element using Slot.
   * @default false
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component.
   */
  component?: React.ElementType | undefined;
  /**
   * Alias for component.
   */
  as?: React.ElementType | undefined;
  /**
   * System-aware sx prop.
   */
  sx?: SxProps;
  children?: React.ReactNode | undefined;
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * The controlled array of selected checkbox values.
   */
  value?: string[] | undefined;
  /**
   * The uncontrolled initial array of selected checkbox values.
   * @default []
   */
  defaultValue?: string[] | undefined;
  /**
   * Callback fired when selection changes.
   */
  onChange?: ((value: string[]) => void) | undefined;
  /**
   * The name attribute cascaded to all child checkboxes.
   */
  name?: string | undefined;
  /**
   * The size cascaded to all child checkboxes.
   * @default 'md'
   */
  size?: CheckboxSize | undefined;
  /**
   * The color scheme cascaded to all child checkboxes.
   * @default 'primary'
   */
  colorScheme?: CheckboxColorScheme | undefined;
  /**
   * The layout orientation of the group.
   * @default 'vertical'
   */
  orientation?: "vertical" | "horizontal" | undefined;
  /**
   * Spacing between individual checkboxes in the group.
   * Can be a theme spacing unit multiplier or custom CSS dimension.
   * @default 2
   */
  spacing?: number | string | undefined;
  /**
   * If true, disables all child checkboxes.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If true, marks all child checkboxes as read-only.
   * @default false
   */
  readOnly?: boolean | undefined;
  /**
   * If true, marks all child checkboxes with error state.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * If true, delegates rendering to immediate child element using Slot.
   * @default false
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component.
   */
  component?: React.ElementType | undefined;
  /**
   * Alias for component.
   */
  as?: React.ElementType | undefined;
  /**
   * System-aware sx prop.
   */
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
