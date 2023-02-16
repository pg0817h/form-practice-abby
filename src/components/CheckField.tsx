import React, { FunctionComponent, ChangeEvent, useEffect } from "react";
import { InputProps } from "../types/InputProps";
import useInput from "../hooks/useInput";

const CheckField: FunctionComponent<InputProps> = ({
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
  // TODO: Once the validation is triggered in onSubmit, this useEffect is no longer needed should be removed."
  useEffect(() => {
    if (value == undefined) {
      onChange("false");
    }
  }, []);
  return (
    <div>
      <div style={{ display: "flex", gridGap: "8px" }}>
        <div>
          <label>
            <input
              type={type}
              checked={value === "true" ? true : false}
              onChange={(e) => onChange(e.target.checked ? "true" : "false")}
            />
            {label}
          </label>
          {error[source]?.length > 0 &&
            error[source].map((err: string) => (
              <span data-testid="test-error">{err}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CheckField;
