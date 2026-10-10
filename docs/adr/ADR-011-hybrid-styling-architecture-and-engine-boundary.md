# ADR-011: Hybrid Token-Driven Styling Architecture & Dynamic Engine Boundary

**Status:** Accepted (Supersedes conflicting sections of ADR-002)  
**Date:** 2026-10-10  
**Deciders:** Principal Architect, Design System Specialist, Performance Team, Quality Engineer  
**Related ADRs:** ADR-001, ADR-002, ADR-003, ADR-007  

---

## 1. Context and Problem Statement

The Chellaa React component library previously had an architectural contradiction between its early architectural records and its evolving feature implementation:

1. **ADR-002 (Component Styling Architecture)** declared a 100% zero-runtime static CSS model (`<Component>.styles.css` with `@layer cl-components`), explicitly rejecting runtime CSS-in-JS (Emotion / styled-components) to maximize performance and guarantee React Server Component (RSC) compatibility.
2. **Subsequent Requirements & Architecture (e.g., 06-emotion-material-engine-specification.md)** introduced an Emotion-powered system layer (`styled()`, responsive `sx` prop engine, dynamic `ThemeProvider`) to deliver the ergonomic customization model popularized by Material UI (MUI) and the structured token coherence of Ant Design.
3. **Current State in Codebase**:
   - `tokens.css` and `theme.css` define comprehensive Tier 1/2/3 CSS custom properties (`--cl-*`).
   - `Button` and `ButtonGroup` have collocated `.styles.css` files imported into `src/styles/index.css`.
   - The remaining 16 components (`Box`, `Stack`, `Flex`, `Grid`, `Container`, `Divider`, `Typography`, `Kbd`, `Input`, `Textarea`, `FormField`, `Checkbox`, `Radio`, `Switch`, `Paper`, `Card`) rely directly on Emotion `styled()` without collocated static stylesheets in `index.css`.
   - The package bundles `@emotion/react` and `@emotion/styled` as dependencies.

This disparity created architectural ambiguity:
- Did the library offer a zero-runtime static CSS contract or a runtime CSS-in-JS contract?
- How should components be authored and distributed?
- What are the exact performance, SSR, and bundling expectations for consumers?

---

## 2. Decision: The Unified Token-Driven Hybrid Architecture

We formally adopt a **Token-Driven Hybrid Styling Architecture** that unifies static precompiled CSS and dynamic ergonomic styling under a single, authoritative design-token and theme contract.

### Architectural Tenets

```
┌─────────────────────────────────────────────────────────────────────────┐
│              Tier 1 (Primitive) & Tier 2 (Semantic) Design Tokens        │
│          (--cl-palette-*, --cl-space-*, --cl-color-*, --cl-shadow-*)     │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌──────────────────────────────────┐   ┌──────────────────────────────────┐
│   Static Component Layer (Core)  │   │   Dynamic System Layer (Flex)    │
│  - Pure precompiled CSS (.css)   │   │  - styled() component factory    │
│  - @layer cl-components          │   │  - sx responsive prop parser     │
│  - Scoped .cl-* class namespace  │   │  - Powered by Emotion bridge     │
│  - 0 KB runtime CSS calculation  │   │  - Direct token CSS variable ref │
│  - Full RSC / SSR friendliness   │   │  - Component-level overrides     │
└──────────────────────────────────┘   └──────────────────────────────────┘
```

1. **Single Source of Truth for Design Tokens**:
   - All visual decisions (colors, spacing, typography, elevation, motion, borders) originate in CSS Custom Properties (`--cl-*`) defined in `tokens.css` and `theme.css`.
   - JavaScript theme objects (`ChellaaTheme`, `createTheme`, `defaultTheme`) mirror the exact same token definitions.

2. **Core Component Styling via Native Scoped CSS**:
   - Standard component visual presentations must be authored as collocated `.styles.css` files wrapped in `@layer cl-components` and aggregated into the master `styles.css`.
   - All component styles must consume `--cl-*` variables directly.
   - Core component rendering must not require runtime CSS computation once migrated.

3. **Dynamic System Layer (`styled()` & `sx`)**:
   - For applications requiring ad-hoc styling, custom styled components, or responsive layout overrides (e.g. `<Box sx={{ p: [2, 4], bgcolor: 'primary.main' }}>`), Chellaa React provides `styled()` and `sx`.
   - The dynamic engine resolves theme keys directly to the underlying CSS variables (`bgcolor: 'primary.main'` $\rightarrow$ `var(--cl-color-primary-base)`), ensuring seamless visual fidelity with static components.

4. **Scoping the Zero-Runtime Claim**:
   - **Static Component Usage**: Consumers importing and using standard components with default styles experience **0 KB runtime CSS generation overhead**.
   - **Dynamic System Usage**: Consumers utilizing `styled()` or `sx` invoke the Emotion styling engine. The library must not claim zero runtime overhead for dynamic system invocations.

5. **Automatic Zero-Configuration CSS Delivery (Preserved from ADR-007)**:
   - Browser entry point (`dist/index.mjs`) automatically injects `import "./styles.css";`.
   - Node.js runtime entry point (`dist/index.node.mjs`) is cleanly stripped of CSS imports, preventing Node ESM crashes during SSR.

---

## 3. Supersession of Earlier Decisions

This ADR formally supersedes the following provisions in historical ADRs:
- **ADR-002 §2.4 ("Zero Runtime Styling Overhead")**: Superseded to clarify that zero runtime overhead applies to standard precompiled component styles, while dynamic styling APIs (`styled()`, `sx`) utilize an Emotion-backed bridge.
- **ADR-002 §4.1 ("Emotion / styled-components Rejected")**: Superseded by adopting Emotion specifically as the implementation provider for the system layer (`styled`, `sx`), while retaining static CSS as the primary baseline for core components.

Historical ADR documents (`ADR-002`, `ADR-007`, etc.) are preserved verbatim for architectural traceability.

---

## 4. Consequences & Trade-offs

### Positive
- **No Fragmentation**: Static components and dynamic styling primitives share the exact same `--cl-*` tokens and theme modes (`light`, `dark`).
- **Best-in-Class DX**: Developers get the speed and RSC stability of native CSS plus the ergonomic power of MUI-style `sx` and `styled()`.
- **Zero FOUC**: Theme switching is powered natively by CSS custom properties and `[data-theme]` attribute swapping, accelerated by `ThemeScript`.
- **Custom Brand Theming**: Consumers can override the entire design system by overriding CSS variables in CSS or passing a theme object to `ThemeProvider`.

### Negative / Risks
- **Dual Maintenance**: Component migrations must ensure that static CSS rules and any dynamic overrides remain in strict parity.
- **Dependency Weight**: `@emotion/react` and `@emotion/styled` remain bundled dependencies of `@chellaa/react` for the dynamic system engine.

---

## 5. Revisit Conditions

This architecture may be revisited if:
1. Native CSS gains full parameterized mixin / nesting / custom function features across all supported browsers that render CSS-in-JS libraries obsolete for dynamic `sx` props.
2. A zero-runtime ahead-of-time compiler (e.g., StyleX or specialized Vite/Rollup plugin) can completely compile `sx` props to atomic static CSS classes without runtime dependencies.
