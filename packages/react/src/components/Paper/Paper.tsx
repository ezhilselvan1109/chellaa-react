"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

export type PaperVariant = "elevation" | "outlined";

export interface PaperOwnerState {
  elevation?: number | undefined;
  variant?: PaperVariant | undefined;
  square?: boolean | undefined;
}

export interface PaperProps
  extends React.HTMLAttributes<HTMLElement>,
    PaperOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType | undefined;
  /**
   * The underlying HTML element or component
   */
  as?: React.ElementType | undefined;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledPaperRoot = styled("div", {
  name: "ChellaaPaper",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "elevation" &&
    prop !== "variant" &&
    prop !== "square" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Material Paper elevation surface container with 24-level elevation shadows,
 * dark-mode surface elevation overlays, and outlined variants.
 *
 * @example
 * <Paper elevation={3} sx={{ p: 2 }}>
 *   Elevated Content
 * </Paper>
 */
export const Paper = React.forwardRef<HTMLElement, PaperProps>(
  function Paper(props, ref) {
    const {
      asChild = false,
      component,
      as,
      elevation = 1,
      variant = "elevation",
      square = false,
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const clampedElevation = Math.max(0, Math.min(24, elevation));

    const paperClassName = classNames(
      "cl-paper",
      square && "cl-paper--square",
      variant === "outlined" ? "cl-paper--outlined" : `cl-paper--elevation-${clampedElevation}`,
      className
    );

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledPaperRoot
          as={Slot}
          ref={ref as any}
          className={paperClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledPaperRoot>
      );
    }

    if (targetTag) {
      return (
        <StyledPaperRoot
          as={targetTag}
          ref={ref as any}
          className={paperClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledPaperRoot>
      );
    }

    return (
      <StyledPaperRoot
        ref={ref as any}
        className={paperClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledPaperRoot>
    );
  }
);

Paper.displayName = "Paper";
