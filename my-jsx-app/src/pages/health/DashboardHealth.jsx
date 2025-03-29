import React, { useState } from "react";
import "../../styles/health/Dashboardhealth.css";
import graph1 from "../../images/grahp.jpg"; // Biểu đồ cho Stress level
import graph2 from "../../images/grahp.jpg"; // Biểu đồ cho Pulse
import graph3 from "../../images/grahp.jpg"; // Biểu đồ cho Temperature
import graph4 from "../../images/grahp.jpg"; // Biểu đồ cho Calories burned

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("stress");

  // Trạng thái riêng biệt cho từng dropdown
  const [activityTimeframe, setActivityTimeframe] = useState("Daily");
  const [sleepTimeframe, setSleepTimeframe] = useState("Weekly");
  const [wellnessTimeframe, setWellnessTimeframe] = useState("Weekly");
  const [healthTimeframe, setHealthTimeframe] = useState("Daily");
  const graphImages = {
    stress: graph1,
    pulse: graph2,
    temperature: graph3,
    calories: graph4,
  };

  return (
    <div className="dashboard">
      {/* Cột bên trái */}
      <div className="left-column">
        <div className="stats-container">
          {/* ACTIVITY */}
          <div className="stat-card">
            <p>ACTIVITY</p>
            <div className="dropdown">
              <button className="dropdown-btn">{activityTimeframe} ⌄</button>
              <div className="dropdown-content">
                <span onClick={() => setActivityTimeframe("Daily")}>Daily</span>
                <span onClick={() => setActivityTimeframe("Weekly")}>
                  Weekly
                </span>
                <span onClick={() => setActivityTimeframe("Monthly")}>
                  Monthly
                </span>
              </div>
            </div>
            <div className="progress-circle red">
              <span>25%</span>
            </div>
          </div>

          {/* SLEEP */}
          <div className="stat-card">
            <p>SLEEP</p>
            <div className="dropdown">
              <button className="dropdown-btn">{sleepTimeframe} ⌄</button>
              <div className="dropdown-content">
                <span onClick={() => setSleepTimeframe("Daily")}>Daily</span>
                <span onClick={() => setSleepTimeframe("Weekly")}>Weekly</span>
                <span onClick={() => setSleepTimeframe("Monthly")}>
                  Monthly
                </span>
              </div>
            </div>
            <div className="progress-circle green">
              <span>79%</span>
            </div>
          </div>

          {/* WELLNESS */}
          <div className="stat-card">
            <p>WELLNESS</p>
            <div className="dropdown">
              <button className="dropdown-btn">{wellnessTimeframe} ⌄</button>
              <div className="dropdown-content">
                <span onClick={() => setWellnessTimeframe("Daily")}>Daily</span>
                <span onClick={() => setWellnessTimeframe("Weekly")}>
                  Weekly
                </span>
                <span onClick={() => setWellnessTimeframe("Monthly")}>
                  Monthly
                </span>
              </div>
            </div>
            <div className="progress-circle yellow">
              <span>52%</span>
            </div>
          </div>
        </div>

        {/* Biểu đồ Health Monitoring */}
        <div className="health-monitoring">
          <h3>HEALTH MONITORING</h3>
          <div className="tabs">
            <div className="l-c">
              <button
                className={selectedTab === "stress" ? "active" : ""}
                onClick={() => setSelectedTab("stress")}
              >
                💙 Stress level
              </button>
              <button
                className={selectedTab === "pulse" ? "active" : ""}
                onClick={() => setSelectedTab("pulse")}
              >
                ⚡ Pulse
              </button>
              <button
                className={selectedTab === "temperature" ? "active" : ""}
                onClick={() => setSelectedTab("temperature")}
              >
                🌡️ Temperature
              </button>
              <button
                className={selectedTab === "calories" ? "active" : ""}
                onClick={() => setSelectedTab("calories")}
              >
                🔥 Calories burned
              </button>
            </div>
            <div className="r-c">
              <div className="dropdown-2">
                <button className="dropdown-btn-2">{healthTimeframe} ⌄</button>
                <div className="dropdown-content-2">
                  <span onClick={() => setHealthTimeframe("Daily")}>Daily</span>
                  <span onClick={() => setHealthTimeframe("Weekly")}>
                    Weekly
                  </span>
                  <span onClick={() => setHealthTimeframe("Monthly")}>
                    Monthly
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="chart">
            <img src={graphImages[selectedTab]} alt="Health Chart" />
          </div>
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        <div className="report-section">
          <h3>Report</h3>
          <select>
            <option>Ngày: 20/02/2025</option>
          </select>
          <div className="report-list">
            {Array(12)
              .fill("Hamster Room 1 hoạt động 5h")
              .map((item, index) => (
                <div key={index} className="report-item">
                  ⚡ {item}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
