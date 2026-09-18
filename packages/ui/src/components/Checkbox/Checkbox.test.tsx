import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import type { CheckboxRef } from "./Checkbox.types";

describe("Checkbox Component (Ant Design Specification)", () => {
  it("renders with label content and toggles on click (uncontrolled)", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox defaultChecked={false} onChange={handleChange}>
        Accept Terms
      </Checkbox>
    );

    const checkboxInput = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput.checked).toBe(false);
    expect(screen.getByText("Accept Terms")).toBeInTheDocument();

    // Click to toggle
    fireEvent.click(checkboxInput);
    expect(checkboxInput.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it("respects controlled checked state", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Checkbox checked={false} onChange={handleChange}>
        Controlled Item
      </Checkbox>
    );

    const checkboxInput = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkboxInput.checked).toBe(false);

    fireEvent.click(checkboxInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.checked).toBe(true);

    // Because it's controlled, re-rendering with checked=true updates it
    rerender(
      <Checkbox checked={true} onChange={handleChange}>
        Controlled Item
      </Checkbox>
    );
    expect(checkboxInput.checked).toBe(true);
  });

  it("handles indeterminate state properly", () => {
    const { container } = render(
      <Checkbox indeterminate checked={false}>
        Indeterminate State
      </Checkbox>
    );

    const checkboxInput = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkboxInput.indeterminate).toBe(true);
    expect(container.querySelector(".ch-checkbox--indeterminate")).toBeInTheDocument();
    expect(container.querySelector(".ch-checkbox-wrapper--indeterminate")).toBeInTheDocument();
  });

  it("prevents interaction when disabled", () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Checkbox disabled onChange={handleChange}>
        Disabled Checkbox
      </Checkbox>
    );

    const checkboxInput = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkboxInput.disabled).toBe(true);
    expect(container.querySelector(".ch-checkbox-wrapper--disabled")).toBeInTheDocument();

    fireEvent.click(checkboxInput);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("supports ref methods: focus, blur, and nativeElement", () => {
    const ref = createRef<CheckboxRef>();
    render(<Checkbox ref={ref}>Ref Checkbox</Checkbox>);

    expect(ref.current).toBeDefined();
    expect(ref.current?.nativeElement).toBeInstanceOf(HTMLInputElement);

    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current?.nativeElement);

    ref.current?.blur();
    expect(document.activeElement).not.toBe(ref.current?.nativeElement);
  });

  it("applies semantic DOM classNames and styles (object and function form)", () => {
    const { container, rerender } = render(
      <Checkbox
        classNames={{ root: "custom-root", icon: "custom-icon", label: "custom-label" }}
        styles={{ root: { padding: "10px" }, icon: { opacity: 0.9 }, label: { color: "red" } }}
      >
        Custom Styled
      </Checkbox>
    );

    expect(container.querySelector(".custom-root")).toBeInTheDocument();
    expect(container.querySelector(".custom-icon")).toBeInTheDocument();
    expect(container.querySelector(".custom-label")).toBeInTheDocument();

    // Test function form
    rerender(
      <Checkbox
        classNames={({ props }) => ({
          root: props.disabled ? "fn-disabled" : "fn-root",
        })}
      >
        Function Styled
      </Checkbox>
    );

    expect(container.querySelector(".fn-root")).toBeInTheDocument();
  });
});

describe("Checkbox.Group Component", () => {
  it("renders string and number options", () => {
    const options = ["Apple", "Pear", "Orange"];
    const handleChange = vi.fn();

    render(
      <Checkbox.Group
        options={options}
        defaultValue={["Apple"]}
        onChange={handleChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    expect(checkboxes.length).toBe(3);
    expect(checkboxes[0].checked).toBe(true); // Apple
    expect(checkboxes[1].checked).toBe(false); // Pear
    expect(checkboxes[2].checked).toBe(false); // Orange

    // Click "Pear"
    fireEvent.click(checkboxes[1]);
    expect(handleChange).toHaveBeenCalledWith(["Apple", "Pear"]);
  });

  it("renders complex options with individual disabled states", () => {
    const complexOptions = [
      { label: "Apple", value: "apple" },
      { label: "Pear", value: "pear", disabled: true },
      { label: "Orange", value: "orange" },
    ];

    render(<Checkbox.Group options={complexOptions} defaultValue={["apple"]} />);

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    expect(checkboxes[0].disabled).toBe(false);
    expect(checkboxes[1].disabled).toBe(true);
    expect(checkboxes[2].disabled).toBe(false);
  });

  it("disables all checkboxes when group disabled is true", () => {
    const options = ["One", "Two", "Three"];
    render(<Checkbox.Group options={options} disabled />);

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    checkboxes.forEach((cb) => {
      expect(cb.disabled).toBe(true);
    });
  });

  it("works with child Checkbox components and uncontrolled/controlled value toggle", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox.Group defaultValue={["A"]} onChange={handleChange}>
        <Checkbox value="A">Option A</Checkbox>
        <Checkbox value="B">Option B</Checkbox>
        <Checkbox value="C">Option C</Checkbox>
      </Checkbox.Group>
    );

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);

    // Toggle option B on
    fireEvent.click(checkboxes[1]);
    expect(handleChange).toHaveBeenCalledWith(["A", "B"]);

    // Toggle option A off
    fireEvent.click(checkboxes[0]);
    expect(handleChange).toHaveBeenCalledWith(["B"]);
  });
});
