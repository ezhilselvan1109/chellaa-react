# Card Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 4 Surfaces & Data Display)  
**Specification ID:** SPEC-005 / SPEC-021  
**Target Package:** `@chellaa/react`  
**Revision:** 2.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [00-component-feature-matrix.md](./00-component-feature-matrix.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-css-delivery.md](../adr/ADR-007-css-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Chellaa Design Tokens (`--cl-*`), `@emotion/react`, `@emotion/styled`, React 18/19  

---

## 1. Identity

```text
Component Name:     Card (Compound Architecture: Card, CardHeader, CardTitle, CardDescription, CardMedia, CardBody, CardFooter, CardActions)
Specification ID:   SPEC-005 / SPEC-021
Package Export:     import { Card, CardHeader, CardTitle, CardDescription, CardMedia, CardBody, CardFooter, CardActions, type CardProps, type CardTitleProps, type CardDescriptionProps } from "@chellaa/react";
Category:           Components / Card (Tier 4 Surfaces & Data Display)
Status:             Approved & Baseline
Phase:              3 — Component Specifications
Priority:           P1 High
Version:            2.1.0
Related Components: Paper, Box, Stack, Typography, Button, Badge
Governing ADRs:     ADR-007 (Zero-Config Scoped CSS), ADR-011 (Hybrid Token Engine Boundary)
```

---

## 2. Purpose

The `Card` component is a structured Material Design 3-aligned surface container that groups related visual assets, descriptive typography, and interactive triggers into a single discernible physical unit with explicit elevation semantics.

### 2.1 Problem Statement
In complex enterprise dashboards and commerce applications, raw data and mixed content elements (images, headings, metadata, action buttons) easily become visually fragmented. Without structured surface containment, visual hierarchy collapses, and elevation relationships blur.

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI system merging rich desktop density with modern design ergonomics, `@chellaa/react` provides `Card` as the canonical Tier 4 surface building block. It enforces consistent spatial padding, responsive media containment, theme-adaptive elevation layers, and accessible button composition.

### 2.3 When to Use
- Grouping self-contained units of content (e.g., user profiles, product listings, dashboard analytics tiles, blog previews).
- Organizing complex page sections into clear visual modules across grid or flex layouts.
- Presenting media with associated metadata and action strips.

### 2.4 When NOT to Use
- **Do NOT make entire cards clickable `<div>` containers.** Wrapping an entire card in a click handler without semantic anchor tags violates WCAG accessibility guidelines. Use `CardActions` with explicit `<Button>` or `<Link>` elements, or use `asChild` on the Card root with a semantic `<a>` or `<article>` element.
- **Do NOT use Card as an unstyled layout wrapper.** Use `Box` or `Stack` if no distinct background surface, border, or elevation shadow is required.
- **Do NOT nest cards deeply** (e.g. card inside card), which creates visual clutter, muddy elevation layers, and excessive border nesting.

---

## 3. Scope

### 3.1 In Scope (Existing Supported Behavior)
- **Compound Architecture:** Root container `Card` paired with structured sub-components: `CardHeader`, `CardMedia`, `CardBody`, `CardFooter`, and `CardActions`.
- **3 Visual Surface Variants:**
  - `elevated` (default): Ambient drop shadow (`--cl-shadow-sm`) with M3 elevation semantics.
  - `outlined`: Hairline border (`--cl-color-border-subtle`) on a flat canvas surface with zero shadow.
  - `filled`: Subtle tinted background (`--cl-color-bg-muted`) with zero border and zero shadow.
- **Elevation System:** Numeric elevation stops (0–24) mapped to M3 elevation tokens.
- **Interactive Lift Mode (`hoverable`):** Raises elevation by 2 stops and translates `-2px` on `:hover` via smooth 150ms transition.
- **3 Spatial Padding Scales:** `sm` (12px), `md` (16px, default), `lg` (24px) automatically propagated to children via `CardContext`.
- **Aspect-Ratio Media (`CardMedia`):** Aspect-ratio-locked image/video bleed zone with `16/9`, `4/3`, or `1/1` support.
- **Header Structure (`CardHeader`):** Flexible slots for leading `avatar`, text `title`, secondary `subheader`, and trailing `action`.
- **Action Strip (`CardActions`):** Flex alignment row for actions with configurable `disableSpacing`.
- **Polymorphic Slot Delegation:** `asChild` support on `Card` and `CardHeader` via `Slot`.
- **Emotion & sx Integration:** Full `sx` styling prop compatibility on all sub-components per ADR-011.

### 3.2 Out of Scope
- Built-in drag-and-drop mechanics (delegated to external libraries).
- Collapsible accordion panels (handled by `Accordion`).
- Full-card click traps or swipe gestures.
- Built-in carousel/slider mechanics.

---

## 4. Non-Goals

- **Ambiguous click targets:** Cards will not automatically convert into `<button>` or `<div role="button">` wrappers.
- **Server state management:** Cards do not perform data fetching or pagination internally.
- **Heavy flip animations:** 3D flip card animations are out of scope for the core design system.

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Card Feature Summary                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Architecture       │ Compound sub-components: Root, Header, Media,     │
│                    │ Body, Footer, Actions                             │
├────────────────────┼───────────────────────────────────────────────────┤
│ Visual Variants    │ elevated (M3 shadow), outlined (border),          │
│                    │ filled (subtle tinted fill)                       │
├────────────────────┼───────────────────────────────────────────────────┤
│ Elevation Scale    │ Numeric 0–24 stops with dark-mode overlay tinting │
├────────────────────┼───────────────────────────────────────────────────┤
│ Interactive Mode   │ hoverable=true lifts card -2px with --cl-shadow-lg│
├────────────────────┼───────────────────────────────────────────────────┤
│ Spatial Scales     │ sm (12px), md (16px, default), lg (24px)          │
├────────────────────┼───────────────────────────────────────────────────┤
│ Media Bleed        │ CardMedia with aspect-ratio locking & cover fit   │
├────────────────────┼───────────────────────────────────────────────────┤
│ Composition        │ asChild on Card root and CardHeader via Slot      │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Card (HTML <div className="cl-card"> or delegated asChild element)
│   .cl-card
│   .cl-card--{size} (sm | md | lg)
│   .cl-card--{variant} (elevated | outlined | filled)
│   .cl-card--outline (variant="outline" alias)
│   .cl-card--hoverable (optional)
│   .cl-card--square (optional)
│
├── CardMedia (.cl-card__media) [Optional Bleed Zone]
│   └── <img> / <video> (aspect-ratio: 16/9, object-fit: cover)
│
├── CardHeader (.cl-card__header) [Optional Header Zone]
│   ├── .cl-card__header-avatar (leading avatar/icon slot)
│   ├── .cl-card__header-content
│   │   ├── .cl-card__header-title (primary title)
│   │   └── .cl-card__header-subheader (secondary subtitle)
│   └── .cl-card__header-action (trailing icon button / menu trigger)
│
├── CardTitle (.cl-card__title) [Optional Semantic Heading]
│   └── <h3> (or custom heading via asChild)
│
├── CardDescription (.cl-card__description, .cl-card__desc) [Optional Subtext]
│   └── <p> (or custom element via asChild)
│
├── CardBody (.cl-card__body) [Primary Content Slot]
│   └── Flexible application content, typography, child widgets
│
├── CardFooter (.cl-card__footer) [Optional Metadata / Footer Zone]
│   └── .cl-card__footer--divider (optional top border divider)
│
└── CardActions (.cl-card__actions) [Action Button Strip]
    └── .cl-card__actions--disable-spacing (optional flush padding)
```

---

## 7. Public API

### 7.1 `Card` (Root) Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `variant` | `CardVariant` | Optional | `"elevated"` | Visual surface style (`elevated`, `outlined`, `filled`, `outline`) | None |
| `elevation` | `number` | Optional | `1` | Numeric M3 elevation level (0–24) | None |
| `size` | `CardSize` | Optional | `"md"` | Spatial padding scale propagated to all child sections | None |
| `hoverable` | `boolean` | Optional | `false` | Raises elevation and translates -2px on hover | Cursor / tactile feedback |
| `square` | `boolean` | Optional | `false` | Removes border-radius (sets radius to 0) | None |
| `asChild` | `boolean` | Optional | `false` | Delegates rendering to immediate child element via `Slot` | Preserves child semantic tag |
| `component` | `React.ElementType` | Optional | `"div"` | Override rendered HTML element | Semantic landmark tag |
| `as` | `React.ElementType` | Optional | `"div"` | Alias for `component` | Semantic landmark tag |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx styling prop | None |

### 7.2 `CardHeader` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `title` | `React.ReactNode` | Optional | `undefined` | Primary title content | Rendered as text / heading |
| `subheader` | `React.ReactNode` | Optional | `undefined` | Secondary subtitle content | Subtitle text |
| `avatar` | `React.ReactNode` | Optional | `undefined` | Leading visual slot (Avatar, Icon) | Leading visual |
| `action` | `React.ReactNode` | Optional | `undefined` | Trailing action slot (IconButton, Menu) | Interactive control |
| `titleTypographyProps` | `HTMLAttributes` | Optional | `undefined` | Props forwarded to title `<span>` | Custom ARIA/id |
| `subheaderTypographyProps` | `HTMLAttributes` | Optional | `undefined` | Props forwarded to subheader `<span>` | Custom ARIA/id |
| `asChild` | `boolean` | Optional | `false` | Delegates rendering to child via Slot | Child tag preserved |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx prop | None |

### 7.3 `CardTitle` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `asChild` | `boolean` | Optional | `false` | Delegates rendering to custom heading tag via `Slot` | Preserves heading hierarchy |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx prop | None |
| `children` | `React.ReactNode` | Optional | `undefined` | Heading text or content | Primary heading accessible text |

### 7.4 `CardDescription` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `asChild` | `boolean` | Optional | `false` | Delegates rendering to custom element via `Slot` | Preserves child element tag |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx prop | None |
| `children` | `React.ReactNode` | Optional | `undefined` | Subtitle or supporting description content | Supporting descriptive text |

### 7.5 `CardMedia` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `image` | `string` | Optional | `undefined` | Image URL (rendered via background-image or `<img>`) | Decorative or content image |
| `alt` | `string` | Optional | `undefined` | Alternative text description | `aria-label` / `alt` attribute |
| `aspectRatio` | `string` | Optional | `"16/9"` | CSS aspect-ratio value (e.g., `"16/9"`, `"4/3"`) | Maintains aspect layout |
| `component` | `React.ElementType` | Optional | `"div"` | Rendered HTML tag (e.g. `"img"`, `"video"`) | Semantic media element |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx prop | None |

### 7.6 `CardBody` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx prop | None |
| `children` | `React.ReactNode` | Optional | `undefined` | Card body content | Primary accessible text |

### 7.7 `CardFooter` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `divider` | `boolean` | Optional | `false` | Renders a 1px top border divider | Structural visual separator |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx prop | None |

### 7.8 `CardActions` Props

| Prop Name | Type | Req/Opt | Default | Description | A11y Impact |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `disableSpacing` | `boolean` | Optional | `false` | Removes negative margins and applies padded spacing | None |
| `sx` | `SxProps` | Optional | `undefined` | Emotion theme-aware sx prop | None |

---

## 8. TypeScript Types

```typescript
import * as React from "react";
import type { SxProps } from "../../system/types";

export type CardVariant = "elevated" | "outlined" | "filled" | "outline";
export type CardSize = "sm" | "md" | "lg";

export interface CardOwnerState {
  variant: CardVariant;
  elevation: number;
  size: CardSize;
  hoverable: boolean;
  square: boolean;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  elevation?: number;
  size?: CardSize;
  hoverable?: boolean;
  square?: boolean;
  asChild?: boolean;
  component?: React.ElementType;
  as?: React.ElementType;
  sx?: SxProps;
  children?: React.ReactNode;
}

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  titleTypographyProps?: React.HTMLAttributes<HTMLSpanElement>;
  subheaderTypographyProps?: React.HTMLAttributes<HTMLSpanElement>;
  asChild?: boolean;
  sx?: SxProps;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
  sx?: SxProps;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
  sx?: SxProps;
}

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  alt?: string;
  aspectRatio?: string;
  component?: React.ElementType;
  sx?: SxProps;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: SxProps;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
  sx?: SxProps;
}

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableSpacing?: boolean;
  sx?: SxProps;
}
```

---

## 9. Variants

### 9.1 `elevated` (Default)
- **Visual Style:** M3 surface elevation shadow (`var(--cl-shadow-sm)`) on canvas surface (`var(--cl-color-bg-canvas)`).
- **Dark Mode Behavior:** Receives elevation overlay tint via `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`.
- **Usage:** Standard content cards floating above the page canvas.

### 9.2 `outlined`
- **Visual Style:** 1px hairline border (`var(--cl-color-border-subtle)`), flat canvas background, zero shadow.
- **Usage:** High-density forms, bordered data panels, or layouts with complex backgrounds where shadows add visual noise.

### 9.3 `filled`
- **Visual Style:** Subtle muted background (`var(--cl-color-bg-muted)`), zero border, zero drop shadow.
- **Usage:** Secondary grouping blocks, nested panels, or calm metadata cards.

---

## 10. Sizes & Spatial Baseline Grid

Padding scales are inherited by all sub-components via `CardContext`:

| Size | Header Padding | Body Padding | Footer Padding | Actions Padding |
| :--- | :--- | :--- | :--- | :--- |
| **`sm`** | `12px` | `0 12px 12px` | `8px 12px` (gap: 8px) | `8px 12px` (when `disableSpacing`) |
| **`md`** (Default) | `16px` | `0 16px 16px` | `10px 16px` (gap: 12px) | `8px 16px` (when `disableSpacing`) |
| **`lg`** | `24px` | `0 24px 24px` | `14px 24px` (gap: 16px) | `8px 24px` (when `disableSpacing`) |

---

## 11. States

- **Resting:** Renders according to variant token values and `elevation` level.
- **Hover (`hoverable=true`):**
  - Elevation shadow increases to `var(--cl-shadow-lg)`.
  - Upward translation of `-2px` via `transform: translateY(-2px)`.
  - Smooth 150ms transition curve (`var(--cl-duration-fast)`).
- **Disabled Child Controls:** Individual buttons and interactive inputs inside `CardActions` or `CardBody` handle their own `:disabled` and `aria-disabled` attributes without disabling the parent surface.

---

## 12. Behavior

- The root `Card` functions strictly as a presentational grouping container.
- When `hoverable` is active, the cursor defaults to `default` (or `pointer` if wrapped with `asChild` in a link).
- Subcomponents automatically inherit spatial `size` via `CardContext.Provider` so consumers do not need to repeat `size="sm"` on every sub-component.

---

## 13. Controlled / Uncontrolled

```text
State Model: Stateless Presentational Primitive
Card encapsulates no internal open/closed or active index state machine.
Interactive state is delegated to internal child components (e.g. Button, Menu, Checkbox).
```

---

## 14. Events

Inherits standard React DOM event handlers on the root container (`onClick`, `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`).

---

## 15. Composition Patterns

### 15.1 Standard Media Card
```tsx
<Card variant="elevated" hoverable>
  <CardMedia image="/hero.jpg" alt="Mountain Landscape" aspectRatio="16/9" />
  <CardHeader
    avatar={<Avatar src="/user.jpg" alt="Author" />}
    title="Explore Alpine Trails"
    subheader="Published October 2026"
    action={<IconButton aria-label="Bookmark"><BookmarkIcon /></IconButton>}
  />
  <CardBody>
    <Typography variant="body2">
      Discover breathtaking alpine routes and scenic vistas...
    </Typography>
  </CardBody>
  <CardActions>
    <Button variant="solid" colorScheme="primary">Read More</Button>
    <Button variant="ghost">Share</Button>
  </CardActions>
</Card>
```

### 15.2 Semantic Article Delegation (`asChild`)
```tsx
<Card asChild variant="outlined">
  <article aria-labelledby="post-title">
    <CardHeader title={<h2 id="post-title">Release Notes v2.0</h2>} />
    <CardBody>Overview of new features...</CardBody>
    <CardFooter divider>
      <Badge colorScheme="success">Stable</Badge>
    </CardFooter>
  </article>
</Card>
```

---

## 16. Ref Contract

- `Card`: Forwards ref to `HTMLDivElement` (or the delegated `asChild` DOM element).
- `CardHeader`: Forwards ref to `HTMLDivElement`.
- `CardMedia`: Forwards ref to `HTMLDivElement` (or `HTMLImageElement` if `component="img"`).
- `CardBody`: Forwards ref to `HTMLDivElement`.
- `CardFooter`: Forwards ref to `HTMLDivElement`.
- `CardActions`: Forwards ref to `HTMLDivElement`.

---

## 17. Accessibility (WAI-ARIA & WCAG 2.1 AA)

- **Semantic Landmark Responsibilities:** If a card represents an article, blog post, or major page section, consumers should set `component="article"` or `asChild` with `<article>` or `<section aria-labelledby="...">`.
- **Heading Hierarchy:** `CardHeader` renders titles as semantic `<span>` by default with configurable `titleTypographyProps` allowing consumers to specify semantic `<h3>` or `<h4>` tags without breaking heading hierarchy.
- **Action Strip Access:** Action buttons inside `CardActions` maintain direct tab navigation order.
- **Alternative Text on Media:** When `CardMedia` uses `image`, `alt` is bound as `aria-label` or passed to `<img>` alt attribute.
- **Automated Axe Testing:** 0 accessibility violations in all variants, sizes, and compositions.

---

## 18. Keyboard Interaction

Because `Card` is a surface container, it does not trap or redirect focus:
- `Tab`: Navigates linearly into interactive children (`Button`, `IconButton`, `Link`).
- `Shift + Tab`: Navigates backwards out of interactive children.
- `Enter` / `Space`: Dispatched to focused child action buttons.

---

## 19. Styling Contract & CSS Architecture

Card adheres strictly to ADR-007 and ADR-011:
- Static scoped classes authored inside `@layer cl-components`:
  - `.cl-card`, `.cl-card--elevated`, `.cl-card--outlined`, `.cl-card--filled`, `.cl-card--hoverable`, `.cl-card--square`.
  - `.cl-card--sm`, `.cl-card--md`, `.cl-card--lg`.
  - `.cl-card__header`, `.cl-card__header-avatar`, `.cl-card__header-content`, `.cl-card__header-title`, `.cl-card__header-subheader`, `.cl-card__header-action`.
  - `.cl-card__media`.
  - `.cl-card__body`.
  - `.cl-card__footer`, `.cl-card__footer--divider`.
  - `.cl-card__actions`, `.cl-card__actions--disable-spacing`.
- Zero-runtime CSS variable tokens:
  - Background: `var(--cl-color-bg-canvas)` / `var(--cl-color-bg-muted)`.
  - Border: `var(--cl-color-border-subtle)`.
  - Shadows: `var(--cl-shadow-sm)`, `var(--cl-shadow-lg)`.
  - Radius: `var(--cl-rad-xl, 12px)`.
  - Transitions: `var(--cl-duration-fast, 150ms)`, `var(--cl-duration-normal, 250ms)`.

---

## 20. Theme Contract & Dark Mode

- **Light Mode:** Canvas background (`#ffffff`), subtle gray border (`#cbd5e1`), soft ambient shadow (`rgba(0, 0, 0, 0.05)`).
- **Dark Mode (`[data-theme="dark"]`):**
  - Background maps to dark surface (`#0f172a` / `#1e293b`).
  - Elevated variant receives white overlay tint (`linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`) matching Material Design 3 elevation standards.
  - Border maps to `--cl-color-border-subtle` (`#334155`).

---

## 21. Responsive Behavior & Content Overflow

- **Width:** Defaults to 100% of parent container. Card does not set hardcoded pixel widths.
- **Header Text Truncation:** `.cl-card__header-title` applies `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` to prevent breaking card layout.
- **Media Scaling:** `.cl-card__media` scales responsively while preserving aspect ratio.
- **Mobile Action Wrapping:** `CardActions` applies `flex-wrap: wrap; gap: 4px;` so action buttons gracefully stack on narrow mobile viewports.

---

## 22. Motion & Transitions

- **Hover Lift:**
  - Transition duration: 150ms (`var(--cl-duration-fast)`).
  - Timing function: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Reduced Motion (`prefers-reduced-motion: reduce`):**
  - All transition durations clamped to `0.01ms` to respect vestibular preferences.

---

## 23. Testing Requirements (7-Tier Testing)

The Card test suite (`Card.test.tsx`) must validate:
1. **Default Rendering:** Renders `.cl-card`, `.cl-card--md`, `.cl-card--elevated`.
2. **Variant Matrix:** Renders `elevated`, `outlined`, and `filled` classes accurately.
3. **Size Matrix:** Renders `sm`, `md`, `lg` padding across all child sub-components.
4. **Subcomponent Integration:** Verifies `CardHeader`, `CardMedia`, `CardBody`, `CardFooter`, `CardActions`.
5. **Slot Delegation (`asChild`):** Renders custom element without duplicate DOM wrapper.
6. **Accessibility Audit:** 0 `axe-core` violations across all variant and subcomponent compositions.
7. **Ref Forwarding:** All 6 subcomponents forward refs to HTMLDivElement.

---

## 24. Storybook Requirements

Stories in `Card.stories.tsx` must demonstrate:
- **Default:** Standard elevated card with header, body, and actions.
- **Variants:** Side-by-side comparison of `elevated`, `outlined`, and `filled`.
- **Sizes:** Visual comparison of `sm`, `md`, and `lg`.
- **MediaCard:** Image bleed with 16/9 aspect ratio and action buttons.
- **Hoverable:** Interactive lift demonstration.
- **Complex Composition:** User profile card with avatar, badges, and icon button triggers.

---

## 25. Documentation Requirements

The documentation page must provide:
- Visual interactive preview with variant and size controls.
- Copyable code examples for standard card, media card, and custom composition.
- Props table detailing all 6 subcomponents.
- Accessibility guidelines emphasizing semantic HTML heading usage.

---

## 26. Edge Cases

| Edge Case | Expected Handling |
| :--- | :--- |
| **Extremely long header title** | Truncates with ellipsis; does not expand card horizontally |
| **Missing image in CardMedia** | Preserves aspect ratio container; falls back gracefully |
| **Actions exceeding container width** | Wraps buttons to multiple rows (`flex-wrap: wrap`) |
| **Empty CardBody** | Omits inner padding collapse; container maintains border integrity |
| **Deeply nested cards** | Prohibited in guidelines; documentation warns against multi-nesting |

---

## 27. Reference Library Comparison

| Capability | MUI (`Card`) | Ant Design (`Card`) | Chellaa React (`Card`) |
| :--- | :--- | :--- | :--- |
| **Architecture** | Compound (`CardHeader`, `CardContent`, `CardActions`) | Monolithic with `extra`, `cover`, `tabList` props | Compound subcomponents + M3 elevation + `asChild` |
| **Styling** | Emotion CSS-in-JS | CSS-in-JS (AntD v5) | Zero-runtime CSS tokens (`@layer cl-components`) |
| **Elevation** | Numeric (0–24) | `bordered={true/false}`, `hoverable` | M3 Numeric elevation + `hoverable` + dark overlay |
| **Slot Delegation**| Component prop | None | Full `asChild` slot delegation via `Slot` |

---

## 28. Deferred Features

- Expandable collapsible card drawer (handled by `Accordion`).
- Split-screen swipeable card stack (handled by specialized organism).

---

## 29. Acceptance Criteria

- [x] All 30 mandatory sections documented adhering to `00-component-specification-standard.md`.
- [x] Public API matches actual implementation in `packages/react/src/components/Card/`.
- [x] Full support for `elevated`, `outlined`, `filled`, `hoverable`, `square`, and all 6 subcomponents.
- [x] Zero axe-core accessibility violations.
- [x] Strict TypeScript typings without `any`.
- [x] Verified in Storybook across light and dark themes.

---

## 30. Definition of Done

1. Specification document approved and committed.
2. 100% unit and accessibility test suite passing (`Card.test.tsx`).
3. Complete Storybook stories available in `Card.stories.tsx`.
4. Zero TypeScript compiler errors with `tsc --noEmit`.
5. Public exports confirmed in `packages/react/src/index.ts`.
