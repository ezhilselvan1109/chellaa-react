import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableRoot,
  TableContainer,
  TableCaption,
  TableThead,
  TableTbody,
  TableTfoot,
  TableTr,
  TableTh,
  TableTd,
} from "./Table";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Pagination } from "../Pagination";
import { ThemeProvider } from "../../theme/ThemeProvider";

// ─── SVG Icons (Zero Raw Emojis per Design System Standards) ─────────────────

const SortAscIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const SortDescIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SortNeutralIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.4 }}>
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5-5" />
  </svg>
);

const SearchOffIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
    <path d="m8 8 6 6" />
  </svg>
);

const meta: Meta<typeof TableRoot> = {
  title: "Components/Table",
  component: TableRoot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof TableRoot>;

const sampleUsers = [
  { id: "USR-001", name: "Sarah Connor", role: "Administrator", status: "success", statusText: "Active", spendRaw: 1240.5, spend: "$1,240.50" },
  { id: "USR-002", name: "John Doe", role: "Developer", status: "primary", statusText: "Invited", spendRaw: 310.0, spend: "$310.00" },
  { id: "USR-003", name: "Ellen Ripley", role: "Security Lead", status: "success", statusText: "Active", spendRaw: 4900.0, spend: "$4,900.00" },
  { id: "USR-004", name: "Arthur Dent", role: "Viewer", status: "warning", statusText: "Pending", spendRaw: 42.0, spend: "$42.00" },
  { id: "USR-005", name: "Rick Deckard", role: "Auditor", status: "neutral", statusText: "Suspended", spendRaw: 0.0, spend: "$0.00" },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <TableContainer bordered>
        <TableRoot isHoverable>
          <TableCaption>Team Members & Resource Usage</TableCaption>
          <TableThead>
            <TableTr>
              <TableTh>User ID</TableTh>
              <TableTh>Name</TableTh>
              <TableTh>Role</TableTh>
              <TableTh>Status</TableTh>
              <TableTh isNumeric>Monthly Spend</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {sampleUsers.map((user) => (
              <TableTr key={user.id}>
                <TableTd><code style={{ fontSize: "12px", background: "var(--cl-color-bg-muted)", padding: "2px 6px", borderRadius: "4px" }}>{user.id}</code></TableTd>
                <TableTd style={{ fontWeight: 500, color: "var(--cl-color-fg-primary)" }}>{user.name}</TableTd>
                <TableTd>{user.role}</TableTd>
                <TableTd>
                  <Badge colorScheme={user.status as any} size="sm">{user.statusText}</Badge>
                </TableTd>
                <TableTd isNumeric style={{ fontWeight: 600 }}>{user.spend}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </TableRoot>
      </TableContainer>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <TableContainer bordered>
        <TableRoot variant="striped" isHoverable>
          <TableCaption>Zebra Striped Dataset</TableCaption>
          <TableThead>
            <TableTr>
              <TableTh>User ID</TableTh>
              <TableTh>Name</TableTh>
              <TableTh>Role</TableTh>
              <TableTh isNumeric>Monthly Spend</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {sampleUsers.map((user) => (
              <TableTr key={user.id}>
                <TableTd><code style={{ fontSize: "12px" }}>{user.id}</code></TableTd>
                <TableTd>{user.name}</TableTd>
                <TableTd>{user.role}</TableTd>
                <TableTd isNumeric>{user.spend}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </TableRoot>
      </TableContainer>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <TableContainer bordered>
        <TableRoot variant="bordered">
          <TableThead>
            <TableTr>
              <TableTh>User ID</TableTh>
              <TableTh>Name</TableTh>
              <TableTh>Role</TableTh>
              <TableTh isNumeric>Monthly Spend</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {sampleUsers.map((user) => (
              <TableTr key={user.id}>
                <TableTd><code style={{ fontSize: "12px" }}>{user.id}</code></TableTd>
                <TableTd>{user.name}</TableTd>
                <TableTd>{user.role}</TableTd>
                <TableTd isNumeric>{user.spend}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </TableRoot>
      </TableContainer>
    </div>
  ),
};

export const DenseSize: Story = {
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <TableContainer bordered>
        <TableRoot size="sm" variant="striped" isHoverable>
          <TableThead>
            <TableTr>
              <TableTh>User ID</TableTh>
              <TableTh>Name</TableTh>
              <TableTh>Role</TableTh>
              <TableTh isNumeric>Monthly Spend</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            {sampleUsers.map((user) => (
              <TableTr key={user.id}>
                <TableTd><code style={{ fontSize: "11px" }}>{user.id}</code></TableTd>
                <TableTd>{user.name}</TableTd>
                <TableTd>{user.role}</TableTd>
                <TableTd isNumeric>{user.spend}</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </TableRoot>
      </TableContainer>
    </div>
  ),
};

export const NumericColumns: Story = {
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <TableContainer bordered>
        <TableRoot>
          <TableCaption>Quarterly Financial Breakdown (USD)</TableCaption>
          <TableThead>
            <TableTr>
              <TableTh>Quarter</TableTh>
              <TableTh isNumeric>Gross Revenue</TableTh>
              <TableTh isNumeric>Cost of Sales (COGS)</TableTh>
              <TableTh isNumeric>Net Margin</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            <TableTr>
              <TableTd style={{ fontWeight: 500 }}>Q1 2026</TableTd>
              <TableTd isNumeric>$124,500.00</TableTd>
              <TableTd isNumeric>$45,200.00</TableTd>
              <TableTd isNumeric style={{ color: "var(--cl-color-success, #16a34a)", fontWeight: 600 }}>$79,300.00</TableTd>
            </TableTr>
            <TableTr>
              <TableTd style={{ fontWeight: 500 }}>Q2 2026</TableTd>
              <TableTd isNumeric>$168,900.00</TableTd>
              <TableTd isNumeric>$52,100.00</TableTd>
              <TableTd isNumeric style={{ color: "var(--cl-color-success, #16a34a)", fontWeight: 600 }}>$116,800.00</TableTd>
            </TableTr>
            <TableTr>
              <TableTd style={{ fontWeight: 500 }}>Q3 2026</TableTd>
              <TableTd isNumeric>$195,400.00</TableTd>
              <TableTd isNumeric>$61,000.00</TableTd>
              <TableTd isNumeric style={{ color: "var(--cl-color-success, #16a34a)", fontWeight: 600 }}>$134,400.00</TableTd>
            </TableTr>
          </TableTbody>
          <TableTfoot>
            <TableTr>
              <TableTh>Total YTD</TableTh>
              <TableTh isNumeric>$488,800.00</TableTh>
              <TableTh isNumeric>$158,300.00</TableTh>
              <TableTh isNumeric style={{ color: "var(--cl-color-success, #16a34a)", fontWeight: 700 }}>$330,500.00</TableTh>
            </TableTr>
          </TableTfoot>
        </TableRoot>
      </TableContainer>
    </div>
  ),
};

export const InteractiveRowSelection: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>(["USR-001", "USR-003"]);

    const isAllSelected = selectedIds.length === sampleUsers.length;
    const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

    const handleSelectAll = () => {
      if (isAllSelected) {
        setSelectedIds([]);
      } else {
        setSelectedIds(sampleUsers.map((u) => u.id));
      }
    };

    const handleToggleRow = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 4px" }}>
          <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--cl-color-fg-secondary)" }}>
            Selected: <span style={{ fontWeight: 700, color: "var(--cl-color-primary)" }}>{selectedIds.length}</span> of {sampleUsers.length} accounts
          </div>
          {selectedIds.length > 0 && (
            <div style={{ display: "flex", gap: 8 }}>
              <Button size="sm" variant="outline" onClick={() => setSelectedIds([])}>Clear</Button>
              <Button size="sm" variant="solid" colorScheme="primary">Export Selected ({selectedIds.length})</Button>
            </div>
          )}
        </div>

        <TableContainer bordered>
          <TableRoot isHoverable>
            <TableThead>
              <TableTr>
                <TableTh style={{ width: 44, textAlign: "center" }}>
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    style={{ cursor: "pointer", width: 16, height: 16 }}
                  />
                </TableTh>
                <TableTh>User ID</TableTh>
                <TableTh>Name</TableTh>
                <TableTh>Role</TableTh>
                <TableTh>Status</TableTh>
                <TableTh isNumeric>Monthly Spend</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {sampleUsers.map((user) => {
                const isSelected = selectedIds.includes(user.id);
                return (
                  <TableTr
                    key={user.id}
                    isSelected={isSelected}
                    onClick={() => handleToggleRow(user.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableTd style={{ width: 44, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        aria-label={`Select ${user.name}`}
                        checked={isSelected}
                        onChange={() => handleToggleRow(user.id)}
                        style={{ cursor: "pointer", width: 16, height: 16 }}
                      />
                    </TableTd>
                    <TableTd><code style={{ fontSize: "12px" }}>{user.id}</code></TableTd>
                    <TableTd style={{ fontWeight: 500 }}>{user.name}</TableTd>
                    <TableTd>{user.role}</TableTd>
                    <TableTd>
                      <Badge colorScheme={user.status as any} size="sm">{user.statusText}</Badge>
                    </TableTd>
                    <TableTd isNumeric>{user.spend}</TableTd>
                  </TableTr>
                );
              })}
            </TableTbody>
          </TableRoot>
        </TableContainer>
      </div>
    );
  },
};

export const SortableColumns: Story = {
  render: () => {
    type SortField = "id" | "name" | "spendRaw";
    type SortDirection = "asc" | "desc" | "none";

    const [sortField, setSortField] = React.useState<SortField>("name");
    const [sortDirection, setSortDirection] = React.useState<SortDirection>("asc");

    const handleSort = (field: SortField) => {
      if (sortField === field) {
        if (sortDirection === "asc") setSortDirection("desc");
        else if (sortDirection === "desc") setSortDirection("none");
        else setSortDirection("asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    };

    const sortedUsers = React.useMemo(() => {
      if (sortDirection === "none") return sampleUsers;
      return [...sampleUsers].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === "number" && typeof valB === "number") {
          return sortDirection === "asc" ? valA - valB : valB - valA;
        }
        return sortDirection === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }, [sortField, sortDirection]);

    const renderSortIcon = (field: SortField) => {
      if (sortField !== field || sortDirection === "none") return <SortNeutralIcon />;
      return sortDirection === "asc" ? <SortAscIcon /> : <SortDescIcon />;
    };

    return (
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <TableContainer bordered>
          <TableRoot isHoverable>
            <TableCaption>Click headers to toggle ascending / descending sorting</TableCaption>
            <TableThead>
              <TableTr>
                <TableTh
                  isSortable
                  sortDirection={sortField === "id" ? sortDirection : "none"}
                  onClick={() => handleSort("id")}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    User ID {renderSortIcon("id")}
                  </span>
                </TableTh>
                <TableTh
                  isSortable
                  sortDirection={sortField === "name" ? sortDirection : "none"}
                  onClick={() => handleSort("name")}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Name {renderSortIcon("name")}
                  </span>
                </TableTh>
                <TableTh>Role</TableTh>
                <TableTh>Status</TableTh>
                <TableTh
                  isNumeric
                  isSortable
                  sortDirection={sortField === "spendRaw" ? sortDirection : "none"}
                  onClick={() => handleSort("spendRaw")}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                    Monthly Spend {renderSortIcon("spendRaw")}
                  </span>
                </TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {sortedUsers.map((user) => (
                <TableTr key={user.id}>
                  <TableTd><code style={{ fontSize: "12px" }}>{user.id}</code></TableTd>
                  <TableTd style={{ fontWeight: 500 }}>{user.name}</TableTd>
                  <TableTd>{user.role}</TableTd>
                  <TableTd>
                    <Badge colorScheme={user.status as any} size="sm">{user.statusText}</Badge>
                  </TableTd>
                  <TableTd isNumeric style={{ fontWeight: 600 }}>{user.spend}</TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </TableRoot>
        </TableContainer>
      </div>
    );
  },
};

export const WithPagination: Story = {
  render: () => {
    const extendedDataset = Array.from({ length: 28 }).map((_, i) => ({
      id: `USR-${String(i + 1).padStart(3, "0")}`,
      name: `Enterprise Operator ${i + 1}`,
      role: i % 3 === 0 ? "Engineering" : i % 2 === 0 ? "Operations" : "Security",
      status: i % 4 === 0 ? "warning" : "success",
      statusText: i % 4 === 0 ? "Maintenance" : "Active",
      spend: `$${((i + 1) * 315).toLocaleString()}.00`,
    }));

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);

    const startIndex = (page - 1) * pageSize;
    const pageItems = extendedDataset.slice(startIndex, startIndex + pageSize);

    return (
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <TableContainer bordered>
          <TableRoot isHoverable variant="striped">
            <TableThead>
              <TableTr>
                <TableTh>User ID</TableTh>
                <TableTh>Operator Name</TableTh>
                <TableTh>Department</TableTh>
                <TableTh>Cluster Status</TableTh>
                <TableTh isNumeric>Monthly Allocation</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {pageItems.map((item) => (
                <TableTr key={item.id}>
                  <TableTd><code style={{ fontSize: "12px" }}>{item.id}</code></TableTd>
                  <TableTd style={{ fontWeight: 500 }}>{item.name}</TableTd>
                  <TableTd>{item.role}</TableTd>
                  <TableTd>
                    <Badge colorScheme={item.status as any} size="sm">{item.statusText}</Badge>
                  </TableTd>
                  <TableTd isNumeric style={{ fontWeight: 600 }}>{item.spend}</TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </TableRoot>
        </TableContainer>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: "13px", color: "var(--cl-color-fg-muted)" }}>
            Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(startIndex + pageSize, extendedDataset.length)}</strong> of <strong>{extendedDataset.length}</strong> operators
          </div>
          <Pagination
            total={extendedDataset.length}
            pageSize={pageSize}
            page={page}
            onPageChange={setPage}
            showSizeChanger
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(1);
            }}
          />
        </div>
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <TableContainer bordered>
        <TableRoot>
          <TableThead>
            <TableTr>
              <TableTh>User ID</TableTh>
              <TableTh>Name</TableTh>
              <TableTh>Role</TableTh>
              <TableTh>Status</TableTh>
              <TableTh isNumeric>Monthly Spend</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            <TableTr>
              <TableTd colSpan={5} style={{ padding: "48px 16px", textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "var(--cl-color-fg-muted)" }}>
                  <SearchOffIcon />
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--cl-color-fg-primary)" }}>
                    No matching records found
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", maxWidth: 320, lineHeight: 1.5 }}>
                    No team members match the current search filters. Try revising your query parameters.
                  </p>
                  <Button size="sm" variant="outline" style={{ marginTop: 8 }}>
                    Clear Filters
                  </Button>
                </div>
              </TableTd>
            </TableTr>
          </TableTbody>
        </TableRoot>
      </TableContainer>
    </div>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <div style={{ maxHeight: "240px", overflowY: "auto", border: "1px solid var(--cl-color-border-subtle, #e2e8f0)", borderRadius: "8px" }}>
        <TableContainer>
          <TableRoot isStickyHeader isHoverable variant="striped">
            <TableThead>
              <TableTr>
                <TableTh>Record #</TableTh>
                <TableTh>Entity</TableTh>
                <TableTh>Timestamp</TableTh>
                <TableTh isNumeric>Bytes Processed</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {Array.from({ length: 24 }).map((_, i) => (
                <TableTr key={i}>
                  <TableTd>#{1000 + i}</TableTd>
                  <TableTd>Telemetry Worker {i % 4}</TableTd>
                  <TableTd>2026-10-11 04:00:{i < 10 ? `0${i}` : i}</TableTd>
                  <TableTd isNumeric style={{ fontWeight: 500 }}>{(i * 1234 + 500).toLocaleString()} B</TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </TableRoot>
        </TableContainer>
      </div>
    </div>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark" enableSystem={false}>
      <div
        data-theme="dark"
        style={{
          background: "var(--cl-color-bg-canvas, #090d16)",
          padding: 32,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <div>
          <h4 style={{ margin: "0 0 12px 0", color: "#f8fafc", fontSize: "16px", fontWeight: 600 }}>
            Dark Surface Striped Table
          </h4>
          <TableContainer bordered>
            <TableRoot variant="striped" isHoverable>
              <TableThead>
                <TableTr>
                  <TableTh>User ID</TableTh>
                  <TableTh>Name</TableTh>
                  <TableTh>Role</TableTh>
                  <TableTh>Status</TableTh>
                  <TableTh isNumeric>Monthly Spend</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {sampleUsers.map((user, idx) => (
                  <TableTr key={user.id} isSelected={idx === 1}>
                    <TableTd><code style={{ fontSize: "12px" }}>{user.id}</code></TableTd>
                    <TableTd style={{ fontWeight: 500 }}>{user.name}</TableTd>
                    <TableTd>{user.role}</TableTd>
                    <TableTd>
                      <Badge colorScheme={user.status as any} size="sm">{user.statusText}</Badge>
                    </TableTd>
                    <TableTd isNumeric style={{ fontWeight: 600 }}>{user.spend}</TableTd>
                  </TableTr>
                ))}
              </TableTbody>
            </TableRoot>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  ),
};
