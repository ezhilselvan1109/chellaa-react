import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Switch } from "./Switch";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Switch Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Attributes
  // ---------------------------------------------------------------------------
  describe("Rendering & Attributes", () => {
    it("renders label wrapper with role='switch' input and capsule track", () => {
      render(
        <Switch data-testid="switch-root" name="wifi">
          Enable Wi-Fi
        </Switch>
      );

      const root = screen.getByTestId("switch-root");
      expect(root).toBeInTheDocument();
      expect(root.tagName).toBe("LABEL");

      const input = screen.getByRole("switch", { name: "Enable Wi-Fi" });
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "checkbox");
      expect(input).toHaveAttribute("name", "wifi");
      expect(input).toHaveAttribute("aria-checked", "false");
      expect(input).not.toBeChecked();
    });

    it("forwards inputRef to the underlying HTMLInputElement", () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Switch inputRef={inputRef}>Bluetooth</Switch>);

      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
      expect(inputRef.current?.getAttribute("role")).toBe("switch");
    });

    it("supports asChild delegation to child element via Slot", () => {
      render(
        <Switch asChild>
          <div data-testid="slotted-switch">
            <span>Slotted switch</span>
          </div>
        </Switch>
      );

      const slotted = screen.getByTestId("slotted-switch");
      expect(slotted.tagName).toBe("DIV");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Controlled vs Uncontrolled
  // ---------------------------------------------------------------------------
  describe("Controlled & Uncontrolled State", () => {
    it("supports uncontrolled mode with defaultChecked", async () => {
      const user = userEvent.setup();
      render(<Switch defaultChecked>Dark Mode</Switch>);

      const input = screen.getByRole("switch");
      expect(input).toBeChecked();
      expect(input).toHaveAttribute("aria-checked", "true");

      await user.click(input);
      expect(input).not.toBeChecked();
      expect(input).toHaveAttribute("aria-checked", "false");
    });

    it("supports controlled mode with checked and onChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Switch checked={false} onChange={handleChange}>
          Notifications
        </Switch>
      );

      const input = screen.getByRole("switch");
      expect(input).not.toBeChecked();

      await user.click(input);
      expect(handleChange).toHaveBeenCalledTimes(1);

      rerender(
        <Switch checked={true} onChange={handleChange}>
          Notifications
        </Switch>
      );
      expect(input).toBeChecked();
      expect(input).toHaveAttribute("aria-checked", "true");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. User Interactions & Keyboard
  // ---------------------------------------------------------------------------
  describe("Interactions & Keyboard Support", () => {
    it("toggles state via Space key when focused", async () => {
      const user = userEvent.setup();
      render(<Switch>Keyboard Space</Switch>);

      const input = screen.getByRole("switch");
      input.focus();
      expect(input).toHaveFocus();

      await user.keyboard(" ");
      expect(input).toBeChecked();

      await user.keyboard(" ");
      expect(input).not.toBeChecked();
    });

    it("toggles state via Enter key when focused (WAI-ARIA switch behavior)", async () => {
      const user = userEvent.setup();
      render(<Switch>Keyboard Enter</Switch>);

      const input = screen.getByRole("switch");
      input.focus();
      expect(input).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(input).toBeChecked();

      await user.keyboard("{Enter}");
      expect(input).not.toBeChecked();
    });

    it("does not toggle or fire onChange when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Switch disabled onChange={handleChange}>
          Disabled Switch
        </Switch>
      );

      const input = screen.getByRole("switch");
      expect(input).toBeDisabled();

      await user.click(input);
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).not.toBeChecked();
    });

    it("does not toggle state when readOnly", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Switch readOnly defaultChecked onChange={handleChange}>
          Read Only
        </Switch>
      );

      const input = screen.getByRole("switch");
      expect(input).toBeChecked();

      await user.click(input);
      expect(input).toBeChecked();
    });

    it("does not toggle state when loading", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Switch loading onChange={handleChange}>
          Loading Operation
        </Switch>
      );

      const input = screen.getByRole("switch");
      expect(input).toBeDisabled();

      await user.click(input);
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).not.toBeChecked();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Thumb Icons & Label Placements
  // ---------------------------------------------------------------------------
  describe("Thumb Icons & Label Placement", () => {
    it("renders custom checkedIcon and uncheckedIcon", () => {
      const { rerender } = render(
        <Switch
          checked={false}
          checkedIcon={<span data-testid="moon-icon">Moon</span>}
          uncheckedIcon={<span data-testid="sun-icon">Sun</span>}
        >
          Theme
        </Switch>
      );

      expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("moon-icon")).not.toBeInTheDocument();

      rerender(
        <Switch
          checked={true}
          checkedIcon={<span data-testid="moon-icon">Moon</span>}
          uncheckedIcon={<span data-testid="sun-icon">Sun</span>}
        >
          Theme
        </Switch>
      );

      expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
    });

    it("renders with various label placements without DOM errors", () => {
      const { rerender } = render(
        <Switch labelPlacement="start" data-testid="sw">
          Start Label
        </Switch>
      );
      expect(screen.getByTestId("sw")).toBeInTheDocument();

      rerender(
        <Switch labelPlacement="top" data-testid="sw">
          Top Label
        </Switch>
      );
      expect(screen.getByTestId("sw")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. FormField Cascade Integration
  // ---------------------------------------------------------------------------
  describe("FormField Cascade", () => {
    it("inherits id, disabled, required, error, and aria-describedby from FormField", () => {
      render(
        <FormField id="sync-field" required error>
          <FormLabel>Data Synchronization</FormLabel>
          <Switch>Sync local database with cloud storage</Switch>
          <FormErrorMessage>Sync could not be activated.</FormErrorMessage>
          <FormHelperText>Requires an active enterprise license.</FormHelperText>
        </FormField>
      );

      const switchInput = screen.getByRole("switch", {
        name: "Sync local database with cloud storage",
      });

      expect(switchInput).toHaveAttribute("id", "sync-field-switch");
      expect(switchInput).toBeRequired();
      expect(switchInput).toHaveAttribute("aria-invalid", "true");
      expect(switchInput).toHaveAttribute(
        "aria-describedby",
        "sync-field-error sync-field-helper"
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Accessibility Audits (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility (Axe Audits)", () => {
    it("has zero axe violations for unchecked switch", async () => {
      const { container } = render(
        <ThemeProvider>
          <Switch>Airplane Mode</Switch>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for checked switch", async () => {
      const { container } = render(
        <ThemeProvider>
          <Switch defaultChecked>Location Services</Switch>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for switch inside FormField", async () => {
      const { container } = render(
        <ThemeProvider>
          <FormField id="a11y-switch-field" required>
            <FormLabel>Security Settings</FormLabel>
            <Switch>Two-Factor Authentication</Switch>
            <FormHelperText>Receive SMS verification codes on login.</FormHelperText>
          </FormField>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Static CSS & sx Precedence
  // ---------------------------------------------------------------------------
  describe("Static CSS & sx Precedence", () => {
    it("applies static BEM classes for variants, placements and states", () => {
      render(
        <Switch
          size="lg"
          colorScheme="success"
          labelPlacement="start"
          disabled
          error
          defaultChecked
          data-testid="styled-switch"
        >
          Status
        </Switch>
      );

      const root = screen.getByTestId("styled-switch");
      expect(root).toHaveClass("cl-switch");
      expect(root).toHaveClass("cl-switch--lg");
      expect(root).toHaveClass("cl-switch--success");
      expect(root).toHaveClass("cl-switch--placement-start");
      expect(root).toHaveClass("cl-switch--disabled");
      expect(root).toHaveClass("cl-switch--error");
      expect(root).toHaveClass("cl-switch--checked");
    });

    it("applies dynamic sx styling overrides on root", () => {
      render(
        <Switch
          data-testid="sx-switch"
          sx={{
            marginTop: "10px",
            opacity: 0.95,
          }}
        >
          Custom
        </Switch>
      );

      const root = screen.getByTestId("sx-switch");
      expect(root).toHaveClass("cl-switch");
      expect(root.className).toMatch(/css-/);
    });
  });
});

