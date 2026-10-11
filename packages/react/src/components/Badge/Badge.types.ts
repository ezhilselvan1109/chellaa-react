import * as React from "react";

export type BadgeVariant = "subtle" | "solid" | "outline";
export type BadgeSize = "sm" | "md" | "lg";
export type BadgeColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual aesthetic treatment of the badge.
   * @default "subtle"
   */
  variant?: BadgeVariant | undefined;

  /**
   * Spatial sizing scale.
   * @default "md"
   */
  size?: BadgeSize | undefined;

  /**
   * Semantic color intent.
   * @default "neutral"
   */
  colorScheme?: BadgeColorScheme | undefined;

  /**
   * If true, renders with fully rounded pill corners (`--cl-rad-full`).
   * @default false
   */
  isPill?: boolean | undefined;

  /**
   * If true, renders a small colored status dot before children.
   * @default false
   */
  hasDot?: boolean | undefined;

  /**
   * If true, delegates rendering to the immediate child element.
   * @default false
   */
  asChild?: boolean | undefined;

  children?: React.ReactNode | undefined;
}
