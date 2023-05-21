import React from 'react'
import {
  CCard,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
const VendorRegister = React.lazy(() => import('./VendorRegister'))
const CustomerRegister = React.lazy(() => import('./CustomerRegister'))

const Register = () => {
  const {userType} = useParams()
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className='mt-5 mb-5'>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
                {userType === "vendor" ? (<VendorRegister/>): <CustomerRegister/>}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
