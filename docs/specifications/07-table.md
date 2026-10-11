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

### `Table.Root` Props

```typescript
export interface TableRootProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  size?: TableSize;
  isHoverable?: boolean;
  isStickyHeader?: boolean;
}
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Table.Root Props                                     │
├─────────────────┬─────────────────────────┬──────────┬───────────┬──────────────────────┤
│ Prop Name       │ Type                    │ Req/Opt  │ Default   │ A11y Impact          │
├─────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────────┤
│ variant         │ TableVariant            │ Optional │ "simple"  │ Visual styling       │
├─────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────────┤
│ size            │ TableSize               │ Optional │ "md"      │ Spatial padding      │
├─────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────────┤
│ isHoverable     │ boolean                 │ Optional │ false     │ Row hover highlights │
├─────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────────┤
│ isStickyHeader  │ boolean                 │ Optional │ false     │ Pins header on scroll│
└─────────────────┴─────────────────────────┴──────────┴───────────┴──────────────────────┘
```

---

## 8. TypeScript Types

```typescript
export type TableVariant = "simple" | "striped" | "bordered";
export type TableSize = "sm" | "md" | "lg";

export interface TableRootProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Visual aesthetic treatment of the table.
   * @default "simple"
   */
  variant?: TableVariant;

  /**
   * Spatial density scale governing padding.
   * @default "md"
   */
  size?: TableSize;

  /**
   * If true, enables background hover transitions on table body rows.
   * @default false
   */
  isHoverable?: boolean;

  /**
   * If true, pins the table header row to the top of the scrolling container.
   * @default false
   */
  isStickyHeader?: boolean;
}

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * If true, aligns text to the right and applies tabular-nums font styling.
   * @default false
   */
  isNumeric?: boolean;
}

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * If true, aligns text to the right and applies tabular-nums font styling.
   * @default false
   */
  isNumeric?: boolean;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Standard React mouse click event on table row.
   */
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
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
  .cl-table__container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .cl-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--cl-font-sans);
    text-align: left;
  }

  .cl-table__th {
    font-weight: 600;
    color: var(--cl-color-fg-primary);
    border-bottom: 2px solid var(--cl-color-border-sub);
    padding: var(--cl-space-3) var(--cl-space-4);
  }

  .cl-table__td {
    color: var(--cl-color-fg-second);
    border-bottom: 1px solid var(--cl-color-border-sub);
    padding: var(--cl-space-3) var(--cl-space-4);
  }

  .cl-table__th--numeric,
  .cl-table__td--numeric {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* Striped Variant */
  .cl-table--striped tbody tr:nth-child(even) {
    background-color: var(--cl-color-bg-surface);
  }

  /* Hoverable rows */
  .cl-table--hoverable tbody tr:hover {
    background-color: var(--cl-color-bg-muted);
  }

  /* Sticky Header */
  .cl-table--sticky-header thead th {
    position: sticky;
    top: 0;
    background-color: var(--cl-color-bg-canvas);
    z-index: 1;
  }
}
```

---

## 20. Theme Contract

- Zebra stripes and row hovers use semantic background tokens (`--cl-color-bg-surface`, `--cl-color-bg-muted`), rendering cleanly in both Light and Dark modes.

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

1. `Default`: Simple table with user records.
2. `Striped`: Zebra striped table.
3. `Bordered`: Table with full grid borders.
4. `DenseSize`: Small `size="sm"` table for data grids.
5. `NumericColumns`: Financial table showing right-aligned numbers.
6. `StickyHeader`: Scrollable container with sticky header.
7. `DarkTheme`: Verified under Dark Mode surface contrast.

---

## 25. Documentation Requirements

- Live example of TanStack Table integration.
- Props API table for all compound elements.
- Accessibility best practices (caption and scope attributes).

---

## 26. Edge Cases

1. **Table Cell Content Truncation:** Large text cells must support ellipsis without breaking table column proportions.
2. **Mobile Overflow:** Always recommend wrapping tables in `Table.Container`.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Table Reference Comparison Matrix                    │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ Table / TableHead │ Table (columns[])  │ Compound HTML Table primitives│
│ TableContainer    │ -                  │ Table.Container               │
│ -                 │ pagination         │ Headless TanStack Table model │
│ -                 │ rowSelection       │ Handled via cell composition  │
│ asChild           │ -                  │ Rejected (Strict table parser)│
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Built-in Data Grid Engine:** Complex client-side filtering and sorting are handled via headless TanStack Table composition.

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
| `NFR-TBL-01` | CSS Layering & Tokens | `uses .cl-table classes and design tokens` | Visual Inspection |
| `NFR-TBL-02` | SSR / RSC compatibility | `renders static semantic markup without DOM errors` | SSR Suite |
| `NFR-TBL-03` | TanStack compatibility | `renders data driven cells accurately` | HeadlessIntegration |

---

## 30. Acceptance Criteria

- [x] Semantic HTML table elements used throughout.
- [x] Supports 3 variants (`simple`, `striped`, `bordered`).
- [x] Supports 3 sizes (`sm`, `md`, `lg`).
- [x] `isNumeric` right-aligns cells with `tabular-nums`.
- [x] `isHoverable` highlights hovered rows.
- [x] `Table.Container` provides responsive horizontal scrolling.
- [x] Zero axe-core accessibility violations.
- [x] Styled in `@layer cl-components` using `--cl-*` variables.

---

## 31. Definition of Done

The Table specification (SPEC-007) is approved, hardened against reference libraries, verified for cross-document consistency, and ready for Phase 6 implementation.
