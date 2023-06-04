import React from "react";
import {
  CCard,
  CCardBody,
  CButton,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import AppSwiperthumbs from "src/components/AppSwiperthumbs";
import "./style.scss";

const GridView = () => {
  return (
    <>
      <CContainer className="event-grid-section">
        <CRow>
          <CCol sm={4}>
            <CCard className="mb-2">
              <CCardBody
                style={{
                  width: "100%",
                  height: "350px",
                }}
              >
                <AppSwiperthumbs />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm={8}>
            <div className="d-flex flex-column">
              <h4>Party Event text here</h4>
              <h6>
                <u>Event Detail :</u>
              </h6>
              <p>
                The delivery timelines will be clearly indicated for each
                product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product. The delivery timelines will be clearly indicated for
                each product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product. The delivery timelines will be clearly indicated for
                each product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product. The delivery timelines will be clearly indicated for
                each product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product.
              </p>
            </div>
            <CButton href="#">Request to join Event</CButton>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer className="event-grid-section">
        <CRow>
          <CCol sm={4}>
            <CCard className="mb-2">
              <CCardBody
                style={{
                  width: "100%",
                  height: "350px",
                }}
              >
                <AppSwiperthumbs />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol csm={8}>
            <div className="d-flex flex-column">
              <h4>Party Event text here</h4>
              <h6>
                <u>Event Detail :</u>
              </h6>
              <p>
                The delivery timelines will be clearly indicated for each
                product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product. The delivery timelines will be clearly indicated for
                each product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product. The delivery timelines will be clearly indicated for
                each product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product. The delivery timelines will be clearly indicated for
                each product on the main product detail page and again on the
                checkout page. It depends on your city and your selected
                product.
              </p>
            </div>
            <CButton href="#">Request to join Event</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default GridView;
