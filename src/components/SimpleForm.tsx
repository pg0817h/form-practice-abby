import { createContext, PropsWithChildren, useMemo, useState } from "react";

export const FormContext = createContext({
  setValues: (v: any) => {},
  values: {} as Record<string, any>,
  setError: (v: any) => {},
  error: {} as Record<string, any>,
});

const SimpleForm = ({ children }: PropsWithChildren<{}>) => {
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const value = useMemo(
    () => ({ setValues, values, setError, error }),
    [setValues, values, setError, error]
  );

  const onClick = (e: any) => {
    e.preventDefault();

    const isError = Object.values(error).some(
      (err: unknown, index: number, array: unknown[]) => {
        return (err as [])?.length > 0;
      }
    );
    if (isError) {
      alert("Please update your password or username.");
      return;
    }
    alert(JSON.stringify(values));
  };

  return (
    <FormContext.Provider value={value}>
      <form>
        {children}
        <button type={"submit"} onClick={onClick}>
          제출
        </button>
      </form>
    </FormContext.Provider>
  );
};

export default SimpleForm;
