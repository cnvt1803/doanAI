import React from "react";
import Sidebar from "./SideBarp1";
import Header from "../head/header";
import Dashboard from "./Dashboardpage1";
import "../../styles/pageonecss/page1.css"; // Import CSS riêng cho Page1 (nếu có)

const Page1 = () => {
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

export default Page1;
