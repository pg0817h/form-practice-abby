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

      // Assert 
      getByLabelText(/name/i);
      expect(container).toBeInTheDocument();
      
    });

    it("Should display an error message if there is a minimum validation error.", () => {
      const { getByLabelText, getByTestId } = render(
          <SimpleForm>
            <TextField source="name" label={"이름"} validate={[ min(5), max(10)]} />
          </SimpleForm>
      );
      // Arrange 
      const textFieldLabel = getByLabelText(/이름/i);
      // Act
      fireEvent.change(textFieldLabel, { target: { value: "J" } });
      // Assert
      getByTestId("test-error");
    
    });

    it("Should display an error message if there is a maximum validation error.", () => {
  
      const { getByLabelText, queryByTestId } = render(
          <SimpleForm>
            <TextField source="name" label={"이름"} validate={[ min(5), max(10)]} />
          </SimpleForm>
      );
      
      // arrange 
      const textFieldLabel = getByLabelText(/이름/i);
      const errorMessage = queryByTestId("test-error");
      // act
      fireEvent.change(textFieldLabel, {
          target: { value: "Jeeeeeeeeeeeeeeeee" },
      });
        // userEvent.type(textFieldLabel, "ok");
      // assert
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('SelectField', () => { 
    it("Should submit if there is no error", () => {
    
    const { getByLabelText, getByText ,getAllByTestId,queryByTestId } = render(
        <SimpleForm>
          <SelectField options={[
          { option: "Male", value: "male" },
          { option: "Female", value: "female" },
          { option: "Gender not listed", value: "other" },
      ]} placeholder={'성별을 선택해주세요'} source="gender" label="성별" validate={[required()]} />
        </SimpleForm>
    );
    // arrange 
    const selectFieldLabel = getByLabelText(/성별/i);
    const submit = getByText("제출");
    const errorMessage = queryByTestId("test-error");
    let options = getAllByTestId('select-option')
    // act
    fireEvent.change(selectFieldLabel,{target: {value:"male"}})
    fireEvent.click(submit);

    // assert
    expect(options[0]).toBeTruthy()
    expect(errorMessage).not.toBeInTheDocument();
    });

    it("Should display an error message if there is an errors.", ()=>{
      const { getByLabelText, queryByTestId } = render(
        <SimpleForm>
          <SelectField options={[
          { option: "Male", value: "male" },
          { option: "Female", value: "female" },
          { option: "Gender not listed", value: "other" },
      ]} placeholder={'성별을 선택해주세요'} source="gender" label="성별" validate={[required()]} />
        </SimpleForm>
    );
    // arrange
    const selectFieldLabel = getByLabelText(/성별/i);
    const errorMessage = queryByTestId("test-error");
    // act
    fireEvent.change(selectFieldLabel,{target: {value:"male"}})
    fireEvent.change(selectFieldLabel,{target: {value:""}})  
    // assert
    expect(errorMessage).toBeInTheDocument();
    })

})

  describe('CheckField', () => {
    it("Should submit if there is no error", () => {
    const { getByLabelText, getByText,getByTestId,queryByTestId } = render(
          <SimpleForm>
           <CheckField
              type="checkbox"
              source="agreement"
              label="동의"
              validate={[required()]}
      />
          </SimpleForm>
      );
      // arrange
      const checkBox = getByTestId('checkbox-id') 
      const checkFieldLabel = getByLabelText(/동의/i);
      const submit = getByText("제출");
      const errorMessage = queryByTestId("test-error");
      // act 
      fireEvent.click(checkFieldLabel)
      fireEvent.click(submit);
      
      // assert
      expect(checkBox).toBeChecked()
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
      // arrange
      const checkBox = getByTestId('checkbox-id') 
      const checkFieldLabel = getByLabelText(/동의/i);
      const errorMessage = queryByTestId("test-error");

      // act
      fireEvent.click(checkFieldLabel)
      fireEvent.click(checkFieldLabel)
      
      // assert
      expect(checkBox).not.toBeChecked()
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
      // arrange
      const textFieldLabel = getByLabelText(/name/i);
      const submit = getByText("제출");
      
      // act
      fireEvent.change(textFieldLabel, { target: { value: "J" } });
      // userEvent.type(textFieldLabel, "ok");
      fireEvent.click(submit);
    
      // assert
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining('Please update this info')
      );
    });
  })
});
