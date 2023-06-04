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
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import ReactSelect from "src/components/Inputs/ReactSelect";

export const EventRegistration = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    event_name: "",
    event_date: null,
    event_location: "",
    banner_images: null,
    type_of_event: "",
    expected_attendence: "",
    phone_number: "",
    equipments: "",
    security: "",
    special_request: "",
  });
  const [agree, setAgree] = useState(false);
  const app_dispatch = useAppDispatch();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      try {
        console.log(state.banner_images, "state.banner_images");
        const formData = new FormData();
        formData.append("event_name", state.event_name);
        formData.append("event_date", state.event_date);
        formData.append("event_location", state.event_location);
        formData.append("type_of_event", state.type_of_event);
        formData.append("expected_attendence", state.expected_attendence);
        formData.append("phone_number", state.phone_number);
        formData.append("equipments", state.equipments);
        formData.append(
          "security",
          ["Yes", "yes"].includes(state.security) ? true : false
        );
        formData.append("special_request", state.special_request);

        if (state.banner_images) {
          for (let x in state.banner_images) {
            if (typeof state.banner_images[x] === "object") {
              formData.append(`banner_images`, state.banner_images[x]);
            }
          }
        }

        addEvent(formData)
          .then((response) => {
            if (response.data.statusCode === 200) {
              navigate("/event-list");
              app_dispatch({
                type: "SHOW_RESPONSE",
                toast: AppToast({
                  message: response.data.message,
                  color: "success-alert",
                }),
              });
            }
          })
          .catch((err) => {
            console.log(err);
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err.message,
                color: "danger-alert",
              }),
            });
          });
      } catch (err) {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: err.message,
            color: "danger-alert",
          }),
        });
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
        <CCol xs={1}></CCol>
        <CCol xs={10}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Event Registration </strong>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
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
                      floatingclassname="mb-3"
                      floatinglabel="Event Date"
                      placeholder="Event Date"
                      name="event_date"
                      min={new Date()}
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
                    floatingclassname="mb-3"
                    floatinglabel="Venue/Location"
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
                    floatingclassname="mb-3"
                    floatinglabel="Type of event"
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
                    floatingclassname="mb-3"
                    floatinglabel="Expected number of attendees"
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
                    floatingclassname="mb-3"
                    floatinglabel="Audio/visual equipment needs"
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
                  <ReactSelect
                    id="validationSecurityNeeds"
                    floatinglabel="Security needs"
                    options={[
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                    isRequired={true}
                    handleChange={handleOnChange}
                    name="security"
                    placeholder="Security needs"
                    value={state.security}
                  />
                  {/* // <CFormInput
                  //   type="text"
                  //   id="validationSecurityNeeds"
                  //   floatingclassname="mb-3"
                  //   floatinglabel="Security needs"
                  //   placeholder="Security needs"
                  //   name="security"
                  //   defaultValue={state.security}
                  //   onChange={handleOnChange}
                  //   required
                  // /> */}
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
                    name="special_request"
                    defaultValue={state.special_request}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Special requests or accommodations.
                  </CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    type="file"
                    id="formFileMultiple"
                    label="Multiple files"
                    multiple
                    name="banner_images"
                    onChange={(e) => {
                      setState({ ...state, banner_images: e.target.files });
                    }}
                  />
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
        <CCol xs={1}></CCol>
      </CRow>
    </>
  );
};
