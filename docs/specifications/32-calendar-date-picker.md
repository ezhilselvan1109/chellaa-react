# Calendar & DatePicker Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications (Wave 2 / Tier 7 Complex Enterprise Organisms)  
**Specification ID:** SPEC-032  
**Target Package:** `@chellaa/react`  
**Revision:** 1.0.0  
**Priority:** P1 High  
**Governing Standard:** [00-component-specification-standard.md](./00-component-specification-standard.md), [01-api-conventions.md](./01-api-conventions.md), [ADR-010-overlay-positioning.md](../adr/ADR-010-overlay-positioning.md), [ADR-011-hybrid-styling-architecture-and-engine-boundary.md](../adr/ADR-011-hybrid-styling-architecture-and-engine-boundary.md)  
**Dependencies:** `@floating-ui/react` (via composed `Popover`), `Portal` primitive, `useControllableState` hook, `Input`/`TextField` primitive  

---

## 1. Identity

```text
Component Names:   Calendar, DatePicker
Specification ID:  SPEC-032
Package Exports:   import { Calendar, DatePicker, type CalendarProps, type DatePickerProps } from "@chellaa/react";
Category:          Forms / Date & Time Selection
Status:            Approved & Implementation Ready
Phase:             Wave 2 — Interactive Primitives & Feedback
Priority:          P1 High
Version:           1.0.0
Related:           Input, TextField, Popover, FormField, Button
Governing ADRs:    ADR-007 (Zero-Config Styling), ADR-010 (Overlay Positioning), ADR-011 (Hybrid Styling)
```

---

## 2. Purpose & Problem Statement

### 2.1 Problem Statement
Date input in enterprise web applications is notoriously error-prone:
1. Native `<input type="date">` renders wildly inconsistent browser-dependent UIs, lacks customizable formatting, and provides broken keyboard UX across platforms.
2. Third-party date pickers frequently bundle heavy dependencies (Moment.js, Day.js, date-fns), inflating bundle size by 30kB–70kB+.
3. Inadvertent UTC parsing (`new Date("YYYY-MM-DD")`) causes timezone shifts where users in negative UTC offsets see the previous calendar day selected.
4. Many existing custom calendar widgets fail WAI-ARIA APG grid keyboard navigation (violating WCAG 2.1 AA 2.1.1 Keyboard), lack proper roving tabindex, or leave focus stranded when navigating across month boundaries.
5. Floating overlays flash unpositioned before positioning metrics resolve or fail collision detection at viewport boundaries.

### 2.2 Why It Belongs in Chellaa React
As an enterprise UI system, Chellaa React requires an accessible, lightweight, zero-external-dependency calendar grid and composed date picker that seamlessly integrates with `@chellaa/react` tokens, form fields, and floating popovers.

### 2.3 When to Use
- **Calendar:** Selecting single dates in inline dashboards, event scheduling views, booking sidebars, or as an embedded building block.
- **DatePicker:** Selecting dates within forms, filters, transaction searches, and profile inputs via an anchored dropdown popover.

### 2.4 When NOT to Use
- Do NOT use Calendar/DatePicker for multi-date range intervals in Wave 2 (DateRangePicker is scheduled for later waves).
- Do NOT use DatePicker for time-of-day selection without a date (TimePicker is scheduled for later waves).

---

## 3. Scope & Requirements

### 3.1 Functional Requirements (In Scope)
- **FR-01 (Zero External Date Libraries):** Implement pure, dependency-free mathematical calendar utilities (`packages/react/src/utils/date.ts`) covering leap years, month lengths, weekday offsets, comparison, and formatting.
- **FR-02 (Local Calendar Date Policy):** Operate strictly on local date units (`getFullYear()`, `getMonth()`, `getDate()`) to prevent timezone day-shift regressions.
- **FR-03 (Calendar WAI-ARIA APG Grid):** Full compliance with APG 1.2 Grid pattern:
  - Table element with `role="grid"`, `role="row"`, `role="columnheader"`, and `role="gridcell"`.
  - Roving `tabIndex`: single tab stop (`tabIndex={0}`) on the active date cell; all other cells have `tabIndex={-1}`.
  - Arrow navigation: `ArrowLeft`/`ArrowRight` (±1 day), `ArrowUp`/`ArrowDown` (±1 week), `Home`/`End` (start/end of current week), `PageUp`/`PageDown` (±1 month), `Shift+PageUp`/`Shift+PageDown` (±1 year).
  - Selection: `Enter` or `Space` selects the focused enabled date.
- **FR-04 (Calendar Month/Year Navigation):** Accessible header controls with Previous/Next month buttons and Month/Year selectors or displays.
- **FR-05 (Boundary & Disabled Constraints):** Respect `minDate`, `maxDate`, and `isDateDisabled?: (date: Date) => boolean`. Prevent selection of disabled dates.
- **FR-06 (Configurable Week Start & Locale):** Support `firstDayOfWeek?: 0 | 1 | 6` (0 = Sunday, 1 = Monday, 6 = Saturday) and `locale?: string` for weekday/month header names.
- **FR-07 (DatePicker Composition):** DatePicker composes existing `Input`/`TextField`, `Popover`, `Portal`, and `Calendar` primitives without re-implementing overlay positioning.
- **FR-08 (Controlled & Uncontrolled Selection):** Both Calendar and DatePicker support `value` and `defaultValue` via `useControllableState`.
- **FR-09 (DatePicker Open/Close Interactions):** Trigger opens Popover on click/Enter/DownArrow. Selecting a date updates value and dismisses popup. `Escape` dismisses popup and restores trigger focus.
- **FR-10 (Manual Input & Formatting):** DatePicker displays formatted date strings (e.g., `YYYY-MM-DD` or custom locale format) and handles manual text typing and clear actions safely.
- **FR-11 (FormField Cascade):** Consumes `useFormField()` context for IDs, labels, helper text, error messages, and `aria-describedby`.

### 3.2 Non-Goals
- Multi-month synchronized range selection (DateRangePicker).
- Time-picker wheel / clock dials.
- Hijacking native mobile datepickers via heuristics.

---

## 4. Component Anatomy & DOM Model

### 4.1 Calendar Anatomy
```text
┌─────────────────────────────────────────────────────────┐
│ Calendar.Root (.cl-calendar)                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Header (.cl-calendar__header)                     │  │
│  │  [< Prev Month]  [ October 2026 ]  [Next Month >] │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Grid table (.cl-calendar__grid, role="grid")      │  │
│  │  <thead> (role="rowgroup")                        │  │
│  │   <tr role="row"> [Su] [Mo] [Tu] [We] [Th] [Fr]   │  │
│  │  <tbody> (role="rowgroup")                        │  │
│  │   <tr role="row"> [27] [28] [29] [30]  [1]  [2]   │  │
│  │   ... (6 rows standard grid)                      │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 DatePicker Anatomy
```text
┌─────────────────────────────────────────────────────────┐
│ DatePicker.Root (.cl-datepicker)                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Composed Input / Trigger (.cl-datepicker__trigger)│  │
│  │  [ 📅 2026-10-28 ]                [ Clear / 🗓️ ]  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Composed Popover.Content (.cl-datepicker__content)│  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │ <Calendar />                                │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Public API & TypeScript Definitions

### 5.1 Calendar Types
```typescript
export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Currently selected date in controlled mode */
  value?: Date | null;
  /** Initial selected date in uncontrolled mode */
  defaultValue?: Date | null;
  /** Callback fired when a date is selected */
  onValueChange?: (date: Date) => void;
  /** Earliest selectable date (inclusive) */
  minDate?: Date;
  /** Latest selectable date (inclusive) */
  maxDate?: Date;
  /** Predicate function to determine if a specific date is disabled */
  isDateDisabled?: (date: Date) => boolean;
  /** Starting day of the week (0 = Sunday, 1 = Monday, 6 = Saturday). Default: 0 */
  firstDayOfWeek?: 0 | 1 | 6;
  /** BCP 47 locale string for formatting month/weekday names. Default: "en-US" */
  locale?: string;
  /** Month displayed when component is unselected/initial. Defaults to current month */
  defaultFocusedDate?: Date;
}
```

### 5.2 DatePicker Types
```typescript
export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Currently selected date in controlled mode */
  value?: Date | null;
  /** Initial selected date in uncontrolled mode */
  defaultValue?: Date | null;
  /** Callback fired when date value changes */
  onValueChange?: (date: Date | null) => void;
  /** Date format pattern or string display convention. Default: "YYYY-MM-DD" */
  format?: string;
  /** Input placeholder text. Default: "YYYY-MM-DD" */
  placeholder?: string;
  /** Controlled open state of the dropdown popover */
  isOpen?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disables the datepicker and trigger input */
  isDisabled?: boolean;
  /** Marks the input as invalid for form validation */
  isInvalid?: boolean;
  /** Whether the input allows clearing the selected date */
  isClearable?: boolean;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
  /** Custom disabled date predicate */
  isDateDisabled?: (date: Date) => boolean;
  /** Starting day of the week (0 = Sunday, 1 = Monday, 6 = Saturday) */
  firstDayOfWeek?: 0 | 1 | 6;
  /** BCP 47 locale string */
  locale?: string;
  /** Label for accessible screen readers or FormField integration */
  label?: string;
  /** Size variant corresponding to design tokens */
  size?: "sm" | "md" | "lg";
}
```

---

## 6. Date Utility Architecture & Timezone Policy

### 6.1 Strict Local-Date Policy
To eliminate the classic "one-day-behind" timezone offset bug:
1. All date arithmetic MUST execute via `date.getFullYear()`, `date.getMonth()`, and `date.getDate()`.
2. Never parse date strings with `new Date("2026-10-28")` because ISO 8601 strings without times default to UTC in ECMAScript, resulting in `2026-10-27` in Western hemispheres.
3. Use a custom parser `parseLocalDate(str: string): Date | null` that decomposes `YYYY`, `MM`, `DD` into `new Date(year, monthIndex, day)`.
4. Formatting uses `formatLocalDate(date: Date, format: string, locale?: string)` using local date methods.

### 6.2 Pure Date Utility Functions
- `isLeapYear(year: number): boolean`: `(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0`
- `getDaysInMonth(year: number, monthIndex: number): number`: Handles 28/29 days for Feb, 30/31 days for others.
- `getCalendarGrid(year: number, monthIndex: number, firstDayOfWeek: number)`: Generates fixed 6-row × 7-column (42 cell) matrix with leading/trailing days from adjacent months.
- `isSameDay(a: Date, b: Date): boolean`: Compares year, month, date.
- `isDateInRange(date: Date, min?: Date, max?: Date): boolean`
- `addMonths(date: Date, months: number): Date`
- `addYears(date: Date, years: number): Date`

---

## 7. Keyboard Navigation & Accessibility (WAI-ARIA APG)

### 7.1 Calendar Grid Keyboard Map
| Key | Action |
| :--- | :--- |
| `ArrowLeft` | Moves focus to the previous day (crosses month boundaries). |
| `ArrowRight` | Moves focus to the next day (crosses month boundaries). |
| `ArrowUp` | Moves focus to the same weekday in previous week. |
| `ArrowDown` | Moves focus to the same weekday in next week. |
| `Home` | Moves focus to the first day of current week. |
| `End` | Moves focus to the last day of current week. |
| `PageUp` | Moves focus to the same date in previous month. |
| `PageDown` | Moves focus to the same date in next month. |
| `Shift + PageUp` | Moves focus to the same date in previous year. |
| `Shift + PageDown`| Moves focus to the same date in next year. |
| `Enter` / `Space` | Selects focused date. |

### 7.2 ARIA Attributes
- Grid element: `role="grid"`, `aria-label="Calendar"`.
- Column headers: `role="columnheader"`, `abbr` for full weekday name, textContent for abbreviation.
- Date cells: `role="gridcell"`, `aria-selected="true"|"false"`, `aria-disabled="true"` for disabled/out-of-range dates.
- Active date button: `tabIndex={0}`, all other date buttons `tabIndex={-1}` (Roving Tabindex).

---

## 8. Styling & Design Tokens Contract

All styles reside in `@layer cl-components` under scoped `.cl-calendar` and `.cl-datepicker` class names:
- Background: `var(--cl-color-surface-elevated, #ffffff)`
- Border: `var(--cl-color-border-default, #e2e8f0)`
- Active cell background: `var(--cl-color-primary-base, #4f46e5)`
- Active cell text: `var(--cl-color-primary-contrast, #ffffff)`
- Hover cell background: `var(--cl-color-surface-hover, #f1f5f9)`
- Today indicator: subtle dot or outline using `var(--cl-color-primary-base, #4f46e5)`
- Disabled cells: `opacity: 0.4; cursor: not-allowed;`
- Out of current month cells: `color: var(--cl-color-text-subtle, #94a3b8)`

---

## 9. Verification & Acceptance Criteria

1. **Leap Years:** Feb 2024 has 29 days; Feb 2025 has 28 days.
2. **Month Boundaries:** Navigating forward from Dec moves to Jan of next year; navigating backward from Jan moves to Dec of previous year.
3. **Keyboard:** Full keyboard navigation moves across days, weeks, months, and years with zero focus loss.
4. **Disabled Dates:** `minDate`, `maxDate`, and `isDateDisabled` prevent both mouse selection and keyboard selection.
5. **DatePicker Popover:** Composes Popover seamlessly, dismisses on date selection, closes on Escape, restores focus to trigger.
6. **Axe Audits:** Zero WCAG 2.1 AA violations on Calendar and DatePicker in both open and closed states.
