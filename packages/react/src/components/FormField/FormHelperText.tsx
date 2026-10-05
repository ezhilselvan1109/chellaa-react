import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { useFormField } from "./FormFieldContext";

export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * If true, styles helper text in disabled state.
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

const StyledHelperTextRoot = styled("p", {
  name: "ChellaaFormHelperText",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "disabled" && prop !== "asChild" && prop !== "component",
})<{ disabled?: boolean }>(({ theme, disabled }) => ({
  fontSize: "0.75rem",
  lineHeight: 1.4,
  margin: 0,
  marginTop: theme.spacing(0.5),
  color: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
}));

/**
 * Contextual explanation text rendered beneath an input control,
 * automatically linked via aria-describedby.
 *
 * @example
 * <FormHelperText>We will never share your personal email.</FormHelperText>
 */
export const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>(function FormHelperText(props, ref) {
  const {
    id: idProp,
    disabled: disabledProp,
    asChild = false,
    component = "p",
    as,
    children,
    className,
    style,
    sx,
    ...rest
  } = props;

  const formField = useFormField();
  const setHasHelperText = formField?.setHasHelperText;

  React.useEffect(() => {
    setHasHelperText?.(true);
    return () => setHasHelperText?.(false);
  }, [setHasHelperText]);

  const id = idProp ?? formField?.helperTextId;
  const disabled = disabledProp ?? formField?.disabled ?? false;
  const targetTag = component || as;

  if (asChild) {
    return (
      <StyledHelperTextRoot
        as={Slot}
        ref={ref as any}
        id={id}
        disabled={disabled}
        className={className}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledHelperTextRoot>
    );
  }

  return (
    <StyledHelperTextRoot
      as={targetTag}
      ref={ref as any}
      id={id}
      disabled={disabled}
      className={className}
      style={style}
      sx={sx}
      {...rest}
    >
      {children}
    </StyledHelperTextRoot>
  );
});

FormHelperText.displayName = "FormHelperText";
