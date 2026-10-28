import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import type { AccordionVariant, AccordionSize } from "./Accordion.types";

const meta: Meta<typeof Accordion> = {
  title: "Components/Navigation/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Expansion behavior mode: single (only one item open) or multiple (many items open simultaneously).",
      table: {
        defaultValue: { summary: "single" },
      },
    },
    collapsible: {
      control: "boolean",
      description: "When type='single', allows an expanded item to be collapsed when clicked again.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "separated", "borderless", "filled"],
      description: "Visual style treatment: default (clean border), separated (cards), borderless (minimal), or filled (soft background).",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Density and scale rhythm adjusting trigger padding, typography, icons, and content spacing.",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    indicatorPosition: {
      control: "radio",
      options: ["end", "start"],
      description: "Placement of the expand/collapse indicator chevron.",
      table: {
        defaultValue: { summary: "end" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether all accordion items are globally disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "560px", maxWidth: "100%" }}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="What is Chellaa React?"
              description="Overview of architecture and design philosophy"
            />
          </Accordion.Header>
          <Accordion.Content>
            Chellaa React is an enterprise-grade React design system delivering
            accessible, performant, and token-driven components with zero runtime CSS-in-JS.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="How does styling work?"
              description="Cascade layers and zero-runtime CSS tokens"
            />
          </Accordion.Header>
          <Accordion.Content>
            Styles are delivered as precompiled static CSS inside the <code>@layer cl-components</code> cascade
            layer, completely eliminating runtime style evaluation overhead.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Is it WCAG 2.2 AA compliant?"
              description="Accessibility standards and testing guarantees"
            />
          </Accordion.Header>
          <Accordion.Content>
            Yes, every component adheres strictly to WAI-ARIA APG standards with
            automated axe-core checks, semantic landmarks, and full roving focus support.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const SingleExpansion: Story = {
  render: () => (
    <div style={{ width: "560px", maxWidth: "100%" }}>
      <Accordion type="single" collapsible={false} defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Header level={3}>
            <Accordion.Trigger title="Step 1: Account Creation" />
          </Accordion.Header>
          <Accordion.Content>
            Please provide your business email and choose a strong password to initialize your tenant account.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Header level={3}>
            <Accordion.Trigger title="Step 2: Team Members" />
          </Accordion.Header>
          <Accordion.Content>
            Invite team administrators and assign workspace permissions according to your organization structure.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Header level={3}>
            <Accordion.Trigger title="Step 3: Billing & Subscription" />
          </Accordion.Header>
          <Accordion.Content>
            Select a subscription plan tailored to your team capacity and enterprise compliance needs.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const MultipleExpansion: Story = {
  render: () => (
    <div style={{ width: "560px", maxWidth: "100%" }}>
      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <Accordion.Item value="item-1">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Filter by Category"
              description="Narrow search results by product segment"
            />
          </Accordion.Header>
          <Accordion.Content>
            Enterprise Software, Cloud Services, Analytics, Security & Compliance.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Filter by Price Tier"
              description="Select budget ranges"
            />
          </Accordion.Header>
          <Accordion.Content>
            Free Tier, Starter ($49/mo), Pro ($199/mo), Enterprise (Custom).
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Deployment Regions"
              description="Select available data centers"
            />
          </Accordion.Header>
          <Accordion.Content>
            US-East (N. Virginia), US-West (Oregon), EU-West (Frankfurt), AP-East (Tokyo).
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const VisualVariants: Story = {
  render: () => {
    const variants: AccordionVariant[] = ["default", "separated", "borderless", "filled"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "36px", width: "560px", maxWidth: "100%" }}>
        {variants.map((v) => (
          <div key={v}>
            <div style={{ marginBottom: "10px", fontWeight: 600, fontSize: "14px", textTransform: "capitalize", color: "#64748b" }}>
              Variant: <code>{v}</code>
            </div>
            <Accordion variant={v} type="single" collapsible defaultValue="v-1">
              <Accordion.Item value="v-1">
                <Accordion.Header level={3}>
                  <Accordion.Trigger
                    title={`${v.toUpperCase()} Item One`}
                    description={`Visual demonstration of ${v} styling treatment`}
                  />
                </Accordion.Header>
                <Accordion.Content>
                  Active panel content demonstrating typography, borders, background, and spacing tokens in the {v} variant.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="v-2">
                <Accordion.Header level={3}>
                  <Accordion.Trigger
                    title={`${v.toUpperCase()} Item Two`}
                    description="Secondary panel in collapsed state"
                  />
                </Accordion.Header>
                <Accordion.Content>
                  Secondary panel content for {v} variant.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => {
    const sizes: AccordionSize[] = ["sm", "md", "lg"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "560px", maxWidth: "100%" }}>
        {sizes.map((s) => (
          <div key={s}>
            <div style={{ marginBottom: "8px", fontWeight: 600, fontSize: "13px", textTransform: "uppercase", color: "#64748b" }}>
              Size: {s}
            </div>
            <Accordion size={s} type="single" collapsible defaultValue="s-1">
              <Accordion.Item value="s-1">
                <Accordion.Header level={3}>
                  <Accordion.Trigger
                    title={`Accordion Size: ${s.toUpperCase()}`}
                    description={`Trigger padding, typography scale, and chevron size adjusted for ${s}`}
                  />
                </Accordion.Header>
                <Accordion.Content>
                  Content rhythm dynamically scales padding and font sizes based on the {s} sizing token.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="s-2">
                <Accordion.Header level={3}>
                  <Accordion.Trigger title={`Secondary Item (${s})`} />
                </Accordion.Header>
                <Accordion.Content>
                  Secondary content area for size {s}.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      </div>
    );
  },
};

export const RichHeaderContent: Story = {
  render: () => (
    <div style={{ width: "560px", maxWidth: "100%" }}>
      <Accordion variant="separated" type="multiple" defaultValue={["notifications"]}>
        <Accordion.Item value="notifications">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="System Alerts"
              description="Critical alerts and automated monitoring notifications"
              leadingIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              }
              trailingBadge={
                <span
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    padding: "2px 8px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  3 New
                </span>
              }
            />
          </Accordion.Header>
          <Accordion.Content>
            High memory utilization on cluster node ap-east-2, SSL certificate expiring in 14 days, and 1 queued database migration.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="security">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Security & Permissions"
              description="Multi-factor authentication and role assignments"
              leadingIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              trailingBadge={
                <span
                  style={{
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    borderRadius: "9999px",
                    padding: "2px 8px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Compliant
                </span>
              }
            />
          </Accordion.Header>
          <Accordion.Content>
            Enforce mandatory hardware keys (WebAuthn/FIDO2) for production environment deployment triggers.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const BulkActions: Story = {
  render: () => (
    <div style={{ width: "560px", maxWidth: "100%" }}>
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <Accordion.Actions>
          <Accordion.ExpandAll />
          <Accordion.CollapseAll />
        </Accordion.Actions>

        <Accordion.Item value="item-1">
          <Accordion.Header level={3}>
            <Accordion.Trigger title="Section 1: Architectural Foundation" />
          </Accordion.Header>
          <Accordion.Content>
            Detailed specifications regarding package boundaries, Turborepo pipeline, and monorepo workspaces.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Header level={3}>
            <Accordion.Trigger title="Section 2: Accessibility Mandate" />
          </Accordion.Header>
          <Accordion.Content>
            WAI-ARIA APG compliance, roving focus strategies, screen reader announcements, and automated axe audits.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Header level={3}>
            <Accordion.Trigger title="Section 3: Zero-Runtime Static CSS" />
          </Accordion.Header>
          <Accordion.Content>
            Hardware-accelerated CSS grid animations, theme tokens, and clean separation between style engine and React components.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-4" isDisabled>
          <Accordion.Header level={3}>
            <Accordion.Trigger title="Section 4: Deprecated Modules (Disabled)" />
          </Accordion.Header>
          <Accordion.Content>
            This section is archived and disabled from user toggling or bulk expansion.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const ControlledState: Story = {
  render: () => {
    const [openItem, setOpenItem] = React.useState<string>("billing");

    return (
      <div style={{ width: "560px", maxWidth: "100%" }}>
        <div style={{ marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", fontWeight: 500 }}>External Controls:</span>
          <button
            type="button"
            style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", cursor: "pointer" }}
            onClick={() => setOpenItem("billing")}
          >
            Open Billing
          </button>
          <button
            type="button"
            style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", cursor: "pointer" }}
            onClick={() => setOpenItem("usage")}
          >
            Open Usage
          </button>
          <button
            type="button"
            style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #cbd5e1", cursor: "pointer" }}
            onClick={() => setOpenItem("")}
          >
            Collapse
          </button>
        </div>

        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          variant="filled"
        >
          <Accordion.Item value="billing">
            <Accordion.Header level={3}>
              <Accordion.Trigger title="Billing & Invoicing" />
            </Accordion.Header>
            <Accordion.Content>
              Current cycle invoices: $1,420.00. Payment method: Visa ending in 4242.
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="usage">
            <Accordion.Header level={3}>
              <Accordion.Trigger title="API Usage & Quotas" />
            </Accordion.Header>
            <Accordion.Content>
              12,450 / 50,000 monthly API calls consumed. Rate limiting threshold at 200 req/sec.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
};

export const DisabledItems: Story = {
  render: () => (
    <div style={{ width: "560px", maxWidth: "100%" }}>
      <Accordion type="single" collapsible defaultValue="active">
        <Accordion.Item value="active">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Active Production Cluster"
              description="Online and serving user traffic"
            />
          </Accordion.Header>
          <Accordion.Content>
            Cluster healthy. All 8 pods running with zero restart events.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="disabled-item" isDisabled>
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Staging Cluster (Maintenance Mode)"
              description="Access restricted during scheduled maintenance"
            />
          </Accordion.Header>
          <Accordion.Content>
            Maintenance active until 18:00 UTC.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const LongTitlesAndContent: Story = {
  render: () => (
    <div style={{ width: "560px", maxWidth: "100%" }}>
      <Accordion type="single" collapsible defaultValue="long-title">
        <Accordion.Item value="long-title">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="What happens if a customer has an unusually descriptive organizational title that stretches across several lines of layout without breaking container boundary?"
              description="Comprehensive explanation of word-breaking, flex shrink parameters, and high-contrast indicator alignment under extreme typography wrapping."
            />
          </Accordion.Header>
          <Accordion.Content>
            The flex trigger layout is explicitly designed with <code>min-width: 0</code> and <code>word-break: break-word</code> to ensure that even arbitrary character runs or extensive multi-sentence headings wrap elegantly without overflowing the bounding box or misaligning the chevron indicator.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        width: "560px",
        maxWidth: "100%",
        padding: "24px",
        borderRadius: "12px",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
      }}
    >
      <Accordion variant="separated" type="single" collapsible defaultValue="dark-1">
        <Accordion.Item value="dark-1">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Dark Mode Optimization"
              description="Tokens seamlessly adapt in dark mode environments"
              leadingIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              }
            />
          </Accordion.Header>
          <Accordion.Content>
            Semantic tokens (<code>--cl-color-bg-canvas</code>, <code>--cl-color-border-subtle</code>, <code>--cl-color-fg-primary</code>) ensure WCAG AA contrast compliance in dark mode.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="dark-2">
          <Accordion.Header level={3}>
            <Accordion.Trigger
              title="Contrast & Focus Rings"
              description="Clear 2px focus indicators on dark surfaces"
              leadingIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              }
            />
          </Accordion.Header>
          <Accordion.Content>
            Keyboard focus rings leverage high-contrast indigo primary tokens against deep slate backgrounds.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
