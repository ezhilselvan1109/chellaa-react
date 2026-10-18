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
  { id: "variants-sizes", title: "Variants & Sizes" },
  { id: "adornments", title: "Start & End Adornments" },
  { id: "clearable", title: "Clearable Action" },
  { id: "text-field", title: "TextField Convenience Wrapper" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const inputPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"outlined" | "filled" | "standard" | "unstyled"',
    default: '"outlined"',
    description: "Visual surface style of the input border and background.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Height, padding, and font size scale.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Expands input width to 100% of the parent container.",
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
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Prevents editing while maintaining focusability and selectability.",
  },
  {
    name: "clearable",
    type: "boolean",
    default: "false",
    description: "Displays an interactive clear button when text is entered.",
  },
  {
    name: "onClear",
    type: "() => void",
    default: "undefined",
    description: "Callback fired when the clear button is clicked.",
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
    name: "inputProps",
    type: "InputHTMLAttributes<HTMLInputElement>",
    default: "undefined",
    description: "Additional props forwarded directly to the native input element.",
  },
  {
    name: "inputRef",
    type: "Ref<HTMLInputElement>",
    default: "undefined",
    description: "Ref forwarded directly to the native input element.",
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
    description: "System sx styling prop supporting design token paths and responsive breakpoints.",
  },
];

const textFieldPropsData: PropRow[] = [
  {
    name: "label",
    type: "ReactNode",
    default: "undefined",
    description: "Label text rendered above the input with automatic htmlFor association.",
  },
  {
    name: "helperText",
    type: "ReactNode",
    default: "undefined",
    description: "Guidance or descriptive text rendered below the input with aria-describedby linkage.",
  },
  {
    name: "errorMessage",
    type: "ReactNode",
    default: "undefined",
    description: "Error message displayed below the input when error is true.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Displays a required asterisk indicator and marks the input as required.",
  },
  {
    name: "variant",
    type: '"outlined" | "filled" | "standard" | "unstyled"',
    default: '"outlined"',
    description: "Visual style inherited by the underlying Input component.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size scale inherited by the underlying Input component.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Expands the entire form field container to 100% width.",
  },
];

const inputAdornmentPropsData: PropRow[] = [
  {
    name: "position",
    type: '"start" | "end"',
    default: "Required",
    description: "Determines whether the adornment appears before ('start') or after ('end') the input text.",
  },
  {
    name: "disablePointerEvents",
    type: "boolean",
    default: "false",
    description: "Disables pointer events on decorative adornments so clicks focus the input.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Native <input>",
    description: "Standard single-line text entry element supporting autocomplete, type, and form submission semantics.",
  },
  {
    attributeOrKey: "aria-invalid='true'",
    description: "Automatically applied when error is true or when contained in an invalid FormField.",
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
    description: "Moves focus to the input element with a prominent focus ring.",
  },
  {
    attributeOrKey: "Escape",
    description: "When clearable is enabled, clears entered text in supported interactive configurations.",
  },
];

export function InputDocPage() {
  return (
    <ComponentDocLayout
      title="Input & TextField"
      description="Accessible text inputs with start/end adornments, clearable actions, validation states, and floating helper labels."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-input--docs"
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
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Input</code> provides a stylized text entry control supporting placeholders, standard input types, and state indicators.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Input placeholder="Enter your email address..." />
        </Box>
        <CodeBlock
          code={`<Input placeholder="Enter your email address..." />`}
          language="tsx"
        />
      </section>

      <section id="variants-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Sizes</span>
          <a href="#variants-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Choose from three standard visual variants (<code>outlined</code>, <code>filled</code>, <code>standard</code>) and three sizing scales (<code>sm</code>, <code>md</code>, <code>lg</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Input size="sm" variant="outlined" placeholder="Small outlined input (32px)" />
            <Input size="md" variant="filled" placeholder="Medium filled input (40px)" />
            <Input size="lg" variant="standard" placeholder="Large standard underline input (48px)" />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Input size="sm" variant="outlined" placeholder="Small outlined (32px)" />
<Input size="md" variant="filled" placeholder="Medium filled (40px)" />
<Input size="lg" variant="standard" placeholder="Large standard underline (48px)" />`}
          language="tsx"
        />
      </section>

      <section id="adornments" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Start & End Adornments</span>
          <a href="#adornments" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Attach prefix or suffix adornments using <code>InputAdornment</code> with <code>position="start"</code> or <code>position="end"</code>.
        </p>
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

      <section id="clearable" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Clearable Action</span>
          <a href="#clearable" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Setting <code>clearable=&#123;true&#125;</code> renders a dedicated button that resets the field value on click.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Input defaultValue="Search query" clearable placeholder="Search docs..." />
        </Box>
        <CodeBlock
          code={`<Input defaultValue="Search query" clearable placeholder="Search docs..." />`}
          language="tsx"
        />
      </section>

      <section id="text-field" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>TextField Convenience Wrapper</span>
          <a href="#text-field" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>TextField</code> wraps <code>FormField</code>, <code>FormLabel</code>, <code>Input</code>, and <code>FormHelperText</code> into an all-in-one ergonomic component.
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

      <AccessibilitySection
        componentName="Input"
        roles={a11yRoles}
        keyboardKeys={keyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Input" props={inputPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="TextField" props={textFieldPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="InputAdornment" props={inputAdornmentPropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
