import * as React from "react";
import { Button } from "../Button/Button";
import { ButtonGroup } from "./ButtonGroup";
import type { ButtonGroupProps } from "./ButtonGroup.types";
import { ThemeProvider } from "../../theme/ThemeProvider";

export interface StoryMeta<T> {
  title: string;
  component?: React.ComponentType<T>;
  tags?: string[];
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}

export interface StoryObject<T> {
  args?: Partial<T>;
  render?: (args: T) => React.ReactNode;
}

const meta: StoryMeta<ButtonGroupProps> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    isAttached: { control: "boolean" },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "subtle", "link"],
    },
    colorScheme: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "neutral",
        "success",
        "warning",
        "danger",
        "info",
      ],
    },
    isDisabled: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObject<ButtonGroupProps> = {
  args: {
    orientation: "horizontal",
    isAttached: false,
    size: "md",
    variant: "solid",
    colorScheme: "primary",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Cut</Button>
      <Button>Copy</Button>
      <Button>Paste</Button>
    </ButtonGroup>
  ),
};

export const Attached: StoryObject<ButtonGroupProps> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ButtonGroup isAttached variant="outline" colorScheme="primary">
        <Button>Years</Button>
        <Button>Months</Button>
        <Button>Days</Button>
      </ButtonGroup>

      <ButtonGroup isAttached variant="solid" colorScheme="neutral">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
  ),
};

export const Vertical: StoryObject<ButtonGroupProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "24px" }}>
      <ButtonGroup
        orientation="vertical"
        isAttached
        variant="outline"
        colorScheme="primary"
      >
        <Button>Profile</Button>
        <Button>Account</Button>
        <Button>Security</Button>
        <Button>Billing</Button>
      </ButtonGroup>

      <ButtonGroup
        orientation="vertical"
        isAttached
        variant="solid"
        colorScheme="neutral"
      >
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    </div>
  ),
};

export const UnattachedSpacing: StoryObject<ButtonGroupProps> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ButtonGroup spacing={8}>
        <Button variant="solid">One</Button>
        <Button variant="solid">Two</Button>
        <Button variant="solid">Three</Button>
      </ButtonGroup>

      <ButtonGroup spacing={24}>
        <Button variant="outline">Spaced 1</Button>
        <Button variant="outline">Spaced 2</Button>
        <Button variant="outline">Spaced 3</Button>
      </ButtonGroup>
    </div>
  ),
};

export const InheritedProps: StoryObject<ButtonGroupProps> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ButtonGroup size="sm" variant="ghost" colorScheme="success">
        <Button>Approve</Button>
        <Button>Review</Button>
        <Button>Merge</Button>
      </ButtonGroup>

      <ButtonGroup isDisabled size="md" variant="solid" colorScheme="danger">
        <Button>Disabled 1</Button>
        <Button>Disabled 2</Button>
        <Button>Disabled 3</Button>
      </ButtonGroup>
    </div>
  ),
};

export const ChildOverrides: StoryObject<ButtonGroupProps> = {
  render: () => (
    <ButtonGroup size="md" variant="outline" colorScheme="neutral">
      <Button>Cancel</Button>
      <Button>Save Draft</Button>
      <Button variant="solid" colorScheme="primary">
        Publish
      </Button>
    </ButtonGroup>
  ),
};

export const DarkTheme: StoryObject<ButtonGroupProps> = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <div
        data-theme="dark"
        style={{
          padding: "24px",
          background: "var(--cl-color-bg-canvas)",
          borderRadius: "8px",
        }}
      >
        <ButtonGroup isAttached variant="outline" colorScheme="primary">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
          <Button>Year</Button>
        </ButtonGroup>
      </div>
    </ThemeProvider>
  ),
};
