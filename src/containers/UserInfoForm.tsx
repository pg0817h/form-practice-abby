import SimpleForm from "../components/SimpleForm";
import TextField from "../components/TextField";

function UserInfoForm(): JSX.Element {
  const min = (input: string | number) => {
    return `${input}`?.length < 5;
  };
  const max = (input: string | number) => {
    return `${input}`?.length > 10;
  };

  return (
    <SimpleForm>
      <TextField source={"name"} label={"이름"} validate={[min, max]} />
      <TextField
        type="password"
        source={"password"}
        label={"비밀번호"}
        validate={[min, max]}
      />
    </SimpleForm>
  );
}

export default UserInfoForm;
