import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import {
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CButton,
  CSpinner,
} from "@coreui/react";

const componentName = ({ visiblePaymentModel, setVisiblePaymentModel }) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const amount = 25;
  const [email, setEmail] = useState("haseeb@kodxsystem.com");
  const [name, setName] = useState("Haseeb");
  const [phone, setPhone] = useState("03224512868");

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
  };

  const componentProps = {
    email,
    amount: amount * 100,
    currency: "ZAR",
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    // ref: (props.type == "customer" ? "c_" : "v_") + props.ref,
    onSuccess: ({ reference }) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      resetForm();
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <>
      <CModal
        backdrop="static"
        visible={visiblePaymentModel}
        onClose={setVisiblePaymentModel}
        size="md"
      >
        <CModalHeader>
          <CModalTitle> Payment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h5>Payment Information</h5>

          <CRow className="mb-3">
            <CFormLabel
              htmlFor="staticEmail"
              className="col-sm-3 col-form-label"
            >
              <strong>Email :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput type="text" id="staticEmail" readOnly plainText />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              htmlFor="inputPassword"
              className="col-sm-3 col-form-label"
            >
              <strong>First Name :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticFirstName"
                defaultValue="Haseeb"
                readOnly
                plainText
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              htmlFor="inputPassword"
              className="col-sm-3 col-form-label"
            >
              <strong>Last Name :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticLastName"
                defaultValue="Test"
                readOnly
                plainText
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              htmlFor="inputPassword"
              className="col-sm-3 col-form-label"
            >
              <strong>Amount :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticAmount"
                defaultValue="25"
                readOnly
                plainText
              />
            </CCol>
          </CRow>
          <CModalFooter>
            <PaystackButton className="paystack-button" {...componentProps} />
            <CButton
              style={{ marginLeft: "10px" }}
              color="dark"
              size="md"
              variant="outline"
              onClick={setVisiblePaymentModel}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModalBody>
      </CModal>
    </>
  );
};
export default componentName;
