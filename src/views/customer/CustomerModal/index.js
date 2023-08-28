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
  CInputGroup,
  CFormLabel,
  CFormSwitch,
} from "@coreui/react";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import {
  getCustomer,
  updateCustomer,
} from "src/context/CustomerContext/service";
import { signUp } from "src/context/AuthContext/service";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { GenderSelection } from "src/components/Inputs/GenderSelection";
const CustomerModal = ({ customer_id, visible, setVisible }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const app_dispatch = useAppDispatch();
  const [showToggle, setShowToggle] = useState(false);
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
    age_verification: true,
    user_type: "customer",
  });

  const getCustomerById = useCallback(() => {
    try {
      setIsLoading(true);
      getCustomer(customer_id)
        .then((response) => {
          if (response.data.data) {
            setState({
              first_name: response.data.data.first_name || "",
              last_name: response.data.data.last_name || "",
              email: response.data.data.email || "",
              business_name: response.data.data.business_name || "",
              address: response.data.data.address || "",
              date_of_birth: response.data.data.date_of_birth || "",
              gender: response.data.data.gender || "",
              phone_number: response.data.data.phone_number || "",
              age_verification: response.data.data.age_verification || true,
            });

            var dob = response.data.data.date_of_birth;
            var newdob = new Date(dob);
            var now = new Date();
            var age = now.getFullYear() - newdob?.getFullYear();
            if (
              now.getMonth() < newdob.getMonth() ||
              (now.getMonth() === newdob.getMonth() &&
                now.getDate() < newdob.getDate())
            ) {
              age--;
            }
            // Set the message based on age
            if (age >= 18) {
              setShowToggle(true);
            } else {
              setShowToggle(false);
            }

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
  }, [customer_id]);

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
        (customer_id
          ? updateCustomer({
              customerId: customer_id,
              ...state,
            })
          : signUp({
              ...state,
              user_type: "customer",
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
    if (e.target.name === "date_of_birth") {
      var dob = e.target.value;
      var newdob = new Date(dob);
      var now = new Date();
      var age = now.getFullYear() - newdob?.getFullYear();
      if (
        now.getMonth() < newdob.getMonth() ||
        (now.getMonth() === newdob.getMonth() &&
          now.getDate() < newdob.getDate())
      ) {
        age--;
      }
      // Set the message based on age
      if (age >= 18) {
        setShowToggle(true);
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({ message: "You can join! You age 18+", color: "success-alert" }),
        });
      } else {
        setShowToggle(false);
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: "Sorry, you can't join. This website requires you to be 18 years or older to enter.",
            color: "danger-alert",
          }),
        });
      }
    }

    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (customer_id) {
      getCustomerById();
    }
  }, [customer_id]);

  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={setVisible}
        size="lg"
      >
        <CModalHeader> 
          <CModalTitle>{customer_id ? "Edit" : "Add"} Customer</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-2 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {/*<h1>{customer_id ? "Edit" : "Add"} Customer</h1>*/}
            <CCol md={6}>
              <CFormInput
                type="text"
                id="validationFirstName"
                floatingclassname="mb-3"
                floatinglabel="First Name"
                placeholder="First Name"
                name="first_name"
                label="First Name"
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
                autoComplete="false"
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            {!customer_id && (
              <CCol md={6}>
                <CFormInput
                  type="password"
                  id="validationPassword"
                  floatingclassname="mb-3"
                  floatinglabel="Password"
                  placeholder="Password"
                  label="Password"
                  autoComplete="false"
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
                required
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
                label="Address"
                name="address"
                value={state.address}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback invalid>Please enter address.</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Gender</CFormLabel>
              <GenderSelection
                gender={state.gender}
                handleOnChange={handleOnChange}
                required={true}
              />
            </CCol>{" "}
            <CCol md={6}>
              <CFormInput
                type="date"
                id="validationDateOfBirth"
                floatingclassname="mb-3"
                floatinglabel="Date Of Birth"
                placeholder="Date Of Birth"
                label="Date Of Birth"
                name="date_of_birth"
                value={state.date_of_birth}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback invalid>Please enter date of birth.</CFormFeedback>
            </CCol>
            {/* {showToggle === true ? (
              <CCol xs={12}>
                <CFormLabel>Age Verification</CFormLabel>
                <CFormSwitch
                  label="Are you over 18+ years old?"
                  id="age_verification"
                  defaultChecked={state.age_verification}
                  disabled
                  onChange={(e) =>
                    setState({
                      ...state,
                      age_verification: !state.age_verification,
                    })
                  }
                />
              </CCol>
            ) : (
              ""
            )} */}
            <CCol className="mt-5 text-end" md={12}>
              <CButton
                size="md"
                color="success"
                variant="outline"
                type="submit"
                disabled={showToggle === true ? isLoading : true}
              >
                {isLoading ? <CSpinner /> : "Save"}
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
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};
export default CustomerModal;
