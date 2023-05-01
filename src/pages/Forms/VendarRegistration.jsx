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
  // CFormLabel,
  // CFormSelect,
  // CFormFloating,
  // CFormTextarea,
  CInputGroup,
  // CInputGroupText,
  CRow,
} from '@coreui/react'

const VendarRegistration = () => {
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
              <strong>VENDAR REGISTERATION </strong> <small>Form Details </small>
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
                    id="validationBusinessName"
                    floatingClassName="mb-3"
                    floatingLabel="Business Name"
                    placeholder="Business Name"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CInputGroup>
                    <CFormInput
                      type="number"
                      id="validationContactPerson"
                      floatingClassName="mb-3"
                      floatingLabel="Contact Person"
                      placeholder="Contact Person"
                      defaultValue=""
                      required
                    />
                    <CFormFeedback invalid>Please enter name.</CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CInputGroup>
                    <CFormInput
                      type="number"
                      id="validationemail"
                      floatingClassName="mb-3"
                      floatingLabel="Email Address"
                      placeholder="Email Address"
                      defaultValue=""
                      required
                    />
                    <CFormFeedback invalid>Please enter Email.</CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CInputGroup>
                    <CFormInput
                      type="number"
                      id="validationAddress"
                      floatingClassName="mb-3"
                      floatingLabel="Address"
                      placeholder="Address"
                      defaultValue=""
                      required
                    />
                    <CFormFeedback invalid>Please enter name.</CFormFeedback>
                  </CInputGroup>
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
export default VendarRegistration
