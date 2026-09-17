import React from "react";

export type FloatButtonShape = "circle" | "square";

export type FloatButtonType = "default" | "primary";

export type FloatButtonPlacement = "top" | "bottom" | "left" | "right";

export type FloatButtonTrigger = "click" | "hover";

export type FloatButtonSemanticDOM = "root" | "icon" | "content";

export type FloatButtonGroupSemanticDOM =
  | "root"
  | "list"
  | "item"
  | "itemIcon"
  | "itemContent"
  | "trigger"
  | "triggerIcon"
  | "triggerContent";

export interface FloatButtonBadgeProps {
  count?: number;
  dot?: boolean;
  color?: string;
  overflowCount?: number;
}

export interface FloatButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "content"> {
  /**
   * Set the icon component of button.
   */
  icon?: React.ReactNode;
  /**
   * Text and other content. Short phrase recommended; primarily styled for square shape.
   */
  description?: React.ReactNode;
  /**
   * Alias for description (Ant Design content prop).
   */
  content?: React.ReactNode;
  /**
   * The text shown in the tooltip on hover.
   */
  tooltip?: React.ReactNode;
  /**
   * Setting button type.
   * @default "default"
   */
  type?: FloatButtonType;
  /**
   * Setting button shape.
   * @default "circle"
   */
  shape?: FloatButtonShape;
  /**
   * Attach Badge to FloatButton.
   */
  badge?: FloatButtonBadgeProps;
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The target of hyperlink. Renders button as an anchor tag.
   */
  href?: string;
  /**
   * Specifies where to display the linked URL when href is set.
   */
  target?: string;
  /**
   * Set the original html type of button.
   * @default "button"
   */
  htmlType?: "submit" | "reset" | "button";
  /**
   * Customize class for each semantic structure inside the component.
   */
  classNames?: Partial<Record<FloatButtonSemanticDOM, string>>;
  /**
   * Customize inline style for each semantic structure inside the component.
   */
  styles?: Partial<Record<FloatButtonSemanticDOM, React.CSSProperties>>;
  /**
   * Click event handler.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Internal prop to indicate whether button is rendered inside a FloatButton.Group.
   * @internal
   */
  inGroup?: boolean;
}

export interface FloatButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /**
   * Setting button shape of children.
   * @default "circle"
   */
  shape?: FloatButtonShape;
  /**
   * Which action can trigger menu open/close.
   */
  trigger?: FloatButtonTrigger;
  /**
   * Whether the menu is visible or not (controlled mode).
   */
  open?: boolean;
  /**
   * Whether the menu is open by default (uncontrolled mode).
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback executed when active menu visibility changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Customize close button icon in menu mode.
   */
  closeIcon?: React.ReactNode;
  /**
   * Customize menu animation placement.
   * @default "top"
   */
  placement?: FloatButtonPlacement;
  /**
   * Icon for trigger button in menu mode.
   */
  icon?: React.ReactNode;
  /**
   * Description for trigger button in menu mode.
   */
  description?: React.ReactNode;
  /**
   * Tooltip for trigger button in menu mode.
   */
  tooltip?: React.ReactNode;
  /**
   * Button type for trigger button.
   * @default "default"
   */
  type?: FloatButtonType;
  /**
   * Badge for trigger button.
   */
  badge?: FloatButtonBadgeProps;
  /**
   * Customize class for each semantic structure inside the group component.
   */
  classNames?: Partial<Record<FloatButtonGroupSemanticDOM, string>>;
  /**
   * Customize inline style for each semantic structure inside the group component.
   */
  styles?: Partial<Record<FloatButtonGroupSemanticDOM, React.CSSProperties>>;
  /**
   * Click handler for trigger button.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Child buttons inside the group.
   */
  children?: React.ReactNode;
}

export interface FloatButtonBackTopProps
  extends Omit<FloatButtonProps, "target"> {
  /**
   * Time to return to top in milliseconds.
   * @default 450
   */
  duration?: number;
  /**
   * The BackTop button will not show until the scroll height reaches this value.
   * @default 400
   */
  visibilityHeight?: number;
  /**
   * Show the current scroll progress ring around the BackTop button edge (Ant Design 6.6.0 feature).
   * @default false
   */
  showProgress?: boolean;
  /**
   * Specifies the scrollable area dom node.
   * @default () => window
   */
  target?: () => HTMLElement | Window | Document | null;
}
