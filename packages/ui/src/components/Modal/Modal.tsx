import React, { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { modalCssText } from "./Modal.style";
import {
  modalConfirm,
  modalInfo,
  modalSuccess,
  modalError,
  modalWarning,
  modalDestroyAll,
} from "./confirm";
import { useModal } from "./useModal";
import type {
  ModalProps,
  ModalSemanticDOM,
  ClosableType,
} from "./Modal.types";

export interface CompoundedModal extends React.FC<ModalProps> {
  info: typeof modalInfo;
  success: typeof modalSuccess;
  error: typeof modalError;
  warning: typeof modalWarning;
  confirm: typeof modalConfirm;
  destroyAll: typeof modalDestroyAll;
  useModal: typeof useModal;
}

const defaultCloseIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InternalModal: React.FC<ModalProps> = (props) => {
  const {
    open = false,
    title,
    closable = true,
    closeIcon = defaultCloseIcon,
    confirmLoading = false,
    destroyOnClose = false,
    destroyOnHidden = false,
    forceRender = false,
    keyboard = true,
    mask = true,
    maskClosable = true,
    centered = false,
    width = 520,
    style,
    wrapClassName = "",
    rootClassName = "",
    className = "",
    zIndex = 1000,
    okText = "OK",
    cancelText = "Cancel",
    okType = "primary",
    okButtonProps,
    cancelButtonProps,
    loading = false,
    scrollLock = true,
    modalRender,
    getContainer,
    afterClose,
    afterOpenChange,
    onOk,
    onCancel,
    footer,
    classNames,
    styles,
    children,
  } = props;

  if (typeof window !== "undefined") {
    injectStyle("ch-theme-tokens", tokensCssText);
    injectStyle("ch-modal", modalCssText);
  }

  const [internalLoading, setInternalLoading] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(open);

  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open) {
      setHasBeenOpened(true);
    }
    if (prevOpenRef.current !== open) {
      afterOpenChange?.(open);
      if (!open) {
        afterClose?.();
      }
      prevOpenRef.current = open;
    }
  }, [open, afterOpenChange, afterClose]);

  // Body scroll lock
  useEffect(() => {
    if (typeof window === "undefined" || !scrollLock) return;

    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [open, scrollLock]);

  // Keyboard Escape listener
  useEffect(() => {
    if (typeof window === "undefined" || !open || !keyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel?.(e as any);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, keyboard, onCancel]);

  const shouldDestroy = (destroyOnClose || destroyOnHidden) && !open;

  // Semantic DOM
  const resolvedClassNames: Partial<Record<ModalSemanticDOM, string>> =
    typeof classNames === "function" ? classNames({ props }) : classNames || {};
  const resolvedStyles: Partial<Record<ModalSemanticDOM, React.CSSProperties>> =
    typeof styles === "function" ? styles({ props }) : styles || {};

  // Resolve Closable
  const isClosableObj = typeof closable === "object";
  const closableDisabled = isClosableObj ? (closable as ClosableType).disabled : false;
  const showCloseButton = Boolean(closable && closeIcon !== null && closeIcon !== false);
  const resolvedCloseIcon =
    isClosableObj && (closable as ClosableType).closeIcon
      ? (closable as ClosableType).closeIcon
      : closeIcon;

  // Resolve Mask
  const maskEnabled = typeof mask === "boolean" ? mask : mask?.enabled !== false;
  const maskBlur = typeof mask === "object" && mask?.blur;
  const maskAllowsClose =
    typeof mask === "object" && mask?.closable !== undefined
      ? mask.closable
      : maskClosable;

  const handleMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (maskAllowsClose) {
      onCancel?.(e);
    }
  };

  const handleCloseBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (closableDisabled) return;
    if (isClosableObj && (closable as ClosableType).onClose) {
      (closable as ClosableType).onClose?.();
    }
    onCancel?.(e);
  };

  const handleOkClick = async (e: React.MouseEvent<HTMLElement>) => {
    if (onOk) {
      const result = onOk(e);
      if (result && typeof result.then === "function") {
        setInternalLoading(true);
        try {
          await result;
        } finally {
          setInternalLoading(false);
        }
      }
    }
  };

  // Custom Ok and Cancel components for footer function
  const OkBtn: React.FC = useMemo(
    () => () => (
      <Button
        type={okType}
        loading={confirmLoading || internalLoading}
        onClick={handleOkClick}
        {...okButtonProps}
      >
        {okText}
      </Button>
    ),
    [okType, confirmLoading, internalLoading, handleOkClick, okButtonProps, okText]
  );

  const CancelBtn: React.FC = useMemo(
    () => () => (
      <Button onClick={onCancel} {...cancelButtonProps}>
        {cancelText}
      </Button>
    ),
    [onCancel, cancelButtonProps, cancelText]
  );

  // Render footer buttons
  const renderFooter = () => {
    if (footer === null) return null;

    const defaultFooterNodes = (
      <>
        <CancelBtn />
        <OkBtn />
      </>
    );

    if (typeof footer === "function") {
      return footer(defaultFooterNodes, { OkBtn, CancelBtn });
    }

    if (footer !== undefined) {
      return footer;
    }

    return defaultFooterNodes;
  };

  if (!open && !forceRender && (!hasBeenOpened || shouldDestroy)) {
    return null;
  }

  if (!open && !forceRender) {
    return null;
  }

  const wrapClasses = [
    "ch-modal-wrap",
    centered && "ch-modal-wrap--centered",
    wrapClassName,
    resolvedClassNames.wrapper,
  ]
    .filter(Boolean)
    .join(" ");

  const modalClasses = [
    "ch-modal",
    centered && "ch-modal--centered",
    className,
    resolvedClassNames.container,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedWidth = typeof width === "number" ? `${width}px` : width;

  const contentNode = (
    <div
      className={modalClasses}
      style={{
        width: resolvedWidth,
        ...style,
        ...resolvedStyles.container,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="ch-modal-content"
        style={resolvedStyles.body}
      >
        {showCloseButton && (
          <button
            type="button"
            className={`ch-modal-close ${resolvedClassNames.close || ""}`}
            style={resolvedStyles.close}
            onClick={handleCloseBtnClick}
            disabled={closableDisabled}
            aria-label="Close"
          >
            {resolvedCloseIcon}
          </button>
        )}

        {title && (
          <div
            className={`ch-modal-header ${resolvedClassNames.header || ""}`}
            style={resolvedStyles.header}
          >
            <div
              className={`ch-modal-title ${resolvedClassNames.title || ""}`}
              style={resolvedStyles.title}
            >
              {title}
            </div>
          </div>
        )}

        <div
          className={`ch-modal-body ${resolvedClassNames.body || ""}`}
          style={resolvedStyles.body}
        >
          {loading ? (
            <div className="ch-modal-loading-skeleton">
              <div className="ch-modal-loading-line" style={{ width: "90%" }} />
              <div className="ch-modal-loading-line" style={{ width: "70%" }} />
              <div className="ch-modal-loading-line" style={{ width: "85%" }} />
            </div>
          ) : (
            children
          )}
        </div>

        {footer !== null && (
          <div
            className={`ch-modal-footer ${resolvedClassNames.footer || ""}`}
            style={resolvedStyles.footer}
          >
            {renderFooter()}
          </div>
        )}
      </div>
    </div>
  );

  const renderedDialog = modalRender ? modalRender(contentNode) : contentNode;

  const modalRoot = (
    <div
      className={`ch-modal-root ${rootClassName || ""} ${resolvedClassNames.root || ""}`}
      style={{ ...resolvedStyles.root }}
    >
      {maskEnabled && (
        <div
          className={`ch-modal-mask ${maskBlur ? "ch-modal-mask--blur" : ""} ${resolvedClassNames.mask || ""}`}
          style={{ zIndex, ...resolvedStyles.mask }}
          onClick={handleMaskClick}
        />
      )}
      <div
        className={wrapClasses}
        style={{ zIndex, ...resolvedStyles.wrapper }}
        onClick={(e) => {
          if (e.target === e.currentTarget && maskAllowsClose) {
            onCancel?.(e);
          }
        }}
      >
        {renderedDialog}
      </div>
    </div>
  );

  // If getContainer is false, render inline
  if (getContainer === false) {
    return modalRoot;
  }

  // Resolve portal container
  let container: HTMLElement | null = null;
  if (typeof window !== "undefined") {
    if (typeof getContainer === "function") {
      container = getContainer();
    } else if (typeof getContainer === "string") {
      container = document.querySelector(getContainer);
    } else if (getContainer instanceof HTMLElement) {
      container = getContainer;
    } else {
      container = document.body;
    }
  }

  return container ? createPortal(modalRoot, container) : null;
};

InternalModal.displayName = "Modal";

export const Modal = InternalModal as CompoundedModal;
Modal.info = modalInfo;
Modal.success = modalSuccess;
Modal.error = modalError;
Modal.warning = modalWarning;
Modal.confirm = modalConfirm;
Modal.destroyAll = modalDestroyAll;
Modal.useModal = useModal;
