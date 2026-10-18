import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Combobox,
  ComboboxRoot,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxEmpty,
  Autocomplete,
  Box,
  Stack,
} from "@chellaa/react";

export const comboboxToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "autocomplete-alias", title: "Autocomplete Shorthand" },
  { id: "multi-select", title: "Multi-Selection with Tags" },
  { id: "variants-sizes", title: "Variants & Sizes" },
  { id: "empty-loading", title: "Empty & Loading States" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const comboboxRootPropsData: PropRow[] = [
  {
    name: "value",
    type: "string | string[]",
    default: "undefined",
    description: "Controlled selected value (single string or string array in multi-select mode).",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    default: "undefined",
    description: "Initial selected value when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    default: "undefined",
    description: "Callback fired when option selection changes.",
  },
  {
    name: "searchValue",
    type: "string",
    default: "undefined",
    description: "Controlled text inside the filter input.",
  },
  {
    name: "onSearchChange",
    type: "(search: string) => void",
    default: "undefined",
    description: "Callback fired when the user types in the search input.",
  },
  {
    name: "options",
    type: "ComboboxOption[]",
    default: "undefined",
    description: "Declarative array of { value, label, disabled? } for automatic list generation.",
  },
  {
    name: "isMulti",
    type: "boolean",
    default: "false",
    description: "Enables multiple item selection with interactive removable tag chips.",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Displays a loading indicator during asynchronous option filtering.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims visual elements.",
  },
  {
    name: "isInvalid",
    type: "boolean",
    default: "false",
    description: "Applies error outline and sets aria-invalid='true'.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Spatial sizing scale (sm: 32px, md: 40px, lg: 48px).",
  },
  {
    name: "variant",
    type: '"outline" | "filled" | "flushed"',
    default: '"outline"',
    description: "Visual container surface style matching Input.",
  },
  {
    name: "filter",
    type: "((itemValue, itemText, search) => boolean) | false",
    default: "Built-in substring filter",
    description: "Custom filter predicate function, or false to disable client-side filtering for server search.",
  },
];

const comboboxItemPropsData: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "Required",
    description: "Unique value identifier for this option.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    description: "Optional plain text label used for matching and input display.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Prevents selection of this specific option.",
  },
];

const comboboxA11yRoles = [
  {
    attributeOrKey: "role='combobox'",
    description: "Applied to the search input element with aria-autocomplete='list' and aria-expanded.",
  },
  {
    attributeOrKey: "role='listbox'",
    description: "Applied to the floating option container with aria-multiselectable in multi-select mode.",
  },
  {
    attributeOrKey: "aria-activedescendant",
    description: "Points to the id of the currently keyboard-highlighted option.",
  },
  {
    attributeOrKey: "role='option'",
    description: "Applied to each selectable item with aria-selected indicating state.",
  },
];

const comboboxKeyboardKeys = [
  {
    attributeOrKey: "Arrow Down / Arrow Up",
    description: "Navigates between options in the popup listbox without closing the popup.",
  },
  {
    attributeOrKey: "Enter",
    description: "Selects the currently active option.",
  },
  {
    attributeOrKey: "Escape",
    description: "Dismisses the open popup menu and clears highlight.",
  },
  {
    attributeOrKey: "Backspace",
    description: "In multi-select mode with empty input, removes the last selected tag.",
  },
];

export function ComboboxDocPage() {
  return (
    <ComponentDocLayout
      title="Combobox & Autocomplete"
      description="Accessible autocomplete input with integrated popup listbox, keyboard navigation, async search, tag-based multi-selection, and portal management."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-combobox--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Combobox,
  Autocomplete,
  ComboboxRoot,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxTag,
  ComboboxClear,
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
          Pass an <code>options</code> array to <code>Combobox</code> for instant filterable autocomplete dropdown behavior.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ maxWidth: "320px" }}>
            <Combobox
              placeholder="Search countries..."
              options={[
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "in", label: "India" },
                { value: "de", label: "Germany" },
                { value: "uk", label: "United Kingdom" },
                { value: "fr", label: "France" },
                { value: "jp", label: "Japan" },
              ]}
            />
          </Box>
        </Box>
        <CodeBlock
          code={`<Combobox
  placeholder="Search countries..."
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "in", label: "India" },
    { value: "de", label: "Germany" },
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
  ]}
/>`}
          language="tsx"
        />
      </section>

      <section id="autocomplete-alias" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Autocomplete Shorthand</span>
          <a href="#autocomplete-alias" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          The component is also exported as <code>Autocomplete</code> for convenience and convention alignment.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ maxWidth: "320px" }}>
            <Autocomplete
              placeholder="Search framework..."
              options={[
                { value: "react", label: "React" },
                { value: "next", label: "Next.js" },
                { value: "vite", label: "Vite" },
                { value: "astro", label: "Astro" },
              ]}
            />
          </Box>
        </Box>
        <CodeBlock
          code={`import { Autocomplete } from "@chellaa/react";

<Autocomplete
  placeholder="Search framework..."
  options={[
    { value: "react", label: "React" },
    { value: "next", label: "Next.js" },
    { value: "vite", label: "Vite" },
  ]}
/>`}
          language="tsx"
        />
      </section>

      <section id="multi-select" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Multi-Selection with Tags</span>
          <a href="#multi-select" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Enable <code>isMulti=&#123;true&#125;</code> to allow selecting multiple options, rendered as removable tag chips within the control.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ maxWidth: "360px" }}>
            <Combobox
              isMulti
              defaultValue={["react", "ts"]}
              placeholder="Add skills..."
              options={[
                { value: "react", label: "React" },
                { value: "ts", label: "TypeScript" },
                { value: "css", label: "LightningCSS" },
                { value: "graphql", label: "GraphQL" },
                { value: "node", label: "Node.js" },
              ]}
            />
          </Box>
        </Box>
        <CodeBlock
          code={`<Combobox
  isMulti
  defaultValue={["react", "ts"]}
  placeholder="Add skills..."
  options={[
    { value: "react", label: "React" },
    { value: "ts", label: "TypeScript" },
    { value: "css", label: "LightningCSS" },
    { value: "graphql", label: "GraphQL" },
  ]}
/>`}
          language="tsx"
        />
      </section>

      <section id="variants-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Sizes</span>
          <a href="#variants-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Combobox supports three sizes (<code>sm</code>, <code>md</code>, <code>lg</code>) and three surface variants (<code>outline</code>, <code>filled</code>, <code>flushed</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2} sx={{ maxWidth: "320px" }}>
            <Combobox size="sm" variant="outline" placeholder="Small (32px)" options={[{ value: "1", label: "Item 1" }]} />
            <Combobox size="md" variant="filled" placeholder="Medium Filled (40px)" options={[{ value: "1", label: "Item 1" }]} />
            <Combobox size="lg" variant="flushed" placeholder="Large Flushed (48px)" options={[{ value: "1", label: "Item 1" }]} />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Combobox size="sm" variant="outline" placeholder="Small (32px)" options={...} />
<Combobox size="md" variant="filled" placeholder="Medium (40px)" options={...} />
<Combobox size="lg" variant="flushed" placeholder="Large (48px)" options={...} />`}
          language="tsx"
        />
      </section>

      <section id="empty-loading" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Empty & Loading States</span>
          <a href="#empty-loading" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          In compound mode, render <code>ComboboxEmpty</code> for zero-result feedback or enable <code>isLoading</code> during asynchronous queries.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ maxWidth: "320px" }}>
            <ComboboxRoot options={[]}>
              <ComboboxControl>
                <ComboboxInput placeholder="Type something unfamiliar..." />
                <ComboboxTrigger />
              </ComboboxControl>
              <ComboboxContent>
                <ComboboxEmpty>No matching records found.</ComboboxEmpty>
              </ComboboxContent>
            </ComboboxRoot>
          </Box>
        </Box>
        <CodeBlock
          code={`<ComboboxRoot options={[]}>
  <ComboboxControl>
    <ComboboxInput placeholder="Type something unfamiliar..." />
    <ComboboxTrigger />
  </ComboboxControl>
  <ComboboxContent>
    <ComboboxEmpty>No matching records found.</ComboboxEmpty>
  </ComboboxContent>
</ComboboxRoot>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Combobox"
        roles={comboboxA11yRoles}
        keyboardKeys={comboboxKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Combobox (ComboboxRoot)" props={comboboxRootPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="ComboboxItem" props={comboboxItemPropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
