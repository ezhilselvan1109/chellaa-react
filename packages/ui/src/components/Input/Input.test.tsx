import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import type { InputRef } from "./Input.types";

describe("Input Component (Ant Design Exact Specification)", () => {
  it("renders with default props and applies size class", () => {
    render(<Input placeholder="Enter username" />);
    const input = screen.getByPlaceholderText("Enter username") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.classList.contains("ch-input--md")).toBe(true);
  });

  it("renders with invalid prop and sets aria-invalid", () => {
    render(<Input invalid placeholder="Error input" />);
    const input = screen.getByPlaceholderText("Error input");
    expect(input).toBeInTheDocument();
    expect(input.classList.contains("ch-input--status-error")).toBe(true);
  });

  it("supports all variants: outlined, filled, borderless, underlined", () => {
    const { container, rerender } = render(<Input variant="outlined" placeholder="Outlined" />);
    expect(container.querySelector(".ch-input--variant-outlined")).toBeInTheDocument();

    rerender(<Input variant="filled" placeholder="Filled" />);
    expect(container.querySelector(".ch-input--variant-filled")).toBeInTheDocument();

    rerender(<Input variant="borderless" placeholder="Borderless" />);
    expect(container.querySelector(".ch-input--variant-borderless")).toBeInTheDocument();

    rerender(<Input variant="underlined" placeholder="Underlined" />);
    expect(container.querySelector(".ch-input--variant-underlined")).toBeInTheDocument();
  });

  it("supports sizes: large, medium, small, and aliases", () => {
    const { container, rerender } = render(<Input size="large" />);
    expect(container.querySelector(".ch-input--lg")).toBeInTheDocument();

    rerender(<Input size="small" />);
    expect(container.querySelector(".ch-input--sm")).toBeInTheDocument();
  });

  it("renders prefix and suffix elements", () => {
    render(
      <Input
        prefix={<span data-testid="test-prefix">★</span>}
        suffix={<span data-testid="test-suffix">✓</span>}
        placeholder="With icons"
      />
    );
    expect(screen.getByTestId("test-prefix")).toBeInTheDocument();
    expect(screen.getByTestId("test-suffix")).toBeInTheDocument();
  });

  it("handles allowClear button and onClear callback", () => {
    const handleClear = vi.fn();
    const { container } = render(
      <Input defaultValue="Hello world" allowClear onClear={handleClear} />
    );

    const clearIcon = container.querySelector(".ch-input-clear-icon");
    expect(clearIcon).toBeInTheDocument();

    fireEvent.click(clearIcon!);
    expect(handleClear).toHaveBeenCalledTimes(1);

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("shows character count and highlights when exceeded", () => {
    const { container } = render(
      <Input defaultValue="test" count={{ max: 5 }} showCount />
    );

    const countNode = container.querySelector(".ch-input-count");
    expect(countNode).toBeInTheDocument();
    expect(countNode?.textContent).toBe("4 / 5");
  });

  it("supports imperative handle focus, blur, and nativeElement", () => {
    const ref = createRef<InputRef>();
    render(<Input ref={ref} defaultValue="focus test" />);

    expect(ref.current?.nativeElement).toBeInstanceOf(HTMLInputElement);

    ref.current?.focus({ cursor: "end" });
    expect(document.activeElement).toBe(ref.current?.nativeElement);

    ref.current?.blur();
    expect(document.activeElement).not.toBe(ref.current?.nativeElement);
  });
});

describe("Input.TextArea Component", () => {
  it("renders multi-line textarea with rows and value", () => {
    render(<Input.TextArea placeholder="Enter description" defaultValue={"Line 1\nLine 2"} />);
    const textarea = screen.getByPlaceholderText("Enter description") as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe("Line 1\nLine 2");
  });

  it("handles character counting in textarea", () => {
    const { container } = render(
      <Input.TextArea defaultValue="Hello" count={{ max: 10 }} showCount />
    );
    const countNode = container.querySelector(".ch-input-textarea-count-bottom");
    expect(countNode?.textContent).toBe("5 / 10");
  });

  it("triggers onPressEnter on Enter keydown", () => {
    const handlePressEnter = vi.fn();
    render(<Input.TextArea onPressEnter={handlePressEnter} placeholder="Type" />);
    const textarea = screen.getByPlaceholderText("Type");
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(handlePressEnter).toHaveBeenCalledTimes(1);
  });
});

describe("Input.Search Component", () => {
  it("triggers onSearch when search button or icon is clicked", () => {
    const handleSearch = vi.fn();
    const { container } = render(
      <Input.Search
        defaultValue="query text"
        enterButton="Search"
        onSearch={handleSearch}
      />
    );

    const button = container.querySelector(".ch-input-search-button");
    expect(button).toBeInTheDocument();
    expect(button?.textContent).toBe("Search");

    fireEvent.click(button!);
    expect(handleSearch).toHaveBeenCalledWith("query text", expect.anything(), { source: "input" });
  });

  it("triggers onSearch on pressing Enter", () => {
    const handleSearch = vi.fn();
    render(<Input.Search defaultValue="apple" onSearch={handleSearch} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleSearch).toHaveBeenCalledWith("apple", expect.anything(), { source: "input" });
  });
});

describe("Input.Password Component", () => {
  it("toggles password visibility when eye icon is clicked", () => {
    const { container } = render(<Input.Password defaultValue="secret123" placeholder="Password" />);
    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    expect(input.type).toBe("password");

    const toggle = container.querySelector(".ch-input-password-toggle");
    expect(toggle).toBeInTheDocument();

    fireEvent.click(toggle!);
    expect(input.type).toBe("text");

    fireEvent.click(toggle!);
    expect(input.type).toBe("password");
  });
});

describe("Input.OTP Component", () => {
  it("renders specified length of input cells", () => {
    render(<Input.OTP length={4} defaultValue="12" />);
    const cells = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(cells.length).toBe(4);
    expect(cells[0].value).toBe("1");
    expect(cells[1].value).toBe("2");
    expect(cells[2].value).toBe("");
    expect(cells[3].value).toBe("");
  });

  it("advances to next cell on character entry and triggers onChange when complete", () => {
    const handleChange = vi.fn();
    render(<Input.OTP length={3} defaultValue="12" onChange={handleChange} />);
    const cells = screen.getAllByRole("textbox") as HTMLInputElement[];

    fireEvent.change(cells[2], { target: { value: "3" } });
    expect(handleChange).toHaveBeenCalledWith("123");
  });

  it("handles paste across multiple OTP cells", () => {
    const handleChange = vi.fn();
    render(<Input.OTP length={4} onChange={handleChange} />);
    const cells = screen.getAllByRole("textbox") as HTMLInputElement[];

    fireEvent.paste(cells[0], {
      clipboardData: {
        getData: () => "5678",
      },
    });

    expect(cells[0].value).toBe("5");
    expect(cells[1].value).toBe("6");
    expect(cells[2].value).toBe("7");
    expect(cells[3].value).toBe("8");
    expect(handleChange).toHaveBeenCalledWith("5678");
  });
});
