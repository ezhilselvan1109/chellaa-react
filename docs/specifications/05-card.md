# Card Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Card
Package Export:     import { Card } from "@chellaa/react";
Category:           Layout / Data Display
Status:             Approved & Implementation Ready
Phase:              3 — Component Specifications
Related Components: Box, Stack, Container
```

---

## 2. Purpose

The `Card` component is a structured content container that groups related visual assets, text descriptions, and interactive triggers into a single discernible physical surface.

### When to Use

- Displaying self-contained units of content (user profiles, dashboard metrics, product listings, articles).
- Organizing complex page sections into clear visual modules.
- Presenting summarized information tiles.

### When NOT to Use

- **Do NOT use as an arbitrary interactive container.** Wrapping an entire card in a click handler without semantic anchor tags creates inaccessible DOM. Use internal links or `<Card asChild><a href="...">...</a></Card>` instead.
- **Do NOT use as a replacement for raw layout containers.** Use `Box` or `Stack` if no distinct surface background, border, or elevation is required.
- **Do NOT nest cards deeply** (e.g. card inside card), which creates visual clutter and muddy elevation layers.

---

## 3. Scope

### In Scope

- Compound component structure (`Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`, `Card.Body`, `Card.Footer`).
- 3 visual variants: `elevated` (default), `outline`, `filled`.
- 3 spatial padding scales: `sm`, `md` (default), `lg`.
- Polymorphic slot delegation via `asChild` on `Card.Root` and `Card.Title`.
- Ref forwarding to `HTMLDivElement`.

---

## 4. Non-Goals

- Ambiguous interactive clickable `<div>` containers (prohibited for accessibility safety).
- Built-in drag-and-drop mechanics (handled by third-party drag engines).
- Collapsible accordion cards (handled by dedicated `Accordion` component).

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Card Feature Summary                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Architecture       │ Compound component structure                      │
├────────────────────┼───────────────────────────────────────────────────┤
│ Visual Treatments  │ elevated (default shadow), outline (1px border),  │
│                    │ filled (subtle surface fill)                      │
├────────────────────┼───────────────────────────────────────────────────┤
│ Spatial Scales     │ sm (12px pad), md (16px pad), lg (24px pad)       │
├────────────────────┼───────────────────────────────────────────────────┤
│ Composition        │ asChild slot delegation on Root and Title         │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Card (HTML <div className="cl-card"> or delegated asChild element)
│   .cl-card
│   .cl-card--{variant}
│   .cl-card--{size}
│
├── Card.Header (.cl-card__header)
│   ├── Card.Title (.cl-card__title) (HTML <h3 / h4>)
│   └── Card.Description (.cl-card__desc) (HTML <p>)
├── Card.Body (.cl-card__body) (Flexible content slot)
└── Card.Footer (.cl-card__footer) (Action buttons slot)
```

---

## 7. Public API

### `Card.Root` Props

```typescript
export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  asChild?: boolean;
}
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                     Card.Root Props                                     │
├───────────────┬───────────────────────────┬──────────┬───────────┬──────────────────────┤
│ Prop Name     │ Type                      │ Req/Opt  │ Default   │ A11y Impact          │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ variant       │ CardVariant               │ Optional │ "elevated"│ Visual elevation     │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ size          │ CardSize                  │ Optional │ "md"      │ Spatial padding      │
├───────────────┼───────────────────────────┼──────────┼───────────┼──────────────────────┤
│ asChild       │ boolean                   │ Optional │ false     │ Delegates DOM element│
└───────────────┴───────────────────────────┴──────────┴───────────┴──────────────────────┘
```

---

## 8. TypeScript Types

```typescript
export type CardVariant = "elevated" | "outline" | "filled";
export type CardSize = "sm" | "md" | "lg";

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual surface treatment of the card.
   * @default "elevated"
   */
  variant?: CardVariant;

  /**
   * Spatial padding scale.
   * @default "md"
   */
  size?: CardSize;

  /**
   * If true, delegates rendering to the immediate child element.
   * @default false
   */
  asChild?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * If true, delegates rendering to the child heading tag (e.g. <h1>, <h2>).
   * @default false
   */
  asChild?: boolean;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
```

---

## 9. Variants

- **elevated (Default):** Card background with subtle ambient drop shadow (`--cl-shadow-md`) and hairline border.
- **outline:** Clean 1px border (`--cl-color-border-sub`) with zero drop shadow; modern flat look.
- **filled:** Subdued tinted surface background (`--cl-color-bg-muted`) with no border.

---

## 10. Sizes

Padding scales applied across `Card.Header`, `Card.Body`, and `Card.Footer`:

- `sm`: 12px (space-3) padding, compact gap.
- `md` (Default): 16px (space-4) padding, standard gap.
- `lg`: 24px (space-6) padding, generous airy gap.

---

## 11. States

Card is a presentational surface.

- **Resting:** Renders according to variant and size tokens.
- **Hover / Focus:** Controlled by internal interactive children (buttons, links).

---

## 12. Behavior

- Functions purely as a presentational DOM grouping container.
- Child interactive elements handle focus and activation independently.

---

## 13. Controlled / Uncontrolled

```text
Controlled / Uncontrolled State:
N/A — Card is a stateless layout and content grouping primitive.
```

---

## 14. Events

Inherits standard React DOM event handlers (`onClick`, `onMouseEnter`, `onMouseLeave`).

---

## 15. Composition

Supports `asChild` to delegate the root node to semantic HTML elements:

```tsx
<Card asChild variant="outline">
  <article>
    <Card.Header>
      <Card.Title>Article Title</Card.Title>
    </Card.Header>
    <Card.Body>Article content...</Card.Body>
  </article>
</Card>
```

---

## 16. Ref Contract

- `Card.Root` forwards ref to `HTMLDivElement` (or custom element when `asChild=true`).

---

## 17. Accessibility

### 17.1 Semantic HTML

- Recommended: Render as `<article>` or `<section>` when representing standalone document content.
- `Card.Title` renders semantic `<h3>` by default; use `asChild` to render `<h2>` or `<h4>` without polymorphic prop anti-patterns.

### 17.2 Elimination of Clickable Container Hazard

Chellaa React rejects `isInteractive` on cards. Making an entire multi-element `<div>` clickable creates screen reader confusion and breaks keyboard navigation. Instead, interactive actions are rendered as distinct `<Button>` or `<Link>` controls inside the card.

---

## 18. Keyboard Interaction

```text
Keyboard Navigation:
N/A — Card is non-interactive. Child interactive controls (buttons, links) participate in the sequential Tab order normally.
```

---

## 19. Styling Contract

```css
@layer cl-components {
  .cl-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--cl-color-bg-elev);
    border-radius: var(--cl-rad-lg);
    box-sizing: border-box;
    overflow: hidden;
  }

  .cl-card--elevated {
    border: 1px solid var(--cl-color-border-sub);
    box-shadow: var(--cl-shadow-sm);
  }

  .cl-card--outline {
    border: 1px solid var(--cl-color-border-def);
    box-shadow: none;
  }

  .cl-card--filled {
    background-color: var(--cl-color-bg-muted);
    border: 1px solid transparent;
  }

  .cl-card__header {
    padding: var(--cl-space-4);
  }

  .cl-card__title {
    margin: 0;
    font-size: var(--cl-font-lg);
    font-weight: 600;
    color: var(--cl-color-fg-primary);
  }

  .cl-card__desc {
    margin: var(--cl-space-1) 0 0 0;
    font-size: var(--cl-font-sm);
    color: var(--cl-color-fg-muted);
  }

  .cl-card__body {
    padding: 0 var(--cl-space-4) var(--cl-space-4) var(--cl-space-4);
    flex: 1 1 auto;
    color: var(--cl-color-fg-second);
  }

  .cl-card__footer {
    padding: var(--cl-space-3) var(--cl-space-4);
    border-top: 1px solid var(--cl-color-border-sub);
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
```

---

## 20. Theme Contract

- Uses `--cl-color-bg-elev` in dark mode to create visual separation from canvas surfaces.

---

## 21. Responsive Behavior

- Fluid width (100%) by default; fits naturally inside grid and flex layouts.

---

## 22. Motion

N/A — Cards do not possess built-in animated transitions.

---

## 23. Testing

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Card Test Matrix                              │
├───────────────────────────────────┬────────────────────────────────────┤
│ Category                          │ Applicability & Verification       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Rendering / Prop Pass-through  │ Applicable: verifies className,    │
│                                   │ style, children slots.             │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ N/A — Non-interactive container.   │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Accessibility / axe-core       │ Applicable: zero violations.       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ N/A — Does not receive focus.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled / Uncontrolled      │ N/A — Stateless layout component.  │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading State Guards│ N/A — Cards have no disabled mode. │
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR & RSC Compatibility        │ Applicable: pure Server Component. │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 24. Storybook

1. `Default`: Elevated card with header, body, and footer actions.
2. `AllVariants`: Side-by-side comparison of `elevated`, `outline`, `filled`.
3. `ArticleCard`: Card wrapping `<article>` with images and tags.
4. `DarkTheme`: Verified under Dark Mode surface elevation.

---

## 25. Documentation Requirements

- Compound card composition examples.
- Props API table.
- Guidance on semantic HTML tags (`<article>` vs `<div>`).

---

## 26. Edge Cases

1. **Card Header Image Bleed:** When rendering an image at the top of a card, ensure `overflow: hidden` on the card container preserves border-radius.
2. **Text Truncation:** Long titles wrap or truncate cleanly without breaking card height proportions.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Card Reference Comparison Matrix                     │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ Card / CardContent│ Card (monolithic)  │ Compound Card primitives      │
│ CardActionArea    │ hoverable          │ Rejected (A11y container risk)│
│ CardHeader        │ title / extra      │ Card.Header / Card.Title      │
│ CardActions       │ actions[]          │ Card.Footer slot              │
│ as prop           │ -                  │ asChild on Root & Title       │
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Draggable Cards:** Deferred to specialized drag-and-drop extensions.
- **Card Media Slots:** Direct `<img>` or `<video>` elements inside `Card.Body` preferred over heavy wrapper components.

---

## 29. Acceptance Criteria

- [ ] Compound structure exported: `Card.Header`, `Card.Title`, `Card.Description`, `Card.Body`, `Card.Footer`.
- [ ] 3 variants (`elevated`, `outline`, `filled`) styled correctly.
- [ ] `asChild` delegates cleanly to semantic elements without polymorphic `as`.
- [ ] Ambiguous `isInteractive` eliminated.
- [ ] Zero axe-core accessibility violations.
- [ ] Styled in `@layer cl-components` using `--cl-*` variables.

---

## 30. Definition of Done

The Card specification is approved, hardened against reference libraries, verified for cross-document consistency, and ready for Phase 4 implementation.
