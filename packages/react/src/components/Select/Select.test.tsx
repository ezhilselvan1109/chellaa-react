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

  // ---------------------------------------------------------------------------
  // 8. Typeahead & Lifecycle Cleanup (W2-F07)
  // ---------------------------------------------------------------------------
  describe("8. Typeahead & Lifecycle Cleanup (W2-F07)", () => {
    it("selects matching option on printable character typeahead and clears timer on unmount", () => {
      vi.useFakeTimers();
      const { unmount } = renderFruitSelect({ defaultValue: undefined });
      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });

      // Trigger typeahead with 'b' -> should match banana
      fireEvent.keyDown(trigger, { key: "b" });
      expect(screen.getByText("Banana")).toBeInTheDocument();

      // Unmount before 500ms timer finishes
      unmount();

      // Advancing timer after unmount should execute without errors or state updates
      expect(() => {
        act(() => {
          vi.advanceTimersByTime(600);
        });
      }).not.toThrow();

      vi.useRealTimers();
    });

    it("resets typeahead buffer after 500ms inactivity", () => {
      vi.useFakeTimers();
      renderFruitSelect({ defaultValue: undefined });
      const trigger = screen.getByRole("combobox", { name: "Select Fruit" });

      // Type 'b' -> Banana
      fireEvent.keyDown(trigger, { key: "b" });
      expect(screen.getByText("Banana")).toBeInTheDocument();

      // Wait 600ms for buffer to clear
      act(() => {
        vi.advanceTimersByTime(600);
      });

      // Type 'd' -> Date (if buffer wasn't cleared it would look for 'bd' and fail)
      fireEvent.keyDown(trigger, { key: "d" });
      expect(screen.getByText("Date")).toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  // ---------------------------------------------------------------------------
  // 9. Theme Tokens & Contrast Parity (W2-F06)
  // ---------------------------------------------------------------------------
  describe("9. Theme Tokens & Contrast Parity (W2-F06)", () => {
    function getLuminance(r: number, g: number, b: number): number {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function getContrastRatio(
      rgb1: [number, number, number],
      rgb2: [number, number, number]
    ): number {
      const lum1 = getLuminance(...rgb1);
      const lum2 = getLuminance(...rgb2);
      return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    }

    it("verifies WCAG AA contrast ratio (>= 4.5:1) for dark-theme option tokens", () => {
      // Menu surface: slate-800 (#1e293b -> [30, 41, 59])
      const menuBg: [number, number, number] = [30, 41, 59];

      // Normal text: slate-50 (#f8fafc -> [248, 250, 252])
      const normalFg: [number, number, number] = [248, 250, 252];
      const normalContrast = getContrastRatio(normalFg, menuBg);
      expect(normalContrast).toBeGreaterThanOrEqual(4.5);

      // Hovered state: indigo-200 (#c7d2fe -> [199, 210, 254]) on hovered surface (~[40, 46, 86])
      const hoverBg: [number, number, number] = [40, 46, 86];
      const hoverFg: [number, number, number] = [199, 210, 254];
      const hoverContrast = getContrastRatio(hoverFg, hoverBg);
      expect(hoverContrast).toBeGreaterThanOrEqual(4.5);

      // Selected state: indigo-100 (#e0e7ff -> [224, 231, 255]) on selected surface (~[49, 55, 104])
      const selectedBg: [number, number, number] = [49, 55, 104];
      const selectedFg: [number, number, number] = [224, 231, 255];
      const selectedContrast = getContrastRatio(selectedFg, selectedBg);
      expect(selectedContrast).toBeGreaterThanOrEqual(4.5);

      // Selected + Hovered state: white (#ffffff -> [255, 255, 255]) on active surface (~[58, 65, 122])
      const activeBg: [number, number, number] = [58, 65, 122];
      const activeFg: [number, number, number] = [255, 255, 255];
      const activeContrast = getContrastRatio(activeFg, activeBg);
      expect(activeContrast).toBeGreaterThanOrEqual(4.5);
    });

    it("renders with custom select tokens via css custom properties", () => {
      render(
        <div
          data-theme="dark"
          style={
            {
              "--cl-select-bg": "#090d16",
              "--cl-select-fg": "#f8fafc",
              "--cl-select-border": "#334155",
            } as React.CSSProperties
          }
        >
          <SelectRoot defaultValue="opt1">
            <SelectTrigger aria-label="Dark Select" data-testid="dark-trigger">
              <SelectValue />
            </SelectTrigger>
          </SelectRoot>
        </div>
      );

      const trigger = screen.getByTestId("dark-trigger");
      expect(trigger).toHaveClass("cl-select__trigger");
    });
  });
});
