import CheckField from "../components/CheckField";
import SelectField from "../components/SelectField";
import SimpleForm from "../components/SimpleForm";
import TextField from "../components/TextField";

const min = (n: number) => (input: string) => {
  return input.length < n ? `Please enter at least ${n} characters` : undefined;
};

const max = (n: number) => (input: string) => {
  return input.length > n ? `Please enter at most ${n} characters` : undefined;
};
const required = () => (input: string | boolean) => {
  return (input === "" || input === undefined) ? `Please enter the value` : undefined;
};

function UserInfoForm(): JSX.Element {
  return (
    <SimpleForm>
      <TextField source={"name"} label={"이름"} validate={[required(), min(5), max(10)]} />
      <TextField
        type="password"
        source={"password"}
        label={"비밀번호"}
        validate={[required(), min(5), max(10)]}
      />
      <SelectField options={[
          { option: "Male", value: "male" },
          { option: "Female", value: "female" },
          { option: "Gender not listed", value: "other" },
      ]} placeholder={'성별을 선택해주세요'} source="성별" label="성별" validate={[required()]} />
      <CheckField
        type="checkbox"
        source={"동의"}
        label="동의"
        validate={[required()]}
      />
    </SimpleForm>
  );
}

export default UserInfoForm;
