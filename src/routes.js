import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Eventi Foms
const CustomerRegistration = React.lazy(() => import('./pages/Forms/CustomerRegistration'))
const VendarRegistration = React.lazy(() => import('./pages/Forms/VendarRegistration'))
const EventRegistration = React.lazy(() => import('./pages/Forms/EventRegistration'))
const CustomerList = React.lazy(() => import('./pages/Tables/CustomerList'))
const VendarList = React.lazy(() => import('./pages/Tables/VendarList'))
const ProductList = React.lazy(() => import('./pages/Tables/ProductList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/customer-registration', name: 'Customer Registration', element: CustomerRegistration },
  { path: '/vendar-registration', name: 'Vendar Registration', element: VendarRegistration },
  { path: '/event-registration', name: 'Event Registration', element: EventRegistration },

  { path: '/customer-list', name: 'Customer List', element: CustomerList },
  { path: '/vendar-list', name: 'Vendar List', element: VendarList },
  { path: '/product-list', name: 'Products  List', element: ProductList },
]

export default routes
