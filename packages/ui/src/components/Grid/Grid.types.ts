import React from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

export type BreakpointMap = Record<Breakpoint, boolean>;

export type Gutter = number | string | Partial<Record<Breakpoint, number | string>>;

export type RowAlign = "top" | "middle" | "bottom" | "stretch";

export type RowJustify =
  | "start"
  | "end"
  | "center"
  | "space-around"
  | "space-between"
  | "space-evenly";

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Vertical alignment of columns inside the row.
   * Can be a value or a responsive breakpoint object.
   * @default "top"
   */
  align?: RowAlign | Partial<Record<Breakpoint, RowAlign>>;
  /**
   * Horizontal arrangement of columns inside the row.
   * Can be a value or a responsive breakpoint object.
   * @default "start"
   */
  justify?: RowJustify | Partial<Record<Breakpoint, RowJustify>>;
  /**
   * Spacing between grids.
   * Can be a number (px), string unit (e.g. "1rem"), responsive object,
   * or a tuple of [horizontalGutter, verticalGutter].
   * @default 0
   */
  gutter?: Gutter | [Gutter, Gutter];
  /**
   * Auto wrap line if columns exceed 24 spans.
   * @default true
   */
  wrap?: boolean;
  children?: React.ReactNode;
}

export interface ColSize {
  span?: number;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
  flex?: string | number;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Raster number of cells to occupy (1-24, or 0 for display: none).
   */
  span?: number;
  /**
   * The number of cells to offset Col from the left.
   * @default 0
   */
  offset?: number;
  /**
   * Raster order in flex layout.
   * @default 0
   */
  order?: number;
  /**
   * The number of cells that raster is moved to the left.
   * @default 0
   */
  pull?: number;
  /**
   * The number of cells that raster is moved to the right.
   * @default 0
   */
  push?: number;
  /**
   * Flex layout style: number for 'flex: n n auto', or arbitrary string (e.g. '100px', '1 1 200px').
   */
  flex?: string | number;
  /**
   * Screen < 576px responsive configuration.
   */
  xs?: number | ColSize;
  /**
   * Screen ≥ 576px responsive configuration.
   */
  sm?: number | ColSize;
  /**
   * Screen ≥ 768px responsive configuration.
   */
  md?: number | ColSize;
  /**
   * Screen ≥ 992px responsive configuration.
   */
  lg?: number | ColSize;
  /**
   * Screen ≥ 1200px responsive configuration.
   */
  xl?: number | ColSize;
  /**
   * Screen ≥ 1600px responsive configuration.
   */
  xxl?: number | ColSize;
  /**
   * Screen ≥ 1920px responsive configuration.
   */
  xxxl?: number | ColSize;
  children?: React.ReactNode;
}
