import React from "react";
import CIcon from "@coreui/icons-react";
import { cilChartPie, cilNotes, cilSpeedometer } from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

let _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    permission: "dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Products",
    permission: "product-list",
    to: "/product-list",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: "Customer",
    permission: "customer-list",
    to: "/customer-list",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Customer List",
        permission: "customer-list",
        to: "/customer-list",
      },
      {
        component: CNavItem,
        name: "Event Join",
        permission: "grid-view",
        to: "/grid-view",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Vendor",
    permission: "vendor-list",
    to: "/vendor-list",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Vendor List",
        permission: "vendor-list",
        to: "/vendor-list",
      },
      {
        component: CNavItem,
        name: "Event Join",
        permission: "grid-view",
        to: "/grid-view",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Events",
    to: "/event-list",
    permission: "event-list",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Event List",
        permission: "event-list",
        to: "/event-list",
      },
      {
        component: CNavItem,
        name: "Event Registration",
        permission: "event-add",
        to: "/event-registration",
      },
    ],
  },
];
export default _nav;
