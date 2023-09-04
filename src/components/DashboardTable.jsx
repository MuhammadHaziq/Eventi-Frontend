import React, { useState, useEffect, useRef } from "react";
import { CSmartTable, CSmartPagination } from "@coreui/react-pro";
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import useDebounce from "src/hooks/useDebounce";
import { customerPaymentHistory } from "src/context/CustomerContext/service";
import { AppToast } from "src/components/AppToast";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import QrCode from "qrcode.react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilQrCode } from "@coreui/icons";

const DashboardTable = () => {
  const { currentUser } = useAppState();
  const [fields, setFields] = useState([]);
  const [tableFilters, setTableFilter] = useState(null);
  const [downloaded, setDownloaded] = useState(false);
  const [filters, setFilters] = useState();
  const [visible, setVisible] = useState(false);

  const app_dispatch = useAppDispatch();

  const tableFilterDebounce = useDebounce(tableFilters, 300);
  const httpRgx = /^https?:\/\//;
  const qrRef = useRef(null);

  const account_id = currentUser?.data?.user_detail?.account_id;
  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["customer_dashboard_payment", account_id],
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
      label: "Joined Events Name",
      filter: true,
      isShow: true,
      disabled: false,
    },
    {
      key: "attendes",
      label: "No of Tickets",
      filter: false,
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

    {
      key: "QRDownload",
      label: "QR Download",
      filter: false,
      isShow: true,
      disabled: false,
    },
    {
      key: "View_Attendes",
      label: "Attendes",
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

  useEffect(() => {
    if (downloaded) {
      const msg = setTimeout(() => setDownloaded(false), 3500);
      return () => clearTimeout(msg);
    }
  }, [downloaded]);

  const downloadQrCode = (e, eventName) => {
    e.preventDefault();
    const qrCanvas = qrRef.current?.querySelector("#canvas"),
      qrImage = qrCanvas?.toDataURL("image/png"),
      qrAnchor = document.createElement("a"),
      fileName = eventName;
    // url.replace(httpRgx, "").trim();
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
          <CCard className="mb-1">
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
                // hover={"true"}
                outlined={"true"}
                tableProps={{
                  // hover: true,
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
                  Amount: (item) => (
                    <td>
                      <div className="d-flex gap-2">
                        {item.amount + " " + "NGN"}
                      </div>
                    </td>
                  ),
                  eventName: (item) => (
                    <td>
                      <div className="d-flex gap-2">
                        {item?.event_id?.event_name}
                      </div>
                    </td>
                  ),
                  attendes: (item) => <td>{item?.attendes?.length || 0}</td>,
                  QR: (item) => (
                    <td>
                      <CIcon
                        onClick={() => setVisible(!visible)}
                        icon={cilQrCode}
                        size="xxl"
                      />

                      <CModal
                        backdrop="static"
                        visible={visible}
                        onClose={() => setVisible(false)}
                      >
                        <CModalHeader>
                          <CModalTitle>QR Code</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <td>
                            <span
                              className="event-card-text vendarSpanInfo"
                              ref={qrRef}
                            >
                              <QrCode
                                size={250}
                                value={
                                  item?._id
                                    ? JSON.stringify([
                                        { event_id: item?._id },
                                        { account_id: currentUser?.data?._id },
                                      ])
                                    : "No Data Found"
                                }
                                // level="H"
                                includeMargin
                              />
                            </span>
                          </td>
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            color="secondary"
                            onClick={() => setVisible(false)}
                          >
                            Close
                          </CButton>
                        </CModalFooter>
                      </CModal>
                    </td>
                  ),
                  QRDownload: (item) => (
                    <td>
                      <div>
                        <CButton
                          onClick={(e) =>
                            downloadQrCode(e, item?.event_id?.event_name)
                          }
                        >
                          Download
                        </CButton>
                      </div>
                    </td>
                  ),
                  View_Attendes: (item) => (
                    <td>
                      <div>
                        <Link
                          to={`/attends/${currentUser?.data?._id}/${item?.event_id?._id}`}
                          target="_blank"
                        >
                          <CButton>Attendes</CButton>
                        </Link>
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
      </CRow>
    </>
  );
};

export default DashboardTable;
