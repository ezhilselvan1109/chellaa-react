import React from "react";

export type InputSize = "large" | "medium" | "small" | "lg" | "md" | "sm";

export type InputStatus = "error" | "warning";

export type InputVariant = "outlined" | "borderless" | "filled" | "underlined";

export type InputSemanticDOM = "root" | "prefix" | "input" | "suffix" | "clear" | "count";

export type TextAreaSemanticDOM = "root" | "textarea" | "clear" | "count";

export type SearchSemanticDOM =
  | "root"
  | "prefix"
  | "input"
  | "suffix"
  | "clear"
  | "count"
  | "button.root"
  | "button.icon"
  | "button.content";

export type PasswordSemanticDOM = "root" | "prefix" | "input" | "suffix" | "clear" | "count";

export type OTPSemanticDOM = "root" | "input" | "separator";

export interface CountConfig {
  /**
   * Max character count. Different from native maxLength, exceeding will show error/warning indicator.
   */
  max?: number;
  /**
   * Custom character count strategy, e.g. emoji counted as length 1.
   */
  strategy?: (value: string) => number;
  /**
   * Same as showCount, boolean or custom render formatter.
   */
  show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => React.ReactNode);
  /**
   * Custom clipping logic when number of characters exceeds count.max.
   */
  exceedFormatter?: (value: string, config: { max: number }) => string;
}

export interface InputFocusOptions {
  preventScroll?: boolean;
  cursor?: "start" | "end" | "all";
}

export interface InputRef {
  focus: (option?: InputFocusOptions) => void;
  blur: () => void;
  nativeElement: HTMLInputElement | null;
}

export interface TextAreaRef {
  focus: (option?: InputFocusOptions) => void;
  blur: () => void;
  nativeElement: HTMLTextAreaElement | null;
  resizableTextArea?: {
    textArea: HTMLTextAreaElement | null;
  };
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /**
   * Size of the input field.
   * @default "medium"
   */
  size?: InputSize;
  /**
   * Validation status.
   */
  status?: InputStatus;
  /**
   * Legacy prop for invalid/error state.
   * @default false
   */
  invalid?: boolean;
  /**
   * Visual variant.
   * @default "outlined"
   */
  variant?: InputVariant;
  /**
   * Leading icon or text prefix.
   */
  prefix?: React.ReactNode;
  /**
   * Trailing icon or text suffix.
   */
  suffix?: React.ReactNode;
  /**
   * Prefix label or selector attached before input.
   */
  addonBefore?: React.ReactNode;
  /**
   * Suffix label or button attached after input.
   */
  addonAfter?: React.ReactNode;
  /**
   * Show clear icon to remove input content.
   */
  allowClear?: boolean | { clearIcon?: React.ReactNode; disabled?: boolean };
  /**
   * Callback triggered when clear icon is clicked.
   */
  onClear?: () => void;
  /**
   * Character count configuration.
   */
  count?: CountConfig;
  /**
   * Whether to show character count.
   */
  showCount?:
    | boolean
    | {
        formatter: (info: {
          value: string;
          count: number;
          maxLength?: number;
        }) => React.ReactNode;
      };
  /**
   * Callback when Enter key is pressed.
   */
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * Additional root class name.
   */
  rootClassName?: string;
  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<InputSemanticDOM, string>>
    | ((info: { props: InputProps }) => Partial<Record<InputSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<InputSemanticDOM, React.CSSProperties>>
    | ((info: { props: InputProps }) => Partial<Record<InputSemanticDOM, React.CSSProperties>>);
}

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Size of the textarea field.
   * @default "medium"
   */
  size?: InputSize;
  /**
   * Validation status.
   */
  status?: InputStatus;
  /**
   * Legacy prop for invalid/error state.
   */
  invalid?: boolean;
  /**
   * Visual variant.
   * @default "outlined"
   */
  variant?: InputVariant;
  /**
   * Height auto size feature, can be set to true | false or { minRows?: number, maxRows?: number }.
   * @default false
   */
  autoSize?: boolean | AutoSizeType;
  /**
   * Show clear icon to remove content.
   */
  allowClear?: boolean | { clearIcon?: React.ReactNode; disabled?: boolean };
  /**
   * Callback triggered when clear icon is clicked.
   */
  onClear?: () => void;
  /**
   * Character count configuration.
   */
  count?: CountConfig;
  /**
   * Whether to show character count.
   */
  showCount?:
    | boolean
    | {
        formatter: (info: {
          value: string;
          count: number;
          maxLength?: number;
        }) => React.ReactNode;
      };
  /**
   * Callback when Enter key is pressed.
   */
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  /**
   * Additional root class name.
   */
  rootClassName?: string;
  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<TextAreaSemanticDOM, string>>
    | ((info: { props: TextAreaProps }) => Partial<Record<TextAreaSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<TextAreaSemanticDOM, React.CSSProperties>>
    | ((info: { props: TextAreaProps }) => Partial<Record<TextAreaSemanticDOM, React.CSSProperties>>);
}

export interface SearchProps extends InputProps {
  /**
   * Enter button configuration: boolean or custom ReactNode (e.g. string or custom button).
   * @default false
   */
  enterButton?: boolean | React.ReactNode;
  /**
   * Whether the search input is in loading state.
   * @default false
   */
  loading?: boolean;
  /**
   * Callback triggered when clicking search icon, clear button, or pressing Enter.
   */
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    info?: { source: "input" | "clear" }
  ) => void;
  /**
   * Custom search icon.
   */
  searchIcon?: React.ReactNode;
  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<SearchSemanticDOM, string>>
    | ((info: { props: SearchProps }) => Partial<Record<SearchSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<SearchSemanticDOM, React.CSSProperties>>
    | ((info: { props: SearchProps }) => Partial<Record<SearchSemanticDOM, React.CSSProperties>>);
}

export interface VisibilityToggle {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export interface PasswordProps extends InputProps {
  /**
   * Whether to show visibility toggle button.
   * @default true
   */
  visibilityToggle?: boolean | VisibilityToggle;
  /**
   * Custom visibility toggle icon render.
   */
  iconRender?: (visible: boolean) => React.ReactNode;
  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<PasswordSemanticDOM, string>>
    | ((info: { props: PasswordProps }) => Partial<Record<PasswordSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<PasswordSemanticDOM, React.CSSProperties>>
    | ((info: { props: PasswordProps }) => Partial<Record<PasswordSemanticDOM, React.CSSProperties>>);
}

export interface OTPProps {
  /**
   * Number of input elements.
   * @default 6
   */
  length?: number;
  /**
   * Default value (uncontrolled).
   */
  defaultValue?: string;
  /**
   * Current value (controlled).
   */
  value?: string;
  /**
   * Whether the OTP inputs are disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Validation status.
   */
  status?: InputStatus;
  /**
   * Size of each input box.
   * @default "medium"
   */
  size?: InputSize;
  /**
   * Visual variant.
   * @default "outlined"
   */
  variant?: InputVariant;
  /**
   * Custom display mask (e.g. true for bullet, or custom string like "*").
   * @default false
   */
  mask?: boolean | string;
  /**
   * Display formatter.
   */
  formatter?: (value: string) => string;
  /**
   * Render separator between input cells.
   */
  separator?: React.ReactNode | ((index: number) => React.ReactNode);
  /**
   * Auto focus first input on mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Triggered when all fields are completed.
   */
  onChange?: (value: string) => void;
  /**
   * Triggered on every individual cell change.
   */
  onInput?: (value: string[]) => void;
  /**
   * Autocomplete attribute for input elements.
   * @default "one-time-code"
   */
  autoComplete?: string;
  /**
   * Additional root class name.
   */
  rootClassName?: string;
  /**
   * CSS class name.
   */
  className?: string;
  /**
   * Inline style.
   */
  style?: React.CSSProperties;
  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<OTPSemanticDOM, string>>
    | ((info: { props: OTPProps }) => Partial<Record<OTPSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<OTPSemanticDOM, React.CSSProperties>>
    | ((info: { props: OTPProps }) => Partial<Record<OTPSemanticDOM, React.CSSProperties>>);
}
