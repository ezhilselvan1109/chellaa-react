import React, {
  forwardRef,
  useRef,
  useState,
  useLayoutEffect,
  useImperativeHandle,
  useCallback,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { inputCssText } from "./Input.style";
import type {
  TextAreaProps,
  TextAreaRef,
  TextAreaSemanticDOM,
} from "./Input.types";

export const TextArea = forwardRef<TextAreaRef, TextAreaProps>((props, ref) => {
  const {
    size = "medium",
    status,
    invalid = false,
    variant = "outlined",
    autoSize = false,
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
    rows = 4,
    ...restProps
  } = props;

  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
    injectStyle("ch-input", inputCssText);
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue !== undefined ? String(defaultValue) : ""
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? String(controlledValue) : uncontrolledValue;

  // Imperative handle
  useImperativeHandle(ref, () => ({
    focus: (option) => {
      const el = textareaRef.current;
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
      textareaRef.current?.blur();
    },
    get nativeElement() {
      return textareaRef.current;
    },
    resizableTextArea: {
      get textArea() {
        return textareaRef.current;
      },
    },
  }));

  // AutoSize height calculation
  const adjustHeight = useCallback(() => {
    if (!autoSize || !textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = "auto";

    const computed = window.getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight) || 22;
    const paddingTop = parseFloat(computed.paddingTop) || 5;
    const paddingBottom = parseFloat(computed.paddingBottom) || 5;
    const borderTop = parseFloat(computed.borderTopWidth) || 1;
    const borderBottom = parseFloat(computed.borderBottomWidth) || 1;
    const paddingTotal = paddingTop + paddingBottom + borderTop + borderBottom;

    let targetHeight = el.scrollHeight;

    if (typeof autoSize === "object") {
      const minRows = autoSize.minRows || 1;
      const maxRows = autoSize.maxRows;
      const minHeight = minRows * lineHeight + paddingTotal;
      targetHeight = Math.max(targetHeight, minHeight);
      if (maxRows) {
        const maxHeight = maxRows * lineHeight + paddingTotal;
        targetHeight = Math.min(targetHeight, maxHeight);
      }
    }

    el.style.height = `${targetHeight}px`;
  }, [autoSize]);

  useLayoutEffect(() => {
    adjustHeight();
  }, [currentValue, adjustHeight]);

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
  const resolvedClassNames: Partial<Record<TextAreaSemanticDOM, string>> =
    typeof classNames === "function" ? classNames({ props }) : classNames || {};
  const resolvedStyles: Partial<Record<TextAreaSemanticDOM, React.CSSProperties>> =
    typeof styles === "function" ? styles({ props }) : styles || {};

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let nextValue = e.target.value;

    if (count?.exceedFormatter && count?.max && nextValue.length > count.max) {
      nextValue = count.exceedFormatter(nextValue, { max: count.max });
    }

    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

    // Trigger synthetic change event
    if (textareaRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(textareaRef.current, "");
      const ev = new Event("input", { bubbles: true });
      textareaRef.current.dispatchEvent(ev);
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

  const wrapperClasses = [
    "ch-input-textarea-wrapper",
    rootClassName,
    className,
    resolvedClassNames.root,
  ]
    .filter(Boolean)
    .join(" ");

  const textareaClasses = [
    "ch-input-textarea",
    `ch-input-textarea--${normalizedSize}`,
    `ch-input--variant-${variant}`,
    effectiveStatus && `ch-input--status-${effectiveStatus}`,
    disabled && "ch-input-textarea--disabled",
    resolvedClassNames.textarea,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      style={{ ...style, ...resolvedStyles.root }}
    >
      <textarea
        {...restProps}
        ref={textareaRef}
        rows={rows}
        disabled={disabled}
        maxLength={count?.max !== undefined ? undefined : maxLength}
        value={currentValue}
        className={textareaClasses}
        style={resolvedStyles.textarea}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showClear && (
        <span
          className={`ch-input-clear-icon ${resolvedClassNames.clear || ""}`}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            ...resolvedStyles.clear,
          }}
          onClick={handleClear}
        >
          {clearIcon}
        </span>
      )}
      {renderedCountText && (
        <div
          className={`ch-input-textarea-count-bottom ${
            isExceeded ? "ch-input-count--exceeded" : ""
          } ${resolvedClassNames.count || ""}`}
          style={resolvedStyles.count}
        >
          {renderedCountText}
        </div>
      )}
    </div>
  );
});

TextArea.displayName = "Input.TextArea";
