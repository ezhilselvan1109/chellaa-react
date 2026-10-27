import * as React from "react";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

export default {
  title: "Components/Forms & Inputs/Radio",
  component: Radio,
  subcomponents: { RadioGroup },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info", "default"],
    },
  },
};

export const Default = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <Radio defaultChecked value="default">Default Selected Radio</Radio>
    </Box>
  ),
};

export const RadioGroupDemo = {
  render: function ShippingOptionsDemo() {
    const [selected, setSelected] = React.useState<string | number>("express");

    return (
      <Box sx={{ maxWidth: 440, p: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          Selected: <strong>{selected}</strong>
        </Typography>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          orientation="vertical"
          spacing={2}
        >
          <Radio value="standard">Standard Delivery (3–5 business days) — Free</Radio>
          <Radio value="express">Express Delivery (1–2 business days) — $9.99</Radio>
          <Radio value="overnight">Overnight Priority Delivery — $19.99</Radio>
        </RadioGroup>
      </Box>
    );
  },
};

export const Orientations = {
  render: () => (
    <Stack spacing={4} sx={{ p: 4 }}>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Vertical Orientation (Default):
        </Typography>
        <RadioGroup defaultValue="opt1" orientation="vertical" spacing={1.5}>
          <Radio value="opt1">Option 1</Radio>
          <Radio value="opt2">Option 2</Radio>
          <Radio value="opt3">Option 3</Radio>
        </RadioGroup>
      </Box>
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Horizontal Orientation:
        </Typography>
        <RadioGroup defaultValue="opt1" orientation="horizontal" spacing={3}>
          <Radio value="opt1">Option 1</Radio>
          <Radio value="opt2">Option 2</Radio>
          <Radio value="opt3">Option 3</Radio>
        </RadioGroup>
      </Box>
    </Stack>
  ),
};

export const Sizes = {
  render: () => (
    <Stack spacing={3} sx={{ p: 4 }}>
      <Radio size="sm" defaultChecked value="sm">Small (sm — 16px)</Radio>
      <Radio size="md" defaultChecked value="md">Medium (md — 20px, Default)</Radio>
      <Radio size="lg" defaultChecked value="lg">Large (lg — 24px)</Radio>
    </Stack>
  ),
};

export const ColorSchemes = {
  render: () => (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Radio colorScheme="primary" defaultChecked value="primary">Primary Accent</Radio>
      <Radio colorScheme="secondary" defaultChecked value="secondary">Secondary (Violet)</Radio>
      <Radio colorScheme="success" defaultChecked value="success">Success (Emerald)</Radio>
      <Radio colorScheme="warning" defaultChecked value="warning">Warning (Amber)</Radio>
      <Radio colorScheme="error" defaultChecked value="error">Error (Red)</Radio>
      <Radio colorScheme="info" defaultChecked value="info">Info (Sky)</Radio>
      <Radio colorScheme="default" defaultChecked value="default">Default (Neutral)</Radio>
    </Stack>
  ),
};

export const States = {
  render: () => (
    <Stack spacing={2} sx={{ p: 4 }}>
      <Radio value="un">Unchecked Normal</Radio>
      <Radio defaultChecked value="ch">Checked Normal</Radio>
      <Radio disabled value="dis-un">Disabled Unchecked</Radio>
      <Radio disabled defaultChecked value="dis-ch">Disabled Checked</Radio>
      <Radio error defaultChecked value="err">Error State</Radio>
    </Stack>
  ),
};

export const WithFormField = {
  render: () => (
    <Box sx={{ maxWidth: 440, p: 4 }}>
      <FormField id="billing-field" required error>
        <FormLabel>Billing Frequency</FormLabel>
        <RadioGroup defaultValue="annual" orientation="vertical" spacing={1.5}>
          <Radio value="monthly">Monthly ($29 / month)</Radio>
          <Radio value="annual">Annual ($290 / year, save 20%)</Radio>
        </RadioGroup>
        <FormErrorMessage>Please choose a billing frequency to continue.</FormErrorMessage>
        <FormHelperText>You can change this plan at any time in workspace settings.</FormHelperText>
      </FormField>
    </Box>
  ),
};

export const AsChildComposition = {
  render: function AsChildRadioDemo() {
    const [selected, setSelected] = React.useState<string | number>("cloud");

    return (
      <Box sx={{ p: 4, maxWidth: 520 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Polymorphic asChild Composition in RadioGroup (DEF-001)
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "var(--cl-color-fg-muted)" }}>
          Custom plan selection cards rendered via polymorphic asChild composition. Preserves native
          radio inputs, mutual exclusivity, name grouping, and keyboard Arrow key navigation.
        </Typography>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          orientation="vertical"
          spacing={2}
        >
          <Radio asChild value="cloud">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                border:
                  selected === "cloud"
                    ? "2px solid var(--cl-color-primary-base, #2563eb)"
                    : "1px solid var(--cl-color-border-subtle, #e2e8f0)",
                borderRadius: "8px",
                backgroundColor:
                  selected === "cloud"
                    ? "var(--cl-color-bg-muted, #f8fafc)"
                    : "transparent",
                cursor: "pointer",
                transition: "border-color 0.2s, background-color 0.2s",
              }}
            >
              <span>
                <strong style={{ display: "block" }}>Cloud Hosted</strong>
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "var(--cl-color-fg-muted, #64748b)",
                    marginTop: "2px",
                  }}
                >
                  Fully managed multi-region cluster with automated scaling.
                </span>
              </span>
            </label>
          </Radio>
          <Radio asChild value="self-hosted">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                border:
                  selected === "self-hosted"
                    ? "2px solid var(--cl-color-primary-base, #2563eb)"
                    : "1px solid var(--cl-color-border-subtle, #e2e8f0)",
                borderRadius: "8px",
                backgroundColor:
                  selected === "self-hosted"
                    ? "var(--cl-color-bg-muted, #f8fafc)"
                    : "transparent",
                cursor: "pointer",
                transition: "border-color 0.2s, background-color 0.2s",
              }}
            >
              <span>
                <strong style={{ display: "block" }}>Self Hosted / On-Premise</strong>
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "var(--cl-color-fg-muted, #64748b)",
                    marginTop: "2px",
                  }}
                >
                  Deploy within your own VPC or bare-metal Kubernetes infrastructure.
                </span>
              </span>
            </label>
          </Radio>
        </RadioGroup>
      </Box>
    );
  },
};

