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
import type {
  RangePickerProps,
  RangePickerRef,
  RangePickerSemanticDOM,
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

export const RangePicker = forwardRef<RangePickerRef, RangePickerProps>(
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
      onCalendarChange,
      onOk,
      placeholder = ["Start date", "End date"],
      allowEmpty = [false, false],
      separator = "→",
      showTime = false,
      presets,
      classNames,
      styles,
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-date-picker", datePickerCssText);
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Controlled vs uncontrolled open
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

    // Range value state
    const parseRange = (
      val?: [any, any] | null
    ): [Dayjs | null, Dayjs | null] => {
      if (!val) return [null, null];
      return [toDayjs(val[0]), toDayjs(val[1])];
    };

    const [uncontrolledValue, setUncontrolledValue] = useState<
      [Dayjs | null, Dayjs | null]
    >(() => parseRange(defaultValue));

    const isControlled = controlledValue !== undefined;
    const currentRange = isControlled
      ? parseRange(controlledValue)
      : uncontrolledValue;

    // Active input (0 = start, 1 = end)
    const [activeInputIndex, setActiveInputIndex] = useState<0 | 1>(0);

    // Calendar view navigation dates
    const [leftViewDate, setLeftViewDate] = useState<Dayjs>(() => {
      return currentRange[0] || dayjs();
    });

    const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);

    // Popup positioning
    const [popupCoords, setPopupCoords] = useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });

    const updateCoords = useCallback(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const top =
        placement.startsWith("top")
          ? rect.top + window.scrollY - 300
          : rect.bottom + window.scrollY + 4;
      const left = placement.endsWith("Right")
        ? rect.right + window.scrollX - 580
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
      focus: (index = 0) => {
        if (index === 0) startInputRef.current?.focus();
        else endInputRef.current?.focus();
      },
      blur: () => {
        startInputRef.current?.blur();
        endInputRef.current?.blur();
      },
      get nativeElement() {
        return startInputRef.current;
      },
    }));

    // Disabled state resolution
    const isStartDisabled = Array.isArray(disabled) ? disabled[0] : Boolean(disabled);
    const isEndDisabled = Array.isArray(disabled) ? disabled[1] : Boolean(disabled);
    const isAllDisabled = isStartDisabled && isEndDisabled;

    const normalizedSize: string =
      size === "lg" || size === "large"
        ? "lg"
        : size === "sm" || size === "small"
        ? "sm"
        : "md";

    const resolvedClassNames: Partial<Record<RangePickerSemanticDOM, string>> =
      typeof classNames === "function" ? classNames({ props }) : classNames || {};
    const resolvedStyles: Partial<Record<RangePickerSemanticDOM, React.CSSProperties>> =
      typeof styles === "function" ? styles({ props }) : styles || {};

    const commitRange = (newRange: [Dayjs | null, Dayjs | null]) => {
      if (!isControlled) {
        setUncontrolledValue(newRange);
      }

      const strStart = formatDate(newRange[0], picker, format, showTime);
      const strEnd = formatDate(newRange[1], picker, format, showTime);
      onChange?.(newRange, [strStart, strEnd]);
    };

    const handleSelectDate = (d: Dayjs) => {
      if (activeInputIndex === 0) {
        // Pick start
        const nextRange: [Dayjs | null, Dayjs | null] = [d, currentRange[1]];
        if (currentRange[1] && d.isAfter(currentRange[1])) {
          nextRange[1] = null;
        }
        if (!isControlled) {
          setUncontrolledValue(nextRange);
        }
        onCalendarChange?.(nextRange, [
          formatDate(nextRange[0], picker, format, showTime),
          formatDate(nextRange[1], picker, format, showTime),
        ], { range: "start" });

        // Advance to end input
        setActiveInputIndex(1);
        endInputRef.current?.focus();
      } else {
        // Pick end
        let nextRange: [Dayjs | null, Dayjs | null] = [currentRange[0], d];
        if (currentRange[0] && d.isBefore(currentRange[0])) {
          nextRange = [d, currentRange[0]];
        }
        commitRange(nextRange);
        onCalendarChange?.(nextRange, [
          formatDate(nextRange[0], picker, format, showTime),
          formatDate(nextRange[1], picker, format, showTime),
        ], { range: "end" });

        if (!needConfirm && !showTime) {
          setOpen(false);
        }
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newStart = allowEmpty[0] ? currentRange[0] : null;
      const newEnd = allowEmpty[1] ? currentRange[1] : null;
      commitRange([newStart, newEnd]);
      onClear?.();
    };

    const startText = formatDate(currentRange[0], picker, format, showTime);
    const endText = formatDate(currentRange[1], picker, format, showTime);
    const hasValue = Boolean(startText || endText);

    const clearDisabled = typeof allowClear === "object" ? false : false;
    const clearIcon =
      typeof allowClear === "object" && allowClear.clearIcon ? (
        allowClear.clearIcon
      ) : (
        <span>✕</span>
      );

    const showClearBtn = Boolean(
      allowClear && hasValue && !isAllDisabled && !clearDisabled
    );

    const containerClasses = [
      "ch-picker-range",
      `ch-picker-range--${normalizedSize}`,
      `ch-picker-range--variant-${variant}`,
      status && `ch-picker-range--status-${status}`,
      isAllDisabled && "ch-picker-range--disabled",
      isOpen && "ch-picker-range--focused",
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
          if (!isAllDisabled) setOpen(true);
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
          <input
            ref={startInputRef}
            readOnly
            disabled={isStartDisabled}
            placeholder={placeholder[0]}
            value={startText}
            onClick={(e) => {
              e.stopPropagation();
              setActiveInputIndex(0);
              setOpen(true);
            }}
          />
        </div>

        <span
          className={`ch-picker-range-separator ${
            resolvedClassNames.separator || ""
          }`}
          style={resolvedStyles.separator}
        >
          {separator}
        </span>

        <div className="ch-picker-input">
          <input
            ref={endInputRef}
            readOnly
            disabled={isEndDisabled}
            placeholder={placeholder[1]}
            value={endText}
            onClick={(e) => {
              e.stopPropagation();
              setActiveInputIndex(1);
              setOpen(true);
            }}
          />
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
                        const finalRange: [Dayjs, Dayjs] = [
                          typeof resolvedVal[0] === "function"
                            ? resolvedVal[0]()
                            : resolvedVal[0],
                          typeof resolvedVal[1] === "function"
                            ? resolvedVal[1]()
                            : resolvedVal[1],
                        ];
                        commitRange(finalRange);
                        setOpen(false);
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Dual Panels */}
              <div className="ch-picker-panels">
                <CalendarPanel
                  picker={picker}
                  rangeValue={currentRange}
                  viewDate={leftViewDate}
                  onViewDateChange={setLeftViewDate}
                  onSelect={handleSelectDate}
                  hoverDate={hoverDate}
                  onHoverDate={setHoverDate}
                  minDate={toDayjs(minDate)}
                  maxDate={toDayjs(maxDate)}
                  disabledDate={disabledDate}
                  cellRender={cellRender}
                  showTime={showTime}
                  showNow={false}
                  extraFooter={renderExtraFooter?.("date")}
                  onOk={
                    needConfirm || showTime
                      ? () => {
                          onOk?.(currentRange);
                          setOpen(false);
                        }
                      : undefined
                  }
                />
                <CalendarPanel
                  picker={picker}
                  rangeValue={currentRange}
                  viewDate={leftViewDate.add(1, "month")}
                  onViewDateChange={(d) => setLeftViewDate(d.subtract(1, "month"))}
                  onSelect={handleSelectDate}
                  hoverDate={hoverDate}
                  onHoverDate={setHoverDate}
                  minDate={toDayjs(minDate)}
                  maxDate={toDayjs(maxDate)}
                  disabledDate={disabledDate}
                  cellRender={cellRender}
                  showTime={showTime}
                  showNow={false}
                  onOk={
                    needConfirm || showTime
                      ? () => {
                          onOk?.(currentRange);
                          setOpen(false);
                        }
                      : undefined
                  }
                />
              </div>
            </div>,
            getPopupContainer && containerRef.current
              ? getPopupContainer(containerRef.current)
              : document.body
          )}
      </div>
    );
  }
);

RangePicker.displayName = "DatePicker.RangePicker";
