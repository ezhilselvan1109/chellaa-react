import * as React from "react";
import type { SxProps } from "../../system/types";

// ─── Variant & Size Unions ───────────────────────────────────────────────────

export type CardVariant = "elevated" | "outlined" | "filled";
export type CardSize = "sm" | "md" | "lg";

// ─── Owner State ─────────────────────────────────────────────────────────────

export interface CardOwnerState {
  variant: CardVariant;
  elevation: number;
  size: CardSize;
  hoverable: boolean;
  square: boolean;
}

// ─── Card (Root) ─────────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual surface treatment of the card.
   * @default "elevated"
   */
  variant?: CardVariant;

  /**
   * Numeric M3 elevation level (0–24). Only applies to the "elevated" variant.
   * @default 1
   */
  elevation?: number;

  /**
   * Spatial padding scale applied to all inner sub-components.
   * @default "md"
   */
  size?: CardSize;

  /**
   * When true, raises elevation by 2 stops and lifts the card 2px on hover.
   * @default false
   */
  hoverable?: boolean;

  /**
   * If true, removes the card's border-radius.
   * @default false
   */
  square?: boolean;

  /**
   * If true, delegates rendering to the immediate child element via Slot.
   * @default false
   */
  asChild?: boolean;

  /** Override the root HTML element. */
  component?: React.ElementType;
  /** Alias for component. */
  as?: React.ElementType;

  /** System-aware sx styling prop. */
  sx?: SxProps;

  children?: React.ReactNode;
}

// ─── CardHeader ──────────────────────────────────────────────────────────────

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Leading avatar or icon node. */
  avatar?: React.ReactNode;

  /** Trailing action node (icon button, menu trigger). */
  action?: React.ReactNode;

  /** Primary title text or node. */
  title?: React.ReactNode;

  /** Secondary subtitle text or node. */
  subheader?: React.ReactNode;

  /** Props forwarded to the inner title `<span>`. */
  titleTypographyProps?: React.HTMLAttributes<HTMLSpanElement>;

  /** Props forwarded to the inner subheader `<span>`. */
  subheaderTypographyProps?: React.HTMLAttributes<HTMLSpanElement>;

  /** Delegates rendering to immediate child via Slot. */
  asChild?: boolean;

  sx?: SxProps;
}

// ─── CardMedia ───────────────────────────────────────────────────────────────

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL for the background-image shorthand. For semantic HTML prefer `<img>` children.
   */
  image?: string;

  /**
   * Alt text applied as `aria-label` when using the `image` prop.
   */
  alt?: string;

  /**
   * CSS aspect-ratio value e.g. "16/9", "4/3", "1".
   * @default "16/9"
   */
  aspectRatio?: string;

  /** Override the rendered HTML element. @default "div" */
  component?: React.ElementType;

  sx?: SxProps;
}

// ─── CardBody ────────────────────────────────────────────────────────────────

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: SxProps;
}

// ─── CardFooter ──────────────────────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, renders a 1px top divider between the body and footer.
   * @default false
   */
  divider?: boolean;

  sx?: SxProps;
}

// ─── CardActions ─────────────────────────────────────────────────────────────

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, removes the default negative horizontal margins that
   * align icon-buttons flush to the card's padding box.
   * @default false
   */
  disableSpacing?: boolean;

  sx?: SxProps;
}
