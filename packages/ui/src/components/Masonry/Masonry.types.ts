import React from "react";
import type { Breakpoint } from "../Grid/Grid.types";

export type Gap = undefined | number | Partial<Record<Breakpoint, number>>;

export type MasonrySemanticDOM = "root" | "item";

export interface MasonryItem<T = any> {
  /**
   * Unique identifier for the item.
   */
  key: React.Key;
  /**
   * Optional pre-known height of the item in pixels to avoid initial layout shift.
   */
  height?: number;
  /**
   * Specifies the exact column to which the item belongs (manual pinning).
   */
  column?: number;
  /**
   * Custom data payload passed to itemRender.
   */
  data?: T;
  /**
   * Custom display content. Takes precedence over itemRender.
   */
  children?: React.ReactNode;
}

export interface MasonryProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className" | "style"> {
  /**
   * Number of columns, can be a fixed number or a responsive configuration object.
   * @default 3
   */
  columns?: number | Partial<Record<Breakpoint, number>>;
  /**
   * Spacing between items. Supports number (px), responsive object, or [horizontal, vertical] array.
   * @default 0
   */
  gutter?: Gap | [Gap, Gap];
  /**
   * Array of items to layout in masonry columns.
   */
  items?: MasonryItem<T>[];
  /**
   * Custom item rendering function for items.
   */
  itemRender?: (item: MasonryItem<T>) => React.ReactNode;
  /**
   * Direct child elements to layout in masonry (alternative to items prop).
   */
  children?: React.ReactNode;
  /**
   * Whether to continuously monitor the size changes of child items using ResizeObserver.
   * @default false
   */
  fresh?: boolean;
  /**
   * Callback triggered when item column assignments are computed or updated.
   */
  onLayoutChange?: (info: { key: React.Key; column: number }[]) => void;
  /**
   * Customize class for each semantic structure (root, item). Supports object or function.
   */
  classNames?:
    | Partial<Record<MasonrySemanticDOM, string>>
    | ((info: { props: MasonryProps<T> }) => Partial<Record<MasonrySemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure (root, item). Supports object or function.
   */
  styles?:
    | Partial<Record<MasonrySemanticDOM, React.CSSProperties>>
    | ((info: { props: MasonryProps<T> }) => Partial<Record<MasonrySemanticDOM, React.CSSProperties>>);
  className?: string;
  style?: React.CSSProperties;
}
