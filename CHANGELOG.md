# Changelog

All notable changes to `@chellaa/react` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-10-28

### Added
- **TreeView**: Hierarchical tree data visualization component implementing the WAI-ARIA Tree View pattern with roving tabIndex keyboard navigation, arbitrary nesting depth, controlled and uncontrolled expand/collapse state, single/multi-selection modes, disabled node states, pure data immutability, descendant focus recovery upon collapsing ancestors, and custom node renderers.
- **Stepper**: Multi-step progress and workflow navigation component with horizontal and vertical orientations, semantic `<nav>` and ordered list `<ol>` markup, `aria-current="step"` active tracking, completed/current/upcoming/disabled/error visual distinction that does not rely on color alone, optional step indicators, decorative connectors (`aria-hidden="true"`), and interactive clickable steps.
- **Carousel**: Accessible content rotator adhering strictly to the WAI-ARIA Carousel Pattern (`role="region"`, `aria-roledescription="carousel"`, `role="group"`, `aria-roledescription="slide"`), featuring previous and next navigation controls, pagination dot buttons, infinite looping mode, touch and pointer swiping, autoplay with configurable intervals and automatic pause on hover, focus, and reduced-motion preferences, with off-screen inactive slide accessibility isolation.
- **MultiSelect**: Accessible multi-select dropdown with chips, search filtering, roving keyboard navigation, and bulk select/clear actions.
- **DataGrid**: High-performance tabular data grid with column sorting, filtering, selection, and keyboard navigation.
- **FileUpload**: Drag-and-drop file upload with validation, progress indicators, and keyboard accessibility.
- **Slider & RangeSlider**: Accessible single and dual-thumb range sliders with keyboard stepping and touch support.
- **Accordion (Redesign & Enhancement)**:
  - Visual Variants: Added `default`, `separated`, `borderless`, and `filled` visual styles with full backwards-compatibility for legacy `outline` and `flush` aliases.
  - Density Sizing: Added `size="sm" | "md" | "lg"` adjusting trigger padding, typography scale, icon dimensions, and panel content spacing uniformly.
  - Rich Header Layout: Added first-class structured props on `Accordion.Trigger` (`title`, `description`, `leadingIcon`, `trailingBadge`, `indicator`, `indicatorPosition="start" | "end"`) with multiline truncation and word-break protection.
  - Bulk Operations: Added `expandAll()` and `collapseAll()` helper methods to context and exported `<Accordion.Actions>`, `<Accordion.ExpandAll>`, and `<Accordion.CollapseAll>` helper components.
  - Accessibility: Guaranteed 100% WAI-ARIA APG Accordion pattern conformance with zero axe-core violations, disabled item policy filtering, and keyboard roving navigation.

## [0.2.3] - 2026-10-27

### Fixed
- **Checkbox, Radio, Switch (`DEF-001`)**: Fixed issue where rendering with `asChild={true}` discarded the underlying native `<input>` element. Preserved the hidden native input and bound state to ensure native form submission, screen reader role detection, and assistive technology access are retained.
  - *Accessibility / WCAG*: Complies with WCAG 2.2 Criterion 4.1.2 (Name, Role, Value) and Criterion 1.3.1 (Info and Relationships).
- **Select (`DEF-002`)**: Fixed issue where passing `options={[]}` prevented the trigger button from rendering, causing asynchronous or empty option scenarios to fail to mount interactive controls.
  - *Accessibility / WCAG*: Complies with WCAG 2.2 Criterion 2.1.1 (Keyboard) and Criterion 4.1.2 (Name, Role, Value).
- **Combobox (`DEF-007`)**: Fixed keyboard navigation for subcontrols in multi-select Combobox. Tag-removal buttons and the clear button now receive tab focus (`tabIndex={0}`), have clear accessible labels (`aria-label`), visible focus rings, and respond to `Enter` and `Space` key presses.
  - *Accessibility / WCAG*: Complies with WCAG 2.2 Criterion 2.1.1 (Keyboard), Criterion 2.4.7 (Focus Visible), and Criterion 4.1.2 (Name, Role, Value).
- **Table (`DEF-016`)**: Fixed keyboard accessibility on sortable Table column headers (`TableHead`). Sortable headers are now keyboard-focusable (`tabIndex={0}`), respond to `Enter` and `Space` activation, expose `role="columnheader"`, and accurately reflect `aria-sort` state (`ascending`, `descending`, `none`).
  - *Accessibility / WCAG*: Complies with WCAG 2.2 Criterion 2.1.1 (Keyboard), Criterion 2.4.7 (Focus Visible), and Criterion 4.1.2 (Name, Role, Value).

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
