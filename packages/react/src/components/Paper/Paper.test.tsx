import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Paper } from "./Paper";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { createTheme } from "../../theme/createTheme";

describe("Paper Component", () => {
  it("renders an elevated surface container with children", () => {
    render(<Paper data-testid="paper-root">Surface Content</Paper>);

    const elem = screen.getByTestId("paper-root");
    expect(elem).toBeInTheDocument();
    expect(elem.tagName).toBe("DIV");
    expect(elem).toHaveTextContent("Surface Content");
  });

  it("supports elevation levels from 0 to 24", () => {
    render(
      <Paper elevation={4} data-testid="paper-elevated">
        Elevation 4
      </Paper>
    );

    const elem = screen.getByTestId("paper-elevated");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("elevation");
  });

  it("supports outlined variant", () => {
    render(
      <Paper variant="outlined" data-testid="paper-outlined">
        Outlined
      </Paper>
    );

    const elem = screen.getByTestId("paper-outlined");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("variant");
  });

  it("supports square prop", () => {
    render(
      <Paper square data-testid="paper-square">
        Square
      </Paper>
    );

    const elem = screen.getByTestId("paper-square");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("square");
  });

  it("supports polymorphism with component / as prop", () => {
    render(
      <Paper component="article" data-testid="paper-article">
        Article Paper
      </Paper>
    );

    const elem = screen.getByTestId("paper-article");
    expect(elem.tagName).toBe("ARTICLE");
  });

  it("supports asChild composition onto child element", () => {
    render(
      <Paper asChild data-testid="paper-aschild">
        <section>Section Surface</section>
      </Paper>
    );

    const elem = screen.getByTestId("paper-aschild");
    expect(elem.tagName).toBe("SECTION");
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
  });
});
