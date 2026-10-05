# Typography Component Specification (Scale, Headings, Text & Monospace Primitives)

**Document Status:** Approved & Baseline  
**Phase:** Phase 1 — Layout & Typography Foundations  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Typography, Heading, Text, Paragraph, Code
Package Export:     import { Typography, Heading, Text, Paragraph, Code, type TypographyProps, type TypographyVariant, type TypographyAlign, type HeadingProps, type TextProps, type ParagraphProps, type CodeProps } from "@chellaa/react";
Category:           Layout & Primitives
Status:             Approved & Implementation Baseline
Phase:              Phase 1 — Layout & Typography Foundations
Related Components: Box, Flex, Stack, Container, Divider, Kbd
```

---

## 2. Purpose

The `Typography` system presents the **typographical hierarchy, reading scale, and text rendering engine** for `@chellaa/react`. Built upon the canonical Material Design 3 type scale, it unifies font families, weights, font sizes, line heights, letter spacings, and text transforms across an enterprise application.

To maximize developer ergonomics while enforcing semantic accessibility, the system provides both the comprehensive polymorphic core `<Typography>` and specialized first-class primitives:
- `<Heading>`: Semantic header primitive (`h1`-`h6` with `level={1..6}`)
- `<Text>`: Inline or block textual element with color and truncation support
- `<Paragraph>`: Semantic `<p>` block with ergonomic baseline paragraph margins
- `<Code>`: Monospace inline code chip (`<code>` with tinted background and border)

### When to Use

- **Document Outlines & Titles**: Rendering section titles, page titles, and modal headers with strict semantic hierarchy (`Heading` / `Typography variant="h1..h6"`).
- **Body Copy & Descriptive Prose**: Long-form articles, card descriptions, and notifications (`Paragraph` / `Typography variant="body1..body2"`).
- **Captions, Badges & Metadata**: Footnotes, timestamps, and secondary captions (`Typography variant="caption"`).
- **Monospace Identifiers & Code Tokens**: Inline function names, file paths, and hash strings (`Code`).
- **Text Truncation**: Single-line truncation with ellipsis (`noWrap`) or multi-line clamping (`lineClamp={2}`).

### When NOT to Use

- **Do NOT use `Typography` for interactive buttons.** Use `Button` with accessible keyboard and focus states.
- **Do NOT use `Typography` for keyboard keycap glyphs.** Use `Kbd` (Spec 14) for keyboard shortcut combinations.
- **Do NOT use `Typography` for form input labels.** Use `FormField` / `FormLabel` (Phase 2) to maintain proper `<label for="...">` associations.

---

## 3. Scope

### In Scope

1. **Material Type Scale**: Support for all 13 standard theme variants:
   - Display/Headings: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
   - Subtitles: `subtitle1`, `subtitle2`
   - Body: `body1`, `body2`
   - Specialized: `button`, `caption`, `overline`
2. **Semantic Decoupling**: Ability to render any visual variant using any HTML tag (e.g. `variant="h2"` with `component="h1"` or `component="span"`).
3. **Ergonomic Primitives**:
   - `Heading`: Level-based (`level={1..6}`) or tag-based heading primitive.
   - `Text`: Lightweight inline/block text primitive with color and size mappings.
   - `Paragraph`: Semantic `<p>` block with default bottom margin.
   - `Code`: Inline monospace code chip with rounded border and subtle background tint.
4. **Text Truncation & Clamping**:
   - `noWrap`: Single-line truncation (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`).
   - `lineClamp={n}`: Multi-line truncation via `-webkit-line-clamp: n`.
5. **Color & Alignment Engine**:
   - `color`: Resolves theme palette tokens (`"primary"`, `"secondary"`, `"text.primary"`, `"text.secondary"`, `"error"`, `"warning"`, `"info"`, `"success"`, `"inherit"`).
   - `align`: `"inherit" | "left" | "center" | "right" | "justify"`.
   - `gutterBottom`: Adds bottom margin (`0.35em`) for natural paragraph flow.
6. **Polymorphic Zero-DOM Composition**:
   - `asChild` composition via `Slot`, `component`, and `as`.
7. **Emotion Theme Overrides**:
   - Styled via Emotion `styled()`, hookable at `theme.components.ChellaaTypography.styleOverrides.root`.

### Out of Scope

- Rich text WYSIWYG editor (delegated to Editor organism).
- Syntax-highlighted multi-line code editor or code block (delegated to CodeBlock organism).

---

## 4. Non-Goals

- `Typography` does **NOT** inject external `@font-face` network downloads; it relies on the font family defined in `theme.typography.fontFamily`.
- `Typography` does **NOT** alter the CSS `display` of its parents.
- `Typography` does **NOT** enforce uppercase transforms on headings; transforms are restricted to `button` and `overline` per Material specifications.

---

## 5. Feature Summary

| Feature | Variants / Values | Default Semantic Tag | Description |
| :--- | :--- | :--- | :--- |
| **`h1`** | 6.0rem (96px), Light 300 | `<h1>` | Largest hero title |
| **`h2`** | 3.75rem (60px), Light 300 | `<h2>` | Major section header |
| **`h3`** | 3.0rem (48px), Regular 400 | `<h3>` | Subsection header |
| **`h4`** | 2.125rem (34px), Regular 400 | `<h4>` | Page header |
| **`h5`** | 1.5rem (24px), Medium 500 | `<h5>` | Card title, modal header |
| **`h6`** | 1.25rem (20px), Medium 500 | `<h6>` | List header, small title |
| **`subtitle1`** | 1.0rem (16px), Regular 400 | `<h6>` | Primary subtitle |
| **`subtitle2`** | 0.875rem (14px), Medium 500 | `<h6>` | Compact subtitle |
| **`body1`** | 1.0rem (16px), Regular 400 | `<p>` | Standard body prose |
| **`body2`** | 0.875rem (14px), Regular 400 | `<p>` | Compact body prose |
| **`button`** | 0.875rem (14px), Medium 500 | `<span>` | Uppercase button label |
| **`caption`** | 0.75rem (12px), Regular 400 | `<span>` | Footnotes, timestamps |
| **`overline`** | 0.75rem (12px), Regular 400 | `<span>` | Uppercase eyebrow text |

---

## 6. Anatomy

### Typography Anatomy & Box Model

```
┌────────────────────────────────────────────────────────────────────────┐
│ Typography Element (<p>, <h1>, <span>)                                 │
│                                                                        │
│  Line-Height Box                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Text Content (font-family, font-size, font-weight, color)        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  gutterBottom (margin-bottom: 0.35em)                                  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└────────────────────────────────────────────────────────────────────────┘
```

### Multi-Line Line Clamp Anatomy (`lineClamp={2}`)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Line 1: First line of article excerpt text that flows naturally...     │
│ Line 2: Second line of article excerpt text truncated here... ...      │
│ (display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden;)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Typographic Scale & Mathematical Tokens

All measurements are derived from `theme.typography`:

| Variant | Font Size | Font Weight | Line Height | Letter Spacing | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `h1` | `6rem` (96px) | 300 (Light) | 1.167 | `-0.01562em` | none |
| `h2` | `3.75rem` (60px) | 300 (Light) | 1.200 | `-0.00833em` | none |
| `h3` | `3rem` (48px) | 400 (Regular) | 1.167 | `0em` | none |
| `h4` | `2.125rem` (34px) | 400 (Regular) | 1.235 | `0.00735em` | none |
| `h5` | `1.5rem` (24px) | 500 (Medium) | 1.334 | `0em` | none |
| `h6` | `1.25rem` (20px) | 500 (Medium) | 1.600 | `0.0075em` | none |
| `subtitle1`| `1rem` (16px) | 400 (Regular) | 1.750 | `0.00938em` | none |
| `subtitle2`| `0.875rem` (14px) | 500 (Medium) | 1.570 | `0.00714em` | none |
| `body1` | `1rem` (16px) | 400 (Regular) | 1.500 | `0.00938em` | none |
| `body2` | `0.875rem` (14px) | 400 (Regular) | 1.430 | `0.01071em` | none |
| `button` | `0.875rem` (14px) | 500 (Medium) | 1.750 | `0.02857em` | uppercase |
| `caption` | `0.75rem` (12px) | 400 (Regular) | 1.660 | `0.03333em` | none |
| `overline`| `0.75rem` (12px) | 400 (Regular) | 2.660 | `0.08333em` | uppercase |

---

## 8. Component States & Behavior

### 8.1. Semantic Mapping vs. Visual Variant

By default, variants map to canonical semantic HTML elements:
```ts
const defaultVariantMapping: Record<TypographyVariant, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  button: "span",
  caption: "span",
  overline: "span",
};
```
However, to preserve accessible document heading trees without visual compromises, engineers can decouple the tag:
```tsx
{/* Visually styled as an H4, but semantically an H1 for screen reader outline */}
<Typography variant="h4" component="h1">
  Page Title
</Typography>
```

### 8.2. Text Truncation (`noWrap` and `lineClamp`)

- **Single-Line Truncation (`noWrap={true}`)**:
  ```css
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ```
- **Multi-Line Clamping (`lineClamp={3}`)**:
  ```css
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ```

### 8.3. Color Palette Token Resolution

The `color` prop seamlessly resolves both shorthand tokens and deep theme paths:
- `"primary"` $\rightarrow$ `theme.palette.primary.main`
- `"text.secondary"` $\rightarrow$ `theme.palette.text.secondary`
- `"error"` $\rightarrow$ `theme.palette.error.main`
- `"inherit"` $\rightarrow$ `inherit`

---

## 9. Accessibility & WAI-ARIA Standards

- **Semantic Heading Hierarchy**: Maintain an unbroken heading outline (`h1` followed by `h2`, followed by `h3`). Never skip heading levels purely for visual size.
- **Color Contrast Ratios**: In light and dark modes, text colors must satisfy WCAG 2.1 Level AA contrast ratios:
  - Normal text ($< 18\text{pt}$ or $< 14\text{pt}$ bold): $\ge 4.5:1$.
  - Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold): $\ge 3:1$.
- **Line Length Readability**: Long paragraphs should ideally be constrained to $45\text{–}75$ characters per line via `Container` or `maxWidth`.

---

## 10. API Specification & TypeScript Contracts

```ts
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { TypographyVariant } from "../../theme/types";
import type { SxProps } from "../../system/types";

export type TypographyAlign = "inherit" | "left" | "center" | "right" | "justify";

export interface TypographyOwnerState {
  variant?: TypographyVariant | undefined;
  align?: TypographyAlign | undefined;
  color?: string | undefined;
  gutterBottom?: boolean | undefined;
  noWrap?: boolean | undefined;
  lineClamp?: number | undefined;
}

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    TypographyOwnerState {
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}

export interface HeadingProps
  extends Omit<TypographyProps, "variant"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  variant?: TypographyVariant | undefined;
}

export interface TextProps extends TypographyProps {
  size?: "sm" | "md" | "lg" | undefined;
}

export interface ParagraphProps extends TypographyProps {}

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  colorScheme?: "default" | "primary" | "secondary" | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Typography` is implemented using Emotion `styled()` and `shouldForwardProp`:

```ts
const StyledTypographyRoot = styled("span", {
  name: "ChellaaTypography",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "align" &&
    prop !== "color" &&
    prop !== "gutterBottom" &&
    prop !== "noWrap" &&
    prop !== "lineClamp" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: TypographyOwnerState }>(({ theme, ownerState }) => {
  const variant = ownerState.variant ?? "body1";
  const variantStyles = theme.typography[variant] || {};

  const styles: Record<string, any> = {
    margin: 0,
    ...variantStyles,
  };

  if (ownerState.align && ownerState.align !== "inherit") {
    styles.textAlign = ownerState.align;
  }

  if (ownerState.gutterBottom) {
    styles.marginBottom = "0.35em";
  }

  if (ownerState.noWrap) {
    styles.overflow = "hidden";
    styles.textOverflow = "ellipsis";
    styles.whiteSpace = "nowrap";
  } else if (ownerState.lineClamp && ownerState.lineClamp > 0) {
    styles.display = "-webkit-box";
    styles.WebkitLineClamp = ownerState.lineClamp;
    styles.WebkitBoxOrient = "vertical";
    styles.overflow = "hidden";
  }

  if (ownerState.color) {
    styles.color = resolveColor(theme, ownerState.color);
  }

  return styles;
});
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Heading Hierarchy with Decoupled Tags

```tsx
<Heading level={1} variant="h3">
  Executive Summary
</Heading>
<Paragraph gutterBottom>
  This report summarizes the Q3 cloud infrastructure performance metrics.
</Paragraph>
```

### 12.2. Inline Monospace Code Chips

```tsx
<Text>
  To start the application, execute <Code>npm run dev</Code> in the terminal.
</Text>
```

### 12.3. Zero-DOM `asChild` Delegation

```tsx
<Typography asChild variant="h2">
  <Link to="/overview">Overview Link</Link>
</Typography>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **`lineClamp` on non-WebKit Browsers** | Falls back gracefully to standard paragraph flow. | Standard multi-vendor `-webkit-box` and standard line-clamp CSS properties. |
| **Unknown `color` Token** | Falls back to literal CSS string (e.g. `color="#f00"`). | Safe color resolver checking palette path then returning raw string. |
| **Empty or Whitespace Children** | Preserves layout line-height without collapsing. | Base typography styles maintain `line-height` and `font-size`. |
| **Isolated Unit Testing** | Tested without `<ThemeProvider>`. | `styled` factory automatically falls back to `defaultTheme`. |

---

## 14. Testing Verification Matrix

Every implementation of `Typography` must satisfy this 100% test contract:

1. **Variant Rendering**:
   - `variant="h1"` renders `<h1>` with light 300 weight and 6rem font size.
   - `variant="body1"` renders `<p>`.
   - `variant="caption"` renders `<span>`.
2. **Component Decoupling**:
   - `variant="h2"` with `component="span"` renders a `<span>` element with `h2` visual styles.
3. **Truncation Modes**:
   - `noWrap={true}` applies `text-overflow: ellipsis; white-space: nowrap;`.
   - `lineClamp={2}` applies `-webkit-line-clamp: 2`.
4. **Color Tokens**:
   - `color="primary"` resolves `theme.palette.primary.main`.
   - `color="text.secondary"` resolves `theme.palette.text.secondary`.
5. **Ergonomic Primitives**:
   - `<Heading level={2}>` renders `<h2>`.
   - `<Paragraph>` renders `<p>` with `body1` styles.
   - `<Code>` renders `<code>` with monospace styling.
6. **Accessibility (`vitest-axe`)**:
   - Zero automated accessibility violations across all variants and heading levels.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/Typography/
├── Typography.tsx          # Base polymorphic Typography component
├── Heading.tsx             # Heading primitive (level 1..6)
├── Text.tsx                # Text inline/block primitive
├── Paragraph.tsx           # Paragraph semantic primitive
├── Code.tsx                # Monospace inline code chip primitive
├── Typography.test.tsx     # Vitest unit test suite (100% pass + vitest-axe)
├── Typography.stories.tsx  # Storybook stories (scale, colors, clamping, code)
└── index.ts                # Public exports
```
