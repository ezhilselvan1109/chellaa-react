import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Calendar } from "./Calendar";

describe("Calendar Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & Leap Year / Boundary Behavior
  // ---------------------------------------------------------------------------
  describe("Date Rendering & Month Boundaries", () => {
    it("renders February in a leap year with 29 days (e.g. Feb 2024)", () => {
      render(<Calendar defaultFocusedDate={new Date(2024, 1, 1)} />);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("February 2024");

      // Verify day 29 exists and is in current month
      const days29 = screen.getAllByRole("button", { name: /February 29/i });
      expect(days29).toHaveLength(1);
      expect(days29[0]).not.toHaveClass("cl-calendar__day--outside");
    });

    it("renders February in a non-leap year with 28 days (e.g. Feb 2025)", () => {
      render(<Calendar defaultFocusedDate={new Date(2025, 1, 1)} />);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("February 2025");

      // In non-leap year, Feb has 28 days. Any "29" button must be outside current month (from March)
      const days = screen.getAllByRole("button", { name: /29/i });
      days.forEach((btn) => {
        expect(btn).toHaveClass("cl-calendar__day--outside");
      });
    });

    it("navigates forward from December to January of next year", async () => {
      const user = userEvent.setup();
      render(<Calendar defaultFocusedDate={new Date(2026, 11, 15)} />);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("December 2026");

      const nextBtn = screen.getByRole("button", { name: "Next month" });
      await user.click(nextBtn);

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("January 2027");
    });

    it("navigates backward from January to December of previous year", async () => {
      const user = userEvent.setup();
      render(<Calendar defaultFocusedDate={new Date(2026, 0, 15)} />);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("January 2026");

      const prevBtn = screen.getByRole("button", { name: "Previous month" });
      await user.click(prevBtn);

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("December 2025");
    });

    it("supports firstDayOfWeek variations (Monday start = 1, Saturday start = 6)", () => {
      const { rerender } = render(
        <Calendar defaultFocusedDate={new Date(2026, 9, 1)} firstDayOfWeek={1} />,
      );
      const headers = screen.getAllByRole("columnheader");
      expect(headers[0]).toHaveTextContent("Mon");
      expect(headers[6]).toHaveTextContent("Sun");

      rerender(<Calendar defaultFocusedDate={new Date(2026, 9, 1)} firstDayOfWeek={6} />);
      const satHeaders = screen.getAllByRole("columnheader");
      expect(satHeaders[0]).toHaveTextContent("Sat");
      expect(satHeaders[6]).toHaveTextContent("Fri");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Selection & Constraints
  // ---------------------------------------------------------------------------
  describe("Selection & Constraints", () => {
    it("handles uncontrolled date selection and triggers onValueChange", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Calendar
          defaultFocusedDate={new Date(2026, 9, 1)}
          onValueChange={onValueChange}
        />,
      );

      const targetDay = screen.getByRole("button", { name: /October 15, 2026/i });
      await user.click(targetDay);

      expect(onValueChange).toHaveBeenCalledTimes(1);
      const selected = onValueChange.mock.calls[0][0] as Date;
      expect(selected.getFullYear()).toBe(2026);
      expect(selected.getMonth()).toBe(9);
      expect(selected.getDate()).toBe(15);
      expect(targetDay).toHaveClass("cl-calendar__day--selected");
    });

    it("handles controlled value updates properly", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      const { rerender } = render(
        <Calendar
          value={new Date(2026, 9, 10)}
          onValueChange={onValueChange}
        />,
      );

      const day10 = screen.getByRole("button", { name: /October 10, 2026/i });
      expect(day10).toHaveClass("cl-calendar__day--selected");

      const day20 = screen.getByRole("button", { name: /October 20, 2026/i });
      await user.click(day20);
      expect(onValueChange).toHaveBeenCalledTimes(1);

      // In controlled mode, selection updates when prop changes
      rerender(<Calendar value={new Date(2026, 9, 20)} onValueChange={onValueChange} />);
      expect(screen.getByRole("button", { name: /October 20, 2026/i })).toHaveClass(
        "cl-calendar__day--selected",
      );
      expect(screen.getByRole("button", { name: /October 10, 2026/i })).not.toHaveClass(
        "cl-calendar__day--selected",
      );
    });

    it("disables dates outside minDate and maxDate constraints", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Calendar
          defaultFocusedDate={new Date(2026, 9, 1)}
          minDate={new Date(2026, 9, 10)}
          maxDate={new Date(2026, 9, 20)}
          onValueChange={onValueChange}
        />,
      );

      const day5 = screen.getByRole("button", { name: /October 5, 2026/i });
      expect(day5).toBeDisabled();
      expect(day5).toHaveClass("cl-calendar__day--disabled");
      await user.click(day5);
      expect(onValueChange).not.toHaveBeenCalled();

      const day15 = screen.getByRole("button", { name: /October 15, 2026/i });
      expect(day15).not.toBeDisabled();
      await user.click(day15);
      expect(onValueChange).toHaveBeenCalledTimes(1);

      const day25 = screen.getByRole("button", { name: /October 25, 2026/i });
      expect(day25).toBeDisabled();
      await user.click(day25);
      expect(onValueChange).toHaveBeenCalledTimes(1); // Still 1
    });

    it("respects custom isDateDisabled predicate", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      // Disable weekends (Saturday = 6, Sunday = 0)
      const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

      render(
        <Calendar
          defaultFocusedDate={new Date(2026, 9, 1)}
          isDateDisabled={isWeekend}
          onValueChange={onValueChange}
        />,
      );

      // Oct 4, 2026 is Sunday
      const sunday = screen.getByRole("button", { name: /October 4, 2026/i });
      expect(sunday).toBeDisabled();
      await user.click(sunday);
      expect(onValueChange).not.toHaveBeenCalled();

      // Oct 5, 2026 is Monday
      const monday = screen.getByRole("button", { name: /October 5, 2026/i });
      expect(monday).not.toBeDisabled();
      await user.click(monday);
      expect(onValueChange).toHaveBeenCalledTimes(1);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Keyboard Navigation (WAI-ARIA APG Grid)
  // ---------------------------------------------------------------------------
  describe("Keyboard Navigation (WAI-ARIA Grid)", () => {
    it("navigates across days using ArrowLeft and ArrowRight", async () => {
      const user = userEvent.setup();
      render(<Calendar defaultFocusedDate={new Date(2026, 9, 15)} />);

      const day15 = screen.getByRole("button", { name: /October 15, 2026/i });
      await user.click(day15);

      // Right arrow -> Oct 16
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("button", { name: /October 16, 2026/i })).toHaveFocus();

      // Left arrow -> Oct 15
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("button", { name: /October 15, 2026/i })).toHaveFocus();
    });

    it("navigates across weeks using ArrowUp and ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Calendar defaultFocusedDate={new Date(2026, 9, 15)} />);

      const day15 = screen.getByRole("button", { name: /October 15, 2026/i });
      await user.click(day15);

      // Down arrow -> Oct 22
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("button", { name: /October 22, 2026/i })).toHaveFocus();

      // Up arrow -> Oct 15
      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("button", { name: /October 15, 2026/i })).toHaveFocus();
    });

    it("navigates to start and end of week using Home and End keys", async () => {
      const user = userEvent.setup();
      // Oct 14, 2026 is Wednesday. With Sunday start, week is Oct 11 (Sun) to Oct 17 (Sat)
      render(<Calendar defaultFocusedDate={new Date(2026, 9, 14)} firstDayOfWeek={0} />);

      const day14 = screen.getByRole("button", { name: /October 14, 2026/i });
      await user.click(day14);

      await user.keyboard("{Home}");
      expect(screen.getByRole("button", { name: /October 11, 2026/i })).toHaveFocus();

      await user.keyboard("{End}");
      expect(screen.getByRole("button", { name: /October 17, 2026/i })).toHaveFocus();
    });

    it("navigates across month boundaries with Arrow keys and updates header", async () => {
      const user = userEvent.setup();
      render(<Calendar defaultFocusedDate={new Date(2026, 9, 31)} />); // Oct 31

      const day31 = screen.getByRole("button", { name: /October 31, 2026/i });
      await user.click(day31);

      // Right arrow moves to Nov 1 and updates month view
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("November 2026");
      expect(screen.getByRole("button", { name: /November 1, 2026/i })).toHaveFocus();

      // Left arrow moves back to Oct 31
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("October 2026");
      expect(screen.getByRole("button", { name: /October 31, 2026/i })).toHaveFocus();
    });

    it("selects focused date using Enter or Space key", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Calendar
          defaultFocusedDate={new Date(2026, 9, 10)}
          onValueChange={onValueChange}
        />,
      );

      const day10 = screen.getByRole("button", { name: /October 10, 2026/i });
      await user.click(day10);
      expect(onValueChange).toHaveBeenCalledTimes(1);

      await user.keyboard("{ArrowRight}"); // Move to Oct 11
      await user.keyboard("{Enter}"); // Enter to select
      expect(onValueChange).toHaveBeenCalledTimes(2);

      await user.keyboard("{ArrowRight}"); // Move to Oct 12
      await user.keyboard(" "); // Space to select
      expect(onValueChange).toHaveBeenCalledTimes(3);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Accessibility (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility (axe-core)", () => {
    it("passes axe checks with zero violations", async () => {
      const { container } = render(
        <Calendar defaultFocusedDate={new Date(2026, 9, 15)} value={new Date(2026, 9, 15)} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
