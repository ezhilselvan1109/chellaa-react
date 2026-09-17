import { forwardRef } from "react";

import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { badgeCssText } from "./Badge.style";
import type { BadgeProps } from "./Badge.types";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "sm",
      className = "",
      children,
      ...restProps
    },
    ref
  ) => {
    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-badge", badgeCssText);
    }

    const classes = [
      "ch-badge",
      `ch-badge--${variant}`,
      `ch-badge--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classes} {...restProps}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
