import React, { useState, useCallback, useEffect } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import ProductDetail from "./productDetail";
import { useParams } from "react-router-dom";
import { AppToast } from "src/components/AppToast";
import { getEvent, getJoinedVendor } from "src/context/EventContext/service";
import AppEventDetail from "src/components/AppEventDetail";
import "./style.scss";

const VendorEventJoin = () => {
  const { currentUser } = useAppState();
  const app_dispatch = useAppDispatch();
  const { event_id, account_id } = useParams();
  const [vendorEventStatus, setVendorEventStatus] = useState("");
  const [joined_event_id, setJoinedEventId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [eventDetail, setEventDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [reload, setReload] = useState(false);
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
            setProductImages(response.data.data?.product_images);

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
            setProductImages([]);

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
          setProductImages([]);

          setIsLoading(false);
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({ message: err.message, color: "danger-alert" }),
          });
        });
    } catch (err) {
      setIsLoading(false);
      setProductImages([]);

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
                (item) => item?.vendor_id?._id === currentUser?.data?._id
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

  useEffect(() => {
    if (reload && event_id) {
      setReload(false);
      getEventDetail(event_id);
    }
  }, [reload]);

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Vendor Join Evente</strong>
            </CCardHeader>
            <CCardBody>
              {eventDetail && <AppEventDetail event_detail={eventDetail} userData={currentUser} />}

              {eventDetail?.event_end_date >= formattedDate ? (
                <ProductDetail
                  isAdmin={false}
                  setReload={setReload}
                  joined_event_id={joined_event_id}
                  eventProducts={selectedProducts}
                  showLoading={isLoading}
                  vendorEventStatus={vendorEventStatus}
                  setVendorEventStatus={setVendorEventStatus}
                  eventDetail={eventDetail}
                  productImages={productImages}
                  setProductImages={setProductImages}
                />
              ) : (
                ""
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default VendorEventJoin;
