import React, { useState, useCallback, useEffect } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import "./style.scss";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import AppEventUserDetail from "src/components/AppEventUserDetail";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";
import { AppToast } from "src/components/AppToast";
import { getJoinedVendor } from "src/context/EventContext/service";
import AppEventDetail from "src/components/AppEventDetail";
const VendorRequestEventJoin = () => {
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();
  const { event_id, account_id } = useParams();

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

  useEffect(() => {
    if (account_id) {
      getJoinedEventDetail(account_id);
    }
  }, [account_id]);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Vendor Join Event</strong>
            </CCardHeader>
            <CCardBody>
              {/* <CCol md={6}>
                <AppEventUserDetail
                  user={
                    {
                      ...currentUser?.data?.user_detail,
                      user_type: currentUser?.data?.user_type,
                    } || null
                  }
                />
              </CCol> */}
              <AppEventDetail event_detail={eventDetail} />
              <ProductDetail
                joined_event_id={joined_event_id}
                eventProducts={selectedProducts}
                showLoading={isLoading}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default VendorRequestEventJoin;
