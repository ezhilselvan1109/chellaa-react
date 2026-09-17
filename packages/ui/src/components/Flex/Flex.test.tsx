import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Flex } from "./Flex";

describe("Flex Component (Ant Design Specification)", () => {
  it("renders default horizontal flex container with children", () => {
    render(
      <Flex data-testid="test-flex">
        <span>Item 1</span>
        <span>Item 2</span>
      </Flex>
    );

    const flex = screen.getByTestId("test-flex");
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass("ch-flex");
    expect(flex).toHaveClass("ch-flex--horizontal");
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("supports vertical direction via vertical prop and orientation='vertical'", () => {
    const { rerender } = render(
      <Flex vertical data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    let flex = screen.getByTestId("test-flex");
    expect(flex).toHaveClass("ch-flex--vertical");
    expect(flex).not.toHaveClass("ch-flex--horizontal");

    rerender(
      <Flex orientation="vertical" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveClass("ch-flex--vertical");

    // vertical takes priority over orientation
    rerender(
      <Flex vertical={false} orientation="vertical" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveClass("ch-flex--horizontal");
  });

  it("supports wrap boolean and string values", () => {
    const { rerender } = render(
      <Flex wrap data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    let flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ flexWrap: "wrap" });

    rerender(
      <Flex wrap={false} data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ flexWrap: "nowrap" });

    rerender(
      <Flex wrap="wrap-reverse" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ flexWrap: "wrap-reverse" });
  });

  it("supports justify alignment options", () => {
    const { rerender } = render(
      <Flex justify="center" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    let flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ justifyContent: "center" });

    rerender(
      <Flex justify="space-between" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ justifyContent: "space-between" });
  });

  it("supports align cross-axis alignment options", () => {
    const { rerender } = render(
      <Flex align="center" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    let flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ alignItems: "center" });

    rerender(
      <Flex align="flex-start" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ alignItems: "flex-start" });
  });

  it("supports gap presets (small, medium, large)", () => {
    const { rerender } = render(
      <Flex gap="small" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    let flex = screen.getByTestId("test-flex");
    expect(flex).toHaveClass("ch-flex--gap-small");

    rerender(
      <Flex gap="medium" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveClass("ch-flex--gap-medium");

    rerender(
      <Flex gap="large" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveClass("ch-flex--gap-large");
  });

  it("supports custom numeric and string gap sizes", () => {
    const { rerender } = render(
      <Flex gap={20} data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    let flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ gap: "20px" });

    rerender(
      <Flex gap="1.5rem" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ gap: "1.5rem" });
  });

  it("supports flex shorthand property", () => {
    render(
      <Flex flex="1 1 auto" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    const flex = screen.getByTestId("test-flex");
    expect(flex).toHaveStyle({ flex: "1 1 auto" });
  });

  it("supports polymorphic component prop (section, nav, header)", () => {
    const { rerender, container } = render(
      <Flex component="section" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );

    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByTestId("test-flex").tagName.toLowerCase()).toBe("section");

    rerender(
      <Flex component="nav" data-testid="test-flex">
        <span>Item</span>
      </Flex>
    );
    expect(container.querySelector("nav")).toBeInTheDocument();
    expect(screen.getByTestId("test-flex").tagName.toLowerCase()).toBe("nav");
  });

  it("forwards ref to underlying DOM element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref}>Ref Content</Flex>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("ch-flex");
  });
});
