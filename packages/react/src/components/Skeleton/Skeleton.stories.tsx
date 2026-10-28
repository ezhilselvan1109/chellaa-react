import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular", "rounded"],
      description: "Visual shape of the placeholder",
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
      description: "Shimmer / pulse animation mode",
    },
    isLoaded: {
      control: "boolean",
      description: "Toggles between placeholder and content",
    },
    width: {
      control: "text",
      description: "Explicit width",
    },
    height: {
      control: "text",
      description: "Explicit height",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: "text",
    width: 200,
    animation: "pulse",
  },
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: 300 }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
      <Skeleton variant="rectangular" height={120} />
      <Skeleton variant="rounded" height={40} />
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: 260 }}>
      <div>
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Pulse</span>
        <Skeleton animation="pulse" height={30} />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Wave (Shimmer)</span>
        <Skeleton animation="wave" height={30} />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>None (Static)</span>
        <Skeleton animation="none" height={30} />
      </div>
    </div>
  ),
};

export const LoadedToggle: Story = {
  render: (args) => (
    <div style={{ width: 280, padding: "1rem", border: "1px solid #e2e8f0", borderRadius: 8 }}>
      <Skeleton {...args}>
        <div>
          <h4 style={{ margin: "0 0 0.5rem" }}>Jane Doe</h4>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
            Senior Software Architect leading design system engineering.
          </p>
        </div>
      </Skeleton>
    </div>
  ),
  args: {
    isLoaded: false,
    variant: "rectangular",
    height: 70,
  },
};
