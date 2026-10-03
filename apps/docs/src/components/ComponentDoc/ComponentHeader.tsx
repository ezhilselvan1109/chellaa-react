import { Button } from "@chellaa/react";
import { ComponentStatus } from "../../navigation/types";
import { StatusBadge } from "../Common/StatusBadge";

interface ComponentHeaderProps {
  title: string;
  description: string;
  status?: ComponentStatus | undefined;
  version?: string | undefined;
  storybookId?: string | undefined;
}

export function ComponentHeader({
  title,
  description,
  status = "stable",
  version = "v0.1.0",
  storybookId,
}: ComponentHeaderProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
        paddingBottom: "24px",
        marginBottom: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2.25rem", fontWeight: 800 }}>
          {title}
        </h1>
        <StatusBadge status={status} />
        <span
          style={{
            fontSize: "0.85rem",
            color: "var(--cl-color-text-secondary, #6b7280)",
          }}
        >
          {version}
        </span>
      </div>

      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
          margin: "0 0 20px 0",
        }}
      >
        {description}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {storybookId && (
          <Button asChild variant="outline" size="sm">
            <a
              href={`http://localhost:6006/?path=/story/${storybookId}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in Storybook ↗
            </a>
          </Button>
        )}
        <Button asChild variant="ghost" size="sm">
          <a href="http://localhost:5173" target="_blank" rel="noreferrer">
            Open in Playground ↗
          </a>
        </Button>
      </div>
    </div>
  );
}
