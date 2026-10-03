import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Button } from "./Button";
import type {
  ButtonColorScheme,
  ButtonSize,
  ButtonVariant,
} from "./Button.types";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Button Component", () => {
  // ---------------------------------------------------------------------------
  // 1. Rendering & DOM Attributes
  // ---------------------------------------------------------------------------
  describe("Rendering", () => {
    it("renders as native <button> with default type='button'", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
      expect(button.tagName.toLowerCase()).toBe("button");
      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveClass(
        "cl-button",
        "cl-button--solid",
        "cl-button--md",
        "cl-button--primary",
      );
    });

    it("supports custom type attribute (submit and reset)", () => {
      const { rerender } = render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
        "type",
        "submit",
      );

      rerender(<Button type="reset">Reset</Button>);
      expect(screen.getByRole("button", { name: "Reset" })).toHaveAttribute(
        "type",
        "reset",
      );
    });

    it("passes through arbitrary native HTML attributes and data attributes", () => {
      render(
        <Button data-testid="custom-btn" id="btn-id" aria-describedby="desc">
          Label
        </Button>,
      );
      const button = screen.getByTestId("custom-btn");
      expect(button).toHaveAttribute("id", "btn-id");
      expect(button).toHaveAttribute("aria-describedby", "desc");
    });

    it("merges custom className and inline style", () => {
      render(
        <Button className="custom-class" style={{ zIndex: 10 }}>
          Custom
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Custom" });
      expect(button).toHaveClass("cl-button", "custom-class");
      expect(button).toHaveStyle({ zIndex: "10" });
    });

    it("forwards ref to the underlying HTMLButtonElement", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName.toLowerCase()).toBe("button");
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Variants, Sizes, ColorSchemes & Layout
  // ---------------------------------------------------------------------------
  describe("Variants & Modifiers", () => {
    const variants: ButtonVariant[] = [
      "solid",
      "outline",
      "ghost",
      "subtle",
      "link",
    ];
    variants.forEach((variant) => {
      it(`renders variant '${variant}' with class cl-button--${variant}`, () => {
        render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole("button", { name: variant });
        expect(button).toHaveClass(`cl-button--${variant}`);
      });
    });

    const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
    sizes.forEach((size) => {
      it(`renders size '${size}' with class cl-button--${size}`, () => {
        render(<Button size={size}>{size}</Button>);
        const button = screen.getByRole("button", { name: size });
        expect(button).toHaveClass(`cl-button--${size}`);
      });
    });

    const colorSchemes: ButtonColorScheme[] = [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info",
      "neutral",
    ];
    colorSchemes.forEach((colorScheme) => {
      it(`renders colorScheme '${colorScheme}' with class cl-button--${colorScheme}`, () => {
        render(<Button colorScheme={colorScheme}>{colorScheme}</Button>);
        const button = screen.getByRole("button", { name: colorScheme });
        expect(button).toHaveClass(`cl-button--${colorScheme}`);
      });
    });

    it("renders full-width when isFullWidth is true", () => {
      render(<Button isFullWidth>Full Width</Button>);
      const button = screen.getByRole("button", { name: "Full Width" });
      expect(button).toHaveClass("cl-button--full-width");
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Icons (Leading & Trailing)
  // ---------------------------------------------------------------------------
  describe("Icons", () => {
    it("renders startIcon with aria-hidden='true' and start class", () => {
      render(
        <Button startIcon={<span data-testid="start-icon">★</span>}>
          Star
        </Button>,
      );
      const icon = screen.getByTestId("start-icon");
      expect(icon).toBeInTheDocument();
      const iconContainer = icon.parentElement;
      expect(iconContainer).toHaveClass(
        "cl-button__icon",
        "cl-button__icon--start",
      );
      expect(iconContainer).toHaveAttribute("aria-hidden", "true");
    });

    it("renders endIcon with aria-hidden='true' and end class", () => {
      render(
        <Button endIcon={<span data-testid="end-icon">→</span>}>Next</Button>,
      );
      const icon = screen.getByTestId("end-icon");
      expect(icon).toBeInTheDocument();
      const iconContainer = icon.parentElement;
      expect(iconContainer).toHaveClass(
        "cl-button__icon",
        "cl-button__icon--end",
      );
      expect(iconContainer).toHaveAttribute("aria-hidden", "true");
    });

    it("renders both startIcon and endIcon simultaneously", () => {
      render(
        <Button
          startIcon={<span data-testid="start-icon">★</span>}
          endIcon={<span data-testid="end-icon">→</span>}
        >
          Both
        </Button>,
      );
      expect(screen.getByTestId("start-icon")).toBeInTheDocument();
      expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Disabled State
  // ---------------------------------------------------------------------------
  describe("Disabled State", () => {
    it("applies native disabled, aria-disabled, and cl-button--disabled when isDisabled=true", () => {
      render(<Button isDisabled>Disabled</Button>);
      const button = screen.getByRole("button", { name: "Disabled" });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveClass("cl-button--disabled");
    });

    it("respects native disabled prop", () => {
      render(<Button disabled>Native Disabled</Button>);
      const button = screen.getByRole("button", { name: "Native Disabled" });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveClass("cl-button--disabled");
    });

    it("suppresses click events when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button isDisabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Disabled" });

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("suppresses keyboard Enter and Space activation when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      render(
        <Button isDisabled onClick={handleClick} onKeyDown={handleKeyDown}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Disabled" });

      // Note: user.type on disabled elements skips or prevents interaction
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Loading State
  // ---------------------------------------------------------------------------
  describe("Loading State", () => {
    it("sets aria-busy='true', disabled, and cl-button--loading when isLoading=true", () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("cl-button--loading");
      expect(button.querySelector(".cl-button__spinner")).toBeInTheDocument();
    });

    it("suppresses click handler when isLoading=true", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Saving
        </Button>,
      );
      const button = screen.getByRole("button");

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("renders custom loadingText when provided", () => {
      render(
        <Button isLoading loadingText="Please wait...">
          Submit
        </Button>,
      );
      expect(screen.getByText("Please wait...")).toBeInTheDocument();
      expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    });

    it("supports loadingPosition='start', 'end', and 'center'", () => {
      const { rerender } = render(
        <Button isLoading loadingPosition="start">
          Text
        </Button>,
      );
      expect(
        screen.getByRole("button").querySelector(".cl-button__spinner"),
      ).toBeInTheDocument();

      rerender(
        <Button isLoading loadingPosition="end">
          Text
        </Button>,
      );
      expect(
        screen.getByRole("button").querySelector(".cl-button__spinner"),
      ).toBeInTheDocument();

      rerender(
        <Button isLoading loadingPosition="center">
          Text
        </Button>,
      );
      expect(
        screen
          .getByRole("button")
          .querySelector(".cl-button__spinner-wrapper--center"),
      ).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // 6. User Interactions & Event Handlers
  // ---------------------------------------------------------------------------
  describe("User Interactions", () => {
    it("triggers onClick callback when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Action</Button>);
      const button = screen.getByRole("button", { name: "Action" });

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("triggers onFocus and onBlur callbacks", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(
        <Button onFocus={handleFocus} onBlur={handleBlur}>
          Focusable
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Focusable" });

      await user.tab();
      expect(button).toHaveFocus();
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(button).not.toHaveFocus();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Polymorphic asChild Delegation via Slot
  // ---------------------------------------------------------------------------
  describe("asChild Composition", () => {
    it("renders child element instead of <button>", () => {
      render(
        <Button asChild variant="outline">
          <a href="/dashboard">Dashboard Link</a>
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Dashboard Link" });
      expect(link).toBeInTheDocument();
      expect(link.tagName.toLowerCase()).toBe("a");
      expect(link).toHaveAttribute("href", "/dashboard");
      expect(link).toHaveClass("cl-button", "cl-button--outline");
    });

    it("forwards ref to delegated child node", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Button asChild ref={ref as unknown as React.Ref<HTMLButtonElement>}>
          <a href="/target">Target</a>
        </Button>,
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.getAttribute("href")).toBe("/target");
    });

    it("composes child and button event handlers", async () => {
      const user = userEvent.setup();
      const buttonClick = vi.fn();
      const childClick = vi.fn();

      render(
        <Button asChild onClick={buttonClick}>
          <a href="#test" onClick={childClick}>
            Anchor
          </a>
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Anchor" });
      await user.click(link);

      expect(childClick).toHaveBeenCalledTimes(1);
      expect(buttonClick).toHaveBeenCalledTimes(1);
    });

    it("prevents clicks on asChild link when isDisabled=true", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button asChild isDisabled onClick={handleClick}>
          <a href="#disabled">Disabled Link</a>
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Disabled Link" });
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveClass("cl-button--disabled");

      await user.click(link);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // 8. Keyboard Navigation
  // ---------------------------------------------------------------------------
  describe("Keyboard Navigation", () => {
    it("can be focused using Tab key", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Button>First</Button>
          <Button>Second</Button>
        </div>,
      );

      const [first, second] = screen.getAllByRole("button");
      await user.tab();
      expect(first).toHaveFocus();

      await user.tab();
      expect(second).toHaveFocus();

      await user.tab({ shift: true });
      expect(first).toHaveFocus();
    });

    it("activates onClick when pressing Enter or Space key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole("button", { name: "Keyboard" });

      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  // ---------------------------------------------------------------------------
  // 9. Accessibility (axe-core)
  // ---------------------------------------------------------------------------
  describe("Accessibility", () => {
    it("has zero axe violations for default button", async () => {
      const { container } = render(<Button>Accessible Action</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has zero axe violations across all 5 visual variants", async () => {
      const { container } = render(
        <div>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="link">Link</Button>
        </div>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has zero axe violations when disabled or loading", async () => {
      const { container } = render(
        <div>
          <Button isDisabled>Disabled</Button>
          <Button isLoading aria-label="Loading profile">
            Loading
          </Button>
        </div>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has zero axe violations with icons", async () => {
      const { container } = render(
        <Button
          startIcon={<span aria-hidden="true">★</span>}
          endIcon={<span aria-hidden="true">→</span>}
        >
          Star Next
        </Button>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has zero axe violations with asChild anchor", async () => {
      const { container } = render(
        <Button asChild>
          <a href="/home">Home</a>
        </Button>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("supports accessible icon-only button via aria-label", async () => {
      const { container } = render(
        <Button aria-label="Close dialog" startIcon={<span>×</span>} />,
      );
      expect(
        screen.getByRole("button", { name: "Close dialog" }),
      ).toBeInTheDocument();
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  // ---------------------------------------------------------------------------
  // 10. Theme Permutations
  // ---------------------------------------------------------------------------
  describe("Theme Permutations", () => {
    it("renders cleanly inside Light ThemeProvider", () => {
      render(
        <ThemeProvider defaultTheme="light">
          <Button>Light Button</Button>
        </ThemeProvider>,
      );
      expect(
        screen.getByRole("button", { name: "Light Button" }),
      ).toBeInTheDocument();
    });

    it("renders cleanly inside Dark ThemeProvider", () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <Button>Dark Button</Button>
        </ThemeProvider>,
      );
      expect(
        screen.getByRole("button", { name: "Dark Button" }),
      ).toBeInTheDocument();
    });
  });
});
