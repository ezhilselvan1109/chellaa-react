import * as React from "react";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormHelperText } from "./FormHelperText";
import { FormErrorMessage } from "./FormErrorMessage";
import { useFormValidation } from "./useFormValidation";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { Typography } from "../Typography";

export default {
  title: "Components/Forms & Inputs/FormField",
  component: FormField,
  subcomponents: { FormLabel, FormHelperText, FormErrorMessage },
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export const Default = {
  render: () => (
    <Box sx={{ maxWidth: 440, p: 4 }}>
      <FormField id="username-field" fullWidth>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Enter your username" />
        <FormHelperText>Choose a unique handle for your profile.</FormHelperText>
      </FormField>
    </Box>
  ),
};

export const RequiredAndDisabled = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 440, p: 4 }}>
      <FormField id="req-field" required fullWidth>
        <FormLabel>Work Email</FormLabel>
        <Input type="email" placeholder="alex@company.com" />
        <FormHelperText>Must be an enterprise corporate domain.</FormHelperText>
      </FormField>

      <FormField id="dis-field" disabled fullWidth>
        <FormLabel>Organization ID</FormLabel>
        <Input defaultValue="ORG-98214" />
        <FormHelperText>Managed by your workspace administrator.</FormHelperText>
      </FormField>
    </Stack>
  ),
};

export const ValidationStates = {
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 440, p: 4 }}>
      <FormField id="valid-field" fullWidth>
        <FormLabel>Username</FormLabel>
        <Input defaultValue="chelsea_dev" />
        <FormHelperText>Username is available!</FormHelperText>
      </FormField>

      <FormField id="err-field" error required fullWidth>
        <FormLabel>Email Address</FormLabel>
        <Input defaultValue="invalid-email-address" />
        <FormErrorMessage>
          Please provide a valid email format (e.g. name@domain.com).
        </FormErrorMessage>
      </FormField>
    </Stack>
  ),
};

export const InteractiveValidation = {
  render: function InteractiveFieldDemo() {
    const [value, setValue] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const isInvalid = touched && (!value.includes("@") || !value.includes("."));

    return (
      <Box sx={{ maxWidth: 440, p: 4 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Type an email to trigger real-time validation:
        </Typography>
        <FormField id="interactive-email" required error={isInvalid} fullWidth>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="e.g. alex@chellaa.design"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (!touched) setTouched(true);
            }}
            onBlur={() => setTouched(true)}
          />
          {isInvalid ? (
            <FormErrorMessage>
              Must be a valid email containing &quot;@&quot; and a valid domain.
            </FormErrorMessage>
          ) : (
            <FormHelperText>
              We respect your privacy and will never share your address.
            </FormHelperText>
          )}
        </FormField>
      </Box>
    );
  },
};

export const WithTextarea = {
  render: () => (
    <Box sx={{ maxWidth: 480, p: 4 }}>
      <FormField id="feedback-field" required fullWidth>
        <FormLabel>Project Description</FormLabel>
        <Textarea
          rows={4}
          maxLength={300}
          showCount
          placeholder="Describe your design specifications and requirements..."
        />
        <FormHelperText>Keep it concise and clear for the engineering team.</FormHelperText>
      </FormField>
    </Box>
  ),
};

export const HookFormValidation = {
  render: function HookFormValidationDemo() {
    const form = useFormValidation({
      initialValues: {
        username: "",
        email: "",
      },
      validators: {
        username: (val) =>
          val.trim().length >= 3
            ? { valid: true }
            : { valid: false, error: { message: "Username must be at least 3 characters." } },
        email: (val) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
            ? { valid: true }
            : { valid: false, error: { message: "Please provide a valid email format." } },
      },
      onSubmit: (values) => {
        alert("Form submitted successfully with: " + JSON.stringify(values));
      },
    });

    return (
      <Box sx={{ maxWidth: 460, p: 4 }}>
        <form onSubmit={form.handleSubmit}>
          <Stack spacing={4}>
            <FormField {...form.getFieldProps("username")} required fullWidth>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter username" {...form.getInputProps("username")} />
              <FormHelperText>Your public display handle.</FormHelperText>
              <FormErrorMessage />
            </FormField>

            <FormField {...form.getFieldProps("email")} required fullWidth>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" placeholder="you@domain.com" {...form.getInputProps("email")} />
              <FormErrorMessage />
            </FormField>

            <button
              type="submit"
              className="cl-button cl-button--primary cl-button--md"
              style={{
                background: "var(--cl-color-primary, #6366f1)",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Submit Form
            </button>
          </Stack>
        </form>
      </Box>
    );
  },
};

