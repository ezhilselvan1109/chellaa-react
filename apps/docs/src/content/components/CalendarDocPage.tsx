import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Calendar, Box } from "@chellaa/react";

export const calendarToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "first-day", title: "First Day of Week" },
  { id: "constraints", title: "Min & Max Constraints" },
  { id: "accessibility", title: "Accessibility & Keyboard" },
  { id: "api-reference", title: "API Reference" },
];

const calendarPropsData: PropRow[] = [
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
    type: "(date: Date) => void",
    default: "undefined",
    description: "Callback fired when a date is selected.",
  },
  {
    name: "minDate",
    type: "Date",
    default: "undefined",
    description: "Earliest selectable date.",
  },
  {
    name: "maxDate",
    type: "Date",
    default: "undefined",
    description: "Latest selectable date.",
  },
  {
    name: "isDateDisabled",
    type: "(date: Date) => boolean",
    default: "undefined",
    description: "Custom predicate function to disable specific dates.",
  },
  {
    name: "firstDayOfWeek",
    type: "0 | 1 | 6",
    default: "0",
    description: "Starting weekday (0 = Sunday, 1 = Monday, 6 = Saturday).",
  },
  {
    name: "locale",
    type: "string",
    default: '"en-US"',
    description: "BCP 47 language tag.",
  },
];

const calendarRoles = [
  { attributeOrKey: 'role="grid"', description: "Marks table as an interactive data grid." },
  { attributeOrKey: "aria-selected", description: "Indicates currently selected date." },
  { attributeOrKey: 'aria-current="date"', description: "Indicates today's date." },
];

const calendarKeyboardKeys = [
  { attributeOrKey: "ArrowLeft / ArrowRight", description: "Moves focus by -1 / +1 calendar day." },
  { attributeOrKey: "ArrowUp / ArrowDown", description: "Moves focus by -1 / +1 week." },
  { attributeOrKey: "Home / End", description: "Moves focus to start / end of current week." },
  { attributeOrKey: "PageUp / PageDown", description: "Moves focus by -1 / +1 month." },
  { attributeOrKey: "Shift + PageUp / PageDown", description: "Moves focus by -1 / +1 year." },
  { attributeOrKey: "Enter / Space", description: "Selects the currently focused date cell." },
];

export function CalendarDocPage() {
  const [selected, setSelected] = React.useState<Date | null>(new Date());

  return (
    <ComponentDocLayout
      title="Calendar"
      description="Accessible WAI-ARIA grid for selecting single calendar dates with full keyboard navigation."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { Calendar, type CalendarProps } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
          <Calendar value={selected} onValueChange={setSelected} />
        </Box>
        <CodeBlock
          code={`const [selected, setSelected] = React.useState<Date | null>(new Date());
<Calendar value={selected} onValueChange={setSelected} />`}
          language="tsx"
        />
      </section>

      <section id="first-day">
        <h2>First Day of Week</h2>
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
          <Calendar firstDayOfWeek={1} />
        </Box>
        <CodeBlock code={`<Calendar firstDayOfWeek={1} /> // Monday start`} language="tsx" />
      </section>

      <section id="constraints">
        <h2>Min & Max Constraints</h2>
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
          <Calendar
            minDate={new Date(2026, 9, 5)}
            maxDate={new Date(2026, 9, 25)}
            defaultFocusedDate={new Date(2026, 9, 15)}
          />
        </Box>
        <CodeBlock
          code={`<Calendar
  minDate={new Date(2026, 9, 5)}
  maxDate={new Date(2026, 9, 25)}
/>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Calendar"
        roles={calendarRoles}
        keyboardKeys={calendarKeyboardKeys}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="Calendar" props={calendarPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
