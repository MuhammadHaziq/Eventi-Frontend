import React from "react";
import { CFormSelect, CFormFeedback } from "@coreui/react";

export const GenderSelection = ({
  gender,
  handleOnChange,
  required = true,
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
        label="Gender"
        name="gender"
        value={gender}
        onChange={handleOnChange}
        required={required}
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
