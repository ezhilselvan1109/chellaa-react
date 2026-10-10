---
name: accessibility-interaction-states
description: Accessibility engineering, WCAG 2.1 AA compliance, axe-core automated audits, keyboard navigation, and visible focus rings.
---

# Accessibility & Interaction States Skill

## 1. Purpose
Ensures every component in `@chellaa/react` achieves 100% WCAG 2.1 AA compliance, accessible keyboard navigation, visible focus indicators, and screen-reader friendliness.

## 2. Accessibility Standards
1. **Automated Axe-Core Audits**:
   - Every component test suite must include `toHaveNoViolations()` checks across all variants and sizes using `axe(render(<Component />).container)`.
2. **Keyboard Navigation & ARIA Patterns**:
   - Buttons: Trigger on `Enter` and `Space`.
   - Radios: Arrow key navigation within `RadioGroup`.
   - Switches: `role="switch"`, `aria-checked="true|false"`.
   - Form Controls: Automatic `aria-labelledby`, `aria-describedby`, `aria-invalid`, `aria-required`.
3. **Focus Halo Indicator**:
   - Must provide a distinct 2px–3px halo with `:focus-visible` using `var(--cl-color-focus-ring)`.
4. **Touch Target Size**:
   - Minimum 48px hit slop on touch devices (`@media (pointer: coarse)`).

## 3. Validation Commands
- `pnpm --filter @chellaa/react test` (runs all axe tests)
