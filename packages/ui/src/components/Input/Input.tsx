import React from "react";
import { InternalInput } from "./InternalInput";
import { TextArea } from "./TextArea";
import { Search } from "./Search";
import { Password } from "./Password";
import { OTP } from "./OTP";
import type { InputProps, InputRef } from "./Input.types";

export interface CompoundedInput
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<InputRef>
  > {
  TextArea: typeof TextArea;
  Search: typeof Search;
  Password: typeof Password;
  OTP: typeof OTP;
}

export const Input = InternalInput as CompoundedInput;
Input.TextArea = TextArea;
Input.Search = Search;
Input.Password = Password;
Input.OTP = OTP;
