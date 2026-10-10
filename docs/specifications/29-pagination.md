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
Component Name:     Pagination (Compound Architecture: Pagination.Root, Pagination.Prev, Pagination.Next, Pagination.Item, Pagination.Ellipsis, Pagination.SizeSelect, Pagination.Jumper)
Specification ID:   SPEC-029
Package Export:     import { Pagination, type PaginationProps, type PaginationItemProps } from "@chellaa/react";
Category:           Navigation / Data Display
Status:             Approved & Implementation Ready
Phase:              Phase 5 — Navigation & Rich Controls
Priority:           P2 Medium
Version:            1.0.0
Related Components: Table, Select, Button, Input
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-011 (Hybrid Styling Architecture)
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

The `Pagination` component solves this by providing a composable, accessible page navigation system featuring deterministic ellipsis truncation algorithms, page jumper controls, page size selector integration, and complete keyboard ergonomics.

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI system whose core strength is data density and tables, `@chellaa/react` must offer a first-class pagination engine that pairs seamlessly with headless data tables (e.g. TanStack Table) and our [`Table`](./07-table.md) primitive.

### 2.3 When to Use
- Navigating multi-page data tables, search result feeds, and catalog grids.
- Dividing any collection exceeding 20–50 items into manageable chunks.

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
  - Sizes: `sm`, `md`, `lg`.
  - Variants: `outline`, `solid`, `ghost`, `subtle`.
- **FR-07 (Controlled & Uncontrolled):** Controlled via `page` + `onPageChange`; uncontrolled via `defaultPage`.
- **FR-08 (Quick Jumper & Page Size Selector):** Optional `<Pagination.Jumper />` input and `<Pagination.SizeSelect />` dropdown.

### 3.2 Non-Functional Requirements
- **NFR-01 (Touch Targets):** All page trigger buttons satisfy minimum 32px × 32px touch target requirements.

---

## 4. Non-Goals
- Server-side data fetching orchestration (Pagination is purely client-side presentational and stateful).

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **Ellipsis Windowing** | Truncates long page ranges | Standard sliding window algorithm |
| **WAI-ARIA Navigation** | Strict `<nav>` landmark semantics | `aria-label="Pagination"`, `aria-current="page"` |
| **Page Size Selector** | Integrated items-per-page dropdown | Consumes `onPageSizeChange` |
| **Direct Jumper** | Type-in page jump box | Numeric input with Enter key submit |
| **TanStack Compatible** | Pairs with headless table state | Simple `pageIndex` / `pageCount` binding |

---

## 6. Anatomy

```text
<Pagination.Root page={3} total={250} pageSize={10}>
  <nav aria-label="Pagination" className="cl-pagination">
    <ul className="cl-pagination__list">
      <li><Pagination.Prev className="cl-pagination__prev" /></li>
      <li><Pagination.Item page={1}>1</Pagination.Item></li>
      <li><Pagination.Ellipsis /></li>
      <li><Pagination.Item page={2}>2</Pagination.Item></li>
      <li><Pagination.Item page={3} isCurrent>3</Pagination.Item></li>
      <li><Pagination.Item page={4}>4</Pagination.Item></li>
      <li><Pagination.Ellipsis /></li>
      <li><Pagination.Item page={25}>25</Pagination.Item></li>
      <li><Pagination.Next className="cl-pagination__next" /></li>
    </ul>
    <Pagination.SizeSelect />
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
  showQuickJumper?: boolean;
  children?: React.ReactNode;
}

export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: number;
  isCurrent?: boolean;
  children?: React.ReactNode;
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
| `siblingCount` | `number` | `1` | Number of siblings around active page | Governs window size |
| `boundaryCount`| `number` | `1` | Number of boundary pages shown | Governs edge buttons |
| `size` | `PaginationSize` | `"md"` | Button dimensions (`sm`, `md`, `lg`)| None |
| `variant` | `PaginationVariant` | `"outline"` | Visual button style | None |

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
  size: PaginationSize;
  variant: PaginationVariant;
  isDisabled: boolean;
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
- Jumper input validates number bounds (1 <= N <= totalPages).

---

## 13. Controlled / Uncontrolled State Behavior

Managed via [`useControllableState`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/hooks/useControllableState.ts).

---

## 14. Events Contract

- `onPageChange(page: number)`: Fired with integer page value.
- `onPageSizeChange(size: number)`: Fired when page size dropdown changes.

---

## 15. Composition & Slot Delegation

- Can compose standalone subcomponents or render a simplified auto-generated layout `<Pagination total={100} />`.

---

## 16. Ref Contract

- Forwarded ref binds to `<nav>` element.

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Semantic Landmark:** Enclosed in `<nav aria-label="Pagination">`.
2. **List Semantics:** Page buttons placed inside `<ul role="list">` and `<li>`.
3. **Current Page:** Active page has `aria-current="page"`.
4. **Descriptive Labels:** Prev button has `aria-label="Go to previous page"`; Next button has `aria-label="Go to next page"`.

---

## 18. Keyboard Interaction Keymap

| Key | Context | Action |
| :--- | :--- | :--- |
| `Tab` | Moving through page buttons | Focuses each button in sequence |
| `Enter` / `Space` | Focus on Page Item | Navigates to that page |

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

Subtle hover color transitions (150ms).

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Page Calculation** | Total 100, PageSize 10 | Displays 10 total pages |
| **2. Page Click** | Click Page 2 | `onPageChange(2)` fired; Page 2 has `aria-current="page"` |
| **3. Prev Disabled** | On Page 1 | Prev button has `disabled` attribute |
| **4. Next Disabled** | On Page 10 | Next button has `disabled` attribute |
| **5. Ellipsis Insert** | Total 1000 on Page 1 | Inserts ellipsis between Page 3 and Page 100 |
| **6. Accessibility** | Run `axe(container)` | Zero accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Pagination/Pagination.stories.tsx`:
1. `Default`: Basic 10-page pagination.
2. `ManyPages`: 100-page pagination showing ellipsis.
3. `WithJumper`: Pagination with quick jumper input.
4. `AllSizes`: `sm`, `md`, `lg`.

---

## 25. Documentation Reqs

API dictionary, TanStack Table integration example, and accessibility notes.

---

## 26. Edge Cases & Hazards

1. `total <= pageSize`: Renders clean single-page inactive navigation or hides automatically if configured.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Pagination | Ant Design Pagination |
| :--- | :--- | :--- | :--- |
| **Architecture** | Compound + auto layout | Monolithic | Monolithic |
| **Semantics** | `<nav>` with `<ul role="list">` | `<nav>` with `<ul>` | `<ul>` without `<nav>` |
| **Styling** | Scoped static CSS | Emotion | Less |

---

## 28. Deferred Features

- Mini compact pagination for mobile cards (Phase 6).

---

## 29. Acceptance Criteria

- [ ] Compound structure implemented (`Pagination.Root`, `Pagination.Prev`, etc.).
- [ ] Windowing calculation with ellipsis compression.
- [ ] Strict `<nav aria-label="Pagination">` and `aria-current="page"`.
- [ ] Controlled and uncontrolled support.
- [ ] Zero axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

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
| Scoped CSS | ADR-007, ADR-011 | Workflow F | Authored in `@layer cl-components` |
