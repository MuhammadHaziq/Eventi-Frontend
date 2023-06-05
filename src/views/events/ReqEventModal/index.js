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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSettings,cilInfo,cilLibraryAdd } from "@coreui/icons";
import CreatableSelect from 'react-select/creatable';
import "./style.scss";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import { getEvent, updateEvent } from "src/context/EventContext/service";
import { PhoneNumberInput } from "src/components/Inputs/PhoneInput";
import { useNavigate } from "react-router-dom";
const EventModal = ({ reqModelID, visible, setVisible }) => {
  console.log(reqModelID);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const getEventById = useCallback(() => {
    try {
      setIsLoading(true);
      getEvent(reqModelID)
        .then((response) => {
          if (response.data.data) {
            setState({
              event_name: response.data.data.event_name,
              event_date: response.data.data.event_date,
              event_location: response.data.data.event_location,
              vendor_id: response.data.data.vendor_id,
              type_of_event: response.data.data.type_of_event,
              expected_attendence: response.data.data.expected_attendence,
              phone_number: response.data.data.phone_number,
              equipments: response.data.data.equipments,
              security: response.data.data.security === true ? "Yes" : "No",
              special_request: response.data.data.special_request,
            });
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
    } catch (err) {
      setIsLoading(false);
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({ message: err.message, color: "danger-alert" }),
      });
    }
  }, [reqModelID]);

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
          reqModelID: reqModelID,
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
              setVisible();
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

  useEffect(() => {
    if (reqModelID) {
      // getEventById();
    }
  }, [reqModelID]);

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
                <CCard>
                  <CCardHeader className="d-flex justify-content-between">
                    <strong>Vendor Information</strong>
                  </CCardHeader>
                  <div>
                    <h6 className="vendarH6Info">Name:</h6><span className="vendarSpanInfo">Haseeb</span>
                  </div>
                  <div>
                    <h6 className="vendarH6Info">Business Name:</h6><span className="vendarSpanInfo">POS food</span>
                  </div>
                  <div>
                    <h6 className="vendarH6Info">Email:</h6><span className="vendarSpanInfo">vhaseeb@gmail.com</span>
                  </div>
                  <div>
                    <h6 className="vendarH6Info">Phone:</h6><span className="vendarSpanInfo">+92 312 4299849</span>
                  </div>
                  <div>
                    <h6 className="vendarH6Info">Status:</h6><span className="vendarSpanInfo">Vendar</span>
                  </div>
                </CCard>
              </CCol>
              <br></br>
              <CCard className="mb-4 p-2">
              <CForm
              className="row g-2 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
            </CForm>
            <br></br>
            <CCol md={4}>
            <CreatableSelect style={{display: "inline"}} isClearable /><CButton  color="info" shape="rounded-0">Add Product</CButton>
            </CCol>
            <div class="table-responsive s_table">
            <table class="table invoice-items-table items table-main-invoice-edit has-calculations no-mtop">
                <thead>
                    <tr>
                        <th></th>
                        <th width="30%" align="left">Item</th>
                        <th width="25%" align="left">Description</th>
                        <th width="15%" align="right" class="qty">Qty</th>
                        <th width="15%" align="right">Rate</th>
                        <th width="10%" align="right">Amount</th>
                        <th align="center"> <CIcon icon={cilSettings} /></th>
                    </tr> 
                </thead>
                <tbody class="ui-sortable">
                    <tr class="main">
                        <td></td>
                        <td>
                            <textarea name="description" class="form-control" rows="4" placeholder="Description"></textarea>
                        </td>
                        <td>
                            <textarea name="long_description" rows="4" class="form-control" placeholder="Long description"></textarea>
                        </td>
                                                <td>
                                                <CFormInput
                                                type="number"
                                                id="qty"
                                                placeholder=""
                                                text="Unit"
                                               
                                              />
                                            </td>
                        <td>
                        <CFormInput
                        type="number"
                        id="rate"
                        placeholder=""
                         
                         placeholder='Rate'
                      />
                        </td>
                       
                        <td>0.00</td>
                        <td>
                     <button type="button" onclick="add_item_to_table('undefined','undefined',undefined); return false;" class="btn pull-right btn-primary"> <CIcon icon={cilLibraryAdd}/> </button>
                        </td>
                    </tr>
                                    </tbody>
            </table>
   
            
            </div>
              </CCard>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default EventModal;