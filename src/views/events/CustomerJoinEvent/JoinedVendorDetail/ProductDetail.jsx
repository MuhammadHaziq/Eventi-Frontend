import React, { useEffect, useState } from "react";
import {
  CCol,
  CRow,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CSpinner,
  CImage,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle } from "@coreui/icons";
import { useParams } from "react-router-dom";
import { updateVendorStatus } from "src/context/EventContext/service";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";

const ProductDetail = ({
  joined_event_id,
  eventProducts,
  vendorEventStatus,
  setVendorEventStatus,
  productImages,
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { event_id, account_id } = useParams();
  const app_dispatch = useAppDispatch();
  useEffect(() => {
    if (joined_event_id) {
      setSelectedProducts(eventProducts);
    }
  }, [joined_event_id]);

  const getNextStatusForEvent = (status) => {
    const eventStatus = {
      "": "Request To Approved",
      "Request To Approved": "Request To Payment",
      "Request To Payment": "Approved",
    };
    return eventStatus[status] || "Request To Approved";
  };

  const updateEvent = () => {
    const data = {
      event_id: event_id,
      vendor_id: account_id,
      status: getNextStatusForEvent(vendorEventStatus) || "Request To Payment",
    };
    updateVendorStatus(data)
      .then((response) => {
        if (response?.data?.data?.modifiedCount) {
          setVendorEventStatus(getNextStatusForEvent(vendorEventStatus));
        }
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: response?.data?.message,
            color: "success-alert",
          }),
        });
      })
      .catch((err) => {
        app_dispatch({
          type: "SHOW_RESPONSE",
          toast: AppToast({
            message: err?.response?.data?.message || err?.message,
            color: "danger-alert",
          }),
        });
      });
  };

  const getFirstImage = (productId, imageObject) => {
    return imageObject?.filter((ite) => ite?._id === productId)?.[0]
      ?.product_images?.[0];
  };

  return (
    <>
      <CCard className="mb-4 p-2">
        <CCardHeader>
          <strong>Products Detail</strong>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Item</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(selectedProducts || [])?.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        {productImages?.filter(
                          (ite) => ite?._id === item?.product_id
                        )?.[0]?.product_images?.length > 0 ? (
                          <CImage
                            src={`${
                              process.env.REACT_APP_API_ENDPOINT
                            }/media/productImage/${
                              item?.product_id
                            }/${getFirstImage(
                              item?.product_id,
                              productImages
                            )}`}
                            width={"50px"}
                            height={"50px"}
                          />
                        ) : (
                          <CImage
                            src={`./images/no_image_found.png`}
                            width={"50px"}
                            height={"50px"}
                          />
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          name="product_name"
                          className="form-control"
                          rows="4"
                          placeholder="Item"
                          value={item?.product_name}
                          readOnly
                        ></CFormInput>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormTextarea
                          name="product_description"
                          className="form-control"
                          rows="4"
                          placeholder="Description"
                          value={item?.product_description}
                          readOnly
                        ></CFormTextarea>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          id="qty"
                          text="Unit"
                          name="product_quantity"
                          value={item?.product_quantity}
                          readOnly
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          id="rate"
                          text="Rate"
                          name="product_rate"
                          value={item?.product_rate}
                          readOnly
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput
                          type="number"
                          id="amount"
                          text="Amount"
                          name="product_amount"
                          value={item?.product_amount}
                          readOnly
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol md={4}></CCol>
            <CCol md={8}>
              <CRow>
                <CCol md={9}></CCol>
                <CCol md={3}>
                  <div>
                    <h6 className="vendarH6Info">Total:</h6>
                    <span className="vendarSpanTotal">
                      {(selectedProducts || [])
                        ?.map((item) => {
                          return item.product_amount;
                        })
                        ?.reduce(
                          (preValue, nextValue) =>
                            (+preValue || 0) + (+nextValue || 0),
                          0
                        )}
                    </span>
                  </div>
                </CCol>
              </CRow>
              <hr />
            </CCol>
          </CRow>

          <CCol className="mt-4">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                color="success"
                shape="rounded-0"
                className="mt-2 text-white"
                onClick={updateEvent}
                disabled={
                  selectedProducts?.length === 0 ||
                  isLoading ||
                  ["Request To Payment", "Approved"]?.includes(
                    vendorEventStatus
                  )
                }
                style={{ float: "right" }}
              >
                <CIcon icon={cilCheckCircle} />
                {isLoading ? <CSpinner /> : " " + vendorEventStatus}
              </CButton>
            </div>
          </CCol>
        </CCardBody>
      </CCard>
    </>
  );
};

export default ProductDetail;
