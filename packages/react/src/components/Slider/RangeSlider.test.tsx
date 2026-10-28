import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { RangeSlider } from "./RangeSlider";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

describe("RangeSlider Component", () => {
  it("renders both thumbs with correct default ARIA attributes", () => {
    render(
      <RangeSlider
        minAriaLabel="Price min"
        maxAriaLabel="Price max"
        defaultValue={[20, 80]}
      />
    );

    const minThumb = screen.getByRole("slider", { name: "Price min" });
    const maxThumb = screen.getByRole("slider", { name: "Price max" });

    expect(minThumb).toBeInTheDocument();
    expect(maxThumb).toBeInTheDocument();

    expect(minThumb).toHaveAttribute("aria-valuenow", "20");
    expect(maxThumb).toHaveAttribute("aria-valuenow", "80");
  });

  it("handles keyboard navigation on lower thumb without crossing", () => {
    const handleChange = vi.fn();
    render(
      <RangeSlider
        defaultValue={[20, 30]}
        minDistance={5}
        step={5}
        onChange={handleChange}
      />
    );

    const minThumb = screen.getByRole("slider", { name: "Minimum value" });

    // Step up
    fireEvent.keyDown(minThumb, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith([25, 30]);

    // Attempt to step up again: upper is 30, minDistance is 5, max allowed for lower is 25
    fireEvent.keyDown(minThumb, { key: "ArrowRight" });
    expect(minThumb).toHaveAttribute("aria-valuenow", "25");

    // Step down
    fireEvent.keyDown(minThumb, { key: "ArrowLeft" });
    expect(handleChange).toHaveBeenCalledWith([20, 30]);
  });

  it("handles keyboard navigation on upper thumb without crossing", () => {
    const handleChange = vi.fn();
    render(
      <RangeSlider
        defaultValue={[20, 30]}
        minDistance={5}
        step={5}
        onChange={handleChange}
      />
    );

    const maxThumb = screen.getByRole("slider", { name: "Maximum value" });

    // Step down: cannot go below 20 + 5 = 25
    fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });
    expect(handleChange).toHaveBeenCalledWith([20, 25]);

    // Attempt to step down again: clamped at 25
    fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });
    expect(maxThumb).toHaveAttribute("aria-valuenow", "25");

    // Step up
    fireEvent.keyDown(maxThumb, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith([20, 30]);
  });

  it("supports Home and End keys on both thumbs", () => {
    const handleChange = vi.fn();
    render(
      <RangeSlider
        defaultValue={[40, 60]}
        min={0}
        max={100}
        minDistance={10}
        onChange={handleChange}
      />
    );

    const minThumb = screen.getByRole("slider", { name: "Minimum value" });
    const maxThumb = screen.getByRole("slider", { name: "Maximum value" });

    // Home on minThumb goes to min (0)
    fireEvent.keyDown(minThumb, { key: "Home" });
    expect(handleChange).toHaveBeenCalledWith([0, 60]);

    // End on minThumb goes to maxThumb - minDistance (50)
    fireEvent.keyDown(minThumb, { key: "End" });
    expect(handleChange).toHaveBeenCalledWith([50, 60]);

    // End on maxThumb goes to max (100)
    fireEvent.keyDown(maxThumb, { key: "End" });
    expect(handleChange).toHaveBeenCalledWith([50, 100]);

    // Home on maxThumb goes to minThumb + minDistance (60)
    fireEvent.keyDown(maxThumb, { key: "Home" });
    expect(handleChange).toHaveBeenCalledWith([50, 60]);
  });

  it("supports controlled mode", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <RangeSlider value={[15, 75]} onChange={handleChange} />
    );

    const minThumb = screen.getByRole("slider", { name: "Minimum value" });
    const maxThumb = screen.getByRole("slider", { name: "Maximum value" });

    expect(minThumb).toHaveAttribute("aria-valuenow", "15");
    expect(maxThumb).toHaveAttribute("aria-valuenow", "75");

    fireEvent.keyDown(minThumb, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith([16, 75]);

    rerender(<RangeSlider value={[20, 80]} onChange={handleChange} />);
    expect(minThumb).toHaveAttribute("aria-valuenow", "20");
    expect(maxThumb).toHaveAttribute("aria-valuenow", "80");
  });

  it("prevents interaction when disabled", () => {
    const handleChange = vi.fn();
    render(
      <RangeSlider defaultValue={[20, 80]} isDisabled onChange={handleChange} />
    );

    const minThumb = screen.getByRole("slider", { name: "Minimum value" });
    const maxThumb = screen.getByRole("slider", { name: "Maximum value" });

    expect(minThumb).toHaveAttribute("aria-disabled", "true");
    expect(minThumb).toHaveAttribute("tabindex", "-1");
    expect(maxThumb).toHaveAttribute("aria-disabled", "true");
    expect(maxThumb).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(minThumb, { key: "ArrowRight" });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("integrates with FormField for invalid state and aria-describedby", () => {
    render(
      <FormField id="price-range" isInvalid>
        <FormLabel>Price Range</FormLabel>
        <RangeSlider />
        <FormErrorMessage>Invalid budget range</FormErrorMessage>
      </FormField>
    );

    const minThumb = screen.getByRole("slider", { name: "Minimum value" });
    const maxThumb = screen.getByRole("slider", { name: "Maximum value" });

    expect(minThumb).toHaveAttribute("aria-invalid", "true");
    expect(minThumb).toHaveAttribute("aria-describedby");
    expect(maxThumb).toHaveAttribute("aria-invalid", "true");
    expect(maxThumb).toHaveAttribute("aria-describedby");
  });

  it("passes axe accessibility tests", async () => {
    const { container } = render(
      <RangeSlider
        minAriaLabel="Budget minimum"
        maxAriaLabel="Budget maximum"
        defaultValue={[100, 500]}
        min={0}
        max={1000}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
