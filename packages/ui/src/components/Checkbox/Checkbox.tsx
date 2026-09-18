import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { checkboxCssText } from "./Checkbox.style";
import { useCheckboxGroup } from "./Checkbox.context";
import { CheckboxGroup } from "./CheckboxGroup";
import type {
  CheckboxProps,
  CheckboxRef,
  CheckboxChangeEvent,
  CheckboxSemanticDOM,
} from "./Checkbox.types";

export interface CompoundedCheckbox
  extends React.ForwardRefExoticComponent<
    CheckboxProps & React.RefAttributes<CheckboxRef>
  > {
  Group: typeof CheckboxGroup;
}

const InternalCheckbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const {
    rootClassName,
    className = "",
    style,
    checked: controlledChecked,
    defaultChecked = false,
    disabled = false,
    indeterminate = false,
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
    injectStyle("ch-checkbox", checkboxCssText);
  }

  const groupContext = useCheckboxGroup();
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync indeterminate property with native DOM element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  // Handle autoFocus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Imperative handle for focus, blur, and nativeElement
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
  if (groupContext && groupContext.value && value !== undefined) {
    mergedChecked = groupContext.value.includes(value);
  }

  // Resolve disabled state
  const mergedDisabled = Boolean(groupContext?.disabled || disabled);
  const mergedName = groupContext?.name || name;

  // Resolve Semantic DOM classes & styles
  const resolvedClassNames: Partial<Record<CheckboxSemanticDOM, string>> =
    typeof classNames === "function" ? classNames({ props }) : classNames || {};
  const resolvedStyles: Partial<Record<CheckboxSemanticDOM, React.CSSProperties>> =
    typeof styles === "function" ? styles({ props }) : styles || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mergedDisabled) return;

    const targetChecked = e.target.checked;
    if (!isControlled && (!groupContext || value === undefined)) {
      setUncontrolledChecked(targetChecked);
    }

    const eventData: CheckboxChangeEvent = {
      target: {
        ...props,
        checked: targetChecked,
      },
      stopPropagation: () => e.stopPropagation(),
      preventDefault: () => e.preventDefault(),
      nativeEvent: e.nativeEvent,
    };

    if (groupContext && groupContext.toggleOption && value !== undefined) {
      groupContext.toggleOption({ value, e: eventData });
    }

    onChange?.(eventData);
  };

  // Outer Wrapper Classes
  const wrapperClasses = [
    "ch-checkbox-wrapper",
    mergedChecked && "ch-checkbox-wrapper--checked",
    mergedDisabled && "ch-checkbox-wrapper--disabled",
    indeterminate && "ch-checkbox-wrapper--indeterminate",
    rootClassName,
    className,
    resolvedClassNames.root,
  ]
    .filter(Boolean)
    .join(" ");

  // Checkbox Box Classes
  const checkboxClasses = [
    "ch-checkbox",
    mergedChecked && "ch-checkbox--checked",
    mergedDisabled && "ch-checkbox--disabled",
    indeterminate && "ch-checkbox--indeterminate",
    resolvedClassNames.icon,
  ]
    .filter(Boolean)
    .join(" ");

  // Label Classes
  const labelClasses = [
    "ch-checkbox-label",
    resolvedClassNames.label,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label
      className={wrapperClasses}
      style={{ ...style, ...resolvedStyles.root }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      title={title}
      {...restProps}
    >
      <span className={checkboxClasses} style={resolvedStyles.icon}>
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={mergedName}
          tabIndex={tabIndex}
          required={required}
          value={value !== undefined ? String(value) : undefined}
          checked={Boolean(mergedChecked)}
          disabled={mergedDisabled}
          className="ch-checkbox-input"
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className="ch-checkbox-inner" />
      </span>
      {children !== undefined && children !== null && (
        <span className={labelClasses} style={resolvedStyles.label}>
          {children}
        </span>
      )}
    </label>
  );
});

InternalCheckbox.displayName = "Checkbox";

export const Checkbox = InternalCheckbox as CompoundedCheckbox;
Checkbox.Group = CheckboxGroup;
