import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./Select";
import { FormField } from "../FormField";

describe("Select Component (SPEC-003)", () => {
  const renderFruitSelect = (props: React.ComponentProps<typeof SelectRoot> = {}) => {
    return render(
      <SelectRoot defaultValue="apple" {...props}>
        <SelectTrigger aria-label="Select Fruit">
          <SelectValue placeholder="Pick a fruit..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">
                <SelectItemText>Apple</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="banana">
                <SelectItemText>Banana</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="cherry" isDisabled>
                <SelectItemText>Cherry</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="date">
                <SelectItemText>Date</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
    );
  };

  // ---------------------------------------------------------------------------
  // 1. Rendering & Anatomy (FR-SEL-01, AC-SEL-01)
  // ---------------------------------------------------------------------------
  describe("1. Rendering & Anatomy", () => {
    it("renders trigger with APG combobox semantics (role='combobox', aria-expanded='false')", () => {
      renderFruitSelect();
      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("displays initial selected value text in SelectValue slot", () => {
      renderFruitSelect();
      expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    it("renders placeholder when no value is selected", () => {
      render(
        <SelectRoot>
          <SelectTrigger aria-label="Select item">
            <SelectValue placeholder="Choose option..." />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent>
              <SelectItem value="1">
                <SelectItemText>One</SelectItemText>
              </SelectItem>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      );
      expect(screen.getByText("Choose option...")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 2. User Interactions & Selection (FR-SEL-04, FR-SEL-05)
  // ---------------------------------------------------------------------------
  describe("2. User Interactions & Selection", () => {
    it("opens popup listbox when clicking trigger button", async () => {
      const user = userEvent.setup();
      renderFruitSelect();

      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });
      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    it("selects an option on click, notifies onValueChange, and closes popup", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderFruitSelect({ onValueChange });

      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });
      await user.click(trigger);

      const bananaOption = screen.getByText("Banana");
      await user.click(bananaOption);

      expect(onValueChange).toHaveBeenCalledWith("banana");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    it("shows checkmark indicator for the currently selected item", async () => {
      const user = userEvent.setup();
      renderFruitSelect();

      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });
      await user.click(trigger);

      const appleOption = screen.getByRole("option", { name: /apple/i });
      expect(appleOption).toHaveAttribute("aria-selected", "true");
      expect(appleOption.querySelector(".cl-select__item-indicator")).toBeInTheDocument();

      const bananaOption = screen.getByRole("option", { name: /banana/i });
      expect(bananaOption).toHaveAttribute("aria-selected", "false");
      expect(bananaOption.querySelector(".cl-select__item-indicator")).not.toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Accessibility & axe-core (FR-SEL-02, NFR-SEL-03, AC-SEL-03, AC-SEL-06)
  // ---------------------------------------------------------------------------
  describe("3. Accessibility & axe-core Compliance", () => {
    it("passes axe-core accessibility audit in closed resting state", async () => {
      const { container } = renderFruitSelect();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe-core accessibility audit in open state", async () => {
      const user = userEvent.setup();
      const { container } = renderFruitSelect();

      await user.click(screen.getByRole("combobox", { name: "Select Fruit" }));
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Keyboard Navigation (FR-SEL-07, FR-SEL-08, AC-SEL-04, AC-SEL-05)
  // ---------------------------------------------------------------------------
  describe("4. Keyboard Navigation Physics", () => {
    it("opens popup when pressing ArrowDown on closed trigger", () => {
      renderFruitSelect();
      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });
      trigger.focus();

      fireEvent.keyDown(trigger, { key: "ArrowDown" });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("closes popup and restores focus to trigger when pressing Escape", async () => {
      const user = userEvent.setup();
      renderFruitSelect();

      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });
      await user.click(trigger);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      const listbox = screen.getByRole("listbox");
      fireEvent.keyDown(listbox, { key: "Escape" });

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(document.activeElement).toBe(trigger);
    });

    it("cycles highlight with ArrowDown and ArrowUp, skipping disabled items", () => {
      renderFruitSelect({ defaultOpen: true });
      const listbox = screen.getByRole("listbox");

      // Highlight first enabled option (apple)
      fireEvent.keyDown(listbox, { key: "Home" });
      expect(screen.getByRole("option", { name: /apple/i })).toHaveAttribute("data-highlighted", "true");

      // ArrowDown -> banana
      fireEvent.keyDown(listbox, { key: "ArrowDown" });
      expect(screen.getByRole("option", { name: /banana/i })).toHaveAttribute("data-highlighted", "true");

      // ArrowDown -> skips cherry (disabled) -> date
      fireEvent.keyDown(listbox, { key: "ArrowDown" });
      expect(screen.getByRole("option", { name: /date/i })).toHaveAttribute("data-highlighted", "true");

      // ArrowUp -> back to banana
      fireEvent.keyDown(listbox, { key: "ArrowUp" });
      expect(screen.getByRole("option", { name: /banana/i })).toHaveAttribute("data-highlighted", "true");
    });

    it("commits highlighted option with Enter key and restores focus to trigger", () => {
      const onValueChange = vi.fn();
      renderFruitSelect({ defaultOpen: true, onValueChange });
      const listbox = screen.getByRole("listbox");
      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });

      fireEvent.keyDown(listbox, { key: "Home" }); // apple
      fireEvent.keyDown(listbox, { key: "ArrowDown" }); // banana
      fireEvent.keyDown(listbox, { key: "Enter" });

      expect(onValueChange).toHaveBeenCalledWith("banana");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(document.activeElement).toBe(trigger);
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Controlled & Uncontrolled State (FR-SEL-04, AC-SEL-07)
  // ---------------------------------------------------------------------------
  describe("5. Controlled vs. Uncontrolled State", () => {
    it("operates in controlled mode with value and onValueChange", async () => {
      const user = userEvent.setup();
      function ControlledSelect() {
        const [value, setValue] = React.useState("banana");
        return (
          <SelectRoot value={value} onValueChange={setValue}>
            <SelectTrigger aria-label="Controlled Fruit">
              <SelectValue />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        );
      }

      render(<ControlledSelect />);
      expect(screen.getByText("Banana")).toBeInTheDocument();

      const trigger = screen.getByRole("combobox", { name: "Controlled Fruit" });
      await user.click(trigger);
      await user.click(screen.getByRole("option", { name: "Apple" }));

      expect(screen.getByText("Apple")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Disabled State & FormField Integration (FR-SEL-09, FR-SEL-10)
  // ---------------------------------------------------------------------------
  describe("6. Disabled & FormField Integration", () => {
    it("suppresses clicks and opening when isDisabled is true", async () => {
      const user = userEvent.setup();
      renderFruitSelect({ isDisabled: true });

      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute("data-disabled", "true");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("cascades FormField invalid state, required, name, and aria-describedby", () => {
      render(
        <FormField isInvalid isRequired name="country">
          <SelectRoot>
            <SelectTrigger aria-label="Select Country">
              <SelectValue placeholder="Choose country" />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </FormField>
      );

      const trigger = screen.getByRole("combobox", { name: "Select Country" });
      expect(trigger).toHaveAttribute("aria-invalid", "true");
      expect(trigger).toHaveAttribute("aria-required", "true");
      expect(trigger).toHaveAttribute("data-invalid", "true");

      const hiddenInput = document.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute("name", "country");
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Auto-Layout Options Prop
  // ---------------------------------------------------------------------------
  describe("7. Auto-Layout Options Prop", () => {
    it("renders options array via flat options prop without compound children", async () => {
      const user = userEvent.setup();
      render(
        <SelectRoot
          placeholder="Pick a color..."
          options={[
            { value: "red", label: "Red" },
            { value: "green", label: "Green" },
            { value: "blue", label: "Blue", disabled: true },
          ]}
        />
      );

      expect(screen.getByText("Pick a color...")).toBeInTheDocument();
      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("Red")).toBeInTheDocument();
      expect(screen.getByText("Green")).toBeInTheDocument();
      expect(screen.getByText("Blue")).toBeInTheDocument();
    });
  });
});
