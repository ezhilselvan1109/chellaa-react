import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  FormField,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Box,
  Stack,
} from "@chellaa/react";

export const formFieldToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "validation-states", title: "Validation & Error States" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const formFieldPropsData: PropRow[] = [
  {
    name: "id",
    type: "string",
    default: "auto-generated",
    description: "Unique identifier cascading down to control and labels.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Renders required asterisk indicator and sets aria-required='true'.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Triggers invalid styling on nested control and exposes FormErrorMessage.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Cascades disabled state down to all child inputs and labels.",
  },
];

export function FormFieldDocPage() {
  return (
    <ComponentDocLayout
      title="FormField"
      description="Context provider and layout wrapper linking labels, controls, helper text, and error messages via WAI-ARIA."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  FormField,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useFormField,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <FormField id="demo-field" required>
            <FormLabel>Account Email</FormLabel>
            <Input placeholder="you@example.com" />
            <FormHelperText>We will never share your personal email.</FormHelperText>
          </FormField>
        </Box>
        <CodeBlock
          code={`<FormField id="demo-field" required>
  <FormLabel>Account Email</FormLabel>
  <Input placeholder="you@example.com" />
  <FormHelperText>We will never share your personal email.</FormHelperText>
</FormField>`}
          language="tsx"
        />
      </section>

      <section id="validation-states" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Validation & Error States</span>
          <a href="#validation-states" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <FormField id="error-field" required error>
              <FormLabel>Password</FormLabel>
              <Input type="password" value="123" />
              <FormErrorMessage>Password must be at least 8 characters long.</FormErrorMessage>
            </FormField>
          </Stack>
        </Box>
        <CodeBlock
          code={`<FormField id="password" required error>
  <FormLabel>Password</FormLabel>
  <Input type="password" value="123" />
  <FormErrorMessage>Password must be at least 8 characters long.</FormErrorMessage>
</FormField>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="FormField"
        roles={[
          {
            attributeOrKey: "htmlFor / id",
            description: "Automatically synchronizes FormLabel htmlFor with the nested input's id attribute.",
          },
          {
            attributeOrKey: "aria-describedby",
            description: "Links FormHelperText and FormErrorMessage IDs to the input element.",
          },
          {
            attributeOrKey: "aria-invalid='true'",
            description: "Applied to input automatically when error is active.",
          },
        ]}
        keyboardKeys={[
          {
            attributeOrKey: "Click on Label",
            description: "Transfers keyboard focus directly to the associated input control.",
          },
        ]}
      />

      <ApiTable componentName="FormField" props={formFieldPropsData} />
    </ComponentDocLayout>
  );
}
