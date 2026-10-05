import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Radio & RadioGroup Components", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Structure
  // ---------------------------------------------------------------------------
  describe("Rendering & Attributes", () => {
    it("renders label wrapper with hidden radio input and circular control", () => {
      render(
        <Radio data-testid="radio-root" name="shipping" value="standard">
          Standard Shipping
        </Radio>
      );

      const root = screen.getByTestId("radio-root");
      expect(root).toBeInTheDocument();
      expect(root.tagName).toBe("LABEL");

      const input = screen.getByRole("radio", { name: "Standard Shipping" });
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", "shipping");
      expect(input).toHaveAttribute("value", "standard");
      expect(input).not.toBeChecked();
    });

    it("forwards inputRef to the underlying HTMLInputElement", () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Radio inputRef={inputRef} value="express">Express</Radio>);

      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
      expect(inputRef.current?.type).toBe("radio");
    });

    it("supports asChild delegation to child element via Slot", () => {
      render(
        <Radio asChild>
          <div data-testid="slotted-radio">
            <span>Custom slotted radio</span>
          </div>
        </Radio>
      );

      const slotted = screen.getByTestId("slotted-radio");
      expect(slotted.tagName).toBe("DIV");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Controlled vs Uncontrolled
  // ---------------------------------------------------------------------------
  describe("Controlled & Uncontrolled State", () => {
    it("supports uncontrolled mode with defaultChecked", async () => {
      render(<Radio defaultChecked value="active">Active</Radio>);

      const input = screen.getByRole("radio");
      expect(input).toBeChecked();
    });

    it("supports controlled mode with checked and onChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Radio checked={false} onChange={handleChange} value="ctrl">
          Controlled
        </Radio>
      );

      const input = screen.getByRole("radio");
      expect(input).not.toBeChecked();

      await user.click(input);
      expect(handleChange).toHaveBeenCalledTimes(1);

      rerender(
        <Radio checked={true} onChange={handleChange} value="ctrl">
          Controlled
        </Radio>
      );
      expect(input).toBeChecked();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. User Interactions & Disabled / ReadOnly
  // ---------------------------------------------------------------------------
  describe("Interactions & Disabled / ReadOnly", () => {
    it("does not toggle or fire onChange when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Radio disabled onChange={handleChange} value="dis">
          Disabled option
        </Radio>
      );

      const input = screen.getByRole("radio");
      expect(input).toBeDisabled();

      await user.click(input);
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).not.toBeChecked();
    });

    it("does not toggle state when readOnly", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Radio readOnly onChange={handleChange} value="ro">
          Read only option
        </Radio>
      );

      const input = screen.getByRole("radio");
      expect(input).toHaveAttribute("readonly");

      await user.click(input);
      expect(input).not.toBeChecked();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. RadioGroup Orchestration & Roving Tabindex
  // ---------------------------------------------------------------------------
  describe("RadioGroup Orchestration", () => {
    it("renders with role='radiogroup' and manages single selection", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <RadioGroup
          defaultValue="credit"
          onChange={handleChange}
          data-testid="group"
        >
          <Radio value="credit">Credit Card</Radio>
          <Radio value="paypal">PayPal</Radio>
          <Radio value="applepay">Apple Pay</Radio>
        </RadioGroup>
      );

      const group = screen.getByTestId("group");
      expect(group).toHaveAttribute("role", "radiogroup");

      const credit = screen.getByRole("radio", { name: "Credit Card" });
      const paypal = screen.getByRole("radio", { name: "PayPal" });
      const applepay = screen.getByRole("radio", { name: "Apple Pay" });

      expect(credit).toBeChecked();
      expect(paypal).not.toBeChecked();
      expect(applepay).not.toBeChecked();

      // Click PayPal
      await user.click(paypal);
      expect(handleChange).toHaveBeenLastCalledWith("paypal");
      expect(paypal).toBeChecked();
      expect(credit).not.toBeChecked();
    });

    it("cascades shared name attribute to ensure mutually exclusive native grouping", () => {
      render(
        <RadioGroup name="payment-method">
          <Radio value="opt1">Option 1</Radio>
          <Radio value="opt2">Option 2</Radio>
        </RadioGroup>
      );

      const r1 = screen.getByRole("radio", { name: "Option 1" });
      const r2 = screen.getByRole("radio", { name: "Option 2" });

      expect(r1).toHaveAttribute("name", "payment-method");
      expect(r2).toHaveAttribute("name", "payment-method");
    });

    it("supports keyboard arrow roving navigation across radio group", async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup defaultValue="opt1">
          <Radio value="opt1">Option 1</Radio>
          <Radio value="opt2">Option 2</Radio>
          <Radio value="opt3">Option 3</Radio>
        </RadioGroup>
      );

      const r1 = screen.getByRole("radio", { name: "Option 1" });
      const r2 = screen.getByRole("radio", { name: "Option 2" });
      const r3 = screen.getByRole("radio", { name: "Option 3" });

      expect(r1).toBeChecked();
      r1.focus();
      expect(r1).toHaveFocus();

      // Press ArrowDown to navigate to next radio
      await user.keyboard("{ArrowDown}");
      expect(r2).toBeChecked();
      expect(r2).toHaveFocus();

      // Press ArrowDown again to navigate to third radio
      await user.keyboard("{ArrowDown}");
      expect(r3).toBeChecked();
      expect(r3).toHaveFocus();

      // Press ArrowUp to navigate back
      await user.keyboard("{ArrowUp}");
      expect(r2).toBeChecked();
      expect(r2).toHaveFocus();
    });

    it("cascades size, colorScheme, and disabled state to child radios", () => {
      render(
        <RadioGroup size="lg" colorScheme="secondary" disabled>
          <Radio value="opt1">Option 1</Radio>
          <Radio value="opt2">Option 2</Radio>
        </RadioGroup>
      );

      const r1 = screen.getByRole("radio", { name: "Option 1" });
      const r2 = screen.getByRole("radio", { name: "Option 2" });

      expect(r1).toBeDisabled();
      expect(r2).toBeDisabled();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. FormField Cascade Integration
  // ---------------------------------------------------------------------------
  describe("FormField Cascade", () => {
    it("inherits id, disabled, required, error, and aria-describedby from FormField", () => {
      render(
        <FormField id="plan-field" required error>
          <FormLabel>Subscription Tier</FormLabel>
          <RadioGroup defaultValue="pro">
            <Radio value="starter">Starter</Radio>
            <Radio value="pro">Professional</Radio>
          </RadioGroup>
          <FormErrorMessage>Please choose a valid tier.</FormErrorMessage>
          <FormHelperText>Billed annually or monthly.</FormHelperText>
        </FormField>
      );

      const proRadio = screen.getByRole("radio", { name: "Professional" });
      expect(proRadio).toBeRequired();
      expect(proRadio).toHaveAttribute("aria-invalid", "true");
      expect(proRadio).toHaveAttribute(
        "aria-describedby",
        "plan-field-error plan-field-helper"
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Accessibility Audits (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility (Axe Audits)", () => {
    it("has zero axe violations for standalone radio", async () => {
      const { container } = render(
        <ThemeProvider>
          <Radio defaultChecked value="agree">
            I agree to the terms
          </Radio>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for RadioGroup", async () => {
      const { container } = render(
        <ThemeProvider>
          <RadioGroup aria-label="Shipping choices" defaultValue="express">
            <Radio value="standard">Standard Shipping</Radio>
            <Radio value="express">Express Shipping</Radio>
            <Radio value="overnight">Overnight Delivery</Radio>
          </RadioGroup>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
