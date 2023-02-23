import {createContext, PropsWithChildren, useMemo, useState} from "react";

type Error = Record<string, string[]>;

export const FormContext = createContext({
    setValues: (v: any) => {
    },
    values: {} as Record<string, any>,
    setError: (v: any) => {
    },
    error: {} as Error,
});

const SimpleForm = ({children}: PropsWithChildren<{}>) => {
    const [values, setValues] = useState({
        name: '',
        password: '',
        gender: '',
        agreement: '',
    }); //This warning is caused by React when you try to convert an uncontrolled input to a controlled input. To fix this warning, you should make sure that the value prop of the input element is always defined.
    const [error, setError] = useState<Error>({});
    const value = useMemo(
        () => ({setValues, values, setError, error}),
        [setValues, values, setError, error]
    );

    const onClick = (e: any) => {
        e.preventDefault();
        const isError = Object.values(error).some(
            (err: unknown) => {
                return (err as [])?.length > 0;
            }
        );

        // case 1: 아무 것도 입력하지 않은 경우
        // case 2: 일부만 입력했을 때
        // case 2-1: 일부 입력하고 일부 지웠을 때
        const isEmpty = Object.values(values).some((v) => v === undefined || v === "");

        if (isError) {
          let errorMessage = `Please update this info:\n`;
          Object.keys(error).map((err) =>{errorMessage += `  •${err}\n`})
            alert(errorMessage);
            return;
        }
        if (isEmpty) {
            alert("Please fill out all fields");
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
