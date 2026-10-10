import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Flex } from "./Flex";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Flex Component", () => {
  it("renders a horizontal flex row by default", () => {
    render(
      <Flex data-testid="flex-root">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const elem = screen.getByTestId("flex-root");
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveClass("cl-flex", "cl-flex--row");
    expect(elem.children.length).toBe(2);
  });

  it("supports center shorthand for perfect centering", () => {
    render(
      <Flex center data-testid="flex-center">
        <span>Centered</span>
      </Flex>
    );

    const elem = screen.getByTestId("flex-center");
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveClass("cl-flex", "cl-flex--center");
    expect(elem).not.toHaveAttribute("center");
  });

  it("supports inline shorthand for inline-flex", () => {
    render(
      <Flex inline data-testid="flex-inline">
        <span>Inline</span>
      </Flex>
    );

    const elem = screen.getByTestId("flex-inline");
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveClass("cl-flex", "cl-flex--inline");
    expect(elem).not.toHaveAttribute("inline");
  });

  it("inserts custom divider between children", () => {
    render(
      <Flex
        data-testid="flex-divider"
        divider={<span data-testid="pipe-divider">|</span>}
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    const dividers = screen.getAllByTestId("pipe-divider");
    expect(dividers.length).toBe(1);
  });

  it("supports polymorphism with component / as prop", () => {
    render(
      <Flex component="nav" data-testid="flex-nav">
        <a href="#home">Home</a>
      </Flex>
    );

    const elem = screen.getByTestId("flex-nav");
    expect(elem.tagName).toBe("NAV");
  });

  it("supports asChild composition onto child element", () => {
    render(
      <Flex asChild data-testid="flex-aschild">
        <header>Header Bar</header>
      </Flex>
    );

    const elem = screen.getByTestId("flex-aschild");
    expect(elem.tagName).toBe("HEADER");
  });

  it("applies theme gap and sx styling", () => {
    render(
      <ThemeProvider>
        <Flex
          gap={2}
          sx={{ bgcolor: "background.paper", p: 1 }}
          data-testid="flex-themed"
        >
          <div>First</div>
          <div>Second</div>
        </Flex>
      </ThemeProvider>
    );

    const elem = screen.getByTestId("flex-themed");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("gap");
    expect(elem).not.toHaveAttribute("sx");
  });
});
