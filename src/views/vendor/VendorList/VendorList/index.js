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
import { useVendorAppDispatch, useVendorAppState } from 'src/context/VendorContext'
import { getVendors } from 'src/context/VendorContext/service'
export const VendorList = () => {
  const {vendors} = useVendorAppState();
  const dispatch = useVendorAppDispatch()

  const getAllVendors = () => {
  try{
        getVendors().then(response=> {
          dispatch({type:"GET_VENDORS", vendors:response.data.data})
        }).catch(err=> {
          console.log(err)
        })
      }catch(err){
        console.error(err.message)
      }
  }

  useEffect(()=> {
    getAllVendors()
  },[])

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Vendor List</strong>
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
                  {(vendors || [])?.map((item)=> (
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
