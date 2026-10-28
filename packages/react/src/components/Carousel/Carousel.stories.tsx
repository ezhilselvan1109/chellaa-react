import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";
import { CarouselSlide } from "./CarouselSlide";

const meta: Meta<typeof Carousel> = {
  title: "Components/Data Display/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Accessible content Carousel following the WAI-ARIA Carousel Pattern. Supports previous/next navigation, pagination dots, infinite looping, touch swiping, autoplay with pause controls, and keyboard navigation.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const sampleSlides = [
  <div
    key="1"
    style={{
      height: 240,
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      padding: 24,
    }}
  >
    <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Slide 1: Innovation</h2>
    <p style={{ marginTop: 8 }}>Explore next-generation user interface engineering.</p>
  </div>,
  <div
    key="2"
    style={{
      height: 240,
      background: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      padding: 24,
    }}
  >
    <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Slide 2: Accessibility</h2>
    <p style={{ marginTop: 8 }}>Built according to strict WAI-ARIA guidelines and keyboard roving focus.</p>
  </div>,
  <div
    key="3"
    style={{
      height: 240,
      background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      padding: 24,
    }}
  >
    <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Slide 3: Performance</h2>
    <p style={{ marginTop: 8 }}>Zero-dependency, precompiled LightningCSS architecture.</p>
  </div>,
];

export const Default: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 640 }}>
        <Carousel slides={sampleSlides} />
      </div>
    );
  },
};

export const Looping: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 640 }}>
        <Carousel slides={sampleSlides} loop />
      </div>
    );
  },
};

export const AutoPlay: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 640 }}>
        <Carousel slides={sampleSlides} loop autoPlay autoPlayInterval={3000} />
      </div>
    );
  },
};

export const CompoundComponents: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 640 }}>
        <Carousel loop>
          <CarouselSlide>
            <div
              style={{
                height: 200,
                background: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              <h3>First Compound Slide</h3>
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div
              style={{
                height: 200,
                background: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              <h3>Second Compound Slide</h3>
            </div>
          </CarouselSlide>
        </Carousel>
      </div>
    );
  },
};

export const SingleSlide: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 640 }}>
        <Carousel slides={[sampleSlides[0]]} />
      </div>
    );
  },
};
