import { HTMLInputTypeAttribute } from "react";

export interface InputProps {
  source: string;
  label: string;
  placeholder?: string;
  validate: [
    (input: string | number) => boolean,
    (input: string | number) => boolean
  ];
  type?: HTMLInputTypeAttribute;
}
