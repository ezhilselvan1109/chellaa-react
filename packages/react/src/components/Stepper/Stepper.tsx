import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import type {
  StepperProps,
  StepItem,
} from "./Stepper.types";

export const Stepper = React.forwardRef<HTMLElement, StepperProps>(
  function Stepper(props, ref) {
    const {
      steps = [],
      activeStep: activeStepProp,
      defaultActiveStep = 0,
      onStepChange,
      orientation = "horizontal",
      size = "md",
      isClickable = false,
      ariaLabel = "Progress",
      className,
      ...rest
    } = props;

    const [activeStep, setActiveStep] = useControllableState<string | number>({
      value: activeStepProp,
      defaultValue: defaultActiveStep,
      onChange: onStepChange,
    });

    // Resolve numerical active index
    const activeIndex = React.useMemo(() => {
      const foundIndex = steps.findIndex((s) => s.id === activeStep);
      if (foundIndex !== -1) return foundIndex;
      if (typeof activeStep === "number" && activeStep >= 0 && activeStep < steps.length) {
        return activeStep;
      }
      return 0;
    }, [steps, activeStep]);

    const handleStepClick = (step: StepItem, index: number) => {
      if (step.disabled) return;
      const canClick =
        typeof isClickable === "function" ? isClickable(step, index) : isClickable;
      if (canClick) {
        setActiveStep(step.id);
      }
    };

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={classNames(
          "cl-stepper",
          `cl-stepper--${orientation}`,
          `cl-stepper--${size}`,
          className
        )}
        {...rest}
      >
        <ol className="cl-stepper__list">
          {steps.map((step, index) => {
            const isCurrent = index === activeIndex;
            const isError = Boolean(step.error);
            const isCompleted =
              !isError &&
              (step.completed === true ||
                (step.completed === undefined && index < activeIndex));
            const isDisabled = Boolean(step.disabled);

            const isInteractive =
              typeof isClickable === "function"
                ? isClickable(step, index)
                : isClickable;

            let status = "upcoming";
            if (isError) status = "error";
            else if (isCurrent) status = "current";
            else if (isCompleted) status = "completed";
            if (isDisabled) status = "disabled";

            const stepNumber = index + 1;

            const renderIndicatorContent = () => {
              if (isError) {
                return (
                  <svg
                    className="cl-stepper__status-icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 4.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="11" r="0.75" fill="currentColor" />
                  </svg>
                );
              }

              if (isCompleted) {
                return (
                  <svg
                    className="cl-stepper__status-icon"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M13.5 4.5L6.5 11.5L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                );
              }

              if (step.icon) {
                return step.icon;
              }

              return stepNumber;
            };

            const triggerContent = (
              <>
                <span
                  className={classNames(
                    "cl-stepper__indicator",
                    `cl-stepper__indicator--${status}`
                  )}
                  aria-hidden="true"
                >
                  {renderIndicatorContent()}
                </span>

                <div className="cl-stepper__content">
                  <div className="cl-stepper__label-row">
                    <span className="cl-stepper__label">{step.label}</span>
                    {step.optional && (
                      <span className="cl-stepper__optional" aria-label="Optional">
                        (Optional)
                      </span>
                    )}
                  </div>
                  {step.description && (
                    <span className="cl-stepper__description">
                      {step.description}
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <li
                key={step.id}
                className={classNames(
                  "cl-stepper__item",
                  `cl-stepper__item--${status}`,
                  isCurrent && "cl-stepper__item--current"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isInteractive ? (
                  <button
                    type="button"
                    className="cl-stepper__trigger"
                    disabled={isDisabled}
                    onClick={() => handleStepClick(step, index)}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {triggerContent}
                  </button>
                ) : (
                  <div className="cl-stepper__trigger-static">
                    {triggerContent}
                  </div>
                )}

                {index < steps.length - 1 && (
                  <div
                    className={classNames(
                      "cl-stepper__connector",
                      isCompleted && "cl-stepper__connector--completed"
                    )}
                    aria-hidden="true"
                  >
                    <div className="cl-stepper__connector-line" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Stepper.displayName = "Stepper";
