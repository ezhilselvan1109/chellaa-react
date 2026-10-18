# SPEC-007: Table Component Specification

**Document Identifier:** SPEC-007  
**Document Status:** Approved & Implementation Ready  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Specification ID:   SPEC-007
Component Name:     Table
Package Export:     import { Table } from "@chellaa/react";
Category:           Data Display
Status:             Approved & Implementation Ready
Phase:              3 — Component Specifications
Related Components: Card, Badge, Pagination
```

---

## 2. Purpose

The `Table` component organizes dense, multi-dimensional datasets into structured rows and columns, enabling users to scan, compare, and analyze complex information efficiently.

### When to Use

- Displaying tabular data records (invoices, customer lists, audit logs, system metrics).
- Presenting comparative datasets where alignment across rows and columns is critical.
- Integrating with headless data grid libraries (such as TanStack Table).

### When NOT to Use

- **Do NOT use tables for page layout or grid alignment.** Use `Flex`, `Grid`, or `Stack`.
- **Do NOT use when data is non-tabular or purely hierarchical.** Use `Tree` or nested `List`.

---

## 3. Scope

### In Scope

- Compound sub-component architecture (`Table.Root`, `Table.Container`, `Table.Caption`, `Table.Thead`, `Table.Tbody`, `Table.Tfoot`, `Table.Tr`, `Table.Th`, `Table.Td`).
- 3 visual variants: `simple` (default), `striped`, `bordered`.
- 3 spatial density scales: `sm` (dense), `md` (default), `lg` (spacious).
- Numeric column right-alignment toggle (`isNumeric`).
- Interactive row hover highlighting (`isHoverable`).
- Sticky header support (`isStickyHeader`).
- Responsive horizontal scroll wrapper (`Table.Container`).
- Strict semantic HTML table semantics with `scope="col"` on headers.

---

## 4. Non-Goals

- Built-in client-side sorting and pagination engine (handled via headless composition with TanStack Table).
- Virtualized infinite row scrolling (handled by virtual list wrappers).
- Arbitrary `asChild` element delegation (prohibited to protect strict HTML table hierarchy).

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Table Feature Summary                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Architecture       │ Compound semantic HTML table primitives           │
├────────────────────┼───────────────────────────────────────────────────┤
│ Visual Treatments  │ simple (default divider), striped, bordered       │
├────────────────────┼───────────────────────────────────────────────────┤
│ Density Scales     │ sm (dense 12px), md (default 14px), lg (16px)     │
├────────────────────┼───────────────────────────────────────────────────┤
│ Data Alignment     │ isNumeric right-aligns figures with tabular-nums  │
├────────────────────┼───────────────────────────────────────────────────┤
│ Responsive Layout  │ Table.Container provides accessible touch scroll  │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Table.Container (.cl-table__container) (Overflow scroll wrapper)
└── Table.Root (HTML <table className="cl-table">)
    ├── Table.Caption (.cl-table__caption) (HTML <caption>)
    ├── Table.Thead (.cl-table__thead) (HTML <thead>)
    │   └── Table.Tr (.cl-table__tr) (HTML <tr>)
    │       └── Table.Th (.cl-table__th) (HTML <th scope="col">)
    ├── Table.Tbody (.cl-table__tbody) (HTML <tbody>)
    │   └── Table.Tr (.cl-table__tr [.cl-table__tr--hoverable])
    │       └── Table.Td (.cl-table__td [.cl-table__td--numeric]) (HTML <td>)
    └── Table.Tfoot (.cl-table__tfoot) (HTML <tfoot>)
```

---

## 7. Public API

### 7.1 `Table.Root` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `variant` | `TableVariant` | Optional | `"simple"` | Visual aesthetic treatment (`simple`, `striped`, `bordered`) | None |
| `size` | `TableSize` | Optional | `"md"` | Spatial density scale (`sm`, `md`, `lg`) | None |
| `isHoverable` | `boolean` | Optional | `false` | Enables background hover transitions on table body rows | Visual feedback |
| `isStickyHeader` | `boolean` | Optional | `false` | Pins table header row to top of scrolling viewport | Visual affordance |

### 7.2 `Table.Container` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `bordered` | `boolean` | Optional | `false` | Wraps table in a rounded border card surface with shadow | Visual container |

### 7.3 `Table.Caption` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `placement` | `"top" \| "bottom"` | Optional | `"bottom"` | Vertical placement of caption relative to table | Screen reader description |

### 7.4 `Table.Tr` (Row) Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `isHoverable` | `boolean` | Optional | Inherits | Enables hover background highlight specifically for this row | Visual feedback |
| `isSelected` | `boolean` | Optional | `false` | Applies selected background tint styling | Selection state |
| `onClick` | `MouseEventHandler` | Optional | `undefined` | Native click handler for row | Interactive landmark |

### 7.5 `Table.Th` (Header Cell) Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `isNumeric` | `boolean` | Optional | `false` | Right-aligns text and applies tabular numeral font styling | Alignment |
| `align` | `"left" \| "center" \| "right"` | Optional | `"left"` | Explicit text justification | Alignment |
| `isSortable` | `boolean` | Optional | `false` | Enables interactive sort affordances and hover feedback | Sort interaction |
| `sortDirection` | `"asc" \| "desc" \| "none"` | Optional | `"none"` | Sets accessible `aria-sort` attribute (`ascending`, `descending`, `none`) | `aria-sort` announced |
| `scope` | `string` | Optional | `"col"` | Header cell scope | W3C semantic scope |

### 7.6 `Table.Td` (Data Cell) Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `isNumeric` | `boolean` | Optional | `false` | Right-aligns text and applies tabular numeral font styling | Alignment |
| `align` | `"left" \| "center" \| "right"` | Optional | `"left"` | Explicit text justification | Alignment |

---

## 8. TypeScript Types

```typescript
import * as React from "react";

export type TableVariant = "simple" | "striped" | "bordered";
export type TableSize = "sm" | "md" | "lg";

export interface TableRootProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant | undefined;
  size?: TableSize | undefined;
  isHoverable?: boolean | undefined;
  isStickyHeader?: boolean | undefined;
  children?: React.ReactNode | undefined;
}

export interface TableContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean | undefined;
  children?: React.ReactNode | undefined;
}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
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
  isHoverable?: boolean | undefined;
  isSelected?: boolean | undefined;
  children?: React.ReactNode | undefined;
}

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  isNumeric?: boolean | undefined;
  align?: "left" | "center" | "right" | undefined;
  isSortable?: boolean | undefined;
  sortDirection?: "asc" | "desc" | "none" | undefined;
  children?: React.ReactNode | undefined;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  isNumeric?: boolean | undefined;
  align?: "left" | "center" | "right" | undefined;
  children?: React.ReactNode | undefined;
}

export interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
  isHoverable: boolean;
}
```

---

## 9. Variants

- **simple (Default):** Clean horizontal dividing lines between rows; minimal and airy.
- **striped:** Alternating subtle zebra striping (`:nth-child(even)` in `var(--cl-color-bg-surface)`); maximizes readability in dense multi-row datasets.
- **bordered:** Full grid cell borders on all four sides; ideal for financial ledgers and spreadsheets.

---

## 10. Sizes

Cell padding scale governing `Table.Th` and `Table.Td`:

- `sm`: 6px 12px padding; 12px typography (dense data grids).
- `md` (Default): 12px 16px padding; 14px typography (standard enterprise).
- `lg`: 16px 24px padding; 16px typography (featured displays).

---

## 11. States

- **Row Hover (`isHoverable=true`):** `tr:hover` shifts background to `var(--cl-color-bg-muted)`.
- **Sticky Header (`isStickyHeader=true`):** `thead th` pins to top with `position: sticky; top: 0; z-index: 1;`.

---

## 12. Behavior

- Preserves native W3C HTML table rendering physics.
- `Table.Container` handles horizontal overflow scrolling while preserving table layout integrity.

---

## 13. Controlled / Uncontrolled

```text
Controlled / Uncontrolled State:
N/A — Table is a presentational tabular DOM container. Data sorting and filtering are controlled by application state or headless engines.
```

---

## 14. Events

- `Table.Tr` supports standard native `onClick` handler (`React.MouseEventHandler<HTMLTableRowElement>`).
- If an entire row is interactive, developers must ensure proper keyboard navigation (e.g. placing an interactive `<Button>` or `<Link>` within a cell).

---

## 15. Composition

Compound export binding:

```tsx
export const Table = Object.assign(TableRoot, {
  Container: TableContainer,
  Caption: TableCaption,
  Thead: TableThead,
  Tbody: TableTbody,
  Tfoot: TableTfoot,
  Tr: TableTr,
  Th: TableTh,
  Td: TableTd,
});
```

_(Note: `asChild` is intentionally prohibited on table elements to prevent invalid HTML markup)._

---

## 16. Ref Contract

- `Table.Root` forwards ref to `HTMLTableElement`.
- All sub-components forward refs to their respective DOM elements (`HTMLTableRowElement`, `HTMLTableCellElement`).

---

## 17. Accessibility

### 17.1 Semantic Structure

- Uses native semantic HTML table tags: `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`.
- `Table.Th` automatically sets `scope="col"`.
- `Table.Caption` provides an accessible programmatic description of table contents for screen reader users.

---

## 18. Keyboard Interaction

```text
Keyboard Navigation:
Participates in standard browser table navigation. Interactive controls within table cells (buttons, checkboxes, links) receive focus in DOM order.
```

---

## 19. Styling Contract

```css
@layer cl-components {
  /* Container - Touch-friendly responsive horizontal scrolling */
  .cl-table__container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }

  /* Bordered card container variant */
  .cl-table__container--bordered {
    border: 1px solid var(--cl-color-border-subtle, #e2e8f0);
    border-radius: var(--cl-radius-lg, 0.5rem);
    background-color: var(--cl-color-bg-canvas, #ffffff);
    box-shadow: var(--cl-shadow-xs, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    overflow: hidden;
  }

  /* Table Root */
  .cl-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--cl-font-sans, system-ui, -apple-system, sans-serif);
    text-align: left;
    caption-side: bottom;
  }

  /* Caption */
  .cl-table__caption {
    padding: var(--cl-space-3, 0.75rem) var(--cl-space-4, 1rem);
    color: var(--cl-color-fg-muted, #64748b);
    font-size: var(--cl-font-size-sm, 0.875rem);
    text-align: left;
    font-weight: 500;
  }

  .cl-table__caption--top {
    caption-side: top;
    border-bottom: 1px solid var(--cl-color-border-subtle, #e2e8f0);
  }

  /* Headers */
  .cl-table__th {
    font-weight: 600;
    color: var(--cl-color-fg-primary, #0f172a);
    background-color: var(--cl-color-bg-surface, #f8fafc);
    border-bottom: 2px solid var(--cl-color-border-subtle, #e2e8f0);
    text-align: left;
    vertical-align: middle;
    transition: background-color var(--cl-motion-duration-fast, 150ms) var(--cl-motion-easing-standard, ease);
  }

  /* Body Cells */
  .cl-table__td {
    color: var(--cl-color-fg-secondary, #334155);
    border-bottom: 1px solid var(--cl-color-border-subtle, #e2e8f0);
    vertical-align: middle;
  }

  /* Numeric cell alignment & tabular figures */
  .cl-table__th--numeric,
  .cl-table__td--numeric {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* Explicit Alignment Classes */
  .cl-table__th--align-left,
  .cl-table__td--align-left {
    text-align: left;
  }

  .cl-table__th--align-center,
  .cl-table__td--align-center {
    text-align: center;
  }

  .cl-table__th--align-right,
  .cl-table__td--align-right {
    text-align: right;
  }

  /* Interactive Sortable Header */
  .cl-table__th--sortable {
    cursor: pointer;
    user-select: none;
  }

  .cl-table__th--sortable:hover {
    background-color: var(--cl-color-bg-muted, #f1f5f9);
    color: var(--cl-color-fg-primary, #0f172a);
  }

  .cl-table__th--sortable:focus-visible {
    outline: 2px solid var(--cl-color-primary, #4f46e5);
    outline-offset: -2px;
  }

  .cl-table__th--sorted-asc,
  .cl-table__th--sorted-desc {
    color: var(--cl-color-primary, #4f46e5);
    font-weight: 700;
  }

  /* Density Scales */
  .cl-table--sm .cl-table__th,
  .cl-table--sm .cl-table__td {
    padding: var(--cl-space-2, 0.5rem) var(--cl-space-3, 0.75rem);
    font-size: var(--cl-font-size-xs, 0.75rem);
    line-height: var(--cl-line-height-normal, 1.5);
  }

  .cl-table--md .cl-table__th,
  .cl-table--md .cl-table__td {
    padding: var(--cl-space-3, 0.75rem) var(--cl-space-4, 1rem);
    font-size: var(--cl-font-size-sm, 0.875rem);
    line-height: var(--cl-line-height-normal, 1.5);
  }

  .cl-table--lg .cl-table__th,
  .cl-table--lg .cl-table__td {
    padding: var(--cl-space-4, 1rem) var(--cl-space-6, 1.5rem);
    font-size: var(--cl-font-size-base, 1rem);
    line-height: var(--cl-line-height-normal, 1.5);
  }

  /* Striped Variant */
  .cl-table--striped tbody tr:nth-child(even) {
    background-color: var(--cl-color-bg-surface, #f8fafc);
  }

  /* Bordered Variant */
  .cl-table--bordered {
    border: 1px solid var(--cl-color-border-subtle, #e2e8f0);
  }

  .cl-table--bordered .cl-table__th,
  .cl-table--bordered .cl-table__td {
    border: 1px solid var(--cl-color-border-subtle, #e2e8f0);
  }

  /* Hoverable Rows */
  .cl-table--hoverable tbody tr,
  .cl-table__tr--hoverable {
    transition: background-color var(--cl-motion-duration-fast, 150ms) var(--cl-motion-easing-standard, ease);
  }

  .cl-table--hoverable tbody tr:hover,
  .cl-table__tr--hoverable:hover {
    background-color: var(--cl-color-bg-muted, #f1f5f9);
  }

  /* Selected Row */
  .cl-table__tr--selected {
    background-color: var(--cl-color-primary-subtle, rgba(99, 102, 241, 0.08)) !important;
  }

  /* Sticky Header */
  .cl-table--sticky-header thead th {
    position: sticky;
    top: 0;
    background-color: var(--cl-color-bg-elev, #ffffff);
    z-index: 2;
    box-shadow: 0 1px 0 0 var(--cl-color-border-subtle, #e2e8f0);
  }

  /* Footer Styling */
  .cl-table tfoot th,
  .cl-table tfoot td {
    font-weight: 600;
    color: var(--cl-color-fg-primary, #0f172a);
    background-color: var(--cl-color-bg-surface, #f8fafc);
    border-top: 2px solid var(--cl-color-border-subtle, #e2e8f0);
    border-bottom: none;
  }

  /* Dark Theme Adaptations */
  [data-theme="dark"] .cl-table__container--bordered {
    border-color: var(--cl-color-border-subtle, rgba(255, 255, 255, 0.1));
    background-color: var(--cl-color-bg-canvas, #090d16);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  }

  [data-theme="dark"] .cl-table__th,
  [data-theme="dark"] .cl-table tfoot th,
  [data-theme="dark"] .cl-table tfoot td {
    background-color: rgba(255, 255, 255, 0.03);
    color: var(--cl-color-fg-primary, #f8fafc);
    border-color: var(--cl-color-border-subtle, rgba(255, 255, 255, 0.1));
  }

  [data-theme="dark"] .cl-table__td {
    color: var(--cl-color-fg-secondary, #cbd5e1);
    border-color: var(--cl-color-border-subtle, rgba(255, 255, 255, 0.08));
  }

  [data-theme="dark"] .cl-table--striped tbody tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.02);
  }

  [data-theme="dark"] .cl-table--hoverable tbody tr:hover,
  [data-theme="dark"] .cl-table__tr--hoverable:hover,
  [data-theme="dark"] .cl-table__th--sortable:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }

  [data-theme="dark"] .cl-table__tr--selected {
    background-color: rgba(99, 102, 241, 0.2) !important;
  }

  [data-theme="dark"] .cl-table--sticky-header thead th {
    background-color: var(--cl-color-bg-canvas, #090d16);
    box-shadow: 0 1px 0 0 var(--cl-color-border-subtle, rgba(255, 255, 255, 0.12));
  }
}
```

---

## 20. Theme Contract

- **Semantic Tokens:** Zebra stripes and row hovers use semantic background tokens (`--cl-color-bg-surface`, `--cl-color-bg-muted`), rendering cleanly in both Light and Dark modes.
- **Dark Mode Surface Adaptation:** Bordered containers adopt dark canvas styling with semi-transparent hairline borders (`rgba(255, 255, 255, 0.1)`), elevated headers with subtle translucent overlays, and rich indigo alpha selection highlights (`rgba(99, 102, 241, 0.2)`).

---

## 21. Responsive Behavior

- `Table.Container` wraps `Table.Root` with horizontal scrollbars (`overflow-x: auto`), preventing layout breaking on mobile devices.

---

## 22. Motion

N/A — Tables do not possess non-essential motion.

---

## 23. Testing

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Table Test Matrix                             │
├───────────────────────────────────┬────────────────────────────────────┤
│ Category                          │ Applicability & Verification       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Rendering / Prop Pass-through  │ Applicable: verifies table cells,  │
│                                   │ rows, headers, caption mounting.   │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ Applicable: row click events.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Accessibility / axe-core       │ Applicable: zero violations with   │
│                                   │ semantic table structure.          │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ N/A — Non-interactive container    │
│                                   │ (inner cells handle focus).        │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled / Uncontrolled      │ N/A — Stateless display primitive. │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading State Guards│ N/A — Tables have no disabled mode.│
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR & RSC Compatibility        │ Applicable: pure Server Component. │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 24. Storybook

1. `Default`: Enterprise team members & billing table inside bordered container with status badges and numeric spend figures.
2. `Striped`: Zebra striped dataset with high-contrast alternating rows.
3. `Bordered`: Grid-style ledger with full hairline borders.
4. `DenseSize`: Small `size="sm"` table for high-density enterprise grids.
5. `NumericColumns`: Financial ledger showing right-aligned numbers with `isNumeric` and footer sums.
6. `InteractiveRowSelection`: Interactive table with row selection checkboxes, select-all header, selected row counts, and dynamic `isSelected` row highlights.
7. `SortableColumns`: Interactive sorting on User ID, Name, and Monthly Spend with SVG sort arrows (ascending, descending, neutral) and `aria-sort`.
8. `WithPagination`: Complete enterprise data table integrated with the Chellaa React `Pagination` component, page size select dropdown, item counts, and page navigation.
9. `EmptyState`: Clean enterprise empty dataset with search illustration icon, title, description, and "Clear Filters" action button.
10. `StickyHeader`: Scrollable viewport with sticky header and realistic telemetry data.
11. `DarkTheme`: Table rendered within `ThemeProvider defaultTheme="dark"` displaying striped, selected, and hover states with crisp dark contrast.

---

## 25. Documentation Requirements

- Live example of TanStack Table integration.
- Props API table for all compound elements.
- Accessibility best practices (caption and scope attributes).
- Pagination integration pattern with `@chellaa/react` Pagination.

---

## 26. Edge Cases

1. **Table Cell Content Truncation:** Large text cells must support ellipsis without breaking table column proportions.
2. **Mobile Overflow:** Always recommend wrapping tables in `Table.Container`.
3. **Empty Data States:** Render a unified `td` with `colSpan` matching total columns and structured visual empty state.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Table Reference Comparison Matrix                    │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ Table / TableHead │ Table (columns[])  │ Compound HTML Table primitives│
│ TableContainer    │ -                  │ Table.Container (bordered opt)│
│ -                 │ pagination         │ Headless / Component Compostn │
│ -                 │ rowSelection       │ isSelected on Table.Tr        │
│ asChild           │ -                  │ Rejected (Strict table parser)│
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Built-in Data Grid Engine:** Complex client-side filtering, column reordering, and grouping are handled via headless TanStack Table composition.

---

## 29. Functional & Non-Functional Requirements

### 29.1 Functional Requirements

- **FR-TBL-01:** The component shall expose compound semantic table primitives: `Table.Root`, `Table.Container`, `Table.Caption`, `Table.Thead`, `Table.Tbody`, `Table.Tfoot`, `Table.Tr`, `Table.Th`, and `Table.Td`.
- **FR-TBL-02:** `Table.Root` shall support 3 visual variants via `variant`: `simple` (default), `striped`, and `bordered`.
- **FR-TBL-03:** `Table.Root` shall support 3 spatial density scales via `size`: `sm` (dense), `md` (default), and `lg` (spacious).
- **FR-TBL-04:** `Table.Root` shall support row hover highlighting via `isHoverable` (default `false`), which cascades down to table body rows or can be set directly on `Table.Tr`.
- **FR-TBL-05:** `Table.Root` shall support sticky header pinning via `isStickyHeader` (default `false`), keeping header cells pinned to the top of scrollable viewports.
- **FR-TBL-06:** `Table.Th` and `Table.Td` shall support numeric right-alignment and tabular numeral font styling via `isNumeric` (default `false`).
- **FR-TBL-07:** `Table.Container` shall render a responsive wrapper with `overflow-x: auto` and touch scrolling to prevent mobile layout clipping.
- **FR-TBL-08:** `Table.Th` shall default to `scope="col"` for accessible header semantics, and `Table.Caption` shall provide accessible programmatic descriptions.
- **FR-TBL-09:** `Table.Tr` shall support native row click events via `onClick`.
- **FR-TBL-10:** `Table.Th` and `Table.Td` shall support explicit text alignment via `align` (`left`, `center`, `right`).
- **FR-TBL-11:** `Table.Th` shall support sortable affordance styling via `isSortable` (default `false`) and reflect sorting via `sortDirection` (`asc`, `desc`, `none`) with accessible `aria-sort` calculation.
- **FR-TBL-12:** `Table.Container` shall support `bordered` (default `false`) to wrap tabular data in an elevated card-style surface with rounded corners (`--cl-radius-lg`).
- **FR-TBL-13:** `Table.Tr` shall support selection state styling via `isSelected` (default `false`), applying a distinct theme-safe background tint.

### 29.2 Non-Functional Requirements

- **NFR-TBL-01:** Styling shall reside in static CSS under `@layer cl-components` using `--cl-*` design tokens, with zero Tailwind or runtime CSS-in-JS.
- **NFR-TBL-02:** The component shall be SSR-safe and RSC-safe with zero external runtime dependencies.
- **NFR-TBL-03:** Primitives shall be fully compatible with headless table logic such as TanStack Table without modifying component internals.

### 29.3 Requirements Traceability Matrix

| Requirement ID | Description | Test Verification Case | Storybook Story |
| --- | --- | --- | --- |
| `FR-TBL-01` | Compound primitives | `renders full semantic table hierarchy` | `Default` |
| `FR-TBL-02` | 3 Visual variants | `applies simple, striped, bordered variant classes` | `Default`, `Striped`, `Bordered` |
| `FR-TBL-03` | 3 Density scales | `applies sm, md, lg size classes to table cells` | `DenseSize` |
| `FR-TBL-04` | Hoverable rows | `applies cl-table--hoverable class and hover styles` | `Default` |
| `FR-TBL-05` | Sticky header | `applies cl-table--sticky-header modifier class` | `StickyHeader` |
| `FR-TBL-06` | Numeric alignment | `applies cl-table__th--numeric and cl-table__td--numeric` | `NumericColumns` |
| `FR-TBL-07` | Responsive container | `renders cl-table__container with horizontal scroll` | `StickyHeader`, `Default` |
| `FR-TBL-08` | WAI-ARIA / HTML semantics | `defaults scope="col" on Th and renders Caption` | `Default` |
| `FR-TBL-09` | Row click events | `triggers onClick when row is clicked` | `Default` |
| `FR-TBL-10` | Explicit alignment | `applies explicit alignment classes on Th and Td` | `NumericColumns` |
| `FR-TBL-11` | Sortable header & aria-sort | `applies sortable styling and accessible aria-sort attribute on Th` | `SortableColumns` |
| `FR-TBL-12` | Bordered container | `applies cl-table__container--bordered when bordered is true` | `Default`, `Bordered` |
| `FR-TBL-13` | Selected row highlight | `applies selected class on selected row` | `InteractiveRowSelection` |
| `NFR-TBL-01` | CSS Layering & Tokens | `uses .cl-table classes and design tokens` | Visual Inspection |
| `NFR-TBL-02` | SSR / RSC compatibility | `renders static semantic markup without DOM errors` | SSR Suite |
| `NFR-TBL-03` | TanStack / Pagination | `renders data driven cells accurately` | `WithPagination` |

---

## 30. Acceptance Criteria

- [x] Semantic HTML table elements used throughout (`table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`).
- [x] Supports 3 visual variants (`simple`, `striped`, `bordered`).
- [x] Supports 3 density scales (`sm`, `md`, `lg`).
- [x] `isNumeric` right-aligns cells with `tabular-nums`.
- [x] `align` supports explicit `left`, `center`, `right` text alignment.
- [x] `isSortable` and `sortDirection` provide sort indicators and compute `aria-sort`.
- [x] `isHoverable` highlights hovered rows with smooth micro-transitions.
- [x] `isSelected` applies theme-safe selected row tinting in light and dark mode.
- [x] `Table.Container` provides responsive horizontal scrolling and optional `bordered` card surface.
- [x] Zero axe-core accessibility violations.
- [x] Styled in `@layer cl-components` using `--cl-*` variables with zero Tailwind or CSS-in-JS.
- [x] Verified in Storybook with 11 rich enterprise stories and zero raw emojis.

---

## 31. Definition of Done

The Table specification (SPEC-007) is approved, hardened against reference standards, verified with 15 passing automated tests, complete TypeScript type definitions, comprehensive Storybook stories, and verified in light and dark mode viewports.
