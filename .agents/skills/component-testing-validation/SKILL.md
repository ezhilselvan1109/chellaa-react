---
name: component-testing-validation
description: Comprehensive testing procedures covering DOM structure, prop variants, user interactions, controlled/uncontrolled state, axe a11y, and CSS cascade specificity.
---

# Component Testing & Validation Skill

## 1. Purpose
Defines the mandatory **7-Layer Component Test Standard** for all `@chellaa/react` components.

## 2. The 7-Layer Test Standard
Every component's `.test.tsx` file must cover:
1. **Rendering & DOM Structure**: Renders expected tag name, forwards ref to DOM node, merges custom classNames and inline styles.
2. **Variants, Sizes & Color Schemes**: Renders all visual variants (`solid`, `outline`, etc.) and sizes (`sm`, `md`, `lg`) with correct classes/styles.
3. **User Interactions & Events**: Dispatches click, keydown, focus, blur, and verifies callback handlers.
4. **Accessibility Compliance (`axe`)**: 0 axe-core violations across default and variant states.
5. **Keyboard Navigation & Focus Rings**: Tab index progression and focus visible indicator behavior.
6. **Controlled vs. Uncontrolled State**: Operates correctly with `value`/`onChange` and `defaultValue`.
7. **CSS Specificity Overrides**: Verifies that custom `sx` or unlayered consumer classes override default static component styles.

## 3. Validation Commands
- `pnpm --filter @chellaa/react test`
