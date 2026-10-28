"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import type { ProgressProps, ProgressSize } from "./Progress.types";

const CIRCLE_RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~113.097

function getStrokeWidth(size: ProgressSize): number {
  switch (size) {
    case "xs":
      return 3;
    case "sm":
      return 3.5;
    case "lg":
      return 5;
    case "md":
    default:
      return 4;
  }
}

/**
 * Progress communicates the status of a deterministic or indeterminate background process.
 *
 * @example
 * ```tsx
 * <Progress value={45} colorScheme="primary" />
 * <Progress variant="circular" value={75} showValueLabel />
 * <Progress variant="linear" hasStripe isAnimated />
 * ```
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      size = "md",
      variant = "linear",
      colorScheme = "primary",
      hasStripe = false,
      isAnimated = false,
      showValueLabel = false,
      valueText,
      className,
      ...rest
    },
    ref,
  ) => {
    const isIndeterminate = value === undefined || isNaN(value);

    // Guard against invalid range
    const safeMin = Math.min(min, max);
    const safeMax = Math.max(min, max) === safeMin ? safeMin + 100 : Math.max(min, max);

    // Calculate clamped value and percentage
    const clampedValue = isIndeterminate
      ? 0
      : Math.min(Math.max(value as number, safeMin), safeMax);
    const percentage = isIndeterminate
      ? 0
      : ((clampedValue - safeMin) / (safeMax - safeMin)) * 100;

    const formattedPercent = `${Math.round(percentage)}%`;

    // ARIA Attributes
    const a11yProps: React.HTMLAttributes<HTMLDivElement> = {
      role: "progressbar",
      ...(isIndeterminate
        ? {}
        : {
            "aria-valuemin": safeMin,
            "aria-valuemax": safeMax,
            "aria-valuenow": clampedValue,
            "aria-valuetext": valueText ?? formattedPercent,
          }),
    };

    if (variant === "circular") {
      const strokeWidth = getStrokeWidth(size);
      const dashOffset = isIndeterminate
        ? undefined
        : CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

      return (
        <div
          ref={ref}
          className={classNames(
            "cl-progress",
            "cl-progress--circular",
            `cl-progress--${size}`,
            `cl-progress--${colorScheme}`,
            isIndeterminate && "cl-progress--indeterminate",
            className,
          )}
          {...a11yProps}
          {...rest}
        >
          <svg className="cl-progress__svg" viewBox="0 0 48 48">
            <circle
              className="cl-progress__circle-track"
              cx="24"
              cy="24"
              r={CIRCLE_RADIUS}
              strokeWidth={strokeWidth}
            />
            <circle
              className="cl-progress__circle-head"
              cx="24"
              cy="24"
              r={CIRCLE_RADIUS}
              strokeWidth={strokeWidth}
              strokeDasharray={isIndeterminate ? undefined : CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </svg>
          {showValueLabel && !isIndeterminate && (
            <span className="cl-progress__circular-label">{formattedPercent}</span>
          )}
        </div>
      );
    }

    // Linear Variant
    return (
      <div
        ref={ref}
        className={classNames(
          "cl-progress",
          "cl-progress--linear",
          `cl-progress--${size}`,
          `cl-progress--${colorScheme}`,
          isIndeterminate && "cl-progress--indeterminate",
          className,
        )}
        {...a11yProps}
        {...rest}
      >
        <div className="cl-progress__track">
          <div
            className={classNames(
              "cl-progress__bar",
              hasStripe && "cl-progress__bar--striped",
              isAnimated && "cl-progress__bar--animated",
              isIndeterminate && "cl-progress__bar--indeterminate",
            )}
            style={{
              width: isIndeterminate ? undefined : `${percentage}%`,
            }}
          />
        </div>
        {showValueLabel && !isIndeterminate && (
          <span className="cl-progress__label">{formattedPercent}</span>
        )}
      </div>
    );
  },
);

Progress.displayName = "Progress";
