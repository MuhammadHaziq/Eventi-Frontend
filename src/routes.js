import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const EventRegistration = React.lazy(() =>
  import("./views/events/CreateEvent")
);
const CustomerList = React.lazy(() => import("./views/customer"));
const AdminList = React.lazy(() => import("./views/admin"));
const VendorList = React.lazy(() => import("./views/vendor"));
const ProductList = React.lazy(() => import("./views/product"));
const EventList = React.lazy(() => import("./views/events/EventList"));
const VendorRequestEventJoin = React.lazy(() =>
  import("./views/events/VendorRequestEventJoin")
);
const UserProfile = React.lazy(() => import("./views/profile/userProfile"));
const JoinedVendorDetail = React.lazy(() =>
  import("./views/events/CustomerJoinEvent/JoinedVendorDetail")
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

  {
    path: "/joined-vednor-detail/:account_id/:event_id",
    name: "Joined Vendor Detail",
    permission: "event-detail",
    element: JoinedVendorDetail,
  },
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

  {
    path: "/admin-list",
    name: "Admin List",
    permission: "admin-list",
    element: AdminList,
  },
  {
    path: "/account/profile/:account_id",
    name: "User Profile",
    permission: "view-profile",
    element: UserProfile,
  },
];

export default routes;
