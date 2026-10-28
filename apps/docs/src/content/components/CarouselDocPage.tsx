import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Carousel, CarouselSlide } from "@chellaa/react";

export const carouselToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "looping-and-autoplay", title: "Looping & Autoplay" },
  { id: "compound-slides", title: "Compound Slides" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const carouselPropsData: PropRow[] = [
  {
    name: "slides",
    type: "(ReactNode | CarouselSlideData)[]",
    default: "[]",
    description: "Array of slide items to render. Alternatively pass children.",
  },
  {
    name: "activeSlide",
    type: "number",
    default: "undefined",
    description: "Controlled index of the active slide.",
  },
  {
    name: "defaultActiveSlide",
    type: "number",
    default: "0",
    description: "Initial active slide index in uncontrolled mode.",
  },
  {
    name: "onSlideChange",
    type: "(index: number) => void",
    default: "undefined",
    description: "Callback fired when the active slide changes.",
  },
  {
    name: "loop",
    type: "boolean",
    default: "false",
    description: "Whether previous/next navigation continuously wraps around.",
  },
  {
    name: "showControls",
    type: "boolean",
    default: "true",
    description: "Whether arrow navigation buttons are rendered.",
  },
  {
    name: "showPagination",
    type: "boolean",
    default: "true",
    description: "Whether pagination dot indicators are displayed.",
  },
  {
    name: "autoPlay",
    type: "boolean",
    default: "false",
    description: "Whether automatic slide rotation is enabled.",
  },
  {
    name: "autoPlayInterval",
    type: "number",
    default: "5000",
    description: "Milliseconds between automatic slide transitions.",
  },
  {
    name: "pauseOnHover",
    type: "boolean",
    default: "true",
    description: "Whether autoplay pauses while pointer hovers the carousel.",
  },
  {
    name: "pauseOnFocus",
    type: "boolean",
    default: "true",
    description: "Whether autoplay pauses when an element receives focus.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Whether the carousel interactions are disabled.",
  },
  {
    name: "ariaLabel",
    type: "string",
    default: "'Content Carousel'",
    description: "Accessible name for the carousel landmark region.",
  },
];

const sampleSlides = [
  <div
    key="1"
    style={{
      height: 180,
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    }}
  >
    <h3>Slide 1: Design Systems</h3>
  </div>,
  <div
    key="2"
    style={{
      height: 180,
      background: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    }}
  >
    <h3>Slide 2: Accessibility First</h3>
  </div>,
  <div
    key="3"
    style={{
      height: 180,
      background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    }}
  >
    <h3>Slide 3: Lightning Fast</h3>
  </div>,
];

export function CarouselDocPage() {
  return (
    <ComponentDocLayout
      title="Carousel"
      description="Accessible content rotator implementing the WAI-ARIA Carousel Pattern with slide navigation, pagination dots, looping, touch swiping, and autoplay."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { Carousel, CarouselSlide } from "@chellaa/react";\nimport type { CarouselProps, CarouselSlideProps } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>Render slides with arrow controls and pagination dots:</p>
        <div style={{ maxWidth: 600, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <Carousel slides={sampleSlides} />
        </div>
      </div>

      <div id="looping-and-autoplay" style={{ marginBottom: "2rem" }}>
        <h2>Looping & Autoplay</h2>
        <p>Continuous rotation with pause-on-hover/focus and manual play/pause controls:</p>
        <div style={{ maxWidth: 600, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <Carousel slides={sampleSlides} loop autoPlay autoPlayInterval={3000} />
        </div>
      </div>

      <div id="compound-slides" style={{ marginBottom: "2rem" }}>
        <h2>Compound Slides</h2>
        <p>Alternatively declare slides declaratively using <code>CarouselSlide</code> children:</p>
        <div style={{ maxWidth: 600, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <Carousel loop>
            <CarouselSlide>
              <div style={{ height: 160, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                <span>Custom Slide A</span>
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div style={{ height: 160, background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
                <span>Custom Slide B</span>
              </div>
            </CarouselSlide>
          </Carousel>
        </div>
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="Carousel"
          roles={[
            { attributeOrKey: "role='region'", description: "Landmark container with aria-roledescription='carousel'." },
            { attributeOrKey: "role='group'", description: "Each slide with aria-roledescription='slide' and aria-label='X of Y'." },
            { attributeOrKey: "aria-hidden", description: "Hides off-screen inactive slides from assistive technology." },
            { attributeOrKey: "aria-live='polite'", description: "Announces active slide updates while rotation is idle." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "ArrowLeft / ArrowRight", description: "Navigates to previous / next slide." },
            { attributeOrKey: "Home / End", description: "Jumps to first / last slide." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="Carousel" props={carouselPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
