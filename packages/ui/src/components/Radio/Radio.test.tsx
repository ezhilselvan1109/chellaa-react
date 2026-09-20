import React, { createRef, useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Radio } from "./Radio";
import type { RadioRef } from "./Radio.types";

describe("Radio Component (Ant Design Specification)", () => {
  it("renders with label content and toggles on click (uncontrolled)", () => {
    const handleChange = vi.fn();
    render(
      <Radio defaultChecked={false} onChange={handleChange}>
        Option 1
      </Radio>
    );

    const radioInput = screen.getByRole("radio") as HTMLInputElement;
    expect(radioInput.checked).toBe(false);

    fireEvent.click(radioInput);
    expect(radioInput.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it("controlled mode respects checked prop and triggers onChange", () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Radio
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          Controlled Radio
        </Radio>
      );
    };

    render(<TestComponent />);
    const radioInput = screen.getByRole("radio") as HTMLInputElement;
    expect(radioInput.checked).toBe(false);

    fireEvent.click(radioInput);
    expect(radioInput.checked).toBe(true);
  });

  it("disabled radio does not toggle or fire onChange", () => {
    const handleChange = vi.fn();
    render(
      <Radio disabled onChange={handleChange}>
        Disabled Option
      </Radio>
    );

    const radioInput = screen.getByRole("radio") as HTMLInputElement;
    expect(radioInput.disabled).toBe(true);

    fireEvent.click(radioInput);
    expect(radioInput.checked).toBe(false);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("supports focus() and blur() via ref imperative handle", () => {
    const ref = createRef<RadioRef>();
    render(<Radio ref={ref}>Focusable Radio</Radio>);

    expect(ref.current).toBeDefined();
    expect(ref.current?.nativeElement).toBeInstanceOf(HTMLInputElement);

    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current?.nativeElement);

    ref.current?.blur();
    expect(document.activeElement).not.toBe(ref.current?.nativeElement);
  });

  it("Radio.Group manages selection and emits onChange", () => {
    const handleChange = vi.fn();
    render(
      <Radio.Group defaultValue="a" onChange={handleChange}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
      </Radio.Group>
    );

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
    expect(radios[2].checked).toBe(false);

    fireEvent.click(radios[1]);
    expect(radios[1].checked).toBe(true);
    expect(radios[0].checked).toBe(false);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe("b");
  });

  it("Radio.Group renders from options array with disabled items", () => {
    const options = [
      { label: "Apple", value: "apple" },
      { label: "Pear", value: "pear" },
      { label: "Orange", value: "orange", disabled: true },
    ];

    render(<Radio.Group options={options} defaultValue="apple" />);

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Pear")).toBeInTheDocument();
    expect(screen.getByText("Orange")).toBeInTheDocument();

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(radios[0].checked).toBe(true);
    expect(radios[2].disabled).toBe(true);
  });

  it("Radio.Group passes name prop to all child radios", () => {
    render(
      <Radio.Group name="fruits-group" defaultValue="apple">
        <Radio value="apple">Apple</Radio>
        <Radio value="pear">Pear</Radio>
      </Radio.Group>
    );

    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    radios.forEach((r) => {
      expect(r.name).toBe("fruits-group");
    });
  });

  it("Radio.Group supports vertical orientation and block layout", () => {
    const { container } = render(
      <Radio.Group vertical block defaultValue="1">
        <Radio value="1">1</Radio>
        <Radio value="2">2</Radio>
      </Radio.Group>
    );

    const group = container.querySelector(".ch-radio-group");
    expect(group).toHaveClass("ch-radio-group--vertical");
    expect(group).toHaveClass("ch-radio-group--block");
  });

  it("Radio.Button renders button style with solid and size classes", () => {
    const { container } = render(
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        size="large"
        defaultValue="shanghai"
        options={[
          { label: "Hangzhou", value: "hangzhou" },
          { label: "Shanghai", value: "shanghai" },
        ]}
      />
    );

    const buttons = container.querySelectorAll(".ch-radio-button");
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveClass("ch-radio-button--checked");
    expect(buttons[1]).toHaveClass("ch-radio-button--solid");
    expect(buttons[1]).toHaveClass("ch-radio-button--lg");
  });

  it("supports custom semantic DOM styling with object and function", () => {
    const { container } = render(
      <Radio
        classNames={{ root: "custom-root", icon: "custom-icon", label: "custom-label" }}
        styles={({ props }) => ({
          root: { opacity: props.disabled ? 0.5 : 1 },
          icon: { borderColor: "purple" },
        })}
      >
        Custom Styled
      </Radio>
    );

    const root = container.querySelector(".ch-radio");
    const icon = container.querySelector(".ch-radio-inner");
    const label = container.querySelector(".ch-radio-label");

    expect(root).toHaveClass("custom-root");
    expect(icon).toHaveClass("custom-icon");
    expect(label).toHaveClass("custom-label");
  });
});
