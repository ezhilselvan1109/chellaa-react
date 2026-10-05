import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Grid } from "./Grid";
import { ThemeProvider } from "../../theme/ThemeProvider";

describe("Grid Component", () => {
  it("renders a container grid with children", () => {
    render(
      <Grid container data-testid="grid-container">
        <Grid item xs={12} data-testid="grid-item-1">Item 1</Grid>
        <Grid item xs={12} data-testid="grid-item-2">Item 2</Grid>
      </Grid>
    );

    const container = screen.getByTestId("grid-container");
    expect(container).toBeInTheDocument();
    expect(container.children.length).toBe(2);
  });

  it("handles responsive column spans (xs, sm, md, lg, xl)", () => {
    render(
      <Grid item xs={12} sm={6} md={4} data-testid="responsive-item">
        Responsive Item
      </Grid>
    );

    const item = screen.getByTestId("responsive-item");
    expect(item).toBeInTheDocument();
    expect(item).not.toHaveAttribute("xs");
    expect(item).not.toHaveAttribute("sm");
    expect(item).not.toHaveAttribute("md");
  });

  it("handles boolean true for flex-grow and auto for auto-width", () => {
    render(
      <Grid container>
        <Grid item xs={true} data-testid="grow-item">Grow</Grid>
        <Grid item xs="auto" data-testid="auto-item">Auto</Grid>
      </Grid>
    );

    expect(screen.getByTestId("grow-item")).toBeInTheDocument();
    expect(screen.getByTestId("auto-item")).toBeInTheDocument();
  });

  it("supports polymorphism with component / as prop", () => {
    render(
      <Grid container component="section" data-testid="grid-section">
        <Grid item component="article" data-testid="grid-article">Article</Grid>
      </Grid>
    );

    expect(screen.getByTestId("grid-section").tagName).toBe("SECTION");
    expect(screen.getByTestId("grid-article").tagName).toBe("ARTICLE");
  });

  it("supports asChild composition onto child elements", () => {
    render(
      <Grid container asChild data-testid="grid-aschild">
        <ul>
          <li>Item</li>
        </ul>
      </Grid>
    );

    const elem = screen.getByTestId("grid-aschild");
    expect(elem.tagName).toBe("UL");
  });

  it("applies theme spacing and sx styling", () => {
    render(
      <ThemeProvider>
        <Grid
          container
          spacing={2}
          sx={{ bgcolor: "background.paper", p: 2 }}
          data-testid="grid-themed"
        >
          <Grid item xs={6}>Half</Grid>
        </Grid>
      </ThemeProvider>
    );

    const elem = screen.getByTestId("grid-themed");
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveAttribute("spacing");
    expect(elem).not.toHaveAttribute("sx");
  });
});
