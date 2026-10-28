"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { Link } from "../Link/Link";
import type {
  BreadcrumbsProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
} from "./Breadcrumbs.types";

interface BreadcrumbsContextValue {
  separator: React.ReactNode;
}

const BreadcrumbsContext = React.createContext<BreadcrumbsContextValue>({
  separator: "/",
});

const StyledBreadcrumbsRoot = styled("nav", {
  name: "ChellaaBreadcrumbs",
  slot: "Root",
})({});

/**
 * Default Chevron Separator Icon.
 */
function DefaultChevronSeparator() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * Breadcrumbs navigation landmark container.
 *
 * @example
 * ```tsx
 * <Breadcrumbs>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Settings</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumbs>
 * ```
 */
export const BreadcrumbsRoot = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  function Breadcrumbs(
    {
      "aria-label": ariaLabel = "Breadcrumb",
      separator = <DefaultChevronSeparator />,
      className,
      children,
      style,
      sx,
      ...rest
    },
    ref,
  ) {
    const contextValue = React.useMemo(() => ({ separator }), [separator]);

    return (
      <BreadcrumbsContext.Provider value={contextValue}>
        <StyledBreadcrumbsRoot
          as="nav"
          ref={ref}
          aria-label={ariaLabel}
          className={classNames("cl-breadcrumb", className)}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledBreadcrumbsRoot>
      </BreadcrumbsContext.Provider>
    );
  },
);

BreadcrumbsRoot.displayName = "Breadcrumbs";

/**
 * Ordered list container for breadcrumb items.
 */
export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, children, ...props }, ref) {
    return (
      <ol
        ref={ref}
        className={classNames("cl-breadcrumb__list", className)}
        {...props}
      >
        {children}
      </ol>
    );
  },
);

BreadcrumbList.displayName = "BreadcrumbList";

/**
 * Individual item wrapper inside the breadcrumb list.
 */
export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        className={classNames("cl-breadcrumb__item", className)}
        {...props}
      >
        {children}
      </li>
    );
  },
);

BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * Navigable link inside a breadcrumb item.
 */
export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ asChild = false, className, colorScheme = "subtle", ...props }, ref) {
    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={classNames("cl-breadcrumb__link", className)}
          {...props}
        />
      );
    }

    return (
      <Link
        ref={ref}
        colorScheme={colorScheme}
        className={classNames("cl-breadcrumb__link", className)}
        {...props}
      />
    );
  },
);

BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * Terminal current page indicator inside the breadcrumb list.
 * Automatically marks with aria-current="page" and prevents link navigation.
 */
export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ asChild = false, className, children, ...props }, ref) {
    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          aria-current="page"
          className={classNames("cl-breadcrumb__page", className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={classNames("cl-breadcrumb__page", className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

BreadcrumbPage.displayName = "BreadcrumbPage";

/**
 * Visual separator element between breadcrumb items, hidden from assistive technology.
 */
export const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children, ...props }, ref) {
    const { separator: defaultSeparator } = React.useContext(BreadcrumbsContext);

    return (
      <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={classNames("cl-breadcrumb__separator", className)}
        {...props}
      >
        {children ?? defaultSeparator}
      </li>
    );
  },
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * Collapsed items indicator (ellipsis) for long breadcrumb chains.
 */
export const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  function BreadcrumbEllipsis(
    { "aria-label": ariaLabel = "More breadcrumb items", className, ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        role="presentation"
        className={classNames("cl-breadcrumb__ellipsis", className)}
        {...props}
      >
        <span className="cl-sr-only">{ariaLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </span>
    );
  },
);

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

/**
 * Breadcrumbs Compound Component
 */
export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Root: BreadcrumbsRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
});

export const Breadcrumb = Breadcrumbs;
