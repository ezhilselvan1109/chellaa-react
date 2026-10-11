import * as React from "react";
import type {
  TableCaptionProps,
  TableCellProps,
  TableContainerProps,
  TableContextValue,
  TableHeaderCellProps,
  TableRootProps,
  TableRowProps,
  TableTbodyProps,
  TableTfootProps,
  TableTheadProps,
} from "./Table.types";

const TableContext = React.createContext<TableContextValue>({
  size: "md",
  variant: "simple",
  isHoverable: false,
});

/**
 * TableRoot component - Container for structured row and column data.
 */
export const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  (
    {
      variant = "simple",
      size = "md",
      isHoverable = false,
      isStickyHeader = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      "cl-table",
      `cl-table--${variant}`,
      `cl-table--${size}`,
      isHoverable && "cl-table--hoverable",
      isStickyHeader && "cl-table--sticky-header",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const contextValue = React.useMemo<TableContextValue>(
      () => ({
        size,
        variant,
        isHoverable,
      }),
      [size, variant, isHoverable]
    );

    return (
      <TableContext.Provider value={contextValue}>
        <table ref={ref} className={classNames} {...props}>
          {children}
        </table>
      </TableContext.Provider>
    );
  }
);
TableRoot.displayName = "Table.Root";

/**
 * TableContainer component - Responsive touch scroll container.
 */
export const TableContainer = React.forwardRef<
  HTMLDivElement,
  TableContainerProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={["cl-table__container", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});
TableContainer.displayName = "Table.Container";

/**
 * TableCaption component - Programmatic description of table data.
 */
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ placement = "bottom", className, children, ...props }, ref) => {
  const classNames = [
    "cl-table__caption",
    placement === "top" && "cl-table__caption--top",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <caption ref={ref} className={classNames} {...props}>
      {children}
    </caption>
  );
});
TableCaption.displayName = "Table.Caption";

/**
 * TableThead component - Semantic table header section.
 */
export const TableThead = React.forwardRef<
  HTMLTableSectionElement,
  TableTheadProps
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={["cl-table__thead", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </thead>
  );
});
TableThead.displayName = "Table.Thead";

/**
 * TableTbody component - Semantic table body section.
 */
export const TableTbody = React.forwardRef<
  HTMLTableSectionElement,
  TableTbodyProps
>(({ className, children, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={["cl-table__tbody", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </tbody>
  );
});
TableTbody.displayName = "Table.Tbody";

/**
 * TableTfoot component - Semantic table footer section.
 */
export const TableTfoot = React.forwardRef<
  HTMLTableSectionElement,
  TableTfootProps
>(({ className, children, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={["cl-table__tfoot", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </tfoot>
  );
});
TableTfoot.displayName = "Table.Tfoot";

/**
 * TableTr component - Semantic table row element.
 */
export const TableTr = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ isHoverable: isHoverableProp, isSelected = false, className, children, ...props }, ref) => {
    const tableContext = React.useContext(TableContext);
    const hoverable = isHoverableProp ?? tableContext.isHoverable;

    const classNames = [
      "cl-table__tr",
      hoverable && "cl-table__tr--hoverable",
      isSelected && "cl-table__tr--selected",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <tr ref={ref} className={classNames} {...props}>
        {children}
      </tr>
    );
  }
);
TableTr.displayName = "Table.Tr";

/**
 * TableTh component - Semantic table header cell with scope="col" default.
 */
export const TableTh = React.forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ isNumeric = false, scope = "col", className, children, ...props }, ref) => {
  const classNames = [
    "cl-table__th",
    isNumeric && "cl-table__th--numeric",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <th ref={ref} scope={scope} className={classNames} {...props}>
      {children}
    </th>
  );
});
TableTh.displayName = "Table.Th";

/**
 * TableTd component - Semantic table data cell with isNumeric alignment support.
 */
export const TableTd = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ isNumeric = false, className, children, ...props }, ref) => {
    const classNames = [
      "cl-table__td",
      isNumeric && "cl-table__td--numeric",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <td ref={ref} className={classNames} {...props}>
        {children}
      </td>
    );
  }
);
TableTd.displayName = "Table.Td";

/**
 * Compound Table component export
 */
export const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  Container: TableContainer,
  Caption: TableCaption,
  Thead: TableThead,
  Tbody: TableTbody,
  Tfoot: TableTfoot,
  Tr: TableTr,
  Th: TableTh,
  Td: TableTd,
});
