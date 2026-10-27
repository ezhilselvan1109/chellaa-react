import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Combobox,
  ComboboxRoot,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxGroup,
  ComboboxEmpty,
  ComboboxTag,
  ComboboxClear,
  Autocomplete,
} from "./Combobox";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormHelperText } from "../FormField/FormHelperText";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "in", label: "India" },
  { value: "de", label: "Germany" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
];

const meta: Meta<typeof Combobox> = {
  title: "Components/Forms & Inputs/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Combobox is an accessible autocomplete input with integrated popup listbox, keyboard navigation, async search, tag-based multi-selection, and portal management. Also exported under the canonical `Autocomplete` alias.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls the size of the combobox control",
    },
    variant: {
      control: "select",
      options: ["outline", "filled", "flushed"],
      description: "Visual variant of the combobox control",
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the combobox is globally disabled",
    },
    isInvalid: {
      control: "boolean",
      description: "Whether the combobox is in an error state",
    },
    isLoading: {
      control: "boolean",
      description: "Displays loading state during async data fetching",
    },
    isMulti: {
      control: "boolean",
      description: "Enables multiple item selection",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
        <Combobox.Root {...args}>
          <Combobox.Control>
            <Combobox.Input placeholder="Search country..." />
            <Combobox.Clear />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Empty>No countries found.</Combobox.Empty>
            {COUNTRIES.map((c) => (
              <Combobox.Item key={c.value} value={c.value}>
                {c.label}
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Root>
      </div>
    );
  },
  args: {
    size: "md",
    variant: "outline",
    isDisabled: false,
    isInvalid: false,
  },
};

export const AsyncSearch: Story = {
  render: () => {
    function AsyncSearchDemo() {
      const [query, setQuery] = React.useState("");
      const [loading, setLoading] = React.useState(false);
      const [results, setResults] = React.useState<typeof COUNTRIES>([]);

      React.useEffect(() => {
        if (!query) {
          setResults([]);
          return;
        }

        setLoading(true);
        const timer = setTimeout(() => {
          const matched = COUNTRIES.filter((c) =>
            c.label.toLowerCase().includes(query.toLowerCase())
          );
          setResults(matched);
          setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
      }, [query]);

      return (
        <div style={{ width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
          <Combobox.Root
            searchValue={query}
            onSearchChange={setQuery}
            isLoading={loading}
            filter={false}
          >
            <Combobox.Control>
              <Combobox.Input placeholder="Type to search countries..." />
              {loading && <span className="cl-combobox__spinner" />}
              <Combobox.Clear />
              <Combobox.Trigger />
            </Combobox.Control>
            <Combobox.Content>
              <Combobox.Empty>
                {loading
                  ? "Searching..."
                  : query
                    ? "No results found."
                    : "Type to search countries..."}
              </Combobox.Empty>
              {results.map((c) => (
                <Combobox.Item key={c.value} value={c.value}>
                  {c.label}
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Root>
        </div>
      );
    }

    return <AsyncSearchDemo />;
  },
};

export const WithPortal: Story = {
  render: () => (
    <div style={{ width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
      <Combobox.Root>
        <Combobox.Control>
          <Combobox.Input placeholder="With Portal overlay..." />
          <Combobox.Clear />
          <Combobox.Trigger />
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content>
            <Combobox.Empty>No countries found.</Combobox.Empty>
            {COUNTRIES.map((c) => (
              <Combobox.Item key={c.value} value={c.value}>
                {c.label}
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  ),
};

export const MultiSelect: Story = {
  render: () => {
    function MultiSelectDemo() {
      const [selected, setSelected] = React.useState<string[]>(["us", "ca"]);

      return (
        <div style={{ width: 360, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
          <Combobox.Root
            isMulti
            value={selected}
            onValueChange={setSelected}
          >
            <Combobox.Control>
              <div className="cl-combobox__tags">
                {selected.map((val) => {
                  const country = COUNTRIES.find((c) => c.value === val);
                  return (
                    <Combobox.Tag key={val} value={val}>
                      {country?.label ?? val}
                    </Combobox.Tag>
                  );
                })}
              </div>
              <Combobox.Input placeholder="Add countries..." />
              <Combobox.Clear />
              <Combobox.Trigger />
            </Combobox.Control>
            <Combobox.Content>
              <Combobox.Empty>No more countries found.</Combobox.Empty>
              {COUNTRIES.map((c) => (
                <Combobox.Item key={c.value} value={c.value}>
                  {c.label}
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Root>
        </div>
      );
    }

    return <MultiSelectDemo />;
  },
};

export const WithFormField: Story = {
  render: () => {
    function FormFieldDemo() {
      const [val, setVal] = React.useState("");
      const isError = val === "";

      return (
        <div style={{ width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
          <FormField id="country-field" required error={isError}>
            <FormLabel>Country of Residence</FormLabel>
            <Combobox.Root value={val} onValueChange={setVal}>
              <Combobox.Control>
                <Combobox.Input placeholder="Select country..." />
                <Combobox.Clear />
                <Combobox.Trigger />
              </Combobox.Control>
              <Combobox.Content>
                <Combobox.Empty>No countries found.</Combobox.Empty>
                {COUNTRIES.map((c) => (
                  <Combobox.Item key={c.value} value={c.value}>
                    {c.label}
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Root>
            {isError ? (
              <FormErrorMessage>Country selection is required.</FormErrorMessage>
            ) : (
              <FormHelperText>We will deliver to this country.</FormHelperText>
            )}
          </FormField>
        </div>
      );
    }

    return <FormFieldDemo />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Outline</div>
        <Combobox.Root variant="outline">
          <Combobox.Control>
            <Combobox.Input placeholder="Outline variant" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Filled</div>
        <Combobox.Root variant="filled">
          <Combobox.Control>
            <Combobox.Input placeholder="Filled variant" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Flushed</div>
        <Combobox.Root variant="flushed">
          <Combobox.Control>
            <Combobox.Input placeholder="Flushed variant" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Small (32px)</div>
        <Combobox.Root size="sm">
          <Combobox.Control>
            <Combobox.Input placeholder="Small combobox" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Medium (40px)</div>
        <Combobox.Root size="md">
          <Combobox.Control>
            <Combobox.Input placeholder="Medium combobox" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Large (48px)</div>
        <Combobox.Root size="lg">
          <Combobox.Control>
            <Combobox.Input placeholder="Large combobox" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
    </div>
  ),
};

export const GroupedOptions: Story = {
  render: () => (
    <div style={{ width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
      <Combobox.Root>
        <Combobox.Control>
          <Combobox.Input placeholder="Search regions..." />
          <Combobox.Trigger />
        </Combobox.Control>
        <Combobox.Content>
          <Combobox.Empty>No items found.</Combobox.Empty>
          <Combobox.Group heading="Americas">
            <Combobox.Item value="us">United States</Combobox.Item>
            <Combobox.Item value="ca">Canada</Combobox.Item>
            <Combobox.Item value="br">Brazil</Combobox.Item>
          </Combobox.Group>
          <Combobox.Group heading="Europe">
            <Combobox.Item value="de">Germany</Combobox.Item>
            <Combobox.Item value="fr">France</Combobox.Item>
            <Combobox.Item value="uk">United Kingdom</Combobox.Item>
          </Combobox.Group>
          <Combobox.Group heading="Asia Pacific">
            <Combobox.Item value="in">India</Combobox.Item>
            <Combobox.Item value="jp">Japan</Combobox.Item>
            <Combobox.Item value="au">Australia</Combobox.Item>
          </Combobox.Group>
        </Combobox.Content>
      </Combobox.Root>
    </div>
  ),
};

export const AutocompleteAlias: Story = {
  render: () => (
    <div style={{ width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
      <p style={{ fontSize: 13, color: "var(--cl-color-fg-muted)", marginBottom: 8 }}>
        Rendered using the <code>Autocomplete</code> canonical export alias:
      </p>
      <Autocomplete.Root>
        <Autocomplete.Control>
          <Autocomplete.Input placeholder="Autocomplete country..." />
          <Autocomplete.Clear />
          <Autocomplete.Trigger />
        </Autocomplete.Control>
        <Autocomplete.Content>
          <Autocomplete.Empty>No countries found.</Autocomplete.Empty>
          {COUNTRIES.map((c) => (
            <Autocomplete.Item key={c.value} value={c.value}>
              {c.label}
            </Autocomplete.Item>
          ))}
        </Autocomplete.Content>
      </Autocomplete.Root>
    </div>
  ),
};

export const KeyboardAccessibleSubcontrols: Story = {
  render: function KeyboardSubcontrolsDemo() {
    const [selected, setSelected] = React.useState<string[]>(["us", "in", "jp"]);

    return (
      <div style={{ width: 440, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
        <div
          style={{
            background: "var(--cl-color-bg-muted, #f8fafc)",
            border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
            borderRadius: "8px",
            padding: "14px 16px",
            marginBottom: "16px",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          <strong style={{ display: "block", marginBottom: "6px", color: "var(--cl-color-fg-primary)" }}>
            Keyboard Navigation Instructions (DEF-007):
          </strong>
          <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--cl-color-fg-muted, #64748b)" }}>
            <li><strong>Tab / Shift+Tab:</strong> Cycle focus between the input, Clear button, and individual tag-remove buttons.</li>
            <li><strong>Enter / Space:</strong> Activate focused tag-remove button to delete tag, or Clear button to clear all.</li>
            <li><strong>Arrow Down / Up:</strong> Navigate popup options and press Enter to toggle selection.</li>
            <li><strong>Escape:</strong> Close the dropdown listbox.</li>
          </ul>
        </div>

        <Combobox.Root
          isMulti
          value={selected}
          onValueChange={setSelected}
        >
          <Combobox.Control>
            <div className="cl-combobox__tags">
              {selected.map((val) => {
                const country = COUNTRIES.find((c) => c.value === val);
                return (
                  <Combobox.Tag key={val} value={val}>
                    {country?.label ?? val}
                  </Combobox.Tag>
                );
              })}
            </div>
            <Combobox.Input placeholder="Search or select country..." />
            <Combobox.Clear aria-label="Clear all selected countries" />
            <Combobox.Trigger aria-label="Toggle countries list" />
          </Combobox.Control>
          <Combobox.Content>
            <Combobox.Empty>No countries found.</Combobox.Empty>
            {COUNTRIES.map((c) => (
              <Combobox.Item key={c.value} value={c.value}>
                {c.label}
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Root>
      </div>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <div style={{ width: 320, fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)" }}>
      <Combobox.Root isDisabled defaultValue="us">
        <Combobox.Control>
          <Combobox.Input placeholder="Country selection disabled..." />
          <Combobox.Clear />
          <Combobox.Trigger />
        </Combobox.Control>
      </Combobox.Root>
    </div>
  ),
};

