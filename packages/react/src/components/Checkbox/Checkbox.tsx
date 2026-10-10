"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useCheckboxGroup } from "./CheckboxContext";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  CheckboxProps,
  CheckboxSize,
  CheckboxColorScheme,
} from "./Checkbox.types";

export type { CheckboxProps, CheckboxSize, CheckboxColorScheme };

const StyledCheckboxRoot = styled("label", {
  name: "ChellaaCheckbox",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "error" &&
    prop !== "checked" &&
    prop !== "indeterminate" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Checkbox primitive with tri-state selection, custom color palettes,
 * keyboard accessibility, and automatic CheckboxGroup / FormField binding.
 *
 * @example
 * <Checkbox defaultChecked>Subscribe to updates</Checkbox>
 * <Checkbox indeterminate>Select all items</Checkbox>
 */
export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const group = useCheckboxGroup();
    const formField = useFormField();

    const {
      checked: checkedProp,
      defaultChecked = false,
      indeterminate = false,
      onChange: onChangeProp,
      value: valueProp,
      name: nameProp,
      size: sizeProp,
      colorScheme: colorSchemeProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      error: errorProp,
      inputRef: inputRefProp,
      inputProps = {},
      asChild = false,
      component,
      as,
      children,
      className,
      style,
      sx,
      id: idProp,
      ...rest
    } = props;

    // Cascade resolution: Props > Group > FormField > Defaults
    const isGroupControlled = group !== undefined && valueProp !== undefined;
    const isCheckedInGroup = isGroupControlled
      ? group.value.includes(valueProp)
      : undefined;

    const checked =
      checkedProp !== undefined ? checkedProp : isCheckedInGroup;

    const size = sizeProp ?? group?.size ?? "md";
    const colorScheme = colorSchemeProp ?? group?.colorScheme ?? "primary";
    const disabled =
      disabledProp ?? group?.disabled ?? formField?.disabled ?? false;
    const readOnly =
      readOnlyProp ?? group?.readOnly ?? formField?.readOnly ?? false;
    const error = errorProp ?? group?.error ?? formField?.error ?? false;
    const required = requiredProp ?? formField?.required ?? false;
    const name = nameProp ?? group?.name ?? formField?.name;
    const id = idProp ?? (formField ? `${formField.id}-checkbox` : undefined);

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
      defaultChecked
    );

    const isControlled = checked !== undefined;
    const effectiveChecked = isControlled ? checked : uncontrolledChecked;

    const nativeInputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMergeRefs(nativeInputRef, inputRefProp);

    React.useEffect(() => {
      if (nativeInputRef.current) {
        nativeInputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        event.preventDefault();
        return;
      }

      if (isGroupControlled) {
        group.toggleValue(valueProp);
      } else if (!isControlled) {
        setUncontrolledChecked(event.target.checked);
      }

      onChangeProp?.(event);
    };

    const checkboxClassName = classNames(
      "cl-checkbox",
      `cl-checkbox--${size}`,
      `cl-checkbox--${colorScheme}`,
      effectiveChecked && "cl-checkbox--checked",
      indeterminate && "cl-checkbox--indeterminate",
      disabled && "cl-checkbox--disabled",
      error && "cl-checkbox--error",
      className
    );

    const targetTag = component || as;

    const controlBox = (
      <span className="cl-checkbox__control ChellaaCheckbox-Control" aria-hidden="true">
        {indeterminate ? (
          <svg
            className="cl-checkbox__icon ChellaaCheckbox-Icon ChellaaCheckbox-Icon--indeterminate"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            width={size === "lg" ? 18 : size === "sm" ? 12 : 14}
            height={size === "lg" ? 18 : size === "sm" ? 12 : 14}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ) : effectiveChecked ? (
          <svg
            className="cl-checkbox__icon ChellaaCheckbox-Icon ChellaaCheckbox-Icon--checked"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            width={size === "lg" ? 18 : size === "sm" ? 12 : 14}
            height={size === "lg" ? 18 : size === "sm" ? 12 : 14}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : null}
      </span>
    );

    const ariaDescribedBy = [
      inputProps["aria-describedby"],
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    if (asChild) {
      return (
        <StyledCheckboxRoot
          as={Slot}
          ref={ref as React.Ref<HTMLLabelElement>}
          className={checkboxClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledCheckboxRoot>
      );
    }

    return (
      <StyledCheckboxRoot
        as={targetTag}
        ref={ref as React.Ref<HTMLLabelElement>}
        className={checkboxClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          value={valueProp}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          checked={isControlled ? effectiveChecked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          ref={mergedInputRef}
          aria-checked={indeterminate ? "mixed" : effectiveChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy}
          className="cl-checkbox__input"
          {...inputProps}
        />
        {controlBox}
        {children && (
          <span className="cl-checkbox__label ChellaaCheckbox-Label">
            {children}
          </span>
        )}
      </StyledCheckboxRoot>
    );
  }
);

Checkbox.displayName = "Checkbox";
