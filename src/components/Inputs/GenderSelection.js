import React from "react";
import {
    CFormSelect,
    CFormFeedback,
} from '@coreui/react';

export const GenderSelection = ({gender,handleOnChange, required=true }) => {
    return (
        <><CFormSelect size="sm" aria-label="select example" id="validationGender"
            floatingClassName="mb-3"
            floatingLabel="Gender"
            placeholder="Gender"
            name="gender"
            defaultValue={gender}
            onChange={handleOnChange}
            required={required}>
            <option></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </CFormSelect><CFormFeedback invalid>Please select a valid gender.</CFormFeedback></>
    )
}