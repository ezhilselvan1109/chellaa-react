"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useControllableState } from "../../hooks/useControllableState";
import { useFormField } from "../FormField/FormFieldContext";
import { RadioContext } from "./RadioContext";
import type { RadioGroupProps, RadioContextValue } from "./Radio.types";

const StyledRadioGroupRoot = styled("div", {
  name: "ChellaaRadioGroup",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "orientation" &&
    prop !== "spacing" &&
    prop !== "colorScheme" &&
    prop !== "error" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * RadioGroup manages single-selection state across a group of mutually exclusive Radios,
 * providing native roving keyboard navigation and shared property cascade.
 *
 * @example
 * <RadioGroup defaultValue="standard" onChange={(val) => console.log(val)}>
 *   <Radio value="standard">Standard Shipping (3-5 days)</Radio>
 *   <Radio value="express">Express Shipping (1-2 days)</Radio>
 *   <Radio value="overnight">Overnight Delivery</Radio>
 * </RadioGroup>
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    const formField = useFormField();

    const {
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
      name: nameProp,
      size = "md",
      colorScheme = "primary",
      orientation = "vertical",
      spacing = 2,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      error: errorProp,
      asChild = false,
      component,
      as,
      children,
      className,
      style,
      sx,
      ...rest
    } = props;

    const generatedName = React.useId();
    const name = nameProp || formField?.name || generatedName;
    const disabled = disabledProp ?? formField?.disabled ?? false;
    const readOnly = readOnlyProp ?? formField?.readOnly ?? false;
    const error = errorProp ?? formField?.error ?? false;

    const [value, setValue] = useControllableState<string | number | undefined>({
      value: valueProp,
      defaultValue,
      onChange: (val) => {
        if (val !== undefined) {
          onChangeProp?.(val);
        }
      },
    });

    const handleChange = React.useCallback(
      (nextValue: string | number) => {
        if (readOnly || disabled) return;
        setValue(nextValue);
      },
      [readOnly, disabled, setValue]
    );

    const contextValue: RadioContextValue = React.useMemo(
      () => ({
        value,
        name,
        size,
        colorScheme,
        disabled,
        readOnly,
        error,
        onChange: handleChange,
      }),
      [value, name, size, colorScheme, disabled, readOnly, error, handleChange]
    );

    const targetTag = component || as;

    const groupClassName = classNames(
      "cl-radio-group",
      orientation === "horizontal"
        ? "cl-radio-group--horizontal"
        : "cl-radio-group--vertical",
      className
    );

    const gapStyle =
      spacing !== undefined
        ? {
            gap: typeof spacing === "number" ? `${spacing * 4}px` : spacing,
            ...style,
          }
        : style;

    if (asChild) {
      return (
        <RadioContext.Provider value={contextValue}>
          <StyledRadioGroupRoot
            as={Slot}
            ref={ref as React.Ref<HTMLDivElement>}
            role="radiogroup"
            className={groupClassName}
            style={gapStyle}
            sx={sx}
            {...rest}
          >
            {children}
          </StyledRadioGroupRoot>
        </RadioContext.Provider>
      );
    }

    return (
      <RadioContext.Provider value={contextValue}>
        <StyledRadioGroupRoot
          as={targetTag}
          ref={ref as React.Ref<HTMLDivElement>}
          role="radiogroup"
          className={groupClassName}
          style={gapStyle}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledRadioGroupRoot>
      </RadioContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
