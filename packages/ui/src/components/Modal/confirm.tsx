import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "../Button";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { modalCssText } from "./Modal.style";
import type { ModalFuncProps, ModalActionMethods } from "./Modal.types";

const destroyFns = new Set<() => void>();

export const defaultIcons = {
  info: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  confirm: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

interface ConfirmDialogProps extends ModalFuncProps {
  close: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const {
    title,
    content,
    icon,
    type = "confirm",
    width = 416,
    centered = false,
    style,
    className = "",
    wrapClassName = "",
    zIndex = 1000,
    okText = "OK",
    cancelText = "Cancel",
    okType = "primary",
    okButtonProps,
    cancelButtonProps,
    closable = false,
    closeIcon,
    keyboard = true,
    mask = true,
    maskClosable = false,
    onOk,
    onCancel,
    footer,
    close,
  } = props;

  const [okLoading, setOkLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const resolvedIcon =
    icon !== undefined ? icon : defaultIcons[type] || defaultIcons.confirm;

  const isConfirmType = type === "confirm";

  const handleOk = async (e?: React.MouseEvent<HTMLElement>) => {
    if (onOk) {
      const result = onOk(e);
      if (result && typeof result.then === "function") {
        setOkLoading(true);
        try {
          await result;
          close();
        } catch {
          setOkLoading(false);
        }
        return;
      }
    }
    close();
  };

  const handleCancel = async (e?: React.MouseEvent<HTMLElement>) => {
    if (onCancel) {
      const result = onCancel(e);
      if (result && typeof result.then === "function") {
        setCancelLoading(true);
        try {
          await result;
          close();
        } catch {
          setCancelLoading(false);
        }
        return;
      }
    }
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (keyboard && e.key === "Escape") {
      close();
    }
  };

  const wrapClasses = [
    "ch-modal-wrap",
    centered && "ch-modal-wrap--centered",
    wrapClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const modalClasses = [
    "ch-modal",
    "ch-modal-confirm",
    centered && "ch-modal--centered",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div tabIndex={-1} onKeyDown={handleKeyDown}>
      {mask && (
        <div
          className="ch-modal-mask"
          style={{ zIndex }}
          onClick={maskClosable ? close : undefined}
        />
      )}
      <div className={wrapClasses} style={{ zIndex }}>
        <div
          className={modalClasses}
          style={{ width: typeof width === "number" ? `${width}px` : width, ...style }}
          role="dialog"
          aria-modal="true"
        >
          <div className="ch-modal-content">
            {closable && (
              <button
                type="button"
                className="ch-modal-close"
                onClick={close}
                aria-label="Close"
              >
                {closeIcon || (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </button>
            )}

            <div className="ch-modal-confirm-body">
              {resolvedIcon && (
                <span className={`ch-modal-confirm-icon ch-modal-confirm-icon--${type}`}>
                  {resolvedIcon}
                </span>
              )}
              <div className="ch-modal-confirm-details">
                {title && <div className="ch-modal-confirm-title">{title}</div>}
                {content && <div className="ch-modal-confirm-content">{content}</div>}
              </div>
            </div>

            {footer !== null && (
              <div className="ch-modal-confirm-btns">
                {footer ? (
                  footer
                ) : (
                  <>
                    {isConfirmType && (
                      <Button
                        onClick={handleCancel}
                        loading={cancelLoading}
                        {...cancelButtonProps}
                      >
                        {cancelText}
                      </Button>
                    )}
                    <Button
                      type={okType}
                      onClick={handleOk}
                      loading={okLoading}
                      {...okButtonProps}
                    >
                      {okText}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const createConfirm = (config: ModalFuncProps): ModalActionMethods => {
  if (typeof window === "undefined") {
    return {
      destroy: () => {},
      update: () => {},
      then: (onfulfilled, onrejected) => Promise.resolve(true).then(onfulfilled, onrejected),
    };
  }

  injectStyle("ch-theme-tokens", tokensCssText);
  injectStyle("ch-modal", modalCssText);

  let currentConfig: ModalFuncProps = { ...config };
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  const close = () => {
    destroy();
    currentConfig.afterClose?.();
  };

  const render = (props: ModalFuncProps) => {
    root.render(<ConfirmDialog {...props} close={close} />);
  };

  const destroy = () => {
    destroyFns.delete(destroy);
    setTimeout(() => {
      root.unmount();
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 0);
  };

  destroyFns.add(destroy);
  render(currentConfig);

  return {
    destroy,
    update: (newConfig) => {
      currentConfig =
        typeof newConfig === "function"
          ? newConfig(currentConfig)
          : { ...currentConfig, ...newConfig };
      render(currentConfig);
    },
    then: (onfulfilled, onrejected) => {
      return Promise.resolve(true).then(onfulfilled, onrejected);
    },
  };
};

export const modalConfirm = (props: ModalFuncProps) =>
  createConfirm({ type: "confirm", ...props });

export const modalInfo = (props: ModalFuncProps) =>
  createConfirm({ type: "info", ...props });

export const modalSuccess = (props: ModalFuncProps) =>
  createConfirm({ type: "success", ...props });

export const modalError = (props: ModalFuncProps) =>
  createConfirm({ type: "error", ...props });

export const modalWarning = (props: ModalFuncProps) =>
  createConfirm({ type: "warning", ...props });

export const modalDestroyAll = () => {
  for (const fn of Array.from(destroyFns)) {
    fn();
  }
};
