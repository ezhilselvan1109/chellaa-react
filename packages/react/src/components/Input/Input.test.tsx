import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Input, InputBase } from "./Input";
import { TextField } from "./TextField";
import { InputAdornment } from "./InputAdornment";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Input & TextField Components", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Attributes
  // ---------------------------------------------------------------------------
  describe("Input Base & Rendering", () => {
    it("renders native input inside wrapper with default outlined variant", () => {
      render(
        <Input
          placeholder="Enter text"
          data-testid="input-wrapper"
          inputProps={{ "data-testid": "native-input" } as any}
        />
      );
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe("INPUT");
      expect(screen.getByTestId("input-wrapper")).toBeInTheDocument();
      expect(screen.getByTestId("input-wrapper")).not.toHaveAttribute("variant");
      expect(screen.getByTestId("input-wrapper")).not.toHaveAttribute("size");
    });

    it("supports controlled value and fires onChange", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Input
          placeholder="Type here"
          value="Initial"
          onChange={handleChange}
        />
      );

      const input = screen.getByPlaceholderText("Type here");
      expect(input).toHaveValue("Initial");

      await user.type(input, "!");
      expect(handleChange).toHaveBeenCalled();
    });

    it("supports uncontrolled mode with defaultValue", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Uncontrolled" defaultValue="Hello" />);

      const input = screen.getByPlaceholderText("Uncontrolled");
      expect(input).toHaveValue("Hello");

      await user.type(input, " World");
      expect(input).toHaveValue("Hello World");
    });

    it("forwards inputRef directly to native input element", () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Input placeholder="Ref target" inputRef={inputRef} />);

      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
      expect(inputRef.current?.placeholder).toBe("Ref target");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Variants & Sizes
  // ---------------------------------------------------------------------------
  describe("Variants & Sizes", () => {
    it("renders filled, standard, and unstyled variants without DOM leaks", () => {
      const { rerender } = render(
        <Input variant="filled" placeholder="Filled" data-testid="inp" />
      );
      expect(screen.getByTestId("inp")).toBeInTheDocument();
      expect(screen.getByTestId("inp")).not.toHaveAttribute("variant");

      rerender(<Input variant="standard" placeholder="Standard" data-testid="inp" />);
      expect(screen.getByTestId("inp")).not.toHaveAttribute("variant");

      rerender(<Input variant="unstyled" placeholder="Unstyled" data-testid="inp" />);
      expect(screen.getByTestId("inp")).not.toHaveAttribute("variant");
    });

    it("renders sm, md, lg sizes without leaking to DOM", () => {
      const { rerender } = render(
        <Input size="sm" placeholder="Small" data-testid="inp" />
      );
      expect(screen.getByTestId("inp")).not.toHaveAttribute("size");

      rerender(<Input size="lg" placeholder="Large" data-testid="inp" />);
      expect(screen.getByTestId("inp")).not.toHaveAttribute("size");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Adornments & Clear Button
  // ---------------------------------------------------------------------------
  describe("Adornments & Clearable", () => {
    it("renders startAdornment and endAdornment", () => {
      render(
        <Input
          placeholder="Search"
          startAdornment={<span data-testid="start-icon">🔍</span>}
          endAdornment={<span data-testid="end-icon">⌘K</span>}
        />
      );
      expect(screen.getByTestId("start-icon")).toBeInTheDocument();
      expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    });

    it("renders clearable button when text is present and clears on click", async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();

      render(
        <Input
          placeholder="Clearable input"
          defaultValue="Clear me"
          clearable
          onClear={onClear}
        />
      );

      const clearBtn = screen.getByRole("button", { name: "Clear input" });
      expect(clearBtn).toBeInTheDocument();

      await user.click(clearBtn);
      expect(onClear).toHaveBeenCalled();
      expect(screen.getByPlaceholderText("Clearable input")).toHaveValue("");
    });
  });

  // ---------------------------------------------------------------------------
  // 4. States & Validation
  // ---------------------------------------------------------------------------
  describe("States & Validation", () => {
    it("sets disabled attribute on native input", () => {
      render(<Input disabled placeholder="Disabled" />);
      expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
    });

    it("sets aria-invalid when error is true", () => {
      render(<Input error placeholder="Error state" />);
      expect(screen.getByPlaceholderText("Error state")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 5. TextField Composite
  // ---------------------------------------------------------------------------
  describe("TextField Composite", () => {
    it("associates label htmlFor with input id", () => {
      render(<TextField label="Email Address" id="email-field" />);
      const label = screen.getByText("Email Address");
      const input = screen.getByLabelText("Email Address");

      expect(label).toHaveAttribute("for", "email-field");
      expect(input).toHaveAttribute("id", "email-field");
    });

    it("displays required asterisk when required={true}", () => {
      render(<TextField label="Username" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
      expect(screen.getByLabelText(/Username/)).toBeRequired();
    });

    it("displays helper text linked via aria-describedby", () => {
      render(
        <TextField
          id="username"
          label="Username"
          helperText="Choose a unique username"
        />
      );
      const input = screen.getByLabelText("Username");
      const helper = screen.getByText("Choose a unique username");

      expect(helper).toHaveAttribute("id", "username-helper");
      expect(input).toHaveAttribute("aria-describedby", "username-helper");
    });

    it("displays errorMessage when error={true}", () => {
      render(
        <TextField
          label="Password"
          error
          errorMessage="Password is too short"
        />
      );
      expect(screen.getByText("Password is too short")).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/)).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Accessibility (vitest-axe)
  // ---------------------------------------------------------------------------
  describe("Accessibility", () => {
    it("has zero axe violations for TextField composite", async () => {
      const { container } = render(
        <TextField
          label="Work Email"
          type="email"
          placeholder="alex@company.com"
          helperText="We will never share your email."
          required
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has zero axe violations for Input with aria-label and adornment", async () => {
      const { container } = render(
        <Input
          aria-label="Search items"
          placeholder="Search..."
          startAdornment={<InputAdornment position="start">🔍</InputAdornment>}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
