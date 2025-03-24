import React from "react";
import Sidebar from "./SideBarnotifi";
import Header from "../head/header";
import Dashboard from "./Dashboardnotifi";

const Notification = () => {
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

export default Notification;
