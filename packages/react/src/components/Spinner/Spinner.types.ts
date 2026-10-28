import * as React from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColorScheme = "primary" | "neutral" | "success" | "danger" | "warning";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * The size dimension of the spinner.
   * @default "md"
   */
  size?: SpinnerSize;

  /**
   * The semantic color scheme of the spinner.
   * @default "primary"
   */
  colorScheme?: SpinnerColorScheme;

  /**
   * An accessible label for screen readers.
   * When provided, sets `role="status"`. When omitted, spinner is marked `aria-hidden="true"`.
   * @default "Loading..."
   */
  label?: string;

  /**
   * Stroke width thickness of the spinner head in viewBox units.
   * @default 3
   */
  thickness?: number;
}
