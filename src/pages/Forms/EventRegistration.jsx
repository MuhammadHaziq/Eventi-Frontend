import React, { useState } from "react";
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
  CFormTextarea,
  CInputGroup,
  // CInputGroupText,
  CRow,
} from "@coreui/react";

const EventRegistration = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <>
      <CRow>
        <CCol xs={2}></CCol>
        <CCol xs={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>EVENT REGISTERATION </strong> <small>Form Details </small>
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
                    id="validationEventName"
                    floatingclassname="mb-3"
                    floatinglabel="Name of the event"
                    placeholder="Name of the event"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CInputGroup>
                    <CFormInput
                      type="date"
                      id="validationDate"
                      floatingclassname="mb-3"
                      floatinglabel="Event Date"
                      placeholder="date"
                      defaultValue=""
                      required
                    />
                    <CFormFeedback invalid>Please enter date.</CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationVenueLocation"
                    floatingclassname="mb-3"
                    floatinglabel="Venue/Location"
                    placeholder="Venue/Location"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Venue/location Name.
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationtypeofEvent"
                    floatingclassname="mb-3"
                    floatinglabel="Type of event"
                    placeholder="Type of event"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Type of event
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="validationexpectedNumbers"
                    floatingclassname="mb-3"
                    floatinglabel="Expected number of attendees"
                    placeholder="Expected number of attendees"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Expected number of attendees
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationContactInfo"
                    floatingclassname="mb-3"
                    floatinglabel="Contact information for the event organizer"
                    placeholder="Contact information for the event organizer"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Contact information for the event organizer
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationAudioEquNeeds"
                    floatingclassname="mb-3"
                    floatinglabel="Audio/visual equipment needs"
                    placeholder="Audio/visual equipment needs"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Audio/visual equipment needs
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationSecurityNeeds"
                    floatingclassname="mb-3"
                    floatinglabel="Security needs"
                    placeholder="Security needs"
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Security needs
                  </CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormTextarea
                    rows={2}
                    id="validationRequest"
                    floatingclassname="mb-3"
                    floatinglabel="Special requests or accommodations."
                    placeholder="Special requests or accommodations."
                    defaultValue=""
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Special requests or accommodations.
                  </CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CFormCheck
                    type="checkbox"
                    id="invalidCheck"
                    label="Agree to terms and conditions"
                    required
                  />
                  <CFormFeedback invalid>
                    You must agree before submitting.
                  </CFormFeedback>
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
  );
};
export default EventRegistration;
