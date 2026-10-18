import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Select,
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
  Box,
  Stack,
  Text,
} from "@chellaa/react";

export const selectToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "declarative-options", title: "Declarative Options API" },
  { id: "variants-sizes", title: "Variants & Sizes" },
  { id: "groups-separators", title: "Groups & Separators" },
  { id: "validation-states", title: "Validation & Disabled States" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const selectRootPropsData: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Controlled value of the selected option.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    description: "Initial value of the selected option when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "undefined",
    description: "Event callback fired when an option is selected.",
  },
  {
    name: "isOpen",
    type: "boolean",
    default: "undefined",
    description: "Controlled open state of the dropdown popover menu.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state of the dropdown popover when uncontrolled.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    description: "Event callback fired when dropdown opens or closes.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Spatial sizing scale controlling trigger height, padding, and typography.",
  },
  {
    name: "variant",
    type: '"outline" | "filled" | "flushed"',
    default: '"outline"',
    description: "Visual surface style for the trigger container.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Select an option..."',
    description: "Fallback text displayed when no option is selected.",
  },
  {
    name: "options",
    type: "SelectOption[]",
    default: "undefined",
    description: "Optional declarative array of { value, label, disabled? } for automatic menu generation.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims trigger opacity.",
  },
  {
    name: "isInvalid",
    type: "boolean",
    default: "false",
    description: "Applies error border outline and marks aria-invalid='true'.",
  },
  {
    name: "isRequired",
    type: "boolean",
    default: "false",
    description: "Marks the field as required for form submission.",
  },
  {
    name: "name",
    type: "string",
    default: "undefined",
    description: "Form input name for native form submission.",
  },
];

const selectTriggerPropsData: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using Slot.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS class names applied to the trigger button.",
  },
];

const selectContentPropsData: PropRow[] = [
  {
    name: "position",
    type: '"popper" | "item-aligned"',
    default: '"popper"',
    description: "Positioning strategy of the floating content menu.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance in pixels between trigger and popover menu.",
  },
];

const selectItemPropsData: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "Required",
    description: "Unique value identifier for this option.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Prevents selection of this specific option.",
  },
  {
    name: "textValue",
    type: "string",
    default: "undefined",
    description: "Optional text value for typeahead search when children are complex nodes.",
  },
];

const selectA11yRoles = [
  {
    attributeOrKey: "role='combobox'",
    description: "Exposed on the trigger button with aria-haspopup='listbox' and aria-expanded.",
  },
  {
    attributeOrKey: "role='listbox'",
    description: "Applied to the popover content container managing selectable options.",
  },
  {
    attributeOrKey: "role='option'",
    description: "Applied to each selectable item with aria-selected='true|false'.",
  },
  {
    attributeOrKey: "aria-invalid='true'",
    description: "Announced when isInvalid is true or when contained in an invalid FormField.",
  },
];

const selectKeyboardKeys = [
  {
    attributeOrKey: "Space / Enter",
    description: "Opens the menu or selects the currently highlighted option.",
  },
  {
    attributeOrKey: "Arrow Down / Arrow Up",
    description: "Navigates between options in the listbox menu.",
  },
  {
    attributeOrKey: "Escape",
    description: "Dismisses the open select menu and returns focus to the trigger.",
  },
  {
    attributeOrKey: "Home / End",
    description: "Moves focus directly to the first or last available option in the menu.",
  },
];

export function SelectDocPage() {
  return (
    <ComponentDocLayout
      title="Select"
      description="Accessible dropdown selection control supporting both ergonomic declarative options and compound composition with full WAI-ARIA listbox semantics."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-select--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
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
          <code>Select</code> can be composed with compound primitives to build customized floating option menus with automatic focus management.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ maxWidth: "280px" }}>
            <Select defaultValue="light" placeholder="Select theme mode">
              <SelectTrigger>
                <SelectValue placeholder="Select theme mode" />
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  <SelectItem value="light">
                    <SelectItemText>Light Mode</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                  <SelectItem value="dark">
                    <SelectItemText>Dark Mode</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                  <SelectItem value="system">
                    <SelectItemText>System Preference</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
        </Box>
        <CodeBlock
          code={`<Select defaultValue="light" placeholder="Select theme mode">
  <SelectTrigger>
    <SelectValue placeholder="Select theme mode" />
    <SelectIcon />
  </SelectTrigger>
  <SelectPortal>
    <SelectContent>
      <SelectItem value="light">
        <SelectItemText>Light Mode</SelectItemText>
        <SelectItemIndicator />
      </SelectItem>
      <SelectItem value="dark">
        <SelectItemText>Dark Mode</SelectItemText>
        <SelectItemIndicator />
      </SelectItem>
      <SelectItem value="system">
        <SelectItemText>System Preference</SelectItemText>
        <SelectItemIndicator />
      </SelectItem>
    </SelectContent>
  </SelectPortal>
</Select>`}
          language="tsx"
        />
      </section>

      <section id="declarative-options" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Declarative Options API</span>
          <a href="#declarative-options" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          For rapid form development, pass an <code>options</code> array directly to <code>Select</code>. The internal renderer handles triggers and content automatically.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ maxWidth: "280px" }}>
            <Select
              defaultValue="in"
              placeholder="Choose a region"
              options={[
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "in", label: "India" },
                { value: "de", label: "Germany" },
                { value: "jp", label: "Japan", disabled: true },
              ]}
            />
          </Box>
        </Box>
        <CodeBlock
          code={`<Select
  defaultValue="in"
  placeholder="Choose a region"
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "in", label: "India" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan", disabled: true },
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
          Select supports three surface variants (<code>outline</code>, <code>filled</code>, <code>flushed</code>) and five spatial sizes (<code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2} sx={{ maxWidth: "300px" }}>
            <Select
              size="sm"
              variant="outline"
              defaultValue="sm"
              options={[{ value: "sm", label: "Small Outline (32px)" }]}
            />
            <Select
              size="md"
              variant="filled"
              defaultValue="md"
              options={[{ value: "md", label: "Medium Filled (40px)" }]}
            />
            <Select
              size="lg"
              variant="flushed"
              defaultValue="lg"
              options={[{ value: "lg", label: "Large Flushed Underline (48px)" }]}
            />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Select size="sm" variant="outline" defaultValue="sm" options={...} />
<Select size="md" variant="filled" defaultValue="md" options={...} />
<Select size="lg" variant="flushed" defaultValue="lg" options={...} />`}
          language="tsx"
        />
      </section>

      <section id="groups-separators" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Groups & Separators</span>
          <a href="#groups-separators" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Organize categorical option sets using <code>SelectGroup</code>, <code>SelectLabel</code>, and <code>SelectSeparator</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ maxWidth: "280px" }}>
            <Select defaultValue="react">
              <SelectTrigger>
                <SelectValue placeholder="Select technology" />
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Frontend</SelectLabel>
                    <SelectItem value="react">
                      <SelectItemText>React</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                    <SelectItem value="vue">
                      <SelectItemText>Vue</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Backend</SelectLabel>
                    <SelectItem value="node">
                      <SelectItemText>Node.js</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                    <SelectItem value="go">
                      <SelectItemText>Go</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
        </Box>
        <CodeBlock
          code={`<Select defaultValue="react">
  <SelectTrigger>
    <SelectValue placeholder="Select technology" />
    <SelectIcon />
  </SelectTrigger>
  <SelectPortal>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Frontend</SelectLabel>
        <SelectItem value="react"><SelectItemText>React</SelectItemText></SelectItem>
        <SelectItem value="vue"><SelectItemText>Vue</SelectItemText></SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Backend</SelectLabel>
        <SelectItem value="node"><SelectItemText>Node.js</SelectItemText></SelectItem>
        <SelectItem value="go"><SelectItemText>Go</SelectItemText></SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectPortal>
</Select>`}
          language="tsx"
        />
      </section>

      <section id="validation-states" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Validation & Disabled States</span>
          <a href="#validation-states" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
            <Box sx={{ width: "240px" }}>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Invalid State</Text>
              <Select
                isInvalid
                defaultValue="invalid"
                options={[{ value: "invalid", label: "Invalid Selection" }]}
              />
            </Box>
            <Box sx={{ width: "240px" }}>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Disabled State</Text>
              <Select
                isDisabled
                defaultValue="disabled"
                options={[{ value: "disabled", label: "Disabled Selection" }]}
              />
            </Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Select isInvalid defaultValue="invalid" options={...} />
<Select isDisabled defaultValue="disabled" options={...} />`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Select"
        roles={selectA11yRoles}
        keyboardKeys={selectKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Select (SelectRoot)" props={selectRootPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="SelectTrigger" props={selectTriggerPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="SelectContent" props={selectContentPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="SelectItem" props={selectItemPropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
