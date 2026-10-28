# SPEC-040: DataGrid Specification

## 1. Overview
The `DataGrid` component is a typed, responsive, accessible tabular data display organism built on semantic HTML table elements (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`). It provides client-side column sorting, multi-row selection with select-all indeterminate state, custom cell renderers, row key extractors, horizontal scrolling with sticky header, optional pagination integration via `@chellaa/react`'s `Pagination`, empty and loading states.

---

## 2. Public API & Type Definitions

```typescript
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
   * Data accessor function or property key on row item.
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
   * Explicit column width (e.g., '120px', '25%').
   */
  width?: string | number;

  /**
   * Column header alignment.
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export interface DataGridProps<TRow, TKey extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Column definitions.
   */
  columns: DataGridColumn<TRow, TKey>[];

  /**
   * Array of row data objects.
   */
  data: TRow[];

  /**
   * Unique identifier getter for each row.
   * Required for row selection and stable reconciliation.
   */
  getRowId: (row: TRow, index: number) => string | number;

  /**
   * Controlled sort state.
   */
  sort?: DataGridSort<TKey> | null;

  /**
   * Initial default sort state.
   */
  defaultSort?: DataGridSort<TKey> | null;

  /**
   * Callback fired when sort changes.
   */
  onSortChange?: (sort: DataGridSort<TKey> | null) => void;

  /**
   * Whether rows can be selected via checkboxes.
   * @default false
   */
  isSelectable?: boolean;

  /**
   * Controlled array of selected row IDs.
   */
  selectedRowIds?: (string | number)[];

  /**
   * Initial default selected row IDs.
   * @default []
   */
  defaultSelectedRowIds?: (string | number)[];

  /**
   * Callback fired when selected row IDs change.
   */
  onSelectionChange?: (selectedIds: (string | number)[]) => void;

  /**
   * Whether table rows can be clicked to select.
   * @default false
   */
  selectOnRowClick?: boolean;

  /**
   * Visual aesthetic variant.
   * @default "simple"
   */
  variant?: "simple" | "striped" | "bordered";

  /**
   * Spatial density scale.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * If true, table header is pinned during vertical scrolling.
   * @default false
   */
  isStickyHeader?: boolean;

  /**
   * Maximum height of table container for scrollable tables.
   */
  maxHeight?: string | number;

  /**
   * Loading state showing spinner / overlay.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Custom empty state component or text.
   * @default "No data available."
   */
  emptyText?: React.ReactNode;

  /**
   * Optional pagination options.
   */
  pagination?: {
    page: number;
    pageSize: number;
    total?: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    pageSizeOptions?: number[];
  };

  /**
   * Accessible table caption or label.
   */
  "aria-label"?: string;
}
```

---

## 3. Keyboard Interactions & Accessibility
- Table rendered with semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
- Sortable column headers rendered with `<button>` inside `<th>` with `aria-sort="ascending"|"descending"|"none"`.
- Select-all checkbox in header: `aria-label="Select all rows"`, supports `indeterminate={true}` when some rows are selected.
- Row checkboxes: `<Checkbox aria-label="Select row {id}">`.
- Focus indicators: All interactive elements (sort buttons, row checkboxes, pagination controls) have visible focus indicators conforming to WCAG 2.4.7.
- Horizontal scrolling handled with responsive wrapper `role="region"` and `tabIndex={0}` when scrollable, with `aria-label="Scrollable data table"`.
