import React, { useState, useEffect } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { AppToast } from "src/components/AppToast";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "src/context/AppContext";
import { getAccountAttendes } from "src/context/AppContext/service";
import { useParams } from "react-router-dom";

const Attendes = () => {
  const { account_id, event_id } = useParams();
  const [fields, setFields] = useState([]);
  const app_dispatch = useAppDispatch();

  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["account_attendes"],
    () => getAccountAttendes(account_id, event_id),
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
      retryOnMount: false,
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
      key: "first_name",
      label: "First Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "last_name",
      label: "Last Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "email",
      label: "Email",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "phone_number",
      label: "Phone Number",
      filter: true,
      isShow: true,
      disabled: false,
    },
  ]);

  useEffect(() => {
    if (columns.length > 0) {
      setFields(columns.filter((itm) => itm.isShow));
    }
  }, [columns]);

  return (
    <>
      <CRow>
        <CCol md={8}>
          <CCard className="mb-2">
            <CCardHeader className="d-flex justify-content-between">
              <strong>
                <h5>Attendes</h5>
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
                  external: false,
                }}
                columnSorter={{
                  external: false,
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={2}></CCol>;
      </CRow>
    </>
  );
};

export default Attendes;
