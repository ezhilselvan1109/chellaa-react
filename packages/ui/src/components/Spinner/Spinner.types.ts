import React from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * The size of the spinner.
   * @default "md"
   */
  size?: SpinnerSize;
  /**
   * Accessible label for screen readers.
   * @default "Loading..."
   */
  label?: string;
  /**
   * Color of the spinner. Defaults to currentColor.
   */
  color?: string;
}
