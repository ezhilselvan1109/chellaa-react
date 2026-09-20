import React from "react";

export type SelectSize = "large" | "medium" | "small";

export type SelectVariant = "outlined" | "borderless" | "filled" | "underlined";

export type SelectStatus = "error" | "warning";

export type SelectPlacement = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";

export type SelectMode = "multiple" | "tags";

export type SelectSemanticDOM =
  | "root"
  | "prefix"
  | "content"
  | "placeholder"
  | "clear"
  | "input"
  | "suffix"
  | "popup.root"
  | "popup.list"
  | "popup.listItem";

export type RawValueType = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValueType;
  label: React.ReactNode;
}

export type SelectValue =
  | RawValueType
  | RawValueType[]
  | LabeledValue
  | LabeledValue[];

export interface BaseOptionType {
  label?: React.ReactNode;
  value?: RawValueType;
  disabled?: boolean;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  options?: BaseOptionType[];
  [key: string]: any;
}

export interface FieldNamesType {
  label?: string;
  value?: string;
  options?: string;
  groupLabel?: string;
}

export interface OptionProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  value: RawValueType;
  [key: string]: any;
}

export interface OptGroupProps {
  children?: React.ReactNode;
  className?: string;
  key?: React.Key;
  label: React.ReactNode;
  title?: string;
  [key: string]: any;
}

export interface CustomTagProps {
  label: React.ReactNode;
  value: any;
  disabled: boolean;
  onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  closable: boolean;
}

export interface SelectRef {
  /** Focus the select input/container */
  focus: () => void;
  /** Blur the select input/container */
  blur: () => void;
  /** Direct reference to the root DOM container element */
  nativeElement: HTMLDivElement | null;
}

export interface SelectProps<
  ValueType = any,
  OptionType extends BaseOptionType = BaseOptionType
> extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange" | "onSelect" | "prefix" | "children"
  > {
  /**
   * Additional root container class name.
   */
  rootClassName?: string;

  /**
   * Show clear button when value is selected.
   * @default false
   */
  allowClear?: boolean | { clearIcon?: React.ReactNode };

  /**
   * Whether the current search will be cleared on selecting an item.
   * Only applies when mode is set to multiple or tags.
   * @default true
   */
  autoClearSearchValue?: boolean;

  /**
   * Child nodes (e.g. `<Select.Option>` or `<Select.OptGroup>`).
   */
  children?: React.ReactNode;

  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<SelectSemanticDOM, string>>
    | ((info: { props: SelectProps<ValueType, OptionType> }) => Partial<Record<SelectSemanticDOM, string>>);

  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<SelectSemanticDOM, React.CSSProperties>>
    | ((info: { props: SelectProps<ValueType, OptionType> }) => Partial<Record<SelectSemanticDOM, React.CSSProperties>>);

  /**
   * Whether active first option by default.
   * @default true
   */
  defaultActiveFirstOption?: boolean;

  /**
   * Initial open state of dropdown.
   */
  defaultOpen?: boolean;

  /**
   * Initial selected option.
   */
  defaultValue?: ValueType;

  /**
   * Whether disabled select.
   * @default false
   */
  disabled?: boolean;

  /**
   * Customize node label, value, options, groupLabel field name.
   */
  fieldNames?: FieldNamesType;

  /**
   * If true, filter options by input. If function, filter options against it.
   * @default true
   */
  filterOption?: boolean | ((inputValue: string, option?: OptionType) => boolean);

  /**
   * Sort function for search options sorting.
   */
  filterSort?: (optionA: OptionType, optionB: OptionType, info: { searchValue: string }) => number;

  /**
   * Parent Node which the selector popup should be rendered to. Default to body.
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * Whether to embed label in value, turn format of value to `{ value, label }`.
   * @default false
   */
  labelInValue?: boolean;

  /**
   * Customize selected label render.
   */
  labelRender?: (props: LabeledValue) => React.ReactNode;

  /**
   * Config popup list height.
   * @default 256
   */
  listHeight?: number;

  /**
   * Indicate loading state.
   * @default false
   */
  loading?: boolean;

  /**
   * Customize the loading icon.
   */
  loadingIcon?: React.ReactNode;

  /**
   * The max number of items can be selected, only applies when mode is multiple or tags.
   */
  maxCount?: number;

  /**
   * Max tag count to show.
   */
  maxTagCount?: number | "responsive";

  /**
   * Placeholder for not showing tags.
   */
  maxTagPlaceholder?:
    | React.ReactNode
    | ((omittedValues: (RawValueType | LabeledValue)[]) => React.ReactNode);

  /**
   * Max tag text length to show before truncating.
   */
  maxTagTextLength?: number;

  /**
   * The custom menuItemSelected icon with multiple options.
   */
  menuItemSelectedIcon?: React.ReactNode;

  /**
   * Set mode of Select.
   */
  mode?: SelectMode;

  /**
   * Specify content to show when no result matches.
   * @default "No data"
   */
  notFoundContent?: React.ReactNode;

  /**
   * Controlled open state of dropdown.
   */
  open?: boolean;

  /**
   * Which prop value of option will be used for filter if filterOption is true.
   * @default "value"
   */
  optionFilterProp?: string | string[];

  /**
   * Which prop value of option will render as content of select.
   */
  optionLabelProp?: string;

  /**
   * Select options array.
   */
  options?: OptionType[];

  /**
   * Customize the rendering dropdown options.
   */
  optionRender?: (option: OptionType, info: { index: number }) => React.ReactNode;

  /**
   * Placeholder of select.
   */
  placeholder?: React.ReactNode;

  /**
   * The position where the selection box pops up.
   * @default "bottomLeft"
   */
  placement?: SelectPlacement;

  /**
   * Determine whether the popup menu and the select input are the same width.
   * @default true
   */
  popupMatchSelectWidth?: boolean | number;

  /**
   * Customize dropdown content.
   */
  popupRender?: (originNode: React.ReactElement) => React.ReactNode;

  /**
   * The custom prefix node.
   */
  prefix?: React.ReactNode;

  /**
   * The custom remove icon for tags.
   */
  removeIcon?: React.ReactNode;

  /**
   * The current input search text.
   */
  searchValue?: string;

  /**
   * Customize the search icon.
   */
  searchIcon?: React.ReactNode;

  /**
   * Whether select is searchable.
   * Single defaults to false, multiple/tags default to true.
   */
  showSearch?: boolean | { filterSort?: any };

  /**
   * Size of Select input.
   * @default "medium"
   */
  size?: SelectSize;

  /**
   * Set validation status.
   */
  status?: SelectStatus;

  /**
   * The custom suffix icon.
   */
  suffixIcon?: React.ReactNode;

  /**
   * Customize tag render, only applies when mode is set to multiple or tags.
   */
  tagRender?: (props: CustomTagProps) => React.ReactNode;

  /**
   * Separator used to tokenize, only applies when mode="tags" or mode="multiple".
   */
  tokenSeparators?: string[] | ((input: string) => string[]);

  /**
   * Current selected option.
   */
  value?: ValueType;

  /**
   * Variants of selector.
   * @default "outlined"
   */
  variant?: SelectVariant;

  /**
   * Disable virtual scroll when set to false.
   * @default true
   */
  virtual?: boolean;

  /**
   * Called when keyboard or mouse interaction occurs.
   */
  onActive?: (value: RawValueType | LabeledValue) => void;

  /**
   * Called when select loses focus.
   */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;

  /**
   * Called when select an option or input value change.
   */
  onChange?: (value: ValueType, option: OptionType | OptionType[]) => void;

  /**
   * Called when clear icon is clicked.
   */
  onClear?: () => void;

  /**
   * Called when an option is deselected. Only for multiple or tags.
   */
  onDeselect?: (value: RawValueType | LabeledValue) => void;

  /**
   * Called when select gains focus.
   */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;

  /**
   * Called when key pressed in input.
   */
  onInputKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Called when dropdown open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Called when dropdown scrolls.
   */
  onPopupScroll?: (event: React.UIEvent<HTMLElement>) => void;

  /**
   * Callback function that is fired when search input changed.
   */
  onSearch?: (value: string) => void;

  /**
   * Called when an option is selected.
   */
  onSelect?: (value: RawValueType | LabeledValue, option: OptionType) => void;
}
