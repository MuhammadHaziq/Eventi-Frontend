import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CButton,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import { CSmartPagination } from "@coreui/react-pro";
import AppSwiperthumbs from "src/components/AppSwiperthumbs";
import "./style.scss";

const GridView = ({
  isLoading,
  data,
  tableMeta,
  updateFilter,
  clickOnEdit,
  clickOnReqForm,
  clickHideModal,
}) => {
  const [currentPage, setActivePage] = useState(tableMeta?.page || 1);
  return (
    <>
      {(data || [])?.map((item, index) => (
        <CContainer className="event-grid-section" key={index}>
          <CRow>
            <CCol sm={4}>
              <CCard className="mb-2">
                <CCardBody
                  style={{
                    width: "100%",
                    height: "350px",
                  }}
                >
                  <AppSwiperthumbs
                    images={item?.banner_images}
                    accountId={item?.created_by}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm={8}>
              <div className="d-flex flex-column">
                <h4>{item?.event_name}</h4>
                <h6>
                  <u>Event Detail :</u>
                </h6>
                <p>{item.special_request}</p>
              </div>
              <CButton href="#">Request to join Event</CButton>
            </CCol>
          </CRow>
        </CContainer>
      ))}

      {+tableMeta?.pageCount > 1 && (
        <div className={"mt-2"}>
          <CSmartPagination
            align="start"
            activePage={currentPage}
            pages={tableMeta?.pageCount}
            onActivePageChange={(i) => {
              setActivePage(i);
              updateFilter({ page: i });
            }}
          />
        </div>
      )}
    </>
  );
};

export default GridView;
