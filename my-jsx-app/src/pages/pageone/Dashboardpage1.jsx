import React, { useState } from "react";
import "../../styles/pageonecss/Dashboardpage1.css";
import image from "../../images/hill.png";

const Dashboardp1 = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [lightsOn, setLightsOn] = useState(false);
  const [sound, setSound] = useState(30);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div className="dashboard">
      {/* Cột bên trái */}
      <div className="left-column">
        {/* Thẻ chào mừng */}
        <div className="welcome-card">
          <div className="welcome-card-left">
            <h2 className="name">
              Hello, <span>Truong</span>!
            </h2>
            <p className="line1">
              Always be meticulous when taking care of your hamster.
            </p>
            <p className="linetext">🌡️ +25°C Outdoor Temperature</p>
            <p className="linetext">☁️ Fuzzy cloudy weather</p>
          </div>
          <div className="welcome-card-right">
            <h1>
              <img src={image} alt="image" className="hill" />
            </h1>
          </div>
        </div>

        {/* Phòng hamster */}
        <div className="hamster-room">
          <div className="hamster-room-head">
            <h3 className="hamster-room-head-text">Hamster's Room </h3>
            <div className="top-controls">
              <select className="room-select">
                <option>Room 01</option>
                <option>Room 02</option>
                <option>Room 03</option>
              </select>
              <div className="temperature-info">
                <span>
                  💧 {humidity}% 🌡️ {temperature}°C
                </span>
              </div>
            </div>
          </div>

          {/* Các tính năng điều khiển */}
          <div className="controls">
            <div
              className={`feature ${
                selectedFeature === "Humidity" ? "active" : ""
              }`}
              onClick={() => handleFeatureClick("Humidity")}
            >
              <p>💧</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Humidity</p>
            </div>

            <div
              className={`feature ${
                selectedFeature === "Temperature" ? "active" : ""
              }`}
              onClick={() => handleFeatureClick("Temperature")}
            >
              <p>🌡</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Temperature</p>
            </div>

            <div
              className={`feature ${
                selectedFeature === "Lights" ? "active" : ""
              }`}
              onClick={() => handleFeatureClick("Lights")}
            >
              <p>💡</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={lightsOn}
                  onChange={() => setLightsOn(!lightsOn)}
                />
                <span className="slider round"></span>
              </label>
              <p>Lights</p>
            </div>

            <div
              className={`feature ${
                selectedFeature === "Sound" ? "active" : ""
              }`}
              onClick={() => handleFeatureClick("Sound")}
            >
              <p>🌡</p>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Sound</p>
            </div>
          </div>

          {/* Hiển thị thông tin của tính năng được chọn */}
          {selectedFeature === "Temperature" && (
            <div className="temperature-control">
              <h4>Temperature</h4>
              <div className="temp-container">
                <span className="temp-label">05°C</span>
                <div className="temp-display">
                  <button
                    className="minus-btn"
                    onClick={() =>
                      setTemperature((prev) => Math.max(5, prev - 1))
                    }
                  >
                    -
                  </button>
                  <span className="temp-value">{temperature}°C</span>
                  <button
                    className="plus-btn"
                    onClick={() =>
                      setTemperature((prev) => Math.min(35, prev + 1))
                    }
                  >
                    +
                  </button>
                </div>
                <span className="temp-label">35°C</span>
              </div>
            </div>
          )}

          {selectedFeature === "Sound" && (
            <div className="temperature-control">
              <h4>Sound</h4>
              <div className="temp-container">
                <span className="temp-label">05 dB</span>
                <div className="temp-display">
                  <button
                    className="minus-btn"
                    onClick={() => setSound((prev) => Math.max(5, prev - 1))}
                  >
                    -
                  </button>
                  <span className="temp-value">{sound}dB</span>
                  <button
                    className="plus-btn"
                    onClick={() => setSound((prev) => Math.min(50, prev + 1))}
                  >
                    +
                  </button>
                </div>
                <span className="temp-label">50 dB</span>
              </div>
            </div>
          )}

          {selectedFeature === "Humidity" && (
            <div className="temperature-control">
              <h4>Humidity</h4>
              <div className="temp-container">
                <span className="temp-label">20%</span>
                <div className="temp-display">
                  <button
                    className="minus-btn"
                    onClick={() =>
                      setHumidity((prev) => Math.max(20, prev - 5))
                    }
                  >
                    -
                  </button>
                  <span className="temp-value">{humidity}%</span>
                  <button
                    className="plus-btn"
                    onClick={() =>
                      setHumidity((prev) => Math.min(80, prev + 5))
                    }
                  >
                    +
                  </button>
                </div>
                <span className="temp-label">80%</span>
              </div>
            </div>
          )}

          {selectedFeature === "Lights" && (
            <div className="temperature-control">
              <h4>Lights</h4>
              <p>
                Current Status: <strong>{lightsOn ? "ON" : "OFF"}</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        {/* Thẻ cảnh báo */}
        <div className="warning-card">
          <h3>⚠️ Warning:</h3>
          <div className="warning-box"></div>
          <div className="warning-box"></div>
        </div>

        {/* Giám sát sức khỏe */}
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
            <p>📊 Chart goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardp1;
