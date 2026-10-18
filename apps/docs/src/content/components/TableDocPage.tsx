import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Table,
  TableContainer,
  TableCaption,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
  Badge,
  Box,
} from "@chellaa/react";

export const tableToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants", title: "Visual Variants" },
  { id: "sizes", title: "Density Sizes" },
  { id: "hoverable-selection", title: "Row Hover & Selection" },
  { id: "sortable-headers", title: "Sortable Header Cells" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const tableRootPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"simple" | "striped" | "bordered"',
    default: '"simple"',
    description: "Visual styling motif applied across headers, rows, and dividers.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Spatial density controlling padding and font scale in cells.",
  },
  {
    name: "isHoverable",
    type: "boolean",
    default: "false",
    description: "Enables background hover transitions across all table body rows.",
  },
  {
    name: "isStickyHeader",
    type: "boolean",
    default: "false",
    description: "Pins the table header to the top of scrolling containers.",
  },
];

const tableContainerPropsData: PropRow[] = [
  {
    name: "bordered",
    type: "boolean",
    default: "false",
    description: "Applies a rounded perimeter border, surface background, and subtle shadow.",
  },
];

const tableThPropsData: PropRow[] = [
  {
    name: "isNumeric",
    type: "boolean",
    default: "false",
    description: "Right-aligns text and applies monospace tabular number numerals.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"left"',
    description: "Horizontal text alignment within the header cell.",
  },
  {
    name: "isSortable",
    type: "boolean",
    default: "false",
    description: "Renders interactive sort styling indicators.",
  },
  {
    name: "sortDirection",
    type: '"asc" | "desc" | "none"',
    default: '"none"',
    description: "Sort direction mapped to the accessible aria-sort attribute.",
  },
];

const tableRowPropsData: PropRow[] = [
  {
    name: "isSelected",
    type: "boolean",
    default: "false",
    description: "Applies high-visibility selection highlight to the table row.",
  },
  {
    name: "isHoverable",
    type: "boolean",
    default: "undefined",
    description: "Explicit override to enable or disable hover on this specific row.",
  },
];

const tableA11yRoles = [
  {
    attributeOrKey: "<table>",
    description: "Semantically exposes tabular data structure to assistive technologies.",
  },
  {
    attributeOrKey: '<th scope="col">',
    description: "Associates column header titles with corresponding data cells.",
  },
  {
    attributeOrKey: "aria-sort",
    description: "Communicates sorting direction (ascending, descending, or none) to screen readers.",
  },
  {
    attributeOrKey: "<caption>",
    description: "Provides an accessible description and title for the dataset.",
  },
];

const tableKeyboardKeys = [
  {
    attributeOrKey: "Tab",
    description: "Navigates between interactive elements, sort buttons, and checkboxes inside cells.",
  },
  {
    attributeOrKey: "Enter / Space",
    description: "Toggles sort order when focusing on interactive sortable header buttons.",
  },
];

const sampleData = [
  { id: "INV-1001", client: "Acme Corp", date: "2026-10-12", amount: "$3,450.00", status: "success", statusText: "Paid" },
  { id: "INV-1002", client: "Globex Ltd", date: "2026-10-14", amount: "$1,820.50", status: "warning", statusText: "Pending" },
  { id: "INV-1003", client: "Soylent Corp", date: "2026-10-15", amount: "$940.00", status: "danger", statusText: "Overdue" },
];

export function TableDocPage() {
  const [selectedRow, setSelectedRow] = React.useState<string | null>("INV-1002");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc" | "none">("asc");

  return (
    <ComponentDocLayout
      title="Table"
      description="Semantic tabular data display system with compound structure, customizable density, hover highlights, and accessible sorting affordances."
      version="1.0.0"
      status="stable"
      storybookId="components-data-display-table--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Table,
  TableContainer,
  TableCaption,
  TableThead,
  TableTbody,
  TableTfoot,
  TableTr,
  TableTh,
  TableTd,
  type TableRootProps,
  type TableVariant,
  type TableSize,
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
          Assemble accessible tables using compound structural subcomponents that map to semantic HTML elements.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <TableContainer bordered>
            <Table variant="simple" size="md">
              <TableCaption>Recent enterprise billing transactions</TableCaption>
              <TableThead>
                <TableTr>
                  <TableTh>Invoice ID</TableTh>
                  <TableTh>Client</TableTh>
                  <TableTh>Date</TableTh>
                  <TableTh isNumeric>Amount</TableTh>
                  <TableTh align="center">Status</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {sampleData.map((row) => (
                  <TableTr key={row.id}>
                    <TableTd style={{ fontWeight: 600 }}>{row.id}</TableTd>
                    <TableTd>{row.client}</TableTd>
                    <TableTd>{row.date}</TableTd>
                    <TableTd isNumeric>{row.amount}</TableTd>
                    <TableTd align="center">
                      <Badge
                        variant="subtle"
                        colorScheme={row.status as "success" | "warning" | "danger"}
                      >
                        {row.statusText}
                      </Badge>
                    </TableTd>
                  </TableTr>
                ))}
              </TableTbody>
            </Table>
          </TableContainer>
        </Box>
        <CodeBlock
          code={`<TableContainer bordered>
  <Table variant="simple">
    <TableCaption>Recent enterprise billing transactions</TableCaption>
    <TableThead>
      <TableTr>
        <TableTh>Invoice ID</TableTh>
        <TableTh>Client</TableTh>
        <TableTh isNumeric>Amount</TableTh>
        <TableTh align="center">Status</TableTh>
      </TableTr>
    </TableThead>
    <TableTbody>
      {rows.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.id}</TableTd>
          <TableTd>{row.client}</TableTd>
          <TableTd isNumeric>{row.amount}</TableTd>
          <TableTd align="center">
            <Badge colorScheme={row.status}>{row.statusText}</Badge>
          </TableTd>
        </TableTr>
      ))}
    </TableTbody>
  </Table>
</TableContainer>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Visual Variants</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Table provides three aesthetic variants: <code>simple</code> (clean bottom borders), <code>striped</code> (alternating zebra stripes), and <code>bordered</code> (full inner gridlines).
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <TableContainer bordered>
            <Table variant="striped" size="sm">
              <TableThead>
                <TableTr>
                  <TableTh>Item</TableTh>
                  <TableTh>Category</TableTh>
                  <TableTh isNumeric>Price</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                <TableTr>
                  <TableTd>Server License</TableTd>
                  <TableTd>Infrastructure</TableTd>
                  <TableTd isNumeric>$1,200.00</TableTd>
                </TableTr>
                <TableTr>
                  <TableTd>CDN Bandwidth</TableTd>
                  <TableTd>Networking</TableTd>
                  <TableTd isNumeric>$350.00</TableTd>
                </TableTr>
                <TableTr>
                  <TableTd>SSL Certificate</TableTd>
                  <TableTd>Security</TableTd>
                  <TableTd isNumeric>$89.00</TableTd>
                </TableTr>
              </TableTbody>
            </Table>
          </TableContainer>
        </Box>
        <CodeBlock
          code={`<Table variant="striped">...</Table>
<Table variant="bordered">...</Table>
<Table variant="simple">...</Table>`}
          language="tsx"
        />
      </section>

      <section id="sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Density Sizes</span>
          <a href="#sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Control cell padding and typography scale via <code>size="sm"</code> (compact data view), <code>size="md"</code> (standard), or <code>size="lg"</code> (spacious).
        </p>
        <CodeBlock
          code={`<Table size="sm">...</Table>
<Table size="md">...</Table>
<Table size="lg">...</Table>`}
          language="tsx"
        />
      </section>

      <section id="hoverable-selection" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Row Hover & Selection</span>
          <a href="#hoverable-selection" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Enable <code>isHoverable=&#123;true&#125;</code> on <code>Table</code> for hover feedback, and use <code>isSelected=&#123;true&#125;</code> on <code>TableTr</code> for selected rows.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <TableContainer bordered>
            <Table variant="simple" isHoverable>
              <TableThead>
                <TableTr>
                  <TableTh>Invoice</TableTh>
                  <TableTh>Client</TableTh>
                  <TableTh isNumeric>Amount</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {sampleData.map((row) => (
                  <TableTr
                    key={row.id}
                    isSelected={selectedRow === row.id}
                    onClick={() => setSelectedRow(row.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableTd style={{ fontWeight: 600 }}>{row.id}</TableTd>
                    <TableTd>{row.client}</TableTd>
                    <TableTd isNumeric>{row.amount}</TableTd>
                  </TableTr>
                ))}
              </TableTbody>
            </Table>
          </TableContainer>
        </Box>
        <CodeBlock
          code={`<Table isHoverable>
  <TableTbody>
    <TableTr isSelected={selectedId === item.id} onClick={() => setSelectedId(item.id)}>
      <TableTd>{item.name}</TableTd>
    </TableTr>
  </TableTbody>
</Table>`}
          language="tsx"
        />
      </section>

      <section id="sortable-headers" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Sortable Header Cells</span>
          <a href="#sortable-headers" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Pass <code>isSortable=&#123;true&#125;</code> and <code>sortDirection</code> ("asc", "desc", or "none") to <code>TableTh</code>. The component automatically emits accessible <code>aria-sort</code> attributes.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <TableContainer bordered>
            <Table variant="simple" size="sm">
              <TableThead>
                <TableTr>
                  <TableTh
                    isSortable
                    sortDirection={sortDir}
                    onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                    style={{ cursor: "pointer" }}
                  >
                    Client Name ({sortDir === "asc" ? "Ascending" : "Descending"})
                  </TableTh>
                  <TableTh isNumeric>Total Billed</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                <TableTr>
                  <TableTd>Acme Corp</TableTd>
                  <TableTd isNumeric>$12,400.00</TableTd>
                </TableTr>
                <TableTr>
                  <TableTd>Globex Ltd</TableTd>
                  <TableTd isNumeric>$8,200.00</TableTd>
                </TableTr>
              </TableTbody>
            </Table>
          </TableContainer>
        </Box>
        <CodeBlock
          code={`<TableTh
  isSortable
  sortDirection={sortDirection}
  onClick={toggleSort}
>
  Client Name
</TableTh>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Table"
        roles={tableA11yRoles}
        keyboardKeys={tableKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <h3 className="docs-heading-3">Table Props</h3>
        <ApiTable componentName="Table" props={tableRootPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "24px" }}>TableContainer Props</h3>
        <ApiTable componentName="TableContainer" props={tableContainerPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "24px" }}>TableTh Props</h3>
        <ApiTable componentName="TableTh" props={tableThPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "24px" }}>TableTr Props</h3>
        <ApiTable componentName="TableTr" props={tableRowPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
