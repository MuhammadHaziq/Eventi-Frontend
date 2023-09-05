import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import { getCustomers } from "src/context/CustomerContext/service";
import CustomerTable from "../CustomerTable";
import AppProgress from "src/components/AppProgress";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import CustomerModal from "../CustomerModal";
import Points from "../CustomerModal/points";
import { AppToast } from "src/components/AppToast";

export const CustomerList = () => {
  const app_dispatch = useAppDispatch();
  const [selectCustomer, setSelectedCustomer] = useState("");
  const [filters, setFilters] = useState();
  const [visible, setVisible] = useState(false);
  const [pointsVisible, setPointsVisible] = useState(false);
  const { permissions } = useAppState();

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["Customers", filters],
    () => getCustomers(filters),
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
      retryOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const useGetData = (filterDatas) => {
    setFilters({ ...filters, ...filterDatas });
  };

  const clickOnEdit = (id) => {
    setSelectedCustomer(id);
    setPointsVisible(true);
  };
  const clickOnUpdatePoints = (id) => {
    setSelectedCustomer(id);
    setVisible(true);
  };

  const clickHideModal = () => {
    setSelectedCustomer("");
    setVisible(false);
    setPointsVisible(false);
    setFilters({ ...filters, update: !filters?.update });
  };

  return (
    <>
      {isError ? "" : <AppProgress loading={isFetching} />}
      {permissions.find((item) => item.permission === "customer-add") && (
        <>
          <CButton
            size="sm"
            color="primary"
            variant="outline"
            onClick={() => setVisible(!visible)}
          >
            Add Customer
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
                Total number of Customer List (
                {data?.data?.data?.meta?.itemCount})
              </strong>
            </CCardHeader>
            <CCardBody>
              <CustomerTable
                customers={data?.data?.data?.data || []}
                isLoading={isLoading}
                tableMeta={data?.data?.data?.meta || null}
                updateFilter={useGetData}
                clickOnEdit={clickOnEdit}
                clickOnUpdatePoints={clickOnUpdatePoints}
                clickHideModal={clickHideModal}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {visible && (
        <CustomerModal
          setVisible={clickHideModal}
          visible={visible}
          customer_id={selectCustomer}
        />
      )}
      {pointsVisible && (
        <Points
          setVisible={clickHideModal}
          visible={pointsVisible}
          customer_id={selectCustomer}
        />
      )}
    </>
  );
};
