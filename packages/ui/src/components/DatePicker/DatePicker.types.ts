import React from "react";
import type { Dayjs } from "dayjs";

export type DateType = Dayjs | Date | string | number;

export type PickerType = "date" | "week" | "month" | "quarter" | "year";

export type PanelMode = "time" | "date" | "week" | "month" | "quarter" | "year" | "decade";

export type DatePickerPlacement = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";

export type DatePickerSize = "large" | "medium" | "small" | "lg" | "md" | "sm";

export type DatePickerVariant = "outlined" | "borderless" | "filled" | "underlined";

export type DatePickerStatus = "error" | "warning";

export type DatePickerSemanticDOM =
  | "root"
  | "prefix"
  | "input"
  | "suffix"
  | "popup.root"
  | "popup.container"
  | "popup.header"
  | "popup.body"
  | "popup.content"
  | "popup.item"
  | "popup.footer";

export type RangePickerSemanticDOM = DatePickerSemanticDOM | "separator";

export interface CellRenderInfo {
  originNode: React.ReactElement;
  today: Dayjs;
  range?: "start" | "end";
  type: PanelMode;
  subType?: "hour" | "minute" | "second";
}

export type DisabledDateFn = (
  currentDate: Dayjs,
  info?: { from?: Dayjs; type?: PickerType }
) => boolean;

export interface PresetItem {
  label: React.ReactNode;
  value: Dayjs | (() => Dayjs);
}

export interface RangePresetItem {
  label: React.ReactNode;
  value:
    | [Dayjs | (() => Dayjs), Dayjs | (() => Dayjs)]
    | (() => [Dayjs, Dayjs]);
}

export interface ShowTimeConfig {
  format?: string;
  defaultValue?: Dayjs;
  showNow?: boolean;
}

export interface DatePickerRef {
  focus: () => void;
  blur: () => void;
  nativeElement: HTMLInputElement | null;
}

export interface RangePickerRef {
  focus: (index?: 0 | 1) => void;
  blur: () => void;
  nativeElement: HTMLInputElement | null;
}

export interface CommonPickerProps {
  /**
   * Picker type.
   * @default "date"
   */
  picker?: PickerType;
  /**
   * Date format or array of formats.
   */
  format?: string | string[];
  /**
   * Visual variant.
   * @default "outlined"
   */
  variant?: DatePickerVariant;
  /**
   * Component height scale.
   * @default "medium"
   */
  size?: DatePickerSize;
  /**
   * Validation status.
   */
  status?: DatePickerStatus;
  /**
   * Whether the picker is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Clear button configuration.
   * @default true
   */
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  /**
   * Callback when clear button is clicked.
   */
  onClear?: () => void;
  /**
   * Minimum selectable date.
   */
  minDate?: DateType;
  /**
   * Maximum selectable date.
   */
  maxDate?: DateType;
  /**
   * Predicate specifying dates that cannot be selected.
   */
  disabledDate?: DisabledDateFn;
  /**
   * Controlled open state.
   */
  open?: boolean;
  /**
   * Initial open state.
   */
  defaultOpen?: boolean;
  /**
   * Callback when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Floating popup placement.
   * @default "bottomLeft"
   */
  placement?: DatePickerPlacement;
  /**
   * Container element for floating popup layer.
   */
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement;
  /**
   * Leading icon or content inside input.
   */
  prefix?: React.ReactNode;
  /**
   * Custom calendar suffix icon.
   */
  suffixIcon?: React.ReactNode;
  /**
   * Render extra footer in popup panel.
   */
  renderExtraFooter?: (mode?: PanelMode) => React.ReactNode;
  /**
   * Custom cell rendering function.
   */
  cellRender?: (current: Dayjs, info: CellRenderInfo) => React.ReactNode;
  /**
   * Requires clicking confirm button to commit value.
   */
  needConfirm?: boolean;
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
}

export interface DatePickerProps extends CommonPickerProps {
  /**
   * Currently selected date value (controlled).
   */
  value?: DateType | DateType[] | null;
  /**
   * Default selected date value (uncontrolled).
   */
  defaultValue?: DateType | DateType[] | null;
  /**
   * Callback when selected date changes.
   */
  onChange?: (date: Dayjs | null, dateString: string | null) => void;
  /**
   * Callback when Ok button is clicked.
   */
  onOk?: (date: Dayjs | null) => void;
  /**
   * Input placeholder text.
   */
  placeholder?: string;
  /**
   * Additional time selection options.
   */
  showTime?: boolean | ShowTimeConfig;
  /**
   * Show "Now" shortcut button.
   */
  showNow?: boolean;
  /**
   * Enable multiple date selection.
   * @default false
   */
  multiple?: boolean;
  /**
   * Quick selection preset items.
   */
  presets?: PresetItem[];
  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<DatePickerSemanticDOM, string>>
    | ((info: { props: DatePickerProps }) => Partial<Record<DatePickerSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<DatePickerSemanticDOM, React.CSSProperties>>
    | ((info: { props: DatePickerProps }) => Partial<Record<DatePickerSemanticDOM, React.CSSProperties>>);
}

export interface RangePickerProps
  extends Omit<
    CommonPickerProps,
    "classNames" | "styles" | "disabled" | "placeholder"
  > {
  /**
   * Currently selected range value [start, end] (controlled).
   */
  value?: [DateType | null, DateType | null] | null;
  /**
   * Default selected range value [start, end] (uncontrolled).
   */
  defaultValue?: [DateType | null, DateType | null] | null;
  /**
   * Callback when selected range changes.
   */
  onChange?: (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string] | null
  ) => void;
  /**
   * Callback when either start or end date changes.
   */
  onCalendarChange?: (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string],
    info: { range: "start" | "end" }
  ) => void;
  /**
   * Callback when Ok button is clicked.
   */
  onOk?: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  /**
   * Input placeholders for start and end dates.
   */
  placeholder?: [string, string];
  /**
   * Disabled state for whole picker or individual inputs [start, end].
   */
  disabled?: boolean | [boolean, boolean];
  /**
   * Allow start or end input to remain empty.
   */
  allowEmpty?: [boolean, boolean];
  /**
   * Separator element between start and end inputs.
   * @default "→"
   */
  separator?: React.ReactNode;
  /**
   * Additional time selection options for range picker.
   */
  showTime?: boolean | ShowTimeConfig;
  /**
   * Quick selection preset items for ranges.
   */
  presets?: RangePresetItem[];
  /**
   * Customize class for each semantic structure.
   */
  classNames?:
    | Partial<Record<RangePickerSemanticDOM, string>>
    | ((info: { props: RangePickerProps }) => Partial<Record<RangePickerSemanticDOM, string>>);
  /**
   * Customize inline style for each semantic structure.
   */
  styles?:
    | Partial<Record<RangePickerSemanticDOM, React.CSSProperties>>
    | ((info: { props: RangePickerProps }) => Partial<Record<RangePickerSemanticDOM, React.CSSProperties>>);
}
