import * as React from "react";

export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "outline" | "solid" | "ghost" | "subtle";

export interface PaginationRootProps extends React.HTMLAttributes<HTMLElement> {
  /** Total number of items across all pages */
  total: number;
  /** Number of items displayed per page. Default is 10 */
  pageSize?: number | undefined;
  /** Controlled current active page number (1-indexed) */
  page?: number | undefined;
  /** Uncontrolled default active page number. Default is 1 */
  defaultPage?: number | undefined;
  /** Callback fired when the active page changes */
  onPageChange?: ((page: number) => void) | undefined;
  /** Callback fired when the page size is modified */
  onPageSizeChange?: ((pageSize: number) => void) | undefined;
  /** Number of adjacent sibling page buttons around active page. Default is 1 */
  siblingCount?: number | undefined;
  /** Number of boundary page buttons shown at beginning and end. Default is 1 */
  boundaryCount?: number | undefined;
  /** Sizing scale: sm (28px), md (36px, default), lg (44px) */
  size?: PaginationSize | undefined;
  /** Visual button variant: outline (default), solid, ghost, subtle */
  variant?: PaginationVariant | undefined;
  /** Globally disables all pagination controls */
  isDisabled?: boolean | undefined;
  /** Whether to render the integrated page size selector dropdown */
  showSizeChanger?: boolean | undefined;
  /** Available page size options for showSizeChanger. Default [10, 20, 50, 100] */
  pageSizeOptions?: number[] | undefined;
  /** Whether to render the direct page number quick jumper box */
  showQuickJumper?: boolean | undefined;
  /** Accessible label for the navigation landmark */
  "aria-label"?: string | undefined;
  /** Child elements or custom composition. When omitted, standard pagination layout is auto-generated */
  children?: React.ReactNode | undefined;
}

export type PaginationProps = PaginationRootProps;

export interface PaginationListProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode | undefined;
}

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The 1-indexed page number represented by this button */
  page: number;
  /** Whether this button represents the currently active page */
  isCurrent?: boolean | undefined;
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
  /** Custom content, defaults to page number */
  children?: React.ReactNode | undefined;
}

export interface PaginationActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
  children?: React.ReactNode | undefined;
}

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode | undefined;
}

export interface PaginationSizeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: number[] | undefined;
}

export interface PaginationJumperProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode | undefined;
}

export interface PaginationContextValue {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  size: PaginationSize;
  variant: PaginationVariant;
  isDisabled: boolean;
  siblingCount: number;
  boundaryCount: number;
}
