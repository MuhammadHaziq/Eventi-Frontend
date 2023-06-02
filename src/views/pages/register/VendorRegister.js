import React, { useState } from "react";
import {
  CButton,
  CCardBody,
  CFormSelect,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CInputGroup,
} from "@coreui/react";
import { GenderSelection } from "src/components/Inputs/GenderSelection";
import { signUp } from "src/context/AuthContext/service";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
const VendorRegister = () => {
  const [validated, setValidated] = useState(false);
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    business_name: "",
    address: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    user_type: "vendor",
  });
  const app_dispatch = useAppDispatch();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      try {
        signUp(state)
          .then((response) => {
            console.log(response);
            setState({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              business_name: "",
              address: "",
              date_of_birth: "",
              gender: "",
              phone_number: "",
              user_type: "vendor",
            });
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
          })
          .catch((err) => {
            console.log(err);
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err.response.data.message,
                color: "danger-alert",
              }),
            });
          });
      } catch (err) {
        console.log("CATCH ERROR", err);
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: err.message,
            color: "danger-alert",
          }),
        });
      }
      console.log(state, event, "state");
    }

    setValidated(true);
  };
  return (
    <CCardBody className="p-4">
      <CForm
        className="row g-2 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <h1>Vendor Register</h1>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="validationFirstName"
            floatingclassname="mb-3"
            floatinglabel="First Name"
            placeholder="First Name"
            name="first_name"
            defaultValue={state.first_name}
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
            name="last_name"
            defaultValue={state.last_name}
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
            name="email"
            defaultValue={state.email}
            autoComplete={""}
            onChange={handleOnChange}
            required
          />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="password"
            id="validationPassword"
            floatingclassname="mb-3"
            floatinglabel="Password"
            placeholder="Passwors"
            autoComplete=""
            name="password"
            defaultValue={state.password}
            onChange={handleOnChange}
            required
          />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="validationBusinessName"
            floatingclassname="mb-3"
            floatinglabel="Business Name"
            placeholder="Business Name"
            name="business_name"
            defaultValue={state.business_name}
            onChange={handleOnChange}
            required
          />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>
        <CCol md={6}>
          <PhoneNumberInput
            phone_number={state.phone_number}
            handleOnChange={handleOnChange}
          />
        </CCol>
        <CCol md={6}>
          <CInputGroup>
            <CFormInput
              type="string"
              id="validationAddress"
              floatingclassname="mb-3"
              floatinglabel="Address"
              placeholder="Address"
              name="address"
              defaultValue={state.address}
              onChange={handleOnChange}
              required
            />
            <CFormFeedback invalid>Please enter address.</CFormFeedback>
          </CInputGroup>
        </CCol>
        <CCol md={6}>
          <CInputGroup>
            <CFormInput
              type="date"
              id="validationDateOfBirth"
              floatingclassname="mb-3"
              floatinglabel="Date Of Birth"
              placeholder="Date Of Birth"
              name="date_of_birth"
              defaultValue={state.date_of_birth}
              onChange={handleOnChange}
              required
            />
            <CFormFeedback invalid>Please enter date of birth.</CFormFeedback>
          </CInputGroup>
        </CCol>
        <CCol md={6}>
          <GenderSelection
            gender={state.gender}
            handleOnChange={handleOnChange}
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
            Sign Up
          </CButton>
        </CCol>
      </CForm>
    </CCardBody>
  );
};

export default VendorRegister;
