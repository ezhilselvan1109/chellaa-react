"use client";

import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import { formatLocalDate } from "../../utils/date";
import { Calendar } from "../Calendar/Calendar";
import { useFormField } from "../FormField/FormFieldContext";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "../Popover";
import type { DateRange, DateRangePickerProps } from "./DateRangePicker.types";

function formatRangeString(
  range: DateRange | null,
  format: string,
  locale: string,
  separator: string
): string {
  if (!range?.startDate) return "";
  const startStr = formatLocalDate(range.startDate, format, locale);
  if (!range.endDate) return `${startStr}${separator}...`;
  const endStr = formatLocalDate(range.endDate, format, locale);
  return `${startStr}${separator}${endStr}`;
}

/**
 * DateRangePicker combines formatted range input display with an anchored calendar popover dropdown
 * supporting dual-date range selection, bounds constraints, keyboard navigation, and FormField integration.
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   value={dateRange}
 *   onValueChange={setDateRange}
 *   rangeSeparator=" to "
 * />
 * ```
 */
export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      format = "YYYY-MM-DD",
      rangeSeparator = " – ",
      placeholder,
      isOpen: isOpenProp,
      defaultOpen = false,
      onOpenChange,
      isDisabled = false,
      isInvalid = false,
      isClearable = true,
      minDate,
      maxDate,
      isDateDisabled,
      firstDayOfWeek = 0,
      locale = "en-US",
      defaultFocusedDate,
      size = "md",
      id,
      name,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    // 1. FormField cascade integration
    const formField = useFormField();
    const effectiveId = id ?? formField?.id;
    const effectiveDisabled = isDisabled || (formField?.disabled ?? false);
    const effectiveInvalid = isInvalid || (formField?.error ?? false);

    // 2. Controlled / Uncontrolled Selection State
    const [selectedRange, setSelectedRange] = useControllableState<DateRange | null>({
      value: valueProp,
      defaultValue: defaultValue ?? null,
      onChange: onValueChange,
    });

    // 3. Controlled / Uncontrolled Open State
    const [isOpen, setIsOpen] = useControllableState<boolean>({
      value: isOpenProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const controlRef = React.useRef<HTMLDivElement | null>(null);

    // Formatted text representation
    const displayValue = React.useMemo(() => {
      return formatRangeString(selectedRange, format, locale, rangeSeparator);
    }, [selectedRange, format, locale, rangeSeparator]);

    // Handle Range Selection from Calendar
    const handleRangeChange = React.useCallback(
      (newRange: DateRange) => {
        setSelectedRange(newRange);
        // Automatically close when both start and end date are selected
        if (newRange.startDate && newRange.endDate) {
          setTimeout(() => {
            setIsOpen(false);
            inputRef.current?.focus();
          }, 120);
        }
      },
      [setSelectedRange, setIsOpen]
    );

    // Clear range
    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (effectiveDisabled) return;
        const emptyRange: DateRange = { startDate: null, endDate: null };
        setSelectedRange(emptyRange);
        inputRef.current?.focus();
      },
      [effectiveDisabled, setSelectedRange]
    );

    // Keyboard navigation from input
    const handleInputKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (effectiveDisabled) return;

        if (e.key === "ArrowDown" || e.key === "Enter") {
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        } else if (e.key === "Escape" && isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
      },
      [effectiveDisabled, isOpen, setIsOpen]
    );

    // Accessible description wiring
    const ariaDescribedBy = [
      rest["aria-describedby"],
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    const hasValue = Boolean(selectedRange?.startDate);

    return (
      <div
        ref={ref}
        className={classNames(
          "cl-daterangepicker",
          `cl-daterangepicker--${size}`,
          effectiveDisabled && "cl-daterangepicker--disabled",
          effectiveInvalid && "cl-daterangepicker--error",
          isOpen && "cl-daterangepicker--open",
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
          <div ref={controlRef} className="cl-daterangepicker__control">
            {/* Left Calendar Trigger Button */}
            <button
              type="button"
              className="cl-daterangepicker__icon-btn"
              aria-label={isOpen ? "Close calendar" : "Open calendar"}
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
            </button>

            {/* Read-only formatted range input */}
            <input
              ref={inputRef}
              id={effectiveId}
              name={name}
              type="text"
              readOnly
              disabled={effectiveDisabled}
              aria-disabled={effectiveDisabled ? "true" : undefined}
              aria-invalid={effectiveInvalid ? "true" : undefined}
              aria-label={ariaLabel ?? "Date range"}
              aria-describedby={ariaDescribedBy}
              placeholder={placeholder ?? `${format}${rangeSeparator}${format}`}
              value={displayValue}
              onClick={() => {
                if (!effectiveDisabled && !isOpen) {
                  setIsOpen(true);
                }
              }}
              onKeyDown={handleInputKeyDown}
              className="cl-daterangepicker__input"
              autoComplete="off"
            />

            {/* Action buttons: Clear & Open Toggle */}
            <div className="cl-daterangepicker__actions">
              {isClearable && hasValue && !effectiveDisabled && (
                <button
                  type="button"
                  className="cl-daterangepicker__clear-btn"
                  aria-label="Clear date range"
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
                  className="cl-daterangepicker__toggle-btn"
                  aria-label={isOpen ? "Close calendar" : "Toggle calendar"}
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

          {/* Floating Calendar Overlay */}
          <PopoverPortal>
            <PopoverContent className="cl-daterangepicker__popover" hasArrow={false}>
              <Calendar
                isRange
                rangeValue={selectedRange}
                onRangeChange={handleRangeChange}
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                firstDayOfWeek={firstDayOfWeek}
                locale={locale}
                defaultFocusedDate={selectedRange?.startDate ?? defaultFocusedDate}
              />
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
