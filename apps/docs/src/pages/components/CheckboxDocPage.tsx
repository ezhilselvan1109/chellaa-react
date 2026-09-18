import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Checkbox,
  CheckboxChangeEvent,
  CheckboxOptionType,
  Button,
  Badge,
  Row,
  Col,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const checkboxProps: PropItem[] = [
  {
    name: "checked",
    type: "boolean",
    defaultValue: "false",
    description: "Specifies whether the checkbox is selected (controlled).",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    defaultValue: "false",
    description: "Initial state whether the checkbox is selected (uncontrolled).",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "If true, the checkbox cannot be interacted with.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    defaultValue: "false",
    description: "The indeterminate checked state of the checkbox (e.g. check-all state).",
  },
  {
    name: "value",
    type: "string | number | boolean",
    defaultValue: "undefined",
    description: "Value of the checkbox when utilized inside a Checkbox.Group.",
  },
  {
    name: "autoFocus",
    type: "boolean",
    defaultValue: "false",
    description: "If true, the checkbox is automatically focused on initial mount.",
  },
  {
    name: "onChange",
    type: "(e: CheckboxChangeEvent) => void",
    defaultValue: "undefined",
    description: "Callback triggered when the checkbox checked state changes.",
  },
  {
    name: "classNames",
    type: "Record<'root' | 'icon' | 'label', string> | ((info: { props }) => ...)",
    defaultValue: "undefined",
    description: "Semantic DOM class names for individual parts (root, icon, label).",
  },
  {
    name: "styles",
    type: "Record<'root' | 'icon' | 'label', CSSProperties> | ((info: { props }) => ...)",
    defaultValue: "undefined",
    description: "Semantic DOM inline styles for individual parts (root, icon, label).",
  },
  {
    name: "rootClassName",
    type: "string",
    defaultValue: "undefined",
    description: "Additional class name for the root label container.",
  },
];

const checkboxGroupProps: PropItem[] = [
  {
    name: "defaultValue",
    type: "(string | number | boolean)[]",
    defaultValue: "[]",
    description: "Default selected values for uncontrolled Checkbox.Group.",
  },
  {
    name: "value",
    type: "(string | number | boolean)[]",
    defaultValue: "undefined",
    description: "Currently selected values for controlled Checkbox.Group.",
  },
  {
    name: "options",
    type: "(string | number | CheckboxOptionType)[]",
    defaultValue: "[]",
    description: "Options array to automatically generate child checkboxes from.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "If true, all child checkboxes in the group are disabled.",
  },
  {
    name: "name",
    type: "string",
    defaultValue: "undefined",
    description: "The name property of all child input[type='checkbox'] elements.",
  },
  {
    name: "onChange",
    type: "(checkedValues: (string | number | boolean)[]) => void",
    defaultValue: "undefined",
    description: "Callback triggered when selection changes in the group.",
  },
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Direct child elements (e.g. Checkbox, Row, Col).",
  },
];

const defaultOptions = ["Apple", "Pear", "Orange"];

export const CheckboxDocPage: React.FC = () => {
  // Playground State
  const [pgChecked, setPgChecked] = useState(true);
  const [pgDisabled, setPgDisabled] = useState(false);
  const [pgIndeterminate, setPgIndeterminate] = useState(false);
  const [pgLabel, setPgLabel] = useState("Checkbox Label");

  // Controlled Checkbox Demo State
  const [controlledChecked, setControlledChecked] = useState(true);
  const [controlledDisabled, setControlledDisabled] = useState(false);

  // Check All Demo State
  const [checkList, setCheckList] = useState<(string | number | boolean)[]>(["Apple"]);
  const checkAll = defaultOptions.length === checkList.length;
  const indeterminate = checkList.length > 0 && checkList.length < defaultOptions.length;

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckList(e.target.checked ? [...defaultOptions] : []);
  };

  // Checkbox Group Complex Options
  const plainOptions = ["Apple", "Pear", "Orange"];
  const complexOptions: CheckboxOptionType[] = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange", disabled: true },
  ];

  // Grid Group State
  const [gridValues, setGridValues] = useState<(string | number | boolean)[]>(["A", "B"]);

  const playgroundCode = `<Checkbox
  checked={${pgChecked}}
  disabled={${pgDisabled}}
  indeterminate={${pgIndeterminate}}
  onChange={(e) => console.log('checked:', e.target.checked)}
>
  ${pgLabel}
</Checkbox>`;

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumb Header */}
      <nav style={{ marginBottom: 16, fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Components</Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--ch-color-primary, #1677ff)", fontWeight: 500 }}>Data Entry</span>
        <span style={{ margin: "0 8px" }}>/</span>
        <span>Checkbox</span>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Checkbox</h1>
        <Badge variant="primary" style={{ fontSize: 12, padding: "2px 8px" }}>
          AntD 5 & 6 Spec
        </Badge>
      </div>

      <p style={{ fontSize: 16, color: "var(--ch-color-text-secondary, #64748b)", margin: "0 0 24px" }}>
        Collect user choices and selections with support for single checkboxes, indeterminate tri-states, and groups.
      </p>

      {/* Package Import */}
      <div style={{ marginBottom: 32 }}>
        <CodeBlock code='import { Checkbox } from "@chella-ui/react";' language="tsx" />
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
          <li>Used for selecting multiple values from several options.</li>
          <li>If you use only one checkbox, it is similar to Switch to toggle a boolean state, but Checkbox is standard for forms that require submission.</li>
          <li>Use <code>indeterminate</code> state for &quot;check-all&quot; scenarios where some but not all options are selected.</li>
        </ul>
      </div>

      {/* Interactive Playground */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Interactive Playground</h2>
        <ComponentPreview
          code={playgroundCode}
          controls={
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pgChecked}
                  onChange={(e) => setPgChecked(e.target.checked)}
                />
                checked
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pgDisabled}
                  onChange={(e) => setPgDisabled(e.target.checked)}
                />
                disabled
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={pgIndeterminate}
                  onChange={(e) => setPgIndeterminate(e.target.checked)}
                />
                indeterminate
              </label>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>Label:</span>
                <input
                  type="text"
                  value={pgLabel}
                  onChange={(e) => setPgLabel(e.target.value)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: "1px solid var(--ch-color-border, #d9d9d9)",
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
          }
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 60 }}>
            <Checkbox
              checked={pgChecked}
              disabled={pgDisabled}
              indeterminate={pgIndeterminate}
              onChange={(e) => setPgChecked(e.target.checked)}
            >
              {pgLabel}
            </Checkbox>
          </div>
        </ComponentPreview>
      </section>

      {/* Demos Section */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Examples</h2>

      {/* Demo 1: Basic Checkbox */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Basic Usage</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Basic usage of Checkbox with default uncontrolled or controlled state.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", gap: 24 }}>
            <Checkbox defaultChecked>Uncontrolled (defaultChecked)</Checkbox>
            <Checkbox>Unchecked</Checkbox>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <Checkbox defaultChecked>Uncontrolled (defaultChecked)</Checkbox>
    <Checkbox>Unchecked</Checkbox>
  </div>
);`}
        />
      </section>

      {/* Demo 2: Controlled Checkbox */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Controlled Checkbox</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Programmatically control the checked and disabled state with buttons.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <Checkbox
                checked={controlledChecked}
                disabled={controlledDisabled}
                onChange={(e) => setControlledChecked(e.target.checked)}
              >
                {controlledChecked ? "Checked" : "Unchecked"} -{" "}
                {controlledDisabled ? "Disabled" : "Enabled"}
              </Checkbox>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Button
                size="sm"
                onClick={() => setControlledChecked(!controlledChecked)}
              >
                {controlledChecked ? "Uncheck" : "Check"}
              </Button>
              <Button
                size="sm"
                onClick={() => setControlledDisabled(!controlledDisabled)}
              >
                {controlledDisabled ? "Enable" : "Disable"}
              </Button>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { useState } from 'react';
import { Checkbox, Button } from '@chella-ui/react';

export default () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <div>
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={(e) => setChecked(e.target.checked)}
      >
        {checked ? 'Checked' : 'Unchecked'} - {disabled ? 'Disabled' : 'Enabled'}
      </Checkbox>

      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <Button size="sm" onClick={() => setChecked(!checked)}>
          {checked ? 'Uncheck' : 'Check'}
        </Button>
        <Button size="sm" onClick={() => setDisabled(!disabled)}>
          {disabled ? 'Enable' : 'Disable'}
        </Button>
      </div>
    </div>
  );
};`}
        />
      </section>

      {/* Demo 3: Check All (Indeterminate) */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Check All (Indeterminate Tri-State)</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          The indeterminate property displays a partially checked state, ideal for Check All operations.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ borderBottom: "1px solid var(--ch-color-border, #e2e8f0)", paddingBottom: 10 }}>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <Checkbox.Group
              options={defaultOptions}
              value={checkList}
              onChange={(list) => setCheckList(list)}
            />
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { useState } from 'react';
import { Checkbox } from '@chella-ui/react';
import type { CheckboxChangeEvent } from '@chella-ui/react';

const defaultOptions = ['Apple', 'Pear', 'Orange'];

export default () => {
  const [checkList, setCheckList] = useState(['Apple']);
  const checkAll = defaultOptions.length === checkList.length;
  const indeterminate = checkList.length > 0 && checkList.length < defaultOptions.length;

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckList(e.target.checked ? [...defaultOptions] : []);
  };

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <div style={{ marginTop: 12 }}>
        <Checkbox.Group
          options={defaultOptions}
          value={checkList}
          onChange={(list) => setCheckList(list)}
        />
      </div>
    </>
  );
};`}
        />
      </section>

      {/* Demo 4: Disabled Checkbox */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Disabled States</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Disabled checkboxes cannot be selected, hovered, or focused.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Checkbox defaultChecked={false} disabled>
              Disabled Unchecked
            </Checkbox>
            <Checkbox defaultChecked disabled>
              Disabled Checked
            </Checkbox>
            <Checkbox indeterminate disabled>
              Disabled Indeterminate
            </Checkbox>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <Checkbox defaultChecked={false} disabled>
      Disabled Unchecked
    </Checkbox>
    <Checkbox defaultChecked disabled>
      Disabled Checked
    </Checkbox>
    <Checkbox indeterminate disabled>
      Disabled Indeterminate
    </Checkbox>
  </div>
);`}
        />
      </section>

      {/* Demo 5: Checkbox Group */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Checkbox Group</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Generate groups of checkboxes effortlessly from string arrays, numbers, or option objects.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 6 }}>
                String Options:
              </div>
              <Checkbox.Group
                options={plainOptions}
                defaultValue={["Apple"]}
                onChange={(values) => console.log("selected:", values)}
              />
            </div>

            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 6 }}>
                Complex Option Objects (with individual disabled item):
              </div>
              <Checkbox.Group
                options={complexOptions}
                defaultValue={["Pear"]}
              />
            </div>

            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 6 }}>
                Entire Group Disabled:
              </div>
              <Checkbox.Group
                options={plainOptions}
                defaultValue={["Apple", "Orange"]}
                disabled
              />
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from '@chella-ui/react';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const complexOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} />
    <Checkbox.Group options={complexOptions} defaultValue={['Pear']} />
    <Checkbox.Group options={plainOptions} defaultValue={['Apple', 'Orange']} disabled />
  </div>
);`}
        />
      </section>

      {/* Demo 6: Use with Grid */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Use with Grid</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Nest Checkbox inside Row and Col components to craft multi-column responsive checkbox layouts.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ width: "100%" }}>
            <Checkbox.Group
              style={{ width: "100%" }}
              value={gridValues}
              onChange={(val) => setGridValues(val)}
            >
              <Row gutter={[16, 12]} style={{ width: "100%" }}>
                <Col span={8}>
                  <Checkbox value="A">A - Option One</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="B">B - Option Two</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C">C - Option Three</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D">D - Option Four</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E">E - Option Five</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox, Row, Col } from '@chella-ui/react';

export default () => (
  <Checkbox.Group style={{ width: '100%' }} defaultValue={['A', 'B']}>
    <Row gutter={[16, 12]}>
      <Col span={8}><Checkbox value="A">A - Option One</Checkbox></Col>
      <Col span={8}><Checkbox value="B">B - Option Two</Checkbox></Col>
      <Col span={8}><Checkbox value="C">C - Option Three</Checkbox></Col>
      <Col span={8}><Checkbox value="D">D - Option Four</Checkbox></Col>
      <Col span={8}><Checkbox value="E">E - Option Five</Checkbox></Col>
    </Row>
  </Checkbox.Group>
);`}
        />
      </section>

      {/* Demo 7: Semantic DOM Styling */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Semantic DOM Styling</h3>
        <p style={{ color: "var(--ch-color-text-secondary, #64748b)", fontSize: 14, marginBottom: 12 }}>
          Fine-tune styles and class names for each semantic part: root, icon, and label.
        </p>
        <div style={{
          padding: 24,
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          background: "var(--ch-color-bg-container, #ffffff)",
          marginBottom: 12,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Object form */}
            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 8 }}>
                Object Configuration:
              </div>
              <Checkbox
                defaultChecked
                styles={{
                  root: {
                    padding: "8px 16px",
                    borderRadius: 6,
                    backgroundColor: "rgba(22, 119, 255, 0.06)",
                    border: "1px dashed #1677ff",
                  },
                  label: {
                    fontWeight: 600,
                    color: "#1677ff",
                  },
                }}
              >
                Branded Primary Card Checkbox
              </Checkbox>
            </div>

            {/* Function form */}
            <div>
              <div style={{ fontSize: 13, color: "var(--ch-color-text-secondary, #64748b)", marginBottom: 8 }}>
                Function Form (dynamic styling based on props):
              </div>
              <Checkbox
                defaultChecked
                styles={({ props }) => ({
                  root: {
                    padding: "8px 16px",
                    borderRadius: 6,
                    backgroundColor: props.checked ? "rgba(16, 185, 129, 0.1)" : "#f8fafc",
                    border: `1px solid ${props.checked ? "#10b981" : "#e2e8f0"}`,
                  },
                  label: {
                    color: props.checked ? "#059669" : "#64748b",
                    fontWeight: 500,
                  },
                })}
              >
                Success Accent Function Style
              </Checkbox>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* Object form */}
    <Checkbox
      defaultChecked
      styles={{
        root: {
          padding: '8px 16px',
          borderRadius: 6,
          backgroundColor: 'rgba(22, 119, 255, 0.06)',
          border: '1px dashed #1677ff',
        },
        label: {
          fontWeight: 600,
          color: '#1677ff',
        },
      }}
    >
      Branded Primary Card Checkbox
    </Checkbox>

    {/* Function form */}
    <Checkbox
      defaultChecked
      styles={({ props }) => ({
        root: {
          padding: '8px 16px',
          borderRadius: 6,
          backgroundColor: props.checked ? 'rgba(16, 185, 129, 0.1)' : '#f8fafc',
          border: \`1px solid \${props.checked ? '#10b981' : '#e2e8f0'}\`,
        },
        label: {
          color: props.checked ? '#059669' : '#64748b',
        },
      })}
    >
      Success Accent Function Style
    </Checkbox>
  </div>
);`}
        />
      </section>

      {/* API Reference */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>API Reference</h2>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Checkbox</h3>
        <PropsTable props={checkboxProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Checkbox.Group</h3>
        <PropsTable props={checkboxGroupProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>CheckboxOptionType</h3>
        <div style={{
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--ch-color-border, #e2e8f0)",
          marginBottom: 32,
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--ch-color-bg-layout, #f8fafc)", textAlign: "left" }}>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Property</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Type</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Default</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>label</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>ReactNode</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Label content displayed adjacent to checkbox</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>value</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>string | number | boolean</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Value identifier for group binding</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>disabled</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>boolean</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>false</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Whether this specific option is disabled</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>title</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>string</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}>Native title tooltip text</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code>onChange</code></td>
                <td style={{ padding: "12px 16px" }}><code>(e: CheckboxChangeEvent) =&gt; void</code></td>
                <td style={{ padding: "12px 16px" }}>-</td>
                <td style={{ padding: "12px 16px" }}>Custom change handler for option</td>
              </tr>
            </tbody>
          </table>
        </div>

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
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>controlInteractiveSize</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>width / height</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>16px</code></td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>borderRadiusSM</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>border-radius</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>4px</code></td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>colorPrimary</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>var(--ch-color-primary)</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--ch-color-border, #e2e8f0)" }}><code>#1677ff</code></td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code>colorBorder</code></td>
                <td style={{ padding: "12px 16px" }}><code>var(--ch-color-border)</code></td>
                <td style={{ padding: "12px 16px" }}><code>#d9d9d9</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CheckboxDocPage;
