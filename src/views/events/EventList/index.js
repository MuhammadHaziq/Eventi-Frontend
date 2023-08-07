import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
  CButton,
  CFormSwitch,
} from "@coreui/react";
import EventModal from "../EventModal";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { AppToast } from "src/components/AppToast";
import EventTable from "../EventTable";
import { getEvents } from "src/context/EventContext/service";
import { useNavigate } from "react-router-dom";
import AppProgress from "src/components/AppProgress";
import GridView from "../EventGrid";
import Select from "react-select";
const EventList = () => {
  const app_dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [selectProduct, setSelectedProduct] = useState("");
  const [gridView, setGridView] = useState(false);
  const [filters, setFilters] = useState({ reload: true });
  const { permissions } = useAppState();
  const [state, setState] = useState({
    notification: "",
  });
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
  const handleOnChange = (e) => {
    alert(e.target.value);
    // const { name, value } = e.target;
    // setState({ ...state, [name]: value });
  };

  const useGetData = (filterDatas) => {
    setFilters({ ...filters, ...filterDatas });
  };

  const clickOnEdit = (id) => {
    setSelectedProduct(id);
    setVisible(true);
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
          <CRow className="mb-2">
            <CCol>
              <CButton
                size="sm"
                color="primary"
                variant="outline"
                onClick={() => navigate("/event-registration")}
              >
                Add Event
              </CButton>
            </CCol>
          </CRow>
        </>
      )}
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>
                Total number of Event {gridView ? "Grid" : "List"} (
                {data?.data?.data?.meta?.itemCount})
              </strong>
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
              {/*  <CRow>
              <CCol md={4}>
                <Select
                  id="notification"
                  aria-label="Default select example"
                  isRequired={true}
                  handleChange={handleOnChange}
                  name="notification"
                  value={state.notification}
                  options={[
                    "All",
                    {
                      label: "Pending for payment",
                      value: "pending_Payment",
                    },
                    {
                      label: "Pending for Approval",
                      value: "pending_Approval",
                    },
                    { label: "Pending for join event ", value: "3" },
                  ]}
                />
              </CCol>
            </CRow> */}

              {gridView ? (
                <GridView
                  data={data?.data?.data?.data || []}
                  isLoading={isLoading}
                  tableMeta={data?.data?.data?.meta || null}
                  updateFilter={useGetData}
                  clickOnEdit={clickOnEdit}
                  clickHideModal={clickHideModal}
                  filters={filters}
                  setFilters={setFilters}
                />
              ) : (
                <EventTable
                  events={data?.data?.data?.data || []}
                  isLoading={isLoading}
                  tableMeta={data?.data?.data?.meta || null}
                  updateFilter={useGetData}
                  clickOnEdit={clickOnEdit}
                  clickHideModal={clickHideModal}
                  filters={filters}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <>
          {/* {visible && ( */}
          <EventModal
            setVisible={clickHideModal}
            visible={visible}
            eventId={selectProduct}
          />
          {/* )} */}
        </>
      )}
    </>
  );
};
export default EventList;
