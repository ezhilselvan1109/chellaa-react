import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { RangeSlider, FormField, FormLabel, FormHelperText } from "@chellaa/react";

export const rangeSliderToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "min-distance", title: "Minimum Distance & Non-Crossing" },
  { id: "formfield-integration", title: "FormField Integration" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const rangeSliderPropsData: PropRow[] = [
  {
    name: "value",
    type: "[number, number]",
    default: "undefined",
    description: "Controlled tuple of [minValue, maxValue].",
  },
  {
    name: "defaultValue",
    type: "[number, number]",
    default: "[min, max]",
    description: "Initial tuple when uncontrolled.",
  },
  {
    name: "onChange",
    type: "(value: [number, number]) => void",
    default: "undefined",
    description: "Callback fired when either thumb position updates.",
  },
  {
    name: "min",
    type: "number",
    default: "0",
    description: "Minimum allowable value.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum allowable value.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    description: "Granular stepping increment.",
  },
  {
    name: "minDistance",
    type: "number",
    default: "0",
    description: "Minimum distance maintained between thumbs; thumbs never cross.",
  },
  {
    name: "minAriaLabel",
    type: "string",
    default: "'Minimum value'",
    description: "Accessible name for the lower thumb.",
  },
  {
    name: "maxAriaLabel",
    type: "string",
    default: "'Maximum value'",
    description: "Accessible name for the upper thumb.",
  },
];

export function RangeSliderDocPage() {
  const [range, setRange] = React.useState<[number, number]>([20, 80]);

  return (
    <ComponentDocLayout
      title="RangeSlider"
      description="Accessible dual-thumb continuous range slider with non-crossing minDistance enforcement, independent keyboard stepping, and FormField cascade."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { RangeSlider } from "@chellaa/react";\nimport type { RangeSliderProps } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>A dual-thumb slider with live range readout:</p>
        <div style={{ maxWidth: 400, marginTop: 12 }}>
          <RangeSlider
            minAriaLabel="Minimum price"
            maxAriaLabel="Maximum price"
            value={range}
            onChange={setRange}
          />
          <div style={{ marginTop: 8, fontSize: "0.875rem", color: "var(--cl-color-fg-muted)" }}>
            Current range: ${range[0]} - ${range[1]}
          </div>
        </div>
      </div>

      <div id="min-distance" style={{ marginBottom: "2rem" }}>
        <h2>Minimum Distance & Non-Crossing</h2>
        <p>Use <code>minDistance</code> to enforce a mandatory gap between lower and upper values:</p>
        <div style={{ maxWidth: 400, marginTop: 12 }}>
          <RangeSlider
            defaultValue={[25, 75]}
            minDistance={20}
            step={5}
          />
        </div>
      </div>

      <div id="formfield-integration" style={{ marginBottom: "2rem" }}>
        <h2>FormField Integration</h2>
        <div style={{ maxWidth: 400, marginTop: 12 }}>
          <FormField id="budget-range-field">
            <FormLabel>Budget Filter</FormLabel>
            <RangeSlider defaultValue={[100, 500]} min={0} max={1000} step={25} />
            <FormHelperText>Select minimum and maximum project budget</FormHelperText>
          </FormField>
        </div>
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="RangeSlider"
          roles={[
            { attributeOrKey: "role='slider'", description: "Applied to both lower and upper draggable thumbs." },
            { attributeOrKey: "aria-label", description: "Independent labels (minAriaLabel / maxAriaLabel)." },
            { attributeOrKey: "aria-valuenow", description: "Current numeric position of the specific thumb." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "ArrowRight / ArrowUp", description: "Increments thumb value up to constraint boundary." },
            { attributeOrKey: "ArrowLeft / ArrowDown", description: "Decrements thumb value down to constraint boundary." },
            { attributeOrKey: "Home / End", description: "Moves focused thumb to lowest/highest permitted value without crossing." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="RangeSlider" props={rangeSliderPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
