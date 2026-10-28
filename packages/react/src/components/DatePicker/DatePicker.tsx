"use client";

import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import { formatLocalDate, isDateInRange, isSameDay, parseLocalDate } from "../../utils/date";
import { Calendar } from "../Calendar/Calendar";
import { useFormField } from "../FormField/FormFieldContext";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "../Popover";
import type { DatePickerProps } from "./DatePicker.types";

/**
 * DatePicker combines a formatted text input with an anchored calendar popover dropdown.
 *
 * @example
 * ```tsx
 * <DatePicker value={date} onValueChange={setDate} />
 * <DatePicker format="MM/DD/YYYY" isClearable />
 * ```
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      format = "YYYY-MM-DD",
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
      size = "md",
      id,
      name,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    // 1. FormField cascade integration
    const formField = useFormField();
    const effectiveId = id ?? formField?.id;
    const effectiveDisabled = isDisabled || (formField?.disabled ?? false);
    const effectiveInvalid = isInvalid || (formField?.error ?? false);

    // 2. Controlled / Uncontrolled Selection State
    const [selectedDate, setSelectedDate] = useControllableState<Date | null>({
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

    // 4. Synchronize manual input text representation
    const [inputValue, setInputValue] = React.useState<string>(() => {
      return formatLocalDate(selectedDate, format, locale);
    });

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const controlRef = React.useRef<HTMLDivElement | null>(null);

    // Sync input text when selectedDate changes externally
    React.useEffect(() => {
      setInputValue(formatLocalDate(selectedDate, format, locale));
    }, [selectedDate, format, locale]);

    // Handle Calendar Date Selection
    const handleCalendarSelect = React.useCallback(
      (newDate: Date) => {
        setSelectedDate(newDate);
        setInputValue(formatLocalDate(newDate, format, locale));
        setIsOpen(false);
        inputRef.current?.focus();
      },
      [format, locale, setSelectedDate, setIsOpen],
    );

    // Commit typed input value
    const commitInputValue = React.useCallback(
      (rawText: string) => {
        const trimmed = rawText.trim();
        if (!trimmed) {
          if (isClearable) {
            if (selectedDate !== null) {
              setSelectedDate(null);
            }
            setInputValue("");
          } else {
            setInputValue(formatLocalDate(selectedDate, format, locale));
          }
          return;
        }

        const parsed = parseLocalDate(trimmed);
        if (
          parsed &&
          isDateInRange(parsed, minDate, maxDate) &&
          (!isDateDisabled || !isDateDisabled(parsed))
        ) {
          if (!selectedDate || !isSameDay(parsed, selectedDate)) {
            setSelectedDate(parsed);
          }
          setInputValue(formatLocalDate(parsed, format, locale));
        } else {
          // Revert to last valid selected date string
          setInputValue(formatLocalDate(selectedDate, format, locale));
        }
      },
      [format, isClearable, isDateDisabled, locale, maxDate, minDate, selectedDate, setSelectedDate],
    );

    // Handle Manual Input Changes
    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      [],
    );

    // Handle Input Blur
    const handleInputBlur = React.useCallback(() => {
      commitInputValue(inputValue);
    }, [commitInputValue, inputValue]);

    // Handle Enter & ArrowDown Key on Input
    const handleInputKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitInputValue(inputValue);
          setIsOpen(false);
        } else if (e.key === "ArrowDown" && !isOpen && !effectiveDisabled) {
          e.preventDefault();
          setIsOpen(true);
        }
      },
      [commitInputValue, effectiveDisabled, inputValue, isOpen, setIsOpen],
    );

    // Handle Clear Button Action
    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedDate(null);
        setInputValue("");
        inputRef.current?.focus();
      },
      [setSelectedDate],
    );

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (effectiveDisabled) return;
        setIsOpen(nextOpen);
        if (!nextOpen) {
          inputRef.current?.focus();
        }
      },
      [effectiveDisabled, setIsOpen],
    );

    return (
      <div
        ref={ref}
        className={classNames(
          "cl-datepicker",
          `cl-datepicker--${size}`,
          effectiveInvalid && "cl-datepicker--invalid",
          className,
        )}
        {...rest}
      >
        <Popover
          isOpen={effectiveDisabled ? false : isOpen}
          onOpenChange={handleOpenChange}
          placement="bottom-start"
          offset={4}
          trapFocus={false}
          returnFocusRef={inputRef}
          referenceElement={controlRef}
        >
          <div ref={controlRef} className="cl-datepicker__control">
            {/* Left Calendar Trigger Button */}
            <button
              type="button"
              className="cl-datepicker__icon-btn"
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
            </button>

            {/* Text Input */}
            <input
              ref={inputRef}
              id={effectiveId}
              name={name}
              type="text"
              disabled={effectiveDisabled}
              aria-disabled={effectiveDisabled ? "true" : undefined}
              aria-invalid={effectiveInvalid ? "true" : undefined}
              aria-label={ariaLabel ?? "Choose date"}
              placeholder={placeholder ?? format}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              className="cl-datepicker__input"
              autoComplete="off"
            />

            {/* Action Buttons: Clear & Open Trigger */}
            <div className="cl-datepicker__actions">
              {isClearable && selectedDate && !effectiveDisabled && (
                <button
                  type="button"
                  className="cl-datepicker__clear-btn"
                  aria-label="Clear date"
                  onClick={handleClear}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              )}

              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="cl-datepicker__toggle-btn"
                  aria-label={isOpen ? "Close calendar" : "Toggle calendar"}
                  disabled={effectiveDisabled}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
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
            <PopoverContent className="cl-datepicker__popover" hasArrow={false}>
              <Calendar
                value={selectedDate}
                onValueChange={handleCalendarSelect}
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                firstDayOfWeek={firstDayOfWeek}
                locale={locale}
                defaultFocusedDate={selectedDate ?? undefined}
              />
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
