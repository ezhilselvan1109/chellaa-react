import React from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "outline";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style variant of the badge.
   * @default "default"
   */
  variant?: BadgeVariant;
  /**
   * Size of the badge.
   * @default "sm"
   */
  size?: BadgeSize;
  /**
   * Child content.
   */
  children?: React.ReactNode;
}
