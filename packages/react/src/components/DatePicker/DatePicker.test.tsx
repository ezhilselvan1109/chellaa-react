import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { DatePicker } from "./DatePicker";
import { FormField } from "../FormField";

describe("DatePicker Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Open / Close & Calendar Selection
  // ---------------------------------------------------------------------------
  describe("Open & Close Interactions", () => {
    it("renders closed by default with formatted date or empty placeholder", () => {
      render(<DatePicker placeholder="Select appointment" />);
      const input = screen.getByPlaceholderText("Select appointment");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("");
      // Calendar should not be visible initially
      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });

    it("opens popover calendar when trigger is clicked", async () => {
      const user = userEvent.setup();
      render(<DatePicker defaultValue={new Date(2026, 9, 15)} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("2026-10-15");

      // Click left calendar icon button to open
      const iconBtn = screen.getByRole("button", { name: "Open calendar" });
      await user.click(iconBtn);

      expect(await screen.findByRole("grid")).toBeInTheDocument();
    });

    it("opens popover calendar when right toggle button is clicked", async () => {
      const user = userEvent.setup();
      render(<DatePicker defaultValue={new Date(2026, 9, 15)} />);

      const toggleBtn = screen.getByRole("button", { name: "Toggle calendar" });
      await user.click(toggleBtn);

      expect(await screen.findByRole("grid")).toBeInTheDocument();
    });

    it("selects date from calendar, updates input, and closes popup", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <DatePicker
          defaultValue={new Date(2026, 9, 1)}
          onValueChange={onValueChange}
        />,
      );

      const toggleBtn = screen.getByRole("button", { name: "Open calendar" });
      await user.click(toggleBtn);

      const targetDay = await screen.findByRole("button", { name: /October 20, 2026/i });
      await user.click(targetDay);

      expect(onValueChange).toHaveBeenCalledTimes(1);
      const selected = onValueChange.mock.calls[0][0] as Date;
      expect(selected.getDate()).toBe(20);

      // Popup closes
      await waitFor(() => {
        expect(screen.queryByRole("grid")).not.toBeInTheDocument();
      });

      // Input value updated
      expect(screen.getByRole("textbox")).toHaveValue("2026-10-20");
    });

    it("dismisses popover on Escape and restores focus to input", async () => {
      const user = userEvent.setup();
      render(<DatePicker defaultValue={new Date(2026, 9, 15)} />);

      const toggleBtn = screen.getByRole("button", { name: "Open calendar" });
      await user.click(toggleBtn);
      expect(await screen.findByRole("grid")).toBeInTheDocument();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("grid")).not.toBeInTheDocument();
      });
      expect(screen.getByRole("textbox")).toHaveFocus();
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Controlled State
  // ---------------------------------------------------------------------------
  describe("Controlled State", () => {
    it("handles controlled value updates", async () => {
      const { rerender } = render(<DatePicker value={new Date(2026, 9, 5)} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("2026-10-05");

      rerender(<DatePicker value={new Date(2026, 9, 25)} />);
      expect(input).toHaveValue("2026-10-25");
    });

    it("handles controlled open state via isOpen and onOpenChange", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <DatePicker isOpen={false} onOpenChange={onOpenChange} />,
      );

      expect(screen.queryByRole("grid")).not.toBeInTheDocument();

      const toggleBtn = screen.getByRole("button", { name: "Open calendar" });
      await user.click(toggleBtn);
      expect(onOpenChange).toHaveBeenCalledWith(true);

      rerender(<DatePicker isOpen={true} onOpenChange={onOpenChange} />);
      expect(await screen.findByRole("grid")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Manual Input & Clear
  // ---------------------------------------------------------------------------
  describe("Manual Input & Clear", () => {
    it("updates date when a valid manual date string is typed", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<DatePicker onValueChange={onValueChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "2026-10-18");
      await user.tab(); // Trigger blur

      expect(input).toHaveValue("2026-10-18");
      expect(onValueChange).toHaveBeenCalled();
      const lastCall = onValueChange.mock.calls[onValueChange.mock.calls.length - 1][0] as Date;
      expect(lastCall.getFullYear()).toBe(2026);
      expect(lastCall.getMonth()).toBe(9);
      expect(lastCall.getDate()).toBe(18);
    });

    it("reverts to last valid date when an invalid date string is typed and blurred", async () => {
      const user = userEvent.setup();
      render(<DatePicker defaultValue={new Date(2026, 9, 15)} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("2026-10-15");

      await user.clear(input);
      await user.type(input, "invalid-date");
      await user.tab();

      // Should not select invalid date; reverts to 2026-10-15
      expect(input).toHaveValue("2026-10-15");
    });

    it("clears selected date when clear button is clicked", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <DatePicker
          defaultValue={new Date(2026, 9, 15)}
          isClearable
          onValueChange={onValueChange}
        />,
      );

      const clearBtn = screen.getByRole("button", { name: "Clear date" });
      await user.click(clearBtn);

      expect(screen.getByRole("textbox")).toHaveValue("");
      expect(onValueChange).toHaveBeenCalledWith(null);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Disabled State & Constraints
  // ---------------------------------------------------------------------------
  describe("Disabled & Validation States", () => {
    it("disables input and prevents opening when isDisabled is true", async () => {
      const user = userEvent.setup();
      render(<DatePicker isDisabled defaultValue={new Date(2026, 9, 15)} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("aria-disabled", "true");

      const toggleBtn = screen.getByRole("button", { name: "Open calendar" });
      expect(toggleBtn).toBeDisabled();
      await user.click(toggleBtn);

      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });

    it("marks input as invalid when isInvalid is true", () => {
      render(<DatePicker isInvalid data-testid="picker" />);
      expect(screen.getByTestId("picker")).toHaveClass("cl-datepicker--invalid");
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("integrates with FormField context", () => {
      render(
        <FormField id="dob-field" error disabled>
          <DatePicker data-testid="picker" />
        </FormField>,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "dob-field");
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Accessibility (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility (axe-core)", () => {
    it("passes axe checks in closed state", async () => {
      const { container } = render(
        <DatePicker
          defaultValue={new Date(2026, 9, 15)}
          aria-label="Departure date"
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe checks in open state", async () => {
      const { container } = render(
        <DatePicker
          isOpen={true}
          defaultValue={new Date(2026, 9, 15)}
          aria-label="Return date"
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
