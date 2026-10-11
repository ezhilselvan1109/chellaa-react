# SPEC-006: Badge Component Specification

**Document Identifier:** SPEC-006  
**Document Status:** Approved & Implementation Ready  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Specification ID:   SPEC-006
Component Name:     Badge
Package Export:     import { Badge } from "@chellaa/react";
Category:           Data Display / Feedback
Status:             Approved & Implementation Ready
Phase:              3 — Component Specifications
Related Components: Tag, AvatarBadge, NotificationBadge
```

---

## 2. Purpose

The `Badge` component is a compact visual indicator that communicates status, categorization, numeric counts, or metadata labels alongside larger components or within tables and cards.

### When to Use

- Displaying status indicators (e.g. "Active", "Pending", "Failed", "New").
- Indicating count metrics (e.g. "12 unread", "v2.0.4").
- Highlighting feature flags or category chips.

### When NOT to Use

- **Do NOT use as an interactive action button.** Badges are passive status labels. If an action or filter is required, use `Button` or `Chip`.
- **Do NOT use for dismissible user input tags.** Use `Tag` (with an accessible remove button).

---

## 3. Scope

### In Scope

- 3 visual variants: `subtle` (default), `solid`, `outline`.
- 3 standardized sizes: `sm`, `md` (default), `lg`.
- 7 semantic color schemes: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`.
- Circular pill curvature toggle (`isPill`).
- Optional status indicator dot (`hasDot`).
- Forwarded DOM ref to `HTMLSpanElement`.
- Polymorphic slot delegation via `asChild`.

---

## 4. Non-Goals

- Standalone clickable button behavior (use `Button` or `Chip`).
- Dismissible close buttons (handled by `Tag`).
- Floating absolute position over avatars (handled by `AvatarBadge`).

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Badge Feature Summary                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Visual Treatments  │ subtle (default tinted), solid, outline           │
├────────────────────┼───────────────────────────────────────────────────┤
│ Sizing Scale       │ sm (20px), md (24px, default), lg (28px)          │
├────────────────────┼───────────────────────────────────────────────────┤
│ Semantic Palettes  │ primary, secondary, success, warning, danger,     │
│                    │ info, neutral                                     │
├────────────────────┼───────────────────────────────────────────────────┤
│ Adornments         │ hasDot (decorative status dot), isPill (pill rad) │
├────────────────────┼───────────────────────────────────────────────────┤
│ A11y Guarantee     │ WCAG 2.2 SC 1.4.1 Color Independence enforced     │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Badge (HTML <span className="cl-badge">)
│   .cl-badge
│   .cl-badge--{variant}
│   .cl-badge--{size}
│   .cl-badge--{colorScheme}
│   [.cl-badge--pill]
│
├── [Slot: Status Dot] (.cl-badge__dot) [Conditional: when hasDot=true]
└── [Slot: Children / Label]
```

---

## 7. Public API

```typescript
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  colorScheme?: BadgeColorScheme;
  isPill?: boolean;
  hasDot?: boolean;
  asChild?: boolean;
}
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Badge Props Dictionary                               │
├─────────────┬───────────────────────────┬──────────┬───────────┬────────────────────────┤
│ Prop Name   │ Type                      │ Req/Opt  │ Default   │ A11y Impact            │
├─────────────┼───────────────────────────┼──────────┼───────────┼────────────────────────┤
│ variant     │ BadgeVariant              │ Optional │ "subtle"  │ Visual contrast        │
├─────────────┼───────────────────────────┼──────────┼───────────┼────────────────────────┤
│ size        │ BadgeSize                 │ Optional │ "md"      │ Spatial dimension      │
├─────────────┼───────────────────────────┼──────────┼───────────┼────────────────────────┤
│ colorScheme │ BadgeColorScheme          │ Optional │ "neutral" │ Semantic color intent  │
├─────────────┼───────────────────────────┼──────────┼───────────┼────────────────────────┤
│ isPill      │ boolean                   │ Optional │ false     │ Full rounded corners   │
├─────────────┼───────────────────────────┼──────────┼───────────┼────────────────────────┤
│ hasDot      │ boolean                   │ Optional │ false     │ Prepends status dot    │
├─────────────┼───────────────────────────┼──────────┼───────────┼────────────────────────┤
│ asChild     │ boolean                   │ Optional │ false     │ Delegates DOM element  │
└─────────────┴───────────────────────────┴──────────┴───────────┴────────────────────────┘
```

---

## 8. TypeScript Types

```typescript
export type BadgeVariant = "subtle" | "solid" | "outline";
export type BadgeSize = "sm" | "md" | "lg";
export type BadgeColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual aesthetic treatment of the badge.
   * @default "subtle"
   */
  variant?: BadgeVariant;

  /**
   * Spatial sizing scale.
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Semantic color intent.
   * @default "neutral"
   */
  colorScheme?: BadgeColorScheme;

  /**
   * If true, renders with fully rounded pill corners (`--cl-rad-full`).
   * @default false
   */
  isPill?: boolean;

  /**
   * If true, renders a small colored status dot before children.
   * @default false
   */
  hasDot?: boolean;

  /**
   * If true, delegates rendering to the immediate child element.
   * @default false
   */
  asChild?: boolean;
}
```

---

## 9. Variants

- **subtle (Default):** Soft tinted background with high-contrast text; ideal for tables and dense lists.
- **solid:** Fully saturated background fill with inverse text; high-emphasis alerts and critical statuses.
- **outline:** 1px border matching color scheme with transparent background; understated metadata.

---

## 10. Sizes

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 Badge Spatial Scale Matrix                              │
├──────┬────────┬──────────────┬──────────────────┬──────────────┬────────────────────────┤
│ Size │ Height │ Horiz Pad    │ Typographic Size │ Line Height  │ Border Radius          │
├──────┼────────┼──────────────┼──────────────────┼──────────────┼────────────────────────┤
│ sm   │ 20px   │ 6px          │ 11px (font-2xs)  │ 14px         │ 4px (or full pill)     │
│ md   │ 24px   │ 8px (space-2)│ 12px (font-xs)   │ 16px         │ 4px (or full pill)     │
│ lg   │ 28px   │ 10px         │ 14px (font-sm)   │ 18px         │ 6px (or full pill)     │
└──────┴────────┴──────────────┴──────────────────┴──────────────┴────────────────────────┘
```

---

## 11. States

Badges are non-interactive presentational indicators.

- **Default:** Static resting visual state.
- **Hover / Focus:** N/A (Badges do not receive keyboard focus or pointer hover transitions).

---

## 12. Behavior

- Pure presentational span element.
- Emits zero side effects or event listeners.

---

## 13. Controlled / Uncontrolled

```text
Controlled / Uncontrolled State:
N/A — Badge is a stateless data display primitive. It has no internal state.
```

---

## 14. Events

Inherits standard React HTML attributes for passive elements (`title`, `aria-label`).

---

## 15. Composition

Supports `asChild` to wrap custom elements or inline spans.

---

## 16. Ref Contract

- **Ref Forwarded:** Yes.
- **Ref Target:** `HTMLSpanElement`.

---

## 17. Accessibility

### 17.1 Semantic Element

Renders a semantic `<span>`.

### 17.2 Color Independence (WCAG 2.2 SC 1.4.1)

- Color must **never** be the sole visual indicator of state.
- A badge indicating success must contain clear text copy (e.g. `<Badge colorScheme="success">Approved</Badge>`).
- If `hasDot={true}` is enabled, the dot is marked `aria-hidden="true"` as decorative adornment.

---

## 18. Keyboard Interaction

```text
Keyboard Navigation:
N/A — Badge is non-interactive and does not participate in the sequential Tab order.
```

---

## 19. Styling Contract

```css
@layer cl-components {
  .cl-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--cl-space-1);
    font-family: var(--cl-font-sans);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    border-radius: var(--cl-rad-xs);
    border: 1px solid transparent;
  }

  .cl-badge--pill {
    border-radius: var(--cl-rad-full);
  }

  .cl-badge__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
  }

  /* Subtle Variant */
  .cl-badge--subtle.cl-badge--success {
    background-color: rgba(5, 150, 105, 0.12);
    color: var(--cl-color-suc-base);
  }

  /* Solid Variant - Uses semantic contrast token, never raw hex */
  .cl-badge--solid.cl-badge--success {
    background-color: var(--cl-color-suc-base);
    color: var(--cl-color-suc-fg);
  }

  /* Outline Variant */
  .cl-badge--outline.cl-badge--success {
    background-color: transparent;
    border-color: var(--cl-color-suc-base);
    color: var(--cl-color-suc-base);
  }
}
```

---

## 20. Theme Contract

- Semantic color tokens ensure high text contrast (> 4.5:1) in both Light and Dark modes.

---

## 21. Responsive Behavior

- Inline-flex; maintains continuous flow alongside text or inside table cells.

---

## 22. Motion

N/A — Badges do not possess animated transitions.

---

## 23. Testing

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Badge Test Matrix                             │
├───────────────────────────────────┬────────────────────────────────────┤
│ Category                          │ Applicability & Verification       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Rendering / Prop Pass-through  │ Applicable: verifies className,    │
│                                   │ children, size, variant, ref.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ N/A — Passive non-interactive.     │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Accessibility / axe-core       │ Applicable: zero violations.       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ N/A — Does not receive focus.      │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled / Uncontrolled      │ N/A — Stateless component.         │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading State Guards│ N/A — Has no disabled/loading mode.│
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR & RSC Compatibility        │ Applicable: pure Server Component. │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 24. Storybook

1. `Default`: Simple neutral badge.
2. `AllColorSchemes`: Matrix across all 7 color schemes.
3. `AllVariants`: `subtle`, `solid`, `outline` comparisons.
4. `Pills`: Badges with `isPill` enabled.
5. `WithDots`: Badges with status dots.
6. `DarkTheme`: Verified under Dark Mode contrast.

---

## 25. Documentation Requirements

- Usage examples in tables and headers.
- Props API table.
- Accessibility note on color independence.

---

## 26. Edge Cases

1. **Numeric Truncation:** Large count badges should be formatted by caller (e.g. `99+`).
2. **Text Wrap:** White-space must be `nowrap` so badges never break across multiple lines.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Badge Reference Comparison Matrix                    │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ Badge (overlapping│ Badge (overlapping │ Badge (standalone status pill)│
│ badgeContent      │ count              │ children                      │
│ color             │ status / color     │ colorScheme (7 palettes)      │
│ variant="dot"     │ dot                │ hasDot prop                   │
│ -                 │ Tag (standalone)   │ Chellaa Badge covers tags     │
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Floating Avatar Overlays:** Handled by `AvatarBadge` in Phase 6.
- **Dismissible Tags:** Handled by `Tag` with an explicit close button.

---

## 29. Functional & Non-Functional Requirements

### 29.1 Functional Requirements

- **FR-BDG-01:** The component shall render a semantic HTML `<span>` and forward its DOM ref to `HTMLSpanElement`.
- **FR-BDG-02:** The component shall support 3 visual variants: `subtle` (default), `solid`, and `outline`.
- **FR-BDG-03:** The component shall support 3 spatial sizes: `sm`, `md` (default), and `lg`.
- **FR-BDG-04:** The component shall support 7 semantic color schemes: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, and `neutral` (default).
- **FR-BDG-05:** The component shall support a full pill border-radius via the `isPill` boolean prop (default `false`).
- **FR-BDG-06:** The component shall support an optional status indicator dot via `hasDot` (default `false`), rendered as an inline element marked with `aria-hidden="true"`.
- **FR-BDG-07:** The component shall support polymorphic slot delegation via `asChild` (default `false`), preserving child attributes while merging classes.
- **FR-BDG-08:** The component shall render as a passive, non-interactive status label with `white-space: nowrap`, emitting no side effects and remaining outside sequential keyboard navigation.

### 29.2 Non-Functional Requirements

- **NFR-BDG-01:** Styling shall reside in static CSS under `@layer cl-components` using `--cl-*` design tokens, with zero Tailwind or runtime CSS-in-JS.
- **NFR-BDG-02:** The component shall have zero runtime dependencies and be completely SSR and React Server Component (RSC) safe.
- **NFR-BDG-03:** All variant and color scheme combinations shall satisfy WCAG 2.2 AA contrast ratios (> 4.5:1) in both Light and Dark modes.

### 29.3 Requirements Traceability Matrix

| Requirement ID | Description | Test Verification Case | Storybook Story |
| --- | --- | --- | --- |
| `FR-BDG-01` | Semantic span & ref forwarding | `renders semantic span and forwards ref` | `Default` |
| `FR-BDG-02` | 3 Visual variants | `applies subtle, solid, outline variant classes` | `AllVariants` |
| `FR-BDG-03` | 3 Spatial sizes | `applies sm, md, lg size classes` | `Default`, `Sizes` |
| `FR-BDG-04` | 7 Color schemes | `applies all 7 semantic color scheme modifier classes` | `AllColorSchemes` |
| `FR-BDG-05` | Pill shape | `applies cl-badge--pill when isPill is true` | `Pills` |
| `FR-BDG-06` | Status dot | `renders aria-hidden decorative dot when hasDot is true` | `WithDots` |
| `FR-BDG-07` | Polymorphism via asChild | `delegates rendering to child element via asChild` | `AsChild` |
| `FR-BDG-08` | Non-interactive & nowrap | `renders as non-focusable inline element with nowrap` | `Default` |
| `NFR-BDG-01` | CSS Layering & Tokens | `uses .cl-badge classes and token variables` | Visual Inspection |
| `NFR-BDG-02` | SSR / RSC compatibility | `renders statically without client-only hooks` | SSR Suite |
| `NFR-BDG-03` | WCAG contrast & a11y | `passes axe-core accessibility audit with zero violations` | `Default`, `AllVariants` |

---

## 30. Acceptance Criteria

- [x] Renders semantic `<span>`.
- [x] Supports 3 variants (`subtle`, `solid`, `outline`).
- [x] Supports 3 sizes (`sm`, `md`, `lg`).
- [x] Supports 7 color schemes with WCAG AA contrast.
- [x] `hasDot` renders accessible status dot with `aria-hidden="true"`.
- [x] `isPill` renders full border radius.
- [x] Zero axe-core accessibility violations.
- [x] Styled in `@layer cl-components` using `--cl-*` variables.

---

## 31. Definition of Done

The Badge specification (SPEC-006) is approved, hardened against reference libraries, verified for cross-document consistency, and ready for Phase 5 implementation.
