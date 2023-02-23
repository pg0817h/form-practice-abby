import React, { FunctionComponent, useEffect, useRef } from "react";
import { InputProps } from "../types/InputProps";
import useInput from "../hooks/useInput";

type Props = InputProps & {
  options: {option: string; value: string }[];
}

const SelectField: FunctionComponent<Props> = ({
  source,
  label,
  placeholder,
  validate,
    options
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
          {placeholder && (
              <option value="">{placeholder}</option>
          )}
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
