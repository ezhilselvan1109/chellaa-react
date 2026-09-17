import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component (Ant Design Exact Specification)", () => {
  it("renders with default props and text content", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-type", "default");
    expect(button).toHaveAttribute("data-variant", "outlined");
    expect(button).toHaveAttribute("data-color", "default");
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
      unmount();
    });
  });

  it("supports Ant Design 5.21+ Color and Variant derivation", () => {
    render(
      <Button color="cyan" variant="solid">
        Cyan Solid
      </Button>
    );

    const button = screen.getByRole("button", { name: "Cyan Solid" });
    expect(button.className).toContain("ch-btn--variant-solid");
    expect(button.className).toContain("ch-btn--color-cyan");
    expect(button).toHaveAttribute("data-variant", "solid");
    expect(button).toHaveAttribute("data-color", "cyan");
  });

  it("supports filled variant across colors", () => {
    render(
      <Button color="purple" variant="filled">
        Purple Filled
      </Button>
    );

    const button = screen.getByRole("button", { name: "Purple Filled" });
    expect(button.className).toContain("ch-btn--variant-filled");
    expect(button.className).toContain("ch-btn--color-purple");
  });

  it("supports danger modifier across types", () => {
    render(
      <Button type="primary" danger>
        Delete Action
      </Button>
    );

    const button = screen.getByRole("button", { name: "Delete Action" });
    expect(button.className).toContain("ch-btn--color-danger");
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

  it("supports Semantic DOM customization (classNames and styles)", () => {
    render(
      <Button
        icon={<span>★</span>}
        classNames={{ root: "my-root", icon: "my-icon", content: "my-content" }}
        styles={{ root: { margin: "10px" } }}
      >
        Star
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain("my-root");
    expect(button.style.margin).toBe("10px");
    expect(screen.getByText("★").parentElement?.className).toContain("my-icon");
    expect(screen.getByText("Star").className).toContain("my-content");
  });

  it("automatically inserts space between two Chinese characters by default", () => {
    render(<Button>确定</Button>);
    expect(screen.getByRole("button", { name: "确 定" })).toBeInTheDocument();
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

  it("handles loading state with custom loading icon and aria-busy", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button
        loading={{ icon: <span data-testid="custom-spinner">⌛</span> }}
        loadingText="Saving..."
        onClick={handleClick}
      >
        Save
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
    expect(screen.getByText("Saving...")).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
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

  it("handles circle button and icon-only classes properly without empty content container", () => {
    render(
      <Button
        shape="circle"
        type="primary"
        icon={<span data-testid="test-icon">🔍</span>}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("ch-btn--shape-circle");
    expect(button).toHaveClass("ch-btn--icon-only");
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(button.querySelector(".ch-btn-content")).toBeNull();
  });

  it("triggers radiating wave animation on click", async () => {
    const user = userEvent.setup();
    render(<Button type="primary">Wave Button</Button>);

    const button = screen.getByRole("button", { name: "Wave Button" });
    expect(button.querySelector(".ch-btn-wave")).toBeNull();

    await user.click(button);
    expect(button).toHaveClass("ch-btn--waving");
    expect(button.querySelector(".ch-btn-wave")).toBeInTheDocument();
  });
});
