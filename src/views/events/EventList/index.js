import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import EventModal from "../EventModal";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import EventTable from "../EventTable";
import { getEvents } from "src/context/EventContext/service";
import { useNavigate } from "react-router-dom";
const EventList = () => {
  const app_dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectProduct, setSelectedProduct] = useState("");
  const [filters, setFilters] = useState();
  const navigate = useNavigate();

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["Porudcts", filters],
    () => getEvents(filters),
    {
      onError: (error) => {
        app_dispatch({
          type: "SHOW_MESSAGE",
          toast: AppToast({
            message: error.response.data.message,
            color: "dangar-alert",
          }),
        });
      },
      keepPreviousData: false,
      staleTime: 5000,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const useGetData = (filterDatas) => {
    console.log(filterDatas);
    setFilters({ ...filters, ...filterDatas });
  };

  const clickOnEdit = (id) => {
    setSelectedProduct(id);
    setVisible(true);
  };

  const clickHideModal = () => {
    setSelectedProduct("");
    setVisible(false);
  };
  console.log(data, "DATA");
  return (
    <>
      {/* {isError ? "" : <Progress loading={isFetching} />} */}
      <CButton onClick={() => navigate("/event-registration")}>
        Add Event
      </CButton>
      <br></br>
      <br></br>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Event List ({data?.data?.data?.meta?.itemCount})</strong>
            </CCardHeader>
            <CCardBody>
              <EventTable
                events={data?.data?.data?.data || []}
                isLoading={isLoading}
                tableMeta={data?.data?.data?.meta || null}
                updateFilter={useGetData}
                clickOnEdit={clickOnEdit}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <EventModal
          setVisible={clickHideModal}
          visible={visible}
          eventId={selectProduct}
        />
      )}
    </>
  );
};
export default EventList;
