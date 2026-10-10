import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pagination } from "./Pagination";
import type { PaginationSize, PaginationVariant } from "./Pagination.types";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    total: {
      control: "number",
      description: "Total number of items in the dataset.",
      table: {
        defaultValue: { summary: "100" },
      },
    },
    pageSize: {
      control: "number",
      description: "Number of items per page.",
      table: {
        defaultValue: { summary: "10" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Dimension scale: sm (28px), md (36px, default), lg (44px).",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "select",
      options: ["outline", "solid", "ghost", "subtle"],
      description: "Visual appearance style: outline (default), solid, ghost, subtle.",
      table: {
        defaultValue: { summary: "outline" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether all pagination buttons are disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showSizeChanger: {
      control: "boolean",
      description: "Whether to display the page size selector dropdown.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showQuickJumper: {
      control: "boolean",
      description: "Whether to display the page jump input box.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 100,
    pageSize: 10,
    defaultPage: 1,
    size: "md",
    variant: "outline",
  },
};

export const ManyPages: Story = {
  args: {
    total: 1000,
    pageSize: 10,
    defaultPage: 1,
    size: "md",
    variant: "outline",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: "13px", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Page 1 (Start boundary window with right ellipsis):
        </p>
        <Pagination {...args} defaultPage={1} />
      </div>

      <div>
        <p style={{ margin: "0 0 8px", fontSize: "13px", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Page 50 (Middle window with dual ellipses):
        </p>
        <Pagination {...args} defaultPage={50} />
      </div>

      <div>
        <p style={{ margin: "0 0 8px", fontSize: "13px", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Page 100 (End boundary window with left ellipsis):
        </p>
        <Pagination {...args} defaultPage={100} />
      </div>
    </div>
  ),
};

export const WithJumper: Story = {
  args: {
    total: 500,
    pageSize: 10,
    defaultPage: 12,
    showQuickJumper: true,
    showSizeChanger: true,
  },
};

export const AllSizes: Story = {
  render: () => {
    const sizes: PaginationSize[] = ["sm", "md", "lg"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {sizes.map((s) => (
          <div key={s}>
            <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: "var(--cl-color-text-secondary, #64748b)" }}>
              Size: {s.toUpperCase()}
            </p>
            <Pagination total={100} pageSize={10} defaultPage={3} size={s} />
          </div>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants: PaginationVariant[] = ["outline", "solid", "subtle", "ghost"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {variants.map((v) => (
          <div key={v}>
            <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: "var(--cl-color-text-secondary, #64748b)" }}>
              Variant: {v}
            </p>
            <Pagination total={100} pageSize={10} defaultPage={4} variant={v} />
          </div>
        ))}
      </div>
    );
  },
};

export const CustomComposition: Story = {
  render: () => (
    <Pagination total={80} pageSize={10} defaultPage={1}>
      <Pagination.List>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item page={1}>1</Pagination.Item>
        <Pagination.Item page={2}>2</Pagination.Item>
        <Pagination.Item page={3}>3</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item page={8}>8</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination.List>
      <Pagination.SizeSelect />
      <Pagination.Jumper />
    </Pagination>
  ),
};
