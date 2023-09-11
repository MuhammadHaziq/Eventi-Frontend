import React, { useCallback, useEffect, useState } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cibTwitter,
  cilCloudDownload,
  cilUser,
  cilUserFemale,
} from "@coreui/icons";
import AppProgress from "src/components/AppProgress";
import {
  getCurrentUserDetail,
  summaryCustomerPoints,
} from "src/context/AppContext/service";
import DashboardTable from "src/components/DashboardTable";
import { AppToast } from "src/components/AppToast";
import { useAppDispatch, useAppState } from "src/context/AppContext";
import { customerPaymentHistory } from "src/context/CustomerContext/service";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { currentUser, permissions } = useAppState();
  const [getCurDate, setCurData] = useState(""),
    [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    usedPoints: 0,
    remainingPoints: 0,
    totalPoints: 0,
  });

  const app_dispatch = useAppDispatch();
  const account_id = currentUser?.data?._id;

  const { data, error, isFetching, isError } = useQuery(
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

  const eventId = data?.data?.data?.map((event) => event.event_id?._id)[0];

  const getAccountDetail = useCallback(() => {
    try {
      setIsLoading(true);
      getCurrentUserDetail(account_id);
      summaryCustomerPoints(eventId, account_id)
        .then((response) => {
          if (response.data.data) {
            const { user_detail } = response?.data?.data?.data || {};

            setCurData(user_detail);
            // app_dispatch({
            //   type: "SHOW_RESPONSE",
            //   toast: AppToast({
            //     message: response.data.message,
            //     color: "success-alert",
            //   }),
            // });
          } else {
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "danger-alert",
              }),
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({ message: err.message, color: "danger-alert" }),
          });
        });
    } catch (err) {
      setIsLoading(false);
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({ message: err.message, color: "danger-alert" }),
      });
    }
  }, [account_id]);

  const getSummaryPoints = useCallback(() => {
    try {
      setIsLoading(true);

      summaryCustomerPoints(eventId, account_id)
        .then((response) => {
          if (response.data.data) {
            setState({
              usedPoints: response.data.data.customer_consumed_point,
              remainingPoints: response.data.data.points_available,
              totalPoints: response.data.data.totalPoints,
            });
          } else {
            app_dispatch({
              type: "SHOW_RESPONSE",
              toast: AppToast({
                message: response.data.message,
                color: "danger-alert",
              }),
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          app_dispatch({
            type: "SHOW_RESPONSE",
            toast: AppToast({ message: err.message, color: "danger-alert" }),
          });
        });
    } catch (err) {
      setIsLoading(false);
      app_dispatch({
        type: "SHOW_RESPONSE",
        toast: AppToast({ message: err.message, color: "danger-alert" }),
      });
    }
  });

  useEffect(() => {
    if (account_id) {
      getAccountDetail();
      getSummaryPoints();
    }
  }, [account_id, getAccountDetail]);

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const progressExample = [
    { title: "Visits", value: "29.703 Users", percent: 40, color: "success" },
    { title: "Unique", value: "24.093 Users", percent: 20, color: "info" },
    {
      title: "Pageviews",
      value: "78.706 Views",
      percent: 60,
      color: "warning",
    },
    { title: "New Users", value: "22.123 Users", percent: 80, color: "danger" },
    {
      title: "Bounce Rate",
      value: "Average Rate",
      percent: 40.15,
      color: "primary",
    },
  ];

  const progressGroupExample1 = [
    { title: "Monday", value1: 34, value2: 78 },
    { title: "Tuesday", value1: 56, value2: 94 },
    { title: "Wednesday", value1: 12, value2: 67 },
    { title: "Thursday", value1: 43, value2: 91 },
    { title: "Friday", value1: 22, value2: 73 },
    { title: "Saturday", value1: 53, value2: 82 },
    { title: "Sunday", value1: 9, value2: 69 },
  ];

  const progressGroupExample2 = [
    { title: "Male", icon: cilUser, value: 53 },
    { title: "Female", icon: cilUserFemale, value: 43 },
  ];

  const progressGroupExample3 = [
    { title: "Organic Search", icon: cibGoogle, percent: 56, value: "191,235" },
    { title: "Facebook", icon: cibFacebook, percent: 15, value: "51,223" },
    { title: "Twitter", icon: cibTwitter, percent: 11, value: "37,564" },
    { title: "LinkedIn", icon: cibLinkedin, percent: 8, value: "27,319" },
  ];

  return (
    <>
      {!isLoading ? "" : <AppProgress loading={isLoading} />}
      <CCard>
        <CCardBody>
          <CCol xs>
            <CCard className="m-3">
              <CCardHeader>
                <h5 id="traffic" className="card-title mb-0">
                  Points Summary
                </h5>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol sm={4}>
                    <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                      <div className="text-medium-emphasis small">
                        Used Points
                      </div>
                      <div className="fs-5 fw-semibold">{state.usedPoints}</div>
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                      <div className="text-medium-emphasis small">
                        Remaining Points
                      </div>
                      <div className="fs-5 fw-semibold">{state.remainingPoints}</div>
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="border-start border-start-4 border-start-info py-1 px-3">
                      <div className="text-medium-emphasis small">
                        Total Points
                      </div>
                      <div className="fs-5 fw-semibold">{state.totalPoints}</div>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
          {/*  <WidgetsDropdown /> */}

          {currentUser?.data?.user_type === "customer" ? (
            <CCardBody>
              <CRow>
                {/*  <CCol sm={5}>
                {/* <h4 id="traffic" className="card-title mb-0">
                  Customer QR Code
                </h4>
                 <div className="small text-medium-emphasis">
                January - July 2021
              </div> 
              </CCol
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {["Day", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol> */}
              </CRow>
              <CRow>
                <CCol>
                  {/*  <QrCode getCurDate={getCurDate} /> */}
                  <DashboardTable />
                </CCol>
              </CRow>
            </CCardBody>
          ) : (
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Traffic
                  </h4>
                  <div className="small text-medium-emphasis">
                    January - July 2021
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                  <CButtonGroup className="float-end me-3">
                    {["Day", "Month", "Year"].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === "Month"}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>

                <CChartLine
                  style={{ height: "300px", marginTop: "40px" }}
                  data={{
                    labels: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                    ],
                    datasets: [
                      {
                        label: "My First dataset",
                        backgroundColor: hexToRgba(getStyle("--cui-info"), 10),
                        borderColor: getStyle("--cui-info"),
                        pointHoverBackgroundColor: getStyle("--cui-info"),
                        borderWidth: 2,
                        data: [
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                        ],
                        fill: true,
                      },
                      {
                        label: "My Second dataset",
                        backgroundColor: "transparent",
                        borderColor: getStyle("--cui-success"),
                        pointHoverBackgroundColor: getStyle("--cui-success"),
                        borderWidth: 2,
                        data: [
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                          random(50, 200),
                        ],
                      },
                      {
                        label: "My Third dataset",
                        backgroundColor: "transparent",
                        borderColor: getStyle("--cui-danger"),
                        pointHoverBackgroundColor: getStyle("--cui-danger"),
                        borderWidth: 1,
                        borderDash: [8, 5],
                        data: [65, 65, 65, 65, 65, 65, 65],
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                      y: {
                        ticks: {
                          beginAtZero: true,
                          maxTicksLimit: 5,
                          stepSize: Math.ceil(250 / 5),
                          max: 250,
                        },
                      },
                    },
                    elements: {
                      line: {
                        tension: 0.4,
                      },
                      point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                      },
                    },
                  }}
                />
                <CCardFooter>
                  <CRow
                    xs={{ cols: 1 }}
                    md={{ cols: 5 }}
                    className="text-center"
                  >
                    {progressExample.map((item, index) => (
                      <CCol className="mb-sm-2 mb-0" key={index}>
                        <div className="text-medium-emphasis">{item.title}</div>
                        <strong>
                          {item.value} ({item.percent}%)
                        </strong>
                        <CProgress
                          thin
                          className="mt-2"
                          color={item.color}
                          value={item.percent}
                        />
                      </CCol>
                    ))}
                  </CRow>
                </CCardFooter>
              </CRow>
            </CCardBody>
          )}
        </CCardBody>
      </CCard>
      {/*       <WidgetsBrand withCharts /> */}
      {/* <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Usage</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="lg" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  );
};

export default Dashboard;
