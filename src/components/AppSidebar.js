import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  // CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'

import logo from 'src/assets/logs/redBGLogo.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { useAppDispatch, useAppState } from 'src/context/AppContext'
const AppSidebar = () => {
  const dispatch = useAppDispatch()
  const {sidebarShow, unfoldable} = useAppState()
  // useSelector((state) => state.sidebarShow)
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img
          src={logo}
          alt="kyrio POS"
          className="c-sidebar-brand-full"
          height="25%"
          width="90%"
          style={{ position: 'absolute' }}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
