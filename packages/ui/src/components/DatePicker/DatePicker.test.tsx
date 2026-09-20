import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DatePicker } from "./DatePicker";
import { RangePicker } from "./RangePicker";
import { dayjs } from "./dateUtil";

describe("DatePicker Component (Ant Design Specification)", () => {
  it("renders with placeholder and formatted default value", () => {
    const defaultVal = dayjs("2026-09-20");
    render(
      <DatePicker
        placeholder="Select date"
        defaultValue={defaultVal}
      />
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("2026-09-20");
  });

  it("opens calendar popup on clicking container", () => {
    render(<DatePicker placeholder="Select date" />);
    const input = screen.getByPlaceholderText("Select date");

    expect(document.querySelector(".ch-picker-dropdown")).not.toBeInTheDocument();
    fireEvent.click(input);
    expect(document.querySelector(".ch-picker-dropdown")).toBeInTheDocument();
  });

  it("selects a date cell and triggers onChange", () => {
    const handleChange = vi.fn();
    const testDate = dayjs("2026-09-15");
    render(
      <DatePicker
        defaultValue={testDate}
        onChange={handleChange}
        defaultOpen
      />
    );

    expect(document.querySelector(".ch-picker-dropdown")).toBeInTheDocument();

    // Find cell 25 in current month
    const cells = document.querySelectorAll(".ch-picker-cell-in-view");
    const targetCell = Array.from(cells).find(
      (c) => c.textContent?.trim() === "25"
    );
    expect(targetCell).toBeDefined();

    fireEvent.click(targetCell!);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][1]).toBe("2026-09-25");
  });

  it("supports picker modes: month and year", () => {
    const handleChange = vi.fn();
    const testDate = dayjs("2026-09-01");
    const { rerender } = render(
      <DatePicker
        picker="month"
        defaultValue={testDate}
        onChange={handleChange}
        defaultOpen
      />
    );

    // Month cells should be rendered
    const monthCells = document.querySelectorAll(".ch-picker-grid-cell");
    expect(monthCells.length).toBe(12);

    // Pick Oct
    const octCell = Array.from(monthCells).find(
      (c) => c.textContent?.trim() === "Oct"
    );
    expect(octCell).toBeDefined();
    fireEvent.click(octCell!);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), "2026-10");

    // Year picker test
    rerender(
      <DatePicker
        picker="year"
        defaultValue={testDate}
        defaultOpen
      />
    );
    const yearCells = document.querySelectorAll(".ch-picker-grid-cell");
    expect(yearCells.length).toBe(12);
  });

  it("clears value on clear icon click", () => {
    const handleClear = vi.fn();
    const { container } = render(
      <DatePicker
        defaultValue={dayjs("2026-09-20")}
        allowClear
        onClear={handleClear}
      />
    );

    const clearBtn = container.querySelector(".ch-picker-clear");
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn!);
    expect(handleClear).toHaveBeenCalledTimes(1);

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("supports status and size props", () => {
    const { container, rerender } = render(
      <DatePicker status="error" size="large" />
    );

    expect(container.querySelector(".ch-picker--status-error")).toBeInTheDocument();
    expect(container.querySelector(".ch-picker--lg")).toBeInTheDocument();

    rerender(<DatePicker status="warning" size="small" />);
    expect(container.querySelector(".ch-picker--status-warning")).toBeInTheDocument();
    expect(container.querySelector(".ch-picker--sm")).toBeInTheDocument();
  });

  it("supports presets quick selection", () => {
    const handleChange = vi.fn();
    const presets = [
      { label: "Preset Today", value: dayjs("2026-09-20") },
      { label: "Tomorrow", value: dayjs("2026-09-21") },
    ];

    render(
      <DatePicker
        presets={presets}
        onChange={handleChange}
        defaultOpen
      />
    );

    const presetBtn = screen.getByText("Preset Today");
    expect(presetBtn).toBeInTheDocument();

    fireEvent.click(presetBtn);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), "2026-09-20");
  });
});

describe("RangePicker Component", () => {
  it("renders two inputs with separator", () => {
    render(
      <RangePicker
        placeholder={["From", "To"]}
        defaultValue={[dayjs("2026-09-01"), dayjs("2026-09-10")]}
      />
    );

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs.length).toBe(2);
    expect(inputs[0].value).toBe("2026-09-01");
    expect(inputs[1].value).toBe("2026-09-10");
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("opens dual calendar panels on click and selects range", () => {
    const handleChange = vi.fn();
    render(
      <RangePicker
        defaultValue={[dayjs("2026-09-01"), dayjs("2026-09-05")]}
        onChange={handleChange}
        defaultOpen
      />
    );

    const panels = document.querySelectorAll(".ch-picker-panel");
    expect(panels.length).toBe(2); // Left and Right month panels

    // Click 10th in left panel as start
    const leftPanelCells = panels[0].querySelectorAll(".ch-picker-cell-in-view");
    const cell10 = Array.from(leftPanelCells).find((c) => c.textContent?.trim() === "10");
    fireEvent.click(cell10!);

    // Click 15th in left panel as end
    const cell15 = Array.from(leftPanelCells).find((c) => c.textContent?.trim() === "15");
    fireEvent.click(cell15!);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][1]).toEqual(["2026-09-10", "2026-09-15"]);
  });
});
