import { HTMLInputTypeAttribute } from "react";

export interface InputProps {
  source: string;
  label: string;
  placeholder?: string;
  validate: ((input: string | boolean) => string | undefined)[];
  type?: HTMLInputTypeAttribute;
}
