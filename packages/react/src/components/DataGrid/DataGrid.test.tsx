import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { DataGrid } from "./DataGrid";
import type { DataGridColumn } from "./DataGrid.types";

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

const sampleColumns: DataGridColumn<UserRow>[] = [
  { key: "name", header: "Name", isSortable: true },
  { key: "email", header: "Email" },
  {
    key: "role",
    header: "Role",
    cell: ({ value }) => <span data-testid="badge">{String(value).toUpperCase()}</span>,
  },
];

const sampleData: UserRow[] = [
  { id: 1, name: "Charlie", email: "charlie@example.com", role: "admin" },
  { id: 2, name: "Alice", email: "alice@example.com", role: "editor" },
  { id: 3, name: "Bob", email: "bob@example.com", role: "viewer" },
];

describe("DataGrid Component", () => {
  it("renders table headers and row contents", () => {
    render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
      />
    );

    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("sorts rows ascending and descending when sort button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
      />
    );

    const sortBtn = screen.getByRole("button", { name: /sort by name/i });
    // First click -> asc (Alice, Bob, Charlie)
    await user.click(sortBtn);

    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Alice");

    // Second click -> desc (Charlie, Bob, Alice)
    await user.click(sortBtn);
    const cellsDesc = screen.getAllByRole("cell");
    expect(cellsDesc[0]).toHaveTextContent("Charlie");
  });

  it("handles row selection and select-all indeterminate state", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
        isSelectable
        onSelectionChange={handleSelect}
      />
    );

    const rowCheckbox = screen.getByRole("checkbox", { name: "Select row 1" });
    await user.click(rowCheckbox);

    expect(handleSelect).toHaveBeenCalledWith([1]);
  });

  it("selects all rows when header checkbox is clicked", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
        isSelectable
        onSelectionChange={handleSelect}
      />
    );

    const selectAllCheckbox = screen.getByRole("checkbox", { name: "Select all rows" });
    await user.click(selectAllCheckbox);

    expect(handleSelect).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("renders empty state message when data is empty", () => {
    render(
      <DataGrid
        columns={sampleColumns}
        data={[]}
        getRowId={(r) => r.id}
        emptyText="No users found."
      />
    );

    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
        isLoading
      />
    );

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders custom cell renderer", () => {
    render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
      />
    );

    const badges = screen.getAllByTestId("badge");
    expect(badges[0]).toHaveTextContent("ADMIN");
  });

  it("slices data according to pagination props", () => {
    render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
        pagination={{
          page: 1,
          pageSize: 2,
          onPageChange: () => {},
        }}
      />
    );

    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  it("passes axe accessibility tests", async () => {
    const { container } = render(
      <DataGrid
        columns={sampleColumns}
        data={sampleData}
        getRowId={(r) => r.id}
        aria-label="Users Table"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
