import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const EventRegistration = React.lazy(() =>
  import("./views/events/CreateEvent")
);
const CustomerList = React.lazy(() => import("./views/customer"));
const customerPaymentHistory = React.lazy(() => import("./views/customer/CustomerPayment/CustomerPayment"));
const AdminList = React.lazy(() => import("./views/admin"));
const Ticket = React.lazy(() => import("./views/ticket"));
const VendorList = React.lazy(() => import("./views/vendor"));
const ProductList = React.lazy(() => import("./views/product"));
const EventList = React.lazy(() => import("./views/events/EventList"));
// const PaymentForm = React.lazy(() => import("./views/events/PaymentForm"));
const VendorEventJoin = React.lazy(() => import("./views/joinEvent/vendor"));
const UserProfile = React.lazy(() => import("./views/profile/userProfile"));
const VendorJoinedDetail = React.lazy(() =>
  import("./views/joinEvent/customer/VendorJoinedDetail")
);
const CustomerJoinEvent = React.lazy(() =>
  import("./views/joinEvent/customer")
);
const AdminJoinedVendorDetail = React.lazy(() =>
  import("./views/joinEvent/admin/VendorJoinedDetail")
);
const AdminJoinEvent = React.lazy(() => import("./views/joinEvent/admin"));
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
    path: "/customer-payment-history",
    name: "Customer Payment History",
    permission: "customer-payment-history",
    element: customerPaymentHistory,
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
    element: VendorJoinedDetail,
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
  // {
  //   path: "/payment-form",
  //   name: "Payment Form",
  //   permission: "event-list",
  //   element: PaymentForm,
  // },

  {
    path: "/vendor-join-event/:event_id",
    name: "Vendor Request Event Join Form",
    permission: "event-join",
    element: VendorEventJoin,
  },
  {
    path: "/vendor-update-event/:account_id/:event_id",
    name: "Vendor Request Update Event",
    permission: "event-join",
    element: VendorEventJoin,
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
    path: "/ticket/:event_id",
    name: "Ticket",
    permission:"ticket",
    element: Ticket,
  },
  {
    path: "/event-detail/:account_id/:event_id",
    name: "Event Detail",
    permission: "event-detail",
    element: AdminJoinEvent,
  },
  {
    path: "/admin-joined-vednor-detail/:account_id/:event_id",
    name: "Joined Vendor Detail",
    permission: "event-detail",
    element: AdminJoinedVendorDetail,
  },

  {
    path: "/account/profile/:account_id",
    name: "User Profile",
    permission: "view-profile",
    element: UserProfile,
  },
];

export default routes;
