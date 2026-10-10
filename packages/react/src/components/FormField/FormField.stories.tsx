import * as React from "react";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormHelperText } from "./FormHelperText";
import { FormErrorMessage } from "./FormErrorMessage";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Stack } from "../Stack";
import { Box } from "../Box";
import { Typography } from "../Typography";

export default {
  title: "Forms/FormField",
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
