import React from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CCarousel,
  CCarouselItem,
  CImage,
  CContainer,
  CFormInput,
} from "@coreui/react";

const AppEventDetail = ({ event_detail }) => {
  return (
    <CCard className="mb-4 p-2">
      <CCardHeader>Event Detail</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            <CCarousel
              controls={(event_detail?.banner_images || [])?.length > 0}
              transition="crossfade"
            >
              {(event_detail?.banner_images || [])?.length > 0 ? (
                (event_detail?.banner_images || []).map((item, index) => (
                  <CCarouselItem key={index}>
                    <CImage
                      className="event-image-carousel w-100"
                      src={`${process.env.REACT_APP_API_ENDPOINT}/media/eventImage/${event_detail?.created_by}/${item}`}
                      alt="slide 1"
                    />
                  </CCarouselItem>
                ))
              ) : (
                <CCarouselItem>
                  <CImage
                    className="event-image-carousel w-100"
                    src="./images/no_image_found.png"
                    alt="slide 1"
                  />
                </CCarouselItem>
              )}
            </CCarousel>
          </CCol>
        </CRow>
        <CContainer className="overflow-hidden mt-4">
          <CRow>
            <CCol md={4}>
              <CFormInput
                type="text"
                id="eventName"
                name="event_name"
                value={event_detail?.event_name}
                label="Event Name"
                readOnly
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                id="event_location"
                name="event_location"
                value={event_detail?.event_location}
                label="Event Location"
                readOnly
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                id="event_date"
                name="event_date"
                value={event_detail?.event_date}
                label="Event Date"
                readOnly
              />
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <CCol md={4}>
              <CFormInput
                type="text"
                id="type_of_event"
                name="type_of_event"
                value={event_detail?.type_of_event}
                label="Event Type"
                readOnly
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                id="joined_vendors"
                name="joined_vendors"
                value={event_detail?.joined_vendors?.length || 0}
                label="Joined Vendors"
                readOnly
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                id="joined_customers"
                name="joined_customers"
                value={event_detail?.joined_customers?.length || 0}
                label="Joined Customers"
                readOnly
              />
            </CCol>
          </CRow>
        </CContainer>
      </CCardBody>
    </CCard>
  );
};

export default AppEventDetail;
