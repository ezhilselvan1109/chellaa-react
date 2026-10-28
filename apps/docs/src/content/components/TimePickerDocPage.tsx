import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { TimePicker, Box, Stack } from "@chellaa/react";

export const timePickerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "twenty-four-hour", title: "24-Hour Mode" },
  { id: "minute-steps", title: "Minute Increments" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const timePickerPropsData: PropRow[] = [
  {
    name: "value",
    type: "string | null",
    default: "undefined",
    description: 'Controlled selected time in 24-hour "HH:mm" format.',
  },
  {
    name: "defaultValue",
    type: "string | null",
    default: "undefined",
    description: 'Initial selected time in "HH:mm" format.',
  },
  {
    name: "onValueChange",
    type: "(time: string) => void",
    default: "undefined",
    description: "Callback fired when time value changes.",
  },
  {
    name: "format",
    type: '"12h" | "24h"',
    default: '"12h"',
    description: "Display mode for time format in input and popover columns.",
  },
  {
    name: "minuteStep",
    type: "number",
    default: "5",
    description: "Step increment between selectable minutes in popup and keyboard stepping.",
  },
  {
    name: "minTime",
    type: "string",
    default: "undefined",
    description: 'Earliest selectable time in "HH:mm" bounds.',
  },
  {
    name: "maxTime",
    type: "string",
    default: "undefined",
    description: 'Latest selectable time in "HH:mm" bounds.',
  },
  {
    name: "isClearable",
    type: "boolean",
    default: "true",
    description: "Displays clear button when time is selected.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction.",
  },
  {
    name: "isInvalid",
    type: "boolean",
    default: "false",
    description: "Applies validation error styling.",
  },
];

const timePickerRoles = [
  { attributeOrKey: "input[aria-label]", description: "Accessible time input name." },
  { attributeOrKey: "div[role='dialog']", description: "Time selector popup container." },
  { attributeOrKey: "div[role='listbox']", description: "Hours, minutes, and period column listboxes." },
  { attributeOrKey: "button[role='option']", description: "Time segment selection options." },
];

const timePickerKeyboardKeys = [
  { attributeOrKey: "ArrowUp / ArrowDown", description: "Increments / decrements time by minuteStep." },
  { attributeOrKey: "Enter", description: "Toggles time picker dropdown." },
  { attributeOrKey: "Escape", description: "Closes time picker dropdown." },
];

export function TimePickerDocPage() {
  const [time, setTime] = React.useState<string | null>("14:30");

  return (
    <ComponentDocLayout
      title="TimePicker"
      description="Accessible time selector offering 12-hour AM/PM and 24-hour modes, column listboxes, keyboard stepping, and FormField integration."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { TimePicker } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <TimePicker
            value={time}
            onValueChange={setTime}
            placeholder="Choose time"
          />
        </Box>
        <CodeBlock
          code={`const [time, setTime] = useState<string | null>("14:30");\n\n<TimePicker\n  value={time}\n  onValueChange={setTime}\n  placeholder="Choose time"\n/>`}
          language="tsx"
        />
      </section>

      <section id="twenty-four-hour">
        <h2>24-Hour Mode</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <TimePicker defaultValue="16:45" format="24h" />
        </Box>
      </section>

      <section id="minute-steps">
        <h2>Minute Increments</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Stack direction="row" spacing={4}>
            <TimePicker defaultValue="09:00" minuteStep={15} placeholder="15-min intervals" />
            <TimePicker defaultValue="09:00" minuteStep={30} placeholder="30-min intervals" />
          </Stack>
        </Box>
      </section>

      <section id="accessibility">
        <h2>Accessibility</h2>
        <AccessibilitySection
          componentName="TimePicker"
          roles={timePickerRoles}
          keyboardKeys={timePickerKeyboardKeys}
        />
      </section>

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="TimePicker" props={timePickerPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
