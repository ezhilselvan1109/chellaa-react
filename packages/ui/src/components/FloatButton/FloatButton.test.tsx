import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FloatButton } from "./FloatButton";

describe("FloatButton Component (Ant Design Specification)", () => {
  it("renders default float button with circle shape and default type", () => {
    render(<FloatButton icon={<span data-testid="test-icon">★</span>} aria-label="Float action" />);

    const button = screen.getByRole("button", { name: "Float action" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("ch-float-btn");
    expect(button).toHaveClass("ch-float-btn--default");
    expect(button).toHaveClass("ch-float-btn--circle");
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("supports primary type and square shape", () => {
    render(
      <FloatButton
        type="primary"
        shape="square"
        description="Help"
        aria-label="Help button"
      />
    );

    const button = screen.getByRole("button", { name: "Help button" });
    expect(button).toHaveClass("ch-float-btn--primary");
    expect(button).toHaveClass("ch-float-btn--square");
    expect(button).toHaveClass("ch-float-btn--has-content");
    expect(screen.getByText("Help")).toBeInTheDocument();
  });

  it("renders badge dot and count", () => {
    const { rerender } = render(
      <FloatButton badge={{ dot: true }} aria-label="Badged button" />
    );
    expect(document.querySelector(".ch-float-btn-badge-dot")).toBeInTheDocument();

    rerender(
      <FloatButton badge={{ count: 5 }} aria-label="Badged button" />
    );
    expect(document.querySelector(".ch-float-btn-badge-count")).toHaveTextContent("5");

    rerender(
      <FloatButton badge={{ count: 120, overflowCount: 99 }} aria-label="Badged button" />
    );
    expect(document.querySelector(".ch-float-btn-badge-count")).toHaveTextContent("99+");
  });

  it("renders as anchor tag when href is specified", () => {
    render(
      <FloatButton
        href="https://ant.design"
        target="_blank"
        aria-label="Ant Design Link"
      />
    );

    const link = screen.getByRole("link", { name: "Ant Design Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://ant.design");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("handles disabled state and prevents click", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<FloatButton disabled onClick={handleClick} aria-label="Disabled float button" />);
    const button = screen.getByRole("button", { name: "Disabled float button" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("triggers click wave effect on click", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<FloatButton onClick={handleClick} aria-label="Wave float button" />);
    const button = screen.getByRole("button", { name: "Wave float button" });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveClass("ch-float-btn--waving");
    expect(button.querySelector(".ch-float-btn-wave")).toBeInTheDocument();
  });
});

describe("FloatButton.Group", () => {
  it("renders static group and propagates shape to children", () => {
    render(
      <FloatButton.Group shape="square">
        <FloatButton aria-label="Child 1" />
        <FloatButton aria-label="Child 2" />
      </FloatButton.Group>
    );

    const group = screen.getByRole("group");
    expect(group).toHaveClass("ch-float-btn-group");

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveClass("ch-float-btn--square");
    expect(buttons[1]).toHaveClass("ch-float-btn--square");
    expect(buttons[0]).toHaveClass("ch-float-btn--in-group");
  });

  it("supports menu mode with click trigger", async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FloatButton.Group
        trigger="click"
        onOpenChange={handleOpenChange}
        placement="top"
      >
        <FloatButton aria-label="Sub action" />
      </FloatButton.Group>
    );

    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-open", "false");

    const triggerBtn = screen.getByRole("button", { expanded: false });
    await user.click(triggerBtn);

    expect(handleOpenChange).toHaveBeenCalledWith(true);
    expect(group).toHaveAttribute("data-open", "true");
  });

  it("supports controlled open mode", () => {
    const { rerender } = render(
      <FloatButton.Group trigger="click" open={false}>
        <FloatButton aria-label="Sub action" />
      </FloatButton.Group>
    );

    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-open", "false");

    rerender(
      <FloatButton.Group trigger="click" open={true}>
        <FloatButton aria-label="Sub action" />
      </FloatButton.Group>
    );

    expect(group).toHaveAttribute("data-open", "true");
  });
});

describe("FloatButton.BackTop", () => {
  it("renders BackTop and triggers smooth scroll on click", async () => {
    const handleClick = vi.fn();
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <FloatButton.BackTop
        visibilityHeight={0}
        onClick={handleClick}
        showProgress
      />
    );

    const backTop = screen.getByRole("button", { name: "Back to top" });
    expect(backTop).toBeInTheDocument();
    expect(backTop).toHaveClass("ch-float-btn-back-top");
    expect(document.querySelector(".ch-float-btn-progress-ring")).toBeInTheDocument();

    fireEvent.click(backTop);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
