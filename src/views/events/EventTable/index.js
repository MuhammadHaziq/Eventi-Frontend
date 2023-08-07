import React, { useState, useEffect } from "react";
import { CSmartTable, CSmartPagination, CButton } from "@coreui/react-pro";
import AppDeleteButton from "src/components/AppDeleteButton";
import AppEditButton from "src/components/AppEditButton";
import useDebounce from "src/hooks/useDebounce";
import { dateFormat } from "src/utils/dateFormat";
import {
  approvedCustomerJoinEvent,
  deleteEvent,
} from "src/context/EventContext/service";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import AppEventJoinButton from "src/components/AppEventJoinButton";
import AppEventStatus from "src/components/AppEventStatus";
import CustomerPayment from "src/components/CustomerPayment";
import { useNavigate } from "react-router-dom";
import JoinedCustomers from "./../../joinEvent/customer/JoinedCustomer/index";
import { EventStatuses, UserRequestEventStatuses } from "src/utils/constants";
import { AppToast } from "src/components/AppToast";

const EventTable = ({
  isLoading,
  events,
  tableMeta,
  updateFilter,
  clickOnEdit,
  clickHideModal,
  filters,
  setFilters,
}) => {
  const [fields, setFields] = useState([]);
  const [currentPage, setActivePage] = useState(tableMeta?.page || 1);
  const [tableFilters, setTableFilter] = useState(null);
  const [showPaymentModel, setShowPaymentModel] = useState(false);
  const [eventDetail, setEventDetail] = useState(null);
  const [eventStatus, setEventStatus] = useState("Pending For Payment");
  const { app_dispatch } = useAppDispatch();
  console.log(events);
  console.log(tableMeta);
  console.log(clickOnEdit);
  const navigate = useNavigate();

  const tableFilterDebounce = useDebounce(tableFilters, 300);
  const { currentUser, permissions } = useAppState();
  console.log("hi------------", currentUser?.data.user_detail);
  useEffect(() => {
    if (tableFilterDebounce && Object.keys(tableFilterDebounce)?.length > 0) {
      const tableFilter = JSON.stringify(tableFilters);
      updateFilter({ tableFilters: tableFilter });
    }
  }, [tableFilterDebounce]);

  let columns = [
    {
      key: "event_name",
      label: "Event Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "event_location",
      label: "Event Location",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "Event_date",
      label: "Event Date",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "amount",
      label: "Event Amount",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "type_of_event",
      label: "Type Of Event",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "phone_number",
      label: "Mob Number",
      filter: true,
      isShow: true,
      disabled: false,
    },

    {
      key: "expected_attendence",
      label: "Expected Attendance",
      filter: true,
      isShow: true,
      disabled: false,
    },

    {
      key: "security",
      label: "Security",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "special_request",
      label: "Special Request",
      filter: true,
      isShow: true,
      disabled: false,
    },
  ];
  if (
    currentUser?.data?.user_type !== "admin" &&
    currentUser?.data?.user_type !== "customer"
  ) {
    columns = [
      ...columns,
      {
        key: "Event_Status",
        label: "Event Status",
        filter: true,
        isShow: true,
        disabled: false,
      },
    ];
  }
  columns = [
    ...columns,
    {
      key: "Created_At",
      label: "Created Date",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "Action",
      label: "Action",
      filter: false,
      isShow: true,
      disabled: false,
    },
  ];
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
      <CSmartTable
        columns={columns}
        loading={isLoading}
        items={events}
        fields={fields}
        itemsPerPage={tableMeta?.take}
        itemsPerPageSelect
        sorter={"true"}
        hover={"true"}
        outlined={"true"}
        tableProps={{
          hover: true,
          responsive: true,
        }}
        columnFilter={{
          external: true,
        }}
        columnSorter={{
          external: true,
        }}
        onColumnFilterChange={(e) => {
          Object.keys(e)?.length > 0 && setTableFilter(e);
        }}
        onSorterChange={(sorter) => {
          updateFilter({ sort: JSON.stringify(sorter) });
        }}
        scopedColumns={{
          Action: (item) => (
            <td>
              <div className="d-flex gap-2" eventDetailData>
                {currentUser?.data?.user_type === "customer" && (
                  <CButton
                    onClick={() => payNowClick(item)}
                    color={
                      item?.joined_customers
                        ?.map((ite) => ite?.customer_id)
                        .includes(currentUser?.data?._id)
                        ? "warning"
                        : "primary"
                    }
                    disabled={
                      isLoading ||
                      ["Request To Join", "Approved"].includes(
                        item?.joined_customers?.filter(
                          (item) => item?.customer_id === currentUser?.data?._id
                        )?.[0]?.event_status || "Pending"
                      )
                    }
                  >
                    {EventStatuses(
                      item?.joined_customers?.filter(
                        (item) => item?.customer_id === currentUser?.data?._id
                      )?.[0]?.event_status || "Pending For Payment"
                    ) || "Pay Now"}
                  </CButton>
                )}
                {permissions?.find(
                  (item) => item.permission === "event-edit"
                ) && <AppEditButton onClick={clickOnEdit} edit_id={item._id} />}
                {permissions?.find(
                  (item) => item.permission === "event-join"
                ) && <AppEventJoinButton item={item} icon={true} />}
                {permissions?.find(
                  (item) => item.permission === "event-delete"
                ) && (
                  <AppDeleteButton
                    title="Delete Event"
                    message="Do you really want to delete this event?"
                    delete_id={item._id}
                    apiUrl={deleteEvent}
                    clickOnDelete={clickHideModal}
                  />
                )}
              </div>
            </td>
          ),
          Event_Status: (item) => {
            return <AppEventStatus item={item} />;
          },
          Event_date: (item) => <td>{dateFormat(item.event_date)}</td>,
          Created_At: (item) => <td>{dateFormat(item.createdAt)}</td>,
        }}
      />
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
export default EventTable;
