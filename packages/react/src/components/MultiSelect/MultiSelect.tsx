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
import { classNames } from "../../utils/classNames";
import type {
  MultiSelectProps,
  MultiSelectOption,
} from "./MultiSelect.types";

export const MultiSelect = React.forwardRef(function MultiSelect<TValue = string>(
  props: MultiSelectProps<TValue>,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    options = [],
    value: valueProp,
    defaultValue,
    onValueChange,
    placeholder = "Select options...",
    searchPlaceholder = "Search options...",
    isSearchable = true,
    isClearable = true,
    isOpen: isOpenProp,
    defaultOpen = false,
    onOpenChange,
    isDisabled = false,
    isInvalid = false,
    isLoading = false,
    emptyMessage = "No options found.",
    size = "md",
    variant = "outline",
    maxTagCount,
    className,
    id,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedByProp,
    ...rest
  } = props;

  // 1. FormField cascade
  const formField = useFormField();
  const effectiveId = id ?? formField?.id;
  const effectiveDisabled = isDisabled || (formField?.disabled ?? false);
  const effectiveInvalid = isInvalid || (formField?.error ?? false);
  const ariaDescribedBy = [
    ariaDescribedByProp,
    formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
    formField?.hasHelperText ? formField.helperTextId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  // 2. Selection state
  const [selectedValues, setSelectedValues] = useControllableState<TValue[]>({
    value: valueProp,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });

  // 3. Open state
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: isOpenProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  // 4. Search and active index
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);

  const controlRef = React.useRef<HTMLDivElement | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  // 5. Floating positioning
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (effectiveDisabled) return;
      setIsOpen(open);
      if (!open) {
        setSearchQuery("");
        setActiveIndex(-1);
      }
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${Math.max(rects.reference.width, 220)}px`,
          });
        },
      }),
    ],
  });

  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  const mergedControlRef = useMergeRefs(ref, controlRef, refs.setReference);

  // Filtered options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [options, searchQuery]);

  // Map values to options
  const selectedOptions = React.useMemo(() => {
    return selectedValues
      .map((val) => options.find((opt) => opt.value === val))
      .filter((opt): opt is MultiSelectOption<TValue> => opt !== undefined);
  }, [options, selectedValues]);

  // Focus search input when opened
  React.useEffect(() => {
    if (isOpen && isSearchable) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isSearchable]);

  const toggleOption = (val: TValue) => {
    if (effectiveDisabled) return;
    const exists = selectedValues.some((v) => v === val);
    let next: TValue[];
    if (exists) {
      next = selectedValues.filter((v) => v !== val);
    } else {
      next = [...selectedValues, val];
    }
    setSelectedValues(next);
  };

  const removeOption = (val: TValue, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (effectiveDisabled) return;
    setSelectedValues(selectedValues.filter((v) => v !== val));
  };

  const clearAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (effectiveDisabled) return;
    setSelectedValues([]);
  };

  // Keyboard navigation on trigger
  const handleControlKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (effectiveDisabled) return;

    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Keyboard navigation in search input / listbox
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      controlRef.current?.focus();
      return;
    }

    if (e.key === "Backspace" && searchQuery === "" && selectedValues.length > 0) {
      e.preventDefault();
      const lastVal = selectedValues[selectedValues.length - 1];
      if (lastVal !== undefined) {
        removeOption(lastVal);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
        return next;
      });
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
        return next;
      });
      return;
    }

    if (e.key === "Enter" && activeIndex >= 0 && activeIndex < filteredOptions.length) {
      e.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option && !option.disabled) {
        toggleOption(option.value);
      }
    }
  };

  const visibleTags = React.useMemo(() => {
    if (maxTagCount !== undefined && selectedOptions.length > maxTagCount) {
      return selectedOptions.slice(0, maxTagCount);
    }
    return selectedOptions;
  }, [selectedOptions, maxTagCount]);

  const excessCount = selectedOptions.length - visibleTags.length;

  return (
    <div
      {...rest}
      id={effectiveId}
      className={classNames(
        "cl-multiselect",
        `cl-multiselect--${size}`,
        `cl-multiselect--${variant}`,
        isOpen && "cl-multiselect--open",
        effectiveDisabled && "cl-multiselect--disabled",
        effectiveInvalid && "cl-multiselect--error",
        className
      )}
    >
      {/* Control Surface */}
      <div
        {...getReferenceProps()}
        ref={mergedControlRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={effectiveDisabled ? true : undefined}
        aria-invalid={effectiveInvalid ? true : undefined}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        tabIndex={effectiveDisabled ? -1 : 0}
        onKeyDown={handleControlKeyDown}
        onClick={() => {
          if (!effectiveDisabled) {
            setIsOpen(!isOpen);
          }
        }}
        className="cl-multiselect__control"
      >
        <div className="cl-multiselect__tags">
          {visibleTags.length === 0 ? (
            <span className="cl-multiselect__placeholder">{placeholder}</span>
          ) : (
            visibleTags.map((opt) => (
              <span key={String(opt.value)} className="cl-multiselect__tag">
                <span className="cl-multiselect__tag-label">{opt.label}</span>
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={effectiveDisabled}
                  aria-label={`Remove ${opt.label}`}
                  className="cl-multiselect__tag-remove"
                  onClick={(e) => removeOption(opt.value, e)}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))
          )}

          {excessCount > 0 && (
            <span className="cl-multiselect__tag cl-multiselect__tag--excess">
              +{excessCount} more
            </span>
          )}
        </div>

        <div className="cl-multiselect__actions">
          {isClearable && selectedValues.length > 0 && !effectiveDisabled && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Clear all selections"
              className="cl-multiselect__clear"
              onClick={clearAll}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          <span className="cl-multiselect__arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      {/* Popover */}
      {isOpen && !effectiveDisabled && (
        <Portal>
          <div
            {...getFloatingProps()}
            ref={refs.setFloating}
            style={floatingStyles}
            className="cl-multiselect__popover"
          >
            {isSearchable && (
              <div className="cl-multiselect__search-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  placeholder={searchPlaceholder}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  className="cl-multiselect__search-input"
                  aria-label={searchPlaceholder}
                />
              </div>
            )}

            <div
              ref={listRef}
              role="listbox"
              aria-multiselectable="true"
              className="cl-multiselect__list"
            >
              {isLoading ? (
                <div className="cl-multiselect__loading">Loading options...</div>
              ) : filteredOptions.length === 0 ? (
                <div className="cl-multiselect__empty">{emptyMessage}</div>
              ) : (
                filteredOptions.map((opt, idx) => {
                  const isSelected = selectedValues.some((v) => v === opt.value);
                  const isHighlighted = idx === activeIndex;

                  return (
                    <div
                      key={String(opt.value)}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled ? true : undefined}
                      className={classNames(
                        "cl-multiselect__option",
                        isSelected && "cl-multiselect__option--selected",
                        isHighlighted && "cl-multiselect__option--active",
                        opt.disabled && "cl-multiselect__option--disabled"
                      )}
                      onMouseEnter={() => {
                        if (!opt.disabled) setActiveIndex(idx);
                      }}
                      onClick={() => {
                        if (!opt.disabled) {
                          toggleOption(opt.value);
                          searchInputRef.current?.focus();
                        }
                      }}
                    >
                      <span className="cl-multiselect__checkbox" aria-hidden="true">
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <div className="cl-multiselect__option-content">
                        <span className="cl-multiselect__option-label">{opt.label}</span>
                        {opt.description && (
                          <span className="cl-multiselect__option-desc">{opt.description}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}) as <TValue = string>(
  props: MultiSelectProps<TValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
