import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Slider, FormField, FormLabel, FormHelperText } from "@chellaa/react";

export const sliderToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "step-and-marks", title: "Step & Tick Marks" },
  { id: "formfield-integration", title: "FormField Integration" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const sliderPropsData: PropRow[] = [
  {
    name: "value",
    type: "number",
    default: "undefined",
    description: "Controlled numeric value.",
  },
  {
    name: "defaultValue",
    type: "number",
    default: "min",
    description: "Initial numeric value when uncontrolled.",
  },
  {
    name: "onChange",
    type: "(value: number) => void",
    default: "undefined",
    description: "Callback fired when slider value updates.",
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
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Spatial density scale.",
  },
  {
    name: "colorScheme",
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
    default: "'primary'",
    description: "Color palette theme for active filled track and thumb.",
  },
  {
    name: "marks",
    type: "SliderMark[]",
    default: "undefined",
    description: "Tick marks and text labels along the track.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims appearance.",
  },
];

export function SliderDocPage() {
  const [val, setVal] = React.useState<number>(45);

  return (
    <ComponentDocLayout
      title="Slider"
      description="Accessible single-value continuous range slider with keyboard navigation, marks, and FormField cascade."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { Slider } from "@chellaa/react";\nimport type { SliderProps } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>A continuous slider with live value readout:</p>
        <div style={{ maxWidth: 400, marginTop: 12 }}>
          <Slider
            aria-label="Volume"
            value={val}
            onChange={setVal}
          />
          <div style={{ marginTop: 8, fontSize: "0.875rem", color: "var(--cl-color-fg-muted)" }}>
            Current value: {val}%
          </div>
        </div>
      </div>

      <div id="step-and-marks" style={{ marginBottom: "2rem" }}>
        <h2>Step & Tick Marks</h2>
        <p>Display milestones and snap to discrete increments:</p>
        <div style={{ maxWidth: 400, marginTop: 12 }}>
          <Slider
            aria-label="Temperature"
            defaultValue={20}
            min={0}
            max={40}
            step={5}
            marks={[
              { value: 0, label: "0°C" },
              { value: 20, label: "20°C" },
              { value: 40, label: "40°C" },
            ]}
          />
        </div>
      </div>

      <div id="formfield-integration" style={{ marginBottom: "2rem" }}>
        <h2>FormField Integration</h2>
        <div style={{ maxWidth: 400, marginTop: 12 }}>
          <FormField id="brightness-field">
            <FormLabel>Display Brightness</FormLabel>
            <Slider defaultValue={75} />
            <FormHelperText>Adjust screen luminosity</FormHelperText>
          </FormField>
        </div>
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="Slider"
          roles={[
            { attributeOrKey: "role='slider'", description: "Applied to the interactive draggable thumb." },
            { attributeOrKey: "aria-valuemin", description: "Configured minimum bound." },
            { attributeOrKey: "aria-valuemax", description: "Configured maximum bound." },
            { attributeOrKey: "aria-valuenow", description: "Current numeric position." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "ArrowRight / ArrowUp", description: "Increments value by one step." },
            { attributeOrKey: "ArrowLeft / ArrowDown", description: "Decrements value by one step." },
            { attributeOrKey: "PageUp / PageDown", description: "Increments / decrements value by 10% of total range." },
            { attributeOrKey: "Home / End", description: "Sets value to minimum or maximum permitted value." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="Slider" props={sliderPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
