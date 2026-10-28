---
"@chellaa/react": minor
---

Wave 4 Implementation: Navigation, Form Validation & Date Extensions
- **Breadcrumbs**: Accessible navigation landmark (`aria-label="Breadcrumb"`) providing ordered list hierarchy (`<ol>`, `<li>`), active page semantics (`aria-current="page"`), decorative separators hidden from assistive technology, and responsive ellipsis truncation for long hierarchies.
- **Link**: Accessible semantic anchor component (`<a>`) preserving native browser navigation, keyboard activation, and modifier clicks, with colorScheme and underline variants, automated security sanitization (`rel="noopener noreferrer"`) for `isExternal`, and polymorphic `asChild` composition via Slot.
- **Form Validation Integration**: Zero-dependency, framework-agnostic validation layer centered on `useFormValidation`, providing typed validation contracts (`FieldValidationError`, `FieldValidationResult`, `FieldValidator`), automatic `aria-invalid` and `aria-describedby` wiring to `FormField` and `Input`, request-sequenced cancellation preventing stale asynchronous validation races, and configurable first-invalid-field focus on failed submission.
- **DateRangePicker**: Dual-date range selector composing `Calendar` and `Popover` with a typed `{ startDate, endDate }` contract, inclusive range highlighting, chronological boundary correction, disabled date support, and keyboard navigation without timezone distortion.
- **TimePicker**: Accessible time selector supporting 12-hour AM/PM and 24-hour display modes, column listboxes with ARIA active descendant navigation, configurable minute step increments, ArrowUp/ArrowDown stepping, clearable input surface, and seamless `FormField` context integration.
