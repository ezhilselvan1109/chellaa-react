# ADR-003: Three-Tier Design Token Cascade & Theme Engine

## Status
Accepted

## Context
Design systems require a principled token hierarchy that balances flexibility, semantic clarity, and ease of theme customization across light, dark, and custom brand modes.

## Decision
We establish a **Three-Tier Token Architecture**:
1. **Tier 1: Global Primitive Tokens**: Raw design scales (color scales 50..950, spacing rems, font sizes, line heights, border radii, shadows, z-indices, motion curves).
2. **Tier 2: Semantic Tokens**: Role- and state-based tokens (`--ch-color-bg-canvas`, `--ch-color-bg-surface`, `--ch-color-fg-default`, `--ch-color-primary`, `--ch-color-danger`, `--ch-ring-color`).
3. **Tier 3: Component Tokens**: Scoped local customization variables (`--ch-btn-bg`, `--ch-input-border`).

### Rules of Engagement
- Components NEVER consume Tier 1 Primitive tokens directly.
- Components only consume Tier 3 Component Tokens or Tier 2 Semantic Tokens.
- Theme switching (`light`, `dark`, `system`) redefines Tier 2 semantic variables on `[data-theme="..."]`, resulting in instantaneous (<1ms) visual mode changes with 0 React tree re-renders.

## Consequences
- Clean separation between brand identity and component implementation.
- Consumers can customize the entire theme by modifying a handful of semantic CSS variables.
- Full dark mode and high-contrast accessibility support out-of-the-box.
