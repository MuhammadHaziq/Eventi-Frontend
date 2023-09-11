import React, { useState, useEffect } from "react";
import { CSmartTable, CSmartPagination } from "@coreui/react-pro";
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CButton,
} from "@coreui/react";
import useDebounce from "src/hooks/useDebounce";
import { customerPaymentHistory } from "src/context/CustomerContext/service";
import { AppToast } from "src/components/AppToast";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppState } from "src/context/AppContext";

const CustomerPayment = () => {
  const { currentUser } = useAppState();
  const [fields, setFields] = useState([]);
  const [tableFilters, setTableFilter] = useState(null);
  const [filters, setFilters] = useState();
  const app_dispatch = useAppDispatch();

  const tableFilterDebounce = useDebounce(tableFilters, 300);

  const account_id = currentUser?.data?.user_detail?.account_id;
  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["customers_payment", account_id],
    () => customerPaymentHistory(account_id),
    {
      onError: (error) => {
        app_dispatch({
          type: "SHOW_MESSAGE",
          toast: AppToast({
            message: error.response?.data?.message,
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

  // const useGetData = (filterDatas) => {
  //   setFilters({ ...filters, ...filterDatas });
  // };

  const eventNames = data?.data?.data?.map(
    (event) => event.event_id.event_name
  );
  console.log(eventNames);

  const [columns] = useState([
    {
      key: "eventName",
      label: "Event Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "Amount",
      label: "Amount",
      filter: false,
      isShow: true,
      disabled: false,
    },
  ]);

  useEffect(() => {
    if (columns.length > 0) {
      setFields(columns.filter((itm) => itm.isShow));
    }
  }, [columns]);

  useEffect(() => {
    if (tableFilterDebounce && Object.keys(tableFilterDebounce)?.length > 0) {
      const tableFilter = JSON.stringify(tableFilters);
      updateFilter({ tableFilters: tableFilter });
    }
  }, [tableFilterDebounce]);

  return (
    <>
      <CRow>
        <CCol md={2}></CCol>
        <CCol md={8}>
          <CCard className="mb-2">
            <CCardHeader className="d-flex justify-content-between">
              <strong>
                <h5>Payment History</h5>
              </strong>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                columns={columns}
                loading={false}
                items={data?.data?.data}
                fields={fields}
                itemsPerPage={data?.data?.data?.take}
                itemsPerPageSelect
                sorter={"true"}
                hover={"true"}
                outlined={"true"}
                tableProps={{
                  hover: true,
                  responsive: true,
                }}
                columnFilter={{
                  external: true,
                }}
                columnSorter={{
                  external: true,
                }}
                onColumnFilterChange={(e) => {
                  Object.keys(e)?.length > 0 && setTableFilter(e);
                }}
                onSorterChange={(sorter) => {
                  updateFilter({ sort: JSON.stringify(sorter) });
                }}
                scopedColumns={{
                  eventName: (item) => (
                    <td>
                      <div className="d-flex gap-2">
                        {item?.event_id?.event_name}
                      </div>
                    </td>
                  ),
                  Amount: (item) => (
                    <td>
                      <div className="d-flex gap-2">
                        {item.amount + " " + "NGN"}
                      </div>
                    </td>
                  ),
                }}
              />
              {/*   {+tableMeta?.pageCount > 1 && (
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
      )} */}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={2}></CCol>;
      </CRow>
    </>
  );
};

export default CustomerPayment;
