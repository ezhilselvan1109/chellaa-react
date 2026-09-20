import React, { useEffect, useRef } from "react";
import type { Dayjs } from "dayjs";
import { dayjs } from "./dateUtil";

export interface TimePanelProps {
  value?: Dayjs | null;
  onSelect: (time: Dayjs) => void;
}

export const TimePanel: React.FC<TimePanelProps> = ({ value, onSelect }) => {
  const currentTime = value || dayjs();
  const currentHour = currentTime.hour();
  const currentMinute = currentTime.minute();
  const currentSecond = currentTime.second();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  const hourListRef = useRef<HTMLUListElement>(null);
  const minuteListRef = useRef<HTMLUListElement>(null);
  const secondListRef = useRef<HTMLUListElement>(null);

  // Scroll active item into view
  useEffect(() => {
    if (hourListRef.current) {
      hourListRef.current.scrollTop = currentHour * 28;
    }
    if (minuteListRef.current) {
      minuteListRef.current.scrollTop = currentMinute * 28;
    }
    if (secondListRef.current) {
      secondListRef.current.scrollTop = currentSecond * 28;
    }
  }, [currentHour, currentMinute, currentSecond]);

  const handleHourSelect = (h: number) => {
    onSelect(currentTime.hour(h));
  };

  const handleMinuteSelect = (m: number) => {
    onSelect(currentTime.minute(m));
  };

  const handleSecondSelect = (s: number) => {
    onSelect(currentTime.second(s));
  };

  return (
    <div className="ch-picker-time-panel">
      {/* Hours */}
      <ul ref={hourListRef} className="ch-picker-time-column">
        {hours.map((h) => {
          const isSelected = h === currentHour;
          return (
            <li
              key={`h-${h}`}
              className={`ch-picker-time-cell ${
                isSelected ? "ch-picker-time-cell-selected" : ""
              }`}
              onClick={() => handleHourSelect(h)}
            >
              {String(h).padStart(2, "0")}
            </li>
          );
        })}
      </ul>

      {/* Minutes */}
      <ul ref={minuteListRef} className="ch-picker-time-column">
        {minutes.map((m) => {
          const isSelected = m === currentMinute;
          return (
            <li
              key={`m-${m}`}
              className={`ch-picker-time-cell ${
                isSelected ? "ch-picker-time-cell-selected" : ""
              }`}
              onClick={() => handleMinuteSelect(m)}
            >
              {String(m).padStart(2, "0")}
            </li>
          );
        })}
      </ul>

      {/* Seconds */}
      <ul ref={secondListRef} className="ch-picker-time-column">
        {seconds.map((s) => {
          const isSelected = s === currentSecond;
          return (
            <li
              key={`s-${s}`}
              className={`ch-picker-time-cell ${
                isSelected ? "ch-picker-time-cell-selected" : ""
              }`}
              onClick={() => handleSecondSelect(s)}
            >
              {String(s).padStart(2, "0")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
