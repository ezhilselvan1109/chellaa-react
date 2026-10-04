import * as React from "react";
import { FiInfo, FiAlertTriangle, FiCheckCircle, FiZap } from "react-icons/fi";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const configs = {
    info: {
      border: "var(--cl-color-primary-base, #3b82f6)",
      bg: "rgba(59, 130, 246, 0.08)",
      icon: <FiInfo size={18} style={{ color: "#3b82f6" }} />,
      title: title || "Note",
    },
    warning: {
      border: "var(--cl-color-warning-base, #f59e0b)",
      bg: "rgba(245, 158, 11, 0.08)",
      icon: <FiAlertTriangle size={18} style={{ color: "#f59e0b" }} />,
      title: title || "Important",
    },
    success: {
      border: "var(--cl-color-success-base, #10b981)",
      bg: "rgba(16, 185, 129, 0.08)",
      icon: <FiCheckCircle size={18} style={{ color: "#10b981" }} />,
      title: title || "Best Practice",
    },
    tip: {
      border: "var(--cl-color-secondary-base, #8b5cf6)",
      bg: "rgba(139, 92, 246, 0.08)",
      icon: <FiZap size={18} style={{ color: "#8b5cf6" }} />,
      title: title || "Tip",
    },
  };

  const config = configs[type];

  return (
    <div
      style={{
        borderLeft: `4px solid ${config.border}`,
        backgroundColor: config.bg,
        padding: "16px 20px",
        borderRadius: "0 8px 8px 0",
        margin: "20px 0",
      }}
      role="region"
      aria-label={config.title}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 600,
          marginBottom: "6px",
          fontSize: "0.95rem",
        }}
      >
        <span aria-hidden="true">{config.icon}</span>
        <span>{config.title}</span>
      </div>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
