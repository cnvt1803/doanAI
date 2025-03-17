import React from "react";
import Sidebar from "../pages/pageone/SideBar";
import Header from "../pages/pageone/header";
import Dashboard from "../pages/pagetwo/Dashboard";
import "../styles/page2.css"; // Import CSS riêng cho Page1 (nếu có)

const Page2 = () => {
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

export default Page2;
