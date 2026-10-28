import * as React from "react";
import type { DateRange } from "../Calendar/Calendar.types";

export type { DateRange };

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled range selection value.
   */
  value?: DateRange | null | undefined;

  /**
   * Initial uncontrolled range selection value.
   */
  defaultValue?: DateRange | null | undefined;

  /**
   * Callback fired when the date range selection changes.
   */
  onValueChange?: ((range: DateRange | null) => void) | undefined;

  /**
   * Date formatting pattern applied to each date.
   * @default "YYYY-MM-DD"
   */
  format?: string | undefined;

  /**
   * Text separator displayed between start date and end date in the input.
   * @default " – "
   */
  rangeSeparator?: string | undefined;

  /**
   * Placeholder string displayed when no date range is selected.
   */
  placeholder?: string | undefined;

  /**
   * Controlled open state of the calendar popover.
   */
  isOpen?: boolean | undefined;

  /**
   * Initial uncontrolled open state of the calendar popover.
   * @default false
   */
  defaultOpen?: boolean | undefined;

  /**
   * Callback fired when the popover open state changes.
   */
  onOpenChange?: ((isOpen: boolean) => void) | undefined;

  /**
   * Whether the control is interactive or disabled.
   * Cascades automatically from parent <FormField> if unset.
   * @default false
   */
  isDisabled?: boolean | undefined;

  /**
   * Whether the control is currently in an error state.
   * Cascades automatically from parent <FormField> if unset.
   * @default false
   */
  isInvalid?: boolean | undefined;

  /**
   * If true, displays a clear button when a date range is selected.
   * @default true
   */
  isClearable?: boolean | undefined;

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
   * Initial focused or visible date in calendar when no date is selected.
   */
  defaultFocusedDate?: Date | undefined;

  /**
   * Size token defining padding, font-size, and control height.
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | undefined;

  /**
   * HTML name attribute used for form submission.
   */
  name?: string | undefined;

  /**
   * Accessible label for the input control.
   */
  "aria-label"?: string | undefined;
}
