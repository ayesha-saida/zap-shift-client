import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Rider from "../pages/be a rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/payment/Payment";
import PaymentSuccess from "../pages/Dashboard/payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/payment/PaymentHistory";
import ApprovedRiders from "../pages/Dashboard/Approved Riders/ApprovedRiders";
import UsersManagement from "../pages/Dashboard/Users Management/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/Assign Riders/AssignRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
   {
      index: true,
    Component: Home ,
    loader: () => fetch('/workingProcedure.json').then(res => res.json())
    },
   {
      path:'coverage',
    Component: Coverage,
    loader: () => fetch('/serviceCenters.json').then(res => res.json())
    },
   {
      path:'rider',
    element: <PrivateRoute>  <Rider /> </PrivateRoute> ,
    loader: () => fetch('/serviceCenters.json').then(res => res.json())
    },
   {
      path:'send-parcel',
    element: <PrivateRoute>  <SendParcel />  </PrivateRoute> ,
     loader: () => fetch('/serviceCenters.json').then(res => res.json())
    },
]
  },

  {
    path:'/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ]
  },

  {
    path:'dashboard',
    element: <PrivateRoute> <DashboardLayout />  </PrivateRoute> ,
    children: [
      {
        path:'my-parcels',
        Component: MyParcels  ,
      },
      {
        path:'payment/:parcelId',
        Component: Payment ,
      },
      {
        path:'payment-success',
        Component: PaymentSuccess  ,
      },
      {
        path:'payment-cancelled',
        Component: PaymentCancelled,
      },
      {
        path:'payment-history',
        Component: PaymentHistory,
      },
      {
        path:'approve-riders', 
        element: <AdminRoute> <ApprovedRiders /> </AdminRoute> ,
      },
      {
        path:'assign-riders', 
        element:  <AssignRiders> </AssignRiders>,
      },
      {
        path:'users-management',
        element: <AdminRoute> <UsersManagement />  </AdminRoute>,
      },
    ] 
  }
]);