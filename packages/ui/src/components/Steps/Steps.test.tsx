import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Steps } from "./Steps";

describe("Steps Component (Ant Design Exact Specification)", () => {
  const sampleItems = [
    { title: "Step 1", description: "This is step 1" },
    { title: "Step 2", description: "This is step 2" },
    { title: "Step 3", description: "This is step 3" },
  ];

  it("renders steps with default status calculation based on current", () => {
    const { container } = render(<Steps current={1} items={sampleItems} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();

    const items = container.querySelectorAll(".ch-steps-item");
    expect(items[0]).toHaveClass("ch-steps-item-finish");
    expect(items[1]).toHaveClass("ch-steps-item-process");
    expect(items[2]).toHaveClass("ch-steps-item-wait");
  });

  it("supports compound JSX <Steps.Step> children", () => {
    const { container } = render(
      <Steps current={0}>
        <Steps.Step title="Verification" description="Verify email" />
        <Steps.Step title="Pay" description="Process payment" />
        <Steps.Step title="Done" description="Completed" />
      </Steps>
    );

    expect(screen.getByText("Verification")).toBeInTheDocument();
    expect(screen.getByText("Pay")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();

    const items = container.querySelectorAll(".ch-steps-item");
    expect(items[0]).toHaveClass("ch-steps-item-process");
    expect(items[1]).toHaveClass("ch-steps-item-wait");
  });

  it("fires onChange when clickable steps are clicked", () => {
    const handleChange = vi.fn();
    render(<Steps current={0} onChange={handleChange} items={sampleItems} />);

    const step3 = screen.getByText("Step 3");
    fireEvent.click(step3);

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("does not fire onChange when a disabled step is clicked", () => {
    const handleChange = vi.fn();
    const itemsWithDisabled = [
      { title: "Step 1", description: "Desc 1" },
      { title: "Step 2", description: "Desc 2", disabled: true },
    ];
    render(<Steps current={0} onChange={handleChange} items={itemsWithDisabled} />);

    const step2 = screen.getByText("Step 2");
    fireEvent.click(step2);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders error status on active step when status='error'", () => {
    const { container } = render(<Steps current={1} status="error" items={sampleItems} />);

    const items = container.querySelectorAll(".ch-steps-item");
    expect(items[1]).toHaveClass("ch-steps-item-error");
  });

  it("supports orientation and direction props", () => {
    const { container, rerender } = render(
      <Steps orientation="vertical" items={sampleItems} />
    );
    expect(container.querySelector(".ch-steps")).toHaveClass("ch-steps-vertical");

    rerender(<Steps direction="vertical" items={sampleItems} />);
    expect(container.querySelector(".ch-steps")).toHaveClass("ch-steps-vertical");
  });

  it("supports dot style type", () => {
    const { container } = render(<Steps type="dot" items={sampleItems} />);
    expect(container.querySelector(".ch-steps")).toHaveClass("ch-steps-dot");
  });

  it("supports navigation style type", () => {
    const { container } = render(<Steps type="navigation" items={sampleItems} />);
    expect(container.querySelector(".ch-steps")).toHaveClass("ch-steps-navigation");
  });

  it("supports titlePlacement vertical", () => {
    const { container } = render(
      <Steps titlePlacement="vertical" items={sampleItems} />
    );
    expect(container.querySelector(".ch-steps")).toHaveClass("ch-steps-title-vertical");
  });

  it("renders circular progress percent on active step", () => {
    const { container } = render(
      <Steps current={1} percent={60} items={sampleItems} />
    );
    const circle = container.querySelector(".ch-steps-progress-circle");
    expect(circle).toBeInTheDocument();
  });

  it("collapses hidden steps into ellipsis when maxCount is reached", () => {
    const longItems = [
      { title: "Step 1" },
      { title: "Step 2" },
      { title: "Step 3" },
      { title: "Step 4" },
      { title: "Step 5" },
      { title: "Step 6" },
      { title: "Step 7" },
    ];

    render(<Steps current={0} maxCount={4} items={longItems} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("•••")).toBeInTheDocument();
    expect(screen.getByText("Step 7")).toBeInTheDocument();
  });

  it("supports custom icon and iconRender", () => {
    render(
      <Steps
        items={[
          { title: "Custom Icon", icon: <span data-testid="custom-icon">⭐</span> },
        ]}
      />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("supports semantic DOM classNames and styles", () => {
    const { container } = render(
      <Steps
        items={sampleItems}
        classNames={{
          root: "custom-root-class",
          itemTitle: "custom-title-class",
        }}
      />
    );

    expect(container.querySelector(".custom-root-class")).toBeInTheDocument();
    expect(container.querySelector(".custom-title-class")).toBeInTheDocument();
  });
});
