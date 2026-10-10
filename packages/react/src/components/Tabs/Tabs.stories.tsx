import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tabs } from "./Tabs";
import type { TabsVariant, TabsSize, TabsOrientation, TabsActivationMode } from "./Tabs.types";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout direction of tabs: horizontal (default) or vertical sidebar layout.",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    variant: {
      control: "select",
      options: ["line", "enclosed", "pill", "unstyled"],
      description: "Visual style variant: line (default active indicator), enclosed (card folders), pill (segmented), or unstyled.",
      table: {
        defaultValue: { summary: "line" },
      },
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Sizing scale: sm (32px), md (40px, default), lg (48px).",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    activationMode: {
      control: "radio",
      options: ["automatic", "manual"],
      description: "Tab activation mode: automatic (switches on focus) or manual (requires Enter or Space).",
      table: {
        defaultValue: { summary: "automatic" },
      },
    },
    isLazy: {
      control: "boolean",
      description: "When true, inactive tab panels are unmounted from the DOM instead of hidden.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "540px", maxWidth: "100%" }}>
      <Tabs defaultValue="account" {...args}>
        <Tabs.List aria-label="Account Settings Navigation">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="security">Security</Tabs.Trigger>
          <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <div style={{ padding: "16px 0", color: "var(--cl-color-text-secondary, #4b5563)" }}>
            <h4 style={{ margin: "0 0 8px", color: "var(--cl-color-text-primary, #111827)" }}>Account Settings</h4>
            Manage your personal profile information, account email address, and language preferences.
          </div>
        </Tabs.Content>
        <Tabs.Content value="security">
          <div style={{ padding: "16px 0", color: "var(--cl-color-text-secondary, #4b5563)" }}>
            <h4 style={{ margin: "0 0 8px", color: "var(--cl-color-text-primary, #111827)" }}>Security & Access</h4>
            Configure two-factor authentication, active sessions, and password credentials.
          </div>
        </Tabs.Content>
        <Tabs.Content value="notifications">
          <div style={{ padding: "16px 0", color: "var(--cl-color-text-secondary, #4b5563)" }}>
            <h4 style={{ margin: "0 0 8px", color: "var(--cl-color-text-primary, #111827)" }}>Notifications</h4>
            Customize communication channels, email digests, and real-time webhook alerts.
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const variants: TabsVariant[] = ["line", "enclosed", "pill", "unstyled"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "600px", maxWidth: "100%" }}>
        {variants.map((v) => (
          <div key={v} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--cl-color-text-tertiary, #9ca3af)" }}>
              Variant: {v}
            </div>
            <Tabs defaultValue="tab1" variant={v}>
              <Tabs.List aria-label={`${v} variant demonstration`}>
                <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
                <Tabs.Trigger value="tab2">Analytics</Tabs.Trigger>
                <Tabs.Trigger value="tab3">Reports</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab1">
                <p style={{ margin: "12px 0 0", color: "var(--cl-color-text-secondary, #4b5563)" }}>
                  Overview content for {v} variant.
                </p>
              </Tabs.Content>
              <Tabs.Content value="tab2">
                <p style={{ margin: "12px 0 0", color: "var(--cl-color-text-secondary, #4b5563)" }}>
                  Analytics dashboards and metric summaries.
                </p>
              </Tabs.Content>
              <Tabs.Content value="tab3">
                <p style={{ margin: "12px 0 0", color: "var(--cl-color-text-secondary, #4b5563)" }}>
                  Archived performance and exportable reports.
                </p>
              </Tabs.Content>
            </Tabs>
          </div>
        ))}
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ width: "620px", maxWidth: "100%", height: "240px" }}>
      <Tabs orientation="vertical" defaultValue="general" variant="enclosed">
        <Tabs.List aria-label="Vertical Navigation Tabs">
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing & Plans</Tabs.Trigger>
          <Tabs.Trigger value="api">API Keys</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="general" style={{ padding: "0 20px" }}>
          <h4 style={{ margin: "0 0 8px", color: "var(--cl-color-text-primary, #111827)" }}>General Settings</h4>
          <p style={{ margin: 0, color: "var(--cl-color-text-secondary, #4b5563)" }}>
            Configure your workspace default organization and timezone.
          </p>
        </Tabs.Content>
        <Tabs.Content value="appearance" style={{ padding: "0 20px" }}>
          <h4 style={{ margin: "0 0 8px", color: "var(--cl-color-text-primary, #111827)" }}>Appearance Settings</h4>
          <p style={{ margin: 0, color: "var(--cl-color-text-secondary, #4b5563)" }}>
            Toggle between light, dark, and system themes.
          </p>
        </Tabs.Content>
        <Tabs.Content value="billing" style={{ padding: "0 20px" }}>
          <h4 style={{ margin: "0 0 8px", color: "var(--cl-color-text-primary, #111827)" }}>Billing Details</h4>
          <p style={{ margin: 0, color: "var(--cl-color-text-secondary, #4b5563)" }}>
            Manage invoices, payment methods, and current team subscription tier.
          </p>
        </Tabs.Content>
        <Tabs.Content value="api" style={{ padding: "0 20px" }}>
          <h4 style={{ margin: "0 0 8px", color: "var(--cl-color-text-primary, #111827)" }}>API Keys & Tokens</h4>
          <p style={{ margin: 0, color: "var(--cl-color-text-secondary, #4b5563)" }}>
            Create and revoke enterprise API credentials and service tokens.
          </p>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const ManualActivation: Story = {
  render: () => (
    <div style={{ width: "540px", maxWidth: "100%" }}>
      <p style={{ fontSize: "13px", color: "var(--cl-color-text-tertiary, #6b7280)", marginBottom: "12px" }}>
        Navigate through tabs using arrow keys without activating panels automatically. Press <strong>Enter</strong> or <strong>Space</strong> to activate the focused tab.
      </p>
      <Tabs activationMode="manual" defaultValue="code">
        <Tabs.List aria-label="Code snippet languages">
          <Tabs.Trigger value="code">TypeScript</Tabs.Trigger>
          <Tabs.Trigger value="preview">JavaScript</Tabs.Trigger>
          <Tabs.Trigger value="terminal">CLI</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="code">
          <pre style={{ background: "#1f2937", color: "#f9fafb", padding: "12px", borderRadius: "6px", fontSize: "13px" }}>
            <code>{`const greeting: string = "Hello Chellaa React";\nconsole.log(greeting);`}</code>
          </pre>
        </Tabs.Content>
        <Tabs.Content value="preview">
          <pre style={{ background: "#1f2937", color: "#f9fafb", padding: "12px", borderRadius: "6px", fontSize: "13px" }}>
            <code>{`const greeting = "Hello Chellaa React";\nconsole.log(greeting);`}</code>
          </pre>
        </Tabs.Content>
        <Tabs.Content value="terminal">
          <pre style={{ background: "#1f2937", color: "#f9fafb", padding: "12px", borderRadius: "6px", fontSize: "13px" }}>
            <code>{`pnpm add @chellaa/react`}</code>
          </pre>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <div style={{ width: "540px", maxWidth: "100%" }}>
      <Tabs defaultValue="public">
        <Tabs.List aria-label="Feature access tabs">
          <Tabs.Trigger value="public">Public Details</Tabs.Trigger>
          <Tabs.Trigger value="enterprise" isDisabled>
            Enterprise SSO (Disabled)
          </Tabs.Trigger>
          <Tabs.Trigger value="logs">Audit Logs</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="public">
          <p style={{ color: "var(--cl-color-text-secondary, #4b5563)" }}>
            Public organization details and member directories.
          </p>
        </Tabs.Content>
        <Tabs.Content value="enterprise">
          <p style={{ color: "var(--cl-color-text-secondary, #4b5563)" }}>
            Enterprise SSO features are available for Enterprise plan subscribers.
          </p>
        </Tabs.Content>
        <Tabs.Content value="logs">
          <p style={{ color: "var(--cl-color-text-secondary, #4b5563)" }}>
            Real-time security audit trails and administrator activity logs.
          </p>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
};
