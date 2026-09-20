import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Radio,
  RadioSize,
  RadioOptionTypeMode,
  RadioButtonStyle,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";

const radioProps: PropItem[] = [
  {
    name: "checked",
    type: "boolean",
    defaultValue: "false",
    description: "Specifies whether the radio is selected (controlled).",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    defaultValue: "false",
    description: "Specifies the initial state: whether or not the radio is selected (uncontrolled).",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disable radio interactions.",
  },
  {
    name: "value",
    type: "any",
    defaultValue: "undefined",
    description: "According to value for comparison, to determine whether it is selected.",
  },
  {
    name: "autoFocus",
    type: "boolean",
    defaultValue: "false",
    description: "If true, the radio is automatically focused upon initial mount.",
  },
  {
    name: "classNames",
    type: "Record<'root' | 'icon' | 'label', string> | ((info: { props }) => ...)",
    defaultValue: "undefined",
    description: "Customize class for each semantic structure inside the component (root, icon, label).",
  },
  {
    name: "styles",
    type: "Record<'root' | 'icon' | 'label', CSSProperties> | ((info: { props }) => ...)",
    defaultValue: "undefined",
    description: "Customize inline style for each semantic structure inside the component.",
  },
  {
    name: "onChange",
    type: "(e: RadioChangeEvent) => void",
    defaultValue: "undefined",
    description: "The callback function that is triggered when the state changes.",
  },
];

const radioGroupProps: PropItem[] = [
  {
    name: "value",
    type: "any",
    defaultValue: "undefined",
    description: "Used for setting the currently selected value (controlled).",
  },
  {
    name: "defaultValue",
    type: "any",
    defaultValue: "undefined",
    description: "Default selected value for uncontrolled usage.",
  },
  {
    name: "options",
    type: "(string | number | RadioOptionType)[]",
    defaultValue: "undefined",
    description: "Set children options automatically without manual mapping.",
  },
  {
    name: "optionType",
    type: "'default' | 'button'",
    defaultValue: "'default'",
    description: "Set Radio presentation style: default circular radio or button toggle.",
  },
  {
    name: "buttonStyle",
    type: "'outline' | 'solid'",
    defaultValue: "'outline'",
    description: "The style type of radio button.",
  },
  {
    name: "size",
    type: "'large' | 'medium' | 'small'",
    defaultValue: "'medium'",
    description: "The size of radio button style.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: "Orientation layout of radio items.",
  },
  {
    name: "vertical",
    type: "boolean",
    defaultValue: "false",
    description: "If true, the Radio group will be vertical. Orientation takes priority if both exist.",
  },
  {
    name: "block",
    type: "boolean",
    defaultValue: "false",
    description: "Option to fit RadioGroup width to its parent width (Ant Design 5.21.0+).",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disable all radio buttons within the group.",
  },
  {
    name: "name",
    type: "string",
    defaultValue: "undefined",
    description: "The name property of all input[type='radio'] children for browser keyboard navigation.",
  },
  {
    name: "onChange",
    type: "(e: RadioChangeEvent) => void",
    defaultValue: "undefined",
    description: "The callback function that is triggered when the selected value changes.",
  },
];

const radioOptionTypeProps: PropItem[] = [
  {
    name: "label",
    type: "ReactNode",
    defaultValue: "required",
    description: "The text or React node used to display as the Radio option.",
  },
  {
    name: "value",
    type: "string | number | boolean",
    defaultValue: "required",
    description: "The value associated with the Radio option.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Specifies whether the Radio option is disabled.",
  },
  {
    name: "title",
    type: "string",
    defaultValue: "undefined",
    description: "Adds native title tooltip attribute value.",
  },
  {
    name: "id",
    type: "string",
    defaultValue: "undefined",
    description: "Adds native ID attribute value.",
  },
];

const designTokens: PropItem[] = [
  {
    name: "radioSize",
    type: "number",
    defaultValue: "16",
    description: "Outer circle size of standard radio in pixels.",
  },
  {
    name: "dotSize",
    type: "number",
    defaultValue: "8",
    description: "Inner dot size of selected radio in pixels.",
  },
  {
    name: "dotColorDisabled",
    type: "string",
    defaultValue: "rgba(0,0,0,0.25)",
    description: "Color of disabled Radio dot indicator.",
  },
  {
    name: "buttonSolidCheckedBg",
    type: "string",
    defaultValue: "#1677ff",
    description: "Background color of checked solid Radio button.",
  },
  {
    name: "buttonSolidCheckedColor",
    type: "string",
    defaultValue: "#ffffff",
    description: "Text color of checked solid Radio button.",
  },
  {
    name: "buttonPaddingInline",
    type: "number",
    defaultValue: "15",
    description: "Horizontal padding of Radio button in pixels.",
  },
  {
    name: "wrapperMarginInlineEnd",
    type: "number",
    defaultValue: "8",
    description: "Margin right between adjacent radio items in pixels.",
  },
];

export const RadioDocPage: React.FC = () => {
  // Playground state
  const [playgroundVal, setPlaygroundVal] = useState<string>("apple");
  const [optionType, setOptionType] = useState<RadioOptionTypeMode>("default");
  const [buttonStyle, setButtonStyle] = useState<RadioButtonStyle>("outline");
  const [size, setSize] = useState<RadioSize>("medium");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [block, setBlock] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  // Demo controlled state
  const [demoValue, setDemoValue] = useState<string>("a");
  const [cityValue, setCityValue] = useState<string>("hangzhou");

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumb & Navigation Header */}
      <nav style={{ marginBottom: 16, fontSize: 14, color: "#8c8c8c" }}>
        <Link to="/docs" style={{ color: "#1677ff", textDecoration: "none" }}>
          Components
        </Link>{" "}
        / Data Entry / <span style={{ color: "#262626", fontWeight: 500 }}>Radio</span>
      </nav>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "#1f1f1f" }}>
            Radio
          </h1>
          <span
            style={{
              padding: "2px 10px",
              fontSize: 12,
              fontWeight: 500,
              borderRadius: 12,
              backgroundColor: "#e6f4ff",
              color: "#0958d9",
              border: "1px solid #91caff",
            }}
          >
            Ant Design 5 & 6 Spec
          </span>
        </div>
        <p style={{ fontSize: 16, color: "#595959", margin: 0, lineHeight: 1.6 }}>
          Used to select a single state from multiple options. Unlike Select, Radio exposes all
          choices visually, facilitating side-by-side comparison.
        </p>
      </div>

      {/* Interactive Playground */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: "#1f1f1f" }}>
          Interactive Playground
        </h2>
        <div
          style={{
            border: "1px solid #e8e8e8",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#fafafa",
          }}
        >
          <div
            style={{
              padding: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              minHeight: 140,
              gap: 16,
            }}
          >
            <div style={{ width: block ? "100%" : "auto", maxWidth: "100%" }}>
              <Radio.Group
                value={playgroundVal}
                onChange={(e) => setPlaygroundVal(e.target.value)}
                optionType={optionType}
                buttonStyle={buttonStyle}
                size={size}
                orientation={orientation}
                block={block}
                disabled={disabled}
                options={[
                  { label: "Apple", value: "apple" },
                  { label: "Pear", value: "pear" },
                  { label: "Orange", value: "orange" },
                  { label: "Banana", value: "banana" },
                ]}
              />
            </div>
            <span style={{ fontSize: 13, color: "#8c8c8c" }}>
              Selected: <strong style={{ color: "#1677ff" }}>{playgroundVal}</strong>
            </span>
          </div>

          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #f0f0f0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              fontSize: 13,
            }}
          >
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Option Type
              </label>
              <select
                value={optionType}
                onChange={(e) => setOptionType(e.target.value as RadioOptionTypeMode)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="default">Default (Circular)</option>
                <option value="button">Button (Segmented)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Button Style
              </label>
              <select
                value={buttonStyle}
                onChange={(e) => setButtonStyle(e.target.value as RadioButtonStyle)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="outline">Outline</option>
                <option value="solid">Solid</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as RadioSize)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as "horizontal" | "vertical")}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={block}
                  onChange={(e) => setBlock(e.target.checked)}
                />
                Block (100% Width)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Demos Section */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: "#1f1f1f" }}>
          Examples
        </h2>

        {/* 1. Basic Usage */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Basic
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            The simplest use of Radio with uncontrolled or controlled states.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Radio defaultChecked>Radio Option</Radio>
  </div>
);`}
          >
            <div style={{ display: "flex", gap: 16 }}>
              <Radio defaultChecked>Radio Option</Radio>
            </div>
          </ComponentPreview>
        </div>

        {/* 2. Radio Group */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Radio Group
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            A group of radio components with synchronized selection.
          </p>
          <ComponentPreview
            code={`import { useState } from 'react';
import { Radio } from '@chella-ui/react';

export default () => {
  const [value, setValue] = useState('a');

  return (
    <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
      <Radio value="a">A</Radio>
      <Radio value="b">B</Radio>
      <Radio value="c">C</Radio>
      <Radio value="d">D</Radio>
    </Radio.Group>
  );
};`}
          >
            <Radio.Group value={demoValue} onChange={(e) => setDemoValue(e.target.value)}>
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio value="c">C</Radio>
              <Radio value="d">D</Radio>
            </Radio.Group>
          </ComponentPreview>
        </div>

        {/* 3. Block Radio.Group */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Block Radio.Group
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            The block property makes a Radio.Group stretch to fit its parent container width.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <Radio.Group
    block
    defaultValue="apple"
    options={[
      { label: 'Apple', value: 'apple' },
      { label: 'Pear', value: 'pear' },
      { label: 'Orange', value: 'orange' },
    ]}
    optionType="button"
  />
);`}
          >
            <div style={{ width: "100%", maxWidth: 460 }}>
              <Radio.Group
                block
                defaultValue="apple"
                options={[
                  { label: "Apple", value: "apple" },
                  { label: "Pear", value: "pear" },
                  { label: "Orange", value: "orange" },
                ]}
                optionType="button"
              />
            </div>
          </ComponentPreview>
        </div>

        {/* 4. Radio Button Style */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Radio Style (Radio.Button)
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            The combination of radio button style, ideal for segmented toggle controls.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <Radio.Group defaultValue="hangzhou">
    <Radio.Button value="hangzhou">Hangzhou</Radio.Button>
    <Radio.Button value="shanghai">Shanghai</Radio.Button>
    <Radio.Button value="beijing">Beijing</Radio.Button>
    <Radio.Button value="chengdu">Chengdu</Radio.Button>
  </Radio.Group>
);`}
          >
            <Radio.Group
              value={cityValue}
              onChange={(e) => setCityValue(e.target.value)}
            >
              <Radio.Button value="hangzhou">Hangzhou</Radio.Button>
              <Radio.Button value="shanghai">Shanghai</Radio.Button>
              <Radio.Button value="beijing">Beijing</Radio.Button>
              <Radio.Button value="chengdu">Chengdu</Radio.Button>
            </Radio.Group>
          </ComponentPreview>
        </div>

        {/* 5. Size */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Size
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Three sizes are available: large, medium, and small. Coordinates with inputs and buttons.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group size="large" defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
    </Radio.Group>
    <Radio.Group size="medium" defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
    </Radio.Group>
    <Radio.Group size="small" defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
    </Radio.Group>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Radio.Group size="large" defaultValue="a">
                <Radio.Button value="a">Hangzhou</Radio.Button>
                <Radio.Button value="b">Shanghai</Radio.Button>
                <Radio.Button value="c">Beijing</Radio.Button>
              </Radio.Group>
              <Radio.Group size="medium" defaultValue="a">
                <Radio.Button value="a">Hangzhou</Radio.Button>
                <Radio.Button value="b">Shanghai</Radio.Button>
                <Radio.Button value="c">Beijing</Radio.Button>
              </Radio.Group>
              <Radio.Group size="small" defaultValue="a">
                <Radio.Button value="a">Hangzhou</Radio.Button>
                <Radio.Button value="b">Shanghai</Radio.Button>
                <Radio.Button value="c">Beijing</Radio.Button>
              </Radio.Group>
            </div>
          </ComponentPreview>
        </div>

        {/* 6. Solid Radio Button */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Solid Radio Button
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Solid radio button style provides high visual prominence using brand primary background.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <Radio.Group buttonStyle="solid" defaultValue="shanghai">
    <Radio.Button value="hangzhou">Hangzhou</Radio.Button>
    <Radio.Button value="shanghai">Shanghai</Radio.Button>
    <Radio.Button value="beijing">Beijing</Radio.Button>
    <Radio.Button value="chengdu">Chengdu</Radio.Button>
  </Radio.Group>
);`}
          >
            <Radio.Group buttonStyle="solid" defaultValue="shanghai">
              <Radio.Button value="hangzhou">Hangzhou</Radio.Button>
              <Radio.Button value="shanghai">Shanghai</Radio.Button>
              <Radio.Button value="beijing">Beijing</Radio.Button>
              <Radio.Button value="chengdu">Chengdu</Radio.Button>
            </Radio.Group>
          </ComponentPreview>
        </div>

        {/* 7. Disabled */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Disabled
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Radio options unavailable for user interaction.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Radio.Group defaultValue="a">
      <Radio value="a">Active</Radio>
      <Radio value="b" disabled>Disabled</Radio>
    </Radio.Group>
    <Radio.Group disabled defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
    </Radio.Group>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Radio.Group defaultValue="a">
                <Radio value="a">Active</Radio>
                <Radio value="b" disabled>Disabled</Radio>
              </Radio.Group>
              <Radio.Group disabled defaultValue="a">
                <Radio.Button value="a">Hangzhou</Radio.Button>
                <Radio.Button value="b">Shanghai</Radio.Button>
              </Radio.Group>
            </div>
          </ComponentPreview>
        </div>

        {/* 8. Vertical Radio.Group */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Vertical Radio.Group
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Vertical layout with stacked options.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <Radio.Group vertical defaultValue="1">
    <Radio value="1">Option A</Radio>
    <Radio value="2">Option B</Radio>
    <Radio value="3">Option C</Radio>
    <Radio value="4">More...</Radio>
  </Radio.Group>
);`}
          >
            <Radio.Group vertical defaultValue="1">
              <Radio value="1">Option A</Radio>
              <Radio value="2">Option B</Radio>
              <Radio value="3">Option C</Radio>
              <Radio value="4">More...</Radio>
            </Radio.Group>
          </ComponentPreview>
        </div>

        {/* 9. Radio.Group with Options */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Radio.Group with Options
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Render radios declaratively by configuring the options parameter.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group options={plainOptions} defaultValue="Apple" />
    <Radio.Group options={optionsWithDisabled} defaultValue="Apple" />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Radio.Group options={["Apple", "Pear", "Orange"]} defaultValue="Apple" />
              <Radio.Group
                options={[
                  { label: "Apple", value: "Apple" },
                  { label: "Pear", value: "Pear" },
                  { label: "Orange", value: "Orange", disabled: true },
                ]}
                defaultValue="Apple"
              />
            </div>
          </ComponentPreview>
        </div>

        {/* 10. Semantic DOM Styling */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Custom Semantic DOM Styling
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Customize styling of individual parts (root, icon, label) using classNames or styles functions.
          </p>
          <ComponentPreview
            code={`import { Radio } from '@chella-ui/react';

export default () => (
  <Radio
    styles={{
      icon: { borderColor: '#722ed1' },
      label: { color: '#722ed1', fontWeight: 600 },
    }}
    defaultChecked
  >
    Custom Brand Styled Radio
  </Radio>
);`}
          >
            <Radio
              styles={{
                icon: { borderColor: "#722ed1" },
                label: { color: "#722ed1", fontWeight: 600 },
              }}
              defaultChecked
            >
              Custom Brand Styled Radio
            </Radio>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: "#1f1f1f" }}>
          API Reference
        </h2>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: "#262626" }}>
          Radio / Radio.Button Props
        </h3>
        <PropsTable props={radioProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: "#262626" }}>
          Radio.Group Props
        </h3>
        <PropsTable props={radioGroupProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: "#262626" }}>
          RadioOptionType
        </h3>
        <PropsTable props={radioOptionTypeProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: "#262626" }}>
          Design Tokens
        </h3>
        <PropsTable props={designTokens} />
      </section>
    </div>
  );
};
