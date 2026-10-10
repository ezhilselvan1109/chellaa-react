"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  SwitchProps,
  SwitchSize,
  SwitchColorScheme,
  SwitchLabelPlacement,
} from "./Switch.types";

export type {
  SwitchProps,
  SwitchSize,
  SwitchColorScheme,
  SwitchLabelPlacement,
};

const StyledSwitchRoot = styled("label", {
  name: "ChellaaSwitch",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "labelPlacement" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "error" &&
    prop !== "loading" &&
    prop !== "checked" &&
    prop !== "colorScheme" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Switch primitive representing an immediate binary toggle setting.
 * Conforms to the W3C WAI-ARIA 1.2 Switch Pattern (`role="switch"`).
 *
 * @example
 * <Switch defaultChecked>Enable Notifications</Switch>
 */
export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  function Switch(props, ref) {
    const formField = useFormField();

    const {
      checked: checkedProp,
      defaultChecked = false,
      onChange: onChangeProp,
      value,
      name: nameProp,
      size = "md",
      colorScheme = "primary",
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      error: errorProp,
      loading = false,
      checkedIcon,
      uncheckedIcon,
      labelPlacement = "end",
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

    const disabled =
      disabledProp ?? formField?.disabled ?? loading ? true : false;
    const readOnly = readOnlyProp ?? formField?.readOnly ?? false;
    const error = errorProp ?? formField?.error ?? false;
    const required = requiredProp ?? formField?.required ?? false;
    const name = nameProp ?? formField?.name;
    const id = idProp ?? (formField ? `${formField.id}-switch` : undefined);

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
      defaultChecked
    );

    const isControlled = checkedProp !== undefined;
    const effectiveChecked = isControlled ? checkedProp : uncontrolledChecked;

    const nativeInputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMergeRefs(nativeInputRef, inputRefProp);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly || loading) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        setUncontrolledChecked(event.target.checked);
      }

      onChangeProp?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        nativeInputRef.current?.click();
      }
      inputProps.onKeyDown?.(event);
    };

    const switchClassName = classNames(
      "cl-switch",
      `cl-switch--${size}`,
      `cl-switch--${colorScheme}`,
      `cl-switch--placement-${labelPlacement}`,
      effectiveChecked && "cl-switch--checked",
      disabled && "cl-switch--disabled",
      error && "cl-switch--error",
      className
    );

    const targetTag = component || as;

    const thumbIcon = loading ? (
      <svg
        className="cl-switch__spinner"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="40 20"
          strokeLinecap="round"
        />
      </svg>
    ) : effectiveChecked ? (
      checkedIcon
    ) : (
      uncheckedIcon
    );

    const trackControl = (
      <span className="cl-switch__track ChellaaSwitch-Track" aria-hidden="true">
        <span className="cl-switch__thumb ChellaaSwitch-Thumb">
          {thumbIcon}
        </span>
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
        <StyledSwitchRoot
          as={Slot}
          ref={ref as React.Ref<HTMLLabelElement>}
          className={switchClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledSwitchRoot>
      );
    }

    return (
      <StyledSwitchRoot
        as={targetTag}
        ref={ref as React.Ref<HTMLLabelElement>}
        className={switchClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        <input
          type="checkbox"
          role="switch"
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          checked={isControlled ? effectiveChecked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={mergedInputRef}
          aria-checked={effectiveChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy}
          className="cl-switch__input"
          {...inputProps}
        />
        {trackControl}
        {children && (
          <span className="cl-switch__label ChellaaSwitch-Label">
            {children}
          </span>
        )}
      </StyledSwitchRoot>
    );
  }
);

Switch.displayName = "Switch";
