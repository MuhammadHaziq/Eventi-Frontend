import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CImage,
  CCardImage,
  CFormCheck,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { login } from "src/context/AuthContext/service";
import jwtDecode from "jwt-decode";
import authAxios from "src/utils/axios";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import { useAuthAppDispatch } from "src/context/AuthContext";
import logo from "../../../assets/logs/Eventsrack-white.png";
const Login = () => {
  const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const app_dispatch = useAppDispatch();
  const auth_dispatch = useAuthAppDispatch();
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
        login({
          email: email,
          password: password,
          user_type: userType ? userType : "admin",
        })
          .then((response) => {
            authAxios.defaults.headers.common["Authorization"] =
              response.data.data;
            localStorage.setItem("eventi", response.data.data);
            const decodedHeader = jwtDecode(response.data.data);
            delete decodedHeader?.user?.permissions;
            localStorage.setItem(
              "eventi-user",
              JSON.stringify(decodedHeader?.user)
            );
            auth_dispatch({
              type: "USER_LOGIN",
              user: decodedHeader?.user,
              permissions: jwtDecode(response.data.data)?.permissions,
            });
            navigate("/");
          })
          .catch((err) => {
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err.response?.data?.message,
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
  const logoStyle={
    textAlign : "center",
    padding : "0px 100px 0px 100px",
    marginTop : "-60px",
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    className="needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1>Login</h1>
                    <p
                      className={`text-medium-emphasis ${
                        errors ? "text-danger" : ""
                      }`}
                    >
                      {errors ? errors : "Sign In to your account"}
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="validationEmail"
                        required
                      />
                      <CFormFeedback invalid>Please enter email.</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="validationPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <CFormFeedback invalid>
                        Please enter password.
                      </CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CFormCheck
                          type="radio"
                          name="vendor"
                          id="flexRadioDefault1"
                          value="vendor"
                          label="Vendor"
                          defaultChecked={userType === "vendor"}
                          onChange={(e) => setUserType(e.target.value)}
                        />
                        <CFormCheck
                          type="radio"
                          name="userType"
                          value="customer"
                          id="flexRadioDefault2"
                          label="Customer"
                          defaultChecked={userType === "customer"}
                          onChange={(e) => setUserType(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardImage style={logoStyle} orientation="top" src={logo}></CCardImage>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Do you want to sign up as a{" "}
                      {userType === "vendor" ? "Vendor" : "Customer"} ?
                    </p>
                    <Link to={`/register/${userType ? userType : "customer"}`}>
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
