---
name: design-token-architecture
description: Procedures, validation rules, and taxonomy for defining and extending Tier 1 (Primitive), Tier 2 (Semantic), and Tier 3 (Component) CSS design tokens in Chellaa React.
---

# Design Token Architecture Skill

## 1. Purpose
This skill defines the procedures, naming rules, inheritance relationships, and contrast standards for creating, updating, and validating CSS Custom Properties (`--cl-*`) across the 3-tier token system.

## 2. When to Use
- Adding new design tokens (colors, spacing, typography, shadows, radii, motion, z-index).
- Updating light/dark theme semantic mappings.
- Adding Tier 3 component tokens for newly migrated components.

## 3. Required Inputs & Prerequisites
- **Inputs**: Token category, scale step/intent, hex/rem/ms value, dark-mode equivalent.
- **Prerequisites**: Must adhere to [ADR-011](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md) and [07-hybrid-design-token-and-styling-engine-specification.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/architecture/07-hybrid-design-token-and-styling-engine-specification.md).

## 4. Step-by-Step Procedure
1. **Tier 1 (Primitive) Registration** (`packages/react/src/styles/tokens.css`):
   - Place inside `@layer cl-tokens { :root { ... } }`.
   - Follow `--cl-palette-<color>-<step>`, `--cl-space-<step>`, `--cl-rad-<size>`, `--cl-shadow-<elev>`.
2. **Tier 2 (Semantic) Registration** (`packages/react/src/styles/theme.css`):
   - Map intent to primitive token in `:root, [data-theme="light"]` within `@layer cl-theme`.
   - Provide dark-mode counterpart in `[data-theme="dark"]`.
3. **Tier 3 (Component) Registration** (`packages/react/src/styles/theme.css`):
   - Define `--cl-<component>-<element>-<property>` referencing Tier 2 semantic tokens.
4. **TypeScript Theme Object Synchronization** (`packages/react/src/theme/`):
   - Ensure `createPalette.ts` / `defaultTheme.ts` reflects matching token values.

## 5. Validation Commands & Acceptance Criteria
- **Validation Command**: `pnpm --filter @chellaa/react build`
- **Acceptance Criteria**:
  - LightningCSS compiles `dist/styles.css` with 0 syntax errors.
  - WCAG 2.1 AA contrast ratio $\ge 4.5:1$ for normal text, $\ge 3.0:1$ for large text and UI borders.
  - Reduced-motion media query overrides all transition tokens to 0ms.
