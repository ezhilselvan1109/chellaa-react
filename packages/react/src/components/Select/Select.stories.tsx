import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./Select";
import { FormField } from "../FormField";

const meta: Meta<typeof SelectRoot> = {
  title: "Components/Select",
  component: SelectRoot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectRoot>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "320px", minHeight: "260px" }}>
      <Select.Root defaultValue="apple">
        <Select.Trigger aria-label="Select Fruit">
          <Select.Value placeholder="Pick a fruit..." />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Item value="apple">
              <Select.ItemText>Apple 🍎</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="banana">
              <Select.ItemText>Banana 🍌</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="blueberry">
              <Select.ItemText>Blueberry 🫐</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="grapes">
              <Select.ItemText>Grapes 🍇</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>("standard");
    return (
      <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <Select.Root value={selected} onValueChange={setSelected}>
          <Select.Trigger aria-label="Shipping Method">
            <Select.Value placeholder="Select shipping..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Item value="standard">
                <Select.ItemText>Standard Shipping ($5.00)</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="express">
                <Select.ItemText>Express Overnight ($15.00)</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="priority">
                <Select.ItemText>Priority Air ($25.00)</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <div style={{ fontSize: "14px", color: "var(--cl-color-text-muted, #666)" }}>
          Current selection: <strong>{selected}</strong>
        </div>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Select.Root defaultValue="us">
        <Select.Trigger aria-label="Select Country">
          <Select.Value placeholder="Select Country..." />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Group>
              <Select.Label>North America</Select.Label>
              <Select.Item value="us">
                <Select.ItemText>United States</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="ca">
                <Select.ItemText>Canada</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="mx">
                <Select.ItemText>Mexico</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Europe</Select.Label>
              <Select.Item value="uk">
                <Select.ItemText>United Kingdom</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="de">
                <Select.ItemText>Germany</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="fr">
                <Select.ItemText>France</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Select.Root defaultValue="pro">
        <Select.Trigger aria-label="Select Plan">
          <Select.Value placeholder="Select plan..." />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Item value="free">
              <Select.ItemText>Free Tier</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="pro">
              <Select.ItemText>Pro ($19/mo)</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
            <Select.Item value="enterprise" isDisabled>
              <Select.ItemText>Enterprise (Contact Sales - Full)</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  ),
};

export const FormValidation: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <FormField isInvalid isRequired name="billing-cycle">
        <Select.Root>
          <Select.Trigger aria-label="Billing Cycle">
            <Select.Value placeholder="Choose billing cycle..." />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Item value="monthly">
                <Select.ItemText>Monthly</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="yearly">
                <Select.ItemText>Yearly (Save 20%)</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </FormField>
    </div>
  ),
};

export const VariantsAndSizes: Story = {
  render: () => (
    <div style={{ width: "360px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <p style={{ fontSize: "12px", color: "var(--cl-color-text-muted, #666)", marginBottom: "4px" }}>
          Outline Variant (sm)
        </p>
        <Select.Root variant="outline" size="sm" defaultValue="opt1">
          <Select.Trigger>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Item value="opt1">Option 1</Select.Item>
              <Select.Item value="opt2">Option 2</Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div>
        <p style={{ fontSize: "12px", color: "var(--cl-color-text-muted, #666)", marginBottom: "4px" }}>
          Filled Variant (md)
        </p>
        <Select.Root variant="filled" size="md" defaultValue="opt1">
          <Select.Trigger>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Item value="opt1">Option 1</Select.Item>
              <Select.Item value="opt2">Option 2</Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div>
        <p style={{ fontSize: "12px", color: "var(--cl-color-text-muted, #666)", marginBottom: "4px" }}>
          Flushed Variant (lg)
        </p>
        <Select.Root variant="flushed" size="lg" defaultValue="opt1">
          <Select.Trigger>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Item value="opt1">Option 1</Select.Item>
              <Select.Item value="opt2">Option 2</Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  ),
};

export const FlatOptions: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Select.Root
        placeholder="Select framework..."
        defaultValue="react"
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "svelte", label: "Svelte" },
          { value: "angular", label: "Angular", disabled: true },
        ]}
      />
    </div>
  ),
};
