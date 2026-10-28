import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { Stepper } from "./Stepper";
import type { StepItem } from "./Stepper.types";

const testSteps: StepItem[] = [
  {
    id: "step-1",
    label: "Account Details",
    description: "Email & Password",
  },
  {
    id: "step-2",
    label: "Personal Profile",
    description: "Name & Bio",
    optional: true,
  },
  {
    id: "step-3",
    label: "Review & Submit",
    description: "Final confirmation",
  },
];

describe("Stepper Component", () => {
  it("renders steps with correct labels, descriptions, and list structure", () => {
    render(<Stepper steps={testSteps} defaultActiveStep={0} />);

    expect(screen.getByRole("navigation", { name: "Progress" })).toBeInTheDocument();
    expect(screen.getByText("Account Details")).toBeInTheDocument();
    expect(screen.getByText("Email & Password")).toBeInTheDocument();
    expect(screen.getByText("Personal Profile")).toBeInTheDocument();
    expect(screen.getByText("(Optional)")).toBeInTheDocument();
    expect(screen.getByText("Review & Submit")).toBeInTheDocument();
  });

  it("applies aria-current='step' to the active step", () => {
    render(<Stepper steps={testSteps} defaultActiveStep={1} />);

    const stepItems = screen.getAllByRole("listitem");
    expect(stepItems[0]).not.toHaveAttribute("aria-current");
    expect(stepItems[1]).toHaveAttribute("aria-current", "step");
    expect(stepItems[2]).not.toHaveAttribute("aria-current");
  });

  it("displays completed state for prior steps and checkmark icon", () => {
    render(<Stepper steps={testSteps} defaultActiveStep={2} />);

    const stepItems = screen.getAllByRole("listitem");
    expect(stepItems[0]).toHaveClass("cl-stepper__item--completed");
    expect(stepItems[1]).toHaveClass("cl-stepper__item--completed");
    expect(stepItems[2]).toHaveClass("cl-stepper__item--current");
  });

  it("displays error state when step has error: true", () => {
    const errorSteps: StepItem[] = [
      { id: "step-1", label: "Step 1", completed: true },
      { id: "step-2", label: "Step 2", error: true },
      { id: "step-3", label: "Step 3" },
    ];

    render(<Stepper steps={errorSteps} defaultActiveStep={1} />);

    const stepItems = screen.getAllByRole("listitem");
    expect(stepItems[1]).toHaveClass("cl-stepper__item--error");
  });

  it("supports interactive navigation when isClickable is enabled", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();

    render(
      <Stepper
        steps={testSteps}
        defaultActiveStep={0}
        isClickable
        onStepChange={onStepChange}
      />
    );

    const step2Button = screen.getByRole("button", { name: /Personal Profile/i });
    await user.click(step2Button);

    expect(onStepChange).toHaveBeenCalledWith("step-2");
    expect(step2Button).toHaveAttribute("aria-current", "step");
  });

  it("does not allow clicking disabled steps", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();

    const stepsWithDisabled: StepItem[] = [
      { id: "1", label: "Step 1" },
      { id: "2", label: "Step 2", disabled: true },
    ];

    render(
      <Stepper
        steps={stepsWithDisabled}
        defaultActiveStep={0}
        isClickable
        onStepChange={onStepChange}
      />
    );

    const step2Button = screen.getByRole("button", { name: /Step 2/i });
    expect(step2Button).toBeDisabled();

    await user.click(step2Button);
    expect(onStepChange).not.toHaveBeenCalled();
  });

  it("supports controlled activeStep", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();

    const { rerender } = render(
      <Stepper
        steps={testSteps}
        activeStep="step-1"
        isClickable
        onStepChange={onStepChange}
      />
    );

    const stepItems = screen.getAllByRole("listitem");
    expect(stepItems[0]).toHaveAttribute("aria-current", "step");

    const step3Button = screen.getByRole("button", { name: /Review & Submit/i });
    await user.click(step3Button);

    expect(onStepChange).toHaveBeenCalledWith("step-3");

    rerender(
      <Stepper
        steps={testSteps}
        activeStep="step-3"
        isClickable
        onStepChange={onStepChange}
      />
    );

    const updatedItems = screen.getAllByRole("listitem");
    expect(updatedItems[2]).toHaveAttribute("aria-current", "step");
  });

  it("supports vertical orientation", () => {
    render(<Stepper steps={testSteps} orientation="vertical" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("cl-stepper--vertical");
  });

  it("handles out of bound or invalid step values safely", () => {
    render(<Stepper steps={testSteps} activeStep={999} />);
    const stepItems = screen.getAllByRole("listitem");
    // Falls back to step 0
    expect(stepItems[0]).toHaveAttribute("aria-current", "step");
  });

  it("passes axe accessibility checks with 0 violations", async () => {
    const { container } = render(
      <Stepper steps={testSteps} defaultActiveStep={1} isClickable />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
