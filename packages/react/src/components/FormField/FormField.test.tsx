import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormHelperText } from "./FormHelperText";
import { FormErrorMessage } from "./FormErrorMessage";
import { useFormField } from "./FormFieldContext";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("FormField & Primitives", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Structure
  // ---------------------------------------------------------------------------
  describe("Rendering & HTML Attributes", () => {
    it("renders as a div root by default", () => {
      render(
        <FormField data-testid="form-field">
          <div>Content</div>
        </FormField>
      );
      const root = screen.getByTestId("form-field");
      expect(root).toBeInTheDocument();
      expect(root.tagName).toBe("DIV");
    });

    it("supports custom polymorphic tag via as / component prop", () => {
      render(
        <FormField as="fieldset" data-testid="form-field">
          <legend>Legend</legend>
        </FormField>
      );
      const root = screen.getByTestId("form-field");
      expect(root.tagName).toBe("FIELDSET");
    });

    it("supports asChild delegation to child element via Slot", () => {
      render(
        <FormField asChild>
          <section data-testid="slotted-section">
            <p>Slotted child</p>
          </section>
        </FormField>
      );
      const slotted = screen.getByTestId("slotted-section");
      expect(slotted.tagName).toBe("SECTION");
    });

    it("does not leak fullWidth prop to DOM element", () => {
      render(<FormField fullWidth data-testid="form-field" />);
      const root = screen.getByTestId("form-field");
      expect(root).not.toHaveAttribute("fullWidth");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Context & IDs
  // ---------------------------------------------------------------------------
  describe("Context & ID Generation", () => {
    function ContextInspector() {
      const ctx = useFormField();
      return (
        <div>
          <span data-testid="ctx-id">{ctx?.id}</span>
          <span data-testid="ctx-label-id">{ctx?.labelId}</span>
          <span data-testid="ctx-helper-id">{ctx?.helperTextId}</span>
          <span data-testid="ctx-error-id">{ctx?.errorMessageId}</span>
          <span data-testid="ctx-required">{String(ctx?.required)}</span>
          <span data-testid="ctx-disabled">{String(ctx?.disabled)}</span>
          <span data-testid="ctx-error">{String(ctx?.error)}</span>
        </div>
      );
    }

    it("returns undefined when useFormField is invoked outside FormField", () => {
      render(<ContextInspector />);
      expect(screen.getByTestId("ctx-id").textContent).toBe("");
    });

    it("generates deterministic or unique ID when id prop is omitted", () => {
      render(
        <FormField>
          <ContextInspector />
        </FormField>
      );
      const id = screen.getByTestId("ctx-id").textContent;
      expect(id).toBeTruthy();
      expect(screen.getByTestId("ctx-label-id").textContent).toBe(`${id}-label`);
      expect(screen.getByTestId("ctx-helper-id").textContent).toBe(`${id}-helper`);
      expect(screen.getByTestId("ctx-error-id").textContent).toBe(`${id}-error`);
    });

    it("uses explicit id when provided", () => {
      render(
        <FormField id="account-email" required disabled error>
          <ContextInspector />
        </FormField>
      );
      expect(screen.getByTestId("ctx-id").textContent).toBe("account-email");
      expect(screen.getByTestId("ctx-label-id").textContent).toBe("account-email-label");
      expect(screen.getByTestId("ctx-helper-id").textContent).toBe("account-email-helper");
      expect(screen.getByTestId("ctx-error-id").textContent).toBe("account-email-error");
      expect(screen.getByTestId("ctx-required").textContent).toBe("true");
      expect(screen.getByTestId("ctx-disabled").textContent).toBe("true");
      expect(screen.getByTestId("ctx-error").textContent).toBe("true");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. FormLabel Primitive
  // ---------------------------------------------------------------------------
  describe("FormLabel", () => {
    it("automatically links htmlFor to FormField id", () => {
      render(
        <FormField id="first-name">
          <FormLabel>First Name</FormLabel>
        </FormField>
      );
      const label = screen.getByText("First Name");
      expect(label).toHaveAttribute("for", "first-name");
      expect(label).toHaveAttribute("id", "first-name-label");
    });

    it("renders required indicator when FormField is required", () => {
      render(
        <FormField id="field-required" required>
          <FormLabel>Username</FormLabel>
        </FormField>
      );
      const label = screen.getByText(/Username/);
      expect(label).toBeInTheDocument();
      expect(label.querySelector(".ChellaaFormLabel-requiredAsterisk")).toHaveTextContent("*");
    });

    it("allows overriding required indicator directly on FormLabel", () => {
      render(
        <FormField id="field-not-req">
          <FormLabel required>Direct Required</FormLabel>
        </FormField>
      );
      const label = screen.getByText(/Direct Required/);
      expect(label.querySelector(".ChellaaFormLabel-requiredAsterisk")).toHaveTextContent("*");
    });

    it("supports asChild on FormLabel", () => {
      render(
        <FormField id="slotted-label">
          <FormLabel asChild>
            <span data-testid="span-label">Label inside span</span>
          </FormLabel>
        </FormField>
      );
      const span = screen.getByTestId("span-label");
      expect(span.tagName).toBe("SPAN");
      expect(span).toHaveAttribute("id", "slotted-label-label");
    });
  });

  // ---------------------------------------------------------------------------
  // 4. FormHelperText & FormErrorMessage Primitives
  // ---------------------------------------------------------------------------
  describe("FormHelperText & FormErrorMessage", () => {
    it("renders helper text with correct id derived from context", () => {
      render(
        <FormField id="email-field">
          <FormHelperText>Helpful message</FormHelperText>
        </FormField>
      );
      const helper = screen.getByText("Helpful message");
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveAttribute("id", "email-field-helper");
    });

    it("does not render error message when error is false and forceMount is false", () => {
      render(
        <FormField id="error-field" error={false}>
          <FormErrorMessage>Field has error</FormErrorMessage>
        </FormField>
      );
      expect(screen.queryByText("Field has error")).not.toBeInTheDocument();
    });

    it("renders error message with role='alert' when error is true", () => {
      render(
        <FormField id="error-field" error={true}>
          <FormErrorMessage>Field has error</FormErrorMessage>
        </FormField>
      );
      const errorMsg = screen.getByRole("alert");
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveTextContent("Field has error");
      expect(errorMsg).toHaveAttribute("id", "error-field-error");
      expect(errorMsg).toHaveAttribute("aria-live", "polite");
    });

    it("renders error message when forceMount is true even if error is false", () => {
      render(
        <FormField id="error-field" error={false}>
          <FormErrorMessage forceMount>Forced error</FormErrorMessage>
        </FormField>
      );
      const errorMsg = screen.getByRole("alert");
      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveTextContent("Forced error");
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Automated Form Control Cascade (Input & Textarea)
  // ---------------------------------------------------------------------------
  describe("Automated Cascade with Input & Textarea", () => {
    it("cascades id, required, disabled, and composite aria-describedby to Input", () => {
      render(
        <FormField id="user-email" required disabled>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter email" />
          <FormHelperText>We keep this private.</FormHelperText>
        </FormField>
      );

      const input = screen.getByPlaceholderText("Enter email");
      expect(input).toHaveAttribute("id", "user-email");
      expect(input).toBeRequired();
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("aria-describedby", "user-email-helper");
    });

    it("cascades error state and aria-describedby containing error message ID when error is true", () => {
      render(
        <FormField id="validated-input" error>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter email" />
          <FormHelperText>Helper text.</FormHelperText>
          <FormErrorMessage>Invalid email address.</FormErrorMessage>
        </FormField>
      );

      const input = screen.getByPlaceholderText("Enter email");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute(
        "aria-describedby",
        "validated-input-error validated-input-helper"
      );
    });

    it("cascades id, required, and composite aria-describedby to Textarea", () => {
      render(
        <FormField id="bio-field" required error>
          <FormLabel>Bio</FormLabel>
          <Textarea placeholder="Tell us about yourself" />
          <FormErrorMessage>Bio is required.</FormErrorMessage>
          <FormHelperText>Maximum 500 characters.</FormHelperText>
        </FormField>
      );

      const textarea = screen.getByPlaceholderText("Tell us about yourself");
      expect(textarea).toHaveAttribute("id", "bio-field");
      expect(textarea).toBeRequired();
      expect(textarea).toHaveAttribute("aria-invalid", "true");
      expect(textarea).toHaveAttribute(
        "aria-describedby",
        "bio-field-error bio-field-helper"
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Accessibility Audits (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility (Axe Audits)", () => {
    it("passes accessibility audit for complete field with label, input, and helper text", async () => {
      const { container } = render(
        <ThemeProvider>
          <FormField id="a11y-valid-field" required>
            <FormLabel>Work Email</FormLabel>
            <Input type="email" placeholder="work@corp.com" />
            <FormHelperText>Your primary company email address.</FormHelperText>
          </FormField>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes accessibility audit for field in error state with alert message", async () => {
      const { container } = render(
        <ThemeProvider>
          <FormField id="a11y-error-field" required error>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Pick a username" />
            <FormErrorMessage>Username is already taken.</FormErrorMessage>
          </FormField>
        </ThemeProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
