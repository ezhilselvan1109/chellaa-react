import { LuSparkles } from "react-icons/lu";
import { FiShield } from "react-icons/fi";

export function ChangelogPage() {
  return (
    <article className="docs-page">
      <h1>Changelog & Releases</h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        All releases, breaking changes, and component additions for{" "}
        <code>@chellaa/react</code>.
      </p>

      <section style={{ marginTop: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <h2 style={{ margin: 0 }}>v0.2.0</h2>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "4px",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "#059669",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            Latest Release
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              color: "var(--cl-color-text-secondary, #6b7280)",
            }}
          >
            NPM Package Distribution & Zero-Config Delivery
          </span>
        </div>

        <div
          style={{
            padding: "16px 20px",
            border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
            borderRadius: "8px",
            marginTop: "12px",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--docs-primary)",
            }}
          >
            <LuSparkles size={16} />
            <span>New Components</span>
          </h3>
          <ul
            style={{
              margin: "0 0 16px 0",
              paddingLeft: "20px",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            <li>
              <strong>
                <code>Button</code>:
              </strong>{" "}
              Comprehensive interactive button with 5 variants (solid, outline,
              ghost, subtle, link), 5 sizes (xs-xl), 7 semantic color schemes,
              loading states, double-click protection, and <code>asChild</code>{" "}
              slot delegation.
            </li>
            <li>
              <strong>
                <code>ButtonGroup</code>:
              </strong>{" "}
              Group container with attached mode (collapsed interior borders),
              horizontal/vertical orientation, and Context-driven prop
              propagation.
            </li>
          </ul>

          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--docs-primary)",
            }}
          >
            <FiShield size={16} />
            <span>Architecture & Infrastructure</span>
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            <li>
              Implemented <strong>Zero-Configuration Styling</strong> via CSS
              layers (<code>@layer cl-components</code>).
            </li>
            <li>
              Full dark/light/system theme engine with{" "}
              <code>ThemeProvider</code>, <code>useTheme</code>, and{" "}
              <code>ThemeScript</code>.
            </li>
            <li>
              Multi-tier Component Validation Architecture across Unit Tests
              (Vitest), Storybook 8, Application Playground, and Test Consumer.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
