import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Badge } from "./Badge";

describe("Badge Component (SPEC-006)", () => {
  it("FR-BDG-01: renders semantic span and forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Active Status</Badge>);

    const badge = screen.getByText("Active Status");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("cl-badge");
    expect(ref.current).toBe(badge);
  });

  it("FR-BDG-02: applies subtle, solid, outline variant classes", () => {
    const variants = ["subtle", "solid", "outline"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      const badge = screen.getByText(variant);
      expect(badge).toHaveClass(`cl-badge--${variant}`);
      unmount();
    });
  });

  it("FR-BDG-03: applies sm, md, lg size classes", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Badge size={size}>{size}</Badge>);
      const badge = screen.getByText(size);
      expect(badge).toHaveClass(`cl-badge--${size}`);
      unmount();
    });
  });

  it("FR-BDG-04: applies all 7 semantic color scheme modifier classes", () => {
    const colorSchemes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info",
      "neutral",
    ] as const;

    colorSchemes.forEach((colorScheme) => {
      const { unmount } = render(
        <Badge colorScheme={colorScheme}>{colorScheme}</Badge>
      );
      const badge = screen.getByText(colorScheme);
      expect(badge).toHaveClass(`cl-badge--${colorScheme}`);
      unmount();
    });
  });

  it("FR-BDG-05: applies cl-badge--pill when isPill is true", () => {
    const { rerender } = render(<Badge isPill={false}>Pill Test</Badge>);
    let badge = screen.getByText("Pill Test");
    expect(badge).not.toHaveClass("cl-badge--pill");

    rerender(<Badge isPill={true}>Pill Test</Badge>);
    badge = screen.getByText("Pill Test");
    expect(badge).toHaveClass("cl-badge--pill");
  });

  it("FR-BDG-06: renders aria-hidden decorative dot when hasDot is true", () => {
    const { container, rerender } = render(<Badge hasDot={false}>Dot Test</Badge>);
    expect(container.querySelector(".cl-badge__dot")).toBeNull();

    rerender(<Badge hasDot={true}>Dot Test</Badge>);
    const dot = container.querySelector(".cl-badge__dot");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });

  it("FR-BDG-07: delegates rendering to child element via asChild", () => {
    render(
      <Badge asChild colorScheme="success">
        <a href="#link">Link Badge</a>
      </Badge>
    );

    const link = screen.getByRole("link", { name: "Link Badge" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveClass("cl-badge");
    expect(link).toHaveClass("cl-badge--success");
    expect(link).toHaveAttribute("href", "#link");
  });

  it("FR-BDG-08: non-interactive and merges custom className", () => {
    render(<Badge className="custom-test-class">Custom Class</Badge>);
    const badge = screen.getByText("Custom Class");
    expect(badge).toHaveClass("cl-badge");
    expect(badge).toHaveClass("custom-test-class");
  });

  it("NFR-BDG-03: passes axe-core accessibility audit with zero violations", async () => {
    const { container } = render(
      <div>
        <Badge colorScheme="success" hasDot>
          Operational
        </Badge>
        <Badge colorScheme="warning">Degraded</Badge>
        <Badge colorScheme="danger" variant="solid">
          Major Outage
        </Badge>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
