import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FloatButton,
  FloatButtonShape,
  FloatButtonType,
  FloatButtonPlacement,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

// SVG Icons
const QuestionIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const FileTextIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const floatButtonProps: PropItem[] = [
  {
    name: "icon",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Set the icon component of button.",
  },
  {
    name: "description",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Text and other content. Short phrase recommended, styled primarily for square shape.",
  },
  {
    name: "content",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Alias for description (Ant Design content prop).",
  },
  {
    name: "tooltip",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "The text shown in the tooltip on hover.",
  },
  {
    name: "type",
    type: '"default" | "primary"',
    defaultValue: '"default"',
    description: "Setting button type.",
  },
  {
    name: "shape",
    type: '"circle" | "square"',
    defaultValue: '"circle"',
    description: "Setting button shape.",
  },
  {
    name: "badge",
    type: "FloatButtonBadgeProps",
    defaultValue: "undefined",
    description: "Attach Badge to FloatButton ({ count?: number; dot?: boolean; color?: string; overflowCount?: number }).",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the button is disabled.",
  },
  {
    name: "href",
    type: "string",
    defaultValue: "undefined",
    description: "The target of hyperlink. Renders button as an <a> tag.",
  },
  {
    name: "target",
    type: "string",
    defaultValue: "undefined",
    description: "Specifies where to display the linked URL when href is set.",
  },
  {
    name: "htmlType",
    type: '"submit" | "reset" | "button"',
    defaultValue: '"button"',
    description: "Set the original html type of button.",
  },
  {
    name: "classNames",
    type: "Record<SemanticDOM, string>",
    defaultValue: "undefined",
    description: "Customize class for each semantic structure inside the component (root, icon, content).",
  },
  {
    name: "styles",
    type: "Record<SemanticDOM, CSSProperties>",
    defaultValue: "undefined",
    description: "Customize inline style for each semantic structure inside the component (root, icon, content).",
  },
  {
    name: "onClick",
    type: "(event: React.MouseEvent) => void",
    defaultValue: "undefined",
    description: "Click event handler with signature click wave ripple trigger.",
  },
];

const floatButtonGroupProps: PropItem[] = [
  {
    name: "shape",
    type: '"circle" | "square"',
    defaultValue: '"circle"',
    description: "Setting button shape of children in group.",
  },
  {
    name: "trigger",
    type: '"click" | "hover"',
    defaultValue: "undefined",
    description: "Which action can trigger menu open/close. Enables menu mode.",
  },
  {
    name: "open",
    type: "boolean",
    defaultValue: "undefined",
    description: "Whether the menu is visible or not (controlled mode).",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the menu is open by default (uncontrolled mode).",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    defaultValue: "undefined",
    description: "Callback executed when active menu visibility changes.",
  },
  {
    name: "placement",
    type: '"top" | "bottom" | "left" | "right"',
    defaultValue: '"top"',
    description: "Customize menu animation placement direction.",
  },
  {
    name: "closeIcon",
    type: "ReactNode",
    defaultValue: "<CloseIcon />",
    description: "Customize close button icon in menu mode.",
  },
];

const floatButtonBackTopProps: PropItem[] = [
  {
    name: "duration",
    type: "number",
    defaultValue: "450",
    description: "Time to return to top in milliseconds.",
  },
  {
    name: "visibilityHeight",
    type: "number",
    defaultValue: "400",
    description: "The BackTop button will not show until the scroll height reaches this value.",
  },
  {
    name: "showProgress",
    type: "boolean",
    defaultValue: "false",
    description: "Show the current scroll progress ring around the BackTop button edge (Ant Design 6.6.0 feature).",
  },
  {
    name: "target",
    type: "() => HTMLElement | Window | Document | null",
    defaultValue: "() => window",
    description: "Specifies the scrollable area dom node.",
  },
];

export const FloatButtonDocPage: React.FC = () => {
  const [type, setType] = useState<FloatButtonType>("default");
  const [shape, setShape] = useState<FloatButtonShape>("circle");
  const [hasDescription, setHasDescription] = useState(false);
  const [hasBadge, setHasBadge] = useState(false);
  const [hasTooltip, setHasTooltip] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Group placement state
  const [groupPlacement, setGroupPlacement] = useState<FloatButtonPlacement>("top");
  const [groupTrigger, setGroupTrigger] = useState<"click" | "hover">("click");

  const interactiveCode = `<FloatButton
  type="${type}"
  shape="${shape}"${hasDescription ? '\n  description="Help"' : ""}${hasTooltip ? '\n  tooltip="Need Help?"' : ""}${hasBadge ? '\n  badge={{ count: 5 }}' : ""}${disabled ? "\n  disabled" : ""}
  icon={<QuestionIcon />}
  onClick={() => alert("Action triggered!")}
/>`;

  return (
    <article className="docs-content" style={{ maxWidth: "68rem" }}>
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>FloatButton</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">FloatButton</h1>
        <Badge variant="primary" size="md">
          Ant Design Specification
        </Badge>
        <Badge variant="success" size="md">
          100% Accessible
        </Badge>
      </div>

      <p className="docs-description">
        A button that floats on the page for global site functionality, visible wherever users browse. Supports circular triggers, square descriptive blocks, expandable group menus, and BackTop with circular scroll progress rings.
      </p>

      {/* Package Import */}
      <CodeBlock code='import { FloatButton } from "@chella-ui/react";' language="tsx" />

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
            <div className="preview-control-group">
              <span className="control-label">Type:</span>
              <div className="control-segmented-group">
                <button
                  type="button"
                  className={`control-pill ${type === "default" ? "active" : ""}`}
                  onClick={() => setType("default")}
                >
                  Default
                </button>
                <button
                  type="button"
                  className={`control-pill ${type === "primary" ? "active" : ""}`}
                  onClick={() => setType("primary")}
                >
                  Primary
                </button>
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">Shape:</span>
              <div className="control-segmented-group">
                <button
                  type="button"
                  className={`control-pill ${shape === "circle" ? "active" : ""}`}
                  onClick={() => setShape("circle")}
                >
                  Circle
                </button>
                <button
                  type="button"
                  className={`control-pill ${shape === "square" ? "active" : ""}`}
                  onClick={() => setShape("square")}
                >
                  Square
                </button>
              </div>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={hasDescription}
                  onChange={(e) => setHasDescription(e.target.checked)}
                />
                Description
              </label>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={hasBadge}
                  onChange={(e) => setHasBadge(e.target.checked)}
                />
                Badge (5)
              </label>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={hasTooltip}
                  onChange={(e) => setHasTooltip(e.target.checked)}
                />
                Tooltip
              </label>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
            </div>
          </>
        }
      >
        <div
          style={{
            position: "relative",
            minHeight: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <FloatButton
            inGroup
            type={type}
            shape={shape}
            description={hasDescription ? "Help" : undefined}
            tooltip={hasTooltip ? "Need Help?" : undefined}
            badge={hasBadge ? { count: 5 } : undefined}
            disabled={disabled}
            icon={<QuestionIcon />}
            onClick={() => alert("FloatButton clicked!")}
          />
        </div>
      </ComponentPreview>

      {/* Basic Usage */}
      <h2 className="docs-section-heading">Basic Usage</h2>
      <p className="docs-p">
        The most basic floating action buttons with default and primary visual styles:
      </p>
      <div style={{ display: "flex", gap: "1.25rem", margin: "1.5rem 0", alignItems: "center" }}>
        <FloatButton inGroup icon={<QuestionIcon />} onClick={() => alert("Default FloatButton")} />
        <FloatButton inGroup type="primary" icon={<QuestionIcon />} onClick={() => alert("Primary FloatButton")} />
      </div>
      <CodeBlock
        code={`<FloatButton icon={<QuestionIcon />} onClick={() => alert("Default FloatButton")} />
<FloatButton type="primary" icon={<QuestionIcon />} onClick={() => alert("Primary FloatButton")} />`}
        language="tsx"
      />

      {/* Shapes & Description Content */}
      <h2 className="docs-section-heading">Shapes & Description Content</h2>
      <p className="docs-p">
        Change button shape to <code>circle</code> (default) or <code>square</code>. Short phrases or descriptions are supported on square float buttons:
      </p>
      <div style={{ display: "flex", gap: "1.25rem", margin: "1.5rem 0", alignItems: "center" }}>
        <FloatButton inGroup shape="circle" icon={<QuestionIcon />} />
        <FloatButton inGroup shape="square" icon={<FileTextIcon />} description="DOCS" />
        <FloatButton inGroup shape="square" description="HELP" />
        <FloatButton inGroup shape="square" type="primary" icon={<FileTextIcon />} description="GUIDE" />
      </div>
      <CodeBlock
        code={`<FloatButton shape="circle" icon={<QuestionIcon />} />
<FloatButton shape="square" icon={<FileTextIcon />} description="DOCS" />
<FloatButton shape="square" description="HELP" />
<FloatButton shape="square" type="primary" icon={<FileTextIcon />} description="GUIDE" />`}
        language="tsx"
      />

      {/* Badge Integration */}
      <h2 className="docs-section-heading">Badge on FloatButton</h2>
      <p className="docs-p">
        Attach notification badges with counts or indicator dots:
      </p>
      <div style={{ display: "flex", gap: "1.5rem", margin: "1.5rem 0", alignItems: "center" }}>
        <FloatButton inGroup badge={{ dot: true }} icon={<BellIcon />} />
        <FloatButton inGroup badge={{ count: 5 }} icon={<MessageIcon />} />
        <FloatButton inGroup badge={{ count: 120, overflowCount: 99 }} icon={<BellIcon />} />
      </div>
      <CodeBlock
        code={`<FloatButton badge={{ dot: true }} icon={<BellIcon />} />
<FloatButton badge={{ count: 5 }} icon={<MessageIcon />} />
<FloatButton badge={{ count: 120, overflowCount: 99 }} icon={<BellIcon />} />`}
        language="tsx"
      />

      {/* FloatButton.Group (Menu Mode & Placements) */}
      <h2 className="docs-section-heading">FloatButton.Group & Expandable Menu Mode</h2>
      <p className="docs-p">
        When multiple buttons are used together, wrap them in <code>&lt;FloatButton.Group /&gt;</code>. Add <code>trigger="click"</code> or <code>trigger="hover"</code> to enable expandable menu mode with smooth placement animations (<code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>):
      </p>
      <div style={{ display: "flex", gap: "1rem", margin: "1rem 0", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Placement:</span>
        {(["top", "bottom", "left", "right"] as FloatButtonPlacement[]).map((p) => (
          <button
            key={p}
            type="button"
            className={`control-pill ${groupPlacement === p ? "active" : ""}`}
            onClick={() => setGroupPlacement(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
        <span style={{ fontSize: "0.875rem", fontWeight: 600, marginLeft: "1rem" }}>Trigger:</span>
        {(["click", "hover"] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={`control-pill ${groupTrigger === t ? "active" : ""}`}
            onClick={() => setGroupTrigger(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          minHeight: 220,
          background: "var(--docs-bg-subtle)",
          border: "1px dashed var(--docs-border)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "1.5rem 0",
        }}
      >
        <FloatButton.Group
          trigger={groupTrigger}
          placement={groupPlacement}
          type="primary"
          icon={<EditIcon />}
          style={{ position: "relative", right: "auto", bottom: "auto" }}
        >
          <FloatButton inGroup icon={<ShareIcon />} tooltip="Share Project" />
          <FloatButton inGroup icon={<FileTextIcon />} tooltip="Documentation" />
          <FloatButton inGroup icon={<MessageIcon />} tooltip="Send Feedback" />
        </FloatButton.Group>
      </div>

      <CodeBlock
        code={`<FloatButton.Group
  trigger="${groupTrigger}"
  placement="${groupPlacement}"
  type="primary"
  icon={<EditIcon />}
>
  <FloatButton icon={<ShareIcon />} tooltip="Share Project" />
  <FloatButton icon={<FileTextIcon />} tooltip="Documentation" />
  <FloatButton icon={<MessageIcon />} tooltip="Send Feedback" />
</FloatButton.Group>`}
        language="tsx"
      />

      {/* FloatButton.BackTop */}
      <h2 className="docs-section-heading">FloatButton.BackTop with Scroll Progress Ring</h2>
      <p className="docs-p">
        <code>FloatButton.BackTop</code> makes it easy to smoothly return to the top of the page. Enabling <code>showProgress</code> (Ant Design 6.6.0 specification) displays a dynamic SVG circular progress ring around the button perimeter indicating current scroll progress:
      </p>
      <div style={{ display: "flex", gap: "1.25rem", margin: "1.5rem 0", alignItems: "center" }}>
        <FloatButton.BackTop
          inGroup
          visibilityHeight={0}
          showProgress
          style={{ position: "relative", right: "auto", bottom: "auto" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <span style={{ fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>
          ← BackTop with SVG circular progress ring (scroll the page to see live percentage)
        </span>
      </div>
      <CodeBlock
        code={`<FloatButton.BackTop
  showProgress
  visibilityHeight={400}
  duration={450}
/>`}
        language="tsx"
      />

      {/* API Reference */}
      <h2 className="docs-section-heading">FloatButton API</h2>
      <PropsTable props={floatButtonProps} />

      <h2 className="docs-section-heading">FloatButton.Group API</h2>
      <PropsTable props={floatButtonGroupProps} />

      <h2 className="docs-section-heading">FloatButton.BackTop API</h2>
      <PropsTable props={floatButtonBackTopProps} />
    </article>
  );
};
