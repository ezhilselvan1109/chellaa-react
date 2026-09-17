import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    color: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <Spinner size="md" color="#2563eb" />
      <Spinner size="md" color="#10b981" />
      <Spinner size="md" color="#f59e0b" />
      <Spinner size="md" color="#e11d48" />
    </div>
  ),
};
