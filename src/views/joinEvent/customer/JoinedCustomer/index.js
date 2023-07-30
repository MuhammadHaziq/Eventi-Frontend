import { CButton, CSpinner } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "src/context/AppContext";
import { updateCustomerStatus } from "src/context/EventContext/service";
const { CSmartTable } = require("@coreui/react-pro");

const JoinedCustomers = ({ joinedCustomers = [] }) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const { currentUser } = useAppState();
  const { event_id } = useParams();

  const columns = [
    {
      key: "first_name",
    },
    {
      key: "last_name",
    },
    { key: "email" },
    { key: "phone_number" },

    {
      key: "Action",
      label: "Action",
      filter: false,
      isShow: currentUser?.data?.user_type === "admin",
      disabled: false,
      _style: { minWidth: "200px" },
    },
  ];

  useEffect(() => {
    if (joinedCustomers && joinedCustomers?.length > 0) {
      setCustomers(
        joinedCustomers?.map((item) => {
          return { ...item.customer_id, ...item };
        })
      );
    }
  }, [joinedCustomers]);

  const getNextStatusForEvent = (status) => {
    const eventStatus = {
      "": "Request To Approved",
      "Request To Approved": "Request To Payment",
      "Request To Payment": "Approved",
    };
    return eventStatus[status] || "Request To Approved";
  };

  const updateEvent = (customer_id, status) => {
    setIsLoading(true);
    setCurrentCustomer(customer_id);
    updateCustomerStatus(event_id, customer_id, {
      status: status || "Request To Approved",
    })
      .then((response) => {
        if (response.data.data) {
          setCustomers(
            customers?.map((item) => {
              if (item?.user_detail?.account_id === customer_id) {
                return { ...item, event_status: status };
              }
              return item;
            })
          );
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
        setCurrentCustomer(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setCurrentCustomer(null);
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({ message: err.message, color: "danger-alert" }),
        });
      });
  };

  return (
    <CSmartTable
      activePage={3}
      columns={columns}
      columnFilter
      columnSorter
      items={customers}
      itemsPerPage={5}
      pagination
      scopedColumns={{
        Action: (item) => (
          <td>
            {currentUser?.data?.user_type === "admin" && (
              <CButton
                className="join-event-customer"
                color={"primary"}
                onClick={() => {
                  updateEvent(
                    item?.user_detail?.account_id,
                    getNextStatusForEvent(item?.event_status)
                  );
                }}
                disabled={
                  isLoading ||
                  ["Request To Payment", "Approved"].includes(
                    item?.event_status || "Pending"
                  )
                }
              >
                {isLoading &&
                currentCustomer === item?.user_detail?.account_id ? (
                  <CSpinner />
                ) : (
                  item?.event_status || "Join Event"
                )}
              </CButton>
            )}
          </td>
        ),
      }}
      tableProps={{
        striped: true,
        hover: true,
      }}
    />
  );
};
export default JoinedCustomers;
