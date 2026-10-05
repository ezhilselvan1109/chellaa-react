# Container Component Specification (Fluid & Fixed Centered Viewport Container)

**Document Status:** Approved & Baseline  
**Phase:** Phase 1 — Layout & Typography Foundations  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Container
Package Export:     import { Container, type ContainerProps, type ContainerOwnerState } from "@chellaa/react";
Category:           Layout & Primitives
Status:             Approved & Implementation Baseline
Phase:              Phase 1 — Layout & Typography Foundations
Related Components: Box, Flex, Stack, Grid
```

---

## 2. Purpose

The `Container` component is the foundational **horizontal viewport boundary and centering primitive** of the `@chellaa/react` design system. It establishes structured maximum line widths and ergonomic reading boundaries for page content, dashboards, articles, and application shells.

By pairing responsive horizontal gutters with configurable maximum width caps and automated horizontal margin distribution (`margin-left: auto; margin-right: auto;`), `Container` prevents wide-screen reading fatigue, stabilizes grid tracks, and harmonizes page padding across mobile, tablet, and ultra-wide desktop monitors.

### When to Use

- **Top-Level Page Boundaries**: Wrapping page body content (`<main>`, `<section>`) to prevent text paragraphs and interactive widgets from stretching indefinitely on 2K/4K displays.
- **Header & Footer Shells**: Constraining top application bars and site footers to match the exact content grid width of the main content column.
- **Reading Columns & Long-Form Articles**: Restricting text content to optimal typography widths (`maxWidth="md"` / 900px or `maxWidth="sm"` / 600px) for maximum readability.
- **Stepped Pixel Layouts**: When enterprise dashboard designs require discrete breakpoint snap widths (`fixed={true}`) instead of continuous fluid stretching.

### When NOT to Use

- **Do NOT use `Container` for internal 1D component spacing.** Use `Stack` or `Flex` to space buttons, list items, or form rows.
- **Do NOT use `Container` for multi-column grid tracks.** Use `Grid` to partition content into 12 fractional columns.
- **Do NOT use `Container` for full-bleed backgrounds.** Render the background styling on an unconstrained parent (or `<Box width="100%" bgcolor="...">`), placing `<Container>` inside it to constrain the inner content.

---

## 3. Scope

### In Scope

1. **Fluid Maximum Width Capping**: Support for all 5 standard theme breakpoint tokens (`xs`, `sm`, `md`, `lg`, `xl`) and unconstrained fluid mode (`maxWidth={false}`).
2. **Stepped Fixed-Width Scaling (`fixed`)**: Discrete breakpoint snapping at each tier up to `maxWidth`, providing fixed pixel widths matching `theme.breakpoints.values`.
3. **Adaptive Fluid Gutters**: Mobile-first responsive horizontal padding (16px on mobile `<600px`, 24px on tablet/desktop `≥600px`) synchronized with the 8px theme spacing grid.
4. **Gutter Suppression (`disableGutters`)**: Zeroing horizontal padding for full-bleed nested components, hero headers, or nested layout grids.
5. **Polymorphism & Zero-DOM Composition**: Full `asChild` composition via `Slot`, plus `component` and `as` element delegation onto semantic HTML5 landmarks (`<main>`, `<header>`, `<footer>`, `<section>`).
6. **Emotion Theme Integration**: Styled via the Emotion `styled()` factory with DOM prop filtering (`shouldForwardProp`) and theme overrides via `theme.components.ChellaaContainer.styleOverrides.root`.

### Out of Scope

- Vertical viewport centering (delegated to `Flex` with `justifyContent="center"` or `alignItems="center"`).
- Infinite scroll virtualization (delegated to Table or VirtualList organisms).
- Responsive breakpoint changes to `maxWidth` itself (e.g. `maxWidth={{ xs: "sm", md: "lg" }}` is redundant; `maxWidth` inherently defines the upper ceiling).

---

## 4. Non-Goals

- `Container` does **NOT** establish CSS Grid or Flex tracks on its own children; it renders with `display: block; width: 100%;` to preserve natural document flow.
- `Container` does **NOT** introduce negative margins. Gutter management is strictly additive (`padding-left`, `padding-right`).
- `Container` does **NOT** enforce fixed heights or overflow clipping.

---

## 5. Feature Summary

| Feature | Capability | Implementation Detail |
| :--- | :--- | :--- |
| **Max Width Capping** | `xs`, `sm`, `md`, `lg`, `xl`, `false` | Sets `max-width: ${theme.breakpoints.values[maxWidth]}px` (default: `"lg"` / 1200px) |
| **Fixed Stepping** | `fixed={true}` | Dynamically generates media queries for each breakpoint tier up to `maxWidth` |
| **Fluid Gutters** | Responsive (16px $\rightarrow$ 24px) | `padding: 0 theme.spacing(2)` on `xs`; `padding: 0 theme.spacing(3)` on `sm+` |
| **Gutter Toggle** | `disableGutters={true}` | Removes horizontal padding (`paddingLeft: 0; paddingRight: 0;`) |
| **Centering** | Automatic | `margin-left: auto; margin-right: auto; width: 100%;` |
| **Polymorphism** | `asChild`, `component`, `as` | Zero-DOM delegation onto semantic tags (`main`, `section`, `article`) |
| **Theme Overrides** | Full Emotion Support | `theme.components.ChellaaContainer.styleOverrides.root` |

---

## 6. Anatomy

### Viewport Boundary & Responsive Gutter Anatomy

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Browser Viewport (Window Width: 100vw)                                                 │
│                                                                                        │
│        auto margin         ┌───────────────────────────────┐        auto margin        │
│ ◄────────────────────────► │ Container Boundary            │ ◄───────────────────────► │
│                            │ (width: 100%; max-width: lg)  │                           │
│                            │                               │                           │
│                            │  gutter     Content    gutter │                           │
│                            │ ◄──────► ┌───────────┐ ◄────► │                           │
│                            │  16px /  │ Page Body │  16px /│                           │
│                            │  24px    │ Content   │  24px  │                           │
│                            │          └───────────┘        │                           │
│                            └───────────────────────────────┘                           │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Viewport Mathematics & Breakpoint Scaling Rules

### 7.1. MaxWidth Token Resolution

The `maxWidth` prop maps directly to the theme's breakpoint scale:

| `maxWidth` Value | Resolved CSS `max-width` | Typical Content Type |
| :--- | :--- | :--- |
| `"xs"` | `0px` (or clamped to fluid mobile) | Dialogs, mini modals |
| `"sm"` | `600px` | Long-form reading, single-column forms, authentication cards |
| `"md"` | `900px` | Blog articles, documentation prose, settings panels |
| `"lg"` *(default)* | `1200px` | Standard marketing pages, landing heroes, multi-column dashboards |
| `"xl"` | `1536px` | Dense data tables, wide analytical dashboards, IDE workspaces |
| `false` | `none` (100% fluid) | Full-width applications that still require standard responsive gutters |

### 7.2. Fluid Mode vs. Fixed Step Scaling Mode

#### Fluid Scaling (`fixed={false}`, Default)
In fluid mode, the container expands continuously at $100\%$ width until it reaches the declared `maxWidth` ceiling, where it remains centered:
$$\text{width} = \min(100\%, \text{breakpoints}[maxWidth])$$

```css
/* maxWidth="lg", fixed=false */
width: 100%;
margin-left: auto;
margin-right: auto;
max-width: 1200px;
```

#### Fixed Step Scaling (`fixed={true}`)
In fixed mode, the container snaps discretely to each breakpoint tier rather than continuously stretching:

```css
/* maxWidth="lg", fixed=true */
width: 100%;
margin-left: auto;
margin-right: auto;

@media (min-width: 600px) {
  max-width: 600px;
}
@media (min-width: 900px) {
  max-width: 900px;
}
@media (min-width: 1200px) {
  max-width: 1200px;
}
```
*Note: Once the viewport surpasses the declared `maxWidth` tier, stepping stops and the container stays pinned at that ceiling.*

### 7.3. Adaptive Gutter Mathematics

Gutters are derived mathematically from the theme's 8px spacing grid:

| Breakpoint Tier | Spacing Token | CSS Value | Visual Rationale |
| :--- | :--- | :--- | :--- |
| `xs` ($< 600\text{px}$) | `theme.spacing(2)` | `16px` | Maximizes usable horizontal screen real-estate on mobile phones |
| `sm+` ($\ge 600\text{px}$) | `theme.spacing(3)` | `24px` | Provides generous negative space on tablets, laptops, and desktop monitors |

When `disableGutters={true}` is set:
$$\text{padding-left} = 0; \quad \text{padding-right} = 0;$$

---

## 8. Component States & Behavior

### 8.1. Full-Bleed Section Breakout Pattern

A frequent enterprise requirement is rendering full-bleed hero sections or colored backgrounds while maintaining aligned content grids:

```tsx
<Box component="section" sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: 8 }}>
  <Container maxWidth="lg">
    <Typography variant="h1">Hero Title</Typography>
    <Typography variant="body1">Hero subtitle aligned with the page container.</Typography>
  </Container>
</Box>
```

### 8.2. Unconstrained Gutter Container (`maxWidth={false}`)

When a dashboard requires full viewport width across high-resolution displays but must still preserve standard edge gutters:

```tsx
<Container maxWidth={false}>
  <DashboardToolbar />
  <Grid container spacing={3}>
    {/* Full-width analytical grid */}
  </Grid>
</Container>
```

### 8.3. Nested Container Gutter Suppression

When embedding a container inside another container (e.g. in modular layout templates), inner containers should suppress gutters to avoid double-padding:

```tsx
<Container maxWidth="lg">
  {/* Outer container provides 24px gutters */}
  <Container disableGutters maxWidth="md">
    {/* Inner reading column aligns flush with outer grid */}
    <ArticleContent />
  </Container>
</Container>
```

---

## 9. Accessibility & WAI-ARIA Standards

- **Zero Layout Role Interference**: By default, `Container` renders as a semantic `<div>` with no ARIA role. It does **not** inject `role="region"` or `role="group"` unless explicitly instructed via props, avoiding landmark noise for screen reader users.
- **Landmark Role Delegation**: When acting as a structural page section, developers should compose semantic HTML5 elements:
  - `<Container component="main" id="main-content">`: Designated primary content landmark.
  - `<Container component="header">`: Application or page header.
  - `<Container component="footer">`: Site footer landmark.
  - `<Container component="section" aria-labelledby="section-heading">`: Named document section.
- **Skip Link Target**: When `Container` is rendered as the primary `<main>` element, it serves as the natural target for keyboard skip-to-content links (`<a href="#main-content">Skip to content</a>`).

---

## 10. API Specification & TypeScript Contracts

```ts
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { BreakpointKey } from "../../theme/types";
import type { SxProps } from "../../system/types";

export interface ContainerOwnerState {
  /**
   * Determine the maximum-width of the container.
   * The container width grows with the size of the screen up to the specified breakpoint.
   * Set to `false` to disable maxWidth and allow 100% fluid expansion.
   * @default "lg"
   */
  maxWidth?: BreakpointKey | false | undefined;

  /**
   * If `true`, the container will snap to discrete fixed pixel widths at each breakpoint tier
   * rather than expanding fluidly up to `maxWidth`.
   * @default false
   */
  fixed?: boolean | undefined;

  /**
   * If `true`, removes the fluid horizontal padding (gutters) from the container.
   * @default false
   */
  disableGutters?: boolean | undefined;
}

export interface ContainerProps
  extends HTMLAttributes<HTMLElement>,
    ContainerOwnerState {
  /**
   * If `true`, delegates rendering to immediate child element using Slot.
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
   * The system-aware sx prop for ad-hoc theme styling.
   */
  sx?: SxProps;

  /**
   * Container content.
   */
  children?: ReactNode | undefined;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Container` is engineered via the `@chellaa/react` Emotion `styled()` factory:

```ts
const StyledContainerRoot = styled("div", {
  name: "ChellaaContainer",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "maxWidth" &&
    prop !== "fixed" &&
    prop !== "disableGutters" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: ContainerOwnerState }>(({ theme, ownerState }) => {
  const styles: Record<string, any> = {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    boxSizing: "border-box",
    display: "block",
  };

  // 1. Gutters (fluid horizontal padding)
  if (!ownerState.disableGutters) {
    styles.paddingLeft = theme.spacing(2);
    styles.paddingRight = theme.spacing(2);

    const smMedia = theme.breakpoints.up("sm");
    styles[smMedia] = {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    };
  }

  // 2. MaxWidth / Fixed breakpoint step scaling
  const { maxWidth = "lg", fixed = false } = ownerState;

  if (maxWidth !== false) {
    if (fixed) {
      for (const bp of breakpointKeys) {
        const bpVal = theme.breakpoints.values[bp];
        if (bpVal !== 0) {
          const media = theme.breakpoints.up(bp);
          styles[media] = {
            ...(styles[media] || {}),
            maxWidth: `${bpVal}px`,
          };
        }
        if (bp === maxWidth) break;
      }
    } else {
      const bpKey = maxWidth as BreakpointKey;
      const bpVal = theme.breakpoints.values[bpKey];
      if (bpVal !== undefined && bpVal !== 0) {
        styles.maxWidth = `${bpVal}px`;
      }
    }
  }

  return styles;
});
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Semantic Page Shell (`component="main"`)

```tsx
<Container component="main" id="main-content" maxWidth="lg" sx={{ py: 6 }}>
  <Typography variant="h1">User Settings</Typography>
  <SettingsForm />
</Container>
```

### 12.2. Zero-DOM `asChild` Delegation

Using Radix-style `Slot` composition to project container styles directly onto another component without creating an additional wrapper `<div>`:

```tsx
<Container asChild maxWidth="md">
  <article className="prose">
    <h1>Article Title</h1>
    <p>Article body content...</p>
  </article>
</Container>
```

### 12.3. Embedding 12-Column Responsive Grid

```tsx
<Container maxWidth="xl">
  <Grid container spacing={4}>
    <Grid item xs={12} md={8}>
      <Card>Main Feed</Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card>Sidebar Widgets</Card>
    </Grid>
  </Grid>
</Container>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **Viewport Narrower Than `maxWidth`** | Width remains $100\%$ with fluid gutters; no horizontal scrollbar. | `width: 100%; box-sizing: border-box;` prevents content from overflowing the viewport. |
| **`maxWidth={false}`** | Disables `max-width` entirely while preserving responsive gutters. | Explicit `maxWidth !== false` check bypasses `max-width` assignment. |
| **`disableGutters` Combined with `sx={{ px: 4 }}`** | Developer `sx` prop takes precedence over default zero gutters. | `parseSx` executes after root ownerState style interpolation. |
| **Nested Containers** | Inner container renders cleanly without collapsing margins. | `margin: 0 auto; box-sizing: border-box;` preserves nesting stability. |
| **Isolated Unit Testing** | Rendered without wrapping `<ThemeProvider>`. | `styled` factory automatically falls back to `defaultTheme` (prevents `theme.spacing` crashes). |

---

## 14. Testing Verification Matrix

Every implementation of `Container` must satisfy this 100% test contract:

1. **Default Rendering**:
   - Renders a native `<div>` with `display: block; width: 100%; margin-left: auto; margin-right: auto;`.
   - Applies default `maxWidth="lg"` (`max-width: 1200px`).
   - Applies default gutters (`16px` on mobile, `24px` on `sm+`).
2. **MaxWidth Variations**:
   - `maxWidth="xs"`, `maxWidth="sm"`, `maxWidth="md"`, `maxWidth="lg"`, `maxWidth="xl"` resolve to correct pixel values.
   - `maxWidth={false}` omits `max-width` CSS property.
3. **Fixed Mode**:
   - `fixed={true}` generates ascending `@media (min-width: ...)` rules up to the specified `maxWidth`.
4. **Gutter Suppression**:
   - `disableGutters={true}` omits `padding-left` and `padding-right` from base and media query styles.
5. **Polymorphic Rendering**:
   - `component="main"` renders a `<main>` tag.
   - `asChild={true}` forwards styles and ref onto the child element without an intermediate `<div>`.
6. **DOM Hygiene**:
   - `maxWidth`, `fixed`, `disableGutters`, `asChild`, and `component` props do NOT leak to DOM attributes.
7. **Accessibility (`vitest-axe`)**:
   - Zero automated accessibility violations when tested with standard landmarks and headings.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/Container/
├── Container.tsx          # Implementation with forwardRef, Slot support, and Emotion styled factory
├── Container.test.tsx     # Vitest unit test suite (100% pass)
├── Container.stories.tsx  # Storybook stories (fluid, fixed, disableGutters, maxWidth variants)
└── index.ts              # Public exports (Container, ContainerProps, ContainerOwnerState)
```
