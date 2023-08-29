import { useEffect, useState } from "react";
import TableRows from "../TableRow";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import { CButton, CCallout } from "@coreui/react";
import { UserRequestEventStatuses } from "src/utils/constants";
import { approvedCustomerJoinEvent } from "src/context/EventContext/service";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { getAttendes } from "src/context/AppContext/service";
const Ticket = ({ data, eventDetail }) => {
  const navigate = useNavigate();
  console.log("Ticket Data --------", data);
  console.log("Event Detail Data --------", eventDetail);
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();
  /** Card States */
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [allAttendes, setAllAttendes] = useState([]);
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

  const getAllAttendess = async () => {
    try {
      const response = await getAttendes();
      setAllAttendes(response?.data?.data || []);
    } catch (e) {
      console.log(e.message);
    }
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
      setEmail(currentUser?.data?.email || "");
      setPhone(currentUser?.data?.phone_number || "");
      setName(
        (currentUser?.data?.first_name || "") +
          " " +
          (currentUser?.data?.last_name || "")
      );
    }
    getAllAttendess();
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

  const approvedEventStatus = async (data) => {
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

  const getPoints = () => {
    return (
      (eventDetail?.points_percent / 100) *
      (eventDetail?.amount * (rowsData?.length || 1))
    ).toFixed(2);
  };
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const componentProps = {
    email,
    amount: eventDetail?.amount * (rowsData?.length || 1) * 100,
    currency: "ZAR",
    metadata: {
      name,
      phone,
    },
    publicKey,
    className: `${
      eventDetail?.joined_customers
        ?.map((ite) => ite?.customer_id)
        .includes(currentUser?.data?._id)
        ? "btn btn-warning"
        : "btn btn-primary"
    }`,
    text: `Pay Now ${eventDetail?.amount * (rowsData?.length || 1)}`,
    // ref: (props.type == "customer" ? "c_" : "v_") + props.ref,
    onSuccess: ({ reference }) => {
      const data = {
        account_id: currentUser?.data?._id,
        event_id: eventDetail?._id,
        payment_id: reference,
        payment_method: paymentMethod,
        points_available: getPoints(),
        amount: eventDetail?.amount * (rowsData?.length || 1),
        currency: "ZAR",
        status: UserRequestEventStatuses(eventStatus),
      };
      approvedEventStatus(data);
      // payNowPaystack(data);
      // resetForm();
    },
    onClose: () => console.log("Wait! don't go!!!!"),
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
              rowsData?.filter((item) => !item.first_name)?.length > 0 ? (
                <CButton
                  color={
                    eventDetail?.joined_customers
                      ?.map((ite) => ite?.customer_id)
                      .includes(currentUser?.data?._id)
                      ? "warning"
                      : "primary"
                  }
                  onClick={() =>
                    app_dispatch({
                      type: "SHOW_RESPONSE",
                      toast: AppToast({
                        message: "Please Add First Name",
                        color: "danger-alert",
                      }),
                    })
                  }
                >{`Pay Now ${
                  eventDetail?.amount * (rowsData?.length || 1)
                }`}</CButton>
              ) : rowsData?.filter((item) => !item.phone_number)?.length > 0 ? (
                <CButton
                  color={
                    eventDetail?.joined_customers
                      ?.map((ite) => ite?.customer_id)
                      .includes(currentUser?.data?._id)
                      ? "warning"
                      : "primary"
                  }
                  onClick={() =>
                    app_dispatch({
                      type: "SHOW_RESPONSE",
                      toast: AppToast({
                        message: "Please Add Phone Number",
                        color: "danger-alert",
                      }),
                    })
                  }
                >{`Pay Now ${
                  eventDetail?.amount * (rowsData?.length || 1)
                }`}</CButton>
              ) : (
                <PaystackButton {...componentProps} />
              )
            ) : (
              // <CButton
              //   onClick={() => payNowClick(eventDetail)}
              //   color={
              //     eventDetail?.joined_customers
              //       ?.map((ite) => ite?.customer_id)
              //       .includes(currentUser?.data?._id)
              //       ? "warning"
              //       : "primary"
              //   }
              //   disabled={["Request To Join", "Approved"].includes(
              //     eventDetail?.joined_customers?.filter(
              //       (eventDetail) =>
              //         eventDetail?.customer_id === currentUser?.data?._id
              //     )?.[0]?.event_status || "Pending"
              //   )}
              // >
              //   {EventStatuses(
              //     eventDetail?.joined_customers?.filter(
              //       (eventDetail) =>
              //         eventDetail?.customer_id === currentUser?.data?._id
              //     )?.[0]?.event_status || "Pending For Payment"
              //   ) || "Pay Now"}
              // </CButton>
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
    </div>
  );
};
export default Ticket;
