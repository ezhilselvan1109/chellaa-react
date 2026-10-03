---
name: design-tokens
description: Authoritative guide to using, modifying, and extending the 3-tier semantic CSS design token engine in Chellaa React.
---

# Design Tokens Skill

Chellaa React uses a 3-tier design token architecture mapped entirely to CSS Custom Properties:

```text
Tier 1: Primitive Tokens  (--cl-palette-blue-600, --cl-space-4, --cl-radius-md)
           ↓
Tier 2: Semantic Tokens   (--cl-color-primary-base, --cl-color-bg-canvas)
           ↓
Tier 3: Component Tokens  (--cl-button-primary-bg, --cl-input-border)
```

## Token Naming Rules
1. **Namespace:** Every token starts with `--cl-`.
2. **Category Prefix:**
   - Colors: `--cl-color-*`
   - Spacing: `--cl-space-*`
   - Radii: `--cl-radius-*`
   - Typography: `--cl-font-*`, `--cl-text-*`
   - Elevation/Shadows: `--cl-shadow-*`
   - Motion: `--cl-duration-*`, `--cl-ease-*`
   - Z-Index: `--cl-z-*`

## Theme Modes
- Swapped via `data-theme="light"` or `data-theme="dark"` on DOM roots.
- Zero runtime JavaScript calculation; values swap via native CSS cascade.
