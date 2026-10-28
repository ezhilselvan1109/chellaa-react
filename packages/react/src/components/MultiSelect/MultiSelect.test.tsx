import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { MultiSelect } from "./MultiSelect";
import { FormField } from "../FormField/FormField";
import { FormLabel } from "../FormField/FormLabel";
import { FormErrorMessage } from "../FormField/FormErrorMessage";

const sampleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
  { value: "angular", label: "Angular" },
];

describe("MultiSelect Component", () => {
  it("renders with placeholder when empty", () => {
    render(<MultiSelect options={sampleOptions} placeholder="Select frameworks..." />);
    expect(screen.getByText("Select frameworks...")).toBeInTheDocument();
  });

  it("renders selected options as chips from defaultValue", () => {
    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={["react", "vue"]}
      />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("opens dropdown and selects an option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultiSelect
        options={sampleOptions}
        onValueChange={handleChange}
        placeholder="Choose..."
      />
    );

    const control = screen.getByRole("combobox");
    await user.click(control);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const reactOption = screen.getByRole("option", { name: /react/i });
    await user.click(reactOption);

    expect(handleChange).toHaveBeenCalledWith(["react"]);
  });

  it("removes selected tag when tag remove button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={["react", "vue"]}
        onValueChange={handleChange}
      />
    );

    const removeReactBtn = screen.getByRole("button", { name: "Remove React" });
    await user.click(removeReactBtn);

    expect(handleChange).toHaveBeenCalledWith(["vue"]);
  });

  it("clears all selected options when clear button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={["react", "vue"]}
        onValueChange={handleChange}
        isClearable
      />
    );

    const clearBtn = screen.getByRole("button", { name: "Clear all selections" });
    await user.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("filters options when search query is entered", async () => {
    const user = userEvent.setup();

    render(
      <MultiSelect
        options={sampleOptions}
        defaultOpen
        isSearchable
      />
    );

    const searchInput = screen.getByPlaceholderText("Search options...");
    await user.type(searchInput, "ang");

    expect(screen.getByRole("option", { name: /angular/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /react/i })).not.toBeInTheDocument();
  });

  it("respects disabled option states", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <MultiSelect
        options={sampleOptions}
        defaultOpen
        onValueChange={handleChange}
      />
    );

    const svelteOption = screen.getByRole("option", { name: /svelte/i });
    expect(svelteOption).toHaveAttribute("aria-disabled", "true");

    await user.click(svelteOption);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("integrates with FormField for id, error, and aria-describedby", () => {
    render(
      <FormField id="frameworks-field" isInvalid>
        <FormLabel>Frameworks</FormLabel>
        <MultiSelect options={sampleOptions} />
        <FormErrorMessage>Selection required</FormErrorMessage>
      </FormField>
    );

    const control = screen.getByRole("combobox");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAttribute("aria-describedby");
  });

  it("passes axe accessibility tests", async () => {
    const { container } = render(
      <MultiSelect
        options={sampleOptions}
        defaultValue={["react"]}
        aria-label="Framework selection"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
