/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import SimpleForm from "../src/components/SimpleForm";
import TextField from "../src/components/TextField";

const min = jest.fn().mockImplementation((value: any) => value.length < 5);
const max = jest.fn().mockImplementation((value: any) => value.length > 10);

type HookData = {
  value: any;
  onChange: (v: string | number) => void;
  error: Record<string, any>;
};
const useInputMock = jest.fn<HookData, []>();
window.alert = jest.fn();
describe("", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render TextField", () => {
    const { container, getByLabelText } = render(
      <SimpleForm>
        <TextField source={"name"} label={"name"} validate={[min, max]} />
      </SimpleForm>
    );
    const textFieldLabel = getByLabelText(/name/i);
    expect(container).toBeInTheDocument();
    expect(textFieldLabel).toBeInTheDocument();
  });
  it("Should display an error message upon submission if there is an error.", () => {
    useInputMock.mockReturnValue({
      value: "name",
      onChange: jest.fn(),
      error: { name: true },
    });
    const { getByLabelText, getByText } = render(
      <SimpleForm>
        <TextField
          source={"name"}
          label={"name"}
          validate={[min, max]}
          placeholder="name"
        />
      </SimpleForm>
    );

    const textFieldLabel = getByLabelText(/name/i);
    expect(textFieldLabel).toBeInTheDocument();
    act(() => {
      fireEvent.change(textFieldLabel, { target: { value: "J" } });
      // userEvent.type(textFieldLabel, "ok");
    });
    const submit = getByText("제출");
    expect(submit).toBeInTheDocument();
    act(() => {
      fireEvent.click(submit);
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Please update your password or username."
    );
  });
  it("Should display an error message if there is a minimum validation error.", () => {
    useInputMock.mockReturnValue({
      value: "name",
      onChange: jest.fn(),
      error: { name: true },
    });
    const { getByLabelText, getByTestId } = render(
      <SimpleForm>
        <TextField
          source={"name"}
          label={"name"}
          validate={[min, max]}
          placeholder="name"
        />
      </SimpleForm>
    );

    const textFieldLabel = getByLabelText(/name/i);
    expect(textFieldLabel).toBeInTheDocument();
    act(() => {
      fireEvent.change(textFieldLabel, { target: { value: "J" } });
    });
    const errorMessage = getByTestId("test-error");
    expect(errorMessage).toBeInTheDocument();
  });
  it("Should display an error message if there is a maximum validation error.", () => {
    useInputMock.mockReturnValue({
      value: "name",
      onChange: jest.fn(),
      error: { name: true },
    });
    const { getByLabelText, getByTestId } = render(
      <SimpleForm>
        <TextField
          source={"name"}
          label={"name"}
          validate={[min, max]}
          placeholder="name"
        />
      </SimpleForm>
    );

    const textFieldLabel = getByLabelText(/name/i);
    expect(textFieldLabel).toBeInTheDocument();
    act(() => {
      fireEvent.change(textFieldLabel, {
        target: { value: "Jeeeeeeeeeeeeeeeee" },
      });
      // userEvent.type(textFieldLabel, "ok");
    });
    const errorMessage = getByTestId("test-error");
    expect(errorMessage).toBeInTheDocument();
  });
});
