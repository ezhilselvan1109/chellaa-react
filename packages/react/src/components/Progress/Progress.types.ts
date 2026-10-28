import * as React from "react";

export type ProgressVariant = "linear" | "circular";
export type ProgressSize = "xs" | "sm" | "md" | "lg";
export type ProgressColorScheme = "primary" | "success" | "warning" | "danger";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current progress value.
   * If omitted or undefined, component renders in indeterminate mode.
   */
  value?: number;

  /**
   * The minimum value of the progress bar.
   * @default 0
   */
  min?: number;

  /**
   * The maximum value of the progress bar.
   * @default 100
   */
  max?: number;

  /**
   * Size dimension of the progress track.
   * @default "md"
   */
  size?: ProgressSize;

  /**
   * Visual presentation variant.
   * @default "linear"
   */
  variant?: ProgressVariant;

  /**
   * Semantic color scheme.
   * @default "primary"
   */
  colorScheme?: ProgressColorScheme;

  /**
   * If true, displays diagonal stripes across the linear progress track.
   * @default false
   */
  hasStripe?: boolean;

  /**
   * If true, animates the diagonal stripes.
   * @default false
   */
  isAnimated?: boolean;

  /**
   * If true, displays a numeric percentage label.
   * @default false
   */
  showValueLabel?: boolean;

  /**
   * Human-readable text representation of value for screen readers.
   */
  valueText?: string;
}
