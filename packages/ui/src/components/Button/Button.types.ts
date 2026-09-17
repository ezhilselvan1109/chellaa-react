import React from "react";
import type { AsChildProp } from "../../primitives/Slot";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    AsChildProp {
  /**
   * The visual variant style of the button.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * The size scale of the button.
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Whether the button is in a loading state. Shows a spinner and disables user interaction.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Optional text displayed alongside the spinner when isLoading is true.
   */
  loadingText?: string;
  /**
   * Icon displayed before the button label.
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon displayed after the button label.
   */
  rightIcon?: React.ReactNode;
  /**
   * If true, the button will expand to take the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
}
