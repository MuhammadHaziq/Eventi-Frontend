import React, { useCallback, useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormFeedback,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
  CFormTextarea,
  CInputGroup,
} from "@coreui/react";
import { useAppDispatch } from "src/context/AppContext";
import { useProductAppDispatch } from "src/context/ProductContext";
import { AppToast } from "src/components/AppToast";
import { getEvent, updateEvent } from "src/context/EventContext/service";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { useNavigate } from "react-router-dom";
const EventModal = ({ eventId, visible, setVisible }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useProductAppDispatch();
  const app_dispatch = useAppDispatch();
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
  const navigate = useNavigate();

  const getEventById = useCallback(() => {
    try {
      setIsLoading(true);
      getEvent(eventId)
        .then((response) => {
          if (response.data.data) {
            setState({
              event_name: response.data.data.event_name,
              event_date: new Date(),
              event_location: response.data.data.event_location,
              vendor_id: response.data.data.vendor_id,
              type_of_event: response.data.data.type_of_event,
              expected_attendence: response.data.data.expected_attendence,
              phone_number: response.data.data.phone_number,
              equipments: response.data.data.equipments,
              security: response.data.data.security === true ? "Yes" : "No",
              special_request: response.data.data.special_request,
            });
            dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
          } else {
            dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "danger-alert",
              }),
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({ message: err.message, color: "danger-alert" }),
          });
        });
    } catch (err) {
      setIsLoading(false);
      dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({ message: err.message, color: "danger-alert" }),
      });
    }
  }, [eventId]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      try {
        updateEvent({
          ...state,
          eventId: eventId,
          security: ["Yes", "yes"].includes(state.security) ? true : false,
        })
          .then((response) => {
            if (response.data.statusCode === 200) {
              app_dispatch({
                type: "SHOW_RESPONSE",
                toast: AppToast({
                  message: response.data.message,
                  color: "success-alert",
                }),
              });
              setVisible();
              navigate("/event-list");
            } else {
              app_dispatch({
                type: "SHOW_RESPONSE",
                toast: AppToast({
                  message: response.data.message,
                  color: "danger-alert",
                }),
              });
            }
          })
          .catch((err) => {
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err.response.data.message,
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
      }
    }
    setValidated(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (eventId) {
      getEventById();
    }
  }, [eventId]);

  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={setVisible}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>{eventId ? "Edit" : "Add"} Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
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
                value={state.event_name}
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
                  value={state.event_date}
                  onChange={handleOnChange}
                  required
                />
                <CFormFeedback invalid>Please enter event birth.</CFormFeedback>
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
                value={state.event_location}
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
                value={state.type_of_event}
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
                value={state.expected_attendence}
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
                value={state.equipments}
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
                value={state.security}
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
                value={state.special_request}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback invalid>
                Please provide a Special requests or accommodations.
              </CFormFeedback>
            </CCol>
            <CRow>
              <CCol className="text-end">
                <CButton color="primary" type="submit" disabled={isLoading}>
                  {isLoading ? <CSpinner /> : "Update"}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={setVisible} disabled={isLoading}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
export default EventModal;
