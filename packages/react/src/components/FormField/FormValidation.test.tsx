import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import * as React from "react";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormHelperText } from "./FormHelperText";
import { useFormValidation } from "./useFormValidation";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

describe("Form Validation Integration", () => {
  it("cascades errorMessage prop from FormField to FormErrorMessage without explicit children", () => {
    render(
      <FormField isInvalid errorMessage="Email is required.">
        <FormLabel>Email</FormLabel>
        <Input name="email" />
        <FormErrorMessage />
      </FormField>
    );

    const error = screen.getByRole("alert");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("Email is required.");
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  it("handles synchronous validation and updates error state on blur", async () => {
    const user = userEvent.setup();

    function TestForm() {
      const form = useFormValidation({
        initialValues: { username: "" },
        validators: {
          username: (val) =>
            val.length < 3
              ? { valid: false, error: { message: "Username must be at least 3 characters." } }
              : { valid: true },
        },
        validateOn: "blur",
      });

      return (
        <form onSubmit={form.handleSubmit}>
          <FormField {...form.getFieldProps("username")}>
            <FormLabel>Username</FormLabel>
            <Input {...form.getInputProps("username")} />
            <FormErrorMessage />
          </FormField>
          <Button type="submit">Submit</Button>
        </form>
      );
    }

    render(<TestForm />);

    const input = screen.getByRole("textbox", { name: "Username" });
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    // Type too short and blur
    await user.type(input, "ab");
    await user.tab();

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Username must be at least 3 characters.");

    // Type valid string and blur
    await user.type(input, "cde");
    await user.tab();

    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("safely handles asynchronous validator race conditions", async () => {
    const user = userEvent.setup();

    // Simulates an async username check where "fast" resolves quickly and "slow" resolves slowly
    const asyncCheck = vi.fn((val: string) => {
      if (val === "slow") {
        return new Promise<{ valid: false; error: { message: string } }>((resolve) =>
          setTimeout(() => resolve({ valid: false, error: { message: "Slow username error" } }), 100)
        );
      }
      return new Promise<{ valid: true }>((resolve) =>
        setTimeout(() => resolve({ valid: true }), 10)
      );
    });

    function AsyncForm() {
      const form = useFormValidation({
        initialValues: { code: "" },
        validators: {
          code: async (val) => asyncCheck(val),
        },
        validateOn: "change",
      });

      return (
        <FormField {...form.getFieldProps("code")}>
          <FormLabel>Code</FormLabel>
          <Input {...form.getInputProps("code")} />
          <FormErrorMessage />
        </FormField>
      );
    }

    render(<AsyncForm />);
    const input = screen.getByRole("textbox", { name: "Code" });

    // Type "slow" which takes 100ms
    await user.type(input, "slow");

    // Immediately replace with "fast" which takes 10ms
    await user.clear(input);
    await user.type(input, "fast");

    // Wait until 150ms has passed for all promises to resolve
    await waitFor(() => expect(asyncCheck).toHaveBeenCalledTimes(9));

    // Stale slow rejection must be ignored; field must be valid
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("prevents submission on invalid form and calls onSubmit when valid", async () => {
    const user = userEvent.setup();
    const handleSubmitMock = vi.fn();

    function SubmitForm() {
      const form = useFormValidation({
        initialValues: { email: "" },
        validators: {
          email: (val) =>
            val.includes("@")
              ? { valid: true }
              : { valid: false, error: { message: "Must be a valid email." } },
        },
        onSubmit: handleSubmitMock,
      });

      return (
        <form onSubmit={form.handleSubmit}>
          <FormField {...form.getFieldProps("email")}>
            <FormLabel>Email</FormLabel>
            <Input {...form.getInputProps("email")} />
            <FormErrorMessage />
          </FormField>
          <Button type="submit">Submit</Button>
        </form>
      );
    }

    render(<SubmitForm />);

    const submitBtn = screen.getByRole("button", { name: "Submit" });
    await user.click(submitBtn);

    expect(handleSubmitMock).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("Must be a valid email.");

    const input = screen.getByRole("textbox", { name: "Email" });
    await user.type(input, "alex@chellaa.dev");
    await user.click(submitBtn);

    expect(handleSubmitMock).toHaveBeenCalledWith({ email: "alex@chellaa.dev" });
  });

  it("passes axe-core accessibility audit with 0 violations", async () => {
    const { container } = render(
      <main>
        <FormField isInvalid errorMessage="Invalid phone number">
          <FormLabel>Phone Number</FormLabel>
          <Input name="phone" defaultValue="123" />
          <FormHelperText>Include your country code</FormHelperText>
          <FormErrorMessage />
        </FormField>
      </main>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
