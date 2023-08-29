import { useEffect, useState } from "react";
import TableRows from "../TableRow";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import { CButton, CCallout } from "@coreui/react";
import { EventStatuses } from "src/utils/constants";
import { approvedCustomerJoinEvent } from "src/context/EventContext/service";
import CustomerPayment from "src/components/CustomerPayment";
import { useNavigate } from "react-router-dom";
const Ticket = ({ data, eventDetail }) => {
  const navigate = useNavigate();
  console.log("Ticket Data --------", data);
  console.log("Event Detail Data --------", eventDetail);
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();
  const [showPaymentModel, setShowPaymentModel] = useState(false);
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
  const [rowsData, setRowsData] = useState([]);
  const [attendShow, setAttendShow] = useState(true)
  const addTableRows = () => {
    const rowsInput = {
      account_id: currentUser?.data?._id,
      event_id: eventDetail?._id,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      disable: false,
    };
    const diff = eventDetail?.no_of_tickets - eventDetail?.no_of_tickets_sold;
    if (rowsData?.length < diff) {
      setRowsData([...rowsData, rowsInput]);
      return;
    }
    app_dispatch({
      type: "SHOW_RESPONSE",
      toast: AppToast({
        message: "You Can Add More Attendess",
        color: "danger-alert",
      }),
    });
    return false;
  };

  useEffect(() => {
    if (currentUser && currentUser?.data) {
      setRowsData([
        {
          account_id: currentUser?.data?._id,
          event_id: eventDetail?._id,
          first_name: currentUser?.data?.first_name,
          last_name: currentUser?.data?.last_name,
          email: currentUser?.data?.email,
          phone_number: currentUser?.data?.phone_number,
          disable: true,
        },
        ...rowsData,
      ]);
    }
  }, [currentUser]);

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  const payNowClick = (row) => {
    console.log("Pay Now clicked for row:", row.amount);
    setShowPaymentModel(true);
  };

  const approvedEventStatus = async (data) => {
    if (rowsData?.filter((item) => !item.first_name)?.length > 0) {
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({
          message: "Please Add First Name",
          color: "danger-alert",
        }),
      });
      return false;
    }
    if (rowsData?.filter((item) => !item.email)?.length > 0) {
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({
          message: "Please Add Email",
          color: "danger-alert",
        }),
      });
      return false;
    }
    data = {
      ...data,
      attendess: JSON.stringify(rowsData),
      no_of_tickets_sold: +eventDetail?.no_of_tickets_sold + rowsData?.length,
    };
    try {
      const response = await approvedCustomerJoinEvent(
        data?.event_id,
        data?.account_id,
        data
      );
      if (response?.data?.data) {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: response?.data?.message,
            color: "success-alert",
          }),
        });
        navigate("/event-list");
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
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Phone No</th>
                <th>
                  <button
                    className="btn btn-outline-success"
                    onClick={addTableRows}
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
            </tbody>
          </table>
        </div>
        <div className="col-sm-12">
          <div
            className="d-grid gap-2 mx-3"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            {eventDetail?.event_end_date >= formattedDate ? (
              <CButton
                onClick={() => payNowClick(eventDetail)}
                color={
                  eventDetail?.joined_customers
                    ?.map((ite) => ite?.customer_id)
                    .includes(currentUser?.data?._id)
                    ? "warning"
                    : "primary"
                }
                disabled={["Request To Join", "Approved"].includes(
                  eventDetail?.joined_customers?.filter(
                    (eventDetail) =>
                      eventDetail?.customer_id === currentUser?.data?._id
                  )?.[0]?.event_status || "Pending"
                )}
              >
                {EventStatuses(
                  eventDetail?.joined_customers?.filter(
                    (eventDetail) =>
                      eventDetail?.customer_id === currentUser?.data?._id
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
        </div>
      </div>
      {showPaymentModel === true ? (
        <CustomerPayment
        visiblePaymentModel={showPaymentModel}
        setVisiblePaymentModel={setShowPaymentModel}
        eventDetail={eventDetail}
        approvedEventStatus={approvedEventStatus}
        eventStatus={"Pending For Payment"}
        setAttendShow={attendShow}
        />
      ) : (
        false
      )}
    </div>
  );
};
export default Ticket;
