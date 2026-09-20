import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";

const modalProps: PropItem[] = [
  {
    name: "open",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the modal dialog is visible or not.",
  },
  {
    name: "title",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "The modal dialog's title.",
  },
  {
    name: "centered",
    type: "boolean",
    defaultValue: "false",
    description: "Centered Modal vertically in the viewport.",
  },
  {
    name: "closable",
    type: "boolean | ClosableType",
    defaultValue: "true",
    description: "Whether a close (x) button is visible on top right or not.",
  },
  {
    name: "closeIcon",
    type: "ReactNode",
    defaultValue: "<CloseOutlined />",
    description: "Custom close icon. Close button will be hidden when setting to null or false.",
  },
  {
    name: "confirmLoading",
    type: "boolean",
    defaultValue: "false",
    description: "Whether to apply loading visual effect for OK button or not.",
  },
  {
    name: "destroyOnClose",
    type: "boolean",
    defaultValue: "false",
    description: "Whether to unmount child components on close.",
  },
  {
    name: "footer",
    type: "ReactNode | ((originNode, extra) => ReactNode) | null",
    defaultValue: "(OK and Cancel buttons)",
    description: "Footer content, set as footer={null} when you don't need default buttons.",
  },
  {
    name: "keyboard",
    type: "boolean",
    defaultValue: "true",
    description: "Whether to support pressing Esc to close the modal.",
  },
  {
    name: "mask",
    type: "boolean | { enabled?: boolean; blur?: boolean; closable?: boolean }",
    defaultValue: "true",
    description: "Mask backdrop effect and blur options.",
  },
  {
    name: "maskClosable",
    type: "boolean",
    defaultValue: "true",
    description: "Whether to close the modal dialog when the mask is clicked.",
  },
  {
    name: "width",
    type: "string | number",
    defaultValue: "520",
    description: "Width of the modal dialog in pixels or CSS string.",
  },
  {
    name: "okText",
    type: "ReactNode",
    defaultValue: "'OK'",
    description: "Text of the OK button.",
  },
  {
    name: "cancelText",
    type: "ReactNode",
    defaultValue: "'Cancel'",
    description: "Text of the Cancel button.",
  },
  {
    name: "okType",
    type: "ButtonType",
    defaultValue: "'primary'",
    description: "Button type of the OK button.",
  },
  {
    name: "loading",
    type: "boolean",
    defaultValue: "false",
    description: "Show skeleton loading content placeholder.",
  },
  {
    name: "scrollLock",
    type: "boolean",
    defaultValue: "true",
    description: "Whether to lock body scroll when modal opens.",
  },
  {
    name: "onOk",
    type: "(e: MouseEvent) => void | Promise<any>",
    defaultValue: "undefined",
    description: "Specify a function that will be called when a user clicks the OK button.",
  },
  {
    name: "onCancel",
    type: "(e: MouseEvent) => void",
    defaultValue: "undefined",
    description: "Specify a function that will be called when user clicks mask, close icon, or Cancel button.",
  },
  {
    name: "classNames",
    type: "Record<ModalSemanticDOM, string> | ((info: { props }) => ...)",
    defaultValue: "undefined",
    description: "Customize class for each semantic structure (root, mask, container, wrapper, header, title, body, footer, close).",
  },
  {
    name: "styles",
    type: "Record<ModalSemanticDOM, CSSProperties> | ((info: { props }) => ...)",
    defaultValue: "undefined",
    description: "Customize inline style for each semantic structure.",
  },
];

const modalFuncProps: PropItem[] = [
  {
    name: "title",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Title of the confirmation modal dialog.",
  },
  {
    name: "content",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Content message rendered inside the confirmation body.",
  },
  {
    name: "icon",
    type: "ReactNode",
    defaultValue: "Type-specific icon",
    description: "Custom status icon on the left.",
  },
  {
    name: "okText",
    type: "string",
    defaultValue: "'OK'",
    description: "Text of the OK button.",
  },
  {
    name: "cancelText",
    type: "string",
    defaultValue: "'Cancel'",
    description: "Text of the Cancel button (for confirm mode).",
  },
  {
    name: "onOk",
    type: "function(close)",
    defaultValue: "undefined",
    description: "Callback on clicking OK. If it returns a promise, loading is maintained until resolved.",
  },
  {
    name: "onCancel",
    type: "function(close)",
    defaultValue: "undefined",
    description: "Callback on clicking Cancel.",
  },
];

const designTokens: PropItem[] = [
  {
    name: "contentBg",
    type: "string",
    defaultValue: "#ffffff",
    description: "Background color of the modal content card.",
  },
  {
    name: "colorBgMask",
    type: "string",
    defaultValue: "rgba(0,0,0,0.45)",
    description: "Background color of the backdrop mask layer.",
  },
  {
    name: "titleColor",
    type: "string",
    defaultValue: "rgba(0,0,0,0.88)",
    description: "Font color of the modal title.",
  },
  {
    name: "titleFontSize",
    type: "number",
    defaultValue: "16",
    description: "Font size of the title in pixels.",
  },
  {
    name: "borderRadiusLG",
    type: "number",
    defaultValue: "8",
    description: "Border radius of the modal content dialog container.",
  },
  {
    name: "zIndexPopupBase",
    type: "number",
    defaultValue: "1000",
    description: "Base z-index for floating modal dialogs.",
  },
];

export const ModalDocPage: React.FC = () => {
  // Playground state
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [centered, setCentered] = useState(false);
  const [closable, setClosable] = useState(true);
  const [maskClosable, setMaskClosable] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState<number>(520);
  const [footerMode, setFooterMode] = useState<"default" | "none" | "custom">("default");

  // Basic Demo state
  const [basicOpen, setBasicOpen] = useState(false);

  // Custom Footer state
  const [footerOpen, setFooterOpen] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);

  // Async Demo state
  const [asyncOpen, setAsyncOpen] = useState(false);
  const [asyncLoading, setAsyncLoading] = useState(false);

  // Position Demo state
  const [centeredOpen, setCenteredOpen] = useState(false);

  // Hook Demo state
  const [modal, contextHolder] = Modal.useModal();

  const handleAsyncOk = () => {
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncLoading(false);
      setAsyncOpen(false);
    }, 2000);
  };

  const handleCustomFooterSubmit = () => {
    setFooterLoading(true);
    setTimeout(() => {
      setFooterLoading(false);
      setFooterOpen(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 24px" }}>
      {contextHolder}

      {/* Breadcrumb & Navigation Header */}
      <nav style={{ marginBottom: 16, fontSize: 14, color: "#8c8c8c" }}>
        <Link to="/docs" style={{ color: "#1677ff", textDecoration: "none" }}>
          Components
        </Link>{" "}
        / Feedback / <span style={{ color: "#262626", fontWeight: 500 }}>Modal</span>
      </nav>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "#1f1f1f" }}>
            Modal
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
          Display a modal dialog box, providing a title, content area, and action buttons without
          interrupting the user's primary workflow.
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
            <Button type="primary" size="large" onClick={() => setPlaygroundOpen(true)}>
              Open Interactive Modal
            </Button>

            <Modal
              title="Interactive Modal Preview"
              open={playgroundOpen}
              centered={centered}
              closable={closable}
              maskClosable={maskClosable}
              confirmLoading={confirmLoading}
              loading={loading}
              width={width}
              footer={
                footerMode === "none"
                  ? null
                  : footerMode === "custom"
                  ? (_, { CancelBtn }) => (
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <Button type="dashed" onClick={() => alert("Custom action")}>
                          Custom Helper
                        </Button>
                        <div style={{ display: "flex", gap: 8 }}>
                          <CancelBtn />
                          <Button type="primary" onClick={() => setPlaygroundOpen(false)}>
                            Understood
                          </Button>
                        </div>
                      </div>
                    )
                  : undefined
              }
              onOk={() => setPlaygroundOpen(false)}
              onCancel={() => setPlaygroundOpen(false)}
            >
              <p style={{ margin: "0 0 12px 0" }}>
                This is an interactive dialog configured using the live controls below.
              </p>
              <p style={{ margin: 0, color: "#8c8c8c" }}>
                Modals preserve focus and state gracefully, rendering smoothly via portals.
              </p>
            </Modal>
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
                Width: {width}px
              </label>
              <div style={{ display: "flex", gap: 6 }}>
                {[400, 520, 680, 800].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWidth(w)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: "1px solid #d9d9d9",
                      backgroundColor: width === w ? "#1677ff" : "#fff",
                      color: width === w ? "#fff" : "#262626",
                      cursor: "pointer",
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Footer Layout
              </label>
              <select
                value={footerMode}
                onChange={(e) => setFooterMode(e.target.value as any)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="default">Default Buttons</option>
                <option value="none">No Footer (null)</option>
                <option value="custom">Custom Render Function</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={centered}
                  onChange={(e) => setCentered(e.target.checked)}
                />
                Centered Vertically
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={closable}
                  onChange={(e) => setClosable(e.target.checked)}
                />
                Closable (X Icon)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={maskClosable}
                  onChange={(e) => setMaskClosable(e.target.checked)}
                />
                Click Mask to Close
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={confirmLoading}
                  onChange={(e) => setConfirmLoading(e.target.checked)}
                />
                Confirm Loading
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={loading}
                  onChange={(e) => setLoading(e.target.checked)}
                />
                Skeleton Loading
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

        {/* 1. Basic Modal */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Basic Modal
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Standard modal dialog triggered by a button, featuring title, content, and default OK/Cancel buttons.
          </p>
          <ComponentPreview
            code={`import { useState } from 'react';
import { Modal, Button } from '@chella-ui/react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};`}
          >
            <div>
              <Button type="primary" onClick={() => setBasicOpen(true)}>
                Open Modal
              </Button>
              <Modal
                title="Basic Modal"
                open={basicOpen}
                onOk={() => setBasicOpen(false)}
                onCancel={() => setBasicOpen(false)}
              >
                <p style={{ margin: "0 0 8px 0" }}>Some contents...</p>
                <p style={{ margin: "0 0 8px 0" }}>Some contents...</p>
                <p style={{ margin: 0 }}>Some contents...</p>
              </Modal>
            </div>
          </ComponentPreview>
        </div>

        {/* 2. Customized Footer */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Customized Footer
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Customize the footer button bar with extra buttons, asynchronous actions, or suppress it completely with footer={null}.
          </p>
          <ComponentPreview
            code={`import { useState } from 'react';
import { Modal, Button } from '@chella-ui/react';

export default () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal with Customized Footer
      </Button>
      <Modal
        open={open}
        title="Customized Footer"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <p>Define custom buttons and async submission flows...</p>
      </Modal>
    </>
  );
};`}
          >
            <div>
              <Button type="primary" onClick={() => setFooterOpen(true)}>
                Open Modal with Customized Footer
              </Button>
              <Modal
                open={footerOpen}
                title="Customized Footer"
                onCancel={() => setFooterOpen(false)}
                footer={[
                  <Button key="back" onClick={() => setFooterOpen(false)}>
                    Return
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    loading={footerLoading}
                    onClick={handleCustomFooterSubmit}
                  >
                    Submit
                  </Button>,
                ]}
              >
                <p style={{ margin: 0 }}>
                  Define custom buttons and async submission flows with full flexibility.
                </p>
              </Modal>
            </div>
          </ComponentPreview>
        </div>

        {/* 3. Static Confirmations */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Static Confirmation Methods
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Trigger standalone floating dialogs imperatively with Modal.confirm, info, success, error, and warning.
          </p>
          <ComponentPreview
            code={`import { Modal, Button } from '@chella-ui/react';

export default () => {
  const showConfirm = () => {
    Modal.confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second.',
      onOk() {
        return new Promise((resolve) => setTimeout(resolve, 1000));
      },
    });
  };

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button onClick={showConfirm}>Confirm</Button>
      <Button onClick={() => Modal.info({ title: 'Info Notice', content: 'Here is informational content.' })}>
        Info
      </Button>
      <Button onClick={() => Modal.success({ title: 'Success', content: 'Operation completed successfully.' })}>
        Success
      </Button>
      <Button onClick={() => Modal.error({ title: 'Error', content: 'Failed to complete transaction.' })}>
        Error
      </Button>
      <Button onClick={() => Modal.warning({ title: 'Warning', content: 'Please review your storage quota.' })}>
        Warning
      </Button>
    </div>
  );
};`}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button
                onClick={() =>
                  Modal.confirm({
                    title: "Do you want to delete these items?",
                    content: "When clicked the OK button, this dialog will close after 1 second.",
                    onOk() {
                      return new Promise((resolve) => setTimeout(resolve, 1000));
                    },
                  })
                }
              >
                Confirm
              </Button>
              <Button
                onClick={() =>
                  Modal.info({
                    title: "Info Notice",
                    content: "Here is informational message content.",
                  })
                }
              >
                Info
              </Button>
              <Button
                onClick={() =>
                  Modal.success({
                    title: "Success",
                    content: "Operation completed successfully!",
                  })
                }
              >
                Success
              </Button>
              <Button
                onClick={() =>
                  Modal.error({
                    title: "Error Encountered",
                    content: "Failed to complete transaction. Please try again.",
                  })
                }
              >
                Error
              </Button>
              <Button
                onClick={() =>
                  Modal.warning({
                    title: "Warning",
                    content: "Your disk storage quota is nearly full.",
                  })
                }
              >
                Warning
              </Button>
            </div>
          </ComponentPreview>
        </div>

        {/* 4. Asynchronously Close */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Asynchronously Close
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Asynchronously close a modal dialog when the OK button is pressed, such as when submitting a form.
          </p>
          <ComponentPreview
            code={`import { useState } from 'react';
import { Modal, Button } from '@chella-ui/react';

export default () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal with Async Logic
      </Button>
      <Modal
        title="Async Modal"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <p>The dialog will be closed after the async task completes.</p>
      </Modal>
    </>
  );
};`}
          >
            <div>
              <Button type="primary" onClick={() => setAsyncOpen(true)}>
                Open Modal with Async Logic
              </Button>
              <Modal
                title="Async Modal"
                open={asyncOpen}
                onOk={handleAsyncOk}
                confirmLoading={asyncLoading}
                onCancel={() => setAsyncOpen(false)}
              >
                <p style={{ margin: 0 }}>
                  The modal dialog will remain open with an active spinner on the OK button until the
                  asynchronous task finishes.
                </p>
              </Modal>
            </div>
          </ComponentPreview>
        </div>

        {/* 5. Centered Modal */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Centered Modal
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Use centered property to vertically align the modal in the center of the viewport.
          </p>
          <ComponentPreview
            code={`import { useState } from 'react';
import { Modal, Button } from '@chella-ui/react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Display Centered Modal
      </Button>
      <Modal
        title="Vertically Centered Dialog"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>Centered in viewport...</p>
      </Modal>
    </>
  );
};`}
          >
            <div>
              <Button type="primary" onClick={() => setCenteredOpen(true)}>
                Display Centered Modal
              </Button>
              <Modal
                title="Vertically Centered Dialog"
                centered
                open={centeredOpen}
                onOk={() => setCenteredOpen(false)}
                onCancel={() => setCenteredOpen(false)}
              >
                <p style={{ margin: 0 }}>
                  This modal is vertically centered on the screen regardless of scroll position.
                </p>
              </Modal>
            </div>
          </ComponentPreview>
        </div>

        {/* 6. Hook Version (Modal.useModal) */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Use Hooks to Retain Context (Modal.useModal)
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Use Modal.useModal to create a contextHolder that retains all parent React contexts and supports Promise await.
          </p>
          <ComponentPreview
            code={`import { Modal, Button } from '@chella-ui/react';

export default () => {
  const [modal, contextHolder] = Modal.useModal();

  const handleConfirm = async () => {
    const confirmed = await modal.confirm({
      title: 'Context-Aware Confirmation',
      content: 'Supports Promise await directly without manual callbacks.',
    });
    console.log('Confirmed:', confirmed);
  };

  return (
    <>
      <Button onClick={handleConfirm}>Confirm with Hooks</Button>
      {contextHolder}
    </>
  );
};`}
          >
            <Button
              onClick={async () => {
                const confirmed = await modal.confirm({
                  title: "Context-Aware Confirmation",
                  content: "Supports Promise await directly without manual state plumbing.",
                });
                if (confirmed) {
                  alert("User confirmed!");
                }
              }}
            >
              Confirm with Hooks
            </Button>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: "#1f1f1f" }}>
          API Reference
        </h2>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: "#262626" }}>
          Modal Props
        </h3>
        <PropsTable props={modalProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: "#262626" }}>
          Modal.confirm / info / success / error / warning Props
        </h3>
        <PropsTable props={modalFuncProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: "#262626" }}>
          Design Tokens
        </h3>
        <PropsTable props={designTokens} />
      </section>
    </div>
  );
};
