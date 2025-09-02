import React from "react";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import Footer from "./Component/Footer";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
