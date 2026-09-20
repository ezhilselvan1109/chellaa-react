import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Steps,
  StepsType,
  StepsOrientation,
  StepsTitlePlacement,
  StepsSize,
  StepsVariant,
  StepStatus,
  Button,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";

const stepsPropsList: PropItem[] = [
  {
    name: "current",
    type: "number",
    defaultValue: "0",
    description: "To set the current step index, counting from 0.",
  },
  {
    name: "initial",
    type: "number",
    defaultValue: "0",
    description: "Set the initial step number, counting from 0.",
  },
  {
    name: "status",
    type: "'wait' | 'process' | 'finish' | 'error'",
    defaultValue: "'process'",
    description: "To specify the status of the current active step.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: "To specify the orientation of the step bar. Also supports legacy alias `direction`.",
  },
  {
    name: "type",
    type: "'default' | 'dot' | 'inline' | 'navigation' | 'panel'",
    defaultValue: "'default'",
    description: "Type of steps: 'default' numbered circles, 'dot' progress dots, 'navigation' tabs, 'inline' compact rows, or 'panel' card blocks.",
  },
  {
    name: "size",
    type: "'medium' | 'small'",
    defaultValue: "'medium'",
    description: "To specify the size of the step bar (medium 32px icons, small 24px icons).",
  },
  {
    name: "variant",
    type: "'filled' | 'outlined'",
    defaultValue: "'filled'",
    description: "Config style variant (Ant Design 6.0+).",
  },
  {
    name: "titlePlacement",
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    description: "Place title and content with horizontal or vertical direction relative to step icon. Also supports alias `labelPlacement`.",
  },
  {
    name: "percent",
    type: "number",
    defaultValue: "undefined",
    description: "Progress circle percentage (0 - 100) of current step in process status.",
  },
  {
    name: "responsive",
    type: "boolean",
    defaultValue: "true",
    description: "Change to vertical direction when screen width is narrower than 532px.",
  },
  {
    name: "maxCount",
    type: "number",
    defaultValue: "undefined",
    description: "Maximum number of step items to display (>= 3). Hidden ranges are collapsed into disabled ellipsis steps.",
  },
  {
    name: "items",
    type: "StepItem[]",
    defaultValue: "[]",
    description: "Step items configuration array. Recommended declarative API.",
  },
  {
    name: "onChange",
    type: "(current: number) => void",
    defaultValue: "undefined",
    description: "Triggered when a step is clicked. Automatically makes step items clickable and keyboard-focusable.",
  },
  {
    name: "iconRender",
    type: "(originNode, info: { index, active, item }) => ReactNode",
    defaultValue: "undefined",
    description: "Custom render function for step icons.",
  },
  {
    name: "classNames",
    type: "Record<SemanticDOM, string> | ((info: { props }) => Record<SemanticDOM, string>)",
    defaultValue: "undefined",
    description: "Customize class for each semantic DOM slot.",
  },
  {
    name: "styles",
    type: "Record<SemanticDOM, CSSProperties> | ((info: { props }) => Record<SemanticDOM, CSSProperties>)",
    defaultValue: "undefined",
    description: "Customize inline styles for each semantic DOM slot.",
  },
];

const stepItemPropsList: PropItem[] = [
  {
    name: "title",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Title of the step.",
  },
  {
    name: "subTitle",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Subtitle of the step, displayed alongside title.",
  },
  {
    name: "description",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Detailed description of the step. Can also use `content` alias.",
  },
  {
    name: "status",
    type: "'wait' | 'process' | 'finish' | 'error'",
    defaultValue: "auto",
    description: "Explicit status override for this step. If omitted, automatically resolved from Steps `current`.",
  },
  {
    name: "icon",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Custom icon for the step, overriding default number or status checkmark.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disable clicking on this step.",
  },
  {
    name: "onClick",
    type: "(event: MouseEvent) => void",
    defaultValue: "undefined",
    description: "Custom click handler for this step item.",
  },
];

const basicStepItems = [
  {
    title: "Finished",
    description: "This step is already finished.",
  },
  {
    title: "In Progress",
    subTitle: "Left 00:00:08",
    description: "Currently working on this step.",
  },
  {
    title: "Waiting",
    description: "Awaiting preceding step.",
  },
];

const longStepItems = [
  { title: "Step 1", description: "Initialize environment" },
  { title: "Step 2", description: "Compile packages" },
  { title: "Step 3", description: "Run test suite" },
  { title: "Step 4", description: "Bundle assets" },
  { title: "Step 5", description: "Deploy container" },
  { title: "Step 6", description: "Run healthcheck" },
  { title: "Step 7", description: "Verify production traffic" },
];

export const StepsDocPage: React.FC = () => {
  // Playground state
  const [current, setCurrent] = useState<number>(1);
  const [type, setType] = useState<StepsType>("default");
  const [orientation, setOrientation] = useState<StepsOrientation>("horizontal");
  const [titlePlacement, setTitlePlacement] = useState<StepsTitlePlacement>("horizontal");
  const [size, setSize] = useState<StepsSize>("medium");
  const [status, setStatus] = useState<StepStatus>("process");
  const [variant, setVariant] = useState<StepsVariant>("filled");
  const [percent, setPercent] = useState<number | undefined>(60);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [useMaxCount, setUseMaxCount] = useState<boolean>(false);

  // Demo state for interactive demos
  const [demoCurrent, setDemoCurrent] = useState<number>(0);
  const [navCurrent, setNavCurrent] = useState<number>(1);

  const playgroundCode = `<Steps
  current={${current}}
  status="${status}"
  type="${type}"
  orientation="${orientation}"
  titlePlacement="${titlePlacement}"
  size="${size}"
  variant="${variant}"${percent !== undefined && type === "default" ? `\n  percent={${percent}}` : ""}${useMaxCount ? `\n  maxCount={4}` : ""}${isClickable ? `\n  onChange={(next) => setCurrent(next)}` : ""}
  items={[
    { title: "Finished", description: "This step is finished." },
    { title: "In Progress", subTitle: "Left 00:00:08", description: "Currently active." },
    { title: "Waiting", description: "Awaiting predecessor." },
  ]}
/>`;

  return (
    <article className="docs-content" style={{ maxWidth: "68rem" }}>
      {/* Breadcrumb */}
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Steps</span>
      </div>

      {/* Header */}
      <div className="docs-title-row">
        <h1 className="docs-title">Steps</h1>
        <Badge variant="primary" size="md">
          Navigation
        </Badge>
        <Badge variant="success" size="md">
          Ant Design 5 & 6 Spec
        </Badge>
      </div>

      <p className="docs-description">
        A navigation bar that guides users through the steps of a sequential task. When a workflow is complex or multi-stage, decomposing it into steps provides clear progression and context.
      </p>

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <p className="docs-p">
        Test all step types, orientations, placements, and progress circles with live controls:
      </p>

      <ComponentPreview
        code={playgroundCode}
        controls={
          <>
            {/* Current Step */}
            <div className="preview-control-group">
              <span className="control-label">Step Index:</span>
              <div className="control-segmented-group">
                {[0, 1, 2, 3, 4, 5, 6].slice(0, useMaxCount ? 7 : 3).map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`control-pill ${current === idx ? "active" : ""}`}
                    onClick={() => setCurrent(idx)}
                  >
                    Step {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="preview-control-group">
              <span className="control-label">Type:</span>
              <div className="control-segmented-group">
                {(["default", "dot", "navigation", "inline", "panel"] as StepsType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`control-pill ${type === t ? "active" : ""}`}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="preview-control-group">
              <span className="control-label">Orientation:</span>
              <div className="control-segmented-group">
                {(["horizontal", "vertical"] as StepsOrientation[]).map((o) => (
                  <button
                    key={o}
                    type="button"
                    className={`control-pill ${orientation === o ? "active" : ""}`}
                    onClick={() => setOrientation(o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Placement */}
            <div className="preview-control-group">
              <span className="control-label">Title Placement:</span>
              <div className="control-segmented-group">
                {(["horizontal", "vertical"] as StepsTitlePlacement[]).map((tp) => (
                  <button
                    key={tp}
                    type="button"
                    className={`control-pill ${titlePlacement === tp ? "active" : ""}`}
                    onClick={() => setTitlePlacement(tp)}
                  >
                    {tp}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="preview-control-group">
              <span className="control-label">Size:</span>
              <div className="control-segmented-group">
                {(["medium", "small"] as StepsSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`control-pill ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="preview-control-group">
              <span className="control-label">Active Status:</span>
              <div className="control-segmented-group">
                {(["process", "wait", "finish", "error"] as StepStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`control-pill ${status === st ? "active" : ""}`}
                    onClick={() => setStatus(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant */}
            <div className="preview-control-group">
              <span className="control-label">Variant:</span>
              <div className="control-segmented-group">
                {(["filled", "outlined"] as StepsVariant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`control-pill ${variant === v ? "active" : ""}`}
                    onClick={() => setVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Percent */}
            <div className="preview-control-group">
              <span className="control-label">Percent:</span>
              <div className="control-segmented-group">
                {[undefined, 25, 60, 100].map((p) => (
                  <button
                    key={String(p)}
                    type="button"
                    className={`control-pill ${percent === p ? "active" : ""}`}
                    onClick={() => setPercent(p)}
                  >
                    {p !== undefined ? `${p}%` : "none"}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="preview-control-group" style={{ flexWrap: "wrap", gap: "12px" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isClickable}
                  onChange={(e) => setIsClickable(e.target.checked)}
                />
                Clickable (onChange)
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={useMaxCount}
                  onChange={(e) => {
                    setUseMaxCount(e.target.checked);
                    if (!e.target.checked && current > 2) setCurrent(1);
                  }}
                />
                maxCount=4 (7 Steps)
              </label>
            </div>
          </>
        }
      >
        <div style={{ width: "100%", padding: "16px 8px" }}>
          <Steps
            current={current}
            status={status}
            type={type}
            orientation={orientation}
            titlePlacement={titlePlacement}
            size={size}
            variant={variant}
            percent={percent}
            maxCount={useMaxCount ? 4 : undefined}
            onChange={isClickable ? (next) => setCurrent(next) : undefined}
            items={useMaxCount ? longStepItems : basicStepItems}
          />
        </div>
      </ComponentPreview>

      {/* 1. Basic Usage */}
      <h2 className="docs-section-heading">Basic Usage</h2>
      <p className="docs-p">
        The simplest step bar with automatically computed states (finished, in progress, waiting) based on <code>current</code>:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <Steps
    current={1}
    items={[
      { title: 'Finished', description: 'This step is finished.' },
      { title: 'In Progress', subTitle: 'Left 00:00:08', description: 'This is step description.' },
      { title: 'Waiting', description: 'This step is waiting.' },
    ]}
  />
);`}
      >
        <div style={{ width: "100%" }}>
          <Steps
            current={1}
            items={basicStepItems}
          />
        </div>
      </ComponentPreview>

      {/* 2. Error Status */}
      <h2 className="docs-section-heading">Error Status</h2>
      <p className="docs-p">
        Specify <code>status="error"</code> on Steps to represent an error occurred on the current step:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <Steps
    current={1}
    status="error"
    items={[
      { title: 'Finished', description: 'This step is finished.' },
      { title: 'In Process', description: 'Failed to complete transaction.' },
      { title: 'Waiting', description: 'Awaiting retry.' },
    ]}
  />
);`}
      >
        <div style={{ width: "100%" }}>
          <Steps
            current={1}
            status="error"
            items={[
              { title: "Finished", description: "This step is finished." },
              { title: "In Process", description: "Failed to complete transaction." },
              { title: "Waiting", description: "Awaiting retry." },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 3. Vertical Orientation */}
      <h2 className="docs-section-heading">Vertical Orientation</h2>
      <p className="docs-p">
        Set <code>orientation="vertical"</code> for vertical workflows:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <Steps
    orientation="vertical"
    current={1}
    items={[
      { title: 'Step 1', description: 'Configure project specifications.' },
      { title: 'Step 2', description: 'Provision deployment infrastructure.' },
      { title: 'Step 3', description: 'Deploy application services.' },
    ]}
  />
);`}
      >
        <div style={{ width: "100%", maxWidth: 360 }}>
          <Steps
            orientation="vertical"
            current={1}
            items={[
              { title: "Step 1", description: "Configure project specifications." },
              { title: "Step 2", description: "Provision deployment infrastructure." },
              { title: "Step 3", description: "Deploy application services." },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 4. Clickable Steps */}
      <h2 className="docs-section-heading">Clickable Steps</h2>
      <p className="docs-p">
        Supplying an <code>onChange</code> handler turns steps into clickable, keyboard-accessible navigation buttons:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Steps, Button } from '@chella-ui/react';

export const App = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      <Steps
        current={current}
        onChange={setCurrent}
        items={[
          { title: 'Account Setup', description: 'Enter email & password' },
          { title: 'Profile Details', description: 'Personal information' },
          { title: 'Confirmation', description: 'Review & finish' },
        ]}
      />
      <div style={{ display: 'flex', gap: 12 }}>
        <Button disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          Previous
        </Button>
        <Button type="primary" disabled={current === 2} onClick={() => setCurrent(current + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <Steps
            current={demoCurrent}
            onChange={setDemoCurrent}
            items={[
              { title: "Account Setup", description: "Enter email & password" },
              { title: "Profile Details", description: "Personal information" },
              { title: "Confirmation", description: "Review & finish" },
            ]}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <Button disabled={demoCurrent === 0} onClick={() => setDemoCurrent(demoCurrent - 1)}>
              Previous
            </Button>
            <Button type="primary" disabled={demoCurrent === 2} onClick={() => setDemoCurrent(demoCurrent + 1)}>
              Next
            </Button>
          </div>
        </div>
      </ComponentPreview>

      {/* 5. With Custom Icons */}
      <h2 className="docs-section-heading">Custom Icons</h2>
      <p className="docs-p">
        Supply custom icons per step item using the <code>icon</code> property:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <Steps
    items={[
      { title: 'Login', status: 'finish', icon: '👤' },
      { title: 'Verification', status: 'finish', icon: '🛡️' },
      { title: 'Pay', status: 'process', icon: '💳' },
      { title: 'Done', status: 'wait', icon: '🎉' },
    ]}
  />
);`}
      >
        <div style={{ width: "100%" }}>
          <Steps
            items={[
              { title: "Login", status: "finish", icon: "👤" },
              { title: "Verification", status: "finish", icon: "🛡️" },
              { title: "Pay", status: "process", icon: "💳" },
              { title: "Done", status: "wait", icon: "🎉" },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 6. Title Placement & Progress */}
      <h2 className="docs-section-heading">Title Placement Vertical & Progress Percent</h2>
      <p className="docs-p">
        Use <code>titlePlacement="vertical"</code> to center titles below icons, and <code>percent</code> to render an animated circular progress ring:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <Steps
    current={1}
    percent={75}
    titlePlacement="vertical"
    items={[
      { title: 'Finished', description: 'Completed step' },
      { title: '75% Uploaded', description: 'Uploading assets...' },
      { title: 'Waiting', description: 'Pending build' },
    ]}
  />
);`}
      >
        <div style={{ width: "100%" }}>
          <Steps
            current={1}
            percent={75}
            titlePlacement="vertical"
            items={[
              { title: "Finished", description: "Completed step" },
              { title: "75% Uploaded", description: "Uploading assets..." },
              { title: "Waiting", description: "Pending build" },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 7. Dot Style */}
      <h2 className="docs-section-heading">Dot Style (type="dot")</h2>
      <p className="docs-p">
        Minimalist progress dot style with <code>type="dot"</code>:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <Steps
    type="dot"
    current={1}
    titlePlacement="vertical"
    items={[
      { title: 'Step 1', description: 'Initiation' },
      { title: 'Step 2', description: 'Execution' },
      { title: 'Step 3', description: 'Review' },
      { title: 'Step 4', description: 'Launch' },
    ]}
  />
);`}
      >
        <div style={{ width: "100%" }}>
          <Steps
            type="dot"
            current={1}
            titlePlacement="vertical"
            items={[
              { title: "Step 1", description: "Initiation" },
              { title: "Step 2", description: "Execution" },
              { title: "Step 3", description: "Review" },
              { title: "Step 4", description: "Launch" },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 8. Navigation Steps */}
      <h2 className="docs-section-heading">Navigation Steps (type="navigation")</h2>
      <p className="docs-p">
        Header-style navigation step bar with chevron indicators between steps:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => {
  const [current, setCurrent] = useState(1);

  return (
    <Steps
      type="navigation"
      current={current}
      onChange={setCurrent}
      items={[
        { title: 'Step 1', subTitle: '00:00:05', status: 'finish', description: 'Data intake' },
        { title: 'Step 2', subTitle: '00:01:02', status: 'process', description: 'Transform' },
        { title: 'Step 3', status: 'wait', description: 'Publish' },
      ]}
    />
  );
};`}
      >
        <div style={{ width: "100%" }}>
          <Steps
            type="navigation"
            current={navCurrent}
            onChange={setNavCurrent}
            items={[
              { title: "Step 1", subTitle: "00:00:05", status: "finish", description: "Data intake" },
              { title: "Step 2", subTitle: "00:01:02", status: "process", description: "Transform" },
              { title: "Step 3", status: "wait", description: "Publish" },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 9. Inline & Panel Steps */}
      <h2 className="docs-section-heading">Inline & Panel Steps</h2>
      <p className="docs-p">
        <code>type="inline"</code> provides a lightweight compact layout for table rows or cards, while <code>type="panel"</code> wraps steps into card-like blocks:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
    {/* Inline Type */}
    <Steps
      type="inline"
      current={1}
      items={[
        { title: 'Build', subTitle: 'v1.2.0' },
        { title: 'Lint & Test', subTitle: 'Passing' },
        { title: 'Deploy', subTitle: 'Staging' },
      ]}
    />

    {/* Panel Type */}
    <Steps
      type="panel"
      current={1}
      items={[
        { title: 'Cart', description: '2 items' },
        { title: 'Checkout', description: 'Enter address' },
        { title: 'Payment', description: 'Credit card' },
      ]}
    />
  </div>
);`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <Steps
            type="inline"
            current={1}
            items={[
              { title: "Build", subTitle: "v1.2.0" },
              { title: "Lint & Test", subTitle: "Passing" },
              { title: "Deploy", subTitle: "Staging" },
            ]}
          />

          <Steps
            type="panel"
            current={1}
            items={[
              { title: "Cart", description: "2 items" },
              { title: "Checkout", description: "Enter address" },
              { title: "Payment", description: "Credit card" },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 10. Max Count & Collapsed Ellipsis */}
      <h2 className="docs-section-heading">Max Count & Collapsed Ellipsis</h2>
      <p className="docs-p">
        Limit visible step items with <code>maxCount</code> (&gt;= 3). Hidden intermediate ranges are automatically collapsed into disabled ellipsis steps (<code>•••</code>):
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Steps } from '@chella-ui/react';

export const App = () => (
  <Steps
    current={3}
    maxCount={4}
    items={[
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' },
      { title: 'Step 4' },
      { title: 'Step 5' },
      { title: 'Step 6' },
      { title: 'Step 7' },
    ]}
  />
);`}
      >
        <div style={{ width: "100%" }}>
          <Steps
            current={3}
            maxCount={4}
            items={longStepItems}
          />
        </div>
      </ComponentPreview>

      {/* Semantic DOM */}
      <h2 className="docs-section-heading">Semantic DOM Styling</h2>
      <p className="docs-p">
        Customize individual semantic DOM structures using <code>classNames</code> and <code>styles</code>:
      </p>

      <table className="props-table">
        <thead>
          <tr>
            <th>Semantic Slot</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>root</code></td>
            <td>Root container element with flex layout and orientation styles.</td>
          </tr>
          <tr>
            <td><code>item</code></td>
            <td>Step item container element.</td>
          </tr>
          <tr>
            <td><code>itemWrapper</code></td>
            <td>Step item wrapper element with interactive click handlers.</td>
          </tr>
          <tr>
            <td><code>itemIcon</code></td>
            <td>Step icon circle or dot element.</td>
          </tr>
          <tr>
            <td><code>itemHeader</code></td>
            <td>Header container for step title and subtitle.</td>
          </tr>
          <tr>
            <td><code>itemTitle</code></td>
            <td>Step title text element.</td>
          </tr>
          <tr>
            <td><code>itemSubtitle</code></td>
            <td>Step subtitle text element.</td>
          </tr>
          <tr>
            <td><code>itemSection</code></td>
            <td>Section containing the header and description.</td>
          </tr>
          <tr>
            <td><code>itemContent</code></td>
            <td>Step description text element.</td>
          </tr>
          <tr>
            <td><code>itemRail</code></td>
            <td>Connecting line rail element between adjacent steps.</td>
          </tr>
        </tbody>
      </table>

      {/* Props Reference */}
      <h2 className="docs-section-heading">API Reference</h2>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "1.5rem 0 0.75rem" }}>Steps Props</h3>
      <PropsTable props={stepsPropsList} />

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "2rem 0 0.75rem" }}>StepItem Props</h3>
      <PropsTable props={stepItemPropsList} />

      {/* Design Tokens */}
      <h2 className="docs-section-heading">Design Tokens</h2>
      <p className="docs-p">
        Steps utilizes Ant Design 5 & 6 CSS design tokens with full zero-runtime dark mode integration:
      </p>

      <table className="props-table">
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Description</th>
            <th>Default Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--steps-icon-size</code></td>
            <td>Size of step icon container.</td>
            <td><code>32px</code></td>
          </tr>
          <tr>
            <td><code>--steps-icon-size-sm</code></td>
            <td>Size of small step icon container.</td>
            <td><code>24px</code></td>
          </tr>
          <tr>
            <td><code>--steps-icon-font-size</code></td>
            <td>Font size inside step icon.</td>
            <td><code>14px</code></td>
          </tr>
          <tr>
            <td><code>--steps-dot-size</code></td>
            <td>Size of inactive dot in dot mode.</td>
            <td><code>8px</code></td>
          </tr>
          <tr>
            <td><code>--steps-dot-current-size</code></td>
            <td>Size of active dot in dot mode.</td>
            <td><code>10px</code></td>
          </tr>
          <tr>
            <td><code>--steps-nav-arrow-color</code></td>
            <td>Color of arrow chevron in navigation steps.</td>
            <td><code>rgba(0, 0, 0, 0.25)</code></td>
          </tr>
          <tr>
            <td><code>--steps-rail-color</code></td>
            <td>Color of connecting line rail.</td>
            <td><code>rgba(5, 5, 5, 0.08)</code></td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};
