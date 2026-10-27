# Changelog

## 0.3.0

### Minor Changes

- b9f3fa4: Implement Button and ButtonGroup components with 5 visual variants, 5 sizes, 7 color schemes, loading states, directional icon slots, tactile micro-interactions, polymorphic `asChild` composition, keyboard navigation, and full WCAG 2.2 AA accessibility compliance.

### Patch Changes

- 8e4028b: Wave 1 Critical Bug Fixes:
  - **DEF-001 (Checkbox, Radio, Switch)**: Preserve native inputs and form bindings when `asChild` composition is used (WCAG 4.1.2, 1.3.1).
  - **DEF-002 (Select)**: Ensure Select trigger button always renders when `options={[]}` (empty array) is provided, preventing unmountable UI in async scenarios (WCAG 2.1.1, 4.1.2).
  - **DEF-007 (Combobox)**: Make tag-removal and input clear subcontrols keyboard accessible with focus indicators and Enter/Space actuation (WCAG 2.1.1, 2.4.7, 4.1.2).
  - **DEF-016 (Table)**: Enable full keyboard operability (Enter/Space) and ARIA sort state for sortable Table headers (WCAG 2.1.1, 2.4.7, 4.1.2).

All notable changes to `@chellaa/react` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.3] - 2026-10-27

### Fixed

- **Checkbox, Radio, Switch (`DEF-001`)**: Fixed issue where rendering with `asChild={true}` discarded the underlying native `<input>` element. Preserved the hidden native input and bound state to ensure native form submission, screen reader role detection, and assistive technology access are retained.
  - _Accessibility / WCAG_: Complies with WCAG 2.2 Criterion 4.1.2 (Name, Role, Value) and Criterion 1.3.1 (Info and Relationships).
- **Select (`DEF-002`)**: Fixed issue where passing `options={[]}` prevented the trigger button from rendering, causing asynchronous or empty option scenarios to fail to mount interactive controls.
  - _Accessibility / WCAG_: Complies with WCAG 2.2 Criterion 2.1.1 (Keyboard) and Criterion 4.1.2 (Name, Role, Value).
- **Combobox (`DEF-007`)**: Fixed keyboard navigation for subcontrols in multi-select Combobox. Tag-removal buttons and the clear button now receive tab focus (`tabIndex={0}`), have clear accessible labels (`aria-label`), visible focus rings, and respond to `Enter` and `Space` key presses.
  - _Accessibility / WCAG_: Complies with WCAG 2.2 Criterion 2.1.1 (Keyboard), Criterion 2.4.7 (Focus Visible), and Criterion 4.1.2 (Name, Role, Value).
- **Table (`DEF-016`)**: Fixed keyboard accessibility on sortable Table column headers (`TableHead`). Sortable headers are now keyboard-focusable (`tabIndex={0}`), respond to `Enter` and `Space` activation, expose `role="columnheader"`, and accurately reflect `aria-sort` state (`ascending`, `descending`, `none`).
  - _Accessibility / WCAG_: Complies with WCAG 2.2 Criterion 2.1.1 (Keyboard), Criterion 2.4.7 (Focus Visible), and Criterion 4.1.2 (Name, Role, Value).

## [0.2.2] - 2026-10-18

### Added

- Zero-config styling bundle improvements and automated distribution assets.
- Components and primitives for design system foundation.

## [0.2.1] - 2026-10-04

### Added

- Button and ButtonGroup components with variants, sizes, colors, and accessibility.

## [0.2.0] - 2026-10-03

### Initial Release

- Core design token system, layout primitives (`Box`, `Flex`, `Grid`, `Stack`, `Container`), and base components.
