import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { useControllableState } from "../../hooks/useControllableState";
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
})<StyledCheckboxGroupRootProps>(({ theme, orientation = "vertical", spacing = 2 }) => {
  const gapValue =
    typeof spacing === "number" ? theme.spacing(spacing) : spacing;

  return {
    display: "flex",
    flexDirection: orientation === "horizontal" ? "row" : "column",
    flexWrap: orientation === "horizontal" ? "wrap" : "nowrap",
    gap: gapValue,
    width: "fit-content",
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
  const {
    value: valueProp,
    defaultValue = [],
    onChange: onChangeProp,
    name,
    size = "md",
    colorScheme = "primary",
    orientation = "vertical",
    spacing = 2,
    disabled = false,
    readOnly = false,
    error = false,
    asChild = false,
    component,
    as,
    children,
    className,
    style,
    sx,
    ...rest
  } = props;

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

  const targetTag = component || as;

  if (asChild) {
    return (
      <CheckboxContext.Provider value={contextValue}>
        <StyledCheckboxGroupRoot
          as={Slot}
          ref={ref as any}
          role="group"
          orientation={orientation}
          spacing={spacing}
          className={className}
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
        ref={ref as any}
        role="group"
        orientation={orientation}
        spacing={spacing}
        className={className}
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
