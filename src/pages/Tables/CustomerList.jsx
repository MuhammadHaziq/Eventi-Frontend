import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  // CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CButtonGroup,
  // CCardFooter,
  // CProgress,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import WidgetsDropdown from '../../views/widgets/WidgetsDropdown'

const CustomerList = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  // const progressExample = [
  //   { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
  //   { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
  //   { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
  //   { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
  //   { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  // ]
  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic Points
              </h4>
              <div className="small text-medium-emphasis">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '270px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
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
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
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
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
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
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>CUSTOMER LIST</strong> <small>Data Table</small>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Business Nme</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone #</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Points</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>food</CTableDataCell>
                    <CTableDataCell>@markOtto</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>256</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>-</CTableDataCell>
                    <CTableDataCell>@jacobThor</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>23</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell>Larry</CTableDataCell>
                    <CTableDataCell> Dun</CTableDataCell>
                    <CTableDataCell>Bird</CTableDataCell>
                    <CTableDataCell>@birdDun</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>90</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">4</CTableHeaderCell>
                    <CTableDataCell>Ju</CTableDataCell>
                    <CTableDataCell> Kin</CTableDataCell>
                    <CTableDataCell>Chain Shop</CTableDataCell>
                    <CTableDataCell>@jukin</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>435</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">5</CTableHeaderCell>
                    <CTableDataCell>Kavin</CTableDataCell>
                    <CTableDataCell> Done</CTableDataCell>
                    <CTableDataCell>POS</CTableDataCell>
                    <CTableDataCell>@kavinDone</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>23</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">6</CTableHeaderCell>
                    <CTableDataCell>Rugby</CTableDataCell>
                    <CTableDataCell> Caudle</CTableDataCell>
                    <CTableDataCell>-</CTableDataCell>
                    <CTableDataCell>@autozone</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>40</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">7</CTableHeaderCell>
                    <CTableDataCell>Joo-Eun</CTableDataCell>
                    <CTableDataCell> Brummett</CTableDataCell>
                    <CTableDataCell>Shop</CTableDataCell>
                    <CTableDataCell>@acusage</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>90</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">8</CTableHeaderCell>
                    <CTableDataCell>Ayushmati</CTableDataCell>
                    <CTableDataCell> Gebhard</CTableDataCell>
                    <CTableDataCell>Cafe</CTableDataCell>
                    <CTableDataCell>@arketmay</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>780</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">9</CTableHeaderCell>
                    <CTableDataCell>Larry</CTableDataCell>
                    <CTableDataCell> Dun</CTableDataCell>
                    <CTableDataCell>Bird</CTableDataCell>
                    <CTableDataCell>@birdDun</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>90</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">10</CTableHeaderCell>
                    <CTableDataCell>Larry</CTableDataCell>
                    <CTableDataCell> Dun</CTableDataCell>
                    <CTableDataCell>Bird</CTableDataCell>
                    <CTableDataCell>@birdDun</CTableDataCell>
                    <CTableDataCell>1234567890</CTableDataCell>
                    <CTableDataCell>90</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default CustomerList
