import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badges are compact status and category indicators used to highlight attributes, numeric counts, and entity statuses. Supports subtle, solid, and outline variants, spatial sizing scales, status dots, and pill curvature.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["subtle", "solid", "outline"],
      description: "Visual aesthetic treatment of the badge.",
      table: { defaultValue: { summary: "subtle" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spatial sizing scale mapped to baseline tokens.",
      table: { defaultValue: { summary: "md" } },
    },
    colorScheme: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "neutral",
      ],
      description: "Semantic color intent.",
      table: { defaultValue: { summary: "neutral" } },
    },
    isPill: {
      control: "boolean",
      description: "If true, renders with fully rounded pill corners.",
      table: { defaultValue: { summary: "false" } },
    },
    hasDot: {
      control: "boolean",
      description: "If true, renders a small colored status dot before children.",
      table: { defaultValue: { summary: "false" } },
    },
    asChild: {
      control: "boolean",
      description: "If true, delegates rendering to the immediate child element using Slot.",
      table: { defaultValue: { summary: "false" } },
    },
    children: {
      control: "text",
      description: "Badge text content or numeric label.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "New Feature",
    colorScheme: "primary",
    variant: "subtle",
    size: "md",
  },
};

export const AllColorSchemes: Story = {
  render: () => {
    const schemes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info",
      "neutral",
    ] as const;

    return (
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        {schemes.map((scheme) => (
          <Badge key={scheme} colorScheme={scheme}>
            {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
          </Badge>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants = ["subtle", "solid", "outline"] as const;
    const schemes = ["primary", "success", "danger"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {variants.map((variant) => (
          <div key={variant} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ width: "80px", fontSize: "13px", fontWeight: 600 }}>
              {variant}:
            </span>
            {schemes.map((scheme) => (
              <Badge key={scheme} variant={variant} colorScheme={scheme}>
                {scheme}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Badge size="sm" colorScheme="primary">Small (sm)</Badge>
      <Badge size="md" colorScheme="primary">Medium (md)</Badge>
      <Badge size="lg" colorScheme="primary">Large (lg)</Badge>
    </div>
  ),
};

export const Pills: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Badge isPill colorScheme="primary">Primary Pill</Badge>
      <Badge isPill colorScheme="success" variant="solid">Success Pill</Badge>
      <Badge isPill colorScheme="danger" variant="outline">Danger Pill</Badge>
    </div>
  ),
};

export const WithDots: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Badge hasDot colorScheme="success">Online</Badge>
      <Badge hasDot colorScheme="warning">Idle</Badge>
      <Badge hasDot colorScheme="danger">Offline</Badge>
      <Badge hasDot isPill colorScheme="info">Synchronizing</Badge>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Badge asChild colorScheme="primary">
        <a href="#changelog" style={{ textDecoration: "none" }}>v2.4.0 Release</a>
      </Badge>
    </div>
  ),
};
