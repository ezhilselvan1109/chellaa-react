import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Input,
  TextField,
  InputAdornment,
  Stack,
  Box,
} from "@chellaa/react";

export const inputToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "adornments", title: "Start & End Adornments" },
  { id: "text-field", title: "TextField Wrapper" },
  { id: "variants-sizes", title: "Variants & Sizes" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const inputPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"outlined" | "filled" | "standard"',
    default: '"outlined"',
    description: "Visual style of the input border and background.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Height, padding, and font size scale.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "neutral" | "success" | "warning" | "danger"',
    default: '"primary"',
    description: "Focus ring and active highlight color scheme.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Applies destructive error border styling and sets aria-invalid='true'.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and applies reduced opacity.",
  },
  {
    name: "startAdornment",
    type: "ReactNode",
    default: "undefined",
    description: "Icon, prefix symbol, or addon placed before the input text.",
  },
  {
    name: "endAdornment",
    type: "ReactNode",
    default: "undefined",
    description: "Icon, action button, or unit suffix placed after the input text.",
  },
  {
    name: "isFullWidth",
    type: "boolean",
    default: "false",
    description: "Expands input width to 100% of the container.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to child element using Slot.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "aria-invalid='true'",
    description: "Automatically applied when error={true} or when rendered within an invalid FormField.",
  },
  {
    attributeOrKey: "aria-describedby",
    description: "Links input to helper text or error message for screen readers.",
  },
  {
    attributeOrKey: "aria-required='true'",
    description: "Indicates mandatory field requirement when required prop is set.",
  },
];

const keyboardKeys = [
  {
    attributeOrKey: "Tab",
    description: "Focuses the input element with a high-contrast focus ring.",
  },
];

export function InputDocPage() {
  return (
    <ComponentDocLayout
      title="Input & TextField"
      description="Accessible text inputs with start/end adornments, validation states, and floating helper labels."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Input, TextField, InputAdornment, InputBase } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Input placeholder="Enter your email address..." />
        </Box>
        <CodeBlock
          code={`<Input placeholder="Enter your email address..." />`}
          language="tsx"
        />
      </section>

      <section id="adornments" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Start & End Adornments</span>
          <a href="#adornments" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Input
              placeholder="username"
              startAdornment={<InputAdornment position="start">@</InputAdornment>}
            />
            <Input
              placeholder="0.00"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              endAdornment={<InputAdornment position="end">USD</InputAdornment>}
            />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Input
  placeholder="username"
  startAdornment={<InputAdornment position="start">@</InputAdornment>}
/>

<Input
  placeholder="0.00"
  startAdornment={<InputAdornment position="start">$</InputAdornment>}
  endAdornment={<InputAdornment position="end">USD</InputAdornment>}
/>`}
          language="tsx"
        />
      </section>

      <section id="text-field" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>TextField Convenience Component</span>
          <a href="#text-field" className="docs-heading-anchor">#</a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)" }}>
          <code>TextField</code> wraps <code>FormField</code>, <code>FormLabel</code>, <code>Input</code>, and <code>FormHelperText</code> into a single convenient component.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <TextField
            id="work-email"
            label="Work Email"
            placeholder="name@company.com"
            helperText="We will never share your email with third parties."
          />
        </Box>
        <CodeBlock
          code={`<TextField
  id="work-email"
  label="Work Email"
  placeholder="name@company.com"
  helperText="We will never share your email with third parties."
/>`}
          language="tsx"
        />
      </section>

      <section id="variants-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Sizes</span>
          <a href="#variants-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Input size="sm" variant="outlined" placeholder="Small outlined input (32px)" />
            <Input size="md" variant="filled" placeholder="Medium filled input (40px)" />
            <Input size="lg" variant="standard" placeholder="Large standard underline input (48px)" />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Input size="sm" variant="outlined" placeholder="Small (32px)" />
<Input size="md" variant="filled" placeholder="Medium (40px)" />
<Input size="lg" variant="standard" placeholder="Large (48px)" />`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Input"
        roles={a11yRoles}
        keyboardKeys={keyboardKeys}
      />

      <ApiTable componentName="Input" props={inputPropsData} />
    </ComponentDocLayout>
  );
}
