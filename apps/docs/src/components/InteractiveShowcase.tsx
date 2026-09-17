import React, { useState, useRef } from "react";
import { Button } from "@chella-ui/react";

export const InteractiveShowcase: React.FC = () => {
  // Card 1: Slider state
  const [sliderVal, setSliderVal] = useState(65);

  // Card 2: Pin Input state
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...pin];
    updated[index] = val;
    setPin(updated);

    if (val && index < 3) {
      pinRefs[index + 1]?.current?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs[index - 1]?.current?.focus();
    }
  };

  // Card 3: Tabs state
  const [activeTab, setActiveTab] = useState<"Chella" | "Ark" | "Tokens">("Chella");

  // Card 4: Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="showcase-grid">
      {/* 1. Slider */}
      <div className="showcase-card">
        <div className="showcase-card-body">
          <div className="slider-wrapper">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="showcase-slider"
            />
            <div className="slider-val-indicator">{sliderVal}%</div>
          </div>
        </div>
        <div className="showcase-card-footer">Slider</div>
      </div>

      {/* 2. Pin Input */}
      <div className="showcase-card">
        <div className="showcase-card-body">
          <div className="pin-input-group">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                ref={pinRefs[idx]}
                type="text"
                maxLength={1}
                value={digit}
                placeholder="○"
                onChange={(e) => handlePinChange(idx, e.target.value)}
                onKeyDown={(e) => handlePinKeyDown(idx, e)}
                className="pin-box"
              />
            ))}
          </div>
        </div>
        <div className="showcase-card-footer">Pin Input</div>
      </div>

      {/* 3. Tabs */}
      <div className="showcase-card">
        <div className="showcase-card-body" style={{ flexDirection: "column", alignItems: "stretch", padding: "1.25rem 1.5rem" }}>
          <div className="segmented-tabs">
            {(["Chella", "Ark", "Tokens"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`segmented-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="tab-panel-text">
            {activeTab === "Chella" && "Chella UI is a component library for building high-speed web apps."}
            {activeTab === "Ark" && "Headless accessible state machine primitives with zero runtime."}
            {activeTab === "Tokens" && "Three-tier CSS custom properties cascade with instant dark mode."}
          </div>
        </div>
        <div className="showcase-card-footer">Tabs</div>
      </div>

      {/* 4. Menu */}
      <div className="showcase-card" style={{ position: "relative" }}>
        <div className="showcase-card-body">
          <div style={{ position: "relative" }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Open Menu
            </Button>
            {isMenuOpen && (
              <div className="menu-dropdown-popover">
                <div className="menu-item" onClick={() => setIsMenuOpen(false)}>⚡ New Component</div>
                <div className="menu-item" onClick={() => setIsMenuOpen(false)}>📦 Clone Repo</div>
                <div className="menu-item" onClick={() => setIsMenuOpen(false)}>⚙️ Design Tokens</div>
              </div>
            )}
          </div>
        </div>
        <div className="showcase-card-footer">Menu</div>
      </div>
    </div>
  );
};
