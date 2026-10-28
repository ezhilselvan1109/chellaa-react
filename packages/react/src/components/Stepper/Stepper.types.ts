import * as React from "react";

export interface StepItem {
  /**
   * Unique identifier or index for the step.
   */
  id: string | number;

  /**
   * Primary title or label for the step.
   */
  label: React.ReactNode;

  /**
   * Optional secondary description text or content.
   */
  description?: React.ReactNode;

  /**
   * Optional custom icon rendered inside the step indicator.
   */
  icon?: React.ReactNode;

  /**
   * Whether the step is disabled and cannot be activated.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the step contains validation or execution errors.
   * @default false
   */
  error?: boolean;

  /**
   * Whether the step is explicitly marked completed.
   */
  completed?: boolean;

  /**
   * Whether the step is marked optional (displays an "Optional" badge).
   * @default false
   */
  optional?: boolean;
}

export type StepperOrientation = "horizontal" | "vertical";
export type StepperSize = "sm" | "md" | "lg";

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Array of step definitions.
   */
  steps: StepItem[];

  /**
   * Controlled active step identifier or index.
   */
  activeStep?: string | number;

  /**
   * Initial uncontrolled active step.
   * @default 0
   */
  defaultActiveStep?: string | number;

  /**
   * Callback fired when active step changes.
   */
  onStepChange?: (stepId: string | number) => void;

  /**
   * Orientation of the stepper layout.
   * @default "horizontal"
   */
  orientation?: StepperOrientation;

  /**
   * Size variant of step indicators and labels.
   * @default "md"
   */
  size?: StepperSize;

  /**
   * Whether steps can be clicked to navigate.
   * Can be a boolean or a predicate function.
   * @default false
   */
  isClickable?: boolean | ((step: StepItem, index: number) => boolean);

  /**
   * Accessible label for the navigation landmark.
   * @default "Progress"
   */
  ariaLabel?: string;
}
