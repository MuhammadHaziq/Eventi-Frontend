import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// Eventi Foms
// const CustomerRegistration = React.lazy(() =>
//   import("./pages/Forms/CustomerRegistration")
// );
// const VendarRegistration = React.lazy(() =>
//   import("./pages/Forms/")
// );
const EventRegistration = React.lazy(() =>
  import("./views/events/CreateEvent")
);
const CustomerList = React.lazy(() => import("./views/customer"));
const GridView = React.lazy(() => import("./views/customer/GridView"));
const VendorList = React.lazy(() => import("./views/vendor"));
const ProductList = React.lazy(() => import("./views/product"));
const EventList = React.lazy(() => import("./views/events/EventList"));
const VendorRequestEventJoin = React.lazy(() =>
  import("./views/events/VendorRequestEventJoin")
);
const CustomerJoinEvent = React.lazy(() =>
  import("./views/events/CustomerJoinEvent")
);
const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/dashboard",
    name: "Dashboard",
    permission: "dashboard",
    element: Dashboard,
  },
  // {
  //   path: "/customer-registration",
  //   name: "Customer Registration",
  //   permission: "customer-add",
  //   element: CustomerRegistration,
  // },
  {
    path: "/customer-list",
    name: "Customer List",
    permission: "customer-list",
    element: CustomerList,
  },
  {
    path: "/join-event/:account_id/:event_id",
    name: "Request Event Join Form",
    permission: "event-join",
    element: CustomerJoinEvent,
  },

  // {
  //   path: "/vendar-registration",
  //   name: "Vendar Registration",
  //   permission: "vendor-add",
  //   element: VendarRegistration,
  // },
  {
    path: "/vendor-list",
    name: "Vendar List",
    permission: "vendor-list",
    element: VendorList,
  },
  {
    path: "/event-registration",
    name: "Event Registration",
    permission: "event-add",
    element: EventRegistration,
  },
  {
    path: "/event-list",
    name: "Event List",
    permission: "event-list",
    element: EventList,
  },

  {
    path: "/vendor-join-event/:event_id",
    name: "Vendor Request Event Join Form",
    permission: "event-join",
    element: VendorRequestEventJoin,
  },
  {
    path: "/vendor-update-event/:account_id/:event_id",
    name: "Vendor Request Update Event",
    permission: "event-join",
    element: VendorRequestEventJoin,
  },
  {
    path: "/product-list",
    name: "Products  List",
    permission: "product-list",
    element: ProductList,
  },
];

export default routes;
