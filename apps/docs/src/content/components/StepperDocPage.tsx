import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Stepper } from "@chellaa/react";
import type { StepItem } from "@chellaa/react";

export const stepperToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "vertical-orientation", title: "Vertical Orientation" },
  { id: "interactive-steps", title: "Interactive Steps" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const stepperPropsData: PropRow[] = [
  {
    name: "steps",
    type: "StepItem[]",
    default: "[]",
    description: "Array of step definitions with id, label, description, icon, disabled, and error.",
  },
  {
    name: "activeStep",
    type: "string | number",
    default: "undefined",
    description: "Controlled active step identifier or index.",
  },
  {
    name: "defaultActiveStep",
    type: "string | number",
    default: "0",
    description: "Initial active step in uncontrolled mode.",
  },
  {
    name: "onStepChange",
    type: "(stepId: string | number) => void",
    default: "undefined",
    description: "Callback fired when the active step changes.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: "Layout orientation of steps and connectors.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Size scale for step indicators and labels.",
  },
  {
    name: "isClickable",
    type: "boolean | ((step: StepItem, index: number) => boolean)",
    default: "false",
    description: "Whether step items can be clicked to navigate.",
  },
  {
    name: "ariaLabel",
    type: "string",
    default: "'Progress'",
    description: "Accessible name for the navigation landmark.",
  },
];

const sampleSteps: StepItem[] = [
  { id: "account", label: "Account Info", description: "Username & Password" },
  { id: "profile", label: "Profile", description: "Personal details", optional: true },
  { id: "billing", label: "Billing", description: "Payment method" },
  { id: "done", label: "Complete", description: "Review and activate" },
];

export function StepperDocPage() {
  return (
    <ComponentDocLayout
      title="Stepper"
      description="Multi-step progress indicator for forms, onboarding, and multi-stage workflows with horizontal/vertical orientations, error states, and interactive steps."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { Stepper } from "@chellaa/react";\nimport type { StepItem, StepperProps } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>Horizontal stepper showing completed, current, and upcoming stages:</p>
        <div style={{ maxWidth: 750, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <Stepper steps={sampleSteps} defaultActiveStep={1} />
        </div>
      </div>

      <div id="vertical-orientation" style={{ marginBottom: "2rem" }}>
        <h2>Vertical Orientation</h2>
        <p>Vertical layout suitable for sidebars, narrow screens, or complex processes:</p>
        <div style={{ maxWidth: 400, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <Stepper steps={sampleSteps} orientation="vertical" defaultActiveStep={2} />
        </div>
      </div>

      <div id="interactive-steps" style={{ marginBottom: "2rem" }}>
        <h2>Interactive Steps</h2>
        <p>Enable clickable navigation across steps with <code>isClickable</code>:</p>
        <div style={{ maxWidth: 750, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <Stepper steps={sampleSteps} defaultActiveStep={1} isClickable />
        </div>
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="Stepper"
          roles={[
            { attributeOrKey: "nav[aria-label]", description: "Wraps stepper in an accessible navigation landmark." },
            { attributeOrKey: "ol > li", description: "Ordered list reflecting sequential progression." },
            { attributeOrKey: "aria-current='step'", description: "Identifies the currently active step." },
            { attributeOrKey: "button.cl-stepper__trigger", description: "Accessible keyboard-operable trigger when clickable." },
            { attributeOrKey: "aria-hidden='true'", description: "Applied to decorative connector lines and status icons." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "Tab / Shift+Tab", description: "Moves focus between clickable step triggers." },
            { attributeOrKey: "Enter / Space", description: "Activates a focused step when clickable." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="Stepper" props={stepperPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
