import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { DatePicker, Box } from "@chellaa/react";

export const datePickerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "custom-format", title: "Custom Formatting" },
  { id: "constraints", title: "Min & Max Constraints" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const datePickerPropsData: PropRow[] = [
  {
    name: "value",
    type: "Date | null",
    default: "undefined",
    description: "Controlled selected date.",
  },
  {
    name: "defaultValue",
    type: "Date | null",
    default: "undefined",
    description: "Initial selected date in uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(date: Date | null) => void",
    default: "undefined",
    description: "Callback fired when selected date changes.",
  },
  {
    name: "format",
    type: "string",
    default: '"YYYY-MM-DD"',
    description: "Date format string used to format display text and parse manual input.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "Format string",
    description: "Input placeholder text.",
  },
  {
    name: "isOpen",
    type: "boolean",
    default: "undefined",
    description: "Controlled popover open state.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    description: "Callback fired when popover open state changes.",
  },
  {
    name: "isClearable",
    type: "boolean",
    default: "true",
    description: "Shows a clear button when a date is selected.",
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
    description: "Applies error styling for validation.",
  },
];

const datePickerRoles = [
  { attributeOrKey: "aria-expanded", description: "Indicates whether the dropdown popover is open." },
  { attributeOrKey: "aria-haspopup", description: "Indicates trigger opens a dialog popover." },
  { attributeOrKey: "aria-invalid", description: "Indicates field validation error state." },
];

const datePickerKeyboardKeys = [
  { attributeOrKey: "Escape", description: "Closes the calendar popup and restores focus to input." },
  { attributeOrKey: "ArrowDown (in input)", description: "Opens the calendar dropdown." },
  { attributeOrKey: "Enter (in input)", description: "Commits manually typed date." },
];

export function DatePickerDocPage() {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <ComponentDocLayout
      title="DatePicker"
      description="Composed input and floating calendar popover for intuitive date selection."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { DatePicker, type DatePickerProps } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, width: 320 }}>
          <DatePicker value={date} onValueChange={setDate} />
        </Box>
        <CodeBlock
          code={`const [date, setDate] = React.useState<Date | null>(new Date());
<DatePicker value={date} onValueChange={setDate} />`}
          language="tsx"
        />
      </section>

      <section id="custom-format">
        <h2>Custom Formatting</h2>
        <Box sx={{ p: 4, width: 320 }}>
          <DatePicker format="MM/DD/YYYY" placeholder="MM/DD/YYYY" />
        </Box>
        <CodeBlock code={`<DatePicker format="MM/DD/YYYY" placeholder="MM/DD/YYYY" />`} language="tsx" />
      </section>

      <section id="constraints">
        <h2>Min & Max Constraints</h2>
        <Box sx={{ p: 4, width: 320 }}>
          <DatePicker
            minDate={new Date(2026, 9, 10)}
            maxDate={new Date(2026, 9, 25)}
            defaultValue={new Date(2026, 9, 15)}
          />
        </Box>
        <CodeBlock
          code={`<DatePicker
  minDate={new Date(2026, 9, 10)}
  maxDate={new Date(2026, 9, 25)}
/>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="DatePicker"
        roles={datePickerRoles}
        keyboardKeys={datePickerKeyboardKeys}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="DatePicker" props={datePickerPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
