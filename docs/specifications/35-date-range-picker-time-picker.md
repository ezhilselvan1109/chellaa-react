# SPEC-035: DateRangePicker and TimePicker Component Specification

## 1. Overview & Scope
This specification defines the architecture, public APIs, keyboard navigation, accessibility semantics, design tokens, and testing criteria for two temporal input components in Chellaa React:
1. **DateRangePicker**: Composed overlay pairing `Calendar` and `Popover` to enable selection of contiguous date ranges (`startDate` through `endDate`), inclusive range day highlighting, boundary constraints, and FormField integration.
2. **TimePicker**: Accessible time selection control supporting 12-hour (`hh:mm aa`) and 24-hour (`HH:mm`) formats, configurable minute increments, boundary validation, keyboard interaction, and FormField integration.

---

## 2. DateRangePicker Specification

### 2.1 Value Contract
```tsx
export interface DateRange {
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** The currently selected date range in controlled mode */
  value?: DateRange | null;
  /** Initial selected date range in uncontrolled mode */
  defaultValue?: DateRange | null;
  /** Callback fired when the date range selection changes */
  onValueChange?: (range: DateRange) => void;
  /** Date display format. @default "YYYY-MM-DD" */
  format?: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY";
  /** Placeholder text for input trigger. @default "Select date range" */
  placeholder?: string;
  /** Controlled open state for the calendar popover */
  isOpen?: boolean;
  /** Initial open state in uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback fired when popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disabled state */
  isDisabled?: boolean;
  /** Invalid / error state */
  isInvalid?: boolean;
  /** Clear button visibility */
  isClearable?: boolean;
  /** Earliest selectable date */
  minDate?: Date | null;
  /** Latest selectable date */
  maxDate?: Date | null;
  /** Callback predicate to disable specific calendar dates */
  isDateDisabled?: (date: Date) => boolean;
  /** Starting day of week (0 = Sun, 1 = Mon, 6 = Sat) */
  firstDayOfWeek?: 0 | 1 | 6;
  /** BCP 47 locale tag */
  locale?: string;
  /** Component size scale */
  size?: "sm" | "md" | "lg";
  /** Field ID */
  id?: string;
  /** Form input name */
  name?: string;
  /** Accessible label */
  "aria-label"?: string;
}
```

### 2.2 Range Selection Logic
1. **Initial Click (Start Date)**: Sets `startDate = clickedDate` and clears `endDate = null`. Calendar immediately highlights the start date.
2. **Second Click (End Date)**:
   - If `clickedDate < startDate`, the component resets `startDate = clickedDate` (or swaps), keeping selection active.
   - If `clickedDate >= startDate`, sets `endDate = clickedDate` and completes the range. Popover dropdown closes and focus returns to the trigger input.
3. **Range Highlighting**:
   - `cl-calendar__day--range-start`: Start date styling with directional radius.
   - `cl-calendar__day--range-end`: End date styling with directional radius.
   - `cl-calendar__day--in-range`: In-between days receive continuous background highlighting (`--cl-color-primary-subtle`).
4. **Timezone Policy**: Strictly uses local date components (`getFullYear()`, `getMonth()`, `getDate()`) via `packages/react/src/utils/date.ts`. Never converts through UTC timestamps.

---

## 3. TimePicker Specification

### 3.1 Value Contract & Public API
```tsx
export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Selected time string in 24-hour ISO format "HH:mm" (e.g. "14:30") */
  value?: string | null;
  /** Initial time string in uncontrolled mode */
  defaultValue?: string | null;
  /** Callback fired when time selection changes */
  onValueChange?: (time: string) => void;
  /** Clock display format: "12h" (with AM/PM) or "24h" (00-23). @default "12h" */
  format?: "12h" | "24h";
  /** Minute step intervals (e.g. 1, 5, 10, 15, 30). @default 1 */
  minuteStep?: number;
  /** Earliest selectable time (e.g. "09:00") */
  minTime?: string;
  /** Latest selectable time (e.g. "18:00") */
  maxTime?: string;
  /** Placeholder text. @default "Select time" */
  placeholder?: string;
  /** Controlled open state for popup */
  isOpen?: boolean;
  /** Initial open state in uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback fired when popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disabled state */
  isDisabled?: boolean;
  /** Readonly state */
  isReadOnly?: boolean;
  /** Invalid / error state */
  isInvalid?: boolean;
  /** Clear button visibility */
  isClearable?: boolean;
  /** Component size scale */
  size?: "sm" | "md" | "lg";
  /** Accessible label */
  "aria-label"?: string;
}
```

### 3.2 Time Parsing & Keyboard Model
- **Input Validation**: Parses typed input strings in both 12-hour (`"02:30 PM"`) and 24-hour (`"14:30"`) formats. Enforces hours `0..23`, minutes `0..59`.
- **Keyboard Stepping**:
  - `ArrowUp` / `ArrowDown`: Increments / decrements the focused segment by `1` (for hour) or `minuteStep` (for minutes).
  - `Home` / `End`: Jumps to min or max time boundaries.
  - `Escape`: Dismisses time popup and restores trigger focus.
- **Accessible List / Spinbuttons**: Popup provides accessible hour, minute, and period buttons with `role="option"` or `role="spinbutton"` for point-and-click selection.

---

## 4. Design Tokens & Styling
Scoped under `@layer cl-components`:
- `.cl-date-range-picker`, `.cl-date-range-picker__control`, `.cl-date-range-picker__input`, `.cl-date-range-picker__icon`, `.cl-date-range-picker__clear`.
- `.cl-calendar__day--range-start`, `.cl-calendar__day--range-end`, `.cl-calendar__day--in-range`.
- `.cl-time-picker`, `.cl-time-picker__control`, `.cl-time-picker__input`, `.cl-time-picker__popup`, `.cl-time-picker__col`, `.cl-time-picker__option`.
- Tokens used:
  - `--cl-color-primary-base`, `--cl-color-primary-subtle`, `--cl-color-bg-surface`, `--cl-color-border`.
  - `--cl-space-2`, `--cl-space-3`, `--cl-radius-md`, `--cl-shadow-md`.

---

## 5. Testing & Acceptance Criteria
1. DateRangePicker: Selecting start date updates state; selecting second date completes range.
2. DateRangePicker: Clicking date before start resets start or swaps properly.
3. DateRangePicker: Inclusive days receive `.cl-calendar__day--in-range`.
4. DateRangePicker: Clear button clears both start and end dates.
5. TimePicker: 12-hour format displays AM/PM; 24-hour displays 00-23.
6. TimePicker: `minuteStep` constraints are enforced.
7. TimePicker: Invalid typed times (e.g., 25:99) are rejected and reverted.
8. TimePicker & DateRangePicker: Connected to `useFormField` with `aria-invalid` and `aria-describedby`.
9. Zero `axe-core` accessibility violations.
