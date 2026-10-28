import * as React from "react";

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export type SliderSize = "sm" | "md" | "lg";
export type SliderColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled numeric value.
   */
  value?: number;

  /**
   * Initial uncontrolled numeric value.
   * @default min
   */
  defaultValue?: number;

  /**
   * Callback fired when value changes.
   */
  onChange?: (value: number) => void;

  /**
   * Minimum permitted value.
   * @default 0
   */
  min?: number;

  /**
   * Maximum permitted value.
   * @default 100
   */
  max?: number;

  /**
   * Granular stepping increment.
   * @default 1
   */
  step?: number;

  /**
   * Whether the slider is disabled.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the slider is in an invalid state.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Spatial density scale.
   * @default "md"
   */
  size?: SliderSize;

  /**
   * Semantic color scheme for the filled track and thumb.
   * @default "primary"
   */
  colorScheme?: SliderColorScheme;

  /**
   * Array of milestone tick marks along the track.
   */
  marks?: SliderMark[];

  /**
   * Accessible name for the slider thumb.
   * @default "Slider"
   */
  "aria-label"?: string;

  /**
   * Formatted text representation of the value (for screen readers).
   */
  getAriaValueText?: (value: number) => string;
}

export interface RangeSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled tuple of [minValue, maxValue].
   */
  value?: [number, number];

  /**
   * Initial uncontrolled tuple of [minValue, maxValue].
   * @default [min, max]
   */
  defaultValue?: [number, number];

  /**
   * Callback fired when range values change.
   */
  onChange?: (value: [number, number]) => void;

  /**
   * Minimum permitted value.
   * @default 0
   */
  min?: number;

  /**
   * Maximum permitted value.
   * @default 100
   */
  max?: number;

  /**
   * Granular stepping increment.
   * @default 1
   */
  step?: number;

  /**
   * Minimum distance permitted between lower and upper thumbs.
   * @default 0
   */
  minDistance?: number;

  /**
   * Whether the range slider is disabled.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the range slider is in an invalid state.
   * Cascades from parent FormField if unset.
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Spatial density scale.
   * @default "md"
   */
  size?: SliderSize;

  /**
   * Semantic color scheme for the active range fill.
   * @default "primary"
   */
  colorScheme?: SliderColorScheme;

  /**
   * Milestone marks along the track.
   */
  marks?: SliderMark[];

  /**
   * Accessible name for lower thumb.
   * @default "Minimum value"
   */
  minAriaLabel?: string;

  /**
   * Accessible name for upper thumb.
   * @default "Maximum value"
   */
  maxAriaLabel?: string;

  /**
   * Formatter for screen-reader value announcement.
   */
  getAriaValueText?: (value: number, thumbIndex: 0 | 1) => string;
}
