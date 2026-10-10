import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
          data-testid="native-input"
        />
      );
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe("INPUT");
      expect(input.parentElement).toHaveClass("cl-input");
      expect(input.parentElement).toHaveClass("cl-input--outlined");
      expect(input.parentElement).not.toHaveAttribute("variant");
      expect(input.parentElement).not.toHaveAttribute("size");
    });

    it("renders InputBase directly with input classes", () => {
      render(<InputBase placeholder="Base input" data-testid="base-input" />);
      const input = screen.getByTestId("base-input");
      expect(input).toHaveClass("cl-input__input");
      expect(input.tagName).toBe("INPUT");
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
      const input = screen.getByTestId("inp");
      expect(input.parentElement).toHaveClass("cl-input--filled");
      expect(input.parentElement).not.toHaveAttribute("variant");

      rerender(<Input variant="standard" placeholder="Standard" data-testid="inp" />);
      expect(input.parentElement).toHaveClass("cl-input--standard");
      expect(input.parentElement).not.toHaveAttribute("variant");

      rerender(<Input variant="unstyled" placeholder="Unstyled" data-testid="inp" />);
      expect(input.parentElement).toHaveClass("cl-input--unstyled");
      expect(input.parentElement).not.toHaveAttribute("variant");
    });

    it("renders sm, md, lg sizes without leaking to DOM", () => {
      const { rerender } = render(
        <Input size="sm" placeholder="Small" data-testid="inp" />
      );
      const input = screen.getByTestId("inp");
      expect(input.parentElement).toHaveClass("cl-input--sm");
      expect(input.parentElement).not.toHaveAttribute("size");

      rerender(<Input size="lg" placeholder="Large" data-testid="inp" />);
      expect(input.parentElement).toHaveClass("cl-input--lg");
      expect(input.parentElement).not.toHaveAttribute("size");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Adornments & Clear Button
  // ---------------------------------------------------------------------------
  describe("Adornments & Clear Button", () => {
    it("renders start and end adornments properly", () => {
      render(
        <Input
          placeholder="Amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          endAdornment={<InputAdornment position="end">USD</InputAdornment>}
        />
      );

      expect(screen.getByText("$")).toBeInTheDocument();
      expect(screen.getByText("USD")).toBeInTheDocument();
    });

    it("renders interactive clear button when clearable and text is entered", async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();

      render(
        <Input
          placeholder="Search"
          clearable
          defaultValue="Query"
          onClear={handleClear}
        />
      );

      const clearBtn = screen.getByRole("button", { name: /clear input/i });
      expect(clearBtn).toBeInTheDocument();

      await user.click(clearBtn);
      expect(handleClear).toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Form Field Integration & States
  // ---------------------------------------------------------------------------
  describe("Form Field States", () => {
    it("reflects disabled state on wrapper and native input", () => {
      render(<Input disabled placeholder="Disabled input" data-testid="inp-wrapper" />);
      const input = screen.getByPlaceholderText("Disabled input");
      const wrapper = input.parentElement;

      expect(wrapper).toHaveClass("cl-input--disabled");
      expect(input).toBeDisabled();
    });

    it("reflects error state and aria-invalid on native input", () => {
      render(<Input error placeholder="Error state" data-testid="inp-wrapper" />);
      const input = screen.getByPlaceholderText("Error state");
      const wrapper = input.parentElement;

      expect(wrapper).toHaveClass("cl-input--error");
      expect(input).toHaveAttribute("aria-invalid", "true");
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

  // ---------------------------------------------------------------------------
  // 7. Styling Engine, Theme Integration & sx Precedence
  // ---------------------------------------------------------------------------
  describe("Styling Engine & sx Precedence", () => {
    it("renders inside ThemeProvider and supports dynamic sx overrides", () => {
      render(
        <ThemeProvider>
          <Input
            placeholder="sx test"
            variant="outlined"
            size="lg"
            fullWidth
            sx={{
              borderColor: "rgb(255, 0, 0)",
              backgroundColor: "rgb(0, 255, 0)",
            }}
          />
        </ThemeProvider>
      );

      const input = screen.getByPlaceholderText("sx test");
      const wrapper = input.parentElement;
      expect(wrapper).toHaveClass("cl-input");
      expect(wrapper).toHaveClass("cl-input--outlined");
      expect(wrapper).toHaveClass("cl-input--lg");
      expect(wrapper).toHaveClass("cl-input--full-width");

      // Emotion style tag is generated for dynamic sx overrides
      const styleTags = document.querySelectorAll("style[data-emotion]");
      expect(styleTags.length).toBeGreaterThan(0);
    });
  });
});
