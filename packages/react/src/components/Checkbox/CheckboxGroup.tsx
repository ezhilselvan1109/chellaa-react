"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useControllableState } from "../../hooks/useControllableState";
import { useFormField } from "../FormField/FormFieldContext";
import { CheckboxContext } from "./CheckboxContext";
import type { CheckboxGroupProps, CheckboxContextValue } from "./Checkbox.types";

interface StyledCheckboxGroupRootProps {
  orientation?: "vertical" | "horizontal" | undefined;
  spacing?: number | string | undefined;
}

const StyledCheckboxGroupRoot = styled("div", {
  name: "ChellaaCheckboxGroup",
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
})<StyledCheckboxGroupRootProps>(({ theme, spacing = 2 }) => {
  const gapValue =
    typeof spacing === "number" ? theme.spacing(spacing) : spacing;

  return {
    gap: gapValue,
  };
});

/**
 * CheckboxGroup manages selection state for a set of related checkboxes,
 * cascading shared properties and orchestrating multi-selection arrays.
 *
 * @example
 * <CheckboxGroup defaultValue={['react']} onChange={(val) => console.log(val)}>
 *   <Checkbox value="react">React</Checkbox>
 *   <Checkbox value="vue">Vue</Checkbox>
 *   <Checkbox value="svelte">Svelte</Checkbox>
 * </CheckboxGroup>
 */
export const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(function CheckboxGroup(props, ref) {
  const formField = useFormField();

  const {
    value: valueProp,
    defaultValue = [],
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

  const name = nameProp ?? formField?.name;
  const disabled = disabledProp ?? formField?.disabled ?? false;
  const readOnly = readOnlyProp ?? formField?.readOnly ?? false;
  const error = errorProp ?? formField?.error ?? false;

  const [value, setValue] = useControllableState<string[]>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const toggleValue = React.useCallback(
    (itemValue: string) => {
      if (readOnly || disabled) return;
      const current = value || [];
      const next = current.includes(itemValue)
        ? current.filter((v) => v !== itemValue)
        : [...current, itemValue];
      setValue(next);
    },
    [value, setValue, readOnly, disabled]
  );

  const contextValue: CheckboxContextValue = React.useMemo(
    () => ({
      value: value || [],
      name,
      size,
      colorScheme,
      disabled,
      readOnly,
      error,
      toggleValue,
    }),
    [value, name, size, colorScheme, disabled, readOnly, error, toggleValue]
  );

  const groupClassName = classNames(
    "cl-checkbox-group",
    `cl-checkbox-group--${orientation}`,
    className
  );

  const targetTag = component || as;

  if (asChild) {
    return (
      <CheckboxContext.Provider value={contextValue}>
        <StyledCheckboxGroupRoot
          as={Slot}
          ref={ref as React.Ref<HTMLDivElement>}
          role="group"
          orientation={orientation}
          spacing={spacing}
          className={groupClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledCheckboxGroupRoot>
      </CheckboxContext.Provider>
    );
  }

  return (
    <CheckboxContext.Provider value={contextValue}>
      <StyledCheckboxGroupRoot
        as={targetTag}
        ref={ref as React.Ref<HTMLDivElement>}
        role="group"
        orientation={orientation}
        spacing={spacing}
        className={groupClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledCheckboxGroupRoot>
    </CheckboxContext.Provider>
  );
});

CheckboxGroup.displayName = "CheckboxGroup";
