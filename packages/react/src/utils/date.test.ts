import { describe, expect, it } from "vitest";
import {
  isLeapYear,
  getDaysInMonth,
  createLocalDate,
  isSameDay,
  isSameMonth,
  isDateBefore,
  isDateAfter,
  isDateInRange,
  addDays,
  addMonths,
  addYears,
  getCalendarGrid,
  getWeekdayLabels,
  getMonthLabel,
  formatLocalDate,
  parseLocalDate,
} from "./date";

describe("Pure Date Utilities", () => {
  describe("isLeapYear", () => {
    it("identifies leap years divisible by 4 but not 100", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2028)).toBe(true);
    });

    it("identifies non-leap years", () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2025)).toBe(false);
      expect(isLeapYear(2026)).toBe(false);
    });

    it("handles century years (divisible by 100 vs 400)", () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2400)).toBe(true);
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });
  });

  describe("getDaysInMonth", () => {
    it("returns 29 for February in a leap year", () => {
      expect(getDaysInMonth(2024, 1)).toBe(29);
      expect(getDaysInMonth(2000, 1)).toBe(29);
    });

    it("returns 28 for February in a non-leap year", () => {
      expect(getDaysInMonth(2023, 1)).toBe(28);
      expect(getDaysInMonth(2025, 1)).toBe(28);
      expect(getDaysInMonth(1900, 1)).toBe(28);
    });

    it("returns correct days for 30-day and 31-day months", () => {
      expect(getDaysInMonth(2024, 0)).toBe(31); // Jan
      expect(getDaysInMonth(2024, 2)).toBe(31); // Mar
      expect(getDaysInMonth(2024, 3)).toBe(30); // Apr
      expect(getDaysInMonth(2024, 4)).toBe(31); // May
      expect(getDaysInMonth(2024, 5)).toBe(30); // Jun
      expect(getDaysInMonth(2024, 6)).toBe(31); // Jul
      expect(getDaysInMonth(2024, 7)).toBe(31); // Aug
      expect(getDaysInMonth(2024, 8)).toBe(30); // Sep
      expect(getDaysInMonth(2024, 9)).toBe(31); // Oct
      expect(getDaysInMonth(2024, 10)).toBe(30); // Nov
      expect(getDaysInMonth(2024, 11)).toBe(31); // Dec
    });
  });

  describe("createLocalDate & isSameDay / isSameMonth", () => {
    it("creates local date without timezone offset issues", () => {
      const d = createLocalDate(2026, 9, 28);
      expect(d.getFullYear()).toBe(2026);
      expect(d.getMonth()).toBe(9);
      expect(d.getDate()).toBe(28);
    });

    it("evaluates isSameDay correctly regardless of time of day", () => {
      const d1 = new Date(2026, 9, 28, 9, 30);
      const d2 = new Date(2026, 9, 28, 23, 59);
      const d3 = new Date(2026, 9, 29, 0, 0);

      expect(isSameDay(d1, d2)).toBe(true);
      expect(isSameDay(d1, d3)).toBe(false);
      expect(isSameDay(null, d1)).toBe(false);
      expect(isSameDay(undefined, undefined)).toBe(false);
    });

    it("evaluates isSameMonth correctly", () => {
      const d1 = new Date(2026, 9, 5);
      const d2 = new Date(2026, 9, 28);
      const d3 = new Date(2026, 10, 5);

      expect(isSameMonth(d1, d2)).toBe(true);
      expect(isSameMonth(d1, d3)).toBe(false);
    });
  });

  describe("Comparison and Range Checks", () => {
    const oct1 = new Date(2026, 9, 1);
    const oct15 = new Date(2026, 9, 15);
    const oct31 = new Date(2026, 9, 31);

    it("isDateBefore and isDateAfter work on calendar days", () => {
      expect(isDateBefore(oct1, oct15)).toBe(true);
      expect(isDateBefore(oct15, oct1)).toBe(false);
      expect(isDateAfter(oct31, oct15)).toBe(true);
      expect(isDateAfter(oct1, oct15)).toBe(false);
    });

    it("isDateInRange works with inclusive boundaries", () => {
      expect(isDateInRange(oct15, oct1, oct31)).toBe(true);
      expect(isDateInRange(oct1, oct1, oct31)).toBe(true);
      expect(isDateInRange(oct31, oct1, oct31)).toBe(true);

      const nov1 = new Date(2026, 10, 1);
      const sep30 = new Date(2026, 8, 30);
      expect(isDateInRange(nov1, oct1, oct31)).toBe(false);
      expect(isDateInRange(sep30, oct1, oct31)).toBe(false);

      // Undefined boundaries
      expect(isDateInRange(oct15, null, oct31)).toBe(true);
      expect(isDateInRange(oct15, oct1, null)).toBe(true);
      expect(isDateInRange(oct15, null, null)).toBe(true);
    });
  });

  describe("Arithmetic: addDays, addMonths, addYears", () => {
    it("adds and subtracts days across month and year boundaries", () => {
      const d = new Date(2026, 11, 31); // Dec 31, 2026
      const nextDay = addDays(d, 1);
      expect(nextDay.getFullYear()).toBe(2027);
      expect(nextDay.getMonth()).toBe(0);
      expect(nextDay.getDate()).toBe(1);

      const prevDay = addDays(nextDay, -1);
      expect(prevDay.getFullYear()).toBe(2026);
      expect(prevDay.getMonth()).toBe(11);
      expect(prevDay.getDate()).toBe(31);
    });

    it("adds months clamping to max days in target month", () => {
      const jan31 = new Date(2024, 0, 31); // Jan 31, 2024 (leap year)
      const feb = addMonths(jan31, 1);
      expect(feb.getFullYear()).toBe(2024);
      expect(feb.getMonth()).toBe(1);
      expect(feb.getDate()).toBe(29); // Clamped to Feb 29

      const jan31_2025 = new Date(2025, 0, 31); // Non-leap year
      const feb_2025 = addMonths(jan31_2025, 1);
      expect(feb_2025.getFullYear()).toBe(2025);
      expect(feb_2025.getMonth()).toBe(1);
      expect(feb_2025.getDate()).toBe(28); // Clamped to Feb 28
    });

    it("adds years clamping Feb 29 in leap years", () => {
      const leapDay = new Date(2024, 1, 29); // Feb 29, 2024
      const nextYear = addYears(leapDay, 1);
      expect(nextYear.getFullYear()).toBe(2025);
      expect(nextYear.getMonth()).toBe(1);
      expect(nextYear.getDate()).toBe(28); // Clamped to Feb 28

      const fourYearsLater = addYears(leapDay, 4);
      expect(fourYearsLater.getFullYear()).toBe(2028);
      expect(fourYearsLater.getMonth()).toBe(1);
      expect(fourYearsLater.getDate()).toBe(29); // Preserved Feb 29
    });
  });

  describe("Calendar Grid Generation", () => {
    it("always generates exactly 42 cells (6 rows × 7 days)", () => {
      const grid = getCalendarGrid(2026, 9, 0); // Oct 2026, Sunday start
      expect(grid).toHaveLength(42);
    });

    it("properly positions leading days for Oct 2026 (starts on Thursday)", () => {
      // Oct 1, 2026 is Thursday.
      // With Sunday (0) start, leading days: Sun, Mon, Tue, Wed (4 days from Sept: 27, 28, 29, 30)
      const grid = getCalendarGrid(2026, 9, 0);
      expect(grid[0].dayNumber).toBe(27);
      expect(grid[0].isCurrentMonth).toBe(false);
      expect(grid[0].isPrevMonth).toBe(true);

      expect(grid[3].dayNumber).toBe(30);
      expect(grid[3].isCurrentMonth).toBe(false);

      expect(grid[4].dayNumber).toBe(1);
      expect(grid[4].isCurrentMonth).toBe(true);

      expect(grid[34].dayNumber).toBe(31);
      expect(grid[34].isCurrentMonth).toBe(true);

      // Trailing days from November
      expect(grid[35].dayNumber).toBe(1);
      expect(grid[35].isCurrentMonth).toBe(false);
      expect(grid[35].isNextMonth).toBe(true);
    });

    it("respects firstDayOfWeek variations (Monday start = 1)", () => {
      // Oct 1, 2026 is Thursday.
      // With Monday (1) start, leading days: Mon, Tue, Wed (3 days from Sept: 28, 29, 30)
      const grid = getCalendarGrid(2026, 9, 1);
      expect(grid).toHaveLength(42);
      expect(grid[0].dayNumber).toBe(28);
      expect(grid[0].isPrevMonth).toBe(true);
      expect(grid[2].dayNumber).toBe(30);
      expect(grid[3].dayNumber).toBe(1);
      expect(grid[3].isCurrentMonth).toBe(true);
    });

    it("respects firstDayOfWeek variations (Saturday start = 6)", () => {
      // Oct 1, 2026 is Thursday.
      // With Saturday (6) start, leading days: Sat, Sun, Mon, Tue, Wed (5 days: 26, 27, 28, 29, 30)
      const grid = getCalendarGrid(2026, 9, 6);
      expect(grid).toHaveLength(42);
      expect(grid[0].dayNumber).toBe(26);
      expect(grid[4].dayNumber).toBe(30);
      expect(grid[5].dayNumber).toBe(1);
    });
  });

  describe("Formatting and Parsing", () => {
    it("formats local date without UTC shifts", () => {
      const d = new Date(2026, 9, 28);
      expect(formatLocalDate(d, "YYYY-MM-DD")).toBe("2026-10-28");
      expect(formatLocalDate(d, "MM/DD/YYYY")).toBe("10/28/2026");
      expect(formatLocalDate(d, "DD/MM/YYYY")).toBe("28/10/2026");
    });

    it("returns empty string for null or invalid dates", () => {
      expect(formatLocalDate(null)).toBe("");
      expect(formatLocalDate(undefined)).toBe("");
      expect(formatLocalDate(new Date("invalid"))).toBe("");
    });

    it("parses valid ISO YYYY-MM-DD strings", () => {
      const parsed = parseLocalDate("2026-10-28");
      expect(parsed).not.toBeNull();
      expect(parsed?.getFullYear()).toBe(2026);
      expect(parsed?.getMonth()).toBe(9);
      expect(parsed?.getDate()).toBe(28);
    });

    it("parses valid slash strings MM/DD/YYYY", () => {
      const parsed = parseLocalDate("10/28/2026");
      expect(parsed).not.toBeNull();
      expect(parsed?.getFullYear()).toBe(2026);
      expect(parsed?.getMonth()).toBe(9);
      expect(parsed?.getDate()).toBe(28);
    });

    it("returns null for invalid or non-existent dates", () => {
      expect(parseLocalDate("2025-02-29")).toBeNull(); // Non-leap year Feb 29
      expect(parseLocalDate("2026-04-31")).toBeNull(); // April only has 30 days
      expect(parseLocalDate("invalid-date")).toBeNull();
      expect(parseLocalDate("")).toBeNull();
      expect(parseLocalDate(null)).toBeNull();
    });

    it("parses Feb 29 in leap years", () => {
      const leapDay = parseLocalDate("2024-02-29");
      expect(leapDay).not.toBeNull();
      expect(leapDay?.getFullYear()).toBe(2024);
      expect(leapDay?.getMonth()).toBe(1);
      expect(leapDay?.getDate()).toBe(29);
    });
  });

  describe("Labels and Localization", () => {
    it("generates 7 localized weekday labels", () => {
      const labels = getWeekdayLabels("en-US", 0);
      expect(labels).toHaveLength(7);
      expect(labels[0].short).toBe("Sun");
      expect(labels[1].short).toBe("Mon");
      expect(labels[6].short).toBe("Sat");
    });

    it("generates localized month label", () => {
      expect(getMonthLabel(2026, 9, "en-US")).toBe("October");
      expect(getMonthLabel(2026, 0, "en-US")).toBe("January");
    });
  });
});
