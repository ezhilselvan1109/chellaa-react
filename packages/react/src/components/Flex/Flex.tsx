"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import { styled } from "../../system/styled";
import { parseSx } from "../../system/sx";
import type { ResponsiveValue, SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import type { StackDirection } from "../Stack";

export interface FlexOwnerState {
  direction?: ResponsiveValue<StackDirection> | undefined;
  spacing?: ResponsiveValue<number | string> | undefined;
  gap?: ResponsiveValue<number | string> | undefined;
  alignItems?: ResponsiveValue<CSSProperties["alignItems"]> | undefined;
  align?: ResponsiveValue<CSSProperties["alignItems"]> | undefined;
  justifyContent?: ResponsiveValue<CSSProperties["justifyContent"]> | undefined;
  justify?: ResponsiveValue<CSSProperties["justifyContent"]> | undefined;
  flexWrap?: ResponsiveValue<CSSProperties["flexWrap"]> | undefined;
  wrap?: ResponsiveValue<CSSProperties["flexWrap"]> | undefined;
  inline?: boolean | undefined;
  center?: boolean | undefined;
}

export interface FlexProps
  extends React.HTMLAttributes<HTMLElement>,
    FlexOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean | undefined;
  /**
   * Underlying HTML element or component
   */
  component?: React.ElementType | undefined;
  /**
   * Underlying HTML element or component
   */
  as?: React.ElementType | undefined;
  /**
   * Element placed between each child
   */
  divider?: React.ReactNode | undefined;
  /**
   * System-aware sx styling prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledFlexRoot = styled("div", {
  name: "ChellaaFlex",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "direction" &&
    prop !== "spacing" &&
    prop !== "gap" &&
    prop !== "alignItems" &&
    prop !== "align" &&
    prop !== "justifyContent" &&
    prop !== "justify" &&
    prop !== "flexWrap" &&
    prop !== "wrap" &&
    prop !== "inline" &&
    prop !== "center" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: FlexOwnerState }>(({ theme, ownerState }) => {
  const isCenter = ownerState.center ?? false;
  const styles: Record<string, any> = {};

  // 1. Responsive direction (if array or object)
  if (typeof ownerState.direction === "object") {
    Object.assign(
      styles,
      parseSx(theme, { flexDirection: ownerState.direction })
    );
  }

  // 2. Responsive gap / spacing
  const gapValue = ownerState.gap ?? ownerState.spacing;
  if (gapValue !== undefined) {
    Object.assign(styles, parseSx(theme, { gap: gapValue }));
  }

  // 3. Align & Justify (if not center shorthand)
  if (!isCenter) {
    const alignVal = ownerState.align ?? ownerState.alignItems;
    if (alignVal !== undefined) {
      Object.assign(styles, parseSx(theme, { alignItems: alignVal }));
    }

    const justifyVal = ownerState.justify ?? ownerState.justifyContent;
    if (justifyVal !== undefined) {
      Object.assign(styles, parseSx(theme, { justifyContent: justifyVal }));
    }
  }

  // 4. Wrapping
  const wrapVal = ownerState.wrap ?? ownerState.flexWrap;
  if (wrapVal !== undefined) {
    Object.assign(styles, parseSx(theme, { flexWrap: wrapVal }));
  }

  return styles;
});

/**
 * 1D Flexbox layout container defaulting to horizontal row flow with convenient
 * shorthands: `center`, `inline`, `align`, `justify`, `wrap`, and `gap`.
 *
 * @example
 * <Flex center gap={2}>
 *   <Avatar />
 *   <Text>User Name</Text>
 * </Flex>
 */
export const Flex = React.forwardRef<HTMLElement, FlexProps>(
  function Flex(props, ref) {
    const {
      asChild = false,
      component,
      as,
      direction = "row",
      spacing,
      gap,
      alignItems,
      align,
      justifyContent,
      justify,
      flexWrap,
      wrap,
      inline = false,
      center = false,
      divider,
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const ownerState: FlexOwnerState = {
      direction,
      spacing,
      gap,
      alignItems,
      align,
      justifyContent,
      justify,
      flexWrap,
      wrap,
      inline,
      center,
    };

    const isSimpleDirection = typeof direction === "string";

    const flexClassName = classNames(
      "cl-flex",
      inline && "cl-flex--inline",
      center && "cl-flex--center",
      isSimpleDirection && `cl-flex--${direction}`,
      className
    );

    const targetTag = component || as;

    let renderedChildren = children;
    if (divider && !asChild) {
      const validChildren = React.Children.toArray(children).filter(
        React.isValidElement
      );
      renderedChildren = validChildren.reduce<React.ReactNode[]>(
        (acc, child, index) => {
          acc.push(child);
          if (index < validChildren.length - 1) {
            acc.push(
              React.isValidElement(divider)
                ? React.cloneElement(divider as React.ReactElement, {
                    key: `flex-divider-${index}`,
                  })
                : <span key={`flex-divider-${index}`}>{divider}</span>
            );
          }
          return acc;
        },
        []
      );
    }

    if (asChild) {
      return (
        <StyledFlexRoot
          as={Slot}
          ref={ref as any}
          className={flexClassName}
          style={style}
          ownerState={ownerState}
          sx={sx}
          {...rest}
        >
          {renderedChildren}
        </StyledFlexRoot>
      );
    }

    if (targetTag) {
      return (
        <StyledFlexRoot
          as={targetTag}
          ref={ref as any}
          className={flexClassName}
          style={style}
          ownerState={ownerState}
          sx={sx}
          {...rest}
        >
          {renderedChildren}
        </StyledFlexRoot>
      );
    }

    return (
      <StyledFlexRoot
        ref={ref as any}
        className={flexClassName}
        style={style}
        ownerState={ownerState}
        sx={sx}
        {...rest}
      >
        {renderedChildren}
      </StyledFlexRoot>
    );
  }
);

Flex.displayName = "Flex";
