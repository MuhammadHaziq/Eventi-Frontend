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
} from "@coreui/react";

const ProductDetail = ({ joined_event_id, eventProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (joined_event_id) {
      setSelectedProducts(eventProducts);
    }
  }, [joined_event_id]);

  return (
    <>
      <CCard className="mb-4 p-2">
        <CCardHeader>Products Detail</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CTable>
                <CTableHead>
                  <CTableRow>
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
        </CCardBody>
      </CCard>
    </>
  );
};

export default ProductDetail;
