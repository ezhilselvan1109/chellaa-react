---
"@chellaa/react": patch
---

Wave 1 Critical Bug Fixes:
- **DEF-001 (Checkbox, Radio, Switch)**: Preserve native inputs and form bindings when `asChild` composition is used (WCAG 4.1.2, 1.3.1).
- **DEF-002 (Select)**: Ensure Select trigger button always renders when `options={[]}` (empty array) is provided, preventing unmountable UI in async scenarios (WCAG 2.1.1, 4.1.2).
- **DEF-007 (Combobox)**: Make tag-removal and input clear subcontrols keyboard accessible with focus indicators and Enter/Space actuation (WCAG 2.1.1, 2.4.7, 4.1.2).
- **DEF-016 (Table)**: Enable full keyboard operability (Enter/Space) and ARIA sort state for sortable Table headers (WCAG 2.1.1, 2.4.7, 4.1.2).
