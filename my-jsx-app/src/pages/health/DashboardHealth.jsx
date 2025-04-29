import React, { useState } from "react";
import "../../styles/health/Dashboardhealth.css";
import graph1 from "../../images/grahp.jpg"; // Biểu đồ cho Stress level
import graph2 from "../../images/grahp.jpg"; // Biểu đồ cho Pulse
import graph3 from "../../images/grahp.jpg"; // Biểu đồ cho Temperature
import graph4 from "../../images/grahp.jpg"; // Biểu đồ cho Calories burned

const Dashboard = () => {
  // Trạng thái riêng biệt cho từng dropdown
  const [selectedTab, setSelectedTab] = useState("object");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [lights, setLights] = useState(2000);
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
        <div className="dashboard-container">
          <div className="sensor-card">
            <h3>Temperature</h3>
            <div className="gauge temperature">
              <span>{temperature}°C</span>
            </div>
          </div>

          <div className="sensor-card">
            <h3>Humidity</h3>
            <div className="gauge humidity">
              <span>{humidity}%</span>
            </div>
          </div>

          <div className="sensor-card">
            <h3>Light</h3>
            <div className="gauge light">
              <span>{lights} Lux</span>
            </div>
          </div>
        </div>

        {/* Biểu đồ Health Monitoring */}
        <div className="health-monitoring">
          <div className="header-ana">
            <h3>ANALYSIS</h3>
            <button className="analyze-btn">Analysis ➔</button>
          </div>

          <div className="tabs-upload">
            <div className="tabs">
              <button
                className={selectedTab === "object" ? "active" : ""}
                onClick={() => setSelectedTab("object")}
              >
                Object Anomaly Detection
              </button>
              <button
                className={selectedTab === "dynamic" ? "active" : ""}
                onClick={() => setSelectedTab("dynamic")}
              >
                Dynamic analysis
              </button>
            </div>

            <div className="upload">
              <input
                type="file"
                accept="image/*"
                id="upload"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="upload" className="upload-btn">
                Upload +
              </label>
            </div>
          </div>

          <div className="content">
            <div className="left-panel">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="uploaded-img"
                />
              ) : (
                <div className="placeholder">Upload an image to analyze</div>
              )}
            </div>

            <div className="right-panel">
              <div className="result-box">
                <h4>Result</h4>
                <div className="result-item">
                  22/04/2025 16:29 pm
                  <br />
                  <span>Hamster is active</span>
                </div>
                <div className="result-item">
                  22/04/2025 16:29 pm
                  <br />
                  <span>No Anomalies Detected</span>
                </div>
                <div className="result-item">
                  22/04/2025 16:29 pm
                  <br />
                  <span>No Anomalies Detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        <div className="report-section">
          <h3>Report</h3>
          <select>
            <option>Ngày: 23/04/2025</option>
          </select>
          <div className="report-list">
            {[
              "Hamster đang hoạt động",
              "Có 2 hamster trong phòng",
              "Hamster hoạt động không giống thói quen thường ngày",
            ].map((item, index) => (
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
