import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
        <Sidebar />
      <div className="content-area">
        <div className="main-content">
      <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
