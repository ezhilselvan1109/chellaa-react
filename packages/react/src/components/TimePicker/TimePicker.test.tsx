import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import * as React from "react";
import { TimePicker } from "./TimePicker";

describe("TimePicker Component", () => {
  it("renders input with formatted 12h display value", () => {
    render(<TimePicker defaultValue="14:30" format="12h" />);
    const input = screen.getByRole("textbox", { name: "Choose time" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("02:30 PM");
  });

  it("renders input with formatted 24h display value", () => {
    render(<TimePicker defaultValue="14:30" format="24h" />);
    const input = screen.getByRole("textbox", { name: "Choose time" });
    expect(input).toHaveValue("14:30");
  });

  it("opens popover with column listboxes when toggle button is clicked", async () => {
    const user = userEvent.setup();
    render(<TimePicker />);

    const toggleBtn = screen.getByRole("button", { name: "Toggle time picker" });
    await user.click(toggleBtn);

    expect(screen.getByRole("dialog", { name: "Time options" })).toBeInTheDocument();
    expect(screen.getByRole("listbox", { name: "Hours" })).toBeInTheDocument();
    expect(screen.getByRole("listbox", { name: "Minutes" })).toBeInTheDocument();
    expect(screen.getByRole("listbox", { name: "Period" })).toBeInTheDocument();
  });

  it("selects hour, minute, and period from dropdown", async () => {
    const user = userEvent.setup();
    const handleTimeChange = vi.fn();

    render(
      <TimePicker
        defaultOpen
        defaultValue="09:00"
        format="12h"
        onValueChange={handleTimeChange}
      />
    );

    // Click 10 in hours listbox
    const hoursListbox = screen.getByRole("listbox", { name: "Hours" });
    const hour10 = within(hoursListbox).getByRole("option", { name: "10" });
    await user.click(hour10);
    expect(handleTimeChange).toHaveBeenCalledWith("10:00");

    // Click 30 in minutes listbox
    const minutesListbox = screen.getByRole("listbox", { name: "Minutes" });
    const min30 = within(minutesListbox).getByRole("option", { name: "30" });
    await user.click(min30);
    expect(handleTimeChange).toHaveBeenCalledWith("10:30");

    // Click PM in period listbox
    const periodListbox = screen.getByRole("listbox", { name: "Period" });
    const pmOption = within(periodListbox).getByRole("option", { name: "PM" });
    await user.click(pmOption);
    expect(handleTimeChange).toHaveBeenCalledWith("22:30");
  });

  it("increments and decrements minutes using ArrowUp and ArrowDown keys", async () => {
    const user = userEvent.setup();
    const handleTimeChange = vi.fn();

    render(
      <TimePicker
        defaultValue="10:00"
        minuteStep={15}
        onValueChange={handleTimeChange}
      />
    );

    const input = screen.getByRole("textbox", { name: "Choose time" });
    await user.click(input);

    await user.keyboard("{ArrowUp}");
    expect(handleTimeChange).toHaveBeenCalledWith("10:15");

    await user.keyboard("{ArrowDown}");
    expect(handleTimeChange).toHaveBeenCalledWith("10:00");
  });

  it("clears time when clear button is clicked", async () => {
    const user = userEvent.setup();
    const handleTimeChange = vi.fn();

    render(
      <TimePicker
        defaultValue="14:30"
        isClearable
        onValueChange={handleTimeChange}
      />
    );

    const clearBtn = screen.getByRole("button", { name: "Clear time" });
    await user.click(clearBtn);

    expect(handleTimeChange).toHaveBeenCalledWith("");
    const input = screen.getByRole("textbox", { name: "Choose time" });
    expect(input).toHaveValue("");
  });

  it("disables options outside minTime and maxTime bounds", async () => {
    render(
      <TimePicker
        defaultOpen
        defaultValue="10:00"
        format="24h"
        minTime="09:00"
        maxTime="17:00"
      />
    );

    const hour08 = screen.getByRole("option", { name: "08" });
    expect(hour08).toBeDisabled();

    const hour12 = screen.getByRole("option", { name: "12" });
    expect(hour12).not.toBeDisabled();

    const hour18 = screen.getByRole("option", { name: "18" });
    expect(hour18).toBeDisabled();
  });

  it("respects isDisabled state", async () => {
    const user = userEvent.setup();
    render(<TimePicker isDisabled defaultValue="10:00" />);

    const input = screen.getByRole("textbox", { name: "Choose time" });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");

    const toggleBtn = screen.getByRole("button", { name: "Toggle time picker" });
    expect(toggleBtn).toBeDisabled();

    await user.click(toggleBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("passes axe-core accessibility audit with 0 violations", async () => {
    const { container } = render(
      <main>
        <TimePicker defaultValue="15:45" format="12h" />
      </main>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
