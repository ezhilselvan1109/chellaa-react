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
  title: "Components/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
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
      <div style={{ width: 320 }}>
        <Combobox.Root {...args}>
          <div className="cl-combobox__control">
            <Combobox.Input placeholder="Search country..." />
            <Combobox.Clear />
            <Combobox.Trigger />
          </div>
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
        <div style={{ width: 320 }}>
          <Combobox.Root
            searchValue={query}
            onSearchChange={setQuery}
            isLoading={loading}
            filter={false}
          >
            <div className="cl-combobox__control">
              <Combobox.Input placeholder="Type to search countries..." />
              {loading && <span className="cl-combobox__spinner" />}
              <Combobox.Clear />
              <Combobox.Trigger />
            </div>
            <Combobox.Content>
              <Combobox.Empty>
                {loading ? "Searching..." : "No results found."}
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

export const MultiSelect: Story = {
  render: () => {
    function MultiSelectDemo() {
      const [selected, setSelected] = React.useState<string[]>(["us", "ca"]);

      return (
        <div style={{ width: 360 }}>
          <Combobox.Root
            isMulti
            value={selected}
            onValueChange={setSelected}
          >
            <div className="cl-combobox__control">
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
            </div>
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
        <div style={{ width: 320 }}>
          <FormField id="country-field" required error={isError}>
            <FormLabel>Country of Residence</FormLabel>
            <Combobox.Root value={val} onValueChange={setVal}>
              <div className="cl-combobox__control">
                <Combobox.Input placeholder="Select country..." />
                <Combobox.Clear />
                <Combobox.Trigger />
              </div>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: 320 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Outline</div>
        <Combobox.Root variant="outline">
          <div className="cl-combobox__control">
            <Combobox.Input placeholder="Outline variant" />
            <Combobox.Trigger />
          </div>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Filled</div>
        <Combobox.Root variant="filled">
          <div className="cl-combobox__control">
            <Combobox.Input placeholder="Filled variant" />
            <Combobox.Trigger />
          </div>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Flushed</div>
        <Combobox.Root variant="flushed">
          <div className="cl-combobox__control">
            <Combobox.Input placeholder="Flushed variant" />
            <Combobox.Trigger />
          </div>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: 320 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Small (32px)</div>
        <Combobox.Root size="sm">
          <div className="cl-combobox__control">
            <Combobox.Input placeholder="Small combobox" />
            <Combobox.Trigger />
          </div>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Medium (40px)</div>
        <Combobox.Root size="md">
          <div className="cl-combobox__control">
            <Combobox.Input placeholder="Medium combobox" />
            <Combobox.Trigger />
          </div>
          <Combobox.Content>
            <Combobox.Item value="1">Option 1</Combobox.Item>
            <Combobox.Item value="2">Option 2</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Large (48px)</div>
        <Combobox.Root size="lg">
          <div className="cl-combobox__control">
            <Combobox.Input placeholder="Large combobox" />
            <Combobox.Trigger />
          </div>
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
    <div style={{ width: 320 }}>
      <Combobox.Root>
        <div className="cl-combobox__control">
          <Combobox.Input placeholder="Search regions..." />
          <Combobox.Trigger />
        </div>
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
