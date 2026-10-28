import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Slider } from "./Slider";
import { RangeSlider } from "./RangeSlider";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

const meta: Meta<typeof Slider> = {
  title: "Components/Forms & Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible single and dual-thumb continuous sliders with keyboard navigation, marks, non-crossing constraints, and FormField integration.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <Slider aria-label="Volume" defaultValue={30} />
    </div>
  ),
};

export const WithMarks: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={20}
        min={0}
        max={100}
        step={10}
        marks={[
          { value: 0, label: "0°C" },
          { value: 20, label: "20°C" },
          { value: 50, label: "50°C" },
          { value: 80, label: "80°C" },
          { value: 100, label: "100°C" },
        ]}
      />
    </div>
  ),
};

export const SizesAndColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 400, padding: 20 }}>
      <Slider aria-label="Small Success" size="sm" colorScheme="success" defaultValue={25} />
      <Slider aria-label="Medium Primary" size="md" colorScheme="primary" defaultValue={50} />
      <Slider aria-label="Large Danger" size="lg" colorScheme="danger" defaultValue={75} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <Slider aria-label="Disabled slider" defaultValue={40} isDisabled />
    </div>
  ),
};

export const RangeSliderDefault: StoryObj<typeof RangeSlider> = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <RangeSlider
        minAriaLabel="Price minimum"
        maxAriaLabel="Price maximum"
        defaultValue={[25, 75]}
      />
    </div>
  ),
};

export const RangeSliderWithMinDistance: StoryObj<typeof RangeSlider> = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 20 }}>
      <RangeSlider
        minAriaLabel="Budget start"
        maxAriaLabel="Budget end"
        defaultValue={[20, 60]}
        min={0}
        max={100}
        step={5}
        minDistance={15}
        marks={[
          { value: 0, label: "$0" },
          { value: 50, label: "$50" },
          { value: 100, label: "$100" },
        ]}
      />
    </div>
  ),
};

export const WithFormField: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 400, padding: 20 }}>
      <FormField id="volume-field">
        <FormLabel>Master Volume</FormLabel>
        <Slider defaultValue={65} />
        <FormHelperText>Adjust audio output volume</FormHelperText>
      </FormField>

      <FormField id="budget-field" isInvalid>
        <FormLabel>Price Range</FormLabel>
        <RangeSlider defaultValue={[10, 90]} />
        <FormErrorMessage>Selected range is outside permitted budget</FormErrorMessage>
      </FormField>
    </div>
  ),
};
