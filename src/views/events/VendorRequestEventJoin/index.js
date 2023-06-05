import React, { useCallback, useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CFormTextarea,
  CFormCheck,
  CInputGroup,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSettings, cilInfo, cilLibraryAdd } from "@coreui/icons";
import CreatableSelect from "react-select/creatable";
import "./style.scss";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import { getEvent, updateEvent } from "src/context/EventContext/service";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { useNavigate, useParams } from "react-router-dom";
import AppEventUserDetail from "src/components/AppEventUserDetail";
import { getVendor } from "src/context/VendorContext/service";
import ReactSelect from "src/components/Inputs/ReactSelect";
import ProductDetail from "./ProductDetail";
const VendorRequestEventJoin = () => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorDetail, setVendorDetail] = useState(null);
  const [agree, setAgree] = useState(false);
  const app_dispatch = useAppDispatch();
  const [state, setState] = useState({
    event_name: "",
    event_date: null,
    event_location: "",
    vendor_id: "",
    type_of_event: "",
    expected_attendence: "",
    phone_number: "",
    equipments: "",
    security: "",
    special_request: "",
  });
  const navigate = useNavigate();
  const { event_id } = useParams();
  const { currentUser } = useAppState();

  // const getEventById = useCallback(() => {
  //   try {
  //     setIsLoading(true);
  //     getEvent(event_id)
  //       .then((response) => {
  //         if (response.data.data) {
  //           setState({
  //             event_name: response.data.data.event_name,
  //             event_date: response.data.data.event_date,
  //             event_location: response.data.data.event_location,
  //             vendor_id: response.data.data.vendor_id,
  //             type_of_event: response.data.data.type_of_event,
  //             expected_attendence: response.data.data.expected_attendence,
  //             phone_number: response.data.data.phone_number,
  //             equipments: response.data.data.equipments,
  //             security: response.data.data.security === true ? "Yes" : "No",
  //             special_request: response.data.data.special_request,
  //           });
  //           app_dispatch({
  //             type: "SHOW_RESPONSE",
  //             toast: AppToast({
  //               message: response.data.message,
  //               color: "success-alert",
  //             }),
  //           });
  //         } else {
  //           app_dispatch({
  //             type: "SHOW_RESPONSE",
  //             toast: AppToast({
  //               message: response.data.message,
  //               color: "danger-alert",
  //             }),
  //           });
  //         }
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         app_dispatch({
  //           type: "SHOW_RESPONSE",
  //           toast: AppToast({ message: err.message, color: "danger-alert" }),
  //         });
  //       });
  //   } catch (err) {
  //     setIsLoading(false);
  //     app_dispatch({
  //       type: "SHOW_RESPONSE",
  //       toast: AppToast({ message: err.message, color: "danger-alert" }),
  //     });
  //   }
  // }, [event_id]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      try {
        updateEvent({
          ...state,
          event_id: event_id,
          security: ["Yes", "yes"].includes(state.security) ? true : false,
        })
          .then((response) => {
            if (response.data.statusCode === 200) {
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
          })
          .catch((err) => {
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: err.response.data.message,
                color: "danger-alert",
              }),
            });
          });
      } catch (err) {
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
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Vendor Request Join Event</strong>
            </CCardHeader>
            <CCardBody>
              <CCol md={6}>
                <AppEventUserDetail
                  user={
                    {
                      ...currentUser?.data?.user_detail,
                      user_type: currentUser?.data?.user_type,
                    } || null
                  }
                />
              </CCol>
              <br></br>
              <ProductDetail />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default VendorRequestEventJoin;
