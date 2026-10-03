import * as React from "react";
import { ComponentHeader } from "./ComponentHeader";
import { ComponentStatus } from "../../navigation/types";

interface ComponentDocLayoutProps {
  title: string;
  description: string;
  status?: ComponentStatus | undefined;
  version?: string | undefined;
  storybookId?: string | undefined;
  children: React.ReactNode;
}

export function ComponentDocLayout({
  title,
  description,
  status = "stable",
  version = "v0.1.0",
  storybookId,
  children,
}: ComponentDocLayoutProps) {
  return (
    <article className="docs-component-page">
      <ComponentHeader
        title={title}
        description={description}
        status={status}
        version={version}
        storybookId={storybookId}
      />
      <div className="docs-component-body">{children}</div>
    </article>
  );
}
