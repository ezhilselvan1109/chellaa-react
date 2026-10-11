import * as React from "react";
import { Slot } from "../../primitives/Slot";
import type { BadgeProps } from "./Badge.types";

/**
 * Badge component - A compact visual indicator communicating status, counts, or categorization.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "subtle",
      size = "md",
      colorScheme = "neutral",
      isPill = false,
      hasDot = false,
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      "cl-badge",
      `cl-badge--${variant}`,
      `cl-badge--${size}`,
      `cl-badge--${colorScheme}`,
      isPill && "cl-badge--pill",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (asChild) {
      return (
        <Slot ref={ref} className={classNames} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <span ref={ref} className={classNames} {...props}>
        {hasDot && <span className="cl-badge__dot" aria-hidden="true" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
