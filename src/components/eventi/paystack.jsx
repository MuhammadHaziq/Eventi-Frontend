import React from 'react'
import {
    CFormLabel,
    CFormInput,
    CCol,
    CRow,
  } from "@coreui/react";
const Paystack = ({ email,
    firstName,
    lastName,
    amount}) => {
  return (
    <>
    
          <CRow>
            <CCol sm={7}>
             <CRow className="mb-3">
            <CFormLabel
              htmlFor="staticEmail"
              className="col-sm-4 col-form-label"
            >
              <strong>Email :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticEmail"
                readOnly
                plainText
                value={email}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              htmlFor="inputPassword"
              className="col-sm-4 col-form-label"
            >
              <strong>First Name :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticFirstName"
                defaultValue={firstName}
                readOnly
                plainText
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              htmlFor="inputPassword"
              className="col-sm-4 col-form-label"
            >
              <strong>Last Name :</strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticLastName"
                defaultValue={lastName}
                readOnly
                plainText
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CFormLabel
              htmlFor="inputPassword"
              className="col-sm-4 col-form-label"
            >
              <strong>Amount{""} <small>ZAR :</small></strong>
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                type="text"
                id="staticAmount"
                value={amount}
                readOnly
                plainText
              />
            </CCol>
          </CRow>
        </CCol>
          <CCol sm={5}> </CCol>
          </CRow>
          </>
  )
}

export default Paystack