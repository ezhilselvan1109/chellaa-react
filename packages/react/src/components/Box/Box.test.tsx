import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Box } from "./Box";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Box Component", () => {
  it("renders a div by default with children", () => {
    render(<Box data-testid="box-root">Hello Box</Box>);
    const elem = screen.getByTestId("box-root");
    expect(elem).toBeInTheDocument();
    expect(elem.tagName).toBe("DIV");
    expect(elem).toHaveTextContent("Hello Box");
  });

  it("supports polymorphism with component / as prop", () => {
    render(
      <Box component="section" data-testid="box-section">
        Section Box
      </Box>
    );
    const elem = screen.getByTestId("box-section");
    expect(elem.tagName).toBe("SECTION");
  });

  it("supports asChild composition onto custom element", () => {
    render(
      <Box asChild data-testid="box-link">
        <a href="/test">Linked Box</a>
      </Box>
    );
    const elem = screen.getByTestId("box-link");
    expect(elem.tagName).toBe("A");
    expect(elem).toHaveAttribute("href", "/test");
    expect(elem).toHaveTextContent("Linked Box");
  });

  it("applies sx prop with theme styling", () => {
    render(
      <ThemeProvider>
        <Box
          data-testid="box-styled"
          sx={{
            p: 2,
            bgcolor: "primary.main",
            borderRadius: 2,
          }}
        >
          Styled Content
        </Box>
      </ThemeProvider>
    );
    const elem = screen.getByTestId("box-styled");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("sx");
  });

  it("applies static cl-box class", () => {
    render(<Box data-testid="box-static">Static Box</Box>);
    const elem = screen.getByTestId("box-static");
    expect(elem).toHaveClass("cl-box");
  });

  it("forwards standard HTML attributes and ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Box
        ref={ref}
        id="custom-box"
        role="region"
        aria-label="Test Region"
        data-testid="box-attr"
      >
        Content
      </Box>
    );

    const elem = screen.getByTestId("box-attr");
    expect(elem).toHaveAttribute("id", "custom-box");
    expect(elem).toHaveAttribute("role", "region");
    expect(elem).toHaveAttribute("aria-label", "Test Region");
    expect(elem).toHaveClass("cl-box");
    expect(ref.current).toBe(elem);
  });

  it("passes axe accessibility checks with 0 violations across variants and polymorphism", async () => {
    const { container } = render(
      <main>
        <Box component="section" aria-label="Overview Section">
          <h2>Overview</h2>
          <p>Description text inside accessible box.</p>
        </Box>
        <Box asChild>
          <nav aria-label="Secondary Navigation">
            <a href="#link1">Link 1</a>
          </nav>
        </Box>
      </main>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
