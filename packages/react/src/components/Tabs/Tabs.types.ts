import * as React from "react";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsVariant = "line" | "enclosed" | "pill" | "unstyled";
export type TabsSize = "sm" | "md" | "lg";
export type TabsActivationMode = "automatic" | "manual";

export interface TabsRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** Controlled active tab value */
  value?: string | undefined;
  /** Uncontrolled default active tab value */
  defaultValue?: string | undefined;
  /** Callback fired when the active tab value changes */
  onValueChange?: ((value: string) => void) | undefined;
  /** Layout orientation: horizontal (default) or vertical */
  orientation?: TabsOrientation | undefined;
  /** Visual style variant: line (default), enclosed, pill, unstyled */
  variant?: TabsVariant | undefined;
  /** Sizing scale: sm (32px), md (40px, default), lg (48px) */
  size?: TabsSize | undefined;
  /** Tab activation mode: automatic (on focus) or manual (on Enter/Space) */
  activationMode?: TabsActivationMode | undefined;
  /** When true, inactive tab panels are unmounted instead of hidden */
  isLazy?: boolean | undefined;
  /** Child elements: Tabs.List and Tabs.Content */
  children: React.ReactNode;
}

export type TabsProps = TabsRootProps;

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the tablist */
  "aria-label"?: string | undefined;
  /** Tab trigger buttons */
  children: React.ReactNode;
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique identifier matching a Tabs.Content panel */
  value: string;
  /** Whether the tab is disabled and cannot be activated */
  isDisabled?: boolean | undefined;
  /** When true, delegates rendering to child element via Slot */
  asChild?: boolean | undefined;
  /** Tab label and optional icons */
  children: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier matching a Tabs.Trigger */
  value: string;
  /** Panel content */
  children: React.ReactNode;
}

export interface TabsIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string | undefined;
}

export interface TabsContextValue {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  size: TabsSize;
  activationMode: TabsActivationMode;
  isLazy: boolean;
  baseId: string;
  listRef: React.RefObject<HTMLDivElement | null>;
}
