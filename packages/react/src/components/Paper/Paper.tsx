"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

import type {
  PaperVariant,
  PaperOwnerState,
  PaperProps,
} from "./Paper.types";

export type { PaperVariant, PaperOwnerState, PaperProps };

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
          ref={ref as React.Ref<HTMLDivElement>}
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
          ref={ref as React.Ref<HTMLDivElement>}
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
        ref={ref as React.Ref<HTMLDivElement>}
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
