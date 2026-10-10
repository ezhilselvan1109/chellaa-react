"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import type { BreakpointKey } from "../../theme/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

export interface ContainerOwnerState {
  maxWidth?: BreakpointKey | false | undefined;
  fixed?: boolean | undefined;
  disableGutters?: boolean | undefined;
}

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    ContainerOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType;
  /**
   * The underlying HTML element or component
   */
  as?: React.ElementType;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledContainerRoot = styled("div", {
  name: "ChellaaContainer",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "maxWidth" &&
    prop !== "fixed" &&
    prop !== "disableGutters" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Centered responsive max-width container with fluid gutters.
 *
 * @example
 * <Container maxWidth="md">
 *   <Typography variant="h1">Header</Typography>
 * </Container>
 */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  function Container(props, ref) {
    const {
      asChild = false,
      component,
      as,
      maxWidth = "lg",
      fixed = false,
      disableGutters = false,
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const containerClassName = classNames(
      "cl-container",
      disableGutters && "cl-container--disable-gutters",
      fixed && "cl-container--fixed",
      maxWidth !== false && `cl-container--${maxWidth}`,
      className
    );

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledContainerRoot
          as={Slot}
          ref={ref as any}
          className={containerClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledContainerRoot>
      );
    }

    if (targetTag) {
      return (
        <StyledContainerRoot
          as={targetTag}
          ref={ref as any}
          className={containerClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledContainerRoot>
      );
    }

    return (
      <StyledContainerRoot
        ref={ref as any}
        className={containerClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledContainerRoot>
    );
  }
);

Container.displayName = "Container";
