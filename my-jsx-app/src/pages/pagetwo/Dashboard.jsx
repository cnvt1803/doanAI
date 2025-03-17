import React from "react";
import "../../styles/pageonecss/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Cột bên trái */}
      <div className="left-column">
        <div className="welcome-card">
          <h2>
            Hello, <span className="name">Truong</span>!
          </h2>
          <p>Always be meticulous when taking care of your hamster.</p>
          <p>🌡️ 25°C Outdoor Temperature</p>
          <p> ☁️ Fuzzy cloudy weather </p>
        </div>
        <div className="hamster-room">
          <div className="hamster-room-head">
            <h3>Hamster's Room</h3>

            <div className="top-controls">
              <select className="room-select">
                <option>Room 01</option>
                <option>Room 02</option>
                <option>Room 03</option>
              </select>

              <div className="temperature-info">
                <span>💧35 🌡️ 20°C</span>
              </div>
            </div>
          </div>

          <div className="controls">
            <div className="feature">
              <p>🌩🌩🌩🌩🌩</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Air Conditioner</p>
            </div>

            <div className="feature">
              <p>🌡🌡🌡🌡🌡</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Temperature</p>
            </div>

            <div className="feature">
              <p>⚡⚡⚡⚡⚡</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Lights</p>
            </div>
          </div>

          <div className="temperature-control">
            <div className="temperature-control-line">
              <h4>Hamster Room Temperature</h4>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="temp-container">
              <span className="temp-label">05°C</span>
              <div className="temp-display">
                <button className="minus-btn">-</button>
                <span className="temp-value">25°C</span>
                <button className="plus-btn">+</button>
              </div>
              <span className="temp-label">25°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        <div className="warning-card">
          <h3>⚠️ Warning:</h3>
          <div className="warning-box"> </div>
          <div className="warning-box"> </div>
        </div>

        <div className="health-monitoring">
          <div className="group">
            <h3>Health Monitoring</h3>
            <select className="dropdown">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
          </div>
          <div className="chart-container">
            {/* Giả lập khu vực biểu đồ */}
            <p>📊 Chart goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
