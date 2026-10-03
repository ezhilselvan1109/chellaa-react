import { ComponentStatus } from "../../navigation/types";

interface StatusBadgeProps {
  status: ComponentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<
    ComponentStatus,
    { bg: string; text: string; label: string }
  > = {
    stable: {
      bg: "rgba(16, 185, 129, 0.12)",
      text: "#059669",
      label: "Stable",
    },
    beta: {
      bg: "rgba(245, 158, 11, 0.12)",
      text: "#d97706",
      label: "Beta",
    },
    experimental: {
      bg: "rgba(139, 92, 246, 0.12)",
      text: "#7c3aed",
      label: "Experimental",
    },
    new: {
      bg: "rgba(37, 99, 235, 0.12)",
      text: "#2563eb",
      label: "New",
    },
  };

  const style = styles[status] || styles.stable;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        backgroundColor: style.bg,
        color: style.text,
        letterSpacing: "0.025em",
        textTransform: "uppercase",
      }}
    >
      {style.label}
    </span>
  );
}
