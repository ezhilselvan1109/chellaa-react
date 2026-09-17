import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button Action",
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button isLoading>Loading</Button>
      <Button isLoading loadingText="Saving..." variant="secondary">
        Save
      </Button>
      <Button isLoading variant="outline">
        Outline Loading
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button leftIcon={<span>←</span>}>Back</Button>
      <Button rightIcon={<span>→</span>}>Continue</Button>
      <Button leftIcon={<span>✓</span>} variant="secondary">
        Confirmed
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Button fullWidth variant="primary">
        Full Width Button
      </Button>
    </div>
  ),
};

export const PolymorphicLink: Story = {
  render: () => (
    <Button asChild variant="outline">
      <a href="https://example.com" target="_blank" rel="noreferrer">
        Anchor Link as Button
      </a>
    </Button>
  ),
};
