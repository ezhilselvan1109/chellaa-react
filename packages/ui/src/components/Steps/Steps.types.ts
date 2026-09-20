import React from "react";

export type StepStatus = "wait" | "process" | "finish" | "error";

export type StepsType = "default" | "dot" | "inline" | "navigation" | "panel";

export type StepsOrientation = "horizontal" | "vertical";

export type StepsTitlePlacement = "horizontal" | "vertical";

export type StepsSize = "medium" | "small" | "default";

export type StepsVariant = "filled" | "outlined";

export type StepsSemanticDOM =
  | "root"
  | "item"
  | "itemWrapper"
  | "itemIcon"
  | "itemHeader"
  | "itemTitle"
  | "itemSubtitle"
  | "itemSection"
  | "itemContent"
  | "itemRail";

export interface StepItem {
  /**
   * Title of the step.
   */
  title?: React.ReactNode;
  /**
   * Subtitle of the step.
   */
  subTitle?: React.ReactNode;
  /**
   * Description or content of the step.
   */
  description?: React.ReactNode;
  /**
   * Alias for description.
   */
  content?: React.ReactNode;
  /**
   * Status of this step. If omitted, automatically determined by current step index.
   */
  status?: StepStatus;
  /**
   * Custom icon for this step.
   */
  icon?: React.ReactNode;
  /**
   * Disable clicking on this step.
   * @default false
   */
  disabled?: boolean;
  /**
   * Click handler for this step.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Additional class name for this step item.
   */
  className?: string;
  /**
   * Inline style for this step item.
   */
  style?: React.CSSProperties;
  /**
   * React key or unique identifier.
   */
  key?: React.Key;
  [key: string]: any;
}

export interface StepProps extends StepItem {
  /**
   * Optional child content for compound `<Steps.Step>`.
   */
  children?: React.ReactNode;
}

export interface StepsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Additional root container class name.
   */
  rootClassName?: string;

  /**
   * Current step index, starting from 0.
   * @default 0
   */
  current?: number;

  /**
   * Initial step index, starting from 0.
   * @default 0
   */
  initial?: number;

  /**
   * Status of the current active step.
   * @default "process"
   */
  status?: StepStatus;

  /**
   * Orientation of the step bar.
   * @default "horizontal"
   */
  orientation?: StepsOrientation;

  /**
   * Alias for `orientation`.
   */
  direction?: StepsOrientation;

  /**
   * Size of the step bar.
   * @default "medium"
   */
  size?: StepsSize;

  /**
   * Type of steps display.
   * @default "default"
   */
  type?: StepsType;

  /**
   * Config style variant.
   * @default "filled"
   */
  variant?: StepsVariant;

  /**
   * Placement of title and description relative to icon.
   * @default "horizontal"
   */
  titlePlacement?: StepsTitlePlacement;

  /**
   * Alias for `titlePlacement`.
   */
  labelPlacement?: StepsTitlePlacement;

  /**
   * Progress circle percentage of current step in process status (only works on basic Steps).
   */
  percent?: number;

  /**
   * Change to vertical direction when screen width is smaller than 532px.
   * @default true
   */
  responsive?: boolean;

  /**
   * Maximum number of step items to display (>= 3). Hidden intermediate steps collapse into ellipsis steps.
   */
  maxCount?: number;

  /**
   * Custom render function for step icons.
   */
  iconRender?: (
    originNode: React.ReactNode,
    info: { index: number; active: boolean; item: StepItem }
  ) => React.ReactNode;

  /**
   * Callback fired when a step is clicked.
   */
  onChange?: (current: number) => void;

  /**
   * Step items array. Preferred declarative API in Ant Design 5 & 6.
   */
  items?: StepItem[];

  /**
   * Compound `<Steps.Step>` JSX children.
   */
  children?: React.ReactNode;

  /**
   * Customize class for each semantic DOM slot.
   */
  classNames?:
    | Partial<Record<StepsSemanticDOM, string>>
    | ((info: { props: StepsProps }) => Partial<Record<StepsSemanticDOM, string>>);

  /**
   * Customize inline styles for each semantic DOM slot.
   */
  styles?:
    | Partial<Record<StepsSemanticDOM, React.CSSProperties>>
    | ((info: { props: StepsProps }) => Partial<Record<StepsSemanticDOM, React.CSSProperties>>);
}
