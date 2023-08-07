import React from "react";
import { CFormSelect, CFormFeedback } from "@coreui/react";

export const GenderSelection = ({
  gender,
  handleOnChange,
  required = false,
  disabled = false,
}) => {
  return (
    <>
      <CFormSelect
        size="sm"
        aria-label="select example"
        id="validationGender"
        floatingclassname="mb-3"
        floatinglabel="Gender"
        placeholder="Gender"
        label=""
        name="gender"
        value={gender}
        onChange={handleOnChange}
        required={required}
        disabled={disabled}
      >
        <option></option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </CFormSelect>
      <CFormFeedback invalid>Please select a valid gender.</CFormFeedback>
    </>
  );
};
