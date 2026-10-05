# Grid Component Specification (12-Column Responsive Grid System)

**Document Status:** Approved & Baseline  
**Phase:** Phase 1 — Layout & Typography Foundations  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Grid
Package Export:     import { Grid, type GridProps, type GridSize, type GridDirection, type GridWrap } from "@chellaa/react";
Category:           Layout & Primitives
Status:             Approved & Implementation Baseline
Phase:              Phase 1 — Layout & Typography Foundations
Related Components: Box, Flex, Stack, Container
```

---

## 2. Purpose

The `Grid` component provides the **two-dimensional (2D) fluid responsive layout grid system** for `@chellaa/react`. Modeled after the canonical Material Design 12-column fluid baseline, it allows engineers to partition visual space into fractional tracks, adapt column spans across 5 standard breakpoints (`xs`, `sm`, `md`, `lg`, `xl`), and manage horizontal and vertical gutter spacing.

By separating the responsibilities of grid composition into `container` (parent flex track) and `item` (child column span), `Grid` guarantees mathematical precision across fluid layouts while avoiding CSS fractional rounding bugs.

### When to Use

- **Multi-Column Content**: When content must break down into structured columns (e.g. 1 column on mobile, 2 columns on tablet, 3 or 4 columns on desktop: `xs={12} sm={6} md={3}`).
- **Dashboard & Card Layouts**: When laying out responsive metric tiles, form grids, or analytical charts that reflow at specific screen widths.
- **Asymmetrical Column Layouts**: When main content and sidebars share a single row with exact fractional ratios (e.g. `xs={12} md={8}` for primary feed, `xs={12} md={4}` for sticky sidebar).
- **Auto-Sizing & Equal-Width Columns**: When columns should automatically share the remaining available row width (`xs={true}` or `xs="auto"`).

### When NOT to Use

- **Do NOT use `Grid` for simple 1D linear alignment.** Use `Stack` or `Flex` when items flow in a single direction without multi-breakpoint column span requirements.
- **Do NOT use `Grid` as a tabular data display.** When displaying rows of structured tabular data, use `Table` (Tier 7 Enterprise Organism) to maintain full accessibility and screen reader table navigation.
- **Do NOT use `Grid` for viewport boundaries.** Use `Container` to establish page margins and maximum viewport boundaries.

---

## 3. Scope

### In Scope

1. **Dual Container/Item Model**: A single polymorphic component acting as a flex container (`container={true}`), a column item (`item={true}`), or both simultaneously for nested sub-grids.
2. **12-Column Fractional System**: Support for column numbers $1$ through $12$ per row (customizable via `columns` prop).
3. **Responsive Breakpoint Sizing**: Independent column spans for each breakpoint tier (`xs`, `sm`, `md`, `lg`, `xl`).
4. **Fluid Sizing Modes**:
   - Numeric span: `xs={6}` $\rightarrow$ `flex-basis: 50%; max-width: 50%;`.
   - Equal-width grow: `xs={true}` $\rightarrow$ `flex-grow: 1; flex-basis: 0; max-width: 100%;`.
   - Content-fit auto: `xs="auto"` $\rightarrow$ `flex-grow: 0; flex-basis: auto; max-width: none;`.
5. **Gutter Spacing Engine**: Support for universal `spacing`, distinct `rowSpacing`, and distinct `columnSpacing` mapped through the theme's 8px grid (`theme.spacing(n)`).
6. **Wrapping & Alignment**: Support for `wrap` (`"wrap" | "nowrap" | "wrap-reverse"`), `direction` (`"row" | "column"`), `alignItems`, and `justifyContent`.
7. **Polymorphism & Zero-DOM Composition**: Full `asChild` composition via `Slot`, `component`, and `as` element delegation.
8. **Emotion Theme Overrides**: Integration with `theme.components.ChellaaGrid.styleOverrides[slot]`.

### Out of Scope

- CSS Grid native `grid-template-areas` or named grid lines (reserved for specialized CSS Grid primitive if needed).
- Dynamic draggable column resizing or reordering (delegated to Table or Dashboard organism).

---

## 4. Non-Goals

- `Grid` does **NOT** rely on CSS Subgrid. It operates via modern flexbox mathematical tracks to ensure 100% cross-browser compatibility across legacy and modern rendering engines.
- `Grid` does **NOT** insert hidden wrapper elements between container and items.
- `Grid` does **NOT** require negative outer margins when using modern flex-gap (`gap`).

---

## 5. Feature Summary

| Feature | Capability | Implementation Detail |
| :--- | :--- | :--- |
| **Grid Base** | 12 Columns | Configurable via `columns` prop (e.g. 12, 16, 24) |
| **Breakpoints** | 5 Tiers | `xs` (0px), `sm` (600px), `md` (900px), `lg` (1200px), `xl` (1536px) |
| **Span Values** | `1..columns`, `true`, `"auto"` | Calculated via `Math.round((size / columns) * 10e7) / 10e5 + '%'` |
| **Gutters** | Row & Col Gaps | Mapped via `theme.spacing(n)` to CSS `gap`, `row-gap`, `column-gap` |
| **Nested Grids** | Supported | `<Grid item xs={6} container spacing={2}>` |
| **Polymorphism** | `asChild`, `component`, `as` | Zero-DOM delegation onto semantic tags (`section`, `article`, `ul`) |
| **Theme Overrides** | Full Emotion Support | `theme.components.ChellaaGrid.styleOverrides.root` |

---

## 6. Anatomy

### 12-Column Responsive Track Anatomy

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Grid Container (display: flex; flex-wrap: wrap; width: 100%; gap: spacing)             │
│                                                                                        │
│  ┌───────────────────────┐  gap  ┌───────────────────────┐  gap  ┌──────────────────┐  │
│  │ Grid Item             │ ◄───► │ Grid Item             │ ◄───► │ Grid Item        │  │
│  │ xs={12} md={4}        │       │ xs={12} md={4}        │       │ xs={12} md={4}   │  │
│  │ (33.333% width on md) │       │ (33.333% width on md) │       │ (33.333% width)  │  │
│  └───────────────────────┘       └───────────────────────┘       └──────────────────┘  │
│                                                                                        │
│  ┌───────────────────────────────────────────────────┐  gap  ┌──────────────────────┐  │
│  │ Grid Item: xs={12} md={8}                         │ ◄───► │ Grid Item: md={4}    │  │
│  │ (66.666% width on md)                             │       │ (33.333% width on md)│  │
│  └───────────────────────────────────────────────────┘       └──────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Column Sizing Mathematics & Breakpoint Rules

### 7.1. Sizing Formulas (Based on $C = \text{columns}$, Default 12)

| Prop Value | Formula / CSS Properties | Visual Result |
| :--- | :--- | :--- |
| `size = n` ($1 \le n \le C$) | `flex-basis: ${(n / C) * 100}%; max-width: ${(n / C) * 100}%; flex-grow: 0;` | Exact fractional column width (e.g. $6 \rightarrow 50\%$, $4 \rightarrow 33.33\%$). |
| `size = true` | `flex-basis: 0; flex-grow: 1; max-width: 100%;` | Equal width sharing; absorbs remaining row space proportionally. |
| `size = "auto"` | `flex-basis: auto; flex-grow: 0; max-width: none;` | Shrink-wraps natural content width without wrapping unnecessarily. |

### 7.2. Breakpoint Inheritance Cascade

In accordance with mobile-first CSS architecture, breakpoint rules cascade upward unless overridden by a larger breakpoint:

- If `xs={12}` and `md={6}` are declared:
  - `<600\text{px}` (`xs`): $12$ columns ($100\%$).
  - $600\text{px} - 899\text{px}` (`sm`): Inherits `xs` $\rightarrow 12$ columns ($100\%$).
  - $900\text{px} - 1199\text{px}` (`md`): Explicitly set to $6$ columns ($50\%$).
  - $\ge 1200\text{px}` (`lg`, `xl`): Inherits `md` $\rightarrow 6$ columns ($50\%$).

---

## 8. Component States & Behavior

### 8.1. Independent Row and Column Gaps

When designs require differing horizontal and vertical gutters:

```tsx
<Grid container rowSpacing={4} columnSpacing={2}>
  <Grid item xs={6}>Cell A</Grid>
  <Grid item xs={6}>Cell B</Grid>
  <Grid item xs={6}>Cell C</Grid>
  <Grid item xs={6}>Cell D</Grid>
</Grid>
```
- Compiles to `row-gap: 32px; column-gap: 16px;`.

### 8.2. Nested Sub-Grids

A `Grid` element can function simultaneously as an `item` (sizing within its parent) and a `container` (distributing its own children):

```tsx
<Grid container spacing={2}>
  <Grid item xs={12} md={6} container spacing={1}>
    <Grid item xs={6}>Sub 1</Grid>
    <Grid item xs={6}>Sub 2</Grid>
  </Grid>
</Grid>
```

---

## 9. Accessibility & WAI-ARIA Standards

- **Layout Grids vs. Data Grids**: The `Grid` component is strictly for **visual layout and content arrangement**. It does NOT apply `role="grid"` or `role="gridcell"`, because in WAI-ARIA, `role="grid"` represents interactive composite spreadsheet-like widgets (with cell focus management and arrow-key cell navigation).
- **Semantic Lists**: When rendering collections of cards or article summaries, engineers should compose semantic lists:
  ```tsx
  <Grid container component="ul" spacing={3}>
    <Grid item component="li" xs={12} sm={6} md={4}>
      <Card>Card 1</Card>
    </Grid>
  </Grid>
  ```
- **Landmark Sections**: Major page layout partitions should use `component="section"` or `component="aside"` with appropriate `aria-label` or `aria-labelledby`.

---

## 10. API Specification & TypeScript Contracts

```ts
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import type { ResponsiveValue, SxProps } from "../../system/types";

export type GridSize = boolean | "auto" | number;
export type GridWrap = "nowrap" | "wrap" | "wrap-reverse";
export type GridDirection = "row" | "row-reverse" | "column" | "column-reverse";

export interface GridOwnerState {
  /**
   * If true, enables flex container behavior (display: flex; flex-wrap: wrap).
   * @default false
   */
  container?: boolean | undefined;

  /**
   * If true, enables column item behavior (box-sizing: border-box;).
   * @default false
   */
  item?: boolean | undefined;

  /**
   * Total number of fractional columns in the grid track.
   * @default 12
   */
  columns?: number | undefined;

  /**
   * Gutter spacing factor applied across both row and column axes.
   * Numbers map to 8px theme spacing grid (e.g. 2 -> 16px).
   */
  spacing?: ResponsiveValue<number | string> | undefined;

  /**
   * Gutter spacing factor applied strictly between rows (row-gap).
   */
  rowSpacing?: ResponsiveValue<number | string> | undefined;

  /**
   * Gutter spacing factor applied strictly between columns (column-gap).
   */
  columnSpacing?: ResponsiveValue<number | string> | undefined;

  /**
   * Flex direction of the grid container.
   * @default "row"
   */
  direction?: ResponsiveValue<GridDirection> | undefined;

  /**
   * Flex wrap behavior of the grid container.
   * @default "wrap"
   */
  wrap?: GridWrap | undefined;

  /**
   * Cross-axis alignment of items in the container.
   */
  alignItems?: ResponsiveValue<CSSProperties["alignItems"]> | undefined;

  /**
   * Main-axis distribution of items in the container.
   */
  justifyContent?: ResponsiveValue<CSSProperties["justifyContent"]> | undefined;

  /**
   * Column span on extra-small screens (< 600px).
   * Number 1..12, true (flex-grow), or "auto".
   */
  xs?: GridSize | undefined;

  /**
   * Column span on small screens (600px - 899px).
   */
  sm?: GridSize | undefined;

  /**
   * Column span on medium screens (900px - 1199px).
   */
  md?: GridSize | undefined;

  /**
   * Column span on large screens (1200px - 1535px).
   */
  lg?: GridSize | undefined;

  /**
   * Column span on extra-large screens (>= 1536px).
   */
  xl?: GridSize | undefined;
}

export interface GridProps
  extends HTMLAttributes<HTMLElement>,
    GridOwnerState {
  /**
   * If true, delegates rendering to immediate child element using Slot.
   * @default false
   */
  asChild?: boolean | undefined;

  /**
   * The underlying HTML element or component to render.
   * @default "div"
   */
  component?: ElementType | undefined;

  /**
   * Alias for component.
   */
  as?: ElementType | undefined;

  /**
   * The system-aware sx prop.
   */
  sx?: SxProps;

  /**
   * Grid content.
   */
  children?: ReactNode | undefined;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Grid` is implemented with the Emotion `styled()` factory and `shouldForwardProp`:

```ts
const StyledGridRoot = styled("div", {
  name: "ChellaaGrid",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "container" &&
    prop !== "item" &&
    prop !== "columns" &&
    prop !== "spacing" &&
    prop !== "rowSpacing" &&
    prop !== "columnSpacing" &&
    prop !== "direction" &&
    prop !== "wrap" &&
    prop !== "alignItems" &&
    prop !== "justifyContent" &&
    prop !== "xs" &&
    prop !== "sm" &&
    prop !== "md" &&
    prop !== "lg" &&
    prop !== "xl" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: GridOwnerState }>(({ theme, ownerState }) => {
  const styles: Record<string, any> = {
    boxSizing: "border-box",
  };

  const columns = ownerState.columns ?? 12;

  // Container styling
  if (ownerState.container) {
    styles.display = "flex";
    styles.flexWrap = ownerState.wrap ?? "wrap";
    styles.width = "100%";

    if (ownerState.direction) {
      Object.assign(styles, parseSx(theme, { flexDirection: ownerState.direction }));
    }
    if (ownerState.spacing !== undefined) {
      Object.assign(styles, parseSx(theme, { gap: ownerState.spacing }));
    }
    if (ownerState.rowSpacing !== undefined) {
      Object.assign(styles, parseSx(theme, { rowGap: ownerState.rowSpacing }));
    }
    if (ownerState.columnSpacing !== undefined) {
      Object.assign(styles, parseSx(theme, { columnGap: ownerState.columnSpacing }));
    }
    if (ownerState.alignItems) {
      Object.assign(styles, parseSx(theme, { alignItems: ownerState.alignItems }));
    }
    if (ownerState.justifyContent) {
      Object.assign(styles, parseSx(theme, { justifyContent: ownerState.justifyContent }));
    }
  }

  // Item breakpoint styling
  const bpSizes: Record<BreakpointKey, GridSize | undefined> = {
    xs: ownerState.xs,
    sm: ownerState.sm,
    md: ownerState.md,
    lg: ownerState.lg,
    xl: ownerState.xl,
  };

  for (const bp of breakpointKeys) {
    const size = bpSizes[bp];
    if (size !== undefined) {
      const sizeStyles = generateGridSizeStyles(size, columns);
      if (bp === "xs") {
        Object.assign(styles, sizeStyles);
      } else {
        const media = theme.breakpoints.up(bp);
        styles[media] = {
          ...(styles[media] || {}),
          ...sizeStyles,
        };
      }
    }
  }

  return styles;
});
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Semantic Article Cards

```tsx
<Grid container component="section" aria-label="Latest News" spacing={3}>
  {posts.map((post) => (
    <Grid key={post.id} item component="article" xs={12} sm={6} lg={4}>
      <Card>
        <CardContent>{post.title}</CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
```

### 12.2. Zero-DOM `asChild` Delegation

```tsx
<Grid container asChild spacing={2}>
  <main id="main-content">
    <Grid item xs={12} md={8}>Main Feed</Grid>
    <Grid item xs={12} md={4}>Sidebar</Grid>
  </main>
</Grid>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **Row Overflow ($\sum \text{spans} > 12$)** | Elements gracefully wrap to next row. | `flex-wrap: wrap` automatically wraps exceeding column spans. |
| **Custom Column Base (`columns={16}`)** | Correctly scales to $16$ columns. | Math formulas use `(size / columns) * 100%` rather than hardcoding $12$. |
| **Simultaneous `spacing` and `rowSpacing`** | `rowSpacing` overrides vertical gap; `columnSpacing` overrides horizontal gap. | Explicit assignment precedence in style interpolation. |
| **Zero Spacing (`spacing={0}`)** | Sets gap to 0px without stripping styling. | `spacing !== undefined` check preserves numeric `0`. |
| **Isolated Unit Testing** | Rendered without wrapping `<ThemeProvider>`. | `styled` factory automatically falls back to `defaultTheme`. |

---

## 14. Testing Verification Matrix

Every implementation of `Grid` must satisfy this 100% test contract:

1. **Container Rendering**:
   - `container={true}` applies `display: flex; flex-wrap: wrap; width: 100%;`.
2. **Item Sizing**:
   - `xs={12}` yields `max-width: 100%; flex-basis: 100%; flex-grow: 0;`.
   - `xs={6}` yields `max-width: 50%; flex-basis: 50%; flex-grow: 0;`.
   - `xs={true}` yields `flex-grow: 1; flex-basis: 0; max-width: 100%;`.
   - `xs="auto"` yields `flex-grow: 0; flex-basis: auto; max-width: none;`.
3. **Responsive Breakpoints**:
   - Generates `@media (min-width: ...)` queries for `sm`, `md`, `lg`, `xl`.
4. **Spacing Engine**:
   - `spacing={2}` yields `gap: 16px`.
   - `rowSpacing={3}` yields `row-gap: 24px`.
5. **Polymorphism**:
   - `component="section"` renders `<section>`.
   - `asChild` transfers classes and props directly onto child element.
6. **DOM Cleanliness**:
   - Grid props (`container`, `item`, `columns`, `xs`, `sm`, `md`, `lg`, `xl`, `spacing`) do NOT leak to DOM attributes.
7. **Accessibility**:
   - Passes automated `vitest-axe` checks with 0 violations.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/Grid/
├── Grid.tsx          # Grid component implementation with forwardRef & Emotion styled factory
├── Grid.test.tsx     # Vitest unit test suite (100% pass)
├── Grid.stories.tsx  # Storybook stories (12-column, auto-sizing, responsive spans, gutters)
└── index.ts          # Clean public exports (Grid, GridProps, GridSize, GridDirection, GridWrap)
```
