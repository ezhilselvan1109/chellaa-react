import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Badge, Spinner, Input, FloatButton, Divider, Flex } from "@chella-ui/react";

interface ComponentItem {
  id: string;
  name: string;
  category: "General" | "Data Entry" | "Feedback" | "Layout";
  description: string;
  href: string;
  status: "Stable" | "Phase 4" | "Phase 6" | "Phase 7";
  preview: React.ReactNode;
}

const componentList: ComponentItem[] = [
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
