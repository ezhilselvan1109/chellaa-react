import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Textarea, Box, Stack } from "@chellaa/react";

export const textareaToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants-sizes", title: "Variants & Sizes" },
  { id: "resizing", title: "Resize Control" },
  { id: "autoresize-count", title: "Auto-Resize & Character Counter" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const textareaPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"outlined" | "filled" | "standard" | "unstyled"',
    default: '"outlined"',
    description: "Visual aesthetic style of border and surface background.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Padding, line height, and typography scale.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Expands textarea width to fill 100% of the parent container.",
  },
  {
    name: "resize",
    type: '"none" | "vertical" | "horizontal" | "both"',
    default: '"vertical"',
    description: "Controls the CSS resize capability of the multi-line input.",
  },
  {
    name: "autoResize",
    type: "boolean",
    default: "false",
    description: "Automatically expands height based on content up to maxRows.",
  },
  {
    name: "minRows",
    type: "number",
    default: "3",
    description: "Minimum visible text line rows when autoResize is enabled.",
  },
  {
    name: "maxRows",
    type: "number",
    default: "undefined",
    description: "Maximum visible text line rows before scrollbars appear when autoResize is enabled.",
  },
  {
    name: "showCount",
    type: "boolean",
    default: "false",
    description: "Displays live character counter indicator below the textarea.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Sets destructive error outline and aria-invalid='true'.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and reduces opacity.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Prevents editing while maintaining focusability and selectability.",
  },
  {
    name: "textareaRef",
    type: "Ref<HTMLTextAreaElement>",
    default: "undefined",
    description: "Ref forwarded directly to the native <textarea> element.",
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

const textareaA11yRoles = [
  {
    attributeOrKey: "Native <textarea>",
    description: "Standard multiline plain text entry element with keyboard navigation and scroll capabilities.",
  },
  {
    attributeOrKey: "aria-invalid='true'",
    description: "Applied automatically when error is true or when contained within an invalid FormField.",
  },
  {
    attributeOrKey: "aria-describedby",
    description: "Links textarea to error message, character count, or helper text for screen readers.",
  },
];

const textareaKeyboardKeys = [
  {
    attributeOrKey: "Tab",
    description: "Navigates focus into or out of the textarea control.",
  },
  {
    attributeOrKey: "Enter",
    description: "Inserts a newline character within the text content.",
  },
];

export function TextareaDocPage() {
  return (
    <ComponentDocLayout
      title="Textarea"
      description="Multi-line accessible text input with auto-wrap, auto-expansion, configurable resize constraints, and validation styling."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-textarea--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Textarea } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Textarea</code> provides a robust multiline text entry control supporting standard rows, placeholder text, and controlled values.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Textarea placeholder="Write your notes here..." minRows={3} />
        </Box>
        <CodeBlock
          code={`<Textarea placeholder="Write your notes here..." minRows={3} />`}
          language="tsx"
        />
      </section>

      <section id="variants-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Sizes</span>
          <a href="#variants-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Textarea supports <code>outlined</code>, <code>filled</code>, and <code>standard</code> surface variants across <code>sm</code>, <code>md</code>, and <code>lg</code> sizes.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Textarea size="sm" variant="outlined" placeholder="Small outlined textarea" />
            <Textarea size="md" variant="filled" placeholder="Medium filled textarea" />
            <Textarea size="lg" variant="standard" placeholder="Large standard textarea" />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Textarea size="sm" variant="outlined" placeholder="Small outlined" />
<Textarea size="md" variant="filled" placeholder="Medium filled" />
<Textarea size="lg" variant="standard" placeholder="Large standard" />`}
          language="tsx"
        />
      </section>

      <section id="resizing" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Resize Control</span>
          <a href="#resizing" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Control user resizing behavior via the <code>resize</code> prop (<code>none</code>, <code>vertical</code>, <code>horizontal</code>, <code>both</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Textarea resize="none" placeholder="Fixed size (resize='none')" minRows={2} />
            <Textarea resize="vertical" placeholder="Vertical only (resize='vertical')" minRows={2} />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Textarea resize="none" placeholder="Fixed size (resize='none')" minRows={2} />
<Textarea resize="vertical" placeholder="Vertical only (resize='vertical')" minRows={2} />`}
          language="tsx"
        />
      </section>

      <section id="autoresize-count" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Auto-Resize & Character Counter</span>
          <a href="#autoresize-count" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Enable <code>autoResize</code> to automatically grow the container height with typing, and <code>showCount</code> with <code>maxLength</code> to display remaining characters.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Textarea
            autoResize
            minRows={2}
            maxRows={6}
            showCount
            maxLength={200}
            defaultValue="This textarea automatically adjusts its height as you type and displays character count."
          />
        </Box>
        <CodeBlock
          code={`<Textarea
  autoResize
  minRows={2}
  maxRows={6}
  showCount
  maxLength={200}
  defaultValue="This textarea automatically adjusts its height..."
/>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Textarea"
        roles={textareaA11yRoles}
        keyboardKeys={textareaKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Textarea" props={textareaPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
