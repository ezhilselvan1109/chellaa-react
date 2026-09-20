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
import { selectCssText } from "./Select.style";
import type {
  SelectProps,
  SelectRef,
  BaseOptionType,
  RawValueType,
  LabeledValue,
  CustomTagProps,
} from "./Select.types";
import { Option, type OptionFC } from "./Option";
import { OptGroup, type OptGroupFC } from "./OptGroup";
import { LoadingOutlined } from "../../icons";


const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Default Down Arrow Icon */
const DownArrowIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="down"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    className={isOpen ? "ch-select-arrow-open" : ""}
    style={{ transition: "transform 0.2s" }}
  >
    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
  </svg>
);

/** Default Checkmark Icon */
const CheckIcon: React.FC = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="check"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
  </svg>
);

/** Default Clear Icon */
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

/** Default Tag Remove Icon */
const DefaultCloseIcon: React.FC = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="close"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

/** Helper to extract raw value */
const toRawValue = (val: any): RawValueType | undefined => {
  if (val === null || val === undefined) return undefined;
  if (typeof val === "object" && "value" in val) {
    return val.value;
  }
  return val;
};

/** Helper to lookup option safely */
const getOptionForRaw = (
  val: any,
  map: Map<RawValueType, BaseOptionType>
): BaseOptionType => {
  const raw = toRawValue(val);
  if (raw !== undefined) {
    const found = map.get(raw);
    if (found) return found;
    return { value: raw, label: raw };
  }
  return { value: "", label: "" };
};

export const InternalSelect = forwardRef<SelectRef, SelectProps>(
  (props, ref) => {
    const {
      allowClear = false,
      autoClearSearchValue = true,
      children,
      className = "",
      rootClassName = "",
      style,
      classNames,
      styles,
      defaultActiveFirstOption = true,
      defaultOpen = false,
      defaultValue,
      disabled = false,
      fieldNames,
      filterOption = true,
      filterSort,
      getPopupContainer,
      labelInValue = false,
      labelRender,
      listHeight = 256,
      loading = false,
      loadingIcon,
      maxCount,
      maxTagCount,
      maxTagPlaceholder,
      maxTagTextLength,
      menuItemSelectedIcon,
      mode,
      notFoundContent = "No data",
      open: controlledOpen,
      optionFilterProp = "value",
      options: optionsProp,
      optionRender,
      placeholder,
      placement = "bottomLeft",
      popupMatchSelectWidth = true,
      popupRender,
      prefix,
      removeIcon,
      searchValue: controlledSearchValue,
      showSearch,
      size = "medium",
      status,
      suffixIcon,
      tagRender,
      tokenSeparators,
      value: controlledValue,
      variant = "outlined",
      onActive,
      onBlur,
      onChange,
      onClear,
      onDeselect,
      onFocus,
      onInputKeyDown,
      onOpenChange,
      onPopupScroll,
      onSearch,
      onSelect,
      ...restProps
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-select", selectCssText);
    }

    const isMultiple = mode === "multiple";
    const isTags = mode === "tags";
    const isMultipleOrTags = isMultiple || isTags;

    const isSearchable =
      showSearch !== undefined
        ? Boolean(showSearch)
        : isMultipleOrTags;

    // Trigger & input refs
    const rootRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    // Parse options from `options` prop or JSX children
    const rawOptions = useMemo<BaseOptionType[]>(() => {
      if (optionsProp && Array.isArray(optionsProp)) {
        const labelKey = fieldNames?.label || "label";
        const valKey = fieldNames?.value || "value";
        const optKey = fieldNames?.options || "options";
        const grpKey = fieldNames?.groupLabel || "label";

        return optionsProp.map((item) => {
          if (item[optKey] && Array.isArray(item[optKey])) {
            return {
              ...item,
              label: item[grpKey] ?? item.label,
              options: item[optKey].map((child: any) => ({
                ...child,
                label: child[labelKey] ?? child.label ?? child[valKey],
                value: child[valKey] ?? child.value,
              })),
            };
          }
          return {
            ...item,
            label: item[labelKey] ?? item.label ?? item[valKey],
            value: item[valKey] ?? item.value,
          };
        });
      }

      // Parse from children
      const result: BaseOptionType[] = [];
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        const type = child.type as any;
        if (type?.isSelectOptGroup || type?.displayName === "OptGroup") {
          const groupProps = child.props as any;
          const childOptions: BaseOptionType[] = [];
          React.Children.forEach(groupProps.children, (optChild) => {
            if (React.isValidElement(optChild)) {
              const optProps = optChild.props as any;
              childOptions.push({
                ...optProps,
                label: optProps.children ?? optProps.label ?? optProps.value,
                value: optProps.value,
              });
            }
          });
          result.push({
            label: groupProps.label,
            options: childOptions,
          });
        } else if (type?.isSelectOption || type?.displayName === "Option") {
          const optProps = child.props as any;
          result.push({
            ...optProps,
            label: optProps.children ?? optProps.label ?? optProps.value,
            value: optProps.value,
          });
        }
      });
      return result;
    }, [optionsProp, children, fieldNames]);

    // Value state (controlled vs uncontrolled)
    const [uncontrolledValue, setUncontrolledValue] = useState<any>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return isMultipleOrTags ? [] : undefined;
    });
    const isControlledValue = controlledValue !== undefined;
    const currentValue = isControlledValue ? controlledValue : uncontrolledValue;

    // Normalizing selected array for multiple/tags or single
    const selectedValuesList = useMemo<any[]>(() => {
      if (currentValue === null || currentValue === undefined) return [];
      if (Array.isArray(currentValue)) return currentValue;
      return [currentValue];
    }, [currentValue]);

    const selectedRawValues = useMemo<RawValueType[]>(() => {
      return selectedValuesList.map(toRawValue).filter((v): v is RawValueType => v !== undefined);
    }, [selectedValuesList]);

    // Search query state
    const [uncontrolledSearchText, setUncontrolledSearchText] = useState<string>("");
    const isControlledSearch = controlledSearchValue !== undefined;
    const searchText = isControlledSearch ? controlledSearchValue : uncontrolledSearchText;

    // Open state
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = !disabled && (isControlledOpen ? controlledOpen : uncontrolledOpen);

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [popupCoords, setPopupCoords] = useState<{
      top: number;
      left: number;
      width?: number;
      minWidth?: number;
    }>({ top: 0, left: 0 });

    // Expose ref
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          if (isSearchable && inputRef.current) {
            inputRef.current.focus();
          } else {
            rootRef.current?.focus();
          }
        },
        blur: () => {
          inputRef.current?.blur();
          rootRef.current?.blur();
        },
        nativeElement: rootRef.current,
      }),
      [isSearchable]
    );

    // Map for fast label lookup
    const optionsValueMap = useMemo(() => {
      const map = new Map<RawValueType, BaseOptionType>();
      const collect = (opts: BaseOptionType[]) => {
        opts.forEach((opt) => {
          if (opt.options && Array.isArray(opt.options)) {
            collect(opt.options);
          } else if (opt.value !== undefined) {
            map.set(opt.value, opt);
          }
        });
      };
      collect(rawOptions);
      return map;
    }, [rawOptions]);

    // Filter options based on search query
    const filteredOptions = useMemo(() => {
      let list = [...rawOptions];

      // In tags mode, if the user entered a custom search text that doesn't exist, insert dynamic option
      if (
        isTags &&
        searchText.trim() !== "" &&
        !optionsValueMap.has(searchText.trim())
      ) {
        const customTagOpt: BaseOptionType = {
          label: searchText.trim(),
          value: searchText.trim(),
        };
        list = [customTagOpt, ...list];
      }

      if (!searchText.trim() || filterOption === false) {
        return list;
      }

      const query = searchText.trim().toLowerCase();
      const matchOpt = (opt: BaseOptionType): boolean => {
        if (typeof filterOption === "function") {
          return filterOption(query, opt);
        }

        const propsToCheck = Array.isArray(optionFilterProp)
          ? optionFilterProp
          : [optionFilterProp];

        return propsToCheck.some((prop) => {
          const val = opt[prop] ?? (prop === "label" ? opt.label : opt.value);
          if (typeof val === "string" || typeof val === "number") {
            return String(val).toLowerCase().includes(query);
          }
          return false;
        });
      };

      const result: BaseOptionType[] = [];
      list.forEach((item) => {
        if (item.options && Array.isArray(item.options)) {
          const filteredChildren = item.options.filter(matchOpt);
          if (filteredChildren.length > 0) {
            result.push({
              ...item,
              options: filteredChildren,
            });
          }
        } else {
          if (matchOpt(item)) {
            result.push(item);
          }
        }
      });

      if (filterSort) {
        return result.sort((a, b) => filterSort(a, b, { searchValue: searchText }));
      }

      return result;
    }, [
      rawOptions,
      isTags,
      searchText,
      optionsValueMap,
      filterOption,
      optionFilterProp,
      filterSort,
    ]);

    // Flatten selectable options for keyboard navigation
    const flatSelectableOptions = useMemo<BaseOptionType[]>(() => {
      const items: BaseOptionType[] = [];
      const flatten = (opts: BaseOptionType[]) => {
        opts.forEach((opt) => {
          if (opt.options && Array.isArray(opt.options)) {
            flatten(opt.options);
          } else if (opt.value !== undefined) {
            const isSelected = selectedRawValues.includes(opt.value);
            const isExceededMax =
              maxCount !== undefined &&
              !isSelected &&
              selectedRawValues.length >= maxCount;
            items.push({
              ...opt,
              disabled: opt.disabled || isExceededMax,
            });
          }
        });
      };
      flatten(filteredOptions);
      return items;
    }, [filteredOptions, selectedRawValues, maxCount]);

    // Active item index management
    useEffect(() => {
      if (defaultActiveFirstOption && flatSelectableOptions.length > 0) {
        const firstEnabled = flatSelectableOptions.findIndex((o) => !o.disabled);
        setActiveIndex(firstEnabled >= 0 ? firstEnabled : 0);
      } else {
        setActiveIndex(-1);
      }
    }, [flatSelectableOptions, defaultActiveFirstOption]);

    // Update popup position
    const updatePosition = useCallback(() => {
      if (!rootRef.current || typeof window === "undefined") return;
      const rect = rootRef.current.getBoundingClientRect();

      let targetWidth: number | undefined;
      let minWidth: number | undefined;

      if (popupMatchSelectWidth === true) {
        targetWidth = rect.width;
      } else if (typeof popupMatchSelectWidth === "number") {
        targetWidth = popupMatchSelectWidth;
      } else {
        minWidth = rect.width;
      }

      let top = rect.bottom + window.scrollY + 4;
      let left = rect.left + window.scrollX;

      if (placement === "topLeft" || placement === "topRight") {
        const popupHeight = popupRef.current?.offsetHeight || 256;
        top = rect.top + window.scrollY - popupHeight - 4;
      }

      if (placement === "bottomRight" || placement === "topRight") {
        const w = targetWidth || popupRef.current?.offsetWidth || rect.width;
        left = rect.right + window.scrollX - w;
      }

      setPopupCoords({
        top: Math.max(0, top),
        left: Math.max(0, left),
        width: targetWidth,
        minWidth,
      });
    }, [popupMatchSelectWidth, placement]);

    useIsomorphicLayoutEffect(() => {
      if (isOpen) {
        updatePosition();
      }
    }, [isOpen, updatePosition]);

    // Dropdown toggle helper
    const setOpen = useCallback(
      (nextOpen: boolean) => {
        if (disabled) return;
        if (!isControlledOpen) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
        if (nextOpen) {
          updatePosition();
        }
      },
      [disabled, isControlledOpen, onOpenChange, updatePosition]
    );

    // Outside click & window listeners
    useEffect(() => {
      if (!isOpen || typeof window === "undefined") return;

      const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          rootRef.current?.contains(target) ||
          popupRef.current?.contains(target)
        ) {
          return;
        }
        setOpen(false);
      };

      const handleScrollResize = () => {
        updatePosition();
      };

      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("resize", handleScrollResize);
      window.addEventListener("scroll", handleScrollResize, true);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        window.removeEventListener("resize", handleScrollResize);
        window.removeEventListener("scroll", handleScrollResize, true);
      };
    }, [isOpen, setOpen, updatePosition]);

    // Format value according to labelInValue
    const formatOutValue = useCallback(
      (val: RawValueType, opt?: BaseOptionType) => {
        if (!labelInValue) return val;
        const matching = opt || optionsValueMap.get(val);
        return {
          value: val,
          label: matching?.label ?? String(val),
          key: matching?.key ?? String(val),
        };
      },
      [labelInValue, optionsValueMap]
    );

    // Handle Option Select
    const handleSelectOption = useCallback(
      (opt: BaseOptionType) => {
        if (opt.disabled) return;
        const optVal = opt.value;
        if (optVal === undefined) return;

        if (isMultipleOrTags) {
          const isAlreadySelected = selectedRawValues.includes(optVal);
          if (isAlreadySelected) {
            // Deselect
            const updated = selectedValuesList.filter(
              (item) => toRawValue(item) !== optVal
            );
            if (!isControlledValue) setUncontrolledValue(updated);
            onChange?.(
              updated,
              updated.map((v) => getOptionForRaw(v, optionsValueMap))
            );
            onDeselect?.(labelInValue ? formatOutValue(optVal, opt) : optVal);
          } else {
            if (maxCount !== undefined && selectedRawValues.length >= maxCount) {
              return;
            }
            const outItem = formatOutValue(optVal, opt);
            const updated = [...selectedValuesList, outItem];
            if (!isControlledValue) setUncontrolledValue(updated);
            onChange?.(
              updated,
              updated.map((v) => getOptionForRaw(v, optionsValueMap))
            );
            onSelect?.(outItem, opt);
          }

          if (autoClearSearchValue) {
            if (!isControlledSearch) setUncontrolledSearchText("");
            onSearch?.("");
          }
        } else {
          // Single select
          const outItem = formatOutValue(optVal, opt);
          if (!isControlledValue) setUncontrolledValue(outItem);
          onChange?.(outItem, opt);
          onSelect?.(outItem, opt);
          setOpen(false);

          if (!isControlledSearch) setUncontrolledSearchText("");
          onSearch?.("");
        }
      },
      [
        isMultipleOrTags,
        selectedRawValues,
        selectedValuesList,
        isControlledValue,
        onChange,
        onDeselect,
        formatOutValue,
        maxCount,
        onSelect,
        autoClearSearchValue,
        isControlledSearch,
        onSearch,
        setOpen,
        optionsValueMap,
        labelInValue,
      ]
    );

    // Remove single tag in multiple/tags mode
    const handleRemoveTag = useCallback(
      (e: React.MouseEvent, val: any) => {
        e.stopPropagation();
        if (disabled) return;
        const raw = toRawValue(val);
        const updated = selectedValuesList.filter(
          (item) => toRawValue(item) !== raw
        );
        if (!isControlledValue) setUncontrolledValue(updated);
        onChange?.(
          updated,
          updated.map((v) => getOptionForRaw(v, optionsValueMap))
        );
        onDeselect?.(val);
      },
      [
        disabled,
        selectedValuesList,
        isControlledValue,
        onChange,
        optionsValueMap,
        onDeselect,
      ]
    );

    // Clear all values
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        const emptyVal = isMultipleOrTags ? [] : undefined;
        if (!isControlledValue) setUncontrolledValue(emptyVal);
        onChange?.(emptyVal, isMultipleOrTags ? [] : (undefined as any));
        if (!isControlledSearch) setUncontrolledSearchText("");
        onSearch?.("");
        onClear?.();
      },
      [
        disabled,
        isMultipleOrTags,
        isControlledValue,
        onChange,
        isControlledSearch,
        onSearch,
        onClear,
      ]
    );

    // Handle tokenization split
    const tokenize = useCallback(
      (input: string): string[] => {
        if (!tokenSeparators) return [input];
        if (typeof tokenSeparators === "function") {
          return tokenSeparators(input);
        }
        const regex = new RegExp(`[${tokenSeparators.map((s) => `\\${s}`).join("")}]`);
        return input.split(regex).map((s) => s.trim()).filter(Boolean);
      },
      [tokenSeparators]
    );

    // Handle search input typing
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextVal = e.target.value;

        // Check token separators
        if (isMultipleOrTags && tokenSeparators) {
          const tokens = tokenize(nextVal);
          if (tokens.length > 1 || (tokens.length === 1 && nextVal !== tokens[0])) {
            // Tokenization triggered
            let newItems = [...selectedValuesList];
            tokens.forEach((tok) => {
              if (!selectedRawValues.includes(tok)) {
                if (maxCount !== undefined && newItems.length >= maxCount) return;
                const opt = optionsValueMap.get(tok) || { label: tok, value: tok };
                const outItem = formatOutValue(tok, opt);
                newItems.push(outItem);
                onSelect?.(outItem, opt);
              }
            });
            if (!isControlledValue) setUncontrolledValue(newItems);
            onChange?.(
              newItems,
              newItems.map((v) => getOptionForRaw(v, optionsValueMap))
            );
            if (!isControlledSearch) setUncontrolledSearchText("");
            onSearch?.("");
            return;
          }
        }

        if (!isControlledSearch) setUncontrolledSearchText(nextVal);
        onSearch?.(nextVal);
        if (!isOpen) {
          setOpen(true);
        }
      },
      [
        isMultipleOrTags,
        tokenSeparators,
        tokenize,
        selectedValuesList,
        selectedRawValues,
        maxCount,
        optionsValueMap,
        formatOutValue,
        onSelect,
        isControlledValue,
        onChange,
        isControlledSearch,
        onSearch,
        isOpen,
        setOpen,
      ]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        onInputKeyDown?.(e);

        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!isOpen) {
            setOpen(true);
            return;
          }
          if (flatSelectableOptions.length === 0) return;
          let next = activeIndex + 1;
          while (next < flatSelectableOptions.length && flatSelectableOptions[next]?.disabled) {
            next++;
          }
          if (next < flatSelectableOptions.length) {
            const opt = flatSelectableOptions[next];
            if (opt && opt.value !== undefined) {
              setActiveIndex(next);
              onActive?.(opt.value);
            }
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (!isOpen) {
            setOpen(true);
            return;
          }
          if (flatSelectableOptions.length === 0) return;
          let prev = activeIndex - 1;
          while (prev >= 0 && flatSelectableOptions[prev]?.disabled) {
            prev--;
          }
          if (prev >= 0) {
            const opt = flatSelectableOptions[prev];
            if (opt && opt.value !== undefined) {
              setActiveIndex(prev);
              onActive?.(opt.value);
            }
          }
        } else if (e.key === "Enter") {
          if (isOpen && activeIndex >= 0 && activeIndex < flatSelectableOptions.length) {
            const opt = flatSelectableOptions[activeIndex];
            if (opt) {
              e.preventDefault();
              handleSelectOption(opt);
            }
          } else if (isTags && searchText.trim() !== "") {
            e.preventDefault();
            // Enter creates tag
            const tagVal = searchText.trim();
            const opt: BaseOptionType = { label: tagVal, value: tagVal };
            handleSelectOption(opt);
          }
        } else if (e.key === "Escape") {
          if (isOpen) {
            e.preventDefault();
            setOpen(false);
          }
        } else if (
          e.key === "Backspace" &&
          isMultipleOrTags &&
          searchText === "" &&
          selectedValuesList.length > 0
        ) {
          // Remove last tag
          const lastItem = selectedValuesList[selectedValuesList.length - 1];
          const updated = selectedValuesList.slice(0, -1);
          if (!isControlledValue) setUncontrolledValue(updated);
          onChange?.(
            updated,
            updated.map((v) => getOptionForRaw(v, optionsValueMap))
          );
          onDeselect?.(lastItem);
        }
      },
      [
        onInputKeyDown,
        isOpen,
        flatSelectableOptions,
        activeIndex,
        setOpen,
        onActive,
        handleSelectOption,
        isTags,
        searchText,
        isMultipleOrTags,
        selectedValuesList,
        isControlledValue,
        onChange,
        optionsValueMap,
        onDeselect,
      ]
    );

    // Focus & blur
    const handleRootClick = () => {
      if (disabled) return;
      if (isSearchable && inputRef.current) {
        inputRef.current.focus();
      }
      setOpen(!isOpen);
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Semantic classes and styles resolution
    const resolvedClassNames = useMemo(() => {
      if (!classNames) return {};
      if (typeof classNames === "function") {
        return classNames({ props });
      }
      return classNames;
    }, [classNames, props]);

    const resolvedStyles = useMemo(() => {
      if (!styles) return {};
      if (typeof styles === "function") {
        return styles({ props });
      }
      return styles;
    }, [styles, props]);

    const hasValue = selectedValuesList.length > 0;

    // Single label content display
    const singleSelectedLabel = useMemo(() => {
      if (isMultipleOrTags || !hasValue || selectedRawValues.length === 0) return null;
      const raw = selectedRawValues[0];
      if (raw === undefined) return null;
      const matching = optionsValueMap.get(raw);
      const labeledVal: LabeledValue = {
        value: raw,
        label: matching?.label ?? String(raw),
        key: matching?.key,
      };

      if (labelRender) {
        return labelRender(labeledVal);
      }
      return labeledVal.label;
    }, [isMultipleOrTags, hasValue, selectedRawValues, optionsValueMap, labelRender]);

    // Tag list rendering for multiple / tags
    const renderedTags = useMemo(() => {
      if (!isMultipleOrTags) return null;

      let displayList = selectedValuesList;
      let omittedCount = 0;

      if (typeof maxTagCount === "number" && maxTagCount >= 0) {
        if (selectedValuesList.length > maxTagCount) {
          displayList = selectedValuesList.slice(0, maxTagCount);
          omittedCount = selectedValuesList.length - maxTagCount;
        }
      }

      const tagElements = displayList.map((item, index) => {
        const raw = toRawValue(item);
        if (raw === undefined) return null;
        const matching = optionsValueMap.get(raw);
        let labelContent: React.ReactNode = matching?.label ?? (typeof item === "object" && item.label ? item.label : String(raw));

        if (labelRender) {
          labelContent = labelRender({
            value: raw,
            label: labelContent,
            key: matching?.key,
          });
        }

        if (
          maxTagTextLength !== undefined &&
          typeof labelContent === "string" &&
          labelContent.length > maxTagTextLength
        ) {
          labelContent = `${labelContent.slice(0, maxTagTextLength)}...`;
        }

        const tagProps: CustomTagProps = {
          label: labelContent,
          value: item,
          disabled: Boolean(disabled || matching?.disabled),
          closable: !disabled && !matching?.disabled,
          onClose: (e) => handleRemoveTag(e || ({} as any), item),
        };

        if (tagRender) {
          return (
            <span key={`${raw}-${index}`} style={{ display: "inline-flex" }}>
              {tagRender(tagProps)}
            </span>
          );
        }

        return (
          <span
            key={`${raw}-${index}`}
            className="ch-select-tag"
            style={resolvedStyles["content"]}
          >
            <span className="ch-select-tag-content">{labelContent}</span>
            {tagProps.closable && (
              <span
                className="ch-select-tag-remove"
                onClick={(e) => handleRemoveTag(e, item)}
              >
                {removeIcon || <DefaultCloseIcon />}
              </span>
            )}
          </span>
        );
      });

      // Render maxTagPlaceholder
      if (omittedCount > 0) {
        const omittedItems = selectedValuesList.slice(maxTagCount as number);
        let placeholderNode: React.ReactNode = `+ ${omittedCount}...`;
        if (typeof maxTagPlaceholder === "function") {
          placeholderNode = maxTagPlaceholder(omittedItems);
        } else if (maxTagPlaceholder) {
          placeholderNode = maxTagPlaceholder;
        }

        tagElements.push(
          <span key="ch-max-tag-placeholder" className="ch-select-tag">
            <span className="ch-select-tag-content">{placeholderNode}</span>
          </span>
        );
      }

      return tagElements;
    }, [
      isMultipleOrTags,
      selectedValuesList,
      maxTagCount,
      optionsValueMap,
      labelRender,
      maxTagTextLength,
      disabled,
      handleRemoveTag,
      tagRender,
      resolvedStyles,
      removeIcon,
      maxTagPlaceholder,
    ]);

    // Dropdown render
    const dropdownList = useMemo(() => {
      if (filteredOptions.length === 0) {
        return (
          <div className="ch-select-empty" style={resolvedStyles["popup.list"]}>
            {notFoundContent}
          </div>
        );
      }

      let optionIndexTracker = 0;

      const renderOptionItem = (opt: BaseOptionType) => {
        const optVal = opt.value;
        const isSelected = optVal !== undefined && selectedRawValues.includes(optVal);
        const currentIndex = optionIndexTracker++;
        const isActive = activeIndex === currentIndex;
        const isExceededMax =
          maxCount !== undefined &&
          !isSelected &&
          selectedRawValues.length >= maxCount;
        const isDisabled = Boolean(opt.disabled || isExceededMax);

        let contentNode: React.ReactNode = opt.label ?? String(optVal);
        if (optionRender) {
          contentNode = optionRender(opt, { index: currentIndex });
        }

        return (
          <li
            key={opt.key || String(optVal)}
            className={[
              "ch-select-item-option",
              isActive ? "ch-select-item-option-active" : "",
              isSelected ? "ch-select-item-option-selected" : "",
              isDisabled ? "ch-select-item-option-disabled" : "",
              opt.className || "",
              resolvedClassNames["popup.listItem"] || "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ ...opt.style, ...resolvedStyles["popup.listItem"] }}
            title={opt.title}
            onMouseEnter={() => {
              if (!isDisabled) setActiveIndex(currentIndex);
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled) handleSelectOption(opt);
            }}
          >
            <span className="ch-select-item-option-content">{contentNode}</span>
            {isSelected && (
              <span className="ch-select-item-option-state">
                {menuItemSelectedIcon || <CheckIcon />}
              </span>
            )}
          </li>
        );
      };

      return (
        <ul
          className={[
            "ch-select-dropdown-list",
            resolvedClassNames["popup.list"] || "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ maxHeight: listHeight, ...resolvedStyles["popup.list"] }}
          onScroll={(e) => onPopupScroll?.(e)}
        >
          {filteredOptions.map((item, idx) => {
            if (item.options && Array.isArray(item.options)) {
              return (
                <div key={item.key || `group-${idx}`} className="ch-select-item-group-wrapper">
                  <div className="ch-select-item-group">{item.label}</div>
                  {item.options.map(renderOptionItem)}
                </div>
              );
            }
            return renderOptionItem(item);
          })}
        </ul>
      );
    }, [
      filteredOptions,
      resolvedStyles,
      notFoundContent,
      listHeight,
      onPopupScroll,
      resolvedClassNames,
      selectedRawValues,
      activeIndex,
      maxCount,
      optionRender,
      handleSelectOption,
      menuItemSelectedIcon,
    ]);

    const dropdownPortal = useMemo(() => {
      if (!isOpen || typeof document === "undefined") return null;

      let dropdownContent = (
        <div
          ref={popupRef}
          className={[
            "ch-select-dropdown",
            resolvedClassNames["popup.root"] || "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            top: popupCoords.top,
            left: popupCoords.left,
            width: popupCoords.width,
            minWidth: popupCoords.minWidth,
            ...resolvedStyles["popup.root"],
          }}
          onMouseDown={(e) => {
            // Prevent blur of input on dropdown click
            e.preventDefault();
          }}
        >
          {dropdownList}
        </div>
      );

      if (popupRender) {
        dropdownContent = (
          <div
            ref={popupRef}
            className={[
              "ch-select-dropdown",
              resolvedClassNames["popup.root"] || "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              top: popupCoords.top,
              left: popupCoords.left,
              width: popupCoords.width,
              minWidth: popupCoords.minWidth,
              ...resolvedStyles["popup.root"],
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {popupRender(dropdownList)}
          </div>
        );
      }

      const container = getPopupContainer
        ? getPopupContainer(rootRef.current!)
        : document.body;

      return createPortal(dropdownContent, container);
    }, [
      isOpen,
      resolvedClassNames,
      popupCoords,
      resolvedStyles,
      dropdownList,
      popupRender,
      getPopupContainer,
    ]);

    // Size class
    const sizeClass =
      size === "large"
        ? "ch-select-lg"
        : size === "small"
        ? "ch-select-sm"
        : "ch-select-md";

    // Variant class
    const variantClass = `ch-select-${variant}`;

    // Status class
    const statusClass = status ? `ch-select-status-${status}` : "";

    const isShowPlaceholder = !hasValue && (!isSearchable || !searchText);

    return (
      <>
        <div
          ref={rootRef}
          className={[
            "ch-select",
            sizeClass,
            variantClass,
            statusClass,
            isMultipleOrTags ? "ch-select-multiple" : "ch-select-single",
            isOpen ? "ch-select-open" : "",
            isFocused ? "ch-select-focused" : "",
            disabled ? "ch-select-disabled" : "",
            hasValue ? "ch-select-has-value" : "",
            allowClear ? "ch-select-allow-clear" : "",
            className,
            rootClassName,
            resolvedClassNames["root"] || "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ ...style, ...resolvedStyles["root"] }}
          onClick={handleRootClick}
          tabIndex={disabled ? -1 : 0}
          {...restProps}
        >
          {/* Prefix */}
          {prefix && (
            <span
              className={[
                "ch-select-prefix",
                resolvedClassNames["prefix"] || "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={resolvedStyles["prefix"]}
            >
              {prefix}
            </span>
          )}

          {/* Selector content */}
          <div
            className={[
              "ch-select-selector",
              resolvedClassNames["content"] || "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={resolvedStyles["content"]}
          >
            {/* Multiple / Tags items */}
            {isMultipleOrTags && renderedTags}

            {/* Single value display */}
            {!isMultipleOrTags && hasValue && (!isSearchable || !isOpen) && (
              <span className="ch-select-selection-item">
                {singleSelectedLabel}
              </span>
            )}

            {/* Search Input */}
            {isSearchable ? (
              <span
                className={[
                  "ch-select-selection-search",
                  resolvedClassNames["input"] || "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  ref={inputRef}
                  type="search"
                  autoComplete="off"
                  className="ch-select-selection-search-input"
                  disabled={disabled}
                  value={searchText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  style={resolvedStyles["input"]}
                />
              </span>
            ) : null}

            {/* Placeholder */}
            {isShowPlaceholder && placeholder && (
              <span
                className={[
                  "ch-select-selection-placeholder",
                  resolvedClassNames["placeholder"] || "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={resolvedStyles["placeholder"]}
              >
                {placeholder}
              </span>
            )}
          </div>

          {/* Suffix / Arrow / Clear */}
          <span
            className={[
              "ch-select-suffix",
              resolvedClassNames["suffix"] || "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={resolvedStyles["suffix"]}
          >
            {loading ? (
              loadingIcon || (
                <span className="ch-select-arrow ch-select-arrow--loading">
                  <LoadingOutlined spin />
                </span>
              )
            ) : (
              <span className="ch-select-arrow">
                {suffixIcon || <DownArrowIcon isOpen={isOpen} />}
              </span>
            )}

            {allowClear && hasValue && !disabled && (
              <span
                className={[
                  "ch-select-clear",
                  resolvedClassNames["clear"] || "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={resolvedStyles["clear"]}
                onClick={handleClear}
                title="Clear"
              >
                {typeof allowClear === "object" && allowClear.clearIcon ? (
                  allowClear.clearIcon
                ) : (
                  <DefaultClearIcon />
                )}
              </span>
            )}
          </span>
        </div>

        {/* Dropdown Portal */}
        {dropdownPortal}
      </>
    );
  }
);

InternalSelect.displayName = "Select";

export interface CompoundedSelect
  extends React.ForwardRefExoticComponent<
    SelectProps & React.RefAttributes<SelectRef>
  > {
  Option: OptionFC;
  OptGroup: OptGroupFC;
}

export const Select = InternalSelect as CompoundedSelect;
Select.Option = Option;
Select.OptGroup = OptGroup;
