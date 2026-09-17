import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders correctly with default props", () => {
    render(<Badge>New Feature</Badge>);
    const badge = screen.getByText("New Feature");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("ch-badge", "ch-badge--default", "ch-badge--sm");
  });

  it("applies variant and size classes", () => {
    render(
      <Badge variant="success" size="md">
        Active
      </Badge>
    );
    const badge = screen.getByText("Active");
    expect(badge).toHaveClass("ch-badge--success", "ch-badge--md");
  });
});
