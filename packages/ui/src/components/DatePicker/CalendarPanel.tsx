import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import {
  dayjs,
  generateMonthMatrix,
  generateMonthList,
  generateDecadeYears,
} from "./dateUtil";
import { TimePanel } from "./TimePanel";
import type {
  PickerType,
  PanelMode,
  DisabledDateFn,
  CellRenderInfo,
  ShowTimeConfig,
} from "./DatePicker.types";

export interface CalendarPanelProps {
  picker?: PickerType;
  value?: Dayjs | Dayjs[] | null;
  rangeValue?: [Dayjs | null, Dayjs | null] | null;
  viewDate: Dayjs;
  onViewDateChange: (date: Dayjs) => void;
  onSelect: (date: Dayjs) => void;
  hoverDate?: Dayjs | null;
  onHoverDate?: (date: Dayjs | null) => void;
  minDate?: Dayjs | null;
  maxDate?: Dayjs | null;
  disabledDate?: DisabledDateFn;
  cellRender?: (current: Dayjs, info: CellRenderInfo) => React.ReactNode;
  showTime?: boolean | ShowTimeConfig;
  showNow?: boolean;
  onOk?: () => void;
  extraFooter?: React.ReactNode;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({
  picker = "date",
  value,
  rangeValue,
  viewDate,
  onViewDateChange,
  onSelect,
  hoverDate,
  onHoverDate,
  minDate,
  maxDate,
  disabledDate,
  cellRender,
  showTime,
  showNow = true,
  onOk,
  extraFooter,
}) => {
  // Determine initial panel mode based on picker
  const [panelMode, setPanelMode] = useState<PanelMode>(() => {
    if (picker === "month") return "month";
    if (picker === "year") return "year";
    if (picker === "quarter") return "quarter";
    return "date";
  });

  // Selected date reference for panel calculations
  const singleSelected = Array.isArray(value) ? value[0] : value;

  // Header Nav Actions
  const handleSuperPrev = () => {
    if (panelMode === "year" || panelMode === "decade") {
      onViewDateChange(viewDate.subtract(10, "year"));
    } else {
      onViewDateChange(viewDate.subtract(1, "year"));
    }
  };

  const handlePrev = () => {
    onViewDateChange(viewDate.subtract(1, "month"));
  };

  const handleNext = () => {
    onViewDateChange(viewDate.add(1, "month"));
  };

  const handleSuperNext = () => {
    if (panelMode === "year" || panelMode === "decade") {
      onViewDateChange(viewDate.add(10, "year"));
    } else {
      onViewDateChange(viewDate.add(1, "year"));
    }
  };

  // Month Table Header
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // 42 cells matrix
  const daysMatrix = generateMonthMatrix(
    viewDate,
    value,
    rangeValue,
    hoverDate,
    minDate,
    maxDate,
    disabledDate,
    picker
  );

  // Month list for Month view
  const monthsList = generateMonthList(
    viewDate,
    singleSelected,
    minDate,
    maxDate,
    disabledDate
  );

  // Decade years for Year view
  const { startDecadeYear, endDecadeYear, years } = generateDecadeYears(
    viewDate,
    singleSelected,
    minDate,
    maxDate,
    disabledDate
  );

  const handleDateClick = (d: Dayjs, isDisabled: boolean) => {
    if (isDisabled) return;
    onSelect(d);
  };

  const handleMonthClick = (mDate: Dayjs, isDisabled: boolean) => {
    if (isDisabled) return;
    if (picker === "month") {
      onSelect(mDate);
    } else {
      onViewDateChange(mDate);
      setPanelMode("date");
    }
  };

  const handleYearClick = (yDate: Dayjs, isDisabled: boolean) => {
    if (isDisabled) return;
    if (picker === "year") {
      onSelect(yDate);
    } else {
      onViewDateChange(yDate);
      setPanelMode("month");
    }
  };

  const handleQuarterClick = (qNum: number) => {
    const qDate = viewDate.month((qNum - 1) * 3);
    onSelect(qDate);
  };

  return (
    <div className="ch-picker-panel">
      {/* Header */}
      <div className="ch-picker-header">
        <button
          type="button"
          className="ch-picker-nav-btn ch-picker-header-super-prev-btn"
          onClick={handleSuperPrev}
          title="Previous Year"
        >
          «
        </button>

        {panelMode === "date" && (
          <button
            type="button"
            className="ch-picker-nav-btn ch-picker-header-prev-btn"
            onClick={handlePrev}
            title="Previous Month"
          >
            ‹
          </button>
        )}

        <div className="ch-picker-header-view">
          {panelMode === "date" && (
            <>
              <button
                type="button"
                onClick={() => setPanelMode("year")}
              >
                {viewDate.format("YYYY")}
              </button>
              <button
                type="button"
                onClick={() => setPanelMode("month")}
              >
                {viewDate.format("MMM")}
              </button>
            </>
          )}
          {panelMode === "month" && (
            <button
              type="button"
              onClick={() => setPanelMode("year")}
            >
              {viewDate.format("YYYY")}
            </button>
          )}
          {panelMode === "year" && (
            <button
              type="button"
              onClick={() => setPanelMode("year")}
            >
              {startDecadeYear}-{endDecadeYear}
            </button>
          )}
          {panelMode === "quarter" && (
            <button
              type="button"
              onClick={() => setPanelMode("year")}
            >
              {viewDate.format("YYYY")}
            </button>
          )}
        </div>

        {panelMode === "date" && (
          <button
            type="button"
            className="ch-picker-nav-btn ch-picker-header-next-btn"
            onClick={handleNext}
            title="Next Month"
          >
            ›
          </button>
        )}

        <button
          type="button"
          className="ch-picker-nav-btn ch-picker-header-super-next-btn"
          onClick={handleSuperNext}
          title="Next Year"
        >
          »
        </button>
      </div>

      {/* Main Panel Body */}
      <div style={{ display: "flex" }}>
        <div className="ch-picker-body">
          {/* Date View */}
          {panelMode === "date" && (
            <table className="ch-picker-content">
              <thead>
                <tr>
                  {weekDays.map((wd) => (
                    <th key={wd}>{wd}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, rowIdx) => (
                  <tr key={`row-${rowIdx}`}>
                    {daysMatrix
                      .slice(rowIdx * 7, rowIdx * 7 + 7)
                      .map((item, colIdx) => {
                        const cellClasses = [
                          "ch-picker-cell",
                          item.isCurrentMonth && "ch-picker-cell-in-view",
                          item.isToday && "ch-picker-cell-today",
                          item.isSelected && "ch-picker-cell-selected",
                          item.isInRange && "ch-picker-cell-in-range",
                          item.isRangeStart && "ch-picker-cell-range-start",
                          item.isRangeEnd && "ch-picker-cell-range-end",
                          item.isDisabled && "ch-picker-cell-disabled",
                        ]
                          .filter(Boolean)
                          .join(" ");

                        const originNode = (
                          <span className="ch-picker-cell-inner">
                            {item.date.date()}
                          </span>
                        );

                        const renderedCell = cellRender
                          ? cellRender(item.date, {
                              originNode,
                              today: dayjs(),
                              type: "date",
                            })
                          : originNode;

                        return (
                          <td
                            key={`cell-${rowIdx}-${colIdx}`}
                            className={cellClasses}
                            onClick={() =>
                              handleDateClick(item.date, item.isDisabled)
                            }
                            onMouseEnter={() =>
                              onHoverDate?.(item.date)
                            }
                            onMouseLeave={() =>
                              onHoverDate?.(null)
                            }
                          >
                            {renderedCell}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Month View */}
          {panelMode === "month" && (
            <table className="ch-picker-grid-3col">
              <tbody>
                {Array.from({ length: 4 }).map((_, r) => (
                  <tr key={`mr-${r}`}>
                    {monthsList.slice(r * 3, r * 3 + 3).map((m) => (
                      <td
                        key={m.name}
                        className={`ch-picker-grid-cell ${
                          m.isSelected ? "ch-picker-grid-cell-selected" : ""
                        } ${m.isDisabled ? "ch-picker-grid-cell-disabled" : ""}`}
                        onClick={() => handleMonthClick(m.date, m.isDisabled)}
                      >
                        <span className="ch-picker-grid-cell-inner">
                          {m.name}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Year View */}
          {panelMode === "year" && (
            <table className="ch-picker-grid-3col">
              <tbody>
                {Array.from({ length: 4 }).map((_, r) => (
                  <tr key={`yr-${r}`}>
                    {years.slice(r * 3, r * 3 + 3).map((y) => (
                      <td
                        key={y.year}
                        className={`ch-picker-grid-cell ${
                          y.isSelected ? "ch-picker-grid-cell-selected" : ""
                        } ${y.isDisabled ? "ch-picker-grid-cell-disabled" : ""}`}
                        onClick={() => handleYearClick(y.date, y.isDisabled)}
                      >
                        <span className="ch-picker-grid-cell-inner">
                          {y.year}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Quarter View */}
          {panelMode === "quarter" && (
            <table className="ch-picker-grid-3col">
              <tbody>
                <tr>
                  {[1, 2].map((q) => (
                    <td
                      key={`q-${q}`}
                      className="ch-picker-grid-cell"
                      onClick={() => handleQuarterClick(q)}
                    >
                      <span className="ch-picker-grid-cell-inner">Q{q}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  {[3, 4].map((q) => (
                    <td
                      key={`q-${q}`}
                      className="ch-picker-grid-cell"
                      onClick={() => handleQuarterClick(q)}
                    >
                      <span className="ch-picker-grid-cell-inner">Q{q}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Time Panel */}
        {showTime && panelMode === "date" && (
          <TimePanel
            value={singleSelected}
            onSelect={(t) => onSelect(t)}
          />
        )}
      </div>

      {/* Extra Footer if provided */}
      {extraFooter && (
        <div className="ch-picker-footer-extra">{extraFooter}</div>
      )}

      {/* Footer operations (Today / Now & OK) */}
      {(showNow || showTime || onOk) && (
        <div className="ch-picker-footer">
          {showNow ? (
            <button
              type="button"
              className="ch-picker-today-btn"
              onClick={() => {
                const now = dayjs();
                onSelect(now);
              }}
            >
              {showTime ? "Now" : "Today"}
            </button>
          ) : (
            <span />
          )}

          {onOk && (
            <button
              type="button"
              className="ch-picker-ok-btn"
              onClick={onOk}
            >
              OK
            </button>
          )}
        </div>
      )}
    </div>
  );
};
