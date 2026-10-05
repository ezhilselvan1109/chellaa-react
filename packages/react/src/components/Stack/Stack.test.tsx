import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Stack Component", () => {
  it("renders a flex container with column direction by default", () => {
    render(
      <Stack data-testid="stack-root">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );

    const elem = screen.getByTestId("stack-root");
    expect(elem).toBeInTheDocument();
    expect(elem.children.length).toBe(2);
  });

  it("renders with horizontal row direction", () => {
    render(
      <Stack direction="row" data-testid="stack-row">
        <span>A</span>
        <span>B</span>
      </Stack>
    );

    const elem = screen.getByTestId("stack-row");
    expect(elem).toBeInTheDocument();
  });

  it("inserts custom divider element between children", () => {
    render(
      <Stack
        data-testid="stack-divider"
        divider={<hr data-testid="custom-hr" />}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
    );

    const hrs = screen.getAllByTestId("custom-hr");
    expect(hrs.length).toBe(2);
  });

  it("supports polymorphism with component / as prop", () => {
    render(
      <Stack component="nav" data-testid="stack-nav">
        <a href="#1">Link 1</a>
        <a href="#2">Link 2</a>
      </Stack>
    );

    const elem = screen.getByTestId("stack-nav");
    expect(elem.tagName).toBe("NAV");
  });

  it("supports asChild composition onto child element", () => {
    render(
      <Stack asChild data-testid="stack-aschild">
        <section>
          <span>Inside Section</span>
        </section>
      </Stack>
    );

    const elem = screen.getByTestId("stack-aschild");
    expect(elem.tagName).toBe("SECTION");
  });

  it("applies responsive spacing and sx styling", () => {
    render(
      <ThemeProvider>
        <Stack
          direction="row"
          spacing={2}
          sx={{ bgcolor: "background.paper", p: 1 }}
          data-testid="stack-themed"
        >
          <div>First</div>
          <div>Second</div>
        </Stack>
      </ThemeProvider>
    );

    const elem = screen.getByTestId("stack-themed");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("spacing");
    expect(elem).not.toHaveAttribute("direction");
    expect(elem).not.toHaveAttribute("sx");
  });
});
