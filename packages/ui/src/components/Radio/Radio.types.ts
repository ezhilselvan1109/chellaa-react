import React from "react";

export type RadioSemanticDOM = "root" | "icon" | "label";

export type RadioSize = "large" | "medium" | "small" | "lg" | "md" | "sm";

export type RadioOptionTypeMode = "default" | "button";

export type RadioButtonStyle = "outline" | "solid";

export interface RadioChangeEventTarget extends RadioProps {
  checked: boolean;
}

export interface RadioChangeEvent {
  target: RadioChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent<HTMLInputElement>["nativeEvent"];
}

export interface RadioOptionType<T = any> {
  label: React.ReactNode;
  value: any;
  disabled?: boolean;
  title?: string;
  id?: string;
  required?: boolean;
  onChange?: (e: RadioChangeEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  data?: T;
}

export interface RadioRef {
  /**
   * Sets focus on the native radio input element.
   */
  focus: () => void;
  /**
   * Removes focus from the native radio input element.
   */
  blur: () => void;
  /**
   * Direct reference to the native input element.
   */
  nativeElement: HTMLInputElement | null;
}

export interface RadioProps extends React.AriaAttributes {
  /**
   * Additional class name for the root label container.
   */
  rootClassName?: string;
  /**
   * Additional CSS class name.
   */
  className?: string;
  /**
   * Additional inline styles.
   */
  style?: React.CSSProperties;
  /**
   * Specifies whether the radio is selected (controlled).
   */
  checked?: boolean;
  /**
   * Specifies the initial state: whether or not the radio is selected (uncontrolled).
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * If disabled, the radio cannot be interacted with.
   * @default false
   */
  disabled?: boolean;
  /**
   * The value of the radio, primarily utilized when nested inside a Radio.Group.
   */
  value?: any;
  /**
   * The name attribute of the underlying native radio input.
   */
  name?: string;
  /**
   * The id attribute of the underlying native radio input.
   */
  id?: string;
  /**
   * If true, the radio is automatically focused upon initial mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * The tabIndex attribute of the radio.
   */
  tabIndex?: number;
  /**
   * Advisory information about the radio.
   */
  title?: string;
  /**
   * Whether the radio is required.
   * @default false
   */
  required?: boolean;
  /**
   * Semantic DOM class names for individual elements.
   */
  classNames?:
    | Partial<Record<RadioSemanticDOM, string>>
    | ((info: { props: RadioProps }) => Partial<Record<RadioSemanticDOM, string>>);
  /**
   * Semantic DOM inline styles for individual elements.
   */
  styles?:
    | Partial<Record<RadioSemanticDOM, React.CSSProperties>>
    | ((info: { props: RadioProps }) => Partial<Record<RadioSemanticDOM, React.CSSProperties>>);
  /**
   * Callback invoked when the checked state changes.
   */
  onChange?: (e: RadioChangeEvent) => void;
  /**
   * Label content rendered next to the radio indicator.
   */
  children?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export interface RadioGroupProps {
  /**
   * Additional class name for the group container.
   */
  rootClassName?: string;
  /**
   * Additional CSS class name.
   */
  className?: string;
  /**
   * Additional inline styles.
   */
  style?: React.CSSProperties;
  /**
   * Default selected value for uncontrolled Radio.Group.
   */
  defaultValue?: any;
  /**
   * Currently selected value for controlled Radio.Group.
   */
  value?: any;
  /**
   * If true, disables all child radio buttons in the group.
   * @default false
   */
  disabled?: boolean;
  /**
   * The name property of all input[type="radio"] children.
   * If not set, it will fallback to an auto-generated unique name.
   */
  name?: string;
  /**
   * Options array to automatically generate child radios from.
   */
  options?: (string | number | RadioOptionType)[];
  /**
   * Set Radio optionType: standard circular radio or button style.
   * @default 'default'
   */
  optionType?: RadioOptionTypeMode;
  /**
   * The style type of radio button: outline or solid.
   * @default 'outline'
   */
  buttonStyle?: RadioButtonStyle;
  /**
   * The size of radio button style: large, medium, small.
   */
  size?: RadioSize;
  /**
   * Layout orientation of the radio items.
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * If true, the Radio group will be vertical.
   * Simultaneously existing with orientation, orientation takes priority.
   * @default false
   */
  vertical?: boolean;
  /**
   * Option to fit RadioGroup width to its parent width (Ant Design 5.21.0+).
   * @default false
   */
  block?: boolean;
  /**
   * Semantic DOM class names for individual elements.
   */
  classNames?:
    | Partial<Record<RadioSemanticDOM, string>>
    | ((info: { props: RadioGroupProps }) => Partial<Record<RadioSemanticDOM, string>>);
  /**
   * Semantic DOM inline styles for individual elements.
   */
  styles?:
    | Partial<Record<RadioSemanticDOM, React.CSSProperties>>
    | ((info: { props: RadioGroupProps }) => Partial<Record<RadioSemanticDOM, React.CSSProperties>>);
  /**
   * The callback function that is triggered when the selected value changes.
   */
  onChange?: (e: RadioChangeEvent) => void;
  /**
   * Child radio elements.
   */
  children?: React.ReactNode;
}

export interface RadioButtonProps extends RadioProps {}
