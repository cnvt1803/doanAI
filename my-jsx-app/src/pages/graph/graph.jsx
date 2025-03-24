import React from "react";
import Sidebar from "./SideBargraph";
import Header from "../head/header";
import Dashboard from "./Dashboardgraph";

const Graph = () => {
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

export default Graph;
