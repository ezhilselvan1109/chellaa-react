import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import type { AccordionVariant } from "./Accordion.types";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
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
      options: ["outline", "separated", "flush"],
      description: "Visual style treatment: outline (bordered container), separated (card items), or flush (borderless).",
      table: {
        defaultValue: { summary: "outline" },
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
    <div style={{ width: "500px", maxWidth: "100%" }}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Header level={3}>
            <Accordion.Trigger>
              <span>What is Chellaa React?</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            Chellaa React is an enterprise-grade React design system delivering
            accessible, performant, and token-driven components.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Header level={3}>
            <Accordion.Trigger>
              <span>How does styling work?</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            Styles are delivered as zero-config static CSS inside cascade layers,
            eliminating runtime Emotion JavaScript evaluation overhead.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Header level={3}>
            <Accordion.Trigger>
              <span>Is it WCAG 2.2 compliant?</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            Yes, every component adheres strictly to WAI-ARIA APG standards with
            automated axe-core checks and keyboard roving focus support.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ width: "500px", maxWidth: "100%" }}>
      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <Accordion.Item value="item-1">
          <Accordion.Header level={3}>
            <Accordion.Trigger>
              <span>Filter: Category</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            Electronics, Books, Home & Kitchen, Clothing.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Header level={3}>
            <Accordion.Trigger>
              <span>Filter: Price Range</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            Under $25, $25 to $50, $50 to $100, $100 & Above.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <Accordion.Header level={3}>
            <Accordion.Trigger>
              <span>Filter: Customer Rating</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            4 Stars & Up, 3 Stars & Up, 2 Stars & Up.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const Variants: Story = {
  render: () => {
    const variants: AccordionVariant[] = ["outline", "separated", "flush"];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "500px" }}>
        {variants.map((variant) => (
          <div key={variant}>
            <h4 style={{ margin: "0 0 8px 0", textTransform: "capitalize" }}>
              Variant: {variant}
            </h4>
            <Accordion variant={variant} type="single" collapsible defaultValue="v-1">
              <Accordion.Item value="v-1">
                <Accordion.Header>
                  <Accordion.Trigger>
                    <span>Item One</span>
                    <Accordion.Icon />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  Content for item one in {variant} variant.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="v-2">
                <Accordion.Header>
                  <Accordion.Trigger>
                    <span>Item Two</span>
                    <Accordion.Icon />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  Content for item two in {variant} variant.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      </div>
    );
  },
};

export const DisabledItem: Story = {
  render: () => (
    <div style={{ width: "500px", maxWidth: "100%" }}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>
              <span>Active Item</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>This section is active and interactive.</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2" isDisabled>
          <Accordion.Header>
            <Accordion.Trigger>
              <span>Disabled Item (Restricted)</span>
              <Accordion.Icon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>You cannot expand this section.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
