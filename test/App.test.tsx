/**
 * @jest-environment jsdom
 */
import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import SimpleForm from "../src/components/SimpleForm";
import TextField from "../src/components/TextField";
import SelectField from '../src/components/SelectField'
import CheckField from '../src/components/CheckField'

import "@testing-library/jest-dom";
import {userEvent} from "@testing-library/user-event/setup/index";

const min = jest.fn().mockImplementation((n: number) => (input: string ) =>  input.length < n ? `Please enter at least ${n} characters` : undefined)
const max = jest.fn().mockImplementation((n: number) => (input: string ) => input.length > n ? `Please enter at most ${n} characters` : undefined);
const required = jest.fn().mockImplementation(() => (input: string | boolean) =>
   (input === "" || input === undefined || input === false) ? `Please enter the value` : undefined)

type HookData = {
  value: any;
  onChange: (v: string | number) => void;
  error: Record<string, any>;
};
const useInputMock = jest.fn<HookData, []>();
window.alert = jest.fn();
describe("UserInfoForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("TextField", () => {
    it("should render TextField", () => {
      const { container, getByLabelText } = render(
          <SimpleForm>
            <TextField source={"name"} label={"name"} validate={[min(5), max(10)]} />
          </SimpleForm>
      );
      const textFieldLabel = getByLabelText(/name/i);
      expect(container).toBeInTheDocument();
      expect(textFieldLabel).toBeInTheDocument();
    });

    it("Should display an error message if there is a minimum validation error.", () => {
//arrange
      const { getByLabelText, getByTestId } = render(
          <SimpleForm>
            <TextField source="name" label={"이름"} validate={[ min(5), max(10)]} />
          </SimpleForm>
      );

    const textFieldLabel = getByLabelText(/이름/i);

      // act
      fireEvent.change(textFieldLabel, { target: { value: "J" } });
      const errorMessage = getByTestId("test-error");

      // assert
      expect(errorMessage).toBeInTheDocument();
    });

    it("Should display an error message if there is a maximum validation error.", () => {

      const { getByLabelText, getByTestId } = render(
          <SimpleForm>
            <TextField source="name" label={"이름"} validate={[ min(5), max(10)]} />
          </SimpleForm>
      );

      const textFieldLabel = getByLabelText(/이름/i);
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

  describe('SelectField', () => {
      it('should work', () => {

          const { getByLabelText, getByText,getAllByTestId,queryByTestId } = render(
              <SimpleForm>
                  <SelectField options={[
                      { option: "Male", value: "male" },
                      { option: "Female", value: "female" },
                      { option: "Gender not listed", value: "other" },
                  ]} placeholder={'성별을 선택해주세요'} source="gender" label="성별" validate={[required()]} />
              </SimpleForm>
          );

          const selectFieldLabel = getByLabelText(/성별/i);

          // act
          fireEvent.change(selectFieldLabel,{target: {value:"male"}})
          let options = getAllByTestId('select-option')

          expect(options[0]).toBeTruthy()
      })

      it("Should submit if there is no error", () => {

    const { getByLabelText, getByText,queryByTestId } = render(
        <SimpleForm>
          <SelectField options={[
          { option: "Male", value: "male" },
          { option: "Female", value: "female" },
          { option: "Gender not listed", value: "other" },
      ]} placeholder={'성별을 선택해주세요'} source="gender" label="성별" validate={[required()]} />
        </SimpleForm>
    );

    const submit = getByText("제출");
          const selectFieldLabel = getByLabelText(/성별/i);

          //act
          fireEvent.change(selectFieldLabel,{target: {value:"male"}})
      fireEvent.click(submit);

          // assert
    const errorMessage = queryByTestId("test-error");
    expect(errorMessage).not.toBeInTheDocument();
    });

    it("Should display an error message if there is an errors.", ()=>{
      const { getByLabelText, getByTestId,} = render(
        <SimpleForm>
          <SelectField options={[
          { option: "Male", value: "male" },
          { option: "Female", value: "female" },
          { option: "Gender not listed", value: "other" },
      ]} placeholder={'성별을 선택해주세요'} source="gender" label="성별" validate={[required()]} />
        </SimpleForm>
    );

    const selectFieldLabel = getByLabelText(/성별/i);
    //act
  fireEvent.change(selectFieldLabel,{target: {value:"male"}})
  fireEvent.change(selectFieldLabel,{target: {value:""}})

        //assert
    const errorMessage = getByTestId("test-error");
    expect(errorMessage).toBeInTheDocument();
    })

})

  describe('CheckField', () => {
    it("Should submit if there is no error", () => {

      const { getByLabelText, getByText,getByTestId,getAllByTestId,queryByTestId } = render(
          <SimpleForm>
           <CheckField
              type="checkbox"
              source="agreement"
              label="동의"
              validate={[required()]}
      />
          </SimpleForm>
      );
      const checkBox = getByTestId('checkbox-id')
      const checkFieldLabel = getByLabelText(/동의/i);
      expect(checkFieldLabel).toBeInTheDocument();
      const submit = getByText("제출");
      expect(submit).toBeInTheDocument();
      act(()=> {
        fireEvent.click(checkFieldLabel)
        fireEvent.click(submit);
      })
      expect(checkBox).toBeChecked()
      const errorMessage = queryByTestId("test-error");
      expect(errorMessage).not.toBeInTheDocument();
      });
      it("Should display an error message if there is an errors.", ()=>{
        const { getByLabelText, getByTestId,queryByTestId } = render(
          <SimpleForm>
          <CheckField
             type="checkbox"
             source="agreement"
             label="동의"
             validate={[required()]}
     />
         </SimpleForm>
      );

      const checkBox = getByTestId('checkbox-id')
      const checkFieldLabel = getByLabelText(/동의/i);
      expect(checkFieldLabel).toBeInTheDocument();

      act(()=> {
        fireEvent.click(checkFieldLabel)
        fireEvent.click(checkFieldLabel)
      })

      expect(checkBox).not.toBeChecked()
      const errorMessage = queryByTestId("test-error");
      expect(errorMessage).toBeInTheDocument();
      })

  })

  describe('SimpleForm', () => {
    it("Should display an error message upon submission if there is an error.", () => {
      const { getByLabelText, getByText } = render(
          <SimpleForm>
            <TextField
                source={"name"}
                label={"name"}
                validate={[min(5), max(10)]}
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
        expect.stringContaining('Please update this info')
      );
    });
  })
});
