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

const meta: Meta<typeof TableRoot> = {
  title: "Components/Table",
  component: TableRoot,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof TableRoot>;

const sampleUsers = [
  { id: "USR-001", name: "Sarah Connor", role: "Administrator", status: "success", statusText: "Active", spend: "$1,240.50" },
  { id: "USR-002", name: "John Doe", role: "Developer", status: "primary", statusText: "Invited", spend: "$310.00" },
  { id: "USR-003", name: "Ellen Ripley", role: "Security Lead", status: "success", statusText: "Active", spend: "$4,900.00" },
  { id: "USR-004", name: "Arthur Dent", role: "Viewer", status: "warning", statusText: "Pending", spend: "$42.00" },
  { id: "USR-005", name: "Rick Deckard", role: "Auditor", status: "neutral", statusText: "Suspended", spend: "$0.00" },
];

export const Default: Story = {
  render: () => (
    <TableContainer>
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
              <TableTd><code>{user.id}</code></TableTd>
              <TableTd style={{ fontWeight: 500 }}>{user.name}</TableTd>
              <TableTd>{user.role}</TableTd>
              <TableTd>
                <Badge colorScheme={user.status as any} size="sm">{user.statusText}</Badge>
              </TableTd>
              <TableTd isNumeric>{user.spend}</TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </TableRoot>
    </TableContainer>
  ),
};

export const Striped: Story = {
  render: () => (
    <TableContainer>
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
              <TableTd><code>{user.id}</code></TableTd>
              <TableTd>{user.name}</TableTd>
              <TableTd>{user.role}</TableTd>
              <TableTd isNumeric>{user.spend}</TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </TableRoot>
    </TableContainer>
  ),
};

export const Bordered: Story = {
  render: () => (
    <TableContainer>
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
              <TableTd><code>{user.id}</code></TableTd>
              <TableTd>{user.name}</TableTd>
              <TableTd>{user.role}</TableTd>
              <TableTd isNumeric>{user.spend}</TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </TableRoot>
    </TableContainer>
  ),
};

export const DenseSize: Story = {
  render: () => (
    <TableContainer>
      <TableRoot size="sm" variant="striped">
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
              <TableTd><code>{user.id}</code></TableTd>
              <TableTd>{user.name}</TableTd>
              <TableTd>{user.role}</TableTd>
              <TableTd isNumeric>{user.spend}</TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </TableRoot>
    </TableContainer>
  ),
};

export const NumericColumns: Story = {
  render: () => (
    <TableContainer>
      <TableRoot>
        <TableCaption>Quarterly Financial Breakdown</TableCaption>
        <TableThead>
          <TableTr>
            <TableTh>Quarter</TableTh>
            <TableTh isNumeric>Revenue</TableTh>
            <TableTh isNumeric>COGS</TableTh>
            <TableTh isNumeric>Net Profit</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          <TableTr>
            <TableTd>Q1 2026</TableTd>
            <TableTd isNumeric>$124,500.00</TableTd>
            <TableTd isNumeric>$45,200.00</TableTd>
            <TableTd isNumeric>$79,300.00</TableTd>
          </TableTr>
          <TableTr>
            <TableTd>Q2 2026</TableTd>
            <TableTd isNumeric>$168,900.00</TableTd>
            <TableTd isNumeric>$52,100.00</TableTd>
            <TableTd isNumeric>$116,800.00</TableTd>
          </TableTr>
        </TableTbody>
        <TableTfoot>
          <TableTr>
            <TableTh>Total YTD</TableTh>
            <TableTh isNumeric>$293,400.00</TableTh>
            <TableTh isNumeric>$97,300.00</TableTh>
            <TableTh isNumeric>$196,100.00</TableTh>
          </TableTr>
        </TableTfoot>
      </TableRoot>
    </TableContainer>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <div style={{ maxHeight: "220px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
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
            {Array.from({ length: 20 }).map((_, i) => (
              <TableTr key={i}>
                <TableTd>#{1000 + i}</TableTd>
                <TableTd>Telemetry Worker {i % 4}</TableTd>
                <TableTd>2026-10-11 04:00:{i < 10 ? `0${i}` : i}</TableTd>
                <TableTd isNumeric>{(i * 1234 + 500).toLocaleString()} B</TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </TableRoot>
      </TableContainer>
    </div>
  ),
};
