# ADR-012: Phased CSS Performance Budget Calibration

**Status:** Accepted (Amends Section 7.2 of Hybrid Styling Specification)  
**Date:** 2026-10-10  
**Deciders:** Executive Architect, Performance Team, Quality Engineer, Design System Specialist  
**Related ADRs:** ADR-002, ADR-004, ADR-007, ADR-011  

---

## 1. Context and Problem Statement

During the execution of Workflow F1 (Form Controls Migration), the master stylesheet (`dist/styles.css`) was compiled with the complete primitive/semantic token foundation (`tokens.css`, `theme.css`, `reset.css`), the reference baseline components (`Button`, `ButtonGroup`, `Input`), and the five migrated form controls (`Textarea`, `FormField`, `Checkbox`, `Radio`, `Switch`).

1. **Initial Estimate Disparity:**
   - The initial styling specification (`07-hybrid-design-token-and-styling-engine-specification.md` §7.2) set a flat CSS budget of **35 KB minified**.
   - However, the fixed token foundation and baseline components alone account for **25.28 KB (24.69 KB binary / 25,280 bytes)** uncompressed minified.
   - The five migrated form controls added **10.55 KB (10.30 KB binary / 10,550 bytes)**, bringing the measured stylesheet to **39,670 bytes (38.74 KB binary)**.
2. **Structural Evaluation of Flat Ceilings:**
   - A flat 35 KB ceiling cannot accommodate 18 fully accessible, token-driven components without deleting required visual states, color palettes, or WCAG compliance features.
   - Similarly, a flat 45 KB whole-library ceiling would fail upon the addition of Batches F2 (Surfaces) and F3 (Layout Primitives).

---

## 2. Decision: Phased Budget Calibration Policy

We formally adopt a **Phased CSS Performance Budget Calibration** that establishes milestone-specific ceilings for each migration batch and a final whole-library ceiling for the complete 18-component design system.

### Approved Phased Ceilings (Uncompressed Minified `dist/styles.css`)
*Using the binary convention ($1\text{ KB} = 1024\text{ bytes}$)*:

1. **Workflow F1 Milestone (8 Components)**:
   - **Approved Ceiling:** **42.0 KB** (43,008 bytes).
   - **Measured Actual:** **38.74 KB** (39,670 bytes minified, 6.28 KB / 6,432 bytes gzip).
   - **Status:** **PASS** (3.26 KB headroom).
2. **Workflow F2 Milestone (12 Components - Projected)**:
   - **Approved Ceiling:** **48.0 KB** (49,152 bytes).
   - **Projected Value:** **~46.34 KB** (Paper, Card, Typography, Kbd).
3. **Workflow F3 Whole-Library Milestone (All 18 Components - Projected)**:
   - **Approved Final Ceiling:** **56.0 KB** (57,344 bytes).
   - **Projected Value:** **~52.84 KB** (Box, Stack, Flex, Grid, Container, Divider).
   - **Projected Gzip Transfer:** **< 10.0 KB** (projected ~8.5 KB).

---

## 3. Scope of Styling Performance

1. **Static Styling Performance:**
   Standard static component rendering completely eliminates runtime Emotion CSS generation, ensuring zero style recalculation overhead in JavaScript while normal React component rendering continues to execute standard JavaScript.
2. **JavaScript Bundle Budget:**
   The JavaScript bundle budget remains preserved at **160 KB minified ESM (`dist/index.mjs`)** as established in Section 7.2 of the hybrid specification.

---

## 4. Consequences & Trade-offs

### Positive
- **Predictable & Enforceable:** Each migration batch operates under an explicit, testable budget threshold.
- **Full Feature Preservation:** All 7 color schemes, 3 sizing ramps, focus visible states, and accessibility patterns remain intact.
- **Superior Network Transfer:** The entire 18-component design system transfers in **< 10 KB gzipped**, delivering exceptional performance across all consumer devices.

### Negative / Monitoring
- **Threshold Vigilance:** Each subsequent batch (F2, F3) must measure its actual generated CSS and verify compliance against its approved milestone ceiling before completion.

---

## 5. Revisit Conditions

This budget calibration may be revisited if:
1. Significant architectural restructuring of the design token system or CSS reset allows lower baseline weight.
2. The final 18-component library output deviates meaningfully from the projected 52.84 KB footprint.
