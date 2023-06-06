import React from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import "./style.scss";
import { useAppState } from "src/context/AppContext";
import AppEventUserDetail from "src/components/AppEventUserDetail";
import ProductDetail from "./ProductDetail";
const VendorRequestEventJoin = () => {
  const { currentUser } = useAppState();

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Vendor Join Event</strong>
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
