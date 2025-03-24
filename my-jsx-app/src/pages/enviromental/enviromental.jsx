import React from "react";
import Sidebar from "./SideBarenvi";
import Header from "../head/header";
import Dashboard from "./Dashboardenvi";
import "../../styles/envicss/page1.css"; // Import CSS riêng cho Page1 (nếu có)

const Envi = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="main">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default Envi;
