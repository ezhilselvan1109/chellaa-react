import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { Slider } from "./Slider";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

describe("Slider Component", () => {
  it("renders with default ARIA attributes and default value", () => {
    render(<Slider aria-label="Volume" defaultValue={25} />);

    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("aria-valuenow", "25");
  });

  it("handles keyboard navigation (ArrowRight, ArrowLeft, Home, End)", () => {
    const handleChange = vi.fn();
    render(
      <Slider
        aria-label="Volume"
        defaultValue={50}
        step={5}
        onChange={handleChange}
      />
    );

    const slider = screen.getByRole("slider", { name: "Volume" });

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith(55);
    expect(slider).toHaveAttribute("aria-valuenow", "55");

    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(handleChange).toHaveBeenCalledWith(50);

    fireEvent.keyDown(slider, { key: "Home" });
    expect(handleChange).toHaveBeenCalledWith(0);

    fireEvent.keyDown(slider, { key: "End" });
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it("handles PageUp and PageDown keyboard steps", () => {
    const handleChange = vi.fn();
    render(
      <Slider
        aria-label="Seek"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        onChange={handleChange}
      />
    );

    const slider = screen.getByRole("slider", { name: "Seek" });

    fireEvent.keyDown(slider, { key: "PageUp" });
    expect(handleChange).toHaveBeenCalledWith(60);

    fireEvent.keyDown(slider, { key: "PageDown" });
    expect(handleChange).toHaveBeenCalledWith(50);
  });

  it("clamps to min and max boundaries", () => {
    const handleChange = vi.fn();
    render(
      <Slider
        aria-label="Rating"
        defaultValue={5}
        min={0}
        max={5}
        step={1}
        onChange={handleChange}
      />
    );

    const slider = screen.getByRole("slider", { name: "Rating" });

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    // Already at max 5, should not exceed
    expect(handleChange).not.toHaveBeenCalled();
    expect(slider).toHaveAttribute("aria-valuenow", "5");

    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("supports controlled mode", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Slider aria-label="Brightness" value={40} onChange={handleChange} />
    );

    const slider = screen.getByRole("slider", { name: "Brightness" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith(41);

    rerender(
      <Slider aria-label="Brightness" value={41} onChange={handleChange} />
    );
    expect(slider).toHaveAttribute("aria-valuenow", "41");
  });

  it("prevents interaction when disabled", () => {
    const handleChange = vi.fn();
    render(
      <Slider
        aria-label="Volume"
        defaultValue={50}
        isDisabled
        onChange={handleChange}
      />
    );

    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("aria-disabled", "true");
    expect(slider).toHaveAttribute("tabindex", "-1");

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders milestone marks and labels", () => {
    render(
      <Slider
        aria-label="Steps"
        min={0}
        max={100}
        marks={[
          { value: 0, label: "Min" },
          { value: 50, label: "Mid" },
          { value: 100, label: "Max" },
        ]}
      />
    );

    expect(screen.getByText("Min")).toBeInTheDocument();
    expect(screen.getByText("Mid")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  it("integrates with FormField for labeling and error description", () => {
    render(
      <FormField id="brightness-field" isInvalid>
        <FormLabel>Brightness</FormLabel>
        <Slider />
        <FormErrorMessage>Too low</FormErrorMessage>
      </FormField>
    );

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-invalid", "true");
    expect(slider).toHaveAttribute("aria-describedby");
    expect(slider).toHaveAttribute("aria-labelledby");
  });

  it("passes axe accessibility tests", async () => {
    const { container } = render(
      <Slider aria-label="Playback speed" defaultValue={50} />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
