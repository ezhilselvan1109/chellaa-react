import * as React from "react";
import type { SxProps } from "../../system/types";

export type ButtonVariant = "solid" | "outline" | "ghost" | "subtle" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";
export type ButtonLoadingPosition = "start" | "end" | "center";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual aesthetic treatment of the button.
   * @default "solid"
   */
  variant?: ButtonVariant;

  /**
   * Sizing scale mapped to the spatial baseline grid.
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Semantic color intent.
   * @default "primary"
   */
  colorScheme?: ButtonColorScheme;

  /**
   * If true, displays an animated spinner and suppresses user interaction.
   * Automatically sets `aria-busy="true"`.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Optional accessible text displayed alongside the spinner when `isLoading` is true.
   */
  loadingText?: string;

  /**
   * Position of the loading spinner relative to the label.
   * @default "start"
   */
  loadingPosition?: ButtonLoadingPosition;

  /**
   * If true, the button is disabled and completely non-interactive.
   * Attaches the native `disabled` attribute and sets `aria-disabled="true"`.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * If true, the button expands to fill 100% of its parent container.
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Leading icon rendered before the button label.
   * Automatically assigned `aria-hidden="true"`.
   */
  startIcon?: React.ReactNode;

  /**
   * Trailing icon rendered after the button label.
   * Automatically assigned `aria-hidden="true"`.
   */
  endIcon?: React.ReactNode;

  /**
   * If true, delegates rendering to the immediate child element using Slot.
   * @default false
   */
  asChild?: boolean;

  /**
   * If true, disables the tactile touch ripple effect.
   * @default false
   */
  disableRipple?: boolean | undefined;

  /**
   * System-aware sx styling prop
   */
  sx?: SxProps;

  /**
   * Button content or label.
   */
  children?: React.ReactNode;
}
