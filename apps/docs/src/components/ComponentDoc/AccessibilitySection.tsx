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
    <div style={{ margin: "32px 0 48px 0" }}>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "8px" }}>
        Accessibility & Keyboard Navigation
      </h2>
      <p
        style={{
          color: "var(--cl-color-text-secondary, #6b7280)",
          lineHeight: 1.6,
        }}
      >
        <code>{componentName}</code> is built to comply with WCAG 2.2 AA
        standards and includes automated <code>axe-core</code> testing for zero
        violations.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
          }}
        >
          <h4
            style={{ margin: "0 0 12px 0", fontSize: "1rem", fontWeight: 700 }}
          >
            ARIA Attributes & Roles
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "0.88rem",
              lineHeight: 1.6,
            }}
          >
            {roles.map((r) => (
              <li key={r.attributeOrKey} style={{ marginBottom: "8px" }}>
                <code>{r.attributeOrKey}</code>: {r.description}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
          }}
        >
          <h4
            style={{ margin: "0 0 12px 0", fontSize: "1rem", fontWeight: 700 }}
          >
            Keyboard Interaction
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "0.88rem",
              lineHeight: 1.6,
            }}
          >
            {keyboardKeys.map((k) => (
              <li key={k.attributeOrKey} style={{ marginBottom: "8px" }}>
                <kbd
                  style={{
                    padding: "2px 6px",
                    background: "var(--cl-color-surface-base, #fff)",
                    border: "1px solid var(--cl-color-border-subtle, #ccc)",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: "0.82rem",
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
