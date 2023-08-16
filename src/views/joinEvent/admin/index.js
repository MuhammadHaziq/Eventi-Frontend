import React, { useState, useCallback, useEffect } from "react";
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilListHighPriority } from "@coreui/icons";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { AppToast } from "src/components/AppToast";
import { customerJoinEvent, getEvent } from "src/context/EventContext/service";
import AppEventDetail from "src/components/AppEventDetail";
import "./style.scss";
import JoinedCustomers from "./JoinedCustomer";
import JoinedVendors from "./JoinedVendor";
import CustomerPayment from "src/components/CustomerPayment";
import AppEventJoinButton from "src/components/AppEventJoinButton";

const AdminJoinEvent = () => {
  const { currentUser } = useAppState();
  const navigate = useNavigate();
  const app_dispatch = useAppDispatch();
  const { event_id, account_id } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [eventStatus, setEventStatus] = useState("");
  const [showPaymentModel, setShowPaymentModel] = useState(false);

  const getEventDetail = useCallback(() => {
    try {
      setIsLoading(true);
      getEvent(event_id)
        .then((response) => {
          if (response.data.data) {
            setEventDetail(response.data.data || null);
            setEventStatus(
              response.data.data?.joined_customers?.filter(
                (item) =>
                  item?.customer_id?.user_detail?.account_id ===
                  currentUser?.data?._id
              )?.[0]?.event_status || "Join Event"
            );
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
          } else {
            setEventDetail(null);
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
          setEventDetail(null);
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
  }, [event_id]);

  useEffect(() => {
    if (event_id) {
      getEventDetail(event_id);
    }
  }, [event_id]);

  const joinEvent = (status) => {
    setIsLoading(true);
    customerJoinEvent(event_id, account_id, {
      status: status || "Request To Approved",
    })
      .then((response) => {
        if (response.data.data) {
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: response.data.message,
              color: "success-alert",
            }),
          });
          navigate("/event-list");
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
  };

  const unJoinEvent = () => {
    setIsLoading(true);
    customerJoinEvent(event_id, account_id, { status: "remove" })
      .then((response) => {
        if (response.data.data) {
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: response.data.message,
              color: "success-alert",
            }),
          });
          navigate("/event-list");
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
  };

  const getNextStatusForEvent = (status) => {
    const eventStatus = {
      "": "Request To Approved",
      "Request To Approved": "Pending For Payment",
      "Pending For Payment": "Approved",
    };
    return eventStatus[status] || "Request To Approved";
  };
  const joinTheEventAsAVendor = () => {
    alert("hi");
  };
  console.log(eventDetail);
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-2">
            <CCardHeader className="d-flex justify-content-between">
              <strong>
                <h5>Join Event Details</h5>
              </strong>
            </CCardHeader>
            <CCardBody>
              {eventDetail && <AppEventDetail event_detail={eventDetail} />}

              {currentUser?.data?.user_type === "admin" && (
                <CButton
                  color="primary"
                  onClick={() => joinTheEventAsAVendor()}
                  size="sm"
                >
                  <CIcon icon={cilListHighPriority} className="text-white" />{" "}
                  Join Event as a Vendor
                
                </CButton>
              )}
              {currentUser?.data?.user_type !== "admin" && (
                <CContainer>
                  <CRow>
                    <CCol>
                      <CButton
                        className="join-event-customer"
                        color={
                          eventDetail?.joined_customers
                            ?.map(
                              (item) =>
                                item?.customer_id?.user_detail?.account_id
                            )
                            .includes(currentUser?.data?._id)
                            ? "warning"
                            : "primary"
                        }
                        onClick={() => {
                          eventStatus === "Pending For Payment"
                            ? setShowPaymentModel(!showPaymentModel)
                            : joinEvent(getNextStatusForEvent(eventStatus));
                        }}
                        disabled={
                          isLoading ||
                          ["Request To Approved", "Approved"].includes(
                            eventStatus || "Pending"
                          )
                        }
                      >
                        {eventStatus || "Join Event"}
                      </CButton>
                    </CCol>
                  </CRow>
                </CContainer>
              )}
            </CCardBody>
          </CCard>
          <CCard className="mb-2">
            <CCardHeader>
              <strong>Joined Customers</strong>
            </CCardHeader>
            <CCardBody>
              <JoinedCustomers
                joinedCustomers={eventDetail?.joined_customers || []}
              />
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Joined Vendors</strong>
            </CCardHeader>
            <CCardBody>
              <JoinedVendors
                joinedVendors={eventDetail?.joined_vendors || []}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {showPaymentModel && (
        <CustomerPayment
          visiblePaymentModel={showPaymentModel}
          setVisiblePaymentModel={setShowPaymentModel}
          eventDetail={eventDetail}
        />
      )}
    </>
  );
};
export default AdminJoinEvent;
