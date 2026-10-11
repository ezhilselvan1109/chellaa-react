"use client";

import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useFormField } from "../FormField/FormFieldContext";
import { Portal } from "../../primitives/Portal";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectContentProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectItemIndicatorProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectContextValue,
} from "./Select.types";

/* =========================================================================
   Internal Context
   ========================================================================= */

interface InternalSelectContext<TValue extends string = string> extends SelectContextValue<TValue> {
  itemLabels: Map<string, string>;
  itemsList: string[];
  registerItem: (value: string, label: string, disabled?: boolean) => () => void;
  disabledItems: Set<string>;
  ariaDescribedBy?: string | undefined;
  getReferenceProps?: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
  getFloatingProps?: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node || typeof node !== "object") return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return extractText((node.props as any).children);
  }
  return "";
}

function extractItemMapFromChildren(children: React.ReactNode): Map<string, string> {
  const map = new Map<string, string>();
  function walk(node: React.ReactNode) {
    React.Children.forEach(node, (child) => {
      if (!React.isValidElement(child)) return;
      const props = child.props as any;
      if (props && "value" in props && typeof props.value === "string") {
        const text = props.textValue ?? extractText(props.children);
        if (text) {
          map.set(props.value, text);
        }
      }
      if (props && props.children) {
        walk(props.children);
      }
    });
  }
  walk(children);
  return map;
}

const SelectContext = React.createContext<InternalSelectContext | null>(null);

export function useSelectContext<TValue extends string = string>(): SelectContextValue<TValue> {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select subcomponents must be used within a <Select> or <Select.Root> provider."
    );
  }
  return context as unknown as SelectContextValue<TValue>;
}

/* =========================================================================
   1. SelectRoot / Select
   ========================================================================= */

export const SelectRoot = React.forwardRef<HTMLDivElement, SelectRootProps>(
  function SelectRoot(props, ref) {
    const formField = useFormField();

    const isDisabled = props.isDisabled ?? formField?.disabled ?? false;
    const isInvalid = props.isInvalid ?? formField?.error ?? false;
    const isRequired = props.isRequired ?? formField?.required ?? false;
    const name = props.name ?? formField?.name;
    const ariaDescribedBy = [
      props["aria-describedby"],
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    const {
      value: valueProp,
      defaultValue,
      onValueChange,
      isOpen: isOpenProp,
      defaultOpen = false,
      onOpenChange,
      size = "md",
      variant = "outline",
      placeholder,
      options,
      children,
      className,
      isDisabled: _discardDisabled,
      isInvalid: _discardInvalid,
      isRequired: _discardRequired,
      name: _discardName,
      "aria-describedby": _discardAria,
      ...rest
    } = props;

    // Controlled / Uncontrolled value
    const [value, setValueState] = useControllableState<string | undefined>({
      value: valueProp,
      defaultValue: defaultValue,
      onChange: (next) => {
        if (next !== undefined && onValueChange) {
          onValueChange(next);
        }
      },
    });

    // Controlled / Uncontrolled open state
    const [isOpen, setIsOpenState] = useControllableState<boolean>({
      value: isOpenProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const [highlightedValue, setHighlightedValue] = React.useState<string | null>(null);
    const [itemLabels, setItemLabels] = React.useState<Map<string, string>>(() => {
      if (children) {
        return extractItemMapFromChildren(children);
      }
      return new Map();
    });
    const [itemsList, setItemsList] = React.useState<string[]>([]);
    const [disabledItems, setDisabledItems] = React.useState<Set<string>>(() => new Set());

    const triggerId = React.useId();
    const contentId = React.useId();
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    // Floating UI positioning
    const { refs, floatingStyles, context: floatingContext } = useFloating({
      open: isOpen,
      onOpenChange: (open) => {
        if (!open && !isOpen) return;
        setIsOpenState(open);
      },
      placement: "bottom-start",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
        flip({ padding: 8 }),
        shift({ padding: 8 }),
        floatingSize({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
              minWidth: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });

    const dismiss = useDismiss(floatingContext, {
      enabled: isOpen,
      outsidePress: true,
      escapeKey: true,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    // Item registration helper
    const registerItem = React.useCallback(
      (itemVal: string, itemLabel: string, itemDisabled?: boolean) => {
        setItemLabels((prev) => {
          if (prev.get(itemVal) === itemLabel) return prev;
          const next = new Map(prev);
          next.set(itemVal, itemLabel);
          return next;
        });
        setItemsList((prev) => (prev.includes(itemVal) ? prev : [...prev, itemVal]));
        if (itemDisabled) {
          setDisabledItems((prev) => {
            if (prev.has(itemVal)) return prev;
            const next = new Set(prev);
            next.add(itemVal);
            return next;
          });
        }
        return () => {
          // Retain itemLabels so closed SelectTrigger can display the label
        };
      },
      []
    );

    // Populate from flat options if provided
    React.useEffect(() => {
      if (options && options.length > 0) {
        const newMap = new Map<string, string>();
        const newList: string[] = [];
        const newDisabled = new Set<string>();
        for (const opt of options) {
          newMap.set(opt.value, opt.label);
          newList.push(opt.value);
          if (opt.disabled) newDisabled.add(opt.value);
        }
        setItemLabels(newMap);
        setItemsList(newList);
        setDisabledItems(newDisabled);
      }
    }, [options]);

    const selectedLabel = value ? itemLabels.get(value) ?? null : null;

    const setValue = React.useCallback(
      (nextVal: string) => {
        setValueState(nextVal);
      },
      [setValueState]
    );

    const setIsOpen = React.useCallback(
      (nextOpen: boolean) => {
        setIsOpenState(nextOpen);
        if (nextOpen && value) {
          setHighlightedValue(value);
        }
      },
      [setIsOpenState, value]
    );

    const contextValue = React.useMemo<InternalSelectContext>(
      () => ({
        value,
        setValue,
        isOpen: Boolean(isOpen),
        setIsOpen,
        highlightedValue,
        setHighlightedValue,
        size,
        variant,
        isDisabled,
        isInvalid,
        isRequired,
        name,
        triggerId,
        contentId,
        triggerRef,
        contentRef,
        selectedLabel,
        registerItem,
        itemLabels,
        itemsList,
        disabledItems,
        ariaDescribedBy,
        refs: {
          setReference: refs.setReference,
          setFloating: refs.setFloating,
        },
        floatingStyles,
        getReferenceProps,
        getFloatingProps,
      }),
      [
        value,
        setValue,
        isOpen,
        setIsOpen,
        highlightedValue,
        size,
        variant,
        isDisabled,
        isInvalid,
        isRequired,
        name,
        triggerId,
        contentId,
        selectedLabel,
        registerItem,
        itemLabels,
        itemsList,
        disabledItems,
        ariaDescribedBy,
        refs.setReference,
        refs.setFloating,
        floatingStyles,
        getReferenceProps,
        getFloatingProps,
      ]
    );

    // Auto-render layout if flat options are provided without compound children
    const renderContent = () => {
      if (children) {
        return children;
      }
      if (options && options.length > 0) {
        return (
          <>
            <SelectTrigger>
              <SelectValue placeholder={placeholder ?? undefined} />
              <SelectIcon />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} isDisabled={opt.disabled ?? undefined}>
                    <SelectItemText>{opt.label}</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPortal>
          </>
        );
      }
      return null;
    };

    return (
      <SelectContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={classNames("cl-select", className)}
          data-disabled={isDisabled ? "true" : undefined}
          data-invalid={isInvalid ? "true" : undefined}
          data-size={size}
          data-variant={variant}
          {...rest}
        >
          {renderContent()}
          {name && (
            <input
              type="hidden"
              name={name}
              value={value ?? ""}
              disabled={isDisabled}
              required={isRequired}
              aria-hidden="true"
            />
          )}
        </div>
      </SelectContext.Provider>
    );
  }
);

/* =========================================================================
   2. SelectTrigger
   ========================================================================= */

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(props, forwardedRef) {
    const ctx = useSelectContext();
    const { asChild = false, className, children, onClick, onKeyDown, ...rest } = props;

    const mergedRef = useMergeRefs(ctx.triggerRef, (node: HTMLElement | null) => {
      ctx.refs.setReference(node);
      if (typeof forwardedRef === "function") {
        forwardedRef(node as HTMLButtonElement | null);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node as HTMLButtonElement | null;
      }
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ctx.isDisabled) return;
      ctx.setIsOpen(!ctx.isOpen);
      onClick?.(e);
    };

    // Type-ahead buffer for closed trigger
    const typeaheadBuffer = React.useRef("");
    const typeaheadTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const internal = ctx as unknown as InternalSelectContext;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (ctx.isDisabled) return;

      const enabledList = internal.itemsList.filter((v) => !internal.disabledItems.has(v));

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!ctx.isOpen) {
          ctx.setIsOpen(true);
        } else if (enabledList.length > 0) {
          const currentIndex = ctx.highlightedValue ? enabledList.indexOf(ctx.highlightedValue) : -1;
          const nextIdx = currentIndex < enabledList.length - 1 ? currentIndex + 1 : 0;
          ctx.setHighlightedValue(enabledList[nextIdx] ?? null);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!ctx.isOpen) {
          ctx.setIsOpen(true);
        } else if (enabledList.length > 0) {
          const currentIndex = ctx.highlightedValue ? enabledList.indexOf(ctx.highlightedValue) : -1;
          const prevIdx = currentIndex > 0 ? currentIndex - 1 : enabledList.length - 1;
          ctx.setHighlightedValue(enabledList[prevIdx] ?? null);
        }
      } else if (e.key === "Home" && ctx.isOpen) {
        e.preventDefault();
        if (enabledList.length > 0) {
          ctx.setHighlightedValue(enabledList[0] ?? null);
        }
      } else if (e.key === "End" && ctx.isOpen) {
        e.preventDefault();
        if (enabledList.length > 0) {
          ctx.setHighlightedValue(enabledList[enabledList.length - 1] ?? null);
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!ctx.isOpen) {
          ctx.setIsOpen(true);
        } else {
          if (ctx.highlightedValue && !internal.disabledItems.has(ctx.highlightedValue)) {
            ctx.setValue(ctx.highlightedValue);
          }
          ctx.setIsOpen(false);
        }
      } else if (e.key === "Escape" && ctx.isOpen) {
        e.preventDefault();
        ctx.setIsOpen(false);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Printable character typeahead
        if (typeaheadTimeout.current) clearTimeout(typeaheadTimeout.current);
        typeaheadBuffer.current += e.key.toLowerCase();
        typeaheadTimeout.current = setTimeout(() => {
          typeaheadBuffer.current = "";
        }, 500);

        const match = enabledList.find((val) => {
          const label = internal.itemLabels.get(val)?.toLowerCase() ?? "";
          return label.startsWith(typeaheadBuffer.current);
        });

        if (match) {
          if (!ctx.isOpen) {
            ctx.setValue(match);
          }
          ctx.setHighlightedValue(match);
        }
      }

      onKeyDown?.(e);
    };

    const triggerClasses = classNames(
      "cl-select__trigger",
      `cl-select__trigger--${ctx.variant}`,
      `cl-select__trigger--${ctx.size}`,
      className
    );

    const activeDescendantId =
      ctx.isOpen && ctx.highlightedValue ? `${ctx.contentId}-item-${ctx.highlightedValue}` : undefined;

    const baseTriggerProps = {
      ref: mergedRef,
      id: ctx.triggerId,
      type: "button" as const,
      role: "combobox",
      "aria-haspopup": "listbox" as const,
      "aria-expanded": ctx.isOpen,
      "aria-controls": ctx.isOpen ? ctx.contentId : undefined,
      "aria-activedescendant": activeDescendantId,
      "aria-invalid": ctx.isInvalid ? true : undefined,
      "aria-required": ctx.isRequired ? true : undefined,
      "aria-describedby": (ctx as any).ariaDescribedBy ?? rest["aria-describedby"],
      disabled: ctx.isDisabled,
      "data-state": ctx.isOpen ? "open" : "closed",
      "data-invalid": ctx.isInvalid ? "true" : undefined,
      "data-disabled": ctx.isDisabled ? "true" : undefined,
      className: triggerClasses,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...rest,
    };

    const triggerProps = internal.getReferenceProps
      ? internal.getReferenceProps(baseTriggerProps as any)
      : baseTriggerProps;

    if (asChild) {
      return <Slot {...triggerProps}>{children}</Slot>;
    }

    return <button {...triggerProps}>{children}</button>;
  }
);

/* =========================================================================
   3. SelectValue
   ========================================================================= */

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  function SelectValue(props, ref) {
    const ctx = useSelectContext();
    const { placeholder = "Select an option...", children, className, ...rest } = props;

    const displayText = children ?? ctx.selectedLabel ?? (ctx.value ? String(ctx.value) : null);
    const isPlaceholder = !displayText;

    return (
      <span
        ref={ref}
        className={classNames(
          "cl-select__value",
          isPlaceholder && "cl-select__value--placeholder",
          className
        )}
        {...rest}
      >
        {displayText || placeholder}
      </span>
    );
  }
);

/* =========================================================================
   4. SelectIcon
   ========================================================================= */

export const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  function SelectIcon(props, ref) {
    const { children, className, ...rest } = props;

    return (
      <span
        ref={ref}
        className={classNames("cl-select__icon", className)}
        aria-hidden="true"
        {...rest}
      >
        {children || (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        )}
      </span>
    );
  }
);

/* =========================================================================
   5. SelectPortal
   ========================================================================= */

export function SelectPortal({ children, container }: SelectPortalProps) {
  const ctx = useSelectContext();
  if (!ctx.isOpen) return null;
  return <Portal container={container ?? null}>{children}</Portal>;
}

/* =========================================================================
   6. SelectContent
   ========================================================================= */

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent(props, forwardedRef) {
    const ctx = useSelectContext();
    const { className, children, onKeyDown, ...rest } = props;

    const mergedRef = useMergeRefs(ctx.contentRef, (node: HTMLElement | null) => {
      ctx.refs.setFloating(node);
      if (typeof forwardedRef === "function") {
        forwardedRef(node as HTMLDivElement | null);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node as HTMLDivElement | null;
      }
    });

    const internal = ctx as unknown as InternalSelectContext;

    // Auto-scroll highlighted item into view
    React.useLayoutEffect(() => {
      if (ctx.isOpen && ctx.highlightedValue && ctx.contentRef.current) {
        const itemEl = ctx.contentRef.current.querySelector<HTMLElement>(
          `[data-value="${CSS.escape(ctx.highlightedValue)}"]`
        );
        if (itemEl && typeof itemEl.scrollIntoView === "function") {
          itemEl.scrollIntoView({ block: "nearest" });
        }
      }
    }, [ctx.isOpen, ctx.highlightedValue]);

    // Keyboard navigation inside listbox
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const enabledList = internal.itemsList.filter((v) => !internal.disabledItems.has(v));
      if (enabledList.length === 0) return;

      const currentIndex = ctx.highlightedValue
        ? enabledList.indexOf(ctx.highlightedValue)
        : -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = currentIndex < enabledList.length - 1 ? currentIndex + 1 : 0;
        ctx.setHighlightedValue(enabledList[nextIdx] ?? null);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIdx = currentIndex > 0 ? currentIndex - 1 : enabledList.length - 1;
        ctx.setHighlightedValue(enabledList[prevIdx] ?? null);
      } else if (e.key === "Home") {
        e.preventDefault();
        ctx.setHighlightedValue(enabledList[0] ?? null);
      } else if (e.key === "End") {
        e.preventDefault();
        ctx.setHighlightedValue(enabledList[enabledList.length - 1] ?? null);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (ctx.highlightedValue && !internal.disabledItems.has(ctx.highlightedValue)) {
          ctx.setValue(ctx.highlightedValue);
          ctx.setIsOpen(false);
          ctx.triggerRef.current?.focus();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        ctx.setIsOpen(false);
        ctx.triggerRef.current?.focus();
      } else if (e.key === "Tab") {
        ctx.setIsOpen(false);
      }

      onKeyDown?.(e);
    };

    if (!ctx.isOpen) return null;

    const baseContentProps = {
      ref: mergedRef,
      id: ctx.contentId,
      role: "listbox",
      "aria-labelledby": ctx.triggerId,
      tabIndex: -1,
      style: ctx.floatingStyles,
      className: classNames("cl-select__content", className),
      onKeyDown: handleKeyDown,
      ...rest,
    };

    const contentProps = internal.getFloatingProps
      ? internal.getFloatingProps(baseContentProps as any)
      : baseContentProps;

    return (
      <div {...contentProps}>
        {children}
      </div>
    );
  }
);

/* =========================================================================
   7. SelectItem
   ========================================================================= */

interface InternalItemContextValue {
  isSelected: boolean;
}

const ItemContext = React.createContext<InternalItemContextValue>({ isSelected: false });

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(props, ref) {
    const ctx = useSelectContext();
    const {
      value,
      isDisabled = false,
      textValue,
      children,
      className,
      onClick,
      onMouseEnter,
      ...rest
    } = props;

    const isSelected = ctx.value === value;
    const isHighlighted = ctx.highlightedValue === value;

    // Register item text for SelectValue computation
    const itemRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(itemRef, ref);

    const { registerItem } = ctx as unknown as InternalSelectContext;

    React.useEffect(() => {
      const label =
        textValue ??
        (typeof children === "string" ? children : itemRef.current?.textContent?.trim() ?? value);
      const unregister = registerItem(value, label, isDisabled);
      return unregister;
    }, [value, textValue, isDisabled, registerItem]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || ctx.isDisabled) return;
      ctx.setValue(value);
      ctx.setIsOpen(false);
      ctx.triggerRef.current?.focus();
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDisabled && !ctx.isDisabled) {
        ctx.setHighlightedValue(value);
      }
      onMouseEnter?.(e);
    };

    const itemId = `${ctx.contentId}-item-${value}`;

    return (
      <ItemContext.Provider value={{ isSelected }}>
        <div
          ref={mergedRef}
          id={itemId}
          role="option"
          data-value={value}
          aria-selected={isSelected}
          aria-disabled={isDisabled ? "true" : undefined}
          data-disabled={isDisabled ? "true" : undefined}
          data-highlighted={isHighlighted ? "true" : undefined}
          className={classNames("cl-select__item", className)}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          {...rest}
        >
          {children}
        </div>
      </ItemContext.Provider>
    );
  }
);

/* =========================================================================
   8. SelectItemText
   ========================================================================= */

export const SelectItemText = React.forwardRef<HTMLSpanElement, SelectItemTextProps>(
  function SelectItemText(props, ref) {
    const { children, className, ...rest } = props;

    return (
      <span ref={ref} className={classNames("cl-select__item-text", className)} {...rest}>
        {children}
      </span>
    );
  }
);

/* =========================================================================
   9. SelectItemIndicator
   ========================================================================= */

export const SelectItemIndicator = React.forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  function SelectItemIndicator(props, ref) {
    const { isSelected } = React.useContext(ItemContext);
    const { children, className, ...rest } = props;

    if (!isSelected) return null;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={classNames("cl-select__item-indicator", className)}
        {...rest}
      >
        {children || (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2.5 7 5.5 10 11.5 3.5" />
          </svg>
        )}
      </span>
    );
  }
);

/* =========================================================================
   10. SelectGroup, SelectLabel, SelectSeparator
   ========================================================================= */

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  function SelectGroup(props, ref) {
    const { className, ...rest } = props;
    return <div ref={ref} role="group" className={classNames("cl-select__group", className)} {...rest} />;
  }
);

export const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  function SelectLabel(props, ref) {
    const { className, ...rest } = props;
    return <div ref={ref} className={classNames("cl-select__label", className)} {...rest} />;
  }
);

export const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator(props, ref) {
    const { className, ...rest } = props;
    return <div ref={ref} role="separator" className={classNames("cl-select__separator", className)} {...rest} />;
  }
);

/* =========================================================================
   Compound Component Object
   ========================================================================= */

export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: SelectPortal,
  Content: SelectContent,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  Group: SelectGroup,
  Label: SelectLabel,
  Separator: SelectSeparator,
});
