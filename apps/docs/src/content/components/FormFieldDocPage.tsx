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
  Textarea,
  Box,
  Stack,
} from "@chellaa/react";

export const formFieldToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "validation-states", title: "Validation & Error States" },
  { id: "custom-controls", title: "Composition with Controls" },
  { id: "accessibility", title: "Accessibility & Standards" },
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
    name: "name",
    type: "string",
    default: "undefined",
    description: "Field name cascaded to child input controls for form submission.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Renders required asterisk indicator and marks nested control as required.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Triggers invalid styling on nested control and mounts FormErrorMessage.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Cascades disabled state down to all child inputs and labels.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Cascades readOnly state down to child controls.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Expands container width to 100% of the parent element.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const formLabelPropsData: PropRow[] = [
  {
    name: "required",
    type: "boolean",
    default: "Inherited from context",
    description: "Displays required asterisk indicator next to label text.",
  },
  {
    name: "error",
    type: "boolean",
    default: "Inherited from context",
    description: "Highlights label in error palette color when validation fails.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "Inherited from context",
    description: "Dims label opacity when field is disabled.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to child element using Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const formHelperTextPropsData: PropRow[] = [
  {
    name: "disabled",
    type: "boolean",
    default: "Inherited from context",
    description: "Dims helper text opacity when field is disabled.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to child element using Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const formErrorMessagePropsData: PropRow[] = [
  {
    name: "forceMount",
    type: "boolean",
    default: "false",
    description: "Forces the error message to remain mounted even when error is false.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to child element using Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const formFieldA11yRoles = [
  {
    attributeOrKey: "role='alert'",
    description: "Exposed by FormErrorMessage so screen readers immediately announce validation errors.",
  },
  {
    attributeOrKey: "htmlFor / id linkage",
    description: "Automatically synchronizes FormLabel htmlFor with the nested input's id attribute.",
  },
  {
    attributeOrKey: "aria-describedby",
    description: "Links FormHelperText and FormErrorMessage IDs to the input element.",
  },
  {
    attributeOrKey: "aria-invalid='true'",
    description: "Cascaded to child input automatically when error state is active.",
  },
];

const formFieldKeyboardKeys = [
  {
    attributeOrKey: "Click on Label",
    description: "Transfers keyboard focus directly to the associated input control.",
  },
  {
    attributeOrKey: "Tab",
    description: "Standard keyboard navigation into the wrapped control.",
  },
];

export function FormFieldDocPage() {
  return (
    <ComponentDocLayout
      title="FormField"
      description="Context provider and layout wrapper linking labels, controls, helper text, and error messages via WAI-ARIA."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-formfield--docs"
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
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Wrap your label, input control, and helper text inside <code>FormField</code>. The context automatically coordinates IDs and ARIA attributes.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <FormField id="demo-field" required>
            <FormLabel>Account Email</FormLabel>
            <Input placeholder="you@example.com" />
            <FormHelperText>We will never share your personal email with third parties.</FormHelperText>
          </FormField>
        </Box>
        <CodeBlock
          code={`<FormField id="account-email" required>
  <FormLabel>Account Email</FormLabel>
  <Input placeholder="you@example.com" />
  <FormHelperText>We will never share your personal email with third parties.</FormHelperText>
</FormField>`}
          language="tsx"
        />
      </section>

      <section id="validation-states" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Validation & Error States</span>
          <a href="#validation-states" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Setting <code>error=&#123;true&#125;</code> automatically sets <code>aria-invalid="true"</code> on the control, tints the label, and reveals the <code>FormErrorMessage</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <FormField id="error-field" required error>
              <FormLabel>Password</FormLabel>
              <Input type="password" defaultValue="123" />
              <FormErrorMessage>Password must be at least 8 characters long.</FormErrorMessage>
            </FormField>
          </Stack>
        </Box>
        <CodeBlock
          code={`<FormField id="password" required error>
  <FormLabel>Password</FormLabel>
  <Input type="password" defaultValue="123" />
  <FormErrorMessage>Password must be at least 8 characters long.</FormErrorMessage>
</FormField>`}
          language="tsx"
        />
      </section>

      <section id="custom-controls" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Composition with Controls</span>
          <a href="#custom-controls" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>FormField</code> integrates seamlessly with all Chellaa form controls including <code>Textarea</code>, <code>Checkbox</code>, and <code>Switch</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <FormField id="bio-field">
            <FormLabel>Biography</FormLabel>
            <Textarea placeholder="Tell us about yourself..." minRows={3} />
            <FormHelperText>Brief description for your public profile.</FormHelperText>
          </FormField>
        </Box>
        <CodeBlock
          code={`<FormField id="bio-field">
  <FormLabel>Biography</FormLabel>
  <Textarea placeholder="Tell us about yourself..." minRows={3} />
  <FormHelperText>Brief description for your public profile.</FormHelperText>
</FormField>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="FormField"
        roles={formFieldA11yRoles}
        keyboardKeys={formFieldKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="FormField" props={formFieldPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="FormLabel" props={formLabelPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="FormHelperText" props={formHelperTextPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="FormErrorMessage" props={formErrorMessagePropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
