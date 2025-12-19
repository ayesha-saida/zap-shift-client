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
        element: <MyParcels> </MyParcels> ,
      },
      {
        path:'payment/:parcelId',
        element: <Payment> </Payment> ,
      },
      {
        path:'payment-success',
        element: <PaymentSuccess> </PaymentSuccess> ,
      },
      {
        path:'payment-cancelled',
        Component: PaymentCancelled,
      },
      {
        path:'payment-history',
        Component: PaymentHistory,
      },
    ] 
  }
]);