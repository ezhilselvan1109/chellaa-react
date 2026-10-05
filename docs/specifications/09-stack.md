# Stack & Flex 1D Layout Component Specification

**Document Status:** Approved & Baseline  
**Phase:** Phase 1 — Layout & Typography Foundations  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Stack, Flex
Package Export:     import { Stack, Flex, type StackProps, type FlexProps } from "@chellaa/react";
Category:           Layout & Primitives
Status:             Approved & Implementation Baseline
Phase:              Phase 1 — Layout & Typography Foundations
Related Components: Box, Grid, Container, Divider
```

---

## 2. Purpose

The `Stack` and `Flex` components provide the **one-dimensional (1D) layout engine** for `@chellaa/react`. They handle linear distribution, directional flow (rows and columns), alignment, wrapping, and spacing between child elements along a single dimensional axis.

While `Box` is the foundational atomic wrapper for arbitrary styling, `Stack` and `Flex` abstract flexbox mechanics into a clean, declarative API powered by the **Material Design 3 8px mathematical spacing engine** and responsive Emotion styling runtime.

### When to Use

- **`Stack`**: Use when arranging items sequentially along an axis (e.g. form fields, card action rows, navigation bars, breadcrumb trails, lists of widgets).
- **`Stack` with Dividers**: Use when child items require an intercalated separator (such as a visual line, pipe `|`, chip, or dot) without requiring engineers to manually map over arrays with conditional divider indices.
- **`Flex`**: Use when building flexbox layouts where horizontal row flow is default, or when using convenient layout shorthands like `center` (`alignItems="center"` and `justifyContent="center"`), `inline` (`display: inline-flex`), or direct alignment props (`align`, `justify`).
- **Responsive Layout Flipping**: Use when mobile viewports require vertical column stacking, and tablet/desktop viewports expand to horizontal rows (`direction={{ xs: "column", md: "row" }}`).

### When NOT to Use

- **Do NOT use `Stack` or `Flex` for two-dimensional grid layouts.** When content spans rows and columns simultaneously with fractional tracks or explicit column spans, use `Grid`.
- **Do NOT use `Stack` for page viewport constraints.** Use `Container` for horizontal centering and fluid gutter padding.
- **Do NOT use `Stack` when rendering simple inline text.** Use `Typography` (`Text` or `Paragraph`).

---

## 3. Scope

### In Scope

1. **Directional Flow**: `direction` supporting `"row" | "row-reverse" | "column" | "column-reverse"` with single values, responsive arrays (`["column", "row"]`), and breakpoint objects (`{ xs: "column", md: "row" }`).
2. **8px Grid Spacing**: `spacing` supporting numeric factors mapped via `theme.spacing(n)` (e.g. `2` $\rightarrow$ `16px`), raw CSS strings (`"1.5rem"`, `"auto"`), and responsive values.
3. **Intercalated Dividers**: `divider?: React.ReactNode` automatically cloned and injected strictly between consecutive valid React children, avoiding trailing dividers.
4. **Alignment & Justification**: `alignItems`, `justifyContent`, `alignContent`, `flexWrap`, and `flexGrow` with responsive mapping.
5. **Modern Flex Gap Engine**: Native CSS `gap` property with fallback flex-gap awareness.
6. **Polymorphism & Zero-DOM Composition**: Full `asChild` support via Radix-style `Slot` primitive and `component`/`as` element delegation.
7. **Design System Theme Overrides**: Integration with Emotion theme engine: `theme.components.ChellaaStack.styleOverrides[slot]`.
8. **Responsive `sx` Prop**: Complete access to theme tokens, color palette paths, and elevation shadows.

### Out of Scope

- 2D layout constraints and track sizing (delegated to `Grid`).
- Virtualized list rendering for 10,000+ items (delegated to `VirtualList` in Phase 6).
- Drag-and-drop reordering mechanics (delegated to sortable list organism).

---

## 4. Non-Goals

- `Stack` does **NOT** clone props onto its children (except for unique key injection on intercalated `divider` nodes). Children maintain their own autonomous state and styling.
- `Stack` does **NOT** alter the DOM tree when `asChild` is enabled; it merges classes, styles, and ref directly onto the child.
- `Stack` does **NOT** mandate CSS classes when using inline theme tokens; it compiles through the Emotion runtime.

---

## 5. Feature Summary

| Feature | `Stack` | `Flex` | Architectural Mechanism |
| :--- | :--- | :--- | :--- |
| **Default Axis** | Vertical (`column`) | Horizontal (`row`) | `flex-direction` |
| **Spacing Unit** | 8px Grid (`spacing`) | 8px Grid (`gap` / `spacing`) | `theme.spacing(n)` $\rightarrow$ CSS `gap` |
| **Responsive Mapping** | Arrays & Objects | Arrays & Objects | Emotion `@media (min-width: ...)` queries |
| **Divider Injection** | Yes (`divider` prop) | Optional (`divider` prop) | Interleaved child array mapping |
| **Polymorphism** | `as`, `component`, `asChild` | `as`, `component`, `asChild` | `Slot` composition |
| **Center Shorthand** | Via props | `center?: boolean` | `align-items: center; justify-content: center;` |
| **Inline Flex** | Via `sx={{ display: 'inline-flex' }}` | `inline?: boolean` | `display: inline-flex;` |
| **Theme Overrides** | `ChellaaStack` | `ChellaaFlex` | `theme.components[Name].styleOverrides.root` |

---

## 6. Anatomy

### Stack Anatomy (Column Mode)

```
┌────────────────────────────────────────────────────────┐
│ Stack Root (display: flex; flex-direction: column)      │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Child 1                                          │  │
│  └──────────────────────────────────────────────────┘  │
│         ▲                                              │
│         │ gap: theme.spacing(n)                        │
│         ▼                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Optional Divider (React.ReactNode)               │  │
│  └──────────────────────────────────────────────────┘  │
│         ▲                                              │
│         │ gap: theme.spacing(n)                        │
│         ▼                                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Child 2                                          │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Stack Anatomy (Row Mode with Dividers)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Stack Root (display: flex; flex-direction: row; align-items: center)   │
│                                                                        │
│  ┌─────────┐   gap   ┌─────────┐   gap   ┌─────────┐   gap   ┌──────┐  │
│  │ Child 1 │ ◄─────► │ Divider │ ◄─────► │ Child 2 │ ◄─────► │ ...  │  │
│  └─────────┘         └─────────┘         └─────────┘         └──────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Layout Matrix & Direction Behaviors

`Stack` and `Flex` support 4 primary direction orientations across responsive breakpoints:

| Direction | CSS Equivalent | Main Axis | Cross Axis | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| `"column"` | `flex-direction: column` | Vertical (Top $\rightarrow$ Bottom) | Horizontal (Left $\rightarrow$ Right) | Vertical forms, card stacks, sidebars |
| `"column-reverse"` | `flex-direction: column-reverse` | Vertical (Bottom $\rightarrow$ Top) | Horizontal (Left $\rightarrow$ Right) | Chat message logs, inverted feeds |
| `"row"` | `flex-direction: row` | Horizontal (Left $\rightarrow$ Right) | Vertical (Top $\rightarrow$ Bottom) | Navbars, button bars, toolbars |
| `"row-reverse"` | `flex-direction: row-reverse` | Horizontal (Right $\rightarrow$ Left) | Vertical (Top $\rightarrow$ Bottom) | RTL layout adaptation, modal footer actions |

---

## 8. Component States & Behavior

### 8.1. Responsive Direction & Spacing

Both `direction` and `spacing` evaluate dynamically against the theme's responsive breakpoint scale:

```tsx
<Stack
  direction={{ xs: "column", sm: "column", md: "row" }}
  spacing={[1, 2, 4]}
  alignItems={{ xs: "stretch", md: "center" }}
>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

- On `xs` ($<600\text{px}$): Stacks vertically with `gap: 8px`.
- On `sm` ($600\text{px} - 899\text{px}$): Stacks vertically with `gap: 16px`.
- On `md` ($\ge 900\text{px}$): Shifts to horizontal row with `gap: 32px` and centered alignment.

### 8.2. Intercalated Divider Insertion Logic

When `divider` is provided:
1. All top-level children are normalized via `React.Children.toArray()`.
2. Falsy and invalid React elements (`null`, `undefined`, boolean flags) are filtered out.
3. The remaining $N$ child elements are reduced such that a cloned divider element with a stable key (`stack-divider-${index}`) is inserted between element $i$ and element $i+1$.
4. **No trailing divider** is appended after the last element.
5. If only 0 or 1 valid child is rendered, no divider is rendered.

```tsx
<Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
  <Item>Profile</Item>
  <Item>Settings</Item>
  <Item>Logout</Item>
</Stack>
```

---

## 9. Accessibility & WAI-ARIA Standards

- **Semantic Role Delegation**: When `Stack` or `Flex` is used for landmark navigation, lists, or toolbars, developers must declare the semantic role or element:
  - `<Stack component="nav" aria-label="Main Navigation">` $\rightarrow$ Renders `<nav role="navigation">`.
  - `<Stack component="ul" role="list">` with `<Box component="li">` $\rightarrow$ Accessible unordered list structure without broken DOM hierarchies.
  - `<Stack role="toolbar" aria-orientation="horizontal">` $\rightarrow$ WAI-ARIA Toolbar pattern.
- **Divider Accessibility**: Visual decorative dividers rendered within `divider` MUST include `aria-hidden="true"` or `role="separator"`.

---

## 10. API Specification & TypeScript Contracts

### 10.1. `Stack` Interfaces

```ts
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import type { ResponsiveValue, SxProps } from "../../system/types";

export type StackDirection = "row" | "row-reverse" | "column" | "column-reverse";

export interface StackOwnerState {
  /**
   * The flex direction of the stack container.
   * Supports responsive arrays and breakpoint objects.
   * @default "column"
   */
  direction?: ResponsiveValue<StackDirection> | undefined;

  /**
   * The gap spacing factor between consecutive children.
   * Numbers are multiplied by the 8px theme spacing grid (e.g. 2 -> 16px).
   * Supports responsive arrays and breakpoint objects.
   * @default 0
   */
  spacing?: ResponsiveValue<number | string> | undefined;

  /**
   * Cross-axis alignment of children.
   */
  alignItems?: ResponsiveValue<CSSProperties["alignItems"]> | undefined;

  /**
   * Main-axis distribution of children.
   */
  justifyContent?: ResponsiveValue<CSSProperties["justifyContent"]> | undefined;

  /**
   * Flex wrapping behavior.
   * @default "nowrap"
   */
  flexWrap?: ResponsiveValue<CSSProperties["flexWrap"]> | undefined;

  /**
   * If true, uses modern CSS `gap` property instead of margin adjustments.
   * @default true
   */
  useFlexGap?: boolean | undefined;
}

export interface StackProps
  extends HTMLAttributes<HTMLElement>,
    StackOwnerState {
  /**
   * If true, delegates rendering to the immediate child element using Slot.
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
   * An element inserted between each valid child node.
   */
  divider?: ReactNode | undefined;

  /**
   * The system-aware sx prop.
   */
  sx?: SxProps;

  /**
   * Child elements.
   */
  children?: ReactNode | undefined;
}
```

### 10.2. `Flex` Interfaces

```ts
export interface FlexOwnerState extends Omit<StackOwnerState, "direction"> {
  /**
   * The flex direction.
   * @default "row"
   */
  direction?: ResponsiveValue<StackDirection> | undefined;

  /**
   * If true, sets display to `inline-flex` instead of `flex`.
   * @default false
   */
  inline?: boolean | undefined;

  /**
   * Convenience shorthand setting both alignItems="center" and justifyContent="center".
   * @default false
   */
  center?: boolean | undefined;

  /**
   * Direct alias for alignItems.
   */
  align?: ResponsiveValue<CSSProperties["alignItems"]> | undefined;

  /**
   * Direct alias for justifyContent.
   */
  justify?: ResponsiveValue<CSSProperties["justifyContent"]> | undefined;

  /**
   * Direct alias for flexWrap.
   */
  wrap?: ResponsiveValue<CSSProperties["flexWrap"]> | undefined;

  /**
   * Direct alias for spacing.
   */
  gap?: ResponsiveValue<number | string> | undefined;
}

export interface FlexProps extends HTMLAttributes<HTMLElement>, FlexOwnerState {
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  divider?: ReactNode | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Stack` and `Flex` are built directly on top of the Emotion `styled()` factory:

```ts
const StyledStackRoot = styled("div", {
  name: "ChellaaStack",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "direction" &&
    prop !== "spacing" &&
    prop !== "alignItems" &&
    prop !== "justifyContent" &&
    prop !== "flexWrap" &&
    prop !== "useFlexGap" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: StackOwnerState }>(({ theme, ownerState }) => {
  const styles: Record<string, any> = {
    display: "flex",
    boxSizing: "border-box",
  };

  // 1. Direction
  Object.assign(
    styles,
    parseSx(theme, { flexDirection: ownerState.direction ?? "column" })
  );

  // 2. 8px Grid Spacing
  if (ownerState.spacing !== undefined) {
    Object.assign(styles, parseSx(theme, { gap: ownerState.spacing }));
  }

  // 3. Alignments
  if (ownerState.alignItems) {
    Object.assign(styles, parseSx(theme, { alignItems: ownerState.alignItems }));
  }
  if (ownerState.justifyContent) {
    Object.assign(styles, parseSx(theme, { justifyContent: ownerState.justifyContent }));
  }
  if (ownerState.flexWrap) {
    Object.assign(styles, parseSx(theme, { flexWrap: ownerState.flexWrap }));
  }

  return styles;
});
```

### 11.1. Theme Component Overrides

Consumers can globally customize all `Stack` instances in `createTheme()`:

```ts
const theme = createTheme({
  components: {
    ChellaaStack: {
      defaultProps: {
        spacing: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
```

---

## 12. Composition & Polymorphic Patterns

### 12.1. Polymorphic Landmark

```tsx
<Stack component="aside" aria-label="Sidebar Widgets" spacing={3}>
  <WidgetTitle>Filters</WidgetTitle>
  <FilterGroup />
</Stack>
```

### 12.2. Zero-DOM `asChild` Delegation

```tsx
<Stack asChild direction="row" spacing={1}>
  <nav aria-label="Breadcrumbs">
    <a href="/">Home</a>
    <span>/</span>
    <a href="/docs">Docs</a>
  </nav>
</Stack>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **No Children (`children={null}`)** | Renders empty flex container safely without crashing. | `React.Children.toArray()` returns empty array; zero iterations. |
| **Single Child with Divider** | Renders the single child without any divider. | Divider insertion only occurs when `index < validChildren.length - 1`. |
| **Falsy Child Filter** | `{isLoggedIn && <UserAvatar />}`, where flag is false. | `filter(React.isValidElement)` discards `false` before divider calculation. |
| **Missing Theme Context** | Rendered in isolated unit test without `<ThemeProvider>`. | `styled` factory automatically resolves fallback `defaultTheme`. |
| **String Spacing (`spacing="2rem"`)** | Applies raw string without attempting numeric multiplication. | `theme.spacing()` checks `typeof value === "string"` and passes through. |

---

## 14. Testing Verification Matrix

Every implementation of `Stack` and `Flex` must satisfy this 100% test contract:

1. **Rendering**:
   - Renders a `<div>` flexbox container with `display: flex`.
   - Defaults `Stack` to `flex-direction: column`.
   - Defaults `Flex` to `flex-direction: row`.
2. **Spacing Grid**:
   - `spacing={2}` yields `gap: 16px`.
   - `spacing={[1, 3]}` yields base `gap: 8px` and `@media (min-width: 600px) { gap: 24px; }`.
3. **Dividers**:
   - Interleaves $N-1$ dividers for $N$ valid children.
   - Ignores boolean, null, and undefined child nodes.
   - Generates unique React keys for each divider element.
4. **Polymorphism**:
   - `component="section"` renders `<section>`.
   - `asChild` merges attributes directly onto child element without extra wrapper.
5. **DOM Cleanliness**:
   - Props (`direction`, `spacing`, `alignItems`, `useFlexGap`, `asChild`) do NOT leak to DOM attributes.
6. **Accessibility**:
   - Automated `vitest-axe` validation with 0 violations.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/
├── Stack/
│   ├── Stack.tsx          # Stack component implementation with forwardRef
│   ├── Stack.test.tsx     # Vitest unit test suite (100% pass)
│   ├── Stack.stories.tsx  # Storybook stories (vertical, horizontal, dividers, responsive)
│   └── index.ts           # Clean public exports
└── Flex/
    ├── Flex.tsx           # Flex component built on Stack engine with row defaults
    ├── Flex.test.tsx      # Vitest unit test suite
    ├── Flex.stories.tsx   # Storybook stories (inline, center, justify/align shorthands)
    └── index.ts           # Clean public exports
```
