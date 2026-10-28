import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Skeleton, Box } from "@chellaa/react";

export const skeletonToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants", title: "Variants & Shapes" },
  { id: "animations", title: "Animations" },
  { id: "loaded-state", title: "Loaded State (isLoaded)" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const skeletonPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"text" | "circular" | "rectangular" | "rounded"',
    default: '"text"',
    description: "Visual geometric shape of the skeleton placeholder.",
  },
  {
    name: "width",
    type: "string | number",
    default: "undefined",
    description: "Explicit width length (number in pixels or CSS string).",
  },
  {
    name: "height",
    type: "string | number",
    default: "undefined",
    description: "Explicit height length (number in pixels or CSS string).",
  },
  {
    name: "isLoaded",
    type: "boolean",
    default: "false",
    description: "When true, renders wrapped child components instead of placeholder.",
  },
  {
    name: "animation",
    type: '"pulse" | "wave" | "none"',
    default: '"pulse"',
    description: "Animation style applied during loading state.",
  },
];

const skeletonRoles = [
  {
    attributeOrKey: 'aria-hidden="true"',
    description: "Placeholder skeleton nodes are marked aria-hidden to avoid announcing filler blocks to assistive technology.",
  },
];

export function SkeletonDocPage() {
  return (
    <ComponentDocLayout
      title="Skeleton"
      description="Content placeholder displaying an animated preview of UI elements while data is loading."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { Skeleton, type SkeletonProps } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2, width: 300 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </Box>
        <CodeBlock
          code={`<Skeleton variant="text" />
<Skeleton variant="text" width="60%" />`}
          language="tsx"
        />
      </section>

      <section id="variants">
        <h2>Variants & Shapes</h2>
        <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3, width: 320 }}>
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="50%" />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rounded" height={36} />
        </Box>
        <CodeBlock
          code={`<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rectangular" height={100} />
<Skeleton variant="rounded" height={36} />`}
          language="tsx"
        />
      </section>

      <section id="animations">
        <h2>Animations</h2>
        <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3, width: 320 }}>
          <Skeleton animation="pulse" height={32} />
          <Skeleton animation="wave" height={32} />
          <Skeleton animation="none" height={32} />
        </Box>
        <CodeBlock
          code={`<Skeleton animation="pulse" height={32} />
<Skeleton animation="wave" height={32} />
<Skeleton animation="none" height={32} />`}
          language="tsx"
        />
      </section>

      <section id="loaded-state">
        <h2>Loaded State</h2>
        <Box sx={{ p: 4 }}>
          <Skeleton isLoaded={true}>
            <Box sx={{ p: 3, border: "1px solid #e2e8f0", borderRadius: 2 }}>
              <h3>Real Loaded Profile</h3>
              <p>Content seamlessly rendered once asynchronous loading finishes.</p>
            </Box>
          </Skeleton>
        </Box>
        <CodeBlock
          code={`<Skeleton isLoaded={!isLoading}>
  <ProfileCard data={data} />
</Skeleton>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Skeleton"
        roles={skeletonRoles}
        keyboardKeys={[]}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="Skeleton" props={skeletonPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
