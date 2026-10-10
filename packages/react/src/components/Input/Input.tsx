"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  InputProps,
  InputOwnerState,
  InputVariant,
  InputSize,
} from "./Input.types";

export type { InputProps, InputOwnerState, InputVariant, InputSize };

/**
 * Headless raw input primitive for backward compatibility.
 */
export const InputBase = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { ownerState?: InputOwnerState }
>(function InputBase({ className, ownerState: _ownerState, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={classNames("cl-input__input", className)}
      {...props}
    />
  );
});

InputBase.displayName = "InputBase";

const StyledInputRoot = styled("div", {
  name: "ChellaaInput",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "size" &&
    prop !== "fullWidth" &&
    prop !== "error" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "hasStartAdornment" &&
    prop !== "hasEndAdornment" &&
    prop !== "focused" &&
    prop !== "asChild" &&
    prop !== "component" &&
    prop !== "ownerState",
})({});

/**
 * Chellaa React Input component.
 *
 * Fundamental single-line text entry primitive with Material Design 3 surface variants,
 * precompiled CSS cascade layers (@layer cl-components), zero-runtime static styling,
 * dynamic sx override bridge, and accessible form integration.
 */
export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  function Input(props, ref) {
    const formField = useFormField();

    const {
      asChild = false,
      component,
      as,
      variant = "outlined",
      size = "md",
      fullWidth = false,
      error: errorProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      startAdornment,
      endAdornment,
      clearable = false,
      onClear,
      inputRef: inputRefProp,
      value: valueProp,
      defaultValue,
      onChange,
      type = "text",
      id: idProp,
      className,
      style,
      sx,
      inputProps,
      "aria-describedby": ariaDescribedByProp,
      ...restInputProps
    } = props;

    const id = idProp ?? formField?.id;
    const error = errorProp ?? formField?.error ?? false;
    const disabled = disabledProp ?? formField?.disabled ?? false;
    const readOnly = readOnlyProp ?? formField?.readOnly ?? false;
    const required = requiredProp ?? formField?.required ?? false;

    const ariaDescribedBy = [
      ariaDescribedByProp,
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    // Value tracking for clearable button
    const [internalValue, setInternalValue] = React.useState<string>(() => {
      if (valueProp !== undefined) return String(valueProp);
      if (defaultValue !== undefined) return String(defaultValue);
      return "";
    });

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? String(valueProp ?? "") : internalValue;

    const innerInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        innerInputRef.current = node;
        if (typeof inputRefProp === "function") {
          inputRefProp(node);
        } else if (inputRefProp && "current" in inputRefProp) {
          (inputRefProp as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [inputRefProp]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!isControlled) {
        setInternalValue("");
      }
      if (innerInputRef.current) {
        innerInputRef.current.value = "";
        const event = new Event("input", { bubbles: true });
        innerInputRef.current.dispatchEvent(event);
        innerInputRef.current.focus();
      }
      onClear?.();
    };

    const handleWrapperClick = () => {
      if (innerInputRef.current && document.activeElement !== innerInputRef.current) {
        innerInputRef.current.focus();
      }
    };

    const showClear = clearable && !disabled && !readOnly && currentValue.length > 0;

    const clearButton = showClear ? (
      <button
        type="button"
        className="cl-input__clear"
        aria-label="Clear input"
        onClick={handleClear}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    ) : null;

    const inputWrapperClassName = classNames(
      "cl-input",
      `cl-input--${variant}`,
      `cl-input--${size}`,
      fullWidth && "cl-input--full-width",
      error && "cl-input--error",
      disabled && "cl-input--disabled",
      className
    );

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledInputRoot
          as={Slot}
          ref={ref as React.Ref<HTMLDivElement>}
          className={inputWrapperClassName}
          style={style}
          sx={sx}
          onClick={handleWrapperClick}
        >
          {startAdornment}
          <input
            ref={handleInputRef}
            id={id}
            type={type}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-describedby={ariaDescribedBy}
            value={valueProp}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={error ? true : undefined}
            className="cl-input__input"
            {...inputProps}
            {...restInputProps}
          />
          {clearButton}
          {endAdornment}
        </StyledInputRoot>
      );
    }

    return (
      <StyledInputRoot
        as={targetTag}
        ref={ref as React.Ref<HTMLDivElement>}
        className={inputWrapperClassName}
        style={style}
        sx={sx}
        onClick={handleWrapperClick}
      >
        {startAdornment}
        <input
          ref={handleInputRef}
          id={id}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-describedby={ariaDescribedBy}
          value={valueProp}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          className="cl-input__input"
          {...inputProps}
          {...restInputProps}
        />
        {clearButton}
        {endAdornment}
      </StyledInputRoot>
    );
  }
);

Input.displayName = "Input";
