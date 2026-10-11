"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { FormFieldContext, type FormFieldContextValue } from "./FormFieldContext";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  isRequired?: boolean | undefined;
  disabled?: boolean | undefined;
  isDisabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  error?: boolean | undefined;
  isInvalid?: boolean | undefined;
  fullWidth?: boolean | undefined;
  asChild?: boolean | undefined;
  component?: React.ElementType | undefined;
  as?: React.ElementType | undefined;
  sx?: SxProps;
  children?: React.ReactNode | undefined;
}

const StyledFormFieldRoot = styled("div", {
  name: "ChellaaFormField",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "fullWidth" &&
    prop !== "asChild" &&
    prop !== "component" &&
    prop !== "error" &&
    prop !== "isInvalid" &&
    prop !== "disabled" &&
    prop !== "isDisabled" &&
    prop !== "readOnly" &&
    prop !== "isReadOnly" &&
    prop !== "required" &&
    prop !== "isRequired",
})({});

/**
 * Root form control container and accessibility context provider.
 * Automatically generates IDs and cascades validation states to child controls.
 *
 * @example
 * <FormField required error={hasError}>
 *   <FormLabel>Email Address</FormLabel>
 *   <Input type="email" placeholder="alex@company.com" />
 *   <FormHelperText>We will never share your email.</FormHelperText>
 *   <FormErrorMessage>Invalid email address.</FormErrorMessage>
 * </FormField>
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField(props, ref) {
    const {
      id: idProp,
      name,
      required: requiredProp = false,
      isRequired = false,
      disabled: disabledProp = false,
      isDisabled = false,
      readOnly: readOnlyProp = false,
      isReadOnly = false,
      error: errorProp = false,
      isInvalid = false,
      fullWidth = false,
      asChild = false,
      component,
      as,
      children,
      className,
      style,
      sx,
      ...rest
    } = props;

    const required = isRequired || requiredProp;
    const disabled = isDisabled || disabledProp;
    const readOnly = isReadOnly || readOnlyProp;
    const error = isInvalid || errorProp;

    const generatedId = React.useId();
    const id = idProp || generatedId;
    const labelId = `${id}-label`;
    const helperTextId = `${id}-helper`;
    const errorMessageId = `${id}-error`;

    const [hasHelperText, setHasHelperText] = React.useState(false);
    const [hasErrorMessage, setHasErrorMessage] = React.useState(false);

    const contextValue: FormFieldContextValue = React.useMemo(
      () => ({
        id,
        name,
        required,
        disabled,
        readOnly,
        error,
        labelId,
        helperTextId,
        errorMessageId,
        hasHelperText,
        hasErrorMessage,
        setHasHelperText,
        setHasErrorMessage,
      }),
      [
        id,
        name,
        required,
        disabled,
        readOnly,
        error,
        labelId,
        helperTextId,
        errorMessageId,
        hasHelperText,
        hasErrorMessage,
      ]
    );

    const fieldClassName = classNames(
      "cl-form-field",
      fullWidth && "cl-form-field--full-width",
      error && "cl-form-field--error",
      disabled && "cl-form-field--disabled",
      className
    );

    const targetTag = component || as;

    if (asChild) {
      return (
        <FormFieldContext.Provider value={contextValue}>
          <StyledFormFieldRoot
            as={Slot}
            ref={ref as React.Ref<HTMLDivElement>}
            className={fieldClassName}
            style={style}
            sx={sx}
            {...rest}
          >
            {children}
          </StyledFormFieldRoot>
        </FormFieldContext.Provider>
      );
    }

    return (
      <FormFieldContext.Provider value={contextValue}>
        <StyledFormFieldRoot
          as={targetTag}
          ref={ref as React.Ref<HTMLDivElement>}
          className={fieldClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledFormFieldRoot>
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = "FormField";
