import { FiTag, FiCommand } from "react-icons/fi";

interface A11yItem {
  attributeOrKey: string;
  description: string;
}

interface AccessibilitySectionProps {
  componentName: string;
  roles: A11yItem[];
  keyboardKeys: A11yItem[];
}

export function AccessibilitySection({
  componentName,
  roles,
  keyboardKeys,
}: AccessibilitySectionProps) {
  return (
    <div id="accessibility" style={{ margin: "48px 0" }}>
      <h3
        className="docs-heading-2"
        style={{ borderBottom: "none", margin: "0 0 8px 0", padding: 0 }}
      >
        <span>Accessibility & Standards</span>
      </h3>
      <p
        style={{
          color: "var(--docs-text-muted)",
          lineHeight: 1.6,
          margin: "0 0 20px 0",
        }}
      >
        <code>{componentName}</code> adheres strictly to{" "}
        <strong>WCAG 2.2 AA</strong> specifications with complete keyboard
        navigation, explicit focus rings, and automated axe-core validation.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {/* ARIA Roles */}
        <div
          style={{
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "var(--docs-card)",
            boxShadow: "var(--docs-shadow-sm)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "var(--docs-primary-bg)",
                color: "var(--docs-primary)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiTag size={15} />
            </div>
            <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>
              ARIA Semantics & Attributes
            </h4>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "18px",
              fontSize: "0.88rem",
              lineHeight: 1.6,
              color: "var(--docs-text-muted)",
            }}
          >
            {roles.map((r) => (
              <li key={r.attributeOrKey} style={{ marginBottom: "10px" }}>
                <code style={{ color: "var(--docs-primary)", fontWeight: 600 }}>
                  {r.attributeOrKey}
                </code>
                : {r.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Keyboard Interaction */}
        <div
          style={{
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "var(--docs-card)",
            boxShadow: "var(--docs-shadow-sm)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "var(--docs-primary-bg)",
                color: "var(--docs-primary)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiCommand size={15} />
            </div>
            <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>
              Keyboard Keymap
            </h4>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "18px",
              fontSize: "0.88rem",
              lineHeight: 1.6,
              color: "var(--docs-text-muted)",
            }}
          >
            {keyboardKeys.map((k) => (
              <li key={k.attributeOrKey} style={{ marginBottom: "10px" }}>
                <kbd
                  style={{
                    padding: "2px 6px",
                    background: "var(--docs-surface)",
                    border: "1px solid var(--docs-border)",
                    borderRadius: "4px",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.8rem",
                    color: "var(--docs-text)",
                  }}
                >
                  {k.attributeOrKey}
                </kbd>
                : {k.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
