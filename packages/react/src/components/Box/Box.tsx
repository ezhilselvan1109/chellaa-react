"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * If true, delegating rendering to immediate child element using Slot
   */
  asChild?: boolean;
  /**
   * The underlying HTML element or component to render (alias of `as`)
   */
  component?: React.ElementType;
  /**
   * The underlying HTML element or component to render
   */
  as?: React.ElementType;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledBoxRoot = styled("div", {
  name: "ChellaaBox",
  slot: "Root",
  shouldForwardProp: (prop) => prop !== "asChild" && prop !== "component",
})({});

/**
 * Universal polymorphic layout container with theme-aware `sx` styling and `asChild` composition.
 *
 * @example
 * <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
 *   Content
 * </Box>
 */
export const Box = React.forwardRef<HTMLElement, BoxProps>(
  function Box(props, ref) {
    const { asChild = false, component, as, className, style, sx, children, ...rest } = props;
    const targetTag = component || as;
    const boxClassName = classNames("cl-box", className);

    if (asChild) {
      return (
        <StyledBoxRoot
          as={Slot}
          ref={ref as any}
          className={boxClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledBoxRoot>
      );
    }

    if (targetTag) {
      return (
        <StyledBoxRoot
          as={targetTag}
          ref={ref as any}
          className={boxClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledBoxRoot>
      );
    }

    return (
      <StyledBoxRoot
        ref={ref as any}
        className={boxClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledBoxRoot>
    );
  }
);

Box.displayName = "Box";
