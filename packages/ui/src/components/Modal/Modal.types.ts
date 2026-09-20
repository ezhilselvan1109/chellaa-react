import React from "react";
import type { ButtonProps, ButtonType } from "../Button";

export type ModalSemanticDOM =
  | "root"
  | "mask"
  | "container"
  | "wrapper"
  | "header"
  | "title"
  | "body"
  | "footer"
  | "close";

export interface ClosableType {
  closeIcon?: React.ReactNode;
  disabled?: boolean;
  onClose?: () => void;
}

export interface ModalProps {
  /**
   * Whether the modal dialog is visible or not.
   * @default false
   */
  open?: boolean;
  /**
   * The modal dialog's title.
   */
  title?: React.ReactNode;
  /**
   * Whether a close (x) button is visible on top right or not.
   * @default true
   */
  closable?: boolean | ClosableType;
  /**
   * Custom close icon. Close button will be hidden when setting to null or false.
   */
  closeIcon?: React.ReactNode;
  /**
   * Whether to apply loading visual effect for OK button or not.
   * @default false
   */
  confirmLoading?: boolean;
  /**
   * Whether to unmount child components on close.
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * Alias for destroyOnClose (Ant Design 5.25+).
   * @default false
   */
  destroyOnHidden?: boolean;
  /**
   * Force render Modal even if closed.
   * @default false
   */
  forceRender?: boolean;
  /**
   * Whether to support pressing Esc to close.
   * @default true
   */
  keyboard?: boolean;
  /**
   * Mask effect. Can be boolean or config object with enabled, blur, closable.
   * @default true
   */
  mask?: boolean | { enabled?: boolean; blur?: boolean; closable?: boolean };
  /**
   * Whether to close the modal dialog when the mask (area outside the modal) is clicked.
   * @default true
   */
  maskClosable?: boolean;
  /**
   * Centered Modal vertically in the viewport.
   * @default false
   */
  centered?: boolean;
  /**
   * Width of the modal dialog.
   * @default 520
   */
  width?: string | number;
  /**
   * Style of floating layer, typically used at least for adjusting the position.
   */
  style?: React.CSSProperties;
  /**
   * The class name of the container of the modal dialog.
   */
  wrapClassName?: string;
  /**
   * Additional class name for the root portal layer.
   */
  rootClassName?: string;
  /**
   * Additional class name for modal dialog.
   */
  className?: string;
  /**
   * The z-index of the Modal.
   * @default 1000
   */
  zIndex?: number;
  /**
   * Text of the OK button.
   * @default "OK"
   */
  okText?: React.ReactNode;
  /**
   * Text of the Cancel button.
   * @default "Cancel"
   */
  cancelText?: React.ReactNode;
  /**
   * Button type of the OK button.
   * @default "primary"
   */
  okType?: ButtonType;
  /**
   * The ok button props.
   */
  okButtonProps?: ButtonProps;
  /**
   * The cancel button props.
   */
  cancelButtonProps?: ButtonProps;
  /**
   * Show loading skeleton content placeholder.
   * @default false
   */
  loading?: boolean;
  /**
   * Whether to lock body scroll when modal opens.
   * @default true
   */
  scrollLock?: boolean;
  /**
   * Custom modal content render (e.g., draggable wrappers).
   */
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  /**
   * The mounted node for Modal but still display fullscreen.
   * @default document.body
   */
  getContainer?: HTMLElement | (() => HTMLElement) | string | false;
  /**
   * Specify a function that will be called when modal is closed completely.
   */
  afterClose?: () => void;
  /**
   * Callback when the animation ends when Modal is turned on and off.
   */
  afterOpenChange?: (open: boolean) => void;
  /**
   * Specify a function that will be called when a user clicks the OK button.
   */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void | Promise<any>;
  /**
   * Specify a function that will be called when a user clicks mask, close button or Cancel button.
   */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Footer content. Set as footer={null} when you don't need default buttons,
   * or provide a render function (originNode, { OkBtn, CancelBtn }) => ReactNode.
   */
  footer?:
    | React.ReactNode
    | ((
        originNode: React.ReactNode,
        extra: { OkBtn: React.FC; CancelBtn: React.FC }
      ) => React.ReactNode)
    | null;
  /**
   * Semantic DOM class names for individual elements.
   */
  classNames?:
    | Partial<Record<ModalSemanticDOM, string>>
    | ((info: { props: ModalProps }) => Partial<Record<ModalSemanticDOM, string>>);
  /**
   * Semantic DOM inline styles for individual elements.
   */
  styles?:
    | Partial<Record<ModalSemanticDOM, React.CSSProperties>>
    | ((info: { props: ModalProps }) => Partial<Record<ModalSemanticDOM, React.CSSProperties>>);
  /**
   * Modal body children.
   */
  children?: React.ReactNode;
}

export interface ModalFuncProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  type?: "info" | "success" | "error" | "warning" | "confirm";
  width?: string | number;
  centered?: boolean;
  style?: React.CSSProperties;
  className?: string;
  wrapClassName?: string;
  rootClassName?: string;
  zIndex?: number;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okType?: ButtonType;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  keyboard?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  scrollLock?: boolean;
  getContainer?: HTMLElement | (() => HTMLElement) | string | false;
  onOk?: (...args: any[]) => any | Promise<any>;
  onCancel?: (...args: any[]) => any | Promise<any>;
  afterClose?: () => void;
  footer?: React.ReactNode | null;
}

export interface ModalActionMethods extends PromiseLike<boolean> {
  destroy: () => void;
  update: (
    configUpdate:
      | ModalFuncProps
      | ((prevConfig: ModalFuncProps) => ModalFuncProps)
  ) => void;
}

export type ModalFunc = (props: ModalFuncProps) => ModalActionMethods;
