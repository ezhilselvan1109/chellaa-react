import React from "react";
import type { AsChildProp } from "../../primitives/Slot";

export type ButtonType = "primary" | "default" | "dashed" | "text" | "link";

export type ButtonVariant =
  | "solid"
  | "outlined"
  | "dashed"
  | "filled"
  | "text"
  | "link";

export type PresetColors =
  | "blue"
  | "purple"
  | "cyan"
  | "green"
  | "magenta"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "volcano"
  | "geekblue"
  | "lime"
  | "gold";

export type ButtonColor = "default" | "primary" | "danger" | PresetColors;

export type ButtonShape = "default" | "circle" | "round";

export type ButtonSize = "large" | "medium" | "small" | "lg" | "md" | "sm";

export type ButtonHTMLType = "submit" | "button" | "reset";

export type IconPlacement = "start" | "end";

export type ButtonSemanticDOM = "root" | "icon" | "content";

export interface ButtonLoadingConfig {
  delay?: number;
  icon?: React.ReactNode;
}

export interface ButtonWaveConfig {
  disabled?: boolean;
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    AsChildProp {
  /**
   * Syntactic sugar. Set button type. Will follow variant & color if provided.
   * @default "default"
   */
  type?: ButtonType;
  /**
   * Set button variant (Ant Design 5.21+ / 6.0).
   * @default "outlined" (or "solid" when color="primary")
   */
  variant?: ButtonVariant | "secondary" | "outline" | "ghost" | "danger" | ButtonType;
  /**
   * Set button color (Ant Design 5.21+ / 6.0).
   * @default "default" (or "primary" when variant="solid")
   */
  color?: ButtonColor;
  /**
   * Syntactic sugar. Set the danger status of button. Will follow color if provided.
   * @default false
   */
  danger?: boolean;
  /**
   * Make background transparent and invert text and border colors.
   * @default false
   */
  ghost?: boolean;
  /**
   * Can be used to set button shape (default | circle | round).
   * @default "default"
   */
  shape?: ButtonShape;
  /**
   * Set the size of button (large | medium | small).
   * @default "medium"
   */
  size?: ButtonSize;
  /**
   * Set the loading status of button with animated spinner and click lock.
   * @default false
   */
  loading?: boolean | ButtonLoadingConfig;
  /**
   * Backwards-compatible loading alias.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Optional custom loading icon.
   */
  loadingIcon?: React.ReactNode;
  /**
   * Optional text displayed alongside the spinner when loading.
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
   * Icon element rendered before button label.
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon element rendered after button label.
   */
  rightIcon?: React.ReactNode;
  /**
   * Redirect url of link button (renders as <a> tag).
   */
  href?: string;
  /**
   * Same as target attribute of <a>, works when href is specified.
   */
  target?: string;
  /**
   * Set the original html type of button.
   * @default "button"
   */
  htmlType?: ButtonHTMLType;
  /**
   * Add a space between two Chinese characters by default.
   * @default true
   */
  autoInsertSpace?: boolean;
  /**
   * Configuration for the dynamic click wave effect.
   */
  wave?: boolean | ButtonWaveConfig;
  /**
   * Customize class for each semantic structure inside the component (root, icon, content).
   */
  classNames?: Partial<Record<ButtonSemanticDOM, string>>;
  /**
   * Customize inline style for each semantic structure inside the component (root, icon, content).
   */
  styles?: Partial<Record<ButtonSemanticDOM, React.CSSProperties>>;
  /**
   * Click handler with click wave event trigger.
   */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * Button child content.
   */
  children?: React.ReactNode;
}
