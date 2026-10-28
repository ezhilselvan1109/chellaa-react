import * as React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Skeleton } from "./Skeleton";
import type { SkeletonAnimation, SkeletonVariant } from "./Skeleton.types";

describe("Skeleton Component", () => {
  it("renders with default props (variant=text, animation=pulse, aria-hidden=true)", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");

    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("cl-skeleton", "cl-skeleton--text", "cl-skeleton--pulse");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("renders all supported variants", () => {
    const variants: SkeletonVariant[] = ["text", "circular", "rectangular", "rounded"];

    variants.forEach((variant) => {
      const { unmount } = render(
        <Skeleton data-testid={`skeleton-${variant}`} variant={variant} />,
      );
      const el = screen.getByTestId(`skeleton-${variant}`);
      expect(el).toHaveClass(`cl-skeleton--${variant}`);
      unmount();
    });
  });

  it("renders all supported animation modes", () => {
    const animations: SkeletonAnimation[] = ["pulse", "wave", "none"];

    animations.forEach((anim) => {
      const { unmount } = render(
        <Skeleton data-testid={`skeleton-${anim}`} animation={anim} />,
      );
      const el = screen.getByTestId(`skeleton-${anim}`);
      expect(el).toHaveClass(`cl-skeleton--${anim}`);
      unmount();
    });
  });

  it("formats numeric dimensions as pixel inline styles", () => {
    render(<Skeleton data-testid="dim-numeric" width={120} height={40} />);
    const el = screen.getByTestId("dim-numeric");
    expect(el).toHaveStyle({ width: "120px", height: "40px" });
  });

  it("applies string dimensions directly as inline styles", () => {
    render(<Skeleton data-testid="dim-string" width="100%" height="4rem" />);
    const el = screen.getByTestId("dim-string");
    expect(el).toHaveStyle({ width: "100%", height: "4rem" });
  });

  it("renders placeholder when isLoaded is false and hides children", () => {
    render(
      <Skeleton data-testid="skeleton" isLoaded={false}>
        <span data-testid="child">Real Content</span>
      </Skeleton>,
    );

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
  });

  it("renders children directly when isLoaded is true", () => {
    render(
      <Skeleton data-testid="skeleton" isLoaded={true}>
        <span data-testid="child">Loaded Content</span>
      </Skeleton>,
    );

    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Loaded Content")).toBeInTheDocument();
  });

  it("forwards ref to the placeholder element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} data-testid="ref-skeleton" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByTestId("ref-skeleton"));
  });

  it("passes axe accessibility checks without violations", async () => {
    const { container } = render(
      <div>
        <Skeleton width={200} height={20} />
        <Skeleton variant="circular" width={48} height={48} />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
