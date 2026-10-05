# Box Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Phase 1 Layout Foundation)  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Box
Package Export:     import { Box } from "@chellaa/react";
Category:           Layout & Primitives
Status:             Approved & Implementation Ready
Phase:              Phase 1 — Layout & Typography Foundations
Related Components: Flex, Stack, Grid, Container
```

---

## 2. Purpose

The `Box` component is the **foundational atomic primitive** of the entire Chellaa React component library. It provides a polymorphic, design-token-aware building block that allows engineers to construct arbitrary UI elements and layouts while enforcing design system token constraints (spacing, colors, radii, shadows, borders) without writing bespoke CSS or incurring CSS-in-JS runtime overhead.

### When to Use

- As the fundamental building block for custom micro-layouts, cards, containers, panels, and wrappers.
- When applying design system spacing (`p`, `m`, `px`, `py`, `mx`, `my`), background colors, borders, and shadows directly to an element.
- When rendering semantic HTML elements (`<section>`, `<article>`, `<main>`, `<aside>`, `<nav>`, `<div>`) with polymorphic type-safety via `as` or `asChild`.
- As the internal foundation primitive for higher-level layout components (`Flex`, `Stack`, `Grid`, `Container`).

### When NOT to Use

- **Do NOT use `Box` when a semantic, higher-level component exists.** (e.g. use `Flex` or `Stack` for 1D flexbox layouts, `Grid` for 2D grids, `Card` for bordered surface cards, `Button` for interactive buttons).
- **Do NOT use `Box` as an interactive button or link without proper ARIA roles and keyboard handlers.** Use `Button` or `<Box as="button">` with complete keyboard/focus management.
- **Do NOT use `Box` for complex typography layout.** Use `Heading` or `Text` which contain strict typographic scale, line-height, and truncation logic.

---

## 3. Scope

### In Scope

- **Polymorphism**: Full support for `as` prop (e.g. `as="section"`, `as="header"`) and Radix-style `asChild` composition via [`Slot`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/primitives/Slot.tsx).
- **Design Token Style Props**:
  - **Spacing**: `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` mapped to `--cl-space-*` scale.
  - **Dimensions**: `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`.
  - **Display & Position**: `display`, `position`, `top`, `right`, `bottom`, `left`, `zIndex`.
  - **Color & Background**: `bg`, `color`, `opacity`.
  - **Borders & Radii**: `border`, `borderColor`, `borderWidth`, `borderRadius` (`rounded`), `borderTop`, `borderBottom`, `borderLeft`, `borderRight`.
  - **Shadows**: `shadow` mapped to `--cl-shadow-*` scale.
  - **Overflow**: `overflow`, `overflowX`, `overflowY`.
- **Zero-Runtime CSS Strategy**: Style props compiled directly into inline CSS custom property hooks and scoped utility classes, avoiding costly runtime CSS generation or stylesheet injection.
- **Strict TypeScript Typing**: Full `PolymorphicComponentProps` supporting native HTML attributes for the chosen tag without type errors.

### Out of Scope

- Built-in flexbox-specific ergonomics (e.g., `direction`, `justify`, `align`, `gap`). These belong strictly to `Flex` and `Stack`.
- Built-in grid-specific ergonomics (e.g., `templateColumns`, `templateRows`, `columnSpan`). These belong strictly to `Grid`.
- Complex state transitions or layout animations. These should be composed via external motion libraries (e.g., Framer Motion) using `asChild`.

---

## 4. Non-Goals

- `Box` is **NOT** a CSS-in-JS style engine like styled-components or Emotion. It will not parse arbitrary nested CSS string templates at runtime.
- `Box` is **NOT** a replacement for semantic HTML. It defaults to `div`, but developers are strongly encouraged to use `as="section"`, `as="article"`, etc.
- `Box` will **NOT** inject global CSS or mutate the document head.

---

## 5. Feature Summary

| Feature | Capability | Implementation Detail |
| :--- | :--- | :--- |
| **Polymorphism** | `as` & `asChild` | Supports any HTML tag or React component via `Slot` |
| **Token Spacing** | 16-point scale | Mapped to `--cl-space-1` (0.25rem) through `--cl-space-24` (6rem) |
| **Border Radii** | Token-mapped | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| **Shadows** | Token-mapped | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `inner` |
| **Performance** | Zero-Runtime | Pure CSS variable mapping; 0ms runtime style compilation |
| **Ref Forwarding** | Exact Element Ref | TypeScript automatically resolves ref type based on `as` prop |

---

## 6. Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ Box (Polymorphic HTML Element: div, section, main, etc.) │
│                                                          │
│  [Child Components or Text Nodes]                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

The `Box` renders a single DOM node with CSS classes and inline style variable mappings. No unnecessary wrapper elements are generated.

---

## 7. Public API

### Props Interface

```typescript
export type BoxSpacingValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | "auto"
  | (string & {});

export type BoxRadiusValue =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "full"
  | (string & {});

export type BoxShadowValue =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "inner"
  | (string & {});

export interface BoxOwnProps {
  /**
   * The HTML element or React component to render.
   * @default "div"
   */
  as?: React.ElementType;

  /**
   * When true, delegates rendering, attributes, and styles to the immediate child.
   * @default false
   */
  asChild?: boolean;

  /** Padding across all sides (token scale or CSS string) */
  p?: BoxSpacingValue;
  /** Horizontal padding (left and right) */
  px?: BoxSpacingValue;
  /** Vertical padding (top and bottom) */
  py?: BoxSpacingValue;
  /** Top padding */
  pt?: BoxSpacingValue;
  /** Right padding */
  pr?: BoxSpacingValue;
  /** Bottom padding */
  pb?: BoxSpacingValue;
  /** Left padding */
  pl?: BoxSpacingValue;

  /** Margin across all sides (token scale or CSS string) */
  m?: BoxSpacingValue;
  /** Horizontal margin (left and right) */
  mx?: BoxSpacingValue;
  /** Vertical margin (top and bottom) */
  my?: BoxSpacingValue;
  /** Top margin */
  mt?: BoxSpacingValue;
  /** Right margin */
  mr?: BoxSpacingValue;
  /** Bottom margin */
  mb?: BoxSpacingValue;
  /** Left margin */
  ml?: BoxSpacingValue;

  /** Width */
  width?: string | number;
  /** Minimum width */
  minWidth?: string | number;
  /** Maximum width */
  maxWidth?: string | number;
  /** Height */
  height?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Maximum height */
  maxHeight?: string | number;

  /** Display property */
  display?: React.CSSProperties["display"];
  /** Position property */
  position?: React.CSSProperties["position"];
  /** Top position */
  top?: string | number;
  /** Right position */
  right?: string | number;
  /** Bottom position */
  bottom?: string | number;
  /** Left position */
  left?: string | number;
  /** Z-index layer */
  zIndex?: number | string;

  /** Background color or token */
  bg?: string;
  /** Text color or token */
  color?: string;
  /** Opacity */
  opacity?: number | string;

  /** Border specification (e.g. "1px solid") */
  border?: string;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: string | number;
  /** Border radius token */
  borderRadius?: BoxRadiusValue;
  /** Alias for borderRadius */
  rounded?: BoxRadiusValue;

  /** Box shadow token */
  shadow?: BoxShadowValue;

  /** Overflow behavior */
  overflow?: React.CSSProperties["overflow"];
  /** Overflow X behavior */
  overflowX?: React.CSSProperties["overflowX"];
  /** Overflow Y behavior */
  overflowY?: React.CSSProperties["overflowY"];
}

export type BoxProps<E extends React.ElementType = "div"> = BoxOwnProps &
  Omit<React.ComponentPropsWithRef<E>, keyof BoxOwnProps>;
```

---

## 8. TypeScript Types

```typescript
export type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

export type PolymorphicComponentPropWithRef<
  E extends React.ElementType,
  Props = {},
> = Props & {
  as?: E;
  asChild?: boolean;
} & Omit<React.ComponentPropsWithRef<E>, keyof Props | "as" | "asChild">;

export type BoxComponent = <E extends React.ElementType = "div">(
  props: PolymorphicComponentPropWithRef<E, BoxOwnProps>
) => React.ReactElement | null;
```

---

## 9. Variants

`Box` is an unstyled atomic container; it does not carry predetermined visual variants like `Button` (e.g. `solid`, `outline`). Instead, variants are composed through its style props or consumed by higher-level primitives like `Card` and `Paper`.

---

## 10. Sizes

`Box` dimensions are governed by standard spacing tokens:

| Spacing Token | CSS Value | Rem Equivalent | Pixel Equivalent |
| :--- | :--- | :--- | :--- |
| `0` | `0px` | `0rem` | `0px` |
| `1` | `var(--cl-space-1)` | `0.25rem` | `4px` |
| `2` | `var(--cl-space-2)` | `0.5rem` | `8px` |
| `3` | `var(--cl-space-3)` | `0.75rem` | `12px` |
| `4` | `var(--cl-space-4)` | `1rem` | `16px` |
| `5` | `var(--cl-space-5)` | `1.25rem` | `20px` |
| `6` | `var(--cl-space-6)` | `1.5rem` | `24px` |
| `8` | `var(--cl-space-8)` | `2rem` | `32px` |
| `10` | `var(--cl-space-10)` | `2.5rem` | `40px` |
| `12` | `var(--cl-space-12)` | `3rem` | `48px` |
| `16` | `var(--cl-space-16)` | `4rem` | `64px` |
| `20` | `var(--cl-space-20)` | `5rem` | `80px` |
| `24` | `var(--cl-space-24)` | `6rem` | `96px` |

---

## 11. States

`Box` has no internal interaction states by default. When rendered with interactive elements (`as="button"` or `as="a"`), it preserves native pseudo-classes (`:hover`, `:active`, `:focus-visible`).

---

## 12. Behavior

1. **Resolution of Numeric Spacing**: Passing integer `4` to `p` resolves to `var(--cl-space-4)`. Passing raw CSS string `"22px"` or `"1.5em"` applies the raw string directly without alteration.
2. **Directional Precedence**: Specific properties (`pt`, `pb`, `pl`, `pr`) take visual precedence over axis properties (`px`, `py`), which in turn take precedence over universal properties (`p`, `m`).
3. **Rounded Alias**: `rounded="md"` is an exact functional alias for `borderRadius="md"`.

---

## 13. Controlled / Uncontrolled

`Box` is stateless and does not maintain controlled/uncontrolled values.

---

## 14. Events

All native DOM events (`onClick`, `onMouseEnter`, `onKeyDown`, `onFocus`, etc.) are transparently forwarded to the underlying element.

---

## 15. Composition & `asChild`

`Box` supports composition via `asChild`:

```tsx
// Composing with Next.js Link without wrapping extra divs
<Box asChild p={4} rounded="md" bg="var(--cl-color-bg-subtle)">
  <Link href="/dashboard">Dashboard</Link>
</Box>
```

When `asChild` is `true`, `Box` clones the immediate child element, merges `className`, merges `style`, and attaches refs via `Slot`.

---

## 16. Ref Contract

The ref forwarded to `Box` resolves to the exact underlying DOM node:

```tsx
const sectionRef = React.useRef<HTMLElement>(null);
<Box as="section" ref={sectionRef} p={6}>Content</Box>
```

TypeScript enforces that `sectionRef` matches the chosen `as` tag.

---

## 17. Accessibility (WAI-ARIA)

- When rendered as `div`, `Box` has no default ARIA role, preserving clean accessibility tree semantics.
- When rendered with semantic landmarks (`as="nav"`, `as="main"`, `as="aside"`), assistive technologies automatically identify the corresponding landmark role.
- When `role` is provided explicitly (e.g. `role="region"`, `aria-label="User Profile"`), it is passed to the DOM element without interference.

---

## 18. Keyboard Interaction

`Box` does not intercept keyboard events. If composed as an interactive trigger (`role="button"` or `as="button"`), standard keyboard interactions (`Enter`, `Space`) are handled natively or by the composed component.

---

## 19. Styling Contract

### CSS Class Hierarchy

```css
@layer cl-components {
  .cl-box {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    min-width: 0;
  }
}
```

### Style Props Variable Pipeline

Instead of generating dynamic CSS strings at runtime, `Box` extracts style props into inline CSS custom properties:

```tsx
const style: React.CSSProperties = {
  ...props.style,
  ...(p !== undefined && { padding: resolveSpacing(p) }),
  ...(m !== undefined && { margin: resolveSpacing(m) }),
  ...(bg !== undefined && { backgroundColor: bg }),
  ...(color !== undefined && { color }),
  ...(rounded !== undefined && { borderRadius: resolveRadius(rounded) }),
  ...(shadow !== undefined && { boxShadow: resolveShadow(shadow) }),
};
```

---

## 20. Theme Contract

`Box` directly consumes the CSS custom properties defined in [`theme.css`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/styles/theme.css):
- Spacing: `--cl-space-*`
- Backgrounds: `--cl-color-bg-*`
- Text: `--cl-color-text-*`
- Borders: `--cl-color-border-*`
- Shadows: `--cl-shadow-*`
- Radii: `--cl-radius-*`

---

## 21. Responsive Behavior

In Phase 1, `Box` supports responsive styling via standard CSS classes or CSS media queries passed through `className`. Responsive array/object syntax (e.g. `p={{ sm: 2, md: 4 }}`) is deferred to the Layout Enhancements sprint (Wave 2) to maintain zero-runtime footprint.

---

## 22. Motion

`Box` includes no default transition or animation. When `transition` is specified via style or classes, it respects the global reduced-motion preference (`@media (prefers-reduced-motion: reduce)`).

---

## 23. Testing Specification

### Mandatory Test Cases

1. **Rendering**: Renders as `div` by default with class `.cl-box`.
2. **Polymorphic `as`**: Renders as `<section>`, `<header>`, `<span>` when specified.
3. **Composition `asChild`**: Renders child element without intermediate `div`.
4. **Spacing Token Resolution**: `p={4}` maps to `var(--cl-space-4)` in inline styles.
5. **Directional Spacing Precedence**: `pt={2}` overrides `py={4}` or `p={6}`.
6. **Border & Radius Resolution**: `rounded="lg"` maps to `var(--cl-radius-lg)`.
7. **Shadow Resolution**: `shadow="md"` maps to `var(--cl-shadow-md)`.
8. **Ref Forwarding**: Ref attaches correctly to the underlying HTML element.
9. **Accessibility**: `axe(container)` passes with 0 violations.

---

## 24. Storybook Specifications

Stories to implement in `Box.stories.tsx`:
- **Default**: Basic `Box` with padding, background, and rounded corners.
- **Polymorphic**: Demonstrating `as="section"`, `as="aside"`, `as="article"`.
- **Composition**: Demonstrating `asChild` with a custom anchor tag.
- **Spacing Matrix**: Demonstrating spacing tokens `0` through `24`.
- **Shadow Matrix**: Demonstrating elevation shadows `xs` through `xl`.
- **Border & Radii**: Demonstrating `rounded` tokens `xs` through `full`.

---

## 25. Documentation Requirements

Documentation page in `apps/docs` must provide:
1. Interactive sandbox tweaking `p`, `m`, `bg`, `rounded`, and `shadow`.
2. Real-world example: Building an elevated profile card using only `Box`.
3. Polymorphic element switcher preview.
4. Comprehensive Props API table.

---

## 26. Edge Cases & Mitigations

| Edge Case | Potential Issue | Mitigation |
| :--- | :--- | :--- |
| **`asChild` with multiple children** | React.Children.only runtime error | `Slot` enforces single child validation with clear error message in development. |
| **Custom string spacing** | Non-token string passed (e.g. `"15px"`) | `resolveSpacing` detects string and passes it directly without appending `var(--cl-space-*)`. |
| **Ref mismatch** | Passing `HTMLDivElement` ref to `as="button"` | TypeScript generic `PolymorphicRef<E>` catches type mismatch at compile time. |

---

## 27. Reference Comparison (Ant Design vs MUI vs Chellaa)

| Feature | MUI `Box` | Ant Design | Chellaa React `Box` |
| :--- | :--- | :--- | :--- |
| **Runtime Dependency** | Emotion (`@mui/system`) | None (No direct Box component) | **Zero-Runtime (Pure CSS Variables)** |
| **Polymorphic** | `component` prop | N/A | **`as` and `asChild` (Radix Slot pattern)** |
| **Token Safety** | Theme object lookup in JS | N/A | **CSS variable contract (`--cl-*`)** |
| **Bundle Footprint** | ~15 KB (with system) | N/A | **< 1.2 KB minified** |

---

## 28. Deferred Features

- Responsive object syntax (`p={{ base: 2, md: 4 }}`): Scheduled for Wave 2 after atomic media query utility generator is finalized.
- Pseudo-class props (`_hover={{ bg: "..." }}`): Handled via standard CSS classes to avoid runtime overhead.

---

## 29. Acceptance Criteria

- [ ] `Box` component exported from `@chellaa/react`.
- [ ] Supports all style props listed in Section 7.
- [ ] Passes 100% of Vitest unit tests including `vitest-axe` accessibility checks.
- [ ] Storybook story demonstrates all props, polymorphism, and token scales.
- [ ] Bundle size contribution strictly under 1.5 KB.

---

## 30. Definition of Done

1. [ ] Code written in [`packages/react/src/components/Box/Box.tsx`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/components/Box/Box.tsx).
2. [ ] Scoped CSS written in [`packages/react/src/components/Box/Box.css`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/components/Box/Box.css).
3. [ ] Unit tests written in [`packages/react/src/components/Box/Box.test.tsx`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/components/Box/Box.test.tsx).
4. [ ] Storybook stories written in [`packages/react/src/components/Box/Box.stories.tsx`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/components/Box/Box.stories.tsx).
5. [ ] Exported in [`packages/react/src/index.ts`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/packages/react/src/index.ts).
6. [ ] Documentation page written in [`apps/docs/src/content/components/BoxDocPage.tsx`](file:///d:/learning/Microservice/ui-componenet/chellaa-react/apps/docs/src/content/components/BoxDocPage.tsx).
