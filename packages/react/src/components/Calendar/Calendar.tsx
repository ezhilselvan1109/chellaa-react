"use client";

import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import {
  addDays,
  addMonths,
  addYears,
  getCalendarGrid,
  getMonthLabel,
  getWeekdayLabels,
  isDateAfter,
  isDateBefore,
  isDateInRange,
  isSameDay,
  isSameMonth,
} from "../../utils/date";
import type { CalendarProps, DateRange } from "./Calendar.types";

/**
 * Calendar provides an accessible WAI-ARIA APG compliant grid for selecting single calendar dates.
 *
 * @example
 * ```tsx
 * <Calendar value={selectedDate} onValueChange={setSelectedDate} />
 * ```
 */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      isRange = false,
      rangeValue: rangeValueProp,
      defaultRangeValue,
      onRangeChange,
      minDate,
      maxDate,
      isDateDisabled,
      firstDayOfWeek = 0,
      locale = "en-US",
      defaultFocusedDate,
      className,
      "aria-label": ariaLabel = "Calendar",
      ...rest
    },
    ref,
  ) => {
    // 1. Controlled / Uncontrolled Selection State (Single Date)
    const [selectedDate, setSelectedDate] = useControllableState<Date | null>({
      value: valueProp,
      defaultValue: defaultValue ?? null,
      onChange: (val) => {
        if (val) {
          onValueChange?.(val);
        }
      },
    });

    // 1b. Controlled / Uncontrolled Selection State (Date Range)
    const [range, setRange] = useControllableState<DateRange | null>({
      value: rangeValueProp,
      defaultValue: defaultRangeValue ?? null,
      onChange: (val) => {
        if (val) {
          onRangeChange?.(val);
        }
      },
    });

    // 2. Visible Month & Year in View
    const [viewDate, setViewDate] = React.useState<Date>(() => {
      return (
        (isRange ? range?.startDate ?? range?.endDate : selectedDate) ??
        defaultFocusedDate ??
        new Date()
      );
    });

    // 3. Focused Date for Roving Tabindex
    const [focusedDate, setFocusedDate] = React.useState<Date>(() => {
      return (
        (isRange ? range?.startDate ?? range?.endDate : selectedDate) ??
        defaultFocusedDate ??
        new Date()
      );
    });

    // Track when calendar is focused to maintain keyboard focus across renders
    const [isGridFocused, setIsGridFocused] = React.useState(false);
    const activeDayButtonRef = React.useRef<HTMLButtonElement | null>(null);

    // Keep view synced if controlled value changes to a different month
    React.useEffect(() => {
      if (!isRange && valueProp && !isSameMonth(valueProp, viewDate)) {
        setViewDate(valueProp);
        setFocusedDate(valueProp);
      } else if (isRange && rangeValueProp?.startDate && !isSameMonth(rangeValueProp.startDate, viewDate)) {
        setViewDate(rangeValueProp.startDate);
        setFocusedDate(rangeValueProp.startDate);
      }
    }, [isRange, valueProp, rangeValueProp]);

    // Keep active day button focused when navigating via keyboard
    React.useEffect(() => {
      if (isGridFocused && activeDayButtonRef.current) {
        activeDayButtonRef.current.focus();
      }
    }, [focusedDate, viewDate, isGridFocused]);

    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();

    // Check if a specific date is disabled
    const checkIsDisabled = React.useCallback(
      (date: Date) => {
        if (!isDateInRange(date, minDate, maxDate)) return true;
        if (isDateDisabled && isDateDisabled(date)) return true;
        return false;
      },
      [minDate, maxDate, isDateDisabled],
    );

    // Navigation callbacks
    const handlePrevMonth = React.useCallback(() => {
      setViewDate((prev) => addMonths(prev, -1));
    }, []);

    const handleNextMonth = React.useCallback(() => {
      setViewDate((prev) => addMonths(prev, 1));
    }, []);

    // Date selection handler
    const handleSelectDate = React.useCallback(
      (targetDate: Date) => {
        if (checkIsDisabled(targetDate)) return;

        if (isRange) {
          let nextRange: DateRange;
          const currentStart = range?.startDate;
          const currentEnd = range?.endDate;

          if (!currentStart || (currentStart && currentEnd)) {
            // First click in range mode: starts range
            nextRange = { startDate: targetDate, endDate: null };
          } else {
            // Second click in range mode: completes range
            if (isDateBefore(targetDate, currentStart)) {
              nextRange = { startDate: targetDate, endDate: currentStart };
            } else {
              nextRange = { startDate: currentStart, endDate: targetDate };
            }
          }

          setRange(nextRange);
          setFocusedDate(targetDate);
          if (!isSameMonth(targetDate, viewDate)) {
            setViewDate(targetDate);
          }
        } else {
          setSelectedDate(targetDate);
          setFocusedDate(targetDate);

          // If selecting a leading or trailing day from another month, adjust view
          if (!isSameMonth(targetDate, viewDate)) {
            setViewDate(targetDate);
          }
        }
      },
      [checkIsDisabled, isRange, range, setRange, setSelectedDate, viewDate],
    );

    // WAI-ARIA Grid Keyboard Navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        let nextDate: Date | null = null;

        switch (e.key) {
          case "ArrowLeft":
            nextDate = addDays(focusedDate, -1);
            break;
          case "ArrowRight":
            nextDate = addDays(focusedDate, 1);
            break;
          case "ArrowUp":
            nextDate = addDays(focusedDate, -7);
            break;
          case "ArrowDown":
            nextDate = addDays(focusedDate, 7);
            break;
          case "Home": {
            const dayOfWeek = (focusedDate.getDay() - firstDayOfWeek + 7) % 7;
            nextDate = addDays(focusedDate, -dayOfWeek);
            break;
          }
          case "End": {
            const dayOfWeek = (focusedDate.getDay() - firstDayOfWeek + 7) % 7;
            nextDate = addDays(focusedDate, 6 - dayOfWeek);
            break;
          }
          case "PageUp":
            nextDate = e.shiftKey ? addYears(focusedDate, -1) : addMonths(focusedDate, -1);
            break;
          case "PageDown":
            nextDate = e.shiftKey ? addYears(focusedDate, 1) : addMonths(focusedDate, 1);
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            handleSelectDate(focusedDate);
            return;
          default:
            return;
        }

        if (nextDate) {
          e.preventDefault();
          setFocusedDate(nextDate);
          setIsGridFocused(true);

          if (!isSameMonth(nextDate, viewDate)) {
            setViewDate(nextDate);
          }
        }
      },
      [firstDayOfWeek, focusedDate, handleSelectDate, viewDate],
    );

    // Compute calendar grid (42 cells)
    const gridDays = React.useMemo(() => {
      return getCalendarGrid(viewYear, viewMonth, firstDayOfWeek);
    }, [viewYear, viewMonth, firstDayOfWeek]);

    // Compute weekday labels
    const weekdayLabels = React.useMemo(() => {
      return getWeekdayLabels(locale, firstDayOfWeek);
    }, [locale, firstDayOfWeek]);

    // Format current month and year title
    const monthTitle = `${getMonthLabel(viewYear, viewMonth, locale)} ${viewYear}`;

    // Group grid cells into 6 rows
    const rows = React.useMemo(() => {
      const result: (typeof gridDays)[] = [];
      for (let i = 0; i < gridDays.length; i += 7) {
        result.push(gridDays.slice(i, i + 7));
      }
      return result;
    }, [gridDays]);

    return (
      <div ref={ref} className={classNames("cl-calendar", className)} {...rest}>
        {/* Header with Month/Year and Navigation Buttons */}
        <div className="cl-calendar__header">
          <div className="cl-calendar__title" role="heading" aria-level={2}>
            {monthTitle}
          </div>
          <div className="cl-calendar__nav">
            <button
              type="button"
              className="cl-calendar__nav-btn cl-calendar__nav-btn--prev"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="cl-calendar__nav-btn cl-calendar__nav-btn--next"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Grid Table */}
        <table
          className="cl-calendar__grid"
          role="grid"
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
        >
          <thead className="cl-calendar__weekdays">
            <tr role="row">
              {weekdayLabels.map((wd) => (
                <th
                  key={wd.key}
                  role="columnheader"
                  className="cl-calendar__weekday"
                  abbr={wd.long}
                  title={wd.long}
                >
                  {wd.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} role="row" className="cl-calendar__row">
                {row.map((day) => {
                  const startDate = isRange ? range?.startDate : null;
                  const endDate = isRange ? range?.endDate : null;

                  const isRangeStart = Boolean(startDate && isSameDay(day.date, startDate));
                  const isRangeEnd = Boolean(endDate && isSameDay(day.date, endDate));
                  const isInRange = Boolean(
                    startDate &&
                      endDate &&
                      isDateAfter(day.date, startDate) &&
                      isDateBefore(day.date, endDate),
                  );

                  const isSelected = isRange
                    ? isRangeStart || isRangeEnd
                    : isSameDay(day.date, selectedDate);
                  const isFocused = isSameDay(day.date, focusedDate);
                  const isDisabled = checkIsDisabled(day.date);

                  const fullDayLabel = new Intl.DateTimeFormat(locale, {
                    dateStyle: "full",
                  }).format(day.date);

                  return (
                    <td
                      key={day.date.toISOString()}
                      role="gridcell"
                      className={classNames(
                        "cl-calendar__cell",
                        isRange && isInRange && "cl-calendar__cell--in-range",
                        isRange && isRangeStart && "cl-calendar__cell--range-start",
                        isRange && isRangeEnd && "cl-calendar__cell--range-end",
                      )}
                      aria-selected={isSelected}
                    >
                      <button
                        ref={isFocused ? activeDayButtonRef : null}
                        type="button"
                        tabIndex={isFocused ? 0 : -1}
                        className={classNames(
                          "cl-calendar__day",
                          day.isToday && "cl-calendar__day--today",
                          !day.isCurrentMonth && "cl-calendar__day--outside",
                          isSelected && "cl-calendar__day--selected",
                          isRange && isRangeStart && "cl-calendar__day--range-start",
                          isRange && isRangeEnd && "cl-calendar__day--range-end",
                          isRange && isInRange && "cl-calendar__day--in-range",
                          isDisabled && "cl-calendar__day--disabled",
                        )}
                        disabled={isDisabled}
                        aria-disabled={isDisabled ? "true" : undefined}
                        aria-current={day.isToday ? "date" : undefined}
                        aria-label={fullDayLabel}
                        onClick={() => handleSelectDate(day.date)}
                        onFocus={() => {
                          setFocusedDate(day.date);
                          setIsGridFocused(true);
                        }}
                        onBlur={() => setIsGridFocused(false)}
                      >
                        {day.dayNumber}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
