"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "fullWidth" | "inset" | "middle";
export type DividerTextAlign = "center" | "left" | "right";
export type DividerLineStyle = "solid" | "dashed" | "dotted";

export interface DividerOwnerState {
  orientation?: DividerOrientation | undefined;
  variant?: DividerVariant | undefined;
  lineStyle?: DividerLineStyle | undefined;
  flexItem?: boolean | undefined;
  light?: boolean | undefined;
  textAlign?: DividerTextAlign | undefined;
  hasChildren?: boolean | undefined;
}

export interface DividerProps
  extends React.HTMLAttributes<HTMLElement>,
    DividerOwnerState {
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

const StyledDividerRoot = styled("hr", {
  name: "ChellaaDivider",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "orientation" &&
    prop !== "variant" &&
    prop !== "lineStyle" &&
    prop !== "flexItem" &&
    prop !== "light" &&
    prop !== "textAlign" &&
    prop !== "hasChildren" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Divider visual separator for grouping, lists, toolbars, and labeled sections.
 *
 * @example
 * <Divider />
 * <Divider>OR</Divider>
 * <Divider orientation="vertical" flexItem />
 */
export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  function Divider(props, ref) {
    const {
      asChild = false,
      component,
      as,
      orientation = "horizontal",
      variant = "fullWidth",
      lineStyle = "solid",
      flexItem = false,
      light = false,
      textAlign = "center",
      className,
      style,
      sx,
      children,
      role: roleProp,
      ...rest
    } = props;

    const hasChildren = Boolean(children);

    const dividerClassName = classNames(
      "cl-divider",
      `cl-divider--${orientation}`,
      variant !== "fullWidth" && `cl-divider--${variant}`,
      lineStyle !== "solid" && `cl-divider--${lineStyle}`,
      flexItem && "cl-divider--flex-item",
      light && "cl-divider--light",
      hasChildren && "cl-divider--with-children",
      hasChildren && `cl-divider--align-${textAlign}`,
      className
    );

    // Determine default semantic tag
    let defaultTag: React.ElementType = "hr";
    if (orientation === "vertical" || hasChildren) {
      defaultTag = "div";
    }

    const targetTag = component || as || defaultTag;

    // Accessibility attributes
    const isNativeHr = targetTag === "hr";
    const role = roleProp || (isNativeHr ? undefined : "separator");
    const ariaOrientation =
      isNativeHr
        ? undefined
        : orientation === "vertical"
          ? "vertical"
          : undefined;

    if (asChild) {
      return (
        <StyledDividerRoot
          as={Slot}
          ref={ref as any}
          className={dividerClassName}
          style={style}
          sx={sx}
          role={role}
          aria-orientation={ariaOrientation}
          {...rest}
        >
          {hasChildren ? (
            <span className="cl-divider__wrapper ChellaaDivider-wrapper">{children}</span>
          ) : (
            children
          )}
        </StyledDividerRoot>
      );
    }

    return (
      <StyledDividerRoot
        as={targetTag}
        ref={ref as any}
        className={dividerClassName}
        style={style}
        sx={sx}
        role={role}
        aria-orientation={ariaOrientation}
        {...rest}
      >
        {hasChildren ? (
          <span className="cl-divider__wrapper ChellaaDivider-wrapper">{children}</span>
        ) : null}
      </StyledDividerRoot>
    );
  }
);

Divider.displayName = "Divider";
