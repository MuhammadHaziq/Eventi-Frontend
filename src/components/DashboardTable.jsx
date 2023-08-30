import React, { useState, useEffect,useRef } from "react";
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
import QrCode from "qrcode.react";

const DashboardTable = () => {
  const { currentUser } = useAppState();
  const [fields, setFields] = useState([]);
   const [tableFilters, setTableFilter] = useState(null);
   const [downloaded, setDownloaded] = useState(false);
  const [filters, setFilters] = useState();
  const app_dispatch = useAppDispatch();

  const tableFilterDebounce = useDebounce(tableFilters, 300);
const httpRgx = /^https?:\/\//;
const qrRef = useRef();

  const account_id = currentUser?.data?.user_detail?.account_id;
  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["CustomersPayment"],
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
      retryOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  //   const useGetData = (filterDatas) => {
  //     setFilters({ ...filters, ...filterDatas });
  //   };

  const eventNames = data?.data?.data?.map(
    (event) => event.event_id.event_name
  );
  console.log(eventNames);

  const [columns] = useState([
    {
      key: "QR",
      label: "Event QR",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "eventName",
      label: "Joined Events",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "amount",
      label: "No of Tickets",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "amount",
      label: "Amount",
      filter: false,
      isShow: true,
      disabled: false,
    },

    {
      key: "QRDownload",
      label: "QR Download",
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

  const downloadQrCode = (e) => {
    e.preventDefault();

    const qrCanvas = qrRef.current.querySelector("canvas"),
      qrImage = qrCanvas.toDataURL("image/png"),
      qrAnchor = document.createElement("a"),
      fileName = account_id.replace(httpRgx, "").trim();
    qrAnchor.href = qrImage;
    qrAnchor.download = fileName + "_QrCode.png";
    document.body.appendChild(qrAnchor);
    qrAnchor.click();
    document.body.removeChild(qrAnchor);
    setDownloaded(true);
  };

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard className="mb-2">
            <CCardHeader className="d-flex justify-content-between">
              <strong>
                <h5>Join Event List</h5>
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

                  QR: (item) => (
                    <span className="event-card-text vendarSpanInfo">
                      <QrCode
                        size={50}
                        value={
                          item?._id
                            ? JSON.stringify([
                                { event_id: item?._id },
                                { account_id: currentUser?.data?._id },
                              ])
                            : "No Data Found"
                        }
                        level="H"
                        includeMargin
                      />
                    </span>
                  ),
                  QRDownload: (item) => (
                    <div>
                      <CButton onClick={downloadQrCode}>Download</CButton>
                    </div>
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
      </CRow>
    </>
  );
};

export default DashboardTable;
