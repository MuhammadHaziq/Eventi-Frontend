import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import { getAdmins } from "src/context/AdminContext/service";
import AdminTable from "../AdminTable";
import AppProgress from "src/components/AppProgress";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import AdminModal from "../AdminModal";
import { AppToast } from "src/components/AppToast";
export const AdminList = () => {
  const app_dispatch = useAppDispatch();
  const [selectCustomer, setSelectedCustomer] = useState("");
  const [filters, setFilters] = useState();
  const [visible, setVisible] = useState(false);
  const { permissions } = useAppState();

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["Customers", filters],
    () => getAdmins(filters),
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
    setFilters({ ...filters, ...filterDatas });
  };

  const clickOnEdit = (id) => {
    setSelectedCustomer(id);
    setVisible(true);
  };

  const clickHideModal = () => {
    setSelectedCustomer("");
    setVisible(false);
    setFilters({ ...filters, update: !filters?.update });
  };

  return (
    <>
      {isError ? "" : <AppProgress loading={isFetching} />}
      {permissions.find((item) => item.permission === "admin-add") && (
        <>
          <CButton
            size="sm"
            color="primary"
            variant="outline"
            onClick={() => setVisible(!visible)}
          >
            Add Admin
          </CButton>
          <br></br>
          <br></br>
        </>
      )}
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>
                Total number of Admin List ({data?.data?.data?.meta?.itemCount})
              </strong>
            </CCardHeader>
            <CCardBody>
              <AdminTable
                customers={data?.data?.data?.data || []}
                isLoading={isLoading}
                tableMeta={data?.data?.data?.meta || null}
                updateFilter={useGetData}
                clickOnEdit={clickOnEdit}
                clickHideModal={clickHideModal}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <AdminModal
          setVisible={clickHideModal}
          visible={visible}
          customer_id={selectCustomer}
        />
      )}
    </>
  );
};
