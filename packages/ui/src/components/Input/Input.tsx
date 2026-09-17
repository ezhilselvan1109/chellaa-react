import { forwardRef } from "react";

import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { inputCssText } from "./Input.style";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      invalid = false,
      disabled = false,
      className = "",
      ...restProps
    },
    ref
  ) => {
    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-input", inputCssText);
    }

    const classes = [
      "ch-input",
      `ch-input--${size}`,
      invalid ? "ch-input--invalid" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        className={classes}
        disabled={disabled}
        aria-invalid={invalid ? "true" : undefined}
        {...restProps}
      />
    );
  }
);

Input.displayName = "Input";
