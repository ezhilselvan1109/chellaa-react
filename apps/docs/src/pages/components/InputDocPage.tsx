import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  InputVariant,
  InputSize,
  InputStatus,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const inputProps: PropItem[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "undefined",
    description: "The input content value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    defaultValue: "''",
    description: "The initial input content (uncontrolled).",
  },
  {
    name: "variant",
    type: "'outlined' | 'filled' | 'borderless' | 'underlined'",
    defaultValue: "'outlined'",
    description: "Variants of Input (Ant Design 5.13+).",
  },
  {
    name: "size",
    type: "'large' | 'medium' | 'small'",
    defaultValue: "'medium'",
    description: "The size of the input box: large (40px), medium (32px), small (24px).",
  },
  {
    name: "status",
    type: "'error' | 'warning'",
    defaultValue: "undefined",
    description: "Set validation status.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the input is disabled.",
  },
  {
    name: "allowClear",
    type: "boolean | { clearIcon?: ReactNode, disabled?: boolean }",
    defaultValue: "false",
    description: "Whether to show a clear icon to remove input content.",
  },
  {
    name: "prefix",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "The prefix icon or content for the Input.",
  },
  {
    name: "suffix",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "The suffix icon or content for the Input.",
  },
  {
    name: "showCount",
    type: "boolean | { formatter: (info: { value, count, maxLength }) => ReactNode }",
    defaultValue: "false",
    description: "Whether to show character count.",
  },
  {
    name: "count",
    type: "CountConfig",
    defaultValue: "undefined",
    description: "Character count config with custom max, strategy, and exceedFormatter.",
  },
  {
    name: "addonBefore",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "The label text or element displayed before the input box.",
  },
  {
    name: "addonAfter",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "The label text or element displayed after the input box.",
  },
  {
    name: "onPressEnter",
    type: "KeyboardEventHandler<HTMLInputElement>",
    defaultValue: "undefined",
    description: "The callback function triggered when Enter key is pressed.",
  },
  {
    name: "onClear",
    type: "() => void",
    defaultValue: "undefined",
    description: "Callback when click the clear button.",
  },
  {
    name: "classNames",
    type: "Record<'root' | 'prefix' | 'input' | 'suffix' | 'clear' | 'count', string>",
    defaultValue: "undefined",
    description: "Customize class for each semantic structure.",
  },
  {
    name: "styles",
    type: "Record<'root' | 'prefix' | 'input' | 'suffix' | 'clear' | 'count', CSSProperties>",
    defaultValue: "undefined",
    description: "Customize inline style for each semantic structure.",
  },
];

const textAreaProps: PropItem[] = [
  {
    name: "autoSize",
    type: "boolean | { minRows?: number, maxRows?: number }",
    defaultValue: "false",
    description: "Height auto size feature based on multi-line content.",
  },
  {
    name: "showCount",
    type: "boolean | { formatter: (info) => ReactNode }",
    defaultValue: "false",
    description: "Whether to show character count indicator.",
  },
  {
    name: "allowClear",
    type: "boolean | { clearIcon?: ReactNode }",
    defaultValue: "false",
    description: "Whether to show clear icon to reset textarea.",
  },
  {
    name: "onPressEnter",
    type: "KeyboardEventHandler<HTMLTextAreaElement>",
    defaultValue: "undefined",
    description: "Callback when Enter key is pressed.",
  },
];

const searchProps: PropItem[] = [
  {
    name: "enterButton",
    type: "boolean | ReactNode",
    defaultValue: "false",
    description: "Whether to show an enter button with search icon or custom button node.",
  },
  {
    name: "loading",
    type: "boolean",
    defaultValue: "false",
    description: "Search box with loading indicator.",
  },
  {
    name: "onSearch",
    type: "(value: string, event, info: { source: 'input' | 'clear' }) => void",
    defaultValue: "undefined",
    description: "Callback triggered when search is executed.",
  },
  {
    name: "searchIcon",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Custom search icon.",
  },
];

const passwordProps: PropItem[] = [
  {
    name: "visibilityToggle",
    type: "boolean | { visible?: boolean, onVisibleChange?: (visible: boolean) => void }",
    defaultValue: "true",
    description: "Whether to show toggle button or control password visibility.",
  },
  {
    name: "iconRender",
    type: "(visible: boolean) => ReactNode",
    defaultValue: "undefined",
    description: "Custom toggle button icon render.",
  },
];

const otpProps: PropItem[] = [
  {
    name: "length",
    type: "number",
    defaultValue: "6",
    description: "The number of input elements.",
  },
  {
    name: "mask",
    type: "boolean | string",
    defaultValue: "false",
    description: "Custom display masking symbol (e.g. true or '*').",
  },
  {
    name: "formatter",
    type: "(value: string) => string",
    defaultValue: "undefined",
    description: "Character input formatter (e.g. toUpperCase).",
  },
  {
    name: "separator",
    type: "ReactNode | ((index: number) => ReactNode)",
    defaultValue: "undefined",
    description: "Render separator after the input box of specified index.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    defaultValue: "undefined",
    description: "Triggered when all cells are completely filled.",
  },
  {
    name: "onInput",
    type: "(value: string[]) => void",
    defaultValue: "undefined",
    description: "Triggered whenever any individual cell value changes.",
  },
];

export const InputDocPage: React.FC = () => {
  // Playground State
  const [pgVariant, setPgVariant] = useState<InputVariant>("outlined");
  const [pgSize, setPgSize] = useState<InputSize>("medium");
  const [pgStatus, setPgStatus] = useState<InputStatus | undefined>(undefined);
  const [pgDisabled, setPgDisabled] = useState(false);
  const [pgAllowClear, setPgAllowClear] = useState(true);
  const [pgWithPrefix, setPgWithPrefix] = useState(true);

  // Search Demo State
  const [searchLoading, setSearchLoading] = useState(false);

  // OTP Demo State
  const [otpValue, setOtpValue] = useState("");

  const playgroundCode = `<Input
  variant="${pgVariant}"
  size="${pgSize}"${pgStatus ? `\n  status="${pgStatus}"` : ""}${pgDisabled ? "\n  disabled" : ""}${pgAllowClear ? "\n  allowClear" : ""}${pgWithPrefix ? '\n  prefix={<UserOutlined />}' : ""}
  placeholder="Enter your username"
/>`;

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: 16, fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Components</Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--ch-color-primary, #1677ff)", fontWeight: 500 }}>Data Entry</span>
        <span style={{ margin: "0 8px" }}>/</span>
        <span>Input</span>
      </nav>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Input</h1>
        <Badge variant="primary" style={{ fontSize: 12, padding: "2px 8px" }}>
          AntD 5 & 6 Spec
        </Badge>
      </div>

      <p style={{ fontSize: 16, color: "var(--ch-color-text-secondary, #64748b)", margin: "0 0 24px" }}>
        Through mouse or keyboard input content, it is the most basic and versatile form field wrapper.
      </p>

      {/* Package Import */}
      <div style={{ marginBottom: 32 }}>
        <CodeBlock code='import { Input } from "@chella-ui/react";' language="tsx" />
      </div>

      {/* When To Use */}
      <div style={{
        padding: "16px 20px",
        borderRadius: 8,
        background: "var(--ch-color-bg-container, #ffffff)",
        border: "1px solid var(--ch-color-border, #e2e8f0)",
        marginBottom: 32,
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px" }}>When To Use</h3>
        <ul style={{ margin: 0, paddingInlineStart: 20, color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, lineHeight: 1.6 }}>
          <li>A user input in a form field is needed.</li>
          <li>A search input is required (use <code>Input.Search</code>).</li>
          <li>Multi-line content is required (use <code>Input.TextArea</code>).</li>
          <li>A secret password is required with visibility toggle (use <code>Input.Password</code>).</li>
          <li>One-time password or verification code input is required (use <code>Input.OTP</code>).</li>
        </ul>
      </div>

      {/* Interactive Playground */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Interactive Playground</h2>
        <ComponentPreview
          code={playgroundCode}
          controls={
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              {/* Variant */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Variant:</span>
                {(["outlined", "filled", "borderless", "underlined"] as InputVariant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    style={{
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                      cursor: "pointer",
                      border: "1px solid var(--ch-color-border, #d9d9d9)",
                      background: pgVariant === v ? "var(--ch-color-primary, #1677ff)" : "transparent",
                      color: pgVariant === v ? "#fff" : "inherit",
                    }}
                    onClick={() => setPgVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Size */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Size:</span>
                {(["large", "medium", "small"] as InputSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    style={{
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                      cursor: "pointer",
                      border: "1px solid var(--ch-color-border, #d9d9d9)",
                      background: pgSize === s ? "var(--ch-color-primary, #1677ff)" : "transparent",
                      color: pgSize === s ? "#fff" : "inherit",
                    }}
                    onClick={() => setPgSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Status:</span>
                {(["default", "error", "warning"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    style={{
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontSize: 12,
                      cursor: "pointer",
                      border: "1px solid var(--ch-color-border, #d9d9d9)",
                      background:
                        (st === "default" && !pgStatus) || pgStatus === st
                          ? "var(--ch-color-primary, #1677ff)"
                          : "transparent",
                      color:
                        (st === "default" && !pgStatus) || pgStatus === st
                          ? "#fff"
                          : "inherit",
                    }}
                    onClick={() => setPgStatus(st === "default" ? undefined : st)}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Toggles */}
              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pgDisabled}
                  onChange={(e) => setPgDisabled(e.target.checked)}
                />
                disabled
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pgAllowClear}
                  onChange={(e) => setPgAllowClear(e.target.checked)}
                />
                allowClear
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pgWithPrefix}
                  onChange={(e) => setPgWithPrefix(e.target.checked)}
                />
                prefix
              </label>
            </div>
          }
        >
          <div style={{ maxWidth: 360, margin: "0 auto" }}>
            <Input
              variant={pgVariant}
              size={pgSize}
              status={pgStatus}
              disabled={pgDisabled}
              allowClear={pgAllowClear}
              prefix={pgWithPrefix ? <span>👤</span> : undefined}
              placeholder="Enter your username"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Demos Section */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Examples</h2>

      {/* Demo 1: Variants */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Variants (5.13+)</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          There are four variants: <code>outlined</code>, <code>filled</code>, <code>borderless</code>, and <code>underlined</code>.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
            <Input placeholder="Outlined (Default)" variant="outlined" />
            <Input placeholder="Filled" variant="filled" />
            <Input placeholder="Borderless" variant="borderless" />
            <Input placeholder="Underlined (5.24+)" variant="underlined" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input placeholder="Outlined (Default)" variant="outlined" />
    <Input placeholder="Filled" variant="filled" />
    <Input placeholder="Borderless" variant="borderless" />
    <Input placeholder="Underlined (5.24+)" variant="underlined" />
  </div>
);`}
        />
      </section>

      {/* Demo 2: Three Sizes */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Three Sizes</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          There are three sizes: large (40px), medium (32px, default), and small (24px).
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
            <Input size="large" placeholder="Large size (40px)" />
            <Input size="medium" placeholder="Medium size (32px)" />
            <Input size="small" placeholder="Small size (24px)" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input size="large" placeholder="Large size (40px)" />
    <Input size="medium" placeholder="Medium size (32px)" />
    <Input size="small" placeholder="Small size (24px)" />
  </div>
);`}
        />
      </section>

      {/* Demo 3: Prefix and Suffix */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Prefix and Suffix</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Add prefix or suffix icons, currencies, or helper text inside the input box.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
            <Input prefix={<span>￥</span>} suffix={<span>RMB</span>} defaultValue="100" />
            <Input prefix={<span>https://</span>} suffix={<span>.com</span>} defaultValue="chella" />
            <Input prefix={<span>✉</span>} placeholder="Enter your email" allowClear />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input prefix={<span>￥</span>} suffix={<span>RMB</span>} defaultValue="100" />
    <Input prefix={<span>https://</span>} suffix={<span>.com</span>} defaultValue="chella" />
    <Input prefix={<span>✉</span>} placeholder="Enter your email" allowClear />
  </div>
);`}
        />
      </section>

      {/* Demo 4: Character Counting */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Character Counting (showCount & count)</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Show character counting with maximum limits and custom counting strategies (e.g. emoji as 1 character).
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
            <Input showCount maxLength={20} defaultValue="Standard count" />
            <Input
              defaultValue="Emoji count 🚀"
              count={{
                max: 15,
                strategy: (val) => Array.from(val).length,
                show: true,
              }}
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    {/* Standard count */}
    <Input showCount maxLength={20} defaultValue="Standard count" />

    {/* Custom strategy for emoji */}
    <Input
      defaultValue="Emoji count 🚀"
      count={{
        max: 15,
        strategy: (val) => Array.from(val).length,
        show: true,
      }}
    />
  </div>
);`}
        />
      </section>

      {/* Demo 5: Input.Search */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Search Box (Input.Search)</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Search input with action button, loading state, and search triggers.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}>
            <Input.Search
              placeholder="Input search text"
              onSearch={(value) => alert(`Search: ${value}`)}
            />
            <Input.Search
              placeholder="Search with enterButton"
              enterButton="Search"
              onSearch={(value) => alert(`Search: ${value}`)}
            />
            <Input.Search
              placeholder="Search loading state"
              enterButton
              loading={searchLoading}
              onSearch={() => {
                setSearchLoading(true);
                setTimeout(() => setSearchLoading(false), 1500);
              }}
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { useState } from 'react';
import { Input } from '@chella-ui/react';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <Input.Search
        placeholder="Input search text"
        onSearch={(value) => alert(\`Search: \${value}\`)}
      />
      <Input.Search
        placeholder="Search with enterButton"
        enterButton="Search"
        onSearch={(value) => alert(\`Search: \${value}\`)}
      />
      <Input.Search
        placeholder="Search loading state"
        enterButton
        loading={loading}
        onSearch={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1500);
        }}
      />
    </div>
  );
};`}
        />
      </section>

      {/* Demo 6: Input.TextArea */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Multi-line Text (Input.TextArea)</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Multi-line textarea supporting <code>autoSize</code> to fit content and character counters.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
            <Input.TextArea placeholder="Default textarea with 4 rows" rows={4} />
            <Input.TextArea
              placeholder="Autosize between 2 and 6 rows"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
            <Input.TextArea
              placeholder="With character count and clear icon"
              showCount
              maxLength={100}
              allowClear
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
    <Input.TextArea placeholder="Default textarea with 4 rows" rows={4} />
    <Input.TextArea
      placeholder="Autosize between 2 and 6 rows"
      autoSize={{ minRows: 2, maxRows: 6 }}
    />
    <Input.TextArea
      placeholder="With character count and clear icon"
      showCount
      maxLength={100}
      allowClear
    />
  </div>
);`}
        />
      </section>

      {/* Demo 7: Input.Password */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Password Box (Input.Password)</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Secure input with toggleable visibility eye icon.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ maxWidth: 360 }}>
            <Input.Password placeholder="Input password" defaultValue="MySecurePass123!" />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <div style={{ maxWidth: 360 }}>
    <Input.Password placeholder="Input password" defaultValue="MySecurePass123!" />
  </div>
);`}
        />
      </section>

      {/* Demo 8: Input.OTP (5.16+) */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>One Time Password (Input.OTP)</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Segmented verification code input with auto-advance, backspace navigation, paste handling, and separators.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 6 }}>
                Standard 6-digit OTP:
              </div>
              <Input.OTP onChange={(val) => setOtpValue(val)} />
              {otpValue && (
                <div style={{ marginTop: 8, fontSize: 13, color: "var(--ch-color-primary, #1677ff)" }}>
                  Completed OTP: {otpValue}
                </div>
              )}
            </div>

            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 6 }}>
                With Separator & Uppercase Formatter:
              </div>
              <Input.OTP
                length={6}
                formatter={(str) => str.toUpperCase()}
                separator={(index) => (index === 2 ? <span>—</span> : null)}
              />
            </div>

            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 6 }}>
                With Mask (Password protection):
              </div>
              <Input.OTP length={4} mask />
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    {/* Standard 6-digit OTP */}
    <Input.OTP onChange={(val) => console.log('OTP:', val)} />

    {/* Custom separator and uppercase formatter */}
    <Input.OTP
      length={6}
      formatter={(str) => str.toUpperCase()}
      separator={(index) => (index === 2 ? <span>—</span> : null)}
    />

    {/* Masked OTP */}
    <Input.OTP length={4} mask />
  </div>
);`}
        />
      </section>

      {/* Demo 9: Semantic DOM Styling */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Custom Semantic DOM Styling</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Customize individual semantic structures (<code>root</code>, <code>prefix</code>, <code>input</code>, <code>suffix</code>, <code>clear</code>, <code>count</code>) via <code>classNames</code> and <code>styles</code>.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ maxWidth: 360 }}>
            <Input
              prefix={<span>⚡</span>}
              defaultValue="Branded Input"
              allowClear
              styles={{
                root: {
                  borderRadius: 10,
                  border: "2px solid #10b981",
                  backgroundColor: "rgba(16, 185, 129, 0.04)",
                },
                prefix: {
                  color: "#10b981",
                  fontSize: 16,
                },
                input: {
                  fontWeight: 600,
                  color: "#065f46",
                },
              }}
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Input } from '@chella-ui/react';

export default () => (
  <Input
    prefix={<span>⚡</span>}
    defaultValue="Branded Input"
    allowClear
    styles={{
      root: {
        borderRadius: 10,
        border: '2px solid #10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.04)',
      },
      prefix: {
        color: '#10b981',
        fontSize: 16,
      },
      input: {
        fontWeight: 600,
        color: '#065f46',
      },
    }}
  />
);`}
        />
      </section>

      {/* API Reference */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>API Reference</h2>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Input</h3>
        <PropsTable props={inputProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Input.TextArea</h3>
        <PropsTable props={textAreaProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Input.Search</h3>
        <PropsTable props={searchProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Input.Password</h3>
        <PropsTable props={passwordProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Input.OTP (5.16+)</h3>
        <PropsTable props={otpProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Design Tokens</h3>
        <div style={{
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          marginBottom: 32,
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--ch-color-bg-layout, #f8fafc)", textAlign: "left" }}>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Token</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>CSS Variable</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Default Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>controlHeight</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>--ch-input-height</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>32px</code></td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>activeBorderColor</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>--ch-input-active-border</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>#1677ff</code></td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>activeShadow</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>--ch-input-active-shadow</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>0 0 0 2px rgba(5,145,255,0.1)</code></td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code>colorError</code></td>
                <td style={{ padding: "12px 16px" }}><code>--ch-input-error-border</code></td>
                <td style={{ padding: "12px 16px" }}><code>#ff4d4f</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default InputDocPage;
