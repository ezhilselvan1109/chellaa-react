import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuMode,
  MenuTheme,
  ItemType,
  Button,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";

const menuPropsList: PropItem[] = [
  {
    name: "mode",
    type: "'horizontal' | 'vertical' | 'inline'",
    defaultValue: "'vertical'",
    description: "Type of menu layout: horizontal top-bar, vertical side-bar, or inline accordion.",
  },
  {
    name: "theme",
    type: "'light' | 'dark'",
    defaultValue: "'light'",
    description: "Color theme of the menu.",
  },
  {
    name: "items",
    type: "ItemType[]",
    defaultValue: "-",
    description: "Menu item content as an array of declarative items.",
  },
  {
    name: "selectedKeys",
    type: "string[]",
    defaultValue: "-",
    description: "Array with the keys of currently selected menu items (controlled).",
  },
  {
    name: "defaultSelectedKeys",
    type: "string[]",
    defaultValue: "[]",
    description: "Array with the keys of default selected menu items.",
  },
  {
    name: "openKeys",
    type: "string[]",
    defaultValue: "-",
    description: "Array with the keys of currently opened sub-menus (controlled).",
  },
  {
    name: "defaultOpenKeys",
    type: "string[]",
    defaultValue: "[]",
    description: "Array with the keys of default opened sub-menus.",
  },
  {
    name: "inlineCollapsed",
    type: "boolean",
    defaultValue: "false",
    description: "Specifies whether the menu is collapsed into an 80px icon rail in inline mode.",
  },
  {
    name: "inlineIndent",
    type: "number",
    defaultValue: "24",
    description: "Indent in pixels of inline menu items on each recursive level.",
  },
  {
    name: "selectable",
    type: "boolean",
    defaultValue: "true",
    description: "Allows selecting menu items.",
  },
  {
    name: "multiple",
    type: "boolean",
    defaultValue: "false",
    description: "Allows selection of multiple items.",
  },
  {
    name: "triggerSubMenuAction",
    type: "'hover' | 'click'",
    defaultValue: "'hover'",
    description: "Which action triggers submenu opening/closing in flyout mode.",
  },
  {
    name: "subMenuOpenDelay",
    type: "number",
    defaultValue: "0",
    description: "Delay time to show submenu when mouse enters (in seconds).",
  },
  {
    name: "subMenuCloseDelay",
    type: "number",
    defaultValue: "0.1",
    description: "Delay time to hide submenu when mouse leaves (in seconds).",
  },
  {
    name: "onClick",
    type: "(info: MenuClickInfo) => void",
    defaultValue: "-",
    description: "Called when any menu item is clicked.",
  },
  {
    name: "onSelect",
    type: "(info: MenuSelectInfo) => void",
    defaultValue: "-",
    description: "Called when a menu item is selected.",
  },
  {
    name: "onDeselect",
    type: "(info: MenuSelectInfo) => void",
    defaultValue: "-",
    description: "Called when a menu item is deselected (multiple mode only).",
  },
  {
    name: "onOpenChange",
    type: "(openKeys: string[]) => void",
    defaultValue: "-",
    description: "Called when sub-menus are opened or closed.",
  },
  {
    name: "popupRender",
    type: "(node: ReactElement, props) => ReactNode",
    defaultValue: "-",
    description: "Custom popup renderer for submenu flyouts.",
  },
  {
    name: "classNames",
    type: "Record<MenuSemanticDOM, string>",
    defaultValue: "-",
    description: "Customize class for each semantic structure inside the component.",
  },
  {
    name: "styles",
    type: "Record<MenuSemanticDOM, CSSProperties>",
    defaultValue: "-",
    description: "Customize inline style for each semantic structure inside the component.",
  },
];

const menuItemPropsList: PropItem[] = [
  {
    name: "key",
    type: "string",
    defaultValue: "-",
    description: "Unique identifier of the menu item (required for selection).",
  },
  {
    name: "label",
    type: "ReactNode",
    defaultValue: "-",
    description: "Content / label of the menu item.",
  },
  {
    name: "icon",
    type: "ReactNode",
    defaultValue: "-",
    description: "The icon of the menu item.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the menu item is disabled.",
  },
  {
    name: "danger",
    type: "boolean",
    defaultValue: "false",
    description: "Display the danger / destructive style.",
  },
  {
    name: "extra",
    type: "ReactNode",
    defaultValue: "-",
    description: "Extra content displayed on the right edge of the item.",
  },
  {
    name: "title",
    type: "string",
    defaultValue: "-",
    description: "Display tooltip or title attribute for collapsed state.",
  },
];

const subMenuPropsList: PropItem[] = [
  {
    name: "key",
    type: "string",
    defaultValue: "-",
    description: "Unique identifier of the sub-menu.",
  },
  {
    name: "label",
    type: "ReactNode",
    defaultValue: "-",
    description: "Title / label of the sub-menu trigger.",
  },
  {
    name: "icon",
    type: "ReactNode",
    defaultValue: "-",
    description: "Icon of the sub-menu trigger.",
  },
  {
    name: "children",
    type: "ItemType[]",
    defaultValue: "-",
    description: "Sub-menus or sub-menu items (supports arbitrary recursive nesting).",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the sub-menu is disabled.",
  },
  {
    name: "theme",
    type: "'light' | 'dark'",
    defaultValue: "-",
    description: "Color theme of the sub-menu (inherits from root Menu by default).",
  },
  {
    name: "popupClassName",
    type: "string",
    defaultValue: "-",
    description: "Custom CSS class for the flyout popup layer.",
  },
  {
    name: "popupOffset",
    type: "[number, number]",
    defaultValue: "-",
    description: "Sub-menu offset coordinates [x, y].",
  },
  {
    name: "onTitleClick",
    type: "function({ key, domEvent })",
    defaultValue: "-",
    description: "Callback executed when the sub-menu title trigger is clicked.",
  },
];

export const MenuDocPage: React.FC = () => {
  // Playground state
  const [mode, setMode] = useState<MenuMode>("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [isSelectable, setIsSelectable] = useState<boolean>(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["deep-perm-read"]);
  const [openKeys, setOpenKeys] = useState<string[]>(["sys-settings", "security-sub", "access-sub"]);

  // Dynamic Demos state
  const [inlineCollapsedDemo, setInlineCollapsedDemo] = useState<boolean>(false);
  const [accordionOpenKeys, setAccordionOpenKeys] = useState<string[]>(["sub1"]);
  const [dynMode, setDynMode] = useState<MenuMode>("inline");
  const [dynTheme, setDynTheme] = useState<MenuTheme>("light");

  // Playground Items with multi-level nested submenus (SubMenu into SubMenu into SubMenu)
  const playgroundItems: ItemType[] = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    {
      key: "sys-settings",
      label: "System Settings",
      icon: "⚙️",
      children: [
        { key: "profile", label: "User Profile" },
        {
          key: "security-sub",
          label: "Security & Privacy",
          icon: "🛡️",
          children: [
            { key: "two-factor", label: "2FA Verification" },
            {
              key: "access-sub",
              label: "Access Control (Deep)",
              icon: "🔑",
              children: [
                { key: "deep-perm-read", label: "Read Permission" },
                { key: "deep-perm-write", label: "Write Permission" },
                { key: "deep-perm-admin", label: "Admin Rights", danger: true },
              ],
            },
          ],
        },
        { key: "notifications", label: "Notifications" },
      ],
    },
    {
      type: "group",
      label: "DATA & STORAGE",
      children: [
        { key: "database", label: "Cloud Database", icon: "💾" },
        { key: "backups", label: "Scheduled Backups", icon: "📦" },
      ],
    },
    { type: "divider" },
    { key: "logout", label: "Sign Out", danger: true, icon: "🚪" },
  ];

  const playgroundCode = `<Menu
  mode="${mode}"
  theme="${theme}"${isCollapsed && mode === "inline" ? `\n  inlineCollapsed={true}` : ""}${isMultiple ? `\n  multiple={true}` : ""}${!isSelectable ? `\n  selectable={false}` : ""}
  selectedKeys={${JSON.stringify(selectedKeys)}}
  openKeys={${JSON.stringify(openKeys)}}
  onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
  onOpenChange={(keys) => setOpenKeys(keys)}
  items={[
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    {
      key: 'sys-settings',
      label: 'System Settings',
      icon: '⚙️',
      children: [
        { key: 'profile', label: 'User Profile' },
        {
          key: 'security-sub',
          label: 'Security & Privacy',
          icon: '🛡️',
          children: [
            { key: 'two-factor', label: '2FA Verification' },
            {
              key: 'access-sub',
              label: 'Access Control (Deep)',
              icon: '🔑',
              children: [
                { key: 'deep-perm-read', label: 'Read Permission' },
                { key: 'deep-perm-write', label: 'Write Permission' },
                { key: 'deep-perm-admin', label: 'Admin Rights', danger: true },
              ],
            },
          ],
        },
      ],
    },
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
        <span>Menu</span>
      </div>

      {/* Header */}
      <div className="docs-title-row">
        <h1 className="docs-title">Menu</h1>
        <Badge variant="primary" size="md">
          Navigation
        </Badge>
        <Badge variant="success" size="md">
          Ant Design 5 & 6 Spec
        </Badge>
      </div>

      <p className="docs-description">
        A versatile navigation menu for web applications. Provides top navigation for categories and global actions, as well as side navigation for multi-level hierarchical structures with support for deep recursive submenus (<strong>SubMenu into SubMenu into SubMenu</strong>).
      </p>

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <p className="docs-p">
        Test all menu modes, themes, deep multi-level submenus, and selection settings with live controls:
      </p>

      <ComponentPreview
        code={playgroundCode}
        controls={
          <>
            {/* Mode */}
            <div className="preview-control-group">
              <span className="control-label">Mode:</span>
              <div className="control-segmented-group">
                {(["inline", "vertical", "horizontal"] as MenuMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`control-pill ${mode === m ? "active" : ""}`}
                    onClick={() => setMode(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="preview-control-group">
              <span className="control-label">Theme:</span>
              <div className="control-segmented-group">
                {(["light", "dark"] as MenuTheme[]).map((th) => (
                  <button
                    key={th}
                    type="button"
                    className={`control-pill ${theme === th ? "active" : ""}`}
                    onClick={() => setTheme(th)}
                  >
                    {th}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="preview-control-group" style={{ flexWrap: "wrap", gap: "14px" }}>
              {mode === "inline" && (
                <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={isCollapsed}
                    onChange={(e) => setIsCollapsed(e.target.checked)}
                  />
                  inlineCollapsed (80px rail)
                </label>
              )}
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isMultiple}
                  onChange={(e) => setIsMultiple(e.target.checked)}
                />
                Multiple Selection
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isSelectable}
                  onChange={(e) => setIsSelectable(e.target.checked)}
                />
                Selectable
              </label>
            </div>

            {/* State Readouts */}
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "4px" }}>
              Selected: <strong>{selectedKeys.join(", ") || "none"}</strong> | Open: <strong>{openKeys.join(", ") || "none"}</strong>
            </div>
          </>
        }
      >
        <div style={{ width: "100%", padding: "16px 8px", display: "flex", justifyContent: mode === "horizontal" ? "flex-start" : "center" }}>
          <div style={{ width: mode === "horizontal" ? "100%" : (isCollapsed ? 80 : 280), transition: "width 0.3s" }}>
            <Menu
              mode={mode}
              theme={theme}
              inlineCollapsed={isCollapsed}
              multiple={isMultiple}
              selectable={isSelectable}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onSelect={({ selectedKeys: next }) => setSelectedKeys(next)}
              onDeselect={({ selectedKeys: next }) => setSelectedKeys(next)}
              onOpenChange={(keys) => setOpenKeys(keys)}
              items={playgroundItems}
            />
          </div>
        </div>
      </ComponentPreview>

      {/* 1. Top Navigation */}
      <h2 className="docs-section-heading">Top Navigation (mode="horizontal")</h2>
      <p className="docs-p">
        Horizontal navigation menu ideal for website headers, with dropdown flyouts for submenus and active indicator lines:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Menu } from '@chella-ui/react';

export const App = () => {
  const [current, setCurrent] = useState('mail');

  const items = [
    { key: 'mail', label: 'Navigation One', icon: '✉️' },
    { key: 'app', label: 'Navigation Two', icon: '📱', disabled: true },
    {
      key: 'SubMenu',
      label: 'Navigation Three - Submenu',
      icon: '⚙️',
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            { key: 'setting:1', label: 'Option 1' },
            { key: 'setting:2', label: 'Option 2' },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            { key: 'setting:3', label: 'Option 3' },
            { key: 'setting:4', label: 'Option 4' },
          ],
        },
      ],
    },
    {
      key: 'alipay',
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
    },
  ];

  return <Menu mode="horizontal" selectedKeys={[current]} onSelect={({ key }) => setCurrent(key)} items={items} />;
};`}
      >
        <div style={{ width: "100%" }}>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["mail"]}
            items={[
              { key: "mail", label: "Navigation One", icon: "✉️" },
              { key: "app", label: "Navigation Two", icon: "📱", disabled: true },
              {
                key: "SubMenu",
                label: "Navigation Three - Submenu",
                icon: "⚙️",
                children: [
                  {
                    type: "group",
                    label: "Item 1",
                    children: [
                      { key: "setting:1", label: "Option 1" },
                      { key: "setting:2", label: "Option 2" },
                    ],
                  },
                  {
                    type: "group",
                    label: "Item 2",
                    children: [
                      { key: "setting:3", label: "Option 3" },
                      { key: "setting:4", label: "Option 4" },
                    ],
                  },
                ],
              },
              {
                key: "alipay",
                label: "Navigation Four - Link",
              },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 2. Deep Multi-Level Submenus */}
      <h2 className="docs-section-heading">Multi-Level Submenus (Submenu into Submenu into Submenu)</h2>
      <p className="docs-p">
        Full recursive nesting support: A SubMenu inside a SubMenu inside a SubMenu. In inline mode, each level indents cleanly (<code>level * inlineIndent</code>), while in vertical and horizontal modes, each level opens as a cascading flyout to the right:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Menu } from '@chella-ui/react';

const deepItems = [
  { key: 'home', label: 'Home Page', icon: '🏠' },
  {
    key: 'level-1',
    label: 'Level 1 Submenu',
    icon: '📂',
    children: [
      { key: 'level-1-opt', label: 'Level 1 Direct Option' },
      {
        key: 'level-2',
        label: 'Level 2 Submenu',
        icon: '📁',
        children: [
          { key: 'level-2-opt', label: 'Level 2 Option' },
          {
            key: 'level-3',
            label: 'Level 3 Submenu (Deepest)',
            icon: '📄',
            children: [
              { key: 'level-3-a', label: 'Leaf Option A' },
              { key: 'level-3-b', label: 'Leaf Option B' },
            ],
          },
        ],
      },
    ],
  },
];

export const App = () => (
  <Menu
    mode="inline"
    defaultOpenKeys={['level-1', 'level-2', 'level-3']}
    defaultSelectedKeys={['level-3-a']}
    items={deepItems}
    style={{ width: 280 }}
  />
);`}
      >
        <div style={{ width: 280 }}>
          <Menu
            mode="inline"
            defaultOpenKeys={["level-1", "level-2", "level-3"]}
            defaultSelectedKeys={["level-3-a"]}
            style={{ width: 280 }}
            items={[
              { key: "home", label: "Home Page", icon: "🏠" },
              {
                key: "level-1",
                label: "Level 1 Submenu",
                icon: "📂",
                children: [
                  { key: "level-1-opt", label: "Level 1 Direct Option" },
                  {
                    key: "level-2",
                    label: "Level 2 Submenu",
                    icon: "📁",
                    children: [
                      { key: "level-2-opt", label: "Level 2 Option" },
                      {
                        key: "level-3",
                        label: "Level 3 Submenu (Deepest)",
                        icon: "📄",
                        children: [
                          { key: "level-3-a", label: "Leaf Option A" },
                          { key: "level-3-b", label: "Leaf Option B" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 3. Inline Menu */}
      <h2 className="docs-section-heading">Inline Menu (mode="inline")</h2>
      <p className="docs-p">
        Vertical menu with accordion submenus, smooth height expand/collapse transitions, and category groups:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Menu } from '@chella-ui/react';

const inlineItems = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: '✉️',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: '📱',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: '⚙️',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

export const App = () => (
  <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} items={inlineItems} style={{ width: 280 }} />
);`}
      >
        <div style={{ width: 280 }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ width: 280 }}
            items={[
              {
                key: "sub1",
                label: "Navigation One",
                icon: "✉️",
                children: [
                  {
                    type: "group",
                    label: "Item 1",
                    children: [
                      { key: "1", label: "Option 1" },
                      { key: "2", label: "Option 2" },
                    ],
                  },
                  {
                    type: "group",
                    label: "Item 2",
                    children: [
                      { key: "3", label: "Option 3" },
                      { key: "4", label: "Option 4" },
                    ],
                  },
                ],
              },
              {
                key: "sub2",
                label: "Navigation Two",
                icon: "📱",
                children: [
                  { key: "5", label: "Option 5" },
                  { key: "6", label: "Option 6" },
                  {
                    key: "sub3",
                    label: "Submenu",
                    children: [
                      { key: "7", label: "Option 7" },
                      { key: "8", label: "Option 8" },
                    ],
                  },
                ],
              },
              {
                key: "sub4",
                label: "Navigation Three",
                icon: "⚙️",
                children: [
                  { key: "9", label: "Option 9" },
                  { key: "10", label: "Option 10" },
                ],
              },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* 4. Collapsed Inline Menu */}
      <h2 className="docs-section-heading">Collapsed Inline Menu (inlineCollapsed)</h2>
      <p className="docs-p">
        Collapse an inline menu into a sleek 80px rail for sidebars. In collapsed mode, submenus seamlessly open as floating flyout popups upon hover:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Menu, Button } from '@chella-ui/react';

export const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ width: 280 }}>
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? '▶ Expand' : '◀ Collapse'}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={[
          { key: '1', icon: '🥧', label: 'Option 1' },
          { key: '2', icon: '📊', label: 'Option 2' },
          {
            key: 'sub1',
            icon: '✉️',
            label: 'Navigation One',
            children: [
              { key: '5', label: 'Option 5' },
              { key: '6', label: 'Option 6' },
            ],
          },
        ]}
      />
    </div>
  );
};`}
      >
        <div style={{ width: 280 }}>
          <Button
            type="primary"
            onClick={() => setInlineCollapsedDemo(!inlineCollapsedDemo)}
            style={{ marginBottom: 16 }}
          >
            {inlineCollapsedDemo ? "▶ Expand" : "◀ Collapse"}
          </Button>
          <div style={{ width: inlineCollapsedDemo ? 80 : 280, transition: "width 0.3s" }}>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              inlineCollapsed={inlineCollapsedDemo}
              items={[
                { key: "1", icon: "🥧", label: "Option 1" },
                { key: "2", icon: "📊", label: "Option 2" },
                {
                  key: "sub1",
                  icon: "✉️",
                  label: "Navigation One",
                  children: [
                    { key: "5", label: "Option 5" },
                    { key: "6", label: "Option 6" },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </ComponentPreview>

      {/* 5. Open Current Submenu Only */}
      <h2 className="docs-section-heading">Open Current Submenu Only (Accordion)</h2>
      <p className="docs-p">
        Using <code>onOpenChange</code> to automatically collapse other submenus when opening a new one, keeping sidebars tidy:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Menu } from '@chella-ui/react';

export const App = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={[
        { key: 'sub1', label: 'Navigation One', icon: '✉️', children: [{ key: '1', label: 'Option 1' }] },
        { key: 'sub2', label: 'Navigation Two', icon: '📱', children: [{ key: '2', label: 'Option 2' }] },
        { key: 'sub3', label: 'Navigation Three', icon: '⚙️', children: [{ key: '3', label: 'Option 3' }] },
      ]}
      style={{ width: 280 }}
    />
  );
};`}
      >
        <div style={{ width: 280 }}>
          <Menu
            mode="inline"
            openKeys={accordionOpenKeys}
            onOpenChange={(keys) => {
              const latest = keys.find((k) => !accordionOpenKeys.includes(k));
              setAccordionOpenKeys(latest ? [latest] : []);
            }}
            items={[
              {
                key: "sub1",
                label: "Navigation One",
                icon: "✉️",
                children: [
                  { key: "1", label: "Option 1" },
                  { key: "2", label: "Option 2" },
                ],
              },
              {
                key: "sub2",
                label: "Navigation Two",
                icon: "📱",
                children: [
                  { key: "3", label: "Option 3" },
                  { key: "4", label: "Option 4" },
                ],
              },
              {
                key: "sub3",
                label: "Navigation Three",
                icon: "⚙️",
                children: [
                  { key: "5", label: "Option 5" },
                  { key: "6", label: "Option 6" },
                ],
              },
            ]}
            style={{ width: 280 }}
          />
        </div>
      </ComponentPreview>

      {/* 6. Vertical Menu */}
      <h2 className="docs-section-heading">Vertical Menu (mode="vertical")</h2>
      <p className="docs-p">
        In vertical mode, submenus open as floating popup layers to the right instead of expanding inline:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Menu } from '@chella-ui/react';

export const App = () => (
  <Menu
    mode="vertical"
    defaultSelectedKeys={['1']}
    items={[
      {
        key: 'sub1',
        label: 'Navigation One',
        icon: '✉️',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: 'sub2',
        label: 'Navigation Two',
        icon: '📱',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ]}
    style={{ width: 240 }}
  />
);`}
      >
        <div style={{ width: 240 }}>
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "sub1",
                label: "Navigation One",
                icon: "✉️",
                children: [
                  { key: "1", label: "Option 1" },
                  { key: "2", label: "Option 2" },
                ],
              },
              {
                key: "sub2",
                label: "Navigation Two",
                icon: "📱",
                children: [
                  { key: "3", label: "Option 3" },
                  { key: "4", label: "Option 4" },
                ],
              },
            ]}
            style={{ width: 240 }}
          />
        </div>
      </ComponentPreview>

      {/* 7. Dark Theme */}
      <h2 className="docs-section-heading">Menu Themes (theme="dark")</h2>
      <p className="docs-p">
        Ant Design built-in dark theme with high-contrast color scheme (<code>#001529</code> background and primary highlights):
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Menu } from '@chella-ui/react';

export const App = () => (
  <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    items={[
      { key: '1', icon: '✉️', label: 'Navigation One' },
      {
        key: 'sub1',
        icon: '⚙️',
        label: 'Settings',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ]}
    style={{ width: 280 }}
  />
);`}
      >
        <div style={{ width: 280 }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={[
              { key: "1", icon: "✉️", label: "Navigation One" },
              {
                key: "sub1",
                icon: "⚙️",
                label: "Settings",
                children: [
                  { key: "3", label: "Option 3" },
                  { key: "4", label: "Option 4" },
                ],
              },
            ]}
            style={{ width: 280 }}
          />
        </div>
      </ComponentPreview>

      {/* 8. Submenu Theme Override */}
      <h2 className="docs-section-heading">Submenu Theme Override</h2>
      <p className="docs-p">
        Configure individual <code>SubMenu</code> themes to create layered visual contrast (e.g. dark root menu with light flyouts):
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Menu } from '@chella-ui/react';

export const App = () => (
  <Menu
    theme="dark"
    mode="vertical"
    items={[
      { key: '1', icon: '🏠', label: 'Home' },
      {
        key: 'sub-light',
        theme: 'light', // Overrides root dark theme
        icon: '📁',
        label: 'Light Flyout Submenu',
        children: [
          { key: 'sub-opt-1', label: 'Light Submenu Option 1' },
          { key: 'sub-opt-2', label: 'Light Submenu Option 2' },
        ],
      },
    ]}
    style={{ width: 240 }}
  />
);`}
      >
        <div style={{ width: 240 }}>
          <Menu
            theme="dark"
            mode="vertical"
            items={[
              { key: "1", icon: "🏠", label: "Home" },
              {
                key: "sub-light",
                theme: "light",
                icon: "📁",
                label: "Light Flyout Submenu",
                children: [
                  { key: "sub-opt-1", label: "Light Submenu Option 1" },
                  { key: "sub-opt-2", label: "Light Submenu Option 2" },
                ],
              },
            ]}
            style={{ width: 240 }}
          />
        </div>
      </ComponentPreview>

      {/* 9. Switch Menu Type Dynamically */}
      <h2 className="docs-section-heading">Switch Menu Mode Dynamically</h2>
      <p className="docs-p">
        Dynamically transition between <code>inline</code>, <code>vertical</code>, and <code>horizontal</code> modes:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Menu, Button } from '@chella-ui/react';

export const App = () => {
  const [mode, setMode] = useState('inline');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Button onClick={() => setMode('inline')}>Inline</Button>
        <Button onClick={() => setMode('vertical')}>Vertical</Button>
        <Button onClick={() => setMode('horizontal')}>Horizontal</Button>
      </div>
      <Menu mode={mode} defaultSelectedKeys={['1']} items={...} />
    </div>
  );
};`}
      >
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <Button
              type={dynMode === "inline" ? "primary" : "default"}
              onClick={() => setDynMode("inline")}
            >
              Inline
            </Button>
            <Button
              type={dynMode === "vertical" ? "primary" : "default"}
              onClick={() => setDynMode("vertical")}
            >
              Vertical
            </Button>
            <Button
              type={dynMode === "horizontal" ? "primary" : "default"}
              onClick={() => setDynMode("horizontal")}
            >
              Horizontal
            </Button>
            <Button
              onClick={() => setDynTheme(dynTheme === "light" ? "dark" : "light")}
            >
              Toggle {dynTheme === "light" ? "Dark" : "Light"}
            </Button>
          </div>
          <div style={{ width: dynMode === "horizontal" ? "100%" : 280 }}>
            <Menu
              mode={dynMode}
              theme={dynTheme}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              items={[
                { key: "1", icon: "📧", label: "Mail Inbox" },
                {
                  key: "sub1",
                  icon: "📂",
                  label: "Folders",
                  children: [
                    { key: "sub-1", label: "Archive" },
                    { key: "sub-2", label: "Spam", danger: true },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </ComponentPreview>

      {/* 10. Custom Popup Render */}
      <h2 className="docs-section-heading">Custom Submenu Render (popupRender)</h2>
      <p className="docs-p">
        Use the <code>popupRender</code> callback to inject custom headers or footers into flyout popups:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Menu } from '@chella-ui/react';

export const App = () => (
  <Menu
    mode="horizontal"
    items={[
      {
        key: 'custom-sub',
        label: 'Custom Popup Footer',
        icon: '🎨',
        popupRender: (menuNode) => (
          <div>
            {menuNode}
            <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0', fontSize: 12, color: '#888' }}>
              💡 Quick shortcut: Press <strong>Ctrl + K</strong>
            </div>
          </div>
        ),
        children: [
          { key: 'action-1', label: 'Create New Project' },
          { key: 'action-2', label: 'Import Repository' },
        ],
      },
    ]}
  />
);`}
      >
        <div style={{ width: "100%" }}>
          <Menu
            mode="horizontal"
            items={[
              {
                key: "custom-sub",
                label: "Custom Popup Footer",
                icon: "🎨",
                popupRender: (menuNode) => (
                  <div>
                    {menuNode}
                    <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(0,0,0,0.06)", fontSize: 12, color: "var(--color-text-secondary)" }}>
                      💡 Quick shortcut: Press <strong>Ctrl + K</strong>
                    </div>
                  </div>
                ),
                children: [
                  { key: "action-1", label: "Create New Project" },
                  { key: "action-2", label: "Import Repository" },
                ],
              },
            ]}
          />
        </div>
      </ComponentPreview>

      {/* Props Tables */}
      <h2 className="docs-section-heading">API Reference</h2>
      <h3 className="docs-section-heading" style={{ fontSize: "1.2rem" }}>Menu Props</h3>
      <PropsTable props={menuPropsList} />

      <h3 className="docs-section-heading" style={{ fontSize: "1.2rem", marginTop: 32 }}>MenuItemType Props</h3>
      <PropsTable props={menuItemPropsList} />

      <h3 className="docs-section-heading" style={{ fontSize: "1.2rem", marginTop: 32 }}>SubMenuType Props</h3>
      <PropsTable props={subMenuPropsList} />
    </article>
  );
};
