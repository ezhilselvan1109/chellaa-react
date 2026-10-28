import * as React from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual shape of the skeleton placeholder.
   * @default "text"
   */
  variant?: SkeletonVariant;

  /**
   * Explicit width dimension (number in pixels or CSS length string).
   */
  width?: string | number;

  /**
   * Explicit height dimension (number in pixels or CSS length string).
   */
  height?: string | number;

  /**
   * If true, renders the wrapped children instead of the skeleton placeholder.
   * @default false
   */
  isLoaded?: boolean;

  /**
   * Animation style applied while loading.
   * @default "pulse"
   */
  animation?: SkeletonAnimation;

  /**
   * Children to display when `isLoaded` is true.
   */
  children?: React.ReactNode;
}
