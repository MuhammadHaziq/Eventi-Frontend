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
import { UserRequestEventStatuses } from "src/utils/constants";
import { Paystack } from "./eventi";
import ReactSelect from "./Inputs/ReactSelect";
import "./style.scss";

const Payment = ({
  isAdmin,
  vendor,
  visiblePaymentModel,
  setVisiblePaymentModel,
  eventDetail,
  approvedEventStatus,
  eventStatus,
  selectedProducts,
}) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentError, setPaymentError] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const { currentUser } = useAppState();

  useEffect(() => {
    if (eventDetail || vendor) {
      if (isAdmin) {
        setAmount(+eventDetail?.amount || 0);
        setEmail(vendor?.email || "");
        setPhone(vendor?.phone_number || "");
        setFirstName(vendor?.first_name || "");
        setLastName(vendor?.last_name || "");
        setName((vendor?.first_name || "") + " " + (vendor?.last_name || ""));
      } else {
        const vendorDetail =
          eventDetail?.joined_vendors?.filter(
            (item) => item?.vendor_id?._id === currentUser?.data?._id
          )?.[0]?.vendor_id || null;
        setAmount(+eventDetail?.amount || 0);
        setEmail(vendorDetail?.email || "");
        setPhone(vendorDetail?.phone_number || "");
        setFirstName(vendorDetail?.first_name || "");
        setLastName(vendorDetail?.last_name || "");
        setName(
          (vendorDetail?.first_name || "") +
            " " +
            (vendorDetail?.last_name || "")
        );
      }
    }
  }, [eventDetail, vendor]);
  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setName("");
    setAmount(0);
  };

  const componentProps = {
    email,
    amount: +amount * 100,
    currency: "ZAR",
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    // ref: (props.type == "customer" ? "c_" : "v_") + props.ref,
    onSuccess: ({ reference }) => {
      const vendorDetail =
        eventDetail?.joined_vendors?.filter(
          (item) => item?.vendor_id?._id === currentUser?.data?._id
        )?.[0]?.vendor_id || null;
      const data = {
        isAdmin: false,
        account_id: vendorDetail?._id,
        event_id: eventDetail?._id,
        payment_id: reference,
        amount: +amount * 100,
        currency: "ZAR",
        status: UserRequestEventStatuses(eventStatus),
      };
      approvedEventStatus(data);
      setVisiblePaymentModel(false);
      // resetForm();
    },
    onClose: () => {
      setVisiblePaymentModel(false);
    },
  };
  const uuid = () => {
    return "xxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const payNowCash = async () => {
    setIsPaying(true);
    const data = {
      isAdmin: isAdmin,
      account_id: vendor?.account_id,
      event_id: eventDetail?._id,
      products: selectedProducts,
      payment_method: paymentMethod,
      payment_id: uuid(),
      amount: +amount * 100,
      currency: "ZAR",
      status: UserRequestEventStatuses("Approved"),
    };
    await approvedEventStatus(data);
    setIsPaying(false);
    setVisiblePaymentModel(false);
  };

  return (
    <>
      <CModal
        backdrop="static"
        visible={visiblePaymentModel}
        onClose={() => setVisiblePaymentModel(!visiblePaymentModel)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Payment Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {currentUser?.data?.user_type !== "vendor" && isAdmin ? (
            <CCol md={6} className="pb-4">
              <h5>Payment Method: {paymentMethod}</h5>
              {paymentError ? (
                <CFormFeedback style={{ color: "red" }}>
                  Please provide a Payment method
                </CFormFeedback>
              ) : (
                ""
              )}
            </CCol>
          ) : (
            ""
          )}
          <Paystack
            email={email}
            firstName={firstName}
            lastName={lastName}
            amount={amount}
          />
          <CModalFooter>
            {currentUser?.data?.user_type !== "vendor" && isAdmin ? (
              <CButton className="paystack-button" onClick={payNowCash}>
                {isPaying ? <CSpinner /> : "Pay Now"}
              </CButton>
            ) : (
              <PaystackButton className="paystack-button" {...componentProps} />
            )}

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
export default Payment;
