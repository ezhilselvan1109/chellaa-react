import * as React from "react";

export type AccordionType = "single" | "multiple";
export type AccordionVariant = "outline" | "separated" | "flush";

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
    /** Visual style treatment: outline, separated, or flush */
    variant?: AccordionVariant | undefined;
    /** Whether all accordion items are globally disabled */
    isDisabled?: boolean | undefined;
    /** Child Accordion.Item elements */
    children: React.ReactNode;
  };

export type AccordionProps = AccordionRootProps;

export interface AccordionContextValue {
  type: AccordionType;
  variant: AccordionVariant;
  collapsible: boolean;
  isDisabled: boolean;
  expandedValues: string[];
  toggleItem: (value: string) => void;
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Delegate button element rendering via Slot primitive */
  asChild?: boolean | undefined;
  /** Trigger text and optional Accordion.Icon */
  children: React.ReactNode;
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
