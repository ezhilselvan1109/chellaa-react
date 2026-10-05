import * as React from "react";
import type { SxProps } from "../../system/types";

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
  /**
   * If true, the radio button is selected (controlled).
   */
  checked?: boolean | undefined;
  /**
   * The default checked state when uncontrolled.
   * @default false
   */
  defaultChecked?: boolean | undefined;
  /**
   * Callback fired when the radio state changes.
   */
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  /**
   * Distinct value of this radio option.
   */
  value?: string | number | undefined;
  /**
   * Name attribute of the native input element. Inherited from RadioGroup if omitted.
   */
  name?: string | undefined;
  /**
   * Size of the radio control circle and label.
   * @default 'md'
   */
  size?: RadioSize | undefined;
  /**
   * Color palette theme scheme.
   * @default 'primary'
   */
  colorScheme?: RadioColorScheme | undefined;
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

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * The controlled value of the selected radio button.
   */
  value?: string | number | undefined;
  /**
   * The uncontrolled initial value of the selected radio button.
   */
  defaultValue?: string | number | undefined;
  /**
   * Callback fired when selection changes.
   */
  onChange?: ((value: string | number) => void) | undefined;
  /**
   * The name attribute cascaded to all child radio buttons.
   * If omitted, a unique name is auto-generated.
   */
  name?: string | undefined;
  /**
   * The size cascaded to all child radio buttons.
   * @default 'md'
   */
  size?: RadioSize | undefined;
  /**
   * The color scheme cascaded to all child radio buttons.
   * @default 'primary'
   */
  colorScheme?: RadioColorScheme | undefined;
  /**
   * The layout orientation of the group.
   * @default 'vertical'
   */
  orientation?: "vertical" | "horizontal" | undefined;
  /**
   * Spacing between individual radio buttons in the group.
   * @default 2
   */
  spacing?: number | string | undefined;
  /**
   * If true, disables all child radio buttons.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If true, marks all child radio buttons as read-only.
   * @default false
   */
  readOnly?: boolean | undefined;
  /**
   * If true, marks all child radio buttons with error state.
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
