import * as React from "react";

export type SelectVariant = "outline" | "filled" | "flushed";
export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean | undefined;
}

export interface SelectContextValue<TValue extends string = string> {
  value: TValue | undefined;
  setValue: (value: TValue) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  highlightedValue: string | null;
  setHighlightedValue: (value: string | null) => void;
  size: SelectSize;
  variant: SelectVariant;
  isDisabled: boolean;
  isInvalid: boolean;
  isRequired: boolean;
  name?: string | undefined;
  triggerId: string;
  contentId: string;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  selectedLabel: string | null;
  registerItem: (value: string, label: string) => () => void;
  refs: {
    setReference: (node: HTMLElement | null) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles: React.CSSProperties;
}

export interface SelectRootProps<TValue extends string = string> {
  value?: TValue | undefined;
  defaultValue?: TValue | undefined;
  onValueChange?: ((value: TValue) => void) | undefined;
  isOpen?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  size?: SelectSize | undefined;
  variant?: SelectVariant | undefined;
  isDisabled?: boolean | undefined;
  isInvalid?: boolean | undefined;
  isRequired?: boolean | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  options?: SelectOption[] | undefined;
  children?: React.ReactNode;
  className?: string | undefined;
  "aria-describedby"?: string | undefined;
}

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean | undefined;
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string | undefined;
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectPortalProps {
  children: React.ReactNode;
  container?: HTMLElement | null | undefined;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned" | undefined;
  sideOffset?: number | undefined;
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectItemProps<TValue extends string = string>
  extends React.HTMLAttributes<HTMLDivElement> {
  value: TValue;
  isDisabled?: boolean | undefined;
  textValue?: string | undefined;
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectItemTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectItemIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string | undefined;
}

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string | undefined;
}
