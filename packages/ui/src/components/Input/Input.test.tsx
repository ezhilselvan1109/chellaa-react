import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders correctly with default props", () => {
    render(<Input placeholder="Enter username" />);
    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("ch-input", "ch-input--md");
  });

  it("handles invalid and disabled states", () => {
    render(<Input placeholder="Invalid input" invalid disabled />);
    const input = screen.getByPlaceholderText("Invalid input");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("ch-input--invalid");
  });
});
