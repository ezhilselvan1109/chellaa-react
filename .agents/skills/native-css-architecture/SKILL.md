---
name: native-css-architecture
description: Standards, cascade layer rules, scoping conventions, and specificity mechanics for authoring precompiled component stylesheets in Chellaa React.
---

# Native CSS Architecture & Cascade Management Skill

## 1. Purpose
Defines standards for writing scoped `.styles.css` files, managing CSS Cascade Layers (`@layer`), class namespacing, and deterministic precedence over dynamic `sx` and consumer application styles.

## 2. Cascade Layer Hierarchy & Specificity Rules
Chellaa React establishes a strict layer order:
```css
@layer cl-reset, cl-tokens, cl-theme, cl-components, cl-utilities;
```

### Precedence Mechanics:
1. **Unlayered Styles Win Over Layered Styles (CSS Spec Rule)**:
   - According to the CSS Cascading and Inheritance Level 5 specification, any unlayered style declaration takes precedence over any layered style declaration, regardless of selector specificity.
   - **Static Component Styles**: Placed inside `@layer cl-components { ... }`.
   - **Consumer Overrides & Unlayered Application CSS**: Naturally override library component styles without needing `!important`.
   - **Dynamic `sx` / `styled()` Overrides**: Injected by Emotion into `<style>` elements as unlayered CSS rules. Because unlayered rules inherently beat `@layer cl-components` in the cascade, `sx` overrides reliably win over base static component styles without specificity escalation hacks.
2. **Explicit Specificity Test**: Every component with static styles and `sx` support must include an automated DOM specificity test verifying that `<Component sx={{ ... }} />` overrides the base `.cl-*` class properties.

## 3. Scoping & Class Naming Rules
- **Namespace**: `.cl-<component>[__<element>][--<modifier>]`
- **Zero Raw Values**: Every declaration must use `var(--cl-*)`.
- **Reduced Motion**: All animations and transitions must respect `@media (prefers-reduced-motion: reduce)`.
- **Focus Rings**: Use `:focus-visible` with `var(--cl-color-focus-ring)`. Never disable outline without providing an accessible focus indicator.

## 4. Step-by-Step Component Stylesheet Procedure
1. Create `packages/react/src/components/<ComponentName>/<ComponentName>.styles.css`.
2. Wrap all rules in `@layer cl-components { ... }`.
3. Import into `packages/react/src/styles/index.css`.
4. Compile with LightningCSS and verify bundle size impact.

## 5. Validation Commands
- `pnpm --filter @chellaa/react build`
- `pnpm --filter @chellaa/react test`
