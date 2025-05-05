import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pageonecss/Sidebarp1.css";
import logo from "../../images/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  useEffect(() => {
    const fetchCountNoti = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/notifications/1/unread/count"
        );
        const data = await response.json();

        console.log("Unread notifications response:", data.unread_count);

        const count = parseInt(data.unread_count); // Vì là số nguyên
        if (!isNaN(count)) {
          setCount(count); // Giả sử bạn dùng useState để lưu
        } else {
          console.error("Invalid unread count value:", data.unread_count);
        }
      } catch (error) {
        console.error("Lỗi khi đếm thông báo", error);
      }
    };
    fetchCountNoti();
    const interval = setInterval(() => {
      fetchCountNoti();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
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
          <li className="active" onClick={() => navigate("/page1")}>
            📌 Dashboard
          </li>
          <li
            className="notification"
            onClick={() => navigate("/notification")}
          >
            <span className="icon">🔔</span> Notification
            {count > 0 && <span className="badge">{count}</span>}
          </li>
        </ul>
      </div>

      {/* ANALYTICS */}
      <div className="menu-section">
        <h3>ANALYTICS</h3>
        <ul>
          <li onClick={() => navigate("/health-monitoring")}>
            📊 Behavioral Analytic
          </li>
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

      {/* HELP */}
      <div className="menu-section">
        <h3>HELP</h3>
        <ul>
          <li onClick={() => navigate("/chatbot")}>🤖 Chatbot</li>
          <li className="logout" onClick={() => navigate("/")}>
            🚪 Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
