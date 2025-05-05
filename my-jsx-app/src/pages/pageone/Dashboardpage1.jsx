import React, { useState, useEffect } from "react";
import "../../styles/pageonecss/Dashboardpage1.css";
import image from "../../images/hill1.png";
import room from "../../images/room.png";

const Dashboardp1 = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [lights, setLights] = useState(2000);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/5/latest"
        );
        const data = await response.json();
        console.log("Temperature response:", data.value);
        const tempValue = parseFloat(data.value); // Sử dụng parseFloat để chuyển thành số thực
        if (!isNaN(tempValue)) {
          setTemperature(tempValue);
        } else {
          console.error("Invalid temperature value:", data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy nhiệt độ:", error);
      }
    };

    const fetchHumidity = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/7/latest"
        );
        const data = await response.json();
        console.log("Humidity response:", data.value);
        const humidityValue = parseFloat(data.value); // Chuyển thành số thực
        if (!isNaN(humidityValue)) {
          setHumidity(humidityValue);
        } else {
          console.error("Invalid humidity value:", data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy độ ẩm:", error);
      }
    };

    const fetchLight = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/8/latest"
        );
        const data = await response.json();
        console.log("Light response:", data.value);
        const lightValue = parseFloat(data.value); // Chuyển thành số thực
        if (!isNaN(lightValue)) {
          setLights(lightValue);
        } else {
          console.error("Invalid light value:", data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy ánh sáng:", error);
      }
    };

    fetchTemperature();
    fetchHumidity();
    fetchLight();

    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
      fetchLight();
    }, 15000); // Cập nhật mỗi 5 giây

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
        <div className="welcome-card">
          <div className="welcome-card-left">
            <h2 className="name">
              Hello, <span>Truong</span>!
            </h2>
            <p className="line1">
              Always be meticulous when taking care of your hamster.
            </p>
            <p className="linetext">🌡️ {temperature}°C Outdoor Temperature</p>
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
                <span className="temp-label">40°C</span>
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
        <div className="warning-card">
          <h3>⚠️ Warning:</h3>

          {/* Cảnh báo nhiệt độ */}
          <div
            className="warning-box"
            style={{ color: temperature > 33 ? "red" : "inherit" }}
          >
            {temperature > 33
              ? "🌡️ Nhiệt độ đang quá ngưỡng"
              : temperature < 25
              ? "🌡️ Nhiệt độ đang thấp "
              : " "}
          </div>

          {/* Cảnh báo độ ẩm */}
          <div
            className="warning-box"
            style={{ color: humidity > 70 ? "red" : "inherit" }}
          >
            {humidity > 70
              ? "💧 Độ ẩm đang quá cao"
              : humidity < 30
              ? "💧 Độ ẩm đang quá thấp"
              : " "}
          </div>

          {/* Cảnh báo ánh sáng */}
          <div
            className="warning-box"
            style={{ color: lights > 2500 ? "red" : "inherit" }}
          >
            {lights > 2500
              ? "💡 Ánh sáng đang quá mạnh"
              : lights < 1000
              ? "💡 Ánh sáng yếu hơn ngưỡng ổn định"
              : " "}
          </div>
        </div>

        {/* Giám sát sức khỏe */}
        <div className="room-hamster">
          <h3 className="title-h">Hamster Room</h3>
          <div className="chart-container">
            <p>
              <img src={room} alt="image" className="grahp" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardp1;
