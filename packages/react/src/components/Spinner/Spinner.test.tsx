import * as React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Spinner } from "./Spinner";
import type { SpinnerColorScheme, SpinnerSize } from "./Spinner.types";

describe("Spinner Component", () => {
  it("renders with default props (md, primary, with default status label)", () => {
    render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
    expect(spinner.tagName.toLowerCase()).toBe("svg");
    expect(spinner).toHaveClass("cl-spinner", "cl-spinner--md", "cl-spinner--primary");
    expect(spinner).toHaveAttribute("role", "status");
    expect(spinner).toHaveAttribute("aria-label", "Loading...");
  });

  it("renders all supported sizes", () => {
    const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      const { unmount } = render(<Spinner data-testid={`spinner-${size}`} size={size} />);
      const el = screen.getByTestId(`spinner-${size}`);
      expect(el).toHaveClass(`cl-spinner--${size}`);
      unmount();
    });
  });

  it("renders all supported color schemes", () => {
    const schemes: SpinnerColorScheme[] = ["primary", "neutral", "success", "danger", "warning"];

    schemes.forEach((scheme) => {
      const { unmount } = render(<Spinner data-testid={`spinner-${scheme}`} colorScheme={scheme} />);
      const el = screen.getByTestId(`spinner-${scheme}`);
      expect(el).toHaveClass(`cl-spinner--${scheme}`);
      unmount();
    });
  });

  it("supports custom accessible label", () => {
    render(<Spinner label="Fetching transaction history..." />);
    const status = screen.getByRole("status", { name: "Fetching transaction history..." });
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-label", "Fetching transaction history...");
  });

  it("renders as aria-hidden when label is explicitly empty (decorative)", () => {
    render(<Spinner label="" data-testid="decorative-spinner" />);
    const el = screen.getByTestId("decorative-spinner");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("forwards ref to the underlying SVG element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Spinner ref={ref} data-testid="ref-spinner" />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(ref.current).toBe(screen.getByTestId("ref-spinner"));
  });

  it("supports custom stroke thickness", () => {
    render(<Spinner thickness={5} data-testid="thick-spinner" />);
    const el = screen.getByTestId("thick-spinner");
    const circles = el.querySelectorAll("circle");
    expect(circles[0]).toHaveAttribute("stroke-width", "5");
    expect(circles[1]).toHaveAttribute("stroke-width", "5");
  });

  it("passes axe accessibility checks when rendered with label", async () => {
    const { container } = render(
      <div>
        <Spinner label="Loading items" />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe accessibility checks when rendered as decorative", async () => {
    const { container } = render(
      <div>
        <Spinner label="" />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
