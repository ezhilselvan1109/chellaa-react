import React from "react";

export type FlexOrientation = "horizontal" | "vertical";

export type FlexGap = "small" | "medium" | "large";

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Children elements to layout inside the flex container.
   */
  children?: React.ReactNode;
  /**
   * Is direction of the flex vertical (flex-direction: column).
   * Simultaneously configure with orientation and prioritize vertical.
   * @default false
   */
  vertical?: boolean;
  /**
   * Direction of the flex container.
   * @default "horizontal"
   */
  orientation?: FlexOrientation;
  /**
   * Set whether elements are displayed in a single line or multiple lines.
   * Passing true applies "wrap", false applies "nowrap".
   * @default "nowrap"
   */
  wrap?: React.CSSProperties["flexWrap"] | boolean;
  /**
   * Sets the alignment of elements along the main axis (justify-content).
   * @default "normal"
   */
  justify?: React.CSSProperties["justifyContent"];
  /**
   * Sets the alignment of elements along the cross axis (align-items).
   * @default "normal"
   */
  align?: React.CSSProperties["alignItems"];
  /**
   * Flex shorthand CSS property for the container.
   */
  flex?: React.CSSProperties["flex"];
  /**
   * Sets the gap spacing between child elements.
   * Supports presets ("small" = 8px, "medium" = 16px, "large" = 24px), numbers (in px), or arbitrary CSS strings.
   */
  gap?: FlexGap | number | string;
  /**
   * Custom element type for the flex container (e.g. "div", "section", "nav", "header").
   * @default "div"
   */
  component?: React.ElementType;
}
