import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pageonecss/Sidebarp1.css";
import logo from "../../images/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="PAWS Logo" />
      </div>

      {/* MENU */}
      <div className="menu-section">
        <h3>MENU</h3>
        <ul>
          <li onClick={() => navigate("/page1")}>📌 Dashboard</li>
          <li
            className="notification active"
            onClick={() => navigate("/notification")}
          >
            <span className="icon">🔔</span> Notification
            <span className="badge">2</span>
          </li>
        </ul>
      </div>

      {/* ANALYTICS */}
      <div className="menu-section">
        <h3>ANALYTICS</h3>
        <ul>
          <li onClick={() => navigate("/health-monitoring")}>
            📊 Health monitoring
          </li>
          <li onClick={() => navigate("/observed-data")}>🌐 Observed Data</li>
        </ul>
      </div>

      {/* ENVIRONMENTAL INFORMATION */}
      <div className="menu-section">
        <h3>ENVIRONMENTAL INFORMATION </h3>
        <ul>
          <li onClick={() => navigate("/enviromental")}>
            📁 Environmental parameters
          </li>
          <li onClick={() => navigate("/graph")}>📈 Graph</li>
        </ul>
      </div>

      {/* AUTOMATION */}
      <div className="menu-section">
        <h3>Automation</h3>
        <ul>
          <li onClick={() => navigate("/food-supply")}>
            🍽️ Food & Beverage Supply
          </li>
        </ul>
      </div>

      {/* HELP */}
      <div className="menu-section">
        <h3>HELP</h3>
        <ul>
          <li onClick={() => navigate("/settings")}>⚙️ Settings</li>
          <li className="logout" onClick={() => navigate("/")}>
            🚪 Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
