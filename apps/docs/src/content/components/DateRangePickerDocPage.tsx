import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { DateRangePicker, Box, DateRange } from "@chellaa/react";

export const dateRangePickerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "preselected-range", title: "Preselected Range" },
  { id: "custom-separator", title: "Custom Separator" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const dateRangePickerPropsData: PropRow[] = [
  {
    name: "value",
    type: "DateRange | null",
    default: "undefined",
    description: "Controlled date range selection { startDate, endDate }.",
  },
  {
    name: "defaultValue",
    type: "DateRange | null",
    default: "undefined",
    description: "Initial date range in uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(range: DateRange) => void",
    default: "undefined",
    description: "Callback fired when range selection changes.",
  },
  {
    name: "rangeSeparator",
    type: "string",
    default: '" – "',
    description: "String separator between formatted start and end dates.",
  },
  {
    name: "format",
    type: "string",
    default: '"YYYY-MM-DD"',
    description: "Formatting pattern for displayed dates.",
  },
  {
    name: "isClearable",
    type: "boolean",
    default: "true",
    description: "Displays clear button when range is selected.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables user interaction.",
  },
  {
    name: "isInvalid",
    type: "boolean",
    default: "false",
    description: "Applies error state styling and aria-invalid.",
  },
];

const dateRangePickerRoles = [
  { attributeOrKey: "input[aria-label]", description: "Accessible name for date range input." },
  { attributeOrKey: "table[role='grid']", description: "WAI-ARIA APG calendar grid table." },
  { attributeOrKey: ".cl-calendar__cell--in-range", description: "Visual inclusive range highlighting." },
];

const dateRangePickerKeyboardKeys = [
  { attributeOrKey: "ArrowDown / Enter (input)", description: "Opens the calendar popover." },
  { attributeOrKey: "Escape", description: "Closes the popover and restores focus to input." },
  { attributeOrKey: "Arrows (grid)", description: "Roving keyboard navigation through calendar dates." },
];

export function DateRangePickerDocPage() {
  const [range, setRange] = React.useState<DateRange | null>(null);

  return (
    <ComponentDocLayout
      title="DateRangePicker"
      description="Dual-date range picker composing Calendar and Popover with inclusive range highlighting and FormField integration."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { DateRangePicker, type DateRange } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <DateRangePicker
            value={range}
            onValueChange={setRange}
            placeholder="Select date range"
          />
        </Box>
        <CodeBlock
          code={`const [range, setRange] = useState<DateRange | null>(null);\n\n<DateRangePicker\n  value={range}\n  onValueChange={setRange}\n  placeholder="Select date range"\n/>`}
          language="tsx"
        />
      </section>

      <section id="preselected-range">
        <h2>Preselected Range</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <DateRangePicker
            defaultValue={{
              startDate: new Date(2026, 9, 1),
              endDate: new Date(2026, 9, 14),
            }}
          />
        </Box>
      </section>

      <section id="custom-separator">
        <h2>Custom Separator</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <DateRangePicker
            rangeSeparator=" through "
            defaultValue={{
              startDate: new Date(2026, 11, 20),
              endDate: new Date(2026, 11, 28),
            }}
          />
        </Box>
      </section>

      <section id="accessibility">
        <h2>Accessibility</h2>
        <AccessibilitySection
          componentName="DateRangePicker"
          roles={dateRangePickerRoles}
          keyboardKeys={dateRangePickerKeyboardKeys}
        />
      </section>

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="DateRangePicker" props={dateRangePickerPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
