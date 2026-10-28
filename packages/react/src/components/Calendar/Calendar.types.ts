import * as React from "react";

export interface DateRange {
  startDate?: Date | null | undefined;
  endDate?: Date | null | undefined;
}

export interface CalendarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * The currently selected date in controlled mode.
   */
  value?: Date | null | undefined;

  /**
   * The initial selected date in uncontrolled mode.
   */
  defaultValue?: Date | null | undefined;

  /**
   * Callback fired when a date is selected.
   */
  onValueChange?: ((date: Date) => void) | undefined;

  /**
   * If true, enables date range selection mode.
   * @default false
   */
  isRange?: boolean | undefined;

  /**
   * The currently selected date range in controlled mode.
   */
  rangeValue?: DateRange | null | undefined;

  /**
   * The initial selected date range in uncontrolled mode.
   */
  defaultRangeValue?: DateRange | null | undefined;

  /**
   * Callback fired when date range changes.
   */
  onRangeChange?: ((range: DateRange) => void) | undefined;

  /**
   * Earliest selectable calendar date (inclusive).
   */
  minDate?: Date | null | undefined;

  /**
   * Latest selectable calendar date (inclusive).
   */
  maxDate?: Date | null | undefined;

  /**
   * Predicate callback to evaluate whether a given calendar date is disabled.
   */
  isDateDisabled?: ((date: Date) => boolean) | undefined;

  /**
   * Starting day of the week (0 = Sunday, 1 = Monday, 6 = Saturday).
   * @default 0
   */
  firstDayOfWeek?: (0 | 1 | 6) | undefined;

  /**
   * BCP 47 locale tag used for localized month and weekday names.
   * @default "en-US"
   */
  locale?: string | undefined;

  /**
   * Initial focused / visible date when `value` or `defaultValue` is unset.
   * Defaults to current local date.
   */
  defaultFocusedDate?: Date | undefined;

  /**
   * Accessible label for the calendar grid table.
   * @default "Calendar"
   */
  "aria-label"?: string | undefined;
}
