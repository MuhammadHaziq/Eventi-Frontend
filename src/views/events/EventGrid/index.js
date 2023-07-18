import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CButton,
  CCardGroup,
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
      <CRow className="event-grid-section">
        {(data || [])?.map((item, index) => (
          <CCol md={4} key={index}>
            <CCard className="mb-4">
              <CCardBody
                style={{
                  width: "100%",
                  height: "280px",
                }}
              >
                <AppSwiperthumbs
                  images={item?.banner_images}
                  accountId={item?._id}
                />
              </CCardBody>
              <hr></hr>
              <div>
                <h6 className="vendarH6Info">Event Name:</h6>
                <span className="vendarSpanInfo">{item?.event_name}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Location:</h6>
                <span className="vendarSpanInfo">{item?.event_location}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Amount:</h6>
                <span className="vendarSpanInfo">{item?.amount}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Date:</h6>
                <span className="vendarSpanInfo">{item?.event_date}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Mob Number:</h6>
                <span className="vendarSpanInfo">{item?.phone_number}</span>
              </div>
              <div>
                <h6 className="vendarH6Info">Event Type:</h6>
                <span className="vendarSpanInfo">{item?.type_of_event}</span>
              </div>
              <div
                className="mx-3"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <AppEventJoinButton item={item} />
              </div>
            </CCard>
          </CCol>
        ))}
      </CRow>

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
