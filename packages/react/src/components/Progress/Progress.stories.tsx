import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Feedback/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value",
    },
    variant: {
      control: "select",
      options: ["linear", "circular"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size dimensions",
    },
    colorScheme: {
      control: "select",
      options: ["primary", "success", "warning", "danger"],
      description: "Semantic color scheme",
    },
    hasStripe: {
      control: "boolean",
      description: "Displays diagonal stripes",
    },
    isAnimated: {
      control: "boolean",
      description: "Animates stripes",
    },
    showValueLabel: {
      control: "boolean",
      description: "Displays percentage text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    variant: "linear",
    colorScheme: "primary",
    size: "md",
    showValueLabel: true,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Progress {...args} />
    </div>
  ),
};

export const IndeterminateLinear: Story = {
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Progress aria-label="Loading task" />
      <Progress colorScheme="success" aria-label="Uploading file" />
    </div>
  ),
};

export const CircularDeterminate: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <Progress variant="circular" value={25} showValueLabel />
      <Progress variant="circular" value={50} colorScheme="success" showValueLabel />
      <Progress variant="circular" value={75} colorScheme="warning" showValueLabel />
      <Progress variant="circular" value={100} colorScheme="danger" showValueLabel />
    </div>
  ),
};

export const CircularIndeterminate: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <Progress variant="circular" size="xs" aria-label="Syncing xs" />
      <Progress variant="circular" size="sm" aria-label="Syncing sm" />
      <Progress variant="circular" size="md" aria-label="Syncing md" />
      <Progress variant="circular" size="lg" aria-label="Syncing lg" />
    </div>
  ),
};

export const StripedAndAnimated: Story = {
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Progress value={65} hasStripe colorScheme="primary" />
      <Progress value={80} hasStripe isAnimated colorScheme="success" />
    </div>
  ),
};
