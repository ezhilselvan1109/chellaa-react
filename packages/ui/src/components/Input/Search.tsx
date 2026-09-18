import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { InternalInput } from "./InternalInput";
import type {
  SearchProps,
  InputRef,
} from "./Input.types";

const defaultSearchIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const loadingSpinner = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ animation: "spin 1s linear infinite" }}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const Search = forwardRef<InputRef, SearchProps>((props, ref) => {
  const {
    enterButton = false,
    loading = false,
    onSearch,
    searchIcon = defaultSearchIcon,
    suffix,
    onPressEnter,
    onClear,
    rootClassName,
    className = "",
    classNames,
    styles,
    size = "medium",
    disabled,
    ...restProps
  } = props;

  const inputRef = useRef<InputRef>(null);

  useImperativeHandle(ref, () => ({
    focus: (opt) => inputRef.current?.focus(opt),
    blur: () => inputRef.current?.blur(),
    get nativeElement() {
      return inputRef.current?.nativeElement || null;
    },
  }));

  const handleSearch = (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    source: "input" | "clear" = "input"
  ) => {
    if (disabled || loading) return;
    const value = inputRef.current?.nativeElement?.value || "";
    onSearch?.(value, e, { source });
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleSearch(e, "input");
    onPressEnter?.(e);
  };

  const handleClear = () => {
    handleSearch(undefined, "clear");
    onClear?.();
  };

  const isEnterButton = Boolean(enterButton);
  let customSuffix = suffix;
  let addonAfterNode: React.ReactNode = undefined;

  if (isEnterButton) {
    const isPrimary = enterButton === true;
    const buttonText =
      typeof enterButton === "boolean" ? searchIcon : enterButton;

    addonAfterNode = (
      <button
        type="button"
        disabled={disabled || loading}
        className={`ch-input-search-button ${
          isPrimary ? "ch-input-search-button--primary" : ""
        }`}
        onClick={(e) => handleSearch(e, "input")}
      >
        {loading ? loadingSpinner : buttonText}
      </button>
    );
  } else {
    customSuffix = (
      <>
        {suffix}
        <span
          style={{ cursor: disabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center" }}
          onClick={(e) => handleSearch(e, "input")}
        >
          {loading ? loadingSpinner : searchIcon}
        </span>
      </>
    );
  }

  const searchClasses = ["ch-input-search", rootClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <InternalInput
      {...restProps}
      ref={inputRef}
      size={size}
      disabled={disabled}
      className={searchClasses}
      suffix={customSuffix}
      addonAfter={addonAfterNode}
      onPressEnter={handlePressEnter}
      onClear={handleClear}
    />
  );
});

Search.displayName = "Input.Search";
