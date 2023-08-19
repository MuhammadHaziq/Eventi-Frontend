import React, { useEffect, useState } from "react";
import {
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import ReactSelect from "../../../components/Inputs/ReactSelect";
import {
  allEventCustomers,
  updateCustomerPoints,
} from "src/context/CustomerContext/service";

const Points = ({ visible, setVisible }) => {
  const app_dispatch = useAppDispatch();

  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [events, setEvents] = useState([]);
  const [state, setState] = useState({
    points_exist: 0,
    points_available: 0,
    amount: null,
    selectedEvent: "",
    event: {},
    selectedCustomer: "",
    customer: {},
  });

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;
      if (
        form.checkValidity() === false ||
        state.selectedEvent == "" ||
        state.selectedCustomer == ""
      ) {
        setShowError(true)
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        event.stopPropagation();
        setShowError(false)
        setIsLoading(true);
        try {
            const account = state.customer.customer_id.user_detail
          await updateCustomerPoints({
            eventId: state.selectedEvent,
            accountId: account.account_id,
            points_available: Number(getPoints()).toFixed(2),
          });
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: `Points updated successfully! New points are: ${Number(getPoints()).toFixed(2)}`,
              color: "success-alert",
            }),
          });
          setVisible(false)
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.log(err.message)
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({
              message: err.message,
              color: "danger-alert",
            }),
          });
        }
      }
      setValidated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  const handleOnChangeEvent = (e) => {
    const { value } = e.target;
    if (value) {
      const eventDetail = events.find((item) => item._id === value);
      setState({ ...state, selectedEvent: value, event: eventDetail });
    } else {
      setState({
        ...state,
        selectedEvent: "",
        event: {},
        selectedCustomer: "",
        customer: {},
        amount: null,
      });
    }
  };
  const handleOnChangeCustomer = (e) => {
    console.log(state.selectedEvent);
    const { value } = e.target;
    if (value) {
      const customerDetail = state.event?.joined_customers.find(
        (item) => item._id === value
      );
      console.log(customerDetail);
      setState({ ...state, selectedCustomer: value, customer: customerDetail });
    } else {
      setState({
        ...state,
        selectedCustomer: "",
        customer: {},
        amount: null,
      });
    }
  };
  const getAllCustomers = async () => {
    console.log("got it");
    const response = await allEventCustomers();
    if (response?.status) {
      setEvents(response?.data);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getPoints = () => {
    // points_percent
    if (state.amount && state.amount > 0 && state.selectedCustomer) {
      return (
        Number((state.event.points_percent / 100) * state.amount) +
        Number(state.customer?.points_available)
      ).toFixed(2);
    } else {
      return Number(state.customer?.points_available || 0);
    }
  };

  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={setVisible}>
        <CModalHeader>
          <CModalTitle>Update points</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-2 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={12}>
              <ReactSelect
                id="validationEvent"
                options={events.map((item) => {
                  return { value: item._id, label: item.event_name };
                })}
                isRequired={true}
                handleChange={handleOnChangeEvent}
                name="selectedEvent"
                placeholder="Select Event"
                value={state.selectedEvent}
                label="Select Event"
              />
              {state.selectedEvent == "" && showError ?
              <CFormFeedback style={{color: 'red'}}>
                Please select a Select Event
              </CFormFeedback>
              : ""}
            </CCol>

            {state.selectedEvent ? (
              <>
                <CCol md={12}>
                  <ReactSelect
                    id="validationCustomer"
                    options={state.event?.joined_customers?.map((item) => {
                      return {
                        value: item._id,
                        label: `${item.customer_id.first_name} ${item.customer_id.last_name} (${item.customer_id.email})`,
                      };
                    })}
                    isRequired={true}
                    handleChange={handleOnChangeCustomer}
                    name="selectedCustomer"
                    placeholder="Customer"
                    value={state.selectedCustomer}
                    label="Select Customer"
                  />
                  {state.selectedCustomer == "" && showError ?
                  <CFormFeedback style={{color: 'red'}}>
                    Please select a Customer
                  </CFormFeedback>
                  : ""}
                </CCol>

                <CCol md={12}>
                  <CFormInput
                    type="number"
                    id="validationAmount"
                    floatingclassname="mb-3"
                    floatinglabel="Amount"
                    placeholder="Amount"
                    disabled={state.selectedCustomer ? false : true}
                    name="amount"
                    label="Amount"
                    value={state.amount || ""}
                    onChange={handleOnChange}
                    required
                  />
                  <CFormFeedback invalid>Please enter Amount</CFormFeedback>
                </CCol>
                <h6>Available points: {getPoints()}</h6>
              </>
            ) : (
              ""
            )}
            <CCol className="mt-5 text-end" md={12}>
              <CButton color="success" variant="outline" type="submit">
                {isLoading ? <CSpinner /> : "Save"}
              </CButton>
              <CButton
                style={{ marginLeft: "10px" }}
                color="dark"
                variant="outline"
                onClick={setVisible}
                disabled={isLoading}
              >
                Close
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};
export default Points;
