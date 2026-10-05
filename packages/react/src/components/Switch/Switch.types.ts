import * as React from "react";
import type { SxProps } from "../../system/types";

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
  /**
   * If true, the switch is toggled on (controlled).
   */
  checked?: boolean | undefined;
  /**
   * The default checked state when uncontrolled.
   * @default false
   */
  defaultChecked?: boolean | undefined;
  /**
   * Callback fired when the switch state changes.
   */
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  /**
   * The value of the switch for native form submission.
   */
  value?: string | undefined;
  /**
   * The name attribute of the hidden input element.
   */
  name?: string | undefined;
  /**
   * Size of the switch track and thumb.
   * @default 'md'
   */
  size?: SwitchSize | undefined;
  /**
   * Color palette theme scheme when active.
   * @default 'primary'
   */
  colorScheme?: SwitchColorScheme | undefined;
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
   * If true, disables switch and renders a micro-loading spinner inside thumb.
   * @default false
   */
  loading?: boolean | undefined;
  /**
   * Custom icon rendered inside the thumb when checked.
   */
  checkedIcon?: React.ReactNode | undefined;
  /**
   * Custom icon rendered inside the thumb when unchecked.
   */
  uncheckedIcon?: React.ReactNode | undefined;
  /**
   * Position of the label relative to the switch track.
   * @default 'end'
   */
  labelPlacement?: SwitchLabelPlacement | undefined;
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
