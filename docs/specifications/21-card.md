# Card Component Specification

**Document Status:** Approved & Implementation Ready
**Phase:** 3 — Surfaces & Data Display
**Target Package:** `@chellaa/react`
**Governing Standard:** [00-component-feature-matrix.md](./00-component-feature-matrix.md) & [01-api-conventions.md](./01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Card
Package Export:     import { Card, CardHeader, CardMedia, CardBody, CardFooter, CardActions } from "@chellaa/react";
Category:           Surfaces / Data Display
Status:             Approved & Implementation Ready
Phase:              3 — Surfaces & Data Display
Related Components: Paper, Box, Stack, Typography, Button
```

---

## 2. Purpose

The `Card` component is a structured Material Design 3-aligned surface container that groups related visual assets, text descriptions, and interactive triggers into a single discernible physical unit with M3 elevation semantics.

### When to Use

- Displaying self-contained units of content (user profiles, dashboard metrics, product listings, articles).
- Organizing complex page sections into clear visual modules on an elevated surface.
- Presenting summarized information with optional media, header, body, footer, and action sections.

### When NOT to Use

- **Do NOT make entire cards clickable divs.** Use `CardActions` with explicit `<Button>` or `<a>` links inside.
- **Do NOT use instead of `Box` or `Stack`** when no elevated surface or compound structure is needed.
- **Do NOT nest cards deeply** — muddy elevation layers and visual clutter result.

---

## 3. Scope

### In Scope

- Compound sub-components: `CardHeader`, `CardMedia`, `CardBody`, `CardFooter`, `CardActions`.
- 3 visual variants: `elevated` (default, M3 shadow + tint), `outlined` (hairline border, flat), `filled` (muted tinted surface).
- M3 Dark Mode surface elevation tinting.
- Interactive `hoverable` mode — elevation increases by 2 stops on hover with a 200ms transition.
- 3 spatial padding scales: `sm`, `md` (default), `lg`.
- `CardMedia` — aspect-ratio-locked image or video bleed zone.
- `CardActions` — flex strip for action buttons with configurable `disableSpacing`.
- `asChild` polymorphic slot on `Card` root and `CardHeader`.
- Ref forwarding on all sub-components.
- Full `sx` prop and Emotion `styled()` theming on all slots.

### Out of Scope

- `isInteractive` on the full card container (prohibited, accessibility violation).
- Collapsible accordion cards.
- Drag-and-drop mechanics.
- Built-in skeleton loading.

---

## 4. Non-Goals

- Ambiguous full-card click `<div role="button">` containers.
- Swipe/dismiss gestures.
- Animated card flip transitions.

---

## 5. Feature Summary

```
+---------------------+----------------------------------------------------------+
| Architecture        | Compound sub-components — no render-prop API             |
+---------------------+----------------------------------------------------------+
| Visual Variants     | elevated (M3 shadow+tint) | outlined | filled            |
+---------------------+----------------------------------------------------------+
| Elevation           | 1-24 numeric M3 elevation (default 1 for elevated)       |
+---------------------+----------------------------------------------------------+
| Hover Elevation     | +2 stops when hoverable=true                             |
+---------------------+----------------------------------------------------------+
| Spatial Scales      | sm (12px) | md (16px, default) | lg (24px)              |
+---------------------+----------------------------------------------------------+
| Sub-Components      | CardHeader, CardMedia, CardBody, CardFooter, CardActions |
+---------------------+----------------------------------------------------------+
| Media Zone          | Aspect-ratio locked image/video bleed                    |
+---------------------+----------------------------------------------------------+
| Composition         | asChild on Card root + CardHeader                        |
+---------------------+----------------------------------------------------------+
```

---

## 6. Anatomy

```text
Card (HTML <div> or asChild element)
¦   .ChellaaCard-root
¦   variant: elevated | outlined | filled
¦   size: sm | md | lg
¦   hoverable: boolean
¦
+-- CardMedia (.ChellaaCard-media)
¦   Aspect-ratio-locked image/video zone (optional)
¦
+-- CardHeader (.ChellaaCard-header)
¦   +-- avatar slot
¦   +-- title slot
¦   +-- subheader slot
¦   action slot (trailing icon button)
¦
+-- CardBody (.ChellaaCard-body)
¦   Flexible content zone
¦
+-- CardFooter (.ChellaaCard-footer)
¦   Semantic footer (metadata, tags, timestamps)
¦
+-- CardActions (.ChellaaCard-actions)
    Flex action strip for <Button> controls
    disableSpacing: boolean
```

---

## 7. Public API

### Card Props

```typescript
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;       // @default "elevated"
  elevation?: number;          // @default 1
  size?: CardSize;             // @default "md"
  hoverable?: boolean;         // @default false
  square?: boolean;            // @default false
  asChild?: boolean;
  component?: React.ElementType;
  as?: React.ElementType;
  sx?: SxProps;
}
```

### CardHeader Props

```typescript
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  titleTypographyProps?: React.HTMLAttributes<HTMLSpanElement>;
  subheaderTypographyProps?: React.HTMLAttributes<HTMLSpanElement>;
  asChild?: boolean;
  sx?: SxProps;
}
```

### CardMedia Props

```typescript
export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  alt?: string;
  aspectRatio?: string;  // @default "16/9"
  component?: React.ElementType;
  sx?: SxProps;
}
```

### CardBody Props

```typescript
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: SxProps;
}
```

### CardFooter Props

```typescript
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;  // @default false
  sx?: SxProps;
}
```

### CardActions Props

```typescript
export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableSpacing?: boolean;  // @default false
  sx?: SxProps;
}
```

---

## 8. TypeScript Types

```typescript
export type CardVariant = "elevated" | "outlined" | "filled";
export type CardSize = "sm" | "md" | "lg";

export interface CardOwnerState {
  variant: CardVariant;
  elevation: number;
  size: CardSize;
  hoverable: boolean;
  square: boolean;
}
```

---

## 9. Variants

| Variant    | Surface                          | Shadow                          | Border                              |
|------------|----------------------------------|---------------------------------|-------------------------------------|
| elevated   | theme.palette.background.paper   | theme.shadows[elevation]        | None                                |
| outlined   | theme.palette.background.paper   | None                            | 1px solid theme.palette.divider     |
| filled     | theme.palette.action.hover       | None                            | None                                |

M3 Dark Mode elevation tinting applied for `elevated` variant via `getOverlayAlpha`.

---

## 10. Sizes

| Size | Padding | Gap  |
|------|---------|------|
| sm   | 12px    | 8px  |
| md   | 16px    | 12px |
| lg   | 24px    | 16px |

`CardMedia` is always edge-to-edge (no padding).

---

## 11. States

| State   | Description                                                                              |
|---------|------------------------------------------------------------------------------------------|
| Resting | Shadow = theme.shadows[elevation]. Surface per variant.                                  |
| Hovered | hoverable=true: shadow -> theme.shadows[elevation + 2] + transform: translateY(-2px)    |
| Focus   | Internal child controls receive their own focus rings.                                   |

---

## 12. Behavior

- Purely presentational surface grouping container.
- `hoverable` mode applies `transform: translateY(-2px)` and elevation step-up via CSS transition.
- `CardMedia` with `image` prop renders the image as CSS `background-image` on a `div` with `role="img"` and `aria-label`.
- `CardActions` default `-8px` negative margin aligns icon-buttons flush to the card's padding box.

---

## 13. Controlled / Uncontrolled

N/A — Card is a stateless layout and surface grouping primitive.

---

## 14. Events

All sub-components inherit standard React DOM event handlers.

---

## 15. Composition

```tsx
// asChild on Card root
<Card asChild variant="outlined">
  <article>
    <CardHeader title="Article Title" subheader="October 2026" />
    <CardBody>Article content...</CardBody>
  </article>
</Card>

// Full compound usage
<Card hoverable>
  <CardMedia image="/product.jpg" alt="Product photo" aspectRatio="16/9" />
  <CardHeader
    title="Product Name"
    subheader="Category · $49"
    action={<IconButton aria-label="More"><MoreVertIcon /></IconButton>}
  />
  <CardBody>
    <Typography variant="body2">Description text.</Typography>
  </CardBody>
  <CardActions>
    <Button size="sm" variant="ghost">Share</Button>
    <Button size="sm">Buy Now</Button>
  </CardActions>
</Card>
```

---

## 16. Ref Contract

- Card ? HTMLDivElement (or custom element when asChild=true)
- CardHeader ? HTMLDivElement
- CardMedia ? HTMLDivElement
- CardBody ? HTMLDivElement
- CardFooter ? HTMLDivElement
- CardActions ? HTMLDivElement

---

## 17. Accessibility

### 17.1 Semantic HTML

- Card renders `<div>` by default. Use `asChild` to render as `<article>` or `<section>`.
- CardMedia with `image` prop sets `role="img"` and `aria-label`.

### 17.2 Clickable Container Hazard Prevention

Chellaa React rejects `isInteractive` on cards. All interaction delegated to named Button/anchor controls in CardActions.

---

## 18. Keyboard Interaction

N/A — Card is non-interactive. Child interactive controls participate in normal Tab order.

---

## 19. Styling Contract

```typescript
// Card root elevation logic (same as Paper):
function getOverlayAlpha(elevation: number): number { ... }

// Hoverable hover styles:
"&:hover": hoverable ? {
  boxShadow: theme.shadows[Math.min(elevation + 2, 24)],
  transform: "translateY(-2px)",
} : {}

// Size token map:
const sizeTokens = {
  sm: { padding: "12px", gap: "8px" },
  md: { padding: "16px", gap: "12px" },
  lg: { padding: "24px", gap: "16px" },
};

// CardMedia:
aspectRatio: aspectRatio, // e.g. "16/9"
objectFit: "cover",
backgroundSize: "cover",
```

---

## 20. Theme Contract

- `theme.palette.background.paper` — card surface color
- `theme.shadows[0..24]` — elevation shadows
- `theme.shape.borderRadius * 2` — corner radius (8px default)
- `theme.transitions` — hover animation timing
- `theme.palette.divider` — outlined variant border + CardFooter divider
- `theme.palette.mode` — M3 dark tinting conditional
- `theme.palette.action.hover` — filled variant background

---

## 21. Responsive Behavior

- Fluid width (100%) by default.
- `CardMedia` `aspectRatio` maintains proportional height at all widths.
- `size` selects fixed padding scale; no auto-responsive size changes.

---

## 22. Motion

| Interaction   | Property animated                           | Easing                          | Duration |
|---------------|---------------------------------------------|---------------------------------|----------|
| Hover         | box-shadow, transform: translateY(-2px)     | cubic-bezier(0.4, 0, 0.2, 1)   | 200ms    |
| Dark tint     | background-image (static)                   | N/A                             | N/A      |

Respects `prefers-reduced-motion` — transition drops to 0ms.

---

## 23. Testing

| Category                         | Applicability & Verification                          |
|----------------------------------|-------------------------------------------------------|
| 1. Rendering / Prop Pass-through | All variants, sizes, sub-components                   |
| 2. User Interaction              | Hoverable style applied; inner buttons work           |
| 3. Accessibility / axe-core      | Zero violations across all variants                   |
| 4. Keyboard Navigation           | N/A — non-interactive                                 |
| 5. Controlled / Uncontrolled     | N/A — stateless                                       |
| 6. Disabled / Loading            | N/A                                                   |
| 7. SSR & RSC Compatibility       | Pure Server Component, no hooks                       |
| 8. Ref Forwarding                | All 6 sub-components                                  |
| 9. CardMedia a11y                | role="img" + aria-label when image prop used          |
| 10. asChild Delegation           | Renders as article when asChild + article child       |

---

## 24. Storybook

1. **Default**: Elevated card with CardHeader, CardBody, CardActions.
2. **AllVariants**: Side-by-side elevated, outlined, filled.
3. **WithMedia**: CardMedia + header + body + actions.
4. **Hoverable**: hoverable=true lift animation demo.
5. **AllSizes**: sm, md, lg padding comparison.
6. **DarkTheme**: M3 tinting at elevation 1, 4, 8.
7. **AsArticle**: asChild rendering as article element.

---

## 25. Documentation Requirements

- Compound composition examples.
- Props API tables for each sub-component.
- Guidance on article vs div semantic usage.
- Warning: Never make entire card clickable.
- M3 dark mode elevation tinting explanation.

---

## 26. Edge Cases

1. **Image-only card**: CardMedia alone — card wraps with correct border-radius and overflow.
2. **Long title overflow**: CardHeader title truncates with text-overflow: ellipsis.
3. **Elevation > 24 clamp**: elevation prop clamped to [0, 24].
4. **Filled variant in dark mode**: Uses theme.palette.action.hover (mode-aware).
5. **disableSpacing in CardActions**: Removes negative margins for icon-button rows.

---

## 27. Reference Library Comparison

| Material UI (MUI)   | Shadcn / Radix     | Chellaa React Selected                              |
|---------------------|--------------------|-----------------------------------------------------|
| Card                | Card (compound)    | Card (compound, asChild)                            |
| CardHeader          | CardHeader         | CardHeader (avatar + title + subheader + action)   |
| CardMedia           | — (manual img)     | CardMedia (aspect-ratio locked, image prop)         |
| CardContent         | CardContent        | CardBody                                            |
| CardActions         | CardFooter         | CardActions (disableSpacing) + CardFooter (divider) |
| CardActionArea      | — (rejected)       | Rejected (clickable container a11y hazard)          |
| elevation prop      | — (Tailwind shadow)| elevation prop (0-24 M3 scale)                      |
| raised prop         | —                  | hoverable prop (semantic lift intent)               |

---

## 28. Deferred Features

- **Draggable Cards**: Deferred to drag-and-drop extensions.
- **Skeleton Loading**: Consumers use Skeleton inside CardBody.
- **Expandable Card Panel**: Deferred to Accordion or Collapse composition.
- **Card Carousel / Swipe**: Mobile-specific extension.

---

## 29. Acceptance Criteria

- [ ] Card exported with variant, elevation, size, hoverable, square, asChild props.
- [ ] Sub-components exported: CardHeader, CardMedia, CardBody, CardFooter, CardActions.
- [ ] CardHeader supports avatar, title, subheader, action slots.
- [ ] CardMedia supports image prop + aspectRatio + role="img" when image used.
- [ ] CardFooter supports divider prop (1px top border).
- [ ] CardActions supports disableSpacing prop.
- [ ] elevated variant uses M3 theme.shadows[elevation] and dark-mode overlay tinting.
- [ ] hoverable=true applies translateY(-2px) + shadow step-up on :hover.
- [ ] asChild delegates root element correctly via Slot.
- [ ] Zero axe-core accessibility violations across all variants.
- [ ] All 6 sub-components forward refs to their DOM elements.

---

## 30. Definition of Done

The Card specification is approved for Phase 3 implementation. Expands on 05-card.md baseline with M3 elevation tinting, CardMedia with aspect-ratio locking, the hoverable interactive elevation mode, distinct CardFooter/CardActions separation, and full compound composition consistent with Paper and all Phase 1/2 component conventions.
