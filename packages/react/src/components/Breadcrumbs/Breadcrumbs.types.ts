import * as React from "react";
import type { SxProps } from "../../system/types";
import type { LinkProps } from "../Link/Link.types";

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
  /**
   * Accessible landmark label announced by assistive tech.
   * @default "Breadcrumb"
   */
  "aria-label"?: string;

  /**
   * Custom separator node displayed between breadcrumb items.
   * @default "/"
   */
  separator?: React.ReactNode;

  /**
   * Maximum number of items to display before collapsing with an ellipsis.
   */
  maxItems?: number;

  /**
   * Number of items to keep visible at the start before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse?: number;

  /**
   * Number of items to keep visible at the end after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse?: number;

  /**
   * The system sx style override prop.
   */
  sx?: SxProps;

  children: React.ReactNode;
}

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
}

export interface BreadcrumbLinkProps extends LinkProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<"li"> {
  children?: React.ReactNode;
}

export interface BreadcrumbEllipsisProps extends React.ComponentPropsWithoutRef<"span"> {
  /**
   * Accessible text for screen reader users.
   * @default "More breadcrumb items"
   */
  "aria-label"?: string;
}
