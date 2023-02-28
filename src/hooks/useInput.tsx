import { InputProps } from "../types/InputProps";
import React, { useCallback, useContext } from "react";
import { FormContext } from "../components/SimpleForm";

interface UseInputProps extends Pick<InputProps, "source" | "validate"> {}

function useInput(props: UseInputProps) {
  const { setValues, values, setError, error } = useContext(FormContext);
  const onChange = useCallback(
    (v: string | boolean) => {

      const errorArray: string[] = [];
      props.validate.forEach((validateFunc) => {
        const newError = validateFunc(v); //TODO
        if (newError) {
          errorArray.push(newError);
        }
      });
      if (errorArray.length === 0) {
        const { [props.source]: deletedKey, ...restOfErrors } = error;
        setError(restOfErrors);
      } else {
        setError({ ...error, [props.source]: errorArray });
      }
      setValues({
        ...values,
        [props.source]: v,
      });
    },
    [values]
  );

  return { value: values[props.source], onChange, error };
}

export default useInput;
