import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useRadioGroup } from "./RadioContext";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  RadioProps,
  RadioSize,
  RadioColorScheme,
} from "./Radio.types";
import type { ChellaaTheme } from "../../theme/types";

function getColorSchemeAccent(
  theme: ChellaaTheme,
  scheme: RadioColorScheme
): string {
  if (scheme === "default") {
    return theme.palette.text.primary;
  }
  const color = theme.palette[scheme];
  return color?.main || theme.palette.primary.main;
}

const sizeConfig: Record<
  RadioSize,
  { boxSize: number; dotSize: number; fontSize: string; gap: number }
> = {
  sm: { boxSize: 16, dotSize: 6, fontSize: "0.875rem", gap: 8 },
  md: { boxSize: 20, dotSize: 8, fontSize: "1rem", gap: 10 },
  lg: { boxSize: 24, dotSize: 10, fontSize: "1.125rem", gap: 12 },
};

interface StyledRadioRootProps {
  size: RadioSize;
  disabled: boolean;
}

const StyledRadioRoot = styled("label", {
  name: "ChellaaRadio",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "error" &&
    prop !== "checked" &&
    prop !== "asChild" &&
    prop !== "component",
})<StyledRadioRootProps>(({ size, disabled }) => {
  const config = sizeConfig[size] || sizeConfig.md;

  return {
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
    position: "relative",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    gap: config.gap,
    lineHeight: 1.5,
  };
});

const StyledHiddenInput = styled("input", {
  name: "ChellaaRadio",
  slot: "Input",
})({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
});

interface StyledControlBoxProps {
  size: RadioSize;
  colorScheme: RadioColorScheme;
  checked: boolean;
  error: boolean;
  disabled: boolean;
}

const StyledControlBox = styled("span", {
  name: "ChellaaRadio",
  slot: "Control",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "checked" &&
    prop !== "error" &&
    prop !== "disabled",
})<StyledControlBoxProps>(
  ({ theme, size, colorScheme, checked, error, disabled }) => {
    const config = sizeConfig[size] || sizeConfig.md;
    const accent = getColorSchemeAccent(theme, colorScheme);

    const borderColor = error
      ? theme.palette.error.main
      : checked
        ? accent
        : theme.palette.text.secondary;

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      width: config.boxSize,
      height: config.boxSize,
      borderRadius: "50%",
      border: `2px solid ${borderColor}`,
      backgroundColor: "transparent",
      flexShrink: 0,
      transition:
        "border-color 150ms ease-in-out, box-shadow 150ms ease-in-out, transform 100ms ease-out",

      ...(!disabled && {
        "label:hover &": {
          boxShadow: `0 0 0 ${size === "lg" ? 10 : 8}px ${accent}1A`,
          ...(!checked && !error && {
            borderColor: accent,
          }),
        },
        "label:active &": {
          transform: "scale(0.92)",
        },
      }),

      "input:focus-visible + &": {
        outline: `2px solid ${accent}`,
        outlineOffset: 2,
        boxShadow: `0 0 0 4px ${accent}2A`,
      },
    };
  }
);

interface StyledDotProps {
  size: RadioSize;
  colorScheme: RadioColorScheme;
  checked: boolean;
  error: boolean;
}

const StyledDot = styled("span", {
  name: "ChellaaRadio",
  slot: "Dot",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "checked" &&
    prop !== "error",
})<StyledDotProps>(({ theme, size, colorScheme, checked, error }) => {
  const config = sizeConfig[size] || sizeConfig.md;
  const accent = getColorSchemeAccent(theme, colorScheme);
  const dotColor = error ? theme.palette.error.main : accent;

  return {
    display: "block",
    width: config.dotSize,
    height: config.dotSize,
    borderRadius: "50%",
    backgroundColor: dotColor,
    transform: checked ? "scale(1)" : "scale(0)",
    opacity: checked ? 1 : 0,
    transition:
      "transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms ease-in-out",
  };
});

interface StyledLabelTextProps {
  size: RadioSize;
  disabled: boolean;
}

const StyledLabelText = styled("span", {
  name: "ChellaaRadio",
  slot: "Label",
  shouldForwardProp: (prop) => prop !== "size" && prop !== "disabled",
})<StyledLabelTextProps>(({ theme, size, disabled }) => {
  const config = sizeConfig[size] || sizeConfig.md;

  return {
    fontSize: config.fontSize,
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  };
});

/**
 * Radio primitive for single-choice selection with animated circular dot indicator,
 * accessible keyboard arrow navigation, and automatic RadioGroup / FormField binding.
 *
 * @example
 * <Radio value="express">Express Delivery</Radio>
 */
export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  function Radio(props, ref) {
    const group = useRadioGroup();
    const formField = useFormField();

    const {
      checked: checkedProp,
      defaultChecked = false,
      onChange: onChangeProp,
      value: valueProp,
      name: nameProp,
      size: sizeProp,
      colorScheme: colorSchemeProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      error: errorProp,
      inputRef: inputRefProp,
      inputProps = {},
      asChild = false,
      component,
      as,
      children,
      className,
      style,
      sx,
      id: idProp,
      ...rest
    } = props;

    const isGroupControlled = group !== undefined && valueProp !== undefined;
    const isCheckedInGroup = isGroupControlled
      ? group.value !== undefined && String(group.value) === String(valueProp)
      : undefined;

    const checked =
      checkedProp !== undefined ? checkedProp : isCheckedInGroup;

    const size = sizeProp ?? group?.size ?? "md";
    const colorScheme = colorSchemeProp ?? group?.colorScheme ?? "primary";
    const disabled =
      disabledProp ?? group?.disabled ?? formField?.disabled ?? false;
    const readOnly =
      readOnlyProp ?? group?.readOnly ?? formField?.readOnly ?? false;
    const error = errorProp ?? group?.error ?? formField?.error ?? false;
    const required = requiredProp ?? formField?.required ?? false;
    const name = nameProp ?? group?.name ?? formField?.name;
    const id = idProp ?? (formField ? `${formField.id}-radio-${valueProp ?? ""}` : undefined);

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
      defaultChecked
    );

    const isControlled = checked !== undefined;
    const effectiveChecked = isControlled ? checked : uncontrolledChecked;

    const nativeInputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMergeRefs(nativeInputRef, inputRefProp);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        event.preventDefault();
        return;
      }

      if (isGroupControlled && valueProp !== undefined) {
        group.onChange(valueProp);
      } else if (!isControlled) {
        setUncontrolledChecked(event.target.checked);
      }

      onChangeProp?.(event);
    };

    const targetTag = component || as;

    const controlBox = (
      <StyledControlBox
        className="ChellaaRadio-Control"
        size={size}
        colorScheme={colorScheme}
        checked={effectiveChecked}
        error={error}
        disabled={disabled}
      >
        <StyledDot
          className="ChellaaRadio-Dot"
          size={size}
          colorScheme={colorScheme}
          checked={effectiveChecked}
          error={error}
        />
      </StyledControlBox>
    );

    const ariaDescribedBy = [
      inputProps["aria-describedby"],
      formField?.error && formField?.hasErrorMessage ? formField.errorMessageId : null,
      formField?.hasHelperText ? formField.helperTextId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    if (asChild) {
      return (
        <StyledRadioRoot
          as={Slot}
          ref={ref as any}
          size={size}
          disabled={disabled}
          className={className}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledRadioRoot>
      );
    }

    return (
      <StyledRadioRoot
        as={targetTag}
        ref={ref as any}
        size={size}
        disabled={disabled}
        className={className}
        style={style}
        sx={sx}
        {...rest}
      >
        <StyledHiddenInput
          type="radio"
          id={id}
          name={name}
          value={valueProp}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          checked={isControlled ? effectiveChecked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          ref={mergedInputRef}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy}
          {...inputProps}
        />
        {controlBox}
        {children && (
          <StyledLabelText
            className="ChellaaRadio-Label"
            size={size}
            disabled={disabled}
          >
            {children}
          </StyledLabelText>
        )}
      </StyledRadioRoot>
    );
  }
);

Radio.displayName = "Radio";
