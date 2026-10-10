"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import type { TypographyVariant, ChellaaTheme } from "../../theme/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

export type TypographyAlign = "inherit" | "left" | "center" | "right" | "justify";

export interface TypographyOwnerState {
  variant?: TypographyVariant | undefined;
  align?: TypographyAlign | undefined;
  color?: string | undefined;
  gutterBottom?: boolean | undefined;
  noWrap?: boolean | undefined;
  lineClamp?: number | undefined;
}

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    TypographyOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType;
  /**
   * Alias for component
   */
  as?: React.ElementType;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const defaultVariantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  button: "span",
  caption: "span",
  overline: "span",
};

export function resolveTypographyColor(
  theme: ChellaaTheme,
  color?: string
): string | undefined {
  if (!color || color === "inherit" || color === "currentColor") {
    return color;
  }

  // Check direct palette main colors (primary, secondary, error, warning, info, success)
  const paletteAny = theme.palette as Record<string, any>;
  if (paletteAny[color] && typeof paletteAny[color].main === "string") {
    return paletteAny[color].main;
  }

  // Check dotted paths (text.primary, text.secondary, background.paper, etc.)
  if (color.includes(".")) {
    const parts = color.split(".");
    let current: any = theme.palette;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }
    if (typeof current === "string") {
      return current;
    }
  }

  return color;
}

const StyledTypographyRoot = styled("span", {
  name: "ChellaaTypography",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "align" &&
    prop !== "color" &&
    prop !== "gutterBottom" &&
    prop !== "noWrap" &&
    prop !== "lineClamp" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ color?: string }>(({ theme, color }) => {
  if (color) {
    return {
      color: resolveTypographyColor(theme, color),
    };
  }
  return {};
});

/**
 * Foundational Typography component supporting all Material Design 3 scale variants,
 * truncation, line clamping, and semantic element delegation.
 *
 * @example
 * <Typography variant="h1">Display Header</Typography>
 * <Typography variant="body1" color="text.secondary">Body text</Typography>
 * <Typography noWrap>Single line truncated text</Typography>
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  function Typography(props, ref) {
    const {
      asChild = false,
      component,
      as,
      variant = "body1",
      align = "inherit",
      color,
      gutterBottom = false,
      noWrap = false,
      lineClamp,
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const typographyClassName = classNames(
      "cl-typography",
      `cl-typography--${variant}`,
      align && align !== "inherit" && `cl-typography--align-${align}`,
      gutterBottom && "cl-typography--gutter-bottom",
      noWrap && "cl-typography--no-wrap",
      lineClamp !== undefined && lineClamp > 0 && "cl-typography--line-clamp",
      className
    );

    const inlineStyle: React.CSSProperties = {
      ...(lineClamp !== undefined && lineClamp > 0
        ? ({ WebkitLineClamp: lineClamp } as React.CSSProperties)
        : {}),
      ...style,
    };

    const targetTag =
      component || as || defaultVariantMapping[variant] || "span";

    if (asChild) {
      return (
        <StyledTypographyRoot
          as={Slot}
          ref={ref as any}
          className={typographyClassName}
          style={inlineStyle}
          color={color}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledTypographyRoot>
      );
    }

    return (
      <StyledTypographyRoot
        as={targetTag}
        ref={ref as any}
        className={typographyClassName}
        style={inlineStyle}
        color={color}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledTypographyRoot>
    );
  }
);

Typography.displayName = "Typography";
