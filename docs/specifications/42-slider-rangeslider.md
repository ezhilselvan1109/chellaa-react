# SPEC-042: Slider and RangeSlider Specification

## 1. Overview
The `Slider` and `RangeSlider` components provide interactive numeric value selection along a continuous track using pointer, touch, and keyboard input.
- `Slider` manages a single numeric value.
- `RangeSlider` manages a dual-thumb range `[minValue, maxValue]` with configurable minimum distance between thumbs and an explicit non-crossing boundary policy.

Both components support controlled/uncontrolled state, step increments, min/max bounds, optional marks, value display/labels, disabled state, and WAI-ARIA slider accessibility.

---

## 2. Public API & Type Definitions

```typescript
export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export type SliderSize = "sm" | "md" | "lg";
export type SliderColorScheme = "primary" | "secondary" | "success" | "warning" | "danger";

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
```

---

## 3. Keyboard Interactions & Accessibility
- Thumbs render with `role="slider"`, `tabIndex={0}`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-orientation="horizontal"`.
- Keyboard bindings:
  - `ArrowRight` / `ArrowUp`: Increment by `step`.
  - `ArrowLeft` / `ArrowDown`: Decrement by `step`.
  - `PageUp`: Increment by larger step (`step * 10`).
  - `PageDown`: Decrement by larger step (`step * 10`).
  - `Home`: Sets thumb to its minimum allowable boundary.
  - `End`: Sets thumb to its maximum allowable boundary.
- **RangeSlider Thumb-Crossing Policy**:
  - Thumbs never cross.
  - Lower thumb cannot exceed `upperValue - minDistance`.
  - Upper thumb cannot be less than `lowerValue + minDistance`.
  - Track fill spans exactly between `lowerValue` and `upperValue`.
