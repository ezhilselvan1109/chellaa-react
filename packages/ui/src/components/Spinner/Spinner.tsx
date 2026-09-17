import React from "react";
import { VisuallyHidden } from "../../primitives/VisuallyHidden";
import type { SpinnerProps } from "./Spinner.types";
import styles from "./Spinner.module.css";

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = "md", label = "Loading...", color, className, style, ...props }, ref) => {
    const classNames = [styles.spinner, styles[size], className].filter(Boolean).join(" ");

    return (
      <svg
        ref={ref}
        role="status"
        aria-hidden="false"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames}
        style={{ color, ...style }}
        {...props}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeOpacity="0.25"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {Boolean(label) && <VisuallyHidden>{label}</VisuallyHidden>}
      </svg>
    );
  }
);

Spinner.displayName = "ChellaSpinner";
