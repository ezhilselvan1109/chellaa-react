import type * as React from "react";
import type { SxProps } from "../../system/types";

export type InputVariant = "outlined" | "filled" | "standard" | "unstyled";
export type InputSize = "sm" | "md" | "lg";

export interface InputOwnerState {
  variant?: InputVariant | undefined;
  size?: InputSize | undefined;
  fullWidth?: boolean | undefined;
  error?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  hasStartAdornment?: boolean | undefined;
  hasEndAdornment?: boolean | undefined;
  focused?: boolean | undefined;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    InputOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component for root wrapper
   */
  component?: React.ElementType | undefined;
  /**
   * Alias for component
   */
  as?: React.ElementType | undefined;
  /**
   * The system-aware sx prop for dynamic runtime overrides
   */
  sx?: SxProps;
  /**
   * Additional props forwarded to native input element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | undefined;
  /**
   * Content rendered at the start of the input track
   */
  startAdornment?: React.ReactNode | undefined;
  /**
   * Content rendered at the end of the input track
   */
  endAdornment?: React.ReactNode | undefined;
  /**
   * If true, displays an interactive clear button when text is present
   * @default false
   */
  clearable?: boolean | undefined;
  /**
   * Callback fired when the clear button is clicked
   */
  onClear?: () => void;
  /**
   * Ref forwarded directly to the native <input> element
   */
  inputRef?: React.Ref<HTMLInputElement>;
}
