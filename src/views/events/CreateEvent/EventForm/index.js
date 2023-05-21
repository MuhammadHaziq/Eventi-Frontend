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
  CFormTextarea,
  CInputGroup,
  CRow,
} from "@coreui/react";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { addEvent } from "src/context/EventContext/service";
import { useNavigate } from "react-router-dom";
export const EventRegistration = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    event_name: "",
    event_date: null,
    event_location: "",
    vendor_id: "",
    type_of_event: "",
    expected_attendence: "",
    phone_number: "",
    equipments: "",
    security: "",
    special_request: "",
  });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      try {
        setErrors("");
        addEvent({
          ...state,
          security: ["Yes", "yes"].includes(state.security) ? true : false,
          vendor_id: JSON.parse(localStorage.getItem("eventi-user"))?.vendor_id,
        })
          .then((response) => {
            if (response.data.statusCode === 200) {
              navigate("/event-list");
            }
          })
          .catch((err) => {
            setErrors(err.response.data.message);
            console.log(err);
          });
      } catch (err) {
        setErrors(err.message);
        console.error(err.message);
      }
    }
    setValidated(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <CRow>
        <CCol xs={2}></CCol>
        <CCol xs={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Event Registration </strong>
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
                    floatingClassName="mb-3"
                    floatingLabel="Name of the event"
                    placeholder="Name of the event"
                    name="event_name"
                    defaultValue={state.event_name}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CInputGroup>
                    <CFormInput
                      type="date"
                      id="validationEventDate"
                      floatingClassName="mb-3"
                      floatingLabel="Event Date"
                      placeholder="Event Date"
                      name="event_date"
                      defaultValue={state.event_date}
                      onChange={handleOnChange}
                      required
                    />
                    <CFormFeedback invalid>
                      Please enter event birth.
                    </CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationVenueLocation"
                    floatingClassName="mb-3"
                    floatingLabel="Venue/Location"
                    placeholder="Venue/Location"
                    name="event_location"
                    defaultValue={state.event_location}
                    onChange={handleOnChange}
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
                    floatingClassName="mb-3"
                    floatingLabel="Type of event"
                    placeholder="Type of event"
                    name="type_of_event"
                    defaultValue={state.type_of_event}
                    onChange={handleOnChange}
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
                    floatingClassName="mb-3"
                    floatingLabel="Expected number of attendees"
                    placeholder="Expected number of attendees"
                    name="expected_attendence"
                    defaultValue={state.expected_attendence}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Expected number of attendees
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <PhoneNumberInput
                    phone_number={state.phone_number}
                    handleOnChange={handleOnChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationAudioEquNeeds"
                    floatingClassName="mb-3"
                    floatingLabel="Audio/visual equipment needs"
                    placeholder="Audio/visual equipment needs"
                    name="equipments"
                    defaultValue={state.equipments}
                    onChange={handleOnChange}
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
                    floatingClassName="mb-3"
                    floatingLabel="Security needs"
                    placeholder="Security needs"
                    name="security"
                    defaultValue={state.security}
                    onChange={handleOnChange}
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
                    floatingClassName="mb-3"
                    floatingLabel="Special requests or accommodations."
                    placeholder="Special requests or accommodations."
                    name="special_request"
                    defaultValue={state.special_request}
                    onChange={handleOnChange}
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
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                  />
                  <CFormFeedback invalid>
                    You must agree before submitting.
                  </CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit
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
