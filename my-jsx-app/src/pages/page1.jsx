import React from "react";
import Sidebar from "../pages/pageone/SideBarp1";
import Header from "../pages/headandsidebar/header";
import Dashboard from "../pages/pageone/Dashboardpage1";
import "../styles/page1.css"; // Import CSS riêng cho Page1 (nếu có)

const Page1 = () => {
  return (
    <div className="page1">
      <Sidebar />
      <div className="main">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default Page1;
