import React from "react";

export type CheckboxSemanticDOM = "root" | "icon" | "label";

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent<HTMLInputElement>["nativeEvent"];
}

export interface CheckboxOptionType<T = any> {
  label: React.ReactNode;
  value: string | number | boolean;
  disabled?: boolean;
  title?: string;
  onChange?: (e: CheckboxChangeEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  data?: T;
}

export interface CheckboxRef {
  /**
   * Sets focus on the checkbox input element.
   */
  focus: () => void;
  /**
   * Removes focus from the checkbox input element.
   */
  blur: () => void;
  /**
   * Direct reference to the native DOM element.
   */
  nativeElement: HTMLInputElement | HTMLLabelElement | null;
}

export interface CheckboxProps extends React.AriaAttributes {
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
   * Specifies whether the checkbox is selected (controlled).
   */
  checked?: boolean;
  /**
   * Specifies the initial state: whether or not the checkbox is selected (uncontrolled).
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * If disabled, the checkbox cannot be interacted with.
   * @default false
   */
  disabled?: boolean;
  /**
   * The indeterminate checked state of the checkbox (e.g. check-all state).
   * @default false
   */
  indeterminate?: boolean;
  /**
   * The value of the checkbox, primarily utilized when nested inside a Checkbox.Group.
   */
  value?: string | number | boolean;
  /**
   * The name attribute of the underlying native checkbox input.
   */
  name?: string;
  /**
   * The id attribute of the underlying native checkbox input.
   */
  id?: string;
  /**
   * If true, the checkbox is automatically focused upon initial mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * The tabIndex attribute of the checkbox.
   */
  tabIndex?: number;
  /**
   * Advisory information about the checkbox.
   */
  title?: string;
  /**
   * Whether the checkbox is required.
   */
  required?: boolean;
  /**
   * Click handler for the checkbox root.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Mouse enter handler.
   */
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  /**
   * Mouse leave handler.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  /**
   * Focus handler for the checkbox input.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * Blur handler for the checkbox input.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * Customize class for each semantic structure (root, icon, label).
   */
  classNames?:
    | Partial<Record<CheckboxSemanticDOM, string>>
    | ((info: { props: CheckboxProps }) => Partial<Record<CheckboxSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<CheckboxSemanticDOM, React.CSSProperties>>
    | ((info: { props: CheckboxProps }) => Partial<Record<CheckboxSemanticDOM, React.CSSProperties>>);
  /**
   * Callback triggered when the checkbox checked state changes.
   */
  onChange?: (e: CheckboxChangeEvent) => void;
  /**
   * Label content displayed adjacent to the checkbox.
   */
  children?: React.ReactNode;
  [key: `data-${string}`]: any;
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /**
   * Additional class name for the root group container.
   */
  rootClassName?: string;
  /**
   * Default selected values (uncontrolled).
   * @default []
   */
  defaultValue?: (string | number | boolean)[];
  /**
   * Currently selected values (controlled).
   */
  value?: (string | number | boolean)[];
  /**
   * If true, all child checkboxes in the group are disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The name property of all child input[type="checkbox"] elements.
   */
  name?: string;
  /**
   * Options array to automatically generate child checkboxes from.
   * Accepts string[], number[], or CheckboxOptionType[].
   * @default []
   */
  options?: (string | number | CheckboxOptionType)[];
  /**
   * Callback triggered when the group selection changes.
   */
  onChange?: (checkedValues: (string | number | boolean)[]) => void;
  /**
   * Direct children elements (e.g. Row, Col, or Checkbox components).
   */
  children?: React.ReactNode;
}
