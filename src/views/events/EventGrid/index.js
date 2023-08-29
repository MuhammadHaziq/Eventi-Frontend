import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CBadge,
  CCallout,
} from "@coreui/react";
import QrCode from "qrcode.react";
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
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  console.log(formattedDate);
  const navigate = useNavigate();
  console.log("event data", data);

  const payNowClick = (row) => {
    console.log("Pay Now clicked for row:", row.amount);
    // setEventDetail(row);
    // setShowPaymentModel(true);
    navigate(`/ticket/${row?._id}`);
  };

  const approvedEventStatus = async (data) => {
    try {
      const response = await approvedCustomerJoinEvent(
        data?.event_id,
        data?.account_id,
        data
      );
      if (response?.data?.data) {
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
            message: response?.data?.message,
            color: "success-alert",
          }),
        });
      } else {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: response?.data?.message,
            color: "danger-alert",
          }),
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <CRow className="event-grid-section">
        {(data || [])?.map((item, index) => (
          <CCol md={4} key={index}>
            <CCard className="mb-4 event-card">
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
                <h6 className="event-card-header vendarH6Info">Event Name:</h6>
                <span className="event-card-text vendarSpanInfo">
                  {item?.event_name}
                </span>
              </div>
              <div className='divStyle'>
                <h6 className="event-card-header vendarH6Info">
                  Event Location:
                </h6>
                <span className="event-card-text vendarSpanInfo">
                  {item?.event_location}
                </span> 
              </div>
              <div>
                <h6 className="event-card-header vendarH6Info">
                  Event Amount:
                </h6>
                <span className="event-card-text vendarSpanInfo">
                  {item?.amount}
                </span>
              </div>
              <div>
                <h6 className="event-card-header vendarH6Info">
                  Event Start Date:
                </h6>
                <span className="event-card-text vendarSpanInfo">
                  {item?.event_start_date}
                </span>
              </div>
              <div>
                <h6 className="event-card-header vendarH6Info">
                  Event End Date:
                </h6>
                <span className="event-card-text vendarSpanInfo">
                  {item?.event_end_date >= formattedDate ? (
                    item?.event_end_date
                  ) : (
                    <span className="mr-5">
                      <CBadge color="danger">Event Expiry</CBadge>
                    </span>
                  )}
                </span>
              </div>
              <div className="qr-event">
                <h6 className="event-card-header vendarH6Info">Event QR:</h6>
                <span className="event-card-text vendarSpanInfo">
                  <QrCode
                    size={80}
                    value={
                      item?._id
                        ? {
                            event_id: item?._id,
                            account_id: currentUser?.data?._id,
                          }
                        : "No Data Found"
                    }
                    level="H"
                    includeMargin
                  />
                </span>
              </div>
              {/*  <div>
                <h6 className="vendarH6Info">Mob Number:</h6>
                <span className="vendarSpanInfo">{item?.phone_number}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Type:</h6>
                <span className="vendarSpanInfo">{item?.type_of_event}</span>
              </div> */}
              <div className="event-card-join-button">
                <AppEventJoinButton item={item} />
              </div>
              {currentUser?.data?.user_type === "customer" && (
                <div
                  className="d-grid gap-2 mx-3"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  {item?.event_end_date >= formattedDate ? (
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
                  ) : (
                    <CCallout
                      style={{ marginTop: "-10px", marginBottom: "-10px" }}
                      color="danger"
                    >
                      We are currently unable to offer this event
                    </CCallout>
                  )}
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
