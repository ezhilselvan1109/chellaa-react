---
name: design-token-architecture
description: Procedures, validation rules, and taxonomy for defining and extending Tier 1 (Primitive), Tier 2 (Semantic), and Tier 3 (Component) CSS design tokens in Chellaa React.
---

# Design Token Architecture Skill

## 1. Purpose
This skill defines the procedures, naming rules, inheritance relationships, and contrast standards for creating, updating, and validating CSS Custom Properties (`--cl-*`) across the 3-tier token system.

```text
Tier 1: Primitive Tokens  (--cl-palette-blue-600, --cl-space-4, --cl-radius-md, --cl-font-sm)
           ↓
Tier 2: Semantic Tokens   (--cl-color-primary-base, --cl-color-bg-canvas, --cl-color-text-primary)
           ↓
Tier 3: Component Tokens  (--cl-button-primary-bg, --cl-input-border, --cl-card-bg)
```

## 2. Token Naming Rules & Taxonomy

1. **Namespace:** Every token starts with the library prefix `--cl-`.
2. **Category Prefixes:**
   - Colors & Palettes: `--cl-palette-*`, `--cl-color-*`
   - Spacing: `--cl-space-*` (e.g. `--cl-space-1`, `--cl-space-1-5`, `--cl-space-2`)
   - Radii: `--cl-radius-*` (canonical) and `--cl-rad-*` (compatibility aliases)
   - Typography: `--cl-font-family-*`, `--cl-font-size-*`, `--cl-line-height-*`, `--cl-font-*`, `--cl-text-*`
   - Elevation & Shadows: `--cl-shadow-*` (0–24 M3 numeric stops and semantic levels)
   - Motion & Easing: `--cl-motion-*`, `--cl-duration-*`, `--cl-easing-*`, `--cl-ease-*`
   - Viewport Breakpoints: `--cl-breakpoint-*` (xs, sm, md, lg, xl)
   - Z-Index: `--cl-z-*`

## 3. Theme Modes & Cascade Architecture
- Swapped via `data-theme="light"` or `data-theme="dark"` on DOM roots.
- Zero runtime JavaScript calculation required for theme rendering; values swap cleanly via native CSS cascade inside `@layer cl-theme`.

## 4. When to Use
- Adding new design tokens (colors, spacing, typography, shadows, radii, motion, z-index).
- Updating light/dark theme semantic mappings.
- Adding Tier 3 component tokens for newly migrated components.

## 5. Required Inputs & Prerequisites
- **Inputs**: Token category, scale step/intent, hex/rem/ms value, dark-mode equivalent.
- **Prerequisites**: Must adhere to [ADR-011](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md) and [07-hybrid-design-token-and-styling-engine-specification.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/architecture/07-hybrid-design-token-and-styling-engine-specification.md).

## 6. Step-by-Step Procedure
1. **Tier 1 (Primitive) Registration** (`packages/react/src/styles/tokens.css`):
   - Place inside `@layer cl-tokens { :root { ... } }`.
   - Follow `--cl-palette-<color>-<step>`, `--cl-space-<step>`, `--cl-radius-<size>`, `--cl-shadow-<elev>`.
2. **Tier 2 (Semantic) Registration** (`packages/react/src/styles/theme.css`):
   - Map intent to primitive token in `:root, [data-theme="light"]` within `@layer cl-theme`.
   - Provide dark-mode counterpart in `[data-theme="dark"]`.
3. **Tier 3 (Component) Registration** (`packages/react/src/styles/theme.css`):
   - Define `--cl-<component>-<element>-<property>` referencing Tier 2 semantic tokens.
4. **TypeScript Theme Object Synchronization** (`packages/react/src/theme/`):
   - Ensure `createPalette.ts` / `defaultTheme.ts` reflects matching token values.

## 7. Validation Commands & Acceptance Criteria
- **Validation Command**: `pnpm --filter @chellaa/react build`
- **Acceptance Criteria**:
  - LightningCSS compiles `dist/styles.css` with 0 syntax errors.
  - WCAG 2.1 AA contrast ratio $\ge 4.5:1$ for normal text, $\ge 3.0:1$ for large text and UI borders.
  - Reduced-motion media query overrides all transition tokens to 0ms.
