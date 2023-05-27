import React from "react";
import CIcon from "@coreui/icons-react";
import { cilChartPie, cilNotes, cilSpeedometer } from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";

let _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Products",
    to: "/product-list",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: "Customer",
    to: "/customer-list",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Customer List",
        to: "/customer-list",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Vendor",
    to: "/vendor-list",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Vendor List",
        to: "/vendor-list",
      },
    ],
  },
];
JSON.parse(localStorage.getItem("eventi-user"))?.user_type === "vendor" &&
  (_nav = [
    ..._nav,
    {
      component: CNavGroup,
      name: "Events",
      to: "/event-list",
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: "Event List",
          to: "/event-list",
        },
        {
          component: CNavItem,
          name: "Event Registration",
          to: "/event-registration",
        },
      ],
    },
  ]);
export default _nav;
