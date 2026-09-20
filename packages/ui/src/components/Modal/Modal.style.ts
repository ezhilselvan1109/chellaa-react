export const modalCssText = `
:root {
  --ch-color-bg-mask: rgba(0, 0, 0, 0.45);
  --ch-content-bg: #ffffff;
  --ch-header-bg: transparent;
  --ch-footer-bg: transparent;
  --ch-title-color: rgba(0, 0, 0, 0.88);
  --ch-title-font-size: 16px;
  --ch-title-line-height: 1.5;
  --ch-modal-z-index: 1000;
  --ch-color-icon: rgba(0, 0, 0, 0.45);
  --ch-color-icon-hover: rgba(0, 0, 0, 0.88);
  --ch-color-bg-text-hover: rgba(0, 0, 0, 0.06);
  --ch-border-radius-lg: 8px;
  --ch-border-radius-sm: 4px;
  --ch-font-weight-strong: 600;
  --ch-box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

/* ========================================================
   Backdrop Mask
   ======================================================== */
.ch-modal-mask {
  position: fixed;
  inset: 0;
  z-index: var(--ch-modal-z-index, 1000);
  height: 100%;
  background-color: var(--ch-color-bg-mask, rgba(0, 0, 0, 0.45));
  animation: chModalFadeIn 0.2s cubic-bezier(0.08, 0.82, 0.17, 1);
}

.ch-modal-mask--blur {
  backdrop-filter: blur(4px);
}

/* ========================================================
   Modal Wrap & Dialog
   ======================================================== */
.ch-modal-wrap {
  position: fixed;
  inset: 0;
  z-index: var(--ch-modal-z-index, 1000);
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px 16px;
  pointer-events: none;
  box-sizing: border-box;
}

.ch-modal-wrap--centered {
  align-items: center;
}

.ch-modal {
  position: relative;
  box-sizing: border-box;
  width: 520px;
  max-width: calc(100vw - 32px);
  margin: 0 auto;
  color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  font-size: var(--ch-font-size, 14px);
  line-height: var(--ch-line-height, 1.5714285714285714);
  pointer-events: auto;
  top: 72px;
}

.ch-modal--centered {
  top: 0;
}

/* Dialog Content Card */
.ch-modal-content {
  position: relative;
  background-color: var(--ch-content-bg, #ffffff);
  background-clip: padding-box;
  border-radius: var(--ch-border-radius-lg, 8px);
  box-shadow: var(--ch-box-shadow);
  padding: 20px 24px;
  animation: chModalZoomIn 0.2s cubic-bezier(0.08, 0.82, 0.17, 1);
  box-sizing: border-box;
}

/* Close Button */
.ch-modal-close {
  position: absolute;
  top: 16px;
  inset-inline-end: 16px;
  z-index: 10;
  padding: 0;
  color: var(--ch-color-icon, rgba(0, 0, 0, 0.45));
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ch-border-radius-sm, 4px);
}

.ch-modal-close:hover {
  color: var(--ch-color-icon-hover, rgba(0, 0, 0, 0.88));
  background-color: var(--ch-color-bg-text-hover, rgba(0, 0, 0, 0.06));
}

/* Header & Title */
.ch-modal-header {
  color: var(--ch-title-color, rgba(0, 0, 0, 0.88));
  background: var(--ch-header-bg, transparent);
  margin-bottom: 12px;
  padding-inline-end: 32px;
}

.ch-modal-title {
  margin: 0;
  color: var(--ch-title-color, rgba(0, 0, 0, 0.88));
  font-weight: var(--ch-font-weight-strong, 600);
  font-size: var(--ch-title-font-size, 16px);
  line-height: var(--ch-title-line-height, 1.5);
  word-wrap: break-word;
}

/* Body Content */
.ch-modal-body {
  font-size: var(--ch-font-size, 14px);
  line-height: var(--ch-line-height, 1.5714285714285714);
  word-wrap: break-word;
  color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
}

/* Footer Controls */
.ch-modal-footer {
  text-align: end;
  background: var(--ch-footer-bg, transparent);
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Skeleton Loading Mode */
.ch-modal-loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
}

.ch-modal-loading-line {
  height: 16px;
  background: linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 37%, rgba(0,0,0,0.06) 63%);
  background-size: 400% 100%;
  animation: chModalSkeleton 1.4s ease infinite;
  border-radius: 4px;
}

@keyframes chModalSkeleton {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}

/* ========================================================
   Static Confirmation Styles
   ======================================================== */
.ch-modal-confirm .ch-modal-content {
  padding: 24px;
}

.ch-modal-confirm-body {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.ch-modal-confirm-icon {
  font-size: 22px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.ch-modal-confirm-icon--info {
  color: #1677ff;
}

.ch-modal-confirm-icon--success {
  color: #52c41a;
}

.ch-modal-confirm-icon--error {
  color: #ff4d4f;
}

.ch-modal-confirm-icon--warning,
.ch-modal-confirm-icon--confirm {
  color: #faad14;
}

.ch-modal-confirm-details {
  flex: 1;
}

.ch-modal-confirm-title {
  color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  font-weight: var(--ch-font-weight-strong, 600);
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.ch-modal-confirm-content {
  color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  font-size: 14px;
  line-height: 1.5714285714285714;
}

.ch-modal-confirm-btns {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* ========================================================
   Keyframe Animations
   ======================================================== */
@keyframes chModalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes chModalZoomIn {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;
