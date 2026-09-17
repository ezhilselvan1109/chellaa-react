import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { autoCompleteCssText } from "./AutoComplete.style";
import type {
  AutoCompleteProps,
  AutoCompleteRef,
  AutoCompleteOption,
} from "./AutoComplete.types";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Default clear icon (cross inside circle) */
const DefaultClearIcon: React.FC = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="close-circle"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.5 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
  </svg>
);

export const AutoComplete = forwardRef<AutoCompleteRef, AutoCompleteProps>(
  (props, ref) => {
    const {
      rootClassName,
      allowClear = false,
      backfill = false,
      children,
      classNames,
      styles,
      defaultActiveFirstOption = true,
      defaultOpen,
      defaultValue = "",
      disabled = false,
      popupRender,
      popupMatchSelectWidth = true,
      getPopupContainer,
      notFoundContent,
      open: controlledOpen,
      options = [],
      placeholder,
      prefix,
      showSearch = true,
      filterOption = true,
      status,
      size = "medium",
      value: controlledValue,
      variant = "outlined",
      className = "",
      style,
      onBlur,
      onChange,
      onOpenChange,
      onFocus,
      onSelect,
      onClear,
      onInputKeyDown,
      onPopupScroll,
      onSearch,
      ...restProps
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-autocomplete", autoCompleteCssText);
    }

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    // Value state (controlled vs uncontrolled)
    const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);
    const isControlledValue = controlledValue !== undefined;
    const currentValue = isControlledValue ? controlledValue : uncontrolledValue;

    // Search query used for filtering options (distinct from backfilled navigation value)
    const [searchQuery, setSearchQuery] = useState<string>(defaultValue);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setSearchQuery(controlledValue);
      }
    }, [controlledValue]);

    // Open state (controlled vs uncontrolled)
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen ?? false);
    const isControlledOpen = controlledOpen !== undefined;
    const isDropdownOpen = !disabled && (isControlledOpen ? controlledOpen : uncontrolledOpen);

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(defaultActiveFirstOption ? 0 : -1);
    const [popupCoords, setPopupCoords] = useState<{
      top: number;
      left: number;
      width?: number;
    }>({ top: 0, left: 0 });

    // Expose focus, blur, nativeElement through ref
    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        nativeElement: triggerRef.current,
      }),
      []
    );

    // Filter and normalize options
    const effectiveFilterOption =
      typeof showSearch === "object" && showSearch.filterOption !== undefined
        ? showSearch.filterOption
        : filterOption;

    const filteredOptions = useMemo(() => {
      if (!showSearch || effectiveFilterOption === false || !searchQuery) {
        return options;
      }

      const matchFn =
        typeof effectiveFilterOption === "function"
          ? effectiveFilterOption
          : (inputValue: string, opt: AutoCompleteOption) => {
              const query = inputValue.toLowerCase();
              const valMatch = opt.value
                ? String(opt.value).toLowerCase().includes(query)
                : false;
              const labelMatch =
                typeof opt.label === "string"
                  ? opt.label.toLowerCase().includes(query)
                  : false;
              return valMatch || labelMatch;
            };

      return options.reduce<AutoCompleteOption[]>((acc, opt) => {
        if (opt.options && Array.isArray(opt.options)) {
          // Grouped option
          const matchingChildren = opt.options.filter((childOpt) =>
            matchFn(searchQuery, childOpt)
          );
          if (matchingChildren.length > 0) {
            acc.push({
              ...opt,
              options: matchingChildren,
            });
          }
        } else {
          // Flat option
          if (matchFn(searchQuery, opt)) {
            acc.push(opt);
          }
        }
        return acc;
      }, []);
    }, [options, searchQuery, showSearch, filterOption]);

    // Flatten selectable options for keyboard navigation
    const flatSelectableOptions = useMemo(() => {
      const list: AutoCompleteOption[] = [];
      filteredOptions.forEach((opt) => {
        if (opt.options && Array.isArray(opt.options)) {
          opt.options.forEach((childOpt) => {
            if (!childOpt.disabled && childOpt.value !== undefined) list.push(childOpt);
          });
        } else {
          if (!opt.disabled && opt.value !== undefined) list.push(opt);
        }
      });
      return list;
    }, [filteredOptions]);

    // Reset activeIndex when selectable options change
    useEffect(() => {
      if (defaultActiveFirstOption && flatSelectableOptions.length > 0) {
        setActiveIndex(0);
      } else {
        setActiveIndex(-1);
      }
    }, [flatSelectableOptions.length, defaultActiveFirstOption]);

    // Update popup coordinates
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || typeof window === "undefined") return;
      const rect = triggerRef.current.getBoundingClientRect();

      let targetWidth: number | undefined;
      if (popupMatchSelectWidth === true) {
        targetWidth = rect.width;
      } else if (typeof popupMatchSelectWidth === "number") {
        targetWidth = popupMatchSelectWidth;
      }

      setPopupCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: targetWidth,
      });
    }, [popupMatchSelectWidth]);

    useIsomorphicLayoutEffect(() => {
      if (isDropdownOpen) {
        updatePosition();
      }
    }, [isDropdownOpen, updatePosition]);

    // Outside click & window resize handlers
    useEffect(() => {
      if (!isDropdownOpen || typeof window === "undefined") return;

      const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current?.contains(target) ||
          popupRef.current?.contains(target)
        ) {
          return;
        }
        if (!isControlledOpen) {
          setUncontrolledOpen(false);
        }
        onOpenChange?.(false);
      };

      const handleWindowChange = () => {
        updatePosition();
      };

      window.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("resize", handleWindowChange);
      window.addEventListener("scroll", handleWindowChange, true);

      return () => {
        window.removeEventListener("mousedown", handleOutsideClick);
        window.removeEventListener("resize", handleWindowChange);
        window.removeEventListener("scroll", handleWindowChange, true);
      };
    }, [isDropdownOpen, isControlledOpen, onOpenChange, updatePosition]);

    // Open/close helper
    const triggerOpenChange = (nextOpen: boolean) => {
      if (disabled) return;
      if (!isControlledOpen) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    };

    // Value change helper
    const triggerValueChange = (nextVal: string) => {
      if (!isControlledValue) {
        setUncontrolledValue(nextVal);
      }
      onChange?.(nextVal);
      onSearch?.(nextVal);
    };

    // Select option
    const handleSelectOption = (opt: AutoCompleteOption) => {
      if (opt.disabled || opt.value === undefined) return;
      setSearchQuery(opt.value);
      triggerValueChange(opt.value);
      onSelect?.(opt.value, opt);
      triggerOpenChange(false);
    };

    // Clear input
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setSearchQuery("");
      triggerValueChange("");
      onClear?.();
      inputRef.current?.focus();
    };

    // Input handlers
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const nextVal = e.target.value;
      setSearchQuery(nextVal);
      triggerValueChange(nextVal);
      if (!isDropdownOpen) {
        triggerOpenChange(true);
      }
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
      if (!isDropdownOpen && (filteredOptions.length > 0 || notFoundContent)) {
        triggerOpenChange(true);
      }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onInputKeyDown?.(e);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isDropdownOpen) {
          triggerOpenChange(true);
          return;
        }
        if (flatSelectableOptions.length === 0) return;
        const nextIdx =
          activeIndex < flatSelectableOptions.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(nextIdx);
        const targetOpt = flatSelectableOptions[nextIdx];
        if (backfill && targetOpt?.value !== undefined) {
          triggerValueChange(targetOpt.value);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!isDropdownOpen) {
          triggerOpenChange(true);
          return;
        }
        if (flatSelectableOptions.length === 0) return;
        const prevIdx =
          activeIndex > 0 ? activeIndex - 1 : flatSelectableOptions.length - 1;
        setActiveIndex(prevIdx);
        const prevOpt = flatSelectableOptions[prevIdx];
        if (backfill && prevOpt?.value !== undefined) {
          triggerValueChange(prevOpt.value);
        }
      } else if (e.key === "Enter") {
        if (isDropdownOpen && activeIndex >= 0 && flatSelectableOptions[activeIndex]) {
          e.preventDefault();
          handleSelectOption(flatSelectableOptions[activeIndex]);
        }
      } else if (e.key === "Escape" || e.key === "Tab") {
        if (isDropdownOpen) {
          triggerOpenChange(false);
        }
      }
    };

    // Semantic DOM resolving
    const resolvedClassNames =
      typeof classNames === "function"
        ? classNames({ props })
        : classNames || {};
    const resolvedStyles =
      typeof styles === "function" ? styles({ props }) : styles || {};

    const rootClasses = [
      "ch-autocomplete",
      `ch-autocomplete--${variant}`,
      `ch-autocomplete--${size}`,
      status ? `ch-autocomplete--status-${status}` : "",
      disabled ? "ch-autocomplete--disabled" : "",
      isFocused ? "ch-autocomplete--focused" : "",
      rootClassName,
      resolvedClassNames.root,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Check whether dropdown should render (Ant Design FAQ: don't render empty dropdown if options are empty unless notFoundContent exists)
    const shouldRenderDropdown =
      isDropdownOpen &&
      (filteredOptions.length > 0 || Boolean(notFoundContent));

    const dropdownNode = shouldRenderDropdown ? (
      <div
        ref={popupRef}
        className={["ch-autocomplete-dropdown", resolvedClassNames["popup.root"]]
          .filter(Boolean)
          .join(" ")}
        style={{
          top: `${popupCoords.top}px`,
          left: `${popupCoords.left}px`,
          width: popupCoords.width ? `${popupCoords.width}px` : undefined,
          minWidth: popupCoords.width ? `${popupCoords.width}px` : undefined,
          ...resolvedStyles["popup.root"],
        }}
        onMouseDown={(e) => {
          // Prevent input blur when clicking inside the dropdown list
          e.preventDefault();
        }}
      >
        {popupRender
          ? popupRender(
              <ul
                className={["ch-autocomplete-menu", resolvedClassNames["popup.list"]]
                  .filter(Boolean)
                  .join(" ")}
                style={resolvedStyles["popup.list"]}
                onScroll={onPopupScroll}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt, groupIdx) => {
                    if (opt.options && Array.isArray(opt.options)) {
                      return (
                        <li key={opt.key ?? `group-${groupIdx}`} className="ch-autocomplete-option-group">
                          <div className="ch-autocomplete-option-group-title">
                            {opt.label}
                          </div>
                          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                            {opt.options.map((childOpt, childIdx) => {
                              const isSelected = currentValue === childOpt.value;
                              const isItemActive =
                                flatSelectableOptions[activeIndex]?.value ===
                                childOpt.value;

                              return (
                                <li
                                  key={childOpt.key ?? `child-${groupIdx}-${childIdx}`}
                                  className={[
                                    "ch-autocomplete-option",
                                    isSelected ? "ch-autocomplete-option--selected" : "",
                                    isItemActive ? "ch-autocomplete-option--active" : "",
                                    childOpt.disabled
                                      ? "ch-autocomplete-option--disabled"
                                      : "",
                                    resolvedClassNames["popup.listItem"],
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                  style={resolvedStyles["popup.listItem"]}
                                  onClick={() => handleSelectOption(childOpt)}
                                >
                                  {childOpt.label ?? childOpt.value}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }

                    const isSelected = currentValue === opt.value;
                    const isItemActive =
                      flatSelectableOptions[activeIndex]?.value === opt.value;

                    return (
                      <li
                        key={opt.key ?? `opt-${groupIdx}`}
                        className={[
                          "ch-autocomplete-option",
                          isSelected ? "ch-autocomplete-option--selected" : "",
                          isItemActive ? "ch-autocomplete-option--active" : "",
                          opt.disabled ? "ch-autocomplete-option--disabled" : "",
                          resolvedClassNames["popup.listItem"],
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={resolvedStyles["popup.listItem"]}
                        onClick={() => handleSelectOption(opt)}
                      >
                        {opt.label ?? opt.value}
                      </li>
                    );
                  })
                ) : notFoundContent ? (
                  <div className="ch-autocomplete-empty">{notFoundContent}</div>
                ) : null}
              </ul>
            )
          : (
              <ul
                className={["ch-autocomplete-menu", resolvedClassNames["popup.list"]]
                  .filter(Boolean)
                  .join(" ")}
                style={resolvedStyles["popup.list"]}
                onScroll={onPopupScroll}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt, groupIdx) => {
                    if (opt.options && Array.isArray(opt.options)) {
                      return (
                        <li key={opt.key ?? `group-${groupIdx}`} className="ch-autocomplete-option-group">
                          <div className="ch-autocomplete-option-group-title">
                            {opt.label}
                          </div>
                          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                            {opt.options.map((childOpt, childIdx) => {
                              const isSelected = currentValue === childOpt.value;
                              const isItemActive =
                                flatSelectableOptions[activeIndex]?.value ===
                                childOpt.value;

                              return (
                                <li
                                  key={childOpt.key ?? `child-${groupIdx}-${childIdx}`}
                                  className={[
                                    "ch-autocomplete-option",
                                    isSelected ? "ch-autocomplete-option--selected" : "",
                                    isItemActive ? "ch-autocomplete-option--active" : "",
                                    childOpt.disabled
                                      ? "ch-autocomplete-option--disabled"
                                      : "",
                                    resolvedClassNames["popup.listItem"],
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                  style={resolvedStyles["popup.listItem"]}
                                  onClick={() => handleSelectOption(childOpt)}
                                >
                                  {childOpt.label ?? childOpt.value}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }

                    const isSelected = currentValue === opt.value;
                    const isItemActive =
                      flatSelectableOptions[activeIndex]?.value === opt.value;

                    return (
                      <li
                        key={opt.key ?? `opt-${groupIdx}`}
                        className={[
                          "ch-autocomplete-option",
                          isSelected ? "ch-autocomplete-option--selected" : "",
                          isItemActive ? "ch-autocomplete-option--active" : "",
                          opt.disabled ? "ch-autocomplete-option--disabled" : "",
                          resolvedClassNames["popup.listItem"],
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={resolvedStyles["popup.listItem"]}
                        onClick={() => handleSelectOption(opt)}
                      >
                        {opt.label ?? opt.value}
                      </li>
                    );
                  })
                ) : notFoundContent ? (
                  <div className="ch-autocomplete-empty">{notFoundContent}</div>
                ) : null}
              </ul>
            )}
      </div>
    ) : null;

    const popupContainer =
      typeof window !== "undefined"
        ? getPopupContainer && triggerRef.current
          ? getPopupContainer(triggerRef.current)
          : document.body
        : null;

    // Render clear button
    const hasValue = Boolean(currentValue && currentValue.length > 0);
    const showClear = Boolean(allowClear && hasValue && !disabled);
    const customClearIcon =
      typeof allowClear === "object" && allowClear.clearIcon
        ? allowClear.clearIcon
        : <DefaultClearIcon />;

    // Render input or customized child element
    let inputElement: React.ReactNode;
    if (React.isValidElement(children)) {
      inputElement = React.cloneElement(children as React.ReactElement<any>, {
        ref: (node: any) => {
          inputRef.current = node;
          const childRef = (children as any).ref;
          if (typeof childRef === "function") {
            childRef(node);
          } else if (childRef) {
            childRef.current = node;
          }
        },
        value: currentValue,
        disabled,
        placeholder,
        className: [
          (children.props as any).className,
          "ch-autocomplete-input",
          resolvedClassNames.input,
        ]
          .filter(Boolean)
          .join(" "),
        style: {
          ...(children.props as any).style,
          ...resolvedStyles.input,
        },
        onChange: (e: any) => {
          (children.props as any).onChange?.(e);
          handleInputChange(e);
        },
        onFocus: (e: any) => {
          (children.props as any).onFocus?.(e);
          handleInputFocus(e);
        },
        onBlur: (e: any) => {
          (children.props as any).onBlur?.(e);
          handleInputBlur(e);
        },
        onKeyDown: (e: any) => {
          (children.props as any).onKeyDown?.(e);
          handleKeyDown(e);
        },
      });
    } else {
      inputElement = (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          className={["ch-autocomplete-input", resolvedClassNames.input]
            .filter(Boolean)
            .join(" ")}
          style={resolvedStyles.input}
          disabled={disabled}
          value={currentValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return (
      <div
        ref={triggerRef}
        className={rootClasses}
        style={{ ...resolvedStyles.root, ...style }}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.focus();
            if (!isDropdownOpen && (filteredOptions.length > 0 || notFoundContent)) {
              triggerOpenChange(true);
            }
          }
        }}
        {...restProps}
      >
        {prefix && (
          <span
            className={["ch-autocomplete-prefix", resolvedClassNames.prefix]
              .filter(Boolean)
              .join(" ")}
            style={resolvedStyles.prefix}
          >
            {prefix}
          </span>
        )}

        {inputElement}

        {showClear && (
          <span
            className={["ch-autocomplete-clear", resolvedClassNames.clear]
              .filter(Boolean)
              .join(" ")}
            style={resolvedStyles.clear}
            onClick={handleClear}
            role="button"
            aria-label="Clear AutoComplete input"
          >
            {customClearIcon}
          </span>
        )}

        {popupContainer &&
          dropdownNode &&
          createPortal(
            popupRender ? popupRender(dropdownNode) : dropdownNode,
            popupContainer
          )}
      </div>
    );
  }
);

AutoComplete.displayName = "AutoComplete";
