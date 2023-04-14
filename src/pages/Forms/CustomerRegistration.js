import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  // CFormSelect,
  // CFormFloating,
  // CFormTextarea,
  CInputGroup,
  // CInputGroupText,
  CRow,
} from '@coreui/react'

const CustomerRegistration = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <>
      <CRow>
        <CCol xs={2}></CCol>
        <CCol xs={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>CUSTOMER REGISTERATION </strong> <small>Form Details </small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-2 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="floatingInputValid"
                    floatingClassName="mb-3"
                    floatingLabel="First Name"
                    placeholder="First Name"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="floatingInputValid2"
                    floatingClassName="mb-3"
                    floatingLabel="Last Name"
                    placeholder="Last Name"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationBusinessName"
                    floatingClassName="mb-3"
                    floatingLabel="Optional Business Name"
                    placeholder="Optional Business Name"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CInputGroup>
                    <CFormInput
                      type="text"
                      id="validationCustomUsername"
                      floatingClassName="mb-3"
                      floatingLabel="Email Address"
                      placeholder="Email Address"
                      defaultValue=""
                      required
                    />
                    <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="validationPhoneNumber"
                    floatingClassName="mb-3"
                    floatingLabel="Phone Number"
                    placeholder="--- -------"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>Please provide a phone number.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom04">Gender</CFormLabel>
                  <br />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox1"
                    value="option1"
                    label="Male"
                    defaultChecked
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox2"
                    value="option2"
                    label="Female"
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox3"
                    value="option3"
                    label="Other"
                  />
                  <CFormFeedback invalid>Please must selecte.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CFormCheck
                    type="checkbox"
                    id="invalidCheck"
                    label="Agree to terms and conditions"
                    required
                  />
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit form
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={2}></CCol>
      </CRow>
    </>
  )
}
export default CustomerRegistration
