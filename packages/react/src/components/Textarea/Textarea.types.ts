import type * as React from "react";
import type { SxProps } from "../../system/types";

export type TextareaVariant = "outlined" | "filled" | "standard" | "unstyled";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaOwnerState {
  variant?: TextareaVariant | undefined;
  size?: TextareaSize | undefined;
  fullWidth?: boolean | undefined;
  error?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  autoResize?: boolean | undefined;
  resize?: TextareaResize | undefined;
  hasCount?: boolean | undefined;
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "color">,
    TextareaOwnerState {
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
   * The system-aware sx prop
   */
  sx?: SxProps;
  /**
   * Minimum visible text lines when autoResize is enabled
   * @default 3
   */
  minRows?: number | undefined;
  /**
   * Maximum visible text lines before scrollbars appear when autoResize is enabled
   */
  maxRows?: number | undefined;
  /**
   * If true, displays live character counter below the input
   * @default false
   */
  showCount?: boolean | undefined;
  /**
   * Ref forwarded directly to native <textarea> element
   */
  textareaRef?: React.Ref<HTMLTextAreaElement>;
  /**
   * Additional HTML attributes forwarded to the native HTMLTextAreaElement.
   */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement> | undefined;
}

