import * as React from "react";
import { classNames } from "../../utils/classNames";
import { useFormField } from "../FormField/FormFieldContext";
import type { RangeSliderProps } from "./Slider.types";

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

export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  function RangeSlider(props, ref) {
    const {
      value: valueProp,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      minDistance = 0,
      isDisabled: isDisabledProp,
      isInvalid: isInvalidProp,
      size = "md",
      colorScheme = "primary",
      marks,
      minAriaLabel = "Minimum value",
      maxAriaLabel = "Maximum value",
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
    const [uncontrolledValue, setUncontrolledValue] = React.useState<[number, number]>(() => {
      const initial = defaultValue !== undefined ? defaultValue : [min, max];
      const low = roundToStep(initial[0] ?? min, min, max, step);
      const high = roundToStep(initial[1] ?? max, min, max, step);
      if (low > high - minDistance) {
        return [Math.max(min, high - minDistance), high];
      }
      return [low, high];
    });

    const currentValues = isControlled ? (valueProp as [number, number]) : uncontrolledValue;
    const safeLow = roundToStep(currentValues[0] ?? min, min, max, step);
    const safeHigh = Math.max(
      safeLow + minDistance,
      roundToStep(currentValues[1] ?? max, min, max, step)
    );

    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const lowerThumbRef = React.useRef<HTMLDivElement | null>(null);
    const upperThumbRef = React.useRef<HTMLDivElement | null>(null);

    const updateThumb = React.useCallback(
      (thumbIndex: 0 | 1, nextVal: number) => {
        let newLow = safeLow;
        let newHigh = safeHigh;

        if (thumbIndex === 0) {
          const clamped = Math.min(roundToStep(nextVal, min, max, step), safeHigh - minDistance);
          newLow = Math.max(clamped, min);
        } else {
          const clamped = Math.max(roundToStep(nextVal, min, max, step), safeLow + minDistance);
          newHigh = Math.min(clamped, max);
        }

        if (newLow !== safeLow || newHigh !== safeHigh) {
          const nextRange: [number, number] = [newLow, newHigh];
          if (!isControlled) {
            setUncontrolledValue(nextRange);
          }
          onChange?.(nextRange);
        }
      },
      [isControlled, max, min, minDistance, onChange, safeHigh, safeLow, step]
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (isDisabled || e.button !== 0) return;
        const track = trackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const pointerVal = getValueFromPointer(e.clientX, rect, min, max, step);

        const dist0 = Math.abs(pointerVal - safeLow);
        const dist1 = Math.abs(pointerVal - safeHigh);
        const activeThumbIndex: 0 | 1 =
          dist0 < dist1 ? 0 : dist1 < dist0 ? 1 : pointerVal >= safeHigh ? 1 : 0;

        updateThumb(activeThumbIndex, pointerVal);
        if (activeThumbIndex === 0) {
          lowerThumbRef.current?.focus();
        } else {
          upperThumbRef.current?.focus();
        }

        const onPointerMove = (moveEvent: PointerEvent) => {
          const currentRect = track.getBoundingClientRect();
          const moveVal = getValueFromPointer(moveEvent.clientX, currentRect, min, max, step);
          updateThumb(activeThumbIndex, moveVal);
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
      [isDisabled, max, min, safeHigh, safeLow, step, updateThumb]
    );

    const handleKeyDown = React.useCallback(
      (thumbIndex: 0 | 1, e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) return;
        const pageStep = Math.max(step * 10, (max - min) / 10);
        let nextVal: number | null = null;

        const currentVal = thumbIndex === 0 ? safeLow : safeHigh;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            nextVal = currentVal + step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            nextVal = currentVal - step;
            break;
          case "PageUp":
            nextVal = currentVal + pageStep;
            break;
          case "PageDown":
            nextVal = currentVal - pageStep;
            break;
          case "Home":
            nextVal = thumbIndex === 0 ? min : safeLow + minDistance;
            break;
          case "End":
            nextVal = thumbIndex === 0 ? safeHigh - minDistance : max;
            break;
          default:
            return;
        }

        if (nextVal !== null) {
          e.preventDefault();
          updateThumb(thumbIndex, nextVal);
        }
      },
      [isDisabled, max, min, minDistance, safeHigh, safeLow, step, updateThumb]
    );

    const lowPct = getPercentage(safeLow, min, max);
    const highPct = getPercentage(safeHigh, min, max);

    const rootClasses = classNames(
      "cl-range-slider",
      `cl-range-slider--${size}`,
      `cl-range-slider--${colorScheme}`,
      isDisabled && "cl-range-slider--disabled",
      isInvalid && "cl-range-slider--invalid",
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
          className="cl-range-slider__track-wrapper"
          onPointerDown={handlePointerDown}
        >
          <div className="cl-range-slider__track">
            <div
              className="cl-range-slider__range"
              style={{
                left: `${lowPct}%`,
                width: `${Math.max(0, highPct - lowPct)}%`,
              }}
            />
          </div>

          <div
            ref={lowerThumbRef}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            className="cl-range-slider__thumb cl-range-slider__thumb--lower"
            style={{ left: `${lowPct}%` }}
            aria-valuemin={min}
            aria-valuemax={safeHigh - minDistance}
            aria-valuenow={safeLow}
            aria-valuetext={
              getAriaValueText ? getAriaValueText(safeLow, 0) : undefined
            }
            aria-label={minAriaLabel}
            aria-describedby={ariaDescribedBy}
            aria-disabled={isDisabled ? true : undefined}
            aria-invalid={isInvalid ? true : undefined}
            onKeyDown={(e) => handleKeyDown(0, e)}
          />

          <div
            ref={upperThumbRef}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            className="cl-range-slider__thumb cl-range-slider__thumb--upper"
            style={{ left: `${highPct}%` }}
            aria-valuemin={safeLow + minDistance}
            aria-valuemax={max}
            aria-valuenow={safeHigh}
            aria-valuetext={
              getAriaValueText ? getAriaValueText(safeHigh, 1) : undefined
            }
            aria-label={maxAriaLabel}
            aria-describedby={ariaDescribedBy}
            aria-disabled={isDisabled ? true : undefined}
            aria-invalid={isInvalid ? true : undefined}
            onKeyDown={(e) => handleKeyDown(1, e)}
          />
        </div>

        {marks && marks.length > 0 && (
          <div className="cl-range-slider__marks-container" aria-hidden="true">
            {marks.map((mark) => {
              const markPct = getPercentage(mark.value, min, max);
              return (
                <React.Fragment key={mark.value}>
                  <span
                    className="cl-range-slider__mark-point"
                    style={{ left: `${markPct}%` }}
                  />
                  {mark.label !== undefined && (
                    <span
                      className="cl-range-slider__mark-label"
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
