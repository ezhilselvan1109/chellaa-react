import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange } from "./DateRangePicker.types";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";
import { Stack } from "../Stack/Stack";
import { Text } from "../Typography/Text";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/Forms & Inputs/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible calendar range picker providing dual-date range selection, formatted trigger input, boundary constraints, continuous in-range styling, and FormField integration.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    placeholder: "Select flight dates",
  },
};

export const PreselectedRange: Story = {
  render: () => {
    const defaultRange: DateRange = {
      startDate: new Date(2026, 4, 10),
      endDate: new Date(2026, 4, 24),
    };
    return (
      <DateRangePicker
        defaultValue={defaultRange}
        placeholder="Select booking dates"
      />
    );
  },
};

export const CustomSeparator: Story = {
  render: () => (
    <DateRangePicker
      defaultValue={{
        startDate: new Date(2026, 8, 1),
        endDate: new Date(2026, 8, 14),
      }}
      rangeSeparator=" until "
    />
  ),
};

export const WithMinMaxBounds: Story = {
  render: () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    return (
      <DateRangePicker
        minDate={today}
        maxDate={nextMonth}
        placeholder="Allowed in next 45 days"
      />
    );
  },
};

export const WithFormField: Story = {
  render: () => (
    <Stack direction="column" gap={4} style={{ maxWidth: "360px" }}>
      <FormField id="vacation-range" required fullWidth>
        <FormLabel>Vacation Leave</FormLabel>
        <DateRangePicker
          defaultValue={{
            startDate: new Date(2026, 11, 20),
            endDate: new Date(2026, 11, 31),
          }}
        />
        <FormHelperText>Select inclusive start and return dates.</FormHelperText>
      </FormField>

      <FormField id="error-range" isInvalid fullWidth>
        <FormLabel>Audit Window</FormLabel>
        <DateRangePicker isInvalid />
        <FormErrorMessage>Please specify a valid audit range.</FormErrorMessage>
      </FormField>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <DateRangePicker
      isDisabled
      defaultValue={{
        startDate: new Date(2026, 0, 1),
        endDate: new Date(2026, 0, 15),
      }}
    />
  ),
};
