import React, { useCallback, useEffect, useState } from "react";
import {
  CCol,
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
  CFormLabel,
  CInputGroup,
} from "@coreui/react";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import { signUp } from "src/context/AuthContext/service";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { GenderSelection } from "src/components/Inputs/GenderSelection";
import { getVendor, updateVendor } from "src/context/VendorContext/service";
const VendorModal = ({ account_id, visible, setVisible }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const app_dispatch = useAppDispatch();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    business_name: "",
    password: "",
    address: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    user_type: "vendor",
  });

  const getVendorById = useCallback(() => {
    try {
      setIsLoading(true);
      getVendor(account_id)
        .then((response) => {
          if (response.data.data) {
            setState({
              first_name: response.data.data.first_name,
              last_name: response.data.data.last_name,
              email: response.data.data.email,
              business_name: response.data.data.business_name,
              address: response.data.data.address,
              date_of_birth: response.data.data.date_of_birth,
              gender: response.data.data.gender,
              phone_number: response.data.data.phone_number,
            });
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
  }, [account_id]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      setIsLoading(true);
      try {
        (account_id
          ? updateVendor({
              account_id: account_id,
              ...state,
            })
          : signUp({
              ...state,
              user_type: "vendor",
            })
        )
          .then((response) => {
            setIsLoading(false);
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
            setVisible();
          })
          .catch((err) => {
            setIsLoading(false);
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err?.response?.data?.message || err.message,
                color: "danger-alert",
              }),
            });
          });
      } catch (err) {
        setIsLoading(false);
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
    if (account_id) {
      getVendorById();
    }
  }, [account_id]);

  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={setVisible}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>{account_id ? "Edit" : "Add"} Vendor</CModalTitle>
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
                id="validationFirstName"
                floatingclassname="mb-3"
                floatinglabel="First Name"
                placeholder="First Name"
                label="First Name"
                name="first_name"
                value={state.first_name}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="validationLastName"
                floatingclassname="mb-3"
                floatinglabel="Last Name"
                placeholder="Last Name"
                label="Last Name"
                name="last_name"
                value={state.last_name}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="email"
                id="validationEmailAddress"
                floatingclassname="mb-3"
                floatinglabel="Email Address"
                placeholder="Email Address"
                label="Email"
                name="email"
                value={state.email}
                autoComplete={""}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            {!account_id && (
              <CCol md={6}>
                <CFormInput
                  type="password"
                  id="validationPassword"
                  floatingclassname="mb-3"
                  floatinglabel="Password"
                  placeholder="Passwors"
                  label="Password"
                  autoComplete=""
                  name="password"
                  defaultValue={state.password}
                  onChange={handleOnChange}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
            )}
            <CCol md={6}>
              <CFormInput
                type="text"
                id="validationBusinessName"
                floatingclassname="mb-3"
                floatinglabel="Optional Business Name"
                placeholder="Optional Business Name"
                label="Optional Business Name"
                name="business_name"
                value={state.business_name}
                onChange={handleOnChange}
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={6} className="">
              <CFormLabel>Phone</CFormLabel>
              <PhoneNumberInput
                phone_number={state.phone_number}
                handleOnChange={handleOnChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="string"
                id="validationAddress"
                floatingclassname="mb-3"
                floatinglabel="Address"
                placeholder="Address"
                name="address"
                label="Address"
                value={state.address}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback invalid>Please enter address.</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                id="validationDateOfBirth"
                floatingclassname="mb-3"
                floatinglabel="Date Of Birth"
                placeholder="Date Of Birth"
                name="date_of_birth"
                label="Date Of Birth"
                value={state.date_of_birth}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback invalid>Please enter date of birth.</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Gender</CFormLabel>
              <GenderSelection
                gender={state.gender}
                handleOnChange={handleOnChange}
              />
            </CCol>
            <CCol md={12} className="text-end">
              <CButton
                size="lg"
                color="success"
                variant="outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <CSpinner /> : "Save"}
              </CButton>
              <CButton
                style={{ marginLeft: "10px" }}
                color="dark"
                size="lg"
                variant="outline"
                onClick={setVisible}
                disabled={isLoading}
              >
                Close
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};
export default VendorModal;
