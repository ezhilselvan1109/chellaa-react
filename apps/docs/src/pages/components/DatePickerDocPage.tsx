import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DatePicker,
  RangePicker,
  DatePickerVariant,
  DatePickerSize,
  DatePickerStatus,
  PickerType,
  dayjs,
} from "@chella-ui/react";
import type { Dayjs } from "dayjs";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";

const datePickerProps: PropItem[] = [
  {
    name: "picker",
    type: "'date' | 'week' | 'month' | 'quarter' | 'year'",
    defaultValue: "'date'",
    description: "Set the picker type of the calendar panel.",
  },
  {
    name: "value",
    type: "Dayjs | Dayjs[] | string | number | null",
    defaultValue: "undefined",
    description: "Controlled selected date value (or array for multiple picker).",
  },
  {
    name: "defaultValue",
    type: "Dayjs | Dayjs[] | string | number | null",
    defaultValue: "undefined",
    description: "Initial selected date value for uncontrolled mode.",
  },
  {
    name: "multiple",
    type: "boolean",
    defaultValue: "false",
    description: "Whether multiple date selection is enabled (tag pills display).",
  },
  {
    name: "showTime",
    type: "boolean",
    defaultValue: "false",
    description: "Provide an integrated time picker panel alongside calendar.",
  },
  {
    name: "showNow",
    type: "boolean",
    defaultValue: "true",
    description: "Whether to show 'Now' / 'Today' shortcut button in footer.",
  },
  {
    name: "format",
    type: "string",
    defaultValue: "YYYY-MM-DD",
    description: "Date string format for input display and parsing.",
  },
  {
    name: "variant",
    type: "'outlined' | 'filled' | 'borderless' | 'underlined'",
    defaultValue: "'outlined'",
    description: "Visual appearance style variant (Ant Design 5.13+).",
  },
  {
    name: "size",
    type: "'large' | 'medium' | 'small'",
    defaultValue: "'medium'",
    description: "Input box sizing scale.",
  },
  {
    name: "status",
    type: "'error' | 'warning'",
    defaultValue: "undefined",
    description: "Set validation status border styling.",
  },
  {
    name: "allowClear",
    type: "boolean | { clearIcon?: ReactNode }",
    defaultValue: "true",
    description: "Show clear icon button when a date is selected.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the datepicker is completely disabled.",
  },
  {
    name: "minDate",
    type: "Dayjs | string",
    defaultValue: "undefined",
    description: "Minimum allowable selectable date.",
  },
  {
    name: "maxDate",
    type: "Dayjs | string",
    defaultValue: "undefined",
    description: "Maximum allowable selectable date.",
  },
  {
    name: "disabledDate",
    type: "(currentDate: Dayjs) => boolean",
    defaultValue: "undefined",
    description: "Function to specify disabled dates dynamically.",
  },
  {
    name: "presets",
    type: "{ label: ReactNode; value: Dayjs | (() => Dayjs) }[]",
    defaultValue: "undefined",
    description: "Quick-pick preset options rendered in the popup sidebar.",
  },
  {
    name: "renderExtraFooter",
    type: "(mode: PanelMode) => ReactNode",
    defaultValue: "undefined",
    description: "Render extra custom footer elements below calendar.",
  },
  {
    name: "cellRender",
    type: "(current: Dayjs, info: { originNode: ReactNode; type: string }) => ReactNode",
    defaultValue: "undefined",
    description: "Custom date cell rendering callback for holidays, dots, or markers.",
  },
  {
    name: "needConfirm",
    type: "boolean",
    defaultValue: "false",
    description: "Require clicking 'OK' button to confirm date selection.",
  },
  {
    name: "placeholder",
    type: "string",
    defaultValue: "'Select date'",
    description: "Placeholder text shown when no date is selected.",
  },
  {
    name: "onChange",
    type: "(date: Dayjs | Dayjs[] | null, dateString: string | string[]) => void",
    defaultValue: "undefined",
    description: "Callback invoked when date selection changes.",
  },
  {
    name: "onOk",
    type: "(date: Dayjs | null) => void",
    defaultValue: "undefined",
    description: "Callback invoked when clicking the 'OK' confirmation button.",
  },
  {
    name: "classNames",
    type: "Record<'root' | 'input' | 'popup', string>",
    defaultValue: "undefined",
    description: "Semantic DOM class names for individual components.",
  },
  {
    name: "styles",
    type: "Record<'root' | 'input' | 'popup', CSSProperties>",
    defaultValue: "undefined",
    description: "Semantic DOM inline styles for individual components.",
  },
];

const rangePickerProps: PropItem[] = [
  {
    name: "value",
    type: "[Dayjs | null, Dayjs | null] | null",
    defaultValue: "undefined",
    description: "Controlled selected date range [start, end].",
  },
  {
    name: "defaultValue",
    type: "[Dayjs | null, Dayjs | null]",
    defaultValue: "undefined",
    description: "Default date range values for uncontrolled usage.",
  },
  {
    name: "placeholder",
    type: "[string, string]",
    defaultValue: "['Start date', 'End date']",
    description: "Placeholders for start and end inputs.",
  },
  {
    name: "separator",
    type: "ReactNode",
    defaultValue: "'→'",
    description: "Custom visual separator node between start and end inputs.",
  },
  {
    name: "allowEmpty",
    type: "[boolean, boolean]",
    defaultValue: "[false, false]",
    description: "Allow start or end date input to remain empty.",
  },
  {
    name: "presets",
    type: "{ label: ReactNode; value: [Dayjs, Dayjs] | (() => [Dayjs, Dayjs]) }[]",
    defaultValue: "undefined",
    description: "Sidebar preset ranges (e.g. Last 7 Days, This Month).",
  },
  {
    name: "showTime",
    type: "boolean",
    defaultValue: "false",
    description: "Provide integrated time selection for range bounds.",
  },
  {
    name: "onChange",
    type: "(dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => void",
    defaultValue: "undefined",
    description: "Callback triggered when date range selection is committed.",
  },
  {
    name: "onCalendarChange",
    type: "(dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string], info: { range: 'start' | 'end' }) => void",
    defaultValue: "undefined",
    description: "Callback triggered on every individual date click during range selection.",
  },
];

const designTokens: PropItem[] = [
  {
    name: "cellActiveWithRangeBg",
    type: "string",
    defaultValue: "#e6f4ff",
    description: "Background color of cells within the selected or hovered date range.",
  },
  {
    name: "cellHoverWithRangeBg",
    type: "string",
    defaultValue: "#cbe6ff",
    description: "Background color of range cells on mouse hover preview.",
  },
  {
    name: "cellRangeBorderColor",
    type: "string",
    defaultValue: "#1677ff",
    description: "Border color of active range start/end cells.",
  },
  {
    name: "zIndexPopup",
    type: "number",
    defaultValue: "1050",
    description: "Z-index layer of the floating calendar portal dropdown.",
  },
];

export const DatePickerDocPage: React.FC = () => {
  const [picker, setPicker] = useState<PickerType>("date");
  const [variant, setVariant] = useState<DatePickerVariant>("outlined");
  const [size, setSize] = useState<DatePickerSize>("medium");
  const [status, setStatus] = useState<DatePickerStatus | undefined>(undefined);
  const [showTime, setShowTime] = useState(false);
  const [allowClear, setAllowClear] = useState(true);
  const [disabled, setDisabled] = useState(false);

  // Playground single value
  const [playgroundDate, setPlaygroundDate] = useState<Dayjs | null>(null);

  // Controlled multiple
  const [multipleDates, setMultipleDates] = useState<Dayjs[]>([
    dayjs("2026-09-10"),
    dayjs("2026-09-15"),
    dayjs("2026-09-20"),
  ]);

  // Controlled range
  const [rangeDates, setRangeDates] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs("2026-09-01"),
    dayjs("2026-09-14"),
  ]);

  // Single presets
  const singlePresets = [
    { label: "Today", value: dayjs() },
    { label: "Tomorrow", value: dayjs().add(1, "day") },
    { label: "In 7 Days", value: dayjs().add(7, "day") },
    { label: "In 30 Days", value: dayjs().add(30, "day") },
  ];

  // Range presets
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: () => [dayjs().subtract(7, "day"), dayjs()] as [Dayjs, Dayjs],
    },
    {
      label: "Last 14 Days",
      value: () => [dayjs().subtract(14, "day"), dayjs()] as [Dayjs, Dayjs],
    },
    {
      label: "Last 30 Days",
      value: () => [dayjs().subtract(30, "day"), dayjs()] as [Dayjs, Dayjs],
    },
    {
      label: "Last 90 Days",
      value: () => [dayjs().subtract(90, "day"), dayjs()] as [Dayjs, Dayjs],
    },
  ];

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 24px" }}>
      {/* Breadcrumb & Navigation Header */}
      <nav style={{ marginBottom: 16, fontSize: 14, color: "#8c8c8c" }}>
        <Link to="/docs" style={{ color: "#1677ff", textDecoration: "none" }}>
          Components
        </Link>{" "}
        / Data Entry / <span style={{ color: "#262626", fontWeight: 500 }}>DatePicker</span>
      </nav>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "#1f1f1f" }}>
            DatePicker
          </h1>
          <span
            style={{
              padding: "2px 10px",
              fontSize: 12,
              fontWeight: 500,
              borderRadius: 12,
              backgroundColor: "#e6f4ff",
              color: "#0958d9",
              border: "1px solid #91caff",
            }}
          >
            Ant Design 5 & 6 Spec
          </span>
        </div>
        <p style={{ fontSize: 16, color: "#595959", margin: 0, lineHeight: 1.6 }}>
          To select or input a date or date range from an interactive popup calendar with Day.js support,
          time picking, multi-selection, presets, and 4 variants.
        </p>
      </div>

      {/* Interactive Playground */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: "#1f1f1f" }}>
          Interactive Playground
        </h2>
        <div
          style={{
            border: "1px solid #e8e8e8",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#fafafa",
          }}
        >
          <div
            style={{
              padding: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              minHeight: 160,
              gap: 16,
            }}
          >
            <DatePicker
              picker={picker}
              variant={variant}
              size={size}
              status={status}
              showTime={showTime}
              allowClear={allowClear}
              disabled={disabled}
              value={playgroundDate}
              onChange={(val) => setPlaygroundDate(val as Dayjs | null)}
              placeholder={`Select ${picker}`}
            />
            {playgroundDate && (
              <span style={{ fontSize: 13, color: "#8c8c8c" }}>
                Selected:{" "}
                <strong style={{ color: "#1677ff" }}>
                  {playgroundDate.format(showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD")}
                </strong>
              </span>
            )}
          </div>

          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #f0f0f0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              fontSize: 13,
            }}
          >
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Picker Mode
              </label>
              <select
                value={picker}
                onChange={(e) => setPicker(e.target.value as PickerType)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="date">Date</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="quarter">Quarter</option>
                <option value="year">Year</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Variant
              </label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as DatePickerVariant)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="outlined">Outlined</option>
                <option value="filled">Filled</option>
                <option value="borderless">Borderless</option>
                <option value="underlined">Underlined</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as DatePickerSize)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Validation Status
              </label>
              <select
                value={status || "default"}
                onChange={(e) =>
                  setStatus(
                    e.target.value === "default"
                      ? undefined
                      : (e.target.value as DatePickerStatus)
                  )
                }
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d9d9d9",
                }}
              >
                <option value="default">Default</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={showTime}
                  onChange={(e) => setShowTime(e.target.checked)}
                />
                Show Time Picker
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={allowClear}
                  onChange={(e) => setAllowClear(e.target.checked)}
                />
                Allow Clear
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Demos Section */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: "#1f1f1f" }}>
          Examples
        </h2>

        {/* 1. Basic Usage */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Basic Usage
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Standard date pickers in uncontrolled and controlled modes, with Day.js support.
          </p>
          <ComponentPreview
            code={`import { DatePicker, dayjs } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <DatePicker placeholder="Select date" onChange={(d, str) => console.log(d, str)} />
    <DatePicker defaultValue={dayjs('2026-09-20')} />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <DatePicker placeholder="Select date" />
              <DatePicker defaultValue={dayjs("2026-09-20")} />
            </div>
          </ComponentPreview>
        </div>

        {/* 2. RangePicker */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            RangePicker
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Set a date range with interactive hover preview, dual calendar panels, and custom separator.
          </p>
          <ComponentPreview
            code={`import { DatePicker, dayjs } from '@chella-ui/react';

const { RangePicker } = DatePicker;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <RangePicker onChange={(dates, dateStrings) => console.log(dates, dateStrings)} />
    <RangePicker separator="~" defaultValue={[dayjs('2026-09-01'), dayjs('2026-09-15')]} />
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <RangePicker />
              <RangePicker
                separator="~"
                value={rangeDates}
                onChange={(dates) => setRangeDates(dates || [null, null])}
              />
            </div>
          </ComponentPreview>
        </div>

        {/* 3. Multiple Dates Selection */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Multiple Dates
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Select multiple dates within the same month or across months. Displays tag pills inside input.
          </p>
          <ComponentPreview
            code={`import { DatePicker, dayjs } from '@chella-ui/react';

export default () => (
  <DatePicker
    multiple
    defaultValue={[dayjs('2026-09-10'), dayjs('2026-09-15'), dayjs('2026-09-20')]}
  />
);`}
          >
            <div style={{ maxWidth: 380 }}>
              <DatePicker
                multiple
                value={multipleDates}
                onChange={(dates) => {
                  if (Array.isArray(dates)) {
                    setMultipleDates(dates);
                  }
                }}
              />
            </div>
          </ComponentPreview>
        </div>

        {/* 4. Switchable Picker Types */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Switchable Picker Types
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Support for date, week, month, quarter, and year selection panels.
          </p>
          <ComponentPreview
            code={`import { DatePicker } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
    <DatePicker picker="week" placeholder="Select week" />
    <DatePicker picker="month" placeholder="Select month" />
    <DatePicker picker="quarter" placeholder="Select quarter" />
    <DatePicker picker="year" placeholder="Select year" />
  </div>
);`}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
              }}
            >
              <DatePicker picker="week" placeholder="Select week" />
              <DatePicker picker="month" placeholder="Select month" />
              <DatePicker picker="quarter" placeholder="Select quarter" />
              <DatePicker picker="year" placeholder="Select year" />
            </div>
          </ComponentPreview>
        </div>

        {/* 5. Date & Time Selection (showTime) */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Choose Time (showTime)
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Integrates interactive 3-column scrollable TimePanel for Hours, Minutes, and Seconds with OK confirmation.
          </p>
          <ComponentPreview
            code={`import { DatePicker } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <DatePicker showTime placeholder="Select date and time" onOk={(d) => console.log('OK:', d)} />
    <DatePicker.RangePicker showTime placeholder={['Start date & time', 'End date & time']} />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <DatePicker showTime placeholder="Select date and time" />
              <RangePicker showTime placeholder={["Start date & time", "End date & time"]} />
            </div>
          </ComponentPreview>
        </div>

        {/* 6. Quick-pick Presets */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Preset Ranges
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Preset sidebar buttons enable one-click date or range selection.
          </p>
          <ComponentPreview
            code={`import { DatePicker, dayjs } from '@chella-ui/react';

const singlePresets = [
  { label: 'Today', value: dayjs() },
  { label: 'Tomorrow', value: dayjs().add(1, 'day') },
  { label: 'In 7 Days', value: dayjs().add(7, 'day') },
];

const rangePresets = [
  { label: 'Last 7 Days', value: () => [dayjs().subtract(7, 'day'), dayjs()] },
  { label: 'Last 30 Days', value: () => [dayjs().subtract(30, 'day'), dayjs()] },
];

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <DatePicker presets={singlePresets} />
    <DatePicker.RangePicker presets={rangePresets} />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <DatePicker presets={singlePresets} />
              <RangePicker presets={rangePresets} />
            </div>
          </ComponentPreview>
        </div>

        {/* 7. Limit Date Range & disabledDate */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Disabled Dates & Bounds
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Restrict selectable date range using minDate, maxDate, or dynamic disabledDate callback.
          </p>
          <ComponentPreview
            code={`import { DatePicker, dayjs } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    {/* Disable past dates */}
    <DatePicker minDate={dayjs()} placeholder="Only future dates" />
    {/* Disable weekends */}
    <DatePicker
      disabledDate={(current) => current.day() === 0 || current.day() === 6}
      placeholder="Weekdays only"
    />
  </div>
);`}
          >
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <DatePicker minDate={dayjs()} placeholder="Only future dates" />
              <DatePicker
                disabledDate={(current) => current.day() === 0 || current.day() === 6}
                placeholder="Weekdays only"
              />
            </div>
          </ComponentPreview>
        </div>

        {/* 8. Extra Footer & Custom Cell Rendering */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Custom Cell Render & Extra Footer
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Highlight special events with dots or badges, or add extra action controls in the panel footer.
          </p>
          <ComponentPreview
            code={`import { DatePicker } from '@chella-ui/react';

export default () => (
  <DatePicker
    renderExtraFooter={() => (
      <span style={{ fontSize: 12, color: '#1677ff', fontWeight: 500 }}>
        ⚡ Flash Sale Ends Soon
      </span>
    )}
    cellRender={(current, { originNode }) => {
      if (current.date() === 15) {
        return (
          <div style={{ position: 'relative' }}>
            {originNode}
            <span
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 6,
                height: 6,
                backgroundColor: '#ff4d4f',
                borderRadius: '50%',
              }}
            />
          </div>
        );
      }
      return originNode;
    }}
  />
);`}
          >
            <DatePicker
              renderExtraFooter={() => (
                <span style={{ fontSize: 12, color: "#1677ff", fontWeight: 500 }}>
                  ⚡ Flash Sale Ends Soon
                </span>
              )}
              cellRender={(current, { originNode }) => {
                if (current.date() === 15) {
                  return (
                    <div style={{ position: "relative" }}>
                      {originNode}
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          width: 6,
                          height: 6,
                          backgroundColor: "#ff4d4f",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  );
                }
                return originNode;
              }}
            />
          </ComponentPreview>
        </div>

        {/* 9. Variants and Sizes */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#262626" }}>
            Variants and Sizes
          </h3>
          <p style={{ fontSize: 14, color: "#595959", marginBottom: 12 }}>
            Consistent design token sizing scales (large, medium, small) and 4 modern visual variants.
          </p>
          <ComponentPreview
            code={`import { DatePicker } from '@chella-ui/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DatePicker size="large" placeholder="Large" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="small" placeholder="Small" />
    </div>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <DatePicker variant="outlined" placeholder="Outlined" />
      <DatePicker variant="filled" placeholder="Filled" />
      <DatePicker variant="borderless" placeholder="Borderless" />
      <DatePicker variant="underlined" placeholder="Underlined" />
    </div>
  </div>
);`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <DatePicker size="large" placeholder="Large" />
                <DatePicker size="medium" placeholder="Medium" />
                <DatePicker size="small" placeholder="Small" />
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <DatePicker variant="outlined" placeholder="Outlined" />
                <DatePicker variant="filled" placeholder="Filled" />
                <DatePicker variant="borderless" placeholder="Borderless" />
                <DatePicker variant="underlined" placeholder="Underlined" />
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, color: "#1f1f1f" }}>
          API Reference
        </h2>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: "#262626" }}>
          DatePicker Props
        </h3>
        <PropsTable props={datePickerProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: "#262626" }}>
          DatePicker.RangePicker Props
        </h3>
        <PropsTable props={rangePickerProps} />

        <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: "#262626" }}>
          Design Tokens
        </h3>
        <PropsTable props={designTokens} />
      </section>
    </div>
  );
};
