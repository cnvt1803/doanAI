import React, { useState, useEffect } from "react";
import "../../styles/envicss/Dashboardenvi.css";
import grahp from "../../images/grahp.jpg";
import grahp2 from "../../images/graph2.png";

const Dashboardp1 = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [lights, setLights] = useState(2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/data");
        const data = await response.json();

        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setLights(data.lights);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div className="dashboard">
      {/* Cột bên trái */}
      <div className="left-column">
        {/* Thẻ chào mừng */}
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

        {/* Phòng hamster */}
        <div className="hamster-room-envi">
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
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Lights</p>
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
                      setTemperature((prev) => Math.min(45, prev + 1))
                    }
                  >
                    +
                  </button>
                </div>
                <span className="temp-label">35°C</span>
              </div>
            </div>
          )}

          {selectedFeature === "Lights" && (
            <div className="temperature-control">
              <h4>Lights</h4>
              <div className="temp-container">
                <span className="temp-label">100 Lux</span>
                <div className="temp-display">
                  <button
                    className="minus-btn"
                    onClick={() =>
                      setLights((prev) => Math.max(100, prev - 100))
                    }
                  >
                    -
                  </button>
                  <span className="temp-value">{lights}Lux</span>
                  <button
                    className="plus-btn"
                    onClick={() =>
                      setLights((prev) => Math.min(5000, prev + 100))
                    }
                  >
                    +
                  </button>
                </div>
                <span className="temp-label">5000 Lux </span>
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
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        {/* Thẻ cảnh báo */}
        {/* Thẻ cảnh báo */}
        <div className="warning-card">
          <h3>⚠️ Warning:</h3>
          <div className="warning-box">Nhiệt độ quá ngưỡng</div>
          <div className="warning-box">Độ ẩm ổn định</div>
          <div className="warning-box">Ánh sáng bình thường</div>
        </div>

        {/* Giám sát sức khỏe */}
        <div className="room-hamster">
          <h3 className="title-h">Hamster Room</h3>
          <div className="chart-container">
            <p>{/* <img src={room} alt="image" className="grahp" /> */}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardp1;
