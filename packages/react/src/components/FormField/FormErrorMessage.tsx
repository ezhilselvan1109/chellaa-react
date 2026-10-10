"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useFormField } from "./FormFieldContext";

export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * If true, forces the error message to mount even if error is false.
   * @default false
   */
  forceMount?: boolean | undefined;
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

const StyledErrorMessageRoot = styled("p", {
  name: "ChellaaFormErrorMessage",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "forceMount" && prop !== "asChild" && prop !== "component",
})({});

/**
 * Accessible error message primitive rendered conditionally when error is true,
 * possessing role="alert" for immediate screen reader announcement.
 *
 * @example
 * <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>
 */
export const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  FormErrorMessageProps
>(function FormErrorMessage(props, ref) {
  const {
    id: idProp,
    forceMount = false,
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
  const isError = formField?.error ?? false;
  const setHasErrorMessage = formField?.setHasErrorMessage;

  React.useEffect(() => {
    if (isError || forceMount) {
      setHasErrorMessage?.(true);
      return () => setHasErrorMessage?.(false);
    }
  }, [setHasErrorMessage, isError, forceMount]);

  if (!isError && !forceMount) {
    return null;
  }

  const id = idProp ?? formField?.errorMessageId;
  const targetTag = component || as;

  const errorClassName = classNames("cl-form-error-message", className);

  if (asChild) {
    return (
      <StyledErrorMessageRoot
        as={Slot}
        ref={ref as React.Ref<HTMLParagraphElement>}
        id={id}
        role="alert"
        aria-live="polite"
        className={errorClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledErrorMessageRoot>
    );
  }

  return (
    <StyledErrorMessageRoot
      as={targetTag}
      ref={ref as React.Ref<HTMLParagraphElement>}
      id={id}
      role="alert"
      aria-live="polite"
      className={errorClassName}
      style={style}
      sx={sx}
      {...rest}
    >
      {children}
    </StyledErrorMessageRoot>
  );
});

FormErrorMessage.displayName = "FormErrorMessage";
