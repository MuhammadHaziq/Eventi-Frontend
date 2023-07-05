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
  CFormText,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
  CFormTextarea,
  CInputGroup,
  CFormLabel,
} from "@coreui/react";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import { getEvent, updateEvent } from "src/context/EventContext/service";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { useNavigate } from "react-router-dom";
import ReactSelect from "src/components/Inputs/ReactSelect";
import UploadImage from "src/components/Image/UploadImage";
const EventModal = ({ eventId, visible, setVisible }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const app_dispatch = useAppDispatch();
  const [removedFiles, setRemovedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [, setImages] = useState([]);
  const [state, setState] = useState({
    event_name: "",
    event_date: null,
    amount: "",
    event_location: "",
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
            console.log(response.data.data, "response.data.data");
            setState({
              event_name: response.data.data.event_name,
              event_date: response.data.data.event_date,
              amount: response.data.data.amount,
              event_location: response.data.data.event_location,
              vendor_id: response.data.data.vendor_id,
              type_of_event: response.data.data.type_of_event,
              expected_attendence: response.data.data.expected_attendence,
              phone_number: response.data.data.phone_number,
              equipments: response.data.data.equipments,
              security: response.data.data.security === true ? "Yes" : "No",
              special_request: response.data.data.special_request,
            });
            setFiles([
              ...files,
              ...response.data.data?.banner_images?.map((item) => {
                return {
                  preview: `${process.env.REACT_APP_API_ENDPOINT}/media/eventImage/${response.data.data?._id}/${item}`,
                  name: item,
                  isOld: true,
                };
              }),
            ]);
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
          } else {
            app_dispatch({
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
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({ message: err.message, color: "danger-alert" }),
          });
        });
    } catch (err) {
      setIsLoading(false);
      app_dispatch({
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
      const formData = new FormData();
      formData.append("event_name", state.event_name);
      formData.append("event_date", state.event_date);
      formData.append("amount", state.amount);
      formData.append("event_location", state.event_location);
      formData.append("type_of_event", state.type_of_event);
      formData.append("expected_attendence", state.expected_attendence);
      formData.append("phone_number", state.phone_number);
      formData.append("equipments", state.equipments);
      formData.append("special_request", state.special_request);
      formData.append(
        "security",
        ["Yes", "yes"].includes(state.security) ? true : false
      );
      formData.append("removed_files", JSON.stringify(removedFiles));
      formData.append("eventId", eventId);
      const uploadFiles = files?.filter((item) => item.isOld !== true);

      if (uploadFiles && uploadFiles?.length > 0) {
        for (let x in uploadFiles) {
          if (typeof uploadFiles[x] === "object") {
            formData.append(`banner_images`, uploadFiles[x]);
          }
        }
      }

      try {
        updateEvent(eventId, formData)
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      if ((acceptedFiles || [])?.length + (files || [])?.length > 5) {
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
    setRemovedFiles([
      ...removedFiles,
      ...files
        ?.filter((item) => item.name == fileName)
        ?.map((item) => item.name),
    ]);
    setFiles(files?.filter((item) => item.name !== fileName));
  };

  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={setVisible}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>{eventId ? "Edit" : "Add"} Event</CModalTitle>
        </CModalHeader>
        <CModalBody>
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
                value={state.event_name}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback invalid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={6} className="mt-5">
              <CInputGroup>
                <CFormInput
                  type="date"
                  id="validationEventDate"
                  floatingclassname="mb-3"
                  floatinglabel="Event Date"
                  placeholder="Event Date"
                  name="event_date"
                  value={state.event_date}
                  onChange={handleOnChange}
                  required
                />
                <CFormFeedback invalid>Please enter event date.</CFormFeedback>
              </CInputGroup>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="validationAmount"
                floatingclassname="mb-3"
                floatinglabel="Amount"
                placeholder="Amount"
                name="amount"
                label="Amount"
                defaultValue={state.amount}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback invalid>
                Please provide a Amount Name.
              </CFormFeedback>
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
                floatingclassname="mb-3"
                floatinglabel="Type of event"
                placeholder="Type of event"
                label="Event Type"
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
                floatingclassname="mb-3"
                floatinglabel="Expected number of attendees"
                placeholder="Expected number of attendees"
                label="Expected number of attendees"
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
                value={state.equipments}
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
              {/* <CFormInput
                type="text"
                id="validationSecurityNeeds"
                floatingclassname="mb-3"
                floatinglabel="Security needs"
                placeholder="Security needs"
                name="security"
                value={state.security}
                onChange={handleOnChange}
                required
              /> */}
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
                value={state.special_request}
                onChange={handleOnChange}
                label="Note"
                required
              />
              <CFormFeedback invalid>
                Please provide a Special requests or accommodations.
              </CFormFeedback>
            </CCol>
            <CCol>
              <CFormLabel>Image Upload</CFormLabel>
              <CFormText>You can only upload a maximum of 5 images</CFormText>
              <UploadImage
                onDrop={onDrop}
                maxFiles={5}
                images={files}
                removeSelectedFiles={handleOnRemove}
                maxSize={25000000}
              />
            </CCol>
            <CRow className="mt-4">
              <CCol className="text-end">
                <CButton
                  size="md"
                  color="success"
                  variant="outline"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <CSpinner /> : "Update"}
                </CButton>
                <CButton
                  style={{ marginLeft: "10px" }}
                  color="dark"
                  size="md"
                  variant="outline"
                  onClick={setVisible}
                  disabled={isLoading}
                >
                  Close
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};
export default EventModal;
