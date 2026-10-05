import * as React from "react";
import { styled } from "../../system/styled";
import { Input, type InputProps } from "./Input";

export interface TextFieldProps extends InputProps {
  /**
   * The label text displayed above the input.
   */
  label?: React.ReactNode | undefined;
  /**
   * Explanatory helper text displayed below the input.
   */
  helperText?: React.ReactNode | undefined;
  /**
   * Error message displayed below the input when error is true.
   */
  errorMessage?: React.ReactNode | undefined;
  /**
   * If true, displays a required asterisk next to the label and marks input required.
   * @default false
   */
  required?: boolean | undefined;
}

const StyledTextFieldRoot = styled("div", {
  name: "ChellaaTextField",
  slot: "Root",
  shouldForwardProp: (prop) => prop !== "fullWidth",
})<{ fullWidth?: boolean }>(({ fullWidth }) => ({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  width: fullWidth ? "100%" : "auto",
  verticalAlign: "top",
}));

const StyledLabel = styled("label")<{ required?: boolean; error?: boolean }>(
  ({ theme, error }) => ({
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.4,
    marginBottom: theme.spacing(0.75),
    color: error ? theme.palette.error.main : theme.palette.text.primary,
    userSelect: "none",
    "& .ChellaaTextField-requiredAsterisk": {
      color: theme.palette.error.main,
      marginLeft: 4,
    },
  })
);

const StyledHelperText = styled("p")<{ error?: boolean }>(
  ({ theme, error }) => ({
    fontSize: "0.75rem",
    lineHeight: 1.4,
    margin: 0,
    marginTop: theme.spacing(0.5),
    color: error ? theme.palette.error.main : theme.palette.text.secondary,
  })
);

/**
 * Enterprise composite form control combining label, input, helper text, and validation messaging.
 *
 * @example
 * <TextField
 *   label="Email Address"
 *   type="email"
 *   placeholder="user@example.com"
 *   helperText="We will never share your email."
 *   required
 * />
 */
export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  function TextField(props, ref) {
    const {
      id: idProp,
      label,
      helperText,
      errorMessage,
      error = false,
      required = false,
      fullWidth = false,
      className,
      style,
      sx,
      ...inputProps
    } = props;

    const generatedId = React.useId();
    const inputId = idProp || generatedId;
    const helperId = `${inputId}-helper`;

    const activeHelperContent = error && errorMessage ? errorMessage : helperText;

    return (
      <StyledTextFieldRoot
        ref={ref}
        fullWidth={fullWidth}
        className={className}
        style={style}
        sx={sx}
      >
        {label && (
          <StyledLabel htmlFor={inputId} error={error} required={required}>
            {label}
            {required && <span className="ChellaaTextField-requiredAsterisk">*</span>}
          </StyledLabel>
        )}

        <Input
          id={inputId}
          error={error}
          required={required}
          fullWidth={fullWidth}
          aria-describedby={activeHelperContent ? helperId : undefined}
          {...inputProps}
        />

        {activeHelperContent && (
          <StyledHelperText id={helperId} error={error}>
            {activeHelperContent}
          </StyledHelperText>
        )}
      </StyledTextFieldRoot>
    );
  }
);

TextField.displayName = "TextField";
