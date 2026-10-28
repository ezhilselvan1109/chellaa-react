import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

const meta: Meta<typeof DatePicker> = {
  title: "Components/Forms & Inputs/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DatePicker combines an accessible formatted date input with an anchored calendar popover dropdown, supporting full keyboard navigation, custom date formats, min/max range limits, and seamless FormField cascade integration.",
      },
    },
  },
  argTypes: {
    format: {
      control: "text",
      description: "Date format pattern (e.g. YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls the size dimensions of the DatePicker control",
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the DatePicker is globally disabled",
    },
    isInvalid: {
      control: "boolean",
      description: "Applies error styling and accessibility attributes",
    },
    isClearable: {
      control: "boolean",
      description: "Displays clear button when a date is selected",
    },
    firstDayOfWeek: {
      control: "select",
      options: [0, 1, 6],
      description: "Starting day of the calendar week (0=Sun, 1=Mon, 6=Sat)",
    },
    locale: {
      control: "text",
      description: "BCP 47 language tag for month and weekday localization",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | null>(new Date());
    return (
      <div style={{ width: 320, minHeight: 380, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker {...args} value={date} onValueChange={setDate} />
        <div style={{ fontSize: "0.875rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Selected Date: <strong>{date ? date.toISOString().split("T")[0] : "None"}</strong>
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(new Date());

    const setToday = () => setDate(new Date());
    const setNextWeek = () => {
      const now = new Date();
      setDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));
    };

    return (
      <div style={{ width: 320, minHeight: 380, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker value={date} onValueChange={setDate} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={setToday}
            style={{
              padding: "4px 10px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              cursor: "pointer",
            }}
          >
            Today
          </button>
          <button
            type="button"
            onClick={setNextWeek}
            style={{
              padding: "4px 10px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              cursor: "pointer",
            }}
          >
            +1 Week
          </button>
          <button
            type="button"
            onClick={() => setDate(null)}
            style={{
              padding: "4px 10px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
        <div style={{ fontSize: "0.875rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Current: <strong>{date ? date.toDateString() : "None"}</strong>
        </div>
      </div>
    );
  },
};

export const WithFormField: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(null);

    return (
      <div style={{ width: 320, minHeight: 380 }}>
        <FormField id="booking-date" isRequired>
          <FormLabel>Departure Date</FormLabel>
          <DatePicker
            value={date}
            onValueChange={setDate}
            placeholder="Select flight date"
          />
          <FormHelperText>Must be at least 24 hours before flight</FormHelperText>
        </FormField>
      </div>
    );
  },
};

export const WithValidationError: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(null);

    return (
      <div style={{ width: 320, minHeight: 380 }}>
        <FormField id="invalid-date" isInvalid>
          <FormLabel>Event Date</FormLabel>
          <DatePicker
            value={date}
            onValueChange={setDate}
            placeholder="Select event date"
          />
          <FormErrorMessage>Please choose a valid event date in the future</FormErrorMessage>
        </FormField>
      </div>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [usDate, setUsDate] = React.useState<Date | null>(new Date());
    const [euDate, setEuDate] = React.useState<Date | null>(new Date());

    return (
      <div style={{ width: 320, minHeight: 380, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>
            US Format (MM/DD/YYYY)
          </label>
          <DatePicker
            format="MM/DD/YYYY"
            placeholder="MM/DD/YYYY"
            value={usDate}
            onValueChange={setUsDate}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.25rem" }}>
            European Format (DD/MM/YYYY)
          </label>
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
            value={euDate}
            onValueChange={setEuDate}
          />
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Small (32px)</span>
        <DatePicker size="sm" placeholder="Small DatePicker" defaultValue={new Date()} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Medium (40px)</span>
        <DatePicker size="md" placeholder="Medium DatePicker" defaultValue={new Date()} />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Large (48px)</span>
        <DatePicker size="lg" placeholder="Large DatePicker" defaultValue={new Date()} />
      </div>
    </div>
  ),
};

export const MinAndMaxLimits: Story = {
  render: () => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    const [date, setDate] = React.useState<Date | null>(today);

    return (
      <div style={{ width: 320, minHeight: 380, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          minDate={min}
          maxDate={max}
        />
        <div style={{ fontSize: "0.8125rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Allowed Range: Past 7 days to next 14 days
        </div>
      </div>
    );
  },
};

export const DisabledWeekends: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | null>(null);
    const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

    return (
      <div style={{ width: 320, minHeight: 380, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DatePicker
          value={date}
          onValueChange={setDate}
          isDateDisabled={isWeekend}
          placeholder="Business days only"
        />
        <div style={{ fontSize: "0.8125rem", color: "var(--cl-color-text-secondary, #64748b)" }}>
          Weekends are disabled and cannot be selected
        </div>
      </div>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DatePicker isDisabled defaultValue={new Date(2026, 9, 28)} />
    </div>
  ),
};
