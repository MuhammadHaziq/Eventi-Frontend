import React, { useState, useCallback, useEffect } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import "./style.scss";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import AppEventUserDetail from "src/components/AppEventUserDetail";
import ProductDetail from "./ProductDetail";
import { useNavigate, useParams } from "react-router-dom";
import { AppToast } from "src/components/AppToast";
import { getEvent, getJoinedVendor } from "src/context/EventContext/service";
import AppEventDetail from "src/components/AppEventDetail";
const VendorRequestEventJoin = () => {
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { event_id, account_id } = useParams();

  const [vendorEventStatus, setVendorEventStatus] = useState("");
  const [joined_event_id, setJoinedEventId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [eventDetail, setEventDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getJoinedEventDetail = useCallback(() => {
    try {
      setIsLoading(true);
      getJoinedVendor(account_id, event_id)
        .then((response) => {
          if (response.data.data) {
            setJoinedEventId(response?.data?.data?._id);
            setEventDetail(response.data.data?.event_detail || null);
            setSelectedProducts(
              response.data.data?.products?.map((item) => {
                return {
                  product_id: item?.product_id,
                  product_name: item?.product_name,
                  product_description: item?.product_description,
                  product_quantity: item?.product_quantity || 1,
                  product_rate: item?.product_price || 1,
                  product_amount: item?.product_amount,
                };
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
            setEventDetail(null);
            setSelectedProducts([]);
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
          setEventDetail(null);
          setSelectedProducts([]);
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
  }, [account_id]);

  const getEventDetail = useCallback(() => {
    try {
      setIsLoading(true);
      getEvent(event_id)
        .then((response) => {
          if (response.data.data) {
            setEventDetail(response.data.data || null);
            setVendorEventStatus(
              response.data.data.joined_vendors?.filter(
                (item) => item?.vendor_id?._id === account_id
              )?.[0]?.event_status || ""
            );
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "success-alert",
              }),
            });
          } else {
            setEventDetail(null);
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
          setEventDetail(null);
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
  }, [event_id]);

  useEffect(() => {
    if (account_id) {
      getJoinedEventDetail(account_id);
    }
  }, [account_id]);

  useEffect(() => {
    if (event_id) {
      getEventDetail(event_id);
    }
  }, [event_id]);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Vendor Join Event</strong>
              <span onClick={() => navigate(-1)} className="back-header-button">
                {" "}
                Back
              </span>
            </CCardHeader>
            <CCardBody>
              <CCol md={12}>
                <AppEventUserDetail />
              </CCol>
              {eventDetail && <AppEventDetail event_detail={eventDetail} />}
              <ProductDetail
                joined_event_id={joined_event_id}
                eventProducts={selectedProducts}
                vendorEventStatus={vendorEventStatus}
                setVendorEventStatus={setVendorEventStatus}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default VendorRequestEventJoin;
