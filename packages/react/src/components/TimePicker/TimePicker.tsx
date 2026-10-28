"use client";

import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import { useFormField } from "../FormField/FormFieldContext";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "../Popover";
import type { TimeFormat, TimePickerProps } from "./TimePicker.types";

interface ParsedTime {
  hours: number; // 0-23
  minutes: number; // 0-59
}

function parse24HourTime(str?: string | null): ParsedTime | null {
  if (!str) return null;
  const match = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.exec(str.trim());
  if (!match) return null;
  return {
    hours: parseInt(match[1]!, 10),
    minutes: parseInt(match[2]!, 10),
  };
}

function formatTimeString(
  parsed: ParsedTime | null,
  format: TimeFormat
): string {
  if (!parsed) return "";
  const { hours, minutes } = parsed;
  const mm = String(minutes).padStart(2, "0");

  if (format === "24h") {
    const hh = String(hours).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  const hh = String(h12).padStart(2, "0");
  return `${hh}:${mm} ${period}`;
}

function to24HourString(hours: number, minutes: number): string {
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

function isTimeWithinBounds(
  hours: number,
  minutes: number,
  minTime?: string,
  maxTime?: string
): boolean {
  const totalMinutes = hours * 60 + minutes;

  if (minTime) {
    const minParsed = parse24HourTime(minTime);
    if (minParsed && totalMinutes < minParsed.hours * 60 + minParsed.minutes) {
      return false;
    }
  }

  if (maxTime) {
    const maxParsed = parse24HourTime(maxTime);
    if (maxParsed && totalMinutes > maxParsed.hours * 60 + maxParsed.minutes) {
      return false;
    }
  }

  return true;
}

/**
 * TimePicker provides an accessible time selection input and anchored column popover
 * supporting 12-hour AM/PM and 24-hour display modes, configurable minute stepping,
 * boundary validation, keyboard stepping, and FormField integration.
 *
 * @example
 * ```tsx
 * <TimePicker value="14:30" onValueChange={setTime} />
 * <TimePicker format="24h" minuteStep={15} />
 * ```
 */
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      format = "12h",
      minuteStep = 5,
      minTime,
      maxTime,
      isOpen: isOpenProp,
      defaultOpen = false,
      onOpenChange,
      isDisabled = false,
      isReadOnly = false,
      isInvalid = false,
      isClearable = true,
      placeholder,
      size = "md",
      id,
      name,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    // 1. FormField Context
    const formField = useFormField();
    const effectiveId = id ?? formField?.id;
    const effectiveDisabled = isDisabled || (formField?.disabled ?? false);
    const effectiveInvalid = isInvalid || (formField?.error ?? false);
    const effectiveReadOnly = isReadOnly || (formField?.readOnly ?? false);

    // 2. Selection State (always stored as "HH:mm" 24h string internally)
    const [selectedTime, setSelectedTime] = useControllableState<string | null>({
      value: valueProp,
      defaultValue: defaultValue ?? null,
      onChange: (val) => {
        if (val !== undefined && val !== null) {
          onValueChange?.(val);
        } else {
          onValueChange?.("");
        }
      },
    });

    // 3. Popover Open State
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: isOpenProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const parsedTime = React.useMemo(
      () => parse24HourTime(selectedTime),
      [selectedTime]
    );

    // 4. Formatted Display Value
    const displayValue = React.useMemo(() => {
      return formatTimeString(parsedTime, format);
    }, [parsedTime, format]);

    const [inputValue, setInputValue] = React.useState<string>(displayValue);

    React.useEffect(() => {
      setInputValue(displayValue);
    }, [displayValue]);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const controlRef = React.useRef<HTMLDivElement | null>(null);

    // Time commit helper
    const commitTime = React.useCallback(
      (h: number, m: number) => {
        if (!isTimeWithinBounds(h, m, minTime, maxTime)) return;
        const newTimeStr = to24HourString(h, m);
        setSelectedTime(newTimeStr);
      },
      [minTime, maxTime, setSelectedTime]
    );

    // Increment / Decrement stepping
    const stepMinutes = React.useCallback(
      (direction: 1 | -1) => {
        const current = parsedTime ?? { hours: 12, minutes: 0 };
        let total = current.hours * 60 + current.minutes + direction * minuteStep;
        if (total < 0) total += 24 * 60;
        total = total % (24 * 60);

        const newH = Math.floor(total / 60);
        const newM = total % 60;
        commitTime(newH, newM);
      },
      [parsedTime, minuteStep, commitTime]
    );

    // Clear
    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (effectiveDisabled || effectiveReadOnly) return;
        setSelectedTime(null);
        setInputValue("");
        inputRef.current?.focus();
      },
      [effectiveDisabled, effectiveReadOnly, setSelectedTime]
    );

    // Keyboard navigation in input
    const handleInputKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (effectiveDisabled || effectiveReadOnly) return;

        if (e.key === "ArrowUp") {
          e.preventDefault();
          stepMinutes(1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          stepMinutes(-1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        } else if (e.key === "Escape" && isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
      },
      [effectiveDisabled, effectiveReadOnly, stepMinutes, setIsOpen, isOpen]
    );

    // Manual typing blur commit
    const handleInputBlur = React.useCallback(() => {
      const trimmed = inputValue.trim();
      if (!trimmed) {
        if (isClearable) {
          setSelectedTime(null);
        } else {
          setInputValue(displayValue);
        }
        return;
      }

      // Try parsing 24h or 12h string
      let parsed: ParsedTime | null = parse24HourTime(trimmed);
      if (!parsed) {
        // Try parsing 12h format like "2:30 pm"
        const match12 = /^([0-1]?[0-9]):([0-5][0-9])\s*([ap]m)?$/i.exec(trimmed);
        if (match12) {
          let h = parseInt(match12[1]!, 10);
          const m = parseInt(match12[2]!, 10);
          const p = match12[3]?.toLowerCase();

          if (p === "pm" && h < 12) h += 12;
          if (p === "am" && h === 12) h = 0;
          if (h >= 0 && h < 24) {
            parsed = { hours: h, minutes: m };
          }
        }
      }

      if (parsed && isTimeWithinBounds(parsed.hours, parsed.minutes, minTime, maxTime)) {
        commitTime(parsed.hours, parsed.minutes);
      } else {
        setInputValue(displayValue);
      }
    }, [inputValue, isClearable, displayValue, minTime, maxTime, commitTime, setSelectedTime]);

    // Accessible description wiring
    const ariaDescribedBy = [
      rest["aria-describedby"],
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    // Minute list options
    const minuteOptions = React.useMemo(() => {
      const options: number[] = [];
      const step = Math.max(1, Math.min(60, minuteStep));
      for (let m = 0; m < 60; m += step) {
        options.push(m);
      }
      return options;
    }, [minuteStep]);

    // Hours list options
    const hourOptions = React.useMemo(() => {
      if (format === "24h") {
        return Array.from({ length: 24 }, (_, i) => i);
      }
      return Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
    }, [format]);

    const currentHour = parsedTime?.hours ?? 12;
    const currentMinute = parsedTime?.minutes ?? 0;
    const currentPeriod = currentHour >= 12 ? "PM" : "AM";
    const current12Hour = currentHour % 12 === 0 ? 12 : currentHour % 12;

    const hasValue = Boolean(selectedTime);

    return (
      <div
        ref={ref}
        className={classNames(
          "cl-timepicker",
          `cl-timepicker--${size}`,
          effectiveDisabled && "cl-timepicker--disabled",
          effectiveInvalid && "cl-timepicker--error",
          isOpen && "cl-timepicker--open",
          className
        )}
        {...rest}
      >
        <Popover
          isOpen={effectiveDisabled ? false : isOpen}
          onOpenChange={(nextOpen) => {
            if (!effectiveDisabled) {
              setIsOpen(nextOpen);
            }
          }}
          placement="bottom-start"
          offset={4}
          trapFocus={false}
          returnFocusRef={inputRef}
          referenceElement={controlRef}
        >
          <div ref={controlRef} className="cl-timepicker__control">
            {/* Clock Trigger Icon Button (Left) */}
            <button
              type="button"
              className="cl-timepicker__icon-btn"
              aria-label={isOpen ? "Close time picker" : "Open time picker"}
              disabled={effectiveDisabled}
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!effectiveDisabled) {
                  setIsOpen((prev) => !prev);
                  inputRef.current?.focus();
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>

            {/* Input Surface */}
            <input
              ref={inputRef}
              id={effectiveId}
              name={name}
              type="text"
              readOnly={effectiveReadOnly}
              disabled={effectiveDisabled}
              aria-disabled={effectiveDisabled ? "true" : undefined}
              aria-invalid={effectiveInvalid ? "true" : undefined}
              aria-label={ariaLabel ?? "Choose time"}
              aria-describedby={ariaDescribedBy}
              placeholder={placeholder ?? (format === "12h" ? "hh:mm AM/PM" : "HH:mm")}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              onClick={() => {
                if (!effectiveDisabled && !isOpen) {
                  setIsOpen(true);
                }
              }}
              className="cl-timepicker__input"
              autoComplete="off"
            />

            {/* Action buttons: Clear & Open Toggle */}
            <div className="cl-timepicker__actions">
              {isClearable && hasValue && !effectiveDisabled && !effectiveReadOnly && (
                <button
                  type="button"
                  className="cl-timepicker__clear-btn"
                  aria-label="Clear time"
                  onClick={handleClear}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              )}

              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="cl-timepicker__toggle-btn"
                  aria-label={isOpen ? "Close time picker" : "Toggle time picker"}
                  disabled={effectiveDisabled}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </PopoverTrigger>
            </div>
          </div>

          {/* Floating Time Dropdown Columns */}
          <PopoverPortal>
            <PopoverContent className="cl-timepicker__popover" hasArrow={false}>
              <div className="cl-timepicker__columns" role="dialog" aria-label="Time options">
                {/* Hours column */}
                <div className="cl-timepicker__column" role="listbox" aria-label="Hours">
                  <div className="cl-timepicker__column-title">Hrs</div>
                  {hourOptions.map((hour) => {
                    let h24: number;
                    if (format === "24h") {
                      h24 = hour;
                    } else {
                      h24 = currentPeriod === "PM" ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
                    }
                    const isSelected =
                      format === "24h"
                        ? parsedTime?.hours === hour
                        : current12Hour === hour;
                    const isDisabled = !isTimeWithinBounds(h24, currentMinute, minTime, maxTime);

                    return (
                      <button
                        key={hour}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={isDisabled}
                        className={classNames(
                          "cl-timepicker__option",
                          isSelected && "cl-timepicker__option--selected"
                        )}
                        onClick={() => {
                          commitTime(h24, currentMinute);
                        }}
                      >
                        {String(hour).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>

                {/* Minutes column */}
                <div className="cl-timepicker__column" role="listbox" aria-label="Minutes">
                  <div className="cl-timepicker__column-title">Min</div>
                  {minuteOptions.map((min) => {
                    const isSelected = parsedTime?.minutes === min;
                    const isDisabled = !isTimeWithinBounds(currentHour, min, minTime, maxTime);

                    return (
                      <button
                        key={min}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        disabled={isDisabled}
                        className={classNames(
                          "cl-timepicker__option",
                          isSelected && "cl-timepicker__option--selected"
                        )}
                        onClick={() => {
                          commitTime(currentHour, min);
                        }}
                      >
                        {String(min).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>

                {/* Period column (12h only) */}
                {format === "12h" && (
                  <div className="cl-timepicker__column" role="listbox" aria-label="Period">
                    <div className="cl-timepicker__column-title">AM/PM</div>
                    {(["AM", "PM"] as const).map((period) => {
                      const isSelected = currentPeriod === period;
                      let h24: number;
                      if (period === "AM") {
                        h24 = current12Hour === 12 ? 0 : current12Hour;
                      } else {
                        h24 = current12Hour === 12 ? 12 : current12Hour + 12;
                      }
                      const isDisabled = !isTimeWithinBounds(h24, currentMinute, minTime, maxTime);

                      return (
                        <button
                          key={period}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          disabled={isDisabled}
                          className={classNames(
                            "cl-timepicker__option",
                            isSelected && "cl-timepicker__option--selected"
                          )}
                          onClick={() => {
                            commitTime(h24, currentMinute);
                          }}
                        >
                          {period}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";
