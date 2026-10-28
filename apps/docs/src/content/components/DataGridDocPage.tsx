import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { DataGrid, Badge, type DataGridColumn } from "@chellaa/react";

export const dataGridToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "sorting-selection", title: "Sorting & Row Selection" },
  { id: "pagination", title: "Client-Side Pagination" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const dataGridPropsData: PropRow[] = [
  {
    name: "columns",
    type: "DataGridColumn<TRow, TKey>[]",
    default: "[]",
    description: "Column configurations including key, header, accessor, cell renderer, and isSortable.",
  },
  {
    name: "data",
    type: "TRow[]",
    default: "[]",
    description: "Array of data records.",
  },
  {
    name: "getRowId",
    type: "(row: TRow, index: number) => string | number",
    default: "required",
    description: "Unique identifier extractor for stable row keys and selection.",
  },
  {
    name: "isSelectable",
    type: "boolean",
    default: "false",
    description: "Renders header and row checkboxes for multi-row selection.",
  },
  {
    name: "sort",
    type: "DataGridSort<TKey> | null",
    default: "undefined",
    description: "Controlled sort column and direction.",
  },
  {
    name: "onSortChange",
    type: "(sort: DataGridSort<TKey> | null) => void",
    default: "undefined",
    description: "Callback triggered when a sortable column header is activated.",
  },
  {
    name: "pagination",
    type: "DataGridPaginationProps",
    default: "undefined",
    description: "Pagination controls config (page, pageSize, onPageChange).",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Displays loading overlay and spinner.",
  },
];

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const sampleUsers: UserRecord[] = [
  { id: "u-1", name: "Alice Adams", email: "alice@example.com", role: "Admin", status: "active" },
  { id: "u-2", name: "Bob Builder", email: "bob@example.com", role: "Developer", status: "active" },
  { id: "u-3", name: "Charlie Brown", email: "charlie@example.com", role: "Designer", status: "inactive" },
  { id: "u-4", name: "Diana Prince", email: "diana@example.com", role: "Manager", status: "active" },
];

const columns: DataGridColumn<UserRecord>[] = [
  { key: "name", header: "Name", accessor: (r) => r.name, isSortable: true },
  { key: "email", header: "Email", accessor: (r) => r.email, isSortable: true },
  { key: "role", header: "Role", accessor: (r) => r.role, isSortable: true },
  {
    key: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge colorScheme={row.status === "active" ? "success" : "neutral"}>
        {row.status}
      </Badge>
    ),
  },
];

export function DataGridDocPage() {
  const [selected, setSelected] = React.useState<(string | number)[]>(["u-1"]);

  return (
    <ComponentDocLayout
      title="DataGrid"
      description="Typed tabular data organism with client-side sorting, row selection, pagination, sticky headers, and accessible table semantics."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { DataGrid } from "@chellaa/react";\nimport type { DataGridColumn, DataGridProps } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>A strongly typed data grid with sorting and custom cell badges:</p>
        <div style={{ marginTop: 12 }}>
          <DataGrid
            columns={columns}
            data={sampleUsers}
            getRowId={(r) => r.id}
          />
        </div>
      </div>

      <div id="sorting-selection" style={{ marginBottom: "2rem" }}>
        <h2>Sorting & Row Selection</h2>
        <p>Enable <code>isSelectable</code> for select-all header and checkbox selection:</p>
        <div style={{ marginTop: 12 }}>
          <DataGrid
            columns={columns}
            data={sampleUsers}
            getRowId={(r) => r.id}
            isSelectable
            selectedRowIds={selected}
            onSelectionChange={setSelected}
          />
        </div>
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="DataGrid"
          roles={[
            { attributeOrKey: "aria-sort", description: "Set on sortable column headers ('ascending' | 'descending' | 'none')." },
            { attributeOrKey: "aria-selected", description: "Set on selectable row tr elements." },
            { attributeOrKey: "aria-checked", description: "Set on select-all checkbox (with 'mixed' for indeterminate)." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "Tab", description: "Focuses sort buttons and row selection checkboxes." },
            { attributeOrKey: "Enter / Space", description: "Activates column sorting or toggles row selection." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="DataGrid" props={dataGridPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
