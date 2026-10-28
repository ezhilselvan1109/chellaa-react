import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { Checkbox } from "../Checkbox/Checkbox";
import { Pagination } from "../Pagination/Pagination";
import { Spinner } from "../Spinner/Spinner";
import { classNames } from "../../utils/classNames";
import type {
  DataGridProps,
  DataGridSort,
} from "./DataGrid.types";

export const DataGrid = React.forwardRef(function DataGrid<
  TRow,
  TKey extends string = string
>(
  props: DataGridProps<TRow, TKey>,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    columns,
    data = [],
    getRowId,
    sort: sortProp,
    defaultSort,
    onSortChange,
    isSelectable = false,
    selectedRowIds: selectedRowIdsProp,
    defaultSelectedRowIds,
    onSelectionChange,
    selectOnRowClick = false,
    variant = "simple",
    size = "md",
    isStickyHeader = false,
    maxHeight,
    isLoading = false,
    emptyText = "No data available.",
    pagination,
    className,
    "aria-label": ariaLabel = "Data Grid",
    ...rest
  } = props;

  // 1. Controlled / uncontrolled sort
  const [currentSort, setCurrentSort] = useControllableState<DataGridSort<TKey> | null>({
    value: sortProp,
    defaultValue: defaultSort ?? null,
    onChange: onSortChange,
  });

  // 2. Controlled / uncontrolled selection
  const [selectedIds, setSelectedIds] = useControllableState<(string | number)[]>({
    value: selectedRowIdsProp,
    defaultValue: defaultSelectedRowIds ?? [],
    onChange: onSelectionChange,
  });

  // 3. Sorting operation
  const sortedData = React.useMemo(() => {
    if (!currentSort) return data;

    const column = columns.find((c) => c.key === currentSort.columnKey);
    if (!column || !column.isSortable) return data;

    const directionMultiplier = currentSort.direction === "asc" ? 1 : -1;

    return [...data].sort((a, b) => {
      if (column.comparator) {
        return column.comparator(a, b) * directionMultiplier;
      }

      let valA: unknown;
      let valB: unknown;

      if (column.accessor) {
        valA = column.accessor(a, 0);
        valB = column.accessor(b, 0);
      } else {
        valA = (a as Record<string, unknown>)[column.key];
        valB = (b as Record<string, unknown>)[column.key];
      }

      if (valA == null && valB == null) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * directionMultiplier;
      }

      return String(valA).localeCompare(String(valB)) * directionMultiplier;
    });
  }, [data, currentSort, columns]);

  // 4. Pagination slicing
  const displayedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    return sortedData.slice(startIndex, startIndex + pagination.pageSize);
  }, [sortedData, pagination]);

  // 5. Selection helpers
  const displayedRowIds = React.useMemo(() => {
    return displayedData.map((row, idx) => getRowId(row, idx));
  }, [displayedData, getRowId]);

  const isAllSelected =
    displayedRowIds.length > 0 &&
    displayedRowIds.every((id) => selectedIds.includes(id));

  const isSomeSelected =
    displayedRowIds.some((id) => selectedIds.includes(id)) && !isAllSelected;

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedIds(selectedIds.filter((id) => !displayedRowIds.includes(id)));
    } else {
      const merged = Array.from(new Set([...selectedIds, ...displayedRowIds]));
      setSelectedIds(merged);
    }
  };

  const handleToggleRow = (id: string | number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSortClick = (columnKey: TKey) => {
    let nextSort: DataGridSort<TKey> | null = null;
    if (!currentSort || currentSort.columnKey !== columnKey) {
      nextSort = { columnKey, direction: "asc" };
    } else if (currentSort.direction === "asc") {
      nextSort = { columnKey, direction: "desc" };
    } else {
      nextSort = null;
    }
    setCurrentSort(nextSort);
  };

  const totalColumns = columns.length + (isSelectable ? 1 : 0);

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames(
        "cl-datagrid",
        `cl-datagrid--${variant}`,
        `cl-datagrid--${size}`,
        isStickyHeader && "cl-datagrid--sticky-header",
        className
      )}
    >
      {/* Table Container / Region */}
      <div
        className="cl-datagrid__container"
        style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
      >
        <table className="cl-datagrid__table" role="grid" aria-label={ariaLabel}>
          <thead className="cl-datagrid__thead">
            <tr className="cl-datagrid__tr">
              {isSelectable && (
                <th
                  className="cl-datagrid__th cl-datagrid__th--select"
                  scope="col"
                  style={{ width: "48px" }}
                >
                  <Checkbox
                    aria-label="Select all rows"
                    checked={isAllSelected}
                    indeterminate={isSomeSelected}
                    onChange={handleToggleAll}
                  />
                </th>
              )}

              {columns.map((col) => {
                const isCurrentSort = currentSort?.columnKey === col.key;
                const ariaSort: "ascending" | "descending" | "none" | undefined =
                  col.isSortable
                    ? isCurrentSort
                      ? currentSort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                    : undefined;

                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSort}
                    className={classNames(
                      "cl-datagrid__th",
                      col.isSortable && "cl-datagrid__th--sortable",
                      isCurrentSort && "cl-datagrid__th--sorted",
                      col.align && `cl-datagrid__th--align-${col.align}`
                    )}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.isSortable ? (
                      <button
                        type="button"
                        className="cl-datagrid__sort-btn"
                        onClick={() => handleSortClick(col.key)}
                        aria-label={`Sort by ${String(col.header)}`}
                      >
                        <span className="cl-datagrid__header-text">{col.header}</span>
                        <span className="cl-datagrid__sort-icon" aria-hidden="true">
                          {isCurrentSort ? (
                            currentSort.direction === "asc" ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 15l-6-6-6 6" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6" />
                              </svg>
                            )
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                              <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                            </svg>
                          )}
                        </span>
                      </button>
                    ) : (
                      <span className="cl-datagrid__header-text">{col.header}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="cl-datagrid__tbody">
            {isLoading ? (
              <tr className="cl-datagrid__tr cl-datagrid__tr--loading">
                <td colSpan={totalColumns} className="cl-datagrid__td cl-datagrid__td--loading">
                  <div className="cl-datagrid__loading-wrapper">
                    <Spinner size="md" colorScheme="primary" />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : displayedData.length === 0 ? (
              <tr className="cl-datagrid__tr cl-datagrid__tr--empty">
                <td colSpan={totalColumns} className="cl-datagrid__td cl-datagrid__td--empty">
                  <div className="cl-datagrid__empty-wrapper">{emptyText}</div>
                </td>
              </tr>
            ) : (
              displayedData.map((row, rowIndex) => {
                const rowId = getRowId(row, rowIndex);
                const isSelected = selectedIds.includes(rowId);

                return (
                  <tr
                    key={String(rowId)}
                    aria-selected={isSelectable ? isSelected : undefined}
                    className={classNames(
                      "cl-datagrid__tr",
                      isSelected && "cl-datagrid__tr--selected",
                      selectOnRowClick && "cl-datagrid__tr--clickable"
                    )}
                    onClick={() => {
                      if (selectOnRowClick && isSelectable) {
                        handleToggleRow(rowId);
                      }
                    }}
                  >
                    {isSelectable && (
                      <td className="cl-datagrid__td cl-datagrid__td--select">
                        <Checkbox
                          aria-label={`Select row ${String(rowId)}`}
                          checked={isSelected}
                          onChange={() => handleToggleRow(rowId)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}

                    {columns.map((col) => {
                      let cellContent: React.ReactNode;
                      const rawVal = col.accessor
                        ? col.accessor(row, rowIndex)
                        : (row as Record<string, unknown>)[col.key];

                      if (col.cell) {
                        cellContent = col.cell({ row, value: rawVal, rowIndex });
                      } else {
                        cellContent = rawVal as React.ReactNode;
                      }

                      return (
                        <td
                          key={col.key}
                          className={classNames(
                            "cl-datagrid__td",
                            col.align && `cl-datagrid__td--align-${col.align}`
                          )}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && (
        <div className="cl-datagrid__footer">
          <Pagination
            total={pagination.total ?? sortedData.length}
            pageSize={pagination.pageSize}
            page={pagination.page}
            onPageChange={pagination.onPageChange}
            size={size === "lg" ? "md" : "sm"}
          />
        </div>
      )}
    </div>
  );
}) as <TRow, TKey extends string = string>(
  props: DataGridProps<TRow, TKey> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
