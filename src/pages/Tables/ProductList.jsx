import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  // CTableCaption,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  // CCardFooter,
  // CProgress,
  // CDropdown,
  // CDropdownMenu,
  // CDropdownItem,
  // CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import {
  getStyle,
  // hexToRgba
} from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
  // cilArrowBottom, cilArrowTop, cilOptions
} from '@coreui/icons'

// import WidgetsDropdown from '../../views/widgets/WidgetsDropdown'

const ProductList = () => {
  const random2 = () => Math.round(Math.random() * 100)

  const [visible, setVisible] = useState(false)

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Add Product</CButton>
      <br></br>
      <br></br>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-2 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={6}>
              <CFormInput
                type="text"
                id="floatingInputValid"
                floatingClassName="mb-3"
                floatingLabel="Product Name"
                placeholder="Product Name"
                defaultValue=""
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="floatingInputValid2"
                floatingClassName="mb-3"
                floatingLabel="Price"
                placeholder="Price"
                defaultValue=""
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>PRODUCT LIST</strong> <small>Data Table</small>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Bottle</CTableDataCell>
                    <CTableDataCell>$ 5</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Tea</CTableDataCell>
                    <CTableDataCell>$ 10</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell>Coffee</CTableDataCell>
                    <CTableDataCell>$ 24</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">4</CTableHeaderCell>
                    <CTableDataCell>Bottle</CTableDataCell>
                    <CTableDataCell>$ 5</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">5</CTableHeaderCell>
                    <CTableDataCell>Bottle</CTableDataCell>
                    <CTableDataCell>$ 5</CTableDataCell>
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
export default ProductList
