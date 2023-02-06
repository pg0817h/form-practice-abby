import { InputProps } from "../types/InputProps";
import React, { useCallback, useContext, useState } from "react";
import { FormContext } from "../components/SimpleForm";

interface UseInputProps extends Pick<InputProps, "source" | "validate"> {}

function useInput(props: UseInputProps) {
  const { setValues, values, setError, error } = useContext(FormContext);
  const [min, max] = props.validate;
  const onChange = useCallback(
    (v: string | number) => {
      const isMinError = min(v);
      const isMaxError = max(v);
      const newError = isMinError || isMaxError;
      if (error[props.source] !== newError) {
        setError({ ...error, [props.source]: newError });
      }
      setValues({
        ...values,
        [props.source]: v,
      });
    },
    [values, props.source, min, max]
  );

  return { value: values[props.source], onChange, error };
}

export default useInput;
