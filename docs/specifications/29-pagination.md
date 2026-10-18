# Pagination Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 6 / Phase 5 Navigation & Rich Controls)  
**Specification ID:** SPEC-029  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P2 Medium  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-css-delivery.md](../adr/ADR-007-css-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Chellaa Design Tokens (`--cl-*`), `useControllableState` hook, React 18/19  

---

## 1. Identity

```text
Component Name:     Pagination (Compound Architecture: Pagination.Root, Pagination.Prev, Pagination.Next, Pagination.First, Pagination.Last, Pagination.Item, Pagination.Ellipsis, Pagination.SizeSelect, Pagination.Jumper)
Specification ID:   SPEC-029
Package Export:     import { Pagination, PaginationRoot, PaginationList, PaginationItem, PaginationPrev, PaginationNext, PaginationFirst, PaginationLast, PaginationEllipsis, PaginationSizeSelect, PaginationJumper, type PaginationProps, type PaginationItemProps, type PaginationSizeSelectProps } from "@chellaa/react";
Category:           Navigation / Data Display
Status:             Approved & Implementation Ready
Phase:              Phase 5 — Navigation & Rich Controls
Priority:           P2 Medium
Version:            1.1.0 (Integrated Select Architecture)
Related Components: Table, Select, Button, Input
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-010 (Floating UI Overlay Positioning), ADR-011 (Hybrid Styling Architecture)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
When data tables, customer directories, order histories, and search engines return thousands of records, displaying all items on a single page ruins network performance and degrades browser rendering speed.

Manual pagination controls introduce recurring engineering and accessibility bugs:
1. Missing semantic navigation containers (`<nav aria-label="Pagination">`) makes pagination invisible to screen reader landmark navigation.
2. Missing `aria-current="page"` prevents screen reader users from identifying the active page.
3. Inaccurate ellipsis calculation causes layout overflow or confusing page jumps.
4. Hardcoded button designs prevent visual harmonization with existing design system buttons and inputs.
5. Inconsistent page-size dropdowns: rendering native `<select>` or custom unstyled menus clashes with design tokens, lacks floating positioning, causes clipping in overflow containers, and duplicates keyboard navigation logic.

The `Pagination` component solves this by providing a composable, accessible page navigation system featuring deterministic ellipsis truncation algorithms, page jumper controls, seamless integration with `@chellaa/react`'s shared `Select` component for page-size selection, and complete keyboard ergonomics.

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI system whose core strength is data density and tables, `@chellaa/react` must offer a first-class pagination engine that pairs seamlessly with headless data tables (e.g. TanStack Table) and our [`Table`](./07-table.md) primitive, while strictly reusing shared primitives such as [`Select`](./08-select.md) to prevent duplicated dropdown, listbox, or overlay code.

### 2.3 When to Use
- Navigating multi-page data tables, search result feeds, and catalog grids.
- Dividing any collection exceeding 20–50 items into manageable chunks.
- Providing user control over items-per-page using enterprise dropdowns.

### 2.4 When NOT to Use
- **Do NOT use Pagination for continuous scrolling feeds (infinite scroll).**
- **Do NOT use Pagination for multi-step wizards.** Use `Stepper`.
- **Do NOT use Pagination when data is under 10–20 items.** Render the complete list directly.

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Structure):** Composable structure: `Pagination.Root`, `Pagination.Prev`, `Pagination.Next`, `Pagination.First`, `Pagination.Last`, `Pagination.Item`, `Pagination.Ellipsis`, `Pagination.SizeSelect`, `Pagination.Jumper`.
- **FR-02 (Truncation Algorithm):** Calculates visible page buttons using `total`, `pageSize`, `siblingCount` (default: 1), and `boundaryCount` (default: 1), inserting ellipsis indicators (`Pagination.Ellipsis`) when ranges exceed the window.
- **FR-03 (Semantic HTML Navigation):** Root renders semantic `<nav aria-label="Pagination">` with internal unordered list `<ul role="list">`.
- **FR-04 (Accessible Page Marking):** Active page button receives `aria-current="page"` and high-contrast active styling.
- **FR-05 (Boundary Disablement):** Previous button disabled on page 1; Next button disabled on the final page (`aria-disabled="true"`).
- **FR-06 (Sizes & Variants):**
  - Sizes: `sm` (28px), `md` (36px, default), `lg` (44px).
  - Variants: `outline` (default), `solid`, `ghost`, `subtle`.
- **FR-07 (Controlled & Uncontrolled):** Controlled via `page` + `onPageChange`; uncontrolled via `defaultPage`.
- **FR-08 (Select Component Reuse):** `<Pagination.SizeSelect />` strictly reuses `@chellaa/react`'s `Select` compound primitive (`Select.Root`, `Select.Trigger`, `Select.Value`, `Select.Icon`, `Select.Portal`, `Select.Content`, `Select.Item`). It does NOT render native `<select>` or build custom popovers.
- **FR-09 (Page Size State Transitions):** When page size changes:
  1. Updates internal `pageSize` state.
  2. Notifies `onPageSizeChange(newPageSize)`.
  3. Recalculates `newTotalPages = Math.max(1, Math.ceil(total / newPageSize))`.
  4. If `currentPage > newTotalPages`, clamps active page to `newTotalPages`. Otherwise retains current active page.
- **FR-10 (No Overlay Clipping):** Because `Pagination.SizeSelect` uses `Select.Portal`, the dropdown listbox renders in document body with Floating UI (ADR-010), preventing clipping within tables or pagination containers.
- **FR-11 (Quick Jumper):** Optional `<Pagination.Jumper />` numeric input with Enter key submission.

### 3.2 Non-Functional Requirements
- **NFR-01 (Touch Targets):** All page trigger buttons and select triggers satisfy minimum 32px × 32px touch target requirements (or standard compact size scaling).
- **NFR-02 (No Duplicate Primitives):** Dropdown overlay, listbox, focus management, and positioning are completely delegated to `Select`.

---

## 4. Non-Goals
- Server-side data fetching orchestration (Pagination is purely client-side presentational and stateful).
- Implementing a custom dropdown, listbox, or popover inside Pagination.

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **Ellipsis Windowing** | Truncates long page ranges | Standard sliding window algorithm |
| **WAI-ARIA Navigation** | Strict `<nav>` landmark semantics | `aria-label="Pagination"`, `aria-current="page"` |
| **Shared Select Reuse** | Integrated items-per-page dropdown | Composes `@chellaa/react`'s `Select` primitive |
| **Portal Overlay** | Unclipped dropdown menu | Rendered via `Select.Portal` to document body |
| **Safe Page Clamping** | Prevents out-of-bounds page state | Clamps `currentPage <= newTotalPages` |
| **Direct Jumper** | Type-in page jump box | Numeric input with Enter key submit |
| **TanStack Compatible** | Pairs with headless table state | Simple `pageIndex` / `pageCount` binding |

---

## 6. Anatomy

```text
<Pagination.Root page={3} total={250} pageSize={10}>
  <nav aria-label="Pagination" className="cl-pagination cl-pagination--md cl-pagination--outline">
    <ul className="cl-pagination__list" role="list">
      <li className="cl-pagination__list-item"><Pagination.Prev className="cl-pagination__prev" /></li>
      <li className="cl-pagination__list-item"><Pagination.Item page={1}>1</Pagination.Item></li>
      <li className="cl-pagination__list-item"><Pagination.Ellipsis /></li>
      <li className="cl-pagination__list-item"><Pagination.Item page={2}>2</Pagination.Item></li>
      <li className="cl-pagination__list-item"><Pagination.Item page={3} isCurrent>3</Pagination.Item></li>
      <li className="cl-pagination__list-item"><Pagination.Item page={4}>4</Pagination.Item></li>
      <li className="cl-pagination__list-item"><Pagination.Ellipsis /></li>
      <li className="cl-pagination__list-item"><Pagination.Item page={25}>25</Pagination.Item></li>
      <li className="cl-pagination__list-item"><Pagination.Next className="cl-pagination__next" /></li>
    </ul>
    
    <!-- Reused Select Primitive -->
    <Pagination.SizeSelect options={[10, 20, 50, 100]} />
      ↳ <Select.Root value="10" size="md">
          <Select.Trigger aria-label="Page size" className="cl-pagination__size-select-trigger">
            <Select.Value>10 / page</Select.Value>
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="cl-pagination__size-select-content">
              <Select.Item value="10">10 / page</Select.Item>
              <Select.Item value="20">20 / page</Select.Item>
              ...
            </Select.Content>
          </Select.Portal>
        </Select.Root>

    <Pagination.Jumper />
  </nav>
</Pagination.Root>
```

---

## 7. Public API Specification

### 7.1 Props Interface
```typescript
export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "outline" | "solid" | "ghost" | "subtle";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  total: number;
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  size?: PaginationSize;
  variant?: PaginationVariant;
  isDisabled?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showQuickJumper?: boolean;
  children?: React.ReactNode;
}

export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: number;
  isCurrent?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface PaginationSizeSelectProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Available page size options. Default [10, 20, 50, 100] */
  options?: number[] | undefined;
  /** Optional callback fired when page size changes */
  onChange?: ((pageSize: number) => void) | undefined;
  /** Accessible label for the select trigger button. Default "Page size" */
  "aria-label"?: string | undefined;
  /** Whether the selector is disabled */
  isDisabled?: boolean | undefined;
}
```

### 7.2 Tabular Props Dictionary

| Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- |
| `total` | `number` | — | Total count of data items | Used for page count math |
| `pageSize` | `number` | `10` | Number of items per page | Used for page count math |
| `page` | `number` | `undefined` | Controlled active page number | Sets `aria-current="page"` |
| `defaultPage` | `number` | `1` | Uncontrolled initial page | None |
| `onPageChange` | `(page: number) => void` | `undefined` | Callback fired on page switch | None |
| `onPageSizeChange` | `(pageSize: number) => void` | `undefined` | Callback fired on page size switch | None |
| `siblingCount` | `number` | `1` | Number of siblings around active page | Governs window size |
| `boundaryCount`| `number` | `1` | Number of boundary pages shown | Governs edge buttons |
| `size` | `PaginationSize` | `"md"` | Button & select trigger dimensions (`sm`, `md`, `lg`)| Sizing scale |
| `variant` | `PaginationVariant` | `"outline"` | Visual button style | None |
| `showSizeChanger` | `boolean` | `false` | Renders the shared Select page-size selector | Select dropdown |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Available page size numbers | Select menu items |
| `showQuickJumper` | `boolean` | `false` | Renders direct page number jumper input | Jump input |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Pagination/Pagination.types.ts

import * as React from "react";

export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "outline" | "solid" | "ghost" | "subtle";

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
```

---

## 9. Variants & Visual States

- **`outline` (Default):** White/transparent button background with `--cl-color-border-subtle`; active page has `--cl-color-primary-solid` border and text.
- **`solid`:** Active page has solid filled primary background with white text.
- **`subtle`:** Soft background tint for hover/active states.
- **`ghost`:** Borderless buttons until hovered.

---

## 10. Sizes & Metrics

| Size | Button Height | Button Min-Width | Font Size |
| :--- | :--- | :--- | :--- |
| `sm` | 28px | 28px | 12px |
| `md` | 36px | 36px | 14px |
| `lg` | 44px | 44px | 16px |

---

## 11. States & Pseudo-Classes

- Active: `aria-current="page"`, highlighted border/fill.
- Disabled: `opacity: 0.5`, `pointer-events: none`.
- Focus-Visible: `outline: 2px solid var(--cl-ring-color)`.

---

## 12. Behavioral Specification

- Clicking a page button updates `page` state.
- Clicking Prev on page 1 does nothing; Prev is disabled.
- Jumper input validates number bounds (`1 <= N <= totalPages`).
- **Page Size Select Integration (`Pagination.SizeSelect`):**
  - Reuses the shared `Select` component (`Select.Root`, `Select.Trigger`, `Select.Value`, `Select.Icon`, `Select.Portal`, `Select.Content`, `Select.Item`).
  - When a user selects a new page size `S`:
    1. Triggers `setPageSize(S)`.
    2. Calls `onPageSizeChange(S)` callback if provided.
    3. Computes `newTotalPages = Math.max(1, Math.ceil(total / S))`.
    4. If the active `currentPage > newTotalPages`, clamps active page by calling `setPage(newTotalPages)`.
    5. If `currentPage <= newTotalPages`, retains the current page.
  - Page size dropdown options default to `[10, 20, 50, 100]`.
  - The dropdown content is portaled to `document.body` via `Select.Portal`, preventing clipping in constrained containers or tables.

---

## 13. Controlled / Uncontrolled State Behavior

Managed via [`useControllableState`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useControllableState.ts).
- `page` / `defaultPage`: Active page number.
- `pageSize`: Controlled via `pageSize` prop or internally tracked when `onPageSizeChange` is fired.

---

## 14. Events Contract

- `onPageChange(page: number)`: Fired with integer page value.
- `onPageSizeChange(pageSize: number)`: Fired when page size dropdown changes with the new numerical page size.

---

## 15. Composition & Slot Delegation

- Can compose standalone subcomponents or render a simplified auto-generated layout `<Pagination total={100} showSizeChanger />`.
- `<Pagination.SizeSelect />` can be placed anywhere inside `<Pagination.Root>`.

---

## 16. Ref Contract

- Forwarded ref on `PaginationRoot` binds to the `<nav>` element.
- Forwarded ref on `PaginationSizeSelect` binds to the `Select.Trigger` `<button>` element.

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Semantic Landmark:** Enclosed in `<nav aria-label="Pagination">`.
2. **List Semantics:** Page buttons placed inside `<ul role="list">` and `<li>`.
3. **Current Page:** Active page has `aria-current="page"`.
4. **Descriptive Labels:** Prev button has `aria-label="Go to previous page"`; Next button has `aria-label="Go to next page"`.
5. **Select Combobox Semantics:**
   - The page-size trigger renders a `<button role="combobox" aria-haspopup="listbox" aria-expanded="..." aria-label="Page size">`.
   - The portaled menu renders `<div role="listbox">` with `<div role="option" aria-selected="...">`.
   - All accessibility requirements (aria-activedescendant, accessible naming, roving focus) are maintained by the shared `Select` component.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `Tab` | Moving through page buttons & controls | Focuses each button/trigger in sequence |
| `Enter` / `Space` | Focus on Page Item | Navigates to that page |
| `Enter` / `Space` | Focus on SizeSelect Trigger | Opens the page size dropdown listbox |
| `ArrowDown` / `ArrowUp` | SizeSelect Trigger / Listbox | Navigates between page size options (`10 / page`, `20 / page`, etc.) |
| `Enter` / `Space` | Highlighted SizeSelect Option | Selects the page size, updates pagination, and closes dropdown |
| `Escape` | SizeSelect Open | Closes the dropdown and returns focus to trigger |

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

```css
@layer cl-components {
  .cl-pagination {
    display: flex;
    align-items: center;
    gap: var(--cl-space-3, 12px);
    font-family: var(--cl-font-family-sans);
  }

  .cl-pagination__list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--cl-space-1, 4px);
  }

  .cl-pagination__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 var(--cl-space-2, 8px);
    border: 1px solid var(--cl-color-border-subtle);
    border-radius: var(--cl-radius-md, 6px);
    background-color: var(--cl-color-bg-surface);
    color: var(--cl-color-text-primary);
    font-size: var(--cl-font-size-sm, 14px);
    font-weight: var(--cl-font-weight-medium, 500);
    cursor: pointer;
    outline: none;
    transition: all var(--cl-duration-fast, 150ms) ease;
  }

  .cl-pagination__item:hover:not([disabled]) {
    background-color: var(--cl-color-bg-subtle);
    border-color: var(--cl-color-border-strong);
  }

  .cl-pagination__item[aria-current="page"] {
    background-color: var(--cl-color-primary-solid);
    border-color: var(--cl-color-primary-solid);
    color: #ffffff;
    font-weight: var(--cl-font-weight-semibold, 600);
  }

  .cl-pagination__item:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .cl-pagination__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--cl-color-text-secondary);
  }

  /* Integrated Select styling within Pagination */
  .cl-pagination__size-select-root {
    display: inline-flex;
    align-items: center;
  }

  .cl-pagination__size-select-trigger {
    min-width: 100px;
  }
}
```

---

## 20. Theme Contract

Adapts automatically via `--cl-color-primary-solid`, `--cl-color-bg-surface`, `--cl-color-border-subtle`, and `--cl-color-text-primary`.

---

## 21. Responsive Behavior

On mobile screens (< 480px), sibling count reduces to 0 (shows only active page, Prev, Next).

---

## 22. Motion & Animations

Subtle hover color transitions (150ms). Select dropdown handles its own scale/fade animations via `--cl-duration-fast`.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Page Calculation** | Total 100, PageSize 10 | Displays 10 total pages |
| **2. Page Click** | Click Page 2 | `onPageChange(2)` fired; Page 2 has `aria-current="page"` |
| **3. Prev Disabled** | On Page 1 | Prev button has `disabled` attribute |
| **4. Next Disabled** | On Page 10 | Next button has `disabled` attribute |
| **5. Ellipsis Insert** | Total 1000 on Page 1 | Inserts ellipsis between Page 3 and Page 100 |
| **6. Select Integration** | Render `showSizeChanger` | Renders `Select.Trigger` with `role="combobox"` and `aria-label="Page size"` |
| **7. Select Value Update** | Open dropdown & select `20 / page` | Calls `onPageSizeChange(20)`, recalculates total pages to 5 |
| **8. Page Clamping** | Page 10 of 100 (size 10), change size to 50 | Total pages becomes 2, active page clamps to 2 |
| **9. Accessibility** | Run `axe(container)` | Zero accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Pagination/Pagination.stories.tsx`:
1. `Default`: Basic 10-page pagination.
2. `ManyPages`: 100-page pagination showing ellipsis.
3. `WithSizeChanger`: Pagination composing the shared Select dropdown for page-size control.
4. `WithJumper`: Pagination with quick jumper input.
5. `AllSizes`: `sm`, `md`, `lg`.

---

## 25. Documentation Reqs

API dictionary, Select integration patterns, TanStack Table integration example, and accessibility notes.

---

## 26. Edge Cases & Hazards

1. `total <= pageSize`: Renders clean single-page inactive navigation or hides automatically if configured.
2. `pageSize` change when `currentPage > newTotalPages`: Clamps current page to `newTotalPages` to prevent displaying an invalid empty page.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Pagination | Ant Design Pagination |
| :--- | :--- | :--- | :--- |
| **Architecture** | Compound + auto layout | Monolithic | Monolithic |
| **Page Size Selector** | Composes shared `Select` primitive | Separate select component | Ant Select integration |
| **Semantics** | `<nav>` with `<ul role="list">` | `<nav>` with `<ul>` | `<ul>` without `<nav>` |
| **Styling** | Scoped static CSS | Emotion | Less |

---

## 28. Deferred Features

- Mini compact pagination for mobile cards (Phase 6).

---

## 29. Acceptance Criteria

- [x] Compound structure implemented (`Pagination.Root`, `Pagination.Prev`, etc.).
- [x] Windowing calculation with ellipsis compression.
- [x] Strict `<nav aria-label="Pagination">` and `aria-current="page"`.
- [x] Controlled and uncontrolled support.
- [x] Reuses `@chellaa/react`'s shared `Select` component for `<Pagination.SizeSelect />`.
- [x] Dropdown portaled to document body without overflow clipping.
- [x] Page clamping correctly adjusts active page if page count decreases.
- [x] Zero axe accessibility violations.
- [x] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Pagination/
├── Pagination.tsx
├── Pagination.types.ts
├── Pagination.styles.css
├── Pagination.test.tsx
├── Pagination.stories.tsx
└── index.ts
```

### 30.2 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| Semantic Landmark | Document 04 (A11y) | Workflow F | Nav landmark with aria-current="page" |
| Dual State Management | Document 02 (React Standards)| Workflow F | useControllableState page control |
| Select Reuse | Engineering Mandate | Workflow F | Composes shared Select component |
| Scoped CSS | ADR-007, ADR-011 | Workflow F | Authored in `@layer cl-components` |
| Portal Overlay | ADR-010 | Workflow F | Select.Portal prevents clipping |
