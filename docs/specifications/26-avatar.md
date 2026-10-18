# Avatar & AvatarGroup Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Tier 4 / Phase 3 Surfaces & Visual Data Display)  
**Specification ID:** SPEC-026  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-007-css-delivery.md](../adr/ADR-007-css-delivery.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** Chellaa Design Tokens (`--cl-*`), React 18/19  

---

## 1. Identity

```text
Component Name:     Avatar (Compound Architecture: Avatar.Root, Avatar.Image, Avatar.Fallback, Avatar.Badge, AvatarGroup)
Specification ID:   SPEC-026
Package Export:     import { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps, type AvatarSize, type AvatarShape } from "@chellaa/react";
Category:           Data Display
Status:             Approved & Implementation Ready
Phase:              Phase 3 — Surfaces & Visual Data Display
Priority:           P1 High
Version:            1.0.0
Related Components: Badge, Tooltip, Typography
Governing ADRs:     ADR-007 (Zero-Config Styling), ADR-011 (Hybrid Styling Architecture)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
Modern user interfaces heavily feature user representation: comment threads, team collaborator lists, author bylines, chat bubbles, and navigation profile menus.

Relying on naked HTML `<img>` elements introduces severe UX and accessibility hazards:
1. Broken image links render unsightly browser error icons or cause layout shifts.
2. Slow image loading leaves empty spaces without graceful skeleton or initials placeholders.
3. Lack of standardized shapes, border radii, and optical sizes breaks design system visual rhythm.
4. Overlapping group stacks (e.g. "+3 others") require complex bespoke negative margins and z-index ordering.

The `Avatar` component solves this by providing a robust user identity primitive with an integrated image loading state machine, automated initials generation, generic icon fallbacks, presence status indicators, and an `AvatarGroup` stack container.

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI library, Chellaa React requires consistent identity presentation across data tables, cards, comments, and application shells, adhering strictly to our 4px spatial grid and tokenized borders.

### 2.3 When to Use
- Displaying a user, organization, or entity profile picture.
- Displaying user initials when an image is unavailable.
- Displaying collaborator stacks on projects or document cards via `<AvatarGroup>`.
- Indicating user presence (Online, Busy, Away, Offline) via status badges.

### 2.4 When NOT to Use
- **Do NOT use Avatar for generic content thumbnails or product cards.** Use standard images or `<CardMedia>`.
- **Do NOT use Avatar for standalone interactive buttons without accessible labels.** Wrap in an `<IconButton>` or provide an explicit `aria-label`.

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Compound Structure):** `Avatar.Root`, `Avatar.Image`, `Avatar.Fallback`, `Avatar.Badge`, `AvatarGroup`.
- **FR-02 (Image Loading Machine):** Supports `src`, `srcSet`, `alt`. Tracks loading state: `idle` -> `loading` -> `loaded` | `error`. Renders fallback when `src` is missing or fails to load.
- **FR-03 (Automated Initials):** When `name?: string` is provided without `src` (or when image fails), automatically computes up to 2 uppercase initials (e.g. "Ezhil Selvan" -> "ES").
- **FR-04 (Shapes):** 3 geometric shapes: `circular` (default, `border-radius: 9999px`), `rounded` (`border-radius: var(--cl-radius-md)`), `square` (`border-radius: 0`).
- **FR-05 (Standardized Sizing Scale):** 6 optical sizes:
  - `xs`: 24px × 24px
  - `sm`: 32px × 32px
  - `md`: 40px × 40px (Default)
  - `lg`: 48px × 48px
  - `xl`: 56px × 56px
  - `2xl`: 72px × 72px
- **FR-06 (Presence Badge Slot):** `<Avatar.Badge />` positioned at bottom-right corner with 4 status presets: `online` (emerald), `offline` (slate), `busy` (rose), `away` (amber).
- **FR-07 (AvatarGroup Stacking):** `<AvatarGroup max={N} spacing={S}>` renders children with negative margin overlap, inverted z-indexes, and automatically calculates the excess `+N` badge.
- **FR-08 (Slot Delegation):** Supports `asChild?: boolean` on root.

### 3.2 Non-Functional Requirements
- **NFR-01 (Zero Layout Shift):** Container explicitly sets fixed dimensions matching the size token.
- **NFR-02 (A11y Labeling):** Accessible name derived from `alt`, `name`, or `aria-label`.

---

## 4. Non-Goals
- Built-in photo crop and upload modal (handled by higher-level upload organisms).

---

## 5. Feature Summary

| Capability | Description | Architectural Detail |
| :--- | :--- | :--- |
| **Image State Machine** | Handles load errors and slow networks | `useImageLoadingStatus` internal hook |
| **Automatic Initials** | Extracts initials from `name` | Pure regex string extractor |
| **AvatarGroup Stacking**| Negative margin stack with `+N` count | Layout flex with reverse z-index |
| **Status Badges** | Presence indicator dot | Anchored corner badge with border cutout |
| **6 Optical Sizes** | `xs` through `2xl` | Aligned with Button and Input scale |

---

## 6. Anatomy

```text
<Avatar.Root size="md" shape="circular">
  ├── <Avatar.Image src="..." alt="Ezhil Selvan" />   (.cl-avatar__image)
  ├── <Avatar.Fallback>ES</Avatar.Fallback>           (.cl-avatar__fallback)
  └── <Avatar.Badge status="online" />                (.cl-avatar__badge)
</Avatar.Root>

<AvatarGroup max={3}>
  ├── <Avatar ... />
  ├── <Avatar ... />
  ├── <Avatar ... />
  └── <div className="cl-avatar-group__excess">+2</div>
</AvatarGroup>
```

---

## 7. Public API Specification

### 7.1 Props Interface
```typescript
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circular" | "rounded" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  srcSet?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  fallback?: React.ReactNode;
  icon?: React.ReactNode;
  asChild?: boolean;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  spacing?: number | string;
  children: React.ReactNode;
}

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: AvatarStatus;
  placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
}
```

### 7.2 Tabular Props Dictionary

| Component | Prop | Type | Default | Description | A11y Impact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Avatar` | `src` | `string` | `undefined` | Image source URL | Renders `<img>` when valid |
| `Avatar` | `name` | `string` | `undefined` | Name for initials generation | Computes accessible name |
| `Avatar` | `size` | `AvatarSize` | `"md"` | Spatial dimension scale | None |
| `Avatar` | `shape` | `AvatarShape` | `"circular"` | Geometric border radius | None |
| `AvatarGroup` | `max` | `number` | `undefined` | Max avatars before truncating to `+N` | Excess announced |
| `Avatar.Badge`| `status` | `AvatarStatus` | `"online"` | Status indicator color | Includes `aria-label` |

---

## 8. TypeScript Types

```typescript
// packages/react/src/components/Avatar/Avatar.types.ts

import * as React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circular" | "rounded" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarContextValue {
  size: AvatarSize;
  shape: AvatarShape;
}
```

---

## 9. Variants & Visual States

- **`circular`:** `border-radius: var(--cl-radius-full, 9999px)`.
- **`rounded`:** `border-radius: var(--cl-radius-md, 6px)`.
- **`square`:** `border-radius: 0`.
- **Fallback Surface:** Soft tinted neutral background (`var(--cl-color-bg-subtle)`) with contrasting font color (`var(--cl-color-text-secondary)`).

---

## 10. Sizes & Metrics

| Size | Dimensions | Font Size | Badge Size |
| :--- | :--- | :--- | :--- |
| `xs` | 24px × 24px | 10px | 6px |
| `sm` | 32px × 32px | 12px | 8px |
| `md` | 40px × 40px | 14px | 10px |
| `lg` | 48px × 48px | 16px | 12px |
| `xl` | 56px × 56px | 18px | 14px |
| `2xl`| 72px × 72px | 24px | 16px |

---

## 11. States & Pseudo-Classes

- Image Loading: While loading, fallback is rendered beneath transparent image.
- Image Error: Image unmounts; fallback renders permanently.

---

## 12. Behavioral Specification

- Initials extractor splits `name` by spaces/hyphens and takes the first character of the first and last words.

---

## 13. Controlled / Uncontrolled State Behavior

- Stateless presentational component with internal image loading state machine.

---

## 14. Events Contract

- `onError`: Optional event handler when image fails to load.
- `onLoad`: Optional event handler when image loads successfully.

---

## 15. Composition & Slot Delegation

- Supports `asChild?: boolean`.
- Composable inside `<Tooltip>` or `<Popover>`.

---

## 16. Ref Contract

- Forwarded ref binds to root `HTMLDivElement`.

---

## 17. Accessibility Specification (WCAG 2.2 AA & APG)

1. **Accessible Name:** If `alt` or `name` is provided, root receives `role="img"` and `aria-label={alt || name}`.
2. **Status Badge:** Badge includes accessible label (`aria-label={`Status: ${status}`}`).
3. **Pure Decorative Fallback:** If avatar is decorative, use `aria-hidden="true"`.

---

## 18. Keyboard Interaction Keymap

Presentational primitive; non-interactive unless wrapped in an interactive element.

---

## 19. Styling Contract (Scoped Static CSS & `--cl-*` Tokens)

```css
@layer cl-components {
  .cl-avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    user-select: none;
    background-color: var(--cl-color-bg-subtle, #f1f5f9);
    color: var(--cl-color-text-secondary, #475569);
    font-family: var(--cl-font-family-sans);
    font-weight: var(--cl-font-weight-semibold, 600);
    box-sizing: border-box;
  }

  /* Shapes */
  .cl-avatar--circular { border-radius: var(--cl-radius-full, 9999px); }
  .cl-avatar--rounded { border-radius: var(--cl-radius-md, 6px); }
  .cl-avatar--square { border-radius: 0; }

  /* Sizes */
  .cl-avatar--xs { width: 24px; height: 24px; font-size: 10px; }
  .cl-avatar--sm { width: 32px; height: 32px; font-size: 12px; }
  .cl-avatar--md { width: 40px; height: 40px; font-size: 14px; }
  .cl-avatar--lg { width: 48px; height: 48px; font-size: 16px; }
  .cl-avatar--xl { width: 56px; height: 56px; font-size: 18px; }
  .cl-avatar--2xl { width: 72px; height: 72px; font-size: 24px; }

  .cl-avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cl-avatar__badge {
    position: absolute;
    bottom: 0;
    right: 0;
    box-sizing: content-box;
    border: 2px solid var(--cl-color-bg-surface, #ffffff);
    border-radius: var(--cl-radius-full, 9999px);
  }

  .cl-avatar__badge--online { background-color: var(--cl-color-success-solid, #10b981); }
  .cl-avatar__badge--offline { background-color: var(--cl-color-neutral-solid, #64748b); }
  .cl-avatar__badge--busy { background-color: var(--cl-color-danger-solid, #f43f5e); }
  .cl-avatar__badge--away { background-color: var(--cl-color-warning-solid, #f59e0b); }

  /* Avatar Group */
  .cl-avatar-group {
    display: inline-flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .cl-avatar-group .cl-avatar {
    margin-left: -8px;
    border: 2px solid var(--cl-color-bg-surface, #ffffff);
  }
}
```

---

## 20. Theme Contract

Adapts automatically via `--cl-color-bg-subtle`, `--cl-color-text-secondary`, and `--cl-color-bg-surface` border rings.

---

## 21. Responsive Behavior

Fixed pixel sizes prevent layout jumps.

---

## 22. Motion & Animations

Image fade-in duration: 150ms.

---

## 23. Testing Specification

| Test Category | Scenario | Expected Outcome |
| :--- | :--- | :--- |
| **1. Initials Calculation** | Pass `name="Ezhil Selvan"` | Renders "ES" text inside fallback |
| **2. Image Fallback** | Image fails to load | Automatically falls back to initials / icon |
| **3. Shapes & Sizes** | Render all 6 sizes and 3 shapes | Respective CSS classes attached |
| **4. Group Overlap** | Render `<AvatarGroup max={2}>` with 4 items | Renders 2 avatars and "+2" excess indicator |
| **5. Accessibility** | Run `axe(container)` with badge | 0 accessibility violations |

---

## 24. Storybook Contract

Stories in `packages/react/src/components/Avatar/Avatar.stories.tsx`:
1. `AllSizes`: Grid of `xs` through `2xl`.
2. `AllShapes`: `circular`, `rounded`, `square`.
3. `WithBadges`: `online`, `offline`, `busy`, `away`.
4. `AvatarGroup`: Stacking with excess limit.
5. `BrokenImageFallback`: Graceful recovery from 404 URL.

---

## 25. Documentation Reqs

API props table, initials generation examples, and group stacking patterns.

---

## 26. Edge Cases & Hazards

1. Single-word names ("Admin") -> produces single initial "A".
2. Non-Latin scripts -> handles unicode characters gracefully without truncating surrogate pairs.

---

## 27. Reference Comparison

| Feature | Chellaa React | MUI Avatar | Ant Design Avatar | Radix Avatar |
| :--- | :--- | :--- | :--- | :--- |
| **Automatic Initials** | Built-in from `name` | Manual | Manual string | Manual |
| **Group Stacking** | `<AvatarGroup max={N}>` | `<AvatarGroup>` | `<Avatar.Group>` | None |
| **Styling** | Scoped static CSS in `@layer` | Emotion | Less | Headless |

---

## 28. Deferred Features

- Interactive avatar upload click with photo cropping modal (Phase 6).

---

## 29. Acceptance Criteria

- [ ] `Avatar` and `AvatarGroup` implemented.
- [ ] 6 sizes and 3 shapes supported.
- [ ] Image loading state machine with initials fallback.
- [ ] Presence status badge support.
- [ ] Zero axe accessibility violations.
- [ ] 100% test pass rate in Vitest.

---

## 30. Implementation Plan, Governance & Traceability

### 30.1 Target Files
```text
packages/react/src/components/Avatar/
├── Avatar.tsx
├── Avatar.types.ts
├── Avatar.styles.css
├── Avatar.test.tsx
├── Avatar.stories.tsx
├── AvatarGroup.tsx
└── index.ts
```

### 30.2 Traceability Matrix

| Requirement | Source Rule / ADR | Workflow Stage | Acceptance Criterion |
| :--- | :--- | :--- | :--- |
| Scoped Styling | ADR-007, ADR-011 | Workflow F | Authored in `@layer cl-components` |
| Image Fallbacks | Document 04 (A11y) | Workflow F | Graceful degradation to initials |
| Grouping & Stacking | Master Roadmap Tier 4 | Workflow F | Max count truncation with `+N` |
