import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MultiSelect } from "./MultiSelect";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

const techOptions = [
  { value: "react", label: "React", description: "UI library by Meta" },
  { value: "typescript", label: "TypeScript", description: "Typed JavaScript" },
  { value: "graphql", label: "GraphQL", description: "Query language for APIs" },
  { value: "nextjs", label: "Next.js", description: "Full-stack React framework" },
  { value: "vite", label: "Vite", description: "Next generation frontend tooling" },
  { value: "tailwind", label: "Tailwind CSS", disabled: true, description: "Utility-first CSS (disabled)" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Components/Forms & Inputs/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Searchable multiple-selection control with interactive chips, clear-all action, FormField integration, and accessible listbox semantics.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => <MultiSelect options={techOptions} placeholder="Select technologies..." />,
};

export const WithInitialValues: Story = {
  render: () => (
    <MultiSelect
      options={techOptions}
      defaultValue={["react", "typescript"]}
      placeholder="Select technologies..."
    />
  ),
};

export const MaxTagCount: Story = {
  render: () => (
    <MultiSelect
      options={techOptions}
      defaultValue={["react", "typescript", "graphql", "nextjs"]}
      maxTagCount={2}
      placeholder="Select technologies..."
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
      <MultiSelect size="sm" options={techOptions} defaultValue={["react"]} placeholder="Small" />
      <MultiSelect size="md" options={techOptions} defaultValue={["react"]} placeholder="Medium" />
      <MultiSelect size="lg" options={techOptions} defaultValue={["react"]} placeholder="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <MultiSelect
      isDisabled
      options={techOptions}
      defaultValue={["react", "typescript"]}
    />
  ),
};

export const WithFormField: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "450px" }}>
      <FormField id="stack-field" required>
        <FormLabel>Core Stack</FormLabel>
        <MultiSelect options={techOptions} defaultValue={["react"]} />
        <FormHelperText>Select your primary frontend technologies</FormHelperText>
      </FormField>

      <FormField id="invalid-stack-field" isInvalid>
        <FormLabel>Secondary Skills</FormLabel>
        <MultiSelect options={techOptions} />
        <FormErrorMessage>At least one technology is required</FormErrorMessage>
      </FormField>
    </div>
  ),
};
