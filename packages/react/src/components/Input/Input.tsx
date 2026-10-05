import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";
import { useFormField } from "../FormField/FormFieldContext";

export type InputVariant = "outlined" | "filled" | "standard" | "unstyled";
export type InputSize = "sm" | "md" | "lg";

export interface InputOwnerState {
  variant?: InputVariant | undefined;
  size?: InputSize | undefined;
  fullWidth?: boolean | undefined;
  error?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  hasStartAdornment?: boolean | undefined;
  hasEndAdornment?: boolean | undefined;
  focused?: boolean | undefined;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    InputOwnerState {
  /**
   * If true, delegate rendering to immediate child element using Slot
   */
  asChild?: boolean | undefined;
  /**
   * The underlying HTML element or component for root wrapper
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
  /**
   * Content rendered at the start of the input track
   */
  startAdornment?: React.ReactNode | undefined;
  /**
   * Content rendered at the end of the input track
   */
  endAdornment?: React.ReactNode | undefined;
  /**
   * If true, displays an interactive clear button when text is present
   * @default false
   */
  clearable?: boolean | undefined;
  /**
   * Callback fired when the clear button is clicked
   */
  onClear?: () => void;
  /**
   * Ref forwarded directly to the native <input> element
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

// ---------------------------------------------------------------------------
// 1. Raw Headless InputBase Primitive
// ---------------------------------------------------------------------------
export const InputBase = styled("input", {
  name: "ChellaaInputBase",
  slot: "Input",
})<{ ownerState?: InputOwnerState }>(({ theme }) => ({
  font: "inherit",
  letterSpacing: "inherit",
  color: "currentColor",
  padding: 0,
  border: 0,
  boxSizing: "border-box",
  background: "none",
  height: "100%",
  margin: 0,
  WebkitTapHighlightColor: "transparent",
  display: "block",
  minWidth: 0,
  width: "100%",
  outline: 0,
  "&::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 0.6,
  },
  "&::-webkit-search-decoration, &::-webkit-search-cancel-button": {
    display: "none",
  },
}));

// ---------------------------------------------------------------------------
// 2. Styled Root Container
// ---------------------------------------------------------------------------
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
    prop !== "component",
})<{ ownerState: InputOwnerState }>(({ theme, ownerState }) => {
  const size = ownerState.size ?? "md";
  const variant = ownerState.variant ?? "outlined";
  const isError = ownerState.error;
  const isDisabled = ownerState.disabled;

  const heightMap: Record<InputSize, number> = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const paddingMap: Record<InputSize, string> = {
    sm: "0 10px",
    md: "0 12px",
    lg: "0 16px",
  };

  const fontMap: Record<InputSize, string> = {
    sm: "0.8125rem",
    md: "0.875rem",
    lg: "1rem",
  };

  const baseStyles: Record<string, any> = {
    fontFamily: theme.typography.fontFamily,
    fontSize: fontMap[size],
    lineHeight: 1.5,
    color: theme.palette.text.primary,
    boxSizing: "border-box",
    position: "relative",
    cursor: "text",
    display: "inline-flex",
    alignItems: "center",
    width: ownerState.fullWidth ? "100%" : "auto",
    minHeight: heightMap[size],
    padding: paddingMap[size],
    transition: "border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
  };

  if (variant === "unstyled") {
    return {
      ...baseStyles,
      padding: 0,
      minHeight: "auto",
    };
  }

  if (variant === "outlined") {
    return {
      ...baseStyles,
      borderRadius: theme.shape?.borderRadius ?? 4,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`,
      "&:hover:not(:has(:disabled))": {
        borderColor: isError ? theme.palette.error.main : theme.palette.text.primary,
      },
      "&:focus-within": {
        borderColor: isError ? theme.palette.error.main : theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${isError ? theme.palette.error.main : theme.palette.primary.main}25`,
      },
      ...(isDisabled && {
        opacity: 0.38,
        cursor: "not-allowed",
        backgroundColor: theme.palette.action.disabledBackground,
      }),
    };
  }

  if (variant === "filled") {
    return {
      ...baseStyles,
      borderTopLeftRadius: theme.shape?.borderRadius ?? 4,
      borderTopRightRadius: theme.shape?.borderRadius ?? 4,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: theme.palette.action.hover,
      borderBottom: `2px solid ${isError ? theme.palette.error.main : theme.palette.divider}`,
      "&:hover:not(:has(:disabled))": {
        backgroundColor: theme.palette.action.selected,
      },
      "&:focus-within": {
        backgroundColor: theme.palette.action.selected,
        borderBottomColor: isError ? theme.palette.error.main : theme.palette.primary.main,
      },
      ...(isDisabled && {
        opacity: 0.38,
        cursor: "not-allowed",
        backgroundColor: theme.palette.action.disabledBackground,
      }),
    };
  }

  if (variant === "standard") {
    return {
      ...baseStyles,
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: "transparent",
      borderBottom: `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`,
      "&:hover:not(:has(:disabled))": {
        borderBottomColor: isError ? theme.palette.error.main : theme.palette.text.primary,
      },
      "&:focus-within": {
        borderBottom: `2px solid ${isError ? theme.palette.error.main : theme.palette.primary.main}`,
      },
      ...(isDisabled && {
        opacity: 0.38,
        cursor: "not-allowed",
      }),
    };
  }

  return baseStyles;
});

// Clear Button Styling
const ClearButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  padding: 2,
  margin: 0,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  borderRadius: "50%",
  transition: "background-color 150ms ease, color 150ms ease",
  marginLeft: theme.spacing(0.5),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

/**
 * Single-line text entry primitive with Material Design 3 surface variants,
 * adornments, and responsive size scaling.
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
        // Create synthetic change event
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

    const ownerState: InputOwnerState = {
      variant,
      size,
      fullWidth,
      error,
      disabled,
      readOnly,
      hasStartAdornment: Boolean(startAdornment),
      hasEndAdornment: Boolean(endAdornment || (clearable && currentValue.length > 0)),
    };

    const targetTag = component || as;

    const showClear = clearable && !disabled && !readOnly && currentValue.length > 0;

    const clearButton = showClear ? (
      <ClearButton
        type="button"
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
      </ClearButton>
    ) : null;

    if (asChild) {
      return (
        <StyledInputRoot
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          className={className}
          style={style}
          onClick={handleWrapperClick}
        >
          {startAdornment}
          <InputBase
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
            ownerState={ownerState}
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
        ref={ref as any}
        ownerState={ownerState}
        className={className}
        style={style}
        onClick={handleWrapperClick}
      >
        {startAdornment}
        <InputBase
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
          ownerState={ownerState}
          {...restInputProps}
        />
        {clearButton}
        {endAdornment}
      </StyledInputRoot>
    );
  }
);

Input.displayName = "Input";
