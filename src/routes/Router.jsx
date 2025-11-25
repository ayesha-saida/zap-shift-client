import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";

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
]
  },
]);