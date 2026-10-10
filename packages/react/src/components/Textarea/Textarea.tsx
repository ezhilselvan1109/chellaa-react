"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  TextareaProps,
  TextareaOwnerState,
  TextareaVariant,
  TextareaSize,
  TextareaResize,
} from "./Textarea.types";

export type {
  TextareaProps,
  TextareaOwnerState,
  TextareaVariant,
  TextareaSize,
  TextareaResize,
};

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
    prop !== "component" &&
    prop !== "ownerState",
})({});

/**
 * Multi-line plain text editing control with Material Design surface variants,
 * auto-expansion support, and character counter capabilities.
 */
export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  function Textarea(props, ref) {
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
      minRows = 3,
      maxRows,
      autoResize = false,
      resize = "vertical",
      showCount = false,
      maxLength,
      textareaRef: textareaRefProp,
      textareaProps = {},
      value: valueProp,
      defaultValue,
      onChange,
      id: idProp,
      className,
      style,
      sx,
      placeholder,
      name,
      rows,
      cols,
      autoFocus,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      "aria-describedby": ariaDescribedByProp,
      ...restContainerProps
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

    const [internalValue, setInternalValue] = React.useState<string>(() => {
      if (valueProp !== undefined) return String(valueProp);
      if (defaultValue !== undefined) return String(defaultValue);
      return "";
    });

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? String(valueProp ?? "") : internalValue;

    const innerTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleTextareaRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerTextareaRef.current = node;
        if (typeof textareaRefProp === "function") {
          textareaRefProp(node);
        } else if (textareaRefProp && "current" in textareaRefProp) {
          (textareaRefProp as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [textareaRefProp]
    );

    // Auto-resize calculation
    React.useLayoutEffect(() => {
      if (!autoResize || !innerTextareaRef.current) return;

      const textarea = innerTextareaRef.current;
      textarea.style.height = "auto";

      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20;
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;

      const calculatedHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight
      );

      textarea.style.height = `${calculatedHeight}px`;
      textarea.style.overflowY =
        maxRows && textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [currentValue, autoResize, minRows, maxRows]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    };

    const handleWrapperClick = () => {
      if (innerTextareaRef.current && document.activeElement !== innerTextareaRef.current) {
        innerTextareaRef.current.focus();
      }
    };

    const containerClassName = classNames(
      "cl-textarea",
      `cl-textarea--${variant}`,
      `cl-textarea--${size}`,
      fullWidth && "cl-textarea--full-width",
      error && "cl-textarea--error",
      disabled && "cl-textarea--disabled",
      className
    );

    const targetTag = component || as;

    const textareaStyle: React.CSSProperties = {
      resize: autoResize ? "none" : resize,
    };

    const countDisplay = showCount ? (
      <div className="cl-textarea__counter" aria-live="polite">
        {currentValue.length}
        {maxLength ? ` / ${maxLength}` : ""}
      </div>
    ) : null;

    if (asChild) {
      return (
        <StyledTextareaContainer
          as={Slot}
          ref={ref as React.Ref<HTMLDivElement>}
          className={containerClassName}
          style={style}
          sx={sx}
          onClick={handleWrapperClick}
          {...restContainerProps}
        >
          <textarea
            ref={handleTextareaRef}
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-describedby={ariaDescribedBy}
            aria-invalid={error ? true : undefined}
            value={valueProp}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={maxLength}
            rows={rows ?? minRows}
            cols={cols}
            autoFocus={autoFocus}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            style={textareaStyle}
            className="cl-textarea__input"
            {...textareaProps}
          />
          {countDisplay}
        </StyledTextareaContainer>
      );
    }

    return (
      <StyledTextareaContainer
        as={targetTag}
        ref={ref as React.Ref<HTMLDivElement>}
        className={containerClassName}
        style={style}
        sx={sx}
        onClick={handleWrapperClick}
        {...restContainerProps}
      >
        <textarea
          ref={handleTextareaRef}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-describedby={ariaDescribedBy}
          aria-invalid={error ? true : undefined}
          value={valueProp}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          rows={rows ?? minRows}
          cols={cols}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          style={textareaStyle}
          className="cl-textarea__input"
          {...textareaProps}
        />
        {countDisplay}
      </StyledTextareaContainer>
    );
  }
);

Textarea.displayName = "Textarea";
