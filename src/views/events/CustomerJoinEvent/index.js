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
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { AppToast } from "src/components/AppToast";
import { customerJoinEvent, getEvent } from "src/context/EventContext/service";
import AppEventDetail from "src/components/AppEventDetail";
import "./style.scss";

const CustomerJoinEvent = () => {
  const { currentUser } = useAppState();
  const navigate = useNavigate();
  const app_dispatch = useAppDispatch();
  const { event_id, account_id } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getEventDetail = useCallback(() => {
    try {
      setIsLoading(true);
      getEvent(event_id)
        .then((response) => {
          if (response.data.data) {
            setEventDetail(response.data.data || null);
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

  const joinEvent = () => {
    setIsLoading(true);
    customerJoinEvent(event_id, account_id)
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

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Join Event</strong>
            </CCardHeader>
            <CCardBody>
              {eventDetail && <AppEventDetail event_detail={eventDetail} />}
              <CContainer>
                <CRow>
                  <CCol>
                    <CButton
                      className="join-event-customer"
                      color={
                        eventDetail?.joined_customers?.includes(
                          currentUser?.data?._id
                        )
                          ? "warning"
                          : "primary"
                      }
                      onClick={() => {
                        eventDetail?.joined_customers?.includes(
                          currentUser?.data?._id
                        )
                          ? null
                          : joinEvent();
                      }}
                      disabled={isLoading}
                    >
                      {eventDetail?.joined_customers?.includes(
                        currentUser?.data?._id
                      )
                        ? "Joined Event"
                        : "Join Event"}
                    </CButton>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default CustomerJoinEvent;
