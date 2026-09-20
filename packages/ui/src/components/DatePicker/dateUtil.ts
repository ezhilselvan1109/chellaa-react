import dayjs, { type Dayjs } from "dayjs";
import type {
  DateType,
  PickerType,
  DisabledDateFn,
  ShowTimeConfig,
} from "./DatePicker.types";

export { dayjs };

/** Converts any DateType into a valid Dayjs instance or null */
export function toDayjs(val?: DateType | null): Dayjs | null {
  if (!val) return null;
  if (dayjs.isDayjs(val)) return val.isValid() ? val : null;
  const parsed = dayjs(val);
  return parsed.isValid() ? parsed : null;
}

/** Formats a Dayjs object based on format string or picker type */
export function formatDate(
  date: Dayjs | null | undefined,
  picker: PickerType = "date",
  customFormat?: string | string[],
  showTime?: boolean | ShowTimeConfig
): string {
  if (!date || !date.isValid()) return "";

  if (customFormat) {
    const fmt = Array.isArray(customFormat) ? customFormat[0] : customFormat;
    if (fmt) return date.format(fmt);
  }

  if (showTime) {
    const timeFmt =
      typeof showTime === "object" && showTime.format
        ? showTime.format
        : "HH:mm:ss";
    return date.format(`YYYY-MM-DD ${timeFmt}`);
  }

  switch (picker) {
    case "month":
      return date.format("YYYY-MM");
    case "year":
      return date.format("YYYY");
    case "quarter": {
      const q = Math.floor(date.month() / 3) + 1;
      return `${date.format("YYYY")}-Q${q}`;
    }
    case "week": {
      // Week formatting approximation
      const startOfYear = date.startOf("year");
      const diffDays = date.diff(startOfYear, "day");
      const weekNum = Math.ceil((diffDays + startOfYear.day() + 1) / 7);
      return `${date.format("YYYY")}-${weekNum}周`;
    }
    case "date":
    default:
      return date.format("YYYY-MM-DD");
  }
}

export interface CalendarDayItem {
  date: Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
}

/** Generates 42 days (6 weeks) for a month calendar view */
export function generateMonthMatrix(
  viewDate: Dayjs,
  selectedDate?: Dayjs | Dayjs[] | null,
  rangeSelected?: [Dayjs | null, Dayjs | null] | null,
  hoverDate?: Dayjs | null,
  minDate?: Dayjs | null,
  maxDate?: Dayjs | null,
  disabledDate?: DisabledDateFn,
  picker: PickerType = "date"
): CalendarDayItem[] {
  const startOfMonth = viewDate.startOf("month");
  const firstDayOfWeek = startOfMonth.day(); // 0 is Sunday
  const today = dayjs();

  // 42 cells starting from Sunday before/on 1st
  const startDate = startOfMonth.subtract(firstDayOfWeek, "day");

  const matrix: CalendarDayItem[] = [];

  for (let i = 0; i < 42; i++) {
    const d = startDate.add(i, "day");
    const isCurrentMonth = d.month() === viewDate.month();
    const isToday = d.isSame(today, "day");

    // Check single or multiple selection
    let isSelected = false;
    if (Array.isArray(selectedDate)) {
      isSelected = selectedDate.some((s) => s && d.isSame(s, "day"));
    } else if (selectedDate) {
      isSelected = d.isSame(selectedDate, "day");
    }

    // Check range selection
    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;

    if (rangeSelected) {
      const [start, end] = rangeSelected;
      if (start && d.isSame(start, "day")) isRangeStart = true;
      if (end && d.isSame(end, "day")) isRangeEnd = true;

      const effectiveEnd = end || hoverDate;
      if (start && effectiveEnd) {
        const [earlier, later] = start.isBefore(effectiveEnd)
          ? [start, effectiveEnd]
          : [effectiveEnd, start];
        if (d.isAfter(earlier, "day") && d.isBefore(later, "day")) {
          isInRange = true;
        }
      }
    }

    // Check disabled
    let isDisabled = false;
    if (minDate && d.isBefore(minDate, "day")) isDisabled = true;
    if (maxDate && d.isAfter(maxDate, "day")) isDisabled = true;
    if (disabledDate && disabledDate(d, { type: picker })) isDisabled = true;

    matrix.push({
      date: d,
      isCurrentMonth,
      isToday,
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isDisabled,
    });
  }

  return matrix;
}

/** Generates 12 months for year view */
export function generateMonthList(
  viewDate: Dayjs,
  selectedDate?: Dayjs | null,
  minDate?: Dayjs | null,
  maxDate?: Dayjs | null,
  disabledDate?: DisabledDateFn
) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((name, index) => {
    const d = viewDate.month(index);
    const isSelected = selectedDate ? selectedDate.isSame(d, "month") : false;
    const isCurrent = dayjs().isSame(d, "month");

    let isDisabled = false;
    if (minDate && d.endOf("month").isBefore(minDate, "day")) isDisabled = true;
    if (maxDate && d.startOf("month").isAfter(maxDate, "day")) isDisabled = true;
    if (disabledDate && disabledDate(d, { type: "month" })) isDisabled = true;

    return {
      index,
      name,
      date: d,
      isSelected,
      isCurrent,
      isDisabled,
    };
  });
}

/** Generates decade years (12 years: 10 in decade + 1 before + 1 after) */
export function generateDecadeYears(
  viewDate: Dayjs,
  selectedDate?: Dayjs | null,
  minDate?: Dayjs | null,
  maxDate?: Dayjs | null,
  disabledDate?: DisabledDateFn
) {
  const currentYear = viewDate.year();
  const startDecadeYear = Math.floor(currentYear / 10) * 10;
  const years: {
    year: number;
    date: Dayjs;
    isSelected: boolean;
    isCurrent: boolean;
    isCurrentDecade: boolean;
    isDisabled: boolean;
  }[] = [];

  for (let i = -1; i <= 10; i++) {
    const y = startDecadeYear + i;
    const d = viewDate.year(y);
    const isCurrentDecade = i >= 0 && i < 10;
    const isSelected = selectedDate ? selectedDate.year() === y : false;
    const isCurrent = dayjs().year() === y;

    let isDisabled = false;
    if (minDate && d.endOf("year").isBefore(minDate, "day")) isDisabled = true;
    if (maxDate && d.startOf("year").isAfter(maxDate, "day")) isDisabled = true;
    if (disabledDate && disabledDate(d, { type: "year" })) isDisabled = true;

    years.push({
      year: y,
      date: d,
      isSelected,
      isCurrent,
      isCurrentDecade,
      isDisabled,
    });
  }

  return {
    startDecadeYear,
    endDecadeYear: startDecadeYear + 9,
    years,
  };
}
