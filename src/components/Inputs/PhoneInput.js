import React from "react";
import {
  CInputGroup,
  CFormInput,
  CFormLabel,
  CFormFeedback,
} from "@coreui/react";
import "react-phone-number-input/style.css";
import "./style.css";
import PhoneInput from "react-phone-number-input";
export const PhoneNumberInput = ({
  phone_number,
  handleOnChange,
  placeHolder = "Phone Number",
  required = true,
  disabled = false,
}) => {
  const handleChange = (e) => {
    const val = { target: { name: "phone_number", value: e } };
    handleOnChange(val);
  };
  return (
    <>
      {/* <CInputGroup> */}
      <PhoneInput
        id="validationContactNumber"
        defaultCountry="US"
        className="form-control"
        placeholder={placeHolder}
        label="Phone Number"
        value={phone_number}
        name="phone_number"
        onChange={handleChange}
        required={required}
        disabled={disabled}
      />
      {/* <CFormInput
          type="number"
          id="validationContactNumber"
          floatingclassname="mb-3"
          floatinglabel={placeHolder}
          placeholder={placeHolder}
          defaultValue={phone_number}
          name="phone_number"
          onChange={handleOnChange}
          required={required}
        /> */}
      <CFormFeedback invalid>Please enter phone number.</CFormFeedback>
      {/* </CInputGroup> */}
    </>
  );
};
