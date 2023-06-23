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
import { useNavigate } from "react-router-dom";
import { useAppState } from "src/context/AppContext";
import AppEventJoinButton from "src/components/AppEventJoinButton";
const GridView = ({ data, tableMeta, updateFilter }) => {
  const { currentUser } = useAppState();
  const [currentPage, setActivePage] = useState(tableMeta?.page || 1);
  const navigate = useNavigate();
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
              <div>
                <h5 className="vendarH6Info">Event Name:</h5>
                <span className="vendarSpanInfo">{item?.event_name}</span>
              </div>
              <div>
                <h5 className="vendarH6Info">Event Location:</h5>
                <span className="vendarSpanInfo">{item?.event_location}</span>
              </div>
              <div>
                <h5 className="vendarH6Info">Event Date:</h5>
                <span className="vendarSpanInfo">{item?.event_date}</span>
              </div>
              <div>
                <h5 className="vendarH6Info">Event Type:</h5>
                <span className="vendarSpanInfo">{item?.type_of_event}</span>
              </div>
              <div className="mx-3" style={{ marginTop: "210px" }}>
                <AppEventJoinButton item={item} />
              </div>
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
