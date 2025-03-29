import React from "react";
import Sidebar from "./SideBarhealth";
import Header from "../head/header";
import Dashboard from "./DashboardHealth";

const Health = () => {
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

export default Health;
