import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component (Ant Design Inspired)", () => {
  it("renders with default props and text content", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-type", "default");
    expect(button).toHaveAttribute("data-size", "md");
  });

  it("handles click events and triggers click wave effect", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button.className).toContain("ch-btn--waving");
  });

  it("renders all Ant Design 5 types", () => {
    const types = ["primary", "default", "dashed", "text", "link"] as const;

    types.forEach((type) => {
      const { unmount } = render(<Button type={type}>{type}</Button>);
      const button = screen.getByRole("button", { name: type });
      expect(button).toHaveAttribute("data-type", type);
      expect(button.className).toContain(`ch-btn--${type}`);
      unmount();
    });
  });

  it("supports danger modifier across types", () => {
    render(
      <Button type="primary" danger>
        Delete
      </Button>
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button.className).toContain("ch-btn--danger");
  });

  it("supports ghost modifier", () => {
    render(
      <Button type="primary" ghost>
        Ghost Button
      </Button>
    );

    const button = screen.getByRole("button", { name: "Ghost Button" });
    expect(button.className).toContain("ch-btn--ghost");
  });

  it("supports shapes: circle and round", () => {
    const { unmount: unmount1 } = render(<Button shape="circle">🔍</Button>);
    expect(screen.getByRole("button").className).toContain("ch-btn--shape-circle");
    unmount1();

    const { unmount: unmount2 } = render(<Button shape="round">Rounded</Button>);
    expect(screen.getByRole("button").className).toContain("ch-btn--shape-round");
    unmount2();
  });

  it("supports sizes: small, medium, large", () => {
    const sizes = ["small", "medium", "large"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      const button = screen.getByRole("button", { name: size });
      expect(button.className).toContain(`ch-btn--size-${size === "small" ? "sm" : size === "large" ? "lg" : "md"}`);
      unmount();
    });
  });

  it("supports block property", () => {
    render(<Button block>Full Width Block</Button>);

    const button = screen.getByRole("button", { name: "Full Width Block" });
    expect(button.className).toContain("ch-btn--block");
  });

  it("renders as <a> tag when href is specified", () => {
    render(
      <Button type="link" href="https://ant.design" target="_blank">
        Ant Design Link
      </Button>
    );

    const link = screen.getByRole("link", { name: "Ant Design Link" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://ant.design");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
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
      <Button loading loadingText="Saving..." onClick={handleClick}>
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

  it("supports icon and iconPlacement", () => {
    render(
      <Button
        icon={<span data-testid="test-icon">★</span>}
        iconPlacement="end"
      >
        Favorited
      </Button>
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("automatically injects component styles into document.head", () => {
    render(<Button>Auto Styled</Button>);

    const buttonStyle = document.getElementById("ch-button");
    expect(buttonStyle).toBeInTheDocument();
    expect(buttonStyle?.textContent).toContain(".ch-btn");
  });

  it("supports polymorphic composition via asChild", () => {
    render(
      <Button asChild type="primary">
        <a href="/dashboard">Dashboard Link</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Dashboard Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/dashboard");
    expect(link).toHaveAttribute("data-type", "primary");
    expect(link.tagName).toBe("A");
  });

  it("forwards ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>Ref Target</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe("Ref Target");
  });
});
