import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import {
  Combobox,
  ComboboxRoot,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
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
];

function StandardCombobox(props: any) {
  return (
    <Combobox.Root {...props}>
      <div className="cl-combobox__control">
        <Combobox.Input placeholder="Search country..." />
        <Combobox.Clear />
        <Combobox.Trigger />
      </div>
      <Combobox.Content>
        <Combobox.Empty>No results found.</Combobox.Empty>
        {COUNTRIES.map((c) => (
          <Combobox.Item key={c.value} value={c.value}>
            {c.label}
          </Combobox.Item>
        ))}
      </Combobox.Content>
    </Combobox.Root>
  );
}

describe("Combobox Component (SPEC-030)", () => {
  it("renders with APG Combobox semantics (role='combobox', aria-expanded='false')", () => {
    render(<StandardCombobox />);
    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-haspopup", "listbox");
    // Listbox should not be in DOM or visible when closed
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens popup listbox when clicking trigger button", async () => {
    const user = userEvent.setup();
    render(<StandardCombobox />);
    const trigger = screen.getByRole("button", { name: "Toggle options" });
    await user.click(trigger);

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("typing into input opens listbox and filters visible items", async () => {
    const user = userEvent.setup();
    render(<StandardCombobox />);
    const input = screen.getByRole("combobox");

    await user.type(input, "Uni");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("option", { name: /United States/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Canada/i })).not.toBeInTheDocument();
  });

  it("shows Combobox.Empty when no items match the search query", async () => {
    const user = userEvent.setup();
    render(<StandardCombobox />);
    const input = screen.getByRole("combobox");

    await user.type(input, "xyznonexistent");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });

  it("cycles active descendant via ArrowDown and ArrowUp without losing focus from input", () => {
    render(<StandardCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    input.focus();

    // ArrowDown highlights first item
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-expanded", "true");
    const options = screen.getAllByRole("option");
    expect(input).toHaveAttribute("aria-activedescendant", options[0]?.id);
    expect(options[0]).toHaveAttribute("data-highlighted", "true");

    // ArrowDown again moves to next item
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant", options[1]?.id);
    expect(options[1]).toHaveAttribute("data-highlighted", "true");

    // ArrowUp moves back to first item
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveAttribute("aria-activedescendant", options[0]?.id);

    // Focus remains on input
    expect(document.activeElement).toBe(input);
  });

  it("jumps to first/last item with Home and End keys", () => {
    render(<StandardCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");

    fireEvent.keyDown(input, { key: "End" });
    expect(input).toHaveAttribute("aria-activedescendant", options[options.length - 1]?.id);

    fireEvent.keyDown(input, { key: "Home" });
    expect(input).toHaveAttribute("aria-activedescendant", options[0]?.id);
  });

  it("selects highlighted item on Enter key and updates input text and closes listbox", () => {
    const onValueChange = vi.fn();
    render(<StandardCombobox defaultOpen onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox") as HTMLInputElement;
    input.focus();

    fireEvent.keyDown(input, { key: "ArrowDown" }); // highlights "us"
    fireEvent.keyDown(input, { key: "ArrowDown" }); // highlights "ca" (Canada)
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onValueChange).toHaveBeenCalledWith("ca");
    expect(input.value).toBe("Canada");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects option on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<StandardCombobox defaultOpen onValueChange={onValueChange} />);

    const canadaOption = screen.getByRole("option", { name: /Canada/i });
    await user.click(canadaOption);

    expect(onValueChange).toHaveBeenCalledWith("ca");
    const input = screen.getByRole("combobox") as HTMLInputElement;
    expect(input.value).toBe("Canada");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("closes listbox on Escape key and clears active descendant", () => {
    render(<StandardCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant");

    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).not.toHaveAttribute("aria-activedescendant");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes listbox on Tab key without preventing default tab navigation", () => {
    render(<StandardCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "Tab" });
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("skips disabled options during keyboard navigation and prevents selecting them", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox.Root defaultOpen onValueChange={onValueChange}>
        <div className="cl-combobox__control">
          <Combobox.Input />
        </div>
        <Combobox.Content>
          <Combobox.Item value="1">Option 1</Combobox.Item>
          <Combobox.Item value="2" isDisabled>Option 2</Combobox.Item>
          <Combobox.Item value="3">Option 3</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>
    );

    const input = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    expect(options[1]).toHaveAttribute("aria-disabled", "true");

    // Clicking disabled option does not call onValueChange
    await user.click(options[1]!);
    expect(onValueChange).not.toHaveBeenCalled();

    // ArrowDown navigates from option 1 directly to option 3 (skipping option 2)
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant", options[0]?.id);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant", options[2]?.id);
  });

  it("manages multi-selection mode (isMulti) with tag pills and array state", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox.Root isMulti defaultValue={["us"]} onValueChange={onValueChange}>
        <div className="cl-combobox__control">
          <Combobox.Tag value="us">United States</Combobox.Tag>
          <Combobox.Input />
          <Combobox.Trigger />
        </div>
        <Combobox.Content>
          <Combobox.Item value="us">United States</Combobox.Item>
          <Combobox.Item value="ca">Canada</Combobox.Item>
          <Combobox.Item value="in">India</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>
    );

    const trigger = screen.getByRole("button", { name: "Toggle options" });
    await user.click(trigger);

    const canadaOption = screen.getByRole("option", { name: /Canada/i });
    await user.click(canadaOption);
    expect(onValueChange).toHaveBeenCalledWith(["us", "ca"]);

    // Removing tag chip via button
    const removeBtn = screen.getByRole("button", { name: "Remove United States" });
    await user.click(removeBtn);
    expect(onValueChange).toHaveBeenCalledWith(["ca"]);
  });

  it("removes last tag on Backspace when search input is empty in multi-select mode", () => {
    const onValueChange = vi.fn();
    render(
      <Combobox.Root isMulti value={["us", "ca"]} onValueChange={onValueChange}>
        <div className="cl-combobox__control">
          <Combobox.Input />
        </div>
        <Combobox.Content>
          <Combobox.Item value="us">United States</Combobox.Item>
          <Combobox.Item value="ca">Canada</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>
    );

    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(onValueChange).toHaveBeenCalledWith(["us"]);
  });

  it("clears selection when clicking Combobox.Clear button", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox.Root defaultValue="us" onValueChange={onValueChange}>
        <div className="cl-combobox__control">
          <Combobox.Input />
          <Combobox.Clear />
        </div>
        <Combobox.Content>
          <Combobox.Item value="us">United States</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>
    );

    const clearBtn = screen.getByRole("button", { name: "Clear selection" });
    await user.click(clearBtn);
    expect(onValueChange).toHaveBeenCalledWith("");
    const input = screen.getByRole("combobox") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("integrates with FormField for id, error, and disabled cascading", () => {
    render(
      <FormField id="custom-field" required error disabled>
        <FormLabel>Country</FormLabel>
        <Combobox.Root>
          <div className="cl-combobox__control">
            <Combobox.Input />
          </div>
          <Combobox.Content>
            <Combobox.Item value="us">United States</Combobox.Item>
          </Combobox.Content>
        </Combobox.Root>
      </FormField>
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("id", "custom-field");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeDisabled();
  });

  it("sets aria-busy='true' when isLoading is true", () => {
    render(<StandardCombobox isLoading defaultOpen />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-busy", "true");
    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveAttribute("aria-busy", "true");
  });

  it("passes axe-core accessibility audit with 0 violations", async () => {
    const { container } = render(
      <main>
        <label htmlFor="country-cb-input">Select country</label>
        <Combobox.Root id="country-cb-input" defaultOpen>
          <div className="cl-combobox__control">
            <Combobox.Input aria-label="Select country" />
            <Combobox.Trigger />
          </div>
          <Combobox.Content>
            {COUNTRIES.map((c) => (
              <Combobox.Item key={c.value} value={c.value}>
                {c.label}
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Root>
      </main>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders Combobox.Control and forwards ref properly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Combobox.Root>
        <Combobox.Control ref={ref} data-testid="cb-control">
          <Combobox.Input placeholder="Test control" />
          <Combobox.Trigger />
        </Combobox.Control>
      </Combobox.Root>
    );

    const controlEl = screen.getByTestId("cb-control");
    expect(controlEl).toHaveClass("cl-combobox__control");
    expect(ref.current).toBe(controlEl);
  });

  it("opens listbox popup when clicking on the input element", async () => {
    const user = userEvent.setup();
    render(<StandardCombobox />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "false");

    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("highlights item on mouseEnter", () => {
    render(<StandardCombobox defaultOpen />);
    const options = screen.getAllByRole("option");
    const secondOption = options[1];

    fireEvent.mouseEnter(secondOption);
    expect(secondOption).toHaveAttribute("data-highlighted", "true");
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-activedescendant", secondOption.id);
  });

  it("[DEF-008] shows all options when single-select is reopened with an existing value", async () => {
    const user = userEvent.setup();
    render(<StandardCombobox />);
    const trigger = screen.getByRole("button", { name: "Toggle options" });

    // Open and select Canada
    await user.click(trigger);
    const canadaOption = screen.getByRole("option", { name: /Canada/i });
    await user.click(canadaOption);

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("Canada");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Reopen listbox via trigger
    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // All options must remain visible, Canada is selected
    expect(screen.getAllByRole("option")).toHaveLength(4);
    expect(screen.getByRole("option", { name: /United States/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Canada/i })).toHaveAttribute("aria-selected", "true");
  });

  it("[DEF-009] pressing ArrowDown on closed input opens listbox and highlights first option", () => {
    render(<StandardCombobox />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-expanded", "true");
    const firstOption = screen.getByRole("option", { name: /United States/i });
    expect(firstOption).toHaveAttribute("data-highlighted", "true");
    expect(input).toHaveAttribute("aria-activedescendant", firstOption.id);
  });

  it("[DEF-010] cascades FormField props: aria-describedby, aria-required, and name", () => {
    render(
      <FormField id="country-ff" required error name="user_country">
        <FormLabel>Country</FormLabel>
        <Combobox.Root>
          <Combobox.Control>
            <Combobox.Input />
            <Combobox.Trigger />
          </Combobox.Control>
        </Combobox.Root>
        <FormErrorMessage>Country is required.</FormErrorMessage>
      </FormField>
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("id", "country-ff");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("name", "user_country");
    expect(input).toHaveAttribute("aria-describedby");
    expect(input.getAttribute("aria-describedby")).toContain("country-ff-error");
  });

  it("[DEF-011] auto-layout renders tag chips and clear button in multi-select mode", () => {
    render(
      <Combobox
        options={COUNTRIES}
        isMulti
        defaultValue={["us", "ca"]}
        placeholder="Select countries"
      />
    );

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Clear selection/i })).toBeInTheDocument();
  });

  it("[DEF-012] ComboboxTrigger retains focus on input when closing popup", async () => {
    const user = userEvent.setup();
    render(<StandardCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    const trigger = screen.getByRole("button", { name: "Toggle options" });

    await user.click(trigger);
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveFocus();
  });
});
