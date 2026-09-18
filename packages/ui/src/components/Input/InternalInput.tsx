import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { inputCssText } from "./Input.style";
import type {
  InputProps,
  InputRef,
  InputSemanticDOM,
} from "./Input.types";

export const InternalInput = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    size = "medium",
    status,
    invalid = false,
    variant = "outlined",
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    allowClear = false,
    onClear,
    count,
    showCount = false,
    onPressEnter,
    rootClassName,
    className = "",
    style,
    disabled = false,
    value: controlledValue,
    defaultValue = "",
    onChange,
    onKeyDown,
    classNames,
    styles,
    maxLength,
    type = "text",
    ...restProps
  } = props;

  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
    injectStyle("ch-input", inputCssText);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue !== undefined ? String(defaultValue) : ""
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? String(controlledValue) : uncontrolledValue;

  // Imperative handle
  useImperativeHandle(ref, () => ({
    focus: (option) => {
      const el = inputRef.current;
      if (!el) return;
      el.focus({ preventScroll: option?.preventScroll });
      if (option?.cursor === "start") {
        el.setSelectionRange(0, 0);
      } else if (option?.cursor === "end") {
        el.setSelectionRange(el.value.length, el.value.length);
      } else if (option?.cursor === "all") {
        el.select();
      }
    },
    blur: () => {
      inputRef.current?.blur();
    },
    get nativeElement() {
      return inputRef.current;
    },
  }));

  // Size mapping
  const normalizedSize: string =
    size === "lg" || size === "large"
      ? "lg"
      : size === "sm" || size === "small"
      ? "sm"
      : "md";

  // Status mapping
  const effectiveStatus = status || (invalid ? "error" : undefined);

  // Semantic DOM
  const resolvedClassNames: Partial<Record<InputSemanticDOM, string>> =
    typeof classNames === "function" ? classNames({ props }) : classNames || {};
  const resolvedStyles: Partial<Record<InputSemanticDOM, React.CSSProperties>> =
    typeof styles === "function" ? styles({ props }) : styles || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let nextValue = e.target.value;

    if (count?.exceedFormatter && count?.max && nextValue.length > count.max) {
      nextValue = count.exceedFormatter(nextValue, { max: count.max });
    }

    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onPressEnter) {
      onPressEnter(e);
    }
    onKeyDown?.(e);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) {
      setUncontrolledValue("");
    }
    onClear?.();

    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, "");
      const ev = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(ev);
      inputRef.current.focus();
    }
  };

  // Character counting logic
  const currentCount = count?.strategy
    ? count.strategy(currentValue)
    : currentValue.length;
  const maxLimit = count?.max ?? maxLength;
  const isExceeded = maxLimit !== undefined && currentCount > maxLimit;

  let renderedCountText: React.ReactNode = null;
  if (count?.show || showCount) {
    if (typeof showCount === "object" && showCount.formatter) {
      renderedCountText = showCount.formatter({
        value: currentValue,
        count: currentCount,
        maxLength: maxLimit,
      });
    } else if (typeof count?.show === "function") {
      renderedCountText = count.show({
        value: currentValue,
        count: currentCount,
        maxLength: maxLimit,
      });
    } else if (maxLimit !== undefined) {
      renderedCountText = `${currentCount} / ${maxLimit}`;
    } else {
      renderedCountText = `${currentCount}`;
    }
  }

  // Clear icon element
  const clearDisabled =
    typeof allowClear === "object" ? allowClear.disabled : false;
  const clearIcon =
    typeof allowClear === "object" && allowClear.clearIcon ? (
      allowClear.clearIcon
    ) : (
      <span>✕</span>
    );
  const showClear = Boolean(allowClear && currentValue && !disabled && !clearDisabled);

  // Check if affix wrapper is required
  const hasAffix = Boolean(
    prefix || suffix || showClear || renderedCountText
  );

  const sharedClasses = [
    `ch-input--${normalizedSize}`,
    `ch-input--variant-${variant}`,
    effectiveStatus && `ch-input--status-${effectiveStatus}`,
    disabled && "ch-input--disabled",
  ]
    .filter(Boolean)
    .join(" ");

  let contentNode: React.ReactNode;

  if (hasAffix) {
    const affixWrapperClasses = [
      "ch-input-affix-wrapper",
      `ch-input-affix-wrapper--${normalizedSize}`,
      `ch-input-affix-wrapper--variant-${variant}`,
      effectiveStatus && `ch-input-affix-wrapper--status-${effectiveStatus}`,
      disabled && "ch-input-affix-wrapper--disabled",
      rootClassName,
      className,
      resolvedClassNames.root,
    ]
      .filter(Boolean)
      .join(" ");

    contentNode = (
      <span
        className={affixWrapperClasses}
        style={{ ...style, ...resolvedStyles.root }}
      >
        {prefix && (
          <span
            className={`ch-input-prefix ${resolvedClassNames.prefix || ""}`}
            style={resolvedStyles.prefix}
          >
            {prefix}
          </span>
        )}
        <input
          {...restProps}
          ref={inputRef}
          type={type}
          disabled={disabled}
          maxLength={count?.max !== undefined ? undefined : maxLength}
          value={currentValue}
          className={`ch-input-inner ${resolvedClassNames.input || ""}`}
          style={resolvedStyles.input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {showClear && (
          <span
            className={`ch-input-clear-icon ${resolvedClassNames.clear || ""}`}
            style={resolvedStyles.clear}
            onClick={handleClear}
          >
            {clearIcon}
          </span>
        )}
        {suffix && (
          <span
            className={`ch-input-suffix ${resolvedClassNames.suffix || ""}`}
            style={resolvedStyles.suffix}
          >
            {suffix}
          </span>
        )}
        {renderedCountText && (
          <span
            className={`ch-input-count ${
              isExceeded ? "ch-input-count--exceeded" : ""
            } ${resolvedClassNames.count || ""}`}
            style={resolvedStyles.count}
          >
            {renderedCountText}
          </span>
        )}
      </span>
    );
  } else {
    const inputClasses = [
      "ch-input",
      sharedClasses,
      rootClassName,
      className,
      resolvedClassNames.root,
      resolvedClassNames.input,
    ]
      .filter(Boolean)
      .join(" ");

    contentNode = (
      <input
        {...restProps}
        ref={inputRef}
        type={type}
        disabled={disabled}
        maxLength={count?.max !== undefined ? undefined : maxLength}
        value={currentValue}
        className={inputClasses}
        style={{ ...style, ...resolvedStyles.root, ...resolvedStyles.input }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }

  // Handle addonBefore / addonAfter
  if (addonBefore || addonAfter) {
    return (
      <span className="ch-input-group-wrapper">
        <span className="ch-input-wrapper">
          {addonBefore && (
            <span className="ch-input-group-addon">{addonBefore}</span>
          )}
          {contentNode}
          {addonAfter && (
            <span className="ch-input-group-addon">{addonAfter}</span>
          )}
        </span>
      </span>
    );
  }

  return contentNode;
});

InternalInput.displayName = "Input";
