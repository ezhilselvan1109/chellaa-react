import * as React from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button.types";
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

const meta: StoryMeta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "subtle", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
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
    isLoading: { control: "boolean" },
    isFullWidth: { control: "boolean" },
    loadingPosition: {
      control: "select",
      options: ["start", "end", "center"],
    },
    loadingText: { control: "text" },
  },
};

export default meta;

export const Default: StoryObject<ButtonProps> = {
  args: {
    children: "Button Action",
    variant: "solid",
    size: "md",
    colorScheme: "primary",
    isDisabled: false,
    isLoading: false,
    isFullWidth: false,
  },
  render: (args) => <Button {...args} />,
};

export const AllVariants: StoryObject<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: StoryObject<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button size="xs">Extra Small (28px)</Button>
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (48px)</Button>
      <Button size="xl">Extra Large (56px)</Button>
    </div>
  ),
};

export const ColorSchemes: StoryObject<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["solid", "outline", "subtle"] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <span style={{ width: "80px", fontSize: "14px", fontWeight: "bold" }}>
            {variant}:
          </span>
          <Button variant={variant} colorScheme="primary">
            Primary
          </Button>
          <Button variant={variant} colorScheme="secondary">
            Secondary
          </Button>
          <Button variant={variant} colorScheme="neutral">
            Neutral
          </Button>
          <Button variant={variant} colorScheme="success">
            Success
          </Button>
          <Button variant={variant} colorScheme="warning">
            Warning
          </Button>
          <Button variant={variant} colorScheme="danger">
            Danger
          </Button>
          <Button variant={variant} colorScheme="info">
            Info
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const Disabled: StoryObject<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button isDisabled variant="solid">
        Disabled Solid
      </Button>
      <Button isDisabled variant="outline">
        Disabled Outline
      </Button>
      <Button isDisabled variant="ghost">
        Disabled Ghost
      </Button>
      <Button isDisabled variant="subtle">
        Disabled Subtle
      </Button>
      <Button isDisabled variant="link">
        Disabled Link
      </Button>
    </div>
  ),
};

export const Loading: StoryObject<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button isLoading loadingPosition="start">
        Loading Start
      </Button>
      <Button isLoading loadingPosition="end">
        Loading End
      </Button>
      <Button isLoading loadingPosition="center">
        Loading Center
      </Button>
      <Button isLoading loadingText="Saving changes...">
        Custom Text
      </Button>
      <Button isLoading isDisabled>
        Disabled & Loading
      </Button>
    </div>
  ),
};

export const WithIcons: StoryObject<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button startIcon={<span>★</span>}>Start Icon</Button>
      <Button endIcon={<span>→</span>}>End Icon</Button>
      <Button startIcon={<span>★</span>} endIcon={<span>→</span>}>
        Both Icons
      </Button>
      <Button aria-label="Add new item" startIcon={<span>+</span>} />
    </div>
  ),
};

export const FullWidth: StoryObject<ButtonProps> = {
  render: () => (
    <div
      style={{ width: "380px", padding: "16px", border: "1px dashed #cbd5e1" }}
    >
      <Button isFullWidth variant="solid">
        Full Width Button
      </Button>
    </div>
  ),
};

export const AsChild: StoryObject<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button asChild variant="solid">
        <a href="https://chellaa.dev" target="_blank" rel="noreferrer">
          Anchor Link
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href="#section">In-Page Anchor</a>
      </Button>
    </div>
  ),
};

export const DarkTheme: StoryObject<ButtonProps> = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <div
        data-theme="dark"
        style={{
          padding: "24px",
          background: "var(--cl-color-bg-canvas)",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Button variant="solid" colorScheme="primary">
          Primary
        </Button>
        <Button variant="outline" colorScheme="secondary">
          Secondary
        </Button>
        <Button variant="ghost" colorScheme="neutral">
          Neutral
        </Button>
        <Button variant="subtle" colorScheme="success">
          Success
        </Button>
        <Button variant="solid" colorScheme="danger">
          Danger
        </Button>
      </div>
    </ThemeProvider>
  ),
};

export const LightTheme: StoryObject<ButtonProps> = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div
        data-theme="light"
        style={{
          padding: "24px",
          background: "var(--cl-color-bg-canvas)",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Button variant="solid" colorScheme="primary">
          Primary
        </Button>
        <Button variant="outline" colorScheme="secondary">
          Secondary
        </Button>
        <Button variant="ghost" colorScheme="neutral">
          Neutral
        </Button>
        <Button variant="subtle" colorScheme="success">
          Success
        </Button>
        <Button variant="solid" colorScheme="danger">
          Danger
        </Button>
      </div>
    </ThemeProvider>
  ),
};
