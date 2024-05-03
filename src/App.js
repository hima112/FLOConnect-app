import './App.css';
import * as React from "react";
import HomePage from './Pages/HomePage';
import CheckTransactions from './Pages/CheckTransactions';

import NavbarHome from './Navbar';
//import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Balance from './Pages/Balance';

const router = createBrowserRouter([
  {
    path: "/",
    element: <><NavbarHome/><HomePage/></>,  
  },
  {
    path: "/History",
    element: <><NavbarHome/><CheckTransactions/></>,
  },
  {
    path: "/Balance",
    element: <><NavbarHome/><Balance/></>,
  }
]);

function App() {
  return (
    <>
      
      <RouterProvider router={router} />
    </>
  );
}

export default App;
