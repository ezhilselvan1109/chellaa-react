import * as React from "react";
import type { SxProps } from "../../system/types";

export type LinkUnderline = "always" | "hover" | "none";
export type LinkColorScheme = "primary" | "neutral" | "subtle";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Underline decoration style.
   * - "always": permanently underlined.
   * - "hover": underlined on pointer hover and keyboard focus.
   * - "none": no underline decoration.
   * @default "hover"
   */
  underline?: LinkUnderline;

  /**
   * Semantic color scheme tailored to design tokens.
   * - "primary": brand primary accent.
   * - "neutral": matches primary text color.
   * - "subtle": secondary/muted text color.
   * @default "primary"
   */
  colorScheme?: LinkColorScheme;

  /**
   * Indicates an external destination.
   * Automatically sets target="_blank" and rel="noopener noreferrer".
   * @default false
   */
  isExternal?: boolean;

  /**
   * Whether to render an accessible external link icon when `isExternal` is true.
   * @default true
   */
  showExternalIcon?: boolean;

  /**
   * Visual and interaction disabled state.
   * Sets aria-disabled="true", tabIndex={-1}, and cancels click events without breaking anchor semantics.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Delegates rendering to immediate child element using Slot composition.
   * @default false
   */
  asChild?: boolean;

  /**
   * The underlying HTML element or component override.
   */
  component?: React.ElementType;

  /**
   * Alias for component.
   */
  as?: React.ElementType;

  /**
   * Design system sx override prop.
   */
  sx?: SxProps;

  children?: React.ReactNode;
}
