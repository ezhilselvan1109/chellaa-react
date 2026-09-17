import React from "react";
import type { AsChildProp } from "../../primitives/Slot";

export type ButtonType = "primary" | "default" | "dashed" | "text" | "link";

export type ButtonShape = "default" | "circle" | "round";

export type ButtonSize = "large" | "medium" | "small" | "lg" | "md" | "sm";

export type ButtonHTMLType = "submit" | "button" | "reset";

export type IconPlacement = "start" | "end";

export interface ButtonLoadingConfig {
  delay?: number;
  icon?: React.ReactNode;
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    AsChildProp {
  /**
   * Set button type syntactic sugar (Ant Design inspired: primary, default, dashed, text, link).
   * @default "default"
   */
  type?: ButtonType;
  /**
   * Backwards compatible variant alias (maps primary, secondary, outline, ghost, danger).
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | ButtonType;
  /**
   * Set the danger status of button. Works seamlessly with all button types.
   * @default false
   */
  danger?: boolean;
  /**
   * Make background transparent and invert text and border colors for colored/dark backgrounds.
   * @default false
   */
  ghost?: boolean;
  /**
   * Can be used to set button shape (default, circle, round).
   * @default "default"
   */
  shape?: ButtonShape;
  /**
   * Set the size of button (large/lg, medium/md, small/sm).
   * @default "medium"
   */
  size?: ButtonSize;
  /**
   * Set the loading status of button.
   * @default false
   */
  loading?: boolean | ButtonLoadingConfig;
  /**
   * Backwards-compatible loading alias.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Optional text displayed alongside the spinner when loading is true.
   */
  loadingText?: string;
  /**
   * Option to fit button width to its parent width.
   * @default false
   */
  block?: boolean;
  /**
   * Backwards-compatible fullWidth alias.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Set the icon component of button.
   */
  icon?: React.ReactNode;
  /**
   * Set the icon position of button (start | end).
   * @default "start"
   */
  iconPlacement?: IconPlacement;
  /**
   * Backwards-compatible icon rendered before button label.
   */
  leftIcon?: React.ReactNode;
  /**
   * Backwards-compatible icon rendered after button label.
   */
  rightIcon?: React.ReactNode;
  /**
   * Redirect URL when button acts as a link. Renders as an <a> tag when specified.
   */
  href?: string;
  /**
   * Target attribute when href is specified.
   */
  target?: string;
  /**
   * Original HTML button type.
   * @default "button"
   */
  htmlType?: ButtonHTMLType;
  /**
   * Button child content.
   */
  children?: React.ReactNode;
}
