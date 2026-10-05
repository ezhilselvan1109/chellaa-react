import * as React from "react";
import type { CSSProperties } from "react";
import { styled } from "../../system/styled";
import { parseSx } from "../../system/sx";
import type { ResponsiveValue, SxProps } from "../../system/types";
import type { BreakpointKey } from "../../theme/types";
import { breakpointKeys } from "../../theme/breakpoints";
import { Slot } from "../../primitives/Slot";

export type GridSize = boolean | "auto" | number;
export type GridWrap = "nowrap" | "wrap" | "wrap-reverse";
export type GridDirection = "row" | "row-reverse" | "column" | "column-reverse";

export interface GridOwnerState {
  container?: boolean | undefined;
  item?: boolean | undefined;
  columns?: number | undefined;
  spacing?: ResponsiveValue<number | string> | undefined;
  rowSpacing?: ResponsiveValue<number | string> | undefined;
  columnSpacing?: ResponsiveValue<number | string> | undefined;
  direction?: ResponsiveValue<GridDirection> | undefined;
  wrap?: GridWrap | undefined;
  alignItems?: ResponsiveValue<CSSProperties["alignItems"]> | undefined;
  justifyContent?: ResponsiveValue<CSSProperties["justifyContent"]> | undefined;
  xs?: GridSize | undefined;
  sm?: GridSize | undefined;
  md?: GridSize | undefined;
  lg?: GridSize | undefined;
  xl?: GridSize | undefined;
}

export interface GridProps
  extends React.HTMLAttributes<HTMLElement>,
    GridOwnerState {
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

function generateGridSizeStyles(
  size: GridSize,
  columns: number = 12
): Record<string, any> {
  if (size === true) {
    return {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: "100%",
    };
  }

  if (size === "auto") {
    return {
      flexBasis: "auto",
      flexGrow: 0,
      maxWidth: "none",
    };
  }

  if (typeof size === "number") {
    const widthPercentage = `${Math.round((size / columns) * 10e7) / 10e5}%`;
    return {
      flexBasis: widthPercentage,
      flexGrow: 0,
      maxWidth: widthPercentage,
    };
  }

  return {};
}

const StyledGridRoot = styled("div", {
  name: "ChellaaGrid",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "container" &&
    prop !== "item" &&
    prop !== "columns" &&
    prop !== "spacing" &&
    prop !== "rowSpacing" &&
    prop !== "columnSpacing" &&
    prop !== "direction" &&
    prop !== "wrap" &&
    prop !== "alignItems" &&
    prop !== "justifyContent" &&
    prop !== "xs" &&
    prop !== "sm" &&
    prop !== "md" &&
    prop !== "lg" &&
    prop !== "xl" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: GridOwnerState }>(({ theme, ownerState }) => {
  const styles: Record<string, any> = {
    boxSizing: "border-box",
  };

  const columns = ownerState.columns ?? 12;

  // 1. Container styles
  if (ownerState.container) {
    styles.display = "flex";
    styles.flexWrap = ownerState.wrap ?? "wrap";
    styles.width = "100%";

    if (ownerState.direction) {
      Object.assign(
        styles,
        parseSx(theme, { flexDirection: ownerState.direction })
      );
    }

    if (ownerState.spacing !== undefined) {
      Object.assign(styles, parseSx(theme, { gap: ownerState.spacing }));
    }
    if (ownerState.rowSpacing !== undefined) {
      Object.assign(styles, parseSx(theme, { rowGap: ownerState.rowSpacing }));
    }
    if (ownerState.columnSpacing !== undefined) {
      Object.assign(
        styles,
        parseSx(theme, { columnGap: ownerState.columnSpacing })
      );
    }
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
  }

  // 2. Item sizing across breakpoints
  const bpSizes: Record<BreakpointKey, GridSize | undefined> = {
    xs: ownerState.xs,
    sm: ownerState.sm,
    md: ownerState.md,
    lg: ownerState.lg,
    xl: ownerState.xl,
  };

  for (const bp of breakpointKeys) {
    const size = bpSizes[bp];
    if (size !== undefined) {
      const sizeStyles = generateGridSizeStyles(size, columns);
      if (bp === "xs") {
        Object.assign(styles, sizeStyles);
      } else {
        const media = theme.breakpoints.up(bp);
        styles[media] = {
          ...(styles[media] || {}),
          ...sizeStyles,
        };
      }
    }
  }

  return styles;
});

/**
 * Material 12-column responsive layout grid.
 *
 * @example
 * <Grid container spacing={2}>
 *   <Grid item xs={12} md={6}>Item 1</Grid>
 *   <Grid item xs={12} md={6}>Item 2</Grid>
 * </Grid>
 */
export const Grid = React.forwardRef<HTMLElement, GridProps>(
  function Grid(props, ref) {
    const {
      asChild = false,
      component,
      as,
      container = false,
      item = false,
      columns = 12,
      spacing,
      rowSpacing,
      columnSpacing,
      direction = "row",
      wrap = "wrap",
      alignItems,
      justifyContent,
      xs,
      sm,
      md,
      lg,
      xl,
      ...rest
    } = props;

    const ownerState: GridOwnerState = {
      container,
      item,
      columns,
      spacing,
      rowSpacing,
      columnSpacing,
      direction,
      wrap,
      alignItems,
      justifyContent,
      xs,
      sm,
      md,
      lg,
      xl,
    };

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledGridRoot
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        />
      );
    }

    if (targetTag) {
      return (
        <StyledGridRoot
          as={targetTag}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        />
      );
    }

    return (
      <StyledGridRoot
        ref={ref as any}
        ownerState={ownerState}
        {...rest}
      />
    );
  }
);

Grid.displayName = "Grid";
