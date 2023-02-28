import { HTMLInputTypeAttribute } from "react";
type Validator =  ((input: string | boolean) => string | undefined);
export interface InputProps {
  source: string;
  label: string;
  placeholder?: string;
  validate: Validator[];
  type?: HTMLInputTypeAttribute;
}
