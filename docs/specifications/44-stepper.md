# SPEC-044: Stepper Specification

## 1. Overview
The `Stepper` component displays progress through a sequence of logical steps in multi-step workflows, wizards, onboarding sequences, and checkout processes. It supports horizontal and vertical orientations, completed/current/upcoming/disabled/error states, optional step descriptions, custom icons, interactive step triggers, and non-linear navigation.

---

## 2. Public API & Type Definitions

```typescript
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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
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
   * Accessible label for the navigation container.
   * @default "Progress"
   */
  ariaLabel?: string;
}
```

---

## 3. WAI-ARIA & Keyboard Accessibility Contract

### ARIA Semantics
- **Container**: `<nav aria-label={ariaLabel}>` containing an ordered list `<ol className="cl-stepper">`.
- **Step Element**: `<li className="cl-stepper__item">`.
- **Current Step Indicator**:
  - Sets `aria-current="step"` on the active step element or trigger.
- **Interactive Steps**:
  - If `isClickable` evaluates to true for a step, its header is rendered as an accessible `<button type="button" className="cl-stepper__trigger" disabled={disabled} aria-current={isActive ? "step" : undefined}>`.
- **Decorative Connectors**:
  - Connector lines between steps are purely visual and marked with `aria-hidden="true"`.
- **Status Communication**:
  - Does not rely on color alone:
    - Completed: Checkmark icon (`aria-label="Completed"`).
    - Current: Step index number or active indicator with `aria-current="step"`.
    - Error: Exclamation/warning indicator (`aria-label="Error"`).
    - Optional: "Optional" label rendered as assistive text.

### Keyboard Navigation
- Standard focus order across interactive buttons.
- Visible focus rings with high contrast using `--cl-color-focus-ring`.

---

## 4. Controlled & Uncontrolled Behavior
- Controlled via `activeStep` and `onStepChange`.
- Uncontrolled via `defaultActiveStep` with internal state management.
- State resolution precedence:
  1. `error: true`: Error state takes highest visual precedence.
  2. `active`: If step matches `activeStep`, renders as current.
  3. `completed`: Step marked completed or index precedes active step (unless explicitly configured).
  4. `upcoming`: Default subsequent step state.

---

## 5. CSS Architecture & Scoped Tokens
Component styles reside in `@layer cl-components` under `.cl-stepper`.
Tokens utilized:
- `--cl-color-primary`: Active step indicator, connector progress fill.
- `--cl-color-success`: Completed step indicator.
- `--cl-color-danger`: Error step indicator.
- `--cl-color-border`: Upcoming step border and unfilled connector line.
- `--cl-color-text`: Primary label color.
- `--cl-color-text-muted`: Description and upcoming label color.
- `--cl-transition-fast`: Smooth color transitions.
