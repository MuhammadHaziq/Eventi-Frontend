import React from "react";
import { CInputGroup, CFormInput, CFormFeedback } from "@coreui/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
export const PhoneNumberInput = ({
  phone_number,
  handleOnChange,
  placeHolder = "Phone Number",
  required = true,
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
        floatingClassName="mb-3 form-control"
        className="form-control"
        floatingLabel={placeHolder}
        placeholder={placeHolder}
        value={phone_number}
        name="phone_number"
        onChange={handleChange}
        required={required}
      />
      {/* <CFormInput
          type="number"
          id="validationContactNumber"
          floatingClassName="mb-3"
          floatingLabel={placeHolder}
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
