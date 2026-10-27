import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
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

describe("Table Component (SPEC-007)", () => {
  const renderStandardTable = (rootProps: Partial<React.ComponentProps<typeof TableRoot>> = {}) => {
    return render(
      <TableContainer data-testid="table-container">
        <TableRoot data-testid="table-root" {...rootProps}>
          <TableCaption data-testid="table-caption">User Invoices</TableCaption>
          <TableThead>
            <TableTr>
              <TableTh>Invoice #</TableTh>
              <TableTh>Status</TableTh>
              <TableTh isNumeric data-testid="amount-th">Amount</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>
            <TableTr data-testid="row-1">
              <TableTd>INV-001</TableTd>
              <TableTd>Paid</TableTd>
              <TableTd isNumeric data-testid="amount-td">$250.00</TableTd>
            </TableTr>
            <TableTr isSelected data-testid="row-2">
              <TableTd>INV-002</TableTd>
              <TableTd>Pending</TableTd>
              <TableTd isNumeric>$120.00</TableTd>
            </TableTr>
          </TableTbody>
          <TableTfoot>
            <TableTr>
              <TableTh colSpan={2}>Total</TableTh>
              <TableTh isNumeric>$370.00</TableTh>
            </TableTr>
          </TableTfoot>
        </TableRoot>
      </TableContainer>
    );
  };

  it("FR-TBL-01: renders full semantic table hierarchy and forwards refs", () => {
    const tableRef = React.createRef<HTMLTableElement>();
    const rowRef = React.createRef<HTMLTableRowElement>();
    const cellRef = React.createRef<HTMLTableCellElement>();

    render(
      <TableRoot ref={tableRef}>
        <TableThead>
          <TableTr ref={rowRef}>
            <TableTh ref={cellRef}>Header</TableTh>
          </TableTr>
        </TableThead>
      </TableRoot>
    );

    expect(tableRef.current?.tagName).toBe("TABLE");
    expect(rowRef.current?.tagName).toBe("TR");
    expect(cellRef.current?.tagName).toBe("TH");
  });

  it("FR-TBL-02: applies simple, striped, bordered variant classes", () => {
    const variants = ["simple", "striped", "bordered"] as const;
    variants.forEach((variant) => {
      const { unmount } = renderStandardTable({ variant });
      const table = screen.getByTestId("table-root");
      expect(table).toHaveClass(`cl-table--${variant}`);
      unmount();
    });
  });

  it("FR-TBL-03: applies sm, md, lg size classes to table", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { unmount } = renderStandardTable({ size });
      const table = screen.getByTestId("table-root");
      expect(table).toHaveClass(`cl-table--${size}`);
      unmount();
    });
  });

  it("FR-TBL-04: applies hoverable classes on table root or row", () => {
    renderStandardTable({ isHoverable: true });
    const table = screen.getByTestId("table-root");
    const row1 = screen.getByTestId("row-1");

    expect(table).toHaveClass("cl-table--hoverable");
    expect(row1).toHaveClass("cl-table__tr--hoverable");
  });

  it("FR-TBL-04: applies selected class on selected row", () => {
    renderStandardTable();
    const row2 = screen.getByTestId("row-2");
    expect(row2).toHaveClass("cl-table__tr--selected");
  });

  it("FR-TBL-05: applies sticky header modifier class", () => {
    renderStandardTable({ isStickyHeader: true });
    const table = screen.getByTestId("table-root");
    expect(table).toHaveClass("cl-table--sticky-header");
  });

  it("FR-TBL-06: applies numeric classes to Th and Td", () => {
    renderStandardTable();
    const amountTh = screen.getByTestId("amount-th");
    const amountTd = screen.getByTestId("amount-td");

    expect(amountTh).toHaveClass("cl-table__th--numeric");
    expect(amountTd).toHaveClass("cl-table__td--numeric");
  });

  it("FR-TBL-07: renders responsive scroll container", () => {
    renderStandardTable();
    const container = screen.getByTestId("table-container");
    expect(container).toHaveClass("cl-table__container");
  });

  it("FR-TBL-08: defaults scope='col' on Th and renders Caption", () => {
    renderStandardTable();
    const ths = screen.getAllByRole("columnheader");
    ths.forEach((th) => {
      expect(th).toHaveAttribute("scope", "col");
    });

    const caption = screen.getByTestId("table-caption");
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveTextContent("User Invoices");
  });

  it("FR-TBL-08: applies top placement to caption when specified", () => {
    render(
      <TableRoot>
        <TableCaption placement="top" data-testid="top-caption">Top Caption</TableCaption>
        <TableTbody>
          <TableTr><TableTd>Cell</TableTd></TableTr>
        </TableTbody>
      </TableRoot>
    );

    const caption = screen.getByTestId("top-caption");
    expect(caption).toHaveClass("cl-table__caption--top");
  });

  it("FR-TBL-09: triggers onClick when row is clicked", () => {
    const handleClick = vi.fn();
    render(
      <TableRoot>
        <TableTbody>
          <TableTr onClick={handleClick} data-testid="clickable-row">
            <TableTd>Click Me</TableTd>
          </TableTr>
        </TableTbody>
      </TableRoot>
    );

    const row = screen.getByTestId("clickable-row");
    fireEvent.click(row);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("FR-TBL-10: applies explicit alignment classes on Th and Td", () => {
    render(
      <TableRoot>
        <TableThead>
          <TableTr>
            <TableTh align="center" data-testid="center-th">Center</TableTh>
            <TableTh align="right" data-testid="right-th">Right</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          <TableTr>
            <TableTd align="center" data-testid="center-td">Center Data</TableTd>
            <TableTd align="right" data-testid="right-td">Right Data</TableTd>
          </TableTr>
        </TableTbody>
      </TableRoot>
    );

    expect(screen.getByTestId("center-th")).toHaveClass("cl-table__th--align-center");
    expect(screen.getByTestId("right-th")).toHaveClass("cl-table__th--align-right");
    expect(screen.getByTestId("center-td")).toHaveClass("cl-table__td--align-center");
    expect(screen.getByTestId("right-td")).toHaveClass("cl-table__td--align-right");
  });

  it("FR-TBL-11: applies sortable styling and accessible aria-sort attribute on Th", () => {
    const { rerender } = render(
      <TableRoot>
        <TableThead>
          <TableTr>
            <TableTh isSortable sortDirection="asc" data-testid="sortable-th">
              Column
            </TableTh>
          </TableTr>
        </TableThead>
      </TableRoot>
    );

    const th = screen.getByTestId("sortable-th");
    expect(th).toHaveClass("cl-table__th--sortable");
    expect(th).toHaveClass("cl-table__th--sorted-asc");
    expect(th).toHaveAttribute("aria-sort", "ascending");

    rerender(
      <TableRoot>
        <TableThead>
          <TableTr>
            <TableTh isSortable sortDirection="desc" data-testid="sortable-th">
              Column
            </TableTh>
          </TableTr>
        </TableThead>
      </TableRoot>
    );
    expect(th).toHaveClass("cl-table__th--sorted-desc");
    expect(th).toHaveAttribute("aria-sort", "descending");

    rerender(
      <TableRoot>
        <TableThead>
          <TableTr>
            <TableTh isSortable sortDirection="none" data-testid="sortable-th">
              Column
            </TableTh>
          </TableTr>
        </TableThead>
      </TableRoot>
    );
    expect(th).toHaveAttribute("aria-sort", "none");
  });

  it("FR-TBL-12: applies cl-table__container--bordered when bordered is true", () => {
    render(
      <TableContainer bordered data-testid="bordered-container">
        <TableRoot />
      </TableContainer>
    );
    expect(screen.getByTestId("bordered-container")).toHaveClass("cl-table__container--bordered");
  });

  it("FR-TBL-13: supports table theme token customization via css variables", () => {
    render(
      <div
        style={
          {
            "--cl-table-border": "#3b82f6",
            "--cl-table-header-bg": "#1e293b",
            "--cl-table-row-hover-bg": "#334155",
          } as React.CSSProperties
        }
      >
        <TableContainer bordered data-testid="custom-token-container">
          <TableRoot>
            <TableThead>
              <TableTr>
                <TableTh data-testid="custom-th">Col 1</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              <TableTr isHoverable data-testid="custom-tr">
                <TableTd data-testid="custom-td">Val 1</TableTd>
              </TableTr>
            </TableTbody>
          </TableRoot>
        </TableContainer>
      </div>
    );
    expect(screen.getByTestId("custom-token-container")).toHaveClass("cl-table__container--bordered");
    expect(screen.getByTestId("custom-th")).toBeInTheDocument();
    expect(screen.getByTestId("custom-tr")).toHaveClass("cl-table__tr--hoverable");
    expect(screen.getByTestId("custom-td")).toBeInTheDocument();
  });

  it("NFR-TBL-03: passes axe-core accessibility audit with zero violations", async () => {
    const { container } = renderStandardTable();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("FR-TBL-14 [DEF-016]: provides keyboard operability and focus management for sortable headers", async () => {
    const handleSort = vi.fn();
    const user = userEvent.setup();

    render(
      <TableRoot>
        <TableThead>
          <TableTr>
            <TableTh isSortable sortDirection="asc" onClick={handleSort} data-testid="sortable-th">
              Username
            </TableTh>
            <TableTh data-testid="regular-th">
              Role
            </TableTh>
          </TableTr>
        </TableThead>
      </TableRoot>
    );

    const sortableTh = screen.getByTestId("sortable-th");
    const regularTh = screen.getByTestId("regular-th");

    // Sortable header has tabIndex="0", non-sortable does not have tabIndex
    expect(sortableTh).toHaveAttribute("tabindex", "0");
    expect(regularTh).not.toHaveAttribute("tabindex");

    // Keyboard focus
    sortableTh.focus();
    expect(sortableTh).toHaveFocus();

    // Enter key triggers sort
    await user.keyboard("{Enter}");
    expect(handleSort).toHaveBeenCalledTimes(1);

    // Space key triggers sort
    await user.keyboard(" ");
    expect(handleSort).toHaveBeenCalledTimes(2);

    // Mouse click still works
    await user.click(sortableTh);
    expect(handleSort).toHaveBeenCalledTimes(3);
  });
});
