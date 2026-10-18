import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  TouchRipple,
  useRipple,
  Paper,
  Box,
  Text,
} from "@chellaa/react";

export const touchRippleToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage (useRipple Hook)" },
  { id: "centered-ripple", title: "Centered & Programmatic Ripples" },
  { id: "custom-surfaces", title: "Custom Interactive Surfaces" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const touchRipplePropsData: PropRow[] = [
  {
    name: "center",
    type: "boolean",
    default: "false",
    description: "If true, the ripple originates from the geometric center of the surface rather than pointer coordinates.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Optional class name passed to the root ripple span element.",
  },
];

const useRippleOptionsData: PropRow[] = [
  {
    name: "center",
    type: "boolean",
    default: "false",
    description: "Whether ripples default to originating from the surface center.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "If true, disables all pointer and touch ripple events.",
  },
  {
    name: "disableRipple",
    type: "boolean",
    default: "false",
    description: "Explicit flag to suppress ripple generation without disabling the host element.",
  },
];

const touchRippleA11yRoles = [
  {
    attributeOrKey: 'aria-hidden="true"',
    description: "TouchRipple is marked aria-hidden by default to exclude visual animation effects from the accessibility tree.",
  },
  {
    attributeOrKey: "pointer-events: none",
    description: "The ripple overlay does not intercept or block user pointer, touch, or click gestures.",
  },
];

const touchRippleKeyboardKeys = [
  {
    attributeOrKey: "Space / Enter",
    description: "When attached to interactive keyboard-accessible buttons, key presses trigger centered ripple bursts.",
  },
];

function InteractiveRippleDemo() {
  const { rippleProps, getRippleHandlers } = useRipple();

  return (
    <Paper
      elevation={2}
      {...getRippleHandlers({
        style: {
          width: "100%",
          maxWidth: 420,
          height: 140,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          userSelect: "none",
          borderRadius: "8px",
          backgroundColor: "var(--cl-color-background-surface, #ffffff)",
          border: "1px solid var(--docs-border)",
        },
      })}
    >
      <Text sx={{ fontWeight: 500, color: "text.primary" }}>
        Click or tap anywhere on this surface
      </Text>
      <TouchRipple {...rippleProps} />
    </Paper>
  );
}

function CenteredRippleDemo() {
  const { rippleProps, getRippleHandlers } = useRipple({ center: true });

  return (
    <Paper
      elevation={1}
      {...getRippleHandlers({
        style: {
          width: "100%",
          maxWidth: 420,
          height: 100,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          userSelect: "none",
          borderRadius: "8px",
          backgroundColor: "var(--cl-color-background-surface, #ffffff)",
          border: "1px solid var(--docs-border)",
        },
      })}
    >
      <Text sx={{ fontWeight: 500, color: "text.secondary" }}>
        Centered Ripple Mode (originates from center)
      </Text>
      <TouchRipple {...rippleProps} />
    </Paper>
  );
}

export function TouchRippleDocPage() {
  return (
    <ComponentDocLayout
      title="TouchRipple"
      description="Material Design tactile feedback primitive that renders expanding radial waves upon pointer and keyboard interactions."
      version="1.0.0"
      status="stable"
      storybookId="components-feedback-touchripple--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  TouchRipple,
  useRipple,
  type TouchRippleProps,
  type TouchRippleRef,
  type UseRippleOptions,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage (useRipple Hook)</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Pair <code>TouchRipple</code> with the <code>useRipple()</code> hook to automatically attach mouse, touch, and pointer listeners to any container surface.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <InteractiveRippleDemo />
        </Box>
        <CodeBlock
          code={`function RippleCard() {
  const { rippleProps, getRippleHandlers } = useRipple();

  return (
    <div
      {...getRippleHandlers({
        style: {
          position: "relative",
          overflow: "hidden",
          padding: "24px",
          borderRadius: "8px",
          cursor: "pointer",
        },
      })}
    >
      Click me for ripple feedback
      <TouchRipple {...rippleProps} />
    </div>
  );
}`}
          language="tsx"
        />
      </section>

      <section id="centered-ripple" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Centered & Programmatic Ripples</span>
          <a href="#centered-ripple" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Pass <code>center: true</code> to <code>useRipple</code> or set <code>center</code> on <code>TouchRipple</code> to always radiate outwards from the middle of the host element, standard for circular icon buttons and toggle switches.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <CenteredRippleDemo />
        </Box>
        <CodeBlock
          code={`const { rippleProps, getRippleHandlers } = useRipple({ center: true });

<button {...getRippleHandlers()}>
  Centered Ripple Target
  <TouchRipple {...rippleProps} />
</button>`}
          language="tsx"
        />
      </section>

      <section id="custom-surfaces" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Custom Interactive Surfaces</span>
          <a href="#custom-surfaces" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          For a surface to render ripples properly, ensure the host element meets two CSS requirements:
        </p>
        <ul className="docs-list">
          <li><code>position: relative</code> (or <code>absolute</code> / <code>fixed</code>) so the absolutely positioned ripple aligns to its boundaries.</li>
          <li><code>overflow: hidden</code> so circular ripple waves do not bleed past rounded corners.</li>
        </ul>
      </section>

      <AccessibilitySection
        componentName="TouchRipple"
        roles={touchRippleA11yRoles}
        keyboardKeys={touchRippleKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <h3 className="docs-heading-3">TouchRipple Props</h3>
        <ApiTable componentName="TouchRipple" props={touchRipplePropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "24px" }}>useRipple Options</h3>
        <ApiTable componentName="useRipple" props={useRippleOptionsData} />
      </section>
    </ComponentDocLayout>
  );
}
