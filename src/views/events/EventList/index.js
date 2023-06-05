import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormSwitch,
} from "@coreui/react";
import EventModal from "../EventModal";
import ReqEventModal from "../ReqEventModal";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import EventTable from "../EventTable";
import { getEvents } from "src/context/EventContext/service";
import { useNavigate } from "react-router-dom";
import AppProgress from "src/components/AppProgress";
import GridView from "../EventGrid";
const EventList = () => {
  const app_dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectProduct, setSelectedProduct] = useState("");
  const [gridView, setGridView] = useState(false);
  const [reqModelID, setreqModelID] = useState("");
  const [filters, setFilters] = useState();
  const { permissions } = useAppState();
  const navigate = useNavigate();

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["Events", filters],
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

  const clickOnReqForm = (id, req_data) => {
    navigate("/reqEventJoin")
    // console.log("req_id----", req_data);
    // setreqModelID(req_data);
    // setVisible(true);
  };

  const clickHideModal = () => {
    setSelectedProduct("");
    setVisible(false);
    setFilters({ ...filters, update: !filters?.update });
  };
  return (
    <>
      {isError ? "" : <AppProgress loading={isFetching} />}
      {permissions.find((item) => item.permission === "event-add") && (
        <>
          <CButton onClick={() => navigate("/event-registration")}>
            Add Event
          </CButton>
          <br></br>
          <br></br>
        </>
      )}
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Event List ({data?.data?.data?.meta?.itemCount})</strong>
              <span>
                <CFormSwitch
                  label="Grid View"
                  id="gridView"
                  checked={gridView}
                  onChange={() => setGridView(!gridView)}
                />
              </span>
            </CCardHeader>
            <CCardBody>
              {gridView ? (
                <GridView
                  data={data?.data?.data?.data || []}
                  isLoading={isLoading}
                  tableMeta={data?.data?.data?.meta || null}
                  updateFilter={useGetData}
                  clickOnEdit={clickOnEdit}
                  clickOnReqForm={clickOnReqForm}
                  clickHideModal={clickHideModal}
                />
              ) : (
                <EventTable
                  events={data?.data?.data?.data || []}
                  isLoading={isLoading}
                  tableMeta={data?.data?.data?.meta || null}
                  updateFilter={useGetData}
                  clickOnEdit={clickOnEdit}
                  clickOnReqForm={clickOnReqForm}
                  clickHideModal={clickHideModal}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <>
          {visible && (
            <EventModal
              setVisible={clickHideModal}
              visible={visible}
              eventId={selectProduct}
            />
          )}

          {reqModelID === "reqIDForm" && (
            <ReqEventModal
              setVisible={clickHideModal}
              visible={visible}
              reqModelID={reqModelID}
            />
          )}
        </>
      )}
    </>
  );
};
export default EventList;
