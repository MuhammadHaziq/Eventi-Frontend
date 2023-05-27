import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import { getVendors } from "src/context/VendorContext/service";
import { useAppDispatch } from "src/context/AppContext";
import AppProgress from "src/components/AppProgress";
import VendorTable from "../../VendorTable";
import VendorModal from "../../VendorModal";
import { useQuery } from "@tanstack/react-query";
import { AppToast } from "src/components/AppToast";
export const VendorList = () => {
  const app_dispatch = useAppDispatch();
  const [selectVendor, setSelectedVendor] = useState("");
  const [filters, setFilters] = useState();
  const [visible, setVisible] = useState(false);

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["Vendor", filters],
    () => getVendors(filters),
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
    setSelectedVendor(id);
    setVisible(true);
  };

  const clickHideModal = () => {
    setSelectedVendor("");
    setVisible(false);
    setFilters({ ...filters, update: !filters?.update });
  };

  return (
    <>
      {isError ? "" : <AppProgress loading={isFetching} />}
      <CButton onClick={() => setVisible(!visible)}>Add Vendor</CButton>
      <br></br>
      <br></br>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Vendor List</strong>
            </CCardHeader>
            <CCardBody>
              <VendorTable
                vendors={data?.data?.data?.data || []}
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
        <VendorModal
          setVisible={clickHideModal}
          visible={visible}
          vendor_id={selectVendor}
        />
      )}
    </>
  );
};
