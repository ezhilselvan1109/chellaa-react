import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
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
})<{ required?: boolean; error?: boolean; disabled?: boolean }>(
  ({ theme, error, disabled }) => ({
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.4,
    marginBottom: theme.spacing(0.75),
    color: error
      ? theme.palette.error.main
      : disabled
        ? theme.palette.text.secondary
        : theme.palette.text.primary,
    userSelect: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    "& .ChellaaFormLabel-requiredAsterisk": {
      color: theme.palette.error.main,
      marginLeft: 4,
    },
  })
);

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

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledLabelRoot
          as={Slot}
          ref={ref as any}
          htmlFor={htmlFor}
          id={id}
          required={required}
          error={error}
          disabled={disabled}
          className={className}
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
        ref={ref as any}
        htmlFor={htmlFor}
        id={id}
        required={required}
        error={error}
        disabled={disabled}
        className={className}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
        {required && (
          <span className="ChellaaFormLabel-requiredAsterisk">*</span>
        )}
      </StyledLabelRoot>
    );
  }
);

FormLabel.displayName = "FormLabel";
