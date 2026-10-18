"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import type { BadgeProps } from "./Badge.types";

const StyledBadgeRoot = styled("span", {
  name: "ChellaaBadge",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "isPill" &&
    prop !== "hasDot" &&
    prop !== "asChild",
})({});

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
      style,
      sx,
      children,
      ...props
    },
    ref
  ) => {
    const badgeClassName = classNames(
      "cl-badge",
      `cl-badge--${variant}`,
      `cl-badge--${size}`,
      `cl-badge--${colorScheme}`,
      isPill && "cl-badge--pill",
      className
    );

    if (asChild) {
      return (
        <StyledBadgeRoot
          as={Slot}
          ref={ref}
          className={badgeClassName}
          style={style}
          sx={sx}
          {...props}
        >
          {children}
        </StyledBadgeRoot>
      );
    }

    return (
      <StyledBadgeRoot
        ref={ref}
        className={badgeClassName}
        style={style}
        sx={sx}
        {...props}
      >
        {hasDot && <span className="cl-badge__dot" aria-hidden="true" />}
        {children}
      </StyledBadgeRoot>
    );
  }
);

Badge.displayName = "Badge";
