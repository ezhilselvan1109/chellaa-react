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
import { RadioGroup, registerRadioComponent } from "./RadioGroup";
import { RadioButton } from "./RadioButton";
import type {
  RadioProps,
  RadioRef,
  RadioChangeEvent,
  RadioSemanticDOM,
} from "./Radio.types";

export interface CompoundedRadio
  extends React.ForwardRefExoticComponent<
    RadioProps & React.RefAttributes<RadioRef>
  > {
  Group: typeof RadioGroup;
  Button: typeof RadioButton;
}

const InternalRadio = forwardRef<RadioRef, RadioProps>((props, ref) => {
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

  // Wave ripple animation state
  const [isWaving, setIsWaving] = useState(false);
  const waveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    };
  }, []);

  // Handle autoFocus
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

    if (e.target.checked) {
      setIsWaving(true);
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
      waveTimerRef.current = setTimeout(() => {
        setIsWaving(false);
      }, 400);
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

  const radioClasses = [
    "ch-radio",
    mergedChecked && "ch-radio--checked",
    mergedDisabled && "ch-radio--disabled",
    rootClassName,
    className,
    resolvedClassNames.root,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label
      className={radioClasses}
      style={{ ...style, ...resolvedStyles.root }}
      title={title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span className="ch-radio-wrapper">
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
        <span
          className={`ch-radio-inner ${resolvedClassNames.icon || ""}`}
          style={resolvedStyles.icon}
        />
        {isWaving && <span className="ch-radio-wave" />}
      </span>
      {children !== undefined && (
        <span
          className={`ch-radio-label ${resolvedClassNames.label || ""}`}
          style={resolvedStyles.label}
        >
          {children}
        </span>
      )}
    </label>
  );
});

InternalRadio.displayName = "Radio";

registerRadioComponent(InternalRadio);

export const Radio = InternalRadio as CompoundedRadio;
Radio.Group = RadioGroup;
Radio.Button = RadioButton;
