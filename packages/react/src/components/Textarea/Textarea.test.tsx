import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Textarea } from "./Textarea";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Textarea Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Attributes
  // ---------------------------------------------------------------------------
  describe("Rendering", () => {
    it("renders native textarea inside container with default outlined variant", () => {
      render(
        <Textarea
          placeholder="Enter comments"
          data-testid="textarea-wrapper"
        />
      );
      const textarea = screen.getByPlaceholderText("Enter comments");
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe("TEXTAREA");
      expect(screen.getByTestId("textarea-wrapper")).toBeInTheDocument();
      expect(screen.getByTestId("textarea-wrapper")).not.toHaveAttribute("variant");
      expect(screen.getByTestId("textarea-wrapper")).not.toHaveAttribute("size");
    });

    it("supports controlled value and fires onChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Textarea
          placeholder="Controlled textarea"
          value="Initial text"
          onChange={handleChange}
        />
      );

      const textarea = screen.getByPlaceholderText("Controlled textarea");
      expect(textarea).toHaveValue("Initial text");

      await user.type(textarea, " extra");
      expect(handleChange).toHaveBeenCalled();
    });

    it("supports uncontrolled mode with defaultValue", async () => {
      const user = userEvent.setup();
      render(<Textarea placeholder="Uncontrolled" defaultValue="Default prose" />);

      const textarea = screen.getByPlaceholderText("Uncontrolled");
      expect(textarea).toHaveValue("Default prose");

      await user.type(textarea, " added");
      expect(textarea).toHaveValue("Default prose added");
    });

    it("forwards textareaRef directly to native textarea element", () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea placeholder="Ref check" textareaRef={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.placeholder).toBe("Ref check");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Variants & Sizes
  // ---------------------------------------------------------------------------
  describe("Variants & Sizes", () => {
    it("renders filled, standard, and unstyled variants without DOM leaks", () => {
      const { rerender } = render(
        <Textarea variant="filled" placeholder="Filled" data-testid="wrap" />
      );
      expect(screen.getByTestId("wrap")).toBeInTheDocument();
      expect(screen.getByTestId("wrap")).not.toHaveAttribute("variant");

      rerender(<Textarea variant="standard" placeholder="Standard" data-testid="wrap" />);
      expect(screen.getByTestId("wrap")).not.toHaveAttribute("variant");

      rerender(<Textarea variant="unstyled" placeholder="Unstyled" data-testid="wrap" />);
      expect(screen.getByTestId("wrap")).not.toHaveAttribute("variant");
    });

    it("renders sm, md, lg sizes without leaking to DOM", () => {
      const { rerender } = render(
        <Textarea size="sm" placeholder="Small" data-testid="wrap" />
      );
      expect(screen.getByTestId("wrap")).not.toHaveAttribute("size");

      rerender(<Textarea size="lg" placeholder="Large" data-testid="wrap" />);
      expect(screen.getByTestId("wrap")).not.toHaveAttribute("size");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Auto-Resize & Character Counter
  // ---------------------------------------------------------------------------
  describe("Features", () => {
    it("supports autoResize prop without leaking to DOM", () => {
      render(
        <Textarea
          autoResize
          minRows={4}
          maxRows={8}
          placeholder="Auto expanding"
          data-testid="wrap"
        />
      );
      expect(screen.getByTestId("wrap")).not.toHaveAttribute("autoResize");
    });

    it("displays character count when showCount is true", () => {
      render(
        <Textarea
          showCount
          defaultValue="Hello World"
          placeholder="Counted text"
        />
      );
      expect(screen.getByText("11")).toBeInTheDocument();
    });

    it("formats count with maxLength when both are provided", () => {
      render(
        <Textarea
          showCount
          maxLength={100}
          defaultValue="Testing"
          placeholder="Max length check"
        />
      );
      expect(screen.getByText("7 / 100")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. States & Validation
  // ---------------------------------------------------------------------------
  describe("States & Validation", () => {
    it("sets disabled attribute on native textarea", () => {
      render(<Textarea disabled placeholder="Disabled" />);
      expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
    });

    it("sets aria-invalid when error is true", () => {
      render(<Textarea error placeholder="Error state" />);
      expect(screen.getByPlaceholderText("Error state")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Accessibility (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility", () => {
    it("has zero axe violations for standard textarea with accessible label", async () => {
      const { container } = render(
        <div>
          <label htmlFor="user-bio">User Biography</label>
          <Textarea id="user-bio" placeholder="Write your bio..." />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for autoResize textarea with character counter", async () => {
      const { container } = render(
        <div>
          <label htmlFor="feedback">Feedback</label>
          <Textarea
            id="feedback"
            autoResize
            showCount
            maxLength={250}
            defaultValue="Great library!"
          />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
