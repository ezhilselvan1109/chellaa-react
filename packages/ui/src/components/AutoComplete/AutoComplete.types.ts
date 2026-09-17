import React from "react";

export type AutoCompleteSize = "large" | "medium" | "small";

export type AutoCompleteVariant = "outlined" | "borderless" | "filled" | "underlined";

export type AutoCompleteStatus = "error" | "warning";

export type AutoCompleteSemanticDOM =
  | "root"
  | "prefix"
  | "content"
  | "placeholder"
  | "clear"
  | "input"
  | "popup.root"
  | "popup.list"
  | "popup.listItem";

export interface AutoCompleteOption<T = any> {
  /**
   * Display label for the option. Defaults to value if not provided.
   */
  label?: React.ReactNode;
  /**
   * Value of the option. Optional when defining category group headers.
   */
  value?: string;
  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
  /**
   * Custom user data associated with this option.
   */
  data?: T;
  /**
   * Grouped sub-options for category grouping (Lookup Patterns: Certain Category).
   */
  options?: AutoCompleteOption<T>[];
  [key: string]: any;
}

export interface AutoCompleteRef {
  /**
   * Sets focus on the input element.
   */
  focus: () => void;
  /**
   * Removes focus from the input element.
   */
  blur: () => void;
  /**
   * Direct reference to the root container or input element.
   */
  nativeElement: HTMLDivElement | HTMLInputElement | null;
}

export interface AutoCompleteProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "onSelect" | "defaultValue" | "prefix"> {
  /**
   * Additional class name for the root container element.
   */
  rootClassName?: string;
  /**
   * Show clear button when input has value. Supports boolean or custom clear icon object.
   * @default false
   */
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  /**
   * If true, backfills the selected item's value into the input field during keyboard arrow navigation.
   * @default false
   */
  backfill?: boolean;
  /**
   * Customize input element (e.g. <input />, <textarea />, or custom <Input />).
   */
  children?: React.ReactElement;
  /**
   * Customize class for each semantic structure (root, prefix, input, clear, popup.root, etc.).
   */
  classNames?:
    | Partial<Record<AutoCompleteSemanticDOM, string>>
    | ((info: { props: AutoCompleteProps<T> }) => Partial<Record<AutoCompleteSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<AutoCompleteSemanticDOM, React.CSSProperties>>
    | ((info: { props: AutoCompleteProps<T> }) => Partial<Record<AutoCompleteSemanticDOM, React.CSSProperties>>);
  /**
   * Whether to activate the first option by default in the dropdown list.
   * @default true
   */
  defaultActiveFirstOption?: boolean;
  /**
   * Initial open state of the dropdown.
   */
  defaultOpen?: boolean;
  /**
   * Initial selected option / input value.
   */
  defaultValue?: string;
  /**
   * Whether the AutoComplete is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Customize dropdown popup wrapper content.
   */
  popupRender?: (originNode: React.ReactElement) => React.ReactNode;
  /**
   * Determine whether dropdown menu and select input are the same width.
   * Accepts boolean or numeric width in pixels.
   * @default true
   */
  popupMatchSelectWidth?: boolean | number;
  /**
   * Parent container of the dropdown popup.
   * @default () => document.body
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /**
   * Content to show when no options match the search query.
   */
  notFoundContent?: React.ReactNode;
  /**
   * Controlled open state of the dropdown.
   */
  open?: boolean;
  /**
   * Data source options for autocomplete.
   */
  options?: AutoCompleteOption<T>[];
  /**
   * Placeholder text for the input box.
   */
  placeholder?: string;
  /**
   * Prefix icon or content for the input box.
   */
  prefix?: React.ReactNode;
  /**
   * Configure search behavior.
   * @default true
   */
  showSearch?:
    | boolean
    | {
        filterOption?:
          | boolean
          | ((inputValue: string, option: AutoCompleteOption<T>) => boolean);
      };
  /**
   * If true, filter options by input value (case-insensitive substring match).
   * If function, filter options against it.
   * @default true
   */
  filterOption?:
    | boolean
    | ((inputValue: string, option: AutoCompleteOption<T>) => boolean);
  /**
   * Validation status.
   */
  status?: AutoCompleteStatus;
  /**
   * Size of the input box.
   * @default "medium"
   */
  size?: AutoCompleteSize;
  /**
   * Controlled value of the input.
   */
  value?: string;
  /**
   * Visual variant of the input box.
   * @default "outlined"
   */
  variant?: AutoCompleteVariant;
  /**
   * Disable virtual scrolling if false.
   * @default true
   */
  virtual?: boolean;
  /**
   * Called when leaving the component.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Called when selecting an option or changing the input value.
   */
  onChange?: (value: string) => void;
  /**
   * Called when dropdown open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Called when entering the component.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Called when an option is selected.
   */
  onSelect?: (value: string, option: AutoCompleteOption<T>) => void;
  /**
   * Called when the clear button is clicked.
   */
  onClear?: () => void;
  /**
   * Called when key pressed in the input element.
   */
  onInputKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Called when the popup dropdown scrolls.
   */
  onPopupScroll?: (event: React.UIEvent<HTMLElement>) => void;
  /**
   * Called when typing / searching items.
   */
  onSearch?: (value: string) => void;
}
