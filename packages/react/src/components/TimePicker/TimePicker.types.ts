import * as React from "react";

export type TimeFormat = "12h" | "24h";

export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * The currently selected time in 24-hour "HH:mm" format (e.g. "14:30").
   */
  value?: string | null | undefined;

  /**
   * The initial selected time in uncontrolled mode ("HH:mm").
   */
  defaultValue?: string | null | undefined;

  /**
   * Callback fired when selected time changes, returning "HH:mm" format.
   */
  onValueChange?: ((time: string) => void) | undefined;

  /**
   * Display format in the input and popup selector.
   * @default "12h"
   */
  format?: TimeFormat | undefined;

  /**
   * Incremental step between selectable minutes in the dropdown.
   * @default 5
   */
  minuteStep?: number | undefined;

  /**
   * Earliest selectable time in "HH:mm" format (inclusive).
   */
  minTime?: string | undefined;

  /**
   * Latest selectable time in "HH:mm" format (inclusive).
   */
  maxTime?: string | undefined;

  /**
   * Controlled open state of the time selector popover.
   */
  isOpen?: boolean | undefined;

  /**
   * Initial uncontrolled open state of the time selector popover.
   * @default false
   */
  defaultOpen?: boolean | undefined;

  /**
   * Callback fired when popover open state changes.
   */
  onOpenChange?: ((isOpen: boolean) => void) | undefined;

  /**
   * Whether the control is interactive or disabled.
   * Cascades from parent <FormField> if unset.
   * @default false
   */
  isDisabled?: boolean | undefined;

  /**
   * Whether the control is read-only.
   * @default false
   */
  isReadOnly?: boolean | undefined;

  /**
   * Whether the control is currently in an error state.
   * Cascades from parent <FormField> if unset.
   * @default false
   */
  isInvalid?: boolean | undefined;

  /**
   * If true, displays a clear button when a time is selected.
   * @default true
   */
  isClearable?: boolean | undefined;

  /**
   * Placeholder string displayed in the input when empty.
   */
  placeholder?: string | undefined;

  /**
   * Size token defining control dimensions.
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
