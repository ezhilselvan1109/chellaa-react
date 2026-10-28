import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DataGrid } from "./DataGrid";
import type { DataGridColumn } from "./DataGrid.types";

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  status: "active" | "inactive" | "pending";
  salary: number;
}

const columns: DataGridColumn<Employee>[] = [
  { key: "name", header: "Employee Name", isSortable: true },
  { key: "department", header: "Department", isSortable: true },
  { key: "role", header: "Job Title" },
  {
    key: "status",
    header: "Status",
    align: "center",
    cell: ({ value }) => (
      <span
        style={{
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          backgroundColor: value === "active" ? "#dcfce7" : value === "pending" ? "#fef3c7" : "#fee2e2",
          color: value === "active" ? "#166534" : value === "pending" ? "#92400e" : "#991b1b",
        }}
      >
        {String(value)}
      </span>
    ),
  },
  {
    key: "salary",
    header: "Annual Salary",
    align: "right",
    isSortable: true,
    cell: ({ value }) => `$${Number(value).toLocaleString()}`,
  },
];

const mockEmployees: Employee[] = [
  { id: "e1", name: "Sarah Connor", department: "Engineering", role: "Principal Architect", status: "active", salary: 185000 },
  { id: "e2", name: "John Doe", department: "Product", role: "Lead Product Manager", status: "active", salary: 165000 },
  { id: "e3", name: "Alex Murphy", department: "Operations", role: "Security Director", status: "pending", salary: 140000 },
  { id: "e4", name: "Ellen Ripley", department: "Research", role: "Systems Engineer", status: "active", salary: 175000 },
  { id: "e5", name: "Dana Scully", department: "Compliance", role: "Special Investigator", status: "inactive", salary: 130000 },
  { id: "e6", name: "Fox Mulder", department: "Research", role: "Lead Analyst", status: "active", salary: 135000 },
];

const meta: Meta<typeof DataGrid> = {
  title: "Components/Data Display/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Typed tabular data grid organism with client-side sorting, row selection, custom cells, and accessible pagination integration.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const Default: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={mockEmployees}
      getRowId={(r) => r.id}
    />
  ),
};

export const SelectableRows: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={mockEmployees}
      getRowId={(r) => r.id}
      isSelectable
      selectOnRowClick
    />
  ),
};

export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return (
      <DataGrid
        columns={columns}
        data={mockEmployees}
        getRowId={(r) => r.id}
        isSelectable
        pagination={{
          page,
          pageSize: 3,
          onPageChange: setPage,
        }}
      />
    );
  },
};

export const StripedAndBordered: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={mockEmployees}
      getRowId={(r) => r.id}
      variant="bordered"
    />
  ),
};

export const LoadingState: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={mockEmployees}
      getRowId={(r) => r.id}
      isLoading
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[]}
      getRowId={(r) => r.id}
      emptyText="No personnel records found matching current query."
    />
  ),
};
