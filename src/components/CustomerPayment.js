import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import {
  CCol,
  CSpinner,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CButton,
  CFormFeedback,
} from "@coreui/react";
import { useAppState } from "src/context/AppContext";
import { UserRequestEventStatuses } from "src/utils/constants";
import { Paystack } from "./eventi";
import { CNav, CNavItem, CNavLink } from "@coreui/react";
import ReactSelect from "./Inputs/ReactSelect";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const CustomerPayment = ({
  visiblePaymentModel,
  setVisiblePaymentModel,
  approvedEventStatus,
  eventStatus,
  eventDetail,
  setAttendShow,
}) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const { currentUser } = useAppState();
  const navigate = useNavigate();
  const changePaymentMethod = (e) => {
    setPaymentError(false);
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.data?.user_type === "customer") {
        setPaymentMethod("Paystack");
      }
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
  const getPoints = () => {
    return ((eventDetail?.points_percent / 100) * amount).toFixed(2);
  };
  const componentProps = {
    email,
    amount: amount,
    currency: "ZAR",
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    // ref: (props.type == "customer" ? "c_" : "v_") + props.ref,
    onSuccess: ({ reference }) => {
      setIsPaying(true);

      const data = {
        account_id: currentUser?.data?._id,
        event_id: eventDetail?._id,
        payment_id: reference,
        payment_method: paymentMethod,
        points_available: getPoints(),
        amount: amount,
        currency: "ZAR",
        status: UserRequestEventStatuses(eventStatus),
      };
      payNowPaystack(data);
      resetForm();
    },
    onClose: () => console.log("Wait! don't go!!!!"),
  };
  const uuid = () => {
    return "xxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const showError = () => {
    setPaymentError(true);
  };

  const payNowPaystack = async (data) => {
    await approvedEventStatus(data);
    setIsPaying(false);
    setVisiblePaymentModel(false);
  };

  const payNowCash = async () => {
    setIsPaying(true);
    const data = {
      account_id: currentUser?.data?._id,
      event_id: eventDetail?._id,
      payment_id: uuid(),
      payment_method: paymentMethod,
      points_available: getPoints(),
      amount: amount,
      currency: "ZAR",
      status: UserRequestEventStatuses(eventStatus),
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
          <CModalTitle> Payment Information</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {currentUser?.data?.user_type !== "customer" ? (
            <CCol md={6} className="pb-4">
              <ReactSelect
                id="validationPaymentMethod"
                floatinglabel="Payment method"
                options={[
                  { value: "Cash", label: "Cash" },
                  { value: "Paystack", label: "Paystack" },
                ]}
                isRequired={true}
                handleChange={changePaymentMethod}
                name="paymentMethod"
                placeholder="Payment method"
                value={paymentMethod}
                label="Select Payment Method"
              />
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

          {setAttendShow === true ? (
            ""
          ) : (
            <div>
              {currentUser?.data?.user_type == "customer" ? (
                <CNav>
                  <CNavItem>
                    <CNavLink active>
                      *Note If you want buy more Ticket for this Event{" "}
                      <b>
                        <span
                          onClick={() =>
                            navigate(`/ticket/${eventDetail?._id}`)
                          }
                        >
                          <u>Please Click here</u>
                        </span>
                      </b>
                    </CNavLink>
                  </CNavItem>
                </CNav>
              ) : (
                ""
              )}
            </div>
          )}

          <CModalFooter>
            {/*  <CButton
              style={{ marginLeft: "10px" }}
              color="info"
              size="lg"
              variant="outline"
              onClick={() => setVisiblePaymentModel(!visiblePaymentModel)}
            >
              If you want buy more Ticket Please Click here
            </CButton> */}

            {currentUser?.data?.user_type !== "customer" ? (
              paymentMethod == "Paystack" ? (
                <PaystackButton
                  className="paystack-button"
                  {...componentProps}
                />
              ) : paymentMethod == "Cash" ? (
                <CButton className="paystack-button" onClick={payNowCash}>
                  {isPaying ? <CSpinner /> : "Pay Now"}
                </CButton>
              ) : (
                <CButton className="paystack-button" onClick={showError}>
                  Pay Now
                </CButton>
              )
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
export default CustomerPayment;
