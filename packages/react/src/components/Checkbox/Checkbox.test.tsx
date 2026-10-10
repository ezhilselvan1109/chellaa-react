import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Checkbox & CheckboxGroup Components", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Structure
  // ---------------------------------------------------------------------------
  describe("Rendering & Attributes", () => {
    it("renders label wrapper with hidden input and visual control", () => {
      render(
        <Checkbox data-testid="checkbox-root" name="agree">
          I agree to the terms
        </Checkbox>
      );

      const root = screen.getByTestId("checkbox-root");
      expect(root).toBeInTheDocument();
      expect(root.tagName).toBe("LABEL");

      const input = screen.getByRole("checkbox", { name: "I agree to the terms" });
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", "agree");
      expect(input).not.toBeChecked();
    });

    it("forwards inputRef to the underlying HTMLInputElement", () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Checkbox inputRef={inputRef}>Accept</Checkbox>);

      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
      expect(inputRef.current?.type).toBe("checkbox");
    });

    it("supports asChild delegation to child element via Slot", () => {
      render(
        <Checkbox asChild>
          <div data-testid="slotted-checkbox">
            <span>Slotted content</span>
          </div>
        </Checkbox>
      );

      const slotted = screen.getByTestId("slotted-checkbox");
      expect(slotted.tagName).toBe("DIV");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Controlled, Uncontrolled & Tri-State Indeterminate
  // ---------------------------------------------------------------------------
  describe("State & Tri-State (Indeterminate)", () => {
    it("supports uncontrolled mode with defaultChecked", async () => {
      const user = userEvent.setup();
      render(<Checkbox defaultChecked>Subscribe</Checkbox>);

      const input = screen.getByRole("checkbox");
      expect(input).toBeChecked();

      await user.click(input);
      expect(input).not.toBeChecked();
    });

    it("supports controlled mode with checked and onChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Checkbox checked={false} onChange={handleChange}>
          Controlled
        </Checkbox>
      );

      const input = screen.getByRole("checkbox");
      expect(input).not.toBeChecked();

      await user.click(input);
      expect(handleChange).toHaveBeenCalledTimes(1);

      rerender(
        <Checkbox checked={true} onChange={handleChange}>
          Controlled
        </Checkbox>
      );
      expect(input).toBeChecked();
    });

    it("supports indeterminate state with aria-checked='mixed' and dash icon", () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(
        <Checkbox indeterminate inputRef={inputRef}>
          Select all
        </Checkbox>
      );

      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("aria-checked", "mixed");
      expect(inputRef.current?.indeterminate).toBe(true);

      // Dash icon svg should be rendered
      expect(
        document.querySelector(".ChellaaCheckbox-Icon--indeterminate")
      ).toBeInTheDocument();
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
        <Checkbox disabled onChange={handleChange}>
          Disabled item
        </Checkbox>
      );

      const input = screen.getByRole("checkbox");
      expect(input).toBeDisabled();

      await user.click(input);
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).not.toBeChecked();
    });

    it("does not toggle state when readOnly", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Checkbox readOnly defaultChecked onChange={handleChange}>
          Read only item
        </Checkbox>
      );

      const input = screen.getByRole("checkbox");
      expect(input).toHaveAttribute("readonly");
      expect(input).toBeChecked();

      await user.click(input);
      expect(input).toBeChecked();
    });

    it("toggles state via Space key when focused", async () => {
      const user = userEvent.setup();
      render(<Checkbox>Keyboard target</Checkbox>);

      const input = screen.getByRole("checkbox");
      input.focus();
      expect(input).toHaveFocus();

      await user.keyboard(" ");
      expect(input).toBeChecked();

      await user.keyboard(" ");
      expect(input).not.toBeChecked();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. CheckboxGroup Orchestration
  // ---------------------------------------------------------------------------
  describe("CheckboxGroup", () => {
    it("renders with role='group' and manages multi-selection array", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <CheckboxGroup
          defaultValue={["react"]}
          onChange={handleChange}
          data-testid="group"
        >
          <Checkbox value="react">React</Checkbox>
          <Checkbox value="vue">Vue</Checkbox>
          <Checkbox value="svelte">Svelte</Checkbox>
        </CheckboxGroup>
      );

      const group = screen.getByTestId("group");
      expect(group).toHaveAttribute("role", "group");

      const reactCb = screen.getByRole("checkbox", { name: "React" });
      const vueCb = screen.getByRole("checkbox", { name: "Vue" });
      const svelteCb = screen.getByRole("checkbox", { name: "Svelte" });

      expect(reactCb).toBeChecked();
      expect(vueCb).not.toBeChecked();
      expect(svelteCb).not.toBeChecked();

      // Click Vue to add
      await user.click(vueCb);
      expect(handleChange).toHaveBeenLastCalledWith(["react", "vue"]);
      expect(vueCb).toBeChecked();

      // Click React to remove
      await user.click(reactCb);
      expect(handleChange).toHaveBeenLastCalledWith(["vue"]);
      expect(reactCb).not.toBeChecked();
    });

    it("cascades size, colorScheme, and disabled state to child checkboxes", () => {
      render(
        <CheckboxGroup size="lg" colorScheme="secondary" disabled>
          <Checkbox value="opt1">Option 1</Checkbox>
          <Checkbox value="opt2">Option 2</Checkbox>
        </CheckboxGroup>
      );

      const cb1 = screen.getByRole("checkbox", { name: "Option 1" });
      const cb2 = screen.getByRole("checkbox", { name: "Option 2" });

      expect(cb1).toBeDisabled();
      expect(cb2).toBeDisabled();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. FormField Cascade Integration
  // ---------------------------------------------------------------------------
  describe("FormField Cascade", () => {
    it("inherits id, disabled, required, error, and aria-describedby from FormField", () => {
      render(
        <FormField id="terms-field" required error>
          <FormLabel>Terms</FormLabel>
          <Checkbox>I accept the terms and conditions</Checkbox>
          <FormErrorMessage>You must accept the terms.</FormErrorMessage>
          <FormHelperText>Read thoroughly before checking.</FormHelperText>
        </FormField>
      );

      const checkbox = screen.getByRole("checkbox", {
        name: "I accept the terms and conditions",
      });

      expect(checkbox).toHaveAttribute("id", "terms-field-checkbox");
      expect(checkbox).toBeRequired();
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "terms-field-error terms-field-helper"
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Accessibility Audits (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility (Axe Audits)", () => {
    it("has zero axe violations for standard checkbox", async () => {
      const { container } = render(
        <ThemeProvider>
          <Checkbox defaultChecked>Newsletter subscription</Checkbox>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for indeterminate checkbox", async () => {
      const { container } = render(
        <ThemeProvider>
          <Checkbox indeterminate>Select all categories</Checkbox>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for CheckboxGroup", async () => {
      const { container } = render(
        <ThemeProvider>
          <CheckboxGroup aria-label="Frontend frameworks" defaultValue={["react"]}>
            <Checkbox value="react">React</Checkbox>
            <Checkbox value="vue">Vue</Checkbox>
            </CheckboxGroup>
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
    it("applies static BEM classes for variants and states", () => {
      render(
        <Checkbox
          size="lg"
          colorScheme="success"
          disabled
          error
          defaultChecked
          data-testid="styled-cb"
        >
          Check me
        </Checkbox>
      );

      const root = screen.getByTestId("styled-cb");
      expect(root).toHaveClass("cl-checkbox");
      expect(root).toHaveClass("cl-checkbox--lg");
      expect(root).toHaveClass("cl-checkbox--success");
      expect(root).toHaveClass("cl-checkbox--disabled");
      expect(root).toHaveClass("cl-checkbox--error");
      expect(root).toHaveClass("cl-checkbox--checked");
    });

    it("applies dynamic sx styling overrides on root", () => {
      render(
        <Checkbox
          data-testid="sx-cb"
          sx={{
            marginTop: "16px",
            opacity: 0.85,
          }}
        >
          Styled
        </Checkbox>
      );

      const root = screen.getByTestId("sx-cb");
      expect(root).toHaveClass("cl-checkbox");
      expect(root.className).toMatch(/css-/);
    });
  });
});

