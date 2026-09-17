import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AutoComplete } from "./AutoComplete";
import type { AutoCompleteRef } from "./AutoComplete.types";

describe("AutoComplete Component (Ant Design Specification)", () => {
  const sampleOptions = [
    { label: "Burns Bay Road", value: "Burns Bay Road" },
    { label: "Downing Street", value: "Downing Street" },
    { label: "Wall Street", value: "Wall Street" },
  ];

  it("renders input element with placeholder and default value", () => {
    render(
      <AutoComplete
        placeholder="Enter address"
        defaultValue="Downing"
        options={sampleOptions}
      />
    );

    const input = screen.getByPlaceholderText("Enter address") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Downing");
  });

  it("opens dropdown and filters options when typing", () => {
    render(
      <AutoComplete
        placeholder="Search street"
        options={sampleOptions}
      />
    );

    const input = screen.getByPlaceholderText("Search street");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "wall" } });

    expect(screen.getByText("Wall Street")).toBeInTheDocument();
    expect(screen.queryByText("Downing Street")).not.toBeInTheDocument();
  });

  it("selects an option on click and calls onChange and onSelect", () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();

    render(
      <AutoComplete
        placeholder="Search"
        options={sampleOptions}
        onChange={onChange}
        onSelect={onSelect}
      />
    );

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "burns" } });

    const option = screen.getByText("Burns Bay Road");
    fireEvent.click(option);

    expect(onSelect).toHaveBeenCalledWith(
      "Burns Bay Road",
      expect.objectContaining({ value: "Burns Bay Road" })
    );
    expect(onChange).toHaveBeenCalledWith("Burns Bay Road");
    expect(input.value).toBe("Burns Bay Road");
  });

  it("supports keyboard navigation with ArrowDown, ArrowUp, and Enter", () => {
    const onSelect = vi.fn();

    render(
      <AutoComplete
        placeholder="Search"
        options={sampleOptions}
        onSelect={onSelect}
        defaultActiveFirstOption={false}
      />
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "street" } });

    // Press ArrowDown to select first item (Downing Street)
    fireEvent.keyDown(input, { key: "ArrowDown" });
    // Press ArrowDown again to select second item (Wall Street)
    fireEvent.keyDown(input, { key: "ArrowDown" });
    // Press Enter to confirm
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSelect).toHaveBeenCalledWith(
      "Wall Street",
      expect.objectContaining({ value: "Wall Street" })
    );
  });

  it("supports backfill during keyboard navigation", () => {
    render(
      <AutoComplete
        placeholder="Search"
        options={sampleOptions}
        backfill={true}
        defaultActiveFirstOption={false}
      />
    );

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "street" } });

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.value).toBe("Downing Street");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.value).toBe("Wall Street");
  });

  it("clears value when clear button is clicked", () => {
    const onClear = vi.fn();
    const onChange = vi.fn();

    render(
      <AutoComplete
        placeholder="Search"
        defaultValue="Initial Value"
        allowClear={true}
        onClear={onClear}
        onChange={onChange}
      />
    );

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;
    expect(input.value).toBe("Initial Value");

    const clearBtn = screen.getByLabelText("Clear AutoComplete input");
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);

    expect(onClear).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith("");
    expect(input.value).toBe("");
  });

  it("supports custom clear icon", () => {
    render(
      <AutoComplete
        defaultValue="Test"
        allowClear={{ clearIcon: <span data-testid="custom-clear">X</span> }}
      />
    );

    expect(screen.getByTestId("custom-clear")).toBeInTheDocument();
  });

  it("supports custom input element passed via children", () => {
    render(
      <AutoComplete options={sampleOptions}>
        <textarea data-testid="custom-textarea" placeholder="Multiline input" />
      </AutoComplete>
    );

    const textarea = screen.getByTestId("custom-textarea") as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");

    fireEvent.change(textarea, { target: { value: "Burns" } });
    expect(screen.getByText("Burns Bay Road")).toBeInTheDocument();
  });

  it("renders grouped category options (Certain Category lookup pattern)", () => {
    const groupedOptions = [
      {
        label: "Libraries",
        options: [
          { label: "Ant Design", value: "Ant Design" },
          { label: "Chella UI", value: "Chella UI" },
        ],
      },
      {
        label: "Frameworks",
        options: [
          { label: "React", value: "React" },
          { label: "Next.js", value: "Next.js" },
        ],
      },
    ];

    render(
      <AutoComplete
        placeholder="Type framework"
        options={groupedOptions}
        open={true}
      />
    );

    expect(screen.getByText("Libraries")).toBeInTheDocument();
    expect(screen.getByText("Ant Design")).toBeInTheDocument();
    expect(screen.getByText("Chella UI")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("supports variants, sizes, and validation status", () => {
    const { container } = render(
      <AutoComplete
        variant="filled"
        size="large"
        status="error"
        rootClassName="test-ac"
      />
    );

    const root = container.querySelector(".test-ac");
    expect(root).toHaveClass("ch-autocomplete--filled");
    expect(root).toHaveClass("ch-autocomplete--large");
    expect(root).toHaveClass("ch-autocomplete--status-error");
  });

  it("supports custom semantic DOM styling with object and function", () => {
    const { container } = render(
      <AutoComplete
        size="small"
        classNames={({ props }) => ({
          root: `semantic-root-${props.size}`,
          input: "semantic-input",
        })}
        styles={{
          root: { padding: "4px" },
        }}
      />
    );

    const root = container.querySelector(".semantic-root-small");
    expect(root).toBeInTheDocument();
    expect(root).toHaveStyle({ padding: "4px" });

    const input = container.querySelector(".semantic-input");
    expect(input).toBeInTheDocument();
  });

  it("forwards ref and exposes focus, blur, and nativeElement", () => {
    const ref = React.createRef<AutoCompleteRef>();

    render(<AutoComplete ref={ref} placeholder="Ref test" />);

    expect(ref.current).toBeDefined();
    expect(typeof ref.current?.focus).toBe("function");
    expect(typeof ref.current?.blur).toBe("function");
    expect(ref.current?.nativeElement).toBeInstanceOf(HTMLDivElement);
  });
});
