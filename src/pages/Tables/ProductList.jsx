import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
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
  CWidgetStatsA,
} from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import {
  getStyle,
} from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
  // cilArrowBottom, cilArrowTop, cilOptions
} from '@coreui/icons'
import { addProduct, getProducts } from 'src/context/ProductContext/service'
import { useProductAppState, useProductAppDispatch } from 'src/context/ProductContext'
// import WidgetsDropdown from '../../views/widgets/WidgetsDropdown'

const ProductList = () => {
  const {products} = useProductAppState();
  const dispatch = useProductAppDispatch()
  const [state, setState] = useState({
    product_name:"",
    product_quantity:0,
    product_price:0
  })
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]:value})
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }else{
      event.preventDefault()
      event.stopPropagation()
      try{
        addProduct({product_name:state.product_name, product_price:state.product_price, product_quantity:state.product_quantity}).then(response=> {
          dispatch({type:"ADD_PRODUCT", product:response.data.data})
          setVisible(false)
        }).catch(err=> {
          console.log(err)
        })
      }catch(err){
        console.error(err.message)
      }
    }
    setValidated(true)
  }

  const getAllProducts = () => {
  try{
        getProducts().then(response=> {
          dispatch({type:"GET_PRODUCTS", products:response.data.data})
        }).catch(err=> {
          console.log(err)
        })
      }catch(err){
        console.error(err.message)
      }
  }

  useEffect(()=> {
    getAllProducts()
  },[])

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
            <CRow>
            <CCol md={4}>
              <CFormInput
                type="text"
                id="floatingInputValid"
                floatingClassName="mb-3"
                floatingLabel="Product Name"
                placeholder="Product Name"
                name="product_name"
                defaultValue={state.product_name}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                id="floatingInputValid2"
                floatingClassName="mb-3"
                floatingLabel="Price"
                placeholder="Price"
                name="product_price"
                defaultValue={state.product_price}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="number"
                id="floatingInputValid2"
                floatingClassName="mb-3"
                floatingLabel="Quantity"
                placeholder="Quantity"
                name="product_quantity"
                defaultValue={state.product_quantity}
                onChange={handleOnChange}
                required
              />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            </CRow>
            <CRow>
            <CButton color="primary" type='submit'>Save changes</CButton>
            </CRow>
            

          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          
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
                    <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(products || [])?.map((item, index)=> (
                    <CTableRow key={item._id}>
                    <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                    <CTableDataCell>{item.product_name}</CTableDataCell>
                    <CTableDataCell>$ {item.product_price}</CTableDataCell>
                    <CTableDataCell>{item.product_quantity}</CTableDataCell>
                  </CTableRow>
                  ))}
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
