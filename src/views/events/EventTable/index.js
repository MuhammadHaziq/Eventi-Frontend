import React, { useState, useEffect } from "react";
import {
  CSmartTable,
  CSmartPagination,
  CButton,
  CBadge,
  CRow,
  CCol,
} from "@coreui/react-pro";
import AppDeleteButton from "src/components/AppDeleteButton";
import AppEditButton from "src/components/AppEditButton";
import useDebounce from "src/hooks/useDebounce";
import { dateFormat, dateFormatted } from "src/utils/dateFormat";
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
import ReactSelect from "src/components/Inputs/ReactSelect";

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
  const [status, setState] = useState("");

  const { app_dispatch } = useAppDispatch();
  console.log(dateFormatted());

  const eventExpiry = events?.map((itm) => {
    return itm?.event_end_date >= dateFormatted() ? (
      <span className="mr-5">
        <CBadge color="danger">Event Expiry</CBadge>
      </span>
    ) : (
      ""
    );
  });

  const navigate = useNavigate();

  const tableFilterDebounce = useDebounce(tableFilters, 300);
  const { currentUser, permissions } = useAppState();
  useEffect(() => {
    if (tableFilterDebounce && Object.keys(tableFilterDebounce)?.length > 0) {
      const tableFilter = JSON.stringify(tableFilters);
      updateFilter({ tableFilters: tableFilter });
    }
  }, [tableFilterDebounce]);
  useEffect(() => {
    updateFilter({ status: status });
  }, [status]);

  let columns = [
    {
      key: "event_name",
      label: " Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "event_location",
      label: " Location",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "event_start_date",
      label: " Start Date",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "event_end_date",
      label: " End Date",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "Amount",
      label: " Amount",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "type_of_event",
      label: " Type",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "phone_number",
      label: "Mob No",
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
      label: "Description",
      filter: true,
      isShow: true,
      disabled: false,
    },
  ];


  
  if (
    currentUser?.data?.user_type === "admin" &&
    currentUser?.data?.user_type !== "customer"
  ) {
    columns = [
      ...columns,
      {
        key: "Event_Status",
        label: "Status",
        filter: true,
        isShow: true,
        disabled: false,
      },
    ];
  }
  columns = [
    ...columns,
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setState(value);
  };

  return (
    <>
      <CRow>
        <CCol md={4}>
          <ReactSelect
            id="validationSelectStatus"
            floatinglabel="Select Status"
            options={[
              {
                label: "Pending for Payment",
                value: "Pending For Payment",
              },
              {
                label: "Approved",
                value: "Approved",
              },
              {
                label: "Request to join",
                value: "Request To Join",
              },
            ]}
            isRequired={true}
            handleChange={handleOnChange}
            placeholder="Select Status"
            value={status}
            label="Select Status"
          />
        </CCol>
      </CRow>
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
          Amount: (item) => <td>{item.amount + " " + "NGN"}</td>,
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
