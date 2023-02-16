import React, { FunctionComponent, useEffect } from "react";
import { InputProps } from "../types/InputProps";
import useInput from "../hooks/useInput";

const options = [
  { option: "Select your gender", value: "" },
  { option: "Male", value: "male" },
  { option: "Female", value: "female" },
  { option: "Gender not listed", value: "other" },
];
const defaultValidationFunction = (input: any) => {
  if (input === undefined) {
    console.log("input");
    return;
  }
};
const SelectField: FunctionComponent<InputProps> = ({
  source,
  label,
  placeholder,
  type,
  validate = defaultValidationFunction,
}) => {
  const { value, onChange, error } = useInput({
    source,
    validate,
  });

  useEffect(() => {
    console.log("select value", value);
    onChange("");
  }, [value]);
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
