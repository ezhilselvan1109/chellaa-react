# ADR-002: Component Styling Architecture

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, CSS Architecture Specialist, Performance Team

---

## 1. Context and Problem Statement

Legacy React component libraries heavily relied on runtime CSS-in-JS libraries (Emotion, styled-components). In modern React (React 18 concurrent features, React 19, React Server Components, streaming SSR), runtime CSS-in-JS incurs fatal drawbacks:

- Substantial runtime JavaScript execution overhead.
- Incompatibility with React Server Components (RSC cannot inject `<style>` tags dynamically at runtime).
- Flash of Unstyled Content (FOUC) and complex hydration sync issues.
- Memory leaks and CSS rule recalculation during re-renders.

Conversely, utility-first CSS frameworks like Tailwind CSS, while popular for application development, introduce severe issues when bundled inside a published component library: class name collisions, consumer config version drift, bloated preflight resets, and lack of component-level encapsulation.

---

## 2. Decision

1. **Adopt Scoped Static CSS with Semantic CSS Custom Properties:**
   - Styles are written in pure CSS files collocated with each component (`<Component>.styles.css`).
   - All component visual properties are powered by semantic CSS custom properties (`--cl-color-primary-base`, `--cl-space-4`, etc.).
2. **Mandatory CSS Cascade Layers (`@layer cl-components`):**
   - Every component stylesheet is wrapped in the `@layer cl-components` layer.
   - Guarantees deterministic specificity regardless of import order, while allowing consumer application styles to override library styles effortlessly without resorting to `!important`.
3. **Strict `.cl-*` Class Namespacing:**
   - All classes follow the `.cl-<component>[__<element>][--<modifier>]` namespace (e.g. `.cl-button`, `.cl-button--primary`).
4. **Zero Runtime Styling Overhead:**
   - 0 KB runtime JavaScript dedicated to style injection or CSS generation.
5. **Prohibition of Tailwind CSS in the Component Library:**
   - Tailwind CSS is strictly prohibited within `@chellaa/react`.

---

## 3. Consequences

### Positive

- **Maximum Performance:** Styling evaluation is handled entirely by the browser's native C++ rendering engine.
- **RSC & SSR Native:** Works identically on the server and client without style-collector wrappers or hydration mismatch risks.
- **Consumer Flexibility:** Consumers can override styles easily via CSS custom properties or simple application CSS rules without specificity wars.

### Negative

- **Requires Modern Browser Baseline:** Safari 15.4+ is required for `@layer` support (older browsers without `@layer` are obsolete and unsupported).

---

## 4. Alternatives Considered

1. **Emotion / styled-components:** Rejected due to runtime CPU cost, bundle bloat, and fatal incompatibility with React Server Components.
2. **Tailwind CSS:** Rejected due to lack of component encapsulation, preflight CSS pollution, and consumer config collisions.
3. **Vanilla Extract / StyleX:** Rejected to eliminate build-time compile dependencies and keep CSS standard, readable, and portable.
