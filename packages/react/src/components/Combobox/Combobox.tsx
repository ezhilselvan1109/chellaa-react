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
  ComboboxProps,
  ComboboxRootProps,
  ComboboxControlProps,
  ComboboxInputProps,
  ComboboxTriggerProps,
  ComboboxPortalProps,
  ComboboxContentProps,
  ComboboxItemProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
  ComboboxEmptyProps,
  ComboboxTagProps,
  ComboboxClearProps,
  ComboboxContextValue,
} from "./Combobox.types";

interface InternalComboboxContext extends ComboboxContextValue {
  contentElementRef: React.MutableRefObject<HTMLDivElement | null>;
  hasOptions: boolean;
  setHasOptions: (has: boolean) => void;
}

const ComboboxContext = React.createContext<InternalComboboxContext | null>(null);

export function useComboboxContext(): ComboboxContextValue {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error(
      "Combobox subcomponents must be used within a <Combobox> or <Combobox.Root> provider."
    );
  }
  return context;
}

export const useCombobox = useComboboxContext;

/* =========================================================================
   1. ComboboxRoot / Combobox
   ========================================================================= */

export const ComboboxRoot = React.forwardRef<HTMLDivElement, ComboboxRootProps>(
  function ComboboxRoot(props, ref) {
    const formField = useFormField();

    const {
      value: valueProp,
      defaultValue: defaultValueProp,
      onValueChange,
      searchValue: searchValueProp,
      defaultSearchValue = "",
      onSearchChange,
      isOpen: isOpenProp,
      defaultOpen = false,
      onOpenChange,
      isDisabled: disabledProp,
      isInvalid: isInvalidProp,
      isLoading: isLoadingProp = false,
      isMulti = false,
      size: sizeProp = "md",
      variant: variantProp = "outline",
      filter = (itemVal: string, itemText: string, search: string) => {
        if (!search) return true;
        const q = search.toLowerCase().trim();
        return (
          itemVal.toLowerCase().includes(q) ||
          itemText.toLowerCase().includes(q)
        );
      },
      options,
      placeholder,
      className,
      children,
      id: idProp,
      name: nameProp,
      isRequired: isRequiredProp,
      "aria-describedby": ariaDescribedByProp,
      ...rest
    } = props;

    const isDisabled = disabledProp ?? formField?.disabled ?? false;
    const isInvalid = isInvalidProp ?? formField?.error ?? false;
    const isRequired = isRequiredProp ?? (props as any).required ?? formField?.required ?? false;
    const name = nameProp ?? formField?.name;
    const ariaDescribedBy = [
      ariaDescribedByProp,
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    const size = sizeProp ?? "md";
    const variant = variantProp;
    const isLoading = isLoadingProp;

    const baseId = React.useId().replace(/:/g, "");
    const generatedInputId = `cl-combobox-input-${baseId}`;
    const inputId = idProp ?? formField?.id ?? generatedInputId;
    const listboxId = `cl-combobox-listbox-${baseId}`;

    // Resolve initial search label for single-select when options are available
    const initialVal = valueProp !== undefined ? valueProp : defaultValueProp;
    const initialSelectedOption =
      !isMulti && options && initialVal !== undefined
        ? options.find((o) => o.value === initialVal)
        : undefined;

    const resolvedDefaultSearch =
      defaultSearchValue ||
      (typeof initialSelectedOption?.label === "string"
        ? initialSelectedOption.label
        : typeof initialSelectedOption?.value === "string"
          ? initialSelectedOption.value
          : "");

    // Controlled or uncontrolled value
    const [value, setValueState] = useControllableState<any>({
      value: valueProp,
      defaultValue: defaultValueProp !== undefined ? defaultValueProp : isMulti ? [] : "",
      onChange: onValueChange,
    });

    // Controlled or uncontrolled search text
    const [searchValue, setSearchValueState] = useControllableState<string>({
      value: searchValueProp,
      defaultValue: resolvedDefaultSearch,
      onChange: onSearchChange,
    });

    // Controlled or uncontrolled open state
    const [isOpen, setIsOpenState] = useControllableState<boolean>({
      value: isOpenProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const [isFiltering, setIsFiltering] = React.useState<boolean>(false);
    const [pendingHighlight, setPendingHighlight] = React.useState<
      "first" | "last" | "selected" | null
    >(null);

    const openWithHighlight = React.useCallback(
      (target: "first" | "last" | "selected") => {
        if (isDisabled) return;
        setIsFiltering(false);
        setPendingHighlight(target);
        setIsOpenState(true);
      },
      [isDisabled, setIsOpenState]
    );

    const [activeId, setActiveId] = React.useState<string | null>(null);
    const [hasOptions, setHasOptions] = React.useState<boolean>(true);
    const setHasOptionsCallback = React.useCallback((has: boolean) => {
      setHasOptions((prev) => (prev === has ? prev : has));
    }, []);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const contentElementRef = React.useRef<HTMLDivElement | null>(null);

    // Floating UI positioning
    const {
      refs,
      floatingStyles,
      context: floatingContext,
    } = useFloating({
      open: isOpen,
      onOpenChange: (open) => {
        if (!isDisabled) {
          setIsOpenState(open);
        }
      },
      whileElementsMounted: autoUpdate,
      placement: "bottom-start",
      middleware: [
        offset(4),
        flip({ fallbackAxisSideDirection: "start" }),
        shift({ padding: 8 }),
        floatingSize({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });

    const dismiss = useDismiss(floatingContext, {
      outsidePress: true,
      escapeKey: false, // Handled specifically by input keydown
    });

    useInteractions([dismiss]);

    // Selection handlers
    const selectItem = React.useCallback(
      (itemVal: string, itemText: string) => {
        if (isMulti) {
          const currentArr = Array.isArray(value) ? value : [];
          const exists = currentArr.includes(itemVal);
          const nextArr = exists
            ? currentArr.filter((v) => v !== itemVal)
            : [...currentArr, itemVal];
          setValueState(nextArr);
          setSearchValueState("");
          setIsFiltering(false);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        } else {
          setValueState(itemVal);
          setSearchValueState(itemText || itemVal);
          setIsFiltering(false);
          setIsOpenState(false);
          setActiveId(null);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      },
      [isMulti, value, setValueState, setSearchValueState, setIsOpenState]
    );

    const removeItem = React.useCallback(
      (itemVal: string) => {
        if (isMulti && Array.isArray(value)) {
          setValueState(value.filter((v) => v !== itemVal));
        }
      },
      [isMulti, value, setValueState]
    );

    const clearSelection = React.useCallback(() => {
      setValueState(isMulti ? [] : "");
      setSearchValueState("");
      setIsFiltering(false);
      setActiveId(null);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [isMulti, setValueState, setSearchValueState]);

    const registerItem = React.useCallback(() => () => {}, []);
    const updateItemVisibility = React.useCallback(() => {}, []);

    const contextValue: InternalComboboxContext = React.useMemo(
      () => ({
        value,
        selectItem,
        removeItem,
        clearSelection,
        searchValue,
        setSearchValue: setSearchValueState,
        isOpen,
        setIsOpen: setIsOpenState,
        activeId,
        setActiveId,
        inputRef,
        controlRef: refs.setReference,
        contentRef: refs.setFloating,
        contentElementRef,
        hasOptions,
        setHasOptions: setHasOptionsCallback,
        floatingStyles,
        listboxId,
        inputId,
        isMulti,
        isDisabled,
        isInvalid,
        isLoading,
        size,
        variant,
        filter,
        isFiltering,
        setIsFiltering,
        pendingHighlight,
        setPendingHighlight,
        openWithHighlight,
        ariaDescribedBy,
        isRequired,
        name,
        registerItem,
        updateItemVisibility,
        visibleItems: [],
        filteredCount: hasOptions ? 1 : 0,
      }),
      [
        value,
        selectItem,
        removeItem,
        clearSelection,
        searchValue,
        setSearchValueState,
        isOpen,
        setIsOpenState,
        activeId,
        refs.setReference,
        refs.setFloating,
        hasOptions,
        setHasOptionsCallback,
        floatingStyles,
        listboxId,
        inputId,
        isMulti,
        isDisabled,
        isInvalid,
        isLoading,
        size,
        variant,
        filter,
        isFiltering,
        pendingHighlight,
        openWithHighlight,
        ariaDescribedBy,
        isRequired,
        name,
        registerItem,
        updateItemVisibility,
      ]
    );

    const rootClasses = classNames(
      "cl-combobox",
      `cl-combobox--${size}`,
      `cl-combobox--${variant}`,
      className
    );

    const mergedRootRef = useMergeRefs(ref, refs.setReference);

    return (
      <ComboboxContext.Provider value={contextValue}>
        <div ref={mergedRootRef} className={rootClasses} {...rest}>
          {children ?? (
            <>
              <ComboboxControl>
                {isMulti && Array.isArray(value) && value.length > 0 && (
                  <div className="cl-combobox__tags">
                    {value.map((val) => {
                      const opt = options?.find((o) => o.value === val);
                      return (
                        <ComboboxTag key={val} value={val}>
                          {opt?.label ?? val}
                        </ComboboxTag>
                      );
                    })}
                  </div>
                )}
                <ComboboxInput placeholder={placeholder} />
                <ComboboxClear />
                <ComboboxTrigger />
              </ComboboxControl>
              <ComboboxContent>
                <ComboboxEmpty>No results found.</ComboboxEmpty>
                {options?.map((opt) => (
                  <ComboboxItem
                    key={opt.value}
                    value={opt.value}
                    isDisabled={opt.disabled}
                  >
                    {opt.label ?? opt.value}
                  </ComboboxItem>
                ))}
              </ComboboxContent>
            </>
          )}
        </div>
      </ComboboxContext.Provider>
    );
  }
);

/* =========================================================================
   2. ComboboxControl
   ========================================================================= */

export const ComboboxControl = React.forwardRef<HTMLDivElement, ComboboxControlProps>(
  function ComboboxControl(props, ref) {
    const ctx = useComboboxContext();
    const { asChild = false, className, children, ...rest } = props;
    const combinedRef = useMergeRefs(ref, ctx.controlRef);

    const controlClasses = classNames("cl-combobox__control", className);

    if (asChild) {
      return (
        <Slot
          ref={combinedRef}
          data-disabled={ctx.isDisabled ? "true" : undefined}
          data-invalid={ctx.isInvalid ? "true" : undefined}
          className={controlClasses}
          {...rest}
        >
          {children}
        </Slot>
      );
    }

    return (
      <div
        ref={combinedRef}
        data-disabled={ctx.isDisabled ? "true" : undefined}
        data-invalid={ctx.isInvalid ? "true" : undefined}
        className={controlClasses}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* =========================================================================
   3. ComboboxInput
   ========================================================================= */

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(props, ref) {
    const ctx = React.useContext(ComboboxContext);
    if (!ctx) throw new Error("ComboboxInput must be used within Combobox");

    const {
      asChild = false,
      className,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      onClick,
      disabled: disabledProp,
      placeholder,
      value: inputValProp,
      ...rest
    } = props;

    const isDisabled = disabledProp ?? ctx.isDisabled;

    const getVisibleOptions = () => {
      const container = ctx.contentElementRef.current;
      if (!container) return [];
      return Array.from(
        container.querySelectorAll<HTMLElement>(
          '[role="option"]:not([aria-disabled="true"])'
        )
      );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      const nextQuery = e.target.value;
      ctx.setIsFiltering(true);
      ctx.setSearchValue(nextQuery);
      if (!ctx.isOpen) {
        ctx.setIsOpen(true);
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled) return;

      const options = getVisibleOptions();

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (!ctx.isOpen) {
            ctx.openWithHighlight(ctx.value && !ctx.isMulti ? "selected" : "first");
            break;
          }
          if (options.length > 0) {
            const currentIndex = options.findIndex((opt) => opt.id === ctx.activeId);
            const nextIndex =
              currentIndex === -1 || currentIndex === options.length - 1
                ? 0
                : currentIndex + 1;
            const target = options[nextIndex];
            if (target) {
              ctx.setActiveId(target.id);
              target.scrollIntoView?.({ block: "nearest" });
            }
          }
          break;
        }

        case "ArrowUp": {
          e.preventDefault();
          if (!ctx.isOpen) {
            ctx.openWithHighlight(ctx.value && !ctx.isMulti ? "selected" : "last");
            break;
          }
          if (options.length > 0) {
            const currentIndex = options.findIndex((opt) => opt.id === ctx.activeId);
            const prevIndex =
              currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
            const target = options[prevIndex];
            if (target) {
              ctx.setActiveId(target.id);
              target.scrollIntoView?.({ block: "nearest" });
            }
          }
          break;
        }

        case "Home": {
          if (ctx.isOpen && options.length > 0) {
            e.preventDefault();
            const target = options[0];
            if (target) {
              ctx.setActiveId(target.id);
              target.scrollIntoView?.({ block: "nearest" });
            }
          }
          break;
        }

        case "End": {
          if (ctx.isOpen && options.length > 0) {
            e.preventDefault();
            const target = options[options.length - 1];
            if (target) {
              ctx.setActiveId(target.id);
              target.scrollIntoView?.({ block: "nearest" });
            }
          }
          break;
        }

        case "Enter": {
          if (ctx.isOpen && ctx.activeId) {
            e.preventDefault();
            const activeEl = document.getElementById(ctx.activeId);
            if (activeEl && activeEl.getAttribute("aria-disabled") !== "true") {
              const val = activeEl.getAttribute("data-value") || "";
              const text =
                activeEl.getAttribute("data-label") ||
                activeEl.textContent ||
                val;
              ctx.selectItem(val, text);
            }
          }
          break;
        }

        case "Escape": {
          if (ctx.isOpen) {
            e.preventDefault();
            e.stopPropagation();
            ctx.setIsOpen(false);
            ctx.setActiveId(null);
          }
          break;
        }

        case "Tab": {
          if (ctx.isOpen) {
            ctx.setIsOpen(false);
            ctx.setActiveId(null);
          }
          break;
        }

        case "Backspace": {
          if (
            ctx.isMulti &&
            !ctx.searchValue &&
            Array.isArray(ctx.value) &&
            ctx.value.length > 0
          ) {
            const lastVal = ctx.value[ctx.value.length - 1];
            ctx.removeItem(lastVal);
          }
          break;
        }
      }

      onKeyDown?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      if (!ctx.isOpen) {
        ctx.openWithHighlight("selected");
        if (!ctx.isMulti && ctx.value) {
          ctx.inputRef.current?.select();
        }
      }
      onClick?.(e);
    };

    const combinedRef = (node: HTMLInputElement | null) => {
      ctx.inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const inputValue =
      inputValProp !== undefined ? inputValProp : ctx.searchValue;

    const inputClasses = classNames("cl-combobox__input", className);

    if (asChild) {
      return (
        <Slot
          {...({
            ref: combinedRef,
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-expanded": ctx.isOpen,
            "aria-controls": ctx.listboxId,
            "aria-activedescendant": ctx.activeId ?? undefined,
            "aria-haspopup": "listbox",
            "aria-invalid": ctx.isInvalid || undefined,
            "aria-disabled": isDisabled || undefined,
            "aria-busy": ctx.isLoading || undefined,
            "aria-describedby": ctx.ariaDescribedBy,
            "aria-required": ctx.isRequired || undefined,
            name: ctx.name,
            required: ctx.isRequired || undefined,
            id: ctx.inputId,
            autoComplete: "off",
            spellCheck: "false",
            value: inputValue,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onClick: handleClick,
            placeholder,
            className: inputClasses,
            ...rest,
          } as any)}
        />
      );
    }

    return (
      <input
        ref={combinedRef}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={ctx.isOpen}
        aria-controls={ctx.listboxId}
        aria-activedescendant={ctx.activeId ?? undefined}
        aria-haspopup="listbox"
        aria-invalid={ctx.isInvalid || undefined}
        aria-disabled={isDisabled || undefined}
        aria-busy={ctx.isLoading || undefined}
        aria-describedby={ctx.ariaDescribedBy}
        aria-required={ctx.isRequired || undefined}
        name={ctx.name}
        required={ctx.isRequired || undefined}
        disabled={isDisabled}
        id={ctx.inputId}
        autoComplete="off"
        spellCheck="false"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        placeholder={placeholder}
        className={inputClasses}
        {...rest}
      />
    );
  }
);

/* =========================================================================
   3. ComboboxTrigger
   ========================================================================= */

export const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  function ComboboxTrigger(props, ref) {
    const ctx = useComboboxContext();
    const {
      asChild = false,
      className,
      onClick,
      children,
      disabled: disabledProp,
      ...rest
    } = props;

    const isDisabled = disabledProp ?? ctx.isDisabled;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      if (ctx.isOpen) {
        ctx.setIsOpen(false);
      } else {
        ctx.openWithHighlight("selected");
      }
      if (ctx.inputRef.current) {
        ctx.inputRef.current.focus();
      }
      onClick?.(e);
    };

    const triggerClasses = classNames("cl-combobox__trigger", className);

    if (asChild) {
      return (
        <Slot
          ref={ref}
          type="button"
          tabIndex={-1}
          aria-label="Toggle options"
          data-state={ctx.isOpen ? "open" : "closed"}
          aria-disabled={isDisabled || undefined}
          onClick={handleClick}
          className={triggerClasses}
          {...rest}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        tabIndex={-1}
        aria-label="Toggle options"
        data-state={ctx.isOpen ? "open" : "closed"}
        disabled={isDisabled}
        onClick={handleClick}
        className={triggerClasses}
        {...rest}
      >
        {children ?? (
          <svg
            className="cl-combobox__trigger-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </button>
    );
  }
);

/* =========================================================================
   4. ComboboxPortal
   ========================================================================= */

export const ComboboxPortal: React.FC<ComboboxPortalProps> = ({
  children,
  container,
}) => {
  return container !== undefined ? (
    <Portal container={container}>{children}</Portal>
  ) : (
    <Portal>{children}</Portal>
  );
};

/* =========================================================================
   5. ComboboxContent
   ========================================================================= */

export const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent(props, ref) {
    const ctx = React.useContext(ComboboxContext);
    if (!ctx) throw new Error("ComboboxContent must be used within Combobox");

    const { asChild = false, className, style, children, ...rest } = props;

    const combinedRef = (node: HTMLDivElement | null) => {
      ctx.contentRef(node);
      ctx.contentElementRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Keep track of visible option count and process pendingHighlight
    React.useLayoutEffect(() => {
      if (ctx.isOpen && ctx.contentElementRef.current) {
        const container = ctx.contentElementRef.current;
        const allOptions = Array.from(
          container.querySelectorAll<HTMLElement>('[role="option"]')
        );
        const enabledOptions = allOptions.filter(
          (el) => el.getAttribute("aria-disabled") !== "true"
        );

        ctx.setHasOptions(allOptions.length > 0);

        if (ctx.pendingHighlight) {
          let targetEl: HTMLElement | null = null;
          if (ctx.pendingHighlight === "first" && enabledOptions.length > 0) {
            targetEl = enabledOptions[0] ?? null;
          } else if (ctx.pendingHighlight === "last" && enabledOptions.length > 0) {
            targetEl = enabledOptions[enabledOptions.length - 1] ?? null;
          } else if (ctx.pendingHighlight === "selected") {
            const selectedEl = enabledOptions.find(
              (el) => el.getAttribute("aria-selected") === "true"
            );
            targetEl = selectedEl ?? (enabledOptions.length > 0 ? enabledOptions[0] ?? null : null);
          }

          if (targetEl) {
            ctx.setActiveId(targetEl.id);
            targetEl.scrollIntoView?.({ block: "nearest" });
          }
          ctx.setPendingHighlight(null);
        }
      }
    });

    if (!ctx.isOpen) {
      return null;
    }

    const contentClasses = classNames("cl-combobox__content", className);
    const mergedStyles: React.CSSProperties = {
      ...ctx.floatingStyles,
      ...style,
    };

    if (asChild) {
      return (
        <Slot
          ref={combinedRef}
          role="listbox"
          id={ctx.listboxId}
          aria-labelledby={ctx.inputId}
          aria-multiselectable={ctx.isMulti ? true : undefined}
          aria-busy={ctx.isLoading ? true : undefined}
          tabIndex={-1}
          data-state="open"
          style={mergedStyles}
          className={contentClasses}
          {...rest}
        >
          {children}
        </Slot>
      );
    }

    return (
      <div
        ref={combinedRef}
        role="listbox"
        id={ctx.listboxId}
        aria-labelledby={ctx.inputId}
        aria-multiselectable={ctx.isMulti ? true : undefined}
        aria-busy={ctx.isLoading ? true : undefined}
        tabIndex={-1}
        data-state="open"
        style={mergedStyles}
        className={contentClasses}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* =========================================================================
   6. ComboboxItem
   ========================================================================= */

export const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  function ComboboxItem(props, ref) {
    const ctx = React.useContext(ComboboxContext);
    if (!ctx) throw new Error("ComboboxItem must be used within Combobox");

    const {
      value: itemVal,
      label,
      isDisabled: itemDisabled = false,
      asChild = false,
      className,
      children,
      onClick,
      onMouseEnter,
      ...rest
    } = props;

    const itemId = `${ctx.listboxId}-opt-${encodeURIComponent(itemVal)}`;
    const itemRef = React.useRef<HTMLDivElement | null>(null);

    // Determine string text for search filtering
    const itemText = React.useMemo(() => {
      if (label) return label;
      if (typeof children === "string") return children;
      if (typeof children === "number") return String(children);
      return itemVal;
    }, [label, children, itemVal]);

    // Check match against current search query
    const isVisible = React.useMemo(() => {
      if (ctx.filter === false) return true;
      if (!ctx.isFiltering && !ctx.isMulti) return true;
      return ctx.filter(itemVal, itemText, ctx.searchValue);
    }, [ctx.filter, ctx.isFiltering, ctx.isMulti, itemVal, itemText, ctx.searchValue]);

    // Check selection state
    const isSelected = React.useMemo(() => {
      if (ctx.isMulti && Array.isArray(ctx.value)) {
        return ctx.value.includes(itemVal);
      }
      return ctx.value === itemVal;
    }, [ctx.isMulti, ctx.value, itemVal]);

    const isHighlighted = ctx.activeId === itemId;

    if (!isVisible) {
      return null;
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (itemDisabled || ctx.isDisabled) return;
      ctx.selectItem(itemVal, itemText);
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!itemDisabled && !ctx.isDisabled) {
        ctx.setActiveId(itemId);
      }
      onMouseEnter?.(e);
    };

    const combinedRef = (node: HTMLDivElement | null) => {
      itemRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const itemClasses = classNames("cl-combobox__item", className);

    if (asChild) {
      return (
        <Slot
          ref={combinedRef}
          role="option"
          id={itemId}
          data-value={itemVal}
          data-label={itemText}
          aria-selected={isSelected}
          aria-disabled={itemDisabled || undefined}
          data-highlighted={isHighlighted ? "true" : undefined}
          data-disabled={itemDisabled ? "true" : undefined}
          data-state={isSelected ? "checked" : "unchecked"}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          className={itemClasses}
          {...rest}
        >
          {children}
        </Slot>
      );
    }

    return (
      <div
        ref={combinedRef}
        role="option"
        id={itemId}
        data-value={itemVal}
        data-label={itemText}
        aria-selected={isSelected}
        aria-disabled={itemDisabled || undefined}
        data-highlighted={isHighlighted ? "true" : undefined}
        data-disabled={itemDisabled ? "true" : undefined}
        data-state={isSelected ? "checked" : "unchecked"}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={itemClasses}
        {...rest}
      >
        <span>{children}</span>
        {isSelected && (
          <span className="cl-combobox__item-indicator" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>
    );
  }
);

/* =========================================================================
   7. ComboboxGroup & ComboboxGroupLabel
   ========================================================================= */

export const ComboboxGroupLabel = React.forwardRef<
  HTMLDivElement,
  ComboboxGroupLabelProps
>(function ComboboxGroupLabel(props, ref) {
  const { className, children, ...rest } = props;
  return (
    <div
      ref={ref}
      className={classNames("cl-combobox__group-heading", className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const ComboboxGroup = React.forwardRef<HTMLDivElement, ComboboxGroupProps>(
  function ComboboxGroup(props, ref) {
    const { heading, className, children, ...rest } = props;
    const headingId = React.useId();

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={heading ? headingId : undefined}
        className={classNames("cl-combobox__group", className)}
        {...rest}
      >
        {heading && (
          <div id={headingId} className="cl-combobox__group-heading">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

/* =========================================================================
   8. ComboboxEmpty
   ========================================================================= */

export const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty(props, ref) {
    const ctx = React.useContext(ComboboxContext);
    if (!ctx) throw new Error("ComboboxEmpty must be used within Combobox");
    const { className, children, ...rest } = props;

    // Show only when no items are visible and not in loading state
    if (ctx.hasOptions || ctx.isLoading) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="presentation"
        className={classNames("cl-combobox__empty", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* =========================================================================
   9. ComboboxTag
   ========================================================================= */

export const ComboboxTag = React.forwardRef<HTMLSpanElement, ComboboxTagProps>(
  function ComboboxTag(props, ref) {
    const ctx = useComboboxContext();
    const {
      value: tagVal,
      onRemove,
      isDisabled: disabledProp,
      className,
      children,
      ...rest} = props;

    const isDisabled = disabledProp ?? ctx.isDisabled;

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (isDisabled) return;
      if (onRemove) {
        onRemove();
      } else {
        ctx.removeItem(tagVal);
      }
    };

    return (
      <span
        ref={ref}
        className={classNames("cl-combobox__tag", className)}
        {...rest}
      >
        <span>{children}</span>
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Remove ${typeof children === "string" ? children : tagVal}`}
          className="cl-combobox__tag-remove"
          disabled={isDisabled}
          onClick={handleRemove}
        >
          ×
        </button>
      </span>
    );
  }
);

/* =========================================================================
   10. ComboboxClear
   ========================================================================= */

export const ComboboxClear = React.forwardRef<HTMLButtonElement, ComboboxClearProps>(
  function ComboboxClear(props, ref) {
    const ctx = useComboboxContext();
    const { className, onClick, children, disabled: disabledProp, ...rest } = props;

    const isDisabled = disabledProp ?? ctx.isDisabled;

    const hasValue =
      ctx.isMulti
        ? Array.isArray(ctx.value) && ctx.value.length > 0
        : Boolean(ctx.value || ctx.searchValue);

    if (!hasValue) {
      return null;
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (isDisabled) return;
      ctx.clearSelection();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        tabIndex={-1}
        aria-label="Clear selection"
        className={classNames("cl-combobox__clear", className)}
        disabled={isDisabled}
        onClick={handleClick}
        {...rest}
      >
        {children ?? (
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </button>
    );
  }
);

/* =========================================================================
   Compound Object & Aliases
   ========================================================================= */

export interface ComboboxComponent
  extends React.ForwardRefExoticComponent<
    ComboboxProps & React.RefAttributes<HTMLDivElement>
  > {
  Root: typeof ComboboxRoot;
  Control: typeof ComboboxControl;
  Input: typeof ComboboxInput;
  Trigger: typeof ComboboxTrigger;
  Portal: typeof ComboboxPortal;
  Content: typeof ComboboxContent;
  Item: typeof ComboboxItem;
  Group: typeof ComboboxGroup;
  GroupLabel: typeof ComboboxGroupLabel;
  Empty: typeof ComboboxEmpty;
  Tag: typeof ComboboxTag;
  Clear: typeof ComboboxClear;
}

export const Combobox = ComboboxRoot as ComboboxComponent;
Combobox.Root = ComboboxRoot;
Combobox.Control = ComboboxControl;
Combobox.Input = ComboboxInput;
Combobox.Trigger = ComboboxTrigger;
Combobox.Portal = ComboboxPortal;
Combobox.Content = ComboboxContent;
Combobox.Item = ComboboxItem;
Combobox.Group = ComboboxGroup;
Combobox.GroupLabel = ComboboxGroupLabel;
Combobox.Empty = ComboboxEmpty;
Combobox.Tag = ComboboxTag;
Combobox.Clear = ComboboxClear;

export const Autocomplete = Combobox;
