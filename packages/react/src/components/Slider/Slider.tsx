import * as React from "react";
import { classNames } from "../../utils/classNames";
import { useFormField } from "../FormField/FormFieldContext";
import type { SliderProps } from "./Slider.types";

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function getPrecision(step: number): number {
  const stepStr = step.toString();
  const dotIndex = stepStr.indexOf(".");
  return dotIndex >= 0 ? stepStr.length - dotIndex - 1 : 0;
}

function roundToStep(val: number, min: number, max: number, step: number): number {
  if (step <= 0) return clamp(val, min, max);
  const clamped = clamp(val, min, max);
  const stepsCount = Math.round((clamped - min) / step);
  const stepped = min + stepsCount * step;
  const precision = getPrecision(step);
  return Number(clamp(stepped, min, max).toFixed(precision));
}

function getPercentage(val: number, min: number, max: number): number {
  if (max <= min) return 0;
  return ((val - min) / (max - min)) * 100;
}

function getValueFromPointer(
  clientX: number,
  trackRect: DOMRect,
  min: number,
  max: number,
  step: number
): number {
  const width = trackRect.width;
  if (width <= 0) return min;
  const ratio = clamp((clientX - trackRect.left) / width, 0, 1);
  const rawValue = min + ratio * (max - min);
  return roundToStep(rawValue, min, max, step);
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      isDisabled: isDisabledProp,
      isInvalid: isInvalidProp,
      size = "md",
      colorScheme = "primary",
      marks,
      "aria-label": ariaLabelProp,
      "aria-labelledby": ariaLabelledByProp,
      "aria-describedby": ariaDescribedByProp,
      getAriaValueText,
      className,
      style,
      ...restProps
    } = props;

    const formField = useFormField();
    const isDisabled = isDisabledProp ?? formField?.disabled ?? false;
    const isInvalid = isInvalidProp ?? formField?.error ?? false;

    const ariaDescribedBy = [
      ariaDescribedByProp,
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<number>(() => {
      const initial = defaultValue !== undefined ? defaultValue : min;
      return roundToStep(initial, min, max, step);
    });

    const rawValue = isControlled ? (valueProp as number) : uncontrolledValue;
    const safeValue = roundToStep(rawValue, min, max, step);

    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const thumbRef = React.useRef<HTMLDivElement | null>(null);

    const updateValue = React.useCallback(
      (nextVal: number) => {
        const stepped = roundToStep(nextVal, min, max, step);
        if (stepped !== safeValue) {
          if (!isControlled) {
            setUncontrolledValue(stepped);
          }
          onChange?.(stepped);
        }
      },
      [isControlled, max, min, onChange, safeValue, step]
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (isDisabled || e.button !== 0) return;
        const track = trackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const nextVal = getValueFromPointer(e.clientX, rect, min, max, step);
        updateValue(nextVal);
        thumbRef.current?.focus();

        const onPointerMove = (moveEvent: PointerEvent) => {
          const currentRect = track.getBoundingClientRect();
          const moveVal = getValueFromPointer(moveEvent.clientX, currentRect, min, max, step);
          updateValue(moveVal);
        };

        const onPointerUp = () => {
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          window.removeEventListener("pointercancel", onPointerUp);
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
      },
      [isDisabled, max, min, step, updateValue]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) return;
        const pageStep = Math.max(step * 10, (max - min) / 10);
        let nextVal: number | null = null;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            nextVal = safeValue + step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            nextVal = safeValue - step;
            break;
          case "PageUp":
            nextVal = safeValue + pageStep;
            break;
          case "PageDown":
            nextVal = safeValue - pageStep;
            break;
          case "Home":
            nextVal = min;
            break;
          case "End":
            nextVal = max;
            break;
          default:
            return;
        }

        if (nextVal !== null) {
          e.preventDefault();
          updateValue(nextVal);
        }
      },
      [isDisabled, max, min, safeValue, step, updateValue]
    );

    const percentage = getPercentage(safeValue, min, max);

    const accessibleName =
      ariaLabelProp ?? (!ariaLabelledByProp && !formField?.labelId ? "Slider" : undefined);
    const labelledBy = ariaLabelledByProp ?? (formField ? formField.labelId : undefined);

    const rootClasses = classNames(
      "cl-slider",
      `cl-slider--${size}`,
      `cl-slider--${colorScheme}`,
      isDisabled && "cl-slider--disabled",
      isInvalid && "cl-slider--invalid",
      className
    );

    return (
      <div
        ref={ref}
        className={rootClasses}
        style={style}
        {...restProps}
      >
        <div
          ref={trackRef}
          className="cl-slider__track-wrapper"
          onPointerDown={handlePointerDown}
        >
          <div className="cl-slider__track">
            <div
              className="cl-slider__filled-track"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div
            ref={thumbRef}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            className="cl-slider__thumb"
            style={{ left: `${percentage}%` }}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={safeValue}
            aria-valuetext={getAriaValueText ? getAriaValueText(safeValue) : undefined}
            aria-label={accessibleName}
            aria-labelledby={labelledBy}
            aria-describedby={ariaDescribedBy}
            aria-disabled={isDisabled ? true : undefined}
            aria-invalid={isInvalid ? true : undefined}
            onKeyDown={handleKeyDown}
          />
        </div>

        {marks && marks.length > 0 && (
          <div className="cl-slider__marks-container" aria-hidden="true">
            {marks.map((mark) => {
              const markPct = getPercentage(mark.value, min, max);
              return (
                <React.Fragment key={mark.value}>
                  <span
                    className="cl-slider__mark-point"
                    style={{ left: `${markPct}%` }}
                  />
                  {mark.label !== undefined && (
                    <span
                      className="cl-slider__mark-label"
                      style={{ left: `${markPct}%` }}
                    >
                      {mark.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
