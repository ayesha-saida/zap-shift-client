import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Rider from "../pages/be a rider/Rider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
   {
      index: true,
    Component: Home ,
    loader: () => fetch('/workingProcedure.json')
    },
   {
      path:'coverage',
    Component: Coverage,
    loader: () => fetch('/serviceCenters.json')
    },
   {
      path:'rider',
    Component:  Rider,
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
  }
]);