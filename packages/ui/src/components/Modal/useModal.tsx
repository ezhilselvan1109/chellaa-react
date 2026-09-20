import React, { useState, useCallback, useMemo } from "react";
import { Button } from "../Button";
import { defaultIcons } from "./confirm";
import type { ModalFuncProps, ModalActionMethods } from "./Modal.types";

interface HookModalItem extends ModalFuncProps {
  id: string;
  visible: boolean;
  resolve?: (confirmed: boolean) => void;
}

export interface HookModalInstance {
  confirm: (props: ModalFuncProps) => ModalActionMethods;
  info: (props: ModalFuncProps) => ModalActionMethods;
  success: (props: ModalFuncProps) => ModalActionMethods;
  error: (props: ModalFuncProps) => ModalActionMethods;
  warning: (props: ModalFuncProps) => ModalActionMethods;
}

export const useModal = (): [HookModalInstance, React.ReactElement] => {
  const [modals, setModals] = useState<HookModalItem[]>([]);

  const removeModal = useCallback((id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const openModal = useCallback(
    (config: ModalFuncProps, type: "confirm" | "info" | "success" | "error" | "warning"): ModalActionMethods => {
      const id = `hook-modal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      let resolvePromise: ((confirmed: boolean) => void) | undefined;

      const promise = new Promise<boolean>((resolve) => {
        resolvePromise = resolve;
      });

      const newItem: HookModalItem = {
        ...config,
        id,
        type,
        visible: true,
        resolve: resolvePromise,
      };

      setModals((prev) => [...prev, newItem]);

      const destroy = () => {
        removeModal(id);
      };

      const update = (
        newConfig:
          | ModalFuncProps
          | ((prevConfig: ModalFuncProps) => ModalFuncProps)
      ) => {
        setModals((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              const updated =
                typeof newConfig === "function" ? newConfig(item) : newConfig;
              return { ...item, ...updated };
            }
            return item;
          })
        );
      };

      const actionMethods: ModalActionMethods = {
        destroy,
        update,
        then: promise.then.bind(promise),
      };

      return actionMethods;
    },
    [removeModal]
  );

  const hookInstance: HookModalInstance = useMemo(
    () => ({
      confirm: (props) => openModal(props, "confirm"),
      info: (props) => openModal(props, "info"),
      success: (props) => openModal(props, "success"),
      error: (props) => openModal(props, "error"),
      warning: (props) => openModal(props, "warning"),
    }),
    [openModal]
  );

  const contextHolder = (
    <>
      {modals.map((modalItem) => {
        const {
          id,
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
          resolve,
        } = modalItem;

        const isConfirmType = type === "confirm";
        const resolvedIcon =
          icon !== undefined ? icon : defaultIcons[type] || defaultIcons.confirm;

        const handleClose = () => {
          removeModal(id);
        };

        const handleOk = async (e?: React.MouseEvent<HTMLElement>) => {
          if (onOk) {
            await onOk(e);
          }
          resolve?.(true);
          handleClose();
        };

        const handleCancel = async (e?: React.MouseEvent<HTMLElement>) => {
          if (onCancel) {
            await onCancel(e);
          }
          resolve?.(false);
          handleClose();
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (keyboard && e.key === "Escape") {
            resolve?.(false);
            handleClose();
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
          <div key={id} tabIndex={-1} onKeyDown={handleKeyDown}>
            {mask && (
              <div
                className="ch-modal-mask"
                style={{ zIndex }}
                onClick={maskClosable ? handleCancel : undefined}
              />
            )}
            <div className={wrapClasses} style={{ zIndex }}>
              <div
                className={modalClasses}
                style={{
                  width: typeof width === "number" ? `${width}px` : width,
                  ...style,
                }}
                role="dialog"
                aria-modal="true"
              >
                <div className="ch-modal-content">
                  {closable && (
                    <button
                      type="button"
                      className="ch-modal-close"
                      onClick={handleCancel}
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
                            <Button onClick={handleCancel} {...cancelButtonProps}>
                              {cancelText}
                            </Button>
                          )}
                          <Button
                            type={okType}
                            onClick={handleOk}
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
      })}
    </>
  );

  return [hookInstance, contextHolder];
};
