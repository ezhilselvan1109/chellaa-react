import * as React from "react";

export type SortDirection = "asc" | "desc";

export interface DataGridSort<TKey = string> {
  columnKey: TKey;
  direction: SortDirection;
}

export interface DataGridColumn<TRow, TKey extends string = string> {
  /**
   * Unique stable identifier for the column.
   */
  key: TKey;

  /**
   * Column header text or custom render node.
   */
  header: React.ReactNode;

  /**
   * Data accessor function or key extractor.
   */
  accessor?: (row: TRow, rowIndex: number) => React.ReactNode;

  /**
   * Custom cell renderer taking row, value, and index.
   */
  cell?: (props: { row: TRow; value: unknown; rowIndex: number }) => React.ReactNode;

  /**
   * Whether the column can be sorted.
   * @default false
   */
  isSortable?: boolean;

  /**
   * Custom comparator for client-side sorting.
   */
  comparator?: (a: TRow, b: TRow) => number;

  /**
   * Explicit column width.
   */
  width?: string | number;

  /**
   * Text alignment.
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export interface DataGridPaginationProps {
  /**
   * Current 1-based page number.
   */
  page: number;

  /**
   * Number of rows per page.
   */
  pageSize: number;

  /**
   * Total number of items (defaults to data.length if client-side).
   */
  total?: number;

  /**
   * Callback fired when page number changes.
   */
  onPageChange: (page: number) => void;

  /**
   * Callback fired when page size changes.
   */
  onPageSizeChange?: (pageSize: number) => void;

  /**
   * Page size options for selector.
   */
  pageSizeOptions?: number[];
}

export interface DataGridProps<TRow, TKey extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Column configuration.
   */
  columns: DataGridColumn<TRow, TKey>[];

  /**
   * Array of row items.
   */
  data: TRow[];

  /**
   * Unique identifier getter for each row.
   */
  getRowId: (row: TRow, index: number) => string | number;

  /**
   * Controlled sort state.
   */
  sort?: DataGridSort<TKey> | null;

  /**
   * Initial uncontrolled sort state.
   */
  defaultSort?: DataGridSort<TKey> | null;

  /**
   * Callback fired when sort changes.
   */
  onSortChange?: (sort: DataGridSort<TKey> | null) => void;

  /**
   * Whether row checkboxes are rendered for multiple row selection.
   * @default false
   */
  isSelectable?: boolean;

  /**
   * Controlled array of selected row IDs.
   */
  selectedRowIds?: (string | number)[];

  /**
   * Initial uncontrolled array of selected row IDs.
   * @default []
   */
  defaultSelectedRowIds?: (string | number)[];

  /**
   * Callback fired when selected row IDs change.
   */
  onSelectionChange?: (selectedIds: (string | number)[]) => void;

  /**
   * Whether clicking a row toggles its selection.
   * @default false
   */
  selectOnRowClick?: boolean;

  /**
   * Visual aesthetic treatment.
   * @default "simple"
   */
  variant?: "simple" | "striped" | "bordered";

  /**
   * Spatial density scale.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether table header is sticky while scrolling vertically.
   * @default false
   */
  isStickyHeader?: boolean;

  /**
   * Maximum height of table body for scrolling.
   */
  maxHeight?: string | number;

  /**
   * Loading state showing spinner overlay.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Custom empty state component or text.
   * @default "No data available."
   */
  emptyText?: React.ReactNode;

  /**
   * Optional pagination configuration.
   */
  pagination?: DataGridPaginationProps;

  /**
   * Accessible table label.
   * @default "Data Grid"
   */
  "aria-label"?: string;
}
