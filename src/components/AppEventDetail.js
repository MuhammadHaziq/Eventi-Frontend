import React from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CBadge,
  CCarousel,
  CCarouselItem,
  CImage,
  CContainer,
  CFormInput,
} from "@coreui/react";
import { dateFormatted } from "../utils/dateFormat";

const AppEventDetail = ({ event_detail }) => {
  return (
    <CCard className="mb-4 p-2">
      <CCardHeader>
        <strong>Event Detail </strong>
        {event_detail?.event_end_date >= dateFormatted() ? (
         ""
        ) : (
          <span className="mr-5">
            <CBadge color="danger">Event Expiry</CBadge>
          </span>
        )}
      </CCardHeader>
      <CCardBody>
        <CContainer className="overflow-hidden mt-4">
          <CRow>
            <CCol md={7}>
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
                    id="type_of_event"
                    name="type_of_event"
                    value={event_detail?.type_of_event}
                    label="Event Type"
                    readOnly
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={4}>
                  <CFormInput
                    type="text"
                    id="event_start_date"
                    name="event_start_date"
                    value={event_detail?.event_start_date}
                    label="Event Start Date"
                    readOnly
                  />
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    type="text"
                    id="event_end_date"
                    name="event_end_date"
                    value={event_detail?.event_end_date}
                    label="Event End Date"
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
              </CRow>
              <CRow className="mt-2 mb-2">
                <CCol md={8}>
                  <CFormInput
                    type="text"
                    id="special_request"
                    name="special_request"
                    value={event_detail?.special_request}
                    label="Description"
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
            </CCol>

            <CCol md={5}>
              <CCarousel
                controls={(event_detail?.banner_images || [])?.length > 0}
                transition="crossfade"
              >
                {(event_detail?.banner_images || [])?.length > 0 ? (
                  (event_detail?.banner_images || []).map((item, index) => (
                    <CCarouselItem key={index}>
                      <CImage
                        className="event-image-carousel w-100 h-100"
                        src={`${process.env.REACT_APP_API_ENDPOINT}/media/eventImage/${event_detail?._id}/${item}`}
                        alt="slide 1"
                      />
                    </CCarouselItem>
                  ))
                ) : (
                  <CCarouselItem>
                    <CImage
                      className="event-image-carousel w-100 h-100"
                      src="./images/no_image_found.png"
                      alt="slide 1"
                    />
                  </CCarouselItem>
                )}
              </CCarousel>
            </CCol>
          </CRow>
        </CContainer>
      </CCardBody>
    </CCard>
  );
};

export default AppEventDetail;
