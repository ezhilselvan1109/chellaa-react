# ADR-010: Overlay Positioning Architecture (Custom Math vs. Floating UI)

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, UI Engineering Team

---

## 1. Context and Problem Statement

Overlay components fall into two distinct structural categories:

1. **Screen-Centered Overlays (`Dialog`, `Modal`, `AlertDialog`):** Overlays that cover the viewport and center their content relative to screen coordinates.
2. **Anchored Popups (`Select`, `Tooltip`, `Popover`, `DropdownMenu`):** Overlays anchored to a trigger element that must calculate dynamic floating coordinates, detect viewport edge collisions, handle page/container scrolling, and flip orientation when space is constrained.

We must decide whether to implement proprietary collision math or adopt `@floating-ui/react` for anchored popup positioning.

---

## 2. Decision

1. **Screen-Centered Overlays (`Dialog`, `Modal`):**
   - **Mechanism:** Implemented with **Pure Static CSS Centering** (`position: fixed; inset: 0; display: grid; place-items: center;`).
   - **Dependency:** **Zero JavaScript dependencies**. Does not require any positioning math library.
2. **Anchored Popups (`Select` and future popovers):**
   - **Mechanism:** Adopt **`@floating-ui/react`** (specifically `useFloating`, `flip`, `shift`, `offset`) as a targeted runtime dependency for anchored coordinate calculation.
   - **Rationale:** Viewport collision mathematics involves complex edge cases (nested scrolling containers, `transform` CSS ancestors, virtual keyboards on mobile, visual viewport zooming, and subpixel rounding). Re-implementing these heuristics internally introduces high defect risks and maintenance overhead.
3. **Execution Rule:**
   - Do NOT install or bundle `@floating-ui/react` into the root package bundle until anchored popup components (`Select`) are implemented in Phase 16. The foundation package remains at **0 runtime dependencies**.

---

## 3. Evaluation Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Positioning Strategy Comparison                      │
├─────────────────────┬───────────────────┬──────────────────────────────┤
│ Metric              │ Custom Math Hooks │ @floating-ui/react           │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Bundle Size (Gzip)  │ ~1.8 KB           │ ~4.8 KB                      │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Collision Handling  │ Basic only        │ Comprehensive & battle-tested│
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Stacking Contexts   │ Prone to failures │ Handles transform ancestors  │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Maintenance Burden  │ Very High         │ Zero (Maintained upstream)   │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ React 18/19 Compat  │ Must be audited   │ Fully compatible             │
└─────────────────────┴───────────────────┴──────────────────────────────┘
```

---

## 4. Consequences

### Positive

- `Dialog` remains ultra-lightweight with 0 KB positioning overhead.
- `Select` will possess rock-solid viewport collision and flipping logic.
- Preserves the Zero-Runtime bloat principle for presentational components.

### Negative

- `Select` will contribute ~4.8 KB gzip to consumers who import it, which is well within our established Dialog/Select size budget (ceiling <= 7.5 KB).
