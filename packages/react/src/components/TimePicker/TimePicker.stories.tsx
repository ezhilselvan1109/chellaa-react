import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TimePicker } from "./TimePicker";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";
import { Stack } from "../Stack/Stack";
import { Text } from "../Typography/Text";

const meta: Meta<typeof TimePicker> = {
  title: "Components/Forms & Inputs/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible time selector offering 12-hour AM/PM and 24-hour modes, column listboxes for hours, minutes, and periods, keyboard stepping, boundary enforcement, and FormField integration.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    defaultValue: "09:30",
    format: "12h",
    placeholder: "Select time",
  },
};

export const TwentyFourHour: Story = {
  render: () => (
    <TimePicker
      defaultValue="14:45"
      format="24h"
      placeholder="Select 24h time"
    />
  ),
};

export const FifteenMinuteSteps: Story = {
  render: () => (
    <TimePicker
      defaultValue="10:00"
      minuteStep={15}
      placeholder="Quarter-hour increments"
    />
  ),
};

export const BusinessHoursOnly: Story = {
  render: () => (
    <TimePicker
      defaultValue="10:00"
      minTime="09:00"
      maxTime="17:00"
      placeholder="Between 09:00 and 17:00"
    />
  ),
};

export const WithFormField: Story = {
  render: () => (
    <Stack direction="column" gap={4} style={{ maxWidth: "300px" }}>
      <FormField id="meeting-time" required fullWidth>
        <FormLabel>Meeting Start Time</FormLabel>
        <TimePicker defaultValue="10:00" />
        <FormHelperText>Select time in your local office hours.</FormHelperText>
      </FormField>

      <FormField id="error-time" isInvalid fullWidth>
        <FormLabel>Interview Slot</FormLabel>
        <TimePicker isInvalid />
        <FormErrorMessage>Time slot is already booked.</FormErrorMessage>
      </FormField>
    </Stack>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <Stack direction="row" gap={4}>
      <TimePicker isDisabled defaultValue="12:00" />
      <TimePicker isReadOnly defaultValue="16:30" />
    </Stack>
  ),
};
