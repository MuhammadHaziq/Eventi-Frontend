import React from "react";
import {
    CInputGroup,
    CFormInput,
    CFormFeedback,
} from '@coreui/react';

export const PhoneInput = ({phone_number,handleOnChange, placeHolder="Phone Number", required=true }) => {
    return (
        <><CInputGroup>
        <CFormInput
            type="number"
            id="validationContactNumber"
            floatingClassName="mb-3"
            floatingLabel={placeHolder}
            placeholder={placeHolder}
            defaultValue={phone_number}
            name="phone_number"
            onChange={handleOnChange}
            required={required}
        />
        <CFormFeedback invalid>Please enter phone number.</CFormFeedback>
    </CInputGroup></>
    )
}