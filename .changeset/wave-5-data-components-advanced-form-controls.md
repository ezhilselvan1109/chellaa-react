---
"@chellaa/react": minor
---

Wave 5 Implementation: Data Components & Advanced Form Controls
- **MultiSelect**: Accessible, searchable multi-item selection component supporting controlled and uncontrolled state, typed option values (`TValue`), clear-all functionality, disabled option states, loading/empty states, selected tag chips with keyboard-operable removal buttons, and FormField cascading integration.
- **DataGrid**: Strongly typed tabular data organism (`TRow`, `TKey`) utilizing semantic HTML `<table>` markup, client-side column sorting with `aria-sort`, multi-row selection with select-all and indeterminate state handling, custom cell rendering, horizontal scroll overflow management, and seamless Pagination component integration.
- **FileUpload**: Accessible file selection and validation dropzone featuring native `<input type="file">` interaction, drag-and-drop zone with visual feedback, single and multiple file modes, MIME and file extension filtering, maximum file size and file count validation, selected-file list with accessible remove actions, and strict non-network file selection boundary.
- **Slider**: Accessible continuous single-thumb slider control supporting controlled and uncontrolled numeric values, configurable min, max, and step increments, milestone tick marks and labels, keyboard navigation (Arrow, PageUp, PageDown, Home, End), pointer/touch tracking, and FormField cascading.
- **RangeSlider**: Accessible dual-thumb range slider supporting controlled and uncontrolled `[minValue, maxValue]` tuple values, configurable minimum distance (`minDistance`), strict non-crossing boundary policy, independent thumb ARIA labeling and keyboard stepping, active range highlight bar, and FormField integration.
