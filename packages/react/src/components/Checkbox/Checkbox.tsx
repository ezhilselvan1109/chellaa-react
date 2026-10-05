import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useCheckboxGroup } from "./CheckboxContext";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  CheckboxProps,
  CheckboxSize,
  CheckboxColorScheme,
} from "./Checkbox.types";
import type { ChellaaTheme } from "../../theme/types";

function getColorSchemeAccent(
  theme: ChellaaTheme,
  scheme: CheckboxColorScheme
): string {
  if (scheme === "default") {
    return theme.palette.text.primary;
  }
  const color = theme.palette[scheme];
  return color?.main || theme.palette.primary.main;
}

const sizeConfig: Record<
  CheckboxSize,
  { boxSize: number; iconSize: number; fontSize: string; gap: number }
> = {
  sm: { boxSize: 16, iconSize: 12, fontSize: "0.875rem", gap: 8 },
  md: { boxSize: 20, iconSize: 14, fontSize: "1rem", gap: 10 },
  lg: { boxSize: 24, iconSize: 18, fontSize: "1.125rem", gap: 12 },
};

interface StyledCheckboxRootProps {
  size: CheckboxSize;
  disabled: boolean;
}

const StyledCheckboxRoot = styled("label", {
  name: "ChellaaCheckbox",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "disabled" &&
    prop !== "readOnly" &&
    prop !== "error" &&
    prop !== "checked" &&
    prop !== "indeterminate" &&
    prop !== "asChild" &&
    prop !== "component",
})<StyledCheckboxRootProps>(({ size, disabled }) => {
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
  name: "ChellaaCheckbox",
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
  size: CheckboxSize;
  colorScheme: CheckboxColorScheme;
  checked: boolean;
  indeterminate: boolean;
  error: boolean;
  disabled: boolean;
}

const StyledControlBox = styled("span", {
  name: "ChellaaCheckbox",
  slot: "Control",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "checked" &&
    prop !== "indeterminate" &&
    prop !== "error" &&
    prop !== "disabled",
})<StyledControlBoxProps>(
  ({ theme, size, colorScheme, checked, indeterminate, error, disabled }) => {
    const config = sizeConfig[size] || sizeConfig.md;
    const accent = getColorSchemeAccent(theme, colorScheme);
    const isFilled = checked || indeterminate;

    const borderColor = error
      ? theme.palette.error.main
      : isFilled
        ? accent
        : theme.palette.text.secondary;

    const backgroundColor = isFilled
      ? error
        ? theme.palette.error.main
        : accent
      : "transparent";

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      width: config.boxSize,
      height: config.boxSize,
      borderRadius: size === "lg" ? 6 : 4,
      border: `2px solid ${borderColor}`,
      backgroundColor,
      color: "#ffffff",
      flexShrink: 0,
      transition:
        "border-color 150ms ease-in-out, background-color 150ms ease-in-out, box-shadow 150ms ease-in-out, transform 100ms ease-out",

      "& svg": {
        width: config.iconSize,
        height: config.iconSize,
        display: "block",
        transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms",
      },

      ...(!disabled && {
        "label:hover &": {
          boxShadow: `0 0 0 ${size === "lg" ? 10 : 8}px ${accent}1A`,
          ...(!isFilled && !error && {
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

interface StyledLabelTextProps {
  size: CheckboxSize;
  disabled: boolean;
}

const StyledLabelText = styled("span", {
  name: "ChellaaCheckbox",
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
 * Checkbox primitive with tri-state selection, custom color palettes,
 * keyboard accessibility, and automatic CheckboxGroup / FormField binding.
 *
 * @example
 * <Checkbox defaultChecked>Subscribe to updates</Checkbox>
 * <Checkbox indeterminate>Select all items</Checkbox>
 */
export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const group = useCheckboxGroup();
    const formField = useFormField();

    const {
      checked: checkedProp,
      defaultChecked = false,
      indeterminate = false,
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

    // Cascade resolution: Props > Group > FormField > Defaults
    const isGroupControlled = group !== undefined && valueProp !== undefined;
    const isCheckedInGroup = isGroupControlled
      ? group.value.includes(valueProp)
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
    const id = idProp ?? (formField ? `${formField.id}-checkbox` : undefined);

    // Uncontrolled state fallback when neither checkedProp nor group is present
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
      defaultChecked
    );

    const isControlled = checked !== undefined;
    const effectiveChecked = isControlled ? checked : uncontrolledChecked;

    const nativeInputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMergeRefs(nativeInputRef, inputRefProp);

    // Keep DOM indeterminate state in sync with prop for screen reader announcement
    React.useEffect(() => {
      if (nativeInputRef.current) {
        nativeInputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        event.preventDefault();
        return;
      }

      if (isGroupControlled) {
        group.toggleValue(valueProp);
      } else if (!isControlled) {
        setUncontrolledChecked(event.target.checked);
      }

      onChangeProp?.(event);
    };

    const targetTag = component || as;

    const controlBox = (
      <StyledControlBox
        className="ChellaaCheckbox-Control"
        size={size}
        colorScheme={colorScheme}
        checked={effectiveChecked}
        indeterminate={indeterminate}
        error={error}
        disabled={disabled}
      >
        {indeterminate ? (
          <svg
            className="ChellaaCheckbox-Icon ChellaaCheckbox-Icon--indeterminate"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ) : effectiveChecked ? (
          <svg
            className="ChellaaCheckbox-Icon ChellaaCheckbox-Icon--checked"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : null}
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
        <StyledCheckboxRoot
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
        </StyledCheckboxRoot>
      );
    }

    return (
      <StyledCheckboxRoot
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
          type="checkbox"
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
          aria-checked={indeterminate ? "mixed" : effectiveChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy}
          {...inputProps}
        />
        {controlBox}
        {children && (
          <StyledLabelText
            className="ChellaaCheckbox-Label"
            size={size}
            disabled={disabled}
          >
            {children}
          </StyledLabelText>
        )}
      </StyledCheckboxRoot>
    );
  }
);

Checkbox.displayName = "Checkbox";
