import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import { Slot } from "../../primitives/Slot";
import type {
  PaginationRootProps,
  PaginationListProps,
  PaginationItemProps,
  PaginationActionProps,
  PaginationEllipsisProps,
  PaginationSizeSelectProps,
  PaginationJumperProps,
  PaginationContextValue,
  PaginationSize,
  PaginationVariant,
} from "./Pagination.types";

export const PaginationContext =
  React.createContext<PaginationContextValue | null>(null);

export function usePaginationContext(): PaginationContextValue {
  const context = React.useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "Pagination compound components must be rendered inside <Pagination /> or <Pagination.Root />",
    );
  }
  return context;
}

export type PaginationRangeItem = number | "ellipsis-start" | "ellipsis-end";

/**
 * Calculates a windowed range of page items with ellipsis compression.
 */
export function getPaginationRange({
  totalPages,
  currentPage,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
  boundaryCount?: number;
}): PaginationRangeItem[] {
  if (totalPages <= 1) return [1];

  const range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  // Max visible numbers if no ellipsis:
  // boundaries * 2 + siblings * 2 + current + 2 ellipses
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;

  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis =
    leftSiblingIndex > boundaryCount + 2;
  const shouldShowRightEllipsis =
    rightSiblingIndex < totalPages - (boundaryCount + 1);

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = boundaryCount + siblingCount * 2 + 2;
    const leftRange = range(1, leftItemCount);
    const rightBoundary = range(totalPages - boundaryCount + 1, totalPages);
    return [...leftRange, "ellipsis-end", ...rightBoundary];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const leftBoundary = range(1, boundaryCount);
    const rightItemCount = boundaryCount + siblingCount * 2 + 2;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [...leftBoundary, "ellipsis-start", ...rightRange];
  }

  // Both ellipses visible
  const leftBoundary = range(1, boundaryCount);
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  const rightBoundary = range(totalPages - boundaryCount + 1, totalPages);
  return [
    ...leftBoundary,
    "ellipsis-start",
    ...middleRange,
    "ellipsis-end",
    ...rightBoundary,
  ];
}

/**
 * Pagination.Root (Pagination) manages pagination state, page mathematics, and accessibility landmark.
 */
export const PaginationRoot = React.forwardRef<HTMLElement, PaginationRootProps>(
  function PaginationRoot(
    {
      total,
      pageSize: pageSizeProp = 10,
      page: pageProp,
      defaultPage = 1,
      onPageChange,
      onPageSizeChange,
      siblingCount = 1,
      boundaryCount = 1,
      size = "md",
      variant = "outline",
      isDisabled = false,
      showSizeChanger = false,
      pageSizeOptions = [10, 20, 50, 100],
      showQuickJumper = false,
      "aria-label": ariaLabel = "Pagination",
      className,
      children,
      ...domProps
    },
    ref,
  ) {
    const [pageSize, setPageSizeInternal] = React.useState<number>(pageSizeProp);

    React.useEffect(() => {
      setPageSizeInternal(pageSizeProp);
    }, [pageSizeProp]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const [currentPage, setCurrentPage] = useControllableState<number>({
      value: pageProp,
      defaultValue: defaultPage,
      onChange: onPageChange,
    });

    const setPage = React.useCallback(
      (nextPage: number) => {
        if (isDisabled) return;
        const clamped = Math.min(Math.max(1, nextPage), totalPages);
        setCurrentPage(clamped);
      },
      [isDisabled, setCurrentPage, totalPages],
    );

    const handlePageSizeChange = React.useCallback(
      (newSize: number) => {
        if (isDisabled) return;
        setPageSizeInternal(newSize);
        onPageSizeChange?.(newSize);
        // Reset to page 1 if current page exceeds new total pages
        const newTotalPages = Math.max(1, Math.ceil(total / newSize));
        if (currentPage > newTotalPages) {
          setPage(newTotalPages);
        }
      },
      [currentPage, isDisabled, onPageSizeChange, setPage, total],
    );

    const contextValue = React.useMemo<PaginationContextValue>(
      () => ({
        currentPage,
        totalPages,
        pageSize,
        setPage,
        setPageSize: handlePageSizeChange,
        size: size as PaginationSize,
        variant: variant as PaginationVariant,
        isDisabled,
        siblingCount,
        boundaryCount,
      }),
      [
        currentPage,
        totalPages,
        pageSize,
        setPage,
        handlePageSizeChange,
        size,
        variant,
        isDisabled,
        siblingCount,
        boundaryCount,
      ],
    );

    const items = React.useMemo(
      () =>
        getPaginationRange({
          totalPages,
          currentPage,
          siblingCount,
          boundaryCount,
        }),
      [totalPages, currentPage, siblingCount, boundaryCount],
    );

    return (
      <PaginationContext.Provider value={contextValue}>
        <nav
          ref={ref}
          aria-label={ariaLabel}
          className={classNames(
            "cl-pagination",
            `cl-pagination--${size}`,
            `cl-pagination--${variant}`,
            className,
          )}
          {...domProps}
        >
          {children ? (
            children
          ) : (
            <>
              <PaginationList>
                <li className="cl-pagination__list-item">
                  <PaginationPrev />
                </li>
                {items.map((item, idx) => (
                  <li
                    key={
                      typeof item === "number"
                        ? `page-${item}`
                        : `${item}-${idx}`
                    }
                    className="cl-pagination__list-item"
                  >
                    {typeof item === "number" ? (
                      <PaginationItem
                        page={item}
                        isCurrent={item === currentPage}
                      >
                        {item}
                      </PaginationItem>
                    ) : (
                      <PaginationEllipsis />
                    )}
                  </li>
                ))}
                <li className="cl-pagination__list-item">
                  <PaginationNext />
                </li>
              </PaginationList>
              {showSizeChanger && (
                <PaginationSizeSelect options={pageSizeOptions} />
              )}
              {showQuickJumper && <PaginationJumper />}
            </>
          )}
        </nav>
      </PaginationContext.Provider>
    );
  },
);

PaginationRoot.displayName = "Pagination";

/**
 * Pagination.List renders the semantic <ul role="list"> wrapper for page controls.
 */
export const PaginationList = React.forwardRef<
  HTMLUListElement,
  PaginationListProps
>(function PaginationList({ className, children, ...restProps }, ref) {
  return (
    <ul
      ref={ref}
      role="list"
      className={classNames("cl-pagination__list", className)}
      {...restProps}
    >
      {children}
    </ul>
  );
});

PaginationList.displayName = "Pagination.List";

/**
 * Pagination.Item renders a numeric page button with aria-current marking.
 */
export const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  PaginationItemProps
>(function PaginationItem(
  {
    page,
    isCurrent,
    asChild = false,
    className,
    children,
    onClick,
    "aria-label": ariaLabel,
    ...restProps
  },
  ref,
) {
  const { currentPage, setPage, isDisabled } = usePaginationContext();
  const active = isCurrent ?? currentPage === page;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      onClick?.(e);
      if (!e.defaultPrevented) {
        setPage(page);
      }
    },
    [isDisabled, onClick, page, setPage],
  );

  const itemClasses = classNames("cl-pagination__item", className);

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        aria-current={active ? "page" : undefined}
        aria-label={ariaLabel}
        className={itemClasses}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        {...(restProps as Record<string, unknown>)}
      >
        {children ?? page}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel ?? `Page ${page}`}
      disabled={isDisabled}
      className={itemClasses}
      onClick={handleClick}
      {...restProps}
    >
      {children ?? page}
    </button>
  );
});

PaginationItem.displayName = "Pagination.Item";

/**
 * Pagination.Prev navigates to the preceding page.
 */
export const PaginationPrev = React.forwardRef<
  HTMLButtonElement,
  PaginationActionProps
>(function PaginationPrev(
  { asChild = false, className, children, onClick, ...restProps },
  ref,
) {
  const { currentPage, setPage, isDisabled } = usePaginationContext();
  const isBoundary = currentPage <= 1;
  const disabled = isDisabled || isBoundary;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (!e.defaultPrevented) {
        setPage(currentPage - 1);
      }
    },
    [disabled, onClick, setPage, currentPage],
  );

  const prevClasses = classNames("cl-pagination__prev", className);

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        aria-label="Go to previous page"
        aria-disabled={disabled ? "true" : undefined}
        className={prevClasses}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        {...(restProps as Record<string, unknown>)}
      >
        {children ?? "‹"}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Go to previous page"
      disabled={disabled}
      className={prevClasses}
      onClick={handleClick}
      {...restProps}
    >
      {children ?? "‹"}
    </button>
  );
});

PaginationPrev.displayName = "Pagination.Prev";

/**
 * Pagination.Next navigates to the succeeding page.
 */
export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationActionProps
>(function PaginationNext(
  { asChild = false, className, children, onClick, ...restProps },
  ref,
) {
  const { currentPage, totalPages, setPage, isDisabled } =
    usePaginationContext();
  const isBoundary = currentPage >= totalPages;
  const disabled = isDisabled || isBoundary;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (!e.defaultPrevented) {
        setPage(currentPage + 1);
      }
    },
    [disabled, onClick, setPage, currentPage],
  );

  const nextClasses = classNames("cl-pagination__next", className);

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        aria-label="Go to next page"
        aria-disabled={disabled ? "true" : undefined}
        className={nextClasses}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        {...(restProps as Record<string, unknown>)}
      >
        {children ?? "›"}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Go to next page"
      disabled={disabled}
      className={nextClasses}
      onClick={handleClick}
      {...restProps}
    >
      {children ?? "›"}
    </button>
  );
});

PaginationNext.displayName = "Pagination.Next";

/**
 * Pagination.First jumps directly to the first page (Page 1).
 */
export const PaginationFirst = React.forwardRef<
  HTMLButtonElement,
  PaginationActionProps
>(function PaginationFirst(
  { asChild = false, className, children, onClick, ...restProps },
  ref,
) {
  const { currentPage, setPage, isDisabled } = usePaginationContext();
  const disabled = isDisabled || currentPage <= 1;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (!e.defaultPrevented) {
        setPage(1);
      }
    },
    [disabled, onClick, setPage],
  );

  const firstClasses = classNames("cl-pagination__first", className);

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        aria-label="Go to first page"
        aria-disabled={disabled ? "true" : undefined}
        className={firstClasses}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        {...(restProps as Record<string, unknown>)}
      >
        {children ?? "«"}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Go to first page"
      disabled={disabled}
      className={firstClasses}
      onClick={handleClick}
      {...restProps}
    >
      {children ?? "«"}
    </button>
  );
});

PaginationFirst.displayName = "Pagination.First";

/**
 * Pagination.Last jumps directly to the final page.
 */
export const PaginationLast = React.forwardRef<
  HTMLButtonElement,
  PaginationActionProps
>(function PaginationLast(
  { asChild = false, className, children, onClick, ...restProps },
  ref,
) {
  const { currentPage, totalPages, setPage, isDisabled } =
    usePaginationContext();
  const disabled = isDisabled || currentPage >= totalPages;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      if (!e.defaultPrevented) {
        setPage(totalPages);
      }
    },
    [disabled, onClick, setPage, totalPages],
  );

  const lastClasses = classNames("cl-pagination__last", className);

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        aria-label="Go to last page"
        aria-disabled={disabled ? "true" : undefined}
        className={lastClasses}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        {...(restProps as Record<string, unknown>)}
      >
        {children ?? "»"}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Go to last page"
      disabled={disabled}
      className={lastClasses}
      onClick={handleClick}
      {...restProps}
    >
      {children ?? "»"}
    </button>
  );
});

PaginationLast.displayName = "Pagination.Last";

/**
 * Pagination.Ellipsis renders the non-interactive truncation indicator.
 */
export const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(function PaginationEllipsis({ className, children, ...restProps }, ref) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={classNames("cl-pagination__ellipsis", className)}
      {...restProps}
    >
      {children ?? "…"}
    </span>
  );
});

PaginationEllipsis.displayName = "Pagination.Ellipsis";

/**
 * Pagination.SizeSelect renders the page size dropdown.
 */
export const PaginationSizeSelect = React.forwardRef<
  HTMLSelectElement,
  PaginationSizeSelectProps
>(function PaginationSizeSelect(
  { options = [10, 20, 50, 100], className, onChange, ...restProps },
  ref,
) {
  const { pageSize, setPageSize, isDisabled } = usePaginationContext();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        setPageSize(val);
      }
      onChange?.(e);
    },
    [onChange, setPageSize],
  );

  return (
    <select
      ref={ref}
      aria-label="Page size"
      disabled={isDisabled}
      value={pageSize}
      onChange={handleChange}
      className={classNames("cl-pagination__size-select", className)}
      {...restProps}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt} / page
        </option>
      ))}
    </select>
  );
});

PaginationSizeSelect.displayName = "Pagination.SizeSelect";

/**
 * Pagination.Jumper renders a direct page jump number input.
 */
export const PaginationJumper = React.forwardRef<
  HTMLSpanElement,
  PaginationJumperProps
>(function PaginationJumper({ className, children, ...restProps }, ref) {
  const { totalPages, setPage, isDisabled } = usePaginationContext();
  const [val, setVal] = React.useState<string>("");

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 1 && num <= totalPages) {
          setPage(num);
          setVal("");
        }
      }
    },
    [val, totalPages, setPage],
  );

  return (
    <span
      ref={ref}
      className={classNames("cl-pagination__jumper", className)}
      {...restProps}
    >
      Go to
      <input
        type="number"
        min={1}
        max={totalPages}
        aria-label="Jump to page"
        disabled={isDisabled}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={handleKeyDown}
        className="cl-pagination__jumper-input"
      />
    </span>
  );
});

PaginationJumper.displayName = "Pagination.Jumper";

/**
 * Compound export object adhering to Chellaa React component architecture.
 */
export const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  List: PaginationList,
  Item: PaginationItem,
  Prev: PaginationPrev,
  Next: PaginationNext,
  First: PaginationFirst,
  Last: PaginationLast,
  Ellipsis: PaginationEllipsis,
  SizeSelect: PaginationSizeSelect,
  Jumper: PaginationJumper,
});
