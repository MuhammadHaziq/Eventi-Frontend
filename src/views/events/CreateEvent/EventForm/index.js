import React, { useState, useCallback } from "react";
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
  CFormLabel,
} from "@coreui/react";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { addEvent } from "src/context/EventContext/service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import ReactSelect from "src/components/Inputs/ReactSelect";
import UploadImage from "src/components/Image/UploadImage";
import "./index.scss";

export const EventRegistration = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [state, setState] = useState({
    event_name: "",
    event_start_date: null,
    event_end_date: null,
    amount: null,
    points_percent: null,
    event_location: "",
    type_of_event: "",
    expected_attendence: "",
    phone_number: "",
    equipments: "",
    security: "",
    special_request: "",
    add_event_point: null,
    no_of_tickets: 0,
  });
  const [agree, setAgree] = useState(false);
  const app_dispatch = useAppDispatch();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (files && files?.length === 0) {
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({
          message: "File Input Is Required",
          color: "danger-alert",
        }),
      });
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      try {
        const formData = new FormData();
        formData.append("event_name", state.event_name);
        formData.append("event_start_date", state.event_start_date);
        formData.append("event_end_date", state.event_end_date);
        formData.append("amount", state.amount);
        formData.append("no_of_tickets", state.no_of_tickets);
        formData.append("points_percent", state.points_percent);
        formData.append("add_event_point", state.add_event_point);
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

        if (files && files?.length > 0) {
          for (let x in files) {
            if (typeof files[x] === "object") {
              formData.append(`banner_images`, files[x]);
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
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err?.response?.data?.message || err?.message,
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      // if(acceptedFiles?.length >= 5 || files?.length >= 5){
      if (
        (acceptedFiles || [])?.length + (state.banner_images || [])?.length >
        5
      ) {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: "More Than 5 Files Are Not Allowed",
            color: "danger-alert",
          }),
        });

        return;
      }
      setFiles([
        ...files,
        ...acceptedFiles?.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        }),
      ]);

      acceptedFiles.map((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          setImages((prevState) => [
            ...prevState,
            { id: index, src: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);

        return file;
      });
    },
    [files]
  );

  const handleOnRemove = (fileName) => {
    setFiles(files?.filter((item) => item.name !== fileName));
  };
  const getPoints = () => {
    return state.points_percent
      ? ((state.points_percent / 100) * state.amount).toFixed(2)
      : 0;
  };

  const getAddPoints = () => {
    return ((state.add_event_point * 100) / state.amount).toFixed(2);
  };

  const handleOnBlurPointPerc = (e) => {
    setState({ ...state, add_event_point: getPoints() });
  };
  const handleOnBlurAddPoint = (e) => {
    setState({ ...state, points_percent: getAddPoints() });
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
                    label="Event Name"
                    name="event_name"
                    defaultValue={state.event_name}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="date"
                    id="validationEventStartDate"
                    floatingclassname="mb-3"
                    label="Event Start Date"
                    floatinglabel="Event Start Date"
                    placeholder="Event Start Date"
                    name="event_start_date"
                    min={new Date()}
                    defaultValue={state.event_start_date}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please enter start event.
                  </CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    type="date"
                    id="validationEventEndtDate"
                    floatingclassname="mb-3"
                    label="Event End Date"
                    floatinglabel="Event End Date"
                    placeholder="Event End Date"
                    name="event_end_date"
                    min={new Date()}
                    defaultValue={state.event_end_date}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please enter end event.
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="validationAmount"
                    floatingclassname="mb-3"
                    floatinglabel="Amount"
                    placeholder="Amount"
                    name="amount"
                    label="Amount ZAR"
                    defaultValue={state.amount}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Amount .
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="points_percent"
                    floatingclassname="mb-3"
                    floatinglabel="Points Percentage"
                    placeholder="Points Percentage"
                    label="Points Percentage %"
                    name="points_percent"
                    disabled={!state.amount}
                    onBlur={handleOnBlurPointPerc}
                    value={state.points_percent}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Points Percentage
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="add_event_point"
                    floatingclassname="mb-3"
                    floatinglabel="Add Points"
                    placeholder="Add Points"
                    label="Add Points"
                    name="add_event_point"
                    disabled={!state.amount}
                    value={state.add_event_point}
                    onBlur={handleOnBlurAddPoint}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Add Points
                  </CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="no_of_tickets"
                    floatingclassname="mb-3"
                    floatinglabel="No Of Tickets"
                    placeholder="No Of Tickets"
                    label="No Of Tickets"
                    name="no_of_tickets"
                    defaultValue={state.no_of_tickets}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a No Of Tickets
                  </CFormFeedback>
                </CCol>
                <CCol md={12}>
                  Customer will receive <strong>{getPoints()}</strong> points
                  <hr></hr>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationVenueLocation"
                    floatingclassname="mb-3"
                    floatinglabel="Venue/Location"
                    placeholder="Venue/Location"
                    name="event_location"
                    label="Event Location"
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
                    label="Event Type"
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
                    label="Expected number of attendees"
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
                  <CFormLabel>Phone</CFormLabel>
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
                    label="Audio/visual equipment needs"
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
                    label="Security"
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
                    name="special_request"
                    label="Description"
                    defaultValue={state.special_request}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a Special requests or accommodations.
                  </CFormFeedback>
                </CCol>
                <CCol>
                  <UploadImage
                    onDrop={onDrop}
                    maxFiles={5}
                    images={files}
                    removeSelectedFiles={handleOnRemove}
                    maxSize={25000000}
                  />
                </CCol>
                {/* <CCol md={12}>
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
                </CCol> */}
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
                  <CButton
                    size="lg"
                    color="success"
                    variant="outline"
                    type="submit"
                  >
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
