import React from "react";
import "../../styles/pageonecss/Sidebarp1.css";
import logo from "../../images/logo.png";

const Sidebar = () => {
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
          <li className="active">📌 Dashboard</li>
          <li className="notification">
            <span className="icon">🔔</span>
            Notification
            <span className="badge">2</span>
          </li>
        </ul>
      </div>

      {/* ANALYTICS */}
      <div className="menu-section">
        <h3>ANALYTICS</h3>
        <ul>
          <li>📊 Health monitoring</li>
          <li>🌐 Observed Data</li>
        </ul>
      </div>
      {/* ENVIRONMENTAL INFORMATION */}
      <div className="menu-section">
        <h3>ENVIRONMENTAL INFORMATION </h3>
        <ul>
          <li>📁 Environmental parameters</li>
          <li>
            📈 Graph <span className="badge"></span>
          </li>
        </ul>
      </div>
      {/* AUTOMATION */}
      <div className="menu-section">
        <h3>Automation</h3>
        <ul>
          <li>🍽️ Food & Beverage Supply</li>
        </ul>
      </div>

      {/* HELP */}
      <div className="menu-section">
        <h3>HELP</h3>
        <ul>
          <li>⚙️ Settings</li>
          <li className="logout">🚪 Log Out</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
