import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import type { Dayjs } from "dayjs";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { datePickerCssText } from "./DatePicker.style";
import { dayjs, toDayjs, formatDate } from "./dateUtil";
import { CalendarPanel } from "./CalendarPanel";
import { RangePicker } from "./RangePicker";
import type {
  DatePickerProps,
  DatePickerRef,
  DatePickerSemanticDOM,
} from "./DatePicker.types";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const defaultCalendarIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export interface CompoundedDatePicker
  extends React.ForwardRefExoticComponent<
    DatePickerProps & React.RefAttributes<DatePickerRef>
  > {
  RangePicker: typeof RangePicker;
}

const InternalDatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (props, ref) => {
    const {
      picker = "date",
      format,
      variant = "outlined",
      size = "medium",
      status,
      disabled = false,
      allowClear = true,
      onClear,
      minDate,
      maxDate,
      disabledDate,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      placement = "bottomLeft",
      getPopupContainer,
      prefix,
      suffixIcon = defaultCalendarIcon,
      renderExtraFooter,
      cellRender,
      needConfirm = false,
      rootClassName,
      className = "",
      style,
      value: controlledValue,
      defaultValue,
      onChange,
      onOk,
      placeholder = "Select date",
      showTime = false,
      showNow = true,
      multiple = false,
      presets,
      classNames,
      styles,
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-date-picker", datePickerCssText);
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Open / Close state
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

    const setOpen = useCallback(
      (nextOpen: boolean) => {
        if (controlledOpen === undefined) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [controlledOpen, onOpenChange]
    );

    // Resolve Value state (Single vs Multiple)
    const parseValue = (
      val?: any
    ): Dayjs | Dayjs[] | null => {
      if (!val) return multiple ? [] : null;
      if (Array.isArray(val)) {
        return val.map((v) => toDayjs(v)).filter(Boolean) as Dayjs[];
      }
      return toDayjs(val);
    };

    const [uncontrolledValue, setUncontrolledValue] = useState<
      Dayjs | Dayjs[] | null
    >(() => parseValue(defaultValue));

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled
      ? parseValue(controlledValue)
      : uncontrolledValue;

    // View Date navigation
    const [viewDate, setViewDate] = useState<Dayjs>(() => {
      if (Array.isArray(currentValue) && currentValue[0]) return currentValue[0];
      if (currentValue && !Array.isArray(currentValue)) return currentValue;
      return dayjs();
    });

    // Popup Coords
    const [popupCoords, setPopupCoords] = useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });

    const updateCoords = useCallback(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top =
        placement.startsWith("top")
          ? rect.top + window.scrollY - 320
          : rect.bottom + window.scrollY + 4;
      const left = placement.endsWith("Right")
        ? rect.right + window.scrollX - 288
        : rect.left + window.scrollX;

      setPopupCoords({ top: Math.max(0, top), left: Math.max(0, left) });
    }, [placement]);

    useIsomorphicLayoutEffect(() => {
      if (isOpen) {
        updateCoords();
        window.addEventListener("resize", updateCoords);
        window.addEventListener("scroll", updateCoords);
        return () => {
          window.removeEventListener("resize", updateCoords);
          window.removeEventListener("scroll", updateCoords);
        };
      }
      return undefined;
    }, [isOpen, updateCoords]);

    // Click outside listener
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          popupRef.current &&
          !popupRef.current.contains(target)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setOpen]);

    // Imperative ref handle
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
      get nativeElement() {
        return inputRef.current;
      },
    }));

    const normalizedSize: string =
      size === "lg" || size === "large"
        ? "lg"
        : size === "sm" || size === "small"
        ? "sm"
        : "md";

    const resolvedClassNames: Partial<Record<DatePickerSemanticDOM, string>> =
      typeof classNames === "function" ? classNames({ props }) : classNames || {};
    const resolvedStyles: Partial<Record<DatePickerSemanticDOM, React.CSSProperties>> =
      typeof styles === "function" ? styles({ props }) : styles || {};

    const commitValue = (nextVal: Dayjs | Dayjs[] | null) => {
      if (!isControlled) {
        setUncontrolledValue(nextVal);
      }

      if (Array.isArray(nextVal)) {
        const dateStr = nextVal
          .map((d) => formatDate(d, picker, format, showTime))
          .join(", ");
        onChange?.(nextVal[0] || null, dateStr);
      } else {
        const dateStr = formatDate(nextVal, picker, format, showTime);
        onChange?.(nextVal, dateStr);
      }
    };

    const handleSelectDate = (d: Dayjs) => {
      if (multiple) {
        const existing = Array.isArray(currentValue) ? [...currentValue] : [];
        const foundIdx = existing.findIndex((e) => e.isSame(d, "day"));
        if (foundIdx > -1) {
          existing.splice(foundIdx, 1);
        } else {
          existing.push(d);
        }
        commitValue(existing);
      } else {
        commitValue(d);
        if (!needConfirm && !showTime) {
          setOpen(false);
        }
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      commitValue(multiple ? [] : null);
      onClear?.();
    };

    // Calculate display strings
    let displayString = "";
    let hasValue = false;

    if (Array.isArray(currentValue)) {
      hasValue = currentValue.length > 0;
      displayString = currentValue
        .map((d) => formatDate(d, picker, format, showTime))
        .join(", ");
    } else if (currentValue) {
      hasValue = true;
      displayString = formatDate(currentValue, picker, format, showTime);
    }

    const clearDisabled = typeof allowClear === "object" ? false : false;
    const clearIcon =
      typeof allowClear === "object" && allowClear.clearIcon ? (
        allowClear.clearIcon
      ) : (
        <span>✕</span>
      );

    const showClearBtn = Boolean(allowClear && hasValue && !disabled && !clearDisabled);

    const containerClasses = [
      "ch-picker",
      `ch-picker--${normalizedSize}`,
      `ch-picker--variant-${variant}`,
      status && `ch-picker--status-${status}`,
      disabled && "ch-picker--disabled",
      isOpen && "ch-picker--focused",
      rootClassName,
      className,
      resolvedClassNames.root,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={containerRef}
        className={containerClasses}
        style={{ ...style, ...resolvedStyles.root }}
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
      >
        {prefix && (
          <span
            className={`ch-picker-prefix ${resolvedClassNames.prefix || ""}`}
            style={resolvedStyles.prefix}
          >
            {prefix}
          </span>
        )}

        <div className="ch-picker-input">
          {multiple && Array.isArray(currentValue) && currentValue.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
              {currentValue.map((dateItem, idx) => (
                <span key={`tag-${idx}`} className="ch-picker-multiple-tag">
                  {formatDate(dateItem, picker, format, showTime)}
                  <span
                    className="ch-picker-multiple-tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = currentValue.filter((_, i) => i !== idx);
                      commitValue(next);
                    }}
                  >
                    ✕
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <input
              ref={inputRef}
              readOnly
              disabled={disabled}
              placeholder={placeholder}
              value={displayString}
            />
          )}
        </div>

        {showClearBtn ? (
          <span className="ch-picker-clear" onClick={handleClear}>
            {clearIcon}
          </span>
        ) : (
          <span
            className={`ch-picker-suffix ${resolvedClassNames.suffix || ""}`}
            style={resolvedStyles.suffix}
          >
            {suffixIcon}
          </span>
        )}

        {/* Dropdown Floating Layer */}
        {isOpen &&
          createPortal(
            <div
              ref={popupRef}
              className={`ch-picker-dropdown ${
                resolvedClassNames["popup.root"] || ""
              }`}
              style={{
                top: `${popupCoords.top}px`,
                left: `${popupCoords.left}px`,
                ...resolvedStyles["popup.root"],
              }}
            >
              {/* Presets Sidebar */}
              {presets && presets.length > 0 && (
                <div className="ch-picker-presets">
                  {presets.map((preset, pIdx) => (
                    <button
                      key={`preset-${pIdx}`}
                      type="button"
                      onClick={() => {
                        const resolvedVal =
                          typeof preset.value === "function"
                            ? preset.value()
                            : preset.value;
                        commitValue(resolvedVal);
                        setOpen(false);
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}

              <CalendarPanel
                picker={picker}
                value={currentValue}
                viewDate={viewDate}
                onViewDateChange={setViewDate}
                onSelect={handleSelectDate}
                minDate={toDayjs(minDate)}
                maxDate={toDayjs(maxDate)}
                disabledDate={disabledDate}
                cellRender={cellRender}
                showTime={showTime}
                showNow={showNow}
                extraFooter={renderExtraFooter?.("date")}
                onOk={
                  needConfirm || showTime
                    ? () => {
                        const single = Array.isArray(currentValue)
                          ? currentValue[0] || null
                          : currentValue;
                        onOk?.(single);
                        setOpen(false);
                      }
                    : undefined
                }
              />
            </div>,
            getPopupContainer && containerRef.current
              ? getPopupContainer(containerRef.current)
              : document.body
          )}
      </div>
    );
  }
);

InternalDatePicker.displayName = "DatePicker";

export const DatePicker = InternalDatePicker as CompoundedDatePicker;
DatePicker.RangePicker = RangePicker;
