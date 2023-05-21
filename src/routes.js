import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// Eventi Foms
const CustomerRegistration = React.lazy(() =>
  import("./pages/Forms/CustomerRegistration")
);
const VendarRegistration = React.lazy(() =>
  import("./pages/Forms/VendarRegistration")
);
const EventRegistration = React.lazy(() =>
  import("./views/events/CreateEvent")
);
const CustomerList = React.lazy(() => import("./views/customer/CustomerList"));
const VendorList = React.lazy(() => import("./views/vendor/VendorList"));
const ProductList = React.lazy(() => import("./views/product"));
const EventList = React.lazy(() => import("./views/events/EventList"));
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  {
    path: "/customer-registration",
    name: "Customer Registration",
    element: CustomerRegistration,
  },
  { path: "/customer-list", name: "Customer List", element: CustomerList },

  {
    path: "/vendar-registration",
    name: "Vendar Registration",
    element: VendarRegistration,
  },
  { path: "/vendor-list", name: "Vendar List", element: VendorList },
  {
    path: "/event-registration",
    name: "Event Registration",
    element: EventRegistration,
  },
  { path: "/event-list", name: "Event List", element: EventList },
  { path: "/product-list", name: "Products  List", element: ProductList },
];

export default routes;
