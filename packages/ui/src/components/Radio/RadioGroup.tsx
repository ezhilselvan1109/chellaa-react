import React, { forwardRef, useState, useMemo, useId } from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { radioCssText } from "./Radio.style";
import { RadioGroupContext } from "./Radio.context";
import { RadioButton } from "./RadioButton";
import type {
  RadioGroupProps,
  RadioOptionType,
  RadioChangeEvent,
  RadioSemanticDOM,
} from "./Radio.types";

// Note: InternalRadio is dynamically resolved or imported to avoid circular reference
// We can use a reference to the main Radio component when mapping options
let RadioComponent: any = null;
export const registerRadioComponent = (comp: any) => {
  RadioComponent = comp;
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const {
      rootClassName,
      className = "",
      style,
      defaultValue,
      value: controlledValue,
      disabled = false,
      name: propName,
      options,
      optionType = "default",
      buttonStyle = "outline",
      size,
      orientation = "horizontal",
      vertical = false,
      block = false,
      classNames,
      styles,
      onChange,
      children,
      ...restProps
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-radio", radioCssText);
    }

    const uniqueId = useId();
    const groupName = propName || `ch-radio-group-${uniqueId}`;

    const [uncontrolledValue, setUncontrolledValue] = useState<any>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const handleRadioChange = (e: RadioChangeEvent) => {
      const nextValue = e.target.value;
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(e);
    };

    const contextValue = useMemo(
      () => ({
        value: currentValue,
        disabled,
        name: groupName,
        size,
        buttonStyle,
        optionType,
        onRadioChange: handleRadioChange,
      }),
      [currentValue, disabled, groupName, size, buttonStyle, optionType]
    );

    const resolvedOrientation = vertical ? "vertical" : orientation;

    const resolvedClassNames: Partial<Record<RadioSemanticDOM, string>> =
      typeof classNames === "function" ? classNames({ props }) : classNames || {};
    const resolvedStyles: Partial<Record<RadioSemanticDOM, React.CSSProperties>> =
      typeof styles === "function" ? styles({ props }) : styles || {};

    const renderedContent = useMemo(() => {
      if (options && options.length > 0) {
        return options.map((opt) => {
          const optionObj: RadioOptionType =
            typeof opt === "string" || typeof opt === "number"
              ? { label: String(opt), value: opt }
              : opt;

          const isChecked = currentValue === optionObj.value;
          const isItemDisabled =
            "disabled" in optionObj && optionObj.disabled !== undefined
              ? optionObj.disabled
              : disabled;

          if (optionType === "button") {
            return (
              <RadioButton
                key={String(optionObj.value)}
                value={optionObj.value}
                checked={isChecked}
                disabled={isItemDisabled}
                className={optionObj.className}
                style={optionObj.style}
                title={optionObj.title}
                id={optionObj.id}
                required={optionObj.required}
                onChange={optionObj.onChange}
              >
                {optionObj.label}
              </RadioButton>
            );
          }

          // Default circular radio
          const Comp = RadioComponent || "span";
          return (
            <Comp
              key={String(optionObj.value)}
              value={optionObj.value}
              checked={isChecked}
              disabled={isItemDisabled}
              className={optionObj.className}
              style={optionObj.style}
              title={optionObj.title}
              id={optionObj.id}
              required={optionObj.required}
              onChange={optionObj.onChange}
            >
              {optionObj.label}
            </Comp>
          );
        });
      }
      return children;
    }, [options, optionType, currentValue, disabled, children]);

    const groupClasses = [
      "ch-radio-group",
      resolvedOrientation === "vertical" && "ch-radio-group--vertical",
      block && "ch-radio-group--block",
      rootClassName,
      className,
      resolvedClassNames.root,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          {...restProps}
          ref={ref}
          className={groupClasses}
          style={{ ...style, ...resolvedStyles.root }}
          role="radiogroup"
        >
          {renderedContent}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "Radio.Group";
