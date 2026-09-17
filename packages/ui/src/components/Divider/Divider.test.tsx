import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider Component (Ant Design Specification)", () => {
  it("renders default horizontal solid divider with separator role", () => {
    render(<Divider data-testid="default-divider" />);

    const divider = screen.getByTestId("default-divider");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute("role", "separator");
    expect(divider).toHaveClass("ch-divider");
    expect(divider).toHaveClass("ch-divider--horizontal");
    expect(divider).toHaveClass("ch-divider--solid");
  });

  it("supports vertical orientation via orientation prop and vertical shorthand", () => {
    const { rerender } = render(
      <Divider orientation="vertical" data-testid="vertical-divider" />
    );

    let divider = screen.getByTestId("vertical-divider");
    expect(divider).toHaveClass("ch-divider--vertical");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");

    rerender(<Divider vertical data-testid="vertical-divider" />);
    divider = screen.getByTestId("vertical-divider");
    expect(divider).toHaveClass("ch-divider--vertical");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("supports dashed and dotted variants and dashed shorthand", () => {
    const { rerender } = render(<Divider variant="dashed" data-testid="test-divider" />);
    expect(screen.getByTestId("test-divider")).toHaveClass("ch-divider--dashed");

    rerender(<Divider variant="dotted" data-testid="test-divider" />);
    expect(screen.getByTestId("test-divider")).toHaveClass("ch-divider--dotted");

    rerender(<Divider dashed data-testid="test-divider" />);
    expect(screen.getByTestId("test-divider")).toHaveClass("ch-divider--dashed");
  });

  it("renders inner title text with semantic rails", () => {
    render(<Divider>Section Header</Divider>);

    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("ch-divider--with-text");
    expect(divider).toHaveClass("ch-divider--title-center");
    expect(screen.getByText("Section Header")).toBeInTheDocument();
    expect(document.querySelector(".ch-divider-rail--start")).toBeInTheDocument();
    expect(document.querySelector(".ch-divider-rail--end")).toBeInTheDocument();
  });

  it("supports titlePlacement start, end, and aliases left, right", () => {
    const { rerender } = render(
      <Divider titlePlacement="start" data-testid="divider">
        Start Title
      </Divider>
    );
    expect(screen.getByTestId("divider")).toHaveClass("ch-divider--title-start");

    rerender(
      <Divider titlePlacement="left" data-testid="divider">
        Left Title
      </Divider>
    );
    expect(screen.getByTestId("divider")).toHaveClass("ch-divider--title-start");

    rerender(
      <Divider titlePlacement="end" data-testid="divider">
        End Title
      </Divider>
    );
    expect(screen.getByTestId("divider")).toHaveClass("ch-divider--title-end");

    rerender(
      <Divider titlePlacement="right" data-testid="divider">
        Right Title
      </Divider>
    );
    expect(screen.getByTestId("divider")).toHaveClass("ch-divider--title-end");
  });

  it("supports plain typography styling", () => {
    render(<Divider plain data-testid="plain-divider">Plain Text</Divider>);

    const divider = screen.getByTestId("plain-divider");
    expect(divider).toHaveClass("ch-divider--plain");
  });

  it("supports spacing size scales (small, medium, large)", () => {
    const { rerender } = render(<Divider size="small" data-testid="size-divider" />);
    expect(screen.getByTestId("size-divider")).toHaveClass("ch-divider--size-small");

    rerender(<Divider size="medium" data-testid="size-divider" />);
    expect(screen.getByTestId("size-divider")).toHaveClass("ch-divider--size-medium");

    rerender(<Divider size="large" data-testid="size-divider" />);
    expect(screen.getByTestId("size-divider")).toHaveClass("ch-divider--size-large");
  });

  it("supports orientationMargin custom distance", () => {
    render(
      <Divider titlePlacement="start" orientationMargin="50px">
        Custom Spacing
      </Divider>
    );

    const startRail = document.querySelector(".ch-divider-rail--start");
    expect(startRail).toHaveStyle({ width: "50px" });
  });

  it("supports custom semantic DOM classNames and styles", () => {
    render(
      <Divider
        classNames={{ root: "custom-root", rail: "custom-rail", content: "custom-content" }}
        styles={{ content: { letterSpacing: "2px" } }}
      >
        Custom Semantic
      </Divider>
    );

    expect(screen.getByRole("separator")).toHaveClass("custom-root");
    expect(document.querySelector(".ch-divider-rail")).toHaveClass("custom-rail");
    const content = screen.getByText("Custom Semantic");
    expect(content).toHaveClass("custom-content");
    expect(content).toHaveStyle({ letterSpacing: "2px" });
  });
});
