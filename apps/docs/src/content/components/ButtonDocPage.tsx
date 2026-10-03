import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Callout } from "../../components/Common/Callout";
import { InteractiveButtonSandbox } from "../../components/ComponentDoc/InteractiveButtonSandbox";
import { ButtonBasicExample } from "../../examples/button/ButtonBasicExample";
import { ButtonVariantsExample } from "../../examples/button/ButtonVariantsExample";
import { ButtonSizesExample } from "../../examples/button/ButtonSizesExample";
import { ButtonStatesExample } from "../../examples/button/ButtonStatesExample";
import { ButtonAsChildExample } from "../../examples/button/ButtonAsChildExample";

export const buttonToc = [
  { id: "interactive-sandbox", title: "Interactive Playground" },
  { id: "import", title: "Import" },
  { id: "variants", title: "Aesthetic Variants" },
  { id: "colors", title: "Color Schemes" },
  { id: "sizes", title: "Sizes Scale" },
  { id: "states", title: "States & Loading" },
  { id: "as-child", title: "Polymorphism (asChild)" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const buttonPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost" | "subtle" | "link"',
    default: '"solid"',
    description: "Visual aesthetic style and treatment.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Spatial height, padding, font size, and icon sizing scale.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info"',
    default: '"primary"',
    description: "Semantic color intent mapped to design system tokens.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description:
      "Prevents user interaction, sets native disabled attribute, and applies reduced opacity.",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description:
      "Displays animated SVG spinner, sets aria-busy='true', and blocks clicks.",
  },
  {
    name: "loadingText",
    type: "string",
    default: "undefined",
    description:
      "Accessible text displayed adjacent to spinner during loading state.",
  },
  {
    name: "loadingPosition",
    type: '"start" | "end" | "center"',
    default: '"start"',
    description:
      "Placement of the loading spinner relative to button children.",
  },
  {
    name: "startIcon",
    type: "ReactNode",
    default: "undefined",
    description: "Decorative leading icon element with aria-hidden='true'.",
  },
  {
    name: "endIcon",
    type: "ReactNode",
    default: "undefined",
    description: "Decorative trailing icon element with aria-hidden='true'.",
  },
  {
    name: "isFullWidth",
    type: "boolean",
    default: "false",
    description: "Expands button width to 100% of parent container.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description:
      "Delegates rendering to child element via Radix Slot primitive.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "role='button'",
    description:
      "Native <button> element provides implicit button role to assistive technologies.",
  },
  {
    attributeOrKey: "aria-busy='true'",
    description: "Announced by screen readers when isLoading is active.",
  },
  {
    attributeOrKey: "aria-disabled='true'",
    description: "Applied on polymorphic elements (e.g. <a>) when disabled.",
  },
  {
    attributeOrKey: "aria-label",
    description:
      "Required when rendering icon-only buttons with no textual children.",
  },
];

const keyboardKeys = [
  {
    attributeOrKey: "Tab / Shift+Tab",
    description:
      "Moves focus into and out of the button in natural DOM tab order.",
  },
  {
    attributeOrKey: "Enter",
    description: "Activates the button action or submits the enclosing form.",
  },
  {
    attributeOrKey: "Space",
    description:
      "Activates the button on key down and fires onClick on key release.",
  },
];

export function ButtonDocPage() {
  return (
    <ComponentDocLayout
      title="Button"
      description="The Button component triggers an action or event, such as submitting a form, opening a dialog, canceling an operation, or performing a deletion."
      status="stable"
      version="v0.1.0"
      storybookId="components-button--default"
    >
      <div id="interactive-sandbox">
        <InteractiveButtonSandbox />
      </div>

      <section id="import" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <CodeBlock
          code='import { Button } from "@chellaa/react";'
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Aesthetic Variants</span>
          <a href="#variants" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Use the <code>variant</code> prop to adjust the visual prominence of
          the button.
        </p>
        <ButtonBasicExample />
      </section>

      <section id="colors" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Color Schemes</span>
          <a href="#colors" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Use the <code>colorScheme</code> prop to communicate intent and
          status.
        </p>
        <ButtonVariantsExample />
      </section>

      <section id="sizes" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Sizes Scale</span>
          <a href="#sizes" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Buttons follow the 4px/8px spatial baseline grid with heights of 28px,
          32px, 40px, 48px, and 56px.
        </p>
        <ButtonSizesExample />
      </section>

      <section id="states" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Interaction & Loading States</span>
          <a href="#states" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Support for disabled and asynchronous loading states with integrated
          double-click protection.
        </p>
        <ButtonStatesExample />
      </section>

      <section id="as-child" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>
            Polymorphic Slot Delegation (<code>asChild</code>)
          </span>
          <a href="#as-child" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Pass <code>asChild</code> to render any custom element or router link
          while retaining complete button styling and behaviors.
        </p>
        <ButtonAsChildExample />
        <Callout type="tip" title="Framework Link Integration">
          When using Next.js <code>&lt;Link&gt;</code> or React Router{" "}
          <code>&lt;Link&gt;</code>, use <code>asChild</code> to avoid invalid
          nested <code>&lt;button&gt;</code> inside <code>&lt;a&gt;</code> tags.
        </Callout>
      </section>

      <AccessibilitySection
        componentName="Button"
        roles={a11yRoles}
        keyboardKeys={keyboardKeys}
      />

      <ApiTable componentName="Button" props={buttonPropsData} />
    </ComponentDocLayout>
  );
}
