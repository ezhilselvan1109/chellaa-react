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

type PaletteWithMain =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

function isPaletteWithMain(key: string): key is PaletteWithMain {
  return (
    key === "primary" ||
    key === "secondary" ||
    key === "error" ||
    key === "warning" ||
    key === "info" ||
    key === "success"
  );
}

const paletteTokenFallbackMap: Record<string, string> = {
  primary: "var(--cl-color-primary-base)",
  secondary: "var(--cl-color-secondary-base)",
  error: "var(--cl-color-danger-base)",
  warning: "var(--cl-color-warning-base)",
  info: "var(--cl-color-info-base)",
  success: "var(--cl-color-success-base)",
  "text.primary": "var(--cl-color-fg-primary)",
  "text.secondary": "var(--cl-color-fg-secondary)",
  "text.disabled": "var(--cl-color-fg-muted)",
  "background.default": "var(--cl-color-bg-canvas)",
  "background.paper": "var(--cl-color-bg-surface)",
};

function getNestedPaletteValue(obj: unknown, path: string): string | undefined {
  if (obj === null || typeof obj !== "object") return undefined;
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current !== null && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export function resolveTypographyColor(
  theme: ChellaaTheme,
  color?: string
): string | undefined {
  if (!color || color === "inherit" || color === "currentColor") {
    return color;
  }

  // Check direct palette main colors (primary, secondary, error, warning, info, success)
  if (theme?.palette && isPaletteWithMain(color)) {
    const paletteColor = theme.palette[color];
    if (paletteColor && typeof paletteColor.main === "string") {
      return paletteColor.main;
    }
  }

  // Check dotted paths (text.primary, text.secondary, background.paper, etc.)
  if (color.includes(".") && theme?.palette) {
    const resolved = getNestedPaletteValue(theme.palette, color);
    if (resolved) {
      return resolved;
    }
  }

  // Fallback to documented CSS token if defined for this palette key
  if (color in paletteTokenFallbackMap) {
    return paletteTokenFallbackMap[color];
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
          ref={ref as React.Ref<HTMLSpanElement>}
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
        ref={ref as React.Ref<HTMLSpanElement>}
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
