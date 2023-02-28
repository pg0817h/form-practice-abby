import React, { FunctionComponent, ChangeEvent, useEffect } from "react";
import { InputProps } from "../types/InputProps";
import useInput from "../hooks/useInput";

const CheckField: FunctionComponent<InputProps> = ({
  source,
  label,
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
        <div>
          <label>
            <input
              type={type}
              data-testid="checkbox-id"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
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
