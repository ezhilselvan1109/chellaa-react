import * as React from "react";
import type { CSSProperties } from "react";
import { styled } from "../../system/styled";
import { parseSx } from "../../system/sx";
import type { ResponsiveValue, SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";

export type StackDirection = "row" | "row-reverse" | "column" | "column-reverse";

export interface StackOwnerState {
  direction?: ResponsiveValue<StackDirection> | undefined;
  spacing?: ResponsiveValue<number | string> | undefined;
  alignItems?: ResponsiveValue<CSSProperties["alignItems"]> | undefined;
  justifyContent?: ResponsiveValue<CSSProperties["justifyContent"]> | undefined;
  flexWrap?: ResponsiveValue<CSSProperties["flexWrap"]> | undefined;
  useFlexGap?: boolean | undefined;
}

export interface StackProps
  extends React.HTMLAttributes<HTMLElement>,
    StackOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean;
  /**
   * Underlying HTML element or component
   */
  component?: React.ElementType;
  /**
   * Underlying HTML element or component
   */
  as?: React.ElementType;
  /**
   * Element placed between each child
   */
  divider?: React.ReactNode;
  /**
   * System-aware sx styling prop
   */
  sx?: SxProps;
  children?: React.ReactNode;
}

const StyledStackRoot = styled("div", {
  name: "ChellaaStack",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "direction" &&
    prop !== "spacing" &&
    prop !== "alignItems" &&
    prop !== "justifyContent" &&
    prop !== "flexWrap" &&
    prop !== "useFlexGap" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: StackOwnerState }>(({ theme, ownerState }) => {
  const styles: Record<string, any> = {
    display: "flex",
    boxSizing: "border-box",
  };

  // 1. Responsive direction
  const parsedDirection = parseSx(theme, {
    flexDirection: ownerState.direction ?? "column",
  });
  Object.assign(styles, parsedDirection);

  // 2. Responsive spacing (gap)
  if (ownerState.spacing !== undefined) {
    const parsedGap = parseSx(theme, {
      gap: ownerState.spacing,
    });
    Object.assign(styles, parsedGap);
  }

  // 3. Alignment and wrapping
  if (ownerState.alignItems !== undefined) {
    Object.assign(
      styles,
      parseSx(theme, { alignItems: ownerState.alignItems })
    );
  }
  if (ownerState.justifyContent !== undefined) {
    Object.assign(
      styles,
      parseSx(theme, { justifyContent: ownerState.justifyContent })
    );
  }
  if (ownerState.flexWrap !== undefined) {
    Object.assign(
      styles,
      parseSx(theme, { flexWrap: ownerState.flexWrap })
    );
  }

  return styles;
});

/**
 * 1D Flexbox layout container managing direction, spacing, alignment, and dividers.
 *
 * @example
 * <Stack direction="row" spacing={2} alignItems="center">
 *   <Item>1</Item>
 *   <Item>2</Item>
 * </Stack>
 */
export const Stack = React.forwardRef<HTMLElement, StackProps>(
  function Stack(props, ref) {
    const {
      asChild = false,
      component,
      as,
      direction = "column",
      spacing = 0,
      alignItems,
      justifyContent,
      flexWrap,
      useFlexGap = true,
      divider,
      children,
      ...rest
    } = props;

    const ownerState: StackOwnerState = {
      direction,
      spacing,
      alignItems,
      justifyContent,
      flexWrap,
      useFlexGap,
    };

    const targetTag = component || as;

    // Handle divider insertion between valid React children
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
                    key: `stack-divider-${index}`,
                  })
                : (
                  <span key={`stack-divider-${index}`}>{divider}</span>
                )
            );
          }
          return acc;
        },
        []
      );
    }

    if (asChild) {
      return (
        <StyledStackRoot
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        >
          {renderedChildren}
        </StyledStackRoot>
      );
    }

    if (targetTag) {
      return (
        <StyledStackRoot
          as={targetTag}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        >
          {renderedChildren}
        </StyledStackRoot>
      );
    }

    return (
      <StyledStackRoot
        ref={ref as any}
        ownerState={ownerState}
        {...rest}
      >
        {renderedChildren}
      </StyledStackRoot>
    );
  }
);

Stack.displayName = "Stack";
