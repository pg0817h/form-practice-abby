import { HTMLInputTypeAttribute } from "react";

export interface InputProps {
  source: string;
  label: string;
  placeholder?: string;
  validate: ((input: string) => string | undefined)[];
  type?: HTMLInputTypeAttribute;
}
