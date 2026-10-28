import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Forms & Inputs/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Calendar provides an accessible, fully interactive 6-row date selection grid following the WAI-ARIA APG grid pattern with roving tabindex, full keyboard navigation, customizable week start day, and date range constraints.",
      },
    },
  },
  argTypes: {
    firstDayOfWeek: {
      control: "select",
      options: [0, 1, 6],
      description: "Starting weekday (0=Sun, 1=Mon, 6=Sat)",
    },
    locale: {
      control: "text",
      description: "BCP 47 language tag for month and day labels",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | null>(new Date());
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Calendar value={selected} onValueChange={setSelected} />
        <div style={{ fontSize: "0.875rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Selected Date: <strong>{selected ? selected.toLocaleDateString() : "None"}</strong>
        </div>
      </div>
    );
  },
};

export const MondayStart: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | null>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Calendar value={selected} onValueChange={setSelected} firstDayOfWeek={1} />
        <div style={{ fontSize: "0.875rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Week starts on Monday (ISO 8601 standard)
        </div>
      </div>
    );
  },
};

export const MinAndMaxBoundaries: Story = {
  render: () => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
    const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
    const [selected, setSelected] = React.useState<Date | null>(today);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Calendar
          value={selected}
          onValueChange={setSelected}
          minDate={min}
          maxDate={max}
        />
        <div style={{ fontSize: "0.875rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Allowed Range: {min.toLocaleDateString()} – {max.toLocaleDateString()}
        </div>
      </div>
    );
  },
};

export const DisabledWeekends: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | null>(null);
    const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <Calendar
          value={selected}
          onValueChange={setSelected}
          isDateDisabled={isWeekend}
        />
        <div style={{ fontSize: "0.875rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Weekends (Saturday & Sunday) are disabled
        </div>
      </div>
    );
  },
};
