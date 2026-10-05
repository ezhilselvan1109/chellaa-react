import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";

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
})<{ ownerState: DividerOwnerState }>(({ theme, ownerState }) => {
  const isVertical = ownerState.orientation === "vertical";
  const borderCol = ownerState.light
    ? "rgba(0, 0, 0, 0.06)"
    : theme.palette.divider;
  const lineStyle = ownerState.lineStyle ?? "solid";

  const baseStyles: Record<string, any> = {
    margin: 0,
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: lineStyle,
    borderColor: borderCol,
    boxSizing: "border-box",
  };

  if (!ownerState.hasChildren) {
    if (isVertical) {
      return {
        ...baseStyles,
        borderRightWidth: "1px",
        height: "auto",
        alignSelf: ownerState.flexItem ? "stretch" : "auto",
        display: "inline-block",
        width: 0,
        ...(ownerState.variant === "middle" && {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }),
      };
    }

    return {
      ...baseStyles,
      borderBottomWidth: "1px",
      width: "100%",
      display: "block",
      height: 0,
      ...(ownerState.variant === "inset" && {
        marginLeft: "72px",
      }),
      ...(ownerState.variant === "middle" && {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: `calc(100% - ${theme.spacing(4)})`,
      }),
    };
  }

  // Divider with label / children
  const beforeFlex =
    ownerState.textAlign === "left"
      ? "0.05"
      : ownerState.textAlign === "right"
        ? "0.95"
        : "1";
  const afterFlex =
    ownerState.textAlign === "left"
      ? "0.95"
      : ownerState.textAlign === "right"
        ? "0.05"
        : "1";

  return {
    ...baseStyles,
    display: "flex",
    alignItems: "center",
    textAlign: ownerState.textAlign ?? "center",
    border: "none",
    width: "100%",
    "&::before": {
      content: '""',
      flex: beforeFlex,
      borderBottom: `1px ${lineStyle} ${borderCol}`,
    },
    "&::after": {
      content: '""',
      flex: afterFlex,
      borderBottom: `1px ${lineStyle} ${borderCol}`,
    },
    "& > .ChellaaDivider-wrapper": {
      display: "inline-block",
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      whiteSpace: "nowrap",
    },
  };
});

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
      children,
      role: roleProp,
      ...rest
    } = props;

    const hasChildren = Boolean(children);

    const ownerState: DividerOwnerState = {
      orientation,
      variant,
      lineStyle,
      flexItem,
      light,
      textAlign,
      hasChildren,
    };

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
          ownerState={ownerState}
          role={role}
          aria-orientation={ariaOrientation}
          {...rest}
        >
          {hasChildren ? (
            <span className="ChellaaDivider-wrapper">{children}</span>
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
        ownerState={ownerState}
        role={role}
        aria-orientation={ariaOrientation}
        {...rest}
      >
        {hasChildren ? (
          <span className="ChellaaDivider-wrapper">{children}</span>
        ) : null}
      </StyledDividerRoot>
    );
  }
);

Divider.displayName = "Divider";
