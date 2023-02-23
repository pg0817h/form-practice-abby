import {createContext, PropsWithChildren, useMemo, useState} from "react";

export const FormContext = createContext({
    setValues: (v: any) => {
    },
    values: {} as Record<string, any>,
    setError: (v: any) => {
    },
    error: {} as Record<string, any>,
});

const SimpleForm = ({children}: PropsWithChildren<{}>) => {
    const [values, setValues] = useState({
        name: undefined,
        password: undefined,
        gender: undefined,
        agree: undefined,
    });
    const [error, setError] = useState({});
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
        const isEmpty = Object.keys(values).length === 0 || Object.values(values).some((v) => v === undefined || v === "");

        if (isError) {
            alert("Please fix the errors");
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
