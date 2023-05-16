import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getCustomers } from 'src/context/CustomerContext/service'
import { useCustomerAppDispatch, useCustomerAppState } from 'src/context/CustomerContext'
export const CustomerList = () => {
  const {customers} = useCustomerAppState();
  const dispatch = useCustomerAppDispatch()

  const getAllCustomers = () => {
  try{
        getCustomers().then(response=> {
          dispatch({type:"GET_CUSTOMERS", customers:response.data.data})
        }).catch(err=> {
          console.log(err)
        })
      }catch(err){
        console.error(err.message)
      }
  }

  useEffect(()=> {
    getAllCustomers()
  },[])

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Customer List</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Business Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(customers || [])?.map((item)=> (
                    <CTableRow key={item._id}>
                    <CTableDataCell>{item.first_name}</CTableDataCell>
                    <CTableDataCell>{item.last_name}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>{item.business_name}</CTableDataCell>
                    <CTableDataCell>{item.address}</CTableDataCell>
                    <CTableDataCell>{item.date_of_birth}</CTableDataCell>
                    <CTableDataCell>{item.gender}</CTableDataCell>
                    <CTableDataCell>{item.phone_number}</CTableDataCell>
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
