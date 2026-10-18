import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Pagination,
  Box,
  Stack,
  Text,
} from "@chellaa/react";

export const paginationToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants-sizes", title: "Variants & Sizing" },
  { id: "page-size-jumper", title: "Size Selector & Quick Jumper" },
  { id: "boundaries-siblings", title: "Boundary & Sibling Controls" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const paginationRootPropsData: PropRow[] = [
  {
    name: "total",
    type: "number",
    default: "Required",
    description: "Total number of items in the dataset used to calculate page count.",
  },
  {
    name: "pageSize",
    type: "number",
    default: "10",
    description: "Number of items displayed per page.",
  },
  {
    name: "page",
    type: "number",
    default: "undefined",
    description: "Controlled current active page number (1-indexed).",
  },
  {
    name: "defaultPage",
    type: "number",
    default: "1",
    description: "Initial active page number when uncontrolled.",
  },
  {
    name: "onPageChange",
    type: "(page: number) => void",
    default: "undefined",
    description: "Callback fired when user selects a different page.",
  },
  {
    name: "siblingCount",
    type: "number",
    default: "1",
    description: "Number of adjacent page buttons rendered on each side of the active page.",
  },
  {
    name: "boundaryCount",
    type: "number",
    default: "1",
    description: "Number of boundary page buttons rendered at the start and end of the list.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Spatial sizing scale (sm: 28px, md: 36px, lg: 44px).",
  },
  {
    name: "variant",
    type: '"outline" | "solid" | "ghost" | "subtle"',
    default: '"outline"',
    description: "Visual button aesthetic variant for active and inactive pages.",
  },
  {
    name: "showSizeChanger",
    type: "boolean",
    default: "false",
    description: "Displays the integrated page size selector dropdown.",
  },
  {
    name: "showQuickJumper",
    type: "boolean",
    default: "false",
    description: "Displays direct numeric input to jump directly to any page.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables all pagination buttons and controls.",
  },
];

const paginationA11yRoles = [
  {
    attributeOrKey: "nav landmark with aria-label",
    description: "Pagination renders as a <nav aria-label='Pagination'> landmark for assistive screen readers.",
  },
  {
    attributeOrKey: "aria-current='page'",
    description: "Applied to the active page button indicating current position in the sequence.",
  },
  {
    attributeOrKey: "aria-disabled='true'",
    description: "Applied to Previous/Next buttons when currently on boundary pages.",
  },
];

const paginationKeyboardKeys = [
  {
    attributeOrKey: "Tab / Shift+Tab",
    description: "Moves focus through page buttons in natural sequential order.",
  },
  {
    attributeOrKey: "Enter / Space",
    description: "Activates the focused page button.",
  },
];

export function PaginationDocPage() {
  return (
    <ComponentDocLayout
      title="Pagination"
      description="Accessible page-based sequence navigation with boundary controls, ellipsis truncation, page size selectors, and direct jump inputs."
      status="stable"
      version="v0.2.0"
      storybookId="components-navigation-pagination--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Pagination,
  PaginationRoot,
  PaginationList,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
  PaginationEllipsis,
  PaginationSizeSelect,
  PaginationJumper,
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
          Pass <code>total</code> and optional <code>pageSize</code> to <code>Pagination</code>. It automatically computes page tiers, next/prev actions, and ellipsis gaps.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Pagination total={100} pageSize={10} defaultPage={1} />
        </Box>
        <CodeBlock
          code={`<Pagination total={100} pageSize={10} defaultPage={1} />`}
          language="tsx"
        />
      </section>

      <section id="variants-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Sizing</span>
          <a href="#variants-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Choose between <code>outline</code>, <code>solid</code>, <code>ghost</code>, or <code>subtle</code> visual variants, and three sizing scales.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Solid Variant (Small: 28px)</Text>
              <Pagination size="sm" variant="solid" total={80} pageSize={10} defaultPage={3} />
            </Box>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Subtle Variant (Medium: 36px)</Text>
              <Pagination size="md" variant="subtle" total={80} pageSize={10} defaultPage={3} />
            </Box>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Ghost Variant (Large: 44px)</Text>
              <Pagination size="lg" variant="ghost" total={80} pageSize={10} defaultPage={3} />
            </Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Pagination size="sm" variant="solid" total={80} pageSize={10} defaultPage={3} />
<Pagination size="md" variant="subtle" total={80} pageSize={10} defaultPage={3} />
<Pagination size="lg" variant="ghost" total={80} pageSize={10} defaultPage={3} />`}
          language="tsx"
        />
      </section>

      <section id="page-size-jumper" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Size Selector & Quick Jumper</span>
          <a href="#page-size-jumper" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Enable <code>showSizeChanger</code> to let users configure items per page, and <code>showQuickJumper</code> to jump directly to any page number.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Pagination
            total={250}
            pageSize={10}
            defaultPage={2}
            showSizeChanger
            showQuickJumper
          />
        </Box>
        <CodeBlock
          code={`<Pagination
  total={250}
  pageSize={10}
  defaultPage={2}
  showSizeChanger
  showQuickJumper
/>`}
          language="tsx"
        />
      </section>

      <section id="boundaries-siblings" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Boundary & Sibling Controls</span>
          <a href="#boundaries-siblings" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Customize how many page buttons appear around the current page using <code>siblingCount</code> and <code>boundaryCount</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Pagination
            total={500}
            pageSize={10}
            defaultPage={25}
            siblingCount={2}
            boundaryCount={2}
          />
        </Box>
        <CodeBlock
          code={`<Pagination
  total={500}
  pageSize={10}
  defaultPage={25}
  siblingCount={2}
  boundaryCount={2}
/>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Pagination"
        roles={paginationA11yRoles}
        keyboardKeys={paginationKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Pagination (PaginationRoot)" props={paginationRootPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
