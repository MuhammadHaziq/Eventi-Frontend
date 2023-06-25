import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppProgress from "src/components/AppProgress";
import { AppToast } from "src/components/AppToast";
import { GenderSelection } from "src/components/Inputs/GenderSelection";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import {
  getCurrentUserDetail,
  updateAccount,
} from "src/context/AppContext/service";
const UserProfile = () => {
  const { account_id } = useParams();
  const { currentUser, permissions } = useAppState();
  const app_dispatch = useAppDispatch();
  const [validated, setValidated] = useState(false);
  const [edit, setEdit] = useState(false);
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
    user_type: currentUser?.data?.user_type,
    age_verification: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getAccountDetail = useCallback(() => {
    try {
      setIsLoading(true);
      getCurrentUserDetail(account_id)
        .then((response) => {
          if (response.data.data) {
            const { user_detail } = response?.data?.data?.data || {};
            setState({
              first_name: user_detail?.first_name,
              last_name: user_detail?.last_name,
              email: user_detail?.email,
              business_name: user_detail?.business_name,
              address: user_detail?.address,
              date_of_birth: user_detail?.date_of_birth,
              gender: user_detail?.gender,
              phone_number: user_detail?.phone_number,
              age_verification: user_detail?.age_verification,
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

  useEffect(() => {
    if (account_id) {
      getAccountDetail();
    }
  }, [account_id, getAccountDetail]);

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
        updateAccount(account_id, {
          account_id: account_id,
          ...state,
        })
          .then((response) => {
            setIsLoading(false);
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
            setEdit(false);
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

  return (
    <CRow>
      {!isLoading ? "" : <AppProgress loading={isLoading} />}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User Profile</strong>
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
                  id="validationFirstName"
                  floatingclassname="mb-3"
                  floatinglabel="First Name"
                  placeholder="First Name"
                  name="first_name"
                  label="First Name"
                  value={state.first_name}
                  onChange={handleOnChange}
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              {!true && (
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
                    disabled={!edit}
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
                  disabled={!edit}
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6} className="">
                <CFormLabel>Phone</CFormLabel>
                <PhoneNumberInput
                  phone_number={state.phone_number}
                  handleOnChange={handleOnChange}
                  disabled={!edit}
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
                  disabled={!edit}
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
                  label="Date Of Birth"
                  name="date_of_birth"
                  value={state.date_of_birth}
                  onChange={handleOnChange}
                  disabled={!edit}
                  required
                />
                <CFormFeedback invalid>
                  Please enter date of birth.
                </CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Gender</CFormLabel>
                <GenderSelection
                  gender={state.gender}
                  handleOnChange={handleOnChange}
                  disabled={!edit}
                />
              </CCol>
              {state?.user_type === "customer" && (
                <CCol xs={12}>
                  <CFormLabel>Age Verification</CFormLabel>
                  <CFormSwitch
                    label="Are you over 18+ years old?"
                    id="age_verification"
                    defaultChecked={state.age_verification}
                    onChange={(e) =>
                      setState({
                        ...state,
                        age_verification: !state.age_verification,
                      })
                    }
                    disabled={!edit}
                  />
                </CCol>
              )}
              {permissions.find(
                (item) => item.permission === "edit-profile"
              ) && (
                <CCol className="text-end">
                  <CButton
                    size="md"
                    color="success"
                    variant="outline"
                    type="submit"
                    disabled={isLoading || !edit}
                  >
                    {isLoading ? <CSpinner /> : "Save"}
                  </CButton>
                  <CButton
                    style={{ marginLeft: "10px" }}
                    color="dark"
                    size="md"
                    variant="outline"
                    onClick={() => setEdit(!edit)}
                    disabled={isLoading}
                  >
                    Edit
                  </CButton>
                </CCol>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserProfile;
