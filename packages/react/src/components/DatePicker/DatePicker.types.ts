import * as React from "react";

export interface DatePickerProps
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
   * Callback fired when the selected date changes.
   */
  onValueChange?: ((date: Date | null) => void) | undefined;

  /**
   * Display date format string (e.g. "YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY").
   * @default "YYYY-MM-DD"
   */
  format?: string | undefined;

  /**
   * Placeholder text shown when input is empty. Defaults to the format pattern.
   */
  placeholder?: string | undefined;

  /**
   * Controlled open state of the calendar dropdown popover.
   */
  isOpen?: boolean | undefined;

  /**
   * Initial open state in uncontrolled mode.
   * @default false
   */
  defaultOpen?: boolean | undefined;

  /**
   * Callback fired when the popover open state changes.
   */
  onOpenChange?: ((open: boolean) => void) | undefined;

  /**
   * Disables user interaction.
   * @default false
   */
  isDisabled?: boolean | undefined;

  /**
   * Sets invalid error appearance for form validation.
   * @default false
   */
  isInvalid?: boolean | undefined;

  /**
   * Whether to display a clear button when a date is selected.
   * @default true
   */
  isClearable?: boolean | undefined;

  /**
   * Earliest selectable date (inclusive).
   */
  minDate?: Date | null | undefined;

  /**
   * Latest selectable date (inclusive).
   */
  maxDate?: Date | null | undefined;

  /**
   * Custom predicate callback to disable specific calendar dates.
   */
  isDateDisabled?: ((date: Date) => boolean) | undefined;

  /**
   * Starting day of the week (0 = Sunday, 1 = Monday, 6 = Saturday).
   * @default 0
   */
  firstDayOfWeek?: (0 | 1 | 6) | undefined;

  /**
   * BCP 47 locale tag for formatting and localization.
   * @default "en-US"
   */
  locale?: string | undefined;

  /**
   * Size token for input and calendar.
   * @default "md"
   */
  size?: ("sm" | "md" | "lg") | undefined;

  /**
   * Accessible HTML id attribute for the underlying input.
   */
  id?: string | undefined;

  /**
   * Form field name attribute for form submission.
   */
  name?: string | undefined;

  /**
   * Accessible label for screen readers.
   */
  "aria-label"?: string | undefined;
}
