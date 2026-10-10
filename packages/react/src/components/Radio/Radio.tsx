"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useRadioGroup } from "./RadioContext";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  RadioProps,
  RadioSize,
  RadioColorScheme,
} from "./Radio.types";

export type { RadioProps, RadioSize, RadioColorScheme };

const StyledRadioRoot = styled("label", {
  name: "ChellaaRadio",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "error" &&
    prop !== "checked" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Radio primitive for single-choice selection with animated circular dot indicator,
 * accessible keyboard arrow navigation, and automatic RadioGroup / FormField binding.
 *
 * @example
 * <Radio value="express">Express Delivery</Radio>
 */
export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  function Radio(props, ref) {
    const group = useRadioGroup();
    const formField = useFormField();

    const {
      checked: checkedProp,
      defaultChecked = false,
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

    const isGroupControlled = group !== undefined && valueProp !== undefined;
    const isCheckedInGroup = isGroupControlled
      ? group.value !== undefined && String(group.value) === String(valueProp)
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
    const id = idProp ?? (formField ? `${formField.id}-radio-${valueProp ?? ""}` : undefined);

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
      defaultChecked
    );

    const isControlled = checked !== undefined;
    const effectiveChecked = isControlled ? checked : uncontrolledChecked;

    const nativeInputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMergeRefs(nativeInputRef, inputRefProp);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        event.preventDefault();
        return;
      }

      if (isGroupControlled && valueProp !== undefined) {
        group.onChange(valueProp);
      } else if (!isControlled) {
        setUncontrolledChecked(event.target.checked);
      }

      onChangeProp?.(event);
    };

    const radioClassName = classNames(
      "cl-radio",
      `cl-radio--${size}`,
      `cl-radio--${colorScheme}`,
      effectiveChecked && "cl-radio--checked",
      disabled && "cl-radio--disabled",
      error && "cl-radio--error",
      className
    );

    const targetTag = component || as;

    const controlBox = (
      <span className="cl-radio__control ChellaaRadio-Control" aria-hidden="true">
        <span className="cl-radio__dot ChellaaRadio-Dot" />
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
        <StyledRadioRoot
          as={Slot}
          ref={ref as React.Ref<HTMLLabelElement>}
          className={radioClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledRadioRoot>
      );
    }

    return (
      <StyledRadioRoot
        as={targetTag}
        ref={ref as React.Ref<HTMLLabelElement>}
        className={radioClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        <input
          type="radio"
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
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy}
          className="cl-radio__input"
          {...inputProps}
        />
        {controlBox}
        {children && (
          <span className="cl-radio__label ChellaaRadio-Label">
            {children}
          </span>
        )}
      </StyledRadioRoot>
    );
  }
);

Radio.displayName = "Radio";
