import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Paper } from "./Paper";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { createTheme } from "../../theme/createTheme";

describe("Paper Component", () => {
  it("renders an elevated surface container with children and static CSS classes", () => {
    render(<Paper data-testid="paper-root">Surface Content</Paper>);

    const elem = screen.getByTestId("paper-root");
    expect(elem).toBeInTheDocument();
    expect(elem.tagName).toBe("DIV");
    expect(elem).toHaveTextContent("Surface Content");
    expect(elem).toHaveClass("cl-paper");
    expect(elem).toHaveClass("cl-paper--elevation-1");
  });

  it("supports elevation levels from 0 to 24 with static modifier classes", () => {
    render(
      <Paper elevation={4} data-testid="paper-elevated">
        Elevation 4
      </Paper>
    );

    const elem = screen.getByTestId("paper-elevated");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("elevation");
    expect(elem).toHaveClass("cl-paper--elevation-4");
  });

  it("supports outlined variant with static class", () => {
    render(
      <Paper variant="outlined" data-testid="paper-outlined">
        Outlined
      </Paper>
    );

    const elem = screen.getByTestId("paper-outlined");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("variant");
    expect(elem).toHaveClass("cl-paper--outlined");
  });

  it("supports square prop with static class", () => {
    render(
      <Paper square data-testid="paper-square">
        Square
      </Paper>
    );

    const elem = screen.getByTestId("paper-square");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("square");
    expect(elem).toHaveClass("cl-paper--square");
  });

  it("supports polymorphism with component / as prop", () => {
    render(
      <Paper component="article" data-testid="paper-article">
        Article Paper
      </Paper>
    );

    const elem = screen.getByTestId("paper-article");
    expect(elem.tagName).toBe("ARTICLE");
    expect(elem).toHaveClass("cl-paper");
  });

  it("supports asChild composition onto child element", () => {
    render(
      <Paper asChild data-testid="paper-aschild">
        <section>Section Surface</section>
      </Paper>
    );

    const elem = screen.getByTestId("paper-aschild");
    expect(elem.tagName).toBe("SECTION");
    expect(elem).toHaveClass("cl-paper");
  });

  it("applies dynamic sx styling with precedence over static CSS", () => {
    render(
      <ThemeProvider>
        <Paper
          elevation={2}
          sx={{ padding: "24px", backgroundColor: "rgb(255, 0, 0)" }}
          data-testid="paper-sx"
        >
          Dynamic Sx Paper
        </Paper>
      </ThemeProvider>
    );

    const elem = screen.getByTestId("paper-sx");
    expect(elem).toHaveClass("cl-paper");
    expect(elem).toHaveClass("cl-paper--elevation-2");
    expect(elem).not.toHaveAttribute("sx");
  });

  it("renders with dark mode theme overlay", () => {
    const darkTheme = createTheme({ palette: { mode: "dark" } });

    render(
      <ThemeProvider theme={darkTheme}>
        <Paper
          elevation={8}
          sx={{ p: 3 }}
          data-testid="paper-dark"
        >
          Dark Elevated
        </Paper>
      </ThemeProvider>
    );

    const elem = screen.getByTestId("paper-dark");
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveClass("cl-paper--elevation-8");
  });
});
