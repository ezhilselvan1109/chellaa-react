"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useFormField } from "./FormFieldContext";

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * If true, displays a required asterisk. Inherits from FormField context if omitted.
   */
  required?: boolean | undefined;
  /**
   * If true, highlights label in error palette color. Inherits from FormField context if omitted.
   */
  error?: boolean | undefined;
  /**
   * If true, styles label in disabled state. Inherits from FormField context if omitted.
   */
  disabled?: boolean | undefined;
  /**
   * If true, delegates rendering to immediate child using Slot.
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component
   */
  component?: React.ElementType | undefined;
  /**
   * Alias for component
   */
  as?: React.ElementType | undefined;
  /**
   * The system-aware sx prop
   */
  sx?: SxProps;
  children?: React.ReactNode | undefined;
}

const StyledLabelRoot = styled("label", {
  name: "ChellaaFormLabel",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "required" &&
    prop !== "error" &&
    prop !== "disabled" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

/**
 * Accessible form label automatically linked to its associated input control.
 *
 * @example
 * <FormLabel>Email Address</FormLabel>
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  function FormLabel(props, ref) {
    const {
      htmlFor: htmlForProp,
      id: idProp,
      required: requiredProp,
      error: errorProp,
      disabled: disabledProp,
      asChild = false,
      component,
      as,
      children,
      className,
      style,
      sx,
      ...rest
    } = props;

    const formField = useFormField();

    const htmlFor = htmlForProp ?? formField?.id;
    const id = idProp ?? formField?.labelId;
    const required = requiredProp ?? formField?.required ?? false;
    const error = errorProp ?? formField?.error ?? false;
    const disabled = disabledProp ?? formField?.disabled ?? false;

    const labelClassName = classNames(
      "cl-form-label",
      error && "cl-form-label--error",
      disabled && "cl-form-label--disabled",
      className
    );

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledLabelRoot
          as={Slot}
          ref={ref as React.Ref<HTMLLabelElement>}
          htmlFor={htmlFor}
          id={id}
          className={labelClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledLabelRoot>
      );
    }

    return (
      <StyledLabelRoot
        as={targetTag}
        ref={ref as React.Ref<HTMLLabelElement>}
        htmlFor={htmlFor}
        id={id}
        className={labelClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
        {required && (
          <span className="cl-form-label__asterisk" aria-hidden="true">*</span>
        )}
      </StyledLabelRoot>
    );
  }
);

FormLabel.displayName = "FormLabel";
