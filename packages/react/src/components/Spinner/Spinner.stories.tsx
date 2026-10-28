import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size dimensions of the spinner",
    },
    colorScheme: {
      control: "select",
      options: ["primary", "neutral", "success", "danger", "warning"],
      description: "Semantic color scheme",
    },
    label: {
      control: "text",
      description: "Accessible screen reader announcement",
    },
    thickness: {
      control: "number",
      description: "Stroke thickness in SVG coordinates",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
    colorScheme: "primary",
    label: "Loading...",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Spinner size="xs" label="Extra Small" />
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" />
      <Spinner size="lg" label="Large" />
      <Spinner size="xl" label="Extra Large" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Spinner colorScheme="primary" label="Primary" />
      <Spinner colorScheme="neutral" label="Neutral" />
      <Spinner colorScheme="success" label="Success" />
      <Spinner colorScheme="danger" label="Danger" />
      <Spinner colorScheme="warning" label="Warning" />
    </div>
  ),
};

export const CustomThickness: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Spinner size="lg" thickness={1.5} label="Thin spinner" />
      <Spinner size="lg" thickness={3} label="Default thickness" />
      <Spinner size="lg" thickness={5} label="Thick spinner" />
    </div>
  ),
};
