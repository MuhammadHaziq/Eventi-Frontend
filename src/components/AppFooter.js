import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://kodxsystem.com/" target="_blank" rel="noopener noreferrer">
          KOD X SYSTEM
        </a>
        <span className="ms-1">&copy; {new Date().getFullYear()} Pvt Ltd.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://kodxsystem.com/" target="_blank" rel="noopener noreferrer">
          KOD X SYSTEM &amp; Dashboard 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
