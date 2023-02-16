import SimpleForm from "../components/SimpleForm";
import TextField from "../components/TextField";

const min = (n: number) => (input: string) => {
    return input.length < n ? `Please enter at least ${n} characters` : undefined;
};

const max = (n: number) => (input: string) => {
    return input.length > n ? `Please enter at most ${n} characters` : undefined;
};

function UserInfoForm(): JSX.Element {
    return (
        <SimpleForm>
            <TextField source={"name"} label={"이름"} validate={[min(5), max(10)]}/>
            <TextField
                type="password"
                source={"password"}
                label={"비밀번호"}
                validate={[min(5), max(10)]}
            />
        </SimpleForm>
    );
}

export default UserInfoForm;
