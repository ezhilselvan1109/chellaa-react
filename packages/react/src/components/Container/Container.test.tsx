import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Container } from "./Container";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Container Component", () => {
  it("renders a container element centered with children", () => {
    render(
      <Container data-testid="container-root">
        <h1>Container Content</h1>
      </Container>
    );

    const elem = screen.getByTestId("container-root");
    expect(elem).toBeInTheDocument();
    expect(elem.tagName).toBe("DIV");
    expect(elem).toHaveTextContent("Container Content");
    expect(elem).toHaveClass("cl-container", "cl-container--lg");
  });

  it("supports maxWidth prop (sm, md, lg, xl, false)", () => {
    render(
      <Container maxWidth="md" data-testid="container-md">
        Content
      </Container>
    );
    const elem = screen.getByTestId("container-md");
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveClass("cl-container", "cl-container--md");
    expect(elem).not.toHaveAttribute("maxWidth");
  });

  it("supports disableGutters", () => {
    render(
      <Container disableGutters data-testid="container-nogutters">
        Content
      </Container>
    );
    const elem = screen.getByTestId("container-nogutters");
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveClass("cl-container", "cl-container--disable-gutters");
    expect(elem).not.toHaveAttribute("disableGutters");
  });

  it("supports polymorphism with component / as prop", () => {
    render(
      <Container component="main" data-testid="container-main">
        Main Content
      </Container>
    );
    const elem = screen.getByTestId("container-main");
    expect(elem.tagName).toBe("MAIN");
  });

  it("supports asChild composition", () => {
    render(
      <Container asChild data-testid="container-aschild">
        <section>Section Content</section>
      </Container>
    );
    const elem = screen.getByTestId("container-aschild");
    expect(elem.tagName).toBe("SECTION");
  });

  it("applies sx styling and theme context", () => {
    render(
      <ThemeProvider>
        <Container
          maxWidth="lg"
          sx={{ py: 4, bgcolor: "background.paper" }}
          data-testid="container-themed"
        >
          Themed Content
        </Container>
      </ThemeProvider>
    );
    const elem = screen.getByTestId("container-themed");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("sx");
  });

  it("supports fixed prop without leaking to DOM", () => {
    render(
      <Container fixed maxWidth="md" data-testid="container-fixed">
        Fixed Content
      </Container>
    );
    const elem = screen.getByTestId("container-fixed");
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveClass("cl-container", "cl-container--fixed");
    expect(elem).not.toHaveAttribute("fixed");
  });

  it("passes axe accessibility checks with 0 violations", async () => {
    const { container } = render(
      <Container component="main" maxWidth="lg">
        <h1>Accessible Heading</h1>
        <p>Accessible paragraph within container.</p>
      </Container>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
