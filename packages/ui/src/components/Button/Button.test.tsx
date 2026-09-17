import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders with default props and text content", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-variant", "primary");
    expect(button).toHaveAttribute("data-size", "md");
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders all variant styles and data attributes", () => {
    const variants = ["primary", "secondary", "outline", "ghost", "danger"] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      const button = screen.getByRole("button", { name: variant });
      expect(button).toHaveAttribute("data-variant", variant);
      unmount();
    });
  });

  it("renders all size scales and data attributes", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      const button = screen.getByRole("button", { name: size });
      expect(button).toHaveAttribute("data-size", size);
      unmount();
    });
  });

  it("supports disabled state and prevents click actions", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled", "true");

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("handles loading state with spinner, aria-busy, and loadingText", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button isLoading loadingText="Saving..." onClick={handleClick}>
        Save
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");
    expect(screen.getByText("Saving...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders leftIcon and rightIcon properly", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Navigate
      </Button>
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("supports fullWidth modifier", () => {
    render(<Button fullWidth>Full Width</Button>);

    const button = screen.getByRole("button", { name: "Full Width" });
    expect(button.className).toContain("ch-btn--full-width");
  });

  it("automatically injects component and token styles into document.head without manual CSS imports", () => {
    render(<Button>Auto Styled</Button>);

    const tokenStyle = document.getElementById("ch-theme-tokens");
    const buttonStyle = document.getElementById("ch-button");

    expect(tokenStyle).toBeInTheDocument();
    expect(buttonStyle).toBeInTheDocument();
    expect(buttonStyle?.textContent).toContain(".ch-btn");
  });

  it("supports polymorphic composition via asChild", () => {
    render(
      <Button asChild variant="outline">
        <a href="/dashboard">Dashboard Link</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Dashboard Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/dashboard");
    expect(link).toHaveAttribute("data-variant", "outline");
    expect(link.tagName).toBe("A");
  });

  it("forwards ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Ref Target</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe("Ref Target");
  });
});
