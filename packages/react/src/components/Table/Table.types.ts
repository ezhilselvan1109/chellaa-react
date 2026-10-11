import * as React from "react";

export type TableVariant = "simple" | "striped" | "bordered";
export type TableSize = "sm" | "md" | "lg";

export interface TableRootProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Visual aesthetic treatment of the table.
   * @default "simple"
   */
  variant?: TableVariant | undefined;

  /**
   * Spatial density scale governing padding and font size.
   * @default "md"
   */
  size?: TableSize | undefined;

  /**
   * If true, enables background hover transitions on table body rows.
   * @default false
   */
  isHoverable?: boolean | undefined;

  /**
   * If true, pins the table header row to the top of the scrolling container.
   * @default false
   */
  isStickyHeader?: boolean | undefined;

  children?: React.ReactNode | undefined;
}

export interface TableContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | undefined;
}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  /**
   * Placement of the caption relative to the table.
   * @default "bottom"
   */
  placement?: "top" | "bottom" | undefined;
  children?: React.ReactNode | undefined;
}

export interface TableTheadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode | undefined;
}

export interface TableTbodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode | undefined;
}

export interface TableTfootProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode | undefined;
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * If true, enables hover background highlight on this row specifically.
   */
  isHoverable?: boolean | undefined;

  /**
   * If true, applies selected background styling to this row.
   * @default false
   */
  isSelected?: boolean | undefined;

  children?: React.ReactNode | undefined;
}

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * If true, aligns text to the right and applies tabular-nums font styling.
   * @default false
   */
  isNumeric?: boolean | undefined;

  children?: React.ReactNode | undefined;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * If true, aligns text to the right and applies tabular-nums font styling.
   * @default false
   */
  isNumeric?: boolean | undefined;

  children?: React.ReactNode | undefined;
}

export interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
  isHoverable: boolean;
}
