import * as React from "react";

export type AccordionType = "single" | "multiple";

/**
 * Visual styling variant for the Accordion.
 * - "default" / "outline": Clean bordered continuous container with subtle dividers.
 * - "separated": Individually spaced card-like items.
 * - "borderless" / "flush": Minimal, divider-based appearance without outer container border.
 * - "filled": Subtle background emphasis with soft surface tint and rounded panels.
 */
export type AccordionVariant =
  | "default"
  | "outline"
  | "separated"
  | "borderless"
  | "flush"
  | "filled";

/**
 * Density and typography scale for the Accordion.
 * - "sm": Compact padding, 14px title font, 14px chevron icon.
 * - "md": Balanced standard padding, 16px title font, 18px chevron icon.
 * - "lg": Spacious padding, 18px title font, 20px chevron icon.
 */
export type AccordionSize = "sm" | "md" | "lg";

/**
 * Placement of the expand/collapse indicator chevron relative to header text.
 * - "end": Right-aligned (default).
 * - "start": Left-aligned before title text.
 */
export type AccordionIndicatorPosition = "start" | "end";

export interface AccordionSingleProps {
  /** Single expansion mode */
  type?: "single" | undefined;
  /** Controlled active item value in single mode */
  value?: string | undefined;
  /** Default active item value in uncontrolled single mode */
  defaultValue?: string | undefined;
  /** Callback fired when the active item value changes in single mode */
  onValueChange?: ((value: string) => void) | undefined;
  /** Whether the active item can be collapsed when clicked */
  collapsible?: boolean | undefined;
}

export interface AccordionMultipleProps {
  /** Multiple simultaneous expansion mode */
  type: "multiple";
  /** Controlled active item values in multiple mode */
  value?: string[] | undefined;
  /** Default active item values in uncontrolled multiple mode */
  defaultValue?: string[] | undefined;
  /** Callback fired when the active item values change in multiple mode */
  onValueChange?: ((value: string[]) => void) | undefined;
  /** Not applicable in multiple mode */
  collapsible?: never | undefined;
}

export type AccordionRootProps = (AccordionSingleProps | AccordionMultipleProps) &
  Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
    /** Visual style treatment: default (outline), separated, borderless (flush), or filled */
    variant?: AccordionVariant | undefined;
    /** Scale and density sizing: sm, md, or lg. Defaults to "md" */
    size?: AccordionSize | undefined;
    /** Default alignment of the expand/collapse indicator icon */
    indicatorPosition?: AccordionIndicatorPosition | undefined;
    /** Whether all accordion items are globally disabled */
    isDisabled?: boolean | undefined;
    /** Child Accordion elements (Accordion.Item, Accordion.Actions, etc.) */
    children: React.ReactNode;
  };

export type AccordionProps = AccordionRootProps;

export interface AccordionContextValue {
  type: AccordionType;
  variant: AccordionVariant;
  size: AccordionSize;
  indicatorPosition: AccordionIndicatorPosition;
  collapsible: boolean;
  isDisabled: boolean;
  expandedValues: string[];
  toggleItem: (value: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  registerItem: (value: string, isDisabled: boolean) => () => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for the accordion item */
  value: string;
  /** Whether this individual item is disabled */
  isDisabled?: boolean | undefined;
  /** Subcomponents: Accordion.Header and Accordion.Content */
  children: React.ReactNode;
}

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  isDisabled: boolean;
  triggerId: string;
  panelId: string;
}

export interface AccordionHeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic HTML heading tag level (h2 - h6). Defaults to 3 (h3) */
  level?: 2 | 3 | 4 | 5 | 6 | undefined;
  /** Child Accordion.Trigger element */
  children: React.ReactNode;
}

export interface AccordionTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Delegate button element rendering via Slot primitive */
  asChild?: boolean | undefined;
  /** Explicit title text or element */
  title?: React.ReactNode | undefined;
  /** Optional secondary subtitle or description below the title */
  description?: React.ReactNode | undefined;
  /** Optional decorative leading icon before title text */
  leadingIcon?: React.ReactNode | undefined;
  /** Optional trailing badge, count, or metadata element */
  trailingBadge?: React.ReactNode | undefined;
  /** Custom expand/collapse indicator icon or render function */
  indicator?: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode) | undefined;
  /** Alignment of the expand/collapse indicator icon for this trigger */
  indicatorPosition?: AccordionIndicatorPosition | undefined;
  /** Whether to suppress rendering the built-in expand/collapse indicator */
  hideIndicator?: boolean | undefined;
  /** Trigger content when not using title prop, or custom children */
  children?: React.ReactNode | undefined;
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Panel body elements */
  children: React.ReactNode;
}

export interface AccordionIconProps
  extends React.SVGAttributes<SVGSVGElement> {
  className?: string | undefined;
}

export interface AccordionActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Helper buttons such as Accordion.ExpandAll and Accordion.CollapseAll */
  children?: React.ReactNode | undefined;
}

export interface AccordionExpandAllProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | undefined;
}

export interface AccordionCollapseAllProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | undefined;
}
