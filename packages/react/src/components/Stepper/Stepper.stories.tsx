import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";
import type { StepItem } from "./Stepper.types";
import { Button } from "../Button";

const meta: Meta<typeof Stepper> = {
  title: "Components/Navigation/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Progress stepper for multi-step workflows, wizards, onboarding, and forms with horizontal and vertical orientations, completed/current/error states, and interactive steps.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const sampleSteps: StepItem[] = [
  {
    id: "account",
    label: "Account Details",
    description: "Provide credentials and email",
  },
  {
    id: "profile",
    label: "Personal Profile",
    description: "Name, avatar, and bio",
    optional: true,
  },
  {
    id: "billing",
    label: "Billing & Plans",
    description: "Select payment method",
  },
  {
    id: "confirm",
    label: "Confirmation",
    description: "Review and activate",
  },
];

export const Default: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 800 }}>
        <Stepper steps={sampleSteps} defaultActiveStep={1} />
      </div>
    );
  },
};

export const InteractiveControlled: Story = {
  render: () => {
    const [active, setActive] = React.useState<number>(1);

    return (
      <div style={{ maxWidth: 800, display: "flex", flexDirection: "column", gap: 24 }}>
        <Stepper
          steps={sampleSteps}
          activeStep={active}
          onStepChange={(id) => {
            const idx = sampleSteps.findIndex((s) => s.id === id);
            if (idx !== -1) setActive(idx);
          }}
          isClickable
        />

        <div style={{ display: "flex", gap: 12 }}>
          <Button
            variant="outline"
            disabled={active === 0}
            onClick={() => setActive((prev) => Math.max(0, prev - 1))}
          >
            Previous
          </Button>
          <Button
            disabled={active === sampleSteps.length - 1}
            onClick={() => setActive((prev) => Math.min(sampleSteps.length - 1, prev + 1))}
          >
            Next Step
          </Button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 400 }}>
        <Stepper
          steps={sampleSteps}
          orientation="vertical"
          defaultActiveStep={2}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const errorSteps: StepItem[] = [
      { id: 1, label: "Customer Info", description: "Completed successfully" },
      { id: 2, label: "Payment Verification", description: "Card declined by issuer", error: true },
      { id: 3, label: "Order Confirmation", description: "Pending payment" },
    ];

    return (
      <div style={{ maxWidth: 700 }}>
        <Stepper steps={errorSteps} defaultActiveStep={1} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 800 }}>
        <div>
          <h4 style={{ marginBottom: 12 }}>Small Size</h4>
          <Stepper steps={sampleSteps} size="sm" defaultActiveStep={1} />
        </div>
        <div>
          <h4 style={{ marginBottom: 12 }}>Medium Size (Default)</h4>
          <Stepper steps={sampleSteps} size="md" defaultActiveStep={1} />
        </div>
        <div>
          <h4 style={{ marginBottom: 12 }}>Large Size</h4>
          <Stepper steps={sampleSteps} size="lg" defaultActiveStep={1} />
        </div>
      </div>
    );
  },
};
