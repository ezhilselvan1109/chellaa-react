# Divider Component Specification (Semantic Content & Layout Separator)

**Document Status:** Approved & Baseline  
**Phase:** Phase 1 — Layout & Typography Foundations  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Divider
Package Export:     import { Divider, type DividerProps, type DividerOwnerState, type DividerOrientation, type DividerVariant, type DividerTextAlign } from "@chellaa/react";
Category:           Layout & Primitives
Status:             Approved & Implementation Baseline
Phase:              Phase 1 — Layout & Typography Foundations
Related Components: Box, Flex, Stack, Container, Typography
```

---

## 2. Purpose

The `Divider` component renders a **semantic, thin visual boundary** that segments content, lists, toolbars, and layout groupings. Modeled after the canonical Material Design structural line specifications, `Divider` brings visual hierarchy to complex layouts without introducing heavy containers or borders.

`Divider` seamlessly adapts across orientations (horizontal vs. vertical), layout flex tracks (via `flexItem` height stretching), typographic sub-headers/labels (`textAlign="left" | "center" | "right"`), inset alignments (e.g. aligning with avatar list items), and line styles (`solid`, `dashed`, `dotted`).

### When to Use

- **Section Separation**: Placing a semantic horizontal rule between distinct sections of an article, settings form, or card surface.
- **List Item Boundaries**: Insetting dividers within list views (`variant="inset"`) to align dividers precisely with text baselines while leaving avatar gutters clear.
- **Toolbar & Action Segmentation**: Placing vertical separators (`orientation="vertical"` with `flexItem`) between groups of buttons in a toolbar, header, or filter bar.
- **Intercalated Form Dividers with Labels**: Inserting labeled divider chips (e.g. `<Divider>OR</Divider>`) in authentication screens and search dialogs.

### When NOT to Use

- **Do NOT use `Divider` purely to create whitespace.** Use `Stack` with `spacing` or `Box` with `margin` instead of empty dividers.
- **Do NOT use `Divider` as a container border.** Use the `border` or `borderBottom` utility in `Box` or `Paper` when framing cards or tiles.
- **Do NOT use `Divider` to construct data tables.** Use `Table` primitives for tabular row borders.

---

## 3. Scope

### In Scope

1. **Dual Orientation**:
   - `horizontal` (default): Uses native `<hr>` or `<div>` with `width: 100%`.
   - `vertical`: Renders vertical line with `align-self: stretch; height: auto; min-height: 100%;`.
2. **Material Inset Variants**:
   - `fullWidth` (default): Edge-to-edge separation ($0\text{px}$ horizontal margins).
   - `inset`: $72\text{px}$ left margin (Material Design avatar alignment).
   - `middle`: Symmetrical spacing from both edges (`theme.spacing(2)`).
3. **Children with Sub-Header / Label Chips**:
   - Renders child content (labels, badges, icons) flanked by auto-scaling hairline tracks.
   - Configurable alignment: `textAlign="center"` (default), `"left"`, or `"right"`.
4. **Line Styles & Subtle Mode**:
   - Line styles: `"solid" | "dashed" | "dotted"`.
   - `light={true}`: Softened border contrast for dense card surfaces and dark mode.
5. **Flexbox Container Integration (`flexItem`)**:
   - Automatically stretches vertical dividers to match parent flex container height.
6. **WAI-ARIA Accessibility**:
   - Automatic semantic `<hr>` rendering or `role="separator"` with `aria-orientation`.
7. **Polymorphic Zero-DOM Composition**:
   - Support for `asChild` via `Slot`, `component`, and `as`.
8. **Emotion Theme Overrides**:
   - Styled via Emotion `styled()`, hookable at `theme.components.ChellaaDivider.styleOverrides.root`.

### Out of Scope

- Multi-step progress steppers (delegated to `Stepper` organism).
- Interactive sliding resizers (delegated to Splitter/Resizable organism).

---

## 4. Non-Goals

- `Divider` does **NOT** hardcode dark mode styles; it dynamically resolves `theme.palette.divider`.
- `Divider` does **NOT** mutate the parent container's layout model or overflow properties.
- `Divider` does **NOT** insert external font icons automatically; icon chips are passed as `children`.

---

## 5. Feature Summary

| Feature | Values | Description |
| :--- | :--- | :--- |
| **Orientation** | `"horizontal"` \| `"vertical"` | Dictates horizontal width or vertical flex height stretching |
| **Variant** | `"fullWidth"` \| `"inset"` \| `"middle"` | Governs edge insets (`72px` avatar inset, `16px` middle inset) |
| **Line Style** | `"solid"` \| `"dashed"` \| `"dotted"` | Controls border-style decoration |
| **Flex Item** | `boolean` | Stretches vertical divider to fill parent flex container |
| **Children / Label** | `ReactNode` | Embeds text or chip between split hairline tracks |
| **Text Align** | `"center"` \| `"left"` \| `"right"` | Positions label within split divider track |
| **Light Mode** | `boolean` | Softens divider opacity for subtle surfaces |
| **Polymorphism** | `asChild`, `component`, `as` | Zero-DOM delegation onto custom elements |

---

## 6. Anatomy

### Horizontal Divider Anatomy (Plain vs. With Children)

```
Plain Horizontal:
──────────────────────────────────────────────────────────────────────────
(border-bottom: 1px solid theme.palette.divider)

Horizontal with Label (textAlign="center"):
─────── hairline ───────  ┌──────────────┐  ─────── hairline ───────
(flex: 1; border-bottom)  │  OR / Label  │  (flex: 1; border-bottom)
                          └──────────────┘

Horizontal with Label (textAlign="left"):
──  ┌──────────────┐  ──────────────────────────────────────────────────
    │  OR / Label  │  (flex: 0.95; border-bottom)
    └──────────────┘
```

### Vertical Divider Anatomy (In Flex Container)

```
┌──────────────────────────────────────────────────────────────┐
│ Flex Container (direction="row")                             │
│                                                              │
│  ┌───────────┐      │ (border-right: 1px solid) ┌───────────┐│
│  │ Action A  │      │ align-self: stretch;      │ Action B  ││
│  │           │      │ height: auto;             │           ││
│  └───────────┘      │                           └───────────┘│
└──────────────────────────────────────────────────────────────┘
```

---

## 7. Mathematics & Inset Rules

### 7.1. Thickness & Spacing Formulas

- **Default Hairline Thickness**: $1\text{px}$ solid border.
- **Divider Color Resolution**: `theme.palette.divider` (`rgba(0, 0, 0, 0.12)` in light mode, `rgba(255, 255, 255, 0.12)` in dark mode).
- **Light Divider**: When `light={true}`, color resolves with attenuated alpha (`rgba(..., 0.06)`).

### 7.2. Variant Insets

| Variant | Orientation | Left Margin / Inset | Right Margin / Inset | Visual Use Case |
| :--- | :--- | :--- | :--- | :--- |
| `fullWidth` | `horizontal` | `0px` | `0px` | Standard full-bleed page/card divider |
| `inset` | `horizontal` | `72px` | `0px` | Aligning with list items with leading avatar (`56px` + `16px`) |
| `middle` | `horizontal` | `theme.spacing(2)` (16px) | `theme.spacing(2)` (16px) | Contained cards, popovers, dropdown menus |
| `middle` | `vertical` | `0px` | `0px` (Y: `8px`) | Inset toolbar dividers |

---

## 8. Component States & Behavior

### 8.1. Native `<hr>` vs. `<div>` Flex Track Switching

- **When `children` are omitted and `orientation="horizontal"`**:
  - Renders as a native `<hr>` tag.
  - Benefits: Zero extra DOM nodes, built-in screen reader semantics, optimal browser performance.
- **When `children` are supplied**:
  - Renders as a `<div>` with `display: flex; align-items: center; text-align: center;`.
  - Injects `::before` and `::after` pseudo-elements (or span tracks) with `border-bottom: 1px solid theme.palette.divider;`.
  - Child content is wrapped in a dedicated wrapper with horizontal padding (`theme.spacing(1.5)`).
- **When `orientation="vertical"`**:
  - Renders as a `<div>` with `display: inline-block; border-right: 1px solid ...`.
  - Adds `role="separator"` and `aria-orientation="vertical"`.

### 8.2. Flex Item Height Stretching

In a horizontal flex container (`<Stack direction="row">` or `<Flex>`):
```tsx
<Flex align="center" gap={2}>
  <Button variant="ghost">Cut</Button>
  <Button variant="ghost">Copy</Button>
  <Divider orientation="vertical" flexItem />
  <Button variant="ghost">Paste</Button>
</Flex>
```
Without `flexItem`, a vertical divider collapses to $0\text{px}$ height. `flexItem` applies `alignSelf: "stretch"; height: "auto";`, automatically matching the height of adjacent interactive buttons.

---

## 9. Accessibility & WAI-ARIA Standards

- **Semantic `<hr>` Role**:
  - Native `<hr>` elements possess an implicit WAI-ARIA role of `separator`.
- **Non-Native Vertical Dividers**:
  - When rendering as a `<div>` (`orientation="vertical"` or when `children` are present), the component explicitly applies:
    - `role="separator"`
    - `aria-orientation="vertical"` (or `"horizontal"`)
- **Decorative Dividers**:
  - For purely decorative lines that should not be announced by screen readers, developers can set `aria-hidden="true"`.

---

## 10. API Specification & TypeScript Contracts

```ts
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { SxProps } from "../../system/types";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "fullWidth" | "inset" | "middle";
export type DividerTextAlign = "center" | "left" | "right";
export type DividerLineStyle = "solid" | "dashed" | "dotted";

export interface DividerOwnerState {
  /**
   * The orientation of the divider.
   * @default "horizontal"
   */
  orientation?: DividerOrientation | undefined;

  /**
   * The variant style of the divider.
   * @default "fullWidth"
   */
  variant?: DividerVariant | undefined;

  /**
   * The line style of the divider.
   * @default "solid"
   */
  lineStyle?: DividerLineStyle | undefined;

  /**
   * If true, stretches a vertical divider to fit its parent flex container.
   * @default false
   */
  flexItem?: boolean | undefined;

  /**
   * If true, softens the divider opacity for subtle card surfaces.
   * @default false
   */
  light?: boolean | undefined;

  /**
   * Text alignment when children are rendered inside the divider.
   * @default "center"
   */
  textAlign?: DividerTextAlign | undefined;

  /**
   * Internal flag indicating whether children/label are present.
   */
  hasChildren?: boolean | undefined;
}

export interface DividerProps
  extends HTMLAttributes<HTMLElement>,
    DividerOwnerState {
  /**
   * If true, delegates rendering to immediate child element using Slot.
   * @default false
   */
  asChild?: boolean | undefined;

  /**
   * The underlying HTML element or component to render.
   * Defaults to "hr" for horizontal without children, "div" otherwise.
   */
  component?: ElementType | undefined;

  /**
   * Alias for component.
   */
  as?: ElementType | undefined;

  /**
   * The system-aware sx prop for ad-hoc styling.
   */
  sx?: SxProps;

  /**
   * Label content to embed within the divider track.
   */
  children?: ReactNode | undefined;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Divider` is implemented with Emotion `styled()` and `shouldForwardProp`:

```ts
const StyledDividerRoot = styled("hr", {
  name: "ChellaaDivider",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "orientation" &&
    prop !== "variant" &&
    prop !== "lineStyle" &&
    prop !== "flexItem" &&
    prop !== "light" &&
    prop !== "textAlign" &&
    prop !== "hasChildren" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: DividerOwnerState }>(({ theme, ownerState }) => {
  const isVertical = ownerState.orientation === "vertical";
  const borderCol = ownerState.light
    ? "rgba(0, 0, 0, 0.06)"
    : theme.palette.divider;
  const lineStyle = ownerState.lineStyle ?? "solid";

  const styles: Record<string, any> = {
    margin: 0,
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: lineStyle,
    borderColor: borderCol,
  };

  if (!ownerState.hasChildren) {
    if (isVertical) {
      styles.borderRightWidth = "1px";
      styles.height = "auto";
      styles.alignSelf = ownerState.flexItem ? "stretch" : "auto";
      styles.display = "inline-block";
      if (ownerState.variant === "middle") {
        styles.marginTop = theme.spacing(1);
        styles.marginBottom = theme.spacing(1);
      }
    } else {
      styles.borderBottomWidth = "1px";
      styles.width = "100%";
      styles.display = "block";
      if (ownerState.variant === "inset") {
        styles.marginLeft = "72px";
      } else if (ownerState.variant === "middle") {
        styles.marginLeft = theme.spacing(2);
        styles.marginRight = theme.spacing(2);
      }
    }
  } else {
    // Divider with children
    styles.display = "flex";
    styles.alignItems = "center";
    styles.textAlign = ownerState.textAlign ?? "center";
    styles.border = "none";
    styles.width = "100%";

    const beforeFlex =
      ownerState.textAlign === "left"
        ? "0.05"
        : ownerState.textAlign === "right"
          ? "0.95"
          : "1";
    const afterFlex =
      ownerState.textAlign === "left"
        ? "0.95"
        : ownerState.textAlign === "right"
          ? "0.05"
          : "1";

    styles["&::before"] = {
      content: '""',
      flex: beforeFlex,
      borderBottom: `1px ${lineStyle} ${borderCol}`,
    };

    styles["&::after"] = {
      content: '""',
      flex: afterFlex,
      borderBottom: `1px ${lineStyle} ${borderCol}`,
    };
  }

  return styles;
});
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Inset List Item Dividers

```tsx
<List>
  <ListItem>
    <Avatar src="/user.jpg" />
    <ListItemText primary="Jane Doe" secondary="Software Architect" />
  </ListItem>
  <Divider variant="inset" component="li" />
  <ListItem>
    <Avatar src="/user2.jpg" />
    <ListItemText primary="John Smith" secondary="Product Designer" />
  </ListItem>
</List>
```

### 12.2. Toolbar Separator (`orientation="vertical" flexItem`)

```tsx
<Flex align="center" gap={1} sx={{ p: 1, bgcolor: "background.paper", borderRadius: 1 }}>
  <IconButton aria-label="Format Bold"><BoldIcon /></IconButton>
  <IconButton aria-label="Format Italic"><ItalicIcon /></IconButton>
  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
  <IconButton aria-label="Align Left"><AlignLeftIcon /></IconButton>
  <IconButton aria-label="Align Center"><AlignCenterIcon /></IconButton>
</Flex>
```

### 12.3. Authentication Splitter with Label

```tsx
<Stack spacing={2} sx={{ width: 360 }}>
  <Button variant="outline" fullWidth>Continue with Google</Button>
  <Button variant="outline" fullWidth>Continue with GitHub</Button>
  <Divider>OR</Divider>
  <TextField label="Email" fullWidth />
  <Button variant="primary" fullWidth>Sign In with Password</Button>
</Stack>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **Vertical Divider in Flex Row** | Stretches to fill row height without collapsing. | `flexItem` applies `alignSelf: stretch; height: auto;`. |
| **Long Text in Divider Label** | Hairlines shrink while text wraps cleanly. | Flex layout on pseudo-elements with `flex-shrink: 1;`. |
| **`variant="inset"` with Children** | Left pseudo-element absorbs inset margin. | Calculates inset on `&::before` margin or padding. |
| **Isolated Unit Testing** | Tested without `<ThemeProvider>`. | `styled` factory automatically provides `defaultTheme`. |

---

## 14. Testing Verification Matrix

Every implementation of `Divider` must satisfy this 100% test contract:

1. **Horizontal Rendering**:
   - Renders native `<hr>` when no children are provided.
   - Applies `border-bottom: 1px solid theme.palette.divider; width: 100%; margin: 0;`.
2. **Vertical Rendering**:
   - Renders `role="separator"` and `aria-orientation="vertical"`.
   - Applies `border-right: 1px solid theme.palette.divider;`.
   - `flexItem={true}` applies `align-self: stretch; height: auto;`.
3. **Variants**:
   - `variant="inset"` applies `margin-left: 72px;`.
   - `variant="middle"` applies horizontal margin spacing (`16px`).
4. **Children / Labels**:
   - Renders child content between pseudo-element hairlines.
   - Adjusts flex ratios for `textAlign="left"`, `"center"`, and `"right"`.
5. **Line Styles**:
   - Supports `lineStyle="dashed"` and `lineStyle="dotted"`.
6. **Polymorphic Rendering**:
   - `component="li"` renders `<li>`.
   - `asChild` composition delegates styles onto custom child element.
7. **Accessibility (`vitest-axe`)**:
   - Zero automated accessibility violations across all orientations and variant combinations.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/Divider/
├── Divider.tsx          # ForwardRef component with Emotion styled factory & pseudo hairlines
├── Divider.test.tsx     # Vitest unit test suite (100% pass + vitest-axe)
├── Divider.stories.tsx  # Storybook stories (horizontal, vertical, inset, label chips, dashed)
└── index.ts             # Public exports (Divider, DividerProps, DividerOwnerState, etc.)
```
