"use client";

import * as React from "react";
import { classNames } from "../../utils/classNames";
import type { SpinnerProps } from "./Spinner.types";

/**
 * Spinner indicates indeterminate background activity or content loading.
 *
 * @example
 * ```tsx
 * <Spinner size="md" colorScheme="primary" label="Loading content..." />
 * ```
 */
export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  (
    {
      size = "md",
      colorScheme = "primary",
      label = "Loading...",
      thickness = 3,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasLabel = Boolean(label && label.trim().length > 0);

    const a11yProps = hasLabel
      ? {
          role: "status",
          "aria-label": label,
        }
      : {
          "aria-hidden": true as const,
        };

    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(
          "cl-spinner",
          `cl-spinner--${size}`,
          `cl-spinner--${colorScheme}`,
          className,
        )}
        {...a11yProps}
        {...rest}
      >
        {hasLabel && <title>{label}</title>}
        {/* Track circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={thickness}
          className="cl-spinner__track"
        />
        {/* Animated head circle segment */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeDasharray="45 35"
          className="cl-spinner__head"
        />
      </svg>
    );
  },
);

Spinner.displayName = "Spinner";
