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
  CSpinner,
} from "@coreui/react";
import { useAppState } from "src/context/AppContext";

const componentName = ({
  visiblePaymentModel,
  setVisiblePaymentModel,
  eventDetail,
  onPropSuccess,
}) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState();

  const { currentUser } = useAppState();
  console.log(currentUser);
  useEffect(() => {
    if (eventDetail) {
      const vendorDetail =
        eventDetail?.joined_vendors?.filter(
          (item) => item?.vendor_id?._id === currentUser?.data?._id
        )?.[0]?.vendor_id || null;
      setAmount(+eventDetail?.amount || 0);
      setEmail(vendorDetail?.email || "");
      setFirstName(vendorDetail?.first_name || "");
      setLastName(vendorDetail?.last_name || "");
    }
  }, [eventDetail]);
  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setAmount("");
  };

  const componentProps = {
    email,
    amount: amount * 100,
    currency: "ZAR",
    metadata: {
      firstName,
      lastName,
    },
    publicKey,
    text: "Pay Now",
    // ref: (props.type == "customer" ? "c_" : "v_") + props.ref,
    onSuccess: ({ reference }) => {
      // alert(
      //   `Your purchase was successful! Transaction reference: ${reference}`
      // );
      // resetForm();
      onPropSuccess(reference);
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <>
      <CModal
        backdrop="static"
        visible={visiblePaymentModel}
        onClick={() => setVisiblePaymentModel(!visiblePaymentModel)}
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
                value={firstName}
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
                value={lastName}
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
          </CRow>
          <CModalFooter>
            <PaystackButton className="paystack-button" {...componentProps} />
            <CButton
              style={{ marginLeft: "10px" }}
              color="dark"
              size="md"
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
export default componentName;
