import React, { useState, useCallback, useEffect } from "react";
import Ticket from "../Ticket";
import AppEventDetail from "src/components/AppEventDetail";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { AppToast } from "src/components/AppToast";
import {
  approvedCustomerJoinEvent,
  customerJoinEvent,
  getEvent,
} from "src/context/EventContext/service";
import { UserRequestEventStatuses } from "src/utils/constants";

export const CustTicket = () => {
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();
  const { event_id, account_id } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [eventStatus, setEventStatus] = useState("");

  const data = {
    amount: eventDetail?.amount,
    custID: currentUser?.data?._id,
    event_ID: event_id,
  };

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
              )?.[0]?.event_status || "Pending For Payment"
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

  const approvedEventStatus = (data) => {
    setIsLoading(true);
    approvedCustomerJoinEvent(event_id, account_id, data)
      .then((response) => {
        if (response.data.data) {
          setEventStatus(UserRequestEventStatuses(eventStatus));
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
  };

  return (
    <>
      <AppEventDetail event_detail={eventDetail} />
      <Ticket data={data} eventDetail = { eventDetail } />
    </>
  );
};
