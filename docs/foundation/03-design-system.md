# Chellaa React — Foundation Architecture
## Document 03: Design System & Token Foundation

**Document Status:** Approved & Baseline  
**Phase:** 1 — Foundation  
**Version:** 1.0.0  
**Target Package:** `@chellaa/react`  

---

## 1. Introduction

This document establishes the visual, spatial, and interaction foundation of **Chellaa React**. It details the three-tier design token architecture, semantic color systems, typographic scales, elevation models, motion physics, and responsive breakpoints that govern all components in the library.

Individual React components (e.g., Button, Modal) are **not** specified in this document; rather, this document creates the unified design language and mathematical scales upon which all components will be constructed.

---

## 2. Design Philosophy

Chellaa React embodies a design philosophy defined as **Tactile Clarity**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Tactile Clarity: Core Pillars                     │
├───────────────────────┬────────────────────────────────────────────────┤
│ 1. Calm & Purposeful  │ Reduces cognitive friction. Quiet backgrounds, │
│                       │ deliberate high-contrast accents.              │
├───────────────────────┼────────────────────────────────────────────────┤
│ 2. Tactile Depth      │ Physicality through subtle multi-layered drops, │
│                       │ hairline borders (1px), and soft ambient glows.│
├───────────────────────┼────────────────────────────────────────────────┤
│ 3. Spatial Rhythm     │ Strict 4px/8px mathematical baseline grid for  │
│                       │ proportional balance and harmony.              │
├───────────────────────┼────────────────────────────────────────────────┤
│ 4. Optical Alignment  │ Adjusted micro-spacing to ensure text, icons,   │
│                       │ and glyphs look centered to human eyes.        │
├───────────────────────┼────────────────────────────────────────────────┤
│ 5. Dynamic Feedback   │ Natural, physics-inspired micro-interactions;  │
│                       │ fluid state changes without visual jarring.    │
└───────────────────────┴────────────────────────────────────────────────┘
```

- **Visual Sophistication:** Moving beyond flat, sterile palettes. Surfaces possess subtle tonal nuance, pairing crisp 1px borders with layered ambient shadows.
- **Dark Mode as a First-Class Citizen:** Dark mode is not an inverted afterthought. In dark mode, elevation is expressed through increased surface luminance and border lighting rather than heavy dark shadows.
- **Accessible by Design:** Every color pair in the semantic system strictly satisfies WCAG 2.2 Level AA contrast requirements (minimum 4.5:1 for text, 3:1 for interactive boundaries).

---

## 3. Design Token Hierarchy

Chellaa React implements a strict **Three-Tier Design Token Architecture**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                       Three-Tier Token Pipeline                        │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Primitive Tokens (Raw, context-free values)                         │
│    Example: blue-600: #2563eb | space-4: 16px | radius-md: 6px         │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 2. Semantic Tokens (Intent and context-aware values)                   │
│    Example: color-primary-base: var(--cl-color-blue-600)               │
│             color-bg-canvas: #ffffff (Light) / #0f172a (Dark)          │
├───────────────────────────────────┬────────────────────────────────────┤
│                                   ▼                                    │
│ 3. Component Tokens (Component-specific scoped aliases)                │
│    Example: button-primary-bg: var(--cl-color-primary-base)            │
│             input-border-focus: var(--cl-color-primary-base)           │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Tier 1: Primitive Tokens (Global)
- **Role:** Pure mathematical and raw color values without semantic meaning.
- **Naming Pattern:** `--cl-<category>-<scale>` (e.g., `--cl-palette-blue-500`, `--cl-raw-space-16`).
- **Characteristics:** Static across themes. A raw hex value like `#3b82f6` or raw dimension `16px` never changes based on mode or context.

### 3.2 Tier 2: Semantic Tokens (System Context)
- **Role:** Map primitives to architectural intent (surfaces, text, interactive actions, feedback).
- **Naming Pattern:** `--cl-<category>-<role>-<variant>` (e.g., `--cl-color-bg-canvas`, `--cl-color-fg-muted`, `--cl-color-primary-base`).
- **Characteristics:** Theme-dependent. When switching from light to dark mode, `--cl-color-bg-canvas` swaps from white (`#ffffff`) to deep slate (`#090d16`), but component code never changes.

### 3.3 Tier 3: Component Tokens (Component Scope)
- **Role:** Scoped variables mapped directly to a specific component's visual properties.
- **Naming Pattern:** `--cl-<component>-<element>-<property>` (e.g., `--cl-button-primary-bg`, `--cl-dialog-backdrop-blur`).
- **Characteristics:** Enable targeted component customization without altering the global semantic tokens.

---

## 4. Color System

### 4.1 Primitive Palette Scales
Chellaa React defines 10-step harmonic color ramps (50 to 950) generated in OKLCH/HSL color spaces for uniform perceptual luminance:
- **Slate (Neutral):** Base for surfaces, text, and borders.
- **Indigo (Primary Default):** Core brand and primary interactive action.
- **Violet (Secondary Default):** Accent and secondary actions.
- **Emerald (Success):** Affirmative states, success notifications, active badges.
- **Amber (Warning):** Cautionary alerts, warnings, paused states.
- **Rose (Danger / Error):** Destructive actions, validation errors, critical alerts.
- **Sky (Info):** Informational banners, guides, neutral status indicators.

### 4.2 Semantic Color Mapping Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               Semantic Color Definitions                                │
├──────────────────────┬────────────────────────────┬─────────────────────────────────────┤
│ Semantic Token       │ Light Mode Value           │ Dark Mode Value                     │
├──────────────────────┼────────────────────────────┼─────────────────────────────────────┤
│ --cl-color-bg-canvas │ #ffffff (White)            │ #090d16 (Deep Slate Canvas)         │
│ --cl-color-bg-surface│ #f8fafc (Slate-50)         │ #131b2e (Slate Surface)             │
│ --cl-color-bg-elev   │ #ffffff (Card Elevated)    │ #1e293b (Slate-800 Elevated)        │
│ --cl-color-bg-muted  │ #f1f5f9 (Slate-100)        │ #1e293b (Subtle Background)         │
├──────────────────────┼────────────────────────────┼─────────────────────────────────────┤
│ --cl-color-fg-primary│ #0f172a (Slate-900: 15.8:1)│ #f8fafc (Slate-50: 15.2:1)          │
│ --cl-color-fg-second │ #334155 (Slate-700: 9.4:1) │ #cbd5e1 (Slate-300: 9.8:1)          │
│ --cl-color-fg-muted  │ #64748b (Slate-500: 4.8:1) │ #94a3b8 (Slate-400: 5.6:1)          │
│ --cl-color-fg-inverse│ #ffffff (Pure White)       │ #0f172a (Slate-900)                 │
├──────────────────────┼────────────────────────────┼─────────────────────────────────────┤
│ --cl-color-border-sub│ #e2e8f0 (Slate-200)        │ #1e293b (Slate-800)                 │
│ --cl-color-border-def│ #cbd5e1 (Slate-300)        │ #334155 (Slate-700)                 │
│ --cl-color-border-str│ #94a3b8 (Slate-400)        │ #475569 (Slate-600)                 │
├──────────────────────┼────────────────────────────┼─────────────────────────────────────┤
│ --cl-color-pri-base  │ #4f46e5 (Indigo-600)       │ #6366f1 (Indigo-500)                │
│ --cl-color-pri-hover │ #4338ca (Indigo-700)       │ #818cf8 (Indigo-400)                │
│ --cl-color-pri-active│ #3730a3 (Indigo-800)       │ #4f46e5 (Indigo-600)                │
│ --cl-color-pri-fg    │ #ffffff (Pure White)       │ #ffffff (Pure White)                │
├──────────────────────┼────────────────────────────┼─────────────────────────────────────┤
│ --cl-color-suc-base  │ #059669 (Emerald-600)      │ #10b981 (Emerald-500)               │
│ --cl-color-war-base  │ #d97706 (Amber-600)        │ #f59e0b (Amber-500)                 │
│ --cl-color-dan-base  │ #e11d48 (Rose-600)         │ #f43f5e (Rose-500)                  │
│ --cl-color-inf-base  │ #0284c7 (Sky-600)          │ #0ea5e9 (Sky-500)                   │
├──────────────────────┼────────────────────────────┼─────────────────────────────────────┤
│ --cl-color-focus-ring│ rgba(99, 102, 241, 0.45)   │ rgba(129, 140, 248, 0.55)           │
└──────────────────────┴────────────────────────────┴─────────────────────────────────────┘
```

---

## 5. Typography

### 5.1 Font Family Strategy
Chellaa React uses clean, high-performance system font stacks by default to eliminate layout shifts (CLS) and network latency. Consumers can override the font stack globally via a single CSS variable.

- **Sans-Serif (Default UI Stack):**  
  `--cl-font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;`
- **Monospace (Code & Numbers Stack):**  
  `--cl-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;`

### 5.2 Type Scale
The typographic scale utilizes a modern rem-based modular scale (1rem = 16px default browser baseline):

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Typographic Scale Matrix                        │
├─────────────┬───────────┬──────────────┬──────────────┬────────────────┤
│ Token       │ Size (rem)│ Size (px)    │ Line Height  │ Tracking       │
├─────────────┼───────────┼──────────────┼──────────────┼────────────────┤
│ font-xs     │ 0.75rem   │ 12px         │ 1.00rem/16px │ +0.01em        │
│ font-sm     │ 0.875rem  │ 14px         │ 1.25rem/20px │ 0              │
│ font-base   │ 1.00rem   │ 16px         │ 1.50rem/24px │ 0              │
│ font-lg     │ 1.125rem  │ 18px         │ 1.75rem/28px │ -0.01em        │
│ font-xl     │ 1.25rem   │ 20px         │ 1.75rem/28px │ -0.015em       │
│ font-2xl    │ 1.50rem   │ 24px         │ 2.00rem/32px │ -0.02em        │
│ font-3xl    │ 1.875rem  │ 30px         │ 2.25rem/36px │ -0.025em       │
│ font-4xl    │ 2.25rem   │ 36px         │ 2.50rem/40px │ -0.03em        │
│ font-5xl    │ 3.00rem   │ 48px         │ 1.15         │ -0.035em       │
└─────────────┴───────────┴──────────────┴──────────────┴────────────────┘
```

### 5.3 Font Weights & Hierarchy
- **Regular (400):** Default body copy, descriptions, input field text.
- **Medium (500):** Interactive labels, buttons, navigation items, table headers.
- **Semi-bold (600):** Section headings (H3–H6), card titles, modal headers.
- **Bold (700):** Display headings (H1–H2), hero metrics, banner callouts.

---

## 6. Spacing & Spatial Grid

Chellaa React is anchored to a strict **4px/8px Spatial Baseline Grid**. Spacing tokens govern margins, paddings, gaps, and layout flow.

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Spacing Scale Matrix                           │
├─────────────┬──────────────┬───────────┬───────────────────────────────┤
│ Token       │ Value (rem)  │ Value (px)│ Typical Usage                 │
├─────────────┼──────────────┼───────────┼───────────────────────────────┤
│ --cl-space-0│ 0rem         │ 0px       │ Reset                         │
│ --cl-space-1│ 0.25rem      │ 4px       │ Micro spacing, badge padding  │
│ --cl-space-2│ 0.50rem      │ 8px       │ Compact gap, button xs pad    │
│ --cl-space-3│ 0.75rem      │ 12px      │ Standard input padding        │
│ --cl-space-4│ 1.00rem      │ 16px      │ Standard card padding, gap    │
│ --cl-space-5│ 1.25rem      │ 20px      │ Modal header padding          │
│ --cl-space-6│ 1.50rem      │ 24px      │ Section margins, large cards  │
│ --cl-space-8│ 2.00rem      │ 32px      │ Container padding, stack gap  │
│ --cl-space-10 2.50rem      │ 40px      │ Page section spacing          │
│ --cl-space-12 3.00rem      │ 48px      │ Large component separation    │
│ --cl-space-16 4.00rem      │ 64px      │ Hero container spacing        │
└─────────────┴──────────────┴───────────┴───────────────────────────────┘
```

---

## 7. Interactive Sizing & Touch Targets

Interactive components (`Button`, `Input`, `Select`, `IconButton`) share an identical sizing scale to guarantee optical alignment when grouped horizontally in toolbars or forms:

```
┌────────────────────────────────────────────────────────────────────────┐
│                       Interactive Sizing Scale                         │
├─────────────┬──────────────┬──────────────┬────────────────────────────┤
│ Size Token  │ Height (px)  │ Min-Width(px)│ Accessible Touch Target    │
├─────────────┼──────────────┼──────────────┼────────────────────────────┤
│ xs          │ 28px         │ 28px         │ Compact toolbars (Desktop) │
│ sm          │ 32px         │ 32px         │ Dense data grids           │
│ md (Default)│ 40px         │ 40px         │ Standard UI forms (40px)   │
│ lg          │ 48px         │ 48px         │ Mobile touch target (48px) │
│ xl          │ 56px         │ 56px         │ Prominent callouts         │
└─────────────┴──────────────┴──────────────┴────────────────────────────┘
```

> **Touch Target Notice:** WCAG 2.2 Success Criterion 2.5.8 (Target Size - Minimum) requires targets to be at least 24x24px, with 44–48px recommended for primary touch devices. Sizes `md`, `lg`, and `xl` satisfy mobile touch requirements natively. For `xs` and `sm`, an invisible pseudo-element (`::after`) can expand the touch target to 44px on touch-enabled devices.

---

## 8. Border Radius

Chellaa React uses a balanced corner curvature scale that provides modern, friendly contours without appearing cartoonish:

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Border Radius Scale                            │
├──────────────┬─────────────┬───────────────────────────────────────────┤
│ Token        │ Value       │ Recommended Applications                  │
├──────────────┼─────────────┼───────────────────────────────────────────┤
│ --cl-rad-none│ 0px         │ Squared corners, tables, full-width tiles │
│ --cl-rad-xs  │ 2px         │ Badges, micro tags                        │
│ --cl-rad-sm  │ 4px         │ Checkboxes, tooltips                      │
│ --cl-rad-md  │ 6px         │ Standard buttons, inputs, dropdown items  │
│ --cl-rad-lg  │ 8px         │ Cards, modal dialogs, popovers            │
│ --cl-rad-xl  │ 12px        │ Large featured cards, floating sheets     │
│ --cl-rad-2xl │ 16px        │ Hero containers, interactive banners      │
│ --cl-rad-full│ 9999px      │ Pills, avatar circles, circular buttons   │
└──────────────┴─────────────┴───────────────────────────────────────────┘
```

---

## 9. Elevation & Shadows

Elevation communicates depth, hierarchy, and surface stacking.

### 9.1 Light Mode Shadows
Light mode utilizes dual-layer shadows combining a crisp directional drop with a soft, diffused ambient occlusion:
- `--cl-shadow-sm:` `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- `--cl-shadow-md:` `0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)`
- `--cl-shadow-lg:` `0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)`
- `--cl-shadow-xl:` `0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.04)`

### 9.2 Dark Mode Elevation Strategy
In dark themes, traditional black drop-shadows become invisible against dark surfaces. Chellaa React solves this using:
1. **Luminance Stacking:** Higher elevation layers utilize subtly lighter surface background tokens.
2. **Hairline Border Stroke:** A 1px border with 8–15% white opacity (`rgba(255, 255, 255, 0.08)`).
3. **Subtle Ambient Rim Glow:** Soft deep shadows (`0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px -4px rgba(0,0,0,0.4)`).

---

## 10. Responsive Breakpoints

Chellaa React follows a mobile-first responsive scale:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Responsive Breakpoints                          │
├──────────────┬─────────────┬───────────────────────────────────────────┤
│ Breakpoint   │ Min Width   │ Device Target                             │
├──────────────┼─────────────┼───────────────────────────────────────────┤
│ sm           │ 640px       │ Large smartphones, small tablets portrait │
│ md           │ 768px       │ Tablets, small laptop screens             │
│ lg           │ 1024px      │ Desktop monitors, landscape tablets       │
│ xl           │ 1280px      │ High-resolution widescreen monitors       │
│ 2xl          │ 1536px      │ Ultra-wide displays, high-density rigs    │
└──────────────┴─────────────┴───────────────────────────────────────────┘
```

---

## 11. Layering & Z-Index Architecture

To permanently prevent z-index collision bugs across overlays, tooltips, dialogs, and navigation bars, Chellaa React defines an authoritative z-index scale:

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Authoritative Z-Index Scale                    │
├────────────────────┬───────────┬───────────────────────────────────────┤
│ Token              │ Value     │ Intended Layer                        │
├────────────────────┼───────────┼───────────────────────────────────────┤
│ --cl-z-deep        │ -1        │ Decorative background patterns        │
│ --cl-z-base        │ 0         │ Standard flow content                 │
│ --cl-z-raised      │ 10        │ Hovered cards, elevated table headers │
│ --cl-z-dropdown    │ 1000      │ Select menus, autocomplete popovers   │
│ --cl-z-sticky      │ 1100      │ Sticky headers, floating action bars  │
│ --cl-z-backdrop    │ 1200      │ Dialog backdrop overlays, drawers     │
│ --cl-z-modal       │ 1300      │ Modal dialog containers, sheets       │
│ --cl-z-popover     │ 1400      │ Contextual popovers, date-pickers     │
│ --cl-z-toast       │ 1500      │ Toast alerts, snackbars (Always top)  │
│ --cl-z-tooltip     │ 1600      │ Tooltips (Must float above everything)│
└────────────────────┴───────────┴───────────────────────────────────────┘
```

---

## 12. Motion & Transitions

Micro-interactions must feel responsive, organic, and purposeful.

### 12.1 Durations
- `--cl-duration-fast: 150ms` (Micro-interactions: buttons, checkbox toggles, hover effects).
- `--cl-duration-normal: 250ms` (Component state transitions: dropdown openings, tab switches).
- `--cl-duration-slow: 350ms` (Large surface movements: modal dialog reveals, slide-in drawers).

### 12.2 Easing Curves
- `--cl-ease-default: cubic-bezier(0.4, 0.0, 0.2, 1)` (Standard smooth acceleration & deceleration).
- `--cl-ease-out: cubic-bezier(0.0, 0.0, 0.2, 1)` (Decelerating curve for entering elements).
- `--cl-ease-in: cubic-bezier(0.4, 0.0, 1.0, 1)` (Accelerating curve for exiting elements).
- `--cl-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` (Elastic pop for badges and checkmarks).

### 12.3 Reduced Motion Standard
All animation and transition tokens automatically collapse to zero or gentle opacity fades when the user has requested reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --cl-duration-fast: 0ms !important;
    --cl-duration-normal: 0ms !important;
    --cl-duration-slow: 0ms !important;
    --cl-transition-all: none !important;
  }
}
```

---

## 13. Icon Strategy

1. **Optical Centering & Stroke Harmony:** Icons are standardized to match the typographic scale (12px, 16px, 20px, 24px, 32px). Default stroke width is 1.75px–2px, visually harmonizing with medium-weight font glyphs.
2. **Accessibility Standard:** Icons used decoratively alongside text must automatically apply `aria-hidden="true"`. Standalone icon buttons must require an accessible name via `aria-label`.
3. **Integration Independence:** Chellaa React's components will accept any React SVG icon element (Lucide, Heroicons, Radix Icons, custom SVGs) via children or slots, without enforcing a hard runtime dependency on a proprietary icon library.
