import { forwardRef, useState, useMemo } from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { checkboxCssText } from "./Checkbox.style";
import { CheckboxGroupContext } from "./Checkbox.context";
import { Checkbox } from "./Checkbox";
import type {
  CheckboxGroupProps,
  CheckboxOptionType,
  CheckboxChangeEvent,
} from "./Checkbox.types";

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (props, ref) => {
    const {
      rootClassName,
      defaultValue = [],
      value: controlledValue,
      disabled,
      name,
      options,
      onChange,
      children,
      className = "",
      style,
      ...restProps
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-checkbox", checkboxCssText);
    }

    const [uncontrolledValue, setUncontrolledValue] = useState<(string | number | boolean)[]>(
      defaultValue
    );
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const toggleOption = (option: {
      value: string | number | boolean;
      e: CheckboxChangeEvent;
    }) => {
      const optionIndex = currentValue.indexOf(option.value);
      const nextValue = [...currentValue];

      if (optionIndex === -1) {
        nextValue.push(option.value);
      } else {
        nextValue.splice(optionIndex, 1);
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    };

    const contextValue = useMemo(
      () => ({
        value: currentValue,
        disabled,
        name,
        toggleOption,
      }),
      [currentValue, disabled, name]
    );

    // Normalize options if provided
    const renderedContent = useMemo(() => {
      if (options && options.length > 0) {
        return options.map((opt) => {
          const optionObj: CheckboxOptionType =
            typeof opt === "string" || typeof opt === "number"
              ? { label: String(opt), value: opt }
              : opt;

          return (
            <Checkbox
              key={String(optionObj.value)}
              disabled={"disabled" in optionObj ? optionObj.disabled : disabled}
              value={optionObj.value}
              checked={currentValue.includes(optionObj.value)}
              onChange={optionObj.onChange}
              className={optionObj.className}
              style={optionObj.style}
              title={optionObj.title}
            >
              {optionObj.label}
            </Checkbox>
          );
        });
      }
      return children;
    }, [options, disabled, currentValue, children]);

    const groupClasses = [
      "ch-checkbox-group",
      rootClassName,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <div ref={ref} className={groupClasses} style={style} {...restProps}>
          {renderedContent}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
