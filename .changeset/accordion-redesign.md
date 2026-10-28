---
"@chellaa/react": minor
---

Redesign and enhance the Accordion component:
- Visual Variants: Added `default`, `separated`, `borderless`, and `filled` visual styles with full backwards-compatibility for legacy `outline` and `flush` aliases.
- Density Sizing: Added `size="sm" | "md" | "lg"` adjusting trigger padding, typography scale, icon dimensions, and panel content spacing uniformly.
- Rich Header Layout: Added first-class structured props on `Accordion.Trigger` (`title`, `description`, `leadingIcon`, `trailingBadge`, `indicator`, `indicatorPosition="start" | "end"`) with multiline truncation and word-break protection.
- Bulk Operations: Added `expandAll()` and `collapseAll()` helper methods to context and exported `<Accordion.Actions>`, `<Accordion.ExpandAll>`, and `<Accordion.CollapseAll>` helper components.
- Accessibility: Guaranteed 100% WAI-ARIA APG Accordion pattern conformance with zero axe-core violations, disabled item policy filtering, and keyboard roving navigation.
