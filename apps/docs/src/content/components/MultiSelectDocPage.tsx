import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { MultiSelect, FormField, FormLabel, FormHelperText } from "@chellaa/react";

export const multiSelectToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "formfield-integration", title: "FormField Integration" },
  { id: "max-tag-count", title: "Max Tag Count" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const multiSelectPropsData: PropRow[] = [
  {
    name: "options",
    type: "MultiSelectOption<TValue>[]",
    default: "[]",
    description: "Array of selectable option objects { label, value, disabled, description }.",
  },
  {
    name: "value",
    type: "TValue[]",
    default: "undefined",
    description: "Controlled array of selected values.",
  },
  {
    name: "defaultValue",
    type: "TValue[]",
    default: "[]",
    description: "Initial selected values in uncontrolled mode.",
  },
  {
    name: "onChange",
    type: "(values: TValue[]) => void",
    default: "undefined",
    description: "Callback fired when selected items change.",
  },
  {
    name: "isSearchable",
    type: "boolean",
    default: "true",
    description: "Whether search filtering is enabled in the dropdown.",
  },
  {
    name: "isClearable",
    type: "boolean",
    default: "true",
    description: "Whether the clear-all button is rendered when values exist.",
  },
  {
    name: "maxTagCount",
    type: "number",
    default: "undefined",
    description: "Maximum visible tag chips before truncating with +N badge.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Whether the multiselect control is disabled.",
  },
  {
    name: "isInvalid",
    type: "boolean",
    default: "false",
    description: "Whether the multiselect control indicates an error state.",
  },
];

const sampleFrameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular", disabled: true },
  { label: "Next.js", value: "nextjs" },
  { label: "SolidJS", value: "solid" },
];

export function MultiSelectDocPage() {
  return (
    <ComponentDocLayout
      title="MultiSelect"
      description="Accessible searchable multiple-choice dropdown with tag chips, remove actions, clear-all, and FormField cascading."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { MultiSelect } from "@chellaa/react";\nimport type { MultiSelectOption, MultiSelectProps } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>Uncontrolled multi-selection with search filtering and tag chips:</p>
        <div style={{ maxWidth: 450, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <MultiSelect
            options={sampleFrameworks}
            placeholder="Select frontend frameworks..."
            defaultValue={["react", "nextjs"]}
          />
        </div>
      </div>

      <div id="formfield-integration" style={{ marginBottom: "2rem" }}>
        <h2>FormField Integration</h2>
        <p>Integrates seamlessly with FormField labels, error messages, and ARIA described-by links:</p>
        <div style={{ maxWidth: 450, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <FormField id="frameworks-field">
            <FormLabel>Required Technologies</FormLabel>
            <MultiSelect
              options={sampleFrameworks}
              placeholder="Pick at least 2 technologies..."
              defaultValue={["react"]}
            />
            <FormHelperText>Select the core libraries your project depends on</FormHelperText>
          </FormField>
        </div>
      </div>

      <div id="max-tag-count" style={{ marginBottom: "2rem" }}>
        <h2>Max Tag Count</h2>
        <p>Limit the number of visible tags with the <code>maxTagCount</code> prop:</p>
        <div style={{ maxWidth: 450, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <MultiSelect
            options={sampleFrameworks}
            maxTagCount={2}
            defaultValue={["react", "nextjs", "svelte"]}
          />
        </div>
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="MultiSelect"
          roles={[
            { attributeOrKey: "role='combobox'", description: "Applied to the interactive trigger control." },
            { attributeOrKey: "aria-expanded", description: "Indicates whether popup list is open." },
            { attributeOrKey: "role='listbox'", description: "Applied to the popup container with multiselectable=true." },
            { attributeOrKey: "role='option'", description: "Applied to each item with aria-selected state." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "Enter / Space / DownArrow", description: "Opens the options popup." },
            { attributeOrKey: "ArrowDown / ArrowUp", description: "Navigates between matching options." },
            { attributeOrKey: "Enter", description: "Toggles selection of the focused option." },
            { attributeOrKey: "Backspace", description: "Removes trailing selected chip when search is empty." },
            { attributeOrKey: "Escape", description: "Closes the popup and restores focus to control." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="MultiSelect" props={multiSelectPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
