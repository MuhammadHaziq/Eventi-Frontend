import React, { useEffect, useState } from "react";
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
} from "@coreui/react";
import { useAppState } from "src/context/AppContext";
import { UserRequestEventStatuses } from "src/utils/constants";
import './style.scss'
const CustomerPayment = ({
  visiblePaymentModel,
  setVisiblePaymentModel,
  approvedEventStatus,
  eventStatus,
  eventDetail,
}) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState("haseeb@kodxsystem.com");
  const [name, setName] = useState("Haseeb");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("03224512868");
  const [amount, setAmount] = useState(0);
  const { currentUser } = useAppState();



  useEffect(() => {
    if (currentUser) {
      setAmount(eventDetail?.amount || 0);
      setEmail(currentUser?.data?.email || "");
      setPhone(currentUser?.data?.phone_number || "");
      setFirstName(currentUser?.data?.first_name || "");
      setLastName(currentUser?.data?.last_name || "");
      setName(
        (currentUser?.data?.first_name || "") +
          " " +
          (currentUser?.data?.last_name || "")
      );
    }
  }, [currentUser]);
  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
    setAmount(0);
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
      const data = {
        account_id: currentUser?.data?._id,
        event_id: eventDetail?._id,
        payment_id: reference,
        amount: amount * 100,
        currency: "ZAR",
        status: UserRequestEventStatuses(eventStatus),
      };
      approvedEventStatus(data);
      resetForm();
    },
    onClose: () => alert("Wait! don't go!!!!"),
  };

  return (
    <>
      <CModal
        backdrop="static"
        visible={visiblePaymentModel}
        onClick={() => setVisiblePaymentModel(!visiblePaymentModel)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle> Payment</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h5>Payment Information</h5>
          <CRow>
            <CCol sm={7}>
             <CRow className="mb-3">
            <CFormLabel
              htmlFor="staticEmail"
              className="col-sm-3 col-form-label"
            >
              <strong>Email :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticEmail"
                readOnly
                plainText
                value={email}
              />
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
                defaultValue={firstName}
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
                defaultValue={lastName}
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
                value={amount}
                readOnly
                plainText
              />
            </CCol>
          </CRow></CCol>
          <CCol sm={5}> </CCol>
          </CRow>
         

          <CModalFooter>
            <PaystackButton className="paystack-button" {...componentProps} />
            <CButton
              style={{ marginLeft: "10px" }}
              color="dark"
              size="lg"
              variant="outline"
              onClick={() => setVisiblePaymentModel(!visiblePaymentModel)}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModalBody>
      </CModal>
    </>
  );
};
export default CustomerPayment;
