import React, { useState } from "react";
import { CCard, CCardBody, CButton, CRow, CCol } from "@coreui/react";
import { CSmartPagination } from "@coreui/react-pro";
import AppSwiperthumbs from "src/components/AppSwiperthumbs";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import AppEventJoinButton from "src/components/AppEventJoinButton";
import { EventStatuses, UserRequestEventStatuses } from "src/utils/constants";
import { AppToast } from "src/components/AppToast";
import { approvedCustomerJoinEvent } from "src/context/EventContext/service";
import CustomerPayment from "src/components/CustomerPayment";
const GridView = ({ data, tableMeta, updateFilter, filters }) => {
  const { currentUser } = useAppState();
  const [currentPage, setActivePage] = useState(tableMeta?.page || 1);
  const [showPaymentModel, setShowPaymentModel] = useState(false);
  const [eventDetail, setEventDetail] = useState(null);
  const [eventStatus, setEventStatus] = useState("Pending For Payment");
  const { app_dispatch } = useAppDispatch();

  const navigate = useNavigate();
  console.log("event data", data);

  const payNowClick = (row) => {
    console.log("Pay Now clicked for row:", row.amount);
    setEventDetail(row);
    setShowPaymentModel(true);
  };

  const approvedEventStatus = (data) => {
    approvedCustomerJoinEvent(data?.event_id, data?.account_id, data)
      .then((response) => {
        if (response.data.data) {
          setEventStatus(
            UserRequestEventStatuses(
              eventDetail?.joined_customers?.filter(
                (item) => item?.customer_id === currentUser?.data?._id
              )?.[0]?.event_status || "Pending For Payment"
            )
          );
          updateFilter({ ...filters, reload: !filters?.reload });
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
      })
      .catch((err) => {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({ message: err.message, color: "danger-alert" }),
        });
      });
  };

  return (
    <>
      <CRow className="event-grid-section">
        {(data || [])?.map((item, index) => (
          <CCol md={4} key={index}>
            <CCard className="mb-4">
              <CCardBody
                style={{
                  width: "100%",
                  height: "280px",
                }}
              >
                <AppSwiperthumbs
                  images={item?.banner_images}
                  accountId={item?._id}
                />
              </CCardBody>
              <hr></hr>
              <div>
                <h6 className="vendarH6Info">Event Name:</h6>
                <span className="vendarSpanInfo">{item?.event_name}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Location:</h6>
                <span className="vendarSpanInfo">{item?.event_location}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Amount:</h6>
                <span className="vendarSpanInfo">{item?.amount}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Date:</h6>
                <span className="vendarSpanInfo">{item?.event_date}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Mob Number:</h6>
                <span className="vendarSpanInfo">{item?.phone_number}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Type:</h6>
                <span className="vendarSpanInfo">{item?.type_of_event}</span>
              </div>
              <div
                className="mx-3"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <AppEventJoinButton item={item} />
              </div>
              {currentUser?.data?.user_type === "customer" && (
                <div
                  className="d-grid gap-2 mx-3"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <CButton
                    onClick={() => payNowClick(item)}
                    color={
                      item?.joined_customers
                        ?.map((ite) => ite?.customer_id)
                        .includes(currentUser?.data?._id)
                        ? "warning"
                        : "primary"
                    }
                    disabled={["Request To Join", "Approved"].includes(
                      item?.joined_customers?.filter(
                        (item) => item?.customer_id === currentUser?.data?._id
                      )?.[0]?.event_status || "Pending"
                    )}
                  >
                    {EventStatuses(
                      item?.joined_customers?.filter(
                        (item) => item?.customer_id === currentUser?.data?._id
                      )?.[0]?.event_status || "Pending For Payment"
                    ) || "Pay Now"}
                  </CButton>
                </div>
              )}
            </CCard>
          </CCol>
        ))}
      </CRow>

      {+tableMeta?.pageCount > 1 && (
        <div className={"mt-2"}>
          <CSmartPagination
            align="start"
            activePage={currentPage}
            pages={tableMeta?.pageCount}
            onActivePageChange={(i) => {
              setActivePage(i);
              updateFilter({ page: i });
            }}
          />
        </div>
      )}
      {showPaymentModel === true ? (
        <CustomerPayment
          visiblePaymentModel={showPaymentModel}
          setVisiblePaymentModel={setShowPaymentModel}
          eventDetail={eventDetail}
          approvedEventStatus={approvedEventStatus}
          eventStatus={"Pending For Payment"}
        />
      ) : (
        false
      )}
    </>
  );
};

export default GridView;
