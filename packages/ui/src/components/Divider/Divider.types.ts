import React from "react";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerVariant = "solid" | "dashed" | "dotted";

export type DividerSize = "small" | "medium" | "large";

export type DividerTitlePlacement = "start" | "center" | "end" | "left" | "right";

export type DividerSemanticDOM = "root" | "rail" | "content";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Inner title text wrapped inside the divider.
   */
  children?: React.ReactNode;
  /**
   * Whether the line is horizontal or vertical.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  /**
   * Orientation shorthand. Simultaneously configure with orientation and prioritize orientation.
   * @default false
   */
  vertical?: boolean;
  /**
   * Line style variant.
   * @default "solid"
   */
  variant?: DividerVariant;
  /**
   * Shorthand for variant="dashed".
   * @default false
   */
  dashed?: boolean;
  /**
   * Divider text displayed as plain regular text rather than bold heading style.
   * @default false
   */
  plain?: boolean;
  /**
   * The size of margin spacing. Only valid for horizontal layout.
   * - "small": 8px
   * - "medium": 16px (default)
   * - "large": 24px
   */
  size?: DividerSize;
  /**
   * Position of title inside divider.
   * @default "center"
   */
  titlePlacement?: DividerTitlePlacement;
  /**
   * Distance between title text and edge (e.g. 0, 50, "50px", 0.05).
   */
  orientationMargin?: number | string;
  /**
   * Customize class for each semantic structure inside the component (root, rail, content).
   */
  classNames?: Partial<Record<DividerSemanticDOM, string>>;
  /**
   * Customize inline style for each semantic structure inside the component (root, rail, content).
   */
  styles?: Partial<Record<DividerSemanticDOM, React.CSSProperties>>;
}
