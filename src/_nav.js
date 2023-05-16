import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilNotes, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

let _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Registration Forms',
  //   to: '/customer-registration',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Customer Registration',
  //       to: '/customer-registration',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Vendar Registration',
  //       to: '/vendar-registration',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Event Registration',
  //       to: '/event-registration',
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: 'Products',
    to: '/product-list',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Customer',
    to: '/customer-list',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Customer List',
        to: '/customer-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Vendor',
    to: '/vendor-list',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Vendor List',
        to: '/vendor-list',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Reports',
  //   to: '/customer-reports',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Customer Point Reports',
  //       to: '/customer-point-reports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Vendar Point Reports',
  //       to: '/vendar-point-reports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Event Point Reports',
  //       to: '/customer-point-reports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Point Summary Reports',
  //       to: '/point-summary-reports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Customer Payment Reports',
  //       to: '/customer-payment-reports',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Vendar Payment Reports',
  //       to: '/vender-payment-reports',
  //     },
  //   ],
  // },
]
JSON.parse(localStorage.getItem('eventi-user'))?.user_type === "vendor" && (
  _nav = [..._nav, 
    {
    component: CNavGroup,
    name: 'Events',
    to: '/event-list',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Event List',
        to: '/event-list',
      },
      {
        component: CNavItem,
        name: 'Event Registration',
        to: '/event-registration',
      },
    ],
  }]
  )
export default _nav
