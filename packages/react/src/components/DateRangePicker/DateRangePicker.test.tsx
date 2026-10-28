import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import * as React from "react";
import { DateRangePicker } from "./DateRangePicker";

describe("DateRangePicker Component", () => {
  it("renders trigger input with default placeholder", () => {
    render(<DateRangePicker placeholder="Select duration" />);
    const input = screen.getByRole("textbox", { name: "Date range" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Select duration");
    expect(input).toHaveValue("");
  });

  it("formats initial range value correctly", () => {
    const range = {
      startDate: new Date(2026, 4, 10),
      endDate: new Date(2026, 4, 20),
    };
    render(<DateRangePicker defaultValue={range} />);
    const input = screen.getByRole("textbox", { name: "Date range" });
    expect(input).toHaveValue("2026-05-10 – 2026-05-20");
  });

  it("displays partial range with ellipsis indicator", () => {
    const partialRange = {
      startDate: new Date(2026, 4, 10),
      endDate: null,
    };
    render(<DateRangePicker defaultValue={partialRange} />);
    const input = screen.getByRole("textbox", { name: "Date range" });
    expect(input).toHaveValue("2026-05-10 – ...");
  });

  it("opens calendar overlay when clicking toggle button", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    const toggleBtn = screen.getByRole("button", { name: "Toggle calendar" });
    await user.click(toggleBtn);

    const calendar = screen.getByRole("grid", { name: "Calendar" });
    expect(calendar).toBeInTheDocument();
  });

  it("selects start date and end date from calendar", async () => {
    const user = userEvent.setup();
    const handleRangeChange = vi.fn();

    render(
      <DateRangePicker
        defaultOpen
        defaultFocusedDate={new Date(2026, 4, 1)}
        onValueChange={handleRangeChange}
      />
    );

    // Pick day 10
    const day10 = screen.getByRole("button", { name: /May 10|10/ });
    await user.click(day10);

    expect(handleRangeChange).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: expect.any(Date),
        endDate: null,
      })
    );

    // Pick day 15
    const day15 = screen.getByRole("button", { name: /May 15|15/ });
    await user.click(day15);

    expect(handleRangeChange).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      })
    );
  });

  it("clears selected range when clear button is clicked", async () => {
    const user = userEvent.setup();
    const handleRangeChange = vi.fn();
    const range = {
      startDate: new Date(2026, 4, 10),
      endDate: new Date(2026, 4, 20),
    };

    render(
      <DateRangePicker
        defaultValue={range}
        onValueChange={handleRangeChange}
        isClearable
      />
    );

    const clearBtn = screen.getByRole("button", { name: "Clear date range" });
    await user.click(clearBtn);

    expect(handleRangeChange).toHaveBeenCalledWith({
      startDate: null,
      endDate: null,
    });
  });

  it("respects isDisabled state", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker isDisabled />);

    const input = screen.getByRole("textbox", { name: "Date range" });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");

    const toggleBtn = screen.getByRole("button", { name: "Toggle calendar" });
    expect(toggleBtn).toBeDisabled();

    await user.click(toggleBtn);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("passes axe-core accessibility audit with 0 violations", async () => {
    const { container } = render(
      <main>
        <DateRangePicker
          defaultValue={{
            startDate: new Date(2026, 6, 1),
            endDate: new Date(2026, 6, 15),
          }}
        />
      </main>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
