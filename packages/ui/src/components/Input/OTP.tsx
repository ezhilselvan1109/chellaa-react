import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { inputCssText } from "./Input.style";
import type { OTPProps, OTPSemanticDOM, InputRef } from "./Input.types";

export const OTP = forwardRef<InputRef, OTPProps>((props, ref) => {
  const {
    length = 6,
    defaultValue = "",
    value: controlledValue,
    disabled = false,
    status,
    size = "medium",
    variant = "outlined",
    mask = false,
    formatter,
    separator,
    autoFocus = false,
    onChange,
    onInput,
    autoComplete = "one-time-code",
    rootClassName,
    className = "",
    style,
    classNames,
    styles,
  } = props;

  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
    injectStyle("ch-input", inputCssText);
  }

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize values
  const initValues = (val: string): string[] => {
    const arr = new Array(length).fill("");
    for (let i = 0; i < Math.min(val.length, length); i++) {
      arr[i] = val[i];
    }
    return arr;
  };

  const [uncontrolledValues, setUncontrolledValues] = useState<string[]>(() =>
    initValues(defaultValue)
  );

  const isControlled = controlledValue !== undefined;
  const currentValues = isControlled
    ? initValues(controlledValue)
    : uncontrolledValues;

  // Sync ref
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRefs.current[0]?.focus();
    },
    blur: () => {
      inputRefs.current.forEach((input) => input?.blur());
    },
    get nativeElement() {
      return inputRefs.current[0] || null;
    },
  }));

  // Auto focus first cell
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const normalizedSize: string =
    size === "lg" || size === "large"
      ? "lg"
      : size === "sm" || size === "small"
      ? "sm"
      : "md";

  const resolvedClassNames: Partial<Record<OTPSemanticDOM, string>> =
    typeof classNames === "function" ? classNames({ props }) : classNames || {};
  const resolvedStyles: Partial<Record<OTPSemanticDOM, React.CSSProperties>> =
    typeof styles === "function" ? styles({ props }) : styles || {};

  const triggerChange = (newValues: string[]) => {
    onInput?.(newValues);
    const fullString = newValues.join("");
    if (newValues.every((v) => v !== "") && fullString.length === length) {
      onChange?.(fullString);
    }
  };

  const handleCellChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawVal = e.target.value;
    const lastChar = rawVal.slice(-1);
    const formattedChar = formatter ? formatter(lastChar) : lastChar;

    const nextValues = [...currentValues];
    nextValues[index] = formattedChar;

    if (!isControlled) {
      setUncontrolledValues(nextValues);
    }
    triggerChange(nextValues);

    // Auto advance if character entered
    if (formattedChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!currentValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    startIndex: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!pasteData) return;

    const nextValues = [...currentValues];
    let writeIndex = startIndex;

    for (let i = 0; i < pasteData.length && writeIndex < length; i++) {
      const rawChar = pasteData[i] ?? "";
      const char = formatter ? formatter(rawChar) : rawChar;
      nextValues[writeIndex] = char;
      writeIndex++;
    }

    if (!isControlled) {
      setUncontrolledValues(nextValues);
    }
    triggerChange(nextValues);

    const focusTarget = Math.min(writeIndex, length - 1);
    inputRefs.current[focusTarget]?.focus();
  };

  const wrapperClasses = [
    "ch-input-otp",
    rootClassName,
    className,
    resolvedClassNames.root,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      style={{ ...style, ...resolvedStyles.root }}
    >
      {Array.from({ length }).map((_, index) => {
        const val = currentValues[index] || "";
        const displayVal = mask
          ? val
            ? typeof mask === "string"
              ? mask
              : "•"
            : ""
          : val;

        const cellClasses = [
          "ch-input-otp-input",
          `ch-input-otp-input--${normalizedSize}`,
          `ch-input--variant-${variant}`,
          status && `ch-input--status-${status}`,
          resolvedClassNames.input,
        ]
          .filter(Boolean)
          .join(" ");

        const separatorNode =
          separator && index < length - 1 ? (
            <span
              key={`sep-${index}`}
              className={`ch-input-otp-separator ${
                resolvedClassNames.separator || ""
              }`}
              style={resolvedStyles.separator}
            >
              {typeof separator === "function" ? separator(index) : separator}
            </span>
          ) : null;

        return (
          <React.Fragment key={index}>
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type={mask ? "password" : "text"}
              maxLength={1}
              autoComplete={index === 0 ? autoComplete : "off"}
              disabled={disabled}
              value={displayVal}
              className={cellClasses}
              style={resolvedStyles.input}
              onChange={(e) => handleCellChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
            />
            {separatorNode}
          </React.Fragment>
        );
      })}
    </div>
  );
});

OTP.displayName = "Input.OTP";
