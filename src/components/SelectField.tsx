import React, { FunctionComponent } from "react";
import { InputProps } from "../types/InputProps";
import useInput from "../hooks/useInput";

const options = [
  { option: "Select your gender", value: "" },
  { option: "Male", value: "male" },
  { option: "Female", value: "female" },
  { option: "Gender not listed", value: "other" },
];
const SelectField: FunctionComponent<InputProps> = ({
  source,
  label,
  placeholder,
  type,
  validate,
}) => {
  const { value, onChange, error } = useInput({
    source,
    validate,
  });
  return (
    <div>
      <div style={{ display: "flex", gridGap: "8px" }}>
        <label htmlFor={source}>{label}</label>
        <select
          name={source}
          id={source}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        >
          {options.map((option) => (
            <option key={option.option} value={option.value}>
              {option.option}
            </option>
          ))}
        </select>
        {error[source]?.length > 0 &&
          error[source].map((err: string) => (
            <span data-testid="test-error">{err}</span>
          ))}
      </div>
    </div>
  );
};

export default SelectField;
