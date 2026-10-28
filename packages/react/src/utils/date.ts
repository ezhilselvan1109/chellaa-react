/**
 * Chellaa React — Pure Date Utilities
 * Zero-dependency, timezone-safe date manipulation strictly operating on local calendar dates.
 */

export interface CalendarGridDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
}

/**
 * Determines whether a given year is a leap year according to Gregorian calendar rules.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the number of days in the specified month (0-indexed: 0 = January, 11 = December).
 */
export function getDaysInMonth(year: number, monthIndex: number): number {
  const normalizedMonth = ((monthIndex % 12) + 12) % 12;
  const daysMap = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysMap[normalizedMonth] ?? 31;
}

/**
 * Creates a Date instance representing the given year, 0-indexed month, and day in local time.
 */
export function createLocalDate(year: number, monthIndex: number, day: number): Date {
  return new Date(year, monthIndex, day, 0, 0, 0, 0);
}

/**
 * Compares two dates by calendar day (ignoring time components).
 */
export function isSameDay(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Compares whether two dates fall in the same calendar month and year.
 */
export function isSameMonth(a?: Date | null, b?: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/**
 * Returns true if calendar day `a` is strictly before calendar day `b`.
 */
export function isDateBefore(a: Date, b: Date): boolean {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return da < db;
}

/**
 * Returns true if calendar day `a` is strictly after calendar day `b`.
 */
export function isDateAfter(a: Date, b: Date): boolean {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return da > db;
}

/**
 * Checks whether a date falls within inclusive min and max bounds.
 */
export function isDateInRange(
  date: Date,
  minDate?: Date | null,
  maxDate?: Date | null,
): boolean {
  if (minDate && isDateBefore(date, minDate)) return false;
  if (maxDate && isDateAfter(date, maxDate)) return false;
  return true;
}

/**
 * Adds or subtracts days from a given date safely.
 */
export function addDays(date: Date, amount: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
  return result;
}

/**
 * Adds or subtracts months from a given date, clamping the day to the last valid day of target month.
 */
export function addMonths(date: Date, amount: number): Date {
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth() + amount;
  const originalDay = date.getDate();

  const temp = new Date(targetYear, targetMonth, 1);
  const maxDays = getDaysInMonth(temp.getFullYear(), temp.getMonth());
  const clampedDay = Math.min(originalDay, maxDays);

  return new Date(temp.getFullYear(), temp.getMonth(), clampedDay);
}

/**
 * Adds or subtracts years from a given date, handling Feb 29 leap years properly.
 */
export function addYears(date: Date, amount: number): Date {
  return addMonths(date, amount * 12);
}

/**
 * Generates an authoritative 6-row × 7-day (42 cells) calendar matrix for stable UI layout.
 */
export function getCalendarGrid(
  year: number,
  monthIndex: number,
  firstDayOfWeek: 0 | 1 | 6 = 0,
): CalendarGridDay[] {
  const daysInCurrentMonth = getDaysInMonth(year, monthIndex);
  const firstOfMonth = new Date(year, monthIndex, 1);
  const startDayOfWeek = firstOfMonth.getDay(); // 0 (Sun) .. 6 (Sat)

  // Calculate leading offset from previous month
  const offset = (startDayOfWeek - firstDayOfWeek + 7) % 7;

  const prevMonthDate = new Date(year, monthIndex - 1, 1);
  const prevMonthYear = prevMonthDate.getFullYear();
  const prevMonthIndex = prevMonthDate.getMonth();
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonthIndex);

  const today = new Date();
  const cells: CalendarGridDay[] = [];

  // 1. Leading days from previous month
  for (let i = offset - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(prevMonthYear, prevMonthIndex, day);
    cells.push({
      date,
      dayNumber: day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isPrevMonth: true,
      isNextMonth: false,
    });
  }

  // 2. Days in current month
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(year, monthIndex, day);
    cells.push({
      date,
      dayNumber: day,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
      isPrevMonth: false,
      isNextMonth: false,
    });
  }

  // 3. Trailing days from next month to fill complete 42 cells (6 full weeks)
  const nextMonthDate = new Date(year, monthIndex + 1, 1);
  const nextMonthYear = nextMonthDate.getFullYear();
  const nextMonthIndex = nextMonthDate.getMonth();
  const remainingCells = 42 - cells.length;

  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(nextMonthYear, nextMonthIndex, day);
    cells.push({
      date,
      dayNumber: day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isPrevMonth: false,
      isNextMonth: true,
    });
  }

  return cells;
}

/**
 * Returns localized weekday abbreviations and full names ordered by `firstDayOfWeek`.
 */
export function getWeekdayLabels(
  locale = "en-US",
  firstDayOfWeek: 0 | 1 | 6 = 0,
): { key: number; narrow: string; short: string; long: string }[] {
  // 2026-01-04 was a Sunday
  const baseSunday = new Date(2026, 0, 4);
  const labels: { key: number; narrow: string; short: string; long: string }[] = [];

  const narrowFormatter = new Intl.DateTimeFormat(locale, { weekday: "narrow" });
  const shortFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const longFormatter = new Intl.DateTimeFormat(locale, { weekday: "long" });

  for (let i = 0; i < 7; i++) {
    const dayIndex = (firstDayOfWeek + i) % 7;
    const date = addDays(baseSunday, dayIndex);
    labels.push({
      key: dayIndex,
      narrow: narrowFormatter.format(date),
      short: shortFormatter.format(date),
      long: longFormatter.format(date),
    });
  }

  return labels;
}

/**
 * Returns localized month name.
 */
export function getMonthLabel(
  year: number,
  monthIndex: number,
  locale = "en-US",
  style: "long" | "short" = "long",
): string {
  const date = new Date(year, monthIndex, 1);
  return new Intl.DateTimeFormat(locale, { month: style }).format(date);
}

/**
 * Formats a local date without UTC shifts.
 */
export function formatLocalDate(
  date?: Date | null,
  format = "YYYY-MM-DD",
  locale = "en-US",
): string {
  if (!date || isNaN(date.getTime())) return "";

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  if (format === "YYYY-MM-DD") {
    return `${y}-${m}-${d}`;
  }
  if (format === "MM/DD/YYYY") {
    return `${m}/${d}/${y}`;
  }
  if (format === "DD/MM/YYYY") {
    return `${d}/${m}/${y}`;
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * Parses user input strings into a valid local Date or returns null.
 */
export function parseLocalDate(str?: string | null): Date | null {
  if (!str || typeof str !== "string") return null;
  const trimmed = str.trim();
  if (!trimmed) return null;

  // Pattern 1: YYYY-MM-DD
  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);
  if (isoMatch && isoMatch[1] && isoMatch[2] && isoMatch[3]) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    if (month >= 0 && month <= 11 && day >= 1 && day <= getDaysInMonth(year, month)) {
      return new Date(year, month, day);
    }
    return null;
  }

  // Pattern 2: MM/DD/YYYY
  const slashMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (slashMatch && slashMatch[1] && slashMatch[2] && slashMatch[3]) {
    const p1 = parseInt(slashMatch[1], 10);
    const p2 = parseInt(slashMatch[2], 10);
    const year = parseInt(slashMatch[3], 10);
    const month = p1 - 1;
    const day = p2;
    if (month >= 0 && month <= 11 && day >= 1 && day <= getDaysInMonth(year, month)) {
      return new Date(year, month, day);
    }
    return null;
  }

  // Pattern 3: YYYY/MM/DD
  const slashIsoMatch = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(trimmed);
  if (slashIsoMatch && slashIsoMatch[1] && slashIsoMatch[2] && slashIsoMatch[3]) {
    const year = parseInt(slashIsoMatch[1], 10);
    const month = parseInt(slashIsoMatch[2], 10) - 1;
    const day = parseInt(slashIsoMatch[3], 10);
    if (month >= 0 && month <= 11 && day >= 1 && day <= getDaysInMonth(year, month)) {
      return new Date(year, month, day);
    }
    return null;
  }

  return null;
}
