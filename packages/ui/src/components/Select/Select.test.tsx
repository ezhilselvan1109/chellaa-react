import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "./Select";
import type { SelectRef } from "./Select.types";

describe("Select Component (Ant Design Exact Specification)", () => {
  const basicOptions = [
    { label: "Jack", value: "jack" },
    { label: "Lucy", value: "lucy" },
    { label: "Disabled", value: "disabled", disabled: true },
    { label: "Yiminghe", value: "yiminghe" },
  ];

  it("renders with placeholder and defaults", () => {
    render(
      <Select
        placeholder="Select a person"
        options={basicOptions}
        style={{ width: 200 }}
      />
    );
    expect(screen.getByText("Select a person")).toBeInTheDocument();
  });

  it("opens dropdown on click and selects an option in single mode", () => {
    const handleChange = vi.fn();
    const handleSelect = vi.fn();

    const { container } = render(
      <Select
        placeholder="Select a person"
        options={basicOptions}
        onChange={handleChange}
        onSelect={handleSelect}
      />
    );

    const trigger = container.querySelector(".ch-select")!;
    fireEvent.click(trigger);

    // Lucy option in dropdown
    const lucyOption = screen.getByText("Lucy");
    expect(lucyOption).toBeInTheDocument();

    // Click Lucy
    fireEvent.click(lucyOption);

    expect(handleChange).toHaveBeenCalledWith("lucy", expect.objectContaining({ value: "lucy", label: "Lucy" }));
    expect(handleSelect).toHaveBeenCalledWith("lucy", expect.objectContaining({ value: "lucy", label: "Lucy" }));

    // Dropdown closes and selected item label shows
    expect(screen.getByText("Lucy")).toBeInTheDocument();
  });

  it("supports JSX <Select.Option> and <Select.OptGroup>", () => {
    const handleChange = vi.fn();

    const { container } = render(
      <Select defaultValue="lucy" onChange={handleChange}>
        <Select.OptGroup label="Manager">
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
        </Select.OptGroup>
        <Select.OptGroup label="Engineer">
          <Select.Option value="yiminghe">yiminghe</Select.Option>
        </Select.OptGroup>
      </Select>
    );

    expect(screen.getByText("Lucy")).toBeInTheDocument();

    // Open dropdown
    const trigger = container.querySelector(".ch-select")!;
    fireEvent.click(trigger);

    // Group labels exist
    expect(screen.getByText("Manager")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();

    // Select yiminghe
    const yimingheOption = screen.getByText("yiminghe");
    fireEvent.click(yimingheOption);
    expect(handleChange).toHaveBeenCalledWith("yiminghe", expect.anything());
  });

  it("supports multiple mode, renders tags, and handles deselect", () => {
    const handleChange = vi.fn();
    const handleDeselect = vi.fn();

    const { container } = render(
      <Select
        mode="multiple"
        defaultValue={["jack"]}
        options={basicOptions}
        onChange={handleChange}
        onDeselect={handleDeselect}
      />
    );

    // Tag for jack is displayed
    expect(screen.getByText("Jack")).toBeInTheDocument();

    // Open dropdown
    const trigger = container.querySelector(".ch-select")!;
    fireEvent.click(trigger);

    // Click Lucy to add to multiple
    const lucyOpt = screen.getByText("Lucy");
    fireEvent.click(lucyOpt);

    expect(handleChange).toHaveBeenCalledWith(
      ["jack", "lucy"],
      expect.arrayContaining([
        expect.objectContaining({ value: "jack" }),
        expect.objectContaining({ value: "lucy" }),
      ])
    );

    // Remove jack tag via close button
    const removeBtn = container.querySelector(".ch-select-tag-remove")!;
    fireEvent.click(removeBtn);

    expect(handleDeselect).toHaveBeenCalledWith("jack");
  });

  it("supports tags mode and creates custom new tag on enter", () => {
    const handleChange = vi.fn();

    const { container } = render(
      <Select
        mode="tags"
        placeholder="Tags Mode"
        options={basicOptions}
        onChange={handleChange}
      />
    );

    const input = container.querySelector("input")!;
    fireEvent.change(input, { target: { value: "NewCustomTag" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(
      ["NewCustomTag"],
      expect.anything()
    );
  });

  it("supports search filtering and custom filterOption", () => {
    const { container } = render(
      <Select
        showSearch
        options={basicOptions}
        filterOption={(input, opt) =>
          Boolean(opt?.label && String(opt.label).toLowerCase().includes(input.toLowerCase()))
        }
      />
    );

    const trigger = container.querySelector(".ch-select")!;
    fireEvent.click(trigger);

    const input = container.querySelector("input")!;
    fireEvent.change(input, { target: { value: "Lu" } });

    // Lucy should match, Jack should not be in filtered dropdown
    expect(screen.getByText("Lucy")).toBeInTheDocument();
    expect(screen.queryByText("Jack")).not.toBeInTheDocument();
  });

  it("enforces maxCount constraint in multiple mode", () => {
    const { container } = render(
      <Select
        mode="multiple"
        defaultValue={["jack", "lucy"]}
        maxCount={2}
        options={basicOptions}
      />
    );

    const trigger = container.querySelector(".ch-select")!;
    fireEvent.click(trigger);

    // Unselected option Yiminghe should be disabled
    const yimingheOption = screen.getByText("Yiminghe").closest("li");
    expect(yimingheOption).toHaveClass("ch-select-item-option-disabled");
  });

  it("supports maxTagCount and maxTagPlaceholder", () => {
    render(
      <Select
        mode="multiple"
        value={["jack", "lucy", "yiminghe"]}
        maxTagCount={1}
        maxTagPlaceholder={(omitted) => `+${omitted.length} more`}
        options={basicOptions}
      />
    );

    expect(screen.getByText("Jack")).toBeInTheDocument();
    expect(screen.getByText("+2 more")).toBeInTheDocument();
  });

  it("supports allowClear to clear selected value", () => {
    const handleClear = vi.fn();
    const handleChange = vi.fn();

    const { container } = render(
      <Select
        allowClear
        defaultValue="jack"
        options={basicOptions}
        onChange={handleChange}
        onClear={handleClear}
      />
    );

    const clearBtn = container.querySelector(".ch-select-clear")!;
    fireEvent.click(clearBtn);

    expect(handleClear).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(undefined, undefined);
  });

  it("renders variants, sizes, and statuses correctly", () => {
    const { container, rerender } = render(
      <Select
        variant="filled"
        size="large"
        status="error"
        options={basicOptions}
      />
    );

    const selectEl = container.querySelector(".ch-select")!;
    expect(selectEl).toHaveClass("ch-select-filled");
    expect(selectEl).toHaveClass("ch-select-lg");
    expect(selectEl).toHaveClass("ch-select-status-error");

    rerender(
      <Select
        variant="underlined"
        size="small"
        status="warning"
        options={basicOptions}
      />
    );
    expect(selectEl).toHaveClass("ch-select-underlined");
    expect(selectEl).toHaveClass("ch-select-sm");
    expect(selectEl).toHaveClass("ch-select-status-warning");
  });

  it("supports custom popupRender and tagRender", () => {
    const { container } = render(
      <Select
        mode="multiple"
        defaultValue={["jack"]}
        options={basicOptions}
        tagRender={(props) => (
          <span className="custom-tag" onClick={props.onClose}>
            Custom: {props.label}
          </span>
        )}
        popupRender={(menu) => (
          <div className="custom-popup-wrapper">
            <div className="custom-header">Header</div>
            {menu}
          </div>
        )}
      />
    );

    expect(screen.getByText("Custom: Jack")).toBeInTheDocument();

    const trigger = container.querySelector(".ch-select")!;
    fireEvent.click(trigger);

    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("exposes imperative focus and blur ref methods", () => {
    const ref = createRef<SelectRef>();
    render(<Select ref={ref} showSearch options={basicOptions} />);

    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.focus).toBe("function");
    expect(typeof ref.current?.blur).toBe("function");
    expect(ref.current?.nativeElement).toBeInstanceOf(HTMLElement);
  });
});
