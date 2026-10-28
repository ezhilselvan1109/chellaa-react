import * as React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Progress } from "./Progress";
import type { ProgressColorScheme, ProgressSize } from "./Progress.types";

describe("Progress Component", () => {
  describe("Determinate Linear Progress", () => {
    it("renders with default props and exposes correct ARIA attributes", () => {
      render(<Progress value={40} data-testid="progress" aria-label="Upload progress" />);
      const progress = screen.getByRole("progressbar", { name: "Upload progress" });

      expect(progress).toBeInTheDocument();
      expect(progress).toHaveClass("cl-progress", "cl-progress--linear", "cl-progress--md", "cl-progress--primary");
      expect(progress).toHaveAttribute("aria-valuenow", "40");
      expect(progress).toHaveAttribute("aria-valuemin", "0");
      expect(progress).toHaveAttribute("aria-valuemax", "100");
      expect(progress).toHaveAttribute("aria-valuetext", "40%");

      const bar = progress.querySelector(".cl-progress__bar");
      expect(bar).toHaveStyle({ width: "40%" });
    });

    it("clamps values below min and above max", () => {
      const { rerender } = render(
        <Progress value={-20} min={0} max={100} data-testid="progress" />,
      );
      let progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-valuenow", "0");
      expect(progress.querySelector(".cl-progress__bar")).toHaveStyle({ width: "0%" });

      rerender(<Progress value={150} min={0} max={100} data-testid="progress" />);
      progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-valuenow", "100");
      expect(progress.querySelector(".cl-progress__bar")).toHaveStyle({ width: "100%" });
    });

    it("supports custom min, max, and valueText", () => {
      render(
        <Progress
          value={300}
          min={100}
          max={500}
          valueText="Step 3 of 5"
          data-testid="progress"
        />,
      );
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveAttribute("aria-valuenow", "300");
      expect(progress).toHaveAttribute("aria-valuemin", "100");
      expect(progress).toHaveAttribute("aria-valuemax", "500");
      expect(progress).toHaveAttribute("aria-valuetext", "Step 3 of 5");
      // (300 - 100) / (500 - 100) = 50%
      expect(progress.querySelector(".cl-progress__bar")).toHaveStyle({ width: "50%" });
    });

    it("displays visible value label when showValueLabel is true", () => {
      render(<Progress value={75} showValueLabel />);
      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("applies striped and animated classes when requested", () => {
      render(<Progress value={60} hasStripe isAnimated data-testid="progress" />);
      const bar = screen.getByTestId("progress").querySelector(".cl-progress__bar");
      expect(bar).toHaveClass("cl-progress__bar--striped", "cl-progress__bar--animated");
    });
  });

  describe("Indeterminate Linear Progress", () => {
    it("omits aria-valuenow and aria-valuemin/max when value is undefined", () => {
      render(<Progress aria-label="Loading workspace" data-testid="indeterminate" />);
      const progress = screen.getByRole("progressbar", { name: "Loading workspace" });

      expect(progress).toHaveClass("cl-progress--indeterminate");
      expect(progress).not.toHaveAttribute("aria-valuenow");
      expect(progress).not.toHaveAttribute("aria-valuemin");
      expect(progress).not.toHaveAttribute("aria-valuemax");

      const bar = progress.querySelector(".cl-progress__bar");
      expect(bar).toHaveClass("cl-progress__bar--indeterminate");
    });
  });

  describe("Circular Progress", () => {
    it("renders circular determinate progress with svg and stroke offset", () => {
      render(
        <Progress
          variant="circular"
          value={50}
          showValueLabel
          aria-label="Battery level"
          data-testid="circular"
        />,
      );
      const progress = screen.getByRole("progressbar", { name: "Battery level" });
      expect(progress).toHaveClass("cl-progress--circular");
      expect(progress).toHaveAttribute("aria-valuenow", "50");

      const svg = progress.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(screen.getByText("50%")).toBeInTheDocument();
    });

    it("renders circular indeterminate mode without aria-valuenow", () => {
      render(
        <Progress
          variant="circular"
          aria-label="Processing order"
          data-testid="circular-indet"
        />,
      );
      const progress = screen.getByRole("progressbar", { name: "Processing order" });
      expect(progress).toHaveClass("cl-progress--circular", "cl-progress--indeterminate");
      expect(progress).not.toHaveAttribute("aria-valuenow");
    });
  });

  describe("Variants, Sizes & Color Schemes", () => {
    it("renders all supported sizes", () => {
      const sizes: ProgressSize[] = ["xs", "sm", "md", "lg"];
      sizes.forEach((size) => {
        const { unmount } = render(
          <Progress data-testid={`prog-${size}`} size={size} value={50} />,
        );
        expect(screen.getByTestId(`prog-${size}`)).toHaveClass(`cl-progress--${size}`);
        unmount();
      });
    });

    it("renders all supported color schemes", () => {
      const schemes: ProgressColorScheme[] = ["primary", "success", "warning", "danger"];
      schemes.forEach((colorScheme) => {
        const { unmount } = render(
          <Progress data-testid={`prog-${colorScheme}`} colorScheme={colorScheme} value={50} />,
        );
        expect(screen.getByTestId(`prog-${colorScheme}`)).toHaveClass(`cl-progress--${colorScheme}`);
        unmount();
      });
    });
  });

  describe("Edge cases and Math Safety", () => {
    it("safely handles invalid ranges where min >= max without crashing", () => {
      render(<Progress value={50} min={100} max={50} data-testid="invalid-range" />);
      const progress = screen.getByTestId("invalid-range");
      expect(progress).toBeInTheDocument();
      // Should not throw or generate NaN width
      const bar = progress.querySelector(".cl-progress__bar");
      expect(bar?.getAttribute("style")).not.toContain("NaN");
    });

    it("safely handles NaN value prop by treating it as indeterminate", () => {
      render(<Progress value={NaN} aria-label="Syncing" />);
      const progress = screen.getByRole("progressbar");
      expect(progress).toHaveClass("cl-progress--indeterminate");
      expect(progress).not.toHaveAttribute("aria-valuenow");
    });

    it("forwards ref to the container element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={25} data-testid="ref-prog" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByTestId("ref-prog"));
    });
  });

  describe("Accessibility (axe-core)", () => {
    it("passes axe checks for determinate linear progress", async () => {
      const { container } = render(
        <Progress value={60} aria-label="Storage capacity" showValueLabel />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe checks for indeterminate linear progress", async () => {
      const { container } = render(
        <Progress aria-label="Loading assets" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("passes axe checks for circular progress", async () => {
      const { container } = render(
        <Progress variant="circular" value={75} aria-label="Download progress" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
