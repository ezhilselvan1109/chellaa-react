import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { useFormField } from "../FormField/FormFieldContext";
import type {
  SwitchProps,
  SwitchSize,
  SwitchColorScheme,
  SwitchLabelPlacement,
} from "./Switch.types";
import type { ChellaaTheme } from "../../theme/types";

function getColorSchemeAccent(
  theme: ChellaaTheme,
  scheme: SwitchColorScheme
): string {
  if (scheme === "default") {
    return theme.palette.text.primary;
  }
  const color = theme.palette[scheme];
  return color?.main || theme.palette.primary.main;
}

const switchMetrics: Record<
  SwitchSize,
  {
    trackWidth: number;
    trackHeight: number;
    thumbSize: number;
    offset: number;
    slide: number;
    fontSize: string;
    gap: number;
  }
> = {
  sm: {
    trackWidth: 32,
    trackHeight: 18,
    thumbSize: 14,
    offset: 2,
    slide: 14,
    fontSize: "0.875rem",
    gap: 8,
  },
  md: {
    trackWidth: 44,
    trackHeight: 24,
    thumbSize: 18,
    offset: 3,
    slide: 20,
    fontSize: "1rem",
    gap: 10,
  },
  lg: {
    trackWidth: 56,
    trackHeight: 30,
    thumbSize: 24,
    offset: 3,
    slide: 26,
    fontSize: "1.125rem",
    gap: 12,
  },
};

const placementFlexMap: Record<
  SwitchLabelPlacement,
  { direction: string; align: string }
> = {
  end: { direction: "row", align: "center" },
  start: { direction: "row-reverse", align: "center" },
  top: { direction: "column-reverse", align: "flex-start" },
  bottom: { direction: "column", align: "flex-start" },
};

interface StyledSwitchRootProps {
  size: SwitchSize;
  labelPlacement: SwitchLabelPlacement;
  disabled: boolean;
}

const StyledSwitchRoot = styled("label", {
  name: "ChellaaSwitch",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "labelPlacement" &&
    prop !== "disabled" &&
    prop !== "asChild" &&
    prop !== "component",
})<StyledSwitchRootProps>(({ size, labelPlacement, disabled }) => {
  const metrics = switchMetrics[size] || switchMetrics.md;
  const placement = placementFlexMap[labelPlacement] || placementFlexMap.end;

  return {
    display: "inline-flex",
    flexDirection: placement.direction as any,
    alignItems: placement.align as any,
    verticalAlign: "middle",
    position: "relative",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    gap: metrics.gap,
    lineHeight: 1.5,
  };
});

const StyledHiddenInput = styled("input", {
  name: "ChellaaSwitch",
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

interface StyledTrackProps {
  size: SwitchSize;
  colorScheme: SwitchColorScheme;
  checked: boolean;
  error: boolean;
  disabled: boolean;
}

const StyledTrack = styled("span", {
  name: "ChellaaSwitch",
  slot: "Track",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "colorScheme" &&
    prop !== "checked" &&
    prop !== "error" &&
    prop !== "disabled",
})<StyledTrackProps>(({ theme, size, colorScheme, checked, error, disabled }) => {
  const metrics = switchMetrics[size] || switchMetrics.md;
  const accent = getColorSchemeAccent(theme, colorScheme);

  const uncheckedBg =
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.2)"
      : "rgba(0, 0, 0, 0.16)";

  const backgroundColor = error
    ? theme.palette.error.main
    : checked
      ? accent
      : uncheckedBg;

  return {
    display: "inline-flex",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
    width: metrics.trackWidth,
    height: metrics.trackHeight,
    borderRadius: 9999,
    backgroundColor,
    flexShrink: 0,
    transition:
      "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms ease-in-out",

    ...(!disabled && {
      "label:hover &": {
        boxShadow: `0 0 0 ${size === "lg" ? 8 : 6}px ${accent}1A`,
      },
    }),

    "input:focus-visible + &": {
      outline: `2px solid ${accent}`,
      outlineOffset: 2,
      boxShadow: `0 0 0 4px ${accent}2A`,
    },
  };
});

interface StyledThumbProps {
  size: SwitchSize;
  checked: boolean;
  loading: boolean;
}

const StyledThumb = styled("span", {
  name: "ChellaaSwitch",
  slot: "Thumb",
  shouldForwardProp: (prop) =>
    prop !== "size" && prop !== "checked" && prop !== "loading",
})<StyledThumbProps>(({ size, checked }) => {
  const metrics = switchMetrics[size] || switchMetrics.md;

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: metrics.offset,
    top: metrics.offset,
    width: metrics.thumbSize,
    height: metrics.thumbSize,
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25), 0 1px 1px rgba(0, 0, 0, 0.12)",
    transform: checked ? `translateX(${metrics.slide}px)` : "translateX(0)",
    transition:
      "transform 200ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms ease-out",
    color: "#475569",

    "label:active &": {
      width: metrics.thumbSize + (size === "lg" ? 4 : 2),
    },

    "@keyframes ChellaaSwitch-spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  };
});

interface StyledLabelTextProps {
  size: SwitchSize;
  disabled: boolean;
}

const StyledLabelText = styled("span", {
  name: "ChellaaSwitch",
  slot: "Label",
  shouldForwardProp: (prop) => prop !== "size" && prop !== "disabled",
})<StyledLabelTextProps>(({ theme, size, disabled }) => {
  const metrics = switchMetrics[size] || switchMetrics.md;

  return {
    fontSize: metrics.fontSize,
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  };
});

/**
 * Switch primitive representing an immediate binary toggle setting.
 * Conforms to the W3C WAI-ARIA 1.2 Switch Pattern (`role="switch"`).
 *
 * @example
 * <Switch defaultChecked>Enable Notifications</Switch>
 */
export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  function Switch(props, ref) {
    const formField = useFormField();

    const {
      checked: checkedProp,
      defaultChecked = false,
      onChange: onChangeProp,
      value,
      name: nameProp,
      size = "md",
      colorScheme = "primary",
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      error: errorProp,
      loading = false,
      checkedIcon,
      uncheckedIcon,
      labelPlacement = "end",
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

    const disabled =
      disabledProp ?? formField?.disabled ?? loading ? true : false;
    const readOnly = readOnlyProp ?? formField?.readOnly ?? false;
    const error = errorProp ?? formField?.error ?? false;
    const required = requiredProp ?? formField?.required ?? false;
    const name = nameProp ?? formField?.name;
    const id = idProp ?? (formField ? `${formField.id}-switch` : undefined);

    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(
      defaultChecked
    );

    const isControlled = checkedProp !== undefined;
    const effectiveChecked = isControlled ? checkedProp : uncontrolledChecked;

    const nativeInputRef = React.useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMergeRefs(nativeInputRef, inputRefProp);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly || loading) {
        event.preventDefault();
        return;
      }

      if (!isControlled) {
        setUncontrolledChecked(event.target.checked);
      }

      onChangeProp?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        nativeInputRef.current?.click();
      }
      inputProps.onKeyDown?.(event);
    };

    const targetTag = component || as;

    const thumbIcon = loading ? (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        style={{
          width: "70%",
          height: "70%",
          animation: "ChellaaSwitch-spin 800ms linear infinite",
        }}
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="40 20"
          strokeLinecap="round"
        />
      </svg>
    ) : effectiveChecked ? (
      checkedIcon
    ) : (
      uncheckedIcon
    );

    const trackControl = (
      <StyledTrack
        className="ChellaaSwitch-Track"
        size={size}
        colorScheme={colorScheme}
        checked={effectiveChecked}
        error={error}
        disabled={disabled}
      >
        <StyledThumb
          className="ChellaaSwitch-Thumb"
          size={size}
          checked={effectiveChecked}
          loading={loading}
        >
          {thumbIcon}
        </StyledThumb>
      </StyledTrack>
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
        <StyledSwitchRoot
          as={Slot}
          ref={ref as any}
          size={size}
          labelPlacement={labelPlacement}
          disabled={disabled}
          className={className}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledSwitchRoot>
      );
    }

    return (
      <StyledSwitchRoot
        as={targetTag}
        ref={ref as any}
        size={size}
        labelPlacement={labelPlacement}
        disabled={disabled}
        className={className}
        style={style}
        sx={sx}
        {...rest}
      >
        <StyledHiddenInput
          type="checkbox"
          role="switch"
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          checked={isControlled ? effectiveChecked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={mergedInputRef}
          aria-checked={effectiveChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={ariaDescribedBy}
          {...inputProps}
        />
        {trackControl}
        {children && (
          <StyledLabelText
            className="ChellaaSwitch-Label"
            size={size}
            disabled={disabled}
          >
            {children}
          </StyledLabelText>
        )}
      </StyledSwitchRoot>
    );
  }
);

Switch.displayName = "Switch";
