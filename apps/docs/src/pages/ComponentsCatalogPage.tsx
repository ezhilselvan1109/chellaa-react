import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Badge, Spinner, Input, FloatButton, Divider, Flex, Row, Col, Masonry, AutoComplete, Checkbox, DatePicker, Radio, Select, Steps, Menu, AppstoreOutlined, SettingOutlined } from "@chella-ui/react";

interface ComponentItem {
  id: string;
  name: string;
  category: "General" | "Data Entry" | "Feedback" | "Layout" | "Navigation";
  description: string;
  href: string;
  status: "Stable" | "Phase 4" | "Phase 6" | "Phase 7";
  preview: React.ReactNode;
}

const componentList: ComponentItem[] = [
  {
    id: "masonry",
    name: "Masonry",
    category: "Layout",
    description: "Adaptive masonry column layout for displaying content with different heights.",
    href: "/docs/components/masonry",
    status: "Stable",
    preview: (
      <Masonry
        columns={3}
        gutter={4}
        style={{ width: "90%" }}
        items={[
          { key: "1", height: 26, children: <div style={{ height: 26, borderRadius: 4, background: "var(--ch-color-primary)" }} /> },
          { key: "2", height: 38, children: <div style={{ height: 38, borderRadius: 4, background: "var(--ch-color-secondary, #6366f1)" }} /> },
          { key: "3", height: 20, children: <div style={{ height: 20, borderRadius: 4, background: "var(--ch-color-accent, #06b6d4)" }} /> },
          { key: "4", height: 30, children: <div style={{ height: 30, borderRadius: 4, background: "#ec4899" }} /> },
          { key: "5", height: 24, children: <div style={{ height: 24, borderRadius: 4, background: "#f59e0b" }} /> },
          { key: "6", height: 34, children: <div style={{ height: 34, borderRadius: 4, background: "#10b981" }} /> },
        ]}
      />
    ),
  },
  {
    id: "grid",
    name: "Grid",
    category: "Layout",
    description: "24-column proportional grid system with responsive breakpoints, gutters, offsets, and flex stretch.",
    href: "/docs/components/grid",
    status: "Stable",
    preview: (
      <Row gutter={[4, 4]} style={{ width: "90%" }}>
        <Col span={8}><div style={{ height: 20, borderRadius: 4, background: "var(--ch-color-primary)" }} /></Col>
        <Col span={8}><div style={{ height: 20, borderRadius: 4, background: "var(--ch-color-secondary, #6366f1)" }} /></Col>
        <Col span={8}><div style={{ height: 20, borderRadius: 4, background: "var(--ch-color-accent, #06b6d4)" }} /></Col>
        <Col span={12}><div style={{ height: 20, borderRadius: 4, background: "var(--ch-color-secondary, #6366f1)" }} /></Col>
        <Col span={12}><div style={{ height: 20, borderRadius: 4, background: "var(--ch-color-primary)" }} /></Col>
      </Row>
    ),
  },
  {
    id: "flex",
    name: "Flex",
    category: "Layout",
    description: "A flex layout container for setting spacing and alignment between elements.",
    href: "/docs/components/flex",
    status: "Stable",
    preview: (
      <Flex gap="small" justify="center" align="center" style={{ width: "90%" }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--ch-color-primary)" }} />
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--ch-color-secondary, #6366f1)" }} />
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--ch-color-accent, #06b6d4)" }} />
      </Flex>
    ),
  },
  {
    id: "divider",
    name: "Divider",
    category: "Layout",
    description: "A line that separates different content blocks or inline elements with titles and dash styles.",
    href: "/docs/components/divider",
    status: "Stable",
    preview: (
      <div style={{ width: "90%", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Divider dashed style={{ margin: "0.5rem 0" }}>Title</Divider>
      </div>
    ),
  },
  {
    id: "button",
    name: "Button",
    category: "General",
    description: "Interactive button with variants, sizes, loading spinners, and slot polymorphism.",
    href: "/docs/components/button",
    status: "Stable",
    preview: (
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="primary" size="sm">Primary</Button>
        <Button variant="outline" size="sm">Outline</Button>
      </div>
    ),
  },
  {
    id: "float-button",
    name: "FloatButton",
    category: "General",
    description: "Floating action button with group menu modes and BackTop scroll progress ring.",
    href: "/docs/components/float-button",
    status: "Stable",
    preview: (
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", justifyContent: "center" }}>
        <FloatButton inGroup shape="circle" icon={<span>★</span>} />
        <FloatButton inGroup type="primary" shape="circle" icon={<span>↑</span>} />
      </div>
    ),
  },
  {
    id: "badge",
    name: "Badge",
    category: "General",
    description: "Small status descriptors for categorizing numbers, statuses, and tags.",
    href: "/docs/components/badge",
    status: "Stable",
    preview: (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
      </div>
    ),
  },
  {
    id: "input",
    name: "Input",
    category: "Data Entry",
    description: "Accessible text input field with size scales, focus ring, and invalid error states.",
    href: "/docs/components/input",
    status: "Stable",
    preview: (
      <div style={{ width: "100%", maxWidth: 220 }}>
        <Input placeholder="Enter email..." size="sm" />
      </div>
    ),
  },
  {
    id: "auto-complete",
    name: "AutoComplete",
    category: "Data Entry",
    description: "Autocomplete function of input field with suggestions and helping text.",
    href: "/docs/components/auto-complete",
    status: "Stable",
    preview: (
      <div style={{ width: "100%", maxWidth: 220 }}>
        <AutoComplete
          placeholder="Search..."
          size="small"
          allowClear
          options={[{ value: "React" }, { value: "Chella UI" }]}
        />
      </div>
    ),
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Data Entry",
    description: "Collect user choices with support for single checkboxes, indeterminate tri-states, and groups.",
    href: "/docs/components/checkbox",
    status: "Stable",
    preview: (
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
        <Checkbox defaultChecked>Option A</Checkbox>
        <Checkbox indeterminate>Option B</Checkbox>
      </div>
    ),
  },
  {
    id: "date-picker",
    name: "DatePicker",
    category: "Data Entry",
    description: "To select or input a date or date range from an interactive calendar popup.",
    href: "/docs/components/date-picker",
    status: "Stable",
    preview: (
      <div style={{ width: "100%", maxWidth: 220 }}>
        <DatePicker size="small" placeholder="Select date" />
      </div>
    ),
  },
  {
    id: "radio",
    name: "Radio",
    category: "Data Entry",
    description: "Used to select a single state from multiple options with circular and button styles.",
    href: "/docs/components/radio",
    status: "Stable",
    preview: (
      <Radio.Group defaultValue="a" size="small">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </Radio.Group>
    ),
  },
  {
    id: "select",
    name: "Select",
    category: "Data Entry",
    description: "A dropdown menu for displaying choices with single, multiple tags, and custom freeform tags.",
    href: "/docs/components/select",
    status: "Stable",
    preview: (
      <div style={{ width: "100%", maxWidth: 220 }}>
        <Select
          size="small"
          placeholder="Select item"
          defaultValue="lucy"
          options={[
            { label: "Jack", value: "jack" },
            { label: "Lucy", value: "lucy" },
          ]}
        />
      </div>
    ),
  },
  {
    id: "steps",
    name: "Steps",
    category: "Navigation",
    description: "A navigation bar that guides users through the sequential steps of a task.",
    href: "/docs/components/steps",
    status: "Stable",
    preview: (
      <div style={{ width: "100%", maxWidth: 260 }}>
        <Steps
          size="small"
          current={1}
          items={[
            { title: "Step 1" },
            { title: "Step 2" },
            { title: "Step 3" },
          ]}
        />
      </div>
    ),
  },
  {
    id: "menu",
    name: "Menu",
    category: "Navigation",
    description: "A versatile navigation menu with multi-level submenus, inline accordion, and flyout popups.",
    href: "/docs/components/menu",
    status: "Stable",
    preview: (
      <div style={{ width: "100%", maxWidth: 200, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 6, overflow: "hidden" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", label: "Dashboard", icon: <AppstoreOutlined /> },
            { key: "2", label: "Settings", icon: <SettingOutlined /> },
          ]}
        />
      </div>
    ),
  },
  {
    id: "modal",
    name: "Modal",
    category: "Feedback",
    description: "Display a modal dialog box, providing a title, content area, and action buttons.",
    href: "/docs/components/modal",
    status: "Stable",
    preview: (
      <div style={{ padding: "8px 14px", border: "1px solid #d9d9d9", borderRadius: 6, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", fontSize: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Dialog Title</div>
        <div style={{ color: "#8c8c8c" }}>Modal content preview...</div>
      </div>
    ),
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "Feedback",
    description: "Accessible circular progress indicator for asynchronous actions and loading states.",
    href: "/docs/components/spinner",
    status: "Stable",
    preview: (
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Spinner size="sm" />
        <Spinner size="md" color="var(--ch-teal)" />
      </div>
    ),
  },
  {
    id: "slider",
    name: "Slider",
    category: "Data Entry",
    description: "Range slider allowing users to adjust numeric values along a track.",
    href: "/",
    status: "Phase 4",
    preview: (
      <div style={{ width: "80%", height: 6, background: "var(--docs-border)", borderRadius: 99, position: "relative" }}>
        <div style={{ width: "60%", height: "100%", background: "var(--ch-teal)", borderRadius: 99 }} />
        <div style={{ position: "absolute", left: "60%", top: -5, width: 16, height: 16, borderRadius: "50%", background: "var(--ch-teal)", boxShadow: "0 0 10px rgba(45,212,191,0.5)" }} />
      </div>
    ),
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Layout",
    description: "Segmented tab views for organizing content across switchable views.",
    href: "/",
    status: "Phase 7",
    preview: (
      <div style={{ display: "flex", gap: "0.25rem", background: "var(--docs-bg-muted)", padding: "0.2rem", borderRadius: 6 }}>
        <span style={{ padding: "0.25rem 0.5rem", borderRadius: 4, background: "var(--docs-bg-surface)", fontSize: "0.75rem", fontWeight: 600 }}>Active</span>
        <span style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", color: "var(--docs-fg-muted)" }}>Inactive</span>
      </div>
    ),
  },
];

export const ComponentsCatalogPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "General", "Data Entry", "Feedback", "Layout"];

  const filteredComponents = useMemo(() => {
    return componentList.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <article className="docs-content" style={{ maxWidth: "68rem" }}>
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Docs</span>
        <span>/</span>
        <span>Components</span>
      </div>

      <div className="catalog-header">
        <div className="docs-title-row">
          <h1 className="docs-title">Components Gallery</h1>
          <Badge variant="primary" size="md">
            {filteredComponents.length} Components
          </Badge>
        </div>
        <p className="docs-description">
          A modular collection of production-quality, fully accessible React components engineered for speed, flexibility, and zero CSS setup.
        </p>
      </div>

      <div className="catalog-search-bar">
        <input
          type="text"
          className="catalog-search-input"
          placeholder="Search components by name or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="catalog-filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`catalog-filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="catalog-cards-grid">
        {filteredComponents.map((item) => (
          <Link to={item.href} key={item.id} className="catalog-card">
            <div className="catalog-card-preview">{item.preview}</div>
            <div className="catalog-card-info">
              <div className="catalog-card-title-row">
                <h3 className="catalog-card-title">{item.name}</h3>
                <Badge
                  variant={item.status === "Stable" ? "success" : "default"}
                  size="sm"
                >
                  {item.status}
                </Badge>
              </div>
              <p className="catalog-card-desc">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};
