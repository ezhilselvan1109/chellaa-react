import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { radioCssText } from "./Radio.style";
import { useRadioGroup } from "./Radio.context";
import type {
  RadioButtonProps,
  RadioRef,
  RadioChangeEvent,
  RadioSemanticDOM,
} from "./Radio.types";

export const RadioButton = forwardRef<RadioRef, RadioButtonProps>((props, ref) => {
  const {
    rootClassName,
    className = "",
    style,
    checked: controlledChecked,
    defaultChecked = false,
    disabled = false,
    value,
    name,
    id,
    autoFocus = false,
    tabIndex,
    title,
    required,
    classNames,
    styles,
    onChange,
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
    onFocus,
    onBlur,
    ...restProps
  } = props;

  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
    injectStyle("ch-radio", radioCssText);
  }

  const groupContext = useRadioGroup();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Imperative handle
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    get nativeElement() {
      return inputRef.current;
    },
  }));

  // Resolve checked state
  const [uncontrolledChecked, setUncontrolledChecked] = useState<boolean>(defaultChecked);
  const isControlled = controlledChecked !== undefined;

  let mergedChecked = isControlled ? controlledChecked : uncontrolledChecked;
  if (groupContext && groupContext.value !== undefined && value !== undefined) {
    mergedChecked = groupContext.value === value;
  }

  // Resolve disabled state
  const mergedDisabled = Boolean(groupContext?.disabled || disabled);

  // Resolve name
  const mergedName = groupContext?.name || name;

  // Resolve size
  const mergedSize = groupContext?.size;
  const normalizedSize =
    mergedSize === "large" || mergedSize === "lg"
      ? "lg"
      : mergedSize === "small" || mergedSize === "sm"
      ? "sm"
      : "md";

  // Resolve buttonStyle
  const mergedButtonStyle = groupContext?.buttonStyle || "outline";

  // Resolve Semantic DOM styles
  const resolvedClassNames: Partial<Record<RadioSemanticDOM, string>> =
    typeof classNames === "function" ? classNames({ props }) : classNames || {};
  const resolvedStyles: Partial<Record<RadioSemanticDOM, React.CSSProperties>> =
    typeof styles === "function" ? styles({ props }) : styles || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mergedDisabled) return;

    if (!isControlled) {
      setUncontrolledChecked(e.target.checked);
    }

    const changeEvent: RadioChangeEvent = {
      target: {
        ...props,
        checked: e.target.checked,
      },
      stopPropagation: () => e.stopPropagation(),
      preventDefault: () => e.preventDefault(),
      nativeEvent: e.nativeEvent,
    };

    if (groupContext?.onRadioChange) {
      groupContext.onRadioChange(changeEvent);
    }
    onChange?.(changeEvent);
  };

  const buttonClasses = [
    "ch-radio-button",
    mergedChecked && "ch-radio-button--checked",
    mergedDisabled && "ch-radio-button--disabled",
    mergedButtonStyle === "solid" && "ch-radio-button--solid",
    normalizedSize !== "md" && `ch-radio-button--${normalizedSize}`,
    rootClassName,
    className,
    resolvedClassNames.root,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label
      className={buttonClasses}
      style={{ ...style, ...resolvedStyles.root }}
      title={title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <input
        {...restProps}
        ref={inputRef}
        type="radio"
        className="ch-radio-input"
        name={mergedName}
        id={id}
        value={value}
        checked={Boolean(mergedChecked)}
        disabled={mergedDisabled}
        tabIndex={tabIndex}
        required={required}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {children !== undefined && (
        <span
          className={resolvedClassNames.label}
          style={resolvedStyles.label}
        >
          {children}
        </span>
      )}
    </label>
  );
});

RadioButton.displayName = "Radio.Button";
