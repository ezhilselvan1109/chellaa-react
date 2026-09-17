import React, { useState, useEffect, useCallback, forwardRef } from "react";
import type { FloatButtonBackTopProps } from "./FloatButton.types";
import { FloatButton } from "./FloatButton";

const DefaultBackTopIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export const FloatButtonBackTop = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  FloatButtonBackTopProps
>(
  (
    {
      visibilityHeight = 400,
      duration = 450,
      showProgress = false,
      target,
      icon,
      onClick,
      className,
      style,
      ...restProps
    },
    ref
  ) => {
    const [visible, setVisible] = useState(visibilityHeight === 0);
    const [progress, setProgress] = useState(0);

    const getTargetNode = useCallback((): HTMLElement | Window | Document | null => {
      if (target) {
        const node = target();
        if (node) return node;
      }
      return typeof window !== "undefined" ? window : null;
    }, [target]);

    const handleScroll = useCallback(() => {
      const targetNode = getTargetNode();
      if (!targetNode) return;

      let scrollTop = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      if (targetNode === window || targetNode === document) {
        scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight || 0;
        clientHeight =
          window.innerHeight || document.documentElement.clientHeight || 0;
      } else if (targetNode instanceof HTMLElement) {
        scrollTop = targetNode.scrollTop;
        scrollHeight = targetNode.scrollHeight;
        clientHeight = targetNode.clientHeight;
      }

      setVisible(scrollTop >= visibilityHeight);

      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        setProgress(Math.min(1, Math.max(0, scrollTop / maxScroll)));
      } else {
        setProgress(0);
      }
    }, [getTargetNode, visibilityHeight]);

    useEffect(() => {
      const targetNode = getTargetNode();
      if (!targetNode) return;

      handleScroll();
      targetNode.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        targetNode.removeEventListener("scroll", handleScroll);
      };
    }, [getTargetNode, handleScroll]);

    const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
      const targetNode = getTargetNode();
      if (!targetNode) return;

      if (targetNode === window || !(targetNode instanceof HTMLElement)) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        targetNode.scrollTo({ top: 0, behavior: "smooth" });
      }

      onClick?.(e);
    };

    if (!visible) {
      return null;
    }

    // Circumference for r=19 in 44x44 svg viewbox
    const r = 19;
    const circumference = 2 * Math.PI * r;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <FloatButton
        ref={ref}
        icon={icon ?? <DefaultBackTopIcon />}
        onClick={scrollToTop}
        className={["ch-float-btn-back-top", className].filter(Boolean).join(" ")}
        style={style}
        aria-label="Back to top"
        {...restProps}
      >
        {showProgress && (
          <svg
            className="ch-float-btn-progress-ring"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle
              className="ch-float-btn-progress-track"
              cx="22"
              cy="22"
              r={r}
            />
            <circle
              className="ch-float-btn-progress-circle"
              cx="22"
              cy="22"
              r={r}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
              }}
            />
          </svg>
        )}
      </FloatButton>
    );
  }
);

FloatButtonBackTop.displayName = "FloatButton.BackTop";
