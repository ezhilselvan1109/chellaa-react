import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { InternalInput } from "./InternalInput";
import type { PasswordProps, InputRef } from "./Input.types";

const defaultVisibleIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const defaultInvisibleIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const Password = forwardRef<InputRef, PasswordProps>((props, ref) => {
  const {
    visibilityToggle = true,
    iconRender,
    suffix,
    disabled,
    ...restProps
  } = props;

  const inputRef = useRef<InputRef>(null);
  const [internalVisible, setInternalVisible] = useState(false);

  const isConfigObject = typeof visibilityToggle === "object";
  const visible = isConfigObject && visibilityToggle.visible !== undefined
    ? visibilityToggle.visible
    : internalVisible;

  useImperativeHandle(ref, () => ({
    focus: (opt) => inputRef.current?.focus(opt),
    blur: () => inputRef.current?.blur(),
    get nativeElement() {
      return inputRef.current?.nativeElement || null;
    },
  }));

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    const next = !visible;
    if (!isConfigObject || visibilityToggle.visible === undefined) {
      setInternalVisible(next);
    }
    if (isConfigObject && visibilityToggle.onVisibleChange) {
      visibilityToggle.onVisibleChange(next);
    }
  };

  const renderIcon = () => {
    if (iconRender) {
      return iconRender(visible);
    }
    return visible ? defaultVisibleIcon : defaultInvisibleIcon;
  };

  const toggleNode = visibilityToggle ? (
    <span
      className="ch-input-password-toggle"
      tabIndex={-1}
      onClick={handleToggle}
    >
      {renderIcon()}
    </span>
  ) : null;

  return (
    <InternalInput
      {...restProps}
      ref={inputRef}
      disabled={disabled}
      type={visible ? "text" : "password"}
      suffix={
        <>
          {suffix}
          {toggleNode}
        </>
      }
    />
  );
});

Password.displayName = "Input.Password";
