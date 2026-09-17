import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner Component", () => {
  it("renders with role status and accessible label", () => {
    render(<Spinner label="Fetching records..." />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText("Fetching records...")).toBeInTheDocument();
  });

  it("applies custom color and size classes", () => {
    const { container } = render(<Spinner size="lg" color="red" />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});
