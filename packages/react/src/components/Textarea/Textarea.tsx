import * as React from "react";
import { styled } from "../../system/styled";
import type { SxProps } from "../../system/types";
import { Slot } from "../../primitives/Slot";

export type TextareaVariant = "outlined" | "filled" | "standard" | "unstyled";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaOwnerState {
  variant?: TextareaVariant | undefined;
  size?: TextareaSize | undefined;
  fullWidth?: boolean | undefined;
  error?: boolean | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  autoResize?: boolean | undefined;
  resize?: TextareaResize | undefined;
  hasCount?: boolean | undefined;
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "color">,
    TextareaOwnerState {
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
   * Minimum visible text lines when autoResize is enabled
   * @default 3
   */
  minRows?: number | undefined;
  /**
   * Maximum visible text lines before scrollbars appear when autoResize is enabled
   */
  maxRows?: number | undefined;
  /**
   * If true, displays live character counter below the input
   * @default false
   */
  showCount?: boolean | undefined;
  /**
   * Ref forwarded directly to native <textarea> element
   */
  textareaRef?: React.Ref<HTMLTextAreaElement>;
}

const StyledTextareaContainer = styled("div", {
  name: "ChellaaTextarea",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "size" &&
    prop !== "fullWidth" &&
    prop !== "error" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "autoResize" &&
    prop !== "resize" &&
    prop !== "hasCount" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: TextareaOwnerState }>(({ theme, ownerState }) => {
  const size = ownerState.size ?? "md";
  const variant = ownerState.variant ?? "outlined";
  const isError = ownerState.error;
  const isDisabled = ownerState.disabled;

  const fontMap: Record<TextareaSize, string> = {
    sm: "0.8125rem",
    md: "0.875rem",
    lg: "1rem",
  };

  const paddingMap: Record<TextareaSize, string> = {
    sm: "8px 10px",
    md: "10px 12px",
    lg: "12px 16px",
  };

  const baseStyles: Record<string, any> = {
    display: "inline-flex",
    flexDirection: "column",
    position: "relative",
    width: ownerState.fullWidth ? "100%" : "auto",
    fontFamily: theme.typography.fontFamily,
    fontSize: fontMap[size],
    boxSizing: "border-box",
    transition: "border-color 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
  };

  if (variant === "unstyled") {
    return {
      ...baseStyles,
    };
  }

  if (variant === "outlined") {
    return {
      ...baseStyles,
      borderRadius: theme.shape?.borderRadius ?? 4,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${isError ? theme.palette.error.main : theme.palette.divider}`,
      padding: paddingMap[size],
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
      padding: paddingMap[size],
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
      padding: `${paddingMap[size].split(" ")[0]} 0`,
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

const StyledNativeTextarea = styled("textarea", {
  name: "ChellaaTextarea",
  slot: "Input",
})<{ ownerState: TextareaOwnerState }>(({ theme, ownerState }) => {
  const resizeMode = ownerState.autoResize ? "none" : (ownerState.resize ?? "vertical");

  return {
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: 0,
    border: 0,
    boxSizing: "border-box",
    background: "none",
    margin: 0,
    WebkitTapHighlightColor: "transparent",
    display: "block",
    minWidth: 0,
    width: "100%",
    outline: 0,
    resize: resizeMode,
    lineHeight: 1.5,
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.6,
    },
    "&:disabled": {
      cursor: "not-allowed",
    },
  };
});

const StyledCharacterCount = styled("div", {
  shouldForwardProp: (prop) => prop !== "isOverLimit",
})<{ isOverLimit?: boolean }>(({ theme, isOverLimit }) => ({
  display: "flex",
  justifyContent: "flex-end",
  fontSize: "0.75rem",
  lineHeight: 1.4,
  marginTop: theme.spacing(0.5),
  color: isOverLimit ? theme.palette.error.main : theme.palette.text.secondary,
  fontWeight: isOverLimit ? 600 : 400,
  userSelect: "none",
}));

/**
 * Multi-line text entry primitive with auto-expansion, character counter,
 * and Material Design 3 surface styling.
 */
export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  function Textarea(props, ref) {
    const {
      asChild = false,
      component,
      as,
      variant = "outlined",
      size = "md",
      fullWidth = false,
      error = false,
      disabled = false,
      readOnly = false,
      autoResize = false,
      minRows = 3,
      maxRows,
      resize = "vertical",
      showCount = false,
      maxLength,
      textareaRef: textareaRefProp,
      value: valueProp,
      defaultValue,
      onChange,
      rows = 3,
      id,
      className,
      style,
      sx,
      ...restTextareaProps
    } = props;

    const [internalValue, setInternalValue] = React.useState<string>(() => {
      if (valueProp !== undefined) return String(valueProp);
      if (defaultValue !== undefined) return String(defaultValue);
      return "";
    });

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? String(valueProp ?? "") : internalValue;

    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleTextareaRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof textareaRefProp === "function") {
          textareaRefProp(node);
        } else if (textareaRefProp && "current" in textareaRefProp) {
          (textareaRefProp as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [textareaRefProp]
    );

    // Dynamic auto-growth calculation
    const adjustHeight = React.useCallback(() => {
      if (!autoResize || !innerRef.current) return;
      const el = innerRef.current;
      el.style.height = "auto";

      const lineHeight = size === "sm" ? 18.2 : size === "lg" ? 24 : 21;
      const minHeight = (minRows ?? 3) * lineHeight;
      const maxHeight = maxRows ? maxRows * lineHeight : undefined;

      let newHeight = Math.max(el.scrollHeight, minHeight);
      if (maxHeight && newHeight > maxHeight) {
        newHeight = maxHeight;
        el.style.overflowY = "auto";
      } else {
        el.style.overflowY = "hidden";
      }

      el.style.height = `${newHeight}px`;
    }, [autoResize, minRows, maxRows, size]);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight, currentValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
      adjustHeight();
    };

    const ownerState: TextareaOwnerState = {
      variant,
      size,
      fullWidth,
      error,
      disabled,
      readOnly,
      autoResize,
      resize,
      hasCount: showCount,
    };

    const isOverLimit = maxLength !== undefined && currentValue.length > maxLength;

    const countElement = showCount ? (
      <StyledCharacterCount isOverLimit={isOverLimit} id={id ? `${id}-count` : undefined}>
        {maxLength !== undefined ? `${currentValue.length} / ${maxLength}` : currentValue.length}
      </StyledCharacterCount>
    ) : null;

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledTextareaContainer
          as={Slot}
          ref={ref as any}
          ownerState={ownerState}
          className={className}
          style={style}
        >
          <StyledNativeTextarea
            ref={handleTextareaRef}
            id={id}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            value={valueProp}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={maxLength}
            aria-invalid={error ? true : undefined}
            ownerState={ownerState}
            {...restTextareaProps}
          />
          {countElement}
        </StyledTextareaContainer>
      );
    }

    return (
      <StyledTextareaContainer
        as={targetTag}
        ref={ref as any}
        ownerState={ownerState}
        className={className}
        style={style}
      >
        <StyledNativeTextarea
          ref={handleTextareaRef}
          id={id}
          rows={rows}
          disabled={disabled}
          readOnly={readOnly}
          value={valueProp}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          ownerState={ownerState}
          {...restTextareaProps}
        />
        {countElement}
      </StyledTextareaContainer>
    );
  }
);

Textarea.displayName = "Textarea";
